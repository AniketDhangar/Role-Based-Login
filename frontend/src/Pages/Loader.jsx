import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = ({ message = 'Loading...', size = 40 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: Add a background overlay to make the loader stand out
        zIndex: 1000,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <CircularProgress size={size} sx={{ marginBottom: 2 }} />
      <Typography variant="h6" sx={{ color: '#1976d2' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
