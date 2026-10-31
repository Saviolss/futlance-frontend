import { Header } from "../componentes/cabeçalho/header"
import Background from "../home/style"
import HomePage from "../home/home"
import AdcashBanner from "../componentes/anuncio/anuncioBody"
import { getLocalizedMetadata, getPageContent } from "./localized-content"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getLocalizedMetadata(lang, "home")
}

export default async function LocalizedHomePage({ params }) {
  const { lang } = await params
  const content = getPageContent(lang, "home")

  return (
    <Background>
      <Header />
      <AdcashBanner />
      <section className="max-w-5xl mx-auto px-6 mt-5 text-xs flex flex-col items-center text-white gap-2">
        <h1 className="text-base font-medium justify-center text-white">
          {content.heading}
        </h1>
        <p>{content.intro}</p>
      </section>
      <HomePage />
    </Background>
  )
}
