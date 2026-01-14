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
   Normaliza Carioca
=========================== */
function normalizarTime(item, grupo) {
  return {
    id: item.time.time_id,
    grupo,
    posicao: item.posicao,
    nome: item.time.nome_popular,
    escudo: item.time.escudo,

    pontos: item.pontos,
    jogos: item.jogos,
    vitorias: item.vitorias,
    empates: item.empates,
    derrotas: item.derrotas,

    golsPro: item.gols_pro,
    golsContra: item.gols_contra,
    saldoGols: item.saldo_gols,
  }
}

/* ===========================
   Main Component
=========================== */
export default function TabelaCarioca() {
  const [grupoA, setGrupoA] = useState([])
  const [grupoB, setGrupoB] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarTabela() {
      try {
        setLoading(true)

        const res = await api.get("/tabela/carioca")

        setGrupoA(res.data["grupo-a"] || [])
        setGrupoB(res.data["grupo-b"] || [])
      } catch (error) {
        console.error("Erro ao carregar tabela:", error)
      } finally {
        setLoading(false)
      }
    }

    carregarTabela()
  }, [])

  const showSkeleton = loading

  function renderTabela(grupo, titulo) {
    return (
      <section className="mb-16">
        <h4 className="text-2xl md:text-3xl text-white font-light mb-4">
          {titulo}
        </h4>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0b0f1a]">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#0f172a] to-[#020617] text-zinc-400">
                <th className="px-3 py-4 text-left">#</th>
                <th className="px-3 py-4 text-left">Clube</th>
                <th className="px-3 py-4 text-center text-white font-semibold">P</th>
                <th className="px-3 py-4 text-center">J</th>
                <th className="px-3 py-4 text-center">V</th>
                <th className="px-3 py-4 text-center">E</th>
                <th className="px-3 py-4 text-center">D</th>
                <th className="px-3 py-4 text-center">GP</th>
                <th className="px-3 py-4 text-center">GC</th>
                <th className="px-3 py-4 text-center">SG</th>
              </tr>
            </thead>

            <tbody>
              {showSkeleton
                ? Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
                : grupo.map((time) => (
                  <tr key={time.id} className="border-t border-white/5">
                    <td className="px-3 py-3 text-zinc-300">
                      {time.posicao}
                    </td>

                    <td className="px-3 py-3 flex items-center gap-2">
                      <img
                        src={time.escudo}
                        alt={time.nome}
                        className="h-6 w-6"
                      />
                      <span className="text-white">{time.nome}</span>
                    </td>

                    <td className="px-3 py-3 text-center font-semibold text-white">
                      {time.pontos}
                    </td>

                    <td className="px-3 py-3 text-center">{time.jogos}</td>
                    <td className="px-3 py-3 text-center">{time.vitorias}</td>
                    <td className="px-3 py-3 text-center">{time.empates}</td>
                    <td className="px-3 py-3 text-center">{time.derrotas}</td>
                    <td className="px-3 py-3 text-center">{time.golsPro}</td>
                    <td className="px-3 py-3 text-center">{time.golsContra}</td>
                    <td className="px-3 py-3 text-center font-medium">
                      {time.saldoGols}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full px-6 md:w-3/4 mx-auto mt-10">
      <h3 className="text-4xl md:text-5xl text-white font-light mb-10 text-center">
        Campeonato Carioca
      </h3>

      {renderTabela(grupoA, "Grupo A")}
      {renderTabela(grupoB, "Grupo B")}
    </section>
  )
}
