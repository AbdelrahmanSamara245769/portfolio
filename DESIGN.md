---
name: Abdelrahman Samara portfolio
description: A one-page portfolio set as a plant lab, sage agar or a dark scanner bed, with a serif for names and titles and safranin red only on buttons, active states, icons and links.
colors:
  sage-agar: "#e5ece4"
  agar-band: "#dde5dd"
  agar-surface: "#f2f6f1"
  moss-ink: "#1e3a2f"
  lichen-ink: "#4d5c55"
  safranin: "#b0234f"
  safranin-deep: "#8e1b40"
  safranin-tint: "rgb(176 35 79 / 0.1)"
  fern-muted: "#6b7d71"
  on-safranin: "#ffffff"
  scanner-bed: "#0a130f"
  scanner-band: "#111b16"
  scanner-surface: "#18271f"
  dark-ink-soft: "#b6c4ba"
  dark-safranin: "#c4345f"
  dark-safranin-hover: "#a92a52"
  dark-safranin-line: "#de5279"
  dark-safranin-tint: "rgb(222 82 121 / 0.14)"
  dark-fern-muted: "#6f8a7b"
  dark-reflection-pool-high: "rgb(120 170 140 / 0.22)"
  dark-reflection-pool-right: "rgb(96 150 118 / 0.18)"
  dark-reflection-pool-low: "rgb(80 135 104 / 0.16)"
typography:
  display:
    fontFamily: "Source Serif 4 Variable, ui-serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 0.8rem + 8vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  email:
    fontFamily: "Source Serif 4 Variable, ui-serif, Georgia, serif"
    fontSize: "clamp(1.5rem, 0.3rem + 6.4vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  section:
    fontFamily: "Source Serif 4 Variable, ui-serif, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.5rem + 2.4vw, 3.1875rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  project:
    fontFamily: "Source Serif 4 Variable, ui-serif, Georgia, serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.1vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  card:
    fontFamily: "Source Serif 4 Variable, ui-serif, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  key-result:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.65
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body-phone:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.3
  meta:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  bar: "4px"
  mark: "6px"
  icon-tile: "12px"
  card: "20px"
  full: "9999px"
spacing:
  tag-gap: "6px"
  chip-gap: "8px"
  card-gap: "20px"
  card-padding: "24px"
  row-gap: "48px"
  heading-to-content: "56px"
  heading-to-content-wide: "80px"
  section: "96px"
  section-wide: "128px"
  measure: "33rem"
components:
  button-email:
    backgroundColor: "{colors.safranin}"
    textColor: "{colors.on-safranin}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "48px"
  button-email-hover:
    backgroundColor: "{colors.safranin-deep}"
  button-outline:
    textColor: "{colors.moss-ink}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.moss-ink}"
    textColor: "{colors.sage-agar}"
  filter-button:
    backgroundColor: "{colors.agar-surface}"
    textColor: "{colors.moss-ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "44px"
  filter-button-active:
    backgroundColor: "{colors.safranin}"
    textColor: "{colors.on-safranin}"
  nav-link-active:
    backgroundColor: "{colors.safranin-tint}"
    textColor: "{colors.safranin}"
    rounded: "{rounded.full}"
  tag:
    textColor: "{colors.moss-ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  card:
    backgroundColor: "{colors.agar-surface}"
    rounded: "{rounded.card}"
    padding: "24px"
  icon-tile:
    backgroundColor: "{colors.safranin-tint}"
    textColor: "{colors.safranin}"
    rounded: "{rounded.icon-tile}"
    size: "44px"
---

# Design System: Abdelrahman Samara portfolio

## Overview

**Creative North Star: "The Plant Lab Bench"**

The page is set like the lab the best project came from. In the light theme it is agar under lab light: a sage page with soft white pools of light and moss-green ink. In the dark theme it is a scanner bed: near-black green with lighter green reflections and a fine grain, and sage ink. Both keep safranin, the red stain used on plant tissue, as the one accent, and it only marks things you can press or that show where you are.

Names and titles are set in a serif, Source Serif 4; everything you read is in Archivo. Each project opens with its serif title, then one short highlighted key result, then a sentence or two, with the rest behind Read more or on the project's own page. Key words are bold in full ink, so a skimmer can read only those and still get the story.

The page is built from a few repeated pieces: a floating pill navigation, sections that each open with a centred heading and one intro sentence, and cards that are a little lighter than what sits behind them. Tokens live in `src/index.css`; the shared link and button classes in `src/components/linkStyles.ts`. Components use token class names (`text-ink`, `bg-accent`, `text-project`, `rounded-card`) and never raw colours.

**Key Characteristics:**
- Two themes from one set of colour names, switched by `data-theme` on `<html>`. The visitor's device setting decides by default; the switch overrides it and is remembered.
- Safranin only on buttons, active states, icons and links. Charts and diagrams are drawn in ink.
- Serif for the name, section headings, project titles and the closing email; Archivo for reading and small bold labels.
- Sections alternate between the page tone and the slightly darker band tone.
- Short text everywhere; detail lives behind Read more or on a project page, jargon behind a tap-or-hover explanation.

## Colors

A low-saturation green world (OKLCH hue about 140 to 167) with one saturated red (hue about 7 to 9). Colours are named for their job, not their shade, and each theme fills the same names. The names are declared once in `@theme inline` and filled on `:root` (light) and `[data-theme="dark"]` (dark). A print block at the end forces light colours on white paper.

| Name in code | Job | Light | Dark |
|---|---|---|---|
| `page` | page background, every other section | sage-agar | scanner-bed |
| `band` | the alternate section tone (About, Skills) | agar-band | scanner-band |
| `surface` | cards, the nav pill, image backing | agar-surface | scanner-surface |
| `ink` | headings, key words, diagram marks, emphasis bars | moss-ink | sage-agar |
| `ink-soft` | body text, intros, captions, fact labels | lichen-ink | dark-ink-soft |
| `accent` | Email buttons, the active filter, text selection | safranin | dark-safranin |
| `accent-hover` | hover on accent fills (always darker) | safranin-deep | dark-safranin-hover |
| `accent-line` | focus outlines, icons | safranin | dark-safranin-line |
| `accent-text` | link text when pointed at, active nav link | safranin | sage-agar (same as ink) |
| `accent-tint` | behind icons and the active nav link | safranin-tint | dark-safranin-tint |
| `on-accent` | text on accent fills | white | white |
| `bar-muted` | context bars in charts | fern-muted | dark-fern-muted |

### Primary
- **Safranin** (safranin; dark-safranin in dark): the plant stain. Fills the Email buttons and the active filter. Its hover is always darker, so white text keeps its contrast.

### Neutral
- **Sage Agar** (sage-agar): the light page, and the ink colour in dark.
- **Agar Band** (agar-band): the light alternate section tone, a shade below the page.
- **Agar Surface** (agar-surface): light cards, a shade above both page and band.
- **Moss Ink** and **Lichen Ink**: strong and soft text in light.
- **Scanner Bed**, **Scanner Band**, **Scanner Surface**: the dark page, band and cards, near-black green, never pure black.
- **Fern Muted**: the context bar next to an ink emphasis bar.

### Named Rules
**The Accent Jobs Rule.** Red appears only on buttons, active states, icons and links. Diagram marks, chart bars, steps and client logos are ink (a logo takes the text colour beside it). Red has named jobs: `accent` fills, `accent-line` draws focus outlines and icons, `accent-text` colours text, `accent-tint` sits behind icons and the active link. On a dark ground `accent-text` is the ink colour, because a red light enough to read as text turns pink there.

**The Lighter Card Rule.** A card is always a little lighter than what is behind it: `surface` is lighter than both `page` and `band` in both themes, so a card reads as a card on either section tone.

**The Contrast Pairs Rule.** New colour values must pass these pairs, measured on the shipped values. Text: ink at least 9:1 on page, band and surface (light 10.3, 9.6, 11.3; dark 15.7, 14.6, 12.9); ink-soft at least 4.5:1 on all three (light 5.9, 5.5, 6.5; dark 10.4, 9.7, 8.6); white on accent and accent-hover at least 4.5:1 (light 6.6 and 8.8; dark 5.2 and 6.7). Lines and icons at least 3:1: accent-line (light 5.1 to 6.0; dark 4.1 to 5.0) and bar-muted (light 3.4 to 4.0; dark 4.1 to 5.0).

**The No Flat Page Rule.** The page is never one flat colour. `--reflection` paints faint light pools on a fixed layer behind everything (`body::before`): white at 0.5 to 0.65 opacity and one moss shadow at 0.07 in light; green at 0.16 to 0.22 plus a grain and a faint sheen in dark. New pools reuse these tints.

## Typography

**Display Font:** Source Serif 4 Variable (with ui-serif, Georgia, serif), from `@fontsource-variable/source-serif-4/opsz.css`, which loads both the weight and optical-size axes.
**Body Font:** Archivo Variable (with ui-sans-serif, system-ui, sans-serif), from `@fontsource-variable/archivo/wght.css`, weight axis only.

**Character:** a bookish serif at weight 600 for things with names, set slightly tight at large sizes; an even, open Archivo for reading. The owner chose this pairing (option C of three) on 2026-10-09.

Each kind of text has a role. Sizes are `--text-*` tokens used as classes (`text-section`, `text-project`); the font and weight come from the role classes in `src/index.css`: `.role-display` (serif, 600, -0.02em), `.role-heading` (serif, 600, -0.01em) and `.role-title` (Archivo, 700). The big steps grow by about 1.414 from the 18px body (18, 36, 51), so neighbouring roles never look alike.

### Hierarchy
- **Display** (serif 600, clamp 2.75rem to 6rem, line-height 0.95): the name only, first and last name on two lines.
- **Email** (serif 600, clamp 1.5rem to 4rem): the address that closes the page, centred in Contact.
- **Section** (serif 600, clamp 2.25rem to 3.19rem): the centred heading that opens each section; also a project page's title, set left in `role-display`.
- **Project** (serif 600, clamp 1.75rem to 2.25rem): a main project's title, the largest text in its row or card; also the "Other individual projects" heading and the section headings on a project page (The problem, What I built, How it works, Results, Gallery).
- **Card** (serif 600, 1.375rem): a smaller project's title, the largest text on its card; also the link to the other NPEC page at the foot of a project page.
- **Lead** (Archivo 400, 1.25rem): section intros, the hero statement, the About paragraph.
- **Key result** (Archivo 600, lead size in rows, the NPEC cards and project pages, body size on the smaller cards): see The Key Result Rule.
- **Body** (Archivo 400, 1.125rem from 48rem up, 1.0625rem on phones, line-height 1.6): summaries and Read more text, in ink-soft. Card summaries use 1rem.
- **Title** (Archivo 700, 1.0625rem): small bold labels: the hero tiles, skill group names, About's fact values, the job title (at lead size).
- **Meta** (Archivo 400, 0.875rem): facts, tags, captions, nav links, filter buttons, Read more.

### Named Rules
**The Key Result Rule.** Every project reads title, then key result, then description. The key result is one short line with a soft ink highlighter behind it (`.key-result-mark`, ink at 8%, wrapping line by line); its number is marked `**bold**` in `src/data/projects.ts` and rendered at weight 800, the heaviest text in the project. The title stays larger than the key result.

**The Key Word Rule.** Mark key words in the data files with `**double asterisks**`; `Rich.tsx` renders them bold in full ink while the sentence stays ink-soft. A few words per sentence, never a whole sentence.

**The Readable Text Rule.** Strong contrast, body text left-aligned, lines at most about 70 characters (`max-w-measure`, 33rem). Only section headings, intros and Contact are centred. Headings use `text-wrap: balance` and paragraphs `text-wrap: pretty`; `keepTogether()` in `src/lib/text.ts` glues numbers to units and keeps names whole. Headings never break one word per line on phones: the display and section sizes shrink with the window down to 320px.

**The Glossary Rule.** Technical terms are written `[[term]]` in the data files and explained in plain language from `src/data/glossary.ts`. `Term.tsx` shows the explanation in a small ink bubble on tap, hover or keyboard focus, and screen readers always hear it.

## Layout

One centred column, max 72rem (`max-w-6xl`), with 16px side padding on phones, 24px from sm, 32px from lg.

Every section is built by `Section.tsx`: a full-width background (page or band, alternating: Hero page, About band, Projects page, Skills band, Contact page), then a centred heading and one intro sentence (texts in `src/data/site.ts`), then a 56px gap (80px from md) before the content. Sections are 96px top and bottom (128px from md).

- **Hero:** a named-area grid: photo, name, text stacked on phones; name and text left, photo right from md. Below it, three icon tiles in a row from sm.
- **About:** the paragraph beside two fact cards from md.
- **Projects:** three parts under centred filter buttons (All, ML engineering, Data, Software), 112px apart (144px from md).
  - The two NPEC projects, Root Detection (prototype) then the Platform (production), are two large linked cards (`FeatureCard.tsx`) in an ordered list (`ProjectStory.tsx`): side by side from lg, stacked below. Between them sits a small circular arrow with "Prototype to production", pointing down while the cards stack and right from lg. If a filter hides one of the two, the other stands alone.
  - The other main projects (the Emotion pipeline, the AI Stock Market Chatbot) are rows on a 12-column grid, the visual in a card on one half and the text on the other, sides alternating, with Read more (`ProjectRow.tsx`); on phones the visual comes first.
  - Smaller projects are an even card grid (2 columns from md, 3 from lg) that uses CSS subgrid, so visuals, titles and buttons line up across a row (`ProjectCard.tsx`).
- **Project pages:** `/projects/root-detection` and `/projects/plant-root-analysis-platform`, one HTML file each in `projects/` with its own title and meta. The file's `#root` carries `data-project`, and `src/main.tsx` then shows `ProjectPage.tsx` instead of the one-page site. `vite.config.ts` builds each file as its own page and writes the shared `<head>` lines from `src/shared-head.html` into every one; `cleanUrls` in `vercel.json` drops the `.html`. Top to bottom, in the same 72rem column: the nav pill, an "All projects" back link to `/#projects`; a header (title, key result, summary and tags in 8 of 12 columns on lg, with the facts as label-over-value pairs, client logo, skills and a View code outline button in the right 4); the lead visual; sections whose heading sits in the left third on lg and whose text stays within 42rem (The problem, What I built with a "What the team built" subheading, How it works, Results); the Gallery; and a "More projects" nav above a hairline (All projects, and the other NPEC page, with the story sentence on the prototype's page).
- **Skills:** icon cards, three across then two across from lg.
- **Contact:** centred, the large serif email with Copy beside it, CV and LinkedIn links below.

The navigation floats 12px from the top as a pill (`SiteHeader.tsx`), max 56rem wide; `scroll-padding-top: 6rem` keeps jump targets clear of it. Diagrams sit in `@container` figures and switch from downward to across at 36rem. The page works down to 320px wide.

## Elevation & Depth

Mostly flat: depth comes from tone. Cards are lighter than their ground and carry a faint 1px inset edge (ink at 9%). Read more panels are set off by a 1px left rule (ink at 20%), not a box.

### Shadow Vocabulary
- **Float** (`0 10px 30px -14px rgb(10 19 15 / 0.45)`): the nav pill and its phone menu.
- **Bubble** (`0 8px 24px -8px rgb(10 19 15 / 0.45)`): the glossary explanation.
- **Overlay** (`0 6px 16px -8px rgb(10 19 15 / 0.45)` plus a 1px ink ring at 15%): the controls laid over a picture, the recording's Pause button and the gallery's play badge.
- **Photo lift** (`0 28px 60px -30px rgb(10 19 15 / 0.55)` plus a 1px ink ring at 15%): the profile photo.
- **Card edge** (`inset 0 0 0 1px` ink at `--card-edge`, 9%): every `.card`. An NPEC card raises it to 25% on hover instead of casting a shadow.

### Named Rules
**The Floating Layer Rule.** Only things that float over the page (the nav pill, its menu, the glossary bubble), the controls laid over a picture (the Pause button, the play badge) and the photo cast a soft shadow. Cards never do, not even on hover; they get their edge from tone and the inset hairline.

## Shapes

**The One Radius Rule.** Every card, panel, photo, screenshot and tooltip uses `rounded-card` (1.25rem). Buttons, filter buttons, nav links, tags and skill chips are pills (`rounded-full`). Smaller fixed shapes: icon tiles 12px, the key-result highlight 6px, chart bar tips 4px. Circles carry meaning in diagrams: filled ink dots are the owner's steps, outlined dots the team's. Lines are 2px in ink at 50 to 60%.

## Components

### Buttons
All pills, at least 44px tall. Only colours transition (200ms), so focus shows at full strength at once. Every control shares one focus style: a 3px `accent-line` outline, 3px offset.
- **Email (primary):** accent fill, white semibold text. In the hero it is 48px tall with a mail icon and the address; in the nav it reads "Email me" and is the nav's only coloured button.
- **Outline (secondary):** 2px ink border, ink text; on hover it fills with ink and the text turns page colour. Copy, Download CV in the hero, Read more (with a chevron that turns over).
- **Copy feedback:** the icon becomes a tick that draws itself, the label says Copied for 2.5s, and a status line tells screen readers.
- **Filter buttons:** meta size, semibold. Off: a `.card` pill whose text turns `accent-text` on hover. On: accent fill, `aria-pressed`.

### Text links
Semibold, underlined in ink at 40% with a 4px offset, at least 44px tall; on hover the text turns `accent-text` and the underline `accent-line`. The Contact email has no underline until pointed at.

### Tags and chips
Pills with ink at 6% behind, meta size, medium weight; static. Project tags show the story stage (Prototype or Production) first, then the filter areas.

### Cards
`.card`: `surface` fill, `rounded-card`, inset hairline. Used for project visuals, the NPEC cards, smaller projects, a project page's lead visual, skill groups, About's facts, the hero tiles, the inactive filters and the phone menu.

**NPEC cards** (`FeatureCard.tsx`): a 16:10 visual on top with a hairline below it (the recording cropped to fill, or the app screenshot cut to its top, where the scan is), then the title, key result, one sentence, facts, tags (Prototype or Production first) and a "View project" line with an arrow, pushed to the card's foot so both cards end level. The whole card is the link: the title's link has an `::after` layer stretched over the card (`after:absolute after:inset-0`), so screen readers hear the title as the link's name while a click anywhere follows it. The recording's Pause button sits above that layer (`z-10`). The card shows the focus ring when its link has keyboard focus (`has-[a:focus-visible]`). On hover the card rises 4px (500ms, `ease-out-expo`; it stays in place with reduced motion), its edge deepens to ink at 25%, the "View project" line turns `accent-text` and its arrow nudges right.

### Icon tiles
A 44px square with 12px corners, `accent-tint` behind an `accent-line` icon. In the hero tiles and on each skill card.

### Navigation
A floating pill on `surface` at 90% with a blur behind it: the name on the left (shortened to "A. Samara" on phones), four section links from md, the theme switch, Email me. The section you are reading gets an `accent-tint` pill and `accent-text` (with `aria-current`). On phones the links fold into a Menu button that opens a card below the pill; Escape or a tap outside closes it. A skip link appears on keyboard focus. On a project page the links lead back to the one-page site's sections and Projects is marked current.

### Theme switch
A 40px by 24px pill track with a 2px ink border, a sliding ink knob, and a moon or sun; `aria-pressed`. The new theme spreads in a circle from the switch over 650ms.

### Project visuals
Chosen in `ProjectVisual.tsx` (rows and smaller cards) and `FeatureCard.tsx` (the NPEC cards): the real work first, otherwise a diagram of how it works.

**The Evidence Rule.** A project's main visual shows the work: a screenshot, a recording, a chart of approved numbers or a how-it-works diagram. A logo names the client but is not evidence, so it is never a project's main visual (the owner's rule, 2026-10-18).
- **Screenshots and recordings** (`image`, `animation`) fill their card to its edges, with a hairline above the caption. The Platform shows its deployed web app; Root Detection loops its simulated robot run (a 960×720 WebM/MP4 video that loads and plays only in view) with a Pause/Play pill in the top-right corner, and starts on the still frame under reduced motion (`Recording.tsx`; `fill` crops it to cover a fixed box).
- **Charts and diagrams** are drawn with HTML and CSS from `src/data/projects.ts`, all in ink: bar chart (emphasis bar ink, context bars `bar-muted`, a hidden table for screen readers), flow diagram (filled nodes for the owner's parts, outlined nodes the team's; the Emotion pipeline and the stock chatbot), branch diagram, and the How it works steps in Read more and on project pages.

### Client logos
`ClientLogo.tsx`, from the list in `src/data/projects.ts`: small and in one colour, beside the client's name in the facts line and in a project page's header. The logo file is a CSS mask, so only its shape is used and the current text colour shows through (`bg-current`); it follows the theme like the name beside it, takes `CanvasText` in forced colours and keeps its colour in print (`print-color-adjust: exact`). Every logo is 1.15em tall, whatever its width, and is hidden from screen readers because the name follows. The files are the clients' own: NPEC's plant symbol (its site icon, made a one-colour shape) and Content Intelligence Agency's mark (its SVG with the empty margins trimmed). A new logo needs a transparent background.

### Project page pieces
- **Lead visual:** a `.card` whose picture sits centred on the `band` colour, so a tall screenshot stands at most 44rem high instead of stretching; the recording plays in it at up to 60rem wide. Below, a hairline, the caption and a "View larger" text link.
- **Gallery** (`Gallery.tsx`): a justified flex grid in which every picture keeps its own shape. Each item's `flex-grow` and `flex-basis` are proportional to its aspect ratio (basis: ratio × 12rem, the row's starting height), so the pictures in a row share one height and none is cropped; a picture alone on a row spans it. Each picture is a `rounded-card` button with a 1px ink ring at 10% and its caption below; it scales up 3% on hover. A video shows its poster with a round play badge.
- **Larger view** (`Lightbox.tsx`): the browser's modal `<dialog>`, set to `data-theme="dark"` so it always uses the dark colours, over a 95% dark backdrop (`.lightbox::backdrop`); the page behind cannot scroll (`html:has(dialog[open])`). One item at a time, with "n / total" and the caption under it, round 48px buttons for previous and next at the sides (under the picture on phones) and Close in the corner. Arrow keys and a sideways swipe step through the set and wrap around; Escape or a click outside closes it, focus returns to the button that opened it, and a polite live region says where you are.

### Read more
The panel unfolds by animating grid rows from 0fr to 1fr (500ms), is `inert` while closed, and prints open. In a row it opens across the full width: Result, Problem, What I built, How it works, Skills.

### Motion
Described in the Motion block at the end of `src/index.css`. Everything sits inside `@media screen and (prefers-reduced-motion: no-preference)`; print and reduced motion show the finished page.
- **Easing:** `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`) for almost everything; a steady `cubic-bezier(0.45, 0, 0.2, 1)` for the photo scan.
- **Opening:** the photo is scanned in top to bottom (1.5s); the name inks in on the serif's weight axis (1.3s); the hero text, Email button and tiles fade in over 0.5s.
- **On scroll, once:** bars grow from their baseline, diagram lines and nodes trace in order, skill tags slide into their cards, the prototype-to-production arrow draws itself (`.draw-arrow`, 0.9s), and on a project page the How it works steps trace in.
- **Looping, pausable:** the robot recording on the Root Detection card and page.
- **On interaction:** projects rise in after a filter change, an NPEC card rises 4px on hover, the How it works steps trace each time Read more opens, the copy tick draws, the larger view and each item in it fade in (0.3s).
- **Scroll-linked, where supported:** the reflections drift.

## Do's and Don'ts

### Do:
- **Do** use the semantic colour names so a block works in both themes without extra code, and check new values against The Contrast Pairs Rule on page, band and surface.
- **Do** open every new section with `Section.tsx`: heading, one intro sentence in `src/data/site.ts`, and the next tone in the page/band alternation.
- **Do** give every project its serif title, then its key result, then one or two sentences; put the rest behind Read more or on its project page.
- **Do** lead a project with evidence of the work; show the client's logo only small, in the text colour, beside the client's name.
- **Do** keep body text left-aligned in `max-w-measure`, and mark key words with `**` and jargon with `[[ ]]` in the data files.
- **Do** put new motion in `src/index.css` inside the reduced-motion media query, and animate in the direction the data flows.
- **Do** draw his own work as filled nodes and the team's as outlined nodes, with the legend and spoken labels; give every chart a hidden table.
- **Do** add `forced-colors:` system colours to any new drawn line or dot.

### Don't:
- **Don't** use red in charts, diagrams or text that isn't a link; red is for buttons, active states, icons and links.
- **Don't** give a card a darker fill than its ground, a different corner radius, or a drop shadow.
- **Don't** use square or slightly rounded buttons or chips; they are pills.
- **Don't** add a third font family, or set body text in the serif.
- **Don't** let a key result or anything else in a project grow larger than its title.
- **Don't** write more than one or two sentences on a card or row.
- **Don't** set a colour with a raw hex in a component; add or reuse a token in `src/index.css`.
- **Don't** plot numbers that are not approved, or put two different tests in one chart.
- **Don't** make a logo a project's main visual, or show it in its own colours.
