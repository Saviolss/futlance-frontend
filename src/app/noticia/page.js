import NoticiasClient from "./client"
import { HeaderNoticias } from "../componentes/cabeçalho/header"
import Background from "@/app/home/style"
import Footer from "@/app/componentes/footer/footer"
import { api } from "@/app/servidor/api"
import AdcashBanner from "../componentes/anuncio/anuncioBody"

export const metadata = {
  title: "Notícias de Futebol em Tempo Real - Futlance",
  description: "Fique por dentro das últimas notícias, análises, bastidores, transferências e destaques do mundo do futebol, tudo atualizado em tempo real.",
  canonical: "https://www.futlance.com/noticia",
  keywords: "notícias de futebol, análises de futebol, bastidores do futebol, transferências de jogadores, destaques do futebol, notícias de última hora, futebol nacional, futebol internacional",
  openGraph: {
    title: "Notícias de Futebol em Tempo Real - Futlance",
    description: "Fique por dentro das últimas notícias, análises, bastidores, transferências e destaques do mundo do futebol, tudo atualizado em tempo real.",
    url: "https://www.futlance.com/noticia",
    siteName: "Futlance",
  }
}

export const dynamic = "force-dynamic"

async function carregarNoticias() {

  try {

    const response = await api.get("/home/noticias")

    return response.data.widgets || []

  } catch (e) {

    console.error("Erro notícias:", e)

    return []
  }
}

export default async function Page() {

  const widgets = await carregarNoticias()

  return (
    <Background>

      <HeaderNoticias />
      <AdcashBanner />
      {/* HERO */}

      <section
        className="
          max-w-5xl
          mx-auto
          px-6
          py-8
          mt-8
          rounded-3xl
          border
          border-orange-400/20
          bg-linear-to-br
          from-[#0b0f1a]
          via-[#0f172a]
          to-[#020617]
          shadow-[0_0_25px_rgba(255,165,0,0.08)]
          backdrop-blur-md
          text-center
        "
      >

        <div className="w-full h-px mb-6 bg-linear-to-r from-transparent via-orange-400/50 to-transparent" />

        <h1
          className="
            text-2xl
            md:text-4xl
            font-black
            text-white
            mb-4
          "
        >
          Notícias de Futebol em Tempo Real
        </h1>

        <p
          className="
            text-sm
            md:text-base
            text-zinc-300
            leading-7
            max-w-3xl
            mx-auto
          "
        >
          Fique por dentro das últimas notícias, análises,
          bastidores, transferências e destaques do mundo
          do futebol, tudo atualizado em tempo real.
        </p>

      </section>

      <NoticiasClient widgets={widgets} />

      {/* SEO */}

      <section
        className="
          max-w-5xl
          mx-auto
          px-6
          py-8
          mt-10
          mb-10
          rounded-3xl
          border
          border-orange-400/20
          bg-linear-to-br
          from-[#0b0f1a]
          via-[#0f172a]
          to-[#020617]
          shadow-[0_0_25px_rgba(255,165,0,0.08)]
          backdrop-blur-md
        "
      >

        <div className="w-full h-px mb-6 bg-linear-to-r from-transparent via-orange-400/50 to-transparent" />

        <h2
          className="
            text-2xl
            md:text-3xl
            font-black
            text-white
            mb-5
          "
        >
          Acompanhe as notícias mais recentes do futebol
        </h2>

        <div
          className="
            text-zinc-300
            text-sm
            md:text-base
            leading-7
            space-y-5
          "
        >

          <p>
            O <span className="text-orange-400 font-semibold">Futlance</span>
            {" "} mantém você informado sobre os
            acontecimentos mais importantes do futebol
            nacional e internacional.
          </p>

          <p>
            Acompanhe notícias sobre transferências,
            lesões, resultados, escalações, mercado da
            bola, competições nacionais, torneios
            internacionais e muito mais.
          </p>

          <p>
            Nossa cobertura reúne as principais informações
            para que você fique atualizado sobre tudo o que
            acontece no universo do futebol em um único lugar.
          </p>

        </div>

      </section>

      <Footer />

    </Background>
  )
}