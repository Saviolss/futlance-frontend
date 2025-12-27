import { useTranslation } from 'react-i18next';
import Image from "next/image.js";
import Link from "next/link.js";
import Brasileirao from '../../../../public/img/bra.png';

export const CampeonatoBrasileiro = () => {
  const { t } = useTranslation();

  return (
    <Link href="/campeonatos/brasileiro" className="w-full bg-transparent mx-auto border-2 border-blue-700 rounded-sm p-6 text-white mb-10 flex flex-col items-center justify-center md:w-md">
      <Image src={Brasileirao} alt="Brasileirão Série A" width={200} height={80} className="mb-4 w-28 h-28" />
      <h2 className="text-2xl font-light text-yellow-300 mb-4 font-sans md:text-4xl">Brasileirão Série A</h2>
      <p className="text-center text-md font-sans md:text-xl">Acompanhe as tabelas, proximosjogos e jogos em tempo real.</p>
    </Link>
  );
}
export const CampeonatoPaulista = () => {
  const { t } = useTranslation();

  return (
    <Link href="/campeonatos/paulista" className="w-full bg-transparent mx-auto border-2 border-blue-700 rounded-sm p-6 text-white mb-10 flex flex-col items-center justify-center md:w-md">
      <Image src={Brasileirao} alt="Paulista" width={200} height={80} className="mb-4 w-28 h-28" />
      <h2 className="text-2xl font-light text-yellow-300 mb-4 font-sans md:text-4xl">Paulista</h2>
      <p className="text-center text-md font-sans md:text-xl">Acompanhe as tabelas, proximosjogos e jogos em tempo real.</p>
    </Link>
  );
}
export const CampeonatoCarioca = () => {
  const { t } = useTranslation();

  return (
    <Link href="/campeonatos/carioca" className="w-full bg-transparent mx-auto border-2 border-blue-700 rounded-sm p-6 text-white mb-10 flex flex-col items-center justify-center md:w-md">
      <Image src={Brasileirao} alt="Carioca" width={200} height={80} className="mb-4 w-28 h-28" />
      <h2 className="text-2xl font-light text-yellow-300 mb-4 font-sans md:text-4xl">Carioca</h2>
      <p className="text-center text-md font-sans md:text-xl">Acompanhe as tabelas, proximosjogos e jogos em tempo real.</p>
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