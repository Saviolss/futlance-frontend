export function JogoAoVivoCard({ jogo }) {
  const {
    campeonato,
    time_mandante,
    time_visitante,
    placar_mandante,
    placar_visitante,
    estadio,
    status,
    tempo
  } = jogo

  return (
    <div
      className="
    relative w-full max-w-[320px]
    rounded-xl overflow-hidden
    bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
    border border-blue-500/30
    shadow-[0_0_25px_rgba(59,130,246,0.15)]
    backdrop-blur-md
    text-white
  "
    >
      {/* Linha decorativa UEFA */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="flex flex-col items-center px-6 py-6 gap-4">
        {/* Campeonato */}
        <h2 className="text-sm tracking-widest uppercase text-blue-400 font-medium">
          {campeonato?.nome}
        </h2>

        {/* AO VIVO / FINALIZADO */}
        <span className="flex items-center gap-2">
          {status !== "finalizado" && (
            <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full" />
          )}
          <span
            className={`text-xs tracking-widest uppercase ${status === "finalizado"
                ? "text-zinc-400"
                : "text-red-500"
              }`}
          >
            {status === "finalizado" ? "Finalizado" : "Ao vivo"}
          </span>
        </span>

        {/* Times + Placar */}
        <div className="flex items-center justify-between w-full">
          {/* Mandante */}
          <div className="flex flex-col items-center gap-2 w-1/3">
            <img
              src={time_mandante?.escudo}
              alt={time_mandante?.nome_popular}
              className="w-14 h-14 object-contain"
            />
            <span className="text-xs text-center text-zinc-200">
              {time_mandante?.nome_popular}
            </span>
          </div>

          {/* Placar */}
          <div className="flex items-center gap-2 text-4xl font-light text-blue-300">
            <span>{placar_mandante}</span>
            <span className="opacity-60">:</span>
            <span>{placar_visitante}</span>
          </div>

          {/* Visitante */}
          <div className="flex flex-col items-center gap-2 w-1/3">
            <img
              src={time_visitante?.escudo}
              alt={time_visitante?.nome_popular}
              className="w-14 h-14 object-contain"
            />
            <span className="text-xs text-center text-zinc-200">
              {time_visitante?.nome_popular}
            </span>
          </div>
        </div>

        {/* Estádio */}
        {estadio?.nome_popular && (
          <p className="text-xs text-zinc-400 tracking-wide">
            {estadio.nome_popular}
          </p>
        )}
      </div>
    </div>

  )
}
