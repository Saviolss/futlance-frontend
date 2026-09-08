"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { api } from "@/app/servidor/api"

export default function ModalConfirmarEmail({
  aberto = false,
  usuarioId,
  email,
  onConfirmado,
  onFechar
}) {
  const { t, i18n } = useTranslation()
  const [codigo, setCodigo] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [reenviando, setReenviando] = useState(false)
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    if (!aberto) {
      setCodigo("")
      setErro("")
      setSucesso("")
      setSegundos(0)
    }
  }, [aberto])

  useEffect(() => {
    if (segundos <= 0) return
    const intervalo = setInterval(() => {
      setSegundos((valor) => valor - 1)
    }, 1000)
    return () => clearInterval(intervalo)
  }, [segundos])

  function alterarCodigo(event) {
    const valor = event.target.value.replace(/\D/g, "").slice(0, 6)
    setCodigo(valor)
    setErro("")
  }

  async function confirmarEmail(event) {
    event.preventDefault()
    if (carregando) return
    setErro("")
    setSucesso("")

    if (!usuarioId) {
      setErro(t("usuarioNaoIdentificado", "Não foi possível identificar sua conta."))
      return
    }

    if (codigo.length !== 6) {
      setErro(t("codigoCompleto", "Digite o código de 6 dígitos."))
      return
    }

    try {
      setCarregando(true)
      const resposta = await api.post("/auth/confirmar-email", {
        usuarioId,
        codigo
      })

      if (!resposta.data?.sucesso) {
        setErro(resposta.data?.mensagem || t("codigoInvalido", "Código inválido ou expirado."))
        return
      }

      setSucesso(resposta.data?.mensagem || t("emailConfirmado", "E-mail confirmado com sucesso."))

      if (typeof onConfirmado === "function") {
        setTimeout(() => {
          onConfirmado(resposta.data)
        }, 700)
      }
    } catch (error) {
      console.error("Erro ao confirmar e-mail:", error)
      setErro(error?.response?.data?.mensagem || error?.response?.data?.erro || t("codigoInvalido", "Código inválido ou expirado."))
    } finally {
      setCarregando(false)
    }
  }

  async function reenviarCodigo() {
    if (reenviando || segundos > 0) return
    setErro("")
    setSucesso("")

    if (!email) {
      setErro(t("emailNaoInformado", "Não foi possível identificar seu e-mail."))
      return
    }

    try {
      setReenviando(true)

      const resposta = await api.post("/auth/reenviar-codigo", {
        email
      })

      setSucesso(resposta.data?.mensagem || t("codigoReenviado", "Um novo código foi enviado para seu e-mail."))
      setCodigo("")
      setSegundos(60)
    } catch (error) {
      console.error("Erro ao reenviar código:", error)
      setErro(error?.response?.data?.mensagem || error?.response?.data?.erro || t("erroReenviarCodigo", "Não foi possível reenviar o código."))
    } finally {
      setReenviando(false)
    }
  }

  function fecharModal() {
    if (carregando || reenviando) return
    setCodigo("")
    setErro("")
    setSucesso("")
    setSegundos(0)
    if (typeof onFechar === "function") {
      onFechar()
    }
  }

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-linear-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617] p-6 text-white shadow-2xl backdrop-blur-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-2xl">
            ✉️
          </div>
          <h2 className="text-xl font-extrabold">
            {t("confirmarEmail", "Confirme seu e-mail")}
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-300">
            {t("codigoEnviadoEmail", "Enviamos um código de 6 dígitos para:")}
          </p>
          <p className="mt-1 break-all text-sm font-medium text-orange-400">
            {email}
          </p>
        </div>

        <form onSubmit={confirmarEmail} className="space-y-5">
          <div>
            <label htmlFor="codigo-confirmacao" className="mb-2 block text-sm text-gray-300">
              {t("codigoConfirmacao", "Código de confirmação")}
            </label>
            <input
              id="codigo-confirmacao"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={codigo}
              onChange={alterarCodigo}
              maxLength={6}
              disabled={carregando || reenviando}
              placeholder="000000"
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
            />
          </div>

          {erro && (
            <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {erro}
            </div>
          )}

          {sucesso && (
            <div role="status" className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {sucesso}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando || reenviando || codigo.length !== 6}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {carregando ? t("confirmando", "Confirmando...") : t("confirmarEmail", "Confirmar e-mail")}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-sm text-gray-400">
            {t("naoRecebeuCodigo", "Não recebeu o código?")}
          </p>
          <button
            type="button"
            onClick={reenviarCodigo}
            disabled={reenviando || carregando || segundos > 0}
            className="mt-2 text-sm font-medium text-orange-400 transition hover:text-orange-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {reenviando
              ? t("reenviando", "Reenviando...")
              : segundos > 0
                ? `${ t("reenviarCodigo", "Reenviar código") } (${ segundos }s)`
                : t("reenviarCodigo", "Reenviar código")}
          </button>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <button
            type="button"
            onClick={fecharModal}
            disabled={carregando || reenviando}
            className="text-sm text-gray-500 transition hover:text-gray-300 disabled:opacity-50"
          >
            {t("cancelar", "Cancelar")}
          </button>
        </div>
      </div>
    </div>
  )
}
