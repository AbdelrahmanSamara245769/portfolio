import { profile } from '../data/profile'

// Read once when the page loads rather than on every render, which keeps the
// component pure, and the year never needs a manual update.
const year = new Date().getFullYear()

function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pt-6 pb-10 text-center text-meta text-ink-soft sm:px-6 lg:px-8">
      <p>
        © {year} {profile.name}. Built with React, TypeScript and Tailwind CSS.
      </p>
    </footer>
  )
}

export default SiteFooter
