"use client"

import { useTranslation } from "react-i18next"

export default function RenderGrupos({ dados = [] }) {
  const { t } = useTranslation()

  if (!dados.length) return null

  return (
    <section className="w-full px-4 md:px-6 max-w-7xl mx-auto mt-12">

      {/* TÍTULO */}

      <div className="flex items-center gap-4 mb-12">


        <h3
          className="
            flex 
            mx-auto
            text-3xl
            md:text-5xl
            font-black
            uppercase
            tracking-wide
            text-white
            whitespace-nowrap
          "
        >
          {t("grupo")}
        </h3>


      </div>

      {/* GRUPOS */}

      <div className="flex flex-col gap-10">

        {dados.map((grupo) => (

          <section
            key={grupo.grupo}
            className="
              rounded-3xl
              border
              border-orange-400/20
              bg-linear-to-br
              from-[#0b0f1a]
              via-[#0f172a]
              to-[#020617]
              shadow-[0_0_25px_rgba(255,165,0,0.08)]
              backdrop-blur-md
              overflow-hidden
            "
          >

            {/* TOPO */}

            <div className="h-[2px] w-full bg-linear-to-r from-transparent via-orange-400 to-transparent" />

            {/* HEADER */}

            <div className="px-6 py-5 border-b border-white/10">

              <h4
                className="
                  text-2xl
                  md:text-3xl
                  font-black
                  text-white
                "
              >
                {t("grupo")} {grupo.grupo}
              </h4>

            </div>

            {/* TABELA */}

            <div className="overflow-x-auto">

              <table className="w-md md:w-[700px] lg:w-full">

                {/* HEAD */}

                <thead
                  className="
                    bg-white/[0.03]
                    border-b
                    border-white/10
                  "
                >
                  <tr
                    className="
                      text-zinc-400
                      text-xs
                      md:text-sm
                      uppercase
                      tracking-wider
                    "
                  >
                    <th className="px-4 py-4 text-left">#</th>

                    <th className="px-4 py-4 text-left">
                      {t("time")}
                    </th>

                    <th className="px-4 py-4 text-center">
                      P
                    </th>

                    <th className="px-4 py-4 text-center">
                      J
                    </th>

                    <th className="px-4 py-4 text-center">
                      V
                    </th>

                    <th className="px-4 py-4 text-center">
                      E
                    </th>

                    <th className="px-4 py-4 text-center">
                      D
                    </th>

                    <th className="px-4 py-4 text-center">
                      GP
                    </th>

                    <th className="px-4 py-4 text-center">
                      GC
                    </th>

                    <th className="px-4 py-4 text-center">
                      SG
                    </th>

                    <th className="px-4 py-4 text-center">
                      %
                    </th>
                  </tr>
                </thead>

                {/* BODY */}

                <tbody>

                  {grupo.times.map((time, index) => (

                    <tr
                      key={time.time_id}
                      className="
                        border-b
                        border-white/5
                        hover:bg-white/[0.03]
                        transition-colors
                      "
                    >

                      {/* POSIÇÃO */}

                      <td
                        className="
                          px-4
                          py-4
                          text-sm
                          md:text-base
                          font-bold
                          text-orange-400
                        "
                      >
                        {time.posicao || index + 1}
                      </td>

                      {/* TIME */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-3 min-w-[220px]">

                          <img
                            src={time.escudo}
                            alt={time.nome}
                            className="
                              w-8
                              h-8
                              object-contain
                            "
                          />

                          <span
                            className="
                              text-white
                              font-medium
                              text-sm
                              md:text-base
                            "
                          >
                            {time.nome}
                          </span>

                        </div>

                      </td>

                      {/* PONTOS */}

                      <td
                        className="
                          px-4
                          py-4
                          text-center
                          text-white
                          font-bold
                        "
                      >
                        {time.pontos}
                      </td>

                      {/* JOGOS */}

                      <td className="px-4 py-4 text-center text-zinc-300">
                        {time.jogos}
                      </td>

                      {/* VITÓRIAS */}

                      <td className="px-4 py-4 text-center text-green-400 font-medium">
                        {time.vitorias}
                      </td>

                      {/* EMPATES */}

                      <td className="px-4 py-4 text-center text-yellow-400 font-medium">
                        {time.empates}
                      </td>

                      {/* DERROTAS */}

                      <td className="px-4 py-4 text-center text-red-400 font-medium">
                        {time.derrotas}
                      </td>

                      {/* GOLS PRO */}

                      <td className="px-4 py-4 text-center text-zinc-300">
                        {time.gols_pro}
                      </td>

                      {/* GOLS CONTRA */}

                      <td className="px-4 py-4 text-center text-zinc-300">
                        {time.gols_contra}
                      </td>

                      {/* SALDO */}

                      <td
                        className={`
                          px-4
                          py-4
                          text-center
                          font-semibold
                          ${time.saldo_gols > 0
                            ? "text-green-400"
                            : time.saldo_gols < 0
                              ? "text-red-400"
                              : "text-zinc-300"
                          }
                        `}
                      >
                        {time.saldo_gols > 0 ? "+" : ""}
                        {time.saldo_gols}
                      </td>

                      {/* APROVEITAMENTO */}

                      <td
                        className="
                          px-4
                          py-4
                          text-center
                          text-orange-300
                          font-semibold
                        "
                      >
                        {time.aproveitamento}%
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        ))}

      </div>

    </section>
  )
}