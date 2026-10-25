import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// A file's full path, from its place next to this config.
const here = (file: string) => fileURLToPath(new URL(file, import.meta.url))

// Every page starts its <head> the same way: the toolbar colours, the script
// that picks the theme before the page draws, and the icon. They live once in
// src/shared-head.html, and this plugin writes them in wherever a page's HTML
// says <!-- shared-head -->, both while developing and in the build.
function sharedHead(): Plugin {
  return {
    name: 'shared-head',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('<!-- shared-head -->', readFileSync(here('./src/shared-head.html'), 'utf8').trim()),
    },
  }
}

// Vite's options are documented at https://vite.dev/config/.
export default defineConfig({
  plugins: [sharedHead(), react(), tailwindcss()],
  build: {
    rolldownOptions: {
      // The main page, and one page per project that has one (see the projects folder).
      input: {
        main: here('./index.html'),
        'root-detection': here('./projects/root-detection.html'),
        'plant-root-analysis-platform': here('./projects/plant-root-analysis-platform.html'),
      },
    },
  },
})
