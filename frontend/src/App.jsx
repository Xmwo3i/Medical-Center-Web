import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import Home from './pages/Home'
import Scans from './pages/Scans'
import Articles from './pages/Articles'
import About from './pages/About'
import Login from './pages/Login'

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#34A853',
      light: '#E6F4EA',
      dark: '#0B6E4F',
    },
    secondary: {
      main: '#1976D2',
      light: '#E3F2FD',
    },
  },
  typography: {
    fontFamily: 'Vazir, sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scans" element={<Scans />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer position="top-left" rtl={true} />
    </ThemeProvider>
  )
}

export default App