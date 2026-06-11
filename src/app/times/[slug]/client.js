"use client"

import { useEffect, useState } from "react"
import { api } from "@/app/servidor/api"
import { useTranslation } from "react-i18next"
export default function TimeClient({ slug }) {
  const { t } = useTranslation()

  const [time, setTime] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function carregar() {

      if (!slug) return

      try {

        const response = await api.get(`/api/times/${slug}`)

        setTime(response.data)

      } catch (error) {

        console.error("Erro ao carregar seleção:", error)

        setTime(null)

      } finally {

        setLoading(false)

      }
    }

    carregar()

  }, [slug])

  if (loading) {

    return (
      <div className="text-white text-center py-16">
        Carregando...
      </div>
    )
  }

  if (!time) {

    return (
      <div className="text-white text-center py-16">
        Seleção não encontrada
      </div>
    )
  }

  return (

    <main
      className="
        max-w-7xl
        mx-auto
        px-4
        md:px-6
        py-8
        space-y-10
      "
    >

      {/* HERO */}

      <section
        id="hero"
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-orange-400/20
          bg-linear-to-br
          from-[#0b0f1a]
          via-[#0f172a]
          to-[#020617]
          shadow-[0_0_25px_rgba(255,165,0,0.08)]
          backdrop-blur-md
          p-8
          md:p-12
          text-center
        "
      >

        <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-orange-400 to-transparent" />

        <img
          src={time.escudo}
          alt={time.nomePopular}
          className="
            w-24
            h-24
            md:w-32
            md:h-32
            object-contain
            mx-auto
          "
        />

        <h1
          className="
            text-3xl
            md:text-5xl
            font-black
            text-white
            mt-5
          "
        >
          {time.nomePopular}
        </h1>

        <p
          className="
            text-zinc-400
            mt-3
            text-sm
            md:text-base
          "
        >
          {t("tecnico")}: {time.tecnicoNome}
        </p>

        <p
          className="
            text-zinc-300
            mt-6
            max-w-3xl
            mx-auto
            text-sm
            md:text-base
            leading-7
          "
        >
          {/* {`${time.nomePopular} disputa a Copa do Mundo 2026. A seleção possui idade média de ${time.idadeMedia} anos, altura média de ${time.alturaMedia} cm e tem ${time.camisa10} como camisa 10.`} */}
          {t("teamSeoDescription", {
            team: time.nomePopular,
            age: time.idadeMedia,
            height: time.alturaMedia,
            player: time.camisa10
          })}
        </p>

      </section>

      {/* ESTATÍSTICAS */}

      <section id="estatisticas">
        <h3 className="text-zinc-400 uppercase text-md tracking-wider mb-4 mx-auto w-max">
          {t("estatisticas")}
        </h3>

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >


          <Card
            titulo={t("idademedia")}
            valor={time.idadeMedia}
          />

          <Card
            titulo={t("alturamedia")}
            valor={`${time.alturaMedia} cm`}
          />

          <Card
            titulo={t("camisa10")}
            valor={time.camisa10}
            destaque
          />

          <Card
            titulo={t("jogadoresNoPais")}
            valor={time.jogadoresNoPais}
          />

        </div>

      </section>

      {/* PRÓXIMOS JOGOS */}

      <section id="jogos">
        <h3 className="text-zinc-400 uppercase text-md tracking-wider mb-4 mx-auto w-max">
          {t("jogos")}
        </h3>

        <div className="grid gap-4">

          {time.proximasPartidas?.map((partida) => (

            <div
              key={partida.id}
              className="
                rounded-2xl
                border
                border-orange-400/15
                bg-linear-to-br
                from-[#0b0f1a]
                via-[#0f172a]
                to-[#020617]
                p-5
                shadow-[0_0_20px_rgba(255,165,0,0.05)]
              "
            >

              <div
                className="
                  text-white
                  font-semibold
                  text-base
                  md:text-lg
                "
              >
                {partida.mandante} x {partida.visitante}
              </div>

              <div
                className="
                  text-zinc-400
                  text-sm
                  mt-2
                "
              >
                {partida.data} • {partida.hora}
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ELENCO */}

      <section
        id="elenco"
        className="
          rounded-3xl
          border
          border-orange-400/20
          bg-linear-to-br
          from-[#0b0f1a]
          via-[#0f172a]
          to-[#020617]
          shadow-[0_0_25px_rgba(255,165,0,0.08)]
          overflow-hidden
        "
      >

        <div className="h-[2px] w-full bg-linear-to-r from-transparent via-orange-400 to-transparent" />

        <div

          className="
            px-6
            py-5
            border-b
            border-white/10
          "
        >

          <h2
            className="
              text-2xl
              md:text-4xl
              font-black
              text-white
            "
          >
            {t("elenco")}
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead
              className="
                bg-white/[0.03]
                text-zinc-400
                uppercase
                text-xs
                tracking-wider
              "
            >

              <tr>

                <th className="px-4 py-4 text-left">
                  #
                </th>

                <th className="px-4 py-4 text-left">
                  {t("nome")}
                </th>

                <th className="px-4 py-4 text-left">
                  {t("posicao")}
                </th>

                <th className="px-4 py-4 text-left">
                  {t("clube")}
                </th>

              </tr>

            </thead>

            <tbody>

              {time.elenco?.map((jogador) => (

                <tr
                  key={jogador.id}
                  className="
                    border-t
                    border-white/5
                    hover:bg-white/[0.03]
                    transition-colors
                  "
                >

                  <td className="px-4 py-4 text-white">
                    {jogador.numeroCamisa}
                  </td>

                  <td className="px-4 py-4 text-white font-medium">
                    {jogador.nome}
                  </td>

                  <td className="px-4 py-4 text-zinc-300">
                    {jogador.posicao}
                  </td>

                  <td className="px-4 py-4 text-zinc-300">
                    {jogador.clube}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  )
}

function Card({ titulo, valor, destaque = false }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-orange-400/20
        bg-linear-to-br
        from-[#0b0f1a]
        via-[#0f172a]
        to-[#020617]
        shadow-[0_0_20px_rgba(255,165,0,0.06)]
        p-5
        text-center
      "
    >
      <div
        className="
          text-zinc-400
          text-xs
          uppercase
          tracking-wider
        "
      >
        {titulo}
      </div>

      {destaque ? (
        <h1
          className="
            text-white
            text-xl
            md:text-3xl
            font-bold
            mt-3
          "
        >
          <strong className="text-orange-400">{valor}</strong>
        </h1>
      ) : (
        <p
          className="
            text-white
            text-xl
            md:text-3xl
            font-bold
            mt-3
          "
        >
          {valor}
        </p>
      )}
    </div>
  )
}
