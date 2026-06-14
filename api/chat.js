/* global process */

const PRODUCT_CONTEXT = `
Bimbingan.com is a private Meta Ads learning service with Kang Lintang.
Core positioning: Offline Private Meta Ads 1-on-1, one mentor and one student.
Students learn account setup, campaign/ad set/ads structure, objectives, simple Scalev or WordPress landing pages, ad creatives, Meta Pixel integration, run an ad with around IDR 50,000 of their own budget, read results, understand CTR/CPC/CPM/CPL/leads/cost per result, and receive strategy consultation.
Mentor: Kang Lintang, a digital marketing practitioner experienced in digital ads, landing pages, and ad data.
Packages:
A Focus Class Cimahi: IDR 899,000, 5-6 hours, at Cimahi office, beginner-friendly, one student, snack box and drink, free consultation for one year during working days/hours.
B Home Visit Bandung: IDR 1,500,000, 5-6 hours, mentor visits within Greater Bandung, one student, free consultation for one year during working days/hours.
C Private Mentor Pro outside Greater Bandung: Greater Jakarta IDR 3,500,000; Java IDR 7,500,000; Sumatra IDR 10,000,000; Kalimantan & Sulawesi IDR 15,000,000; Bali & Nusa Tenggara IDR 19,000,000; Papua IDR 27,000,000. Student covers return ticket and hotel. Free consultation for one year during working days/hours.
D Team Boost Class: negotiated price, 5-6 hours, maximum 10 people, for teams/institutions/companies, free consultation for one year during working days/hours.
Online Class 1-on-1: three Zoom sessions, two hours each, for out-of-town students who prefer online.
Registration and further consultation: https://wa.me/6281234558399
`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ message: 'Akari is currently in preview mode. Please contact WhatsApp for full assistance.' })

  const { messages = [], lang = 'id' } = req.body || {}
  const languageRule = lang === 'en' ? 'Reply in clear, friendly English.' : 'Jawab dalam Bahasa Indonesia yang akrab, santai, dan jelas.'

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: `${PRODUCT_CONTEXT}\nYou are Akari, the friendly virtual assistant for Bimbingan.com.\n${languageRule}\nBe warm, clear, concise, and conversational. Explain the private offline 1-on-1 program, prices, duration, locations, facilities, who it suits, and registration accurately. Handle objections gently, never invent details, and softly guide interested users to WhatsApp 081234558399.`,
        messages: messages.slice(-8).map(({ role, content }) => ({ role, content })),
      }),
    })
    if (!response.ok) throw new Error(`Anthropic error: ${response.status}`)
    const data = await response.json()
    return res.status(200).json({ message: data.content?.[0]?.text || 'Please contact us on WhatsApp.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'AI service is temporarily unavailable.' })
  }
}
