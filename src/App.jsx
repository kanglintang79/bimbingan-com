import { useState } from 'react'
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

function App() {
  const [lang, setLang] = useState('en')
  const t = copy[lang]

  return (
    <div className="overflow-hidden bg-white text-ink">
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
      <AiChat lang={lang} t={t} />
    </div>
  )
}

export default App
