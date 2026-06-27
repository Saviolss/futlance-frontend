'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import i18n from '../../../../i18n';
import Logo from "../../../../public/logo.png"

export  function Header() {
	const [showTranslate, setShowTranslate] = useState(false);
	const { t } = useTranslation();
	const handleChangeLanguage = (lang) => {
		i18n.changeLanguage(lang);
		setShowTranslate(false);
	};

	const [showNav, setShowNav] = useState(true)

	useEffect(() => {
		let lastScroll = 0

		const handleScroll = () => {
			const current = window.scrollY

			if (current < 50) {
				setShowNav(true)
			} else if (current > lastScroll) {
				// rolando para baixo -> esconde
				setShowNav(false)
			} else {
				// rolando para cima -> mostra
				setShowNav(true)
			}

			lastScroll = current
		}

		window.addEventListener("scroll", handleScroll)

		return () =>
			window.removeEventListener("scroll", handleScroll)
	}, [])
	return (
		<>
		<header className="hidden w-full md:flex flex-col bg-black sm:py-0.5 md:py-1 shadow-md px-1.5  shadow-orange-400">
			<nav className="max-w-7xl mx-auto py-0">
				<Image src={Logo} alt="Logo Futlance" className="mx-auto py-1.5 h-20 w-65 md:h-25 md:w-70 md:py-2"/>
				<ul className="flex justify-center flex-wrap gap-5 mt-0 md:mt-1 text-white font-normal">
					{/* Início */}
					<li className="flex flex-col items-center">
						<Link href="/noticia" className="flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para inicio">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
								<path d="M4 4h16v16H4z"/>
								<line x1="4" y1="8" x2="20" y2="8"/>
								<line x1="12" y1="4" x2="12" y2="20"/>
							</svg>
							{t('noticias')}
						</Link> 
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
								<button className="px-3 py-1 bg-white text-[#010056] rounded hover:bg-gray-200" onClick={() => handleChangeLanguage('fr')}>FR</button>
								<button className="px-3 py-1 bg-white text-[#010056] rounded hover:bg-gray-200" onClick={() => handleChangeLanguage('de')}>DE</button>
								<button className="px-3 py-1 bg-white text-[#010056] rounded hover:bg-gray-200" onClick={() => handleChangeLanguage('it')}>IT</button>
							</div>
						)}
					</li>
				</ul>
			</nav>
		</header>
			<button
				className="
          fixed
					hidden
					md:block
          bottom-5 right-5
          z-50
					bg-orange-400
					text-white
          p-3
          rounded-full
          shadow-xl
          transition
        "
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				aria-label="Voltar ao topo"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M12 19V5M5 12l7-7 7 7" />
				</svg>
			</button>

			{/* ================= MOBILE ================= */}

			<div className="md:hidden">

				{/* Logo */}
				<div
					className="
      bg-black
      border-b-2
      border-orange-400
      shadow-[0_0_20px_rgba(251,146,60,.35)]
      flex
      justify-center
      py-3
    "
				>
					<Image
						src={Logo}
						alt="Logo Futlance"
						className="w-52 h-auto"
						priority
					/>
				</div>

				{/* Barra inferior */}

				<nav
					className={`
      fixed
      bottom-0
      left-0
      right-0
      z-50

      bg-[#050816]/95
      backdrop-blur-xl

      border-t
      border-orange-400/30

      shadow-[0_-10px_35px_rgba(0,0,0,.55)]

      transition-all
      duration-300

      ${showNav
							? "translate-y-0"
							: "translate-y-full"
						}
    `}
				>

					<ul className="flex justify-around items-center h-18 pb-[env(safe-area-inset-bottom)]">

						{/* Notícias */}

						<li>

							<Link
								href="/noticia"
								className="flex flex-col items-center gap-1 text-zinc-300 active:text-orange-400"
							>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M4 4h16v16H4z" />
									<line x1="4" y1="8" x2="20" y2="8" />
									<line x1="12" y1="4" x2="12" y2="20" />
								</svg>

								<span className="text-[11px]">
									{t("noticias")}
								</span>

							</Link>

						</li>

						{/* Agenda */}

						<li>

							<a
								href="#agenda"
								className="flex flex-col items-center gap-1 text-zinc-300 active:text-orange-400"
							>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<rect x="3" y="4" width="18" height="18" rx="2" />
									<line x1="8" y1="2" x2="8" y2="6" />
									<line x1="16" y1="2" x2="16" y2="6" />
									<line x1="3" y1="10" x2="21" y2="10" />
								</svg>

								<span className="text-[11px]">
									{t("agenda")}
								</span>

							</a>

						</li>

						{/* Campeonatos */}

						<li>

							<a
								href="#campeonatos"
								className="flex flex-col items-center gap-1 text-zinc-300 active:text-orange-400"
							>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M8 21h8" />
									<path d="M12 17v4" />
									<path d="M7 4h10" />
									<path d="M17 4v4a5 5 0 0 1-10 0V4" />
								</svg>

								<span className="text-[11px]">
									{t("campeonatos")}
								</span>

							</a>

						</li>

						{/* Traduzir */}

						<li className="relative">

							<button
								onClick={() => setShowTranslate(v => !v)}
								className="flex flex-col items-center gap-1 text-zinc-300 active:text-orange-400"
							>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<circle cx="12" cy="12" r="10" />
									<path d="M2 12h20" />
									<path d="M12 2a15 15 0 0 1 4 10a15 15 0 0 1-4 10a15 15 0 0 1-4-10a15 15 0 0 1 4-10z" />
								</svg>

								<span className="text-[11px]">
									{t("traduzir")}
								</span>

							</button>

							{showTranslate && (

								<div
									className="
              absolute
              bottom-20
              right-0

              bg-[#0b1120]
              border
              border-orange-400/30

              rounded-xl

              p-2
              
          
              gap-2
							flex
							flex-col
							items-center
							min-w-10

              shadow-2xl
            "
								>

									<button onClick={() => handleChangeLanguage("pt")} className="bg-white rounded px-2 py-1 text-black">PT</button>

									<button onClick={() => handleChangeLanguage("en")} className="bg-white rounded px-2 py-1 text-black">EN</button>

									<button onClick={() => handleChangeLanguage("es")} className="bg-white rounded px-2 py-1 text-black">ES</button>

									<button onClick={() => handleChangeLanguage("fr")} className="bg-white rounded px-2 py-1 text-black">FR</button>

									<button onClick={() => handleChangeLanguage("de")} className="bg-white rounded px-2 py-1 text-black">DE</button>

									<button onClick={() => handleChangeLanguage("it")} className="bg-white rounded px-2.5 py-1 text-black">IT</button>

								</div>

							)}

						</li>

					</ul>

				</nav>

			</div>
		</>
	);
}

export function HeaderCampeonato() {
	const { t } = useTranslation();

	const [showNav, setShowNav] = useState(true)

	useEffect(() => {
		let lastScroll = 0

		const handleScroll = () => {
			const current = window.scrollY

			if (current < 50) {
				setShowNav(true)
			} else if (current > lastScroll) {
				// rolando para baixo -> esconde
				setShowNav(false)
			} else {
				// rolando para cima -> mostra
				setShowNav(true)
			}

			lastScroll = current
		}

		window.addEventListener("scroll", handleScroll)

		return () =>
			window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<>
		<header className="hidden w-full md:flex flex-col bg-black sm:py-0.5 md:py-1 shadow-md px-1.5 shadow-orange-400">
			<nav className="max-w-7xl mx-auto py-0">
				<Image src={Logo} alt="Logo Futlance" className="mx-auto py-1.5 h-20 w-65 md:h-25 md:w-70 md:py-2" />
				<ul className="flex justify-center flex-wrap gap-5 mt-0 md:mt-1 text-white font-normal">
					{/* Início */}
					<li className="flex flex-col items-center">
						<Link href="/" className=" flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para inicio">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><path d="M3 9l9-7 9 7" /><path d="M9 22V12h6v10" /></svg>
							{t('inicio')}
						</Link>
					</li>
					{/* Ao vivo */}
					<li className="flex flex-col items-center">
						<a href="#aovivo" className="flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para ao vivo">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
							{t('aovivo')}
						</a>
					</li>
					{/* Agenda */}
					<li className="flex flex-col items-center">
						<a href="#agenda" className="flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para agenda">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
							{t('agenda')}
						</a>
					</li>
					{/* tabela */}
					<li className="flex flex-col items-center">
						<a href="#tabela" className="flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para tabela">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
							{t('tabela')}
						</a>
					</li>
					{	/* artilheiros */}
					<li className="flex flex-col items-center">
						<a href="#artilheiros" className="flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para artilheiros">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><path d="M12 20h9"/><path d="M16 4l4 4l-4 4"/><path d="M8 4l-4 4l4 4"/><path d="M12 4v16"/></svg>
							{t('artilheiros')}
						</a>
					</li>
				</ul>
			</nav>
		</header>
			<button
				className="
          fixed
					hidden
					md:block
          bottom-5 right-5
          z-50
					bg-orange-400
					text-white
          p-3
          rounded-full
          shadow-xl
          transition
        "
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				aria-label="Voltar ao topo"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M12 19V5M5 12l7-7 7 7" />
				</svg>
			</button>

			{/* ================= MOBILE ================= */}
			<div className="md:hidden">

				{/* Logo */}
				<header className="sticky top-0 z-50 bg-black border-b border-orange-400 shadow-lg shadow-orange-400/20">
					<div className="flex justify-center py-3">
						<Image
							src={Logo}
							alt="Logo Futlance"
							className="h-16 w-auto"
						/>
					</div>
				</header>

				{/* Menu inferior */}
				<nav
					className={`
      fixed bottom-0 left-0 right-0 z-50
      bg-[#090d17]/95 backdrop-blur-xl
      border-t border-orange-400/30
      shadow-[0_-8px_30px_rgba(0,0,0,.45)]
      transition-all duration-300
      ${showNav ? "translate-y-0" : "translate-y-full"}
    `}
				>
					<ul className="grid grid-cols-5 h-16 text-white">

						{/* Início */}
						<li>
							<Link
								href="/"
								className="flex flex-col items-center justify-center h-full text-[11px]"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M3 9l9-7 9 7" />
									<path d="M9 22V12h6v10" />
								</svg>

								<span>{t("inicio")}</span>
							</Link>
						</li>

						{/* Ao vivo */}
						<li>
							<a
								href="#aovivo"
								className="flex flex-col items-center justify-center h-full text-[11px]"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
									<circle cx="12" cy="12" r="10" />
									<circle cx="12" cy="12" r="4" />
								</svg>

								<span>{t("aovivo")}</span>
							</a>
						</li>

						{/* Agenda */}
						<li>
							<a
								href="#agenda"
								className="flex flex-col items-center justify-center h-full text-[11px]"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
									<rect x="3" y="4" width="18" height="18" rx="2" />
									<line x1="16" y1="2" x2="16" y2="6" />
									<line x1="8" y1="2" x2="8" y2="6" />
									<line x1="3" y1="10" x2="21" y2="10" />
								</svg>

								<span>{t("agenda")}</span>
							</a>
						</li>

						{/* Tabela */}
						<li>
							<a
								href="#tabela"
								className="flex flex-col items-center justify-center h-full text-[11px]"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
									<rect x="3" y="3" width="18" height="18" rx="2" />
									<line x1="3" y1="9" x2="21" y2="9" />
									<line x1="9" y1="3" x2="9" y2="21" />
								</svg>

								<span>{t("tabela")}</span>
							</a>
						</li>

						{/* Artilheiros */}
						<li>
							<a
								href="#artilheiros"
								className="flex flex-col items-center justify-center h-full text-[11px]"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M12 20h9" />
									<path d="M16 4l4 4-4 4" />
									<path d="M8 4L4 8l4 4" />
									<path d="M12 4v16" />
								</svg>

								<span>{t("artilheiros")}</span>
							</a>
						</li>

					</ul>
				</nav>

			</div>
		</>
	);
}

export function HeaderTime() {
	const { t } = useTranslation();

	const [showNav, setShowNav] = useState(true)

	useEffect(() => {
		let lastScroll = 0

		const handleScroll = () => {
			const current = window.scrollY

			if (current < 50) {
				setShowNav(true)
			} else if (current > lastScroll) {
				// rolando para baixo -> esconde
				setShowNav(false)
			} else {
				// rolando para cima -> mostra
				setShowNav(true)
			}

			lastScroll = current
		}

		window.addEventListener("scroll", handleScroll)

		return () =>
			window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<>
			<header className="hidden w-full md:flex flex-col bg-black sm:py-0.5 md:py-1 shadow-md px-1.5 shadow-orange-400">

				<nav className="max-w-7xl mx-auto py-0">

					<Image
						src={Logo}
						alt="Logo Futlance"
						className="mx-auto py-1.5 h-20 w-65 md:h-25 md:w-70 md:py-2"
					/>

					<ul className="flex justify-center flex-wrap gap-5 mt-0 md:mt-1 text-white font-normal">

						{/* Início */}

						<li className="flex flex-col items-center">

							<Link
								href="/campeonatos/copamundo"
								className="flex flex-col items-center md:hover:border-b-2 cursor-pointer"
								alt="Voltar para página anterior"
							>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="mb-1"
								>
									<line x1="19" y1="12" x2="5" y2="12" />
									<polyline points="12 19 5 12 12 5" />
								</svg>

								{t("anterior")}

							</Link>

						</li>

						{/* Estatísticas */}

						<li className="flex flex-col items-center">

							<a
								href="#estatisticas"
								className="flex flex-col items-center md:hover:border-b-2 cursor-pointer"
							>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="mb-1"
								>
									<path d="M18 20V10" />
									<path d="M12 20V4" />
									<path d="M6 20v-6" />
								</svg>

								{t("estatisticas")}

							</a>

						</li>

						{/* Jogos */}

						<li className="flex flex-col items-center">

							<a
								href="#jogos"
								className="flex flex-col items-center md:hover:border-b-2 cursor-pointer"
							>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="mb-1"
								>
									<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10"></line>
								</svg>

								{t("jogos")}

							</a>

						</li>

						{/* Elenco */}

						<li className="flex flex-col items-center">

							<a
								href="#elenco"
								className="flex flex-col items-center md:hover:border-b-2 cursor-pointer"
							>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="mb-1"
								>
									<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
									<circle cx="9" cy="7" r="4" />
									<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
									<path d="M16 3.13a4 4 0 0 1 0 7.75" />
								</svg>

								{t("elenco")}

							</a>

						</li>

					</ul>

				</nav>

			</header>

			{/* Botão topo */}

			<button
				className="
          fixed
					hidden
					md:block
          bottom-5
          right-5
          z-50
          bg-orange-400
          text-white
          p-3
          rounded-full
          shadow-xl
          transition
          hover:scale-110
        "
				onClick={() =>
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					})
				}
				aria-label="Voltar ao topo"
			>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M12 19V5M5 12l7-7 7 7" />
				</svg>

			</button>

			{/* ================= MOBILE / TABLET ================= */}
			<div className="md:hidden">

				{/* Logo */}
				<header className="sticky top-0 z-50 bg-black border-b border-orange-400 shadow-lg shadow-orange-400/20">
					<div className="flex justify-center py-3">
						<Image
							src={Logo}
							alt="Logo Futlance"
							className="h-16 w-auto"
						/>
					</div>
				</header>

				{/* Menu inferior */}
				<nav
					className={`
      fixed bottom-0 left-0 right-0 z-50
      bg-[#090d17]/95 backdrop-blur-xl
      border-t border-orange-400/30
      shadow-[0_-8px_30px_rgba(0,0,0,.45)]
      transition-all duration-300
      ${showNav ? "translate-y-0" : "translate-y-full"}
    `}
				>
					<ul className="grid grid-cols-4 h-16 text-white">

						{/* Voltar */}
						<li>
							<Link
								href="/campeonatos/copamundo"
								className="flex flex-col items-center justify-center h-full text-[11px]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<line x1="19" y1="12" x2="5" y2="12" />
									<polyline points="12 19 5 12 12 5" />
								</svg>

								<span>{t("anterior")}</span>
							</Link>
						</li>

						{/* Estatísticas */}
						<li>
							<a
								href="#estatisticas"
								className="flex flex-col items-center justify-center h-full text-[11px]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M18 20V10" />
									<path d="M12 20V4" />
									<path d="M6 20v-6" />
								</svg>

								<span>{t("estatisticas")}</span>
							</a>
						</li>

						{/* Jogos */}
						<li>
							<a
								href="#jogos"
								className="flex flex-col items-center justify-center h-full text-[11px]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<rect x="3" y="4" width="18" height="18" rx="2" />
									<line x1="16" y1="2" x2="16" y2="6" />
									<line x1="8" y1="2" x2="8" y2="6" />
									<line x1="3" y1="10" x2="21" y2="10" />
								</svg>

								<span>{t("jogos")}</span>
							</a>
						</li>

						{/* Elenco */}
						<li>
							<a
								href="#elenco"
								className="flex flex-col items-center justify-center h-full text-[11px]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
									<circle cx="9" cy="7" r="4" />
									<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
									<path d="M16 3.13a4 4 0 0 1 0 7.75" />
								</svg>

								<span>{t("elenco")}</span>
							</a>
						</li>

					</ul>
				</nav>

			</div>
		</>
	);
}

export function HeaderNoticias() {
	const { t } = useTranslation();

	const [showNav, setShowNav] = useState(true)

	useEffect(() => {
		let lastScroll = 0

		const handleScroll = () => {
			const current = window.scrollY

			if (current < 50) {
				setShowNav(true)
			} else if (current > lastScroll) {
				// rolando para baixo -> esconde
				setShowNav(false)
			} else {
				// rolando para cima -> mostra
				setShowNav(true)
			}

			lastScroll = current
		}

		window.addEventListener("scroll", handleScroll)

		return () =>
			window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<>
			<header className="hidden w-full md:flex flex-col bg-black sm:py-0.5 md:py-1 shadow-md px-1.5 shadow-orange-400">
				<nav className="max-w-7xl mx-auto py-0">
					<Image src={Logo} alt="Logo Futlance" className="mx-auto py-1.5 h-20 w-65 md:h-25 md:w-70 md:py-2" />
					<ul className="flex justify-center flex-wrap gap-5 mt-0 md:mt-1 text-white font-normal">
						{/* Início */}
						<li className="flex flex-col items-center">
							<Link href="/" className=" flex flex-col items-center md:hover:border-b-2 cursor-pointer" alt="botão de navegar para inicio">
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><path d="M3 9l9-7 9 7" /><path d="M9 22V12h6v10" /></svg>
								{t('inicio')}
							</Link>
						</li>
					</ul>
				</nav>
			</header>
			<button
				className="
          fixed
					hidden
          bottom-5 right-5
          z-50
					bg-orange-400
					text-white
          p-3
          rounded-full
          shadow-xl
          transition
        "
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				aria-label="Voltar ao topo"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M12 19V5M5 12l7-7 7 7" />
				</svg>
			</button>

			{/* ================= MOBILE ================= */}
			<div className="md:hidden">

				{/* Logo */}
				<header className="sticky top-0 z-50 bg-black border-b border-orange-400 shadow-lg shadow-orange-400/20">
					<div className="flex justify-center py-3">
						<Image
							src={Logo}
							alt="Logo Futlance"
							className="h-16 w-auto"
						/>
					</div>
				</header>

				{/* Menu inferior */}
				<nav
					className={`
      fixed bottom-0 left-0 right-0 z-50
      bg-[#090d17]/95 backdrop-blur-xl
      border-t border-orange-400/30
      shadow-[0_-8px_30px_rgba(0,0,0,.45)]
      transition-all duration-300
      ${showNav ? "translate-y-0" : "translate-y-full"}
    `}
				>
					<ul className="w-full mx-auto h-16 text-white">

						{/* Início */}
						<li>
							<Link
								href="/"
								className="flex flex-col items-center justify-center h-full text-[11px]"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M3 9l9-7 9 7" />
									<path d="M9 22V12h6v10" />
								</svg>

								<span>{t("inicio")}</span>
							</Link>
						</li>

					</ul>
				</nav>

			</div>
		</>
	);
}

