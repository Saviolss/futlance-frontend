"use client"

import { useTranslation } from "react-i18next"

/* ===========================
   Skeleton
=========================== */
function SkeletonRow() {
  return (
    <tr className="border-t border-white/5 animate-pulse">
      <td className="px-3 py-3">
        <div className="h-4 w-4 bg-white/10 rounded" />
      </td>

      <td className="px-3 py-3 flex items-center gap-3">
        <div className="h-6 w-6 bg-white/10 rounded-full" />
        <div className="h-4 w-28 bg-white/10 rounded" />
      </td>

      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-3 py-3 text-center">
          <div className="mx-auto h-4 w-6 bg-white/10 rounded" />
        </td>
      ))}
    </tr>
  )
}

export default function RenderTabela({ dados = [], titulo = "" }) {
  const { t } = useTranslation()

  const loading = !dados || dados.length === 0

  const getZona = (posicao) => {
    if (!posicao) return ""

    if (posicao <= 4) return "border-l-4 border-sky-500"
    if (posicao === 5) return "border-l-4 border-green-500"
    if (posicao <= 11) return "border-l-4 border-amber-400"
    if (posicao >= 17) return "border-l-4 border-red-500"

    return ""
  }

  return (
    <section className="w-full mx-auto px-6 md:w-3/4">
      <h3 className="text-3xl md:text-5xl font-light text-center mt-10 mb-5 text-white">
        {t("tabela")} {titulo}
      </h3>

      <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b0f1a]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] font-sans text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#0f172a] to-[#020617] text-zinc-400">
                <th className="px-3 py-4 text-left">#</th>
                <th className="px-3 py-4 text-left">{t("clube")}</th>
                <th className="px-3 py-4 text-center text-white font-semibold">P</th>
                <th className="px-3 py-4 text-center text-white font-semibold">J</th>
                <th className="px-3 py-4 text-center text-white font-semibold">V</th>
                <th className="px-3 py-4 text-center text-white font-semibold">E</th>
                <th className="px-3 py-4 text-center text-white font-semibold">D</th>
                <th className="px-3 py-4 text-center text-white font-semibold">GP</th>
                <th className="px-3 py-4 text-center text-white font-semibold">GC</th>
                <th className="px-3 py-4 text-center text-white font-semibold">SG</th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 20 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
                : dados.map((time, index) => {
                  const posicao = time.posicao || index + 1
                  const saldo = Number(time.saldo_gols ?? 0)

                  return (
                    <tr
                      key={time.time_id || time.nome || index}
                      className={`border-t border-white/5 ${getZona(posicao)}`}
                    >
                      <td className="px-3 py-3 text-zinc-300">
                        {posicao}
                      </td>

                      <td className="px-0 py-3 flex items-center gap-2">
                        {time.escudo && (
                          <img
                            src={time.escudo}
                            alt={time.nome}
                            className="h-6 w-6"
                          />
                        )}

                        <span className="text-white">
                          <h1 className="font-medium text-white">
                            {time.nome}
                          </h1>
                        </span>
                      </td>

                      <td className="px-3 py-3 text-center font-semibold text-white">
                        {time.pontos ?? 0}
                      </td>

                      <td className="px-3 py-3 text-center">
                        {time.jogos ?? 0}
                      </td>

                      <td className="px-3 py-3 text-center">
                        {time.vitorias ?? 0}
                      </td>

                      <td className="px-3 py-3 text-center">
                        {time.empates ?? 0}
                      </td>

                      <td className="px-3 py-3 text-center">
                        {time.derrotas ?? 0}
                      </td>

                      <td className="px-3 py-3 text-center">
                        {time.gols_pro ?? 0}
                      </td>

                      <td className="px-3 py-3 text-center">
                        {time.gols_contra ?? 0}
                      </td>

                      <td
                        className={`px-3 py-3 text-center font-medium ${saldo >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                          }`}
                      >
                        {saldo}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}