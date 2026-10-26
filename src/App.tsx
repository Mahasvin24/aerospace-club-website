import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import FleetPage from './pages/FleetPage'
import HomePage from './pages/HomePage'
import JoinPage from './pages/JoinPage'
import SponsorsPage from './pages/SponsorsPage'
import TeamPage from './pages/TeamPage'

const pageTitles: Record<string, string> = {
  '/': 'Santa Barbara Aeronautics',
  '/about': 'About — Santa Barbara Aeronautics',
  '/our-fleet': 'Our Fleet — Santa Barbara Aeronautics',
  '/team': 'Team — Santa Barbara Aeronautics',
  '/join': 'Join — Santa Barbara Aeronautics',
  '/sponsors': 'Sponsors — Santa Barbara Aeronautics',
}

function App() {
  const location = useLocation()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? 'Santa Barbara Aeronautics'
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname
      const frame = requestAnimationFrame(() => {
        document.getElementById('main-content')?.focus({ preventScroll: true })
      })
      return () => cancelAnimationFrame(frame)
    }
  }, [location.pathname])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/our-fleet" element={<FleetPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
