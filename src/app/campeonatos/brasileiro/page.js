'use client';
import Header from "@/app/componentes/cabeçalho/header";
import TabelaBrasileiro from "@/app/componentes/tabelas/tabelaBrasileiro.js";
import { JogosBrasileiro } from '@/app/componentes/jogos/widget.js';
import { AgendaBrasileiro } from "@/app/componentes/agenda/widjet.js";
import Background from "@/app/home/style";
import { useTranslation } from 'react-i18next';

export default function Brasileiro() {
  const { t } = useTranslation();
  return (
    <Background>
      <Header />
      <TabelaBrasileiro />
      <JogosBrasileiro />
      <AgendaBrasileiro />
    </Background>
  );
}