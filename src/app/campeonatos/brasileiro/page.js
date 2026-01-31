import Background from "@/app/home/style.js";
import BrasileiroClient from "./brasileiroClient.js";

export default function Brasileiro() {
  return (
    <Background>
      {/* CONTEÚDO PARA GOOGLE */}
      <section className="sr-only">
        <h1>Campeonato Brasileiro — jogos ao vivo e tabela</h1>

        <p>
          Acompanhe o Campeonato Brasileiro com jogos ao vivo, tabela
          atualizada, classificação, artilharia e agenda completa das
          partidas.
        </p>

        <p>
          Veja resultados em tempo real, próximos confrontos e
          estatísticas detalhadas dos principais clubes do Brasil.
        </p>
      </section>

      {/* SITE REAL */}
      <BrasileiroClient />
    </Background>
  );
}