import { Fragment } from 'react'
import { keepTogether } from '../lib/text'
import Term from './Term'

type RichProps = {
  text: string
  // Extra classes for the marked words.
  strongClassName?: string
}

// Text in src/data can carry two marks, as plain characters, so it stays easy to edit:
//   **key words**  shown bold and in the full ink colour, so a skimming reader
//                  picks them out first, while the rest stays a softer shade;
//   [[term]]       a technical term with a plain-language explanation (Term.tsx).
//
// The regular expression splits the text at each mark and keeps the marks as
// their own pieces, so each piece is either a mark or ordinary text.
const marks = /(\*\*.+?\*\*|\[\[.+?\]\])/
const isTerm = (piece = '') => piece.startsWith('[[') && piece.endsWith(']]')

// A term sits in its own box (see Term.tsx), and browsers may break a line right
// beside a box, which can leave a "(" or "," on its own line. So the characters
// touching a term with no space between move into the term's piece, which never
// breaks. These two find them: the end of the text before, the start of the text after.
const touchingEnd = /\S+$/
const touchingStart = /^\S+/

function Rich({ text, strongClassName = '' }: RichProps) {
  const pieces = keepTogether(text).split(marks)

  return (
    <>
      {pieces.map((piece, index) => {
        if (piece.startsWith('**') && piece.endsWith('**')) {
          return (
            <strong key={index} className={`font-bold text-ink ${strongClassName}`}>
              {piece.slice(2, -2)}
            </strong>
          )
        }
        if (isTerm(piece)) {
          const shown = piece.slice(2, -2)
          // keepTogether may have added invisible no-break characters; the glossary key has none.
          const term = shown.replace(/\u2060/g, '').replace(/\u00A0/g, ' ')
          // ?.[0] gives the matched characters, or undefined (so '') when there are none.
          const before = pieces[index - 1]?.match(touchingEnd)?.[0] ?? ''
          const after = pieces[index + 1]?.match(touchingStart)?.[0] ?? ''
          return (
            <span key={index} className="whitespace-nowrap">
              {before}
              <Term term={term}>{shown}</Term>
              {after}
            </span>
          )
        }
        // Ordinary text gives up the characters a neighbouring term has taken.
        let plain = piece
        if (isTerm(pieces[index + 1])) plain = plain.replace(touchingEnd, '')
        if (isTerm(pieces[index - 1])) plain = plain.replace(touchingStart, '')
        return <Fragment key={index}>{plain}</Fragment>
      })}
    </>
  )
}

export default Rich
