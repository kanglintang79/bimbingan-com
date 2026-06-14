import { ArrowIcon, SectionHeading } from '../components/ui'
import { packages, whatsappUrl } from '../data/content'

export default function Pricing({ lang, t }) {
  return <section id="paket" className="py-24 sm:py-36"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <SectionHeading eyebrow={t.packages.eyebrow} title={t.packages.title} text={t.packages.text} />
    <div className="mt-14 overflow-hidden rounded-3xl border border-line">
      {packages[lang].map((item, index) => <article key={item.code} className={`relative grid gap-7 border-b border-line p-6 last:border-0 sm:p-8 lg:grid-cols-[140px_1fr_230px] lg:items-start ${item.featured ? 'bg-mint' : 'bg-white'}`}>
        {item.featured && <div className="absolute inset-y-0 left-0 w-0.5 bg-teal" />}
        <div><p className="font-mono text-[9px] uppercase tracking-[.14em] text-muted">PACKAGE {String(index + 1).padStart(2, '0')}</p><p className={`mt-3 inline-flex rounded-full border px-2.5 py-1 font-mono text-[7px] uppercase tracking-[.1em] ${item.featured ? 'border-teal/25 text-teal' : 'border-line text-muted'}`}>{item.tag}</p></div>
        <div>
          <h3 className="text-xl font-semibold tracking-[-.04em] sm:text-2xl">{item.name}</h3>
          <p className="mt-3 max-w-xl text-xs leading-6 text-muted">{item.details.slice(0, 2).join(' · ')}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">{item.details.slice(2, 5).map((detail) => <span key={detail} className="flex items-center gap-2 text-[10px] font-medium text-muted"><span className="size-1 rounded-full bg-teal" />{detail}</span>)}</div>
          {item.areas && <details className="mt-5 text-xs"><summary className="cursor-pointer font-mono text-[9px] uppercase tracking-wider text-teal">{t.packages.area}</summary><div className="mt-3 grid gap-2 text-muted sm:grid-cols-2">{item.areas.map((area) => <p key={area}>{area}</p>)}</div></details>}
        </div>
        <div className="flex flex-col border-t border-line pt-5 lg:items-end lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          <p className="font-mono text-[8px] uppercase tracking-wider text-muted">Investment</p>
          <p className="mt-2 text-xl font-semibold tracking-[-.04em]">{item.price}</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold text-ink hover:text-teal">{t.packages.choose}<ArrowIcon className="size-4 transition group-hover:translate-x-1" /></a>
        </div>
      </article>)}
    </div>
  </div></section>
}
