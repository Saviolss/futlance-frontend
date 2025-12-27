'use client';
import { useTranslation } from 'react-i18next';

export function AgendaCompleta() {
  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
      <h1 id="agenda" className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('agendadejogos')}</h1>
      <div className="md:flex md:flex-wrap gap-3">
        <div className="flex flex-col mb-3  items-center  h-42 mx-auto py-25 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
          <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
          <span className="text-sm  text-gray-400 flex items-center justify-center mb-2 md:text-2md gap-1">
          </span>
          <div className="flex">
            <span className="flex-col gap-1.5 items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl font-sans">Santos</span>
            </span>
            <span className="mx-6 text-5xl">:</span>
            <span className="flex-col gap-1.5 items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl font-sans">Santos</span>
            </span>
          </div>
          <div className="text-xl flex items-center justify-center gap-4 md:text-2xl text-gray-400 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            <p>22/01/26</p>
            <p>19:30</p>
          </div>
        </div>
        <div className="flex flex-col  items-center  h-42 mx-auto py-25 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
          <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
          <span className="text-sm  text-gray-400 flex items-center justify-center mb-2 md:text-2md gap-1">
          </span>
          <div className="flex">
            <span className="flex-col gap-1.5 items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl font-sans">Santos</span>
            </span>
            <span className="mx-6 text-5xl">:</span>
            <span className="flex-col gap-1.5 items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl font-sans">Santos</span>
            </span>
          </div>
          <div className="text-xl flex items-center justify-center gap-4 md:text-2xl text-gray-400 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            <p>26/01/26</p>
            <p>21:30</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export  function AgendaBrasileiro() {
  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
      <h1 id="agenda" className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('agendadejogos')}</h1>
      <div className="md:flex md:flex-wrap gap-3">
        <div className="flex flex-col mb-3 items-center  h-42 mx-auto py-25 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
          <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
          <span className="text-sm  text-gray-400 flex items-center justify-center mb-2 md:text-2md gap-1">
          </span>
          <div className="flex">
            <span className="flex-col gap-1.5 items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl font-sans">Santos</span>
            </span>
            <span className="mx-6 text-5xl">:</span>
            <span className="flex-col gap-1.5 items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl font-sans">Santos</span>
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
  );
}

export function AgendaPaulista() {
  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
      <h1 id="agenda" className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('agendadejogos')}</h1>
      <div className="md:flex md:flex-wrap gap-3">
        <div className="flex flex-col mb-3 items-center  h-42 mx-auto py-25 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
          <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
          <span className="text-sm  text-gray-400 flex items-center justify-center mb-2 md:text-2md gap-1">
          </span>
          <div className="flex">
            <span className="flex-col gap-1.5 items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl font-sans">Santos</span>
            </span>
            <span className="mx-6 text-5xl">:</span>
            <span className="flex-col gap-1.5 items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl font-sans">Santos</span>
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
  );
}

export function AgendaCarioca() {
  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
      <h1 id="agenda" className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl">{t('agendadejogos')}</h1>
      <div className="md:flex md:flex-wrap gap-3">
        <div className="flex flex-col mb-3 items-center  h-42 mx-auto py-25 bg-transparent text-white border-2 border-blue-700 rounded-sm justify-center md:min-w-md">
          <h2 className="text-2xl font-light text-yellow-300 my-4 font-sans md:text-4xl">Copa do Brasil</h2>
          <span className="text-sm  text-gray-400 flex items-center justify-center mb-2 md:text-2md gap-1">
          </span>
          <div className="flex">
            <span className="flex-col gap-1.5 items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl font-sans">Santos</span>
            </span>
            <span className="mx-6 text-5xl">:</span>
            <span className="flex-col gap-1.5 items-center justify-center">
              <img src='/img/san.png' alt='santos' width={56} height={56} className='w-14 h-14' />
              <span className="text-xl font-sans">Santos</span>
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
  );
}