// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

async function openNavigation() {
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }))
  const home = screen.getByRole('link', { name: 'Home' })
  await waitFor(() => expect(document.activeElement).toBe(home))
}

describe('navigation and route focus', () => {
  it('closes on the current route and restores focus and scrolling', async () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    await openNavigation()
    expect(document.body.classList.contains('menu-open')).toBe(true)
    expect(document.querySelector('main')?.inert).toBe(true)

    fireEvent.click(screen.getByRole('link', { name: 'Home' }))
    const toggle = screen.getByRole('button', { name: 'Open navigation' })
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(toggle)
    expect(document.body.classList.contains('menu-open')).toBe(false)
    expect(Boolean(document.querySelector('main')?.inert)).toBe(false)
  })

  it('closes with Escape and can be reopened', async () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    await openNavigation()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Open navigation' }))
    await openNavigation()
  })

  it('wraps keyboard focus at both ends of the expanded navigation', async () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    await openNavigation()
    const email = screen.getByRole('link', { name: 'sb.aeronautics@gmail.com' })
    const toggle = screen.getByRole('button', { name: 'Close navigation' })
    email.focus()
    fireEvent.keyDown(window, { key: 'Tab' })
    expect(document.activeElement).toBe(toggle)
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(email)
  })

  it('retries focus after expansion without interrupting keyboard navigation', async () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    await openNavigation()
    const menu = document.getElementById('navigation-menu')!
    const about = screen.getByRole('link', { name: 'About' })
    about.focus()
    fireEvent.transitionEnd(menu)
    expect(document.activeElement).toBe(about)

    about.blur()
    fireEvent.transitionEnd(menu)
    expect(document.activeElement).toBe(screen.getByRole('link', { name: 'Home' }))
  })

  it('moves focus to the new page and provides a skip-link destination', async () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    await openNavigation()
    fireEvent.click(screen.getByRole('link', { name: 'About' }))
    await waitFor(() => expect(document.activeElement).toBe(document.querySelector('main')))
    expect(document.title).toBe('About — Santa Barbara Aeronautics')
    expect(Boolean(document.querySelector('main')?.inert)).toBe(false)
    expect(screen.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded')).toBe('false')
    expect(screen.getByRole('link', { name: 'Skip to content' }).getAttribute('href')).toBe('#main-content')
    expect(document.getElementById('main-content')?.tabIndex).toBe(-1)
  })
})
