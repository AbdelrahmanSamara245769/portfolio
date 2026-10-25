import type { ProjectVisual } from '../data/projects'

// Screenshots and recordings fill their card to its edges, so the card has no
// padding of its own around them (see ProjectRow); everything else sits inside it.
export function fillsCard(visual: ProjectVisual) {
  return visual.type === 'image' || visual.type === 'animation'
}
