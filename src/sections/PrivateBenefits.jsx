import { SectionHeading } from '../components/ui'

export default function PrivateBenefits({ t }) {
  return <section className="border-y border-line bg-mint py-24 sm:py-36"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <SectionHeading eyebrow={t.private.eyebrow} title={t.private.title} text={t.private.text} />
    <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {t.private.points.map(([title, text], i) => <article key={title} className="bg-white p-6 sm:p-7"><p className="font-mono text-[9px] text-teal">PRIVATE / 0{i + 1}</p><h3 className="mt-12 text-base font-semibold tracking-[-.025em]">{title}</h3><p className="mt-3 text-xs leading-6 text-muted">{text}</p></article>)}
    </div>
  </div></section>
}
