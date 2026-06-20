import "./globals.css"
import { WebSocketProvider } from "@/context/WebSocketProvider"
export const metadata = {
  metadataBase: new URL("https://futlance.com"),
  verification: {
    other: {
      monetag: "4c978b407430d4259177761626990861"
    }
  },

  title: "Jogos de hoje",

  description:
    "Acompanhe jogos ao vivo, resultados em tempo real, tabelas dos campeonatos, artilharia, classificação e próximos jogos do futebol brasileiro.",

  keywords: [
    "jogos de hoje",
    "futebol ao vivo",
    "tabelas de futebol",
    "copa do mundo",
    "world cup fifa 2026",
    "campeonato brasileiro",
    "resultados de hoje",
    "jogos em tempo real"
  ],

  authors: [
    {
      name: "Futlance"
    }
  ],

  creator: "Futlance",

  publisher: "Futlance",

  openGraph: {
    title: "Jogos de hoje",

    description:
      "Jogos ao vivo, tabelas atualizadas, artilheiros e resultados em tempo real do futebol.",

    url: "https://www.futlance.com",

    siteName: "Futlance",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Futlance - Futebol ao vivo"
      }
    ],

    locale: "pt_BR",

    type: "website"
  },

  twitter: {
    title: "Jogos de hoje",

    description:
      "Resultados ao vivo, tabelas e estatísticas do futebol."
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },

  alternates: {
    canonical: "https://www.futlance.com"
  }
}

export default function RootLayout({ children }) {

  return (
    <html lang="pt-BR">

      <body>

        {/* ============================
            WEBSOCKET GLOBAL
        ============================ */}

        <WebSocketProvider>
          {children}
        </WebSocketProvider>

      </body>

    </html>
  )
}