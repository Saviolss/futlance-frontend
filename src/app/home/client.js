"use client"
import { useTranslation } from "react-i18next"
import HomeRenderer from "./renderer"
export default function HomeClient({ widgets = [] }) {
  const { t } = useTranslation()

  return (
    <main>
      <section className="mt-5 rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] md:max-w-[60%] m-auto p-5 sm:p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between w-full">
          <div className="w-full ">
            <p className="text-xs font-medium uppercase tracking-widest text-orange-400">
              {t("configuracoesAssistente.tenhaAssistente")}
            </p>

            <h2 className="mt-2 text-xl font-bold sm:text-2xl">
              {t("configuracoesAssistente.chamadaTitulo", "Não perca os momentos importantes do seu time.")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {t("configuracoesAssistente.chamadaDescricao", "Escolha seu plano, informe seu WhatsApp e receba as notificações do seu time diretamente no celular.")}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                {t("configuracoesAssistente.seuTime", "Seu time")}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                {t("configuracoesAssistente.whatsapp", "WhatsApp")}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                {t("configuracoesAssistente.alertas", "Alertas")}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                {t("configuracoesAssistente.noticias", "Notícias")}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = "./assistente"
            }}
            className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 active:scale-[0.98]"
          >
            {t("configuracoesAssistente.assinarAgora", "Assinar agora")}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>
      <HomeRenderer widgets={widgets} />
    </main>
  )
}