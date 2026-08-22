'use client';

import { useTranslation } from "react-i18next";
import { JogoEncerradoCard } from "./JogoEncerradoCard.js";
import { normalizeJogosData } from "./normalizeJogos.js";
export function JogosEncerradosSection({
  jogos = []
}) {

  const { t } = useTranslation();

  const jogosNormalizados = normalizeJogosData(jogos);

  const agora = new Date();

  /*
   * Limite de 3 dias anteriores
   */
  const tresDiasAtras = new Date(agora);
  tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);

  /*
   * Converte data + hora para timestamp
   */
  function converterData(jogo) {

    if (!jogo?.data) {
      return null;
    }

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

      const data = new Date(
        ano,
        mes,
        dia,
        hora,
        minuto,
        0,
        0
      );

      if (!Number.isNaN(data.getTime())) {
        return data.getTime();
      }

      return null;
    }

    /*
     * Caso o backend envie uma data
     * reconhecida diretamente pelo JavaScript.
     */
    const tentativa = new Date(
      `${dataTexto} ${horaTexto}`
    );

    if (!Number.isNaN(tentativa.getTime())) {
      return tentativa.getTime();
    }

    return null;
  }


  const jogosFiltrados = jogosNormalizados.filter((jogo) => {

    const dataJogo = converterData(jogo);

    if (dataJogo === null) {
      return false;
    }


    if (dataJogo > agora.getTime()) {
      return false;
    }

    /*
     * Remove jogos anteriores aos últimos 3 dias
     */
    if (dataJogo < tresDiasAtras.getTime()) {
      return false;
    }

    return true;
  });

  /*
   * Mais recente primeiro
   */
  const jogosOrdenados = [...jogosFiltrados].sort((a, b) => {

    const dataA = converterData(a) ?? 0;
    const dataB = converterData(b) ?? 0;

    return dataB - dataA;
  });

  if (!jogosOrdenados.length) {
    return null;
  }

  return (
    <section
      id="encerrados"
      className="w-full max-w-7xl mx-auto px-4 py-10"
    >

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

              time_mandante: jogo.mandante,
              time_visitante: jogo.visitante
            }}
          />

        ))}

      </div>

    </section>
  );
}