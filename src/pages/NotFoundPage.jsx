import { Link } from 'react-router-dom'
import { Logo } from '../components/ui'

export default function NotFoundPage() {
  return (
    <main className="page-grid grid min-h-screen place-items-center bg-white px-4 py-16 text-ink">
      <section className="w-full max-w-xl border border-line bg-white/88 p-6 text-center shadow-[0_24px_80px_rgba(11,15,20,.08)] backdrop-blur sm:p-8">
        <div className="flex justify-center"><Logo /></div>
        <p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-teal">404 / Tidak ditemukan</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em]">Halaman ini tidak tersedia.</h1>
        <p className="mt-4 text-sm leading-7 text-muted">Kembali ke halaman utama untuk melihat program privat Meta Ads Bimbingan.com.</p>
        <Link to="/" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-xs font-semibold text-white transition hover:bg-teal">
          Kembali ke halaman utama
        </Link>
      </section>
    </main>
  )
}
