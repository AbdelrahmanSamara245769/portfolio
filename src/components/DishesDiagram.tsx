import type { DishesVisual } from '../data/projects'
import { revealState, useInView } from '../lib/useInView'

// A test drawn as petri dishes seen from above. In each dish there is one lane
// per plant: the seed at the top, the root growing down from it, and the root
// tip the robot had to hit, drawn as a ring. When the drawing scrolls into view
// the roots grow, then the tips are filled in one after another as inoculated, the
// way the robot visited them. The positions are schematic (evenly spaced);
// the numbers of dishes and tips are the real test.
//
// The drawing is hidden from screen readers, which hear `description` instead.
function DishesDiagram({ diagram }: { diagram: DishesVisual }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  // Array.from with a length makes the lists [0, 1, 2] and [0, 1, 2, 3, 4] to draw from.
  const dishes = Array.from({ length: diagram.dishes }, (_, index) => index)
  const tips = Array.from({ length: diagram.tipsPerDish }, (_, index) => index)

  return (
    <div ref={ref} data-reveal={revealState(inView)}>
      <p className="sr-only">{diagram.description}</p>
      <div aria-hidden="true" className="grid max-w-[34rem] grid-cols-3 gap-3 @sm:gap-6">
        {dishes.map((dish) => (
          <div
            key={dish}
            style={{ '--d': dish }}
            className="relative aspect-square rounded-full border border-ink/40 bg-page/50"
          >
            {/* The dish's inner rim. */}
            <span className="absolute inset-[5%] rounded-full border border-ink/15" />
            <div className="absolute inset-x-[20%] inset-y-[20%] grid grid-cols-5">
              {tips.map((tip) => (
                // --i is the tip's turn across all dishes, so the robot works through them in order.
                <div key={tip} className="relative" style={{ '--i': dish * diagram.tipsPerDish + tip }}>
                  <span className="absolute top-0 left-1/2 size-1 -translate-1/2 rounded-full bg-ink/70 forced-colors:bg-[CanvasText]" />
                  <span className="dish-root absolute top-0 left-1/2 h-[68%] w-[1.5px] -translate-x-1/2 bg-ink/55 forced-colors:bg-[CanvasText]" />
                  <span className="absolute top-[68%] left-1/2 grid size-2.5 -translate-1/2 place-items-center rounded-full border border-ink @sm:size-3">
                    <span className="dish-hit block size-[62%] rounded-full bg-ink forced-colors:bg-[CanvasText]" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DishesDiagram
