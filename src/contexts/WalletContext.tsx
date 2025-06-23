import React, { createContext, useContext } from 'react';
import { useWallet } from '../hooks/useWallet';

// Créer le contexte avec une valeur par défaut
const WalletContext = createContext<ReturnType<typeof useWallet> | null>(null);

// Provider component
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallet = useWallet();

  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === null) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};

export default useWalletContext;