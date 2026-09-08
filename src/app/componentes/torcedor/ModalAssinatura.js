"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function ModalAssinatura({
  aberto = false,
  time = null,
  usuario = null,
  onFechar,
  onContinuar
}) {
  const { t, i18n } = useTranslation()

  const [telefone, setTelefone] = useState("")
  const [idioma, setIdioma] = useState("pt")
  const [pagamento, setPagamento] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (!aberto) {
      setTelefone("")
      setIdioma("pt")
      setPagamento("")
      setErro("")
      setCarregando(false)
      return
    }

    const idiomaAtual =
      (i18n?.language || "pt")
        .split("-")[0]
        .toLowerCase()

    const idiomasPermitidos = [
      "pt",
      "es",
      "en",
      "it",
      "fr",
      "de"
    ]

    setIdioma(
      idiomasPermitidos.includes(idiomaAtual)
        ? idiomaAtual
        : "pt"
    )

    setErro("")
  }, [aberto, i18n?.language])

  function formatarTelefone(valor) {
    const numeros = valor
      .replace(/\D/g, "")
      .slice(0, 15)

    if (!numeros) {
      return ""
    }

    if (numeros.length <= 2) {
      return `+${numeros}`
    }

    if (numeros.length <= 7) {
      return `+${numeros.slice(0, 2)} ${numeros.slice(2)}`
    }

    if (numeros.length <= 11) {
      return `+${numeros.slice(0, 2)} ${numeros.slice(2, 7)}-${numeros.slice(7)}`
    }

    return `+${numeros.slice(0, 2)} ${numeros.slice(2, 7)}-${numeros.slice(7, 11)} ${numeros.slice(11)}`
  }

  function alterarTelefone(event) {
    setTelefone(formatarTelefone(event.target.value))
    setErro("")
  }

  function telefoneValido() {
    const numeros = telefone.replace(/\D/g, "")

    return (
      numeros.length >= 10 &&
      numeros.length <= 15
    )
  }

  async function continuar() {
    if (carregando) return

    setErro("")

    if (!telefoneValido()) {
      setErro(
        t(
          "whatsappInvalido",
          "Digite um número de WhatsApp válido com DDD e código do país."
        )
      )
      return
    }

    if (!idioma) {
      setErro(
        t(
          "idiomaObrigatorio",
          "Escolha o idioma das mensagens."
        )
      )
      return
    }

    if (!pagamento) {
      setErro(
        t(
          "pagamentoObrigatorio",
          "Escolha uma forma de pagamento."
        )
      )
      return
    }

    if (!time?.slug) {
      setErro(
        t(
          "timeNaoSelecionado",
          "Nenhum time foi selecionado."
        )
      )
      return
    }

    try {
      setCarregando(true)

      const dados = {
        telefone: telefone.replace(/\D/g, ""),
        idioma,
        pagamento,
        time: {
          id: time.timeId ?? time.id ?? null,
          nome:
            time.nomePopular ||
            time.nome ||
            "",
          escudo:
            time.escudo ||
            null,
          slug: time.slug
        },
        usuarioId: usuario?.id ?? null
      }

      if (typeof onContinuar === "function") {
        await onContinuar(dados)
      }
    } catch (error) {
      console.error(
        "Erro ao iniciar assinatura:",
        error
      )

      setErro(
        error?.response?.data?.mensagem ||
        error?.response?.data?.erro ||
        t(
          "erroAssinatura",
          "Não foi possível iniciar a assinatura."
        )
      )
    } finally {
      setCarregando(false)
    }
  }

  function fechar() {
    if (carregando) return

    if (typeof onFechar === "function") {
      onFechar()
    }
  }

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
      <div className="relative max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl border border-orange-400/30 bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617] p-6 text-white shadow-2xl">

        <button
          type="button"
          onClick={fechar}
          disabled={carregando}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xl text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
          aria-label={t("fechar", "Fechar")}
        >
          ×
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 text-3xl">
            ❤️
          </div>

          <h2 className="text-2xl font-extrabold">
            {t(
              "assineAssistenteTorcedor",
              "Assine o Assistente do Torcedor"
            )}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {t(
              "recebaNotificacoesWhatsApp",
              "Receba as principais informações do seu time diretamente no WhatsApp."
            )}
          </p>
        </div>

        {time && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
            {time.escudo ? (
              <img
                src={time.escudo}
                alt=""
                className="h-12 w-12 object-contain"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-2xl">
                ⚽
              </div>
            )}

            <div>
              <p className="text-xs text-zinc-500">
                {t("seuTime", "Seu time")}
              </p>

              <p className="font-semibold text-white">
                {time.nomePopular || time.nome}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-5">

          <div>
            <label
              htmlFor="assinatura-whatsapp"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              {t(
                "numeroWhatsApp",
                "Número do WhatsApp"
              )}
            </label>

            <input
              id="assinatura-whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={telefone}
              onChange={alterarTelefone}
              disabled={carregando}
              placeholder="+55 27 99999-9999"
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-400 disabled:opacity-50"
            />

            <p className="mt-2 text-xs text-zinc-500">
              {t(
                "whatsappSomenteNotificacoes",
                "Usaremos este número somente para enviar as notificações do Assistente do Torcedor."
              )}
            </p>
          </div>

          <div>
            <label
              htmlFor="assinatura-idioma"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              {t(
                "idiomaMensagens",
                "Idioma das mensagens"
              )}
            </label>

            <select
              id="assinatura-idioma"
              value={idioma}
              onChange={(event) => {
                setIdioma(event.target.value)
                setErro("")
              }}
              disabled={carregando}
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
            >
              <option value="pt">
                Português
              </option>
              <option value="es">
                Español
              </option>
              <option value="en">
                English
              </option>
              <option value="it">
                Italiano
              </option>
              <option value="fr">
                Français
              </option>
              <option value="de">
                Deutsch
              </option>
            </select>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-zinc-300">
              {t(
                "formaPagamento",
                "Forma de pagamento"
              )}
            </p>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => {
                  setPagamento("cartao")
                  setErro("")
                }}
                disabled={carregando}
                className={`rounded-xl border p-4 text-left transition ${pagamento === "cartao"
                    ? "border-orange-400 bg-orange-400/10"
                    : "border-white/10 bg-black/20 hover:border-orange-400/50"
                  }`}
              >
                <div className="mb-2 text-2xl">
                  💳
                </div>

                <p className="font-semibold">
                  {t("cartao", "Cartão")}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {t(
                    "pagamentoCartaoSeguro",
                    "Pagamento seguro"
                  )}
                </p>

                <p className="mt-2 text-xs text-orange-400">
                  R$ 3,99 / mês
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPagamento("pix")
                  setErro("")
                }}
                disabled={carregando}
                className={`rounded-xl border p-4 text-left transition ${pagamento === "pix"
                    ? "border-orange-400 bg-orange-400/10"
                    : "border-white/10 bg-black/20 hover:border-orange-400/50"
                  }`}
              >
                <div className="mb-2 text-2xl">
                  ◈
                </div>

                <p className="font-semibold">
                  PIX
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {t(
                    "pagamentoPix",
                    "Pagamento anual"
                  )}
                </p>

                <p className="mt-2 text-xs text-orange-400">
                  Pagamento anual
                </p>
              </button>

            </div>
          </div>

          {erro && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {erro}
            </div>
          )}

          <button
            type="button"
            onClick={continuar}
            disabled={carregando}
            className="w-full rounded-lg bg-orange-500 px-4 py-3.5 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {carregando
              ? t(
                "processando",
                "Processando..."
              )
              : t(
                "continuarPagamento",
                "Continuar para pagamento"
              )}
          </button>

          <p className="text-center text-xs leading-5 text-zinc-600">
            {t(
              "pagamentoSeguroAviso",
              "Seus dados de pagamento serão processados de forma segura pelo provedor de pagamento."
            )}
          </p>

        </div>
      </div>
    </div>
  )
}