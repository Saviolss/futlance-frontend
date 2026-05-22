import Background from "@/app/home/style"
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header"
import CampeonatoClient from "../client"
import Footer from "@/app/componentes/footer/footer"
export default function CampeonatoCopaMundo() {
  return (
    <Background>
      <HeaderCampeonato />

      <section className="max-w-5xl mx-auto px-6 mt-5 text-xs text-white text-center">
        <h1 className="text-base font-medium">
          Campeonato Copa Mundo
        </h1>
        <p>
          Acompanhe grupos, jogos, agenda e artilheiros.
        </p>
      </section>

      {/* 👇 CLIENT COMPONENT */}
      <CampeonatoClient endpoint="/campeonatos/copamundo" />

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

        <div className="w-full h-px mb-6 bg-linear-to-r from-transparent via-orange-400/50 to-transparent" />

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
          Como funciona a Copa do Mundo
        </h2>

        <div
          className="
      space-y-5
      text-sm
      md:text-base
      leading-7
      md:leading-8
      text-zinc-300
    "
        >

          <p>
            A Copa do Mundo é a principal competição de seleções do futebol mundial.
            O torneio é organizado pela FIFA e reúne as melhores seleções de diferentes países.
          </p>

          <p>
            As equipes garantem classificação através das eliminatórias continentais,
            disputadas antes do início da competição.
          </p>

          <p>
            A Copa do Mundo é dividida em fase de grupos e mata-mata.
            Na primeira fase, as seleções disputam partidas dentro dos grupos
            para tentar avançar às oitavas de final.
          </p>

          <p>
            Nas fases eliminatórias, os confrontos acontecem em jogo único
            até a definição das seleções finalistas e do campeão mundial.
          </p>

          <p>
            No <span className="text-orange-400 font-semibold">Futlance</span>
            {" "}você acompanha jogos ao vivo, tabela completa,
            classificação dos grupos, agenda das partidas e estatísticas da Copa do Mundo.
          </p>

        </div>

      </section>

      <Footer />
    </Background>
  )
}