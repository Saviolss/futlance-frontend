'use client'

import { useEffect, useState } from "react"
import { api } from "@/app/servidor/api.js"
import { JogoAoVivoCard } from "./jogoAoVivoCard.js"
export function JogosAoVivoSection({ titulo, endpoint }) {
  const [jogos, setJogos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get(endpoint)
        const dados = response.data || []

        setJogos(Array.isArray(dados) ? dados : [])
      } catch (erro) {
        console.error("Erro ao carregar jogos ao vivo:", erro)
        setJogos([])
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [endpoint])

  // ❌ Não renderiza se não houver jogos
  if (!loading && jogos.length === 0) return null

  return (
    <section className="w-full mx-auto px-6 md:w-3/4 mt-10">
      <h1 className="text-3xl font-light text-center mb-6 md:text-5xl">
        {titulo}
      </h1>

      <div className="flex flex-wrap gap-4 justify-center">
        {jogos.map(jogo => (
          <JogoAoVivoCard
            key={jogo.partida_id}
            jogo={jogo}
          />
        ))}
      </div>
    </section>
  )
}
