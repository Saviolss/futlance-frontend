'use client';

import { useTranslation } from 'react-i18next';
import { AgendaPaulista } from "@/app/componentes/agenda/widget.js";
import ArtilheirosPaulista from "@/app/componentes/artilheiro/artilheiroPaulista.js";
import { HeaderCampeonato } from "@/app/componentes/cabeçalho/header.js";
import Footer from "@/app/componentes/footer/footer.js";
import { AoVivoPaulistaWidget } from "@/app/componentes/jogos/widget";
import TabelaPaulista from "@/app/componentes/tabelas/tabelaPaulista.js";
import Background from "@/app/home/style";

export default function PaulistaClient() {
  const { t } = useTranslation();
  return (
    <Background>
      <HeaderCampeonato />
      <TabelaPaulista />
      <AoVivoPaulistaWidget />
      <AgendaPaulista />
      <ArtilheirosPaulista />
      <Footer />
    </Background>
  );
}