import React, { createContext, useContext } from 'react';
import { useRainbowKitWallet } from '../hooks/useRainbowKitWallet';

// Créer le contexte avec une valeur par défaut
const RainbowKitWalletContext = createContext<ReturnType<typeof useRainbowKitWallet> | null>(null);

// Provider component
export const RainbowKitWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallet = useRainbowKitWallet();

  return (
    <RainbowKitWalletContext.Provider value={wallet}>
      {children}
    </RainbowKitWalletContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
const useRainbowKitWalletContext = () => {
  const context = useContext(RainbowKitWalletContext);
  if (context === null) {
    throw new Error('useRainbowKitWalletContext must be used within a RainbowKitWalletProvider');
  }
  return context;
};

export default useRainbowKitWalletContext; 