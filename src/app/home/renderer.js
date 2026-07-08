"use client"

import { useEffect, useState } from "react"

import WidgetAoVivo from "../componentes/jogos/widget"
import EncerradosWidget from "../componentes/jogos/widgetEncerrados"
import AgendaWidgetHome from "../componentes/agenda/AgendaWidgetHome"
import WidgetsCampeonato from "../componentes/campeonato/widgets"
import Footer from "../componentes/footer/footer"
import { normalizeJogosData } from "../componentes/jogos/normalizeJogos"

import {
  useEventoWebSocket
} from "../../context/WebSocketProvider"

export default function HomeRenderer({
  widgets = []
}) {

  const evento = useEventoWebSocket()

  const [widgetsState, setWidgetsState] =
    useState(widgets)

  /* ============================
     DEBUG
  ============================ */

  useEffect(() => {


  }, [widgetsState])

  /* ============================
     WEBSOCKET
  ============================ */

  useEffect(() => {

    if (!evento) return

    console.log(
      "📡 evento websocket:",
      evento
    )

    /* 🔴 AO VIVO */

    if (evento.tipo === "ao-vivo") {

      console.log(
        "🔴 dados ao vivo:",
        evento.dados
      )

      setWidgetsState((anterior) => {

        const resto = anterior.filter(
          w => w.tipo !== "ao-vivo"
        )

        const dadosNormalizados = normalizeJogosData(evento.dados || [])

        const novoEstado = [
          {
            tipo: "ao-vivo",
            dados: dadosNormalizados
          },
          ...resto
        ]

        console.log(
          "✅ novo widgetsState:",
          novoEstado
        )

        return novoEstado
      })
    }

    /* 🏁 ENCERRADOS */

    if (evento.tipo === "finalizado") {

      setWidgetsState((anterior) => {

        const resto = anterior.filter(
          w => w.tipo !== "finalizado"
        )

        const dadosNormalizados = normalizeJogosData(evento.dados || [])

        const novoEstado = [
          ...resto,
          {
            tipo: "finalizado",
            dados: dadosNormalizados
          }
        ]

        console.log(
          "🏁 encerrados atualizados:",
          novoEstado
        )

        return novoEstado
      })
    }

  }, [evento])

  return (
    <>
      {widgetsState.map((widget) => {

        switch (widget.tipo) {

          case "ao-vivo":
            return (
              <WidgetAoVivo
                key="ao-vivo"
                jogos={widget.dados || []}
              />
            )

            case "agenda":
            return (
              <AgendaWidgetHome
                key="agenda"
                jogos={widget.dados || []}
              />
            )

          case "encerrados":
            return (
              <EncerradosWidget
                key="encerrados"
                jogos={widget.dados || []}
              />
            )

          default:
            return null
        }
      })}

      <WidgetsCampeonato />

      <Footer />
    </>
  )
}