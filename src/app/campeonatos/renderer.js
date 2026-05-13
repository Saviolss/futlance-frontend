"use client"

import { useEffect, useState } from "react"

import RenderTabela from "../componentes/render/RenderTabela"
import RenderGrupos from "../componentes/render/RenderGrupos"

import AgendaWidget from "../componentes/agenda/AgendaWidget"
import AoVivoWidget from "@/app/componentes/jogos/widget"
import EncerradosWidget from "@/app/componentes/jogos/widgetEncerrados"
import ArtilheirosWidget from "../componentes/artilheiro/Widgets"

import { useWebSocket } from "../../hooks/useWebSocket"

export default function CampeonatoRenderer({
  fase,
  dados,
  widgets = []
}) {

  const [widgetsState, setWidgetsState] = useState(widgets)
  const [mounted, setMounted] = useState(false)

  /* ======================================================
     HIDRATAÇÃO
  ====================================================== */

  useEffect(() => {
    setMounted(true)
    setWidgetsState(widgets)
  }, [widgets])

  /* ======================================================
     WEBSOCKET
  ====================================================== */

  useWebSocket((evento) => {

    console.log("📡 campeonato websocket:", evento)

    /* ============================
       🔴 AO VIVO
    ============================ */

    if (evento.tipo === "ao-vivo") {

      setWidgetsState((anterior) => {

        const resto = anterior.filter(
          w => w.tipo !== "ao-vivo"
        )

        if (!evento.dados?.length) {
          return resto
        }

        return [
          {
            tipo: "ao-vivo",
            dados: evento.dados
          },
          ...resto
        ]
      })
    }

    /* ============================
       🏁 ENCERRADOS
    ============================ */

    if (evento.tipo === "encerrados") {

      setWidgetsState((anterior) => {

        const resto = anterior.filter(
          w => w.tipo !== "encerrados"
        )

        return [
          ...resto,
          {
            tipo: "encerrados",
            dados: evento.dados
          }
        ]
      })
    }
  })

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* FASE DO CAMPEONATO */}

      {fase === "tabela" && (
        <RenderTabela dados={dados} />
      )}

      {fase === "grupos" && (
        <RenderGrupos dados={dados} />
      )}

      {fase === "mata-mata" && null}

      {/* WIDGETS */}

      {widgetsState.map((widget) => {

        switch (widget.tipo) {

          case "ao-vivo":
            return (
              <AoVivoWidget
                key="ao-vivo"
                jogos={widget.dados}
              />
            )

          case "agenda":
            return (
              <AgendaWidget
                key="agenda"
                jogos={widget.dados}
              />
            )

          case "encerrados":
            return (
              <EncerradosWidget
                key="encerrados"
                jogos={widget.dados}
              />
            )

          case "artilheiros":
            return (
              <ArtilheirosWidget
                key="artilheiros"
                dados={widget.dados}
                titulo={widget.titulo}
              />
            )

          default:
            return null
        }
      })}
    </>
  )
}