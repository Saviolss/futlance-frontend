import { notFound } from "next/navigation"
import { locales } from "./locale-config"

export function generateStaticParams() {
  return locales.filter((lang) => lang !== "pt").map((lang) => ({ lang }))
}

export default async function LocalizedLayout({ children, params }) {
  const { lang } = await params

  if (!locales.includes(lang) || lang === "pt") {
    notFound()
  }

  return children
}
