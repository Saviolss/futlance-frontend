import Background from "@/app/home/style.js";
import PaulistaClient from "./paulistaClient.js";

export default function Paulista() {
  return (
    <Background>
      {/* CONTEÚDO PARA GOOGLE */}
      <section className="sr-only">
        <h1>Campeonato Paulista — jogos ao vivo e tabela</h1>

        <p>
          Acompanhe o Campeonato Paulista com jogos ao vivo, tabela
          atualizada, classificação, artilharia e agenda completa das
          partidas.
        </p>

        <p>
          Veja resultados em tempo real, próximos confrontos e
          estatísticas detalhadas dos principais clubes de São Paulo.
        </p>
      </section>

      {/* SITE REAL */}
      <PaulistaClient />
    </Background>
  );
} 