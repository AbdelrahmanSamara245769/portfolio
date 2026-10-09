import { CodeIcon } from './icons'
import { textLink } from './linkStyles'

// The link to a project's public code on GitHub. The hidden words give every
// link a different full name, so a screen reader's list of links can tell
// "View code for Quantitative research study" apart from the others.
function CodeLink({ href, title }: { href: string; title: string }) {
  return (
    <a href={href} className={`gap-2 text-meta ${textLink}`}>
      <CodeIcon />
      View code
      <span className="sr-only"> for {title} on GitHub</span>
    </a>
  )
}

export default CodeLink
