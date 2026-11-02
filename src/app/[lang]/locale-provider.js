"use client"

import { useEffect, useMemo } from "react"
import i18next from "i18next"
import { initReactI18next, I18nextProvider } from "react-i18next"
import { usePathname } from "next/navigation"
import { translationResources } from "../../../i18n"
import { languageTags } from "./locale-config"
import { getCurrentLocale } from "./locale-paths"

export default function LocaleProvider({ children }) {
  const pathname = usePathname()
  const lang = getCurrentLocale(pathname)

  const instance = useMemo(() => {
    const localeI18n = i18next.createInstance()

    localeI18n.use(initReactI18next).init({
      lng: lang,
      fallbackLng: "pt",
      resources: translationResources,
      interpolation: {
        escapeValue: false,
      },
    })

    return localeI18n
  }, [lang])

  useEffect(() => {
    document.documentElement.lang = languageTags[lang]
  }, [lang])

  return (
    <I18nextProvider i18n={instance}>
      {children}
    </I18nextProvider>
  )
}
