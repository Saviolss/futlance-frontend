"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { api } from "@/app/servidor/api"

const idiomas = [
  { codigo: "pt", chave: "portugues" }
]

export default function PerfilTorcedorPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const [time, setTime] = useState(null)
  const [idioma, setIdioma] = useState("pt")
  const [whatsapp, setWhatsapp] = useState("")
  const [valoresSalvos, setValoresSalvos] = useState({ idioma: "pt", whatsapp: "" })
  const [camposSalvos, setCamposSalvos] = useState({})
  const [mensagem, setMensagem] = useState("")
  const [erro, setErro] = useState("")
  const [modalExcluir, setModalExcluir] = useState(false)
  const [excluindo, setExcluindo] = useState(false)
  const timerCamposSalvos = useRef(null)

  useEffect(() => {
    carregarPerfil()

    return () => {
      if (timerCamposSalvos.current) {
        clearTimeout(timerCamposSalvos.current)
      }
    }
  }, [])

  async function carregarPerfil() {
    try {
      setCarregando(true)
      setErro("")

      const resposta = await api.get("/auth/sessao")

      if (
        !resposta.data?.sucesso ||
        !resposta.data?.autenticado ||
        !resposta.data?.usuario
      ) {
        router.replace("/")
        return
      }

      const usuarioAtual = resposta.data.usuario

      setUsuario(usuarioAtual)
      setIdioma(usuarioAtual.idioma || "pt")
      setWhatsapp(usuarioAtual.whatsapp || "")
      setValoresSalvos({
        idioma: usuarioAtual.idioma || "pt",
        whatsapp: usuarioAtual.whatsapp || ""
      })

      const chave = `futlance_time_torcedor_${ usuarioAtual.id } `
      const timeSalvo = localStorage.getItem(chave)

      if (timeSalvo) {
        try {
          const dadosTime = JSON.parse(timeSalvo)

          if (dadosTime?.slug && dadosTime?.nome) {
            setTime(dadosTime)
          }
        } catch (erroTime) {
          console.error("Erro ao carregar time:", erroTime)
          localStorage.removeItem(chave)
        }
      }
    } catch (erro) {
      if (erro?.response?.status !== 401) {
        console.error("Erro ao carregar perfil:", erro)
      }

      router.replace("/")
    } finally {
      setCarregando(false)
    }
  }

  function alterarWhatsapp(valor) {
    const somenteNumeros = valor.replace(/\D/g, "")
    setWhatsapp(somenteNumeros)
  }

  async function salvarAlteracoes(event) {
    event.preventDefault()

    if (salvando) return

    setMensagem("")
    setErro("")

    if (whatsapp && (whatsapp.length < 10 || whatsapp.length > 15)) {
      setErro(t("configuracoesPerfil.whatsappInvalido", "Informe um número de WhatsApp válido."))
      return
    }

    try {
      setSalvando(true)

      // A rota de atualização do perfil será criada no backend.
      const resposta = await api.put("/auth/perfil", {
        idioma,
        whatsapp: whatsapp || null
      })

      if (!resposta.data?.sucesso) {
        throw new Error(
          resposta.data?.mensagem ||
          t("configuracoesPerfil.erroSalvar", "Não foi possível salvar as alterações.")
        )
      }

      if (resposta.data?.usuario) {
        setUsuario(resposta.data.usuario)
        setIdioma(resposta.data.usuario.idioma || idioma)
        setWhatsapp(resposta.data.usuario.whatsapp || "")
      }

      const novoIdioma = resposta.data?.usuario?.idioma || idioma
      const novoWhatsapp = resposta.data?.usuario?.whatsapp || ""
      setCamposSalvos({
        idioma: novoIdioma !== valoresSalvos.idioma,
        whatsapp: novoWhatsapp !== valoresSalvos.whatsapp
      })
      setValoresSalvos({ idioma: novoIdioma, whatsapp: novoWhatsapp })

      if (timerCamposSalvos.current) {
        clearTimeout(timerCamposSalvos.current)
      }
      timerCamposSalvos.current = setTimeout(() => {
        setCamposSalvos({})
      }, 3000)

      setMensagem(t("configuracoesPerfil.salvoSucesso", "Alterações salvas com sucesso."))
    } catch (erro) {
      console.error("Erro ao salvar perfil:", erro)

      const mensagemErro =
        erro?.response?.data?.mensagem ||
        erro?.message ||
        t("configuracoesPerfil.erroSalvar", "Não foi possível salvar as alterações.")

      setErro(mensagemErro)
    } finally {
      setSalvando(false)
    }
  }

  async function excluirConta() {
    if (excluindo) return

    try {
      setExcluindo(true)

      // A rota de exclusão será criada no backend.
      const resposta = await api.delete("/auth/conta")

      if (!resposta.data?.sucesso) {
        throw new Error(
          resposta.data?.mensagem ||
          t("configuracoesPerfil.erroExcluir", "Não foi possível excluir sua conta.")
        )
      }

      if (usuario?.id) {
        localStorage.removeItem(
          `futlance_time_torcedor_${ usuario.id } `
        )
      }

      setModalExcluir(false)
      setUsuario(null)
      setTime(null)

      await api.post("/auth/logout").catch(() => {})

      router.replace("/")
    } catch (erro) {
      console.error("Erro ao excluir conta:", erro)

      setErro(
        erro?.response?.data?.mensagem ||
        erro?.message ||
        t("configuracoesPerfil.erroExcluir", "Não foi possível excluir sua conta.")
      )

      setModalExcluir(false)
    } finally {
      setExcluindo(false)
    }
  }

  function voltar() {
    router.push("/configuracoes")
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-[#070b12] px-4 py-10 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-orange-500" />
            <p className="text-sm text-zinc-400">
              {t("configuracoesPerfil.carregando", "Carregando seu perfil...")}
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 pb-24 sm:px-6 sm:py-8 md:pb-10">
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
          {t("configuracoesPerfil.voltar", "Voltar ao menu de configurações")}
        </button>

        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest text-orange-400">
            {t("configuracoesPerfil.conta", "Conta")}
          </p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            {t("configuracoesPerfil.titulo", "Meu perfil")}
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            {t("configuracoesPerfil.descricao", "Gerencie seus dados, idioma e informações de contato.")}
          </p>
        </div>

        {mensagem && (
          <div className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {mensagem}
          </div>
        )}

        {erro && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {erro}
          </div>
        )}

        <div className="space-y-5">
          <section className="rounded-2xl border border-white/10 bg-[#0d131e]">
            <div className="border-b border-white/10 px-5 py-5 sm:px-6">
              <h2 className="font-semibold">{t("configuracoesPerfil.dadosConta", "Dados da conta")}</h2>
              <p className="mt-1 text-xs text-zinc-500">
                {t("configuracoesPerfil.dadosContaDescricao", "Informações utilizadas para sua conta Futlance.")}
              </p>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  {t("configuracoesPerfil.nome", "Nome")}
                </label>
                <div className="flex min-h-11 items-center rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-zinc-400">
                  {usuario?.nome || t("configuracoesPerfil.naoInformado", "Não informado")}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  {t("configuracoesPerfil.email", "E-mail")}
                </label>
                <div className="flex min-h-11 items-center rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-zinc-400">
                  <span className="break-all">
                    {usuario?.email || t("configuracoesPerfil.naoInformado", "Não informado")}
                  </span>
                </div>
              </div>

              {time && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    {t("configuracoesPerfil.meuTime", "Meu time")}
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                      {time.escudo ? (
                        <img
                          src={time.escudo}
                          alt={time.nome || t("configuracoesPerfil.time", "Time")}
                          className="h-9 w-9 object-contain"
                        />
                      ) : (
                        <span className="text-xs text-zinc-500">
                          {t("configuracoesPerfil.time", "Time")}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {time.nome || t("configuracoesPerfil.time", "Time")}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {t("configuracoesPerfil.timeSelecionado", "Time selecionado")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <form
            onSubmit={salvarAlteracoes}
            className="rounded-2xl border border-white/10 bg-[#0d131e]"
          >
            <div className="border-b border-white/10 px-5 py-5 sm:px-6">
              <h2 className="font-semibold">
                {t("configuracoesPerfil.preferencias", "Preferências e contato")}
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                {t("configuracoesPerfil.preferenciasDescricao", "Essas informações podem ser usadas para personalizar sua experiência no Futlance.")}
              </p>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <label
                  htmlFor="idioma"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  {t("configuracoesPerfil.idioma", "Idioma")}
                </label>

                <select
                  id="idioma"
                  value={idioma}
                  onChange={(event) => setIdioma(event.target.value)}
                  className={`h-11 w-full rounded-xl border bg-black/20 px-3 text-sm text-white outline-none transition focus:border-orange-500/50 ${
                    camposSalvos.idioma
                      ? "border-green-500 bg-green-500/10"
                      : "border-white/10"
                  }`}
                >
                  {idiomas.map((item) => (
                    <option
                      key={item.codigo}
                      value={item.codigo}
                      className="bg-[#0d131e]"
                    >
                      {t(`configuracoesPerfil.idiomas.${item.chave}`, item.chave)}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-xs leading-5 text-zinc-600">
                  {t("configuracoesPerfil.idiomaDescricao", "O idioma será utilizado nas comunicações do Assistente do Torcedor.")}
                </p>
              </div>

              <div>
                <label
                  htmlFor="whatsapp"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  {t("configuracoesPerfil.whatsapp", "WhatsApp")}
                </label>

                <input
                  id="whatsapp"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={whatsapp}
                  onChange={(event) =>
                    alterarWhatsapp(event.target.value)
                  }
                  placeholder={t("configuracoesPerfil.whatsappPlaceholder", "Ex.: 5511999999999")}
                  maxLength={15}
                  className={`h-11 w-full rounded-xl border bg-black/20 px-3 text-sm text-white outline-none placeholder:text-zinc-700 transition focus:border-orange-500/50 ${
                    camposSalvos.whatsapp
                      ? "border-green-500 bg-green-500/10"
                      : "border-white/10"
                  }`}
                />

                <p className="mt-2 text-xs leading-5 text-zinc-600">
                  {t("configuracoesPerfil.whatsappDescricao", "Informe o número com DDI e DDD. Exemplo: 5511999999999.")}
                </p>
              </div>

              <div className="flex justify-end border-t border-white/10 pt-5">
                <button
                  type="submit"
                  disabled={salvando}
                  className="flex min-h-11 w-full items-center justify-center rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {salvando
                    ? t("configuracoesPerfil.salvando", "Salvando...")
                    : t("configuracoesPerfil.salvar", "Salvar alterações")}
                </button>
              </div>
            </div>
          </form>

          <section className="rounded-2xl border border-red-500/15 bg-[#0d131e]">
            <div className="border-b border-red-500/10 px-5 py-5 sm:px-6">
              <h2 className="font-semibold text-red-400">
                {t("configuracoesPerfil.excluirConta", "Excluir minha conta")}
              </h2>
              <p className="mt-1 text-xs leading-5 text-zinc-500">
                {t("configuracoesPerfil.excluirDescricao", "A exclusão da conta é uma ação permanente e deve ser feita somente quando você tiver certeza.")}
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-zinc-400">
                {t("configuracoesPerfil.excluirAviso", "Ao excluir sua conta, os dados associados ao seu cadastro serão tratados conforme as regras de privacidade e os procedimentos de retenção aplicáveis.")}
              </p>

              <button
                type="button"
                onClick={() => setModalExcluir(true)}
                className="mt-5 rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm font-medium text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10"
              >
                Excluir minha conta
              </button>
            </div>
          </section>
        </div>
      </div>

      {modalExcluir && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d131e] p-5 shadow-2xl sm:p-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v5" />
                <path d="M14 11v5" />
              </svg>
            </div>

            <h2 className="text-xl font-bold">
              {t("configuracoesPerfil.excluirConfirmacao", "Excluir sua conta?")}
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {t("configuracoesPerfil.excluirConfirmacaoDescricao", "Essa ação é permanente. Sua conta e os dados associados serão submetidos ao processo de exclusão do Futlance.")}
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={excluindo}
                onClick={() => setModalExcluir(false)}
                className="min-h-11 rounded-xl border border-white/10 px-5 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.05] disabled:opacity-50"
              >
                {t("configuracoesPerfil.cancelar", "Cancelar")}
              </button>

              <button
                type="button"
                disabled={excluindo}
                onClick={excluirConta}
                className="min-h-11 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {excluindo
                  ? t("configuracoesPerfil.excluindo", "Excluindo...")
                  : t("configuracoesPerfil.confirmarExclusao", "Sim, excluir conta")}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
