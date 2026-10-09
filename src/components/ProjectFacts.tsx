import { categoryLabels, type Project } from '../data/projects'
import Fact from './Fact'
import InlineList from './InlineList'

// The project's facts in one compact line: who it was for, the team, my role
// and the dates, each a small label with its value.
function ProjectFacts({ project }: { project: Project }) {
  const facts: [string, string][] = []
  if (project.client) facts.push(['Client', project.client])
  // Only main projects have team and role fields; checking kind tells TypeScript so.
  if (project.kind === 'main') facts.push(['Team', project.team])
  if (project.kind === 'main' && project.role) facts.push(['My role', project.role])
  facts.push(['Dates', project.period])

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
// has one, then the areas the filter buttons use.
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
