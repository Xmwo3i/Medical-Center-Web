
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography
} from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import PhoneIcon from '@mui/icons-material/Phone'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const MotionBox = motion(Box)

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'fa'

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
    // Switch document direction
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
      // Calculate reading progress: 0% at top, 100% at bottom
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scansSubmenu = [
    { text: t('nav.heartScan'),   path: '/scans/heart' },
    { text: t('nav.boneScan'),    path: '/scans/bone' },
    { text: t('nav.kidneyScan'),  path: '/scans/kidney' },
    { text: t('nav.thyroidScan'), path: '/scans/thyroid' },
    { text: t('nav.allScans'),    path: '/scans' }
  ]

  const articlesSubmenu = [
    { text: t('nav.educationalArticles'), path: '/articles/educational' },
    { text: t('nav.allArticles'),         path: '/articles' }
  ]

  const menuItems = [
    { text: t('nav.home'),     path: '/' },
    { text: t('nav.services'), path: '/services' },
    { text: t('nav.scans'),    path: '/scans', hasSubmenu: true, submenu: scansSubmenu, id: 'scans' },
    { text: t('nav.articles'), path: '/articles', hasSubmenu: true, submenu: articlesSubmenu, id: 'articles' },
    { text: t('nav.about'),    path: '/about' }
  ]

  const handleMouseEnter = (itemId) => {
    setOpenDropdown(itemId)
  }

  const handleMouseLeave = () => {
    setOpenDropdown(null)
  }

  return (
    <>
      {/* Mobile: floating hamburger — only visible after scrolling past the navbar */}
      {isMobile && scrolled && (
        <Box sx={{
          position: 'fixed', top: 16, left: 16, zIndex: 1200,
        }}>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              color: '#fff',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              width: 45, height: 45,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(52, 168, 83, 0.2)',
                transform: 'rotate(90deg)'
              }
            }}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      <AppBar
        position={isMobile ? 'absolute' : 'fixed'}
        elevation={0}
        sx={{
          display: 'block',
          background: scrolled
            ? 'rgba(255, 255, 255, 0.98)'
            : 'transparent',
          '& .MuiToolbar-root': { minHeight: 'unset !important' },
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 'unset',
              py: scrolled ? '10px' : '14px',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: isRTL ? 'row' : 'row-reverse',
              px: { xs: 1, md: 2 },
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Logo Section - Bigger */}
            <Box
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
              onClick={() => navigate('/')}
            >
              <Box
                component="img"
                src="/assets/images/caspian.png"
                alt="Caspian Logo"
                sx={{
                  height: {
                    xs: scrolled ? 90 : 100,
                    md: scrolled ? 100 : 120
                  },
                  width: 'auto',
                  transition: 'all 0.4s ease',
                  filter: scrolled
                    ? 'drop-shadow(0 2px 6px rgba(11, 110, 79, 0.12))'
                    : 'brightness(0) invert(1) drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
                }}
              />
            </Box>

            {/* Desktop Menu */}
            {!isMobile ? (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {menuItems.map((item) => (
                  <Box
                    key={item.text}
                    sx={{ position: 'relative' }}
                    onMouseEnter={() => item.hasSubmenu && handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Button
                      onClick={() => navigate(item.path)}
                      sx={{
                        color: scrolled ? '#2d3748' : '#fff',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        minWidth: 'auto',
                        borderRadius: '10px',
                        textTransform: 'none',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 6,
                          left: '50%',
                          transform: 'translateX(-50%) scaleX(0)',
                          width: '60%',
                          height: '2px',
                          background: '#34A853',
                          borderRadius: '2px',
                          transition: 'transform 0.3s ease'
                        },
                        '&:hover': {
                          background: scrolled
                            ? 'rgba(52, 168, 83, 0.08)'
                            : 'rgba(255, 255, 255, 0.15)',
                          color: scrolled ? '#34A853' : '#fff'
                        },
                        '&:hover::after': {
                          transform: 'translateX(-50%) scaleX(1)'
                        }
                      }}
                    >
                      {item.text}
                    </Button>

                    {/* Dropdown Menu */}
                    {item.hasSubmenu && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          mt: 0.5,
                          minWidth: 220,
                          background: 'rgba(255, 255, 255, 0.98)',
                          backdropFilter: 'blur(20px)',
                          borderRadius: 3,
                          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                          border: '1px solid rgba(52, 168, 83, 0.1)',
                          opacity: openDropdown === item.id ? 1 : 0,
                          visibility: openDropdown === item.id ? 'visible' : 'hidden',
                          transform: openDropdown === item.id ? 'translateY(0)' : 'translateY(-10px)',
                          transition: 'all 0.3s ease',
                          zIndex: 1000,
                          py: 1.5
                        }}
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <Box
                            key={subIndex}
                            onClick={() => {
                              navigate(subItem.path)
                              setOpenDropdown(null)
                            }}
                            sx={{
                              px: 3,
                              py: 1.3,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              borderLeft: '3px solid transparent',
                              '&:hover': {
                                background: 'rgba(52, 168, 83, 0.08)',
                                borderLeftColor: '#34A853',
                                transform: 'translateX(-3px)'
                              }
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                color: '#2d3748'
                              }}
                            >
                              {subItem.text}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}

                {/* Action Buttons - With Space */}
                <Box sx={{ ml: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                  <IconButton
                    sx={{
                      color: scrolled ? '#34A853' : '#fff',
                      background: scrolled
                        ? 'rgba(52, 168, 83, 0.08)'
                        : 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      width: 40,
                      height: 40,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(52, 168, 83, 0.15)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>

                  <Button
                    variant="contained"
                    startIcon={<PhoneIcon sx={{ fontSize: 18 }} />}
                    sx={{
                      background: 'linear-gradient(135deg, #34A853 0%, #1976D2 100%)',
                      borderRadius: '10px',
                      px: 2,
                      py: 0.8,
                      minHeight: 40,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      textTransform: 'none',
                      boxShadow: scrolled
                        ? '0 2px 8px rgba(52, 168, 83, 0.2)'
                        : '0 4px 12px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 16px rgba(52, 168, 83, 0.35)'
                      },
                      '& .MuiButton-startIcon': {
                        marginLeft: '6px',
                        marginRight: '-2px',
                      }
                    }}
                  >
                    {t('nav.contact')}
                  </Button>

                  {/* Language Toggle Button */}
                  <Box
                    onClick={toggleLanguage}
                    sx={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 42, height: 42, borderRadius: '10px',
                      cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
                      border: '2px solid',
                      borderColor: scrolled ? 'rgba(11,110,79,0.4)' : 'rgba(255,255,255,0.5)',
                      color: scrolled ? '#0B6E4F' : '#fff',
                      transition: 'all 0.3s',
                      userSelect: 'none',
                      '&:hover': {
                        background: scrolled ? 'rgba(11,110,79,0.1)' : 'rgba(255,255,255,0.15)',
                        borderColor: scrolled ? '#0B6E4F' : '#fff',
                      }
                    }}>
                    {i18n.language === 'fa' ? 'EN' : 'FA'}
                  </Box>
                </Box>
              </Box>
            ) : (
              /* Mobile Menu Button */
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: scrolled ? '#0B6E4F' : '#fff',
                  background: scrolled
                    ? 'rgba(52, 168, 83, 0.1)'
                    : 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  width: 45,
                  height: 45,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(52, 168, 83, 0.2)',
                    transform: 'rotate(90deg)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>

      {/* ── Reading Progress Bar ───────────────────────────────────────────── */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '3px',
          background: 'transparent',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ scaleX: scrollProgress / 100 }}
          transition={{ duration: 0.15, ease: 'linear' }}
          style={{
            height: '100%',
            width: '100%',
            originX: 1,
            background: 'linear-gradient(270deg, #34A853 0%, #17a2a2 50%, #1976D2 100%)',
            boxShadow: scrollProgress > 0 ? '0 0 8px rgba(52, 168, 83, 0.5)' : 'none',
            opacity: scrollProgress > 0 ? 1 : 0,
          }}
        />
      </Box>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'linear-gradient(180deg, #E6F4EA 0%, #fff 100%)'
          }
        }}
      >
        <Box>
          {/* Drawer Header */}
          <Box
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #34A853 0%, #1976D2 100%)',
              textAlign: 'center'
            }}
          >
            <Box
              component="img"
              src="/assets/images/caspian.png"
              alt="Caspian Logo"
              sx={{
                height: 70,
                width: 'auto',
                margin: '0 auto',
                filter: 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.2))'
              }}
            />
          </Box>

          {/* Menu Items */}
          <List sx={{ pt: 2, px: 1.5 }}>
            {menuItems.map((item, index) => (
              <Box key={item.text}>
                <ListItem
                  button
                  onClick={() => {
                    navigate(item.path)
                    setDrawerOpen(false)
                  }}
                  sx={{
                    mb: 0.5,
                    borderRadius: 2,
                    py: 1.2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(52, 168, 83, 0.12)',
                      transform: 'translateX(-5px)'
                    }
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: '0.95rem'
                    }}
                  />
                </ListItem>

                {/* Mobile Submenu */}
                {item.hasSubmenu && (
                  <Box sx={{ pl: 3, mb: 1 }}>
                    {item.submenu.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        button
                        onClick={() => {
                          navigate(subItem.path)
                          setDrawerOpen(false)
                        }}
                        sx={{
                          py: 0.8,
                          borderRadius: 1,
                          '&:hover': {
                            background: 'rgba(52, 168, 83, 0.08)'
                          }
                        }}
                      >
                        <ListItemText
                          primary={subItem.text}
                          primaryTypographyProps={{
                            fontSize: '0.85rem',
                            color: '#666'
                          }}
                        />
                      </ListItem>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </List>

          {/* Drawer Footer */}
          <Box sx={{ p: 2, mt: 'auto' }}>
            {/* Language toggle in drawer */}
            <Box
              onClick={toggleLanguage}
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 1.5, mb: 2, py: 1.2, borderRadius: 2, cursor: 'pointer',
                border: '1.5px solid #e0e0e0', fontWeight: 700,
                color: '#555', transition: 'all 0.2s',
                '&:hover': { background: '#f5f5f5', borderColor: '#0B6E4F', color: '#0B6E4F' }
              }}>
              <Typography sx={{ fontSize: '1.1rem' }}>
                {i18n.language === 'fa' ? '🇬🇧' : '🇮🇷'}
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                {i18n.language === 'fa' ? 'English' : 'فارسی'}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              startIcon={<PhoneIcon />}
              sx={{
                background: 'linear-gradient(135deg, #34A853 0%, #1976D2 100%)',
                py: 1.3,
                borderRadius: 2,
                fontWeight: 600,
                '&:hover': {
                  boxShadow: '0 4px 16px rgba(52, 168, 83, 0.3)'
                }
              }}
            >
              {t('nav.contact')}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
export default Navbar 