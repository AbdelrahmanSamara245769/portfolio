// These personal details appear across the page: in the top section, About and Contact.
// As in projects.ts, **double asterisks** mark the key words in a sentence.

export type Profile = {
  name: string
  title: string
  // This is the one sentence under the title in the top section.
  tagline: string
  // This line follows the tagline, so recruiters see what I'm looking for first.
  ask: string
  about: string
  location: string
  languages: string
  email: string
  github: string
  linkedin: string
  // This is the CV's path in the public folder, which Vite serves from the site root.
  cvPath: string
  cvFileSize: string
  // The photo also lives in the public folder; the page hides it if the file is missing.
  // photoSize is its width and height in pixels (it is square).
  photoPath: string
  photoSize: number
}

export const profile: Profile = {
  name: 'Abdelrahman Samara',
  title: 'Applied Data Science and AI Student',
  tagline:
    'I take machine learning models from **prototype to production**, with automated pipelines, testing and cloud deployment.',
  ask: 'Looking for an internship in **ML engineering, MLOps or software development**, available **18 January to June 2027**.',
  about:
    'I’m a third-year Applied Data Science and AI student at Breda University of Applied Sciences (BUas). I’ve built machine learning systems, on my own and in teams, for clients such as the **Netherlands Plant Eco-phenotyping Centre (NPEC)** and **Content Intelligence Agency**. On my most recent project, the Plant Root Analysis Platform, I led a **team of five as scrum master**.',
  location: 'Breda, Netherlands',
  languages: 'Arabic and English (fluent), Dutch (beginner, actively learning)',
  email: 'ab.samar4h@gmail.com',
  github: 'https://github.com/AbdelrahmanSamara245769',
  linkedin: 'https://www.linkedin.com/in/abdelrahman-samara/',
  cvPath: '/Abdelrahman_Samara_CV.pdf',
  cvFileSize: '53 KB',
  photoPath: '/profile.jpeg',
  photoSize: 1254,
}
