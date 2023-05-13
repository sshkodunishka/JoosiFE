import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Observer>
      {() => (
        <Box
          bgcolor={'primary.main'}
          color={'primary.contrastText'}
          sx={{
            width: '100%',
            height: '65px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Kristina Shkoda @2023
        </Box>
      )}
    </Observer>
  );
};

export default Footer;
