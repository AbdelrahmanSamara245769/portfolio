import { useState } from 'react'
import type { SmallProject } from '../data/projects'
import CodeLink from './CodeLink'
import KeyResult from './KeyResult'
import ProjectFacts, { ProjectSkills, ProjectTags } from './ProjectFacts'
import ProjectVisual from './ProjectVisual'
import { ReadMoreButton, ReadMorePanel } from './ReadMore'
import Rich from './Rich'

// A smaller project as a card in an even grid: its visual on top, then the
// title, key result, one or two sentences, the dates, tags and the two actions,
// with the rest behind Read more.
//
// Each card takes three rows of the grid it sits in (row-span-3) and shares
// them with the cards beside it (grid-rows-subgrid): visual, text, actions. So
// across a row of cards the dividers, titles and buttons all line up, however
// tall each visual is.
function ProjectCard({ project }: { project: SmallProject }) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = `${project.id}-title`
  const panelId = `${project.id}-details`

  return (
    <article aria-labelledby={titleId} className="card row-span-3 grid grid-rows-subgrid gap-y-0 p-5 sm:p-6">
      <div className="self-center">
        <ProjectVisual visual={project.visual} />
      </div>
      <div className="mt-6 border-t border-ink/10 pt-6">
        <h4 id={titleId} className="role-heading text-card">
          {project.title}
        </h4>
        <div className="mt-3">
          <KeyResult text={project.keyResult} size="card" />
        </div>
        <p className="mt-3 text-base text-ink-soft">
          <Rich text={project.summary} />
        </p>
        <div className="mt-4">
          <ProjectFacts project={project} />
        </div>
        <div className="mt-3">
          <ProjectTags project={project} />
        </div>
      </div>
      <div className="pt-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {project.more && (
            <ReadMoreButton panelId={panelId} title={project.title} isOpen={isOpen} onToggle={() => setIsOpen((open) => !open)} />
          )}
          {project.codeUrl && <CodeLink href={project.codeUrl} title={project.title} />}
        </div>
        {project.more && (
          <ReadMorePanel panelId={panelId} isOpen={isOpen}>
            <p className="text-base text-ink-soft">
              <Rich text={project.more} />
            </p>
            <div className="mt-5">
              <ProjectSkills skills={project.skills} />
            </div>
          </ReadMorePanel>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
