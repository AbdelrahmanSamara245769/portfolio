import { useState } from 'react'
import { categoryLabels, npecStory, projects, type Category, type MainProject, type ProjectPage } from '../data/projects'
import { sections } from '../data/site'
import FeatureCard from './FeatureCard'
import ProjectCard from './ProjectCard'
import ProjectRow from './ProjectRow'
import ProjectStory from './ProjectStory'
import Section from './Section'

// TypeScript works out from each filter that the first list holds only MainProject
// objects and the second only SmallProject ones, so each entry gets the right type.
const mainProjects = projects.filter((project) => project.kind === 'main')
const smallProjects = projects.filter((project) => project.kind === 'small')

type Filter = 'all' | Category
const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  ...(Object.keys(categoryLabels) as Category[]).map((value) => ({ value, label: categoryLabels[value] })),
]

// A main project together with its page, for the ones that have one.
type WithPage = { project: MainProject; page: ProjectPage }

// The projects section, in three parts: the two NPEC projects as large cards
// that open their own pages, then the other main projects as rows with Read
// more, then the smaller projects as a grid of cards. A filter shows only the
// projects in its area; All shows everything.
function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  // Projects only rise in after a filter change, not when the page first opens.
  const [hasFiltered, setHasFiltered] = useState(false)

  const matches = (categories: Category[]) => filter === 'all' || categories.includes(filter)
  const shownMain = mainProjects.filter((project) => matches(project.categories))
  const shownSmall = smallProjects.filter((project) => matches(project.categories))

  // Projects with a page become cards; the rest stay rows.
  const withPages: WithPage[] = shownMain.flatMap((project) => (project.page ? [{ project, page: project.page }] : []))
  const rows = shownMain.filter((project) => !project.page)

  // The NPEC story shows as a pair only when both of its projects are shown;
  // otherwise whichever is shown stands as a single card. find() returns
  // undefined when an id isn't among them.
  const prototype = withPages.find((item) => item.project.id === npecStory.prototypeId)
  const production = withPages.find((item) => item.project.id === npecStory.productionId)
  const pair = prototype && production ? { prototype, production } : undefined
  const singles = pair ? withPages.filter((item) => item !== prototype && item !== production) : withPages
  const count = shownMain.length + shownSmall.length

  function choose(value: Filter) {
    setFilter(value)
    setHasFiltered(true)
  }

  return (
    <Section id="projects" title={sections.projects.title} intro={sections.projects.intro}>
      {/* aria-pressed tells screen readers which filter is on. */}
      <div role="group" aria-label="Show projects by area" className="flex flex-wrap justify-center gap-2">
        {filters.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => choose(option.value)}
            className={`inline-flex min-h-11 items-center rounded-full px-4 text-meta font-semibold transition-[color,background-color] duration-200 motion-reduce:transition-none sm:px-5 ${
              filter === option.value ? 'bg-accent text-on-accent' : 'card hover:text-accent-text'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {/* Screen readers hear how many projects a filter leaves. */}
      <p role="status" className="sr-only">
        {hasFiltered && `Showing ${count} ${count === 1 ? 'project' : 'projects'}`}
      </p>

      {/* key={filter} draws the lists afresh for each filter, so the rise-in plays again. */}
      <div key={filter} className="mt-14 space-y-28 md:mt-20 md:space-y-36">
        {pair && <ProjectStory prototype={pair.prototype} production={pair.production} animate={hasFiltered} />}
        {singles.length > 0 && (
          <div className="grid gap-10 lg:grid-cols-2">
            {singles.map((item, index) => (
              <FeatureCard key={item.project.id} project={item.project} page={item.page} stage={item.project.id === npecStory.prototypeId ? 'Prototype' : 'Production'} animate={hasFiltered} style={{ '--i': index }} />
            ))}
          </div>
        )}

        {rows.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            // The rows alternate: visual on the left, then on the right.
            visualSide={index % 2 === 0 ? 'left' : 'right'}
            animate={hasFiltered}
            style={{ '--i': index }}
          />
        ))}

        {shownSmall.length > 0 && (
          <div>
            <h3 className="role-heading text-center text-project">Other individual projects</h3>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {shownSmall.map((project, index) => (
                <ProjectCard key={project.id} project={project} animate={hasFiltered} style={{ '--i': index }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

export default Projects
