import { SectionHeading } from '../components/ui'
import { curriculum } from '../data/content'

export default function Curriculum({ lang, t }) {
  return <section id="materi" className="page-grid border-y border-line bg-mint py-24 sm:py-36"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
      <SectionHeading eyebrow={t.learn.eyebrow} title={t.learn.title} text={t.learn.text} />
      <div className="overflow-hidden rounded-3xl border border-line bg-white">
        {curriculum[lang].map((item, i) => <article key={item} className="group flex items-center gap-4 border-b border-line px-5 py-4 last:border-0 hover:bg-mint sm:px-6">
          <span className="font-mono text-[9px] text-muted">{String(i + 1).padStart(2, '0')}</span>
          <span className="h-px w-5 bg-line transition group-hover:bg-teal" />
          <h3 className="text-sm font-medium leading-6">{item}</h3>
          {i === 6 && <span className="ml-auto hidden rounded-full border border-teal/20 px-2 py-1 font-mono text-[7px] uppercase text-teal sm:block">live practice</span>}
        </article>)}
      </div>
    </div>
  </div></section>
}
