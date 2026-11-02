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


export default function LoginEmail({
  aceitouPolitica
}) {

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
  // LOGIN
  // ==========================================================

  async function entrar(event) {

    event.preventDefault()


    setErro("")


    // ========================================================
    // VERIFICAR TERMOS
    // ========================================================

    if (!aceitouPolitica) {

      setErro(
        t("aceiteTermosParaContinuar")
      )

      return

    }


    // ========================================================
    // VALIDAÇÃO E-MAIL
    // ========================================================

    const emailNormalizado =
      email
        .trim()
        .toLowerCase()


    if (!emailNormalizado) {

      setErro(
        t("emailObrigatorio")
      )

      return

    }


    // ========================================================
    // VALIDAÇÃO SENHA
    // ========================================================

    if (!senha) {

      setErro(
        t("senhaObrigatoria")
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
            email: emailNormalizado,

            senha,

            idioma: idiomaAtual,

            aceitouPolitica: true
          }
        )


      // ======================================================
      // LOGIN REALIZADO
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
        t("erroLogin")
      )


    } catch (error) {

      // ======================================================
      // RATE LIMIT
      // ======================================================

      if (
        error?.response?.status === 429
      ) {

        setErro(
          error.response.data?.mensagem ||
          t("muitasTentativas")
        )

        return

      }


      // ======================================================
      // CREDENCIAIS INVÁLIDAS
      // ======================================================

      if (
        error?.response?.status === 401
      ) {

        setErro(
          error.response.data?.mensagem ||
          t("emailSenhaInvalidos")
        )

        return

      }


      // ======================================================
      // CONTA GOOGLE
      // ======================================================

      if (
        error?.response?.status === 400
      ) {

        setErro(
          error.response.data?.mensagem ||
          t("erroLogin")
        )

        return

      }


      // ======================================================
      // ERRO
      // ======================================================

      console.error(
        "Erro ao realizar login:",
        error
      )


      setErro(
        t("erroLogin")
      )


    } finally {

      setCarregando(false)

    }

  }


  return (

    <form
      onSubmit={entrar}
      className="space-y-4"
    >

      {/* ====================================================
          E-MAIL
      ==================================================== */}

      <div>

        <label
          htmlFor="login-email"
          className="block text-sm text-gray-300 mb-2"
        >

          {t("email")}

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
          placeholder={t("digiteSeuEmail")}
          disabled={carregando}
          className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
        />

      </div>


      {/* ====================================================
          SENHA
      ==================================================== */}

      <div>

        <label
          htmlFor="login-senha"
          className="block text-sm text-gray-300 mb-2"
        >

          {t("senha")}

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
          placeholder={t("digiteSuaSenha")}
          disabled={carregando}
          className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
        />

      </div>


      {/* ====================================================
          ERRO
      ==================================================== */}

      {erro && (

        <div
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >

          {erro}

        </div>

      )}


      {/* ====================================================
          BOTÃO ENTRAR
      ==================================================== */}

      <button
        type="submit"
        disabled={
          !aceitouPolitica ||
          carregando
        }
        className="w-full rounded-lg bg-orange-500 px-4 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
      >

        {carregando
          ? t("entrando")
          : t("entrar")
        }

      </button>

    </form>

  )

}