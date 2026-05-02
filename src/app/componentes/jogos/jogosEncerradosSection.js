'use client';

export function JogosEncerradosSection({ titulo, jogos = [] }) {
  if (!jogos.length) return null;

  return (
    <section className="w-full mx-auto px-6 md:w-3/4 mt-10">
      <h2 className="text-2xl font-light text-center mb-4">
        {titulo}
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {jogos.map(jogo => (
          <div
            key={jogo.partida_id}
            className="
              relative w-full max-w-[320px]
              rounded-xl overflow-hidden
              bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
              border border-zinc-500/30
              shadow-[0_0_25px_rgba(113,113,122,0.15)]
              text-white
            "
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />

            <div className="flex flex-col items-center px-6 py-6 gap-4">
              <span className="text-xs uppercase tracking-widest text-zinc-400">
                FINALIZADO
              </span>

              <div className="flex items-center justify-between w-full">
                <Time time={jogo.mandante} />
                <span className="text-xl text-zinc-300">
                  {jogo.placar_mandante} x {jogo.placar_visitante}
                </span>
                <Time time={jogo.visitante} />
              </div>

              {jogo.estadio?.nome && (
                <span className="text-xs text-zinc-400">
                  {jogo.estadio.nome}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Time({ time }) {
  return (
    <div className="flex flex-col items-center gap-2 w-1/3">
      <img
        src={time?.escudo}
        alt={time?.nome}
        className="w-12 h-12 object-contain"
      />
      <span className="text-xs text-center text-zinc-200">
        {time?.nome}
      </span>
    </div>
  );
}