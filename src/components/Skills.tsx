import { sections } from '../data/site'
import { skillGroups } from '../data/skills'
import { revealState, useInView } from '../lib/useInView'
import { Icon } from './icons'
import Section from './Section'

// One card per skill group, with its icon, its name and its tools as tags.
// From lg up the grid has six columns: the first three cards take two each and
// the last two take three each, so both rows fill the width evenly. When the
// grid scrolls into view, each card's tags slide in one after another
// (--i is the card, --c the tag).
function Skills() {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <Section id="skills" title={sections.skills.title} intro={sections.skills.intro} tone="band">
      <div ref={ref} data-reveal={revealState(inView)} className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {skillGroups.map((group, index) => (
          <div
            key={group.name}
            style={{ '--i': index }}
            className={`card p-6 ${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${index === skillGroups.length - 1 ? 'md:col-span-2 lg:col-span-3' : ''}`}
          >
            <span className="grid size-11 place-items-center rounded-xl bg-accent-tint text-accent-line">
              <Icon name={group.icon} />
            </span>
            <h3 className="role-title mt-4 text-title">{group.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill, skillIndex) => (
                <li
                  key={skill}
                  style={{ '--c': skillIndex }}
                  className="reveal-chip rounded-full bg-ink/[0.06] px-3 py-1 text-meta font-medium"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Skills
