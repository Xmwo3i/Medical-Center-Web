import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box, Container, Grid, Typography, Paper, Avatar,
  Divider, Chip, Button, Skeleton
} from '@mui/material'
import { motion } from 'framer-motion'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import VerifiedIcon from '@mui/icons-material/Verified'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PageError } from '../components/ApiStates'
import { useApi } from '../hooks/useApi'
import { scanApi, articleApi } from '../services/api'
// settings endpoint will return contact info once the backend router is in place
import http from '../services/api'

const MotionBox = motion(Box)

// Animated fade-in wrapper
const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
  const y = direction === 'up' ? 40 : direction === 'down' ? -40 : 0
  const x = direction === 'left' ? -40 : direction === 'right' ? 40 : 0
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true }}>
      {children}
    </motion.div>
  )
}

// Display metadata for doctors (not translated — colors and emojis)
const DOCTOR_META = [
  { emoji: '👨‍⚕️', color: '#0B6E4F' },
  { emoji: '👩‍⚕️', color: '#1976D2' },
  { emoji: '👨‍⚕️', color: '#7B1FA2' },
  { emoji: '👩‍⚕️', color: '#F38181' },
]

export default function About() {
  const { t } = useTranslation()
  // Pull live counts from the API to populate stats section
  const { data: scansData }    = useApi(() => scanApi.getAll({ limit: 1 }),    [])
  const { data: articlesData } = useApi(() => articleApi.getAll({ limit: 1 }), [])
  const { data: settingsData } = useApi(() => http.get('/settings'),            [])

  const totalScans    = scansData?.pagination?.total    ?? '8+'
  const totalArticles = articlesData?.pagination?.total ?? '10+'

  // Extract contact settings from the DB-backed /settings endpoint
  const settingsMap = {}
  if (settingsData?.data) {
    settingsData.data.forEach(s => { settingsMap[s.setting_key] = s.setting_value })
  }
  const phone   = settingsMap['site_phone']   ?? '028-33XXXXXX'
  const email   = settingsMap['site_email']   ?? 'info@caspian-nuclear.ir'
  const address = settingsMap['site_address'] ?? t('footer.contact.street')

  // Static data loaded from translations
  const TIMELINE = t('about.timeline', { returnObjects: true })
  const CERTS    = t('about.certs',    { returnObjects: true })
  const doctorData = t('about.doctors', { returnObjects: true })
  const DOCTORS  = Array.isArray(doctorData)
    ? doctorData.map((d, i) => ({ ...d, ...DOCTOR_META[i] }))
    : []

  const STATS = [
    { number: '+20',            label: t('about.stats.experience'), emoji: '📅' },
    { number: '+50K',           label: t('about.stats.patients'),   emoji: '😊' },
    { number: '16+',            label: t('about.stats.insurance'),  emoji: '🏦' },
    { number: '24/7',           label: t('about.stats.support'),    emoji: '⏰' },
    { number: `${totalScans}`,  label: t('about.stats.scans'),      emoji: '🔬' },
    { number: totalArticles,    label: t('about.stats.articles'),   emoji: '📋' },
  ]

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: 10,
        background: 'linear-gradient(135deg, #0B6E4F 0%, #17a2a2 50%, #1976D2 100%)',
        position: 'relative', overflow: 'hidden' }}>
        {[...Array(5)].map((_, i) => (
          <MotionBox key={i}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
            sx={{ position: 'absolute', width: 200 + i * 60, height: 200 + i * 60,
              borderRadius: '50%', background: `rgba(255,255,255,${0.03 + i * 0.01})`,
              top: `${-20 + i * 25}%`, right: `${-10 + i * 18}%`, pointerEvents: 'none' }} />
        ))}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <FadeIn>
            <Box component="img" src="/assets/images/caspian.png" alt="Caspian"
              onError={e => e.target.style.display = 'none'}
              sx={{ height: { xs: 160, md: 220 }, filter: 'brightness(0) invert(1)', mb: 3 }} />
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
              {t('about.title')}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.15rem',
              maxWidth: 650, mx: 'auto', lineHeight: 1.9 }}>
              {t('about.heroSubtitle')}
            </Typography>
          </FadeIn>
        </Container>
      </Box>

      {/* Live Stats */}
      <Box sx={{ py: 8, background: '#fff' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {STATS.map((stat, i) => (
              <Grid item xs={6} sm={4} md={2} key={i}>
                <FadeIn delay={i * 0.08}>
                  <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderRadius: 4,
                    border: '1px solid #f0f0f0', transition: 'all 0.3s',
                    '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.1)', transform: 'translateY(-5px)' } }}>
                    <Typography sx={{ fontSize: '2rem', mb: 1 }}>{stat.emoji}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#0B6E4F', mb: 0.5 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888' }}>{stat.label}</Typography>
                  </Paper>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Story */}
      <Box sx={{ py: 10, background: 'linear-gradient(180deg, #f8f9fa 0%, #fff 100%)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <FadeIn direction="left">
                <Chip label={t('about.storyBadge')} sx={{ background: '#E6F4EA', color: '#0B6E4F', fontWeight: 600, mb: 3 }} />
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: '#1a1a2e', lineHeight: 1.4 }}>
                  {t('about.storyTitle')}
                </Typography>
                <Typography sx={{ color: '#555', lineHeight: 2.2, mb: 3, fontSize: '1.05rem' }}>
                  {t('about.storyText1')}
                </Typography>
                <Typography sx={{ color: '#555', lineHeight: 2.2, mb: 4, fontSize: '1.05rem' }}>
                  {t('about.storyText2')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {[t('about.badges.accuracy'), t('about.badges.patient'), t('about.badges.advanced'), t('about.badges.satisfaction')].map(tag => (
                    <Chip key={tag} icon={<VerifiedIcon />} label={tag}
                      sx={{ background: '#E6F4EA', color: '#0B6E4F', fontWeight: 600 }} />
                  ))}
                </Box>
              </FadeIn>
            </Grid>
            <Grid item xs={12} md={6}>
              <FadeIn direction="right">
                <Grid container spacing={2}>
                  {[
                    { emoji: '🎯', title: t('about.mission'), text: t('about.missionText') },
                    { emoji: '👁️', title: t('about.vision'), text: t('about.visionText') },
                    { emoji: '💎', title: t('about.values'),  text: t('about.valuesText') },
                    { emoji: '🤝', title: t('about.commitment'),     text: t('about.commitmentText') },
                  ].map((item, i) => (
                    <Grid item xs={6} key={i}>
                      <Paper elevation={0} sx={{ p: 3, borderRadius: 4, height: '100%',
                        border: '1px solid #f0f0f0', transition: 'all 0.3s',
                        '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.08)', borderColor: '#0B6E4F' } }}>
                        <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>{item.emoji}</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>{item.title}</Typography>
                        <Typography variant="body2" sx={{ color: '#777', lineHeight: 1.7 }}>{item.text}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </FadeIn>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Timeline */}
      <Box sx={{ py: 10, background: '#fff' }}>
        <Container maxWidth="md">
          <FadeIn>
            <Typography variant="h3" sx={{ fontWeight: 800, textAlign: 'center', mb: 8, color: '#1a1a2e' }}>
              {t('about.timelineTitle')}
            </Typography>
          </FadeIn>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ position: 'absolute', right: '50%', top: 0, bottom: 0, width: 2,
              background: 'linear-gradient(180deg, #0B6E4F, #1976D2)',
              display: { xs: 'none', md: 'block' } }} />
            {TIMELINE.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <Box sx={{ display: 'flex', mb: 5, alignItems: { md: 'center' }, gap: 3,
                  flexDirection: { xs: 'column', md: i % 2 === 0 ? 'row' : 'row-reverse' } }}>
                  <Box sx={{ flex: 1, textAlign: { md: i % 2 === 0 ? 'left' : 'right' } }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3,
                      background: i === TIMELINE.length - 1
                        ? 'linear-gradient(135deg, #0B6E4F, #1976D2)' : '#f8f9fa',
                      border: '1px solid', borderColor: i === TIMELINE.length - 1 ? 'transparent' : '#eee' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5,
                        color: i === TIMELINE.length - 1 ? '#fff' : '#1a1a2e' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.7,
                        color: i === TIMELINE.length - 1 ? 'rgba(255,255,255,0.85)' : '#666' }}>
                        {item.desc}
                      </Typography>
                    </Paper>
                  </Box>
                  <Box sx={{ flexShrink: 0, zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ width: 70, height: 70, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0B6E4F, #1976D2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 800, fontSize: '0.9rem', mx: 'auto',
                      boxShadow: '0 4px 15px rgba(11,110,79,0.3)' }}>
                      {item.year}
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />
                </Box>
              </FadeIn>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Team */}
      <Box sx={{ py: 10, background: 'linear-gradient(180deg, #f8f9fa 0%, #E6F4EA 100%)' }}>
        <Container maxWidth="lg">
          <FadeIn>
            <Typography variant="h3" sx={{ fontWeight: 800, textAlign: 'center', mb: 2, color: '#1a1a2e' }}>
              {t('about.teamTitle')}
            </Typography>
            <Typography sx={{ color: '#888', textAlign: 'center', mb: 8, fontSize: '1.05rem' }}>
              {t('about.teamSubtitle')}
            </Typography>
          </FadeIn>
          <Grid container spacing={4} justifyContent="center">
            {DOCTORS.map((doc, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <FadeIn delay={i * 0.1}>
                  <motion.div whileHover={{ y: -10 }}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: 'center',
                      border: '2px solid transparent', transition: 'all 0.3s',
                      '&:hover': { borderColor: doc.color, boxShadow: `0 15px 35px ${doc.color}25` } }}>
                      <Avatar sx={{ width: 80, height: 80, fontSize: '2.5rem', mx: 'auto', mb: 2,
                        background: `${doc.color}15` }}>
                        {doc.emoji}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{doc.name}</Typography>
                      <Typography variant="body2" sx={{ color: doc.color, fontWeight: 600, mb: 1 }}>{doc.title}</Typography>
                      <Chip label={`${doc.experience} ${t('about.experienceLabel')}`} size="small"
                        sx={{ background: `${doc.color}10`, color: doc.color, fontWeight: 600 }} />
                    </Paper>
                  </motion.div>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Certifications */}
      <Box sx={{ py: 10, background: '#fff' }}>
        <Container maxWidth="lg">
          <FadeIn>
            <Typography variant="h3" sx={{ fontWeight: 800, textAlign: 'center', mb: 2, color: '#1a1a2e' }}>
              {t('about.certsTitle')}
            </Typography>
            <Typography sx={{ color: '#888', textAlign: 'center', mb: 8 }}>
              {t('about.certsSubtitle')}
            </Typography>
          </FadeIn>
          <Grid container spacing={3} justifyContent="center">
            {CERTS.map((cert, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <FadeIn delay={i * 0.1}>
                  <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: 'center',
                    border: '1px solid #e8f5e9', transition: 'all 0.3s',
                    '&:hover': { boxShadow: '0 8px 25px rgba(11,110,79,0.12)', transform: 'translateY(-5px)' } }}>
                    <Typography sx={{ fontSize: '3rem', mb: 2 }}>{cert.emoji}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '0.95rem' }}>{cert.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#888', lineHeight: 1.6 }}>{cert.issuer}</Typography>
                  </Paper>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact — values from DB settings */}
      <Box sx={{ py: 10, background: 'linear-gradient(135deg, #0B6E4F 0%, #1976D2 100%)' }}>
        <Container maxWidth="lg">
          <FadeIn>
            <Typography variant="h3" sx={{ fontWeight: 800, textAlign: 'center', mb: 8, color: '#fff' }}>
              {t('about.contact')}
            </Typography>
          </FadeIn>
          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: <LocationOnIcon sx={{ fontSize: '2rem' }} />, title: t('about.address'), value: address },
              { icon: <PhoneIcon      sx={{ fontSize: '2rem' }} />, title: t('about.phone'),   value: phone   },
              { icon: <EmailIcon      sx={{ fontSize: '2rem' }} />, title: t('about.email'),   value: email   },
              { icon: <AccessTimeIcon sx={{ fontSize: '2rem' }} />, title: t('about.hours'),   value: t('about.hoursValue') },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <FadeIn delay={i * 0.1}>
                  <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: 'center',
                    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
                    transition: 'all 0.3s', '&:hover': { background: 'rgba(255,255,255,0.18)' } }}>
                    <Box sx={{ color: '#A8E6CF', mb: 2 }}>{item.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
                      {item.value}
                    </Typography>
                  </Paper>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
          <FadeIn delay={0.4}>
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button variant="contained" size="large"
                sx={{ background: '#fff', color: '#0B6E4F', borderRadius: '50px', px: 6, py: 1.8,
                  fontWeight: 700, fontSize: '1.1rem', mr: 2, '&:hover': { background: '#E6F4EA' } }}>
                {t('about.callBtn')}
              </Button>
              <Button variant="outlined" size="large"
                sx={{ borderColor: '#fff', borderWidth: 2, color: '#fff', borderRadius: '50px', px: 6, py: 1.8,
                  fontWeight: 700, fontSize: '1.1rem',
                  '&:hover': { background: 'rgba(255,255,255,0.1)', borderWidth: 2 } }}>
                {t('about.bookOnlineBtn')}
              </Button>
            </Box>
          </FadeIn>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
