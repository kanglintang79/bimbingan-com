import { Button } from '../components/ui'
import { whatsappUrl } from '../data/content'

export default function WhatsAppCta({ t }) {
  return <section className="px-4 pb-4 sm:px-6 sm:pb-6"><div className="page-grid relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-line bg-mint px-5 py-16 sm:px-10 sm:py-20">
    <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div className="max-w-2xl"><p className="font-mono text-[9px] uppercase tracking-[.16em] text-teal">{t.cta.eyebrow}</p><h2 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-[-.05em] sm:text-4xl">{t.cta.title}</h2><p className="mt-5 max-w-xl text-sm leading-7 text-muted">{t.cta.text}</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Button href={whatsappUrl}>{t.cta.primary}</Button><button onClick={() => window.dispatchEvent(new Event('open-akari'))} className="min-h-11 rounded-full border border-line bg-white px-5 text-xs font-semibold transition hover:border-teal/40 hover:text-teal">{t.cta.secondary}</button></div></div>
  </div></section>
}
