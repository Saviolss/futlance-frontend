'use client';

import { useTranslation } from "react-i18next";

export default function TermosClient() {

  const { t } = useTranslation();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 text-white md:px-6 lg:px-10">

      <div className="rounded-2xl border border-orange-400/20 bg-[#111111]/90 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur md:p-8">

        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            {t("terms.title")}
          </h1>

          <p className="text-sm text-gray-400 md:text-base">
            {t("terms.updated")}
          </p>
        </div>

        <div className="space-y-5">

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("terms.acceptanceTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("terms.acceptanceText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("terms.useTitle")}
            </h2>

            <p className="mb-4 text-gray-300 leading-8">
              {t("terms.useDescription")}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-300">
              <li>{t("terms.use1")}</li>
              <li>{t("terms.use2")}</li>
              <li>{t("terms.use3")}</li>
              <li>{t("terms.use4")}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("terms.accountTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("terms.accountText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("terms.subscriptionTitle")}
            </h2>

            <p className="mb-4 text-gray-300 leading-8">
              {t("terms.subscriptionDescription")}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-300">
              <li>{t("terms.subscription1")}</li>
              <li>{t("terms.subscription2")}</li>
              <li>{t("terms.subscription3")}</li>
              <li>{t("terms.subscription4")}</li>
              <li>{t("terms.subscription5")}</li>
              <li>{t("terms.subscription6")}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("terms.paymentTitle")}
            </h2>

            <p className="mb-4 text-gray-300 leading-8">
              {t("terms.paymentDescription")}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-300">
              <li>{t("terms.payment1")}</li>
              <li>{t("terms.payment2")}</li>
              <li>{t("terms.payment3")}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("terms.cancelTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("terms.cancelText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("terms.responsibilityTitle")}
            </h2>

            <p className="mb-4 text-gray-300 leading-8">
              {t("terms.responsibilityDescription")}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-gray-300">
              <li>{t("terms.responsibility1")}</li>
              <li>{t("terms.responsibility2")}</li>
              <li>{t("terms.responsibility3")}</li>
              <li>{t("terms.responsibility4")}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("terms.copyrightTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("terms.copyrightText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("terms.changesTitle")}
            </h2>

            <p className="text-gray-300 leading-8">
              {t("terms.changesText")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              {t("terms.contactTitle")}
            </h2>

            <p className="mb-2 text-gray-300 leading-8">
              {t("terms.contactText")}
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