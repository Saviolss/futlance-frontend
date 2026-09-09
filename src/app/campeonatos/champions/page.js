import Background from "@/app/home/style"
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header"
import CampeonatoClient from "../client"
import Footer from "@/app/componentes/footer/footer"
import AdcashBanner from "@/app/componentes/anuncio/anuncioBody"  

export const metadata = {
  title: "Champions League - Futlance",
  description: "Acompanhe a tabela, jogos, agenda e artilheiros da Champions League.",
  keywords: "champions league, futebol, notícias de futebol, resultados de futebol",
  openGraph: {
    title: "UEFA Champions League - Futlance",
    description: "Acompanhe a tabela, jogos, agenda e artilheiros da Champions League.",
    url: "https://www.futlance.com/campeonatos/champions",
    siteName: "Futlance",
  }
}

export default function ChampionsLeague() {
  return (
    <Background>
      <HeaderCampeonato />
      <AdcashBanner />
      <section className="max-w-5xl mx-auto px-6 mt-5 text-xs text-white text-center">
        <h1 className="text-base font-medium">
          Champions League
        </h1>
        <p>
          Acompanhe tabela, jogos, agenda e artilheiros.
        </p>
      </section>

      {/* 👇 CLIENT COMPONENT */}
      <CampeonatoClient endpoint="/campeonatos/champions" />

      <section
        className="
    max-w-5xl
    mx-auto
    px-6
    py-8
    mt-10
    rounded-3xl
    border
    border-orange-400/20
    bg-linear-to-br
    from-[#0b0f1a]
    via-[#0f172a]
    to-[#020617]
    shadow-[0_0_25px_rgba(255,165,0,0.08)]
    backdrop-blur-md
    text-zinc-300
  "
      >

        {/* LINHA TOPO */}

        <div className="w-full h-px mb-6 bg-linear-to-r from-transparent via-orange-400/50 to-transparent" />

        {/* TÍTULO */}

        <h2
          className="
      text-2xl
      md:text-3xl
      font-black
      text-white
      mb-6
      leading-tight
    "
        >
          Como funciona a Champions League
        </h2>

        {/* TEXTO */}

        <div
          className="
      space-y-5
      text-md
      font-medium
      md:text-base
      leading-7
      md:leading-8
      text-zinc-300
    "
        >

          <p>
            A Champions League é a principal competição de futebol do continente europeu.
            O torneio reúne 32 clubes que disputam partidas em sistema de pontos corridos
            ao longo da temporada.
          </p>

          <p>
            Cada equipe enfrenta os outros clubes em jogos de ida e volta.
            Ao final das 38 rodadas, o time com mais pontos conquistados
            é declarado campeão da Champions League.
          </p>

          <p>
            No <span className="text-orange-400 font-semibold">Futlance</span>
            {" "}você acompanha jogos ao vivo, classificação atualizada,
            artilharia, agenda de partidas e resultados em tempo real da Champions League.
          </p>

        </div>

      </section>

      <Footer />
    </Background>
  )
}