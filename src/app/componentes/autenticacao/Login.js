"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { api } from "@/app/servidor/api"
import LoginGoogle from "./LoginGoogle"
import ModalConfirmarEmail from "../torcedor/ModalConfirmarEmail"
import ModalNovaSenha from "./ModalNovaSenha"

export default function Login({
  aberto = true,
  onFechar,
  onLoginSucesso
}) {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")
  const [modalRecuperacao, setModalRecuperacao] = useState(false)
  const [codigoRecuperacao, setCodigoRecuperacao] = useState("")
  const [modalNovaSenha, setModalNovaSenha] = useState(false)
  const [mensagemSucesso, setMensagemSucesso] = useState("")

  const emailRecuperacao = email.trim().toLowerCase()

  if (!aberto) {
    return null
  }

  async function entrar(event) {
    event.preventDefault()
    setErro("")

    const emailNormalizado = email.trim().toLowerCase()

    if (!emailNormalizado) {
      setErro(
        t(
          "emailObrigatorio",
          "Digite seu e-mail."
        )
      )
      return
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        emailNormalizado
      )

    if (!emailValido) {
      setErro(
        t(
          "emailInvalido",
          "Digite um e-mail válido."
        )
      )
      return
    }

    if (!senha) {
      setErro(
        t(
          "senhaObrigatoria",
          "Digite sua senha."
        )
      )
      return
    }

    try {
      setCarregando(true)

      const idiomaAtual =
        (i18n?.language || "pt")
          .split("-")[0]
          .toLowerCase()

      const resposta = await api.post(
        "/auth/login",
        {
          email: emailNormalizado,
          senha,
          idioma: idiomaAtual
        }
      )

      if (resposta.data?.sucesso) {
        if (typeof onLoginSucesso === "function") {
          onLoginSucesso(
            resposta.data.usuario
          )
          return
        }

        router.push("/")
        router.refresh()
        return
      }

      setErro(
        resposta.data?.mensagem ||
        t(
          "erroLogin",
          "Não foi possível realizar o login."
        )
      )
    } catch (error) {
      console.error(
        "Erro no login:",
        error
      )

      if (
        error?.response?.status === 429
      ) {
        setErro(
          error.response.data?.mensagem ||
          t(
            "muitasTentativas",
            "Muitas tentativas. Aguarde alguns minutos e tente novamente."
          )
        )
        return
      }

      if (
        error?.response?.status === 401
      ) {
        setErro(
          error.response.data?.mensagem ||
          t(
            "emailSenhaInvalidos",
            "E-mail ou senha inválidos."
          )
        )
        return
      }

      if (
        error?.response?.status === 403
      ) {
        setErro(
          error.response.data?.mensagem ||
          t(
            "contaBloqueada",
            "Esta conta está bloqueada."
          )
        )
        return
      }

      setErro(
        error?.response?.data?.mensagem ||
        t(
          "erroLogin",
          "Não foi possível realizar o login."
        )
      )
    } finally {
      setCarregando(false)
    }
  }

  async function recuperarSenha() {
    const emailNormalizado = email.trim().toLowerCase()

    if (!emailNormalizado) {
      setErro(t("emailObrigatorioRecuperacao", "Digite seu e-mail para recuperar a senha."))
      return
    }

    try {
      setCarregando(true)
      setErro("")
      setMensagemSucesso("")

      await api.post("/auth/esqueci-senha", {
        email: emailNormalizado
      })

      setModalRecuperacao(true)
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error)
      setErro(error?.response?.data?.mensagem || error?.response?.data?.erro || t("erroRecuperacao", "Não foi possível enviar o código de recuperação."))
    } finally {
      setCarregando(false)
    }
  }

  function confirmarCodigoRecuperacao(dados) {
    const codigo = dados?.codigo || ""
    if (!codigo || codigo.length !== 6) {
      setErro(t("codigoCompleto", "Digite o código de 6 dígitos."))
      return
    }

    setCodigoRecuperacao(codigo)
    setModalRecuperacao(false)
    setModalNovaSenha(true)
  }

  function fecharRecuperacao() {
    setModalRecuperacao(false)
    setModalNovaSenha(false)
  }

  function sucessoNovaSenha() {
    setModalNovaSenha(false)
    setCodigoRecuperacao("")
    setMensagemSucesso("Senha redefinida com sucesso. Faça login com sua nova senha.")
    setSenha("")
  }

  return (
    <div className="w-full min-w-0">
      <div className="rounded-2xl border border-white/10 bg-linear-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617] p-4 shadow-[0_0_25px_rgba(255,165,0,0.06)] backdrop-blur-md sm:p-5 lg:p-8">

        <h1 className="mb-5 text-center text-xl font-extrabold tracking-wide text-orange-500 sm:mb-6 sm:text-2xl">
          {t(
            "Entrar",
            "Entrar"
          )}
        </h1>

        <form
          onSubmit={entrar}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm text-zinc-300"
            >
              {t(
                "email",
                "E-mail"
              )}
            </label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              autoComplete="email"
              placeholder={t(
                "digiteSeuEmail",
                "Digite seu e-mail"
              )}
              disabled={carregando}
              maxLength={254}
              className="w-full min-w-0 rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-base text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 disabled:opacity-50 sm:px-4"
            />
          </div>

          <div>
            <label
              htmlFor="login-senha"
              className="mb-2 block text-sm text-zinc-300"
            >
              {t(
                "senha",
                "Senha"
              )}
            </label>

            <input
              id="login-senha"
              type="password"
              value={senha}
              onChange={(event) =>
                setSenha(
                  event.target.value
                )
              }
              autoComplete="current-password"
              placeholder={t(
                "digiteSuaSenha",
                "Digite sua senha"
              )}
              disabled={carregando}
              maxLength={128}
              className="w-full min-w-0 rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-base text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 disabled:opacity-50 sm:px-4"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={recuperarSenha}
              disabled={carregando}
              className="text-right text-sm text-zinc-400 transition hover:text-orange-400 disabled:opacity-50"
            >
              {t(
                "esqueceuSenha",
                "Esqueceu sua senha?"
              )}
            </button>
          </div>

          {erro && (
            <div
              role="alert"
              className="wrap-break-word rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {erro}
            </div>
          )}

          {mensagemSucesso && (
            <div
              role="status"
              className="wrap-break-word rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
            >
              {mensagemSucesso}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {carregando
              ? t(
                "entrando",
                "Entrando..."
              )
              : t(
                "entrar",
                "Entrar"
              )}
          </button>
        </form>

        {modalRecuperacao && (
          <ModalConfirmarEmail
            aberto={true}
            modo="recuperacao"
            email={emailRecuperacao}
            onConfirmado={confirmarCodigoRecuperacao}
            onFechar={() => setModalRecuperacao(false)}
          />
        )}

        {modalNovaSenha && (
          <ModalNovaSenha
            aberto={true}
            email={emailRecuperacao}
            codigo={codigoRecuperacao}
            onFechar={fecharRecuperacao}
            onSucesso={sucessoNovaSenha}
          />
        )}

        <div className="my-5 flex items-center gap-3 sm:my-6">
          <div className="h-px flex-1 bg-white/10" />

          <span className="text-sm text-zinc-500">
            {t(
              "ou",
              "ou"
            )}
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex w-full justify-center">
          <LoginGoogle
            onLoginSucesso={
              onLoginSucesso
            }
          />
        </div>
      </div>
    </div>
  )
}