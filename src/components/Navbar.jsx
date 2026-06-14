import { useState } from 'react'
import { Button, Logo } from './ui'
import { whatsappUrl } from '../data/content'

export default function Navbar({ lang, setLang, t }) {
  const [open, setOpen] = useState(false)
  const links = [['summary', '#program'], ['audience', '#untuk-siapa'], ['learn', '#materi'], ['packages', '#paket'], ['mentor', '#mentor']]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-white/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([key, href]) => <a key={key} href={href} className="text-xs font-semibold text-muted transition hover:text-ink">{t.nav[key]}</a>)}
          <LanguageToggle lang={lang} setLang={setLang} />
          <Button href={whatsappUrl} className="min-h-9 px-4">{t.nav.cta}</Button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle lang={lang} setLang={setLang} />
          <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full border border-ink/10" aria-label="Menu">
            <span className="space-y-1.5"><span className="block h-px w-4 bg-ink" /><span className="block h-px w-4 bg-ink" /></span>
          </button>
        </div>
      </nav>
      {open && <div className="border-t border-ink/5 bg-white p-4 lg:hidden"><div className="flex flex-col gap-1">
        {links.map(([key, href]) => <a key={key} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-mint">{t.nav[key]}</a>)}
        <Button href={whatsappUrl} className="mt-2 w-full">{t.nav.cta}</Button>
      </div></div>}
    </header>
  )
}

function LanguageToggle({ lang, setLang }) {
  return <div className="flex rounded-full border border-ink/10 bg-mint p-0.5 font-mono text-[10px] font-semibold">
    {['id', 'en'].map((item) => <button key={item} onClick={() => setLang(item)} className={`rounded-full px-2.5 py-1.5 uppercase transition ${lang === item ? 'bg-ink text-white shadow-sm' : 'text-muted hover:text-ink'}`}>{item}</button>)}
  </div>
}
