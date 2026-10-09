import type { ReactNode } from 'react'
import Rich from './Rich'

type SectionProps = {
  // The id becomes the section's HTML id, so nav links like #projects can jump here.
  id: string
  title: string
  // One short sentence under the heading. It can mark key words with **.
  intro: string
  // 'band' gives the section the slightly different background tone, so
  // neighbouring sections are easy to tell apart.
  tone?: 'page' | 'band'
  children: ReactNode
}

// Every section opens the same way: its heading and one short intro, centred,
// then a large gap before its content. The section spans the whole window, so
// its background tone reaches the edges; the content stays in the centred column.
function Section({ id, title, intro, tone = 'page', children }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className={tone === 'band' ? 'bg-band' : ''}>
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={headingId} className="role-heading text-section">
            {title}
          </h2>
          <p className="mt-5 text-lead text-ink-soft">
            <Rich text={intro} />
          </p>
        </div>
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  )
}

export default Section
