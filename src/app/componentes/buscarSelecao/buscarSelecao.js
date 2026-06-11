"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { api} from "../../servidor/api.js"
import { useTranslation } from "react-i18next"

export default function BuscaSelecao() {
  const { t } = useTranslation()

  const [busca, setBusca] = useState("")
  const [times, setTimes] = useState([])

  useEffect(() => {

    async function carregar() {
      try {
        const response = await api.get("/api/times")
        setTimes(response.data || [])
      } catch (error) {
        console.error("Erro ao carregar seleções:", error)
        setTimes([])
      }
    }

    carregar()

  }, [])

  const resultados = busca
    ? times.filter(time =>
      time.nomePopular
        .toLowerCase()
        .includes(
          busca.toLowerCase()
        )
    )
    : []

  return (

    <div className="max-w-xl mx-auto mt-6">

      <input
        type="text"
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)
        }
        placeholder={t("buscar")}
        className="
          w-full
          px-5
          py-4
          rounded-full
          bg-zinc-900
          border
          border-orange-500/30
          text-white
          outline-none
          focus:border-orange-500
        "
      />

      {
        busca &&
        resultados.length > 0 && (

          <div
            className="
              mt-2
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              overflow-hidden
            "
          >

            {
              resultados.map(time => (

                <Link
                  key={time.timeId}
                  href={`/times/${time.slug}`}
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    hover:bg-zinc-800
                  "
                >

                  <img
                    src={time.escudo}
                    alt={time.nomePopular}
                    className="w-8 h-8"
                  />

                  <span className="text-white">
                    {time.nomePopular}
                  </span>

                </Link>
              ))
            }

          </div>
        )
      }

    </div>
  )
}