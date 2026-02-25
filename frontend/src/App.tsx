import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import PublicBookingPage from './pages/PublicBooking/PublicBookingPage'
import { AuthProvider, useAuth } from './context/AuthContext'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function Home() {
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
  )
}

// Helper to use RouterLink with MUI Button
import { Link as RouterLink } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/book/:token" element={<PublicBookingPage />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
