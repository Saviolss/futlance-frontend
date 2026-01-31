'use client';

import { useTranslation } from 'react-i18next';
import { AgendaCarioca } from "@/app/componentes/agenda/widget.js";
import ArtilheirosCarioca from "@/app/componentes/artilheiro/artilheiroCarioca.js";
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header.js";
import Footer from "@/app/componentes/footer/footer.js";
import { AoVivoCariocaWidget } from "@/app/componentes/jogos/widget.js";
import TabelaCarioca from "@/app/componentes/tabelas/tabelaCarioca.js";
import Background from "@/app/home/style";

export default function CariocaClient() {
  const { t } = useTranslation();
  return (
    <Background>
      <HeaderCampeonato />
      <TabelaCarioca />
      <AoVivoCariocaWidget  />
      <AgendaCarioca />
      <ArtilheirosCarioca />
      <Footer />
    </Background>
  );
}