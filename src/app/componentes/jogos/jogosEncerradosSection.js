'use client';

import { useTranslation } from "react-i18next";
import { JogoEncerradoCard } from "./jogoEncerradoCard";
import { normalizeJogosData } from "./normalizeJogos";

export function JogosEncerradosSection({
  jogos = []
}) {




  const jogosNormalizados = normalizeJogosData(jogos);
  const { t } = useTranslation();

  const agora = new Date();

  const tresDiasAtras = new Date(agora);
  tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);

  const jogosFiltrados = jogosNormalizados.filter((jogo) => {

    if (!jogo.data) {
      return false;
    }

    let dataJogo = null;

    const dataTexto = String(jogo.data).trim();

    const horaTexto = jogo.hora
      ? String(jogo.hora).trim()
      : "23:59";

    /*
     * DD/MM/YYYY
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
   * Mais recente primeiro.
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
          minuto,
          0,
          0
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

          <JogoEncerradoCard
            key={
              jogo.partida_id ??
              `${jogo.mandante?.nome ?? "mandante"}-${jogo.visitante?.nome ?? "visitante"}`
            }
            jogo={{
              ...jogo,

              /*
               * ADAPTAÇÃO PARA O CARD
               */

              time_mandante: jogo.mandante,
              time_visitante: jogo.visitante
            }}
          />

        ))}

      </div>

    </section>
  );
}