import Rich from './Rich'

// This draws the "How it works" steps as a traced line with one node per step.
// The last node is a ring, marking the output. The `lh` unit is one line of
// text, so 0.5lh lines each node up with its step's first line, and the 1rem in
// the line's bottom offset is the pb-4 gap between steps.
//
// The step-node and step-line classes make the trace run down the steps each
// time the Read more panel opens (see index.css); --i sets each step's turn.
function PipelineSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-3">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1

        return (
          <li
            key={step}
            style={{ '--i': index }}
            className="grid grid-cols-[1.5rem_1fr] gap-x-3 pb-4 last:pb-0"
          >
            <span aria-hidden="true" className="relative">
              {!isLast && (
                <span className="step-line absolute top-[0.5lh] -bottom-[calc(0.5lh+1rem)] left-1/2 w-0.5 -translate-x-1/2 bg-ink/60 forced-colors:bg-[CanvasText]" />
              )}
              {isLast ? (
                <span className="step-node absolute top-[0.5lh] left-1/2 size-4 -translate-1/2 rounded-full border-2 border-ink bg-surface" />
              ) : (
                <span className="step-node absolute top-[0.5lh] left-1/2 size-2.5 -translate-1/2 rounded-full bg-ink forced-colors:bg-[CanvasText]" />
              )}
            </span>
            <span>
              <Rich text={step} />
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export default PipelineSteps
