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
import { useRegisterMutation } from '../../hooks/useAuthMutation';

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const registerMutation = useRegisterMutation();

  const password = watch('password');

  const onSubmit = (data: any) => {
    registerMutation.mutate({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };

  const error = registerMutation.error ? (registerMutation.error as any).response?.errors?.[0]?.message || 'Registration failed. Please try again.' : null;

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
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Join us today to start scheduling meetings
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Full Name"
            autoComplete="name"
            autoFocus
            {...register('name')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } 
            })}
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
            autoComplete="new-password"
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message as string}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={registerMutation.isPending}
            sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 'bold' }}
          >
            {registerMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Log In"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
