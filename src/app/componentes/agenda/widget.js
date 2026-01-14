'use client';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "@/app/servidor/api.js";

export function AgendaCompleta() {
  const { t } = useTranslation();
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarAgenda() {
      try {
        const response = await api.get("/agenda-geral");
        const campeonatos = response.data || {};

        // junta tudo em um array só
        const todas = Object.values(campeonatos)
          .filter(Array.isArray)
          .flat()
          .filter(p => p?.mandante && p?.visitante);
        console.log("PARTIDAS RECEBIDAS:", todas);

        setPartidas(todas);
      } catch (err) {
        console.error("Erro ao carregar agenda", err);
      } finally {
        setLoading(false);
      }
    }

    carregarAgenda();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Carregando agenda...</p>;
  }

  return (
    <section className="w-full mx-auto px-6 md:w-3/4" id="agenda">
      <h1 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">
        {t("agendadejogos")}
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {partidas.map((p) => (
          <div
            key={p.partida_id}
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
                {p.campeonato}
              </h2>

              {/* Times */}
              <div className="flex items-center justify-between w-full">
                {/* Mandante */}
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img
                    src={p.mandante?.escudo}
                    alt={p.mandante?.nome}
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-xs text-center text-zinc-200">
                    {p.mandante?.nome}
                  </span>
                </div>

                {/* VS */}
                <div className="text-4xl font-light text-blue-300">
                  :
                </div>

                {/* Visitante */}
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img
                    src={p.visitante?.escudo}
                    alt={p.visitante?.nome}
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-xs text-center text-zinc-200">
                    {p.visitante?.nome}
                  </span>
                </div>
              </div>

              {/* Data / Hora */}
              <div className="flex gap-4 text-xs text-zinc-400 tracking-wide">
                <span>{p.data}</span>
                <span>{p.hora}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}


export function AgendaBrasileiro() {
  const { t } = useTranslation();
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarAgenda() {
      try {
        const response = await api.get("/agenda/brasileirao");

        // backend já retorna array pronto
        const lista = Array.isArray(response.data)
          ? response.data
          : [];

        console.log("PARTIDAS RECEBIDAS:", lista);
        setPartidas(lista);
      } catch (err) {
        console.error("Erro ao carregar agenda", err);
      } finally {
        setLoading(false);
      }
    }

    carregarAgenda();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Carregando agenda...</p>;
  }

  return (
    <section className="w-full mx-auto px-6 md:w-3/4" id="agenda">
      <h1 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">
        {t("agendadejogos")}
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {partidas.map((p) => (
          <div
            key={p.partida_id}
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
                {p.campeonato}
              </h2>

              {/* Times */}
              <div className="flex items-center justify-between w-full">
                {/* Mandante */}
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img
                    src={p.mandante?.escudo}
                    alt={p.mandante?.nome}
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-xs text-center text-zinc-200">
                    {p.mandante?.nome}
                  </span>
                </div>

                {/* VS */}
                <div className="text-4xl font-light text-blue-300">
                  :
                </div>

                {/* Visitante */}
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img
                    src={p.visitante?.escudo}
                    alt={p.visitante?.nome}
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-xs text-center text-zinc-200">
                    {p.visitante?.nome}
                  </span>
                </div>
              </div>

              {/* Data / Hora */}
              <div className="flex gap-4 text-xs text-zinc-400 tracking-wide">
                <span>{p.data}</span>
                <span>{p.hora}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}


export function AgendaPaulista() {
  const { t } = useTranslation();
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarAgenda() {
      try {
        const response = await api.get("/agenda/paulista");

        // backend já retorna array pronto
        const lista = Array.isArray(response.data)
          ? response.data
          : [];

        console.log("PARTIDAS RECEBIDAS:", lista);
        setPartidas(lista);
      } catch (err) {
        console.error("Erro ao carregar agenda", err);
      } finally {
        setLoading(false);
      }
    }

    carregarAgenda();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Carregando agenda...</p>;
  }

  return (
    <section className="w-full mx-auto px-6 md:w-3/4" id="agenda">
      <h1 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">
        {t("agendadejogos")}
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {partidas.map((p) => (
          <div
            key={p.partida_id}
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
                {p.campeonato}
              </h2>

              {/* Times */}
              <div className="flex items-center justify-between w-full">
                {/* Mandante */}
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img
                    src={p.mandante?.escudo}
                    alt={p.mandante?.nome}
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-xs text-center text-zinc-200">
                    {p.mandante?.nome}
                  </span>
                </div>

                {/* VS */}
                <div className="text-4xl font-light text-blue-300">
                  :
                </div>

                {/* Visitante */}
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img
                    src={p.visitante?.escudo}
                    alt={p.visitante?.nome}
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-xs text-center text-zinc-200">
                    {p.visitante?.nome}
                  </span>
                </div>
              </div>

              {/* Data / Hora */}
              <div className="flex gap-4 text-xs text-zinc-400 tracking-wide">
                <span>{p.data}</span>
                <span>{p.hora}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export function AgendaCarioca() {
  const { t } = useTranslation();
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarAgenda() {
      try {
        const response = await api.get("/agenda/carioca");

        // backend já retorna array pronto
        const lista = Array.isArray(response.data)
          ? response.data
          : [];

        console.log("PARTIDAS RECEBIDAS:", lista);
        setPartidas(lista);
      } catch (err) {
        console.error("Erro ao carregar agenda", err);
      } finally {
        setLoading(false);
      }
    }

    carregarAgenda();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Carregando agenda...</p>;
  }

  return (
    <section className="w-full mx-auto px-6 md:w-3/4" id="agenda">
      <h1 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">
        {t("agendadejogos")}
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {partidas.map((p) => (
          <div
            key={p.partida_id}
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
                {p.campeonato}
              </h2>

              {/* Times */}
              <div className="flex items-center justify-between w-full">
                {/* Mandante */}
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img
                    src={p.mandante?.escudo}
                    alt={p.mandante?.nome}
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-xs text-center text-zinc-200">
                    {p.mandante?.nome}
                  </span>
                </div>

                {/* VS */}
                <div className="text-4xl font-light text-blue-300">
                  :
                </div>

                {/* Visitante */}
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img
                    src={p.visitante?.escudo}
                    alt={p.visitante?.nome}
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-xs text-center text-zinc-200">
                    {p.visitante?.nome}
                  </span>
                </div>
              </div>

              {/* Data / Hora */}
              <div className="flex gap-4 text-xs text-zinc-400 tracking-wide">
                <span>{p.data}</span>
                <span>{p.hora}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}