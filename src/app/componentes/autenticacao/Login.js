"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { api } from "@/app/servidor/api"
import LoginGoogle from "./LoginGoogle"

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

  function recuperarSenha() {
    router.push("/recuperar-senha")
  }

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-white/10 bg-linear-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617] p-8 shadow-[0_0_25px_rgba(255,165,0,0.06)] backdrop-blur-md">

        <h1 className="mb-6 text-center text-2xl font-extrabold tracking-wide text-orange-500">
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
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 disabled:opacity-50"
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
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 disabled:opacity-50"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={recuperarSenha}
              disabled={carregando}
              className="text-sm text-zinc-400 transition hover:text-orange-400 disabled:opacity-50"
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
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {erro}
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

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />

          <span className="text-sm text-zinc-500">
            {t(
              "ou",
              "ou"
            )}
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex justify-center">
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