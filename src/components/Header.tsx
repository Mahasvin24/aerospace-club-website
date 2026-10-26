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
  const navigationRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  function closeMenu() {
    setOpen(false)
    toggleRef.current?.focus({ preventScroll: true })
  }

  function navigateTo(path: string) {
    if (path === location.pathname) closeMenu()
    else setOpen(false)
  }

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const main = document.querySelector('main')
    if (main) main.inert = open
    const menu = document.getElementById('navigation-menu')
    const focusFirstLink = () => firstLinkRef.current?.focus({ preventScroll: true })
    const retryFocus = () => {
      if (document.activeElement === toggleRef.current || !navigationRef.current?.contains(document.activeElement)) {
        focusFirstLink()
      }
    }
    let frame = 0
    if (open) {
      // The visibility transition can briefly prevent focus after the first paint.
      menu?.addEventListener('transitionend', retryFocus)
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(focusFirstLink)
      })
    }
    return () => {
      cancelAnimationFrame(frame)
      menu?.removeEventListener('transitionend', retryFocus)
      document.body.classList.remove('menu-open')
      if (main) main.inert = false
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        event.preventDefault()
        closeMenu()
      }

      if (event.key === 'Tab' && open) {
        const focusable = navigationRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href]:not([tabindex="-1"])',
        )
        if (!focusable?.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!navigationRef.current?.contains(document.activeElement)) {
          event.preventDefault()
          const target = event.shiftKey ? last : first
          target.focus()
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className={`site-header ${open ? 'is-open' : ''}`}>
      <nav ref={navigationRef} className="navigation" aria-label="Primary navigation">
        <div className="navigation__bar">
          <button
            ref={toggleRef}
            className="navigation__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="navigation-menu"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => open ? closeMenu() : setOpen(true)}
          >
            <span />
            <span />
          </button>
          <NavLink className="navigation__brand" to="/" onClick={() => navigateTo('/')}>
            Santa Barbara Aeronautics
          </NavLink>
          <span className="navigation__plane"><PlaneIcon /></span>
        </div>

        <div id="navigation-menu" className="navigation__menu" aria-hidden={!open}>
          <div className="navigation__menu-inner">
            <div className="navigation__links">
              {navigation.map((item, index) => (
                <NavLink
                  key={item.to}
                  ref={index === 0 ? firstLinkRef : undefined}
                  to={item.to}
                  onClick={() => navigateTo(item.to)}
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
              onClick={closeMenu}
            >
              sb.aeronautics@gmail.com
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
