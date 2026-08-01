import "./globals.css"
import Script from "next/script"
import { WebSocketProvider } from "@/context/WebSocketProvider"
export const metadata = {
  metadataBase: new URL("https://futlance.com"),

  title: "Futlance - Jogos em tempo real agenda e notícias de futebol",

  description:
    "Acompanhe jogos ao vivo, resultados em tempo real, tabelas dos campeonatos, artilharia, classificação e próximos jogos do futebol brasileiro.",

  keywords: [
    "jogos de hoje",
    "jogos de futebol hoje",
    "futebol ao vivo",
    "classificação do campeonato brasileiro",
    "campeonato brasileiro",
    "campeonato copa do brasil", 
    "classificação copa do brasil",
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
    title: "Futlance - Jogos em tempo real agenda e notícias de futebol",

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
    title: "Futlance - Jogos em tempo real agenda e notícias de futebol",

    description:
      "Resultados ao vivo, tabelas e estatísticas do futebol."
  },

  icons: {
    icon: "/favicon.ico"
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