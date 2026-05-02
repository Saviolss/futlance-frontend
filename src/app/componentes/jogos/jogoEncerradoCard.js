'use client'
import { useTranslation } from "react-i18next"

export function JogoEncerradoCard({ jogo }) {
  const { t } = useTranslation()
  const {
    campeonato,
    time_mandante,
    time_visitante,
    placar_mandante,
    placar_visitante,
    estadio
  } = jogo

  return (
    <div
      className="
        relative w-full max-w-[320px]
        rounded-xl overflow-hidden
        bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]
        border border-zinc-500/20
        shadow-[0_0_20px_rgba(0,0,0,0.4)]
        text-white
      "
    >
      {/* Linha decorativa */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />

      <div className="flex flex-col items-center px-6 py-6 gap-4">
        {/* Campeonato */}
        <h2 className="text-sm tracking-widest uppercase text-zinc-400 font-medium">
          {campeonato?.nome}
        </h2>

        {/* FINALIZADO */}
        <span className="text-xs tracking-widest uppercase text-zinc-400">
          {t("finalizado")}
        </span>

        {/* Times + Placar */}
        <div className="flex items-center justify-between w-full">
          {/* Mandante */}
          <div className="flex flex-col items-center gap-2 w-1/3">
            <img
              src={time_mandante?.escudo}
              alt={time_mandante?.nome_popular}
              className="w-14 h-14 object-contain opacity-90"
            />
            <span className="text-xs text-center text-zinc-300">
              {time_mandante?.nome_popular}
            </span>
          </div>

          {/* Placar */}
          <div className="flex items-center gap-2 text-4xl font-light text-zinc-200">
            <span>{placar_mandante}</span>
            <span className="opacity-50">:</span>
            <span>{placar_visitante}</span>
          </div>

          {/* Visitante */}
          <div className="flex flex-col items-center gap-2 w-1/3">
            <img
              src={time_visitante?.escudo}
              alt={time_visitante?.nome_popular}
              className="w-14 h-14 object-contain opacity-90"
            />
            <span className="text-xs text-center text-zinc-300">
              {time_visitante?.nome_popular}
            </span>
          </div>
        </div>

        {/* Estádio */}
        {estadio?.nome_popular && (
          <p className="text-xs text-zinc-500 tracking-wide">
            {estadio.nome_popular}
          </p>
        )}
      </div>
    </div>
  )
}
