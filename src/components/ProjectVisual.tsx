import type { ProjectVisual as Visual } from '../data/projects'
import { keepTogether } from '../lib/text'
import { fillsCard } from '../lib/visuals'
import BarChart from './BarChart'
import BranchDiagram from './BranchDiagram'
import FlowDiagram from './FlowDiagram'
import Recording from './Recording'

// The visual that leads a project, with its caption. Checking visual.type tells
// TypeScript which fields each kind of visual has, the same way kind works for
// projects. The figure is a container, so the charts and diagrams inside can
// adapt to the width they actually get rather than to the window.
function ProjectVisual({ visual }: { visual: Visual }) {
  const edgeToEdge = fillsCard(visual)

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
          className="block h-auto w-full"
        />
      )}
      {visual.type === 'animation' && <Recording visual={visual} />}
      {visual.type === 'bars' && <BarChart chart={visual} />}
      {visual.type === 'flow' && <FlowDiagram steps={visual.steps} />}
      {visual.type === 'branches' && <BranchDiagram diagram={visual} />}
      {/* Captions use smaller text, so a narrower width keeps them to about 70 characters a line.
          Under an edge-to-edge image, the caption gets the padding the card leaves out, and
          a hairline sets it off from the image. A visual that explains itself has no caption. */}
      {visual.caption && (
        <figcaption
          className={`text-meta text-ink-soft ${edgeToEdge ? 'border-t border-ink/10 px-5 pt-4 pb-5 sm:px-7' : 'mt-3'}`}
        >
          <span className="block max-w-[28rem]">{keepTogether(visual.caption)}</span>
        </figcaption>
      )}
    </figure>
  )
}

export default ProjectVisual
