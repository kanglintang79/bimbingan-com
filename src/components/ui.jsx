export function Logo({ light = false }) {
  return <a href="/" className={`flex shrink-0 items-center gap-2.5 font-display font-semibold tracking-[-0.04em] ${light ? 'text-white' : 'text-ink'}`}>
    <span className={`grid size-8 place-items-center rounded-full border ${light ? 'border-white/20' : 'border-ink/10'}`}><span className="size-2 rounded-full bg-teal shadow-[0_0_14px_3px_rgba(20,184,166,.2)]" /></span>
    <span className="text-base sm:text-lg">bimbingan<span className="text-teal">.com</span></span>
  </a>
}

export function ArrowIcon({ className = '' }) {
  return <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function CheckIcon({ dark = false }) {
  return <span className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${dark ? 'bg-white/10 text-cyan-300' : 'border border-teal/20 bg-white text-teal'}`}><svg viewBox="0 0 16 16" fill="none" className="size-2.5"><path d="m4 8 2.5 2.5L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
}

export function Button({ children, href, light = false, className = '' }) {
  return <a href={href} target={href?.startsWith('https') ? '_blank' : undefined} rel="noreferrer" className={`group inline-flex min-h-11 items-center justify-center gap-3 rounded-full px-5 text-xs font-semibold transition duration-300 ${light ? 'bg-white text-ink hover:bg-mint' : 'bg-ink text-white hover:bg-teal'} ${className}`}>
    {children}<ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
  </a>
}

export function SectionHeading({ eyebrow, title, text, center = false, light = false }) {
  return <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
    <p className={`mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-cyan-300' : 'text-teal'}`}>{eyebrow}</p>
    <h2 className={`font-display text-3xl font-semibold leading-[1.15] tracking-[-0.045em] sm:text-4xl lg:text-[2.75rem] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
    {text && <p className={`mt-5 max-w-xl text-sm leading-7 sm:text-base ${center ? 'mx-auto' : ''} ${light ? 'text-white/60' : 'text-muted'}`}>{text}</p>}
  </div>
}
