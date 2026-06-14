import { SectionHeading } from '../components/ui'

export default function Summary({ t }) {
  return <section id="program" className="py-24 sm:py-36"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
      <SectionHeading eyebrow={t.summary.eyebrow} title={t.summary.title} text={t.summary.text} />
      <div className="border-t border-line">
        {t.summary.cards.map(([num, title, text]) => <article key={num} className="grid gap-4 border-b border-line py-7 sm:grid-cols-[48px_1fr]">
          <span className="font-mono text-[9px] text-teal">{num} / SIGNAL</span>
          <div><h3 className="text-base font-semibold tracking-[-.025em]">{title}</h3><p className="mt-2 max-w-xl text-sm leading-7 text-muted">{text}</p></div>
        </article>)}
      </div>
    </div>
  </div></section>
}
