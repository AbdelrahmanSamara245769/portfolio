import { npecStory, projects, type MainProject, type ProjectPage } from '../data/projects'
import { sections } from '../data/site'
import FeatureCard from './FeatureCard'
import ProjectCard from './ProjectCard'
import ProjectRow from './ProjectRow'
import ProjectStory from './ProjectStory'
import Section from './Section'

// TypeScript works out from each filter() call that the first list holds only
// MainProject objects and the second only SmallProject ones, so each entry gets the right type.
const mainProjects = projects.filter((project) => project.kind === 'main')
const smallProjects = projects.filter((project) => project.kind === 'small')

// A main project together with its page, for the ones that have one.
type WithPage = { project: MainProject; page: ProjectPage }

// Projects with a page become cards; the rest stay rows.
const withPages: WithPage[] = mainProjects.flatMap((project) => (project.page ? [{ project, page: project.page }] : []))
const rows = mainProjects.filter((project) => !project.page)

// The NPEC story shows as a pair when both of its projects have a page.
// find() returns undefined when an id isn't among them; then every card
// stands on its own instead.
const prototype = withPages.find((item) => item.project.id === npecStory.prototypeId)
const production = withPages.find((item) => item.project.id === npecStory.productionId)
const pair = prototype && production ? { prototype, production } : undefined
const singles = pair ? withPages.filter((item) => item !== prototype && item !== production) : withPages

// The story stage a single card shows as its first tag, if it is part of the NPEC story.
function stageOf(id: string) {
  if (id === npecStory.prototypeId) return 'Prototype'
  if (id === npecStory.productionId) return 'Production'
  return undefined
}

// The projects section, in three parts: the two NPEC projects as large cards
// that open their own pages, then the other main projects as rows with Read
// more, then the smaller projects as a grid of cards.
function Projects() {
  return (
    <Section id="projects" title={sections.projects.title} intro={sections.projects.intro}>
      <div className="space-y-28 md:space-y-36">
        {pair && <ProjectStory prototype={pair.prototype} production={pair.production} />}
        {singles.length > 0 && (
          <div className="grid gap-10 lg:grid-cols-2">
            {singles.map((item) => (
              <FeatureCard key={item.project.id} project={item.project} page={item.page} stage={stageOf(item.project.id)} />
            ))}
          </div>
        )}

        {rows.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            // The rows alternate: visual on the left, then on the right.
            visualSide={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}

        <div>
          <h3 className="role-heading text-center text-project">Other individual projects</h3>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {smallProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Projects
