import { useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'

type Theme = 'light' | 'dark'

// The browser toolbar colour on phones, matching --page in index.css.
const toolbarColour: Record<Theme, string> = { light: '#e5ece4', dark: '#0a130f' }

// index.html has already picked a theme before React starts, so read it from the page.
function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

// A switch between the light and dark themes. The choice is saved in the
// browser, so the next visit opens in the same theme.
function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme)
  const isDark = theme === 'dark'

  // Reads the theme at the moment it changes it, so two quick presses always
  // switch twice, even if the first one's animation hasn't finished yet.
  function flipTheme() {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', toolbarColour[next])
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Some browsers block storage, for example in private windows. The switch still works.
    }
    setTheme(next)
  }

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Older browsers, and visitors who asked for less motion, get an instant switch.
    if (!document.startViewTransition || reduceMotion) {
      flipTheme()
      return
    }

    // Otherwise the new theme spreads over the page in a circle that starts at
    // the switch. The browser photographs the old page, applies the change
    // (flushSync makes React update the switch inside that moment), then
    // animates between the two pictures.
    const box = event.currentTarget.getBoundingClientRect()
    const x = box.left + box.width / 2
    const y = box.top + box.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(() => {
      flushSync(flipTheme)
    })
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      // A second press can cut the first animation short. The theme still
      // changes; only the circle is skipped, so there is nothing to handle.
      .catch(() => {})
  }

  return (
    // aria-pressed tells screen readers whether dark theme is on.
    <button
      type="button"
      aria-pressed={isDark}
      onClick={toggle}
      className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 text-meta font-semibold sm:text-base print:hidden"
    >
      {/* There is no room for the words in the navigation, so only screen readers
          get them; the moon or sun in the track shows sighted visitors what it does. */}
      <span className="sr-only">Dark theme</span>
      <span
        aria-hidden="true"
        className="relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border-2 border-ink"
      >
        <svg
          viewBox="0 0 12 12"
          className={`absolute right-[4px] size-3 transition-opacity duration-200 motion-reduce:transition-none ${isDark ? 'opacity-0' : ''}`}
        >
          <path d="M8.5 7.6A3.6 3.6 0 0 1 4.4 3.5a3.6 3.6 0 1 0 4.1 4.1Z" fill="currentColor" />
        </svg>
        <svg
          viewBox="0 0 12 12"
          className={`absolute left-[4px] size-3 transition-opacity duration-200 motion-reduce:transition-none ${isDark ? '' : 'opacity-0'}`}
        >
          <circle cx="6" cy="6" r="2" fill="currentColor" />
          <path
            d="M6 1v1.2M6 9.8V11M1 6h1.2M9.8 6H11M2.5 2.5l.8.8M8.7 8.7l.8.8M2.5 9.5l.8-.8M8.7 3.3l.8-.8"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
        <span
          className={`absolute left-[3px] size-3.5 rounded-full bg-ink transition-[translate] duration-300 ease-out-expo forced-colors:bg-[CanvasText] motion-reduce:transition-none ${isDark ? 'translate-x-4' : ''}`}
        />
      </span>
    </button>
  )
}

export default ThemeToggle
