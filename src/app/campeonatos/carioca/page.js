'use client';
import TabelaCarioca from "@/app/componentes/tabelas/tabelaCarioca.js";
import { AoVivoCariocaWidget } from "@/app/componentes/jogos/widget";
import { AgendaCarioca } from "@/app/componentes/agenda/widget.js";
import Background from "@/app/home/style";
import { useTranslation } from 'react-i18next';
import  ArtilheirosCarioca  from "@/app/componentes/artilheiro/artilheiroCarioca.js";
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header.js";
import AnuncioBody from "@/app/componentes/anuncio/anuncioBody.js";
import AnuncioHeader from "@/app/componentes/anuncio/anuncioHeader.js";
import Footer from "@/app/componentes/footer/footer.js";

export default function Carioca() {
  const { t } = useTranslation();
  return (
    <Background>
      <HeaderCampeonato />
      <AnuncioHeader />
      <TabelaCarioca />
      <AoVivoCariocaWidget  />
      <AnuncioBody />
      <AgendaCarioca />
      <ArtilheirosCarioca />
      <AnuncioBody />
      <Footer />
    </Background>
  );
}