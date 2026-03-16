import React, { useState, useEffect } from 'react'
import {
  Box, Container, Grid, Typography, Card, CardContent,
  Chip, Button, TextField, InputAdornment, Dialog,
  DialogContent, Divider, IconButton, Paper
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PageLoader, PageError, CardSkeleton } from '../components/ApiStates'
import { useApi } from '../hooks/useApi'
import { scanApi } from '../services/api'

const MotionCard = motion(Card)
const MotionBox = motion(Box)

// Colour palette keyed by category — used when the API doesn't return colour info
const CATEGORY_STYLE = {
  'قلب و عروق':          { color: '#FF6B6B', gradient: 'linear-gradient(135deg,#FF6B6B,#EE5A5A)', emoji: '❤️' },
  'استخوان و مفاصل':     { color: '#4ECDC4', gradient: 'linear-gradient(135deg,#4ECDC4,#44A08D)', emoji: '🦴' },
  'کلیه و مجاری ادراری': { color: '#95E1D3', gradient: 'linear-gradient(135deg,#95E1D3,#68C9BA)', emoji: '🫘' },
  'غدد درون‌ریز':        { color: '#F38181', gradient: 'linear-gradient(135deg,#F38181,#E86F6F)', emoji: '🦋' },
  'ریه و تنفس':          { color: '#A8E6CF', gradient: 'linear-gradient(135deg,#A8E6CF,#7BD4B5)', emoji: '🫁' },
  'کبد و صفرا':          { color: '#FFD93D', gradient: 'linear-gradient(135deg,#FFD93D,#E8C534)', emoji: '🫀' },
  'مغز و اعصاب':         { color: '#6BCF7F', gradient: 'linear-gradient(135deg,#6BCF7F,#4CAF50)', emoji: '🧠' },
  'آنکولوژی':            { color: '#B4A7D6', gradient: 'linear-gradient(135deg,#B4A7D6,#9575CD)', emoji: '☢️' },
}
const DEFAULT_STYLE = { color: '#0B6E4F', gradient: 'linear-gradient(135deg,#0B6E4F,#1976D2)', emoji: '🔬' }

const styleFor = (scan) => CATEGORY_STYLE[scan.category] ?? DEFAULT_STYLE

const ALL_CATEGORIES = ['همه', ...Object.keys(CATEGORY_STYLE)]

// ─── Detail Dialog ─────────────────────────────────────────────────────────────
const ScanDetailDialog = ({ scan, open, onClose }) => {
  if (!scan) return null
  const { color, gradient, emoji } = styleFor(scan)

  // preparation_info and procedure_info come from the DB as plain text
  const preparations = scan.preparation_info
    ? scan.preparation_info.split('\n').filter(Boolean)
    : []

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden', direction: 'rtl' } }}>
      <Box sx={{ background: gradient, p: 4, position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, left: 16, color: '#fff' }}>
          <CloseIcon />
        </IconButton>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '4rem', mb: 1 }}>{emoji}</Typography>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800 }}>{scan.title}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            {scan.category && (
              <Chip label={scan.category}
                sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600 }} />
            )}
            {scan.duration && (
              <Chip icon={<AccessTimeIcon sx={{ color: '#fff !important' }} />} label={scan.duration}
                sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600 }} />
            )}
            {scan.price && (
              <Chip label={`${Number(scan.price).toLocaleString('fa')} تومان`}
                sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600 }} />
            )}
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        {/* About */}
        {scan.full_content && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>درباره این اسکن</Typography>
            <Typography sx={{ color: '#555', lineHeight: 2, mb: 3 }}>{scan.full_content}</Typography>
            <Divider sx={{ mb: 3 }} />
          </>
        )}

        {/* Preparations */}
        {preparations.length > 0 && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoOutlinedIcon sx={{ color }} /> آمادگی قبل از اسکن
            </Typography>
            <Box sx={{ mb: 3 }}>
              {preparations.map((prep, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                  <CheckCircleIcon sx={{ color, mt: 0.2, flexShrink: 0 }} />
                  <Typography sx={{ color: '#555', lineHeight: 1.8 }}>{prep}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ mb: 3 }} />
          </>
        )}

        {/* Procedure */}
        {scan.procedure_info && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>نحوه انجام اسکن</Typography>
            <Paper sx={{ p: 3, background: `${color}10`, borderRadius: 3, border: `1px solid ${color}30` }}>
              <Typography sx={{ color: '#444', lineHeight: 2 }}>{scan.procedure_info}</Typography>
            </Paper>
          </>
        )}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" size="large"
            sx={{ background: gradient, borderRadius: '50px', px: 5, py: 1.5, fontWeight: 700,
              boxShadow: `0 8px 25px ${color}50` }}>
            رزرو نوبت
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Scans() {
  const { type } = useParams()                        // e.g. /scans/heart → 'heart'

  const [search, setSearch]           = useState('')
  const [activeCategory, setCategory] = useState('همه')
  const [page, setPage]               = useState(1)
  const [selectedScan, setSelected]   = useState(null)
  const [dialogOpen, setDialogOpen]   = useState(false)

  // If navigated from a navbar sub-link like /scans/heart, map the slug to a
  // category label and pre-select it once on mount
  const TYPE_TO_CATEGORY = {
    heart:   'قلب و عروق',
    bone:    'استخوان و مفاصل',
    kidney:  'کلیه و مجاری ادراری',
    thyroid: 'غدد درون‌ریز',
    lung:    'ریه و تنفس',
    liver:   'کبد و صفرا',
    brain:   'مغز و اعصاب',
    pet:     'آنکولوژی',
  }
  useEffect(() => {
    if (type && TYPE_TO_CATEGORY[type]) {
      setCategory(TYPE_TO_CATEGORY[type])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const { data, loading, error, refetch } = useApi(
    () => {
      const p = { page, limit: 12 }
      if (search)                    p.search   = search
      if (activeCategory !== 'همه') p.category = activeCategory
      return scanApi.getAll(p)
    },
    [page, search, activeCategory]
  )

  const scans      = data?.data        ?? []
  const pagination = data?.pagination  ?? {}

  const openScan = (scan) => { setSelected(scan); setDialogOpen(true) }

  // Reset to page 1 whenever filters change
  const handleSearch   = (v) => { setSearch(v);   setPage(1) }
  const handleCategory = (v) => { setCategory(v); setPage(1) }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      {/* Hero */}
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: 8,
        background: 'linear-gradient(135deg, #0B6E4F 0%, #17a2a2 50%, #1976D2 100%)',
        position: 'relative', overflow: 'hidden' }}>
        {[...Array(4)].map((_, i) => (
          <MotionBox key={i}
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
            sx={{ position: 'absolute', width: 150 + i * 60, height: 150 + i * 60,
              borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
              top: `${10 + i * 15}%`, left: `${5 + i * 22}%`, pointerEvents: 'none' }} />
        ))}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
              انواع اسکن‌های هسته‌ای
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem',
              maxWidth: 550, mx: 'auto', mb: 5 }}>
              روی هر کارت کلیک کنید تا اطلاعات کامل، نحوه آمادگی و روش انجام را ببینید
            </Typography>
            <Box sx={{ maxWidth: 500, mx: 'auto' }}>
              <TextField fullWidth placeholder="جستجو در اسکن‌ها..." value={search}
                onChange={e => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0B6E4F' }} /></InputAdornment>,
                  sx: { background: '#fff', borderRadius: '50px',
                    '& fieldset': { border: 'none' }, '& input': { py: 1.8 } }
                }} />
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Category chips */}
        <Box sx={{ mb: 5, display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
          {ALL_CATEGORIES.map(cat => (
            <motion.div key={cat} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Chip label={cat} onClick={() => handleCategory(cat)} clickable
                sx={{ px: 1, py: 2.5, fontWeight: 600, fontSize: '0.88rem',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #0B6E4F, #1976D2)' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#555',
                  boxShadow: activeCategory === cat
                    ? '0 4px 15px rgba(11,110,79,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                  border: activeCategory === cat ? 'none' : '1px solid #e0e0e0',
                  transition: 'all 0.3s ease' }} />
            </motion.div>
          ))}
        </Box>

        {/* Content */}
        {loading ? (
          <CardSkeleton count={8} />
        ) : error ? (
          <PageError error={error} onRetry={refetch} />
        ) : (
          <>
            {pagination.total !== undefined && (
              <Typography sx={{ color: '#888', mb: 4, textAlign: 'center' }}>
                {pagination.total} اسکن یافت شد
              </Typography>
            )}

            <AnimatePresence mode="wait">
              <Grid container spacing={3}>
                {scans.map((scan, index) => {
                  const { color, gradient, emoji } = styleFor(scan)
                  return (
                    <Grid item xs={12} sm={6} md={3} key={scan.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: index * 0.06 }} layout>
                        <MotionCard onClick={() => openScan(scan)}
                          whileHover={{ y: -12 }} whileTap={{ scale: 0.98 }}
                          sx={{ borderRadius: 4, cursor: 'pointer', overflow: 'hidden',
                            border: '2px solid transparent', transition: 'all 0.3s',
                            '&:hover': { borderColor: color },
                            boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                          <Box sx={{ height: 6, background: gradient }} />
                          <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            <Typography sx={{ fontSize: '3rem', mb: 1.5 }}>{emoji}</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                              {scan.title}
                            </Typography>
                            <Typography sx={{ fontSize: '0.8rem', color, fontWeight: 600, mb: 1.5 }}>
                              {scan.category}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
                              {scan.description}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                              {scan.category && (
                                <Chip label={scan.category} size="small"
                                  sx={{ background: `${color}15`, color, fontWeight: 600, fontSize: '0.75rem' }} />
                              )}
                              {scan.duration && (
                                <Chip
                                  icon={<AccessTimeIcon sx={{ fontSize: '0.9rem !important' }} />}
                                  label={scan.duration} size="small"
                                  sx={{ background: '#f5f5f5', color: '#666', fontSize: '0.75rem' }} />
                              )}
                            </Box>
                            <Button fullWidth variant="outlined" size="small"
                              sx={{ mt: 2, borderColor: color, color, borderRadius: '20px',
                                fontWeight: 600, '&:hover': { background: `${color}10` } }}>
                              اطلاعات بیشتر
                            </Button>
                          </CardContent>
                        </MotionCard>
                      </motion.div>
                    </Grid>
                  )
                })}
              </Grid>
            </AnimatePresence>

            {scans.length === 0 && !loading && (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography sx={{ fontSize: '4rem', mb: 2 }}>🔍</Typography>
                <Typography variant="h6" sx={{ color: '#888' }}>نتیجه‌ای یافت نشد</Typography>
              </Box>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 6 }}>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                  <Button key={p} onClick={() => setPage(p)} variant={p === page ? 'contained' : 'outlined'}
                    sx={{ minWidth: 42, borderRadius: 2,
                      ...(p === page
                        ? { background: 'linear-gradient(135deg,#0B6E4F,#1976D2)', border: 'none' }
                        : { borderColor: '#ddd', color: '#555' }) }}>
                    {p}
                  </Button>
                ))}
              </Box>
            )}
          </>
        )}
      </Container>

      {/* CTA Banner */}
      <Box sx={{ background: 'linear-gradient(135deg, #0B6E4F 0%, #1976D2 100%)', py: 8, mt: 4 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 2 }}>
            برای رزرو نوبت تماس بگیرید
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, fontSize: '1.1rem' }}>
            تیم متخصص ما آماده پاسخگویی و راهنمایی شما است
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large"
              sx={{ background: '#fff', color: '#0B6E4F', borderRadius: '50px', px: 5, py: 1.5,
                fontWeight: 700, '&:hover': { background: '#E6F4EA' } }}>
              📞 تماس با ما
            </Button>
            <Button variant="outlined" size="large"
              sx={{ borderColor: '#fff', borderWidth: 2, color: '#fff', borderRadius: '50px', px: 5, py: 1.5,
                fontWeight: 700, '&:hover': { background: 'rgba(255,255,255,0.1)', borderWidth: 2 } }}>
              رزرو آنلاین
            </Button>
          </Box>
        </Container>
      </Box>

      <ScanDetailDialog scan={selectedScan} open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <Footer />
    </Box>
  )
}
