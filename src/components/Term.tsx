import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { glossary } from '../data/glossary'

// A technical term with a plain-language explanation from glossary.ts. The term
// is a small button with a dotted underline; pointing at it, tabbing to it or
// tapping it shows the explanation in a bubble below it, and Escape or tapping
// elsewhere hides it again. Screen readers hear the explanation as the
// button's description, whether or not the bubble is showing.
function Term({ term, children }: { term: string; children: string }) {
  const explanation = glossary[term]
  const [isOpen, setIsOpen] = useState(false)
  const bubbleRef = useRef<HTMLSpanElement>(null)
  const id = useId()

  // Each time the bubble opens, centre it under the term, measure it, and shift
  // it sideways if it would stick out of the window. useLayoutEffect runs before
  // the browser paints, so the bubble never flashes in the wrong place. It
  // measures again if the window changes size.
  useLayoutEffect(() => {
    const bubble = bubbleRef.current
    if (!isOpen || !bubble) return
    function place() {
      if (!bubble) return
      bubble.style.transform = 'translateX(-50%)'
      const box = bubble.getBoundingClientRect()
      // The page's own width, not window.innerWidth: on a phone the browser
      // widens innerWidth while anything sticks out, which would hide the problem.
      const width = document.documentElement.clientWidth
      const margin = 12
      let shift = 0
      if (box.left < margin) shift = margin - box.left
      else if (box.right > width - margin) shift = width - margin - box.right
      bubble.style.transform = `translateX(calc(-50% + ${shift}px))`
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [isOpen])

  // Escape closes the bubble, wherever the focus is.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  function close() {
    setIsOpen(false)
  }

  // A term missing from the glossary is shown as ordinary text.
  if (!explanation) return <>{children}</>

  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-describedby={id}
        onClick={() => setIsOpen(true)}
        onFocus={() => setIsOpen(true)}
        onBlur={close}
        // Hover only counts for a mouse: a tap on a phone also reports the
        // pointer leaving straight away, which would close the bubble again.
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setIsOpen(true)
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') close()
        }}
        className="cursor-help underline decoration-current/60 decoration-dotted decoration-[0.08em] underline-offset-[0.18em]"
      >
        {children}
      </button>
      <span
        ref={bubbleRef}
        id={id}
        role="tooltip"
        hidden={!isOpen}
        className="absolute top-full left-1/2 z-30 mt-2 w-max max-w-[16rem] rounded-card bg-ink px-3 py-2 text-left text-meta leading-snug text-wrap font-normal tracking-normal text-page normal-case shadow-[0_8px_24px_-8px_rgb(10_19_15/0.45)]"
      >
        {explanation}
      </span>
    </span>
  )
}

export default Term
