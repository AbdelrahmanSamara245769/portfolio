import { useEffect, useState } from 'react'

// Reports which section is in the middle of the window, so the navigation can
// mark its link as the current one. An IntersectionObserver watches a thin
// band across the middle of the window; whichever section crosses it is active.
// Over the top section or the footer no section crosses it, so no link is.
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  // ids is a list, so join it into one string for the effect to compare.
  const key = ids.join(' ')

  useEffect(() => {
    const sections = key
      .split(' ')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    // The ids of the sections in the band right now.
    const crossing = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id)
          else crossing.delete(entry.target.id)
        }
        // ?? null turns "none found" (undefined) into null, meaning no section.
        setActive(sections.find((section) => crossing.has(section.id))?.id ?? null)
      },
      // Shrink the watched area to a band from 45% to 55% of the window height.
      { rootMargin: '-45% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [key])

  return active
}
