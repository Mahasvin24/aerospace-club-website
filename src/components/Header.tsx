import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Header.css'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Fleet', to: '/our-fleet' },
  { label: 'Team', to: '/team' },
  { label: 'Join', to: '/join' },
  { label: 'Sponsors', to: '/sponsors' },
]

function PlaneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M21 3 9.4 8.2 4.7 5.8 3 7.4l3.6 3.5-2.8 1.6.2 2 4.2-.4 3.7 6.8 2-1-1.4-6.9 4.2-2.4 2.3 2.2 1.6-.9-1.2-3.4L22 5.2 21 3Z" />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (open) firstLinkRef.current?.focus()
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className={`site-header ${open ? 'is-open' : ''}`}>
      <nav className="navigation" aria-label="Primary navigation">
        <div className="navigation__bar">
          <button
            ref={toggleRef}
            className="navigation__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="navigation-menu"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
          <NavLink className="navigation__brand" to="/" onClick={() => setOpen(false)}>
            Santa Barbara Aeronautics
          </NavLink>
          <span className="navigation__plane"><PlaneIcon /></span>
        </div>

        <div id="navigation-menu" className="navigation__menu" aria-hidden={!open}>
          <div className="navigation__links">
            {navigation.map((item, index) => (
              <NavLink
                key={item.to}
                ref={index === 0 ? firstLinkRef : undefined}
                to={item.to}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <a
            className="navigation__email"
            href="mailto:sb.aeronautics@gmail.com"
            tabIndex={open ? 0 : -1}
          >
            sb.aeronautics@gmail.com
          </a>
        </div>
      </nav>
    </header>
  )
}
