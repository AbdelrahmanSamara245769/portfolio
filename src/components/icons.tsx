import type { ReactNode } from 'react'

// Small line icons drawn for this site, all on the same 24-unit grid with the same
// stroke, so they match each other. They are decorative: the text next to each
// one says what it means, so screen readers skip them.

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  className: 'size-5 shrink-0',
} as const

export function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  )
}

export function CopyIcon() {
  return (
    <svg {...iconProps}>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
      <path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" />
    </svg>
  )
}

// pathLength="1" lets the stylesheet treat the tick as one unit long, so the
// draw-tick animation in index.css can draw it from start to end.
export function CheckIcon() {
  return (
    <svg {...iconProps}>
      <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} className="draw-tick" />
    </svg>
  )
}

// The animation's Pause and Play button.
export function PauseIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 5.5v13M15 5.5v13" />
    </svg>
  )
}

export function PlayIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 5.5v13l10.5-6.5z" />
    </svg>
  )
}

// An arrow pointing right. className turns or moves it, for example
// rotate-180 to point back, or a nudge on hover.
export function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg {...iconProps} className={`size-5 shrink-0 ${className}`}>
      <path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5" />
    </svg>
  )
}

// The gallery's larger view: open it, close it, and step back and forward.
export function ExpandIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14.5 4.5h5v5M9.5 19.5h-5v-5M19.5 4.5l-6 6M4.5 19.5l6-6" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function StepIcon({ direction }: { direction: 'back' | 'forward' }) {
  return (
    <svg {...iconProps} className={`size-6 shrink-0 ${direction === 'back' ? 'rotate-180' : ''}`}>
      <path d="m9 5.5 6.5 6.5L9 18.5" />
    </svg>
  )
}

export function CodeIcon() {
  return (
    <svg {...iconProps}>
      <path d="m8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5M13.5 5l-3 14" />
    </svg>
  )
}

export function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`size-3 transition-transform duration-300 ease-out-expo motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
    >
      <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return <svg {...iconProps}>{isOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
}

// The icons on the tiles under the top section and on the skill cards, by name,
// so the data files can say which icon a tile or card gets.
const shapes = {
  model: (
    <>
      <circle cx="12" cy="12" r="2.25" />
      <circle cx="5" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="m6.6 7.3 3.6 3.2M6.6 16.7l3.6-3.2M17.4 7.3l-3.6 3.2M17.4 16.7l-3.6-3.2" />
    </>
  ),
  pipeline: (
    <>
      <rect x="2.5" y="9.5" width="5" height="5" rx="1.25" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1.25" />
      <rect x="16.5" y="9.5" width="5" height="5" rx="1.25" />
      <path d="M7.5 12h2M14.5 12h2" />
    </>
  ),
  cloud: <path d="M7 18.5h10.5a4 4 0 0 0 .4-7.98A6 6 0 0 0 6.3 9.1 4.75 4.75 0 0 0 7 18.5Z" />,
  code: <path d="m8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5M13.5 5l-3 14" />,
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="2.75" />
      <path d="M4.5 6v12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75V6M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.3 14.3a4.5 4.5 0 0 1 5.2 4.7" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof shapes

export function Icon({ name }: { name: IconName }) {
  return <svg {...iconProps}>{shapes[name]}</svg>
}
