"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "../../../servidor/api"

export default function RetornoPagamentoPage() {
  const router = useRouter()
  const [sessionId, setSessionId] = useState("")
  const [estado, setEstado] = useState("carregando")
  const [mensagem, setMensagem] = useState("Estamos verificando seu pagamento com segurança.")
  const [tentativas, setTentativas] = useState(0)
  const [reverificar, setReverificar] = useState(0)

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("session_id")
    if (!id) {
      setEstado("erro")
      setMensagem("Não encontramos o identificador do pagamento. Volte ao Futlance e tente novamente.")
      return
    }
    setSessionId(id)
  }, [])

  const verificarPagamento = useCallback(async id => {
    const resposta = await api.get("/assinatura/pagamento/retorno", {
      params: { session_id: id }
    })
    return resposta.data
  }, [])

  useEffect(() => {
    if (!sessionId) return

    let ativo = true
    let timer

    async function consultar() {
      let tentativa = 0

      while (ativo) {
        tentativa += 1
        setTentativas(tentativa)

        try {
          const dados = await verificarPagamento(sessionId)
          if (!ativo) return

          setMensagem(dados.mensagem || "Estamos verificando seu pagamento.")
          setEstado(dados.estado || "pendente")
          if (dados.estado !== "pendente") return
        } catch (error) {
          if (!ativo) return

          const status = error?.response?.status
          const mensagemErro =
            error?.response?.data?.mensagem ||
            "Não conseguimos conectar ao servidor. Tentaremos verificar novamente em alguns instantes."

          if (status && status < 500) {
            setEstado("erro")
            setMensagem(mensagemErro)
            return
          }

          setEstado("pendente")
          setMensagem(mensagemErro)
        }

        await new Promise(resolve => {
          timer = setTimeout(resolve, 3000)
        })
      }
    }

    consultar()

    return () => {
      ativo = false
      clearTimeout(timer)
    }
  }, [sessionId, reverificar, verificarPagamento])

  const sucesso = estado === "sucesso"
  const pendente = estado === "pendente" || estado === "carregando"
  const erro = estado === "erro"

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080a0e] px-4 py-8 text-white">
      <section role="dialog" aria-modal="true" aria-labelledby="retorno-titulo" className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101318] p-6 text-center shadow-2xl sm:p-8">
        <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${sucesso ? "bg-green-500/15 text-green-400" : erro ? "bg-red-500/15 text-red-400" : "bg-orange-500/15 text-orange-400"}`}>
          {sucesso ? (
            <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          ) : erro ? (
            <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 8v5m0 4h.01M10.3 3.9 1.9 18.4A1.8 1.8 0 0 0 3.5 21h17a1.8 1.8 0 0 0 1.6-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-9 w-9 animate-spin" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" opacity=".25" /><path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" /></svg>
          )}
        </div>

        <h1 id="retorno-titulo" className="text-2xl font-bold">
          {sucesso ? "Pagamento confirmado!" : erro ? "Não foi possível confirmar" : "Confirmando pagamento..."}
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-300">{mensagem}</p>

        {sucesso && (
          <p className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-300">
            Sua assinatura do Assistente do Torcedor está ativa. Você já pode aproveitar as notificações do seu time.
          </p>
        )}

        {pendente && (
          <p className="mt-4 text-xs text-gray-500">
            Verificação {tentativas}. Continuaremos tentando até receber a confirmação.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {pendente && (
            <button type="button" onClick={() => setReverificar(atual => atual + 1)} className="w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600">
              Verificar novamente
            </button>
          )}
          {erro && (
            <button type="button" onClick={() => router.push("/")} className="w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600">
              Tentar novamente
            </button>
          )}
          {sucesso && (
            <button type="button" onClick={() => router.push("/")} className="w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600">
              Voltar ao Futlance
            </button>
          )}
          {!sucesso && !erro && (
            <button type="button" onClick={() => router.push("/")} className="w-full rounded-xl border border-white/15 px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5">
              Tentar mais tarde
            </button>
          )}
        </div>
        <p className="mt-5 text-xs text-gray-500">Pagamento processado com segurança pelo Stripe.</p>
      </section>
    </main>
  )
}
