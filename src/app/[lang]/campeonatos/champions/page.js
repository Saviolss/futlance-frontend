import LocalizedChampionshipPage from "../LocalizedChampionshipPage"
import { getLocalizedMetadata } from "../../localized-content"

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getLocalizedMetadata(lang, "champions")
}

export default async function LocalizedChampionsLeague({ params }) {
  const { lang } = await params
  return (
    <LocalizedChampionshipPage
      lang={lang}
      championship="champions"
    />
  )
}
