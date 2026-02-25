import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Container, Typography, Box, Button } from '@mui/material'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import { AuthProvider, useAuth } from './context/AuthContext'

function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom color="primary" fontWeight="bold">
        Client Meeting App
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
        Welcome to your premium scheduling experience
      </Typography>
      
      {isAuthenticated ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Hello, {user?.name || user?.email}!
          </Typography>
          <Button variant="outlined" color="primary" onClick={logout} sx={{ mt: 2 }}>
            Log Out
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            href="/login"
            sx={{ mt: 2, px: 4, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
          >
            Get Started
          </Button>
        </Box>
      )}
    </Box>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
