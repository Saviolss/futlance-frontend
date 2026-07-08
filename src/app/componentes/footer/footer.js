'use client';

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {

  const { t } = useTranslation();

  const [modal, setModal] = useState(null);

  const [showCookies, setShowCookies] = useState(false);

  // ============================
  // VERIFICA CONSENTIMENTO
  // ============================

  useEffect(() => {

    const consentimento = localStorage.getItem("futlance-cookies");

    if (!consentimento) {
      setShowCookies(true);
    }

  }, []);

  // ============================
  // ACEITAR COOKIES
  // ============================

  function aceitarCookies() {

    localStorage.setItem(
      "futlance-cookies",
      "aceito"
    );

    setShowCookies(false);
  }

  return (
    <>

      {/* ============================
          FOOTER
      ============================ */}

      <footer className="w-full sm:block md:flex md:justify-center gap-3 bg-black text-white text-center py-4 mt-10 border-t border-t-orange-400/30">

        <p>
          &copy; {new Date().getFullYear()} {t('footertext')}
        </p>

        <a
          href="mailto:futlanceweb@gmail.com"
          className="underline"
        >
          {t("faleconosco")}
        </a>

        <button
          onClick={() => setModal("privacidade")}
          className="underline mx-2"
        >
          {t("privacidade")}
        </button>

        <button
          onClick={() => setModal("cookies")}
          className="underline"
        >
          {t("cookies")}
        </button>

      </footer>

      {/* ============================
          MODAL PRIVACIDADE
      ============================ */}

      {modal === "privacidade" && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

          <div className="bg-[#111] text-white max-w-lg w-full p-6 rounded-lg">

            <h2 className="text-xl mb-4 font-semibold">
              {t("politicaPrivacidade")}
            </h2>

            <p className="text-sm text-gray-300 leading-6">
              {t("privacidadeTexto")}
            </p>

            <button
              onClick={() => setModal(null)}
              className="mt-6 bg-orange-500 px-4 py-2 rounded"
            >
              {t("fechar")}
            </button>

          </div>

        </div>
      )}

      {/* ============================
          MODAL COOKIES
      ============================ */}

      {modal === "cookies" && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

          <div className="bg-[#111] text-white max-w-lg w-full p-6 rounded-lg">

            <h2 className="text-xl mb-4 font-semibold">
              {t("cookies")}
            </h2>

            <p className="text-sm text-gray-300 leading-6">
              {t("cookiesTexto")}
            </p>

            <button
              onClick={() => setModal(null)}
              className="mt-6 bg-orange-500 px-4 py-2 rounded"
            >
              {t("fechar")}
            </button>

          </div>

        </div>
      )}

      {/* ============================
          BANNER COOKIES
      ============================ */}

      {showCookies && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:items-end md:justify-center md:p-0">

          <div className="w-full max-w-6xl bg-[#111] border border-orange-400/30 text-white rounded-lg md:rounded-none md:border-t md:border-orange-400/30 md:mb-0 p-4">

            <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-300">
              {t("cookiesInfo")}
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => setModal("cookies")}
                className="underline text-sm"
              >
                {t("saibaMais")}
              </button>

              <button
                onClick={aceitarCookies}
                className="bg-orange-500 px-4 py-2 rounded text-sm"
              >
                {t("aceitar")}
              </button>

            </div>

          </div>

        </div>

      </div>
      )}

    </>
  );
}