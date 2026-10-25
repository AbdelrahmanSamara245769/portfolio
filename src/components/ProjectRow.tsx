import { useState } from 'react'
import type { MainProject } from '../data/projects'
import { fillsCard } from '../lib/visuals'
import CodeLink from './CodeLink'
import PipelineSteps from './PipelineSteps'
import KeyResult from './KeyResult'
import ProjectFacts, { ProjectSkills, ProjectTags } from './ProjectFacts'
import ProjectVisual from './ProjectVisual'
import { ReadMoreButton, ReadMorePanel } from './ReadMore'
import Rich from './Rich'

type ProjectRowProps = {
  project: MainProject
  // Which side the visual sits on from md up. The rows alternate.
  visualSide: 'left' | 'right'
}

// A main project as one row: a large visual on one side, and on the other its
// title (the largest text in the row), key result, one sentence, facts, tags
// and the two actions. Read more
// opens the details across the full width of the row.
//
// The text comes first in the code, so screen readers and keyboards meet the
// title before the picture; the order classes put the visual first on screen.
function ProjectRow({ project, visualSide }: ProjectRowProps) {
  // isOpen records whether the Read more panel is open. Each row keeps its own value.
  const [isOpen, setIsOpen] = useState(false)
  const titleId = `${project.id}-title`
  const panelId = `${project.id}-details`
  const { details } = project

  return (
    <article aria-labelledby={titleId} className="grid gap-8 md:grid-cols-12 md:items-center md:gap-x-12 md:gap-y-0">
      <div className="md:col-span-6">
        <h3 id={titleId} className="role-heading text-project">
          {project.title}
        </h3>
        {/* The key result comes straight after the title, so a skimming reader
            takes away the evidence before the description. */}
        <div className="mt-4">
          <KeyResult text={project.keyResult} size="row" />
        </div>
        <p className="mt-4 max-w-measure text-ink-soft">
          <Rich text={project.summary} />
        </p>
        <div className="mt-5">
          <ProjectFacts project={project} />
        </div>
        <div className="mt-4">
          <ProjectTags project={project} />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <ReadMoreButton panelId={panelId} title={project.title} isOpen={isOpen} onToggle={() => setIsOpen((open) => !open)} />
          {project.codeUrl && <CodeLink href={project.codeUrl} title={project.title} />}
        </div>
      </div>

      <div
        className={`card order-first overflow-hidden ${fillsCard(project.visual) ? '' : 'p-5 sm:p-7'} md:col-span-6 ${visualSide === 'left' ? 'md:order-first' : 'md:order-none'}`}
      >
        <ProjectVisual visual={project.visual} />
      </div>

      {/* The panel's text stays in the page when closed, so search engines still
          read it. The result comes first, then the story behind it. */}
      <div className="md:col-span-12">
        <ReadMorePanel panelId={panelId} isOpen={isOpen}>
          <h4 className="font-bold">Result</h4>
          <ul className="mt-2 max-w-measure list-disc space-y-2 pl-5 text-ink-soft marker:text-ink-soft">
            {details.result.map((item) => (
              <li key={item}>
                <Rich text={item} />
              </li>
            ))}
          </ul>

          <h4 className="mt-7 font-bold">Problem</h4>
          <p className="mt-2 max-w-measure text-ink-soft">
            <Rich text={details.problem} />
          </p>

          <h4 className="mt-7 font-bold">What I built</h4>
          <ul className="mt-2 max-w-measure list-disc space-y-2 pl-5 text-ink-soft marker:text-ink-soft">
            {details.built.map((item) => (
              <li key={item}>
                <Rich text={item} />
              </li>
            ))}
          </ul>
          {details.teamBuilt && (
            <p className="mt-4 max-w-measure text-ink-soft">
              <Rich text={details.teamBuilt} />
            </p>
          )}

          <h4 className="mt-7 font-bold">How it works</h4>
          <div className="max-w-measure text-ink-soft">
            <PipelineSteps steps={details.howItWorks} />
          </div>

          <div className="mt-7">
            <ProjectSkills skills={project.skills} />
          </div>
        </ReadMorePanel>
      </div>
    </article>
  )
}

export default ProjectRow
