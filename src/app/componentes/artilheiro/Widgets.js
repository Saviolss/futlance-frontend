'use client'

import { useTranslation } from "react-i18next"
import { api } from "@/app/servidor/api"
import { useEffect, useState } from "react"

export default function ArtilheirosWidget({
  dados = [],
  titulo,
  endpoint = null
}) {
  const { t } = useTranslation()

  function prepararLista(lista) {
    return [...lista]
      .filter(j => j.gols > 0)
      .sort((a, b) => b.gols - a.gols) // maiores goleadores primeiro
      .slice(0, 10) // top 10
  }

  const [artilheiros, setArtilheiros] = useState(
    Array.isArray(dados)
      ? prepararLista(dados)
      : Array.isArray(dados?.dados)
        ? prepararLista(dados.dados)
        : []
  )

  const [loading, setLoading] = useState(
    !dados.length && !!endpoint
  )

  useEffect(() => {
    if (!endpoint) {
      setLoading(false)
      return
    }

    async function carregar() {
      try {
        const res = await api.get(endpoint)

        const lista = Array.isArray(res.data)
          ? res.data
          : res.data?.dados || []

        setArtilheiros(prepararLista(lista))

      } catch (err) {
        setArtilheiros([])
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [endpoint])

  if (loading) return null

  if (!artilheiros.length) {
    return (
      <p className="text-center text-2xl font-light mt-6 mb-5 md:text-3xl">
        {t("semArtilheiros")}
      </p>
    )
  }

  return (
    <section
      className="w-full mx-auto px-6 md:w-3/4 mt-12"
      id="artilheiros"
    >
      <h3 className="text-3xl md:text-5xl font-light text-center mb-5 text-white">
        {t("artilheiro")} {titulo}
      </h3>

      <div className="w-full rounded-xl border border-white/10 bg-[#0b0f1a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#0f172a] to-[#020617] text-zinc-400">
                <th className="px-3 py-4 text-left">#</th>
                <th className="px-3 py-4 text-left">
                  {t("jogador")}
                </th>
                <th className="px-3 py-4 text-left">
                  {t("clube")}
                </th>
                <th className="px-3 py-4 text-center text-white font-semibold">
                  G
                </th>
              </tr>
            </thead>

            <tbody>
              {artilheiros.map((jogador, index) => (
                <tr
                  key={`${jogador.jogador_id}-${index}`}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-3 py-3 text-zinc-300">
                    {index + 1}
                  </td>

                  <td className="px-3 py-3 text-white font-medium whitespace-nowrap">
                    {jogador.nome}
                  </td>

                  <td className="px-3 py-3 flex items-center gap-2 whitespace-nowrap">
                    {jogador.clube?.escudo && (
                      <img
                        src={jogador.clube.escudo}
                        alt={jogador.clube.nome}
                        className="h-5 w-5 object-contain"
                      />
                    )}

                    <span className="text-zinc-300">
                      {jogador.clube?.nome}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-center font-semibold text-white">
                    {jogador.gols}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </section>
  )
}