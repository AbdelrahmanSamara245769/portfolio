import type { BarsVisual } from '../data/projects'
import { revealState, useInView } from '../lib/useInView'

// A small comparison chart. Sighted readers get the drawn bars; screen readers
// get the same numbers as a real table, with row and column headings. So the
// drawing is hidden from screen readers (aria-hidden) and the table is hidden
// from view (sr-only).
//
// Each bar sits on its own line under its label, so the chart fits a phone. Its
// width is the value's share of the scale, leaving 4.5rem for the value label
// at its tip. The bars grow from the baseline when the chart scrolls into view.
function BarChart({ chart }: { chart: BarsVisual }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  // Notes get their own column only when they have a heading to go with it.
  const showNotes = Boolean(chart.noteHeading) && chart.bars.some((bar) => bar.note)

  return (
    <div ref={ref} data-reveal={revealState(inView)} className="text-meta">
      {/* The table sits inside a hidden div, because a table ignores the 1px width
          that sr-only gives it and would push the page wider on a phone. */}
      <div className="sr-only">
        <table>
          <caption>{chart.valueHeading}</caption>
          <thead>
            <tr>
              <th scope="col">{chart.labelHeading}</th>
              <th scope="col">{chart.valueHeading}</th>
              {showNotes && <th scope="col">{chart.noteHeading}</th>}
            </tr>
          </thead>
          <tbody>
            {chart.bars.map((bar) => (
              <tr key={bar.label}>
                <th scope="row">{bar.label}</th>
                <td>{bar.valueLabel}</td>
                {showNotes && <td>{bar.note}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div aria-hidden="true">
        <p className="text-ink-soft">{chart.valueHeading}</p>
        <div className="mt-4 grid gap-y-5">
          {chart.bars.map((bar, index) => (
            // --i is the bar's place in the order, so the second bar grows a moment after the first.
            <div key={bar.label} style={{ '--i': index }}>
              <p className="font-semibold">{bar.label}</p>
              {/* The left border is the baseline every bar grows from. */}
              <div className="mt-1.5 flex items-center gap-2 border-l border-ink/40 py-1">
                <span
                  className={`reveal-bar block h-3 shrink-0 rounded-r-[4px] ${bar.emphasis ? 'bg-ink forced-colors:bg-[CanvasText]' : 'bg-bar-muted forced-colors:bg-[GrayText]'}`}
                  style={{ width: `calc((100% - 4.5rem) * ${bar.value / chart.scaleMax})` }}
                />
                <span className="reveal-fade text-base font-bold whitespace-nowrap tabular-nums">{bar.valueLabel}</span>
              </div>
              {showNotes && bar.note && (
                <p className="mt-1 text-ink-soft">
                  {chart.noteHeading}: <span className="font-semibold text-ink">{bar.note}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarChart
