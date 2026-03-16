import React, { useState, useEffect } from 'react'
import {
  Box, Container, Grid, Typography, Card, CardContent,
  Chip, Button, TextField, InputAdornment, Dialog,
  DialogContent, IconButton, Divider, Avatar, Paper
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import StarIcon from '@mui/icons-material/Star'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PageError, ArticleSkeleton } from '../components/ApiStates'
import { useApi } from '../hooks/useApi'
import { articleApi } from '../services/api'

const MotionCard = motion(Card)
const MotionBox = motion(Box)

const CATEGORY_COLORS = {
  'آموزشی':              '#1976D2',
  'قلب و عروق':          '#FF6B6B',
  'آنکولوژی':            '#9575CD',
  'غدد درون‌ریز':        '#F38181',
  'کلیه و مجاری ادراری': '#68C9BA',
  'استخوان و مفاصل':     '#4ECDC4',
  'مغز و اعصاب':         '#4CAF50',
  'ریه و تنفس':          '#A8E6CF',
}
const colorFor = (category) => CATEGORY_COLORS[category] ?? '#0B6E4F'

const ALL_CATEGORIES = ['همه', ...Object.keys(CATEGORY_COLORS)]

// ─── Article Detail Dialog ─────────────────────────────────────────────────────
const ArticleDialog = ({ article, open, onClose }) => {
  if (!article) return null
  const color = colorFor(article.category)

  // Format Persian date string if available
  const dateStr = article.published_at
    ? new Date(article.published_at).toLocaleDateString('fa-IR')
    : ''

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden', direction: 'rtl' } }}>
      {/* Header */}
      <Box sx={{ background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
        p: { xs: 3, md: 5 }, position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, left: 16, color: '#fff' }}>
          <CloseIcon />
        </IconButton>
        {article.is_featured && (
          <Chip icon={<StarIcon sx={{ color: '#FFD700 !important' }} />} label="ویژه"
            sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff', mb: 2, fontWeight: 600 }} />
        )}
        <Chip label={article.category}
          sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff', mb: 2, fontWeight: 600, mr: 1 }} />
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, lineHeight: 1.4 }}>
          {article.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, mt: 2, flexWrap: 'wrap' }}>
          {article.author_name && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, color: 'rgba(255,255,255,0.85)' }}>
              <PersonIcon fontSize="small" />
              <Typography variant="body2">{article.author_name}</Typography>
            </Box>
          )}
          {dateStr && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, color: 'rgba(255,255,255,0.85)' }}>
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2">{dateStr}</Typography>
            </Box>
          )}
          {article.reading_time && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, color: 'rgba(255,255,255,0.85)' }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">{article.reading_time} دقیقه مطالعه</Typography>
            </Box>
          )}
        </Box>
      </Box>

      <DialogContent sx={{ p: { xs: 3, md: 5 } }}>
        {/* Full content — split on double newlines for paragraphs */}
        {(article.content || article.excerpt || '').split('\n\n').map((para, i) => (
          <Typography key={i} sx={{ color: '#444', lineHeight: 2.2, mb: 2.5, fontSize: '1rem' }}>
            {para}
          </Typography>
        ))}

        {/* Author card */}
        {article.author_name && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2,
              background: `${color}10`, borderRadius: 3 }}>
              <Avatar sx={{ background: `linear-gradient(135deg,${color},${color}99)`,
                width: 50, height: 50, fontSize: '1.3rem' }}>
                {article.author_name.slice(-1)}
              </Avatar>
              <Box>
                <Typography sx={{ fontWeight: 700 }}>{article.author_name}</Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>متخصص پزشکی هسته‌ای</Typography>
              </Box>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Articles() {
  const { category: urlCategory } = useParams()   // e.g. /articles/educational

  const [search, setSearch]           = useState('')
  const [activeCategory, setCategory] = useState('همه')
  const [page, setPage]               = useState(1)
  const [selectedArticle, setSelected]= useState(null)
  const [dialogOpen, setDialogOpen]   = useState(false)

  // If navigated from a navbar sub-link like /articles/educational, pre-select that category
  const SLUG_TO_CATEGORY = {
    educational: 'آموزشی',
    news:        'اخبار پزشکی',
    faq:         'سوالات متداول',
  }
  useEffect(() => {
    if (urlCategory && SLUG_TO_CATEGORY[urlCategory]) {
      setCategory(SLUG_TO_CATEGORY[urlCategory])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCategory])

  // Featured articles — runs once on mount
  const { data: featuredData } = useApi(
    () => articleApi.getAll({ featured: 1, limit: 2 }),
    []
  )
  const featured = featuredData?.data ?? []

  // Main listing — re-runs when filters change
  const { data, loading, error, refetch } = useApi(
    () => {
      const p = { page, limit: 9 }
      if (search)                   p.search   = search
      if (activeCategory !== 'همه') p.category = activeCategory
      return articleApi.getAll(p)
    },
    [page, search, activeCategory]
  )

  const articles   = data?.data       ?? []
  const pagination = data?.pagination ?? {}

  const handleSearch   = (v) => { setSearch(v);   setPage(1) }
  const handleCategory = (v) => { setCategory(v); setPage(1) }
  const openArticle    = (a) => { setSelected(a); setDialogOpen(true) }

  const showFeatured = !search && activeCategory === 'همه' && featured.length > 0

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      {/* Hero */}
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: 8,
        background: 'linear-gradient(135deg, #1a237e 0%, #0B6E4F 100%)',
        position: 'relative', overflow: 'hidden' }}>
        {[...Array(4)].map((_, i) => (
          <MotionBox key={i}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
            sx={{ position: 'absolute', width: 100 + i * 80, height: 100 + i * 80,
              borderRadius: 2, border: '1px solid rgba(255,255,255,0.06)',
              top: `${-10 + i * 20}%`, right: `${-5 + i * 15}%`, pointerEvents: 'none' }} />
        ))}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
              📚 مقالات پزشکی
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem',
              maxWidth: 550, mx: 'auto', mb: 5 }}>
              آخرین مقالات و اطلاعات تخصصی از متخصصان پزشکی هسته‌ای کاسپین
            </Typography>
            <Box sx={{ maxWidth: 500, mx: 'auto' }}>
              <TextField fullWidth placeholder="جستجو در مقالات..." value={search}
                onChange={e => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#1a237e' }} /></InputAdornment>,
                  sx: { background: '#fff', borderRadius: '50px',
                    '& fieldset': { border: 'none' }, '& input': { py: 1.8 } }
                }} />
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Featured section */}
        {showFeatured && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1a1a2e' }}>
              ⭐ مقالات ویژه
            </Typography>
            <Grid container spacing={3}>
              {featured.map((article, index) => {
                const color = colorFor(article.category)
                return (
                  <Grid item xs={12} md={6} key={article.id}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}>
                      <MotionCard onClick={() => openArticle(article)}
                        whileHover={{ y: -8 }} whileTap={{ scale: 0.98 }}
                        sx={{ borderRadius: 4, cursor: 'pointer', overflow: 'hidden',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.1)', border: '2px solid transparent',
                          '&:hover': { borderColor: color } }}>
                        <Box sx={{ height: 8, background: `linear-gradient(135deg,${color},${color}99)` }} />
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Chip icon={<StarIcon sx={{ color: '#FFD700 !important', fontSize: '1rem !important' }} />}
                              label="ویژه" size="small"
                              sx={{ background: '#FFF8E1', color: '#F57F17', fontWeight: 600 }} />
                            <Chip label={article.category} size="small"
                              sx={{ background: `${color}15`, color, fontWeight: 600 }} />
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.5 }}>
                            {article.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8, mb: 2 }}>
                            {article.excerpt}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, color: '#999', flexWrap: 'wrap' }}>
                            {article.author_name && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <PersonIcon sx={{ fontSize: '0.9rem' }} />
                                <Typography variant="caption">{article.author_name}</Typography>
                              </Box>
                            )}
                            {article.reading_time && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTimeIcon sx={{ fontSize: '0.9rem' }} />
                                <Typography variant="caption">{article.reading_time} دقیقه</Typography>
                              </Box>
                            )}
                          </Box>
                        </CardContent>
                      </MotionCard>
                    </motion.div>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        )}

        {/* Category filter */}
        <Box sx={{ mb: 4, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          {ALL_CATEGORIES.map(cat => (
            <motion.div key={cat} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Chip label={cat} onClick={() => handleCategory(cat)} clickable
                sx={{ px: 1, py: 2.5, fontWeight: 600,
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #1a237e, #0B6E4F)' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#555',
                  boxShadow: activeCategory === cat
                    ? '0 4px 15px rgba(26,35,126,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                  border: activeCategory === cat ? 'none' : '1px solid #e0e0e0',
                  transition: 'all 0.3s' }} />
            </motion.div>
          ))}
        </Box>

        {pagination.total !== undefined && (
          <Typography sx={{ color: '#888', mb: 4 }}>
            {pagination.total} مقاله یافت شد
          </Typography>
        )}

        {/* Content */}
        {loading ? (
          <ArticleSkeleton count={6} />
        ) : error ? (
          <PageError error={error} onRetry={refetch} />
        ) : (
          <>
            <AnimatePresence mode="wait">
              <Grid container spacing={3}>
                {articles.map((article, index) => {
                  const color = colorFor(article.category)
                  return (
                    <Grid item xs={12} sm={6} md={4} key={article.id}>
                      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }} transition={{ delay: index * 0.07 }} layout>
                        <MotionCard onClick={() => openArticle(article)}
                          whileHover={{ y: -8 }} whileTap={{ scale: 0.98 }}
                          sx={{ borderRadius: 4, cursor: 'pointer', height: '100%',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.07)', border: '2px solid transparent',
                            '&:hover': { borderColor: color }, display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ height: 5, background: `linear-gradient(135deg,${color},${color}99)` }} />
                          <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              {article.is_featured && (
                                <StarIcon sx={{ color: '#FFD700', fontSize: '1.3rem' }} />
                              )}
                              <Box sx={{ ml: 'auto' }}>
                                <Chip label={article.category} size="small"
                                  sx={{ background: `${color}15`, color, fontWeight: 600, fontSize: '0.75rem' }} />
                              </Box>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.5 }}>
                              {article.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8, flex: 1, mb: 2 }}>
                              {article.excerpt}
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between',
                              alignItems: 'center', color: '#999' }}>
                              <Typography variant="caption">{article.author_name}</Typography>
                              {article.reading_time && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <AccessTimeIcon sx={{ fontSize: '0.85rem' }} />
                                  <Typography variant="caption">{article.reading_time} دقیقه</Typography>
                                </Box>
                              )}
                            </Box>
                          </CardContent>
                        </MotionCard>
                      </motion.div>
                    </Grid>
                  )
                })}
              </Grid>
            </AnimatePresence>

            {articles.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography sx={{ fontSize: '4rem', mb: 2 }}>📭</Typography>
                <Typography variant="h6" sx={{ color: '#888' }}>مقاله‌ای یافت نشد</Typography>
              </Box>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 6 }}>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                  <Button key={p} onClick={() => setPage(p)}
                    variant={p === page ? 'contained' : 'outlined'}
                    sx={{ minWidth: 42, borderRadius: 2,
                      ...(p === page
                        ? { background: 'linear-gradient(135deg,#1a237e,#0B6E4F)', border: 'none' }
                        : { borderColor: '#ddd', color: '#555' }) }}>
                    {p}
                  </Button>
                ))}
              </Box>
            )}
          </>
        )}
      </Container>

      <ArticleDialog article={selectedArticle} open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <Footer />
    </Box>
  )
}
