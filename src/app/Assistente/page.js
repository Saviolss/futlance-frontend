"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Footer from "../componentes/footer/footer.js"
import Login from "../componentes/autenticacao/Login"
import CriarConta from "../componentes/autenticacao/CriarConta"
import ModalConfirmarEmail from "../componentes/torcedor/ModalConfirmarEmail"
import ModalEscolherTime from "../componentes/torcedor/ModalEscolherTime"
import ModalAssistenteTorcedor from "../componentes/torcedor/ModalAssistenteTorcedor"
import ModalAssinatura from "../componentes/torcedor/ModalAssinatura"
import { api } from "@/app/servidor/api"

const beneficios = [
  {
    numero: "01",
    titulo: "Não perca o apito inicial",
    descricao: "Receba um lembrete cinco minutos antes da partida do seu time.",
    icone: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    )
  },
  {
    numero: "02",
    titulo: "Acompanhe cada momento",
    descricao: "Saiba quando o jogo começar e receba o resultado assim que terminar.",
    icone: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="m9 10 6 3-6 3z" />
      </>
    )
  },
  {
    numero: "03",
    titulo: "Fique por dentro do seu clube",
    descricao: "Receba notícias selecionadas e mensagens no idioma que preferir.",
    icone: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    )
  }
]

function Icone({ children, className = "h-6 w-6" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

function BotaoAssinar({ className, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      Assinar agora
      <Icone className="h-4 w-4">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </Icone>
    </button>
  )
}

export default function AssistenteTorcedorLandingPage() {
  const router = useRouter()
  const [modalAcessoAberto, setModalAcessoAberto] = useState(false)
  const [modoAcesso, setModoAcesso] = useState("login")
  const [dadosCadastro, setDadosCadastro] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [time, setTime] = useState(null)
  const [modalEscolherTime, setModalEscolherTime] = useState(false)
  const [modalAssistente, setModalAssistente] = useState(false)
  const [modalAssinatura, setModalAssinatura] = useState(false)
  const [criandoAssinatura, setCriandoAssinatura] = useState(false)
  const [verificandoAssinatura, setVerificandoAssinatura] = useState(false)

  async function iniciarAssinatura() {
    if (verificandoAssinatura) return

    setModoAcesso("login")
    setVerificandoAssinatura(true)

    try {
      const resposta = await api.get("/auth/sessao")
      const usuarioAtual = resposta.data?.usuario

      if (resposta.data?.autenticado && usuarioAtual?.id) {
        await usuarioAutenticado(usuarioAtual)
        return
      }

      setModalAcessoAberto(true)
    } catch (erro) {
      if (erro?.response?.status === 401) {
        setModalAcessoAberto(true)
      } else {
        console.error("Erro ao verificar sessão do torcedor:", erro)
        alert(
          erro?.response?.data?.mensagem ||
          "Não foi possível iniciar a assinatura. Tente novamente."
        )
      }
    } finally {
      setVerificandoAssinatura(false)
    }
  }

  async function usuarioAutenticado(usuarioAtual) {
    if (!usuarioAtual?.id) {
      console.error("Usuário autenticado não retornado.")
      return
    }

    try {
      const respostaAssinaturas = await api.get("/assinatura")
      const assinaturas = respostaAssinaturas.data?.assinaturas || []

      if (assinaturas.some((assinatura) => assinatura.status === "ATIVA")) {
        setModalAcessoAberto(false)
        router.push("/configuracoes")
        return
      }

      setUsuario(usuarioAtual)
      setModalAcessoAberto(false)
      const chave = `futlance_time_torcedor_${usuarioAtual.id}`
      const timeSalvo = localStorage.getItem(chave)

      if (timeSalvo) {
        const timeAtual = JSON.parse(timeSalvo)
        if (timeAtual?.slug && timeAtual?.nome) {
          setTime(timeAtual)
          setModalAssistente(true)
          return
        }
        localStorage.removeItem(chave)
      }

      setModalEscolherTime(true)
    } catch (erro) {
      console.error("Erro ao verificar assinatura do torcedor:", erro)
      alert(
        erro?.response?.data?.mensagem ||
        "Não foi possível verificar sua assinatura. Tente novamente."
      )
    }
  }

  function emailConfirmado(resposta) {
    const usuarioAtual = resposta?.usuario

    if (!usuarioAtual?.id) {
      console.error("Usuário confirmado não retornado pela API.")
      return
    }

    setDadosCadastro(null)
    usuarioAutenticado(usuarioAtual)
  }

  function timeEscolhido(timeSelecionado) {
    if (!timeSelecionado?.slug) return

    const timeAtual = {
      timeId: timeSelecionado.timeId ?? timeSelecionado.id ?? null,
      nome: timeSelecionado.nomePopular || timeSelecionado.nome,
      escudo: timeSelecionado.escudo || null,
      slug: timeSelecionado.slug
    }

    try {
      if (usuario?.id) {
        localStorage.setItem(
          `futlance_time_torcedor_${usuario.id}`,
          JSON.stringify(timeAtual)
        )
      }
    } catch (erro) {
      console.error("Erro ao salvar time localmente:", erro)
    }

    setTime(timeAtual)
    setModalEscolherTime(false)
    setModalAssistente(true)
  }

  function abrirModalAssinatura() {
    setModalAssistente(false)
    setModalAssinatura(true)
  }

  async function assinaturaContinuar(dados) {
    if (criandoAssinatura) return

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

  return (
    <>
    <main className="min-h-screen overflow-hidden bg-[#070b12] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(ellipse_at_68%_18%,rgba(249,115,22,0.16),transparent_55%)]" />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" aria-label="Futlance, página inicial">
          <img
            src="/favicon.png"
            alt="Futlance"
            className="h-10 w-auto max-w-[180px] object-contain"
          />
        </Link>
        <Link
          href="/"
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
        >
          Voltar ao início
        </Link>
      </header>

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-20 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/[0.08] px-3.5 py-2 text-xs font-semibold tracking-wide text-orange-300 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.9)]" />
            O futebol do seu time, mais perto
          </div>

          <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Seu time joga.
            <span className="mt-1 block bg-gradient-to-r from-orange-300 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              O Futlance te avisa!
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Com o Assistente do Torcedor, as notícias e os momentos importantes
            do seu time chegam direto no seu WhatsApp. Você acompanha tudo,
            sem precisar ficar procurando.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <BotaoAssinar onClick={iniciarAssinatura} disabled={verificandoAssinatura} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-orange-500 px-7 text-base font-bold text-[#101010] shadow-[0_10px_35px_rgba(249,115,22,0.2)] transition hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-wait disabled:opacity-60" />
            <p className="text-sm text-zinc-500">
              Apenas <span className="font-semibold text-zinc-200">R$ 3,99/mês</span>
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <Icone className="h-4 w-4 text-emerald-400">
                <path d="m5 12 4 4L19 6" />
              </Icone>
              Notificações no WhatsApp
            </span>
            <span className="inline-flex items-center gap-2">
              <Icone className="h-4 w-4 text-emerald-400">
                <path d="m5 12 4 4L19 6" />
              </Icone>
              Cancele quando quiser
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-8 rounded-[2.5rem] bg-orange-500/10 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#171b25] to-[#0d1119] p-4 shadow-2xl sm:p-6">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Icone>
                    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-4.1-1L3 20l1.1-4.6a8.4 8.4 0 1 1 16.9-3.9Z" />
                    <path d="M8.5 9.5c.3 2 2 3.7 4 4" />
                  </Icone>
                </div>
                <div>
                  <p className="text-sm font-bold">Assistente do Torcedor</p>
                  <p className="mt-0.5 text-xs text-zinc-500">Seu time sempre com você</p>
                </div>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>

            <div className="mt-5 space-y-3">
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#183a32] p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <Icone className="h-4 w-4">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </Icone>
                  Lembrete de jogo
                </div>
                <p className="text-sm leading-6 text-zinc-100">
                  Hoje tem jogo do seu time! A partida começa em 5 minutos. ⚽
                </p>
                <p className="mt-2 text-right text-[11px] text-emerald-100/50">18:55</p>
              </div>

              <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-white/[0.07] bg-[#171c25] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                  Apito final
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  A partida terminou. Confira o resultado e continue acompanhando
                  as novidades do seu clube por aqui.
                </p>
                <p className="mt-2 text-right text-[11px] text-zinc-600">19:48</p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-orange-400/15 bg-orange-500/[0.06] p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-orange-300">
                <Icone className="h-5 w-5">
                  <path d="M12 21s-8.5-4.8-10.5-9.5C.2 8.8 2.2 4 6.5 4c2.1 0 3.5 1.1 4.5 2.3C12 5.1 13.4 4 15.5 4c4.3 0 6.3 4.8 5 7.5C20.5 16.2 12 21 12 21Z" />
                </Icone>
              </span>
              <p className="text-xs leading-5 text-zinc-300">
                Notícias, início de jogo e resultado final. Tudo em um só lugar.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-4 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#151a23] px-4 py-3 shadow-xl sm:flex">
            <span className="text-lg">⚽</span>
            <span className="text-xs font-medium text-zinc-300">A emoção não espera</span>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Mais perto da torcida
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Cada jogo tem uma história.
            </h2>
            <p className="mt-4 leading-7 text-zinc-400">
              O Assistente acompanha os momentos que fazem você vibrar pelo seu time.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {beneficios.map((beneficio) => (
              <article
                key={beneficio.numero}
                className="group rounded-2xl border border-white/[0.08] bg-[#0d131e] p-6 transition hover:-translate-y-1 hover:border-orange-500/30"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500/15">
                    <Icone>{beneficio.icone}</Icone>
                  </span>
                  <span className="text-sm font-semibold tracking-widest text-zinc-700">
                    {beneficio.numero}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{beneficio.titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{beneficio.descricao}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-[#18120e] via-[#111722] to-[#0d131e] p-6 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full bg-orange-500/[0.09] blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Sua torcida merece
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
              Seu time em campo. Você por dentro.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              Escolha seu time, informe seu WhatsApp e receba as novidades onde você estiver.
            </p>
          </div>
          <div className="relative mt-8 shrink-0 lg:mt-0 lg:text-center">
            <p className="text-3xl font-black">
              R$ 3,99<span className="ml-1 text-sm font-medium text-zinc-400">/mês</span>
            </p>
            <BotaoAssinar onClick={iniciarAssinatura} disabled={verificandoAssinatura} className="mt-4 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-7 font-bold text-[#101010] transition hover:bg-orange-400 disabled:cursor-wait disabled:opacity-60 sm:w-auto" />
            <p className="mt-3 text-xs text-zinc-500">Pagamento seguro. Cancele quando quiser.</p>
          </div>
        </div>
        <p className="mt-8 text-center text-2xl sm:text-sm leading-5 text-zinc-600">
          Ao assinar, você poderá escolher seu clube, cadastrar o WhatsApp e selecionar a forma de pagamento.
        </p>
      </section>

      {modalAcessoAberto && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative my-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0f1a] p-4 shadow-2xl sm:p-6">
            <button
              type="button"
              onClick={() => setModalAcessoAberto(false)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-2xl text-zinc-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Fechar"
            >
              ×
            </button>

            {modoAcesso === "login" ? (
              <Login onLoginSucesso={usuarioAutenticado} />
            ) : (
              <CriarConta onCadastroSucesso={setDadosCadastro} />
            )}

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => setModoAcesso((modo) => modo === "login" ? "cadastro" : "login")}
                className="text-sm text-zinc-400 transition hover:text-orange-400"
              >
                {modoAcesso === "login" ? "Não tem conta? " : "Já tem uma conta? "}
                <span className="font-medium text-orange-400">
                  {modoAcesso === "login" ? "Criar conta" : "Entrar"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {dadosCadastro && (
        <ModalConfirmarEmail
          aberto={true}
          usuarioId={dadosCadastro.usuarioId}
          email={dadosCadastro.email}
          onConfirmado={emailConfirmado}
          onFechar={() => setDadosCadastro(null)}
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
          onFechar={() => setModalAssistente(false)}
          onAgoraNao={() => setModalAssistente(false)}
          onAssinar={abrirModalAssinatura}
        />
      )}

      {modalAssinatura && (
        <ModalAssinatura
          aberto={true}
          time={time}
          usuario={usuario}
          onFechar={() => setModalAssinatura(false)}
          onContinuar={assinaturaContinuar}
        />
      )}
      <Footer />
    </main>
    </>
  )
}