'use client';
import { useTranslation } from 'react-i18next';

export function JogosAoVivo() {
  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
      <h1 id="aovivo" className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('aovivotitulo')}</h1>
      <div className="md:flex md:flex-wrap gap-3">
        <div className="flex mb-3 flex-col  items-center  h-42 mx-auto py-30 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
          <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
          <span className="text-sm  text-red-600 flex font-sans items-center justify-center mb-2 md:text-2md gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse mb-1"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
            <span ><p className="text-green-500 text-xl items-center font-light font-sans ml-3">2T 45:00</p></span>
          </span>
          <div className="flex  text-white text-5xl font-sans md:text-6xl">
            <span className="flex-col  items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl  font-sans">Santos</span>
            </span>

            <span >4</span>
            <span className="mx-6">:</span>
            <span>2</span>

            <span className="flex-col  items-center justify-center">
              <img src='/img/fla.png' alt='flamengo' width={56} height={56} className='w- h-' />
              <span className="text-xl font-sans">Flamengo</span>
            </span>
          </div>
          <p className="text-xl flex items-center justify-center  md:text-2xl mb-2  text-gray-400 ">Vila Belmiro - SP</p>
        </div>
        <div className="flex mb-3 flex-col  items-center  h-42 mx-auto py-30 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
          <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
          <span className="text-sm  text-red-600 flex font-sans items-center justify-center mb-2 md:text-2md gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse mb-1"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
            <span ><p className="text-green-500 text-xl items-center font-light font-sans ml-3">2T 45:00</p></span>
          </span>
          <div className="flex  text-white text-5xl font-sans md:text-6xl">
            <span className="flex-col  items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl  font-sans">Santos</span>
            </span>

            <span >3</span>
            <span className="mx-6">:</span>
            <span>0</span>

            <span className="flex-col  items-center justify-center">
              <img src='/img/fla.png' alt='flamengo' width={56} height={56} className='w- h-' />
              <span className="text-xl font-sans">Flamengo</span>
            </span>
          </div>
          <p className="text-xl flex items-center justify-center  md:text-2xl mb-2  text-gray-400 ">Vila Belmiro - SP</p>
        </div>
      </div>
    </section>
  );
}

export function JogosBrasileiro() {
  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
      <h1 id="aovivo" className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('aovivotitulo')}</h1>
      <div className="md:flex md:flex-wrap gap-3">
        <div className="flex mb-3 flex-col  items-center  h-42 mx-auto py-30 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
          <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
          <span className="text-sm  text-red-600 flex font-sans items-center justify-center mb-2 md:text-2md gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse mb-1"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
            <span ><p className="text-green-500 text-xl items-center font-light font-sans ml-3">2T 45:00</p></span>
          </span>
          <div className="flex  text-white text-5xl font-sans md:text-6xl">
            <span className="flex-col  items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl  font-sans">Santos</span>
            </span>

            <span >4</span>
            <span className="mx-6">:</span>
            <span>2</span>

            <span className="flex-col  items-center justify-center">
              <img src='/img/fla.png' alt='flamengo' width={56} height={56} className='w- h-' />
              <span className="text-xl font-sans">Flamengo</span>
            </span>
          </div>
          <p className="text-xl flex items-center justify-center  md:text-2xl mb-2  text-gray-400 ">Vila Belmiro - SP</p>
        </div>
      </div>
    </section>
  );
}

export function JogosPaulista() {
  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
      <h1 id="aovivo" className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('aovivotitulo')}</h1>
      <div className="md:flex md:flex-wrap gap-3">
        <div className="flex mb-3 flex-col  items-center  h-42 mx-auto py-30 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
          <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
          <span className="text-sm  text-red-600 flex font-sans items-center justify-center mb-2 md:text-2md gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse mb-1"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
            <span ><p className="text-green-500 text-xl items-center font-light font-sans ml-3">2T 45:00</p></span>
          </span>
          <div className="flex  text-white text-5xl font-sans md:text-6xl">
            <span className="flex-col  items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl  font-sans">Santos</span>
            </span>

            <span >4</span>
            <span className="mx-6">:</span>
            <span>2</span>

            <span className="flex-col  items-center justify-center">
              <img src='/img/fla.png' alt='flamengo' width={56} height={56} className='w- h-' />
              <span className="text-xl font-sans">Flamengo</span>
            </span>
          </div>
          <p className="text-xl flex items-center justify-center  md:text-2xl mb-2  text-gray-400 ">Vila Belmiro - SP</p>
        </div>
      </div>
    </section>
  );
}

export function JogosCarioca() {
  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
      <h1 id="aovivo" className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('aovivotitulo')}</h1>
      <div className="md:flex md:flex-wrap gap-3">
        <div className="flex mb-3 flex-col  items-center  h-42 mx-auto py-30 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
          <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
          <span className="text-sm  text-red-600 flex font-sans items-center justify-center mb-2 md:text-2md gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse mb-1"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
            <span ><p className="text-green-500 text-xl items-center font-light font-sans ml-3">2T 45:00</p></span>
          </span>
          <div className="flex  text-white text-5xl font-sans md:text-6xl">
            <span className="flex-col  items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl  font-sans">Santos</span>
            </span>

            <span >4</span>
            <span className="mx-6">:</span>
            <span>2</span>

            <span className="flex-col  items-center justify-center">
              <img src='/img/fla.png' alt='flamengo' width={56} height={56} className='w- h-' />
              <span className="text-xl font-sans">Flamengo</span>
            </span>
          </div>
          <p className="text-xl flex items-center justify-center  md:text-2xl mb-2  text-gray-400 ">Vila Belmiro - SP</p>
        </div>
      </div>
    </section>
  );
}
