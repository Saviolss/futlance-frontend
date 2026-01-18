'use client'
import { JogosAoVivoSection } from "./jogosAoVivoSection.js"
import { useTranslation } from "react-i18next"

export  function WidgetAoVivo() {
  const { t } = useTranslation()
  return (
    <div className="w-full">

      <JogosAoVivoSection
        titulo={t("aovivo")}
        endpoint="/api/ao-vivo"
      />

    </div>
  )
}

export function AoVivoCariocaWidget() {
  const { t } = useTranslation()
  return (
    <div className="w-full">

      <JogosAoVivoSection
        titulo={t("aovivo")}
        endpoint="/api/ao-vivo/carioca"
      />

    </div>
  )
}


export function AoVivoPaulistaWidget() {
  const { t } = useTranslation()
  return (
    <div className="w-full">

    <JogosAoVivoSection
      titulo={t("aovivo")}
      endpoint="/api/ao-vivo/paulista"
    />

  </div>
  )
}

export function AoVivoBrasileiraoWidget() {
  const { t } = useTranslation()
  return (
    <div className="w-full">

    <JogosAoVivoSection
      titulo={t("aovivo")}
      endpoint="/api/ao-vivo/brasileirao"
    />

  </div>
  )
} 