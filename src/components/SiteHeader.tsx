import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { useActiveSection } from '../lib/useActiveSection'
import { MenuIcon } from './icons'
import ThemeToggle from './ThemeToggle'

// The links go to /#about and so on, so they also work from a project's own
// page: there they open the main page at that section.
const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const sectionIds = links.map((link) => link.id)

// The navigation floats near the top of the window as a pill and stays there
// while the page scrolls, so "Email me", the page's main action and its only
// coloured button here, is always one tap away. The section you are reading
// is marked in its link (aria-current tells screen readers the same).
//
// On phones the four section links fold into a Menu button; the name, the
// theme switch and Email me stay in the pill. A project's page passes
// current="projects", so Projects is marked there.
function SiteHeader({ current }: { current?: string }) {
  const active = useActiveSection(sectionIds) ?? current
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // The phone menu closes with Escape, or with a tap anywhere outside the pill.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [menuOpen])

  const linkClass = (id: string) =>
    `inline-flex min-h-11 items-center rounded-full px-3.5 text-meta font-semibold transition-[color,background-color] duration-200 hover:text-accent-text motion-reduce:transition-none ${
      active === id ? 'bg-accent-tint text-accent-text' : ''
    }`

  return (
    <header className="pointer-events-none sticky top-3 z-40 px-3 print:hidden">
      {/*
        This link stays hidden until a keyboard user tabs to it, then lets them
        skip the menu. Its padding is set on focus because not-sr-only resets
        padding to 0, and z-50 keeps it above the pill.
      */}
      <a
        href="#main"
        className="pointer-events-auto sr-only rounded-full bg-ink font-semibold text-page focus:not-sr-only focus:absolute focus:top-0 focus:left-4 focus:z-50 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <nav
        ref={navRef}
        aria-label="Sections"
        className="pointer-events-auto relative mx-auto flex max-w-4xl items-center gap-1 rounded-full bg-surface/90 py-1.5 pr-1.5 pl-4 shadow-[0_10px_30px_-14px_rgb(10_19_15/0.45)] ring-1 ring-ink/10 backdrop-blur-md"
      >
        <a href="/#top" className="role-title mr-auto inline-flex min-h-11 items-center text-base">
          {/* Phones show a shorter name, so Email me and the menu still fit. */}
          <span className="sm:hidden">A. Samara</span>
          <span className="max-sm:hidden">{profile.name}</span>
        </a>

        <ul className="hidden items-center md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a href={`/#${link.id}`} aria-current={active === link.id ? 'true' : undefined} className={linkClass(link.id)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle />

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-meta font-semibold text-on-accent transition-[background-color] duration-200 hover:bg-accent-hover motion-reduce:transition-none sm:px-5"
        >
          Email me
        </a>

        {/* The phone menu: a button that opens the four section links below the pill. */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="section-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center rounded-full md:hidden"
        >
          <MenuIcon isOpen={menuOpen} />
          <span className="sr-only">Menu</span>
        </button>
        <ul
          id="section-menu"
          hidden={!menuOpen}
          className="card absolute top-full right-0 mt-2 w-52 p-2 shadow-[0_10px_30px_-14px_rgb(10_19_15/0.45)] md:hidden"
        >
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`/#${link.id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={active === link.id ? 'true' : undefined}
                className={`w-full ${linkClass(link.id)}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default SiteHeader
