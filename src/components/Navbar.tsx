import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useWalletContext from '../contexts/WalletContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { formatAddress } from '../lib/utils';
import hairLogo from '../assets/logo_hair_no_bg.png';

const pages = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Hemi', href: '/#hemi' },
  { name: 'Tokenomics', href: '/#tokenomics' },
  { name: 'Roadmap', href: '/#roadmap' },
  { name: 'My Account', href: '/account' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { 
    isConnected, 
    address, 
    connectWallet, 
    disconnectWallet,
    isLoading,
  } = useWalletContext();
  const { mode, toggleTheme } = useThemeContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleWalletAction = async () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      await connectWallet();
    }
  };

  const handleNavClick = (href: string) => {
    handleCloseNavMenu();
    if (href === '/') {
      // Si on clique sur Home depuis la page d'accueil, remonter en haut
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        const navbarHeight = 80; // Hauteur approximative de la navbar
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={1}
      sx={{
        borderRadius: 0,
        border: 'none',
        '& .MuiAppBar-root': {
          borderRadius: 0,
          border: 'none',
        }
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
              src={hairLogo}
              alt="Logo"
              style={{ height: '50px', width: 'auto' }}
            />
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  width: '100vw',
                  maxWidth: '100vw',
                  left: '0 !important',
                  right: '0 !important',
                  marginTop: '0',
                  borderRadius: '0',
                },
                '& .MuiMenu-list': {
                  padding: 0,
                },
                '& .MuiMenuItem-root': {
                  justifyContent: 'center',
                  padding: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  component={RouterLink}
                  to={page.href}
                  onClick={() => handleNavClick(page.href)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
              src={hairLogo}
              alt="Logo"
              style={{ height: '42px', width: 'auto' }}
            />
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.href}
                onClick={() => handleNavClick(page.href)}
                sx={{
                  my: 2,
                  color: 'text.primary',
                  display: 'block',
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Theme Toggle Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              sx={{ 
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          {/* Connect Wallet Button */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              startIcon={<AccountBalanceWalletIcon />}
              onClick={handleWalletAction}
              disabled={isLoading}
              sx={{
                backgroundColor: isConnected ? 'success.main' : 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: isConnected ? 'success.dark' : 'primary.dark',
                },
                px: 3,
                py: 1,
              }}
            >
              {isLoading ? 'Connecting...' : isConnected ? formatAddress(address) : 'Connect Wallet'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 