import React from 'react'
import { Box, Typography, Button, Skeleton, Grid } from '@mui/material'
import { motion } from 'framer-motion'

// ─── Full-page centered spinner ───────────────────────────────────────────────
export const PageLoader = ({ message = 'در حال بارگذاری...' }) => (
  <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 3 }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
      <Box sx={{ width: 56, height: 56, borderRadius: '50%',
        border: '4px solid #E6F4EA',
        borderTop: '4px solid #0B6E4F' }} />
    </motion.div>
    <Typography sx={{ color: '#888', fontSize: '1rem' }}>{message}</Typography>
  </Box>
)

// ─── Error state with retry button ────────────────────────────────────────────
export const PageError = ({ error, onRetry }) => (
  <Box sx={{ minHeight: '50vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 2, px: 3 }}>
    <Typography sx={{ fontSize: '4rem' }}>⚠️</Typography>
    <Typography variant="h6" sx={{ color: '#444', fontWeight: 700 }}>خطا در بارگذاری</Typography>
    <Typography sx={{ color: '#888', textAlign: 'center', maxWidth: 400 }}>{error}</Typography>
    {onRetry && (
      <Button variant="contained" onClick={onRetry}
        sx={{ mt: 1, background: 'linear-gradient(135deg, #0B6E4F, #1976D2)',
          borderRadius: '50px', px: 4 }}>
        تلاش مجدد
      </Button>
    )}
  </Box>
)

// ─── Card skeleton for scan/article grids ─────────────────────────────────────
export const CardSkeleton = ({ count = 8, cols = { xs: 12, sm: 6, md: 3 } }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid item key={i} {...cols}>
        <Box sx={{ borderRadius: 4, overflow: 'hidden', background: '#fff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <Skeleton variant="rectangular" height={6} sx={{ background: '#e0e0e0' }} />
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Skeleton variant="circular" width={56} height={56} />
            </Box>
            <Skeleton variant="text" height={28} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={18} width="60%" sx={{ mx: 'auto', mb: 1.5 }} />
            <Skeleton variant="text" height={16} />
            <Skeleton variant="text" height={16} />
            <Skeleton variant="text" height={16} width="80%" />
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
)

// ─── Article list skeleton ────────────────────────────────────────────────────
export const ArticleSkeleton = ({ count = 6 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <Box sx={{ borderRadius: 4, overflow: 'hidden', background: '#fff',
          boxShadow: '0 4px 15px rgba(0,0,0,0.07)', p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Skeleton variant="circular" width={44} height={44} />
            <Skeleton variant="rounded" width={80} height={26} sx={{ borderRadius: '50px' }} />
          </Box>
          <Skeleton variant="text" height={28} sx={{ mb: 1 }} />
          <Skeleton variant="text" height={28} width="75%" sx={{ mb: 2 }} />
          <Skeleton variant="text" height={16} />
          <Skeleton variant="text" height={16} />
          <Skeleton variant="text" height={16} width="60%" sx={{ mb: 2 }} />
          <Skeleton variant="text" height={1} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton variant="text" width={90} height={16} />
            <Skeleton variant="text" width={60} height={16} />
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
)
