import "./globals.css";

export const metadata = {
  title: "Jogos de hoje | Futlance",
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
  authors: [{ name: "Futlance" }],
  creator: "Futlance",
  publisher: "Futlance",
  openGraph: {
    title: "Jogos de hoje | Futlance",
    description:
      "Jogos ao vivo, tabelas atualizadas, artilheiros e resultados em tempo real do futebol.",
    url: "https://www.futlance.com",
    siteName: "Futlance",
    images: [
      {
        url: "/public/logo.png",
        width: 1200,
        height: 630,
        alt: "Futlance - Futebol ao vivo"
      }
    ],
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Jogos de hoje | Futlance",
    description:
      "Resultados ao vivo, tabelas e estatísticas do futebol.",
    images: ["/public/logo.png"]
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
  alternate: {
    canonical: "https://www.futlance.com"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-adsense-account" content="ca-pub-1636369633058499"></meta>
      </head>
      <body>{children}</body>
    </html>
  );
}
