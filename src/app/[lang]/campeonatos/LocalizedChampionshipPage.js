import Background from "@/app/home/style"
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header"
import CampeonatoClient from "@/app/campeonatos/client"
import Footer from "@/app/componentes/footer/footer"
import AdcashBanner from "@/app/componentes/anuncio/anuncioBody"
import { getPageContent } from "../localized-content"

export default function LocalizedChampionshipPage({ lang, championship }) {
  const content = getPageContent(lang, championship)
  const endpoint = championship === "brasileiro"
    ? "/campeonatos/brasileiro"
    : "/campeonatos/champions"

  return (
    <Background>
      <HeaderCampeonato />
      <AdcashBanner />
      <section className="max-w-5xl mx-auto px-6 mt-5 text-xs text-white text-center">
        <h1 className="text-base font-medium">{content.heading}</h1>
        <p>{content.intro}</p>
      </section>
      <CampeonatoClient endpoint={endpoint} />
      <section className="max-w-5xl mx-auto px-6 py-8 mt-10 rounded-3xl border border-orange-400/20 bg-linear-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617] shadow-[0_0_25px_rgba(255,165,0,0.08)] backdrop-blur-md text-zinc-300">
        <div className="w-full h-px mb-6 bg-linear-to-r from-transparent via-orange-400/50 to-transparent" />
        <h2 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
          {content.aboutTitle}
        </h2>
        <div className="space-y-5 text-md font-medium md:text-base leading-7 md:leading-8 text-zinc-300">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <Footer />
    </Background>
  )
}
