import { SectionHeading } from '../components/ui'

export default function Audience({ t }) {
  return <section id="untuk-siapa" className="pb-24 sm:pb-36"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="rounded-3xl border border-line bg-ink px-6 py-10 text-white sm:px-10 sm:py-12">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <SectionHeading light eyebrow={t.audience.eyebrow} title={t.audience.title} text={t.audience.text} />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {t.audience.items.map((item, i) => <div key={item} className="bg-ink p-5"><p className="font-mono text-[8px] text-teal">FIT / 0{i + 1}</p><p className="mt-7 text-xs font-medium leading-6 text-white/70">{item}</p></div>)}
        </div>
      </div>
    </div>
  </div></section>
}
