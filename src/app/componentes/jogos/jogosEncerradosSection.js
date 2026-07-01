'use client';
import { useTranslation } from "react-i18next";
import { normalizeJogosData } from "./normalizeJogos";

export function JogosEncerradosSection({
  titulo,
  jogos = []
}) {

  const { t } = useTranslation();
  const jogosNormalizados = normalizeJogosData(jogos);

  if (!jogosNormalizados.length) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10">

      <div className="flex items-center gap-4 mb-10 mx-auto justify-center">


        <h2
          className="
            text-3xl
            md:text-5xl
            font-light
            text-white
          "
        >
        {t ("finalizado")}
        </h2>


      </div>

      <div className="flex flex-wrap justify-center gap-6">

        {jogosNormalizados.map((jogo) => (

          <div
            key={jogo.partida_id ?? `${jogo.mandante?.nome ?? 'mandante'}-${jogo.visitante?.nome ?? 'visitante'}`}
            className="
              relative
              w-full
              max-w-[340px]
              rounded-2xl
              overflow-hidden
              border
              border-zinc-500/20
              bg-linear-to-br
              from-[#0b0f1a]
              via-[#0f172a]
              to-[#020617]
              shadow-[0_0_25px_rgba(113,113,122,0.12)]
              hover:shadow-[0_0_30px_rgba(113,113,122,0.2)]
              transition-all
              duration-300
              backdrop-blur-md
            "
          >

            {/* LINHA TOPO */}

            <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-zinc-500 to-transparent" />

            <div className="flex flex-col items-center px-6 py-6 gap-5">

              {/* CAMPEONATO */}

              {jogo.campeonato?.nome && (
                <span
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-zinc-400
                  "
                >
                  {jogo.campeonato.nome}
                </span>
              )}

              {/* STATUS */}

              <div className="flex items-center gap-2">

                <span className="w-2 h-2 rounded-full bg-zinc-500" />

                <span
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-zinc-400
                  "
                >
                  {t("finalizado")}
                </span>

              </div>

              {/* TIMES */}

              <div className="flex items-center justify-between w-full">

                <Time time={jogo.mandante} />

                <div className="flex flex-col items-center">

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-4xl
                      font-light
                      text-zinc-200
                    "
                  >
                    <span>{jogo.placar_mandante}</span>
                    <span className="opacity-50">:</span>
                    <span>{jogo.placar_visitante}</span>
                  </div>

                  {(jogo.data || jogo.hora) && (
                    <span className="text-xs text-zinc-500 mt-2">
                      {jogo.data} {jogo.hora}
                    </span>
                  )}

                </div>

                <Time time={jogo.visitante} />

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

function Time({ time }) {

  return (
    <div className="flex flex-col items-center gap-3 w-1/3">

      <img
        src={time?.escudo}
        alt={time?.nome}
        className="
          w-14
          h-14
          object-contain
        "
      />

      <span
        className="
          text-xs
          md:text-sm
          text-center
          text-zinc-200
          font-medium
          leading-tight
        "
      >
        {time?.nome}
      </span>

    </div>
  );
}