import Rich from './Rich'

// A project's key result, directly under its title: one short line with a soft
// highlight behind it, its number in the heaviest weight (see .key-result in
// index.css). Rows use the larger size, cards the body size.
function KeyResult({ text, size }: { text: string; size: 'row' | 'card' }) {
  return (
    <p className={`key-result ${size === 'row' ? 'text-lead' : 'text-body'}`}>
      <span className="key-result-mark">
        <Rich text={text} />
      </span>
    </p>
  )
}

export default KeyResult
