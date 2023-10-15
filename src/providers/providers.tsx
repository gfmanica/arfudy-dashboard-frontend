'use client';

import { Montserrat, Noto_Serif_HK } from 'next/font/google';

import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

const montserrat = Montserrat({ subsets: ['latin'] });
const notoSerif = Noto_Serif_HK({ subsets: ['latin'] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
    h1: {
      fontFamily: notoSerif.style.fontStyle,
    },
    h2: {
      fontFamily: notoSerif.style.fontStyle,
    },
    h3: {
      fontFamily: notoSerif.style.fontStyle,
    },
  },
  palette: {
    primary: {
      light: '#FFAF1A',
      main: '#BC7A00',
      dark: '#6F4900',
    },
    secondary: {
      light: '#AFC6FF',
      main: '#0053BD',
      dark: '#003271',
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#AFC6FF',
          borderRadius: '8px',
          border: '2px solid #003271',
          color: '#003271',
          '&.Mui-focused': {
            backgroundColor: '#AFC6FF',
            borderColor: '#BC7A00',
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
            color: '#003271',

            ':hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
            },
          },
          ':hover': {
            backgroundColor: '#c0d1fd',
          },
          '::after': {
            content: 'unset', // This will remove the "after" styling
          },
          '::before': {
            content: 'unset', // This will remove the "after" styling
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: { color: '#fff' },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          '&.Mui-error': { color: 'white' },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#003271',

          '&.Mui-error': {
            color: '#003271',
          },
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
