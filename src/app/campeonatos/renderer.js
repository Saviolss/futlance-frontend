"use client"

import { useEffect, useState } from "react"

import RenderTabela from "../componentes/render/RenderTabela"
import RenderGrupos from "../componentes/render/RenderGrupos"

import AgendaWidget from "../componentes/agenda/AgendaWidget"
import AoVivoWidget from "@/app/componentes/jogos/widget"
import EncerradosWidget from "@/app/componentes/jogos/widgetEncerrados"
import ArtilheirosWidget from "../componentes/artilheiro/Widgets"
import { normalizeJogosData } from "../componentes/jogos/normalizeJogos"

import {
  useEventoWebSocket
} from "../../context/WebSocketProvider"

export default function CampeonatoRenderer({
  fase,
  dados,
  widgets = []
}) {

  const evento = useEventoWebSocket()

  const [widgetsState, setWidgetsState] =
    useState(widgets)

  useEffect(() => {
    setWidgetsState(widgets)
  }, [widgets])

  /* ============================
     WEBSOCKET
  ============================ */

  useEffect(() => {

    if (!evento) return

    /* 🔴 AO VIVO */

    if (evento.tipo === "ao-vivo") {

      setWidgetsState((anterior) => {

        const resto = anterior.filter(
          w => w.tipo !== "ao-vivo"
        )

        const dadosNormalizados = normalizeJogosData(evento.dados || [])

        if (!dadosNormalizados.length) {
          return resto
        }

        return [
          {
            tipo: "ao-vivo",
            dados: dadosNormalizados
          },
          ...resto
        ]
      })
    }

    /* 🏁 ENCERRADOS */

    if (evento.tipo === "finalizado") {

      setWidgetsState((anterior) => {

        const resto = anterior.filter(
          w => w.tipo !== "finalizado"
        )

        const dadosNormalizados = normalizeJogosData(evento.dados || [])

        return [
          ...resto,
          {
            tipo: "finalizado",
            dados: dadosNormalizados
          }
        ]
      })
    }

  }, [evento])

  return (
    <>
      {fase === "tabela" &&
        <RenderTabela dados={dados} />
      }

      {fase === "grupos" &&
        <RenderGrupos dados={dados} />
      }

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
                key="finalizado"
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