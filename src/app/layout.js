import './globals.css';
export default function RootLayout( { children } ) {
  return (
    <html lang='pt-br'>
      <head>
        <title>Futlance</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='Acompanhe em tempo real o seu time. nos maiores campeonatos nacionais e internacionais Brasileirão, Copa do Brasil, Paulistão e Sul Americana.' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>{children}</body>

    </html>
  );
};