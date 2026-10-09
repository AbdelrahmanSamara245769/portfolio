// The charts and diagrams pass their position in a sequence to the stylesheet as
// CSS custom properties, such as style={{ '--i': 2 }}, and index.css reads them
// to stagger the animation. React's style type doesn't know these names, so this
// file adds them. TypeScript then still checks every other style property for
// typos, which a cast like "as CSSProperties" would switch off.
import 'react'

declare module 'react' {
  interface CSSProperties {
    // A part's place in its animation sequence (0 for the first).
    '--i'?: number
    // A chip's place within its skill group.
    '--c'?: number
    // A dish's place in the test-dishes diagram.
    '--d'?: number
  }
}
