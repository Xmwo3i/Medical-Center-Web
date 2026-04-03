import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box, Container, Grid, Typography, Paper, Chip,
  Button, Divider, List, ListItem, ListItemIcon,
  ListItemText, Accordion, AccordionSummary,
  AccordionDetails, Avatar, Card, CardContent
} from '@mui/material'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PhoneIcon from '@mui/icons-material/Phone'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SERVICES, SERVICE_EN } from './Services'
import {
  HeartIcon, BoneIcon, KidneyIcon, ThyroidIcon, BrainIcon,
  LungIcon, LiverIcon, ParathyroidIcon, GIIcon,
  CystographyIcon, RBCIcon, MeckelIcon
} from '../components/MedicalIcons'

const ICON_MAP = {
  'parathyroid-scan':        (c) => <ParathyroidIcon size={120} color={c} />,
  'thyroid-scan':            (c) => <ThyroidIcon size={120} color={c} />,
  'myocardial-perfusion-scan':(c) => <HeartIcon size={120} color={c} />,
  'brain-perfusion-spect':   (c) => <BrainIcon size={120} color={c} />,
  'bone-scan':               (c) => <BoneIcon size={120} color={c} />,
  'hida-scan':               (c) => <LiverIcon size={120} color={c} />,
  'dmsa-renal-scan':         (c) => <KidneyIcon size={120} color={c} />,
  'dtpa-renal-scan':         (c) => <KidneyIcon size={120} color={c} />,
  'labeled-rbc-scan':        (c) => <RBCIcon size={120} color={c} />,
  'radionuclide-cystography':(c) => <CystographyIcon size={120} color={c} />,
  'lung-perfusion-scan':     (c) => <LungIcon size={120} color={c} />,
  'meckel-scan':             (c) => <MeckelIcon size={120} color={c} />,
}

// Real scan images that exist in public/assets/images
const IMAGE_MAP = {
  'myocardial-perfusion-scan':  '/assets/images/heart-scan.png',
  'bone-scan':                  '/assets/images/bone-scan.png',
  'dmsa-renal-scan':            '/assets/images/DMSA_Renal_Cortical_Scintigraphy.jpg',
  'dtpa-renal-scan':            '/assets/images/kidney-scan.png',
  'thyroid-scan':               '/assets/images/thyroid-scan-result-icon-vector.jpg',
  'brain-perfusion-spect':      '/assets/images/brain-biometric-scanner-glyph-icon-illustration-vector.jpg',
  'radionuclide-cystography':   '/assets/images/Direct_Radionuclide_Cystography(DRC).jpg',
  'meckel-scan':                '/assets/images/Diverticulum_Scintigraphy.jpg',
  'hida-scan':                  '/assets/images/hepatobiliary_iminodiacetic_acid_scan_icon.jpg',
  'labeled-rbc-scan':           '/assets/images/Labeled_Red_Blood_Cell_Scintigraphy.jpg',
  'lung-perfusion-scan':        '/assets/images/Perfusion_LungScan.jpg',
  'parathyroid-scan':            '/assets/images/thyroid-scan.png',
}

// Shows real image if it loads, falls back to SVG icon gracefully
function ImageWithFallback({ src, alt, icon }) {
  const [failed, setFailed] = React.useState(false)

  if (!src || failed) {
    // Icon: invert to white so it shows on coloured hero background
    return (
      <Box sx={{ filter: 'brightness(0) invert(1)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', width: 180, height: 180 }}>
        {icon}
      </Box>
    )
  }

  return (
    // Real image: no filter — show full colour with just a subtle shadow
    <Box component="img" src={src} alt={alt}
      sx={{ width: 180, height: 180, objectFit: 'contain', borderRadius: '16px',
        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))',
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(4px)' }}
      onError={() => setFailed(true)} />
  )
}

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}>
    {children}
  </motion.div>
)

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate  = useNavigate()
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const [expanded, setExpanded] = useState('prep')

  const service = SERVICES.find(s => s.slug === slug)
  const sEN     = SERVICE_EN[slug] ?? {}

  // Helper: pick English or Persian field
  const p = (faVal, enKey) => isEN && sEN[enKey] ? sEN[enKey] : faVal

  if (!service) {
    return (
      <Box sx={{ minHeight: '100vh' }}>
        <Navbar />
        <Container sx={{ py: 20, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#888' }}>{isEN ? 'Service not found' : 'خدمت مورد نظر یافت نشد'}</Typography>
          <Button onClick={() => navigate('/services')} sx={{ mt: 3 }}>{isEN ? 'Back to Services' : 'بازگشت به خدمات'}</Button>
        </Container>
        <Footer />
      </Box>
    )
  }

  const icon      = ICON_MAP[service.slug]?.(service.color)
  const realImage = IMAGE_MAP[service.slug]

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <Box sx={{ pt: { xs: '130px', md: '155px' }, pb: 0, background: service.gradient, position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        {[...Array(3)].map((_, i) => (
          <Box key={i} sx={{ position: 'absolute',
            width: 200 + i * 120, height: 200 + i * 120, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.12)',
            top: `${-30 + i * 20}%`, right: `${-10 + i * 10}%`, pointerEvents: 'none' }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="stretch">
            <Grid item xs={12} md={7} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}>
                {/* Breadcrumb */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
                  <Box onClick={() => navigate('/services')}
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5,
                      color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.85rem',
                      '&:hover': { color: '#fff' } }}>
                    <ArrowBackIcon sx={{ fontSize: '0.9rem' }} />
                    {isEN ? 'Back to Services' : 'بازگشت به خدمات'}
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>/</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {p(service.title, 'title')}
                  </Typography>
                </Box>

                <Chip label={p(service.category, 'category')}
                  sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff',
                    fontWeight: 600, mb: 2, fontSize: '0.9rem' }} />
                <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.8rem' }, lineHeight: 1.3, mb: 2 }}>
                  {p(service.title, 'title')}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem',
                  fontFamily: 'monospace', mb: 3 }}>
                  {service.subtitle}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem',
                  lineHeight: 1.9, mb: 4 }}>
                  {p(service.description, 'description')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: { xs: 4, md: 6 } }}>
                  <Chip icon={<AccessTimeIcon sx={{ color: '#fff !important' }} />}
                    label={p(service.duration, 'duration')}
                    sx={{ background: 'rgba(255,255,255,0.15)', color: '#fff',
                      fontWeight: 600, fontSize: '0.9rem' }} />
                  <Button variant="contained"
                    component="a" href="tel:02833224218"
                    sx={{ background: '#fff', color: service.color, borderRadius: '50px',
                      px: 4, fontWeight: 700, textDecoration: 'none',
                      '&:hover': { background: '#f0f0f0' } }}>
                    📞 {isEN ? 'Book Appointment' : 'رزرو نوبت'}
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', pb: 0 }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                style={{ alignSelf: 'flex-end' }}>
                <Box sx={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)',
                  borderRadius: '24px 24px 0 0', p: 5, textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.2)', borderBottom: 'none',
                  minWidth: 280 }}>
                  <ImageWithFallback src={realImage} alt={service.title} icon={icon} />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: 8 }}>

        <Grid container spacing={5}>
          {/* Left: main content */}
          <Grid item xs={12} md={8}>

            {/* What is it */}
            <FadeIn>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4,
                border: '1px solid #eee', background: '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ background: `${service.color}20`, width: 48, height: 48 }}>
                    <LocalHospitalIcon sx={{ color: service.color }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{isEN ? 'What is this scan?' : 'این اسکن چیست؟'}</Typography>
                </Box>
                <Typography sx={{ color: '#444', lineHeight: 2.2, fontSize: '1.05rem' }}>
                  {p(service.fullContent, 'fullContent')}
                </Typography>
              </Paper>
            </FadeIn>

            {/* Indications */}
            <FadeIn delay={0.1}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4,
                border: '1px solid #eee', background: '#fff' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  {isEN ? 'Clinical Indications' : 'موارد درخواست اسکن'}
                </Typography>
                <Grid container spacing={1.5}>
                  {p(service.details, 'details').map((d, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5,
                        p: 1.5, borderRadius: 2, background: `${service.color}08`,
                        border: `1px solid ${service.color}20` }}>
                        <CheckCircleIcon sx={{ color: service.color, fontSize: '1.1rem',
                          mt: 0.2, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: '0.92rem', color: '#444', lineHeight: 1.6 }}>
                          {d}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </FadeIn>

            {/* Accordion: Preparation + Procedure + FAQ */}
            <FadeIn delay={0.15}>
              <Box sx={{ mb: 4 }}>
                {/* Preparation */}
                <Accordion expanded={expanded === 'prep'}
                  onChange={() => setExpanded(expanded === 'prep' ? false : 'prep')}
                  elevation={0} sx={{ mb: 1.5, borderRadius: '16px !important',
                    border: '1px solid #eee', overflow: 'hidden',
                    '&:before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    sx={{ py: 1.5, px: 3,
                      background: expanded === 'prep' ? `${service.color}10` : '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ background: `${service.color}20`, width: 36, height: 36 }}>
                        <InfoOutlinedIcon sx={{ color: service.color, fontSize: '1.1rem' }} />
                      </Avatar>
                      <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        {isEN ? 'Preparation Before the Scan' : 'آمادگی قبل از اسکن'}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    <List dense disablePadding>
                      {p(service.preparation, 'preparation').map((p, i) => (
                        <ListItem key={i} disableGutters sx={{ py: 0.8 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Box sx={{ width: 26, height: 26, borderRadius: '50%',
                              background: `${service.color}20`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: service.color, fontWeight: 700, fontSize: '0.8rem' }}>
                              {i + 1}
                            </Box>
                          </ListItemIcon>
                          <ListItemText primary={p}
                            primaryTypographyProps={{ sx: { color: '#444', lineHeight: 1.7 } }} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                {/* Procedure */}
                <Accordion expanded={expanded === 'proc'}
                  onChange={() => setExpanded(expanded === 'proc' ? false : 'proc')}
                  elevation={0} sx={{ mb: 1.5, borderRadius: '16px !important',
                    border: '1px solid #eee', overflow: 'hidden',
                    '&:before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    sx={{ py: 1.5, px: 3,
                      background: expanded === 'proc' ? `${service.color}10` : '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ background: `${service.color}20`, width: 36, height: 36 }}>
                        <LocalHospitalIcon sx={{ color: service.color, fontSize: '1.1rem' }} />
                      </Avatar>
                      <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        {isEN ? 'How the Scan is Performed' : 'نحوه انجام اسکن'}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    {p(service.procedure, 'procedure').map((step, i) => (
                      <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
                        <Box sx={{ width: 32, height: 32, borderRadius: '50%',
                          background: service.gradient, flexShrink: 0, mt: 0.3,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>
                          {i + 1}
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 600, mb: 0.4 }}>{step.title}</Typography>
                          <Typography sx={{ color: '#666', lineHeight: 1.8, fontSize: '0.95rem' }}>
                            {step.desc}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>

                {/* FAQ */}
                <Accordion expanded={expanded === 'faq'}
                  onChange={() => setExpanded(expanded === 'faq' ? false : 'faq')}
                  elevation={0} sx={{ borderRadius: '16px !important',
                    border: '1px solid #eee', overflow: 'hidden',
                    '&:before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    sx={{ py: 1.5, px: 3,
                      background: expanded === 'faq' ? `${service.color}10` : '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ background: `${service.color}20`, width: 36, height: 36 }}>
                        <WarningAmberIcon sx={{ color: service.color, fontSize: '1.1rem' }} />
                      </Avatar>
                      <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        {isEN ? 'Frequently Asked Questions' : 'سوالات متداول'}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    {p(service.faq, 'faq').map((item, i) => (
                      <Box key={i} sx={{ mb: 3 }}>
                        <Typography sx={{ fontWeight: 700, color: service.color, mb: 0.8 }}>
                          {item.q}
                        </Typography>
                        <Typography sx={{ color: '#555', lineHeight: 1.9, fontSize: '0.95rem' }}>
                          {item.a}
                        </Typography>
                        {i < service.faq.length - 1 && <Divider sx={{ mt: 2 }} />}
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </FadeIn>
          </Grid>

          {/* Right: sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <FadeIn delay={0.2}>
                {/* Quick info card */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, mb: 3,
                  border: `2px solid ${service.color}30`,
                  background: `linear-gradient(135deg, ${service.color}08 0%, #fff 100%)` }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
                    {isEN ? 'Quick Info' : 'اطلاعات سریع'}
                  </Typography>
                  {[
                    { label: isEN ? 'Duration' : 'مدت زمان',        value: p(service.duration, 'duration'), icon: '⏱️' },
                    { label: isEN ? 'Category' : 'دسته‌بندی',        value: p(service.category, 'category'), icon: '🏷️' },
                    { label: isEN ? 'Radiotracer' : 'ماده رادیواکتیو', value: service.tracer,                  icon: '⚗️' },
                    { label: isEN ? 'Radiation' : 'پرتوگیری',        value: p(service.radiation, 'radiation'), icon: '☢️' },
                    { label: isEN ? 'Results' : 'نتیجه',             value: p(service.resultTime, 'resultTime'), icon: '📋' },
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', py: 1.2,
                      borderBottom: i < 4 ? '1px solid #f0f0f0' : 'none' }}>
                      <Typography sx={{ color: '#888', fontSize: '0.88rem' }}>
                        {item.icon} {item.label}
                      </Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#333' }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Paper>

                {/* Safety note */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, mb: 3,
                  background: '#fff8e1', border: '1px solid #ffe082' }}>
                  <Typography sx={{ fontWeight: 700, mb: 1.5, color: '#f57f17' }}>
                    ⚠️ {isEN ? 'Safety Notes' : 'نکات ایمنی'}
                  </Typography>
                  {p(service.safety, 'safety').map((note, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                      <WarningAmberIcon sx={{ color: '#f57f17', fontSize: '1rem', mt: 0.2, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.7 }}>
                        {note}
                      </Typography>
                    </Box>
                  ))}
                </Paper>

                {/* CTA */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4,
                  background: service.gradient, color: '#fff', textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {isEN ? 'Book Appointment' : 'رزرو نوبت'}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', opacity: 0.85, mb: 2.5 }}>
                    {isEN ? 'Contact us to schedule your appointment' : 'برای رزرو وقت با ما تماس بگیرید'}
                  </Typography>
                  <Button fullWidth variant="contained"
                    component="a" href="tel:02833224218"
                    startIcon={<PhoneIcon />}
                    sx={{ background: '#fff', color: service.color, borderRadius: '50px',
                      fontWeight: 700, py: 1.2, textDecoration: 'none',
                      '&:hover': { background: '#f0f0f0' } }}>
                    028-33224218
                  </Button>
                </Paper>
              </FadeIn>
            </Box>
          </Grid>
        </Grid>

        {/* Related services */}
        <FadeIn delay={0.2}>
          <Divider sx={{ my: 6 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
            {isEN ? 'Other Services' : 'سایر خدمات مرکز'}
          </Typography>
          <Grid container spacing={2}>
            {SERVICES.filter(s => s.slug !== service.slug).slice(0, 4).map((s, i) => {
              const sRelEN = SERVICE_EN[s.slug] ?? {}
              return (
              <Grid item xs={12} sm={6} md={3} key={s.slug}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card elevation={0} onClick={() => navigate(`/services/${s.slug}`)}
                    sx={{ borderRadius: 3, cursor: 'pointer', border: '1px solid #eee',
                      transition: 'all 0.3s', '&:hover': { borderColor: s.color,
                        boxShadow: `0 8px 25px ${s.color}25` } }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ height: 4, background: s.gradient, borderRadius: 2, mb: 2 }} />
                      <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', mb: 0.5 }}>
                        {isEN && sRelEN.title ? sRelEN.title : s.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: '#888' }}>
                        {isEN && sRelEN.category ? sRelEN.category : s.category}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
            })}
          </Grid>
        </FadeIn>
      </Container>

      <Footer />
    </Box>
  )
}