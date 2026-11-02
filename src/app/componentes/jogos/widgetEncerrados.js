"use client"

import { useTranslation } from "react-i18next"
import { JogosEncerradosSection } from "./jogosEncerradosSection"
export default function WidgetEncerrados({
  jogos = []
}) {

  const { t } = useTranslation()

  if (!jogos.length) {
    return null
  }

  return (
    <section className="w-full">

      <JogosEncerradosSection
        titulo={t("finalizado")}
        jogos={jogos}
      />

    </section>
  )
}