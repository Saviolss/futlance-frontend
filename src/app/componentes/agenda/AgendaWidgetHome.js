"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { api } from "@/app/servidor/api"

export default function AgendaWidgetHome({
  jogos = [],
  dados = null,
  endpoint = null
}) {

  const { t } = useTranslation()

  const [lista, setLista] = useState(
    dados?.length ? dados : jogos
  )

  const [loading, setLoading] = useState(
    !dados && !jogos.length && !!endpoint
  )

  useEffect(() => {

    if (dados?.length) {
      setLista(dados)
      setLoading(false)
      return
    }

    if (jogos.length) {
      setLista(jogos)
      setLoading(false)
      return
    }

    if (!endpoint) {
      setLoading(false)
      return
    }

    async function carregar() {

      try {

        const res = await api.get(endpoint)

        setLista(
          res.data?.[0]?.dados || []
        )

      } catch (err) {

        setLista([])

      } finally {

        setLoading(false)

      }
    }

    carregar()

  }, [dados, jogos, endpoint])

  function isHoje(dataIso) {

    if (!dataIso) return false

    const hoje = new Date()
    const data = new Date(dataIso)

    return (
      hoje.getFullYear() === data.getFullYear() &&
      hoje.getMonth() === data.getMonth() &&
      hoje.getDate() === data.getDate()
    )
  }

  const agora = new Date()

  const jogosFuturos = lista.filter((p) => {

    if (!p.data_iso) return false

    return new Date(p.data_iso) > agora

  })

  function buscarPorPeriodo(dias) {

    return jogosFuturos.filter((p) => {

      const dataJogo = new Date(p.data_iso)

      const diferencaDias =
        (dataJogo - agora) /
        (1000 * 60 * 60 * 24)

      return diferencaDias <= dias

    })
  }

  let periodoUtilizado = 7

  let jogosSelecionados =
    buscarPorPeriodo(7)

  if (!jogosSelecionados.length) {

    jogosSelecionados =
      buscarPorPeriodo(15)

    periodoUtilizado = 15
  }

  if (!jogosSelecionados.length) {

    jogosSelecionados =
      buscarPorPeriodo(30)

    periodoUtilizado = 30
  }

  const jogosOrdenados =
    [...jogosSelecionados].sort(
      (a, b) =>
        new Date(a.data_iso) -
        new Date(b.data_iso)
    )

  if (loading) return null

  if (!jogosOrdenados.length) {

    return (
      <>
        <h2 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">
          Próximos Jogos
        </h2>

        <p className="text-center text-2xl font-light mt-6 mb-5 md:text-3xl">
          Nenhuma partida encontrada.
        </p>
      </>
    )
  }

  return (

    <section
      className="w-full mx-auto px-6 md:w-3/4"
      id="agenda-home"
    >

      <h2 className="text-3xl font-light text-center mt-10 mb-3 md:text-5xl">
        {t("agendadejogos")}
      </h2>


      <div className="flex flex-wrap justify-center gap-6">

        {jogosOrdenados.map((p) => (

          <div
            key={p.partida_id}
            className="
              relative w-full max-w-[320px]
              rounded-xl overflow-hidden
              bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
              border border-orange-400/30
              shadow-[0_0_25px_rgba(255,165,0,0.15)]
              backdrop-blur-md
              text-white
            "
          >

            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

            <div className="flex flex-col items-center px-6 py-6 gap-4">

              <h3 className="text-sm tracking-widest uppercase text-orange-400 font-medium">
                {p.campeonato}
              </h3>

              <div className="flex items-center justify-between w-full">

                <Time time={p.mandante} />

                <span className="text-3xl font-light text-orange-300">
                  :
                </span>

                <Time time={p.visitante} />

              </div>

              <div className="flex gap-4 text-xs text-zinc-400 tracking-wide">

                <span>
                  {isHoje(p.data_iso)
                    ? t("hoje")
                    : p.data}
                </span>

                <span>
                  {p.hora}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

function Time({ time }) {

  if (!time) return null

  return (

    <div className="flex flex-col items-center gap-2 w-1/3">

      {time.escudo && (

        <img
          src={time.escudo}
          alt={time.nome}
          className="w-14 h-14 object-contain"
        />

      )}

      <h3 className="text-xs text-center text-zinc-200">
        {time.nome}
      </h3>

    </div>
  )
}