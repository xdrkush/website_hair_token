import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '../config/rainbowKit';
import '@rainbow-me/rainbowkit/styles.css';
import { myCustomTheme } from '../styles/rainbowkitThemes';

// Créer un client Query pour React Query
const queryClient = new QueryClient();

interface RainbowKitAppProviderProps {
  children: React.ReactNode;
}

export const RainbowKitAppProvider = ({ children }: RainbowKitAppProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en-US" theme={myCustomTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};