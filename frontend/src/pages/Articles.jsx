import React, { useState, useEffect } from 'react'
import {
  Box, Container, Grid, Typography, Card, CardContent,
  Chip, Button, TextField, InputAdornment, Dialog,
  DialogContent, IconButton, Divider, Paper
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PageError, ArticleSkeleton } from '../components/ApiStates'
import { useApi } from '../hooks/useApi'
import { articleApi } from '../services/api'

const MotionCard = motion(Card)

const CATEGORY_COLORS = {
  'آموزشی':              { color: '#1976D2', bg: '#E3F2FD', emoji: '📚' },
  'قلب و عروق':          { color: '#e53e3e', bg: '#FFF5F5', emoji: '❤️' },
  'آنکولوژی':            { color: '#9575CD', bg: '#F3E5F5', emoji: '🔬' },
  'غدد درون‌ریز':        { color: '#d53f8c', bg: '#FDF2F8', emoji: '🦋' },
  'کلیه و مجاری ادراری': { color: '#2b6cb0', bg: '#EBF8FF', emoji: '💧' },
  'استخوان و مفاصل':     { color: '#2c7a7b', bg: '#E6FFFA', emoji: '🦴' },
  'مغز و اعصاب':         { color: '#553c9a', bg: '#FAF5FF', emoji: '🧠' },
  'ریه و تنفس':          { color: '#276749', bg: '#F0FFF4', emoji: '🫁' },
  'دانستنی‌ها':          { color: '#b7791f', bg: '#FFFFF0', emoji: '💡' },
  'سلامت عمومی':         { color: '#34A853', bg: '#F0FFF4', emoji: '🌿' },
}
const DEFAULT_CAT = { color: '#34A853', bg: '#E6F4EA', emoji: '📋' }
const catStyle = (cat) => CATEGORY_COLORS[cat] ?? DEFAULT_CAT

// ─── Article Dialog ──────────────────────────────────────────────────────────
function ArticleDialog({ article, open, onClose }) {
  if (!article) return null
  const { color, emoji } = catStyle(article.category)
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      PaperProps={{ sx: { borderRadius: 4, direction: 'rtl', overflow: 'hidden' } }}>
      {/* Header */}
      <Box sx={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`, p: 4, position: 'relative' }}>
        <IconButton onClick={onClose}
          sx={{ position: 'absolute', top: 16, left: 16, color: '#fff',
            background: 'rgba(255,255,255,0.15)',
            '&:hover': { background: 'rgba(255,255,255,0.3)' } }}>
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography sx={{ fontSize: '2rem' }}>{emoji}</Typography>
          <Chip label={article.category}
            sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600 }} />
          {article.is_featured && (
            <Chip icon={<StarIcon sx={{ color: '#FFD700 !important', fontSize: '0.9rem !important' }} />}
              label="ویژه" sx={{ background: 'rgba(255,215,0,0.2)', color: '#fff', fontWeight: 600 }} />
          )}
        </Box>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, lineHeight: 1.5, mb: 2 }}>
          {article.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip icon={<AccessTimeIcon sx={{ color: 'rgba(255,255,255,0.8) !important', fontSize: '0.85rem !important' }} />}
            label={`${article.reading_time} دقیقه مطالعه`}
            sx={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.82rem' }} />
        </Box>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 4 }}>
        <Typography sx={{ color: '#666', lineHeight: 2, fontSize: '1rem',
          whiteSpace: 'pre-line', mb: 3 }}>
          {article.content}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={onClose}
            sx={{ borderRadius: '50px', px: 4,
              background: `linear-gradient(135deg, ${color}, ${color}cc)`,
              fontWeight: 700 }}>
            بستن مقاله
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({ article, onClick }) {
  const { color, bg, emoji } = catStyle(article.category)
  return (
    <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.99 }}>
      <Card onClick={() => onClick(article)} elevation={0}
        sx={{ borderRadius: 4, cursor: 'pointer', overflow: 'hidden',
          border: `2px solid ${color}30`, height: '100%',
          transition: 'all 0.3s',
          '&:hover': { borderColor: color, boxShadow: `0 12px 40px ${color}25` } }}>
        {/* Color bar */}
        <Box sx={{ height: 6, background: `linear-gradient(90deg, ${color}, ${color}99)` }} />
        <CardContent sx={{ p: 3.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label={article.category} size="small"
                sx={{ background: bg, color, fontWeight: 700, fontSize: '0.78rem' }} />
              <Chip icon={<StarIcon sx={{ color: '#f6ad55 !important', fontSize: '0.8rem !important' }} />}
                label="ویژه" size="small"
                sx={{ background: '#FFFBEB', color: '#b7791f', fontWeight: 700, fontSize: '0.78rem' }} />
            </Box>
            <Typography sx={{ fontSize: '1.8rem' }}>{emoji}</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, lineHeight: 1.5,
            color: '#1a202c' }}>
            {article.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#718096', lineHeight: 1.9, mb: 2.5 }}>
            {article.excerpt}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5,
              color: '#a0aec0', fontSize: '0.82rem' }}>
              <AccessTimeIcon sx={{ fontSize: '0.9rem' }} />
              <Typography sx={{ fontSize: '0.82rem' }}>{article.reading_time} دقیقه</Typography>
            </Box>
            <Button size="small" endIcon={<ArrowForwardIcon sx={{ fontSize: '0.85rem !important' }} />}
              sx={{ color, fontWeight: 700, fontSize: '0.82rem',
                '&:hover': { background: bg } }}>
              مطالعه
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── Regular Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article, index, onClick }) {
  const { color, bg, emoji } = catStyle(article.category)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }} layout>
      <MotionCard onClick={() => onClick(article)} elevation={0}
        whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}
        sx={{ borderRadius: 3, cursor: 'pointer', overflow: 'hidden', height: '100%',
          border: '1.5px solid #f0f0f0', transition: 'all 0.3s',
          '&:hover': { borderColor: color, boxShadow: `0 8px 30px ${color}20` } }}>
        <Box sx={{ height: 4, background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Chip label={article.category} size="small"
              sx={{ background: bg, color, fontWeight: 700, fontSize: '0.75rem' }} />
            <Typography sx={{ fontSize: '1.5rem' }}>{emoji}</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.5,
            fontSize: '1rem', color: '#2d3748' }}>
            {article.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#718096', lineHeight: 1.8,
            mb: 2, fontSize: '0.88rem',
            display: '-webkit-box', WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.excerpt}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            pt: 1.5, borderTop: '1px solid #f5f5f5' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#a0aec0' }}>
              <AccessTimeIcon sx={{ fontSize: '0.85rem' }} />
              <Typography sx={{ fontSize: '0.8rem' }}>{article.reading_time} دقیقه</Typography>
            </Box>
            <Typography sx={{ fontSize: '0.8rem', color, fontWeight: 600 }}>
              مطالعه ←
            </Typography>
          </Box>
        </CardContent>
      </MotionCard>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Articles() {
  const { category: urlCategory } = useParams()

  const [search, setSearch]           = useState('')
  const [activeCategory, setCategory] = useState('همه')
  const [page, setPage]               = useState(1)
  const [selectedArticle, setSelected]= useState(null)
  const [dialogOpen, setDialogOpen]   = useState(false)

  const SLUG_TO_CATEGORY = { educational: 'آموزشی', news: 'اخبار پزشکی', faq: 'سوالات متداول' }
  useEffect(() => {
    if (urlCategory && SLUG_TO_CATEGORY[urlCategory]) setCategory(SLUG_TO_CATEGORY[urlCategory])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCategory])

  const { data: featuredData } = useApi(
    () => articleApi.getAll({ featured: 1, limit: 3 }), []
  )
  const featured = featuredData?.data ?? []

  const { data, loading, error, refetch } = useApi(
    () => {
      const p = { page, limit: 9 }
      if (search) p.search = search
      if (activeCategory !== 'همه') p.category = activeCategory
      return articleApi.getAll(p)
    },
    [page, search, activeCategory]
  )

  const articles   = data?.data       ?? []
  const pagination = data?.pagination ?? {}
  const totalPages = pagination.total_pages ?? 1

  const handleSearch   = (v) => { setSearch(v); setPage(1) }
  const handleCategory = (v) => { setCategory(v); setPage(1) }
  const openArticle    = (a) => { setSelected(a); setDialogOpen(true) }

  const showFeatured = !search && activeCategory === 'همه' && featured.length > 0

  const ALL_CATEGORIES = ['همه', ...Object.keys(CATEGORY_COLORS)]

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      {/* Hero */}
      <Box sx={{ pt: { xs: 14, md: 16 }, pb: 6,
        background: 'linear-gradient(135deg, #0B6E4F 0%, #1976D2 100%)',
        position: 'relative', overflow: 'hidden' }}>
        {[...Array(3)].map((_, i) => (
          <Box key={i} sx={{ position: 'absolute',
            width: 200 + i * 100, height: 200 + i * 100, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.08)',
            top: `${-20 + i * 25}%`, right: `${-5 + i * 15}%`, pointerEvents: 'none' }} />
        ))}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}>
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.8rem' }, mb: 1.5 }}>
              مقالات و دانستنی‌ها
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem',
              mb: 4, maxWidth: 500, mx: 'auto' }}>
              آموزش‌های پزشکی، نکات سلامتی و اطلاعات تخصصی به زبان ساده
            </Typography>
            {/* Search */}
            <Box sx={{ maxWidth: 540, mx: 'auto' }}>
              <TextField fullWidth placeholder="جستجو در مقالات..."
                value={search} onChange={e => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#34A853' }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: '50px', background: '#fff',
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
          {ALL_CATEGORIES.map(cat => {
            const active = activeCategory === cat
            const { color } = catStyle(cat)
            return (
              <motion.div key={cat} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Chip label={cat} onClick={() => handleCategory(cat)} clickable
                  sx={{ px: 0.5, py: 2.5, fontWeight: 600, fontSize: '0.85rem',
                    background: active ? color : '#fff',
                    color: active ? '#fff' : '#555',
                    boxShadow: active ? `0 4px 15px ${color}50` : '0 2px 8px rgba(0,0,0,0.06)',
                    border: active ? 'none' : '1px solid #e0e0e0',
                    transition: 'all 0.25s' }} />
              </motion.div>
            )
          })}
        </Box>

        {/* Featured */}
        {showFeatured && (
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <StarIcon sx={{ color: '#f6ad55', fontSize: '1.5rem' }} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>مقالات ویژه</Typography>
            </Box>
            <Grid container spacing={3}>
              {featured.map((a, i) => (
                <Grid item xs={12} sm={6} md={4} key={a.id}>
                  <FeaturedCard article={a} onClick={openArticle} />
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ mt: 6, mb: 1 }} />
          </Box>
        )}

        {/* Count */}
        {!loading && (
          <Typography sx={{ color: '#a0aec0', mb: 3, fontSize: '0.9rem' }}>
            {pagination.total ?? articles.length} مقاله یافت شد
          </Typography>
        )}

        {/* Articles grid */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(9)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <ArticleSkeleton count={1} />
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <PageError onRetry={refetch} />
        ) : articles.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontSize: '3rem', mb: 2 }}>📭</Typography>
            <Typography sx={{ color: '#a0aec0', fontSize: '1.1rem' }}>مقاله‌ای یافت نشد</Typography>
          </Box>
        ) : (
          <AnimatePresence mode="wait">
            <Grid container spacing={3}>
              {articles.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={article.id}>
                  <ArticleCard article={article} index={index} onClick={openArticle} />
                </Grid>
              ))}
            </Grid>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 6 }}>
            <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}
              variant="outlined" sx={{ borderRadius: 2, minWidth: 44 }}>‹</Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button key={i} onClick={() => setPage(i + 1)}
                variant={page === i + 1 ? 'contained' : 'outlined'}
                sx={{ borderRadius: 2, minWidth: 44, fontWeight: page === i + 1 ? 700 : 400 }}>
                {i + 1}
              </Button>
            ))}
            <Button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              variant="outlined" sx={{ borderRadius: 2, minWidth: 44 }}>›</Button>
          </Box>
        )}
      </Container>

      <ArticleDialog article={selectedArticle} open={dialogOpen}
        onClose={() => setDialogOpen(false)} />
      <Footer />
    </Box>
  )
}
