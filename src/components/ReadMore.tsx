import type { ReactNode } from 'react'
import { ChevronIcon } from './icons'
import { outlineButton } from './linkStyles'

// The Read more button and the panel it opens come as two pieces, because a
// project row puts the button beside its text but opens the panel across the
// whole row. The project keeps the open-or-closed state and passes it to both.

type ButtonProps = {
  // The panel's HTML id, and the project's title for the button's full name.
  panelId: string
  title: string
  isOpen: boolean
  onToggle: () => void
}

// aria-expanded and aria-controls tell screen readers what this button opens and whether it is open.
export function ReadMoreButton({ panelId, title, isOpen, onToggle }: ButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={onToggle}
      className={`text-meta print:hidden ${outlineButton}`}
    >
      {isOpen ? 'Show less' : 'Read more'}
      <span className="sr-only"> about {title}</span>
      <ChevronIcon isOpen={isOpen} />
    </button>
  )
}

// The panel unfolds instead of jumping open: it is a grid whose one row grows
// from 0fr (no height) to 1fr (its full height), and CSS can animate between
// the two. While it is closed, `inert` takes its content out of the keyboard
// order and hides it from screen readers, but the text stays in the page for
// search engines. When printing, every panel is shown open. The opened text is
// set off by a thin line on its left rather than a box.
export function ReadMorePanel({ panelId, isOpen, children }: { panelId: string; isOpen: boolean; children: ReactNode }) {
  return (
    // data-open lets index.css replay the How it works trace each time the panel opens.
    <div
      id={panelId}
      inert={!isOpen}
      data-open={isOpen}
      className={`grid transition-[grid-template-rows] duration-500 ease-out-expo motion-reduce:transition-none print:grid-rows-[1fr] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="mt-6 max-w-[42rem] border-l border-ink/20 pl-5 md:pl-7">{children}</div>
      </div>
    </div>
  )
}
