import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// The two fonts are served from this site instead of Google Fonts: Archivo with
// its weight axis, and Source Serif 4 with its weight and optical size axes.
import '@fontsource-variable/archivo/wght.css'
import '@fontsource-variable/source-serif-4/opsz.css'
import './index.css'
import App from './App'
import ProjectPage from './components/ProjectPage'

// The ! tells TypeScript this element is never null, because every HTML page contains <div id="root">.
const root = document.getElementById('root')!
// A project's own page names its project in data-project (see the projects
// folder); the main page has none, so it shows the whole portfolio.
const projectId = root.dataset.project

createRoot(root).render(<StrictMode>{projectId ? <ProjectPage id={projectId} /> : <App />}</StrictMode>)
