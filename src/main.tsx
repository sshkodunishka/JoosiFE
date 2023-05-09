import React from 'react';
import ReactDOM from 'react-dom/client';
import 'typeface-roboto';
import './index.css';
import App from './App';
import { StoreProvider } from './store';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ab47bc', // change this to the desired color
      // main: '#ce93d8', // change this to the desired color
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: 'inherit',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>
);
