import type { BranchesVisual } from '../data/projects'
import { revealState, useInView } from '../lib/useInView'

const line = 'absolute left-[5px] w-0.5 bg-ink/60 forced-colors:bg-[CanvasText]'
const node = 'absolute size-3 rounded-full border-2 border-ink bg-ink forced-colors:bg-[CanvasText]'

// One starting point that splits into parallel questions, drawn as a small tree:
// a vertical trunk, a short branch to each question, and an optional last step on
// the trunk where the branches join again. The `lh` unit is one line of text, so
// 0.5lh is the middle of an item's first line, where its branch and node sit.
// Each trunk segment reaches 0.5rem past its item to cover the gap to the next one.
//
// When the diagram scrolls into view, the trunk grows down and each branch
// grows out to its question in turn (--i sets the order).
function BranchDiagram({ diagram }: { diagram: BranchesVisual }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const order = (index: number) => ({ '--i': index })

  return (
    <div ref={ref} data-reveal={revealState(inView)} className="text-meta">
      <p className="relative pl-6 font-semibold" style={order(0)}>
        <span aria-hidden="true" className={`reveal-node ${node} top-[calc(0.5lh-6px)] left-0`} />
        <span aria-hidden="true" className={`reveal-line ${line} top-[0.5lh] -bottom-2`} />
        {diagram.source}
      </p>
      <ul className="mt-2 space-y-2">
        {diagram.branches.map((branch, index) => {
          const trunkEnds = index === diagram.branches.length - 1 && !diagram.then

          return (
            <li key={branch} className="relative pl-10" style={order(index + 1)}>
              <span
                aria-hidden="true"
                className={`reveal-line ${line} top-0 ${trunkEnds ? 'h-[0.5lh]' : '-bottom-2'}`}
              />
              <span
                aria-hidden="true"
                className="reveal-branch absolute top-[calc(0.5lh-1px)] left-[5px] h-0.5 w-5 bg-ink/60 forced-colors:bg-[CanvasText]"
              />
              <span aria-hidden="true" className={`reveal-node ${node} top-[calc(0.5lh-6px)] left-6`} />
              {branch}
            </li>
          )
        })}
      </ul>
      {diagram.then && (
        <p className="relative mt-2 pl-6 font-semibold" style={order(diagram.branches.length + 1)}>
          <span aria-hidden="true" className={`reveal-line ${line} top-0 h-[0.5lh]`} />
          <span aria-hidden="true" className={`reveal-node ${node} top-[calc(0.5lh-6px)] left-0`} />
          {diagram.then}
        </p>
      )}
    </div>
  )
}

export default BranchDiagram
