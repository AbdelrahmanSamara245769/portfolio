import { useEffect, useRef, useState } from 'react'

// A custom hook (a function whose name starts with "use", so it can use React's
// own hooks) that reports when an element first scrolls into view. Charts and
// diagrams use it to start their animation at the moment a reader reaches them.
//
// It returns a ref to put on the element and a true/false value. Once the
// element has been seen, the value stays true and the hook stops watching, so
// each animation runs once. Put the ref on an element that is always rendered:
// the hook looks for it once, when the component first appears.
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || inView) return

    // An IntersectionObserver calls back when the element crosses into the
    // window. The negative bottom margin waits until it is 15% of the window
    // height above the bottom edge, so the reader actually sees it happen.
    // The callback can receive several entries at once, so it checks them all.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(element)

    // The cleanup stops the observer if the component goes away first.
    return () => observer.disconnect()
  }, [inView])

  return [ref, inView] as const
}

// The value for a data-reveal attribute. The animation rules in index.css
// hide the moving parts while it says "waiting" and animate them in on "shown".
export function revealState(inView: boolean) {
  return inView ? 'shown' : 'waiting'
}
