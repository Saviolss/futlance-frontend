// Página principal movida de src/paginas/home/page.js
'use client';
import {Header} from "./componentes/cabeçalho/header.js";
import Background from "./home/style.js";
import { useTranslation } from 'react-i18next';
import WidgetsCampeonato from "./componentes/campeonato/widgets.js";
import { WidgetAoVivo } from "./componentes/jogos/widget.js";
import { AgendaCompleta } from "@/app/componentes/agenda/widget.js";
import AnuncioHeader from "./componentes/anuncio/anuncioHeader.js";
import AnuncioBody from "./componentes/anuncio/anuncioBody.js";
import Footer from "./componentes/footer/footer.js";

export default function Home() {
  const { t } = useTranslation();
  return (
    <main >
      <Header />
      <AnuncioHeader />
      <Background >
        <WidgetAoVivo />
        <AgendaCompleta />
        <AnuncioBody />
        <section id="campeonatos" className="w-full md:w-3/4  mx-auto flex-wrap items-center justify-center px-6 ">
          <h1 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('campeonatos')}</h1>
          <div className="md:flex-wrap md:flex gap-3 md:gap-6">
            <WidgetsCampeonato />
          </div>
        </section>
        <Footer />
      </Background>
    </main>
  );
}
