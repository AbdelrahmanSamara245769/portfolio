import { npecStory, type MainProject, type ProjectPage } from '../data/projects'
import { revealState, useInView } from '../lib/useInView'
import FeatureCard from './FeatureCard'

type StoryProject = { project: MainProject; page: ProjectPage }

type ProjectStoryProps = {
  prototype: StoryProject
  production: StoryProject
}

// The two NPEC projects told as one story: the root detection prototype and
// the platform that took it to production, as two large cards side by side
// from lg (stacked on phones and tablets, where two would be too narrow), each
// opening its own page.
//
// It is an ordered list of the two stages. The small arrow between them sits in
// the gap, inside the first card's list item, so the list keeps exactly two
// items for screen readers; the list's own name already says what it shows, so
// the arrow is hidden from them. It points down while the cards stack and right from lg,
// and draws itself when the pair scrolls into view (draw-arrow in index.css).
function ProjectStory({ prototype, production }: ProjectStoryProps) {
  const [ref, inView] = useInView<HTMLOListElement>()

  return (
    <ol ref={ref} data-reveal={revealState(inView)} aria-label={npecStory.label} className="grid gap-y-28 lg:grid-cols-2 lg:gap-x-28">
      <li className="relative">
        <FeatureCard project={prototype.project} page={prototype.page} stage="Prototype" />
        <div
          aria-hidden="true"
          className="absolute top-full left-0 flex h-28 w-full items-center justify-center gap-3 lg:top-1/2 lg:left-full lg:h-auto lg:w-28 lg:-translate-y-1/2 lg:flex-col lg:gap-2.5"
        >
          <span className="grid size-11 place-items-center rounded-full bg-surface text-ink ring-1 ring-ink/15">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="size-5 rotate-90 lg:rotate-0">
              <path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5" pathLength={1} className="draw-arrow" />
            </svg>
          </span>
          <span className="text-meta font-semibold text-ink-soft lg:max-w-24 lg:text-center">Prototype to production</span>
        </div>
      </li>
      <li>
        <FeatureCard project={production.project} page={production.page} stage="Production" />
      </li>
    </ol>
  )
}

export default ProjectStory
