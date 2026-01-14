import { useTranslation } from 'react-i18next';
import Image from "next/image.js";
import Link from "next/link.js";
import Brasileirao from '../../../../public/img/bra.png';

export const CampeonatoBrasileiro = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="/campeonatos/brasileiro"
      className="
    relative w-full max-w-md mx-auto mb-10
    rounded-xl overflow-hidden
    bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
    border border-blue-500/30
    shadow-[0_0_30px_rgba(59,130,246,0.2)]
    p-8
    text-white
    flex flex-col items-center justify-center
    transition-all duration-300
    hover:scale-[1.02]
    hover:shadow-[0_0_45px_rgba(59,130,246,0.35)]
  "
    >
      {/* Linha decorativa UEFA */}
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Logo */}
      <img
        src="https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png"
        alt="Brasileirão"
        className="mb-5 w-24 h-24 object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]"
      />

      {/* Título */}
      <h2 className="text-2xl md:text-4xl font-light tracking-widest uppercase text-blue-300 mb-4">
        Brasileirão
      </h2>

      {/* Descrição */}
      <p className="text-center text-sm md:text-base text-zinc-300 leading-relaxed max-w-xs">
        {t('descricaocamp')}  
      </p>
    </Link>

  );
}
export const CampeonatoPaulista = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="/campeonatos/paulista"
      className="
    relative w-full max-w-md mx-auto mb-10
    rounded-xl overflow-hidden
    bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
    border border-blue-500/30
    shadow-[0_0_30px_rgba(59,130,246,0.2)]
    p-8
    text-white
    flex flex-col items-center justify-center
    transition-all duration-300
    hover:scale-[1.02]
    hover:shadow-[0_0_45px_rgba(59,130,246,0.35)]
  "
    >
      {/* Linha decorativa UEFA */}
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Logo */}
      <img 
        src="https://cdn.api-futebol.com.br/campeonatos/escudos/campeonato-paulista.png"
        alt="Paulista"
        className="mb-5 w-24 h-24 object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]"
      />

      {/* Título */}
      <h2 className="text-2xl md:text-4xl font-light tracking-widest uppercase text-blue-300 mb-4">
        Paulista
      </h2>

      {/* Descrição */}
      <p className="text-center text-sm md:text-base text-zinc-300 leading-relaxed max-w-xs">
        {t('descricaocamp')}
      </p>
    </Link>

  );
}
export const CampeonatoCarioca = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="/campeonatos/carioca"
      className="
    relative w-full max-w-md mx-auto mb-10
    rounded-xl overflow-hidden
    bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
    border border-blue-500/30
    shadow-[0_0_30px_rgba(59,130,246,0.2)]
    p-8
    text-white
    flex flex-col items-center justify-center
    transition-all duration-300
    hover:scale-[1.02]
    hover:shadow-[0_0_45px_rgba(59,130,246,0.35)]
  "
    >
      {/* Linha decorativa UEFA */}
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Logo */}
      <img
        src="https://cdn.api-futebol.com.br/campeonatos/escudos/carioca.png"
        alt="Carioca"
        className="mb-5 w-24 h-24 object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]"
      />

      {/* Título */}
      <h2 className="text-2xl md:text-4xl font-light tracking-widest uppercase text-blue-300 mb-4">
        Carioca
      </h2>

      {/* Descrição */}
      <p className="text-center text-sm md:text-base text-zinc-300 leading-relaxed max-w-xs">
        {t('descricaocamp')}
      </p>
    </Link>

  );
}

export default function WidgetsCampeonato() {
  return (
    <>
      <CampeonatoBrasileiro />
      <CampeonatoPaulista />
      <CampeonatoCarioca />
    </>
  );
}