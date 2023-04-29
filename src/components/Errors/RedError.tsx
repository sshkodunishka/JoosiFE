import React from 'react';
import { Box } from '@mui/material';

type Props = {
  message: string
}

const RedError: React.FC<Props> = ({message}) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      '& > div': {
        display: 'inline-block',
        margin: '20px auto',
        borderRadius: '4px',
        padding: '8px 15px',
        color: 'rgb(240, 45, 45)',
        fontWeight: 'bold',
        backgroundColor: 'rgba(240, 45, 45, 0.1)'
      }
    }}>
      <div>{message}</div>
    </Box>
  );
};

export default RedError;
