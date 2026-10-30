"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { api } from "@/app/servidor/api"

const regexSenha = /^(?=.*\d)(?=.*[^A-Za-z0-9\s]).{6,}$/

export default function ModalNovaSenha({ aberto = false, email = "", codigo = "", onFechar, onSucesso }) {
  const [senha, setSenha] = useState("")
  const [confirmacao, setConfirmacao] = useState("")
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [portalPronto, setPortalPronto] = useState(false)
  const [tempoBloqueado, setTempoBloqueado] = useState(0)

  const possuiTamanhoMinimo = senha.length >= 6
  const possuiNumero = /\d/.test(senha)
  const possuiEspecial = /[^A-Za-z0-9\s]/.test(senha)
  const senhaAtendeRequisitos = possuiTamanhoMinimo && possuiNumero && possuiEspecial

  useEffect(() => {
    setPortalPronto(true)
  }, [])

  useEffect(() => {
    if (!aberto) {
      setSenha("")
      setConfirmacao("")
      setErro("")
      setSucesso("")
      setCarregando(false)
      setTempoBloqueado(0)
    }
  }, [aberto])

  useEffect(() => {
    if (tempoBloqueado <= 0) return

    const intervalo = setInterval(() => {
      setTempoBloqueado((valorAtual) => {
        if (valorAtual <= 1) {
          return 0
        }
        return valorAtual - 1
      })
    }, 1000)

    return () => clearInterval(intervalo)
  }, [tempoBloqueado])

  function fecharModal() {
    if (carregando) return
    setSenha("")
    setConfirmacao("")
    setErro("")
    setSucesso("")
    onFechar?.()
  }

  async function salvarNovaSenha(event) {
    event.preventDefault()
    if (carregando || tempoBloqueado > 0) return
    setErro("")
    setSucesso("")

    if (!email) {
      setErro("Não foi possível identificar o e-mail para redefinir a senha.")
      return
    }

    if (!codigo || codigo.length !== 6) {
      setErro("Código inválido ou expirado.")
      return
    }

    if (!senha || !confirmacao) {
      setErro("Digite e confirme sua nova senha.")
      return
    }

    if (senha !== confirmacao) {
      setErro("As senhas não coincidem.")
      return
    }

    if (!regexSenha.test(senha)) {
      setErro("A senha deve ter no mínimo 6 caracteres, um número e um caractere especial.")
      return
    }

    try {
      setCarregando(true)
      const payload = {
        email,
        codigo,
        novaSenha: senha
      }

      const resposta = await api.post("/auth/redefinir-senha", payload)

      if (!resposta.data?.sucesso) {
        setErro(resposta.data?.mensagem || "Não foi possível redefinir a senha.")
        return
      }

      setSucesso(resposta.data?.mensagem || "Senha redefinida com sucesso.")

      if (typeof onSucesso === "function") {
        setTimeout(() => {
          onSucesso(resposta.data)
        }, 700)
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error)

      const status = error?.response?.status
      const mensagem = error?.response?.data?.mensagem || error?.response?.data?.erro

      if (status === 429) {
        const segundos = Number(error?.response?.headers?.["retry-after"] || 310)
        setTempoBloqueado(segundos)
        setErro(mensagem || "Muitas tentativas. Tente novamente em alguns minutos.")
        return
      }

      setErro(mensagem || "Não foi possível redefinir a senha.")
    } finally {
      setCarregando(false)
    }
  }

  if (!aberto || !portalPronto) return null

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-3 sm:p-4">
      <div className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-linear-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617] p-4 text-white shadow-2xl backdrop-blur-md sm:max-h-[calc(100dvh-2rem)] sm:p-6">
        <div className="mb-5 text-center sm:mb-6">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-xl sm:mb-4 sm:h-14 sm:w-14 sm:text-2xl">
            🔒
          </div>
          <h2 className="text-lg font-extrabold sm:text-xl">Criar nova senha</h2>
          <p className="mt-3 text-sm leading-5 text-gray-300 sm:leading-6">
            Digite a nova senha para continuar com a conta de <span className="break-all font-medium text-orange-400">{email}</span>.
          </p>
        </div>

        <form onSubmit={salvarNovaSenha} className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="nova-senha" className="mb-2 block text-sm text-gray-300">Nova senha</label>
            <input
              id="nova-senha"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Digite sua nova senha"
              disabled={carregando}
              className="w-full min-w-0 rounded-lg border border-gray-700 bg-[#0b0b0b] px-3 py-3 text-base text-white outline-none transition focus:border-orange-400 disabled:opacity-50 sm:px-4"
            />
          </div>

          <div>
            <label htmlFor="confirmar-nova-senha" className="mb-2 block text-sm text-gray-300">Confirmar nova senha</label>
            <input
              id="confirmar-nova-senha"
              type="password"
              value={confirmacao}
              onChange={(event) => setConfirmacao(event.target.value)}
              placeholder="Confirme sua nova senha"
              disabled={carregando}
              className="w-full min-w-0 rounded-lg border border-gray-700 bg-[#0b0b0b] px-3 py-3 text-base text-white outline-none transition focus:border-orange-400 disabled:opacity-50 sm:px-4"
            />
          </div>

          <div className={`rounded-lg border p-3 transition-colors ${senhaAtendeRequisitos
            ? "border-green-500/40 bg-green-500/10"
            : "border-gray-800 bg-black/30"}`}>
            <p className="mb-2 text-xs text-gray-400">A senha deve conter:</p>
            <ul className="space-y-1 text-xs">
              <li className={possuiTamanhoMinimo ? "text-green-400" : "text-gray-500"}>✓ Pelo menos 6 caracteres</li>
              <li className={possuiNumero ? "text-green-400" : "text-gray-500"}>✓ Um número</li>
              <li className={possuiEspecial ? "text-green-400" : "text-gray-500"}>✓ Um caractere especial</li>
            </ul>
          </div>

          {tempoBloqueado > 0 && (
            <div role="status" className="wrap-break-word rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
              Muitas tentativas. Tente novamente em {tempoBloqueado}s.
            </div>
          )}

          {erro && (
            <div role="alert" className="wrap-break-word rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {erro}
            </div>
          )}

          {sucesso && (
            <div role="status" className="wrap-break-word rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {sucesso}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando || tempoBloqueado > 0}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {carregando
              ? "Salvando..."
              : tempoBloqueado > 0
                ? `Aguarde ${tempoBloqueado}s`
                : "Salvar nova senha"}
          </button>
        </form>

        <div className="mt-5 border-t border-white/10 pt-4 text-center sm:mt-6">
          <button
            type="button"
            onClick={fecharModal}
            disabled={carregando}
            className="text-sm text-gray-500 transition hover:text-gray-300 disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
