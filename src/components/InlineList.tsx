import { Fragment } from 'react'

// Items separated by commas. A one-word item, such as Stable-Baselines3, is kept
// whole so it never breaks at its hyphen; longer items still wrap between words,
// so they fit on the narrowest phones.
function InlineList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && ', '}
          {item.includes(' ') ? item : <span className="whitespace-nowrap">{item}</span>}
        </Fragment>
      ))}
    </>
  )
}

export default InlineList
