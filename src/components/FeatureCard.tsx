import { projectUrl, type MainProject, type ProjectPage } from '../data/projects'
import { ArrowIcon } from './icons'
import KeyResult from './KeyResult'
import ProjectFacts, { ProjectTags } from './ProjectFacts'
import Recording from './Recording'
import Rich from './Rich'

type FeatureCardProps = {
  project: MainProject
  page: ProjectPage
  // The story stage, shown as the first tag (Prototype or Production), if it has one.
  stage?: string
}

// A main project with a page of its own, as a large card: its visual on top,
// then the title, key result, one sentence, the facts and tags.
//
// The whole card opens the project's page. The link is the title's, and its
// ::after layer stretches over the card (after:absolute after:inset-0), so the
// title stays the link's name for screen readers while any click on the card
// follows it. The recording's Pause button sits above that layer. The card
// shows the focus ring when its link has keyboard focus (has-[a:focus-visible]).
// On hover it rises 4px and its edge deepens (--card-edge in index.css); like
// every card, it casts no shadow.
function FeatureCard({ project, page, stage }: FeatureCardProps) {
  const titleId = `${project.id}-title`
  const { visual } = project

  return (
    <article
      id={project.id}
      aria-labelledby={titleId}
      className="card group relative flex h-full flex-col overflow-hidden transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:[--card-edge:25%] motion-reduce:transition-none motion-reduce:hover:translate-y-0 has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent-line"
    >
      {/* Every card's visual has the same 16:10 shape, so the two cards line up.
          A recording is cropped evenly; a tall screenshot is cut to its top, where the scan is. */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/10 bg-surface">
        {visual.type === 'animation' && <Recording visual={visual} fill />}
        {visual.type === 'image' && (
          <img
            src={visual.src}
            alt={visual.alt}
            width={visual.width}
            height={visual.height}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 id={titleId} className="role-heading text-project">
          <a href={projectUrl(page)} className="outline-none after:absolute after:inset-0">
            {project.title}
          </a>
        </h3>
        <div className="mt-4">
          <KeyResult text={project.keyResult} size="row" />
        </div>
        <p className="mt-4 text-ink-soft">
          <Rich text={project.summary} />
        </p>
        <div className="mt-5">
          <ProjectFacts project={project} />
        </div>
        <div className="mt-4">
          <ProjectTags project={project} stage={stage} />
        </div>
        {/* This says what the card does; the title's link already carries it for screen readers. */}
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-7 text-meta font-semibold transition-[color] duration-200 group-hover:text-accent-text motion-reduce:transition-none"
        >
          View project
          <ArrowIcon className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1 motion-reduce:transition-none" />
        </span>
      </div>
    </article>
  )
}

export default FeatureCard
