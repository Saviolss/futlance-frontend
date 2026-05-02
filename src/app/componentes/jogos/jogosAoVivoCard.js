'use client'

import { useTranslation } from "react-i18next"

export function JogoAoVivoCard({ jogo }) {
  const { t } = useTranslation()

  const {
    campeonato,
    mandante,
    visitante,
    placar_mandante,
    placar_visitante,
    estadio,
    status,
    penalti
  } = jogo

  return (
    <div className="
      relative w-full max-w-[320px]
      rounded-xl overflow-hidden
      bg-linear-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
      border border-orange-400/30
      shadow-[0_0_25px_rgba(255,165,0,0.15)]
      backdrop-blur-md
      text-white
    ">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-orange-400 to-transparent" />

      <div className="flex flex-col items-center px-6 py-6 gap-4">

        {/* Campeonato */}
        {campeonato?.nome && (
          <h2 className="text-sm tracking-widest uppercase text-orange-400 font-medium">
            {campeonato.nome}
          </h2>
        )}

        {/* Status */}
        <span className="flex items-center gap-2">
          {status !== "finalizado" && (
            <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full" />
          )}

          <span className={`text-xs tracking-widest uppercase ${status === "finalizado"
              ? "text-zinc-400"
              : "text-red-500"
            }`}>
            {penalti ? "PÊNALTIS" : (status === "finalizado" ? t("finalizado") : t("aovivo"))}
          </span>
        </span>

        {/* Times + Placar */}
        <div className="flex items-center justify-between w-full">

          <Time time={mandante} />

          <div className="flex flex-col items-center">

            {/* Placar normal */}
            <div className="flex items-center gap-2 text-4xl font-light text-orange-300">
              <span>{placar_mandante}</span>
              <span className="opacity-60">:</span>
              <span>{placar_visitante}</span>
            </div>

            {/* 👇 Penalti */}
            {penalti && (
              <div className="flex gap-1 text-xs text-yellow-400 mt-1">
                <span>{t("penaltis")}</span>
                <span>({penalti.mandante} x {penalti.visitante})</span>
              </div>
            )}
          </div>

          <Time time={visitante} />

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

function Time({ time }) {
  if (!time) return null

  return (
    <div className="flex flex-col items-center gap-2 w-1/3">
      {time.escudo && (
        <img
          src={time.escudo}
          alt={time.nome}
          className="w-14 h-14 object-contain"
        />
      )}

      <h1 className="text-xs text-center text-zinc-200">
        {time.nome}
      </h1>
    </div>
  )
}