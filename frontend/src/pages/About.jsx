import React from 'react'
import {
  Box, Container, Grid, Typography, Paper, Avatar, Divider, Chip, Button
} from '@mui/material'
import { motion } from 'framer-motion'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import VerifiedIcon from '@mui/icons-material/Verified'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MotionBox = motion(Box)

const doctors = [
  { name: 'دکتر امیر حسن‌زاده', title: 'متخصص پزشکی هسته‌ای', experience: '۲۲ سال', emoji: '👨‍⚕️', color: '#0B6E4F' },
  { name: 'دکتر مریم صادقی', title: 'فوق‌تخصص آنکولوژی هسته‌ای', experience: '۱۵ سال', emoji: '👩‍⚕️', color: '#1976D2' },
  { name: 'دکتر رضا کمالی', title: 'متخصص رادیولوژی و تصویربرداری', experience: '۱۸ سال', emoji: '👨‍⚕️', color: '#7B1FA2' },
  { name: 'دکتر نیلوفر قاسمی', title: 'متخصص داخلی و غدد', experience: '۱۲ سال', emoji: '👩‍⚕️', color: '#F38181' },
]

const timeline = [
  { year: '۱۳۷۹', title: 'تأسیس مرکز', desc: 'آغاز فعالیت با یک دوربین گاما و تیمی ۵ نفره در قزوین' },
  { year: '۱۳۸۵', title: 'توسعه تجهیزات', desc: 'افزودن دستگاه SPECT و گسترش فضای مرکز' },
  { year: '۱۳۹۰', title: 'گواهینامه ISO', desc: 'دریافت گواهینامه مدیریت کیفیت ISO 9001' },
  { year: '۱۳۹۵', title: 'پت اسکن', desc: 'راه‌اندازی اولین دستگاه PET-CT استان' },
  { year: '۱۴۰۰', title: 'دیجیتالی‌سازی', desc: 'ارائه نتایج آنلاین و نوبت‌دهی اینترنتی' },
  { year: '۱۴۰۴', title: 'امروز', desc: 'بیش از ۵۰,۰۰۰ بیمار راضی و ۱۶+ بیمه طرف قرارداد' },
]

const stats = [
  { number: '+۲۰', label: 'سال تجربه', emoji: '📅' },
  { number: '+۵۰K', label: 'بیمار راضی', emoji: '😊' },
  { number: '۱۶+', label: 'بیمه طرف قرارداد', emoji: '🏦' },
  { number: '۲۴/۷', label: 'پشتیبانی', emoji: '⏰' },
  { number: '۶', label: 'دستگاه پیشرفته', emoji: '🔬' },
  { number: '۸+', label: 'نوع اسکن', emoji: '📋' },
]

const certifications = [
  { title: 'نماد اعتماد الکترونیکی', emoji: '🏅', issuer: 'وزارت صنعت، معدن و تجارت' },
  { title: 'گواهینامه ISO 9001:2015', emoji: '📜', issuer: 'سازمان استاندارد ایران' },
  { title: 'مجوز وزارت بهداشت', emoji: '⚕️', issuer: 'وزارت بهداشت، درمان و آموزش پزشکی' },
  { title: 'تأییدیه سازمان انرژی اتمی', emoji: '☢️', issuer: 'سازمان انرژی اتمی ایران' },
]

const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
  const variants = {
    hidden: { opacity: 0, y: direction === 'up' ? 40 : -40, x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }
  }
  return (
    <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: 10,
        background: 'linear-gradient(135deg, #0B6E4F 0%, #17a2a2 50%, #1976D2 100%)',
        position: 'relative', overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <MotionBox key={i}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
            sx={{ position: 'absolute', width: 200 + i * 60, height: 200 + i * 60,
              borderRadius: '50%', background: `rgba(255,255,255,${0.03 + i * 0.01})`,
              top: `${-20 + i * 25}%`, right: `${-10 + i * 18}%`, pointerEvents: 'none' }} />
        ))}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <FadeIn>
            <Box sx={{ mb: 3 }}>
              <Box component="img" src="/assets/images/caspian.png" alt="Caspian"
                sx={{ height: 120, filter: 'brightness(0) invert(1)', mb: 3 }} />
            </Box>
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
              درباره مرکز کاسپین
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: 650, mx: 'auto', lineHeight: 1.9 }}>
              بیش از ۲۰ سال تجربه در ارائه خدمات تخصصی پزشکی هسته‌ای با بهره‌گیری از پیشرفته‌ترین تجهیزات و متخصص‌ترین کادر درمانی
            </Typography>
          </FadeIn>
        </Container>
      </Box>

      {/* Stats */}
      <Box sx={{ py: 8, background: '#fff' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {stats.map((stat, i) => (
              <Grid item xs={6} sm={4} md={2} key={i}>
                <FadeIn delay={i * 0.08}>
                  <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderRadius: 4,
                    border: '1px solid #f0f0f0', transition: 'all 0.3s',
                    '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.1)', transform: 'translateY(-5px)' } }}>
                    <Typography sx={{ fontSize: '2rem', mb: 1 }}>{stat.emoji}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#0B6E4F', mb: 0.5 }}>{stat.number}</Typography>
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
                <Chip label="داستان ما" sx={{ background: '#E6F4EA', color: '#0B6E4F', fontWeight: 600, mb: 3 }} />
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: '#1a1a2e', lineHeight: 1.4 }}>
                  پیشرو در پزشکی هسته‌ای ایران
                </Typography>
                <Typography sx={{ color: '#555', lineHeight: 2.2, mb: 3, fontSize: '1.05rem' }}>
                  مرکز پزشکی هسته‌ای کاسپین در سال ۱۳۷۹ با هدف ارائه خدمات تخصصی تصویربرداری هسته‌ای در قزوین تأسیس شد. از همان ابتدا، رسالت ما تشخیص دقیق، درمان مؤثر و ارائه بهترین تجربه برای بیماران بوده است.
                </Typography>
                <Typography sx={{ color: '#555', lineHeight: 2.2, mb: 4, fontSize: '1.05rem' }}>
                  در طول دو دهه، با سرمایه‌گذاری مداوم در تجهیزات و آموزش کادر درمانی، به یکی از پیشرفته‌ترین مراکز پزشکی هسته‌ای در شمال‌غرب کشور تبدیل شده‌ایم. امروز با ۶ دستگاه پیشرفته، تیمی از ۴ متخصص و بیش از ۵۰,۰۰۰ بیمار خدمت‌گزاری کرده‌ایم.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {['تشخیص دقیق', 'ایمنی بیمار', 'فناوری پیشرفته', 'رضایت بیمار'].map(tag => (
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
                    { emoji: '🎯', title: 'مأموریت', text: 'ارائه خدمات تخصصی پزشکی هسته‌ای با دقت و ایمنی بالا' },
                    { emoji: '👁️', title: 'چشم‌انداز', text: 'تبدیل شدن به مرجع پزشکی هسته‌ای در سطح ملی' },
                    { emoji: '💎', title: 'ارزش‌ها', text: 'صداقت، دقت، احترام به بیمار و پیشرفت مستمر' },
                    { emoji: '🤝', title: 'تعهد', text: 'همکاری با بیش از ۱۶ بیمه برای دسترسی آسان بیماران' },
                  ].map((item, i) => (
                    <Grid item xs={6} key={i}>
                      <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #f0f0f0', height: '100%',
                        transition: 'all 0.3s', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.08)', borderColor: '#0B6E4F' } }}>
                        <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>{item.emoji}</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a2e', fontSize: '1rem' }}>{item.title}</Typography>
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
              مسیر ما
            </Typography>
          </FadeIn>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ position: 'absolute', right: '50%', top: 0, bottom: 0, width: 2,
              background: 'linear-gradient(180deg, #0B6E4F 0%, #1976D2 100%)',
              display: { xs: 'none', md: 'block' } }} />
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <Box sx={{ display: 'flex', mb: 5, flexDirection: { xs: 'column', md: i % 2 === 0 ? 'row' : 'row-reverse' },
                  alignItems: { md: 'center' }, gap: 3 }}>
                  <Box sx={{ flex: 1, textAlign: { md: i % 2 === 0 ? 'left' : 'right' } }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3,
                      background: i === timeline.length - 1 ? 'linear-gradient(135deg, #0B6E4F, #1976D2)' : '#f8f9fa',
                      border: '1px solid', borderColor: i === timeline.length - 1 ? 'transparent' : '#eee' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5,
                        color: i === timeline.length - 1 ? '#fff' : '#1a1a2e' }}>{item.title}</Typography>
                      <Typography variant="body2" sx={{ color: i === timeline.length - 1 ? 'rgba(255,255,255,0.85)' : '#666',
                        lineHeight: 1.7 }}>{item.desc}</Typography>
                    </Paper>
                  </Box>
                  <Box sx={{ flexShrink: 0, zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ width: 70, height: 70, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0B6E4F, #1976D2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 800, fontSize: '0.95rem', mx: 'auto',
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
              تیم متخصص ما
            </Typography>
            <Typography sx={{ color: '#888', textAlign: 'center', mb: 8, fontSize: '1.05rem' }}>
              با تجربه‌ترین متخصصان پزشکی هسته‌ای در خدمت سلامت شما
            </Typography>
          </FadeIn>
          <Grid container spacing={4} justifyContent="center">
            {doctors.map((doc, i) => (
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
                      <Chip label={`${doc.experience} تجربه`} size="small"
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
              گواهینامه‌ها و مجوزها
            </Typography>
            <Typography sx={{ color: '#888', textAlign: 'center', mb: 8 }}>
              تأییدیه‌های رسمی از معتبرترین نهادهای نظارتی
            </Typography>
          </FadeIn>
          <Grid container spacing={3} justifyContent="center">
            {certifications.map((cert, i) => (
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

      {/* Contact Info */}
      <Box sx={{ py: 10, background: 'linear-gradient(135deg, #0B6E4F 0%, #1976D2 100%)' }}>
        <Container maxWidth="lg">
          <FadeIn>
            <Typography variant="h3" sx={{ fontWeight: 800, textAlign: 'center', mb: 8, color: '#fff' }}>
              اطلاعات تماس
            </Typography>
          </FadeIn>
          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: <LocationOnIcon sx={{ fontSize: '2rem' }} />, title: 'آدرس', value: 'قزوین، خیام جنوبی، کوچه خضری، پلاک ۳' },
              { icon: <PhoneIcon sx={{ fontSize: '2rem' }} />, title: 'تلفن', value: '۰۲۸-۳۳XXXXXX' },
              { icon: <EmailIcon sx={{ fontSize: '2rem' }} />, title: 'ایمیل', value: 'info@caspian-nuclear.ir' },
              { icon: <AccessTimeIcon sx={{ fontSize: '2rem' }} />, title: 'ساعات کار', value: 'شنبه تا پنجشنبه، ۸ صبح تا ۸ شب' },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <FadeIn delay={i * 0.1}>
                  <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: 'center',
                    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
                    transition: 'all 0.3s', '&:hover': { background: 'rgba(255,255,255,0.18)' } }}>
                    <Box sx={{ color: '#A8E6CF', mb: 2 }}>{item.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>{item.value}</Typography>
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
                📞 تماس با ما
              </Button>
              <Button variant="outlined" size="large"
                sx={{ borderColor: '#fff', borderWidth: 2, color: '#fff', borderRadius: '50px', px: 6, py: 1.8,
                  fontWeight: 700, fontSize: '1.1rem', '&:hover': { background: 'rgba(255,255,255,0.1)', borderWidth: 2 } }}>
                رزرو آنلاین
              </Button>
            </Box>
          </FadeIn>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}