import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper
} from '@mui/material'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

// Custom SVG Illustrations for each feature
const DoctorIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Circle */}
    <circle cx="100" cy="100" r="90" fill="url(#doctorGrad)" opacity="0.1"/>
    
    {/* Stethoscope */}
    <path d="M70 80 Q50 100 50 130 Q50 160 80 160" stroke="#0B6E4F" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M130 80 Q150 100 150 130 Q150 160 120 160" stroke="#0B6E4F" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <circle cx="100" cy="165" r="12" fill="#0B6E4F"/>
    <circle cx="100" cy="165" r="6" fill="#E6F4EA"/>
    
    {/* Doctor Head */}
    <circle cx="100" cy="60" r="35" fill="#FFE0CC"/>
    <path d="M70 50 Q100 30 130 50" stroke="#4A3728" strokeWidth="8" fill="none" strokeLinecap="round"/>
    
    {/* Face */}
    <circle cx="88" cy="55" r="4" fill="#4A3728"/>
    <circle cx="112" cy="55" r="4" fill="#4A3728"/>
    <path d="M92 70 Q100 78 108 70" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round"/>
    
    {/* Medical Cross on forehead mirror */}
    <circle cx="100" cy="38" r="10" fill="#1976D2"/>
    <rect x="97" y="32" width="6" height="12" fill="white"/>
    <rect x="94" y="35" width="12" height="6" fill="white"/>
    
    {/* Coat */}
    <path d="M65 95 L65 140 Q65 150 75 150 L125 150 Q135 150 135 140 L135 95" fill="white" stroke="#E0E0E0" strokeWidth="2"/>
    <path d="M100 95 L100 150" stroke="#E0E0E0" strokeWidth="1"/>
    
    {/* Sparkles */}
    <circle cx="45" cy="50" r="3" fill="#FFD700"/>
    <circle cx="155" cy="60" r="2" fill="#FFD700"/>
    <circle cx="160" cy="120" r="3" fill="#34A853"/>
    <circle cx="40" cy="130" r="2" fill="#1976D2"/>
    
    <defs>
      <linearGradient id="doctorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B6E4F"/>
        <stop offset="100%" stopColor="#1976D2"/>
      </linearGradient>
    </defs>
  </svg>
)

const SpeedIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Circle */}
    <circle cx="100" cy="100" r="90" fill="url(#speedGrad)" opacity="0.1"/>
    
    {/* Speedometer Base */}
    <path d="M40 120 A60 60 0 1 1 160 120" stroke="#E0E0E0" strokeWidth="12" fill="none" strokeLinecap="round"/>
    
    {/* Speed Gradient Arc */}
    <path d="M40 120 A60 60 0 0 1 100 60" stroke="#34A853" strokeWidth="12" fill="none" strokeLinecap="round"/>
    <path d="M100 60 A60 60 0 0 1 145 85" stroke="#FFD700" strokeWidth="12" fill="none" strokeLinecap="round"/>
    <path d="M145 85 A60 60 0 0 1 160 120" stroke="#FF6B6B" strokeWidth="12" fill="none" strokeLinecap="round"/>
    
    {/* Needle */}
    <motion.g
      animate={{ rotate: [0, 45, 30, 50, 40] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: '100px 120px' }}
    >
      <path d="M100 120 L100 70" stroke="#0B6E4F" strokeWidth="4" strokeLinecap="round"/>
      <polygon points="100,65 95,80 105,80" fill="#0B6E4F"/>
    </motion.g>
    
    {/* Center Circle */}
    <circle cx="100" cy="120" r="12" fill="#0B6E4F"/>
    <circle cx="100" cy="120" r="6" fill="#E6F4EA"/>
    
    {/* Speed Lines */}
    <motion.g
      animate={{ opacity: [0.3, 1, 0.3], x: [-5, 0, -5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <rect x="20" y="140" width="25" height="4" rx="2" fill="#4ECDC4"/>
      <rect x="25" y="150" width="20" height="4" rx="2" fill="#4ECDC4" opacity="0.7"/>
      <rect x="30" y="160" width="15" height="4" rx="2" fill="#4ECDC4" opacity="0.4"/>
    </motion.g>
    
    {/* Lightning Bolt */}
    <polygon points="165,50 150,75 160,75 145,100 175,65 162,65" fill="#FFD700"/>
    
    {/* Sparkles */}
    <circle cx="45" cy="60" r="3" fill="#34A853"/>
    <circle cx="170" cy="130" r="2" fill="#1976D2"/>
    
    <defs>
      <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ECDC4"/>
        <stop offset="100%" stopColor="#34A853"/>
      </linearGradient>
    </defs>
  </svg>
)

const TechnologyIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Circle */}
    <circle cx="100" cy="100" r="90" fill="url(#techGrad)" opacity="0.1"/>
    
    {/* CT Scanner Ring */}
    <ellipse cx="100" cy="100" rx="70" ry="25" stroke="#0B6E4F" strokeWidth="8" fill="none"/>
    <ellipse cx="100" cy="100" rx="55" ry="18" stroke="#1976D2" strokeWidth="4" fill="none"/>
    
    {/* Rotating Elements */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '100px 100px' }}
    >
      <circle cx="100" cy="30" r="8" fill="#34A853"/>
      <circle cx="170" cy="100" r="6" fill="#1976D2"/>
      <circle cx="100" cy="170" r="8" fill="#34A853"/>
      <circle cx="30" cy="100" r="6" fill="#1976D2"/>
    </motion.g>
    
    {/* Center Body Silhouette */}
    <ellipse cx="100" cy="100" rx="20" ry="40" fill="#FFE0CC" opacity="0.8"/>
    <circle cx="100" cy="70" r="12" fill="#FFE0CC"/>
    
    {/* Scan Lines */}
    <motion.g
      animate={{ opacity: [0, 1, 0], y: [-20, 20, -20] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <line x1="70" y1="100" x2="130" y2="100" stroke="#34A853" strokeWidth="2" opacity="0.6"/>
      <line x1="75" y1="90" x2="125" y2="90" stroke="#34A853" strokeWidth="1" opacity="0.4"/>
      <line x1="75" y1="110" x2="125" y2="110" stroke="#34A853" strokeWidth="1" opacity="0.4"/>
    </motion.g>
    
    {/* Data Points */}
    <motion.g
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, staggerChildren: 0.2 }}
    >
      <circle cx="55" cy="55" r="4" fill="#FFD700"/>
      <circle cx="145" cy="55" r="4" fill="#FFD700"/>
      <circle cx="55" cy="145" r="4" fill="#FFD700"/>
      <circle cx="145" cy="145" r="4" fill="#FFD700"/>
    </motion.g>
    
    {/* Tech Lines */}
    <path d="M40 40 L55 55" stroke="#0B6E4F" strokeWidth="2" strokeDasharray="4 2"/>
    <path d="M160 40 L145 55" stroke="#0B6E4F" strokeWidth="2" strokeDasharray="4 2"/>
    <path d="M40 160 L55 145" stroke="#0B6E4F" strokeWidth="2" strokeDasharray="4 2"/>
    <path d="M160 160 L145 145" stroke="#0B6E4F" strokeWidth="2" strokeDasharray="4 2"/>
    
    <defs>
      <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#95E1D3"/>
        <stop offset="100%" stopColor="#1976D2"/>
      </linearGradient>
    </defs>
  </svg>
)

const AccuracyIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Circle */}
    <circle cx="100" cy="100" r="90" fill="url(#accuracyGrad)" opacity="0.1"/>
    
    {/* Target Circles */}
    <circle cx="100" cy="100" r="70" stroke="#E0E0E0" strokeWidth="3" fill="none"/>
    <circle cx="100" cy="100" r="50" stroke="#E0E0E0" strokeWidth="3" fill="none"/>
    <circle cx="100" cy="100" r="30" stroke="#E0E0E0" strokeWidth="3" fill="none"/>
    <circle cx="100" cy="100" r="10" fill="#FF6B6B"/>
    
    {/* Crosshairs */}
    <line x1="100" y1="20" x2="100" y2="180" stroke="#0B6E4F" strokeWidth="2" strokeDasharray="8 4"/>
    <line x1="20" y1="100" x2="180" y2="100" stroke="#0B6E4F" strokeWidth="2" strokeDasharray="8 4"/>
    
    {/* Bullseye Hit */}
    <motion.g
      animate={{ scale: [0.8, 1.2, 1], opacity: [0.5, 1, 0.8] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{ transformOrigin: '100px 100px' }}
    >
      <circle cx="100" cy="100" r="15" stroke="#34A853" strokeWidth="3" fill="none"/>
    </motion.g>
    
    {/* Checkmark */}
    <motion.path
      d="M85 100 L95 112 L120 85"
      stroke="#34A853"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
    />
    
    {/* Accuracy Percentage */}
    <rect x="130" y="35" width="50" height="30" rx="5" fill="#0B6E4F"/>
    <text x="155" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">100%</text>
    
    {/* Magnifying Glass */}
    <circle cx="50" cy="150" r="20" stroke="#1976D2" strokeWidth="4" fill="white" fillOpacity="0.5"/>
    <line x1="65" y1="165" x2="80" y2="180" stroke="#1976D2" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="50" cy="150" r="8" stroke="#1976D2" strokeWidth="2" fill="none"/>
    
    {/* Sparkles */}
    <circle cx="160" cy="150" r="3" fill="#FFD700"/>
    <circle cx="40" cy="50" r="2" fill="#34A853"/>
    <circle cx="170" cy="80" r="3" fill="#1976D2"/>
    
    <defs>
      <linearGradient id="accuracyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F38181"/>
        <stop offset="100%" stopColor="#FFD700"/>
      </linearGradient>
    </defs>
  </svg>
)

// Why Us Section with Custom Illustrations
const WhyUsSection = () => {
  const { t } = useTranslation()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const features = [
    {
      illustration: <DoctorIllustration />,
      title: t('whyUs.doctors.title'),
      description: t('whyUs.doctors.desc'),
      color: '#0B6E4F',
      gradient: 'linear-gradient(135deg, #0B6E4F 0%, #34A853 100%)',
      stats: t('whyUs.doctors.badge')
    },
    {
      illustration: <SpeedIllustration />,
      title: t('whyUs.service.title'),
      description: t('whyUs.service.desc'),
      color: '#4ECDC4',
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
      stats: t('whyUs.service.badge')
    },
    {
      illustration: <TechnologyIllustration />,
      title: t('whyUs.equipment.title'),
      description: t('whyUs.equipment.desc'),
      color: '#1976D2',
      gradient: 'linear-gradient(135deg, #1976D2 0%, #64B5F6 100%)',
      stats: t('whyUs.equipment.badge')
    },
    {
      illustration: <AccuracyIllustration />,
      title: t('whyUs.accuracy.title'),
      description: t('whyUs.accuracy.desc'),
      color: '#F38181',
      gradient: 'linear-gradient(135deg, #F38181 0%, #FCE38A 100%)',
      stats: t('whyUs.accuracy.badge')
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <Box
      sx={{
        py: 12,
        background: 'linear-gradient(180deg, #fff 0%, #F8FFFE 50%, #E6F4EA 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52, 168, 83, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Floating Decorative Shapes */}
      {[...Array(5)].map((_, i) => (
        <MotionBox
          key={i}
          sx={{
            position: 'absolute',
            width: 20 + i * 10,
            height: 20 + i * 10,
            borderRadius: i % 2 === 0 ? '50%' : '30%',
            border: `2px solid rgba(52, 168, 83, ${0.1 + i * 0.05})`,
            background: 'transparent'
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${15 + i * 18}%`,
            top: `${10 + (i % 3) * 25}%`
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          sx={{ textAlign: 'center', mb: 8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1,
                mb: 3,
                background: 'linear-gradient(135deg, rgba(52, 168, 83, 0.1) 0%, rgba(25, 118, 210, 0.1) 100%)',
                borderRadius: '50px',
                border: '1px solid rgba(52, 168, 83, 0.2)'
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#34A853',
                  animation: 'pulse 2s infinite'
                }}
              />
              <Typography
                sx={{
                  color: '#0B6E4F',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                {t('whyUs.badge')}
              </Typography>
            </Box>
          </motion.div>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' },
              background: 'linear-gradient(135deg, #0B6E4F 0%, #1976D2 50%, #0B6E4F 100%)',
              backgroundSize: '200% auto',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              animation: 'shimmer 3s linear infinite'
            }}
          >
            {t('whyUs.title')}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#666',
              fontWeight: 400,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.8
            }}
          >
            {t('whyUs.subtitle')}
          </Typography>
        </MotionBox>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <MotionBox
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileHover={{
                      y: -20,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        height: '100%',
                        minHeight: 380,
                        borderRadius: 5,
                        background: '#fff',
                        border: '2px solid',
                        borderColor: hoveredIndex === index ? feature.color : 'transparent',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: hoveredIndex === index
                          ? `0 25px 50px -12px ${feature.color}40`
                          : '0 4px 20px rgba(0,0,0,0.05)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: feature.gradient,
                          transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform 0.4s ease'
                        }
                      }}
                    >
                      {/* Stats Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          px: 2,
                          py: 0.5,
                          borderRadius: '20px',
                          background: feature.gradient,
                          color: '#fff',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          opacity: hoveredIndex === index ? 1 : 0,
                          transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(-10px)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {feature.stats}
                      </Box>

                      {/* Illustration Container */}
                      <Box
                        sx={{
                          width: 140,
                          height: 140,
                          margin: '0 auto 24px',
                          position: 'relative',
                          transition: 'transform 0.4s ease',
                          transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                        }}
                      >
                        {/* Glow Effect */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            height: '80%',
                            borderRadius: '50%',
                            background: feature.gradient,
                            filter: 'blur(30px)',
                            opacity: hoveredIndex === index ? 0.4 : 0.15,
                            transition: 'opacity 0.4s ease'
                          }}
                        />
                        {/* SVG Illustration */}
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                          {feature.illustration}
                        </Box>
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#1a1a2e',
                          mb: 2,
                          textAlign: 'center',
                          transition: 'color 0.3s ease',
                          ...(hoveredIndex === index && {
                            color: feature.color
                          })
                        }}
                      >
                        {feature.title}
                      </Typography>

                      {/* Decorative Line */}
                      <Box
                        sx={{
                          width: hoveredIndex === index ? 60 : 40,
                          height: 3,
                          background: feature.gradient,
                          borderRadius: 2,
                          mx: 'auto',
                          mb: 2,
                          transition: 'width 0.3s ease'
                        }}
                      />

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          textAlign: 'center',
                          lineHeight: 1.8,
                          fontSize: '0.95rem'
                        }}
                      >
                        {feature.description}
                      </Typography>

                      {/* Bottom Decoration */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -30,
                          right: -30,
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: `${feature.color}08`,
                          transition: 'all 0.4s ease',
                          ...(hoveredIndex === index && {
                            transform: 'scale(2)',
                            background: `${feature.color}12`
                          })
                        }}
                      />
                    </Paper>
                  </MotionBox>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Bottom CTA */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          sx={{
            mt: 8,
            textAlign: 'center'
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              px: 5,
              py: 3,
              background: 'linear-gradient(135deg, rgba(11, 110, 79, 0.05) 0%, rgba(25, 118, 210, 0.05) 100%)',
              borderRadius: 4,
              border: '2px dashed rgba(52, 168, 83, 0.3)'
            }}
          >
            {[
              { number: '+۵۰,۰۰۰', label: t('whyUs.stats.patients') },
              { number: '+۲۰', label: t('whyUs.stats.experience') },
              { number: '۱۶+', label: t('whyUs.stats.insurance') }
            ].map((stat, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Box
                    sx={{
                      width: 1,
                      height: 40,
                      background: 'rgba(52, 168, 83, 0.2)'
                    }}
                  />
                )}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      color: '#0B6E4F'
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: '#666'
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </MotionBox>
      </Container>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </Box>
  )
}

export default WhyUsSection