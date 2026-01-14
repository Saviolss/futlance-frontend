'use client';
import TabelaPaulista from "@/app/componentes/tabelas/tabelaPaulista.js";
import { AoVivoPaulistaWidget } from "@/app/componentes/jogos/widget";
import { AgendaPaulista } from "@/app/componentes/agenda/widget.js";
import Background from "@/app/home/style";
import { useTranslation } from 'react-i18next';
import ArtilheirosPaulista from "@/app/componentes/artilheiro/artilheiroPaulista.js";
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header.js";
import AnuncioHeader from "@/app/componentes/anuncio/anuncioHeader.js";
import AnuncioBody from "@/app/componentes/anuncio/anuncioBody.js";
import Footer from "@/app/componentes/footer/footer.js";

export default function Paulista() {
  const { t } = useTranslation();
  return (
    <Background>
      <HeaderCampeonato />
      <AnuncioHeader />
      <TabelaPaulista />
      <AoVivoPaulistaWidget />
      <AnuncioBody />
      <AgendaPaulista />
      <ArtilheirosPaulista />
      <AnuncioBody />
      <Footer />
    </Background>
  );
}