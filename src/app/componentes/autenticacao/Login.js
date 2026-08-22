"use client"

import {
  useState
} from "react"

import {
  useRouter
} from "next/navigation"

import {
  useTranslation
} from "react-i18next"

import {
  api
} from "@/app/servidor/api"

import LoginGoogle from "./LoginGoogle"


export default function Login() {

  const {
    t,
    i18n
  } = useTranslation()

  const router =
    useRouter()


  // ==========================================================
  // CAMPOS
  // ==========================================================

  const [
    email,
    setEmail
  ] = useState("")


  const [
    senha,
    setSenha
  ] = useState("")


  // ==========================================================
  // ESTADOS
  // ==========================================================

  const [
    carregando,
    setCarregando
  ] = useState(false)


  const [
    erro,
    setErro
  ] = useState("")


  // ==========================================================
  // LOGIN COM E-MAIL E SENHA
  // ==========================================================

  async function entrar(event) {

    event.preventDefault()

    setErro("")


    const emailNormalizado =
      email
        .trim()
        .toLowerCase()


    // ========================================================
    // VALIDAR E-MAIL
    // ========================================================

    if (!emailNormalizado) {

      setErro(
        t(
          "emailObrigatorio",
          "Digite seu e-mail."
        )
      )

      return

    }


    // ========================================================
    // VALIDAR FORMATO DO E-MAIL
    // ========================================================

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(emailNormalizado)


    if (!emailValido) {

      setErro(
        t(
          "emailInvalido",
          "Digite um e-mail válido."
        )
      )

      return

    }


    // ========================================================
    // VALIDAR SENHA
    // ========================================================

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


      // ======================================================
      // LOGIN
      // ======================================================

      const idiomaAtual =
        (i18n.language || "pt")
          .split("-")[0]
          .toLowerCase()

      const resposta =
        await api.post(
          "/auth/login",
          {
            nome: nomeNormalizado,

            email: emailNormalizado,

            senha,

            idioma: idiomaAtual,

            aceitouPolitica: true
          }
        )


      // ======================================================
      // SUCESSO
      // ======================================================

      if (
        resposta.data?.sucesso
      ) {

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


      // ======================================================
      // MUITAS TENTATIVAS
      // ======================================================

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


      // ======================================================
      // LOGIN INVÁLIDO
      // ======================================================

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


      // ======================================================
      // CONTA BLOQUEADA
      // ======================================================

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


      // ======================================================
      // ERRO GENÉRICO
      // ======================================================

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


  // ==========================================================
  // RECUPERAR SENHA
  // ==========================================================

  function recuperarSenha() {

    router.push(
      "/recuperar-senha"
    )

  }


  return (

    <div className="w-full">

      {/* ====================================================
          CARD
      ==================================================== */}

      <div className="rounded-2xl border border-white/10 bg-linear-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617] p-8 shadow-[0_0_25px_rgba(255,165,0,0.06)] backdrop-blur-md">

        {/* ==================================================
            TÍTULO
        ================================================== */}

        <h1 className="text-2xl font-extrabold text-center text-orange-500 mb-6 tracking-wide">

          {t(
            "Entrar"
          )}

        </h1>


        {/* ==================================================
            FORMULÁRIO
        ================================================== */}

        <form
          onSubmit={entrar}
          className="space-y-4"
        >

          {/* ================================================
              E-MAIL
          ================================================ */}

          <div>

            <label
              htmlFor="login-email"
              className="block text-sm text-zinc-300 mb-2"
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
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition focus:border-orange-500 disabled:opacity-50"
            />

          </div>


          {/* ================================================
              SENHA
          ================================================ */}

          <div>

            <label
              htmlFor="login-senha"
              className="block text-sm text-zinc-300 mb-2"
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
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition focus:border-orange-500 disabled:opacity-50"
            />

          </div>


          {/* ================================================
              ESQUECEU A SENHA
          ================================================ */}

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


          {/* ================================================
              ERRO
          ================================================ */}

          {erro && (

            <div
              role="alert"
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >

              {erro}

            </div>

          )}


          {/* ================================================
              ENTRAR
          ================================================ */}

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
              )
            }

          </button>

        </form>


        {/* ==================================================
            SEPARADOR
        ================================================== */}

        <div className="flex items-center gap-3 my-6">

          <div className="h-px flex-1 bg-white/10" />

          <span className="text-sm text-zinc-500">

            {t(
              "ou",
              "ou"
            )}

          </span>

          <div className="h-px flex-1 bg-white/10" />

        </div>


        {/* ==================================================
            GOOGLE
        ================================================== */}

        <div className="flex justify-center">

          <LoginGoogle />

        </div>

      </div>

    </div>

  )

}