import Background from "@/app/home/style"
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header"
import CampeonatoClient from "../client"
import Footer from "@/app/componentes/footer/footer"
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
      <Footer />
    </Background>
  )
}