import { useEffect, useRef, useState } from 'react'
import type { AnimationVisual } from '../data/projects'
import { PauseIcon, PlayIcon } from './icons'

// A short silent recording that loops, such as a simulation run. It has a button
// to pause it, since anything that moves for more than five seconds needs one.
//
// The video only loads and plays once it comes near the window, and pauses when
// it leaves, so it costs nothing until someone scrolls to it. Until then, and
// for visitors who asked their device for less motion, the still frame shows
// (the poster), and those visitors can press Play. The button sits in the top
// corner, clear of the dish where the robot works, and above any link a card
// stretches over the recording (z-10), so it still works inside a linked card.
// fill makes the video cover the box it sits in, cropping its edges, for a
// card whose visual has a fixed shape.
function Recording({ visual, fill = false }: { visual: AnimationVisual; fill?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Whether the video should play when it is in view. The function form runs once.
  const [wantsToPlay, setWantsToPlay] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  // Whether it is actually playing, which the video itself reports.
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // play() returns a promise that fails if the browser refuses; the still then stays.
        if (entry.isIntersecting && wantsToPlay) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [wantsToPlay])

  function toggle() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      setWantsToPlay(true)
      video.play().catch(() => {})
    } else {
      setWantsToPlay(false)
      video.pause()
    }
  }

  return (
    <div className={fill ? 'absolute inset-0' : 'relative'}>
      <video
        ref={videoRef}
        poster={visual.still}
        width={visual.width}
        height={visual.height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={visual.alt}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={fill ? 'block size-full object-cover' : 'block h-auto w-full'}
      >
        {/* Browsers use the first format they can play: WebM is smaller, MP4 plays everywhere. */}
        <source src={visual.webm} type="video/webm" />
        <source src={visual.mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        className="absolute top-3 right-3 z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-surface/90 px-4 text-meta font-semibold text-ink shadow-[0_6px_16px_-8px_rgb(10_19_15/0.45)] ring-1 ring-ink/15 backdrop-blur-sm transition-[color] duration-200 hover:text-accent-text motion-reduce:transition-none print:hidden"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
        {isPlaying ? 'Pause' : 'Play'}
        <span className="sr-only"> animation</span>
      </button>
    </div>
  )
}

export default Recording
