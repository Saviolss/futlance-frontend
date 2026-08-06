'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {

  const { t } = useTranslation();

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

  function fecharBannerCookies() {
    setShowCookies(false);
  }

  return (
    <>

      {/* ============================
          FOOTER
      ============================ */}

      <footer className="w-full sm:block md:flex md:justify-center gap-3 bg-black text-white text-center py-4 mt-10 border-t border-t-orange-400/30">

        <p>
          &copy; {new Date().getFullYear()} {t("footertext")}
        </p>

        <a
          href="mailto:futlanceweb@gmail.com"
          className="underline"
        >
          {t("faleconosco")}
        </a>

        <Link
          href="/privacidade"
          className="underline mx-2"
        >
          {t("privacidade")}
        </Link>

        <Link
          href="/cookies"
          className="underline"
        >
          {t("cookies")}
        </Link>

        
        <Link
          href="/termos"
          className="underline mx-2"
        >
          {t("termos")}
        </Link>
       

      </footer>

      {/* ============================
          BANNER COOKIES
      ============================ */}

      {showCookies && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:items-end md:justify-center md:p-0">

          <div className="relative w-full max-w-6xl bg-[#111] border border-orange-400/30 text-white rounded-lg md:rounded-none md:border-t md:border-orange-400/30 md:mb-0 p-4 pt-8 md:pt-4">

            <button
              onClick={fecharBannerCookies}
              className="absolute right-2 top-2 text-xl text-gray-400 hover:text-white md:hidden"
              aria-label="Fechar banner de cookies"
            >
              ×
            </button>

            <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

              <p className="text-sm text-gray-300">
                {t("cookiesInfo")}
              </p>

              <div className="flex gap-3">

                <Link
                  href="/cookies"
                  className="underline text-sm"
                >
                  {t("saibaMais")}
                </Link>

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