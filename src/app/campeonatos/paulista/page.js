'use client';
import Header from "@/app/componentes/cabeçalho/header";
import TabelaPaulista from "@/app/componentes/tabelas/tabelaPaulista.js";
import { JogosPaulista } from '@/app/componentes/jogos/widget.js';
import { AgendaPaulista } from "@/app/componentes/agenda/widjet.js";
import Background from "@/app/home/style";
import { useTranslation } from 'react-i18next';

export default function Paulista() {
  const { t } = useTranslation();
  return (
    <Background>
      <Header />
      <TabelaPaulista />
      <JogosPaulista />
      <AgendaPaulista />
    </Background>
  );
}