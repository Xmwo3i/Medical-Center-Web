import React from 'react'
import { Container, Typography, Box } from '@mui/material'

function Scans() {
  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>اسکن‌ها</Typography>
        <Typography sx={{ mt: 2 }}>صفحه اسکن‌ها در حال توسعه است...</Typography>
      </Container>
    </Box>
  )
}

export default Scans