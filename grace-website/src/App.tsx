import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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

  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? 'Santa Barbara Aeronautics'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="site-shell">
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
