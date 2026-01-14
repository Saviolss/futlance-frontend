'use client';
import TabelaBrasileiro from "@/app/componentes/tabelas/tabelaBrasileiro.js";
import { AoVivoBrasileiraoWidget } from "@/app/componentes/jogos/widget";
import { AgendaBrasileiro } from "@/app/componentes/agenda/widget.js";
import Background from "@/app/home/style";
import { useTranslation } from 'react-i18next';
import  ArtilheirosBrasileirao  from "@/app/componentes/artilheiro/artilheiroBrasileiro.js";
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header.js";
import AnuncioHeader from "@/app/componentes/anuncio/anuncioHeader.js";
import AnuncioBody from "@/app/componentes/anuncio/anuncioBody.js";
import Footer from "@/app/componentes/footer/footer.js";



export default function Brasileiro() {
  const { t } = useTranslation();
  return (
    <Background>
      <HeaderCampeonato />
      <AnuncioHeader />
      <TabelaBrasileiro />
      <AoVivoBrasileiraoWidget />
      <AnuncioBody />
      <AgendaBrasileiro />
      <ArtilheirosBrasileirao />
      <AnuncioBody />
      <Footer />
    </Background>
  );
}