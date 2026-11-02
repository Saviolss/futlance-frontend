"use client"

import {
  useState
} from "react"
import {
  useRouter
} from "next/navigation"

import Login from "../componentes/autenticacao/Login"

import CriarConta from "../componentes/autenticacao/CriarConta"
import ModalConfirmarEmail from "../componentes/torcedor/ModalConfirmarEmail"
import ModalEscolherTime from "../componentes/torcedor/ModalEscolherTime"
import ModalAssistenteTorcedor from "../componentes/torcedor/ModalAssistenteTorcedor"
import ModalAssinatura from "../componentes/torcedor/ModalAssinatura"
import { api } from "@/app/servidor/api"


export default function LoginPage() {
  const router = useRouter()

  const [
    modo,
    setModo
  ] = useState("login")

  const [dadosCadastro, setDadosCadastro] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [time, setTime] = useState(null)
  const [modalEscolherTime, setModalEscolherTime] = useState(false)
  const [modalAssistente, setModalAssistente] = useState(false)
  const [modalAssinatura, setModalAssinatura] = useState(false)
  const [criandoAssinatura, setCriandoAssinatura] = useState(false)

  function finalizarFluxo() {
    setDadosCadastro(null)
    setModo("login")
    router.push("/")
    router.refresh()
  }

  function fecharConfirmarEmail() {
    setDadosCadastro(null)
  }

  function emailConfirmado(resposta) {
    const usuarioConfirmado = resposta?.usuario || null

    if (!usuarioConfirmado?.id) {
      console.error("Usuário confirmado não retornado pela API.")
      return
    }

    setUsuario(usuarioConfirmado)
    setDadosCadastro(null)

    try {
      const chave = `futlance_time_torcedor_${usuarioConfirmado.id}`
      const timeSalvo = localStorage.getItem(chave)

      if (timeSalvo) {
        const dadosTime = JSON.parse(timeSalvo)

        if (dadosTime?.slug && dadosTime?.nome) {
          setTime(dadosTime)
          finalizarFluxo()
          return
        }

        localStorage.removeItem(chave)
      }
    } catch (erro) {
      console.error("Erro ao carregar time do torcedor:", erro)
    }

    setModalEscolherTime(true)
  }

  function timeEscolhido(timeSelecionado) {
    if (!timeSelecionado?.slug) {
      return
    }

    const dadosTime = {
      timeId: timeSelecionado.timeId ?? timeSelecionado.id ?? null,
      nome: timeSelecionado.nomePopular || timeSelecionado.nome,
      escudo: timeSelecionado.escudo || null,
      slug: timeSelecionado.slug
    }

    try {
      if (usuario?.id) {
        localStorage.setItem(
          `futlance_time_torcedor_${usuario.id}`,
          JSON.stringify(dadosTime)
        )
      }
    } catch (erro) {
      console.error("Erro ao salvar time localmente:", erro)
    }

    setTime(dadosTime)
    setModalEscolherTime(false)
    setModalAssistente(true)
  }

  function assinarAgora() {
    setModalAssistente(false)
    setModalAssinatura(true)
  }

  async function assinaturaContinuar(dados) {
    if (criandoAssinatura) {
      return
    }

    try {
      setCriandoAssinatura(true)

      if (!dados?.telefone || !dados?.idioma || !dados?.pagamento) {
        throw new Error("Preencha os dados da assinatura.")
      }

      if (!time?.timeId && !time?.id) {
        throw new Error("Não foi possível identificar o time selecionado.")
      }

      const resposta = await api.post("/assinatura", {
        telefone: dados.telefone,
        idioma: dados.idioma,
        pagamento: dados.pagamento,
        time: {
          id: time.timeId ?? time.id,
          nome: time.nomePopular || time.nome || "",
          escudo: time.escudo || null,
          slug: time.slug || ""
        }
      })

      if (!resposta.data?.sucesso) {
        throw new Error(
          resposta.data?.mensagem || "Não foi possível criar a assinatura."
        )
      }

      if (!resposta.data?.assinatura?.id) {
        throw new Error("A assinatura foi criada, mas o ID não foi retornado.")
      }

      return resposta.data
    } catch (erro) {
      console.error("Erro ao criar assinatura:", erro)
      const status = erro?.response?.status
      const mensagem = status === 502
        ? "O serviço de assinatura está temporariamente indisponível. Tente novamente em alguns instantes."
        : erro?.response?.data?.mensagem ||
          erro?.response?.data?.erro ||
          erro?.message ||
          "Não foi possível iniciar o pagamento."

      throw new Error(mensagem)
    } finally {
      setCriandoAssinatura(false)
    }
  }

  function fecharAssinatura() {
    if (criandoAssinatura) {
      return
    }

    setModalAssinatura(false)
    finalizarFluxo()
  }


  return (

    <main className="min-h-screen flex items-center justify-center px-4 bg-gray-900 py-12">

      <div className="w-full max-w-md">

        {modo === "login" ? (

          <Login />

        ) : (

          <CriarConta onCadastroSucesso={setDadosCadastro} />

        )}


        {/* ==================================================
            ALTERNAR LOGIN / CADASTRO
        ================================================== */}

        <div className="mt-5 text-center">

          {modo === "login" ? (

            <button
              type="button"
              onClick={() =>
                setModo("cadastro")
              }
              className="text-sm text-zinc-400 hover:text-orange-400 transition"
            >

              Não tem conta?{" "}

              <span className="text-orange-400 font-medium">

                Criar conta

              </span>

            </button>

          ) : (

            <button
              type="button"
              onClick={() =>
                setModo("login")
              }
              className="text-sm text-zinc-400 hover:text-orange-400 transition"
            >

              Já tem uma conta?{" "}

              <span className="text-orange-400 font-medium">

                Entrar

              </span>

            </button>

          )}

        </div>

      </div>

      {dadosCadastro && (
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
          onFechar={() => setModalEscolherTime(false)}
          onSelecionarTime={timeEscolhido}
        />
      )}

      {modalAssistente && (
        <ModalAssistenteTorcedor
          aberto={true}
          time={time}
          onFechar={finalizarFluxo}
          onAgoraNao={finalizarFluxo}
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

    </main>

  )

}