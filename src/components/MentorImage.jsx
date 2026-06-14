import { useState } from 'react'
import { mentorImage } from '../data/content'

export default function MentorImage({ className = '', imageClassName = '', children }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`relative isolate overflow-hidden rounded-3xl border border-black/10 bg-ink shadow-[0_16px_40px_rgba(11,15,20,.10)] ${className}`}
    >
      <div className="absolute inset-0 page-grid opacity-15" />
      {!failed && (
        <img
          src={mentorImage}
          alt="Kang Lintang"
          className={`relative h-full w-full object-cover object-top ${imageClassName}`}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_38%,rgba(20,184,166,.16),transparent_38%),#0B0F14]">
          <div className="grid size-24 place-items-center rounded-full border border-cyan-300/25 bg-white/[.04] text-4xl font-extrabold text-cyan-300 shadow-[0_0_60px_rgba(0,209,255,.12)]">
            KL
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
