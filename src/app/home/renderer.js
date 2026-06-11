"use client"

import { useEffect, useState } from "react"

import WidgetAoVivo from "../componentes/jogos/widget"
import EncerradosWidget from "../componentes/jogos/widgetEncerrados"
import AgendaWidgetHome from "../componentes/agenda/AgendaWidgetHome"
import WidgetsCampeonato from "../componentes/campeonato/widgets"
import Footer from "../componentes/footer/footer"

import {
  useEventoWebSocket
} from "../../context/WebSocketProvider"

export default function HomeRenderer({
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

    console.log("📡 evento websocket:", evento)

    /* 🔴 AO VIVO */

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

    /* 🏁 ENCERRADOS */

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

  }, [evento])

  return (
    <>
      {widgetsState.map((widget) => {

        switch (widget.tipo) {

          case "ao-vivo":
            return (
              <WidgetAoVivo
                key="ao-vivo"
                jogos={widget.dados}
              />
            )

          case "agenda":
            return (
              <AgendaWidgetHome
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

          default:
            return null
        }
      })}

      <WidgetsCampeonato />

      <Footer />
    </>
  )
}