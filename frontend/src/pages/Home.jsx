import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Paper,
  Chip
} from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import ArticleIcon from '@mui/icons-material/Article'
import InfoIcon from '@mui/icons-material/Info'
import PhoneIcon from '@mui/icons-material/Phone'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Footer from '../components/Footer'
import WhyUsSection from '../components/WhyUsSection'
import ScansSection from '../components/scansSection'
import MedicalEquipmentSection from '../components/medicalEquipmentSection'
import Navbar from '../components/Navbar'

const MotionBox = motion(Box)
const MotionCard = motion(Card)

// Typing Animation Component
const TypeWriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && index < text.length) {
        setDisplayText(text.substring(0, index + 1))
        setIndex(index + 1)
      } else if (!isDeleting && index === text.length) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && index > 0) {
        setDisplayText(text.substring(0, index - 1))
        setIndex(index - 1)
      } else if (isDeleting && index === 0) {
        setIsDeleting(false)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [index, isDeleting, text])

  return (
    <Typography
      variant="h2"
      component="h1"
      sx={{
        fontWeight: 'bold',
        color: '#fff',
        textShadow: '0 4px 12px rgba(0,0,0,0.3)',
        fontSize: { xs: '2rem', md: '3.5rem' }
      }}
    >
      {displayText}
      <span style={{
        animation: 'blink 1s infinite',
        marginLeft: '8px'
      }}>|</span>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Typography>
  )
}


// Hero Section with Video Background
const HeroSection = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Video Background */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'brightness(0.4)'
        }}
      >
        <source src="/assets/videos/scan-device.mp4" type="video/mp4" />
      </Box>

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.5) 0%, rgba(23, 162, 162, 0.4) 45%, rgba(11, 110, 79, 0.5) 100%)',
          zIndex: 0
        }}
      />

      {/* Animated Background Elements */}
      {[...Array(8)].map((_, i) => (
        <MotionBox
          key={i}
          sx={{
            position: 'absolute',
            width: { xs: 150, md: 250 },
            height: { xs: 150, md: 250 },
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255, 255, 255, ${0.08 - i * 0.01}) 0%, transparent 70%)`,
            filter: 'blur(60px)',
            zIndex: 0
          }}
          animate={{
            x: [
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100
            ],
            y: [
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100
            ],
            scale: [1, 1.3, 0.9, 1.2, 1],
            opacity: [0.3, 0.6, 0.4, 0.5, 0.3]
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
          style={{
            left: `${10 + (i % 4) * 25}%`,
            top: `${10 + Math.floor(i / 4) * 40}%`
          }}
        />
      ))}

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <MotionBox
          key={`particle-${i}`}
          sx={{
            position: 'absolute',
            width: { xs: 4, md: 6 },
            height: { xs: 4, md: 6 },
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            zIndex: 0
          }}
          animate={{
            y: [0, -100, -200, -300],
            opacity: [0, 0.8, 0.5, 0],
            scale: [0, 1, 1.2, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            bottom: 0
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <MotionBox
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <TypeWriter text={t('home.hero.title')} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: '#E6F4EA',
                mt: 3,
                mb: 5,
                fontSize: { xs: '1rem', md: '1.5rem' },
                textShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              {t('home.hero.subtitle')}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: '#fff',
                    color: '#0B6E4F',
                    px: 5,
                    py: 1.8,
                    borderRadius: '35px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(255,255,255,0.3)',
                    '&:hover': {
                      background: '#E6F4EA',
                      boxShadow: '0 12px 35px rgba(255,255,255,0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t('home.hero.bookBtn')}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#fff',
                    borderWidth: 2,
                    color: '#fff',
                    px: 5,
                    py: 1.8,
                    borderRadius: '35px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.15)',
                      borderColor: '#E6F4EA',
                      borderWidth: 2,
                      backdropFilter: 'blur(10px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t('home.hero.learnBtn')}
                </Button>
              </motion.div>
            </Box>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Grid container spacing={3} sx={{ mt: 8 }}>
              {[
                { number: '+20', label: t('home.stats.experience') },
                { number: '+50K', label: t('home.stats.patients') },
                { number: '16+', label: t('home.stats.insurance') },
                { number: '24/7', label: t('home.stats.support') }
              ].map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 1.7 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 3,
                        p: 3,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.15)',
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
                        }
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          color: '#fff',
                          fontWeight: 'bold',
                          mb: 1,
                          textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#E6F4EA',
                          fontSize: '0.95rem'
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </MotionBox>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 50,
              border: '2px solid rgba(255,255,255,0.5)',
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center',
              pt: 1
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 10,
                background: '#fff',
                borderRadius: '3px'
              }}
            />
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  )
}

// Insurance Slider with Real Images
const InsuranceSlider = () => {
  const { t } = useTranslation()
  const insurances = [
    { name: 'خدمات درمانی', image: '/assets/images/khadamatDarmani.png' },
    { name: 'نیروهای مسلح', image: '/assets/images/NiroMosalah-removebg-preview.png' },
    { name: 'بیمه ملت', image: '/assets/images/bimeMelat-removebg-preview.png' },
    { name: 'بانک ملی', image: '/assets/images/bankMeli.png' },
    { name: 'بانک رفاه کارگران', image: '/assets/images/BankRefahKargaran-removebg-preview.png' },
    { name: 'تامین اجتماعی', image: '/assets/images/tamin ejtemaee Logo Vector.png' },
    { name: 'بیمه تعاون', image: '/assets/images/Ta\'avon Insurance Logo Vector.png' },
    { name: 'بانک سپه', image: '/assets/images/sepah bank logo Vector.png' },
    { name: 'بانک صادرات', image: '/assets/images/Saderat bank logo Vector.png' },
    { name: 'بانک ملت', image: '/assets/images/Mellat bank logo Vector.png' },
    { name: 'بانک مسکن', image: '/assets/images/Maskan bank logo Vector.png' },
    { name: 'بیمه معلم', image: '/assets/images/bimeMoalem.png' },
    { name: 'بانک کشاورزی', image: '/assets/images/Keshavarzi bank logo Vector.png' },
    { name: 'بیمه دی', image: '/assets/images/Day Insurance Logo Vector.png' },
    { name: 'بیمه آسیا', image: '/assets/images/Asia Insurance Logo Vector.png' },
    { name: 'بیمه دانا', image: '/assets/images/bimaDana.png' },
    { name: 'بیمه سینا', image: '/assets/images/bimaSina.png' },
    { name: 'بیمه البرز', image: '/assets/images/bime-alborz-600x600.png' },
    { name: 'بیمه ما', image: '/assets/images/Bime-Ma-Logo-600x600.png' },
    { name: 'بیمه سامان', image: '/assets/images/Saman Insurance Logo Vector.png' }
  ]

  return (
    <Box sx={{ py: 10, background: '#E6F4EA', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              color: '#0B6E4F',
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}
          >
            {t('home.insurance.title')}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 6, color: '#666' }}
          >
            {t('home.insurance.subtitle')}
          </Typography>
        </MotionBox>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={4000}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 25 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              1024: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
            {insurances.map((insurance, index) => (
              <SwiperSlide key={index}>
                <MotionBox
                  whileHover={{
                    scale: 1.15,
                    y: -15
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  sx={{
                    position: 'relative'
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      borderRadius: 3,
                      background: 'transparent',
                      cursor: 'pointer',
                      minHeight: 120,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      isolation: 'isolate',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: '10%',
                        right: '10%',
                        bottom: -5,
                        height: '20px',
                        borderRadius: '50%',
                        background: 'radial-gradient(closest-side, rgba(11, 110, 79, 0.25), rgba(11, 110, 79, 0))',
                        filter: 'blur(8px)',
                        zIndex: -1,
                        opacity: 0.6,
                        transition: 'all 0.3s ease'
                      },
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 20px rgba(52, 168, 83, 0.15)'
                      },
                      '&:hover::after': {
                        opacity: 0.9,
                        transform: 'translateY(3px) scaleX(1.1)',
                        background: 'radial-gradient(closest-side, rgba(11, 110, 79, 0.35), rgba(11, 110, 79, 0))'
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={insurance.image}
                      alt={insurance.name}
                      sx={{
                        maxWidth: '100%',
                        maxHeight: 90,
                        height: 'auto',
                        width: 'auto',
                        objectFit: 'contain',
                        filter: 'grayscale(70%) opacity(0.85) drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                        transition: 'all 0.4s ease',
                        '&:hover': {
                          filter: 'grayscale(0%) opacity(1) drop-shadow(0 6px 12px rgba(52, 168, 83, 0.3))',
                          transform: 'scale(1.1)'
                        }
                      }}
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.style.display = 'none'
                      }}
                    />
                  </Box>
                </MotionBox>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              mt: 6,
              textAlign: 'center',
              p: 3,
              background: 'linear-gradient(135deg, rgba(52, 168, 83, 0.1) 0%, rgba(25, 118, 210, 0.1) 100%)',
              borderRadius: 3,
              border: '2px dashed rgba(52, 168, 83, 0.3)'
            }}
          >
            <Typography variant="body1" sx={{ color: '#0B6E4F', fontWeight: 'bold' }}>
              {t('home.insurance.benefits')}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}



// Main Home Component
function Home() {
  return (
    <Box>
      <Navbar />
      <HeroSection />
      <InsuranceSlider />
      <WhyUsSection />
      <ScansSection />
      <MedicalEquipmentSection/>
      <TestimonialsSection />
      <Footer />
    </Box>
  )
}


// Testimonials Section
const TestimonialsSection = () => {
  const { t } = useTranslation()
  const testimonials = [
    {
      name: t('home.testimonials_section.reviews.0.name'),
      text: t('home.testimonials_section.reviews.0.text'),
      rating: 5,
      avatar: '👨'
    },
    {
      name: t('home.testimonials_section.reviews.1.name'),
      text: t('home.testimonials_section.reviews.1.text'),
      rating: 5,
      avatar: '👩'
    },
    {
      name: t('home.testimonials_section.reviews.2.name'),
      text: t('home.testimonials_section.reviews.2.text'),
      rating: 5,
      avatar: '👨‍⚕️'
    }
  ]

  return (
    <Box sx={{ py: 10, background: 'linear-gradient(180deg, #E3F2FD 0%, #fff 100%)' }}>
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              color: '#0B6E4F'
            }}
          >
            {t('home.testimonials_section.badge')}
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 8, color: '#666' }}>
            {t('home.testimonials.title')}
          </Typography>
        </MotionBox>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  p: 4,
                  background: '#fff',
                  border: '2px solid #E6F4EA'
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h1" sx={{ fontSize: '4rem', mb: 1 }}>
                    {testimonial.avatar}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {testimonial.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Typography key={i} sx={{ color: '#FFD700', fontSize: '1.5rem' }}>
                        ⭐
                      </Typography>
                    ))}
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    position: 'relative',
                    '&::before': {
                      content: '"«"',
                      fontSize: '3rem',
                      color: '#34A853',
                      opacity: 0.2,
                      position: 'absolute',
                      top: -20,
                      right: -10
                    }
                  }}
                >
                  {testimonial.text}
                </Typography>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Home