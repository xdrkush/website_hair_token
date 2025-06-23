import { useState, useEffect, useCallback } from 'react'
import { 
  HEMI_MAINNET_CONFIG, 
  HAIR_TOKEN_MAINNET,
  HAIR_TOKEN_TESTNET,
  HEMI_MAINNET_RPC,
  HEMI_TESTNET_RPC,
  ERROR_MESSAGES
} from '../lib/constants'
import { formatTokenBalance, getErrorMessage } from '../lib/utils'
import Web3 from 'web3'

interface Balances {
  eth: string;
  hair: string;
  hairMainnet: string;
  hairTestnet: string;
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  blockNumber: string;
  type: string;
  status: string;
  date: string;
}

interface Event {
  event: string;
  returnValues: Record<string, unknown>;
  blockNumber: number;
  transactionHash: string;
}

interface Log {
  transactionHash: string;
  topics: string[];
  data: string;
  blockNumber: string;
}

interface WalletHook {
  isConnected: boolean;
  address: string;
  chainId: string;
  isLoading: boolean;
  error: string;
  balances: Balances;
  isMetaMaskInstalled: () => boolean;
  isOnHemiNetwork: boolean;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  switchToHemiNetwork: () => Promise<boolean>;
  refreshBalances: () => Promise<void>;
  clearError: () => void;
  transactions: Transaction[];
  events: Event[];
  isLoadingTransactions: boolean;
  fetchTransactionsByNetwork: (address: string, networkType: 'mainnet' | 'testnet') => Promise<void>;
  isSwitchingNetwork: boolean;
  sendTokens: (toAddress: string, amount: string, isMainnet: boolean) => Promise<boolean>;
  isSendingTokens: boolean;
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (args: unknown) => void) => void;
      removeListener: (event: string, callback: (args: unknown) => void) => void;
    };
  }
}

export const useWallet = (): WalletHook => {
  const [isConnected, setIsConnected] = useState(false);
  const [isExplicitlyDisconnected, setIsExplicitlyDisconnected] = useState(false);
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState('');
  const [balances, setBalances] = useState<Balances>({
    eth: '0',
    hair: '0',
    hairMainnet: '0',
    hairTestnet: '0'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(false);
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState<boolean>(false);
  const [isSendingTokens, setIsSendingTokens] = useState<boolean>(false);

  const isMetaMaskInstalled = useCallback((): boolean => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }, []);

  // Fonction pour récupérer les balances depuis MetaMask et RPC externes
  const getBalancesFromMetaMask = useCallback(async (address: string) => {
    if (!address) return;

    try {
      // Créer une instance Web3 avec le provider MetaMask
      const web3 = new Web3(window.ethereum);

      // Récupérer le solde ETH via Web3 (réseau actuel)
      const ethBalance = await web3.eth.getBalance(address);
      const ethBalanceFormatted = formatTokenBalance(ethBalance, 18);
      setBalances(prev => ({ ...prev, eth: ethBalanceFormatted }));

      // Créer des instances Web3 pour les RPC externes
      const mainnetWeb3 = new Web3(HEMI_MAINNET_RPC);
      const testnetWeb3 = new Web3(HEMI_TESTNET_RPC);

      // Récupérer le solde HAIR mainnet via RPC externe (toujours accessible)
      try {
        const hairMainnetData = mainnetWeb3.eth.abi.encodeFunctionCall({
          name: 'balanceOf',
          type: 'function',
          inputs: [{ type: 'address', name: 'account' }]
        }, [address]);

        const hairMainnetResult = await mainnetWeb3.eth.call({
          to: HAIR_TOKEN_MAINNET,
          data: hairMainnetData
        });

        if (hairMainnetResult && hairMainnetResult !== '0x') {
          const hairMainnetBalance = mainnetWeb3.eth.abi.decodeParameter('uint256', hairMainnetResult);
          const hairMainnetFormatted = formatTokenBalance(hairMainnetBalance as string, 18);
          setBalances(prev => ({ ...prev, hairMainnet: hairMainnetFormatted }));
        } else {
          setBalances(prev => ({ ...prev, hairMainnet: '0' }));
        }
      } catch (error) {
        console.log('Could not fetch HAIR mainnet balance via RPC:', error);
        setBalances(prev => ({ ...prev, hairMainnet: '0' }));
      }

      // Récupérer le solde HAIR testnet via RPC externe (toujours accessible)
      try {
        const hairTestnetData = testnetWeb3.eth.abi.encodeFunctionCall({
          name: 'balanceOf',
          type: 'function',
          inputs: [{ type: 'address', name: 'account' }]
        }, [address]);

        const hairTestnetResult = await testnetWeb3.eth.call({
          to: HAIR_TOKEN_TESTNET,
          data: hairTestnetData
        });

        if (hairTestnetResult && hairTestnetResult !== '0x') {
          const hairTestnetBalance = testnetWeb3.eth.abi.decodeParameter('uint256', hairTestnetResult);
          const hairTestnetFormatted = formatTokenBalance(hairTestnetBalance as string, 18);
          setBalances(prev => ({ ...prev, hairTestnet: hairTestnetFormatted }));
        } else {
          setBalances(prev => ({ ...prev, hairTestnet: '0' }));
        }
      } catch (error) {
        console.log('Could not fetch HAIR testnet balance via RPC:', error);
        setBalances(prev => ({ ...prev, hairTestnet: '0' }));
      }

    } catch (error) {
      console.error('Error fetching balances:', error);
      setError(ERROR_MESSAGES.BALANCE_FETCH_FAILED);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    setIsExplicitlyDisconnected(true);
    setAddress('');
    setChainId('');
    setBalances({ eth: '0', hair: '0', hairMainnet: '0', hairTestnet: '0' });
    setTransactions([]);
    setEvents([]);
    setError('');

    // Supprimer les écouteurs d'événements
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('disconnect', handleDisconnect);
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts: unknown) => {
    const accountList = accounts as string[];
    if (accountList.length === 0) {
      // L'utilisateur s'est déconnecté
      disconnectWallet();
    } else {
      // L'utilisateur a changé de compte
      setAddress(accountList[0]);
      getBalancesFromMetaMask(accountList[0]);
    }
  }, [disconnectWallet, getBalancesFromMetaMask]);

  const handleChainChanged = useCallback((newChainId: unknown) => {
    setChainId(newChainId as string);
    if (address) {
      getBalancesFromMetaMask(address);
    }
  }, [address, getBalancesFromMetaMask]);

  const handleDisconnect = useCallback(() => {
    disconnectWallet();
  }, [disconnectWallet]);

  const connectWallet = useCallback(async (): Promise<boolean> => {
    if (!isMetaMaskInstalled()) {
      setError(ERROR_MESSAGES.WALLET_NOT_FOUND);
      return false;
    }

    try {
      setIsLoading(true);
      setError('');
      setIsExplicitlyDisconnected(false);

      const accounts = await window.ethereum?.request({
        method: 'eth_requestAccounts'
      });

      if (accounts && (accounts as string[]).length > 0) {
        const accountAddress = (accounts as string[])[0];
        setAddress(accountAddress);
        setIsConnected(true);
        await getBalancesFromMetaMask(accountAddress);
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error('Erreur connexion wallet:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isMetaMaskInstalled, getBalancesFromMetaMask]);

  const switchToHemiNetwork = useCallback(async (): Promise<boolean> => {
    if (!isMetaMaskInstalled()) {
      setError(ERROR_MESSAGES.WALLET_NOT_FOUND);
      return false;
    }

    // Prévenir les clics multiples
    if (isSwitchingNetwork) {
      console.log('Switch réseau déjà en cours...');
      return false;
    }

    try {
      setIsSwitchingNetwork(true);
      setError('');

      console.log('Tentative de switch vers le réseau Hemi...', HEMI_MAINNET_CONFIG.chainId);

      // Essayer d'abord de switcher vers le réseau
      try {
        await window.ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: HEMI_MAINNET_CONFIG.chainId }],
        });
        console.log('Switch réussi vers le réseau Hemi');
        setChainId(HEMI_MAINNET_CONFIG.chainId);
        return true;
      } catch (switchError: unknown) {
        const error = switchError as { code: number; message?: string };
        console.log('Erreur lors du switch:', error);

        // Gérer les erreurs spécifiques
        if (error.code === -32002) {
          setError(ERROR_MESSAGES.REQUEST_PENDING);
          return false;
        }

        if (error.code === 4902) {
          console.log('Réseau non trouvé, tentative d\'ajout...');
          try {
            await window.ethereum?.request({
              method: 'wallet_addEthereumChain',
              params: [HEMI_MAINNET_CONFIG],
            });
            console.log('Réseau Hemi ajouté avec succès');
            setChainId(HEMI_MAINNET_CONFIG.chainId);
            return true;
          } catch (addError: unknown) {
            const addErrorObj = addError as { code: number; message?: string };
            console.error('Erreur lors de l\'ajout du réseau:', addError);

            if (addErrorObj.code === -32002) {
              setError(ERROR_MESSAGES.REQUEST_PENDING);
            } else if (addErrorObj.code === -32602) {
              setError('Configuration du réseau invalide. Veuillez vérifier les détails du réseau Hemi.');
            } else {
              setError('Impossible d\'ajouter le réseau Hemi. Veuillez vérifier que le réseau est disponible.');
            }
            return false;
          }
        } else {
          console.error('Erreur changement réseau:', switchError);
          setError('Impossible de changer vers le réseau Hemi. Veuillez vérifier la configuration.');
          return false;
        }
      }
    } finally {
      setIsSwitchingNetwork(false);
    }
  }, [isMetaMaskInstalled, isSwitchingNetwork]);

  // Fonction pour récupérer les transactions on-chain
  const fetchTransactions = useCallback(async (address: string, isMainnet: boolean = true) => {
    setIsLoadingTransactions(true);
    setError('');

    try {
      const rpcUrl = isMainnet ? HEMI_MAINNET_RPC : HEMI_TESTNET_RPC;
      const tokenAddress = isMainnet ? HAIR_TOKEN_MAINNET : HAIR_TOKEN_TESTNET;

      // Récupérer les transactions entrantes (Transfer vers l'adresse)
      const incomingResponse = await fetch(rpcUrl, {
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
      const outgoingResponse = await fetch(rpcUrl, {
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
      const allLogs = [
        ...(incomingResult.result || []).map((log: Log) => ({ ...log, direction: 'incoming' })),
        ...(outgoingResult.result || []).map((log: Log) => ({ ...log, direction: 'outgoing' }))
      ];

      // Traiter les logs pour créer des transactions
      const processedTransactions = await Promise.all(
        allLogs.map(async (log: Log & { direction: string }) => {
          // Récupérer les détails de la transaction
          const txResponse = await fetch(rpcUrl, {
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
          const blockResponse = await fetch(rpcUrl, {
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
        })
      );

      // Trier par date (plus récent en premier)
      const sortedTransactions = processedTransactions.sort((a, b) =>
        parseInt(b.timestamp) - parseInt(a.timestamp)
      );

      setTransactions(sortedTransactions);
    } catch (err) {
      console.error('Erreur récupération transactions:', err);
      setError(ERROR_MESSAGES.TRANSACTIONS_FETCH_FAILED);
    } finally {
      setIsLoadingTransactions(false);
    }
  }, []);

  // Fonction pour récupérer les transactions selon le réseau
  const fetchTransactionsByNetwork = useCallback(async (address: string, networkType: 'mainnet' | 'testnet') => {
    await fetchTransactions(address, networkType === 'mainnet');
  }, [fetchTransactions]);

  const refreshBalances = useCallback(async (): Promise<void> => {
    if (address) {
      await getBalancesFromMetaMask(address);
    }
  }, [address, getBalancesFromMetaMask]);

  // Fonction pour envoyer des tokens HAIR
  const sendTokens = useCallback(async (toAddress: string, amount: string, isMainnet: boolean = true): Promise<boolean> => {
    if (!isMetaMaskInstalled() || !address) {
      setError(ERROR_MESSAGES.WALLET_NOT_FOUND);
      return false;
    }

    if (isSendingTokens) {
      console.log('Envoi de tokens déjà en cours...');
      return false;
    }

    // Vérification simple des entrées
    if (!toAddress || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Adresse ou montant invalide');
      return false;
    }

    try {
      setIsSendingTokens(true);
      setError('');

      // Sanitize inputs (simple trim)
      const sanitizedAddress = toAddress.trim();
      const sanitizedAmount = amount.trim();

      // Convert the amount to wei (18 decimals)
      const amountInWei = (parseFloat(sanitizedAmount) * Math.pow(10, 18)).toString(16);
      const paddedAmount = '0x' + amountInWei.padStart(64, '0');

      // Token contract address based on network
      const tokenAddress = isMainnet
        ? HAIR_TOKEN_MAINNET // Mainnet HAIR token
        : HAIR_TOKEN_TESTNET; // Testnet HAIR token

      // Transfer function signature (transfer(address,uint256))
      const transferSignature = '0xa9059cbb';
      const paddedToAddress = '0x' + sanitizedAddress.slice(2).padStart(64, '0');

      // Transaction data
      const data = transferSignature + paddedToAddress + paddedAmount;

      console.log('Sending tokens:', {
        to: sanitizedAddress,
        amount: sanitizedAmount,
        tokenAddress: tokenAddress,
        data: data
      });

      // Send transaction
      const txHash = await window.ethereum?.request({
        method: 'eth_sendTransaction',
        params: [{
          from: address,
          to: tokenAddress,
          data: data,
          gas: '0x186A0', // 100,000 gas (approximate limit)
        }]
      });

      console.log('Transaction sent:', txHash);

      // Refresh balances after sending
      if (txHash) {
        setTimeout(() => {
          getBalancesFromMetaMask(address);
        }, 2000);
      }

      return true;
    } catch (err: unknown) {
      const error = err as { code: number; message?: string };
      console.error('Error sending tokens:', error);
      // Handle specific errors
      if (error.code === 4001) {
        setError('Transaction cancelled by user');
      } else if (error.code === -32603) {
        setError('Transaction error. Check your balance and gas fees.');
      } else {
        setError('An error occurred while sending tokens.');
      }
      return false;
    } finally {
      setIsSendingTokens(false);
    }
  }, [isMetaMaskInstalled, address, isSendingTokens, getBalancesFromMetaMask]);

  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled() && !isExplicitlyDisconnected) {
        try {
          const accounts = await window.ethereum?.request({
            method: 'eth_accounts'
          });

          if (accounts && (accounts as string[]).length > 0) {
            setAddress((accounts as string[])[0]);
            setIsConnected(true);

            const currentChainId = await window.ethereum?.request({
              method: 'eth_chainId'
            });
            setChainId(currentChainId as string);

            await getBalancesFromMetaMask((accounts as string[])[0]);
          } else {
            setIsConnected(false);
            setIsExplicitlyDisconnected(true);
          }
        } catch (err) {
          console.error('Erreur vérification connexion:', err);
          setIsConnected(false);
          setIsExplicitlyDisconnected(true);
        }
      }
    };

    checkConnection();

    // Ajouter les écouteurs d'événements
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }

    // Nettoyer les écouteurs lors du démontage
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [isMetaMaskInstalled, getBalancesFromMetaMask, handleAccountsChanged, handleChainChanged, handleDisconnect, isExplicitlyDisconnected]);

  const clearError = () => setError('');

  const isOnHemiNetwork = chainId === HEMI_MAINNET_CONFIG.chainId;

  return {
    isConnected,
    address,
    chainId,
    isLoading,
    error,
    balances,
    isMetaMaskInstalled,
    isOnHemiNetwork,
    connectWallet,
    disconnectWallet,
    switchToHemiNetwork,
    refreshBalances,
    clearError,
    transactions,
    events,
    isLoadingTransactions,
    fetchTransactionsByNetwork,
    isSwitchingNetwork,
    sendTokens,
    isSendingTokens
  };
};
