import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from 'react'
import type { GalleryItem } from '../data/projects'
import { CloseIcon, StepIcon } from './icons'

type LightboxProps = {
  // Every picture and video on the page, in order.
  items: GalleryItem[]
  // Which one is open, or null when the larger view is closed.
  index: number | null
  // A name for the dialog, such as the project's title.
  label: string
  onChange: (index: number) => void
  onClose: () => void
}

// The gallery's larger view: one picture or video at a time over the darkened
// page, with its caption and its place in the set.
//
// It is the browser's own modal <dialog>, so the page behind can't be reached
// and Escape closes it. On top of that: the arrow keys and the side buttons
// step through the set (and round from the last to the first), a swipe does
// the same on a touch screen, and a click outside the picture closes it. When
// it closes, focus goes back to whatever opened it. data-theme="dark" gives it
// the dark theme's colours in either theme, since it always sits on dark.
function Lightbox({ items, index, label, onChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const swipeStart = useRef<number | null>(null)
  const isOpen = index !== null

  // React decides whether it should be open; this tells the dialog element.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      dialog.showModal()
    }
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const step = (by: number) => {
    if (index !== null) onChange((index + by + items.length) % items.length)
  }

  // The dialog's own close event: Escape, or close() above. Either way React is
  // told, and focus returns to what opened it.
  function handleClose() {
    onClose()
    openerRef.current?.focus()
  }

  function handleKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    }
  }

  // A swipe: a touch that moves at least 50px sideways steps that way.
  function swipeDown(event: PointerEvent) {
    swipeStart.current = event.pointerType === 'mouse' ? null : event.clientX
  }
  function swipeUp(event: PointerEvent) {
    if (swipeStart.current === null) return
    const moved = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(moved) > 50) step(moved < 0 ? 1 : -1)
  }

  const item = index !== null ? items[index] : null
  // The item's place in the set, counted from 1 for people.
  const place = (index ?? 0) + 1
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const sideButton =
    'grid size-12 shrink-0 place-items-center rounded-full bg-surface/90 text-ink ring-1 ring-ink/20 transition-[color,background-color] duration-200 hover:bg-surface hover:text-accent-text motion-reduce:transition-none'

  return (
    <dialog
      ref={dialogRef}
      data-theme="dark"
      aria-label={label}
      onClose={handleClose}
      onKeyDown={handleKey}
      className="lightbox m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-ink"
    >
      {item && (
        // A click on this backdrop layer itself (not on the picture or a button) closes the view.
        <div
          className="flex size-full flex-col items-center justify-center gap-4 px-4 pt-20 pb-6 sm:px-6 sm:pt-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close()
          }}
        >
          <button type="button" onClick={() => dialogRef.current?.close()} className={`${sideButton} absolute top-4 right-4`}>
            <CloseIcon />
            <span className="sr-only">Close</span>
          </button>

          <div className="flex w-full max-w-7xl min-h-0 flex-1 items-center justify-center gap-4">
            <button type="button" onClick={() => step(-1)} className={`${sideButton} max-sm:hidden`}>
              <StepIcon direction="back" />
              <span className="sr-only">Previous</span>
            </button>

            <figure className="flex min-h-0 min-w-0 flex-1 flex-col items-center" onPointerDown={swipeDown} onPointerUp={swipeUp}>
              {/* key makes each item a fresh element, so a video starts from the beginning. */}
              {item.kind === 'image' ? (
                <img
                  key={index}
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="lightbox-media max-h-[calc(100dvh-12rem)] w-auto max-w-full rounded-card object-contain"
                />
              ) : (
                <video
                  key={index}
                  poster={item.poster}
                  width={item.width}
                  height={item.height}
                  controls
                  muted
                  loop
                  playsInline
                  autoPlay={!reduceMotion}
                  aria-label={item.alt}
                  className="lightbox-media max-h-[calc(100dvh-12rem)] w-auto max-w-full rounded-card"
                >
                  <source src={item.webm} type="video/webm" />
                  <source src={item.mp4} type="video/mp4" />
                </video>
              )}
              <figcaption className="mt-4 flex max-w-2xl items-baseline gap-4 text-meta text-ink-soft">
                <span className="shrink-0 font-semibold text-ink tabular-nums">
                  {place} / {items.length}
                </span>
                <span>{item.caption}</span>
              </figcaption>
            </figure>

            <button type="button" onClick={() => step(1)} className={`${sideButton} max-sm:hidden`}>
              <StepIcon direction="forward" />
              <span className="sr-only">Next</span>
            </button>
          </div>

          {/* On phones the step buttons sit under the picture, where a thumb reaches them. */}
          <div className="flex gap-4 sm:hidden">
            <button type="button" onClick={() => step(-1)} className={sideButton}>
              <StepIcon direction="back" />
              <span className="sr-only">Previous</span>
            </button>
            <button type="button" onClick={() => step(1)} className={sideButton}>
              <StepIcon direction="forward" />
              <span className="sr-only">Next</span>
            </button>
          </div>

          {/* Screen readers hear where they are each time the picture changes. */}
          <p aria-live="polite" className="sr-only">
            {place} of {items.length}: {item.caption}
          </p>
        </div>
      )}
    </dialog>
  )
}

export default Lightbox
