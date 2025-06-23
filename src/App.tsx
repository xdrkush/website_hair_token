import './App.css'

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { WalletProvider } from './contexts/WalletContext.tsx'
import { CssBaseline, GlobalStyles } from '@mui/material';

function App() {
  return (
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
      <WalletProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App
