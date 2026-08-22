'use client'

import { JogoEncerradoCard } from "./jogoEncerradoCard"
export function JogosEncerradosSection({ titulo, jogos = [] }) {
  if (!jogos.length) return null

  return (
    <section id="encerrados" className="w-full mx-auto px-6 md:w-3/4">
      {titulo && (
        <h2 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">
          {titulo}
        </h2>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {jogos.map(jogo => (
          <JogoEncerradoCard
            key={jogo.partida_id}
            jogo={{
              ...jogo,
              // 🔥 ADAPTAÇÃO DO BACK PARA O CARD
              time_mandante: jogo.mandante,
              time_visitante: jogo.visitante
            }}
          />
        ))}
      </div>
    </section>
  )
}