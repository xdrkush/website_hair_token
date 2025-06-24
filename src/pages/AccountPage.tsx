import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Container,
  Link as MuiLink,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import useRainbowKitWalletContext from '../contexts/RainbowKitWalletContext';
import { formatAddress, formatNumber } from '../lib/utils';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import BoltIcon from '@mui/icons-material/Bolt';
import SecurityIcon from '@mui/icons-material/Security';
import SendIcon from '@mui/icons-material/Send';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useState, useEffect } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function AccountPage() {
  const {
    isConnected,
    address,
    balances,
    isOnHemiNetwork,
    switchToHemiNetwork,
    isSwitchingNetwork,
    sendTokens,
    isSendingTokens,
    fetchTransactionsByNetwork
  } = useRainbowKitWalletContext();

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  interface Transaction {
    hash: string;
    type: string;
    value: string;
    status: string;
    date: string;
  }

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

  const loadTransactions = async () => {
    if (!address) {
      return;
    }
    
    setIsLoadingTransactions(true);
    try {
      const networkType = networkTab === 0 ? 'mainnet' : 'testnet';
      const txData = await fetchTransactionsByNetwork(address, networkType);
      setTransactions(txData);
    } catch (error) {
      console.error('Error loading transactions:', error);
      setTransactions([]);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [networkTab, address]);

  // Si pas connecté, afficher la page de connexion
  if (!isConnected) {
    return (
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: 'primary.main' }}>
            My Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connect your wallet to access your $HAIR account
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <ConnectButton
                chainStatus="icon"
                showBalance={false}
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'full',
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: 'primary.main' }}>
          My Account
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your $HAIR tokens and view your transaction history
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider', 
        mb: 3, 
        display: 'flex', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <Tabs 
          value={tab} 
          onChange={handleTabChange} 
          aria-label="account tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-scrollButtons': {
              '&.Mui-disabled': {
                opacity: 0.3,
              },
              display: { xs: 'flex', md: 'none' },
            },
            '& .MuiTab-root': {
              minWidth: 'auto',
              padding: { xs: '12px 16px', md: '12px 24px' },
              fontSize: { xs: '14px', md: '16px' },
            },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Network Info" />
          <Tab label="Quick Actions" />
          <Tab label="Transaction History" />
        </Tabs>
      </Box>

      {/* Tab Content */}
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
                {isOnHemiNetwork ? "Hemi Network" : "Wrong Network"}
              </Box>
            </Box>

            <Box sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Address
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1" fontFamily="monospace">
                  {formatAddress(address)}
                </Typography>
                <IconButton size="small" sx={{ p: 0.5 }}>
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {!isOnHemiNetwork && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                You're not on the Hemi Network. Switch to Hemi Network to interact with $HAIR tokens.
              </Alert>
            )}

            {!isOnHemiNetwork && (
              <Button
                variant="contained"
                onClick={switchToHemiNetwork}
                disabled={isSwitchingNetwork}
                startIcon={isSwitchingNetwork ? <CircularProgress size={16} /> : <BoltIcon />}
                sx={{ mb: 2 }}
              >
                {isSwitchingNetwork ? 'Switching...' : 'Switch to Hemi Network'}
              </Button>
            )}
          </Paper>

          {/* Balances */}
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
              <CurrencyBitcoinIcon color="primary" />
              <Typography variant="h6">Token Balances</Typography>
            </Box>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3 
            }}>
              {/* ETH Balance */}
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  ETH Balance
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {formatNumber(parseFloat(balances.eth))}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hemi Mainnet
                </Typography>
              </Box>

              {/* HAIR Mainnet */}
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  $HAIR Mainnet
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {formatNumber(parseFloat(balances.hairMainnet))}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hemi Mainnet
                </Typography>
              </Box>

              {/* HAIR Balance */}
              <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  $HAIR Points Balance
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {formatNumber(parseFloat(balances.hairTestnet))}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hemi Testnet
                </Typography>
              </Box>
            </Box>
          </Paper>
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
              mb: 4,
              background: 'background.paper',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: 4
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <SecurityIcon color="primary" />
              <Typography variant="h6">Network Information</Typography>
            </Box>

            {/* Mainnet Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                🌐 Mainnet
              </Typography>

              {/* Mainnet Network Info */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Network Information
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
                      <strong>Chain ID:</strong> 43111
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

              {/* Mainnet Token Info */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Token Information
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2 
                }}>
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
                        {formatAddress("0x5B774f563C902FA7b203FB7029ed6eD4Ce274705")}
                      </MuiLink>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Token:</strong> $HAIR Mainnet
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
                </Box>
              </Box>
            </Box>

            {/* Testnet Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                🧪 Testnet
              </Typography>
              
              {/* Testnet Network Info */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Network Information
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

              {/* Testnet Token Info */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Token Information
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2 
                }}>
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
                        {formatAddress("0xa6Af91a69eee1E35887D5F229FA69f61021B36F3")}
                      </MuiLink>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Token:</strong> $HAIR Testnet
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
                              href={`https://${networkTab === 0 ? 'explorer.hemi.xyz' : 'testnet.explorer.hemi.xyz'}/tx/${tx.hash}`}
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

      {/* Send Tokens Dialog */}
      <Dialog open={sendDialogOpen} onClose={handleCloseSendDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Send $HAIR Tokens</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="To Address"
              value={sendFormData.toAddress}
              onChange={(e) => setSendFormData({ ...sendFormData, toAddress: e.target.value })}
              placeholder="0x..."
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={sendFormData.amount}
              onChange={(e) => setSendFormData({ ...sendFormData, amount: e.target.value })}
              placeholder="0.0"
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Network</InputLabel>
              <Select
                value={sendFormData.network}
                label="Network"
                onChange={(e) => setSendFormData({ ...sendFormData, network: e.target.value })}
              >
                <MenuItem value="mainnet">Hemi Mainnet</MenuItem>
                <MenuItem value="testnet">Hemi Testnet</MenuItem>
              </Select>
            </FormControl>
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSendDialog}>Cancel</Button>
          <Button 
            onClick={handleSendTokensSubmit} 
            variant="contained"
            disabled={isSendingTokens}
            startIcon={isSendingTokens ? <CircularProgress size={16} /> : <SendIcon />}
          >
            {isSendingTokens ? 'Sending...' : 'Send Tokens'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 