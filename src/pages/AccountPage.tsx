import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Container,
  Link as MuiLink,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useWalletContext from '../contexts/WalletContext';
import { formatNumber } from '../lib/utils';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import BoltIcon from '@mui/icons-material/Bolt';
import SecurityIcon from '@mui/icons-material/Security';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useState, useEffect, useCallback } from 'react';

export default function AccountPage() {
  const {
    isConnected,
    address,
    balances,
    // error,
    isLoading,
    connectWallet,
    isOnHemiNetwork,
    switchToHemiNetwork,
    transactions,
    isLoadingTransactions,
    fetchTransactionsByNetwork,
    isSwitchingNetwork,
    sendTokens,
    isSendingTokens
  } = useWalletContext();

  const [tab, setTab] = useState(0);
  const [tabFade, setTabFade] = useState(true);
  const [networkTab, setNetworkTab] = useState(0);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [sendFormData, setSendFormData] = useState({
    toAddress: '',
    amount: '',
    network: 'mainnet'
  });
  const [formError, setFormError] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabFade(false);
    setTimeout(() => {
      setTab(newValue);
      setTabFade(true);
    }, 200);
  };

  // Fonction pour fermer le dialog
  const handleCloseSendDialog = () => {
    setSendDialogOpen(false);
    setSendFormData({ toAddress: '', amount: '', network: 'mainnet' });
    setFormError('');
  };

  // Fonction pour envoyer les tokens
  const handleSendTokensSubmit = async () => {
    // Validation basique
    if (!sendFormData.toAddress || sendFormData.toAddress.length !== 42 || !sendFormData.toAddress.startsWith('0x')) {
      setFormError('Invalid destination address');
      return;
    }
    
    if (!sendFormData.amount || parseFloat(sendFormData.amount) <= 0 || isNaN(parseFloat(sendFormData.amount))) {
      setFormError('Invalid amount');
      return;
    }
    
    const success = await sendTokens(
      sendFormData.toAddress, 
      sendFormData.amount, 
      sendFormData.network === 'mainnet'
    );
    
    if (success) {
      handleCloseSendDialog();
    }
  };

  // Fonction pour charger les transactions selon le réseau
  const loadTransactions = useCallback(async () => {
    if (!address) return;
    
    const networkType = networkTab === 0 ? 'mainnet' : 'testnet';
    await fetchTransactionsByNetwork(address, networkType);
  }, [address, networkTab, fetchTransactionsByNetwork]);

  // Charger les transactions quand on change d'onglet ou de réseau
  useEffect(() => {
    if (tab === 3 && address) {
      loadTransactions();
    }
  }, [tab, networkTab, address, loadTransactions]);

  if (!isConnected) {
    return (
      <Container maxWidth="md" sx={{ mt: 10, py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            YOUR $HAIR HEADQUARTERS
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your $HAIR tokens and view your transaction history
          </Typography>
        </Box>

        <Paper 
          elevation={0}
          sx={{ 
            maxWidth: 500, 
            mx: 'auto', 
            p: 4,
            background: 'background.paper',
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: 'primary.main',
            borderRadius: 4
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <AccountBalanceWalletIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Connect Your Wallet
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Please connect your wallet to access your $HAIR account and view your balances.
            </Typography>
            <Button
              variant="contained"
              size="small"
              fullWidth
              onClick={connectWallet}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : <AccountBalanceWalletIcon />}
              sx={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF8C42 0%, #FFB74D 100%)',
                }
              }}
            >
              Connect Wallet
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', pt: 10, pb: 8 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back to Home */}
        <Box sx={{ position: 'absolute', top: { xs: 80, md: 100 }, left: 8 }}>
          <Button
            size="small"
            sx={{
              height: 20,
            }}
            component={RouterLink}
            to="/"
            variant="outlined"
            startIcon={<HomeIcon />}
          >
            Back to Home
          </Button>
        </Box>

        {/* Hero */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            YOUR $HAIR HEADQUARTERS
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your $HAIR tokens and view your transaction history
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ width: '100%', mb: 4 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Account sections"
            sx={{ 
              mb: 2,
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center'
              }
            }}
          >
            <Tab label="Wallet Info" />
            <Tab label="Network & Token" />
            <Tab label="Actions" />
            <Tab label="Transactions" />
            {/* <Tab label="NFT (soon)" /> */}
            {/* <Tab label="Swap (soon)" /> */}
            {/* <Tab label="Lottery (soon)" /> */}
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {tab === 0 && (
          <Box
            sx={{
              opacity: tabFade ? 1 : 0,
              transform: tabFade ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
          >
            {/* Account Info */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                mb: 4,
                background: 'background.paper',
                backdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 4
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountBalanceWalletIcon color="primary" />
                  <Typography variant="h6">Connected Wallet</Typography>
                </Box>
                <Box 
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    backgroundColor: isOnHemiNetwork ? 'primary.main' : 'error.main',
                    color: 'white',
                    border: '1px solid',
                    borderColor: isOnHemiNetwork ? 'primary.main' : 'error.main',
                  }}
                >
                  {isOnHemiNetwork ? "Hemi Mainnet" : "Wrong Network"}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" fontFamily="monospace">
                  {address}
                </Typography>
                {!isOnHemiNetwork && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={switchToHemiNetwork}
                      disabled={isSwitchingNetwork}
                      startIcon={isSwitchingNetwork ? <CircularProgress size={16} /> : undefined}
                    >
                      {isSwitchingNetwork ? 'Switching...' : 'Switch to Hemi Mainnet'}
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                      Si l'ajout automatique échoue, ajoutez manuellement le réseau Hemi dans MetaMask
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>

            {/* Balance Cards */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
              mb: 4 
            }}>
              {/* $HAIR Balance */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3,
                  height: '100%',
                  background: 'background.paper',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: 4
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CurrencyBitcoinIcon color="primary" />
                  <Typography variant="h6">$HAIR BALANCE</Typography>
                </Box>
                <Chip 
                  label="Hemi Mainnet" 
                  variant="outlined" 
                  size="small" 
                  sx={{ mb: 2 }}
                  clickable={false}
                />
                <Typography variant="h4" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {formatNumber(balances.hairMainnet)} HAIR
                </Typography>
              </Paper>

              {/* $HAIRPOINTS Balance */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3,
                  height: '100%',
                  background: 'background.paper',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: 4
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <BoltIcon sx={{ color: 'info.main' }} />
                  <Typography variant="h6">$HAIRPOINTS BALANCE</Typography>
                </Box>
                <Chip 
                  label="Hemi Sepolia Testnet" 
                  variant="outlined" 
                  size="small" 
                  sx={{ mb: 2 }}
                  clickable={false}
                />
                <Typography variant="h4" color="info.main" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {formatNumber(balances.hairTestnet)} HAIR
                </Typography>
              </Paper>

              {/* ETH Balance */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3,
                  height: '100%',
                  background: 'background.paper',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: 4
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <SecurityIcon sx={{ color: 'success.main' }} />
                  <Typography variant="h6">ETH BALANCE</Typography>
                </Box>
                <Typography variant="h4" color="success.main" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {balances.eth} ETH
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For transaction fees
                </Typography>
              </Paper>
            </Box>
          </Box>
        )}

        {tab === 1 && (
          <Box
            sx={{
              opacity: tabFade ? 1 : 0,
              transform: tabFade ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
          >
            {/* Network Information */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                background: 'background.paper',
                backdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 4
              }}
            >
              <Typography variant="h6" gutterBottom>Network Information</Typography>

              {/* Mainnet Information */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'success.main', fontWeight: 600 }}>
                  🚀 Mainnet
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2 
                }}>
                  <Box>
                    <Typography variant="body2">
                      <strong>Network:</strong> Hemi Mainnet
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Chain ID:</strong> 43110
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>RPC URL:</strong> https://rpc.hemi.network/rpc
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Explorer:</strong>{' '}
                      <MuiLink 
                        href="https://explorer.hemi.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        explorer.hemi.xyz
                      </MuiLink>
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Testnet Information */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  🧪 Testnet
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2 
                }}>
                  <Box>
                    <Typography variant="body2">
                      <strong>Network:</strong> Hemi Sepolia Testnet
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Chain ID:</strong> 743111
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>RPC URL:</strong> https://testnet.rpc.hemi.network/rpc
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Explorer:</strong>{' '}
                      <MuiLink 
                        href="https://testnet.explorer.hemi.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        testnet.explorer.hemi.xyz
                      </MuiLink>
                    </Typography>
                  </Box>
                </Box>
              </Box>

            </Paper>

            {/* Token Information */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                mt: 3,
                background: 'background.paper',
                backdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 4
              }}
            >
              <Typography variant="h6" gutterBottom>Token Information</Typography>

              {/* Mainnet Token */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'success.main', fontWeight: 600 }}>
                  🚀 Mainnet Token (Live)
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2 
                }}>
                  <Box>
                    <Typography variant="body2">
                      <strong>Token Name:</strong> $HAIR Token
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Token Symbol:</strong> HAIR
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Decimals:</strong> 18
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Total Supply:</strong> 1,000,000,000 HAIR
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Contract Address:</strong>{' '}
                      <MuiLink 
                        href="https://explorer.hemi.xyz/address/0x5B774f563C902FA7b203FB7029ed6eD4Ce274705"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        0x5B774f563C902FA7b203FB7029ed6eD4Ce274705
                      </MuiLink>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Network:</strong> Hemi Mainnet
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Testnet Token */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  🧪 Testnet Token
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2 
                }}>
                  <Box>
                    <Typography variant="body2">
                      <strong>Token Name:</strong> $HAIR Token
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Token Symbol:</strong> HAIR
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Decimals:</strong> 18
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Total Supply:</strong> 1,000,000,000 HAIR
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Contract Address:</strong>{' '}
                      <MuiLink 
                        href="https://testnet.explorer.hemi.xyz/address/0xa6Af91a69eee1E35887D5F229FA69f61021B36F3"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        0xa6Af91a69eee1E35887D5F229FA69f61021B36F3
                      </MuiLink>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Network:</strong> Hemi Sepolia Testnet
                    </Typography>
                  </Box>
                </Box>
              </Box>

            </Paper>
          </Box>
        )}

        {tab === 2 && (
          <Box
            sx={{
              opacity: tabFade ? 1 : 0,
              transform: tabFade ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
          >
            {/* Quick Actions */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                mb: 4,
                background: 'background.paper',
                backdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 4
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <SettingsIcon color="primary" />
                <Typography variant="h6">Quick Actions</Typography>
              </Box>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 2 
              }}>
                {[
                  // { 
                  //   icon: <SendIcon />, 
                  //   label: 'Send Tokens',
                  //   onClick: handleSendTokens
                  // },
                  { 
                    icon: <ShoppingCartIcon />, 
                    label: 'Buy More',
                    link: 'https://www.sushi.com/hemi/swap?token0=0x7A06C4AeF988e7925575C50261297a946aD204A8&token1=0x5B774f563C902FA7b203FB7029ed6eD4Ce274705&swapAmount='
                  },
                  { 
                    icon: <BoltIcon />, 
                    label: 'Provide Liquidity',
                    link: 'https://www.sushi.com/hemi/pool/v2/0x85218aa6cdc10b2300a74a712d12c7d849e530eb/add'
                  },
                  { 
                    icon: <OpenInNewIcon />, 
                    label: 'View Explorer',
                    link: 'https://explorer.hemi.xyz'
                  }
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    fullWidth
                    component={action.link ? 'a' : 'button'}
                    href={action.link}
                    target={action.link ? '_blank' : undefined}
                    rel={action.link ? 'noopener noreferrer' : undefined}
                    sx={{ 
                      height: 80, 
                      flexDirection: 'column',
                      gap: 1
                    }}
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Box>
        )}

        {tab === 3 && (
          <Box
            sx={{
              opacity: tabFade ? 1 : 0,
              transform: tabFade ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: 'background.paper',
                backdropFilter: 'blur(20px)', 
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 4
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Transaction History</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<RefreshIcon />}
                  onClick={loadTransactions}
                  disabled={isLoadingTransactions}
                >
                  Refresh
                </Button>
              </Box>

              <Tabs
                value={networkTab}
                onChange={(_e, val) => setNetworkTab(val)}
                sx={{ mb: 3 }}
              >
                <Tab label="Mainnet" />
                <Tab label="Testnet" />
              </Tabs>

              {isLoadingTransactions ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CircularProgress size={40} />
                  <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                    Loading transactions...
                  </Typography>
                </Box>
              ) : transactions.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                  <Typography variant="body1" fontStyle="italic">
                    No transactions found for this network.
                  </Typography>
                </Box>
              ) : (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Hash</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactions.map((tx) => (
                          <TableRow key={tx.hash}>
                            <TableCell>
                              <MuiLink 
                                href={`https://${networkTab === 0 ? '' : 'testnet.'}explorer.hemi.network/tx/${tx.hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ textDecoration: 'none' }}
                              >
                                {tx.hash.slice(0,8)}...{tx.hash.slice(-6)}
                              </MuiLink>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={tx.type}
                                color={tx.type === 'Received' ? 'success' : 'primary'}
                                size="small"
                                variant="outlined"
                                clickable={false}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography 
                                variant="body2" 
                                color={tx.type === 'Received' ? 'success.main' : 'primary.main'}
                                fontWeight="bold"
                              >
                                {tx.type === 'Received' ? '+' : '-'}{parseFloat(tx.value).toFixed(2)} HAIR
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={tx.status}
                                color={tx.status === 'Success' ? 'success' : 'error'}
                                size="small"
                                clickable={false}
                              />
                            </TableCell>
                            <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Paper>
          </Box>
        )}

        {/* {tab === 4 && (
          <Box
            sx={{
              opacity: tabFade ? 1 : 0,
              transform: tabFade ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
          >
            <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
              <Typography variant="h5" fontWeight={700}>NFT</Typography>
              <Typography variant="body1" fontStyle="italic">Coming soon...</Typography>
            </Box>
          </Box>
        )} */}

        {/* {tab === 5 && (
          <Box
            sx={{
              opacity: tabFade ? 1 : 0,
              transform: tabFade ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
          >
            <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
              <Typography variant="h5" fontWeight={700}>Swap</Typography>
              <Typography variant="body1" fontStyle="italic">Coming soon...</Typography>
            </Box>
          </Box>
        )} */}

        {/* {tab === 6 && (
          <Box
            sx={{
              opacity: tabFade ? 1 : 0,
              transform: tabFade ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
          >
            <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
              <Typography variant="h5" fontWeight={700}>Lottery</Typography>
              <Typography variant="body1" fontStyle="italic">Coming soon...</Typography>
            </Box>
          </Box>
        )} */}

        {formError && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {formError}
          </Alert>
        )}
      </Container>

      {/* Send Tokens Dialog */}
      <Dialog
        open={sendDialogOpen}
        onClose={handleCloseSendDialog}
        aria-labelledby="send-tokens-dialog-title"
        aria-describedby="send-tokens-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="send-tokens-dialog-title">
          Send HAIR Tokens
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Available Balance: {sendFormData.network === 'mainnet' 
                ? `${formatNumber(balances.hairMainnet)} HAIR (Mainnet)`
                : `${formatNumber(balances.hairTestnet)} HAIR (Testnet)`
              }
            </Typography>
          </Box>
          
          <TextField
            autoFocus
            margin="dense"
            id="toAddress"
            label="To Address"
            type="text"
            fullWidth
            placeholder="0x..."
            value={sendFormData.toAddress}
            onChange={(e) => setSendFormData({ ...sendFormData, toAddress: e.target.value })}
            error={sendFormData.toAddress !== '' && (sendFormData.toAddress.length !== 42 || !sendFormData.toAddress.startsWith('0x'))}
            helperText={sendFormData.toAddress !== '' && (sendFormData.toAddress.length !== 42 || !sendFormData.toAddress.startsWith('0x')) 
              ? 'Please enter a valid Ethereum address' 
              : ''
            }
          />
          
          <TextField
            margin="dense"
            id="amount"
            label="Amount (HAIR)"
            type="number"
            fullWidth
            placeholder="0.0"
            value={sendFormData.amount}
            onChange={(e) => setSendFormData({ ...sendFormData, amount: e.target.value })}
            error={sendFormData.amount !== '' && (parseFloat(sendFormData.amount) <= 0 || isNaN(parseFloat(sendFormData.amount)))}
            helperText={sendFormData.amount !== '' && (parseFloat(sendFormData.amount) <= 0 || isNaN(parseFloat(sendFormData.amount)))
              ? 'Please enter a valid amount'
              : ''
            }
          />
          
          <FormControl fullWidth margin="dense">
            <InputLabel id="network-label">Network</InputLabel>
            <Select
              labelId="network-label"
              id="network"
              value={sendFormData.network}
              label="Network"
              onChange={(e) => setSendFormData({ ...sendFormData, network: e.target.value })}
            >
              <MenuItem value="mainnet">Mainnet</MenuItem>
              <MenuItem value="testnet">Testnet</MenuItem>
            </Select>
          </FormControl>
          
          {formError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {formError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSendDialog} disabled={isSendingTokens}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendTokensSubmit} 
            disabled={isSendingTokens || 
              !sendFormData.toAddress || 
              !sendFormData.amount || 
              sendFormData.toAddress.length !== 42 || 
              !sendFormData.toAddress.startsWith('0x') ||
              parseFloat(sendFormData.amount) <= 0 ||
              isNaN(parseFloat(sendFormData.amount))
            }
            variant="contained"
            startIcon={isSendingTokens ? <CircularProgress size={20} /> : <SendIcon />}
            sx={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #FF8C42 0%, #FFB74D 100%)',
              }
            }}
          >
            {isSendingTokens ? 'Sending...' : 'Send Tokens'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 