"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { api } from "@/app/servidor/api"

export default function TorcedorPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [carregando, setCarregando] = useState(true)
  const [usuario, setUsuario] = useState(null)
  const [time, setTime] = useState(null)

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      setCarregando(true)
      const resposta = await api.get("/auth/sessao")

      if (!resposta.data?.sucesso || !resposta.data?.autenticado || !resposta.data?.usuario) {
        router.replace("/")
        return
      }

      const usuarioAtual = resposta.data.usuario
      setUsuario(usuarioAtual)

      const chave = `futlance_time_torcedor_${ usuarioAtual.id } `
      const timeSalvo = localStorage.getItem(chave)

      if (timeSalvo) {
        try {
          const dadosTime = JSON.parse(timeSalvo)
          if (dadosTime?.slug && dadosTime?.nome) {
            setTime(dadosTime)
          }
        } catch {
          localStorage.removeItem(chave)
        }
      }
    } catch (erro) {
      if (erro?.response?.status !== 401) {
        console.error("Erro ao carregar área do torcedor:", erro)
      }
      router.replace("/")
    } finally {
      setCarregando(false)
    }
  }

  async function sair() {
    try {
      await api.post("/auth/logout")
    } catch (erro) {
      console.error("Erro ao sair:", erro)
    } finally {
      router.replace("/")
    }
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-[#070b12] px-4 py-10 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-orange-500" />
            <p className="text-sm text-zinc-400">
              {t("configuracoes.carregando", "Carregando sua área...")}
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 pb-28 sm:px-6 sm:py-8 md:px-8 md:pb-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
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
            <span>{t("configuracoes.voltar", "Voltar")}</span>
          </button>

          <button
            type="button"
            onClick={sair}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span>{t("configuracoes.sair", "Sair")}</span>
          </button>
        </div>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0d1420] to-[#090d15]">
          <div className="border-b border-white/10 p-5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
                {time?.escudo ? (
                  <img
                    src={time.escudo}
                    alt={time.nomePopular || time.nome || t("configuracoes.time", "Time")}
                    className="h-14 w-14 object-contain"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
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

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-orange-400">
                  {t("configuracoes.areaTorcedor", "Área do torcedor")}
                </p>
                <h2 className="mt-1 text-sm md:text-2xl text-zinc-400">
                  {t("configuracoes.saudacao", {
                    nome: usuario?.nome || t("configuracoes.torcedor", "Torcedor")
                  })}
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6 lg:grid-cols-3">

            <MenuCard
              titulo={t("configuracoes.meuPerfil", "Meu perfil")}
              descricao={t("configuracoes.meuPerfilDescricao", "Gerencie seus dados e preferências.")}
              icone={
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
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              }
              onClick={() => router.push("/configuracoes/perfil")}
            />

            <MenuCard
              titulo={t("configuracoes.assistente", "Assistente do Torcedor")}
              descricao={t("configuracoes.assistenteDescricao", "Receba notificações sobre seu time.")}
              destaque
              icone={
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
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                  <path d="M10 21h4" />
                </svg>
              }
              onClick={() => router.push("/configuracoes/assistente")}
            />

            <MenuCard
              titulo={t("configuracoes.assinaturas", "Minhas assinaturas")}
              descricao={t("configuracoes.assinaturasDescricao", "Consulte seu plano e pagamentos.")}
              icone={
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
                  <rect width="18" height="14" x="3" y="5" rx="2" />
                  <path d="M3 10h18" />
                  <path d="M7 15h2" />
                </svg>
              }
              onClick={() => router.push("/configuracoes/assinatura")}
            />

          </div>
        </section>
      </div>
    </main>
  )
}

function MenuCard({ titulo, descricao, icone, onClick, destaque = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min - h - [130px] w - full flex - col justify - between rounded - xl border p - 4 text - left transition sm: p - 5 ${
  destaque
    ? "border-orange-500/25 bg-orange-500/[0.06] hover:border-orange-500/50 hover:bg-orange-500/[0.10]"
    : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
} `}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h - 11 w - 11 items - center justify - center rounded - xl ${
  destaque
    ? "bg-orange-500/15 text-orange-400"
    : "bg-white/[0.06] text-zinc-300"
} `}
        >
          {icone}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-1 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-zinc-300"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold text-white">{titulo}</h2>
        <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
          {descricao}
        </p>
      </div>
    </button>
  )
}
