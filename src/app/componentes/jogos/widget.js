'use client'

import { useTranslation } from "react-i18next"
import { JogosAoVivoSection } from "./jogosAoVivoSection"

export default function WidgetAoVivo({ jogos = [] }) {
  const { t } = useTranslation()

  if (!jogos.length) {
    return null // não renderiza nada se não houver jogos ao vivo
  }

  return (
    <section className="w-full">
      <JogosAoVivoSection
        titulo={t("aovivo")}
        jogos={jogos}
      />
    </section>
  )
}