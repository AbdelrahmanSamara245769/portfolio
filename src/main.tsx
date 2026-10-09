import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// The two fonts are served from this site instead of Google Fonts: Archivo with
// its weight axis, and Source Serif 4 with its weight and optical size axes.
import '@fontsource-variable/archivo/wght.css'
import '@fontsource-variable/source-serif-4/opsz.css'
import './index.css'
import App from './App'

// The ! tells TypeScript this element is never null, because index.html always contains <div id="root">.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
