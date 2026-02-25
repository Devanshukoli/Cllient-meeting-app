import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useLoginMutation } from '../../hooks/useAuthMutation';

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const loginMutation = useLoginMutation();

  const onSubmit = (data: any) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const error = loginMutation.error ? (loginMutation.error as any).response?.errors?.[0]?.message || 'Login failed. Please check your credentials.' : null;

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%',
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" color="primary" gutterBottom fontWeight="bold">
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Log in to manage your meetings
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loginMutation.isPending}
            sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 'bold' }}
          >
            {loginMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
