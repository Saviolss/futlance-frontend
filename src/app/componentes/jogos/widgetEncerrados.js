'use client';

import { useTranslation } from "react-i18next";
import { JogosEncerradosSection } from "./jogosEncerradosSection";
import { normalizeJogosData } from "./normalizeJogos";

export default function EncerradosWidget({ jogos = [] }) {
  const { t } = useTranslation();
  const jogosNormalizados = normalizeJogosData(jogos);

  return (
    <div className="w-full">
      <JogosEncerradosSection
        titulo={t("finalizados")}
        jogos={jogosNormalizados}
      />
    </div>
  );
}