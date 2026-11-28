"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { api } from "../../servidor/api"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
const precoMes = "7,50"
const precoAno = "90,00"

export default function ModalAssinatura({
  aberto,
  time,
  usuario,
  assinaturaPendente,
  onFechar,
  onContinuar,
  onRetomar
}) {
  const router = useRouter()
  const retomadaIniciada = useRef(false)

  const [telefone, setTelefone] = useState("")
  const [idioma, setIdioma] = useState("pt")
  const [pagamento, setPagamento] = useState("cartao")
  const [clientSecret, setClientSecret] = useState("")
  const [checkoutSessionId, setCheckoutSessionId] = useState("")
  const [paymentIntentId, setPaymentIntentId] = useState("")
  const [pix, setPix] = useState(null)
  const [assinaturaId, setAssinaturaId] = useState("")
  const [criando, setCriando] = useState(false)
  const [erro, setErro] = useState("")
  const [copiado, setCopiado] = useState(false)
  const [estadoPagamento, setEstadoPagamento] = useState("")
  const [mensagemPagamento, setMensagemPagamento] = useState("")
  const [tentativas, setTentativas] = useState(0)
  const [verificando, setVerificando] = useState(false)

  const checkoutConcluido = useCallback(() => {
    setEstadoPagamento("pendente")
    setMensagemPagamento("Seu pagamento foi enviado. Estamos confirmando sua assinatura.")
    setTentativas(0)
    setVerificando(true)
  }, [])

  function limparPagamento() {
    setClientSecret("")
    setCheckoutSessionId("")
    setPaymentIntentId("")
    setPix(null)
    setAssinaturaId("")
    setErro("")
    setCriando(false)
    setCopiado(false)
    setEstadoPagamento("")
    setMensagemPagamento("")
    setTentativas(0)
    setVerificando(false)
  }

  useEffect(() => {
    if (!aberto) {
      limparPagamento()
      retomadaIniciada.current = false
    }
  }, [aberto])

  async function retomarPagamento() {
    if (!assinaturaPendente?.id || !onRetomar || criando) return

    setErro("")
    setCriando(true)
    setAssinaturaId(assinaturaPendente.id)

    try {
      const resultado = await onRetomar(assinaturaPendente.id)
      const dados = resultado?.data || resultado
      const assinatura = dados?.assinatura

      if (!dados?.sucesso) {
        throw new Error(dados?.mensagem || "Não foi possível retomar o pagamento.")
      }

      setAssinaturaId(assinatura?.id || assinaturaPendente.id)
      setPagamento(assinatura?.formaPagamento || assinaturaPendente.formaPagamento || "cartao")
      setCheckoutSessionId(dados.sessionId || "")
      setPaymentIntentId(dados.paymentIntentId || "")

      if (assinatura?.status === "ATIVA") {
        setEstadoPagamento("sucesso")
        setMensagemPagamento("Sua assinatura já está ativa.")
        return
      }

      if (assinatura?.formaPagamento === "cartao") {
        if (!dados.clientSecret) {
          throw new Error("O Stripe não retornou os dados para continuar o pagamento.")
        }

        setClientSecret(dados.clientSecret)
        return
      }

      if (assinatura?.formaPagamento === "pix") {
        const dadosPix = dados.pix

        if (!dadosPix?.imagem && !dadosPix?.image_url_png && !dadosPix?.codigo && !dadosPix?.data) {
          throw new Error("O Stripe não retornou os dados do Pix.")
        }

        setPix({
          imagem: dadosPix.imagem || dadosPix.image_url_png || dadosPix.image_url_svg || "",
          codigo: dadosPix.codigo || dadosPix.data || "",
          expiracao: dadosPix.expiracao || dadosPix.expires_at || null,
          instrucoes: dadosPix.instrucoes || dadosPix.hosted_instructions_url || ""
        })

        setEstadoPagamento("pendente")
        setMensagemPagamento("Estamos aguardando a confirmação do pagamento.")
        setVerificando(true)
        return
      }

      throw new Error("Forma de pagamento inválida.")
    } catch (error) {
      setErro(
        error?.response?.data?.mensagem ||
        error?.message ||
        "Não foi possível retomar o pagamento."
      )
    } finally {
      setCriando(false)
    }
  }

  useEffect(() => {
    if (!aberto || !assinaturaPendente?.id || retomadaIniciada.current) return

    retomadaIniciada.current = true
    retomarPagamento()
  }, [aberto, assinaturaPendente?.id])

  useEffect(() => {
    if (!aberto || !assinaturaId || !verificando) return

    let ativo = true
    let timer

    async function consultarPagamento() {
      let tentativa = 0

      while (ativo) {
        tentativa += 1
        setTentativas(tentativa)

        try {
          let resposta

          if (checkoutSessionId) {
            resposta = await api.get("/assinatura/pagamento/retorno", {
              params: { session_id: checkoutSessionId }
            })
          } else if (paymentIntentId) {
            resposta = await api.get("/assinatura/pagamento/retorno", {
              params: { payment_intent_id: paymentIntentId }
            })
          } else {
            resposta = await api.get("/assinatura")
          }

          if (!ativo) return

          if (checkoutSessionId || paymentIntentId) {
            if (resposta.data?.estado === "sucesso") {
              setEstadoPagamento("sucesso")
              setMensagemPagamento(
                resposta.data.mensagem || "Pagamento confirmado! Sua assinatura está ativa."
              )
              setVerificando(false)
              return
            }

            if (resposta.data?.estado === "erro") {
              setEstadoPagamento("erro")
              setMensagemPagamento(
                resposta.data.mensagem || "Não foi possível confirmar o pagamento."
              )
              setVerificando(false)
              return
            }

            setEstadoPagamento("pendente")
            setMensagemPagamento(
              resposta.data?.mensagem ||
              "Estamos aguardando a confirmação do pagamento."
            )
          } else {
            const assinatura = resposta.data?.assinaturas?.find(
              item => item.id === assinaturaId
            )

            if (!assinatura) throw new Error("Não foi possível localizar essa assinatura.")

            if (assinatura.status === "ATIVA") {
              setEstadoPagamento("sucesso")
              setMensagemPagamento("Pagamento confirmado! Sua assinatura está ativa.")
              setVerificando(false)
              return
            }

            if (assinatura.status !== "PENDENTE") {
              setEstadoPagamento("erro")
              setMensagemPagamento("Não foi possível confirmar o pagamento.")
              setVerificando(false)
              return
            }

            setEstadoPagamento("pendente")
            setMensagemPagamento("Estamos aguardando a confirmação do pagamento.")
          }
        } catch (error) {
          if (!ativo) return

          const status = error?.response?.status
          const mensagemErro =
            error?.response?.data?.mensagem ||
            "Não foi possível consultar o pagamento. Tentaremos novamente."

          if (status && status < 500) {
            setEstadoPagamento("erro")
            setMensagemPagamento(mensagemErro)
            setVerificando(false)
            return
          }

          setEstadoPagamento("pendente")
          setMensagemPagamento(mensagemErro)
        }

        await new Promise(resolve => {
          timer = setTimeout(resolve, 3000)
        })
      }
    }

    consultarPagamento()

    return () => {
      ativo = false
      clearTimeout(timer)
    }
  }, [aberto, assinaturaId, checkoutSessionId, paymentIntentId, verificando])

  if (!aberto) return null

  function selecionarPagamento(metodo) {
    setPagamento(metodo)
    setClientSecret("")
    setCheckoutSessionId("")
    setPaymentIntentId("")
    setPix(null)
    setAssinaturaId("")
    setErro("")
    setCopiado(false)
    setEstadoPagamento("")
    setMensagemPagamento("")
    setTentativas(0)
    setVerificando(false)
  }

  async function continuar() {
    setErro("")
    setCriando(true)

    try {
      const resultado = await onContinuar({
        telefone,
        idioma,
        pagamento,
        time: {
          id: time?.timeId ?? time?.id,
          nome: time?.nomePopular || time?.nome || "",
          escudo: time?.escudo || null,
          slug: time?.slug || ""
        },
        usuarioId: usuario?.id
      })

      const dados = resultado?.data || resultado
      const dadosPix = dados?.pix || dados?.pixQrCode || null

      if (!dados?.assinatura?.id) {
        throw new Error("O servidor não retornou o identificador da assinatura.")
      }

      setAssinaturaId(dados.assinatura.id)
      setCheckoutSessionId(dados.sessionId || "")
      setPaymentIntentId(dados.paymentIntentId || "")

      if (pagamento === "cartao") {
        if (!dados.clientSecret) {
          throw new Error("O servidor não retornou os dados do Checkout do cartão.")
        }

        setClientSecret(dados.clientSecret)
      } else {
        if (dados.statusPagamento === "succeeded") {
          setEstadoPagamento("pendente")
          setMensagemPagamento("Pagamento recebido. Estamos confirmando sua assinatura.")
          setVerificando(true)
          return
        }

        if (
          !dadosPix?.imagem &&
          !dadosPix?.image_url_png &&
          !dadosPix?.codigo &&
          !dadosPix?.data
        ) {
          throw new Error("O servidor não retornou o QR Code Pix.")
        }

        setPix({
          imagem: dadosPix.imagem || dadosPix.image_url_png || dadosPix.image_url_svg || "",
          codigo: dadosPix.codigo || dadosPix.data || "",
          expiracao: dadosPix.expiracao || dadosPix.expires_at || null,
          instrucoes: dadosPix.instrucoes || dadosPix.hosted_instructions_url || ""
        })

        setEstadoPagamento("pendente")
        setMensagemPagamento("Estamos aguardando a confirmação do pagamento.")
        setVerificando(true)
      }
    } catch (error) {
      setErro(
        error?.response?.data?.mensagem ||
        error?.message ||
        "Não foi possível iniciar o pagamento."
      )
    } finally {
      setCriando(false)
    }
  }

  async function copiarPix() {
    if (!pix?.codigo) return

    try {
      await navigator.clipboard.writeText(pix.codigo)
      setCopiado(true)
    } catch {
      setErro("Não foi possível copiar automaticamente. Selecione e copie o código Pix.")
    }
  }

  function verificarNovamente() {
    setErro("")
    setEstadoPagamento("pendente")
    setMensagemPagamento("Estamos verificando seu pagamento.")
    setTentativas(0)
    setVerificando(true)
  }

  function voltarParaHome() {
    onFechar?.()
    router.push("/")
  }

  const aguardandoRetomada = Boolean(
    assinaturaPendente && !clientSecret && !pix && !estadoPagamento
  )

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-5">
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#101318] p-5 text-white shadow-2xl sm:p-6">
        <button
          type="button"
          onClick={onFechar}
          className="absolute right-4 top-3 rounded-lg px-3 py-1 text-2xl text-gray-400 hover:bg-white/10 hover:text-white"
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="mb-5 pr-8">
          <h2 className="text-xl font-bold">Assistente do Torcedor</h2>
          <p className="mt-1 text-sm text-gray-400">
            Receba notificações do seu time pelo WhatsApp.
          </p>
        </div>

        {time && (
          <div className="mb-5 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            {time.escudo && (
              <img src={time.escudo} alt="" className="h-10 w-10 object-contain" />
            )}
            <div>
              <p className="font-semibold">{time.nomePopular || time.nome}</p>
              <p className="text-xs text-gray-400">Seu time selecionado</p>
            </div>
          </div>
        )}

        {aguardandoRetomada ? (
          <div className="py-6 text-center">
            <p className="text-sm text-gray-300">
              {criando ? "Retomando seu pagamento..." : "Não foi possível carregar o pagamento."}
            </p>
            {erro && (
              <p role="alert" className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
                {erro}
              </p>
            )}
            <button
              type="button"
              onClick={retomarPagamento}
              disabled={criando}
              className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white disabled:opacity-50"
            >
              {criando ? "Carregando..." : "Tentar retomar pagamento"}
            </button>
          </div>
        ) : estadoPagamento === "sucesso" || estadoPagamento === "erro" ? (
          <div className="py-3 text-center">
            <h3 className="text-xl font-bold">
              {estadoPagamento === "sucesso" ? "Pagamento confirmado!" : "Não foi possível confirmar"}
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-300">{mensagemPagamento}</p>

            {estadoPagamento === "sucesso" && (
              <p className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-300">
                Sua assinatura está ativa. Você já pode receber as notificações do seu time.
              </p>
            )}

            {estadoPagamento === "erro" && (
              <button
                type="button"
                onClick={verificarNovamente}
                className="mt-5 w-full rounded-xl border border-white/15 px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
              >
                Verificar novamente
              </button>
            )}

            <button
              type="button"
              onClick={voltarParaHome}
              className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white hover:bg-orange-600"
            >
              Voltar ao Futlance
            </button>
          </div>
        ) : assinaturaId && estadoPagamento === "pendente" && !clientSecret && !pix ? (
          <div className="py-3 text-center">
            <h3 className="text-xl font-bold">Confirmando pagamento...</h3>
            <p role="status" className="mt-3 text-sm text-gray-300">{mensagemPagamento}</p>
            <p className="mt-3 text-xs text-gray-500">
              Verificação {tentativas}. Continuaremos tentando receber a confirmação.
            </p>
            {!verificando && (
              <button
                type="button"
                onClick={verificarNovamente}
                className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white"
              >
                Verificar novamente
              </button>
            )}
            <button
              type="button"
              onClick={voltarParaHome}
              className="mt-3 w-full rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/5"
            >
              Tentar mais tarde
            </button>
          </div>
        ) : !clientSecret && !pix ? (
          <>
            <label className="mb-1 block text-sm font-medium" htmlFor="telefone-assistente">
              WhatsApp com DDI e DDD
            </label>
            <input
              id="telefone-assistente"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
              placeholder="Ex.: 5511999999999"
              className="mb-4 w-full rounded-xl border border-white/10 bg-[#1b2028] px-4 py-3 outline-none focus:border-orange-500"
            />

            <label className="mb-1 block text-sm font-medium" htmlFor="idioma-assistente">
              Idioma das notificações
            </label>
            <select
              id="idioma-assistente"
              value={idioma}
              onChange={e => setIdioma(e.target.value)}
              className="mb-5 w-full rounded-xl border border-white/10 bg-[#1b2028] px-4 py-3"
            >
              <option value="pt">Português</option>
            </select>

            <p className="mb-2 text-sm font-semibold">Escolha a forma de pagamento</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => selecionarPagamento("cartao")}
                className={`rounded-xl border p-4 text-left ${pagamento === "cartao" ? "border-orange-500 bg-orange-500/10" : "border-white/10 bg-white/5"}`}
              >
                <span className="block font-semibold">Cartão</span>
                <span className="mt-1 block text-sm text-gray-300">R$ {precoMes}/mês</span>
                <span className="mt-1 block text-xs text-gray-400">Cobrança recorrente</span>
              </button>
              <button
                type="button"
                onClick={() => selecionarPagamento("pix")}
                className={`rounded-xl border p-4 text-left ${pagamento === "pix" ? "border-orange-500 bg-orange-500/10" : "border-white/10 bg-white/5"}`}
              >
                <span className="block font-semibold">Pix anual</span>
                <span className="mt-1 block text-sm text-gray-300">R$ {precoAno}/ano</span>
                <span className="mt-1 block text-xs text-gray-400">
                  Pagamento único, sem renovação automática
                </span>
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-sm text-gray-300">
                {pagamento === "cartao"
                  ? "Após continuar, o formulário seguro de cartão será exibido aqui."
                  : "Após continuar, o QR Code Pix e o código copia e cola serão exibidos aqui."}
              </p>
            </div>

            {erro && (
              <p role="alert" className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
                {erro}
              </p>
            )}

            <button
              type="button"
              onClick={continuar}
              disabled={criando || !telefone.trim()}
              className="mt-5 w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {criando ? "Preparando pagamento..." : pagamento === "pix" ? "Gerar QR Code Pix" : "Abrir formulário do cartão"}
            </button>
          </>
        ) : clientSecret ? (
          <>
            <p className="mb-3 text-sm text-gray-300">
              Preencha os dados do cartão abaixo. A assinatura será ativada após a confirmação do Stripe.
            </p>
            <div className="min-h-[350px] overflow-hidden rounded-xl bg-white p-2 text-black">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret, onComplete: checkoutConcluido }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#151a23] to-[#0d1118] p-5 text-center text-white">
              <h3 className="text-lg font-bold">Pague com Pix</h3>
              <p className="mt-1 text-sm text-gray-400">
                Escaneie o QR Code com o aplicativo do seu banco.
              </p>

              {pix.imagem ? (
                <div className="mx-auto mt-5 inline-flex rounded-2xl bg-white p-3">
                  <img src={pix.imagem} alt="QR Code Pix para pagamento" className="h-52 w-52 object-contain" />
                </div>
              ) : (
                <p className="mt-4 text-sm text-red-300">O Stripe não forneceu a imagem do QR Code.</p>
              )}

              {pix.codigo && (
                <>
                  <label htmlFor="codigo-pix" className="mt-5 block text-left text-sm font-semibold">
                    Pix copia e cola
                  </label>
                  <textarea
                    id="codigo-pix"
                    readOnly
                    value={pix.codigo}
                    className="mt-2 min-h-24 w-full resize-y break-all rounded-xl border border-white/10 bg-[#0b0f15] p-3 text-xs text-gray-300"
                  />
                  <button
                    type="button"
                    onClick={copiarPix}
                    className="mt-3 w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white hover:bg-orange-400"
                  >
                    {copiado ? "Código copiado!" : "Copiar código Pix"}
                  </button>
                </>
              )}

              {pix.expiracao && (
                <p className="mt-3 text-xs text-gray-500">
                  Validade: {new Date(pix.expiracao * 1000).toLocaleString("pt-BR")}
                </p>
              )}

              {pix.instrucoes && (
                <a href={pix.instrucoes} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-orange-400 underline">
                  Abrir instruções de pagamento
                </a>
              )}
            </div>

            <p className="mt-3 text-center text-sm text-gray-300">
              A assinatura será ativada somente após a confirmação do pagamento.
            </p>
            <p role="status" className="mt-3 text-center text-xs text-gray-400">
              {verificando ? `Verificação ${tentativas}. ${mensagemPagamento}` : mensagemPagamento}
            </p>

            {erro && (
              <p role="alert" className="mt-3 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
                {erro}
              </p>
            )}

            {!verificando && (
              <button
                type="button"
                onClick={verificarNovamente}
                className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white"
              >
                Verificar novamente
              </button>
            )}

            <button
              type="button"
              onClick={voltarParaHome}
              className="mt-3 w-full rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/5"
            >
              Tentar mais tarde
            </button>
          </>
        )}

        {estadoPagamento === "pendente" && clientSecret && (
          <div className="mt-4 text-center text-sm text-gray-400">
            {verificando ? `Verificação ${tentativas}. ${mensagemPagamento}` : mensagemPagamento}
            {!verificando && (
              <button
                type="button"
                onClick={verificarNovamente}
                className="mt-3 w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white"
              >
                Verificar novamente
              </button>
            )}
            <button
              type="button"
              onClick={voltarParaHome}
              className="mt-3 w-full rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/5"
            >
              Tentar mais tarde
            </button>
          </div>
        )}

        <p className="mt-4 text-center text-xs text-gray-500">
          Pagamento processado com segurança.
        </p>
      </div>
    </div>
  )
}