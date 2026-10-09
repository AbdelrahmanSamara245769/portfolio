import { useState } from 'react'
import { categoryLabels, npecStory, projects, type Category } from '../data/projects'
import { sections } from '../data/site'
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

// The projects section: filter buttons, then the main projects as alternating
// rows (opening with the NPEC story), then the smaller projects as a grid of
// cards. A filter shows only the projects in its area; All shows everything.
function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  // Projects only rise in after a filter change, not when the page first opens.
  const [hasFiltered, setHasFiltered] = useState(false)

  const matches = (categories: Category[]) => filter === 'all' || categories.includes(filter)
  const shownMain = mainProjects.filter((project) => matches(project.categories))
  const shownSmall = smallProjects.filter((project) => matches(project.categories))

  // The NPEC story shows as one piece only when both of its projects are shown;
  // otherwise whichever of them is shown takes its place as an ordinary row.
  // find() returns undefined when an id isn't among the shown projects.
  const prototype = shownMain.find((project) => project.id === npecStory.prototypeId)
  const production = shownMain.find((project) => project.id === npecStory.productionId)
  const hasStory = prototype !== undefined && production !== undefined
  const rows = hasStory ? shownMain.filter((project) => project !== prototype && project !== production) : shownMain
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
            className={`inline-flex min-h-11 items-center rounded-full px-4 text-meta sm:px-5 font-semibold transition-[color,background-color] duration-200 motion-reduce:transition-none ${
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
      <div key={filter} className="mt-14 space-y-24 md:mt-20 md:space-y-32">
        {hasStory && <ProjectStory prototype={prototype} production={production} />}
        {rows.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            // The story's rows are left then right, so the next row starts on the left again.
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
