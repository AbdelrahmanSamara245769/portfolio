# Abdelrahman Samara’s portfolio

![React 19](https://img.shields.io/badge/React-19-1e3a2f?logo=react&logoColor=white)
![TypeScript 6](https://img.shields.io/badge/TypeScript-6-1e3a2f?logo=typescript&logoColor=white)
![Vite 8](https://img.shields.io/badge/Vite-8-1e3a2f?logo=vite&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-1e3a2f?logo=tailwindcss&logoColor=white)

![The top of the portfolio: my name in a large serif typeface, my title, a one-sentence intro with "prototype to production" in bold, the internship I'm looking for, my email address with a Copy button, and my photo](docs/preview.png)

My one-page portfolio as an Applied Data Science and AI student. It shows what I build, from root detection and robot control to an NLP pipeline and MLOps on Azure, and makes it easy to email me.

**Live site:** [abdelrahman-samara.vercel.app](https://abdelrahman-samara.vercel.app)

## The idea

The page is built for recruiters and engineers who skim. The top section says who I am, what internship I'm looking for and when, and puts my email address first, with a Copy button for anyone without a mail app. Every section opens with a centred heading and one short sentence, and every project leads with evidence: its title, then its key result as a short highlighted line (with the number first where there is one), and a visual of real work. That visual is a screenshot or recording of the real work, such as the deployed platform app or the simulated robot inoculating root tips, or a diagram of how the project works, where filled nodes mark the parts I built and outlined nodes the team's. A client's logo is never the visual: it appears small, in one colour, beside the client's name.

The projects open with one story: my solo root detection prototype for NPEC and the platform that took it to production, as two large cards joined by a small arrow. Each card opens the project's own page, with the problem, what I built, how it works, the results and a gallery that opens a larger view. The other main projects follow as rows with a Read more button, then the smaller projects as an even grid of cards. The skills sit in one card per area.

In the summaries, results and What I built lists, the key words are bold and darker than the rest, so a skimming reader picks them out first.

### Motion

The page has one main moment: when it opens, my photo is scanned in from top to bottom like a petri dish on a lab scanner, and my name inks in. After that, lines move the way data flows: charts grow from their baseline and diagrams draw from step to step the first time they scroll into view, the skill tags slide into their cards, and the arrow between the two NPEC projects draws itself. The recording of the robot inoculating root tips loops while it is in view, with a Pause button. Visitors who turn on reduced motion in their system settings see the finished page straight away, with nothing moving: the robot recording starts on its last frame, with a Play button.

### Colours and themes

The page has a light and a dark theme. It follows the visitor's device setting, and the switch in the header changes it (the choice is remembered). To compare the two side by side, open the site with `?theme=light` and `?theme=dark` at the end of the address.

The colours come from a plant lab, after my plant root projects. They are named for their job rather than their shade, because each theme fills them in differently:

| Token | Light theme | Dark theme | Used for |
| --- | --- | --- | --- |
| `page` | `#e5ece4` sage, like agar under lab light | `#0a130f` near-black green, like a scanner bed | The page background |
| `band` | `#dde5dd` | `#111b16` | The slightly different tone every other section sits on |
| `surface` | `#f2f6f1` | `#18271f` | Cards, always a little lighter than what is behind them |
| `ink` | `#1e3a2f` moss | `#e5ece4` sage | Text, outlines and the emphasised bar in charts |
| `ink-soft` | `#4d5c55` lichen | `#b6c4ba` | Body text, labels and captions |
| `accent` | `#b0234f` safranin | `#c4345f` | Buttons such as Email me, after the red stain used on plant tissue |
| `accent-hover` | `#8e1b40` | `#a92a52` | A red button when pointed at |
| `accent-line` | `#b0234f` | `#de5279` | Icons, focus outlines, and the underline of a link you point at |
| `accent-tint` | safranin at 10% | `#de5279` at 14% | The squares behind icons, and the current section in the navigation |
| `accent-text` | `#b0234f` | `#e5ece4` (the ink) | Red text, such as a link you point at |
| `bar-muted` | `#6b7d71` fern | `#6f8a7b` | The other bars in charts |

Text needs more contrast than a line, and on a dark page a red light enough for text turns pink. So the dark theme keeps red for icons and outlines (`accent-line`) and lets text stay in the ink colour (`accent-text`); a link you point at then shows a red underline instead of red text.

Red appears only on buttons, active states, icons and links; the charts and diagrams are drawn in the ink colour. Behind the page, soft pools of lighter green drift slowly as you scroll, like light reflecting on glass, so the background is never one flat colour.

Two typefaces, both served from this site rather than Google Fonts: [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) for my name, the section headings and the project titles, and [Archivo](https://fonts.google.com/specimen/Archivo) for everything else. Source Serif 4 has optical sizes, so its letters get finer as they get larger, and a weight axis, so the name can ink in from thin to its full weight. The big size steps grow by about 1.414 from the 18px body text (36px project titles, 51px section headings), so headings, titles and text never look alike. Every text colour passes WCAG AA contrast in both themes, and body text stays under about 70 characters a line.

## Run it locally

You need [Node.js](https://nodejs.org/) 22.12 or newer (any current LTS release works).

```bash
npm install       # install the packages listed in package.json
npm run dev       # live preview at http://localhost:5173, refreshes when you save
npm run build     # type-check, then build the finished site into dist/
npm run preview   # serve the finished build locally
npm run lint      # check the code for common mistakes with Oxlint
```

## Change the content

Almost all the text lives in `src/data`, so you rarely need to touch the layout to update the page.

| File | What it holds |
| --- | --- |
| `src/data/projects.ts` | Every project, in page order: its text, key result and visual, and the types that describe them |
| `src/data/profile.ts` | Name, title, intro, the internship I'm looking for, About, email, links, and the photo's path and size |
| `src/data/skills.ts` | Skill groups, matching the CV, each with its icon |
| `src/data/site.ts` | The sentence under each section heading, and the three tiles under the top section |
| `src/data/glossary.ts` | The plain-language explanation for each marked technical term |
| `index.html` | The browser tab title, the search and link-preview descriptions, and a short message for visitors without JavaScript that repeats the email and the CV link |

Projects come in two kinds. A main project has `kind: 'main'` and a `details` object for its Read more panel. A smaller one has `kind: 'small'`, a short `summary`, and optional `more` text that sits behind its Read more button. Every project has a `keyResult`, a `visual` and `categories` (the areas it belongs to, shown as tags: `'ml'`, `'data'` or `'software'`), and a `codeUrl` adds a View code link. Keep the key result short and put the number first where there is one, marked as a key word, like `'**15 of 15** root tips within 1 mm'`; the number then shows in the heaviest weight. TypeScript checks every entry when you run `npm run build`, so a missing field, or a typo in a field name, stops the build with a message pointing at the line.

To make words stand out as key words, put double asterisks around them, as in Markdown: `'I trained the **clustering model**'`. Mark results and the parts I built, not the team's.

To give a technical term a plain-language explanation, put it in double square brackets, like `'set up [[CI/CD]]'`, and add the explanation to `src/data/glossary.ts` under the same name. The term then gets a dotted underline, and tapping it, pointing at it or tabbing to it shows the explanation. Screen readers hear it as the term's description.

A visual's `caption` is optional: leave it out when the visual explains itself. Each project's skills are listed inside its Read more panel.

`npecStory` at the top of `projects.ts` joins the two NPEC projects into one story: it names the prototype and the production project by their ids, and holds the sentence the prototype's page ends on. If an id doesn't match, the page simply shows both projects on their own.

A client's logo shows small beside the client's name. Add the file to `public/logos/` (an SVG, or a PNG with a transparent background, since only its shape is used) and add it to `clientLogos` at the top of `projects.ts`, under the client's name exactly as the projects write it.

To add a smaller project, copy an existing `kind: 'small'` entry in `projects.ts` and change its text:

```ts
{
  kind: 'small',
  id: 'my-new-project', // The id is used in the page's HTML ids, so keep it lowercase with dashes.
  title: 'My new project',
  summary: 'Two or three sentences about what I built and how, with **key words** marked.',
  more: 'Any further detail, shown when the visitor presses Read more.',
  period: 'March to May 2027',
  skills: ['Python', 'scikit-learn'],
  keyResult: '**3** results to remember, number first',
  codeUrl: 'https://github.com/AbdelrahmanSamara245769/my-new-project',
  categories: ['ml'],
  visual: {
    type: 'flow',
    caption: 'How it works.',
    steps: [
      { label: 'First step', mine: true },
      { label: 'Second step', mine: true },
    ],
  },
},
```

A visual can be one of five types:

- **`image`:** a screenshot. Put the file in `public/projects/`, set `src` to its path (for example `/projects/my-screenshot.webp`), and give its real `width` and `height` in pixels plus an `alt` text that says what it shows.
- **`animation`:** a short silent recording that loops, as a WebM and an MP4 video in `public/projects/`. Set `webm`, `mp4`, a `still` image of one frame (shown until the video loads, and instead of it for visitors who asked for less motion), the video's `width` and `height`, and an `alt` text. It only loads once it is near the window, and pauses when it leaves.
- **`bars`:** a small bar chart of real results, drawn as a table so screen readers can read it.
- **`flow`:** steps from start to finish. Set `mine: false` on teammates' steps and a legend appears.
- **`branches`:** one starting point that splits into parallel questions.

A main project can also have a page of its own. Give it a `page` with a `slug` (the address after `/projects/`) and a `gallery`: a list of pictures (`kind: 'image'`) and videos (`kind: 'video'`), each with its file, `alt` text, real `width` and `height`, and a `caption`. The first item leads the page; the rest form the gallery near its end. Then:

1. Copy one of the files in the `projects` folder (for example `projects/root-detection.html`), name it after the slug, and change its title, descriptions, address and `data-project` (the project's `id`).
2. Add the new file to `input` in `vite.config.ts`, so the build makes the page.

The project then shows as a large card that opens its page, instead of a row with Read more. The page's address works when it is opened directly or reloaded, because each page is a real HTML file (on Vercel, `cleanUrls` in `vercel.json` serves `/projects/x` from `x.html`).

To change the photo, save it as `public/profile.jpeg`, or point `photoPath` in `profile.ts` at another file in `public/` and set `photoSize` to its width in pixels (the photo is shown square). If the file is missing, the page simply leaves the photo out.

To replace the CV, save the new PDF as `public/Abdelrahman_Samara_CV.pdf` and update `cvFileSize` in `profile.ts`. If you rename the file, also change `cvPath` in `profile.ts`, the `source` in `vercel.json` and the CV link in `index.html`. If you change your email, change it in both `profile.ts` and `index.html`.

## How the code is organised

```
index.html                  the main page; React draws into <div id="root">
projects/                   one HTML page per project page; data-project names the project
public/                     files served as they are: the CV, the photo, the favicon,
                            project screenshots and recordings (projects/), client
                            logos (logos/), the link-preview image and the 404 page
docs/preview.png            the screenshot at the top of this README
src/
  main.tsx                  starting point: loads the fonts and styles, renders <App />,
                            or a project's page when the HTML names one
  shared-head.html          the start of every page's <head>: theme script, toolbar colours, icon
  App.tsx                   the page layout, section by section
  index.css                 Tailwind, the colour tokens for both themes, the type sizes and all the motion
  data/                     the project, profile and skills text (see above)
  lib/text.ts               keeps numbers with their units, and names like Grad-CAM, on one line
  lib/useInView.ts          a custom hook that tells a chart when it has scrolled into view
  lib/visuals.ts            which visuals fill their card to its edges
  lib/useActiveSection.ts   a custom hook that tells the navigation which section you are reading
  css-variables.d.ts        tells TypeScript about the --i, --c and --d style values the animations use
  components/
    SiteHeader.tsx          the floating navigation: skip link, section links, theme switch,
                            Email me, and a menu on phones
    ThemeToggle.tsx         the light and dark switch, with its circle transition
    Hero.tsx                name, title, intro, the email actions, the CV and profile links,
                            and the three tiles
    EmailActions.tsx        EmailButton (top) and EmailDisplay (Contact), sharing a useCopyEmail hook
    ProfilePhoto.tsx        the photo and its scan-in, left out if the file is missing
    Rich.tsx                shows **key words** in bold, and [[terms]] with their explanation
    Term.tsx                a term with a dotted underline that explains itself when tapped
    About.tsx               the About paragraph and facts
    Section.tsx             shared section frame: its tone, centred heading and intro
    Projects.tsx            the NPEC story, the other rows and the cards
    ProjectStory.tsx        the two NPEC cards and the arrow between them
    FeatureCard.tsx         a project with its own page, as a large card that opens it
    ProjectRow.tsx          a main project as one row, its visual on the left or right
    ProjectCard.tsx         a smaller project as a card in the grid
    KeyResult.tsx           a project's highlighted key result
    ReadMore.tsx            the Read more button and the panel it unfolds
    CodeLink.tsx            the View code link to a project's repository
    ProjectVisual.tsx       picks the right visual: image, animation, chart or diagram
    Recording.tsx           the looping recording and its Pause and Play button
    ClientLogo.tsx          a client's logo, small and in one colour, beside its name
    ProjectPage.tsx         a project's own page: header, sections, gallery, links on
    Gallery.tsx             the page's gallery, each picture at its own shape
    Lightbox.tsx            the larger view: arrow keys, swipe, Escape and focus handled
    BarChart.tsx, FlowDiagram.tsx, BranchDiagram.tsx
    PipelineSteps.tsx       the "How it works" steps, in Read more and on project pages
    ProjectFacts.tsx, Fact.tsx, InlineList.tsx
    Skills.tsx, Contact.tsx, SiteFooter.tsx, icons.tsx, linkStyles.ts
vercel.json                 serves project pages at clean addresses, and asks search
                            engines not to index the CV PDF
```

## Deploy to Vercel

1. Create an empty repository on GitHub and push this folder to it:
   ```bash
   git add .
   git commit -m "First version of the portfolio"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the repository.
3. Vercel detects Vite and fills in the settings (build command `npm run build`, output folder `dist`). Click **Deploy**.
4. Once you know the site's address, put it in the `og:url` and `og:image` lines in `index.html` and push again. Links shared on LinkedIn then show `public/og-image.png` as their preview. This site's lines already name https://abdelrahman-samara.vercel.app.

Every later push to `main` deploys the site again automatically. Any address that doesn't exist shows `public/404.html`, with a link back to the portfolio.

`vercel.json` sends an `X-Robots-Tag: noindex` header with the CV PDF. Visitors can still download it, but search engines won't list it. The CV on the site leaves out my phone number.

## Accessibility

- One `h1`, then `h2` sections, `h3` projects and `h4` parts, in order.
- A skip link, and a visible red focus outline on every link and button, in both themes.
- The Read more buttons tell screen readers whether their panel is open (`aria-expanded`). A closed panel is `inert`, so keyboards and screen readers skip it.
- The theme switch tells screen readers whether dark theme is on (`aria-pressed`).
- The Copy button says "Copied" and announces it to screen readers; if copying fails, it says so on screen.
- Screen readers get each chart's numbers as a real table, and diagrams say "my part" or "the team's part" after each step.
- All motion respects the reduced motion setting: with it on, the page appears finished and nothing moves. Printing shows the finished page in the light colours, with every Read more panel open.
- In Windows high-contrast mode, the chart bars, diagram lines and nodes switch to system colours, so they stay visible and filled and outlined nodes still differ.
- Links that point at a section, such as `/#contact`, open at that section.
- Checked with axe-core at 320, 390, 768, 1024 and 1440 px wide in both themes, with and without the panels open.

The images that ship with the site record where they come from: the photo, the two preview images and the NPEC logo inside the file, and the project images and videos in a `.json` file beside each one. The robot recording is a re-render of my own simulation run, and the app screenshot joins two screenshots of the same page. The gallery images are my own notebook figures and screenshots, cropped, with internal names and the platform's scores blurred. The impeccable skill's `embed-prompt --read <image>` shows it. The client logos come from each client's own website, and the project images from my own project repositories.
