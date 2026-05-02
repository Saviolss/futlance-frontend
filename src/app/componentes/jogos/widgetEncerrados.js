'use client';

import { useTranslation } from "react-i18next";
import { JogosEncerradosSection } from "./jogosEncerradosSection";

export default function EncerradosWidget({ jogos = [] }) {
  const { t } = useTranslation();

  if (!jogos.length) {
    return null; // não renderiza nada se não houver jogos encerrados
  }

  return (
    <div className="w-full">
      <JogosEncerradosSection
        titulo={t("finalizados")}
        jogos={jogos}
      />
    </div>
  );
}