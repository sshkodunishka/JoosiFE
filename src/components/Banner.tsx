import React from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
  appName: string;
  token: string | null;
};

const Banner: React.FC<Props> = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <Box
      sx={{
        bgcolor: '#5cb85c',
        color: '#fff',
        py: 2,
        '& h1': {
          fontSize: 32,
          fontWeight: 'bold',
          mb: 0,
        },
        '& p': {
          fontSize: 18,
          mb: 0,
        },
      }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        <Typography
          variant='h1'
          sx={{ fontFamily: 'inherit' }}>
          {appName.toLowerCase()}
        </Typography>
        <Typography
          variant='body1'
          sx={{ fontFamily: 'inherit' }}>
          A place to share your knowledge.
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
