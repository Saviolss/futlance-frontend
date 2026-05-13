import "./globals.css"
import Script from "next/script"
import { WebSocketProvider } from "@/context/WebSocketProvider"
export const metadata = {
  metadataBase: new URL("https://futlance.com"),

  title: "Jogos de hoje",

  description:
    "Acompanhe jogos ao vivo, resultados em tempo real, tabelas dos campeonatos, artilharia, classificação e próximos jogos do futebol brasileiro.",

  keywords: [
    "jogos de hoje",
    "futebol ao vivo",
    "tabelas de futebol",
    "classificação do campeonato",
    "artilharia",
    "futebol brasileiro",
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

      <head>

        {/* ============================
            GOOGLE ANALYTICS
        ============================ */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-53KERW047W"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-53KERW047W');
          `}
        </Script>

      </head>

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