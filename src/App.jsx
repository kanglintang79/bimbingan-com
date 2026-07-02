import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import AiChat from './components/AiChat'
import Hero from './sections/Hero'
import Summary from './sections/Summary'
import Audience from './sections/Audience'
import Curriculum from './sections/Curriculum'
import Pricing from './sections/Pricing'
import PrivateBenefits from './sections/PrivateBenefits'
import Mentor from './sections/Mentor'
import WhatsAppCta from './sections/WhatsAppCta'
import Footer from './sections/Footer'
import { copy } from './data/content'
import BookingPage from './pages/BookingPage'
import NotFoundPage from './pages/NotFoundPage'
import { initMetaPixel, trackPageView } from './lib/metaPixel'

function HomePage({ lang, setLang, t }) {
  return (
    <>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Summary t={t} />
        <Audience t={t} />
        <Curriculum lang={lang} t={t} />
        <Pricing lang={lang} t={t} />
        <PrivateBenefits t={t} />
        <Mentor t={t} />
        <WhatsAppCta t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}

function App() {
  const [lang, setLang] = useState('en')
  const t = copy[lang]
  const location = useLocation()
  const lastTrackedLocation = useRef('')

  useEffect(() => {
    const locationKey = `${location.pathname}${location.search}`
    if (lastTrackedLocation.current === locationKey) return

    initMetaPixel()
    trackPageView()
    lastTrackedLocation.current = locationKey
  }, [location.pathname, location.search])

  return (
    <div className="min-h-screen overflow-hidden bg-white text-ink">
      <Routes>
        <Route path="/" element={<HomePage lang={lang} setLang={setLang} t={t} />} />
        <Route path="/booking/:slug" element={<BookingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <AiChat lang={lang} t={t} />
    </div>
  )
}

export default App
