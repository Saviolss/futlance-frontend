'use client'

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { JogosAoVivoSection } from "./jogosAoVivoSection"
import { useWebSocket } from "@/hooks/useWebSocket"

export default function WidgetAoVivo({ jogos = [] }) {
  const { t } = useTranslation()

  const [lista, setLista] = useState(jogos)

  useWebSocket((data) => {
    if (data.tipo === "ao-vivo") {
      setLista(prev => {
        // evita re-render desnecessário
        if (JSON.stringify(prev) === JSON.stringify(data.dados)) {
          return prev
        }
        return data.dados
      })
    }
  })

  if (!lista.length) {
    return null
  }

  return (
    <section className="w-full">
      <JogosAoVivoSection
        titulo={t("aovivo")}
        jogos={lista}
      />
    </section>
  )
}