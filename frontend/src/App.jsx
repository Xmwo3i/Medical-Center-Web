import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

// Scroll to top on every navigation
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Use setTimeout to ensure scroll happens after DOM update
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 0)
    return () => clearTimeout(timer)
  }, [pathname])
  return null
}
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

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary:   { main: '#34A853', light: '#E6F4EA', dark: '#0B6E4F' },
    secondary: { main: '#1976D2', light: '#E3F2FD' },
  },
  typography: { fontFamily: 'Vazir, sans-serif' },
})

function App() {
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
      <ToastContainer position="top-left" rtl={true} />
    </ThemeProvider>
  )
}

export default App