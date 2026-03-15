import React from 'react'
import { Container, Typography, Box } from '@mui/material'

function About() {
  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>درباره ما</Typography>
        <Typography sx={{ mt: 2 }}>
          مرکز پزشکی هسته‌ای کاسپین از سال 1379 فعالیت خود را آغاز کرده است.
        </Typography>
      </Container>
    </Box>
  )
}

export default About