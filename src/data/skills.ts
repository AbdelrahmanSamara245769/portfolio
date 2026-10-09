// Skills are grouped the same way as on the CV, so the two stay easy to compare.

import type { IconName } from '../components/icons'

export type SkillGroup = {
  name: string
  // The icon on the group's card, from icons.tsx.
  icon: IconName
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    name: 'Programming',
    icon: 'code',
    skills: ['Python', 'SQL', 'TypeScript and React (currently learning)'],
  },
  {
    name: 'Machine learning',
    icon: 'model',
    skills: [
      'TensorFlow/Keras',
      'scikit-learn',
      'computer vision',
      'NLP',
      'large language models',
      'reinforcement learning',
    ],
  },
  {
    name: 'Data',
    icon: 'database',
    skills: ['PostgreSQL', 'pandas', 'Power BI'],
  },
  {
    name: 'Backend, cloud and DevOps',
    icon: 'cloud',
    skills: ['FastAPI', 'Django', 'Docker', 'Azure ML', 'MLflow', 'GitHub Actions', 'CI/CD'],
  },
  {
    name: 'Ways of working',
    icon: 'team',
    skills: ['Git', 'Scrum', 'automated testing'],
  },
]
