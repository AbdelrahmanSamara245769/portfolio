import { useState } from 'react'
import { profile } from '../data/profile'

// The portrait in the top section. Once the file has loaded, it is scanned in
// from top to bottom like a petri dish on the lab's scanner: the photo-loaded
// class starts the scan animation in index.css, and the empty span after the
// image is the scan line. Until then the stylesheet keeps the photo hidden,
// so it never flashes in before its scan. If the file is missing, the browser
// reports an error and the photo is left out instead of showing a broken image.
function ProfilePhoto() {
  const [isMissing, setIsMissing] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  if (isMissing) return null

  return (
    <div className="relative overflow-hidden rounded-card bg-surface shadow-[0_28px_60px_-30px_rgb(10_19_15/0.55)] ring-1 ring-ink/15">
      <img
        src={profile.photoPath}
        alt={`Photo of ${profile.name}`}
        width={profile.photoSize}
        height={profile.photoSize}
        fetchPriority="high"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsMissing(true)}
        className={`photo block aspect-square w-full object-cover ${isLoaded ? 'photo-loaded' : ''}`}
      />
      <span aria-hidden="true" className="photo-scan pointer-events-none absolute inset-0" />
    </div>
  )
}

export default ProfilePhoto
