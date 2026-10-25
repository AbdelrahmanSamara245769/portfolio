import type { CSSProperties } from 'react'
import { clientLogos } from '../data/projects'

// A client's logo, small and in one colour beside the client's name. The logo
// file is used as a mask: its shape lets the current text colour show through
// (bg-current), so it follows the theme like the text next to it, and every
// logo sits at the same height (1.15 times the text size) whatever its width.
//
// The client's name is written right after it, so screen readers skip the logo.
// In Windows high-contrast mode it takes the system text colour, and when
// printing its colour is kept on paper.
function ClientLogo({ client }: { client: string }) {
  const logo = clientLogos[client]
  if (!logo) return null

  const mask = `url("${logo.src}") center / contain no-repeat`
  const style: CSSProperties = {
    aspectRatio: `${logo.width} / ${logo.height}`,
    mask,
    WebkitMask: mask,
    printColorAdjust: 'exact',
  }

  return <span aria-hidden="true" style={style} className="inline-block h-[1.15em] shrink-0 bg-current forced-colors:bg-[CanvasText]" />
}

export default ClientLogo
