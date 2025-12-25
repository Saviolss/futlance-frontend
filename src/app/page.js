// Página principal movida de src/paginas/home/page.js
'use client';
import Header from "./componentes/cabeçalho/header.js";
import Background from "./home/style.js";
import { useTranslation } from 'react-i18next';
import Image from "next/image.js";
import Santos from './home/img/san.png';
import Flamengo from './home/img/fla.png';
import Brasileirao from './home/img/bra.png';
import Link from "next/link.js";

export default function Home() {
  const { t } = useTranslation();
  return (
    <main >
      <Header />
      <Background >
        <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
          <h1 id="aovivo" className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('aovivotitulo')}</h1>
          <div className="md:flex md:flex-wrap gap-3">
            <div className="flex mb-3 flex-col  items-center  h-42 mx-auto py-25 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
              <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
              <span className="text-sm  text-red-600 flex font-sans items-center justify-center mb-2 md:text-2md gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse mb-1"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
                <span ><p className="text-green-500 text-xl items-center font-light font-sans ml-3">2T 45:00</p></span>
              </span>
              <div className="flex  text-white text-5xl font-sans md:text-6xl">
                <span className="flex gap-3 items-center justify-center">
                  <Image src={Santos} alt="Time 1" width={56} height={56} className="w-14 h-14 " />
                  <span >4</span>
                </span>
                <span className="mx-6">:</span>
                <span className="flex gap-3 items-center justify-center">
                  <span>2</span>
                  <Image src={Flamengo} alt="Time 2" width={56} height={56} className="w-14 h-14 " />
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
          <h1 id="agenda" className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('agendadejogos')}</h1>
          <div className="md:flex md:flex-wrap gap-3">
            <div className="flex flex-col  items-center  h-42 mx-auto py-25 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
              <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
              <span className="text-sm  text-gray-400 flex items-center justify-center mb-2 md:text-2md gap-1">
              </span>
              <div className="flex">
                <span className="flex gap-1.5 items-center justify-center">
                  <Image src={Santos} alt="Time 1" width={56} height={56} className="w-14 h-14 " />
                </span>
                <span className="mx-6 text-5xl">:</span>
                <span className="flex gap-1.5 items-center justify-center">
                  <Image src={Flamengo} alt="Time 2" width={56} height={56} className="w-14 h-14 " />
                </span>
              </div>
              <div className="text-xl flex items-center justify-center gap-4 md:text-2xl text-gray-400 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <p>22/01/26</p>
                <p>19:30</p>
              </div>
            </div>
          </div>
        </section>
        <section id="campeonatos" className="w-full md:w-3/4  mx-auto flex-wrap items-center justify-center px-6 ">
          <h1 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('campeonatos')}</h1>
          <div className="md:flex-wrap md:flex gap-3 md:gap-6">
            <Link href="/campeonatos/paulista" className="w-full bg-transparent mx-auto border-2 border-blue-700 rounded-sm p-6 text-white mb-10 flex flex-col items-center justify-center md:w-md">
              <Image src={Brasileirao} alt="Brasileirão Série A" width={200} height={80} className="mb-4 w-28 h-28" />
              <h2 className="text-2xl font-light text-yellow-300 mb-4 font-sans md:text-4xl">Brasileirão Série A</h2>
              <p className="text-center text-md font-sans md:text-xl">Acompanhe as tabelas, resultados e estatísticas em tempo real.</p>
            </Link>
          </div>
        </section>
      </Background>
    </main>
  );
}
