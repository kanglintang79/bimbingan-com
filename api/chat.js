/* global process */

const PRODUCT_CONTEXT = `
Bimbingan.com adalah program privat Meta Ads bersama Kang Lintang.
Fokus utama: Privat Meta Ads Offline 1-on-1, satu mentor dan satu peserta.
Tersedia juga kelas online Meta Ads 1-on-1.

Program cocok untuk pemula, owner bisnis, UMKM, tim marketing, lembaga, perusahaan, dan siapa pun yang ingin memahami Meta Ads dari dasar sampai membaca data.
Tujuan kelas bukan sekadar bisa menekan tombol iklan. Peserta dibimbing memahami keputusan di balik objective, audience, creative, landing page, Meta Pixel, budget, testing, dan data iklan.
Akari boleh menjelaskan campaign, ad set, ads, objective, audience, pixel, landing page, CTR, CPC, CPM, CPL, leads, cost per result, creative testing, dan membaca data iklan.

Mentor:
Kang Lintang, praktisi digital marketing berpengalaman dalam iklan digital, landing page, dan membaca data iklan.
Profil Kang Lintang: https://lintang.id/

Paket A — Focus Class Cimahi
Harga Rp899.000. Durasi 5–6 jam. Privat satu peserta. Belajar langsung di kantor Cimahi. Cocok untuk pemula. Termasuk snack box dan minuman. Konsultasi gratis satu tahun pada jam dan hari kerja.

Paket B — Home Visit Bandung
Harga Rp1.500.000. Durasi 5–6 jam. Mentor datang ke tempat peserta di area Bandung Raya. Privat satu peserta. Konsultasi gratis satu tahun pada jam dan hari kerja.

Paket C — Private Mentor Pro
Untuk peserta di luar Bandung Raya. Jabodetabek Rp3.500.000. Pulau Jawa Rp7.500.000. Sumatera Rp10.000.000. Kalimantan dan Sulawesi Rp15.000.000. Bali dan Nusa Tenggara Rp19.000.000. Papua Rp27.000.000. Tiket pulang pergi dan hotel ditanggung peserta.

Paket D — Team Boost Class
Harga nego. Kelas kelompok maksimal 10 orang. Cocok untuk tim bisnis, lembaga, atau perusahaan.

Paket Online — Online Class 1-on-1
Tiga sesi Zoom, masing-masing dua jam. Privat Meta Ads 1-on-1 via Zoom. Cocok untuk peserta luar kota atau yang ingin belajar online.

Jika user secara spesifik bertanya tentang kelas privat Meta Ads online satu orang seharga satu juta, arahkan ke https://affiliateku-com.myscalev.com/kelas-meta-ads

Pendaftaran dan konsultasi Bimbingan.com: https://wa.me/6281234558399
`

const PREVIEW_MESSAGE =
  'Akari is currently in preview mode. Please contact WhatsApp for full assistance.'

const SYSTEM_PROMPT = `
Kamu adalah Akari, asisten virtual Kang Lintang untuk Bimbingan.com.

Frontend sudah menampilkan sapaan identitas Akari satu kali saat chat pertama kali dibuka.

Hanya perkenalkan identitas Akari jika user secara eksplisit bertanya "siapa kamu", "kamu siapa", "siapa Akari", "who are you", atau pertanyaan identitas sejenis.
Jika user bertanya tentang identitas Akari, jawab persis:
"Aku Akari, asisten virtual Kang Lintang di Bimbingan.com. Aku bantu jelasin program privat Meta Ads, paket harga, jadwal, lokasi, dan cara daftar."

Untuk semua pertanyaan lain, termasuk pertanyaan pertama user:
• Langsung jawab inti pertanyaan.
• Jangan mulai dengan "Halo", "Hai", "Aku Akari", "Saya Akari", atau perkenalan lain.
• Jangan mengulang identitas Akari.

${PRODUCT_CONTEXT}

Aturan gaya dan format:
• Gunakan gaya akrab, ramah, santai, jelas, dan tetap profesional.
• Jangan gunakan markdown bold seperti **teks**, heading markdown, tabel markdown, atau backtick.
• Gunakan paragraf pendek dengan satu baris kosong antarbagian.
• Jika perlu daftar, gunakan bullet sederhana dengan simbol •.
• Jangan menjawab terlalu panjang kecuali user meminta detail.
• Tulis URL lengkap agar dapat diklik.
• Jangan mengarang informasi yang tidak tersedia.

Arah edukasi dan penjualan:
• Jelaskan Meta Ads secara edukatif dan mudah dipahami.
• Setelah menjawab pertanyaan teknis, arahkan secara halus ke sesi privat bersama Kang Lintang untuk dibedah berdasarkan bisnis user.
• Tekankan bahwa kelas privat membantu pemula memahami alasan iklan berjalan atau tidak, bukan hanya mengetahui tombolnya.
• Jawab keberatan dengan empati, tanpa memaksa.
• Jika user tertarik mendaftar, arahkan ke WhatsApp https://wa.me/6281234558399
`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  if (!process.env.DEEPSEEK_API_KEY) return res.status(503).json({ message: PREVIEW_MESSAGE })

  const { messages = [], lang = 'id', isFirstUserMessage = false } = req.body || {}
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message?.role === 'user' && typeof message.content === 'string')
    ?.content.trim()

  if (!latestUserMessage) {
    return res.status(400).json({ message: 'Please enter a message for Akari.' })
  }

  const languageRule =
    lang === 'en'
      ? 'Reply in clear, friendly English.'
      : 'Jawab dalam Bahasa Indonesia yang akrab, ramah, dan jelas.'

  try {
    const akariSystemPrompt = `${SYSTEM_PROMPT}\n${languageRule}\nConversation state: ${isFirstUserMessage ? 'This is the first user question, but the frontend greeting has already been shown. Answer directly without another greeting.' : 'This is a follow-up question. Answer directly without any greeting or repeated introduction.'}`

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: akariSystemPrompt },
          { role: 'user', content: latestUserMessage },
        ],
        max_tokens: 700,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('DeepSeek API error', response.status, errorText)
      return res.status(500).json({ message: 'Akari is temporarily unavailable. Please try again or contact WhatsApp.' })
    }

    const data = await response.json()
    const message = data.choices?.[0]?.message?.content?.trim()

    return res.status(200).json({ message: message || 'Please contact us on WhatsApp.' })
  } catch (error) {
    console.error('DeepSeek request failed:', error)
    return res.status(500).json({ message: 'Akari is temporarily unavailable. Please try again or contact WhatsApp.' })
  }
}
