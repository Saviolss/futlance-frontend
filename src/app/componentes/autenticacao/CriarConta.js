
"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { api } from "@/app/servidor/api"

export default function CriarConta({ aberto = true, onFechar, onCadastroSucesso }) {
  const { t, i18n } = useTranslation()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [aceitouPolitica, setAceitouPolitica] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")

  const possuiTamanhoMinimo = senha.length >= 6
  const possuiNumero = /[0-9]/.test(senha)
  const possuiEspecial = /[^A-Za-z0-9]/.test(senha)
  const senhaAtendeRequisitos = possuiTamanhoMinimo && possuiNumero && possuiEspecial

  async function cadastrar(event) {
    event.preventDefault()
    if (carregando) return
    setErro("")
    setSucesso("")

    const nomeNormalizado = nome.trim().replace(/\s+/g, " ")

    if (nomeNormalizado.length < 2) {
      setErro(t("nomeInvalido", "Digite seu nome completo."))
      return
    }

    if (nomeNormalizado.length > 100) {
      setErro(t("nomeInvalido", "O nome deve ter no máximo 100 caracteres."))
      return
    }

    const emailNormalizado = email.trim().toLowerCase()

    if (!emailNormalizado) {
      setErro(t("emailObrigatorio", "Digite seu e-mail."))
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado)) {
      setErro(t("emailInvalido", "Digite um e-mail válido."))
      return
    }

    if (!possuiTamanhoMinimo) {
      setErro(t("senhaMinima", "A senha deve ter pelo menos 6 caracteres."))
      return
    }

    if (!possuiNumero || !possuiEspecial) {
      setErro(t("senhaRequisitos", "A senha deve conter número e caractere especial."))
      return
    }

    if (senha !== confirmarSenha) {
      setErro(t("senhasNaoConferem", "As senhas não conferem."))
      return
    }

    if (!aceitouPolitica) {
      setErro(t("aceiteTermosObrigatorio", "Você precisa aceitar a Política de Privacidade e os Termos de Uso."))
      return
    }

    try {
      setCarregando(true)

      const idiomaAtual = (i18n?.language || "pt").split("-")[0].toLowerCase()

      const resposta = await api.post("/auth/cadastro", {
        nome: nomeNormalizado,
        email: emailNormalizado,
        senha,
        idioma: idiomaAtual,
        aceitouPolitica: true
      })

      if (!resposta.data?.sucesso) {
        setErro(resposta.data?.mensagem || t("erroCadastro", "Não foi possível criar sua conta."))
        return
      }

      const dadosCadastro = {
        usuarioId: resposta.data?.usuarioId,
        nome: nomeNormalizado,
        email: resposta.data?.email || emailNormalizado,
        idioma: idiomaAtual
      }

      setSucesso(
        resposta.data?.mensagem ||
        t("codigoEnviado", "Conta criada. Enviamos um código de confirmação para seu e-mail.")
      )

      if (typeof onCadastroSucesso === "function") {
        onCadastroSucesso(dadosCadastro)
      }
    } catch (error) {
      console.error("Erro ao criar conta:", error)

      const status = error?.response?.status
      const mensagem = error?.response?.data?.mensagem || error?.response?.data?.erro

      if (status === 429) {
        setErro(
          mensagem ||
          t("muitasTentativasCadastro", "Muitas tentativas. Aguarde alguns minutos e tente novamente.")
        )
        return
      }

      if (status === 409) {
        setErro(
          mensagem ||
          t("emailJaCadastrado", "Este e-mail já está cadastrado.")
        )
        return
      }

      if (status === 400) {
        setErro(
          mensagem ||
          t("erroCadastro", "Verifique os dados informados.")
        )
        return
      }

      setErro(
        mensagem ||
        t("erroCadastro", "Não foi possível criar sua conta.")
      )
    } finally {
      setCarregando(false)
    }
  }

  if (!aberto) return null

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-[#111] border border-orange-400/30 rounded-xl p-6 shadow-lg text-white">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {t("criarConta", "Criar conta")}
        </h1>

        <form onSubmit={cadastrar} className="space-y-4">
          <div>
            <label htmlFor="cadastro-nome" className="block text-sm text-gray-300 mb-2">
              {t("nome", "Nome")}
            </label>
            <input
              id="cadastro-nome"
              type="text"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              autoComplete="name"
              placeholder={t("digiteSeuNome", "Digite seu nome")}
              disabled={carregando}
              maxLength={100}
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="cadastro-email" className="block text-sm text-gray-300 mb-2">
              {t("email", "E-mail")}
            </label>
            <input
              id="cadastro-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder={t("digiteSeuEmail", "Digite seu e-mail")}
              disabled={carregando}
              maxLength={254}
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="cadastro-senha" className="block text-sm text-gray-300 mb-2">
              {t("senha", "Senha")}
            </label>
            <input
              id="cadastro-senha"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              autoComplete="new-password"
              placeholder={t("digiteSuaSenha", "Digite sua senha")}
              disabled={carregando}
              maxLength={128}
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="cadastro-confirmar-senha" className="block text-sm text-gray-300 mb-2">
              {t("confirmarSenha", "Confirmar senha")}
            </label>
            <input
              id="cadastro-confirmar-senha"
              type="password"
              value={confirmarSenha}
              onChange={(event) => setConfirmarSenha(event.target.value)}
              autoComplete="new-password"
              placeholder={t("confirmeSuaSenha", "Confirme sua senha")}
              disabled={carregando}
              maxLength={128}
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
            />
          </div>

          <div className={`rounded-lg border p-3 transition-colors ${senhaAtendeRequisitos
            ? "border-green-500/40 bg-green-500/10"
            : "border-gray-800 bg-black/30"}`}>
            <p className="text-xs text-gray-400 mb-2">
              {t("senhaRequisitosTitulo", "A senha deve conter:")}
            </p>
            <ul className="space-y-1 text-xs">
              <li className={possuiTamanhoMinimo ? "text-green-400" : "text-gray-500"}>✓ {t("senhaRequisitoTamanho", "Pelo menos 6 caracteres")}</li>
              <li className={possuiNumero ? "text-green-400" : "text-gray-500"}>✓ {t("senhaRequisitoNumero", "Um número")}</li>
              <li className={possuiEspecial ? "text-green-400" : "text-gray-500"}>✓ {t("senhaRequisitoEspecial", "Um caractere especial")}</li>
            </ul>
          </div>

          {erro && (
            <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {erro}
            </div>
          )}

          {sucesso && (
            <div role="status" className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {sucesso}
            </div>
          )}

          <div className="rounded-lg border border-gray-800 p-4">
            <label htmlFor="aceitou-politica" className="flex items-start gap-3 cursor-pointer">
              <input
                id="aceitou-politica"
                type="checkbox"
                checked={aceitouPolitica}
                onChange={(event) => setAceitouPolitica(event.target.checked)}
                disabled={carregando}
                className="mt-1 h-4 w-4 accent-orange-500 cursor-pointer disabled:cursor-not-allowed"
              />
              <span className="text-sm text-gray-300 leading-5">
                {t("aceiteTermos", "Li e concordo com a Política de Privacidade e os Termos de Uso.")}
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={carregando || !aceitouPolitica}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {carregando
              ? t("criandoConta", "Criando conta...")
              : t("criarConta", "Criar conta")}
          </button>
        </form>
      </div>
    </div>
  )
}

