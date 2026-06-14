import { Logo } from '../components/ui'

export default function Footer({ t }) {
  return <footer className="px-4 py-10 sm:px-6"><div className="mx-auto max-w-7xl"><div className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-center sm:justify-between"><Logo /><p className="max-w-sm text-xs leading-5 text-muted">{t.footer}</p><a href="#" className="font-mono text-[8px] uppercase tracking-widest text-muted hover:text-teal">{t.nav.cta === 'Pesan Sesi Privat' ? 'Kembali ke atas' : 'Back to top'} ↑</a></div><p className="max-w-4xl pt-6 text-[9px] leading-5 text-muted">{t.disclaimer}</p></div></footer>
}
