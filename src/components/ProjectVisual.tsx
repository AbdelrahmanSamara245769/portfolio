import type { ProjectVisual as Visual } from '../data/projects'
import { keepTogether } from '../lib/text'
import BarChart from './BarChart'
import BranchDiagram from './BranchDiagram'
import DishesDiagram from './DishesDiagram'
import FlowDiagram from './FlowDiagram'

// The visual that leads a project, with its caption. Checking visual.type tells
// TypeScript which fields each kind of visual has, the same way kind works for
// projects. The figure is a container, so the charts and diagrams inside can
// adapt to the width they actually get rather than to the window.
// `sample` sends a sample through a flow diagram (used by the featured project).
function ProjectVisual({ visual, sample = false }: { visual: Visual; sample?: boolean }) {
  return (
    <figure className="@container">
      {visual.type === 'image' && (
        <img
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-card bg-surface ring-1 ring-ink/15"
        />
      )}
      {visual.type === 'bars' && <BarChart chart={visual} />}
      {visual.type === 'flow' && <FlowDiagram steps={visual.steps} sample={sample} />}
      {visual.type === 'branches' && <BranchDiagram diagram={visual} />}
      {visual.type === 'dishes' && <DishesDiagram diagram={visual} />}
      {/* Captions use smaller text, so a narrower width keeps them to about 70 characters a line.
          A visual that explains itself has no caption. */}
      {visual.caption && (
        <figcaption className="mt-3 max-w-[28rem] text-meta text-ink-soft">{keepTogether(visual.caption)}</figcaption>
      )}
    </figure>
  )
}

export default ProjectVisual
