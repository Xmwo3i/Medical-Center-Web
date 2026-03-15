import React from 'react'
import { Container, Typography, Box } from '@mui/material'

function Login() {
  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>ورود ادمین</Typography>
        <Typography sx={{ mt: 2 }}>صفحه ورود در حال توسعه است...</Typography>
      </Container>
    </Box>
  )
}

export default Login