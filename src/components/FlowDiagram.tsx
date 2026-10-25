import type { FlowStep } from '../data/projects'
import { revealState, useInView } from '../lib/useInView'

// A node on the diagram's line: filled for my parts, outlined for the team's.
// In Windows high-contrast mode the browser replaces the page's colours, so the
// forced-colors classes pick system colours that keep filled and outlined apart.
function Node({ mine }: { mine: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative block size-3 rounded-full border-2 border-ink ${mine ? 'bg-ink forced-colors:bg-[CanvasText]' : 'bg-surface forced-colors:bg-[Canvas]'}`}
    />
  )
}

// A project's steps from start to finish, joined by a line. When some steps were
// teammates' work, a legend explains the two kinds of node, and screen readers hear
// "my part" or "the team's part" after each step instead.
//
// In a narrow space the steps run downwards. Once the surrounding container (the
// figure, marked @container) is at least 36rem wide, the @xl: classes lay them across.
// The `lh` unit is one line of text, so 0.5lh lines a node up with its label's first line.
//
// When the diagram scrolls into view, the line traces from step to step: each
// node appears, then the line grows on to the next one. The labels never move,
// so the text can be read straight away.
function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const hasTeamSteps = steps.some((step) => !step.mine)

  return (
    <div ref={ref} data-reveal={revealState(inView)} className="text-meta">
      {hasTeamSteps && (
        <p aria-hidden="true" className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-ink-soft">
          <span className="inline-flex items-center gap-2">
            <Node mine />
            My part
          </span>
          <span className="inline-flex items-center gap-2">
            <Node mine={false} />
            The team’s part
          </span>
        </p>
      )}
      <ol className="grid gap-y-3 @xl:auto-cols-fr @xl:grid-flow-col @xl:gap-x-2 @xl:gap-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1

          return (
            // --i is the step's place in the order, which sets when its part of the trace starts.
            <li
              key={step.label}
              style={{ '--i': index }}
              className="relative grid grid-cols-[1.5rem_1fr] gap-x-3 @xl:grid-cols-1 @xl:content-start @xl:gap-y-2 @xl:text-center"
            >
              {/* The line to the next node: downwards here, across from @xl. The extra
                  0.75rem or 0.5rem matches the gap between steps. */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="reveal-line reveal-line-across absolute top-[0.5lh] left-[calc(0.75rem-1px)] h-[calc(100%+0.75rem)] w-0.5 bg-ink/60 forced-colors:bg-[CanvasText] @xl:top-[5px] @xl:left-1/2 @xl:h-0.5 @xl:w-[calc(100%+0.5rem)]"
                />
              )}
              <span data-node className="reveal-node mt-[calc(0.5lh-6px)] self-start justify-self-center @xl:mt-0">
                <Node mine={step.mine} />
              </span>
              <span>
                {step.label}
                {hasTeamSteps && (
                  <span className="sr-only">{step.mine ? ', my part' : ', the team’s part'}</span>
                )}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default FlowDiagram
