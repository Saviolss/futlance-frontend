'use client';

import { useTranslation } from 'react-i18next';
import { AgendaBrasileiro } from '@/app/componentes/agenda/widget.js';
import ArtilheirosBrasileirao from '@/app/componentes/artilheiro/artilheiroBrasileiro.js';
import { HeaderCampeonato } from '@/app/componentes/cabeçalho/header.js';
import Footer from '@/app/componentes/footer/footer.js';
import { AoVivoBrasileiraoWidget } from '@/app/componentes/jogos/widget.js';
import TabelaBrasileiro from '@/app/componentes/tabelas/tabelaBrasileiro.js';
import Background from '@/app/home/style';

export default function BrasileiroClient() {
  const { t } = useTranslation();
  return (
    <Background>
      <HeaderCampeonato />
      <TabelaBrasileiro />
      <AoVivoBrasileiraoWidget />
      <AgendaBrasileiro />
      <ArtilheirosBrasileirao />
      <Footer />
    </Background>
  );
}