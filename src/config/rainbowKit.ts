import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';

// Configuration des réseaux Hemi
export const hemiMainnet = {
  id: 43111,
  name: 'Hemi Network',
  network: 'hemi',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.hemi.network/rpc'] },
    default: { http: ['https://rpc.hemi.network/rpc'] },
  },
  blockExplorers: {
    etherscan: { name: 'Hemi Explorer', url: 'https://explorer.hemi.xyz' },
    default: { name: 'Hemi Explorer', url: 'https://explorer.hemi.xyz' },
  },
} as const;

export const hemiTestnet = {
  id: 743111,
  name: 'Hemi Sepolia',
  network: 'hemi-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://testnet.rpc.hemi.network/rpc'] },
    default: { http: ['https://testnet.rpc.hemi.network/rpc'] },
  },
  blockExplorers: {
    etherscan: { name: 'Hemi Testnet Explorer', url: 'https://testnet.explorer.hemi.xyz' },
    default: { name: 'Hemi Testnet Explorer', url: 'https://testnet.explorer.hemi.xyz' },
  },
} as const;

// ProjectId pour WalletConnect (vous devrez obtenir un projectId sur https://cloud.walletconnect.com/)
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';

// Configuration des wallets
const wallets = [
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet,
      walletConnectWallet,
    ],
  },
];

// Configuration RainbowKit
export const config = getDefaultConfig({
  appName: '$HAIR Token',
  projectId,
  wallets,
  chains: [hemiMainnet, hemiTestnet],
  ssr: true,
}); 