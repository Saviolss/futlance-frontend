"use client"

import {
  useEffect,
  useRef,
  useState
} from "react"

import Link from "next/link"

import { api } from "@/app/servidor/api"

import { useTranslation } from "react-i18next"

// ============================================================
// GOOGLE CLIENT ID
// ============================================================

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export default function LoginGoogle({
  onLoginSucesso
}) {

  const { t, i18n } =
    useTranslation()

  const botaoGoogleRef =
    useRef(null)

  // ==========================================================
  // ESTADOS
  // ==========================================================

  const [
    carregando,
    setCarregando
  ] = useState(true)

  const [
    erro,
    setErro
  ] = useState("")

  const [
    mostrarConsentimento,
    setMostrarConsentimento
  ] = useState(false)

  const [
    aceitouPolitica,
    setAceitouPolitica
  ] = useState(false)

  const [
    aceitouTermos,
    setAceitouTermos
  ] = useState(false)

  const [
    dadosGoogle,
    setDadosGoogle
  ] = useState(null)

  const [
    enviandoLogin,
    setEnviandoLogin
  ] = useState(false)

  // ==========================================================
  // ENVIAR LOGIN PARA O BACKEND
  // ==========================================================

  async function enviarLogin() {

    try {

      setErro("")

      // ======================================================
      // VERIFICAR ACEITES
      // ======================================================

      if (!aceitouPolitica) {

        setErro(
          t(
            "aceiteTermosParaContinuar"
          )
        )

        return

      }

      if (!aceitouTermos) {

        setErro(
          t(
            "aceiteTermosParaContinuar"
          )
        )

        return

      }

      if (!dadosGoogle?.idToken) {

        setErro(
          t(
            "naoFoiPossivelObterDadosGoogle"
          )
        )

        return

      }

      setEnviandoLogin(true)

      // ======================================================
      // IDIOMA
      // ======================================================

      const idiomaAtual =
        (
          i18n?.language ||
          "pt"
        )
          .split("-")[0]
          .toLowerCase()

      // ======================================================
      // ENVIAR PARA API
      // ======================================================

      const resposta =
        await api.post(
          "/auth/google",
          {
            idToken:
              dadosGoogle.idToken,

            idioma:
              idiomaAtual,

            aceitouPolitica:
              true,

            aceitouTermos:
              true
          }
        )

      // ======================================================
      // VERIFICAR RESPOSTA
      // ======================================================

      if (
        !resposta.data?.sucesso
      ) {

        setErro(
          resposta.data?.mensagem ||
          t(
            "erroLogin",
            "Não foi possível realizar o login."
          )
        )

        return

      }

      // ======================================================
      // FECHAR CONSENTIMENTO
      // ======================================================

      setMostrarConsentimento(
        false
      )

      // ======================================================
      // LOGIN REALIZADO
      // ======================================================

      if (
        typeof onLoginSucesso ===
        "function"
      ) {

        onLoginSucesso(
          resposta.data.usuario
        )

        return

      }

      // ======================================================
      // COMPORTAMENTO NORMAL
      // ======================================================

      window.location.href = "/"

    } catch (erro) {

      console.error(
        "Erro no login Google:",
        erro
      )

      const mensagem =
        erro?.response?.data?.mensagem ||
        erro?.response?.data?.erro ||
        erro?.message ||
        t(
          "erroLogin",
          "Não foi possível realizar o login."
        )

      setErro(
        mensagem
      )

    } finally {

      setEnviandoLogin(false)

    }

  }

  // ==========================================================
  // CALLBACK GOOGLE
  // ==========================================================

  function processarLoginGoogle(
    respostaGoogle
  ) {

    try {

      setErro("")

      // ======================================================
      // TOKEN
      // ======================================================

      const idToken =
        respostaGoogle?.credential

      if (!idToken) {

        setErro(
          t(
            "naoFoiPossivelObterDadosGoogle",
            "O Google não retornou o token de autenticação."
          )
        )

        return

      }

      // ======================================================
      // GUARDAR TOKEN TEMPORARIAMENTE
      // ======================================================

      setDadosGoogle({
        idToken
      })

      // ======================================================
      // MOSTRAR CONSENTIMENTO
      // ======================================================

      setMostrarConsentimento(
        true
      )

    } catch (erro) {

      console.error(
        "Erro ao processar login Google:",
        erro
      )

      setErro(
        t(
          "erroLoginGoogle",
          "Não foi possível processar o login do Google."
        )
      )

    }

  }

  // ==========================================================
  // CANCELAR CONSENTIMENTO
  // ==========================================================

  function cancelarConsentimento() {

    setMostrarConsentimento(
      false
    )

    setAceitouPolitica(
      false
    )

    setAceitouTermos(
      false
    )

    setDadosGoogle(
      null
    )

    setErro("")

  }

  // ==========================================================
  // CARREGAR GOOGLE IDENTITY SERVICES
  // ==========================================================

  useEffect(() => {

    // ========================================================
    // VERIFICAR CLIENT ID
    // ========================================================

    if (!GOOGLE_CLIENT_ID) {

      console.error(
        "NEXT_PUBLIC_GOOGLE_CLIENT_ID não configurado."
      )

      setErro(
        t(
          "loginGoogleNaoConfigurado",
          "O login do Google não está configurado."
        )
      )

      setCarregando(false)

      return

    }

    // ========================================================
    // INICIALIZAR GOOGLE
    // ========================================================

    function inicializarGoogle() {

      if (
        !window.google ||
        !window.google.accounts ||
        !window.google.accounts.id
      ) {

        console.error(
          "Google Identity Services não disponível."
        )

        setErro(
          t(
            "googleNaoCarregado",
            "Não foi possível carregar o Google."
          )
        )

        setCarregando(false)

        return

      }

      // ======================================================
      // CONFIGURAR GOOGLE
      // ======================================================

      window.google.accounts.id.initialize({

        client_id:
          GOOGLE_CLIENT_ID,

        callback:
          processarLoginGoogle,

        auto_select:
          false,

        cancel_on_tap_outside:
          true

      })

      // ======================================================
      // RENDERIZAR BOTÃO
      // ======================================================

      if (
        botaoGoogleRef.current
      ) {

        botaoGoogleRef.current.innerHTML =
          ""

        window.google.accounts.id.renderButton(

          botaoGoogleRef.current,

          {
            type:
              "standard",

            theme:
              "outline",

            size:
              "large",

            text:
              "signin_with",

            shape:
              "rectangular",

            logo_alignment:
              "left",

            width:
              320
          }

        )

      }

      setCarregando(false)

    }

    // ========================================================
    // GOOGLE JÁ CARREGADO
    // ========================================================

    if (
      window.google &&
      window.google.accounts &&
      window.google.accounts.id
    ) {

      inicializarGoogle()

      return

    }

    // ========================================================
    // CRIAR SCRIPT
    // ========================================================

    const script =
      document.createElement(
        "script"
      )

    script.src =
      "https://accounts.google.com/gsi/client"

    script.async =
      true

    script.defer =
      true

    script.onload =
      inicializarGoogle

    script.onerror =
      () => {

        console.error(
          "Erro ao carregar Google Identity Services."
        )

        setErro(
          t(
            "googleNaoCarregado",
            "Não foi possível carregar o login do Google."
          )
        )

        setCarregando(false)

      }

    document.head.appendChild(
      script
    )

    // ========================================================
    // LIMPEZA
    // ========================================================

    return () => {

      if (
        script.parentNode
      ) {

        script.parentNode.removeChild(
          script
        )

      }

    }

  }, [])

  // ==========================================================
  // INTERFACE
  // ==========================================================

  return (

    <div className="w-full">

      {/* ====================================================
          BOTÃO GOOGLE
      ==================================================== */}

      <div
        ref={botaoGoogleRef}
        className="mb-3 flex justify-center"
      />

      {/* ====================================================
          CARREGANDO
      ==================================================== */}

      {carregando && (

        <p className="mt-3 text-center text-sm text-gray-400">

          {t(
            "carregando",
            "Carregando..."
          )}

        </p>

      )}

      {/* ====================================================
          ERRO
      ==================================================== */}

      {erro &&
        !mostrarConsentimento && (

          <p
            className="mt-3 text-center text-sm text-red-400"
            role="alert"
          >

            {erro}

          </p>

        )}

      {/* ====================================================
          MODAL DE CONSENTIMENTO
      ==================================================== */}

      {mostrarConsentimento && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">

          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-linear-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617] p-6 text-white shadow-xl backdrop-blur-md">

            {/* =================================================
                TÍTULO
            ================================================= */}

            <h2 className="mb-4 text-xl font-extrabold">

              {t(
                "antesDeContinuar",
                "Antes de continuar"
              )}

            </h2>

            {/* =================================================
                TEXTO
            ================================================= */}

            <p className="mb-5 text-sm leading-6 text-gray-300">

              {t(
                "textoConsentimentoGoogle",
                "Para criar sua conta no Futlance, leia e aceite nossa Política de Privacidade e os Termos de Uso."
              )}

            </p>

            {/* =================================================
                POLÍTICA
            ================================================= */}

            <label className="mb-4 flex cursor-pointer items-start gap-3">

              <input
                type="checkbox"
                checked={
                  aceitouPolitica
                }
                onChange={(e) =>
                  setAceitouPolitica(
                    e.target.checked
                  )
                }
                className="mt-1 h-4 w-4"
              />

              <span className="text-sm leading-6 text-gray-300">

                {t(
                  "liAceitoAPolitica",
                  "Li e aceito a"
                )}

                {" "}

                <Link
                  href="/privacidade"
                  target="_blank"
                  className="text-orange-400 underline"
                >

                  {t(
                    "politicaPrivacidade",
                    "Política de Privacidade"
                  )}

                </Link>

              </span>

            </label>

            {/* =================================================
                TERMOS
            ================================================= */}

            <label className="mb-4 flex cursor-pointer items-start gap-3">

              <input
                type="checkbox"
                checked={
                  aceitouTermos
                }
                onChange={(e) =>
                  setAceitouTermos(
                    e.target.checked
                  )
                }
                className="mt-1 h-4 w-4"
              />

              <span className="text-sm leading-6 text-gray-300">

                {t(
                  "liAceitoOsTermos",
                  "Li e aceito os"
                )}

                {" "}

                <Link
                  href="/termos"
                  target="_blank"
                  className="text-orange-400 underline"
                >

                  {t(
                    "termosDeUso",
                    "Termos de Uso"
                  )}

                </Link>

              </span>

            </label>

            {/* =================================================
                ERRO
            ================================================= */}

            {erro && (

              <p
                className="mb-4 text-sm text-red-400"
                role="alert"
              >

                {erro}

              </p>

            )}

            {/* =================================================
                BOTÕES
            ================================================= */}

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={
                  cancelarConsentimento
                }
                disabled={
                  enviandoLogin
                }
                className="rounded-md border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
              >

                {t(
                  "cancelar",
                  "Cancelar"
                )}

              </button>

              <button
                type="button"
                onClick={
                  enviarLogin
                }
                disabled={
                  enviandoLogin ||
                  !aceitouPolitica ||
                  !aceitouTermos
                }
                className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {enviandoLogin
                  ? t(
                    "entrando",
                    "Entrando..."
                  )
                  : t(
                    "continuar",
                    "Continuar"
                  )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}