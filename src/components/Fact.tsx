import type { ReactNode } from 'react'

type FactProps = {
  label: string
  children: ReactNode
  // The grid columns for label and value. The default suits the project facts.
  columns?: string
}

// One label and its value inside a <dl>, with the labels lined up in a column.
// The label is the softer shade and the value the full ink colour, so the eye
// lands on the values.
function Fact({ label, children, columns = 'grid-cols-[4rem_minmax(0,1fr)]' }: FactProps) {
  return (
    <div className={`grid gap-x-3 ${columns}`}>
      <dt className="text-ink-soft">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  )
}

export default Fact
