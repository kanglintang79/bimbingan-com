import { useEffect, useState } from 'react'
import { whatsappUrl } from '../data/content'

export default function AiChat({ lang, t }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const showAkari = () => setOpen(true)
    window.addEventListener('open-akari', showAkari)
    return () => window.removeEventListener('open-akari', showAkari)
  }, [])

  async function sendMessage(text) {
    const clean = text.trim()
    if (!clean || loading) return
    const next = [...messages, { role: 'user', content: clean }]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang }),
      })
      const data = await response.json()
      if (!response.ok && !data.message) throw new Error('Chat unavailable')
      setMessages([...next, { role: 'assistant', content: data.message || t.chat.fallback }])
    } catch {
      setMessages([...next, { role: 'assistant', content: t.chat.fallback }])
    } finally {
      setLoading(false)
    }
  }

  return <div className="fixed bottom-4 right-4 z-[60] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
    {open && <section id="akari" className="flex h-[min(520px,calc(100vh-6.5rem))] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_70px_rgba(11,15,20,.14)]">
      <header className="flex items-center justify-between border-b border-line bg-ink p-4 text-white">
        <div className="flex items-center gap-3"><RobotIcon /><div><p className="text-xs font-semibold">{t.chat.title}</p><p className="mt-0.5 font-mono text-[7px] uppercase tracking-widest text-white/45">{t.chat.status}</p></div></div>
        <button onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-full border border-white/10 text-white/60 hover:text-white" aria-label="Close chat">×</button>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto bg-mint p-4">
        <Bubble>{t.chat.welcome}</Bubble>
        {messages.map((message, i) => <Bubble key={`${message.role}-${i}`} user={message.role === 'user'}>{message.content}</Bubble>)}
        {loading && <Bubble>•••</Bubble>}
        {messages.length === 0 && <div className="flex flex-wrap gap-2 pt-2">{t.chat.prompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)} className="rounded-full border border-line bg-white px-3 py-2 text-left font-mono text-[10px] font-medium leading-4 text-muted hover:border-teal/30 hover:text-teal">{prompt}</button>)}</div>}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(input) }} className="border-t border-line bg-white p-3">
        <div className="flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.chat.placeholder} className="min-w-0 flex-1 rounded-full border border-line px-4 text-xs outline-none focus:border-teal" /><button disabled={loading} className="rounded-full bg-ink px-4 py-3 text-[10px] font-semibold text-white hover:bg-teal disabled:opacity-50">{t.chat.send}</button></div>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-2 block text-center font-mono text-[9px] font-semibold uppercase tracking-widest text-teal">{t.chat.whatsapp} →</a>
      </form>
    </section>}
    <button onClick={() => setOpen(!open)} className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-ink p-2 pr-3.5 text-white shadow-[0_14px_34px_rgba(11,15,20,.16)] transition hover:bg-teal">
      <RobotIcon compact /><span className="max-w-[145px] text-left font-mono text-[9px] font-medium leading-4">{t.chat.label}</span>
    </button>
  </div>
}

function Bubble({ children, user = false }) {
  return <div className={`min-w-0 max-w-[92%] overflow-hidden rounded-2xl px-3.5 py-3 text-xs leading-5 sm:max-w-[88%] ${user ? 'ml-auto rounded-br-md bg-ink text-white' : 'rounded-bl-md border border-line bg-white text-muted'}`}>
    {user ? <p className="whitespace-pre-wrap break-words">{children}</p> : <FormattedMessage text={children} />}
  </div>
}

function RobotIcon({ compact = false }) {
  return <span className={`grid shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-teal ${compact ? 'size-8' : 'size-9'}`}><svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true"><path d="M12 5V2m-6 8h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Zm-2 5H2m20 0h-2M9 14v1m6-1v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
}

function FormattedMessage({ text }) {
  const cleanText = String(text)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1: $2')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')

  const paragraphs = cleanText.split(/\n\s*\n/).filter(Boolean)

  return <div className="min-w-0 space-y-3 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
    {paragraphs.map((paragraph, index) => <p key={`${paragraph.slice(0, 24)}-${index}`}>
      {linkify(paragraph)}
    </p>)}
  </div>
}

function linkify(text) {
  const urlPattern = /(https?:\/\/[^\s]+)/g

  return text.split(urlPattern).map((part, index) => {
    if (!part.match(/^https?:\/\//)) return part

    const trailing = part.match(/[),.;!?]+$/)?.[0] || ''
    const url = trailing ? part.slice(0, -trailing.length) : part

    return <span key={`${url}-${index}`}>
      <a href={url} target="_blank" rel="noreferrer" className="font-medium text-teal underline decoration-teal/35 underline-offset-2 transition hover:decoration-teal">{url}</a>
      {trailing}
    </span>
  })
}
