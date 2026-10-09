import { profile } from '../data/profile'
import { focusAreas } from '../data/site'
import { EmailButton } from './EmailActions'
import { Icon } from './icons'
import { outlineButton, textLink } from './linkStyles'
import ProfilePhoto from './ProfilePhoto'
import Rich from './Rich'

// The top section. Its layout uses named grid areas: on phones the photo, the
// name and the text stack in that order; from md up the name and text sit on
// the left and the photo fills the right. The name comes first in the code, so
// screen readers still start with it. Below it, three small tiles sum up what
// I do.
//
// The hero-name and hero-fade classes run the opening animation in index.css.
function Hero() {
  const [firstName, lastName] = profile.name.split(' ')

  return (
    <div id="top" className="mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6 md:pt-16 md:pb-28 lg:px-8">
      <div className="grid gap-x-12 gap-y-7 [grid-template-areas:'photo'_'name'_'text'] md:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] md:[grid-template-areas:'name_photo'_'text_photo'] lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        {/* wrap-anywhere only matters before the font arrives: a wider fallback font
            may then break the word instead of pushing the page sideways on a small phone. */}
        <h1 className="hero-name role-display self-end text-display wrap-anywhere [grid-area:name]">
          {/* The space keeps screen readers from running the two lines together. */}
          <span className="block">{firstName}</span>{' '}
          <span className="block">{lastName}</span>
        </h1>

        <div className="hero-fade self-start [grid-area:text]">
          <p className="role-title text-lead">{profile.title}</p>
          <p className="mt-4 max-w-[36rem] text-lead text-ink-soft">
            <Rich text={profile.tagline} />
          </p>
          <p className="mt-4 max-w-[34rem] text-ink-soft">
            <Rich text={profile.ask} />
          </p>

          <div className="mt-8">
            <EmailButton />
          </div>
          {/* On narrow phones the CV button takes its own line, so GitHub and LinkedIn stay together below it. */}
          <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <li className="max-sm:basis-full">
              <a href={profile.cvPath} download className={outlineButton}>
                Download CV <span className="text-meta font-normal">(PDF, {profile.cvFileSize})</span>
              </a>
            </li>
            <li>
              <a href={profile.github} className={textLink}>
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} className={textLink}>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="w-40 self-center [grid-area:photo] sm:w-48 md:w-full">
          <ProfilePhoto />
        </div>
      </div>

      {/* What I do, in three tiles. */}
      <ul className="hero-fade mt-16 grid gap-3 sm:grid-cols-3 md:mt-20">
        {focusAreas.map((area) => (
          <li key={area.label} className="card flex items-center gap-4 p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent-line">
              <Icon name={area.icon} />
            </span>
            <span className="role-title text-title">{area.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Hero
