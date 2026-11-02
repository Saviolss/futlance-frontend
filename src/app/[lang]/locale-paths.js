import { locales } from "./locale-config"

export function getCurrentLocale(pathname) {
  const firstSegment = pathname.split("/")[1]
  return locales.includes(firstSegment) ? firstSegment : "pt"
}

export function getLocalizedPath(pathname, lang) {
  const segments = pathname.split("/")
  const path = locales.includes(segments[1])
    ? `/${segments.slice(2).join("/")}`
    : pathname
  const normalizedPath = path === "/" ? "" : path.replace(/\/$/, "")

  return lang === "pt"
    ? normalizedPath || "/"
    : `/${lang}${normalizedPath}`
}

export function getLocalizedHref(pathname, href) {
  const lang = getCurrentLocale(pathname)
  return lang === "pt" ? href : `/${lang}${href === "/" ? "" : href}`
}
