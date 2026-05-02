"use client"

import { useTranslation } from "react-i18next"

export default function RenderGrupos({ dados = [] }) {
  const { t } = useTranslation()

  if (!dados.length) return null

  return (
    <section className="w-full px-6 md:w-3/4 mx-auto mt-10">
      <h3 className="text-4xl md:text-5xl text-white font-light mb-10 text-center">
        {t("tabela")}
      </h3>

      {dados.map((grupo) => (
        <section key={grupo.grupo} className="mb-16">
          <h4 className="text-2xl md:text-3xl text-white font-light mb-4">
            {t("grupo")} {grupo.grupo}
          </h4>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0b0f1a]">
            <table className="w-full min-w-[700px] text-sm">
              <tbody>
                {grupo.times.map((time) => (
                  <tr key={time.time_id}>
                    <td className="px-3 py-3 text-zinc-300">
                      {time.posicao}
                    </td>

                    <td className="px-3 py-3 flex items-center gap-2">
                      <img
                        src={time.escudo}
                        alt={time.nome}
                        className="h-6 w-6"
                      />
                      <span className="text-white">{time.nome}</span>
                    </td>

                    <td className="px-3 py-3 text-center text-white">
                      {time.pontos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </section>
  )
}