'use client';
import Header from "@/app/componentes/cabeçalho/header";
import TabelaCarioca from "@/app/componentes/tabelas/tabelaCarioca.js";
import { JogosCarioca } from '@/app/componentes/jogos/widget.js';
import { AgendaCarioca } from "@/app/componentes/agenda/widjet.js";
import Background from "@/app/home/style";
import { useTranslation } from 'react-i18next';

export default function Carioca() {
  const { t } = useTranslation();
  return (
    <Background>
      <Header />
      <TabelaCarioca />
      <JogosCarioca />
      <AgendaCarioca />
    </Background>
  );
}