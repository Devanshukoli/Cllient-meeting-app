import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box sx={{ my: 8, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom color="primary" fontWeight="bold">
        Client Meeting App
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
        Your premium scheduling experience starts here
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          component={RouterLink}
          to="/login"
          sx={{ mr: 2, px: 4, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
        >
          Login
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          size="large" 
          component={RouterLink}
          to="/register"
          sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
