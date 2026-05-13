import { Header } from "./componentes/cabeçalho/header";
import Background from "./home/style";
import HomePage from "./home/home";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <Background>
        <Header />
        <section className="max-w-5xl mx-auto px-6 mt-5 text-xs flex flex-col items-center text-white gap-2">
          <h1 className="text-base font-medium justify-center text-white">
            Jogos em tempo real e agenda de futebol
          </h1>
          <p>
            Acompanhe partidas ao vivo, placares atualizados
            e a agenda completa dos jogos de hoje.
          </p>
        </section>
        <HomePage />
      </Background>
    </>
  );
}
