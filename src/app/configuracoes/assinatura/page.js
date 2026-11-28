"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { api } from "@/app/servidor/api"
import ModalAssinatura from "@/app/componentes/torcedor/ModalAssinatura"
import ModalEscolherTime from "@/app/componentes/torcedor/ModalEscolherTime"

export default function MinhasAssinaturasPage() {
  const router = useRouter()
  const { t } = useTranslation()

  const [carregando, setCarregando] = useState(true)
  const [usuario, setUsuario] = useState(null)
  const [time, setTime] = useState(null)
  const [assinaturas, setAssinaturas] = useState([])
  const [modalEscolherTime, setModalEscolherTime] = useState(false)
  const [modalAssinatura, setModalAssinatura] = useState(false)
  const [assinaturaPendente, setAssinaturaPendente] = useState(null)
  const [cancelandoId, setCancelandoId] = useState(null)
  const [assinaturaCancelar, setAssinaturaCancelar] = useState(null)

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      const respostaSessao = await api.get("/auth/sessao")

      if (!respostaSessao.data?.autenticado || !respostaSessao.data?.usuario) {
        router.push("/configuracoes")
        return
      }

      const usuarioAtual = respostaSessao.data.usuario
      setUsuario(usuarioAtual)

      const chaveTime = `futlance_time_torcedor_${usuarioAtual.id}`
      const timeSalvo = localStorage.getItem(chaveTime)

      if (timeSalvo) {
        try {
          setTime(JSON.parse(timeSalvo))
        } catch {
          localStorage.removeItem(chaveTime)
        }
      }

      const respostaAssinaturas = await api.get("/assinatura")

      if (respostaAssinaturas.data?.sucesso) {
        const lista = respostaAssinaturas.data.assinaturas || []
        setAssinaturas(lista)

        if (!timeSalvo && lista[0]?.time) {
          setTime({
            id: lista[0].time.timeId,
            nome: lista[0].time.nomePopular || lista[0].time.nome || "",
            escudo: lista[0].time.escudo || null,
            slug: lista[0].time.slug || ""
          })
        }
      }
    } catch (error) {
      console.error(
        t("configuracoesAssinatura.erroCarregarLog", "Erro ao carregar assinaturas:"),
        error
      )

      if (error.response?.status === 401) {
        router.push("/configuracoes")
        return
      }

      alert(
        t(
          "configuracoesAssinatura.erroCarregar",
          "Não foi possível carregar suas assinaturas."
        )
      )
    } finally {
      setCarregando(false)
    }
  }

  function abrirAssinatura() {
    if (!time) {
      setModalEscolherTime(true)
      return
    }

    setAssinaturaPendente(null)
    setModalAssinatura(true)
  }

  function selecionarTime(timeSelecionado) {
    const timeAtual = {
      timeId: timeSelecionado.timeId ?? timeSelecionado.id ?? null,
      nome: timeSelecionado.nomePopular || timeSelecionado.nome || "",
      escudo: timeSelecionado.escudo || null,
      slug: timeSelecionado.slug || ""
    }

    setTime(timeAtual)

    if (usuario?.id) {
      try {
        localStorage.setItem(
          `futlance_time_torcedor_${usuario.id}`,
          JSON.stringify(timeAtual)
        )
      } catch (error) {
        console.error("Erro ao salvar o time selecionado:", error)
      }
    }

    setModalEscolherTime(false)
    setAssinaturaPendente(null)
    setModalAssinatura(true)
  }

  async function continuarAssinatura(dados) {
    try {
      const resposta = await api.post("/assinatura", dados)

      if (!resposta.data?.sucesso || !resposta.data?.assinatura?.id) {
        throw new Error(
          resposta.data?.mensagem ||
          t(
            "configuracoesAssinatura.erroAssinatura",
            "Não foi possível iniciar a assinatura."
          )
        )
      }

      return resposta.data
    } catch (error) {
      console.error(
        t("configuracoesAssinatura.erroIniciarLog", "Erro ao iniciar assinatura:"),
        error
      )

      throw new Error(
        error.response?.data?.mensagem ||
        error.message ||
        t(
          "configuracoesAssinatura.erroAssinatura",
          "Não foi possível iniciar a assinatura."
        )
      )
    }
  }

  async function retomarAssinatura(assinaturaId) {
    try {
      const resposta = await api.post(`/assinatura/${assinaturaId}/retomar`)

      if (!resposta.data?.sucesso) {
        throw new Error(
          resposta.data?.mensagem || "Não foi possível retomar o pagamento."
        )
      }

      return resposta.data
    } catch (error) {
      console.error("Erro ao retomar pagamento:", error)

      throw new Error(
        error.response?.data?.mensagem ||
        error.message ||
        "Não foi possível retomar o pagamento."
      )
    }
  }

  function abrirRetomada(assinatura) {
    setAssinaturaPendente(assinatura)

    setTime({
      id: assinatura.time?.timeId,
      timeId: assinatura.time?.timeId,
      nome: assinatura.time?.nomePopular || assinatura.time?.nome || "",
      nomePopular: assinatura.time?.nomePopular || assinatura.time?.nome || "",
      escudo: assinatura.time?.escudo || null,
      slug: assinatura.time?.slug || ""
    })

    setModalAssinatura(true)
  }

  function solicitarCancelamento(assinatura) {
    setAssinaturaCancelar(assinatura)
  }

  function fecharModalCancelamento() {
    if (cancelandoId) return
    setAssinaturaCancelar(null)
  }

  async function confirmarCancelamento() {
    if (!assinaturaCancelar) return

    const assinaturaId = assinaturaCancelar.id

    try {
      setCancelandoId(assinaturaId)

      const resposta = await api.post(`/assinatura/${assinaturaId}/cancelar`)

      if (!resposta.data?.sucesso) {
        throw new Error(
          resposta.data?.mensagem ||
          t(
            "configuracoesAssinatura.erroCancelar",
            "Não foi possível cancelar a assinatura."
          )
        )
      }

      const assinaturaAtualizada = resposta.data.assinatura

      setAssinaturas(lista =>
        lista.map(assinatura =>
          assinatura.id === assinaturaId
            ? { ...assinatura, ...assinaturaAtualizada }
            : assinatura
        )
      )

      setAssinaturaCancelar(null)

      alert(
        t(
          "configuracoesAssinatura.cancelamentoSucesso",
          "A renovação da sua assinatura foi cancelada. Você continuará tendo acesso até o final do período pago."
        )
      )
    } catch (error) {
      console.error("Erro ao cancelar assinatura:", error)

      alert(
        error.response?.data?.mensagem ||
        error.message ||
        t(
          "configuracoesAssinatura.erroCancelar",
          "Não foi possível cancelar a assinatura."
        )
      )
    } finally {
      setCancelandoId(null)
    }
  }

  function formatarData(data) {
    if (!data) return "-"
    return new Date(data).toLocaleDateString("pt-BR")
  }

  function formatarStatus(status) {
    const statusMap = {
      NENHUM: t("configuracoesAssinatura.statusNenhum", "Nenhum"),
      ATIVA: t("configuracoesAssinatura.statusAtiva", "Ativa"),
      PENDENTE: t("configuracoesAssinatura.statusPendente", "Pendente"),
      CANCELADA: t("configuracoesAssinatura.statusCancelada", "Cancelada"),
      EXPIRADA: t("configuracoesAssinatura.statusExpirada", "Expirada")
    }

    return statusMap[status] || status || "-"
  }

  function classeStatus(status) {
    if (status === "NENHUM") {
      return "bg-gray-500/15 text-gray-400 border-gray-500/30"
    }
    if (status === "ATIVA") {
      return "bg-green-500/15 text-green-400 border-green-500/30"
    }

    if (status === "PENDENTE") {
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
    }

    if (status === "CANCELADA" || status === "EXPIRADA") {
      return "bg-red-500/15 text-red-400 border-red-500/30"
    }

    return "bg-gray-500/15 text-gray-400 border-gray-500/30"
  }

  function obterTimeAssinatura(assinatura) {
    if (assinatura?.time) {
      return {
        id: assinatura.time.timeId,
        nome:
          assinatura.time.nomePopular ||
          assinatura.time.nome ||
          t("configuracoesAssinatura.meuTime", "Meu time"),
        escudo: assinatura.time.escudo || null,
        slug: assinatura.time.slug || ""
      }
    }

    return time
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] text-white">
        <div className="text-gray-400">
          {t("configuracoesAssinatura.carregando", "Carregando suas assinaturas...")}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      <header>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <button
            type="button"
            onClick={() => router.push("/configuracoes")}
            className="flex items-center gap-2 text-gray-300 transition hover:text-white"
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
            {t("configuracoesAssinatura.voltar", "Voltar ao menu de configurações")}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t("configuracoesAssinatura.titulo", "Minhas assinaturas")}
          </h2>
          <p className="mt-2 text-gray-400">
            {t(
              "configuracoesAssinatura.descricao",
              "Consulte o status e os detalhes dos seus serviços no Futlance."
            )}
          </p>
        </div>

        {assinaturas.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#151515] p-6 text-center sm:p-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 text-3xl">
              ⚽
            </div>

            <h3 className="text-xl font-bold">
              {t(
                "configuracoesAssinatura.semAssinatura",
                "Você ainda não possui uma assinatura"
              )}
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-gray-400">
              {t(
                "configuracoesAssinatura.semAssinaturaDescricao",
                "Assine o Assistente do Torcedor e receba informações do seu time diretamente no WhatsApp."
              )}
            </p>

            {time && (
              <div className="mt-6 flex items-center justify-center gap-3">
                {time.escudo && (
                  <img
                    src={time.escudo}
                    alt={time.nome || "Time"}
                    className="h-12 w-12 object-contain"
                  />
                )}
                <div className="text-left">
                  <p className="text-xs text-gray-500">
                    {t("configuracoesAssinatura.seuTime", "Seu time")}
                  </p>
                  <p className="font-semibold">
                    {time.nome || t("configuracoesAssinatura.timeSelecionado", "Time selecionado")}
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={abrirAssinatura}
              className="mt-7 w-full rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
            >
              {t(
                "configuracoesAssinatura.assinarAssistente",
                "Assinar Assistente do Torcedor"
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {assinaturas.map(assinatura => {
              const timeAssinatura = obterTimeAssinatura(assinatura)
              const cancelamentoSolicitado = Boolean(assinatura.canceladaEm)

              const podeCancelar =
                assinatura.status === "ATIVA"  &&
                assinatura.formaPagamento === "cartao" &&
                !cancelamentoSolicitado

              return (
                <div
                  key={assinatura.id}
                  className="rounded-2xl border border-white/10 bg-[#151515] p-5 sm:p-7"
                >
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      {timeAssinatura?.escudo && (
                        <img
                          src={timeAssinatura.escudo}
                          alt={timeAssinatura.nome || "Time"}
                          className="h-14 w-14 object-contain"
                        />
                      )}
                      <div>
                        <p className="text-xs text-gray-500">
                          {t("configuracoesAssinatura.assistente", "Assistente do Torcedor")}
                        </p>
                        <h3 className="text-xl font-bold">
                          {timeAssinatura?.nome || t("configuracoesAssinatura.meuTime", "Meu time")}
                        </h3>
                      </div>
                    </div>

                    <span className={`w-fit rounded-full border px-3 py-1.5 text-sm font-medium ${classeStatus(assinatura.status)}`}>
                      {formatarStatus(assinatura.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl bg-black/20 p-4">
                      <p className="text-xs text-gray-500">
                        {t("configuracoesAssinatura.plano", "Plano")}
                      </p>
                      <p className="mt-1 font-semibold">{assinatura.plano || "-"}</p>
                    </div>

                    <div className="rounded-xl bg-black/20 p-4">
                      <p className="text-xs text-gray-500">
                        {t("configuracoesAssinatura.pagamento", "Pagamento")}
                      </p>
                      <p className="mt-1 font-semibold">{assinatura.formaPagamento || "-"}</p>
                    </div>

                    <div className="rounded-xl bg-black/20 p-4">
                      <p className="text-xs text-gray-500">
                        {t("configuracoesAssinatura.whatsapp", "WhatsApp")}
                      </p>
                      <p className="mt-1 font-semibold">
                        {assinatura.whatsapp || usuario?.whatsapp || "-"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-black/20 p-4">
                      <p className="text-xs text-gray-500">
                        {t("configuracoesAssinatura.inicioPlano", "Início")}
                      </p>
                      <p className="mt-1 font-semibold">{formatarData(assinatura.inicioEm)}</p>
                    </div>

                    <div className="rounded-xl bg-black/20 p-4">
                      <p className="text-xs text-gray-500">
                        {t("configuracoesAssinatura.validade", "Validade")}
                      </p>
                      <p className="mt-1 font-semibold">{formatarData(assinatura.fimEm)}</p>
                    </div>

                    <div className="rounded-xl bg-black/20 p-4">
                      <p className="text-xs text-gray-500">
                        {t("configuracoesAssinatura.idioma", "Idioma")}
                      </p>
                      <p className="mt-1 font-semibold uppercase">
                        {assinatura.idioma || usuario?.idioma || "-"}
                      </p>
                    </div>
                  </div>

                  {assinatura.status === "PENDENTE" && (
                    <div className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 ">
                      <p className="text-sm text-yellow-300">
                        Seu pagamento ainda não foi concluído. Você pode continuar o processo de pagamento para ativar sua assinatura.
                      </p>
                      <button
                        type="button"
                        onClick={() => abrirRetomada(assinatura)}
                        className="mt-4 w-full rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 mr-3 mb-3 sm:w-auto"
                      >
                        Continuar pagamento
                      </button>

                    </div>
                  )}

                  {assinatura.status === "ATIVA" && !cancelamentoSolicitado && (
                    <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                      <p className="text-sm text-green-300">
                        {t(
                          "configuracoesAssinatura.assinaturaAtiva",
                          "Sua assinatura está ativa. O Assistente do Torcedor poderá enviar as notificações relacionadas ao seu time."
                        )}
                      </p>
                    </div>
                  )}

                  {cancelamentoSolicitado && assinatura.status === "ATIVA" && (
                    <div className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                      <p className="text-sm text-yellow-300">
                        {t(
                          "configuracoesAssinatura.cancelamentoProgramado",
                          "A renovação foi cancelada. Você continuará tendo acesso ao Assistente do Torcedor até o final do período pago."
                        )}
                      </p>
                      {assinatura.fimEm && (
                        <p className="mt-2 text-sm text-yellow-200/70">
                          {t("configuracoesAssinatura.acessoAte", "Seu acesso permanece ativo até")}{" "}
                          <strong>{formatarData(assinatura.fimEm)}</strong>.
                        </p>
                      )}
                    </div>
                  )}

                  {podeCancelar && (
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => solicitarCancelamento(assinatura)}
                        className="rounded-xl border border-red-500/30 px-5 py-2.5 font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        {t("configuracoesAssinatura.cancelar", "Cancelar assinatura")}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      <ModalEscolherTime
        aberto={modalEscolherTime}
        onFechar={() => setModalEscolherTime(false)}
        onSelecionarTime={selecionarTime}
      />

      {modalAssinatura && (
        <ModalAssinatura
          aberto={modalAssinatura}
          time={time}
          usuario={usuario}
          assinaturaPendente={assinaturaPendente}
          onFechar={() => {
            setModalAssinatura(false)
            setAssinaturaPendente(null)
          }}
          onContinuar={continuarAssinatura}
          onRetomar={retomarAssinatura}
        />
      )}

      {assinaturaCancelar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                  <path d="M10.3 3.7 2.8 17a2 2 0 0 0 1.75 3h14.9a2 2 0 0 0 1.75-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
                </svg>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  {t("configuracoesAssinatura.confirmarCancelamento", "Cancelar assinatura?")}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {t(
                    "configuracoesAssinatura.confirmarCancelamentoDescricao",
                    "A renovação automática será cancelada. Você continuará tendo acesso ao Assistente do Torcedor até o final do período já pago."
                  )}
                </p>
                {assinaturaCancelar.fimEm && (
                  <p className="mt-3 text-sm text-gray-300">
                    {t("configuracoesAssinatura.acessoAte", "Seu acesso permanece ativo até")}{" "}
                    <strong>{formatarData(assinaturaCancelar.fimEm)}</strong>.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={fecharModalCancelamento}
                disabled={Boolean(cancelandoId)}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-gray-300 transition hover:bg-white/5 disabled:opacity-50"
              >
                {t("configuracoesAssinatura.voltar", "Voltar")}
              </button>

              <button
                type="button"
                onClick={confirmarCancelamento}
                disabled={Boolean(cancelandoId)}
                className="rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                {cancelandoId
                  ? t("configuracoesAssinatura.cancelando", "Cancelando...")
                  : t("configuracoesAssinatura.confirmarCancelar", "Sim, cancelar")}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}