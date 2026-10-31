import LocalizedChampionshipPage from "../LocalizedChampionshipPage"
import { getLocalizedMetadata } from "../../localized-content"

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getLocalizedMetadata(lang, "brasileiro")
}

export default async function LocalizedBrazilianChampionship({ params }) {
  const { lang } = await params
  return (
    <LocalizedChampionshipPage
      lang={lang}
      championship="brasileiro"
    />
  )
}
