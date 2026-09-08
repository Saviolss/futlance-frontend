"use client"

import { useTranslation } from "react-i18next"

export default function ModalAssistenteTorcedor({
  aberto,
  time,
  onAssinar,
  onAgoraNao,
  onFechar
}) {
  const { t } = useTranslation()

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1a] shadow-2xl">
        <div className="border-b border-white/10 px-6 py-5 text-center">
          <button
            type="button"
            onClick={onFechar}
            className="absolute right-4 top-3 text-2xl text-zinc-400 transition hover:text-white"
            aria-label={t("comum.fechar", "Fechar")}
          >
            ×
          </button>

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10">
            <span className="text-3xl">❤️</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white">
            {t("torcedor.tituloAssistente", "Conheça o Assistente Torcedor")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {t(
              "torcedor.descricaoAssistente",
              "Tenha seu time sempre por perto e receba informações importantes diretamente para você."
            )}
          </p>
        </div>

        {time && (
          <div className="mx-6 mt-5 flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#111827] p-4">
            {time.escudo ? (
              <img
                src={time.escudo}
                alt={time.nome}
                className="h-12 w-12 object-contain"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl">
                ⚽
              </div>
            )}

            <div>
              <p className="text-xs text-zinc-500">
                {t("torcedor.seuTime", "Seu time")}
              </p>

              <p className="font-bold text-white">
                {time.nome}
              </p>
            </div>
          </div>
        )}

        <div className="px-6 py-5">
          <div className="mb-5 text-center">
            <span className="text-3xl font-extrabold text-orange-500">
              R$ 3,99
            </span>

            <span className="ml-1 text-sm text-zinc-400">
              {t("torcedor.porMes", "/mês")}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-green-400">✓</span>
              <p className="text-sm text-zinc-300">
                {t(
                  "torcedor.beneficioAntes",
                  "Receba um aviso 5 minutos antes da partida."
                )}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-green-400">✓</span>
              <p className="text-sm text-zinc-300">
                {t(
                  "torcedor.beneficioInicio",
                  "Saiba quando o jogo do seu time começar."
                )}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-green-400">✓</span>
              <p className="text-sm text-zinc-300">
                {t(
                  "torcedor.beneficioResultado",
                  "Receba o resultado final da partida."
                )}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-green-400">✓</span>
              <p className="text-sm text-zinc-300">
                {t(
                  "torcedor.beneficioNoticias",
                  "Receba notícias sobre o seu time."
                )}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-green-400">✓</span>
              <p className="text-sm text-zinc-300">
                {t(
                  "torcedor.beneficioIdioma",
                  "Receba as mensagens no seu idioma."
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5">
          <button
            type="button"
            onClick={onAssinar}
            className="w-full rounded-xl bg-orange-500 px-5 py-3 font-bold text-black transition hover:bg-orange-400"
          >
            {t("torcedor.assinarAgora", "Assinar agora")}
          </button>

          <button
            type="button"
            onClick={onAgoraNao}
            className="mt-3 w-full rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            {t("torcedor.agoraNao", "Agora não")}
          </button>
        </div>
      </div>
    </div>
  )
}