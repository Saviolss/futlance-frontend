import Background from "@/app/home/style";
import CariocaClient from "./cariocaClient";

export default function Carioca() {
  return (
    <Background>
      {/* CONTEÚDO PARA GOOGLE */}
      <section className="sr-only">
        <h1>Campeonato Carioca — jogos ao vivo e tabela</h1>

        <p>
          Acompanhe o Campeonato Carioca com jogos ao vivo, tabela
          atualizada, classificação, artilharia e agenda completa das
          partidas.
        </p>

        <p>
          Veja resultados em tempo real, próximos confrontos e
          estatísticas detalhadas dos principais clubes do Rio de
          Janeiro.
        </p>
      </section>

      {/* SITE REAL */}
      <CariocaClient />
    </Background>
  );
}
