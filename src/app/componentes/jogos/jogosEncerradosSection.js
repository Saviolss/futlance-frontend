'use client';

import { useTranslation } from "react-i18next";
import { normalizeJogosData } from "./normalizeJogos";

export function JogosEncerradosSection({
  jogos = []
}) {

  const { t } = useTranslation();

  const jogosNormalizados = normalizeJogosData(jogos);

  /*
   * ============================================================
   * FILTRO DE JOGOS FINALIZADOS
   * ============================================================
   *
   * Mantém somente jogos cuja data/hora esteja dentro dos
   * últimos 3 dias.
   *
   * Exemplo:
   * Hoje = 28/07 às 20:36
   *
   * Jogo:
   * 28/07 às 20:30 -> aparece
   *
   * Jogo:
   * 25/07 às 20:36 -> aparece
   *
   * Jogo:
   * 25/07 às 20:35 -> não aparece
   *
   * Jogo:
   * 24/07 -> não aparece
   *
   */

  const agora = new Date();

  const tresDiasAtras = new Date(agora);
  tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);

  const jogosFiltrados = jogosNormalizados.filter((jogo) => {

    if (!jogo.data) {
      return false;
    }

    /*
     * Tenta montar a data/hora do jogo.
     *
     * Se a data vier como DD/MM/YYYY,
     * fazemos a conversão para um formato que o JS entende.
     */

    let dataJogo = null;

    const dataTexto = String(jogo.data).trim();
    const horaTexto = jogo.hora
      ? String(jogo.hora).trim()
      : "23:59";

    /*
     * Formato DD/MM/YYYY
     */

    const partes = dataTexto.split("/");

    if (partes.length === 3) {

      const dia = Number(partes[0]);
      const mes = Number(partes[1]) - 1;
      const ano = Number(partes[2]);

      const partesHora = horaTexto.split(":");

      const hora = Number(partesHora[0]) || 0;
      const minuto = Number(partesHora[1]) || 0;

      dataJogo = new Date(
        ano,
        mes,
        dia,
        hora,
        minuto,
        0,
        0
      );

    } else {

      /*
       * Caso o backend já envie uma data reconhecida
       * pelo JavaScript.
       */

      const tentativa = new Date(
        `${dataTexto} ${horaTexto}`
      );

      if (!Number.isNaN(tentativa.getTime())) {
        dataJogo = tentativa;
      }

    }

    if (!dataJogo || Number.isNaN(dataJogo.getTime())) {
      return false;
    }

    /*
     * Remove jogos futuros.
     *
     * Um jogo finalizado não deve possuir data/hora futura.
     */

    if (dataJogo > agora) {
      return false;
    }

    /*
     * Mantém somente os últimos 3 dias.
     */

    if (dataJogo < tresDiasAtras) {
      return false;
    }

    return true;
  });

  /*
   * Ordena do jogo mais recente para o mais antigo.
   */

  const jogosOrdenados = [...jogosFiltrados].sort((a, b) => {

    function converterData(jogo) {

      if (!jogo.data) {
        return 0;
      }

      const dataTexto = String(jogo.data).trim();
      const horaTexto = jogo.hora
        ? String(jogo.hora).trim()
        : "23:59";

      const partes = dataTexto.split("/");

      if (partes.length === 3) {

        const dia = Number(partes[0]);
        const mes = Number(partes[1]) - 1;
        const ano = Number(partes[2]);

        const partesHora = horaTexto.split(":");

        const hora = Number(partesHora[0]) || 0;
        const minuto = Number(partesHora[1]) || 0;

        return new Date(
          ano,
          mes,
          dia,
          hora,
          minuto
        ).getTime();
      }

      const data = new Date(
        `${dataTexto} ${horaTexto}`
      );

      return Number.isNaN(data.getTime())
        ? 0
        : data.getTime();
    }

    return converterData(b) - converterData(a);
  });

  if (!jogosOrdenados.length) {
    return null;
  }

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
          {t("finalizado")}
        </h2>

      </div>

      <div className="flex flex-wrap justify-center gap-6">

        {jogosOrdenados.map((jogo) => (

          <div
            key={
              jogo.partida_id ??
              `${jogo.mandante?.nome ?? 'mandante'}-${jogo.visitante?.nome ?? 'visitante'}`
            }
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

            <div className="
              absolute
              inset-x-0
              top-0
              h-[2px]
              bg-linear-to-r
              from-transparent
              via-zinc-500
              to-transparent
            " />

            <div className="
              flex
              flex-col
              items-center
              px-6
              py-6
              gap-5
            ">

              {/* CAMPEONATO */}

              {jogo.campeonato?.nome && (
                <span
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-zinc-400
                    text-center
                  "
                >
                  {jogo.campeonato.nome}
                </span>
              )}

              {/* STATUS */}

              <div className="flex items-center gap-2">

                <span className="
                  w-2
                  h-2
                  rounded-full
                  bg-zinc-500
                " />

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

              <div className="
                flex
                items-center
                justify-between
                w-full
              ">

                <Time time={jogo.mandante} />

                {/* PLACAR */}

                <div className="
                  flex
                  flex-col
                  items-center
                  min-w-[80px]
                ">

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
                    <span>
                      {jogo.placar_mandante}
                    </span>

                    <span className="opacity-50">
                      :
                    </span>

                    <span>
                      {jogo.placar_visitante}
                    </span>
                  </div>

                  {/* DATA */}

                  {(jogo.data || jogo.hora) && (
                    <span
                      className="
                        text-xs
                        text-zinc-500
                        mt-2
                        text-center
                      "
                    >
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

  if (!time) {
    return null;
  }

  return (
    <div className="
      flex
      flex-col
      items-center
      gap-3
      w-1/3
    ">

      {time.escudo && (
        <img
          src={time.escudo}
          alt={time.nome || "Time"}
          className="
            w-14
            h-14
            object-contain
          "
        />
      )}

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
        {time.nome}
      </span>

    </div>
  );
}