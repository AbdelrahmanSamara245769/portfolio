// Page text that isn't about one project: the three tiles under the top
// section, and each section's heading and one-line intro.
import type { IconName } from '../components/icons'

// What I do, in two or three words each, with an icon from icons.tsx.
export const focusAreas: { label: string; icon: IconName }[] = [
  { label: 'Machine learning models', icon: 'model' },
  { label: 'Automated pipelines', icon: 'pipeline' },
  { label: 'Cloud deployment', icon: 'cloud' },
]

// Every section opens with its heading, centred, and one short sentence.
export const sections = {
  about: {
    title: 'About',
    intro: 'Where I study, who I’ve built for and what I’m looking for next.',
  },
  projects: {
    title: 'Projects',
    intro: 'Client and individual work, from a solo prototype to a model running in production.',
  },
  skills: {
    title: 'Skills',
    intro: 'The tools I’ve used across my projects, grouped by area.',
  },
  contact: {
    title: 'Contact',
    intro: 'Available from **18 January 2027 to June 2027**; email is the quickest way to reach me.',
  },
}
