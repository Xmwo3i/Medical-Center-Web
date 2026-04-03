import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home          from './pages/Home'
import Scans         from './pages/Scans'
import Articles      from './pages/Articles'
import About         from './pages/About'
import Login         from './pages/Login'
import Services      from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'

// Scroll to top on every navigation
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 0)
    return () => clearTimeout(timer)
  }, [pathname])
  return null
}

function AppWithTheme() {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'fa'

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language, isRTL])

  const theme = createTheme({
    direction: isRTL ? 'rtl' : 'ltr',
    palette: {
      primary:   { main: '#34A853', light: '#E6F4EA', dark: '#0B6E4F' },
      secondary: { main: '#1976D2', light: '#E3F2FD' },
    },
    typography: {
      fontFamily: isRTL ? 'Vazir, sans-serif' : 'Inter, Roboto, sans-serif',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/"                    element={<Home />}          />
          <Route path="/scans"               element={<Scans />}         />
          <Route path="/scans/:type"         element={<Scans />}         />
          <Route path="/articles"            element={<Articles />}      />
          <Route path="/articles/:category"  element={<Articles />}      />
          <Route path="/about"               element={<About />}         />
          <Route path="/login"               element={<Login />}         />
          <Route path="/services"            element={<Services />}      />
          <Route path="/services/:slug"      element={<ServiceDetail />} />
          <Route path="*"                    element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <ToastContainer position={isRTL ? 'top-left' : 'top-right'} rtl={isRTL} />
    </ThemeProvider>
  )
}

export default AppWithTheme
