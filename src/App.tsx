import './App.css'

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { RainbowKitAppProvider } from './contexts/RainbowKitProvider.tsx'
import { RainbowKitWalletProvider } from './contexts/RainbowKitWalletContext.tsx'
import { CssBaseline, GlobalStyles } from '@mui/material';

function App() {
  return (
    <RainbowKitAppProvider>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: {
              scrollBehavior: 'smooth',
            },
            'html, body': {
              scrollPaddingTop: '80px', // Compense la hauteur de la navbar
            },
          }}
        />
        <RainbowKitWalletProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </Router>
        </RainbowKitWalletProvider>
      </ThemeProvider>
    </RainbowKitAppProvider>
  )
}

export default App
