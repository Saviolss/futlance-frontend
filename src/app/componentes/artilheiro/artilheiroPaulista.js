"use client"

import { useEffect, useState } from "react"
import { api } from "@/app/servidor/api.js"

export default function ArtilheirosPaulista() {
  const [artilheiros, setArtilheiros] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true)
        const res = await api.get("/gols/artilheiros/paulista")
        setArtilheiros(res.data || [])
      } catch (err) {
        console.error("Erro ao carregar artilheiros", err)
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [])

  // 👉 só jogadores com gol
  const artilheirosComGol = artilheiros.filter(j => j.gols > 0)

  if (!loading && artilheirosComGol.length === 0) {
    return null
  }

  return (
    <section className="w-full mx-auto px-6 md:w-3/4 mt-12">
      <h3 className="text-3xl md:text-5xl font-light text-center mb-5 text-white">
        Artilheiros do Paulistão
      </h3>

      <div className="w-full rounded-xl border border-white/10 bg-[#0b0f1a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#0f172a] to-[#020617] text-zinc-400">
                <th className="px-3 py-4 text-left">#</th>
                <th className="px-3 py-4 text-left">Jogador</th>
                <th className="px-3 py-4 text-left">Clube</th>
                <th className="px-3 py-4 text-center text-white font-semibold">
                  G
                </th>
              </tr>
            </thead>

            <tbody>
              {artilheirosComGol.map((jogador, index) => (
                <tr
                  key={jogador.id}
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
