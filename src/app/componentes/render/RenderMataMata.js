"use client"

export default function RenderMataMata({ dados = [] }) {

  if (!dados.length) return null

  return (
    <section className="w-full mx-auto px-6 md:w-3/4 mt-10">
      <div className="flex flex-wrap justify-center gap-6">

        {dados.map((jogo) => (
          <div
            key={jogo.partida_id}
            className="
              relative w-full max-w-[320px]
              rounded-xl overflow-hidden
              bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
              border border-blue-500/30
              shadow-[0_0_25px_rgba(59,130,246,0.15)]
              text-white
            "
          >
            <div className="flex flex-col items-center px-6 py-6 gap-4">

              <div className="flex items-center justify-between w-full">

                <Time time={jogo.mandante} />

                <div className="flex items-center gap-2 text-4xl font-light text-blue-300">
                  <span>{jogo.placar_mandante}</span>
                  <span>:</span>
                  <span>{jogo.placar_visitante}</span>
                </div>

                <Time time={jogo.visitante} />

              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

function Time({ time }) {
  return (
    <div className="flex flex-col items-center gap-2 w-1/3">
      <img
        src={time.escudo}
        alt={time.nome}
        className="w-14 h-14 object-contain"
      />

      <span className="text-xs text-center text-zinc-200">
        {time.nome}
      </span>
    </div>
  )
}