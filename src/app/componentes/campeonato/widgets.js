'use client';
import { useTranslation } from 'react-i18next';
import Link from "next/link.js";

export const CampeonatoBrasileiro = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="/campeonatos/brasileiro"
      className="
    relative w-full max-w-md mx-auto mb-10
    rounded-xl overflow-hidden
    bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
    border border-orange-400/30
    shadow-[0_0_30px_rgba(255,165,0,0.2)]
    p-8
    text-white
    flex flex-col items-center justify-center
    transition-all duration-300
    hover:scale-[1.02]
    hover:shadow-[0_0_45px_rgba(255,165,0,0.35)]
  "
    >
      {/* Linha decorativa UEFA */}
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

      {/* Logo */}
      <img
        src="https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png"
        alt="Brasileirão"
        className="mb-5 w-24 h-24 object-contain drop-shadow-[0_0_10px_rgba(255,165,0,0.4)]"
      />

      {/* Título */}
      <h2 className="text-2xl md:text-4xl font-light tracking-widest uppercase text-orange-400 mb-4">
        Brasileirão
      </h2>

      {/* Descrição */}
      <p className="text-center text-sm md:text-base text-zinc-300 leading-relaxed max-w-xs">
        {t('descricaocamp')}  
      </p>
    </Link>

  );
}
export const CampeonatoCopaBrasil = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="/campeonatos/copabrasil"
      className="
    relative w-full max-w-md mx-auto mb-10
    rounded-xl overflow-hidden
    bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
    border border-orange-400/30
    shadow-[0_0_30px_rgba(255,165,0,0.2)]
    p-8
    text-white
    flex flex-col items-center justify-center
    transition-all duration-300
    hover:scale-[1.02]
    hover:shadow-[0_0_45px_rgba(255,165,0,0.35)]
  "
    >
      {/* Linha decorativa UEFA */}
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

      {/* Logo */}
      <img
        src="https://cdn.api-futebol.com.br/campeonatos/escudos/copa-do-brasil.png"
        alt="Copa Brasil"
        className="mb-5 w-24 h-24 object-contain drop-shadow-[0_0_10px_rgba(255,165,0,0.4)]"
      />

      {/* Título */}
      <h2 className="text-2xl md:text-4xl font-light tracking-widest uppercase text-orange-400 mb-4">
        Copa Brasil
      </h2>

      {/* Descrição */}
      <p className="text-center text-sm md:text-base text-zinc-300 leading-relaxed max-w-xs">
        {t('descricaocamp')}
      </p>
    </Link>

  );
}
export const CampeonatoCopaMundo = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="/campeonatos/copamundo"
      className="
    relative w-full max-w-md mx-auto mb-10
    rounded-xl overflow-hidden
    bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
    border border-orange-400/30
    shadow-[0_0_30px_rgba(255,165,0,0.2)]
    p-8
    text-white
    flex flex-col items-center justify-center
    transition-all duration-300
    hover:scale-[1.02]
    hover:shadow-[0_0_45px_rgba(255,165,0,0.35)]
  "
    >
      {/* Linha decorativa UEFA */}
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

      {/* Logo */}
      <img
        src="https://cdn.api-futebol.com.br/campeonatos/logos/copa-do-mundo-2026.png"
        alt="Copa Mundo"
        className="mb-5 w-24 h-24 object-contain drop-shadow-[0_0_10px_rgba(255,165,0,0.4)]"
      />

      {/* Título */}
      <h2 className="text-2xl md:text-4xl font-light tracking-widest uppercase text-orange-400 mb-4">
        {t('copaMundo')}
      </h2>

      {/* Descrição */}
      <p className="text-center text-sm md:text-base text-zinc-300 leading-relaxed max-w-xs">
        {t('descricaocamp')}
      </p>
    </Link>

  );
} 

export default function WidgetsCampeonato() {
  const { t } = useTranslation();
  return (
    <>

      <section id="campeonatos" className="w-full md:w-3/4  mx-auto flex-wrap items-center justify-center px-6 ">
        <h1 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('campeonatos')}</h1>
        <div className="md:flex-wrap md:flex gap-3 md:gap-6">
          <CampeonatoCopaMundo />
          <CampeonatoBrasileiro />
          <CampeonatoCopaBrasil />
        </div>
      </section>

    </>
  );
}