'use client';

import { useTranslation } from "react-i18next";

export default function PrivacidadeClient() {

  const { t } = useTranslation();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 text-white md:px-6 lg:px-10">

      <div className="rounded-2xl border border-orange-400/20 bg-[#111111]/90 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur md:p-8">

        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            {t("privacy.title")}
          </h1>

          <p className="text-sm text-gray-400 md:text-base">
            {t("privacy.updated")}
          </p>
        </div>

        <div className="space-y-5">

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("privacy.introTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("privacy.introText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("privacy.collectTitle")}
            </h2>

            <p className="mb-4 text-gray-300 leading-8">
              {t("privacy.collectDescription")}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-300">
              <li>{t("privacy.collect1")}</li>
              <li>{t("privacy.collect2")}</li>
              <li>{t("privacy.collect3")}</li>
              <li>{t("privacy.collect4")}</li>
              <li>{t("privacy.collect5")}</li>
              <li>{t("privacy.collect6")}</li>
              <li>{t("privacy.collect7")}</li>
              <li>{t("privacy.collect8")}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("privacy.useTitle")}
            </h2>

            <p className="mb-4 text-gray-300 leading-8">
              {t("privacy.useDescription")}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-300">
              <li>{t("privacy.use1")}</li>
              <li>{t("privacy.use2")}</li>
              <li>{t("privacy.use3")}</li>
              <li>{t("privacy.use4")}</li>
              <li>{t("privacy.use5")}</li>
              <li>{t("privacy.use6")}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("privacy.shareTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("privacy.shareText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("privacy.cookiesTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("privacy.cookiesText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("privacy.securityTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("privacy.securityText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("privacy.rightsTitle")}
            </h2>

            <p className="mb-4 text-gray-300 leading-8">
              {t("privacy.rightsDescription")}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-300">
              <li>{t("privacy.right1")}</li>
              <li>{t("privacy.right2")}</li>
              <li>{t("privacy.right3")}</li>
              <li>{t("privacy.right4")}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("privacy.changesTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("privacy.changesText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("privacy.contactTitle")}
            </h2>

            <p className="mb-2 text-gray-300 leading-8">
              {t("privacy.contactText")}
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