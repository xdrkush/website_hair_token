import type { AbiItem } from 'web3'

interface NetworkConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  iconUrls: string[];
}

interface AppConfig {
  name: string;
  description: string;
  version: string;
  social: {
    twitter: string;
    telegram: string;
    discord: string;
  };
  links: {
    docs: string;
    website: string;
    explorer: string;
  };
}

interface AnimationVariants {
  fadeIn: {
    hidden: { opacity: number };
    visible: { opacity: number; transition: { duration: number } };
  };
  slideUp: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number } };
  };
  slideDown: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number } };
  };
  scaleIn: {
    hidden: { opacity: number; scale: number };
    visible: { opacity: number; scale: number; transition: { duration: number } };
  };
  stagger: {
    visible: {
      transition: {
        staggerChildren: number;
      };
    };
  };
}

interface Colors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  dark: string;
  light: string;
  gray: string;
  grayLight: string;
  grayDark: string;
}

interface ErrorMessages {
  WALLET_NOT_FOUND: string;
  WALLET_CONNECTION_FAILED: string;
  NETWORK_SWITCH_FAILED: string;
  TRANSACTION_FAILED: string;
  INSUFFICIENT_BALANCE: string;
  USER_REJECTED: string;
  NETWORK_ADD_FAILED: string;
  BALANCE_FETCH_FAILED: string;
  EVENTS_FETCH_FAILED: string;
  TRANSACTIONS_FETCH_FAILED: string;
  REQUEST_PENDING: string;
}

interface SuccessMessages {
  WALLET_CONNECTED: string;
  NETWORK_SWITCHED: string;
  TRANSACTION_SUCCESS: string;
  COPIED_TO_CLIPBOARD: string;
  NETWORK_ADDED: string;
  TRANSACTION_SENT: string;
}

// Testnet
// export const HEMI_TESTNET_CONFIG: NetworkConfig = {
//   chainId: '0xb56c7', // 743111 en hexadécimal
//   chainName: 'Hemi Sepolia',
//   nativeCurrency: {
//     name: 'ETH',
//     symbol: 'ETH',
//     decimals: 18,
//   },
//   rpcUrls: ['https://testnet.rpc.hemi.network/rpc'],
//   blockExplorerUrls: ['https://testnet.explorer.hemi.xyz/'],
// }

// Mainnet
export const HEMI_MAINNET_CONFIG: NetworkConfig = {
  chainId: '0xa867', // 43111 en hexadécimal = 0xa867
  chainName: 'Hemi Network',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['https://rpc.hemi.network/rpc'],
  blockExplorerUrls: ['https://explorer.hemi.xyz/'],
  iconUrls: ['https://explorer.hemi.xyz/favicon.ico']
}

// API Keys from environment variables
export const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;
export const INFURA_URL = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;
export const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

// RPC URLs from environment variables
export const HEMI_MAINNET_RPC = import.meta.env.VITE_HEMI_MAINNET_RPC || 'https://rpc.hemi.network/rpc';
export const HEMI_TESTNET_RPC = import.meta.env.VITE_HEMI_TESTNET_RPC || 'https://testnet.rpc.hemi.network/rpc';

// Token addresses from environment variables
export const HAIR_TOKEN_MAINNET = '0x5B774f563C902FA7b203FB7029ed6eD4Ce274705';
export const HAIR_TOKEN_TESTNET = '0xa6Af91a69eee1E35887D5F229FA69f61021B36F3';

export const ERC20_ABI: AbiItem[] = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MAX_SUPPLY",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export const APP_CONFIG: AppConfig = {
  name: '$HAIR',
  description: 'The First Memecoin on Hemi Network',
  version: '1.0.0',
  social: {
    twitter: 'https://x.com/HairMaxToken',
    telegram: 'https://t.me/hairmaxtoken',
    discord: 'https://discord.gg/xeeVpy7Whk',
  },
  links: {
    docs: 'https://usdhair-max.gitbook.io/hairmaxtoken',
    website: 'https://hairtoken.xyz/',
    explorer: 'https://testnet.explorer.hemi.xyz/',
  }
}

export const ANIMATION_VARIANTS: AnimationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
}

export const COLORS: Colors = {
  primary: '#FF6B35',
  primaryLight: '#FF8C42',
  primaryDark: '#E55A2B',
  secondary: '#FFB74D',
  dark: '#0F0F17',
  light: '#FAFAFA',
  gray: '#6B7280',
  grayLight: '#F3F4F6',
  grayDark: '#374151',
}

export const ERROR_MESSAGES: ErrorMessages = {
  WALLET_NOT_FOUND: 'MetaMask n\'est pas installé',
  WALLET_CONNECTION_FAILED: 'Failed to connect wallet. Please try again.',
  NETWORK_SWITCH_FAILED: 'Impossible de changer de réseau',
  TRANSACTION_FAILED: 'La transaction a échoué',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction.',
  USER_REJECTED: 'Transaction was rejected by user.',
  NETWORK_ADD_FAILED: 'Impossible d\'ajouter le réseau',
  BALANCE_FETCH_FAILED: 'Impossible de récupérer les soldes',
  EVENTS_FETCH_FAILED: 'Impossible de récupérer les événements',
  TRANSACTIONS_FETCH_FAILED: 'Impossible de récupérer les transactions',
  REQUEST_PENDING: 'Une requête est déjà en cours. Veuillez patienter.',
}

export const SUCCESS_MESSAGES: SuccessMessages = {
  WALLET_CONNECTED: 'Wallet connecté avec succès',
  NETWORK_SWITCHED: 'Réseau changé avec succès',
  TRANSACTION_SUCCESS: 'Transaction completed successfully!',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
  NETWORK_ADDED: 'Réseau ajouté avec succès',
  TRANSACTION_SENT: 'Transaction envoyée avec succès',
}