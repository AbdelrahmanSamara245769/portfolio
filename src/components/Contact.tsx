import { profile } from '../data/profile'
import { sections } from '../data/site'
import { EmailDisplay } from './EmailActions'
import { textLink } from './linkStyles'
import Section from './Section'

// The end of the page repeats the main action once, centred and as large as the
// name at the top, with the CV and LinkedIn below it.
function Contact() {
  return (
    <Section id="contact" title={sections.contact.title} intro={sections.contact.intro}>
      <div className="flex flex-col items-center text-center">
        <EmailDisplay />
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6">
          <li>
            <a href={profile.cvPath} download className={textLink}>
              Download CV (PDF, {profile.cvFileSize})
            </a>
          </li>
          <li>
            <a href={profile.linkedin} className={textLink}>
              Connect on LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </Section>
  )
}

export default Contact
