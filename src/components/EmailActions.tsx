import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { CheckIcon, CopyIcon, MailIcon } from './icons'

// The page's main action: the email address as a link that opens a mail app,
// and a Copy button for people who use webmail or have no mail app set up. It
// comes in two looks: EmailButton (the red button at the top of the page) and
// EmailDisplay (the large address that closes the page in Contact). Both share
// the copy logic below.

type CopyState = 'idle' | 'copied' | 'failed'

// A custom hook that holds the copy logic, so both components can use it.
function useCopyEmail() {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  // A few seconds after a successful copy the button returns to "Copy". A failure
  // message stays until the visitor presses Copy again, so there is time to read
  // it. The cleanup cancels the timer if the button is pressed again or the page
  // goes away.
  useEffect(() => {
    if (copyState !== 'copied') return
    const timer = window.setTimeout(() => setCopyState('idle'), 2500)
    return () => window.clearTimeout(timer)
  }, [copyState])

  async function copyEmail() {
    // Back to idle first, so a second press while it says Copied restarts the timer
    // and screen readers hear the message again.
    setCopyState('idle')
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      // The clipboard can be unavailable, for example when a browser blocks it.
      setCopyState('failed')
    }
  }

  return { copyState, copyEmail }
}

function CopyButton({ copyState, onCopy }: { copyState: CopyState; onCopy: () => void }) {
  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex min-h-12 min-w-[7.5rem] items-center justify-center gap-2 rounded-full border-2 border-ink px-4 font-semibold transition-[color,background-color] duration-200 hover:bg-ink hover:text-page motion-reduce:transition-none print:hidden"
    >
      {copyState === 'copied' ? <CheckIcon /> : <CopyIcon />}
      {copyState === 'copied' ? 'Copied' : 'Copy'}
      <span className="sr-only"> email address</span>
    </button>
  )
}

// Screen readers announce changes to this status line. A failure also shows on screen.
function CopyStatus({ copyState }: { copyState: CopyState }) {
  return (
    <p role="status" className={copyState === 'failed' ? 'mt-2 text-meta' : 'sr-only'}>
      {copyState === 'copied' && 'Email address copied.'}
      {copyState === 'failed' && 'Copying didn’t work here. Select the address and copy it yourself.'}
    </p>
  )
}

export function EmailButton() {
  const { copyState, copyEmail } = useCopyEmail()

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-accent px-6 font-semibold text-on-accent transition-[background-color] duration-200 hover:bg-accent-hover motion-reduce:transition-none print:bg-transparent print:px-0 print:text-ink"
        >
          <MailIcon />
          <span>
            <span className="sr-only">Email </span>
            {profile.email}
          </span>
        </a>
        <CopyButton copyState={copyState} onCopy={copyEmail} />
      </div>
      <CopyStatus copyState={copyState} />
    </div>
  )
}

// The large address that closes the page. Pointing at it underlines it.
export function EmailDisplay() {
  const { copyState, copyEmail } = useCopyEmail()

  return (
    <div>
      <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-4">
        {/* The address fits on one line from 320px up. If it ever can't (when zoomed in),
            <wbr /> lets it break before the @, and only then at any point rather than overflow. */}
        <a
          href={`mailto:${profile.email}`}
          className="role-display inline-block py-1.5 text-email wrap-anywhere decoration-[0.06em] underline-offset-[0.14em] transition-[color] duration-200 hover:text-accent-text hover:underline motion-reduce:transition-none"
        >
          <span className="sr-only">Email </span>
          {profile.email.split('@')[0]}
          <wbr />@{profile.email.split('@')[1]}
        </a>
        <CopyButton copyState={copyState} onCopy={copyEmail} />
      </div>
      <CopyStatus copyState={copyState} />
    </div>
  )
}
