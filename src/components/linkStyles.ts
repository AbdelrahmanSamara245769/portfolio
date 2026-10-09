// Class names shared by the links and buttons that appear in more than one place,
// so the top section, Contact and the project cards stay identical.
// Only colours transition, so the focus outline appears at full strength at once,
// and nothing fades for visitors who asked for reduced motion.

export const outlineButton =
  'inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink px-5 font-semibold transition-[color,background-color] duration-200 hover:bg-ink hover:text-page motion-reduce:transition-none'

export const textLink =
  'inline-flex min-h-11 items-center font-semibold underline decoration-ink/40 underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-accent-text hover:decoration-accent-line motion-reduce:transition-none'
