import { profile } from '../data/profile'
import { sections } from '../data/site'
import Rich from './Rich'
import Section from './Section'

// What I'm looking for and when I'm available are in the top section, so About
// doesn't repeat them.
const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Languages', value: profile.languages },
]

// About is a paragraph beside two fact cards: on phones the cards follow the
// paragraph, from md up they sit to its right.
function About() {
  return (
    <Section id="about" title={sections.about.title} intro={sections.about.intro} tone="band">
      <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-10">
        <p className="max-w-measure text-lead text-ink-soft">
          <Rich text={profile.about} />
        </p>
        <dl className="grid gap-3">
          {facts.map((fact) => (
            <div key={fact.label} className="card p-5">
              <dt className="text-meta text-ink-soft">{fact.label}</dt>
              <dd className="role-title mt-1 text-title">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

export default About
