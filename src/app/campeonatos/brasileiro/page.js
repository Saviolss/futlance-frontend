import Background from "@/app/home/style"
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header"
import CampeonatoClient from "../client"
import Footer from "@/app/componentes/footer/footer"
  

export const metadata = {
  title: "Campeonato Brasileiro Série A - Futlance",
  description: "Acompanhe a tabela, jogos, agenda e artilheiros do Campeonato Brasileiro Série A.",
  keywords: "campeonato brasileiro, série a, futebol, notícias de futebol, resultados de futebol",
  openGraph: {
    title: "Campeonato Brasileiro Série A - Futlance",
    description: "Acompanhe a tabela, jogos, agenda e artilheiros do Campeonato Brasileiro Série A.",
    url: "https://www.futlance.com/campeonatos/brasileiro",
    siteName: "Futlance",
  }
}

export default function CampeonatoBrasileiro() {
  return (
    <Background>
      <HeaderCampeonato />

      <section className="max-w-5xl mx-auto px-6 mt-5 text-xs text-white text-center">
        <h1 className="text-base font-medium">
          Campeonato Brasileiro Série A
        </h1>
        <p>
          Acompanhe tabela, jogos, agenda e artilheiros.
        </p>
      </section>

      {/* 👇 CLIENT COMPONENT */}
      <CampeonatoClient endpoint="/campeonatos/brasileiro" />

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
          Como funciona o Campeonato Brasileiro Série A
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
            O Campeonato Brasileiro Série A é a principal competição de futebol do Brasil.
            O torneio reúne 20 clubes que disputam partidas em sistema de pontos corridos
            ao longo da temporada.
          </p>

          <p>
            Cada equipe enfrenta os outros clubes em jogos de ida e volta.
            Ao final das 38 rodadas, o time com mais pontos conquistados
            é declarado campeão brasileiro.
          </p>

          <p>
            Além da disputa pelo título, os clubes também competem por vagas
            em torneios internacionais como a Copa Libertadores e a Copa Sul-Americana.
          </p>

          <p>
            Os quatro últimos colocados na tabela de classificação são rebaixados
            para a Série B do Campeonato Brasileiro da temporada seguinte.
          </p>

          <p>
            No <span className="text-orange-400 font-semibold">Futlance</span>
            {" "}você acompanha jogos ao vivo, classificação atualizada,
            artilharia, agenda de partidas e resultados em tempo real do Brasileirão.
          </p>

        </div>

      </section>

      <Footer />
    </Background>
  )
}