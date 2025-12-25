'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import i18n from '../../../../i18n';
import Logo from "../../../../public/logo.png"

export default function Header() {
	const [showTranslate, setShowTranslate] = useState(false);
	const { t } = useTranslation();
	const handleChangeLanguage = (lang) => {
		i18n.changeLanguage(lang);
		setShowTranslate(false);
	};
	return (
		<header className="w-full bg-[#010056] py-0 shadow-md px-1.5">
			<nav className="max-w-7xl mx-auto py-0">
				<Image src={Logo} alt="Logo Futlance" className="mx-auto py-1.5 h-20 w-65 md:h-25 md:w-70 md:py-2"/>
				<ul className="flex justify-center flex-wrap gap-5 mt-0 md:mt-1 text-white font-normal">
					{/* Início */}
					<li className="flex flex-col items-center">
						<Link href="/" className=" flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para inicio">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><path d="M3 9l9-7 9 7"/><path d="M9 22V12h6v10"/></svg>
							{t('inicio')}
						</Link>
					</li>
					{/* Ao vivo */}
					<li className="flex flex-col items-center">
						<a href="#aovivo" className="flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para ao vivo">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
							{t('aovivo')}
						</a>
					</li>
					{/* Agenda */}
					<li className="flex flex-col items-center">
						<a href="#agenda" className="flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para agenda">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
							{t('agenda')}
						</a>
					</li>
					{/* Campeonato */}
					<li className="flex flex-col items-center">
						<a href="#campeonatos" className="flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para campeonato">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10"/><path d="M17 4v4a5 5 0 0 1-10 0V4"/><path d="M3 9a9 9 0 0 0 7.5 8.7"/><path d="M21 9a9 9 0 0 1-7.5 8.7"/></svg>
							{t('campeonatos')}
						</a>
					</li>
				 {  /* Traduzir */}
								<li className="flex flex-col items-center relative">
								<button
									className="md:hover:border-b-2 cursor-pointer focus:outline-none flex flex-col items-center"
									onClick={() => setShowTranslate((v) => !v)}
									aria-label="Abrir opções de tradução"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10a15.3 15.3 0 0 1-4 10a15.3 15.3 0 0 1-4-10a15.3 15.3 0 0 1 4-10z"/></svg>
									{t('traduzir')}
								</button>
								{/* Botões de tradução */}
						{showTranslate && (
							<div className="absolute top-12 left-1/2 -translate-x-1/2 flex md:flex-row flex-col gap-2 bg-[#010056] p-2 rounded shadow-lg z-20 border border-white">
								<button className="px-3 py-1 bg-white text-[#010056] rounded hover:bg-gray-200" onClick={() => handleChangeLanguage('pt')}>PT</button>
								<button className="px-3 py-1 bg-white text-[#010056] rounded hover:bg-gray-200" onClick={() => handleChangeLanguage('en')}>EN</button>
								<button className="px-3 py-1 bg-white text-[#010056] rounded hover:bg-gray-200" onClick={() => handleChangeLanguage('es')}>ES</button>
							</div>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
}