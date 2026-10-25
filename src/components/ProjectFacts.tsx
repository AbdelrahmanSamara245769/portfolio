import type { ReactNode } from 'react'
import { categoryLabels, type Project } from '../data/projects'
import ClientLogo from './ClientLogo'
import Fact from './Fact'
import InlineList from './InlineList'

// The project's facts: who it was for (with the client's logo), the team, my
// role and the dates, each a small label with its value. By default they run
// in one compact line; `stacked` lays them out as a small grid of label-over-
// value pairs, for a project page's header.
function ProjectFacts({ project, stacked = false }: { project: Project; stacked?: boolean }) {
  const facts: [string, ReactNode][] = []
  if (project.client) {
    facts.push([
      'Client',
      <span key="client" className="inline-flex items-center gap-1.5">
        <ClientLogo client={project.client} />
        {project.client}
      </span>,
    ])
  }
  // Only main projects have team and role fields; checking kind tells TypeScript so.
  if (project.kind === 'main') facts.push(['Team', project.team])
  if (project.kind === 'main' && project.role) facts.push(['My role', project.role])
  facts.push(['Dates', project.period])

  if (stacked) {
    return (
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-meta text-ink-soft">{label}</dt>
            <dd className="mt-1 font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    )
  }

  return (
    <dl className="flex flex-wrap gap-x-5 gap-y-1 text-meta">
      {facts.map(([label, value]) => (
        <div key={label} className="flex gap-1.5">
          <dt className="text-ink-soft">{label}</dt>
          <dd className="font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

// Small tags under a project: a story stage (Prototype or Production) if it
// has one, then the areas it belongs to.
export function ProjectTags({ project, stage }: { project: Project; stage?: string }) {
  const tags = [...(stage ? [stage] : []), ...project.categories.map((category) => categoryLabels[category])]

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full bg-ink/[0.06] px-2.5 py-0.5 text-meta font-medium">
          {tag}
        </li>
      ))}
    </ul>
  )
}

export function ProjectSkills({ skills }: { skills: string[] }) {
  return (
    <dl className="text-meta">
      <Fact label="Skills">
        <InlineList items={skills} />
      </Fact>
    </dl>
  )
}

export default ProjectFacts
