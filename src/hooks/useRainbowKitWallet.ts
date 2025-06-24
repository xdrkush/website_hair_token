import { useAccount, useBalance, useChainId, useSwitchChain, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useState, useEffect, useCallback } from 'react';
import { hemiMainnet, hemiTestnet } from '../config/rainbowKit';
import { HAIR_TOKEN_MAINNET, HAIR_TOKEN_TESTNET, HEMI_MAINNET_RPC, HEMI_TESTNET_RPC } from '../lib/constants';
import { formatTokenBalance } from '../lib/utils';
import { rateLimitedFetch } from '../lib/rateLimiter';

interface Balances {
  eth: string;
  hairMainnet: string;
  hairTestnet: string;
}

interface Transaction {
  hash: string;
  type: string;
  value: string;
  status: string;
  date: string;
}

interface Event {
  event: string;
  returnValues: Record<string, unknown>;
  blockNumber: number;
  transactionHash: string;
}

interface LogWithDirection {
  transactionHash: string;
  data: string;
  topics: string[];
  direction: string;
}

interface RawLog {
  transactionHash: string;
  data: string;
  topics: string[];
}

interface RainbowKitWalletHook {
  isConnected: boolean;
  address: string;
  chainId: number;
  isLoading: boolean;
  error: string;
  balances: Balances;
  isOnHemiNetwork: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  switchToHemiNetwork: () => Promise<boolean>;
  refreshBalances: () => Promise<void>;
  clearError: () => void;
  transactions: Transaction[];
  events: Event[];
  isLoadingTransactions: boolean;
  fetchTransactionsByNetwork: (address: string, networkType: 'mainnet' | 'testnet') => Promise<Transaction[]>;
  isSwitchingNetwork: boolean;
  sendTokens: (toAddress: string, amount: string, isMainnet: boolean) => Promise<boolean>;
  isSendingTokens: boolean;
}

export const useRainbowKitWallet = (): RainbowKitWalletHook => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitchingNetwork } = useSwitchChain();

  // États locaux
  const [error, setError] = useState('');
  const [balances, setBalances] = useState<Balances>({
    eth: '0',
    hairMainnet: '0',
    hairTestnet: '0'
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  // Récupérer les balances avec wagmi
  // Balance ETH Hemi Mainnet
  const { data: ethHemiMainnetBalance } = useBalance({
    address,
    chainId: hemiMainnet.id,
  });

  const { data: hairMainnetBalance } = useBalance({
    address,
    token: HAIR_TOKEN_MAINNET as `0x${string}`,
    chainId: hemiMainnet.id,
  });

  const { data: hairTestnetBalance } = useBalance({
    address,
    token: HAIR_TOKEN_TESTNET as `0x${string}`,
    chainId: hemiTestnet.id,
  });

  // Mettre à jour les balances quand les données changent
  useEffect(() => {
    if (address) {
      setBalances({
        eth: ethHemiMainnetBalance ? formatTokenBalance(ethHemiMainnetBalance.value, 18) : '0',
        hairMainnet: hairMainnetBalance ? formatTokenBalance(hairMainnetBalance.value, 18) : '0',
        hairTestnet: hairTestnetBalance ? formatTokenBalance(hairTestnetBalance.value, 18) : '0',
      });
    }
  }, [address, ethHemiMainnetBalance, hairMainnetBalance, hairTestnetBalance, chainId]);

  const connectWallet = useCallback(() => {
    if (openConnectModal) {
      openConnectModal();
    }
  }, [openConnectModal]);

  const disconnectWallet = useCallback(() => {
    disconnect();
    setBalances({ 
      eth: '0', 
      hairMainnet: '0', 
      hairTestnet: '0' 
    });
    setTransactions([]);
    setEvents([]);
    setError('');
  }, [disconnect]);

  const switchToHemiNetwork = useCallback(async (): Promise<boolean> => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return false;
    }

    try {
      setError('');
      await switchChain({ chainId: hemiMainnet.id });
      return true;
    } catch (err) {
      console.error('Error switching to Hemi network:', err);
      setError('Failed to switch to Hemi network');
      return false;
    }
  }, [isConnected, switchChain]);

  const refreshBalances = useCallback(async () => {
    // Les balances sont automatiquement mises à jour par wagmi
    console.log('Balances refreshed');
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const fetchTransactionsByNetwork = useCallback(async (address: string, networkType: 'mainnet' | 'testnet') => {
    try {
      // Use real Hemi RPC endpoints from environment variables
      const rpcUrl = networkType === 'mainnet' 
        ? HEMI_MAINNET_RPC
        : HEMI_TESTNET_RPC;
      
      // HAIR token contract addresses
      const tokenAddress = networkType === 'mainnet' 
        ? HAIR_TOKEN_MAINNET
        : HAIR_TOKEN_TESTNET;

      // Récupérer les transactions entrantes (Transfer vers l'adresse)
      const incomingResponse = await rateLimitedFetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getLogs',
          params: [{
            fromBlock: '0x0',
            toBlock: 'latest',
            address: tokenAddress,
            topics: [
              '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer event
              null, // from address (any)
              '0x000000000000000000000000' + address.slice(2) // to address (user's address)
            ]
          }],
          id: 1
        })
      });

      // Récupérer les transactions sortantes (Transfer depuis l'adresse)
      const outgoingResponse = await rateLimitedFetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getLogs',
          params: [{
            fromBlock: '0x0',
            toBlock: 'latest',
            address: tokenAddress,
            topics: [
              '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer event
              '0x000000000000000000000000' + address.slice(2), // from address (user's address)
              null // to address (any)
            ]
          }],
          id: 1
        })
      });

      const incomingResult = await incomingResponse.json();
      const outgoingResult = await outgoingResponse.json();

      if (incomingResult.error) {
        throw new Error(incomingResult.error.message);
      }

      // Combiner et traiter tous les logs
      const allLogs: LogWithDirection[] = [
        ...(incomingResult.result || []).map((log: RawLog) => ({ ...log, direction: 'incoming' })),
        ...(outgoingResult.result || []).map((log: RawLog) => ({ ...log, direction: 'outgoing' }))
      ];

      // Traiter les logs pour créer des transactions
      const processedTransactions = await Promise.all(
        allLogs.map(async (log: LogWithDirection) => {
          try {
            // Récupérer les détails de la transaction
            const txResponse = await rateLimitedFetch(rpcUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_getTransactionByHash',
                params: [log.transactionHash],
                id: 1
              })
            });

            const txResult = await txResponse.json();
            const tx = txResult.result;

            // Récupérer le bloc pour la date
            const blockResponse = await rateLimitedFetch(rpcUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_getBlockByNumber',
                params: [tx.blockNumber, false],
                id: 1
              })
            });

            const blockResult = await blockResponse.json();
            const block = blockResult.result;

            // Décoder les données du log (montant)
            const amount = parseInt(log.data, 16) / Math.pow(10, 18); // Convertir en HAIR

            // Déterminer les adresses from/to selon la direction
            const fromAddress = log.direction === 'incoming'
              ? '0x' + log.topics[1].slice(26)
              : address;
            const toAddress = log.direction === 'incoming'
              ? address
              : '0x' + log.topics[2].slice(26);

            return {
              hash: log.transactionHash,
              from: fromAddress,
              to: toAddress,
              value: amount.toString(),
              timestamp: (parseInt(block.timestamp, 16) * 1000).toString(), // Convertir en millisecondes
              blockNumber: tx.blockNumber,
              type: log.direction === 'incoming' ? 'Received' : 'Sent',
              status: 'Success',
              date: new Date(parseInt(block.timestamp, 16) * 1000).toISOString()
            };
          } catch (error) {
            console.warn('Error processing log:', error);
            return null;
          }
        })
      );

      // Filter out null results and sort by date (newest first)
      const validTransactions = processedTransactions
        .filter(tx => tx !== null)
        .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
      
      // Limit to last 20 transactions
      const limitedTransactions = validTransactions.slice(0, 20);
      
      return limitedTransactions;
      
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }, []);

  const sendTokens = useCallback(async (toAddress: string, amount: string, isMainnet: boolean): Promise<boolean> => {
    // Cette fonction peut être implémentée plus tard avec wagmi
    console.log('Sending tokens:', { toAddress, amount, isMainnet });
    return false;
  }, []);

  const isOnHemiNetwork = chainId === hemiMainnet.id || chainId === hemiTestnet.id;

  return {
    isConnected,
    address: address || '',
    chainId,
    isLoading: false, // RainbowKit gère le loading automatiquement
    error,
    balances,
    isOnHemiNetwork,
    connectWallet,
    disconnectWallet,
    switchToHemiNetwork,
    refreshBalances,
    clearError,
    transactions,
    events,
    isLoadingTransactions: false, // À implémenter plus tard
    fetchTransactionsByNetwork,
    isSwitchingNetwork,
    sendTokens,
    isSendingTokens: false // À implémenter plus tard
  };
}; 