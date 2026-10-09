import { npecStory, type MainProject } from '../data/projects'
import ProjectRow from './ProjectRow'
import Rich from './Rich'

// The two NPEC projects told as one story: the root detection prototype first,
// then the platform that took it to production. The platform is the featured
// project, so it is the largest thing in the section.
//
// It is an ordered list of two stages. Between the two rows, a line runs down
// the middle to the sentence that joins them, and on to the production row.
// The line is drawn twice: a faint one that is always there, and a darker one
// on top that grows as you scroll from one row to the other (the story-line
// animation in index.css).
function ProjectStory({ prototype, production }: { prototype: MainProject; production: MainProject }) {
  return (
    <ol aria-label={npecStory.label}>
      <li>
        <ProjectRow project={prototype} visualSide="left" stage="Prototype" />
      </li>
      <li>
        <div className="relative flex flex-col items-center py-10 md:py-14">
          <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-ink/15 forced-colors:bg-[CanvasText]" />
          <span aria-hidden="true" className="story-line absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-ink/50 forced-colors:hidden" />
          <p className="card relative max-w-md px-6 py-4 text-center text-ink-soft">
            <span className="role-title block text-meta text-ink">Prototype to production</span>
            <span className="mt-1 block">
              <Rich text={npecStory.link} />
            </span>
          </p>
        </div>
        <ProjectRow project={production} visualSide="right" stage="Production" featured />
      </li>
    </ol>
  )
}

export default ProjectStory
