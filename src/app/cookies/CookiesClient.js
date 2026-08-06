'use client';

import { useTranslation } from "react-i18next";

export default function CookiesClient() {

  const { t } = useTranslation();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 text-white md:px-6 lg:px-10">

      <div className="rounded-2xl border border-orange-400/20 bg-[#111111]/90 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur md:p-8">

        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            {t("cookiesPage.title")}
          </h1>

          <p className="text-sm text-gray-400 md:text-base">
            {t("cookiesPage.updated")}
          </p>
        </div>

        <div className="space-y-5">

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("cookiesPage.whatTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("cookiesPage.whatText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("cookiesPage.typesTitle")}
            </h2>

            <p className="mb-4 text-gray-300 leading-8">
              {t("cookiesPage.typesDescription")}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-300">
              <li>{t("cookiesPage.type1")}</li>
              <li>{t("cookiesPage.type2")}</li>
              <li>{t("cookiesPage.type3")}</li>
              <li>{t("cookiesPage.type4")}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("cookiesPage.useTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("cookiesPage.useText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("cookiesPage.manageTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("cookiesPage.manageText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("cookiesPage.thirdPartyTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("cookiesPage.thirdPartyText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("cookiesPage.contactTitle")}
            </h2>

            <p className="mb-2 text-gray-300 leading-8">
              {t("cookiesPage.contactText")}
            </p>

            <a
              href="mailto:futlanceweb@gmail.com"
              className="text-orange-400 underline decoration-orange-400/50 underline-offset-4 transition hover:text-orange-300"
            >
              futlanceweb@gmail.com
            </a>
          </section>

        </div>

      </div>

    </main>
  );

}