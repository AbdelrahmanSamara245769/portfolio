import { useEffect } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Projects from './components/Projects'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import Skills from './components/Skills'

// The page, section by section. Each section spans the whole window, so its
// background tone reaches the edges, and centres its own content.
function App() {
  // A shared link such as /#contact names a section, but the browser looks for
  // it before React has drawn the page, finds nothing and stays at the top. So
  // once the page is drawn, this scrolls to the section the address names.
  useEffect(() => {
    // The section ids are plain words, so the part after # is used as it is.
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

export default App
