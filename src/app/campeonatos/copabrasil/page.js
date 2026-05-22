import Background from "@/app/home/style"
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header"
import CampeonatoClient from "../client"
import Footer from "@/app/componentes/footer/footer"
export default function CampeonatoCopaBrasil() {
  return (
    <Background>
      <HeaderCampeonato />

      <section className="max-w-5xl mx-auto px-6 mt-5 text-xs text-white text-center">
        <h1 className="text-base font-medium">
          Campeonato Copa Brasil
        </h1>
        <p>
          Acompanhe tabela, jogos, agenda e artilheiros.
        </p>
      </section>

      {/* 👇 CLIENT COMPONENT */}
      <CampeonatoClient endpoint="/campeonatos/copabrasil" />

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
          Como funciona a Copa do Brasil
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
            A Copa do Brasil é uma das competições mais importantes do futebol brasileiro.
            O torneio reúne clubes de diferentes estados e divisões do país em partidas eliminatórias.
          </p>

          <p>
            O campeonato acontece no formato mata-mata, onde os times disputam
            confrontos de ida e volta nas fases principais da competição.
          </p>

          <p>
            A cada fase, os clubes vencedores avançam até a grande final,
            que define o campeão da temporada.
          </p>

          <p>
            O campeão da Copa do Brasil garante vaga direta na Copa Libertadores,
            além de conquistar uma das premiações mais altas do futebol sul-americano.
          </p>

          <p>
            No <span className="text-orange-400 font-semibold">Futlance</span>
            {" "}você acompanha tabela atualizada, resultados ao vivo,
            próximos jogos e informações completas da Copa do Brasil.
          </p>

        </div>

      </section>


      <Footer />
    </Background>
  )
}