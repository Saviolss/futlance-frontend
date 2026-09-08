"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { api } from "@/app/servidor/api"

export default function ModalEscolherTime({
  aberto,
  onFechar,
  onSelecionar,
  onSelecionarTime
}) {
  const { t } = useTranslation()
  const [times, setTimes] = useState([])
  const [busca, setBusca] = useState("")
  const [timeSelecionado, setTimeSelecionado] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")

  useEffect(() => {
    if (!aberto) return
    carregarTimes()
  }, [aberto])

  async function carregarTimes() {
    try {
      setCarregando(true)
      setErro("")
      const resposta = await api.get("/api/times")
      setTimes(Array.isArray(resposta.data) ? resposta.data : [])
    } catch (erro) {
      console.error("Erro ao carregar times:", erro)
      setErro(t("torcedor.erroCarregarTimes", "Não foi possível carregar os times."))
    } finally {
      setCarregando(false)
    }
  }

  function selecionarTime(time) {
    setTimeSelecionado(time)
  }

  function confirmar() {
    if (!timeSelecionado) return

    const selecionar = typeof onSelecionar === "function"
      ? onSelecionar
      : typeof onSelecionarTime === "function"
        ? onSelecionarTime
        : null

    if (selecionar) {
      selecionar(timeSelecionado)
    }
  }

  if (!aberto) return null

  const timesFiltrados = times.filter((time) => {
    const nome = String(time.nome || "").toLowerCase()
    return nome.includes(busca.toLowerCase())
  })

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1a] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-white">
              {t("torcedor.escolherTime", "Escolha seu time")}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {t("torcedor.escolherTimeDescricao", "Escolha o time que você acompanha.")}
            </p>
          </div>

          <button
            type="button"
            onClick={onFechar}
            className="text-2xl text-zinc-400 transition hover:text-white"
            aria-label={t("comum.fechar", "Fechar")}
          >
            ×
          </button>
        </div>

        <div className="px-6 pt-5">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder={t("torcedor.pesquisarTime", "Pesquisar time")}
            className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-orange-500"
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {carregando && (
            <div className="py-10 text-center text-sm text-zinc-400">
              {t("comum.carregando", "Carregando...")}
            </div>
          )}

          {!carregando && erro && (
            <div className="py-10 text-center text-sm text-red-400">
              {erro}
            </div>
          )}

          {!carregando && !erro && timesFiltrados.length === 0 && (
            <div className="py-10 text-center text-sm text-zinc-400">
              {t("torcedor.nenhumTimeEncontrado", "Nenhum time encontrado.")}
            </div>
          )}

          {!carregando && !erro && timesFiltrados.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {timesFiltrados.map((time) => {
                const selecionado = timeSelecionado?.timeId === time.timeId

                return (
                  <button
                    key={time.timeId}
                    type="button"
                    onClick={() => selecionarTime(time)}
                    className={`flex min-h-[120px] flex-col items-center justify-center rounded-xl border p-4 transition ${selecionado
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-white/10 bg-[#111827] hover:border-orange-500/50 hover:bg-white/5"
                      }`}
                  >
                    {time.escudo ? (
                      <img
                        src={time.escudo}
                        alt={time.nome}
                        className="mb-3 h-12 w-12 object-contain"
                      />
                    ) : (
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl">
                        ⚽
                      </div>
                    )}

                    <span
                      className={`text-center text-sm font-medium ${selecionado
                          ? "text-orange-400"
                          : "text-white"
                        }`}
                    >
                      {time.nome}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-6 py-5">
          <button
            type="button"
            onClick={confirmar}
            disabled={!timeSelecionado}
            className="w-full rounded-xl bg-orange-500 px-5 py-3 font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("comum.continuar", "Continuar")}
          </button>
        </div>
      </div>
    </div>
  )
}