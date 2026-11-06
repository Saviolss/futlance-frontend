const siteUrl = 'https://futlance.com'
import { languageTags } from './[lang]/locale-config'

const localizedPages = [
  { path: '', priority: 1 },
  { path: '/campeonatos/brasileiro', priority: 0.9 },
  { path: '/campeonatos/champions', priority: 0.8 },
]

export default function sitemap() {
  const localizedEntries = localizedPages.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(
      Object.entries(languageTags).map(([lang, tag]) => [
        tag,
        `${siteUrl}${lang === 'pt' ? '' : `/${lang}`}${path}`,
      ])
    )

    return Object.entries(languages).map(([lang, url]) => ({
      url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority,
      alternates: {
        languages,
      },
    }))
  })

  return [
    ...localizedEntries,
    {
      url: `${siteUrl}/noticia`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]
}