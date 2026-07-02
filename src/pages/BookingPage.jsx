import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowIcon, CheckIcon, Logo } from '../components/ui'
import { offlineBookings, paymentInfo, whatsappUrl } from '../data/content'
import { trackLead, trackPurchase } from '../lib/metaPixel'

export default function BookingPage() {
  const { slug } = useParams()
  const booking = offlineBookings[slug]
  const [copyStatus, setCopyStatus] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [regionError, setRegionError] = useState('')
  const [isRedirecting, setIsRedirecting] = useState(false)

  if (!booking) return <BookingNotFound />

  const confirmUrl = `${whatsappUrl}?text=${encodeURIComponent(booking.whatsappMessage)}`

  function confirmPayment() {
    if (isRedirecting) return

    const region = booking.regions?.find((item) => item.name === selectedRegion)
    if (booking.regions && !region) {
      setRegionError('Pilih area terlebih dahulu agar estimasi paket bisa dihitung.')
      return
    }

    if (slug === 'paket-d') {
      trackLead({ content_name: booking.trackingName })
    } else {
      const value = region?.value ?? booking.trackingValue

      if (!value) return

      trackPurchase({
        value,
        id: slug,
        content_name: booking.trackingName,
        ...(region ? { region: region.name } : {}),
      })
    }

    setIsRedirecting(true)
    window.setTimeout(() => {
      window.location.href = confirmUrl
    }, 1000)
  }

  async function copyAccountNumber() {
    try {
      if (!navigator.clipboard?.writeText) return
      await navigator.clipboard.writeText(paymentInfo.accountNumber)
      setCopyStatus('Nomor rekening disalin')
      window.setTimeout(() => setCopyStatus(''), 2200)
    } catch {
      setCopyStatus('')
    }
  }

  return (
    <main className="min-h-screen bg-white pb-24 text-ink">
      <div className="page-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,.14),transparent_36%),linear-gradient(to_bottom,rgba(255,255,255,.72),#fff_58%)]" />
        <header className="relative z-10 border-b border-line bg-white/82 backdrop-blur-xl">
          <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Logo />
            <Link to="/" className="inline-flex min-h-10 items-center justify-center rounded-full border border-line px-4 text-xs font-semibold text-muted transition hover:border-teal/30 hover:text-teal">
              Halaman utama
            </Link>
          </nav>
        </header>

        <section className="relative z-10 mx-auto grid max-w-6xl gap-8 px-4 py-24 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-28">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-teal">Offline Booking / Paket {booking.code}</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">{booking.name}</h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">{booking.note}</p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Metric label="Harga belajar" value={booking.price} />
              <Metric label="Durasi" value={booking.duration} />
              <Metric label="Lokasi / area" value={booking.location} />
              <Metric label={booking.participants ? 'Peserta' : 'Akomodasi'} value={booking.participants || booking.accommodation} />
            </div>
          </div>

          <aside className="border border-line bg-white/88 p-5 shadow-[0_24px_80px_rgba(11,15,20,.08)] backdrop-blur sm:p-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">Instruksi pembayaran</p>
            <div className="mt-5 space-y-3">
              <PaymentRow label="Bank" value={paymentInfo.bank} />
              <PaymentRow label="Nomor rekening" value={paymentInfo.accountNumber} featured />
              <PaymentRow label="Atas nama" value={paymentInfo.accountName} />
            </div>
            <button type="button" onClick={copyAccountNumber} className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full border border-teal/25 bg-white px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-teal transition hover:bg-teal hover:text-white">
              Salin Nomor Rekening
            </button>
            <div className="min-h-6 pt-2">
              {copyStatus && <p className="text-center text-xs font-medium text-teal">{copyStatus}</p>}
            </div>
            <p className="mt-3 border-t border-line pt-5 text-xs leading-6 text-muted">
              Pembayaran resmi Bimbingan.com hanya melalui rekening di atas. Selain nomor rekening tersebut bukan resmi milik Bimbingan.com.
            </p>
            <p className="mt-3 text-xs leading-6 text-muted">
              Setelah transfer, kirim bukti pembayaran melalui WhatsApp untuk verifikasi manual.
            </p>
            {booking.regions && (
              <label className="mt-5 block text-xs font-semibold text-ink">
                Pilih area peserta
                <select
                  value={selectedRegion}
                  onChange={(event) => {
                    setSelectedRegion(event.target.value)
                    setRegionError('')
                  }}
                  className="mt-2 min-h-12 w-full border border-line bg-white px-3 text-sm text-ink outline-none transition focus:border-teal"
                >
                  <option value="">Pilih area sebelum konfirmasi</option>
                  {booking.regions.map((region) => (
                    <option key={region.name} value={region.name}>
                      {region.name} — Rp{region.value.toLocaleString('id-ID')}
                    </option>
                  ))}
                </select>
                {regionError && <span className="mt-2 block font-normal leading-5 text-red-600">{regionError}</span>}
              </label>
            )}
            <button type="button" onClick={confirmPayment} disabled={isRedirecting} className="group mt-6 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold text-white transition hover:bg-teal disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-ink">
              Konfirmasi Pembayaran ke WhatsApp
              <ArrowIcon className="size-4 transition group-hover:translate-x-1" />
            </button>
            <Link to="/" className="mt-3 inline-flex w-full min-h-12 items-center justify-center rounded-full border border-line px-5 text-xs font-semibold text-ink transition hover:border-teal/35 hover:text-teal">
              Kembali ke halaman utama
            </Link>
          </aside>
        </section>
      </div>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <InfoPanel title="Cocok untuk siapa" items={booking.idealFor} />
        <InfoPanel title="Yang didapat peserta" items={booking.includes} />
        <div className="border border-line bg-white p-5 sm:p-6">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-teal">Biaya tambahan</p>
          <p className="mt-4 text-sm leading-7 text-muted">{booking.additionalCost}</p>
          <p className="mt-4 border-t border-line pt-4 text-xs leading-6 text-muted">
            Biaya transport dan hotel bersifat estimasi. Nominal final mengikuti kondisi aktual, ketersediaan jadwal, dan harga saat booking.
          </p>
        </div>
      </section>

      {booking.prices && (
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="border border-line bg-mint p-5 sm:p-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-teal">Area & harga belajar</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {booking.prices.map((price) => <p key={price} className="border border-line bg-white px-4 py-3 text-sm font-medium text-ink">{price}</p>)}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

function Metric({ label, value }) {
  return <div className="min-w-0 border border-line bg-white/82 p-4 backdrop-blur">
    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
    <p className="mt-2 break-words text-base font-semibold leading-6 tracking-[-0.03em]">{value}</p>
  </div>
}

function PaymentRow({ label, value, featured = false }) {
  return <div className={`flex flex-col gap-2 border px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 ${featured ? 'border-teal/25 bg-white' : 'border-line bg-mint'}`}>
    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">{label}</p>
    <p className={`break-words font-semibold leading-5 text-ink sm:max-w-[62%] sm:text-right ${featured ? 'font-mono text-lg tracking-[0.08em] sm:text-xl' : 'text-sm'}`}>{value}</p>
  </div>
}

function InfoPanel({ title, items }) {
  return <div className="border border-line bg-white p-5 sm:p-6">
    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-teal">{title}</p>
    <div className="mt-5 space-y-3">
      {items.map((item) => <p key={item} className="flex gap-3 text-sm leading-6 text-muted"><CheckIcon /> <span>{item}</span></p>)}
    </div>
  </div>
}

function BookingNotFound() {
  return (
    <main className="page-grid grid min-h-screen place-items-center bg-white px-4 py-16 text-ink">
      <section className="w-full max-w-xl border border-line bg-white/88 p-6 text-center shadow-[0_24px_80px_rgba(11,15,20,.08)] backdrop-blur sm:p-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-teal">Booking tidak ditemukan</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em]">Paket offline ini belum tersedia.</h1>
        <p className="mt-4 text-sm leading-7 text-muted">Silakan kembali ke halaman utama dan pilih Paket A, B, C, atau D.</p>
        <Link to="/" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-xs font-semibold text-white transition hover:bg-teal">
          Kembali ke halaman utama
        </Link>
      </section>
    </main>
  )
}
