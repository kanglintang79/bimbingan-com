import { Button } from '../components/ui'
import MentorImage from '../components/MentorImage'
import { whatsappUrl } from '../data/content'

export default function Hero({ t }) {
  return <section className="page-grid relative border-b border-line pt-28 sm:pt-32">
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,.35),white_92%)]" />
    <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-16 px-4 pb-24 sm:px-6 lg:grid-cols-[1fr_300px] lg:px-8 lg:pb-32">
      <div className="max-w-4xl">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 font-mono text-[9px] font-medium uppercase tracking-[.12em] text-muted shadow-sm">
          <span className="size-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(20,184,166,.55)]" />{t.hero.badge}
        </div>
        <h1 className="max-w-[820px] text-[2.7rem] font-semibold leading-[1.06] tracking-[-.06em] text-ink sm:text-[4rem] lg:text-[4.7rem]">{t.hero.title}</h1>
        <p className="mt-7 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">{t.hero.text}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappUrl}>{t.hero.primary}</Button>
          <button onClick={() => window.dispatchEvent(new Event('open-akari'))} className="min-h-11 rounded-full border border-line bg-white px-5 text-xs font-semibold transition hover:border-teal/40 hover:text-teal">{t.hero.secondary}</button>
        </div>
        <div className="mt-14 grid max-w-2xl grid-cols-3 border-y border-line">
          {t.hero.stats.map(([num, label]) => <div key={num} className="border-r border-line py-4 pr-3 last:border-0 sm:px-5 sm:first:pl-0"><p className="text-base font-semibold tracking-[-.03em] sm:text-lg">{num}</p><p className="mt-1 font-mono text-[7px] uppercase leading-3 tracking-[.1em] text-muted sm:text-[8px]">{label}</p></div>)}
        </div>
      </div>
      <div className="relative mx-auto h-[290px] w-full max-w-[210px] sm:h-[350px] sm:max-w-[270px]">
        <div className="absolute inset-3 translate-x-5 translate-y-4 rounded-3xl bg-teal/15 blur-xl" />
        <div className="absolute inset-5 translate-x-7 translate-y-5 rounded-3xl bg-ink/10 blur-2xl" />
        <MentorImage className="absolute inset-0" imageClassName="opacity-95">
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white"><p className="font-mono text-[7px] uppercase tracking-[.16em] text-white/55">Private mentor / 01</p><p className="mt-1 text-sm font-semibold">Kang Lintang</p></div>
        </MentorImage>
      </div>
    </div>
  </section>
}
