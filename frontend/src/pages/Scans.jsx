import React, { useState, useEffect } from 'react'
import {
  Box, Container, Grid, Typography, Card, CardContent,
  Chip, Button, TextField, InputAdornment, Dialog,
  DialogContent, Divider, IconButton, Paper
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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

// Category keys in Persian (used for API filtering — must match DB values)
const CATEGORY_STYLE = {
  'قلب و عروق':          { color: '#FF6B6B', gradient: 'linear-gradient(135deg,#FF6B6B,#EE5A5A)', emoji: '❤️', key: 'heart' },
  'استخوان و مفاصل':     { color: '#4ECDC4', gradient: 'linear-gradient(135deg,#4ECDC4,#44A08D)', emoji: '🦴', key: 'bone' },
  'کلیه و مجاری ادراری': { color: '#95E1D3', gradient: 'linear-gradient(135deg,#95E1D3,#68C9BA)', emoji: '🫘', key: 'kidney' },
  'غدد درون‌ریز':        { color: '#F38181', gradient: 'linear-gradient(135deg,#F38181,#E86F6F)', emoji: '🦋', key: 'thyroid' },
  'ریه و تنفس':          { color: '#A8E6CF', gradient: 'linear-gradient(135deg,#A8E6CF,#7BD4B5)', emoji: '🫁', key: 'lung' },
  'کبد و صفرا':          { color: '#FFD93D', gradient: 'linear-gradient(135deg,#FFD93D,#E8C534)', emoji: '🫀', key: 'liver' },
  'مغز و اعصاب':         { color: '#6BCF7F', gradient: 'linear-gradient(135deg,#6BCF7F,#4CAF50)', emoji: '🧠', key: 'brain' },
  'آنکولوژی':            { color: '#B4A7D6', gradient: 'linear-gradient(135deg,#B4A7D6,#9575CD)', emoji: '☢️', key: 'oncology' },
}
const DEFAULT_STYLE = { color: '#0B6E4F', gradient: 'linear-gradient(135deg,#0B6E4F,#1976D2)', emoji: '🔬' }
const styleFor = (scan) => CATEGORY_STYLE[scan.category] ?? DEFAULT_STYLE

// English labels for categories
const CATEGORY_EN = {
  'قلب و عروق':          'Cardiovascular',
  'استخوان و مفاصل':     'Bone & Joints',
  'کلیه و مجاری ادراری': 'Kidney & Urinary',
  'غدد درون‌ریز':        'Endocrine',
  'ریه و تنفس':          'Lung & Respiratory',
  'کبد و صفرا':          'Liver & Biliary',
  'مغز و اعصاب':         'Brain & Neurology',
  'آنکولوژی':            'Oncology',
}

// ─── Scan Detail Dialog ───────────────────────────────────────────────────────
function ScanDialog({ scan, open, onClose }) {
  const { t, i18n } = useTranslation()
  if (!scan) return null
  const { color, gradient, emoji } = styleFor(scan)
  const isEN = i18n.language === 'en'
  const catLabel = isEN ? (CATEGORY_EN[scan.category] ?? scan.category) : scan.category

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { borderRadius: 4, direction: i18n.language === 'fa' ? 'rtl' : 'ltr', overflow: 'hidden' } }}>
      <Box sx={{ background: gradient, p: 4, position: 'relative' }}>
        <IconButton onClick={onClose}
          sx={{ position: 'absolute', top: 16, left: 16, color: '#fff',
            background: 'rgba(255,255,255,0.15)' }}>
          <CloseIcon />
        </IconButton>
        <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>{emoji}</Typography>
        <Chip label={catLabel}
          sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600, mb: 1.5 }} />
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800 }}>
          {isEN && scan.title_en ? scan.title_en : scan.title}
        </Typography>
      </Box>
      <DialogContent sx={{ p: 4 }}>
        <Typography sx={{ color: '#555', lineHeight: 2, mb: 3 }}>
          {isEN && scan.description_en ? scan.description_en : scan.description}
        </Typography>

        {(isEN ? scan.preparation_info_en : scan.preparation_info) && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoOutlinedIcon sx={{ color }} />
              {t('scans.preparation')}
            </Typography>
            {(isEN && scan.preparation_info_en ? scan.preparation_info_en : scan.preparation_info)
              .split('\n').filter(Boolean).map((item, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                <CheckCircleIcon sx={{ color, fontSize: '1rem', mt: 0.3, flexShrink: 0 }} />
                <Typography sx={{ fontSize: '0.9rem', color: '#444' }}>{item}</Typography>
              </Box>
            ))}
          </>
        )}

        {(isEN ? scan.procedure_info_en : scan.procedure_info) && (
          <>
            <Divider sx={{ mb: 2, mt: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoOutlinedIcon sx={{ color }} />
              {isEN ? 'Procedure' : 'روند انجام'}
            </Typography>
            {(isEN && scan.procedure_info_en ? scan.procedure_info_en : scan.procedure_info)
              .split('\n').filter(Boolean).map((item, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                <CheckCircleIcon sx={{ color, fontSize: '1rem', mt: 0.3, flexShrink: 0 }} />
                <Typography sx={{ fontSize: '0.9rem', color: '#444' }}>{item}</Typography>
              </Box>
            ))}
          </>
        )}

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1.5,
          background: '#f8f9fa', borderRadius: 2, p: 1.5 }}>
          <AccessTimeIcon sx={{ color }} />
          <Typography sx={{ fontWeight: 600 }}>{t('scans.duration')}: {scan.duration}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Scans() {
  const { t, i18n } = useTranslation()
  const { type } = useParams()
  const isEN = i18n.language === 'en'

  const [search, setSearch]           = useState('')
  const [activeCategory, setCategory] = useState('all')
  const [page, setPage]               = useState(1)
  const [selectedScan, setSelected]   = useState(null)
  const [dialogOpen, setDialogOpen]   = useState(false)

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
      if (search) p.search = search
      if (activeCategory !== 'all') p.category = activeCategory
      return scanApi.getAll(p)
    },
    [page, search, activeCategory]
  )

  const scans      = data?.data        ?? []
  const pagination = data?.pagination  ?? {}

  const openScan = (scan) => { setSelected(scan); setDialogOpen(true) }
  const handleSearch   = (v) => { setSearch(v);   setPage(1) }
  const handleCategory = (v) => { setCategory(v); setPage(1) }

  // Categories for display — Persian keys for API, English labels for display
  const ALL_CATEGORIES = [
    { key: 'all',               label: t('scans.allCategories') },
    { key: 'قلب و عروق',        label: isEN ? 'Cardiovascular'    : 'قلب و عروق' },
    { key: 'استخوان و مفاصل',   label: isEN ? 'Bone & Joints'     : 'استخوان و مفاصل' },
    { key: 'کلیه و مجاری ادراری',label: isEN ? 'Kidney & Urinary'  : 'کلیه و مجاری ادراری' },
    { key: 'غدد درون‌ریز',      label: isEN ? 'Endocrine'         : 'غدد درون‌ریز' },
    { key: 'ریه و تنفس',        label: isEN ? 'Lung & Respiratory' : 'ریه و تنفس' },
    { key: 'کبد و صفرا',        label: isEN ? 'Liver & Biliary'   : 'کبد و صفرا' },
    { key: 'مغز و اعصاب',       label: isEN ? 'Brain & Neurology' : 'مغز و اعصاب' },
    { key: 'آنکولوژی',          label: isEN ? 'Oncology'          : 'آنکولوژی' },
  ]

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      {/* Hero */}
      <Box sx={{ pt: { xs: 14, md: 16 }, pb: 6,
        background: 'linear-gradient(135deg, #0B6E4F 0%, #17a2a2 50%, #1976D2 100%)' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>
              {t('scans.hero.title')}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, maxWidth: 550, mx: 'auto' }}>
              {t('scans.hero.subtitle')}
            </Typography>
            <Box sx={{ maxWidth: 500, mx: 'auto' }}>
              <TextField fullWidth
                placeholder={t('scans.search')}
                value={search}
                onChange={e => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#0B6E4F' }} /></InputAdornment>,
                  sx: { background: '#fff', borderRadius: '50px',
                    '& fieldset': { border: 'none' },
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }
                }} />
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Category chips */}
        <Box sx={{ mb: 5, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {ALL_CATEGORIES.map(cat => (
            <motion.div key={cat.key} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Chip
                label={cat.label}
                onClick={() => handleCategory(cat.key)}
                clickable
                sx={{
                  px: 0.5, py: 2.5, fontWeight: 600, fontSize: '0.85rem',
                  background: activeCategory === cat.key
                    ? 'linear-gradient(135deg, #0B6E4F, #1976D2)' : '#fff',
                  color: activeCategory === cat.key ? '#fff' : '#555',
                  boxShadow: activeCategory === cat.key
                    ? '0 4px 15px rgba(11,110,79,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                  border: activeCategory === cat.key ? 'none' : '1px solid #e0e0e0',
                  transition: 'all 0.25s'
                }} />
            </motion.div>
          ))}
        </Box>

        {/* Count */}
        {!loading && (
          <Typography sx={{ color: '#888', mb: 4, textAlign: 'center' }}>
            {pagination.total ?? scans.length} {t('scans.found')}
          </Typography>
        )}

        {/* Grid */}
        {loading ? (
          <CardSkeleton count={12} cols={4} />
        ) : error ? (
          <PageError onRetry={refetch} />
        ) : (
          <AnimatePresence>
            <Grid container spacing={3}>
              {scans.map((scan, index) => {
                const { color, gradient, emoji } = styleFor(scan)
                const catLabel = isEN ? (CATEGORY_EN[scan.category] ?? scan.category) : scan.category
                return (
                  <Grid item xs={12} sm={6} md={3} key={scan.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}>
                      <Card onClick={() => openScan(scan)}
                        sx={{ borderRadius: 4, cursor: 'pointer', overflow: 'hidden',
                          height: '100%', border: '2px solid transparent',
                          transition: 'all 0.3s',
                          '&:hover': { borderColor: color, transform: 'translateY(-8px)',
                            boxShadow: `0 16px 40px ${color}30` } }}>
                        <Box sx={{ height: 5, background: gradient }} />
                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                          <Box sx={{ fontSize: '3rem', mb: 2 }}>{emoji}</Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>
                            {isEN && scan.title_en ? scan.title_en : scan.title}
                          </Typography>
                          <Chip label={catLabel} size="small"
                            sx={{ background: `${color}20`, color, fontWeight: 600,
                              fontSize: '0.75rem', mb: 1.5 }} />
                          <Typography variant="body2"
                            sx={{ color: '#666', lineHeight: 1.7, mb: 2, fontSize: '0.85rem',
                              display: '-webkit-box', WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {isEN && scan.description_en ? scan.description_en : scan.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: 0.5, color: '#888', fontSize: '0.8rem', mb: 2 }}>
                            <AccessTimeIcon sx={{ fontSize: '0.9rem' }} />
                            {scan.duration}
                          </Box>
                          <Button fullWidth variant="outlined" size="small"
                            sx={{ borderColor: color, color, borderRadius: '20px',
                              fontWeight: 600, fontSize: '0.82rem',
                              '&:hover': { background: `${color}10` } }}>
                            {t('scans.moreDetails')}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                )
              })}
            </Grid>
          </AnimatePresence>
        )}
      </Container>

      <ScanDialog scan={selectedScan} open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <Footer />
    </Box>
  )
}
