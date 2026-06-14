import { SectionHeading } from '../components/ui'
import MentorImage from '../components/MentorImage'

export default function Mentor({ t }) {
  return <section id="mentor" className="py-24 sm:py-36"><div className="mx-auto grid max-w-5xl gap-16 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:items-center lg:px-8">
    <div className="relative mx-auto h-[280px] w-full max-w-[210px] sm:h-[350px] sm:max-w-[270px]"><div className="absolute inset-3 translate-x-5 translate-y-4 rounded-3xl bg-teal/15 blur-xl" /><MentorImage className="absolute inset-0"><div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-ink/75 p-3 text-white backdrop-blur"><p className="text-sm font-semibold">Kang Lintang</p><p className="mt-1 font-mono text-[7px] uppercase tracking-widest text-white/50">{t.mentor.label}</p></div></MentorImage></div>
    <div><SectionHeading eyebrow={t.mentor.eyebrow} title={t.mentor.title} text={t.mentor.text} /><blockquote className="mt-9 border-l border-teal pl-5 text-sm font-medium leading-7 text-muted">“{t.mentor.quote}”</blockquote></div>
  </div></section>
}
