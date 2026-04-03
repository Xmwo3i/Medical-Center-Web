import { useTranslation } from 'react-i18next'
import React from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Link,
  Tooltip
} from '@mui/material'
import { motion } from 'framer-motion'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import InstagramIcon from '@mui/icons-material/Instagram'
import TelegramIcon from '@mui/icons-material/Telegram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FavoriteIcon from '@mui/icons-material/Favorite'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import VerifiedIcon from '@mui/icons-material/Verified'

const MotionBox = motion(Box)

const Footer = () => {
  const { t } = useTranslation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { text: t('footer.links.home'), path: '/' },
    { text: t('footer.links.about'), path: '/about' },
    { text: t('footer.links.services'), path: '/services' },
    { text: t('footer.ourScans'), path: '/scans' },
    { text: t('footer.links.articles'), path: '/articles' },
    { text: t('footer.contactUs'), path: '/contact' }
  ]

  const services = [
    { text: t('footer.scans.heart'), path: '/scans/heart' },
    { text: t('footer.scans.bone'), path: '/scans/bone' },
    { text: t('footer.scans.kidney'), path: '/scans/kidney' },
    { text: t('footer.scans.thyroid'), path: '/scans/thyroid' },
    { text: t('footer.scans.lung'), path: '/scans/lung' },
    { text: t('footer.scans.pet'), path: '/scans/pet' }
  ]

  const socialLinks = [
    { icon: <InstagramIcon />, name: 'Instagram', url: '#', color: '#E4405F' },
    { icon: <TelegramIcon />, name: 'Telegram', url: '#', color: '#0088cc' },
    { icon: <WhatsAppIcon />, name: 'WhatsApp', url: '#', color: '#25D366' },
    { icon: <LinkedInIcon />, name: 'LinkedIn', url: '#', color: '#0077B5' }
  ]

  const contactInfo = [
    { icon: <PhoneIcon />, text: '011-33XXXXXX', subText: t('footer.contact.phone') },
    { icon: <EmailIcon />, text: 'info@caspian-nuclear.ir', subText: t('footer.contact.email') },
    { icon: <LocationOnIcon />, text: t('footer.contact.address'), subText:  t('footer.contact.street') },
    { icon: <AccessTimeIcon />, text: t('footer.contact.hours'), subText: t('footer.contact.time') }
  ]

  const certificates = [
    { name: t('footer.badges.trust'), icon: '🏅' },
    { name: t('footer.badges.health'), icon: '⚕️' },
    { name: 'ISO 9001', icon: '📜' },
    { name: t('footer.badges.atomic'), icon: '☢️' }
  ]

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Wave Separator */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          left: 0,
          right: 0,
          height: 100,
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C150,100 350,0 500,50 C650,100 800,20 1000,50 C1200,80 1350,20 1440,50 L1440,100 L0,100 Z"
            fill="url(#footerGradient)"
          />
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B6E4F" />
              <stop offset="50%" stopColor="#17a2a2" />
              <stop offset="100%" stopColor="#1976D2" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      {/* Newsletter Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0B6E4F 0%, #17a2a2 50%, #1976D2 100%)',
          pt: 12,
          pb: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements */}
        {[...Array(6)].map((_, i) => (
          <MotionBox
            key={i}
            sx={{
              position: 'absolute',
              width: { xs: 100, md: 200 },
              height: { xs: 100, md: 200 },
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255, 255, 255, ${0.05 - i * 0.008}) 0%, transparent 70%)`,
              filter: 'blur(40px)'
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              left: `${(i % 3) * 35}%`,
              top: `${Math.floor(i / 3) * 50}%`
            }}
          />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Main Footer Content */}
          <Grid container spacing={4}>
            {/* Logo & About */}
            <Grid item xs={12} md={4}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, mb: 0 }}>
                  <Box
                    component="img"
                    src="/assets/images/caspian.png"
                    alt="Caspian Logo"
                    sx={{
                      height: 160,
                      width: 'auto',
                      filter: 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                    }}
                  />
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 2,
                    mb: 3,
                    textAlign: 'justify'
                  }}
                >
                  {t('footer.description')}
                </Typography>

                {/* Social Links */}
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  {socialLinks.map((social, index) => (
                    <Tooltip key={index} title={social.name} arrow>
                      <motion.div
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconButton
                          href={social.url}
                          sx={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#fff',
                            width: 45,
                            height: 45,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: social.color,
                              borderColor: social.color,
                              boxShadow: `0 4px 15px ${social.color}50`
                            }
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      </motion.div>
                    </Tooltip>
                  ))}
                </Box>
              </MotionBox>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={6} sm={6} md={2}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    mb: 3,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      right: 0,
                      width: 40,
                      height: 3,
                      background: '#34A853',
                      borderRadius: 2
                    }
                  }}
                >
                  {t('footer.quickLinks')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {quickLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={link.path}
                        underline="none"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.85)',
                          fontSize: '0.95rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#fff'
                          },
                          '&::before': {
                            content: '"◂"',
                            fontSize: '0.8rem',
                            color: '#34A853',
                            opacity: 0,
                            transition: 'opacity 0.3s ease'
                          },
                          '&:hover::before': {
                            opacity: 1
                          }
                        }}
                      >
                        {link.text}
                      </Link>
                    </motion.div>
                  ))}
                </Box>
              </MotionBox>
            </Grid>

            {/* Services */}
            <Grid item xs={6} sm={6} md={2}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    mb: 3,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      right: 0,
                      width: 40,
                      height: 3,
                      background: '#34A853',
                      borderRadius: 2
                    }
                  }}
                >
                  {t('footer.servicesTitle')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={service.path}
                        underline="none"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.85)',
                          fontSize: '0.95rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#fff'
                          },
                          '&::before': {
                            content: '"◂"',
                            fontSize: '0.8rem',
                            color: '#34A853',
                            opacity: 0,
                            transition: 'opacity 0.3s ease'
                          },
                          '&:hover::before': {
                            opacity: 1
                          }
                        }}
                      >
                        {service.text}
                      </Link>
                    </motion.div>
                  ))}
                </Box>
              </MotionBox>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={4}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    mb: 3,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      right: 0,
                      width: 40,
                      height: 3,
                      background: '#34A853',
                      borderRadius: 2
                    }
                  }}
                >
                  {t('footer.contactUs')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2
                        }}
                      >
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#34A853',
                            flexShrink: 0,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: '#34A853',
                              color: '#fff'
                            }
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: '#fff',
                              fontWeight: 600,
                              fontSize: '0.95rem',
                              mb: 0.3
                            }}
                          >
                            {info.text}
                          </Typography>
                          <Typography
                            sx={{
                              color: 'rgba(255, 255, 255, 0.6)',
                              fontSize: '0.85rem'
                            }}
                          >
                            {info.subText}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </MotionBox>
            </Grid>
          </Grid>

          {/* Certificates Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            sx={{ mt: 6 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 3,
                p: 3,
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      px: 3,
                      py: 1.5,
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)'
                      }
                    }}
                  >
                    <Typography sx={{ fontSize: '1.8rem' }}>{cert.icon}</Typography>
                    <Typography
                      sx={{
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}
                    >
                      {cert.name}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </MotionBox>

          {/* Divider */}
          <Divider
            sx={{
              my: 4,
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          />

          {/* Bottom Bar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: { xs: 'center', md: 'right' }
              }}
            >
              {t('footer.copyright')}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                {t('footer.designedWith')}
              </Typography>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FavoriteIcon sx={{ color: '#FF6B6B', fontSize: '1.2rem' }} />
              </motion.div>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                {t('footer.inIran')}
              </Typography>
            </Box>
          </Box>
        </Container>

        {/* Scroll to Top Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            position: 'fixed',
            bottom: 30,
            left: 30,
            zIndex: 1000
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              onClick={scrollToTop}
              sx={{
                width: 50,
                height: 50,
                background: 'linear-gradient(135deg, #34A853 0%, #1976D2 100%)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(52, 168, 83, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2E7D32 0%, #1565C0 100%)',
                  boxShadow: '0 6px 25px rgba(52, 168, 83, 0.5)'
                }
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  )
}

export default Footer