import type { GalleryItem } from '../data/projects'
import { PlayIcon } from './icons'

type GalleryProps = {
  items: GalleryItem[]
  // The first item's place in the whole set, so the larger view opens on it.
  firstIndex: number
  onOpen: (index: number) => void
}

// A project page's gallery: each picture keeps its own shape, and the pictures
// in a row share one height, so none is cut. Each item grows from a width
// proportional to its shape (flex-basis), and grows by the same proportion
// (flex-grow), so a row fills the width and its pictures end up equally tall.
// The 12rem in the width is a row's starting height: on a wide screen three
// pictures fit one row; on a narrower one they wrap, and a picture alone on a
// row spans it.
//
// Each picture is a button that opens the larger view; the caption sits under it.
function Gallery({ items, firstIndex, onOpen }: GalleryProps) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-8">
      {items.map((item, offset) => {
        const ratio = item.width / item.height
        const thumbnail = item.kind === 'image' ? item.src : item.poster

        return (
          <li key={thumbnail} style={{ flex: `${ratio} 1 ${ratio * 12}rem` }}>
            <figure>
              <button
                type="button"
                onClick={() => onOpen(firstIndex + offset)}
                className="group relative block w-full overflow-hidden rounded-card bg-surface ring-1 ring-ink/10"
              >
                <img
                  src={thumbnail}
                  alt=""
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] motion-reduce:transition-none"
                />
                {item.kind === 'video' && (
                  <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
                    <span className="grid size-14 place-items-center rounded-full bg-surface/90 text-ink shadow-[0_6px_16px_-8px_rgb(10_19_15/0.45)] ring-1 ring-ink/15">
                      <PlayIcon />
                    </span>
                  </span>
                )}
                <span className="sr-only">
                  {item.kind === 'video' ? 'Play video larger: ' : 'View larger: '}
                  {item.alt}
                </span>
              </button>
              <figcaption className="mt-3 max-w-[28rem] text-meta text-ink-soft">{item.caption}</figcaption>
            </figure>
          </li>
        )
      })}
    </ul>
  )
}

export default Gallery
