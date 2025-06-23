import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container 
        component="main" 
        maxWidth="xl" 
        sx={{ 
          flexGrow: 1,
          py: isMobile ? 2 : 4,
          px: isMobile ? 2 : 4,
          mt: { xs: 8, sm: 9 } // Add margin top to account for fixed navbar
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 