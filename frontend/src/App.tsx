import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container, Typography, Box, Button } from '@mui/material'

function Home() {
  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom color="primary">
        Client Meeting App
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Welcome to your premium scheduling experience
      </Typography>
      <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
        Get Started
      </Button>
    </Box>
  )
}

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here */}
        </Routes>
      </Container>
    </Router>
  )
}

export default App
