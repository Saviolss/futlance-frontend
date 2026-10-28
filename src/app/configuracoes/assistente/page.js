"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { api } from "../../servidor/api"
import ModalAssinatura from "../../componentes/torcedor/ModalAssinatura"

export default function AssistenteTorcedorPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [carregando, setCarregando] = useState(true)
  const [usuario, setUsuario] = useState(null)
  const [time, setTime] = useState(null)
  const [assinaturaAberta, setAssinaturaAberta] = useState(false)

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      const resposta = await api.get("/auth/sessao")

      if (!resposta.data?.autenticado || !resposta.data?.usuario) {
        router.push("/")
        return
      }

      const usuarioAtual = resposta.data.usuario
      setUsuario(usuarioAtual)

      const chave = `futlance_time_torcedor_${usuarioAtual.id}`
      const timeSalvo = localStorage.getItem(chave)

      if (timeSalvo) {
        try {
          setTime(JSON.parse(timeSalvo))
        } catch {
          localStorage.removeItem(chave)
        }
      }
    } catch (erro) {
      console.error("Erro ao carregar Assistente do Torcedor:", erro)
      router.push("/")
    } finally {
      setCarregando(false)
    }
  }

  function voltar() {
    router.push("/configuracoes")
  }

  function abrirAssinatura() {
    if (!time) {
      alert(t("configuracoesAssistente.escolhaTime", "Escolha seu time antes de assinar o Assistente do Torcedor."))
      router.push("/configuracoes/meu-time")
      return
    }

    setAssinaturaAberta(true)
  }

  async function continuarAssinatura(dados) {
    if (!dados?.telefone) {
      throw new Error(t("configuracoesAssistente.whatsappObrigatorio", "Número de WhatsApp não informado."))
    }

    if (!dados?.idioma) {
      throw new Error(t("configuracoesAssistente.idiomaObrigatorio", "Idioma da assinatura não informado."))
    }

    if (!dados?.pagamento) {
      throw new Error(t("configuracoesAssistente.pagamentoObrigatorio", "Forma de pagamento não informada."))
    }

    if (!time?.timeId && !time?.id) {
      throw new Error(t("configuracoesAssistente.timeNaoIdentificado", "Não foi possível identificar o time selecionado."))
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
        resposta.data?.mensagem ||
        t("configuracoesAssistente.erroCriarAssinatura", "Não foi possível criar a assinatura.")
      )
    }

    if (!resposta.data?.assinatura?.id) {
      throw new Error(t("configuracoesAssistente.idNaoRetornado", "A assinatura foi criada, mas o ID não foi retornado."))
    }

    return resposta.data
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-[#070b12] px-4 py-10 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-orange-500" />
            <p className="text-sm text-zinc-400">
              {t("configuracoesAssistente.carregando", "Carregando Assistente...")}
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-[#070b12] text-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 sm:px-6 sm:py-8 md:pb-10">
        <button
          type="button"
          onClick={voltar}
          className="mb-6 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          {t("configuracoesAssistente.voltar", "Voltar para área de configurações")}
        </button>

        <section className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-[#15110d] via-[#0d131e] to-[#090d15]">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/[0.07] blur-3xl" />

          <div className="relative p-5 sm:p-8 md:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                  <path d="M10 21h4" />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-widest text-orange-400">
                  Futlance
                </p>

                <h1 className="mt-1 text-2xl font-bold sm:text-3xl md:text-4xl">
                  {t("configuracoesAssistente.titulo", "Assistente do Torcedor")}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                  {t("configuracoesAssistente.descricao", "Seu time perto de você. Receba informações importantes diretamente no WhatsApp.")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-[#0d131e] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
              {time?.escudo ? (
                <img
                  src={time.escudo}
                  alt={time.nome}
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21s-8.5-4.8-10.5-9.5C.2 8.8 2.2 4 6.5 4c2.1 0 3.5 1.1 4.5 2.3C12 5.1 13.4 4 15.5 4c4.3 0 6.3 4.8 5 7.5C20.5 16.2 12 21 12 21Z" />
                </svg>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                {t("configuracoesAssistente.seuTime", "Seu time")}
              </p>

              <h2 className="mt-1 truncate text-lg font-semibold">
                {time?.nomePopular || time?.nome || t("configuracoesAssistente.timeSelecionado", "Time selecionado")}
              </h2>
            </div>

            <span className="w-fit rounded-full border border-zinc-700 bg-white/[0.03] px-3 py-1 text-xs text-zinc-500">
              {t("configuracoesAssistente.aguardandoAtivacao", "Aguardando ativação")}
            </span>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            titulo={t("configuracoesAssistente.antesDoJogo", "Antes do jogo")}
            descricao={t("configuracoesAssistente.antesDoJogoDescricao", "Receba um aviso antes da partida começar.")}
            icone={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 14" />
              </svg>
            }
          />

          <InfoCard
            titulo={t("configuracoesAssistente.jogoComecou", "Jogo começou")}
            descricao={t("configuracoesAssistente.jogoComecouDescricao", "Saiba quando o jogo do seu time começar.")}
            icone={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            }
          />

          <InfoCard
            titulo={t("configuracoesAssistente.resultadoFinal", "Resultado final")}
            descricao={t("configuracoesAssistente.resultadoFinalDescricao", "Receba o resultado assim que a partida terminar.")}
            icone={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            }
          />

          <InfoCard
            titulo={t("configuracoesAssistente.noticiasTime", "Notícias do seu time")}
            descricao={t("configuracoesAssistente.noticiasTimeDescricao", "Receba notícias selecionadas sobre seu clube.")}
            icone={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M8 8h8" />
                <path d="M8 12h8" />
                <path d="M8 16h5" />
              </svg>
            }
          />

          <InfoCard
            titulo={t("configuracoesAssistente.whatsapp", "WhatsApp")}
            descricao={t("configuracoesAssistente.whatsappDescricao", "As notificações serão enviadas para seu WhatsApp.")}
            icone={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-4.1-1L3 20l1.1-4.6a8.4 8.4 0 1 1 16.9-3.9Z" />
                <path d="M8.5 9.5c.3 2 2 3.7 4 4" />
              </svg>
            }
          />

          <InfoCard
            titulo={t("configuracoesAssistente.seuIdioma", "Seu idioma")}
            descricao={t("configuracoesAssistente.seuIdiomaDescricao", "As mensagens serão enviadas no idioma escolhido.")}
            icone={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a14 14 0 0 1 0 18" />
                <path d="M12 3a14 14 0 0 0 0 18" />
              </svg>
            }
          />
        </section>

        <section className="mt-5 rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] p-5 sm:p-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-widest text-orange-400">
                {t("configuracoesAssistente.tenhaAssistente", "Tenha seu assistente")}
              </p>

              <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                {t("configuracoesAssistente.chamadaTitulo", "Não perca os momentos importantes do seu time.")}
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {t("configuracoesAssistente.chamadaDescricao", "Escolha seu plano, informe seu WhatsApp e receba as notificações do seu time diretamente no celular.")}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                  {t("configuracoesAssistente.seuTime", "Seu time")}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                  {t("configuracoesAssistente.whatsapp", "WhatsApp")}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                  {t("configuracoesAssistente.alertas", "Alertas")}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                  {t("configuracoesAssistente.noticias", "Notícias")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={abrirAssinatura}
              className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 active:scale-[0.98]"
            >
              {t("configuracoesAssistente.assinarAgora", "Assinar agora")}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-zinc-600">
          {t("configuracoesAssistente.gerenciarAssinatura", "Você poderá gerenciar sua assinatura e suas preferências pela área do torcedor.")}
        </p>
      </div>
      </main>

      <ModalAssinatura
        aberto={assinaturaAberta}
        time={time}
        usuario={usuario}
        onFechar={() => setAssinaturaAberta(false)}
        onContinuar={continuarAssinatura}
      />
    </>
  )
}

function InfoCard({ titulo, descricao, icone }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d131e] p-5 transition hover:border-white/15">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
        {icone}
      </div>

      <h3 className="mt-4 font-semibold text-white">
        {titulo}
      </h3>

      <p className="mt-1 text-sm leading-5 text-zinc-500">
        {descricao}
      </p>
    </div>
  )
}
