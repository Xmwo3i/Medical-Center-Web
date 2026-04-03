import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box, Container, Typography, TextField, Button, Paper,
  InputAdornment, IconButton, Alert, CircularProgress, Divider
} from '@mui/material'
import { motion } from 'framer-motion'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '../hooks/useApi'
import { authApi } from '../services/api'

const MotionBox = motion(Box)

export default function Login() {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const { mutate: login, loading, error } = useMutation(authApi.login)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) return

    try {
      const result = await login({ username, password })
      // Store JWT token for subsequent authenticated requests
      if (result?.token) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
      }
      navigate('/')
    } catch {
      // error is already set in useMutation state
    }
  }

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px', background: '#f8f9fa',
      '&:hover fieldset': { borderColor: '#34A853' },
      '&.Mui-focused fieldset': { borderColor: '#0B6E4F', borderWidth: 2 }
    },
    '& input': { py: 1.8, fontSize: '1rem' }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0B6E4F 0%, #17a2a2 50%, #1976D2 100%)',
      position: 'relative', overflow: 'hidden' }}>

      {/* Animated orbs */}
      {[...Array(6)].map((_, i) => (
        <MotionBox key={i}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
          sx={{ position: 'absolute', width: 150 + i * 60, height: 150 + i * 60,
            borderRadius: '50%', background: `rgba(255,255,255,${0.04 - i * 0.005})`,
            filter: 'blur(40px)', pointerEvents: 'none',
            top: `${-10 + i * 20}%`, left: `${i * 18}%` }} />
      ))}

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

          <Paper elevation={0} sx={{ borderRadius: 6, overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,0.3)', direction: 'rtl' }}>

            {/* Header */}
            <Box sx={{ background: 'linear-gradient(135deg, #0B6E4F 0%, #1976D2 100%)',
              p: 5, textAlign: 'center' }}>
              <motion.div animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <AdminPanelSettingsIcon sx={{ fontSize: '4rem', color: '#fff', mb: 1 }} />
              </motion.div>
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 0.5 }}>
                {t('login.adminTitle')}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                {t('login.adminSubtitle')}
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 3, md: 5 } }}>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
                </motion.div>
              )}

              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 600 }}>
                {t('login.username')}
              </Typography>
              <TextField fullWidth placeholder={t('login.usernamePlaceholder')}
                value={username} onChange={e => setUsername(e.target.value)}
                disabled={loading} sx={{ ...inputSx, mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#0B6E4F' }} />
                    </InputAdornment>
                  )
                }} />

              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 600 }}>
                {t('login.password')}
              </Typography>
              <TextField fullWidth placeholder={t('login.passwordPlaceholder')}
                type={showPass ? 'text' : 'password'}
                value={password} onChange={e => setPassword(e.target.value)}
                disabled={loading} sx={{ ...inputSx, mb: 4 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#0B6E4F' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                        {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }} />

              <Button type="submit" fullWidth variant="contained" size="large"
                disabled={loading || !username || !password}
                sx={{ background: 'linear-gradient(135deg, #34A853 0%, #1976D2 100%)',
                  borderRadius: '14px', py: 1.8, fontSize: '1.1rem', fontWeight: 700,
                  boxShadow: '0 8px 25px rgba(52,168,83,0.35)',
                  '&:hover': { boxShadow: '0 12px 35px rgba(52,168,83,0.5)' },
                  '&:disabled': { background: '#ccc' } }}>
                {loading
                  ? <CircularProgress size={26} sx={{ color: '#fff' }} />
                  : t('login.loginToPanel')}
              </Button>

              <Divider sx={{ my: 3 }} />

              {/* Default credentials hint (remove in production) */}
              <Box sx={{ p: 2.5, background: '#f0f7ff', borderRadius: 3, border: '1px solid #e3f2fd' }}>
                <Typography variant="body2" sx={{ color: '#1976D2', fontWeight: 700, mb: 1 }}>
                  {t('login.devHint')}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', fontFamily: 'monospace' }}>
                  {t('login.username')}: admin
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', fontFamily: 'monospace' }}>
                  {t('login.password')}: Admin@123
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button variant="text" onClick={() => navigate('/')}
                  sx={{ color: '#888', '&:hover': { color: '#0B6E4F' } }}>
                  {t('login.backBtn')}
                </Button>
              </Box>
            </Box>
          </Paper>

          <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', mt: 3, fontSize: '0.85rem' }}>
            {t('login.restricted')}
          </Typography>
        </motion.div>
      </Container>
    </Box>
  )
}
