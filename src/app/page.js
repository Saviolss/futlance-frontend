// app/page.js
import { Header } from "./componentes/cabeçalho/header";
import { Home } from "./home/home";


export default function Page() {
  return (
    <>
      <Header />
      {/* CONTEÚDO PARA GOOGLE (não interfere no layout) */}
      <section className="sr-only">
        <h1>Futlance — Futebol ao vivo e campeonatos</h1>
        <p>
          Futlance é uma plataforma de futebol que reúne jogos ao vivo,
          agenda de partidas, tabelas de campeonatos e informações
          atualizadas para torcedores.
        </p>
        <p>
          O site oferece dados organizados sobre competições nacionais
          e internacionais, facilitando o acompanhamento em tempo real.
        </p>
      </section>

      {/* SITE REAL */}
      <Home />
    </>
  );
}
