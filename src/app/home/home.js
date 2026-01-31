'use client';

import { useTranslation } from "react-i18next";
import { AgendaCompleta } from "../componentes/agenda/widget.js";
import WidgetsCampeonato from "../componentes/campeonato/widgets.js";
import Footer from "../componentes/footer/footer.js";
import { WidgetAoVivo } from "../componentes/jogos/widget.js";
import Background from "./style.js";

export function Home() {
  const { t } = useTranslation();
  return (
    <main >
      <Background >
        <WidgetAoVivo />
        <AgendaCompleta />
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