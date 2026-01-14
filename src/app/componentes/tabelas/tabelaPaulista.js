"use client"

import { useEffect, useState } from "react"
import { api } from "@/app/servidor/api.js"
/* ===========================
   Skeleton Row
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

/* ===========================
   Main Component
=========================== */
export default function TabelaPaulista() {
  const [tabela, setTabela] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarTabela() {
      try {
        setLoading(true)
        const res = await api.get("/tabela/paulista")
        setTabela(res.data)
      } catch (error) {
        console.error("Erro ao carregar tabela:", error)
      } finally {
        setLoading(false)
      }
    }

    carregarTabela()
  }, [])

  const showSkeleton = loading || tabela.length === 0

  const getZona = (posicao) => {
    if (posicao <= 8) return "border-l-4 border-sky-500"
    if (posicao >= 15) return "border-l-4 border-red-500"
    return ""
  }

  return (
    <section className="w-full mx-auto px-6 md:w-3/4">
      <h3 className="text-3xl md:text-5xl font-light text-center mt-10 mb-5 text-white">
        Tabela do Paulista
      </h3>

      <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b0f1a]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#0f172a] to-[#020617] text-zinc-400">
                <th className="px-3 py-4 text-left">#</th>
                <th className="px-3 py-4 text-left">Clube</th>
                <th className="px-3 py-4 text-center text-white font-semibold">P</th>
                <th className="hidden sm:table-cell px-3 py-4 text-center">J</th>
                <th className="hidden md:table-cell px-3 py-4 text-center">V</th>
                <th className="hidden md:table-cell px-3 py-4 text-center">E</th>
                <th className="hidden md:table-cell px-3 py-4 text-center">D</th>
                <th className="hidden sm:table-cell px-3 py-4 text-center">GP</th>
                <th className="hidden sm:table-cell px-3 py-4 text-center">GC</th>
                <th className="hidden sm:table-cell px-3 py-4 text-center">SG</th>
              </tr>
            </thead>
            <tbody>
              {showSkeleton
                ? Array.from({ length: 20 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
                : tabela.map((time) => (
                  <tr
                    key={time.id}
                    className={`border-t border-white/5 hover:bg-white/5 transition ${getZona(
                      time.posicao
                    )}`}
                  >
                    {/* POSIÇÃO */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 text-zinc-300">
                      {time.posicao}
                    </td>

                    {/* CLUBE */}
                    <td className="px-1 py-2 sm:px-3 sm:py-3 flex items-center gap-2 sm:gap-1">
                      <img
                        src={time.escudo}
                        alt={time.nome}
                        className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                      />
                      <span className="text-white font-medium whitespace-nowrap">
                        {time.nome}
                      </span>
                    </td>

                    {/* PONTOS */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 text-center font-semibold text-white">
                      {time.pontos}
                    </td>

                    {/* JOGOS */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 text-center text-zinc-300">
                      {time.jogos}
                    </td>

                    {/* VITÓRIAS */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 text-center text-zinc-300">
                      {time.vitorias}
                    </td>

                    {/* EMPATES */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 text-center text-zinc-300">
                      {time.empates}
                    </td>

                    {/* DERROTAS */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 text-center text-zinc-300">
                      {time.derrotas}
                    </td>

                    {/* GOLS PRÓ */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 text-center text-zinc-300">
                      {time.golsPro}
                    </td>

                    {/* GOLS CONTRA */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 text-center text-zinc-300">
                      {time.golsContra}
                    </td>

                    {/* SALDO DE GOLS */}
                    <td
                      className={`px-2 py-2 sm:px-3 sm:py-3 text-center font-medium ${time.saldoGols >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                        }`}
                    >
                      {time.saldoGols}
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap gap-4 px-4 py-3 text-xs text-zinc-400 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-1 bg-sky-500 rounded" />
            <p>Classificação para a próxima fase</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-1 bg-red-500 rounded" />
            <p>Rebaixamento</p>
          </div>
        </div>
      </div>
    </section>
  )
}
