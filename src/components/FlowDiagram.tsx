import { useEffect, useRef } from 'react'
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

// Sends the sample along the line: it stops at each node for a moment,
// then moves on. The path is measured from where the nodes really are, so it
// works whether the steps run across or down. Web Animations (element.animate)
// is used because the path depends on the layout, which CSS alone can't know.
function runSample(list: HTMLOListElement, dot: HTMLSpanElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (dot.getAnimations().some((animation) => animation.playState === 'running')) return

  const box = list.getBoundingClientRect()
  const points = [...list.querySelectorAll<HTMLElement>('[data-node]')].map((node) => {
    const rect = node.getBoundingClientRect()
    return { x: rect.left + rect.width / 2 - box.left, y: rect.top + rect.height / 2 - box.top }
  })
  if (points.length < 2) return

  // Each step takes 0.6s: 0.26s resting on the node, then the move to the next.
  const stepTime = 600
  const rest = 260
  const total = (points.length - 1) * stepTime + rest + 340
  const at = (point: { x: number; y: number }) => `${point.x}px ${point.y}px`
  const easing = 'cubic-bezier(0.45, 0, 0.2, 1)'
  const keyframes: Keyframe[] = [{ offset: 0, translate: at(points[0]), opacity: 0 }]
  points.forEach((point, index) => {
    const arrives = index * stepTime
    if (index > 0) keyframes.push({ offset: arrives / total, translate: at(point), opacity: 1, easing })
    keyframes.push({ offset: (arrives + rest) / total, translate: at(point), opacity: 1, easing })
  })
  keyframes.push({ offset: 1, translate: at(points[points.length - 1]), opacity: 0 })
  dot.animate(keyframes, { duration: total, fill: 'none' })
}

type FlowDiagramProps = {
  steps: FlowStep[]
  // Send a sample through the steps once they have traced in, and again
  // whenever the visitor points at the diagram.
  sample?: boolean
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
function FlowDiagram({ steps, sample = false }: FlowDiagramProps) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const listRef = useRef<HTMLOListElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const hasTeamSteps = steps.some((step) => !step.mine)

  // The first run waits until the trace has reached the last node.
  useEffect(() => {
    if (!sample || !inView) return
    const timer = window.setTimeout(() => {
      if (listRef.current && dotRef.current) runSample(listRef.current, dotRef.current)
    }, steps.length * 140 + 600)
    return () => window.clearTimeout(timer)
  }, [sample, inView, steps.length])

  function replay() {
    if (sample && inView && listRef.current && dotRef.current) runSample(listRef.current, dotRef.current)
  }

  return (
    <div ref={ref} data-reveal={revealState(inView)} className="text-meta" onPointerEnter={replay}>
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
      {/* The wrapper holds the list and the sample dot, which can't sit inside the <ol>
          itself (a list may only contain list items). Both share the same top-left corner. */}
      <div className="relative">
      <ol ref={listRef} className="grid gap-y-3 @xl:auto-cols-fr @xl:grid-flow-col @xl:gap-x-2 @xl:gap-y-0">
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
      {/* The sample: a dot with a ring of the card's colour, so it stands out on the line.
          It sits at the top-left corner and the animation moves it. */}
      {sample && (
        <span
          ref={dotRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 -mt-1.5 -ml-1.5 size-3 rounded-full bg-ink opacity-0 ring-2 ring-surface forced-colors:hidden"
        />
      )}
      </div>
    </div>
  )
}

export default FlowDiagram
