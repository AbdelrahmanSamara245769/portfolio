import { useState, type ReactNode } from 'react'
import { npecStory, projects, projectUrl, type GalleryItem, type MainProject, type ProjectPage as PageData } from '../data/projects'
import { useInView } from '../lib/useInView'
import Gallery from './Gallery'
import { ArrowIcon, CodeIcon, ExpandIcon } from './icons'
import KeyResult from './KeyResult'
import Lightbox from './Lightbox'
import { outlineButton, textLink } from './linkStyles'
import PipelineSteps from './PipelineSteps'
import ProjectFacts, { ProjectSkills, ProjectTags } from './ProjectFacts'
import Recording from './Recording'
import Rich from './Rich'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

// A project's own page, for the main projects that have one (see `page` in
// projects.ts). main.tsx shows it when the HTML file names a project. It reads
// top to bottom: the header with the title, key result and facts; the lead
// picture or video; the problem, what I built, how it works and the results;
// the rest of the gallery; and links back to all projects and on to the other
// half of the NPEC story.
function ProjectPage({ id }: { id: string }) {
  const project = projects.find((candidate) => candidate.id === id)
  // A page always names a main project with a page; this covers a typo in an HTML file.
  if (!project || project.kind !== 'main' || !project.page) return <MissingProject />
  return <ProjectPageContent project={project} page={project.page} />
}

function ProjectPageContent({ project, page }: { project: MainProject; page: PageData }) {
  // Which gallery item the larger view shows, or null while it is closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { details } = project
  // The first item leads the page; the rest make up the gallery further down.
  const [lead, ...rest] = page.gallery

  // The NPEC story's other half, linked at the bottom of the page.
  const isPrototype = project.id === npecStory.prototypeId
  const stage = isPrototype ? 'Prototype' : project.id === npecStory.productionId ? 'Production' : undefined
  const other = projects.find((candidate) => candidate.id === (isPrototype ? npecStory.productionId : npecStory.prototypeId))
  const otherPage = stage && other?.kind === 'main' ? other.page : undefined

  return (
    <>
      <SiteHeader current="projects" />
      <main id="main" className="mx-auto max-w-6xl px-4 pt-10 pb-24 sm:px-6 md:pt-14 md:pb-32 lg:px-8">
        <a href="/#projects" className={`gap-2 text-meta ${textLink}`}>
          <ArrowIcon className="rotate-180" />
          All projects
        </a>

        <header className="mt-8 grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="role-display text-section">{project.title}</h1>
            <div className="mt-6">
              <KeyResult text={project.keyResult} size="row" />
            </div>
            <p className="mt-5 max-w-measure text-lead text-ink-soft">
              <Rich text={project.summary} />
            </p>
            <div className="mt-6">
              <ProjectTags project={project} stage={stage} />
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <ProjectFacts project={project} stacked />
            <div className="mt-5">
              <ProjectSkills skills={project.skills} />
            </div>
            {project.codeUrl && (
              <a href={project.codeUrl} className={`mt-7 text-meta ${outlineButton}`}>
                <CodeIcon />
                View code
                <span className="sr-only"> for {project.title} on GitHub</span>
              </a>
            )}
          </div>
        </header>

        {lead && <LeadVisual item={lead} onOpen={() => setOpenIndex(0)} />}

        <div className="mt-20 space-y-16 md:mt-28 md:space-y-24">
          <DetailSection title="The problem">
            <p className="text-ink-soft">
              <Rich text={details.problem} />
            </p>
          </DetailSection>

          <DetailSection title="What I built">
            <BulletList items={details.built} />
            {details.teamBuilt && (
              <>
                <h3 className="role-title mt-10 text-title">What the team built</h3>
                <p className="mt-3 text-ink-soft">
                  <Rich text={details.teamBuilt} />
                </p>
              </>
            )}
          </DetailSection>

          <DetailSection title="How it works">
            <TracedSteps steps={details.howItWorks} />
          </DetailSection>

          <DetailSection title="Results">
            <BulletList items={details.result} />
          </DetailSection>

          {rest.length > 0 && (
            <section aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="role-heading text-project">
                Gallery
              </h2>
              <div className="mt-8 md:mt-10">
                {/* The gallery starts at the second item; the lead is the first. */}
                <Gallery items={rest} firstIndex={1} onOpen={setOpenIndex} />
              </div>
            </section>
          )}
        </div>

        <nav aria-label="More projects" className="mt-24 grid gap-8 border-t border-ink/15 pt-10 md:mt-32 md:grid-cols-2 md:items-end">
          <a href="/#projects" className={`gap-2 self-start text-meta ${textLink}`}>
            <ArrowIcon className="rotate-180" />
            All projects
          </a>
          {other && otherPage && (
            <a href={projectUrl(otherPage)} className="group block md:text-right">
              <span className="block text-meta text-ink-soft">{isPrototype ? 'Then, in production' : 'Where it started'}</span>
              <span className="role-heading mt-2 inline-flex items-center gap-3 text-card transition-[color] duration-200 group-hover:text-accent-text motion-reduce:transition-none">
                {other.title}
                <ArrowIcon className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1 motion-reduce:transition-none" />
              </span>
              {/* From the prototype, one sentence says how it carried on. */}
              {isPrototype && (
                <span className="mt-2 block text-meta text-ink-soft md:ml-auto md:max-w-sm">
                  <Rich text={npecStory.link} />
                </span>
              )}
            </a>
          )}
        </nav>
      </main>
      <SiteFooter />
      <Lightbox
        items={page.gallery}
        index={openIndex}
        label={`${project.title}: gallery`}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  )
}

// The large picture or video under the header, with its caption and a button
// that opens it in the larger view. It sits on the band colour, so a tall
// screenshot stands centred rather than stretching to a huge height.
function LeadVisual({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <figure className="card mt-12 overflow-hidden md:mt-16">
      <div className="flex justify-center bg-band">
        {item.kind === 'video' ? (
          <div className="w-full max-w-[60rem]">
            <Recording
              visual={{
                type: 'animation',
                webm: item.webm,
                mp4: item.mp4,
                still: item.poster,
                alt: item.alt,
                width: item.width,
                height: item.height,
              }}
            />
          </div>
        ) : (
          <button type="button" onClick={onOpen} className="block">
            <span className="sr-only">View larger: </span>
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              decoding="async"
              className="block h-auto max-h-[44rem] w-auto max-w-full"
            />
          </button>
        )}
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-ink/10 px-5 py-3 text-meta text-ink-soft sm:px-7">
        <span className="max-w-[36rem] py-1">{item.caption}</span>
        <button type="button" onClick={onOpen} className={`gap-2 ${textLink}`}>
          <ExpandIcon />
          View larger
        </button>
      </figcaption>
    </figure>
  )
}

// One part of the page: its heading in the left third on wide screens, the
// text in the rest, kept to a readable width.
function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  const headingId = `${title.toLowerCase().replace(/\W+/g, '-')}-heading`

  return (
    <section aria-labelledby={headingId} className="grid gap-x-16 gap-y-5 lg:grid-cols-12">
      <h2 id={headingId} className="role-heading text-project lg:col-span-4">
        {title}
      </h2>
      <div className="max-w-[42rem] lg:col-span-8">{children}</div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-3 pl-5 text-ink-soft marker:text-ink-soft">
      {items.map((item) => (
        <li key={item}>
          <Rich text={item} />
        </li>
      ))}
    </ul>
  )
}

// The How it works steps trace down the first time they scroll into view: the
// same animation as in a Read more panel, started by data-open (see index.css).
function TracedSteps({ steps }: { steps: string[] }) {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <div ref={ref} data-open={inView} className="text-ink-soft [&>ol]:mt-0">
      <PipelineSteps steps={steps} />
    </div>
  )
}

function MissingProject() {
  return (
    <>
      <SiteHeader current="projects" />
      <main id="main" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="role-display text-section">This project isn’t here</h1>
        <p className="mt-5 text-lead text-ink-soft">The link may be out of date.</p>
        <a href="/#projects" className={`mt-8 gap-2 ${textLink}`}>
          <ArrowIcon className="rotate-180" />
          All projects
        </a>
      </main>
      <SiteFooter />
    </>
  )
}

export default ProjectPage
