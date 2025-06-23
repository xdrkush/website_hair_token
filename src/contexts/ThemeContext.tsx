import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material/styles';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#FF6B35',
            light: '#FF8C42',
            dark: '#E55A2B',
          },
          secondary: {
            main: '#FF8C42',
            light: '#FFB74D',
            dark: '#E55A2B',
          },
          background: {
            default: mode === 'light' ? '#FAFAFA' : '#0F0F17',
            paper: mode === 'light' ? '#FFFFFF' : '#1F1F2E',
          },
          text: {
            primary: mode === 'light' ? '#0F0F17' : '#FAFAFA',
            secondary: mode === 'light' ? '#6B7280' : '#F3F4F6',
          },
          grey: {
            50: '#F3F4F6',
            100: '#E5E7EB',
            200: '#D1D5DB',
            300: '#9CA3AF',
            400: '#6B7280',
            500: '#4B5563',
            600: '#374151',
            700: '#1F2937',
            800: '#111827',
            900: '#0F0F17',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: mode === 'light' ? '#0F0F17' : '#FAFAFA',
          },
          h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: mode === 'light' ? '#0F0F17' : '#FAFAFA',
          },
          h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            color: mode === 'light' ? '#0F0F17' : '#FAFAFA',
          },
          h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: mode === 'light' ? '#0F0F17' : '#FAFAFA',
          },
          h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            color: mode === 'light' ? '#0F0F17' : '#FAFAFA',
          },
          h6: {
            fontSize: '1rem',
            fontWeight: 600,
            color: mode === 'light' ? '#0F0F17' : '#FAFAFA',
          },
          body1: {
            fontSize: '1rem',
            color: mode === 'light' ? '#6B7280' : '#F3F4F6',
          },
          body2: {
            fontSize: '0.875rem',
            color: mode === 'light' ? '#6B7280' : '#F3F4F6',
          },
          button: {
            textTransform: 'none',
            fontWeight: 700,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontWeight: 700,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4)',
                },
                '&:active': {
                  transform: 'translateY(0) scale(0.98)',
                },
              },
              containedPrimary: {
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
                boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF8C42 0%, #FFB74D 100%)',
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 15, 23, 0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: '3px solid #FF6B35',
                boxShadow: '0 4px 6px -1px rgba(255, 107, 53, 0.1)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                background: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 15, 23, 0.9)',
                backdropFilter: 'blur(20px)',
                border: mode === 'light' 
                  ? '1px solid rgba(255, 107, 53, 0.2)'
                  : '1px solid rgba(255, 107, 53, 0.3)',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 25px -5px rgba(255, 107, 53, 0.1)',
                  borderColor: '#FF6B35',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                background: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 15, 23, 0.9)',
                backdropFilter: 'blur(20px)',
                border: mode === 'light' 
                  ? '1px solid rgba(255, 107, 53, 0.2)'
                  : '1px solid rgba(255, 107, 53, 0.3)',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 25px -5px rgba(255, 107, 53, 0.1)',
                  borderColor: '#FF6B35',
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#FF6B35',
                  },
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                },
              },
            },
          },
        },
        shape: {
          borderRadius: 12,
        },
        shadows: [
          'none',
          '0 1px 2px 0 rgba(255, 107, 53, 0.05)',
          '0 4px 6px -1px rgba(255, 107, 53, 0.1)',
          '0 10px 15px -3px rgba(255, 107, 53, 0.1)',
          '0 20px 25px -5px rgba(255, 107, 53, 0.1)',
          '0 25px 30px -5px rgba(255, 107, 53, 0.1)',
          '0 30px 35px -5px rgba(255, 107, 53, 0.1)',
          '0 35px 40px -5px rgba(255, 107, 53, 0.1)',
          '0 40px 45px -5px rgba(255, 107, 53, 0.1)',
          '0 45px 50px -5px rgba(255, 107, 53, 0.1)',
          '0 50px 55px -5px rgba(255, 107, 53, 0.1)',
          '0 55px 60px -5px rgba(255, 107, 53, 0.1)',
          '0 60px 65px -5px rgba(255, 107, 53, 0.1)',
          '0 65px 70px -5px rgba(255, 107, 53, 0.1)',
          '0 70px 75px -5px rgba(255, 107, 53, 0.1)',
          '0 75px 80px -5px rgba(255, 107, 53, 0.1)',
          '0 80px 85px -5px rgba(255, 107, 53, 0.1)',
          '0 85px 90px -5px rgba(255, 107, 53, 0.1)',
          '0 90px 95px -5px rgba(255, 107, 53, 0.1)',
          '0 95px 100px -5px rgba(255, 107, 53, 0.1)',
          '0 100px 105px -5px rgba(255, 107, 53, 0.1)',
          '0 105px 110px -5px rgba(255, 107, 53, 0.1)',
          '0 110px 115px -5px rgba(255, 107, 53, 0.1)',
          '0 115px 120px -5px rgba(255, 107, 53, 0.1)',
          '0 120px 125px -5px rgba(255, 107, 53, 0.1)',
        ],
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 