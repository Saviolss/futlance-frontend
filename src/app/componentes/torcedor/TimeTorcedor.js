"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { api } from "@/app/servidor/api"
import Login from "../autenticacao/Login"
import CriarConta from "../autenticacao/CriarConta"
import ModalConfirmarEmail from "./ModalConfirmarEmail"
import ModalEscolherTime from "./ModalEscolherTime"
import ModalAssistenteTorcedor from "./ModalAssistenteTorcedor"
import ModalAssinatura from "./ModalAssinatura"

export default function TimeTorcedor() {
  const router = useRouter()

  const [carregando, setCarregando] = useState(true)
  const [autenticado, setAutenticado] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const [time, setTime] = useState(null)

  const [modalLogin, setModalLogin] = useState(false)
  const [modoLogin, setModoLogin] = useState("login")
  const [portalPronto, setPortalPronto] = useState(false)

  const [modalConfirmarEmail, setModalConfirmarEmail] = useState(false)
  const [dadosCadastro, setDadosCadastro] = useState(null)

  const [modalEscolherTime, setModalEscolherTime] = useState(false)
  const [modalAssistente, setModalAssistente] = useState(false)
  const [modalAssinatura, setModalAssinatura] = useState(false)

  const [criandoAssinatura, setCriandoAssinatura] = useState(false)
  const [assinatura, setAssinatura] = useState(null)

  const nomeTimeExibicao = time?.nome
    ? time.nome.slice(0, 3).toUpperCase()
    : "TIME"

  useEffect(() => {
    setPortalPronto(true)
    carregarSessao()
  }, [])

  async function carregarSessao() {
    try {
      setCarregando(true)

      const resposta = await api.get("/auth/sessao")

      if (
        resposta.data?.sucesso &&
        resposta.data?.autenticado &&
        resposta.data?.usuario
      ) {
        const usuarioAtual = resposta.data.usuario

        setAutenticado(true)
        setUsuario(usuarioAtual)

        await carregarTime(usuarioAtual)
      } else {
        setAutenticado(false)
        setUsuario(null)
        setTime(null)
      }
    } catch (erro) {
      if (erro?.response?.status !== 401) {
        console.error("Erro ao verificar sessão:", erro)
      }

      setAutenticado(false)
      setUsuario(null)
      setTime(null)
    } finally {
      setCarregando(false)
    }
  }

  async function carregarTime(usuarioAtual = usuario) {
    if (!usuarioAtual?.id) {
      setTime(null)
      return null
    }

    try {
      const chave = `futlance_time_torcedor_${usuarioAtual.id}`
      const timeSalvo = localStorage.getItem(chave)

      if (!timeSalvo) {
        setTime(null)
        return null
      }

      const dados = JSON.parse(timeSalvo)

      if (!dados?.slug || !dados?.nome) {
        localStorage.removeItem(chave)
        setTime(null)
        return null
      }

      setTime(dados)

      return dados
    } catch (erro) {
      console.error(
        "Erro ao carregar time do torcedor:",
        erro
      )

      setTime(null)
      return null
    }
  }

  function abrirTime() {
    if (carregando) return

    if (!autenticado) {
      setModoLogin("login")
      setModalLogin(true)
      return
    }

    if (!time) {
      setModalEscolherTime(true)
      return
    }

    router.push("/configuracoes")
  }

  function fecharLogin() {
    setModalLogin(false)
  }

  function abrirCadastro() {
    setModoLogin("cadastro")
  }

  function loginRealizado(usuarioLogado) {
    if (!usuarioLogado?.id) {
      console.error(
        "Usuário retornado pelo login é inválido."
      )
      return
    }

    setAutenticado(true)
    setUsuario(usuarioLogado)
    setModalLogin(false)

    carregarTime(usuarioLogado).then((timeAtual) => {
      if (!timeAtual) {
        setModalEscolherTime(true)
      }
    })
  }

  function cadastroRealizado(usuarioCadastrado) {
    if (!usuarioCadastrado?.usuarioId) {
      console.error(
        "Dados do cadastro inválidos:",
        usuarioCadastrado
      )
      return
    }

    setDadosCadastro(usuarioCadastrado)
    setModalLogin(false)
    setModalConfirmarEmail(true)
  }

  function fecharConfirmarEmail() {
    setModalConfirmarEmail(false)
    setDadosCadastro(null)
  }

  async function emailConfirmado(resposta) {
    try {
      const usuarioConfirmado = resposta?.usuario || null

      if (!usuarioConfirmado?.id) {
        console.error(
          "Usuário confirmado não retornado pela API."
        )
        return
      }

      setAutenticado(true)
      setUsuario(usuarioConfirmado)

      setModalConfirmarEmail(false)
      setDadosCadastro(null)

      const timeAtual =
        await carregarTime(usuarioConfirmado)

      if (!timeAtual) {
        setModalEscolherTime(true)
      } else {
        setTime(timeAtual)
      }
    } catch (erro) {
      console.error(
        "Erro após confirmação do e-mail:",
        erro
      )
    }
  }

  function fecharEscolherTime() {
    setModalEscolherTime(false)
  }

  function timeEscolhido(timeSelecionado) {
    if (!timeSelecionado?.slug) {
      return
    }

    salvarTimeLocal(timeSelecionado)

    const dadosTime = {
      timeId:
        timeSelecionado.timeId ??
        timeSelecionado.id ??
        null,
      nome:
        timeSelecionado.nomePopular ||
        timeSelecionado.nome,
      escudo:
        timeSelecionado.escudo ||
        null,
      slug:
        timeSelecionado.slug
    }

    setTime(dadosTime)
    setModalEscolherTime(false)
    setModalAssistente(true)
  }

  function salvarTimeLocal(timeSelecionado) {
    if (!usuario?.id || !timeSelecionado) {
      return
    }

    try {
      const chave =
        `futlance_time_torcedor_${usuario.id}`

      const dadosTime = {
        timeId:
          timeSelecionado.timeId ??
          timeSelecionado.id ??
          null,
        nome:
          timeSelecionado.nomePopular ||
          timeSelecionado.nome,
        escudo:
          timeSelecionado.escudo ||
          null,
        slug:
          timeSelecionado.slug
      }

      localStorage.setItem(
        chave,
        JSON.stringify(dadosTime)
      )
    } catch (erro) {
      console.error(
        "Erro ao salvar time localmente:",
        erro
      )
    }
  }

  function agoraNao() {
    setModalAssistente(false)
  }

  function assinarAgora() {
    setModalAssistente(false)
    setModalAssinatura(true)
  }

  function fecharAssistente() {
    setModalAssistente(false)
  }

  function fecharAssinatura() {
    if (criandoAssinatura) {
      return
    }

    setModalAssinatura(false)
  }


  async function assinaturaContinuar(dados) {
    if (criandoAssinatura) throw new Error("Já existe uma solicitação de pagamento em andamento.")

    try {
      setCriandoAssinatura(true)

      if (!dados?.telefone) throw new Error("Número de WhatsApp não informado.")
      if (!dados?.idioma) throw new Error("Idioma da assinatura não informado.")
      if (!dados?.pagamento) throw new Error("Forma de pagamento não informada.")
      if (!time?.timeId && !time?.id) throw new Error("Não foi possível identificar o time selecionado.")

      const dadosAssinatura = {
        telefone: dados.telefone,
        idioma: dados.idioma,
        pagamento: dados.pagamento,
        time: {
          id: time.timeId ?? time.id,
          nome: time.nomePopular || time.nome || "",
          escudo: time.escudo || null,
          slug: time.slug || ""
        }
      }

      const resposta = await api.post("/assinatura", dadosAssinatura)

      if (!resposta.data?.sucesso) {
        throw new Error(resposta.data?.mensagem || "Não foi possível criar a assinatura.")
      }

      if (!resposta.data?.assinatura?.id) {
        throw new Error("A assinatura foi criada, mas o ID não foi retornado.")
      }

      setAssinatura(resposta.data.assinatura)
      return resposta.data
    } catch (erro) {
      console.error("Erro ao criar assinatura:", erro)
      throw new Error(erro?.response?.data?.mensagem || erro?.message || "Não foi possível iniciar o pagamento.")
    } finally {
      setCriandoAssinatura(false)
    }
  }


  if (carregando) {
    return (
      <button
        type="button"
        disabled
        className="flex min-h-14 min-w-14 cursor-wait flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-white transition-colors md:min-h-16 md:min-w-16 md:hover:border-b-2"
        aria-label="Time"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-0.5 md:mb-1"
        >
          <path d="M12 21s-8.5-4.8-10.5-9.5C.2 8.8 2.2 4 6.5 4c2.1 0 3.5 1.1 4.5 2.3C12 5.1 13.4 4 15.5 4c4.3 0 6.3 4.8 5 7.5C20.5 16.2 12 21 12 21Z" />
        </svg>

        <span className="max-w-14 truncate text-[11px] leading-tight md:max-w-20 md:text-base">
          Time
        </span>
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={abrirTime}
        className="group flex min-h-14 min-w-14 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-white transition-colors active:text-orange-400 md:min-h-16 md:min-w-16 md:hover:border-b-2"
        aria-label={time?.nome ? `Meu time: ${time.nome}` : "Selecionar meu time"}
      >
        {time?.escudo ? (
          <img
            src={time.escudo}
            alt={
              time?.nome ||
              "Time do torcedor"
            }
            className="h-6 w-6 shrink-0 object-contain transition md:h-7 md:w-7 md:group-hover:scale-110"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-0.5 md:mb-1"
          >
            <path d="M12 21s-8.5-4.8-10.5-9.5C.2 8.8 2.2 4 6.5 4c2.1 0 3.5 1.1 4.5 2.3C12 5.1 13.4 4 15.5 4c4.3 0 6.3 4.8 5 7.5C20.5 16.2 12 21 12 21Z" />
          </svg>
        )}

        <span className="max-w-14 truncate text-[11px] leading-tight md:max-w-20 md:text-base">
          {nomeTimeExibicao}
        </span>
      </button>

      {modalLogin && portalPronto && createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 px-3 py-3 sm:px-4 sm:py-4">
          <div className="relative my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-md min-w-0 overflow-y-auto overscroll-contain sm:max-h-[calc(100dvh-2rem)]">
            <button
              type="button"
              onClick={fecharLogin}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-xl text-zinc-400 transition hover:bg-black/70 hover:text-white"
              aria-label="Fechar"
            >
              ×
            </button>

            {modoLogin === "login" ? (
              <Login
                aberto={true}
                onFechar={fecharLogin}
                onLoginSucesso={loginRealizado}
              />
            ) : (
              <CriarConta
                aberto={true}
                onFechar={fecharLogin}
                onCadastroSucesso={cadastroRealizado}
              />
            )}

            <div className="mt-3 rounded-xl border border-white/10 bg-[#0b0f1a] p-3 text-center">
              {modoLogin === "login" ? (
                <button
                  type="button"
                  onClick={abrirCadastro}
                  className="text-sm text-zinc-400 transition hover:text-orange-400"
                >
                  Não tem conta?{" "}
                  <span className="font-medium text-orange-400">
                    Criar conta
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setModoLogin("login")
                  }
                  className="text-sm text-zinc-400 transition hover:text-orange-400"
                >
                  Já tem uma conta?{" "}
                  <span className="font-medium text-orange-400">
                    Entrar
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {modalConfirmarEmail &&
        dadosCadastro && (
          <ModalConfirmarEmail
            aberto={true}
            usuarioId={dadosCadastro.usuarioId}
            email={dadosCadastro.email}
            onConfirmado={emailConfirmado}
            onFechar={fecharConfirmarEmail}
          />
        )}

      {modalEscolherTime && (
        <ModalEscolherTime
          aberto={true}
          onFechar={fecharEscolherTime}
          onSelecionarTime={timeEscolhido}
        />
      )}

      {modalAssistente && (
        <ModalAssistenteTorcedor
          aberto={true}
          time={time}
          onFechar={fecharAssistente}
          onAgoraNao={agoraNao}
          onAssinar={assinarAgora}
        />
      )}

      {modalAssinatura && (
        <ModalAssinatura
          aberto={true}
          time={time}
          usuario={usuario}
          onFechar={fecharAssinatura}
          onContinuar={assinaturaContinuar}
        />
      )}
    </>
  )
}