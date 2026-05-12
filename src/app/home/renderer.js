"use client"

import { useEffect, useState } from "react"

import WidgetAoVivo from "../componentes/jogos/widget"
import EncerradosWidget from "../componentes/jogos/widgetEncerrados"
import AgendaWidget from "../componentes/agenda/AgendaWidget"
import WidgetsCampeonato from "../componentes/campeonato/widgets"
import Footer from "../componentes/footer/footer"

import { useWebSocket } from "../../hooks/useWebSocket"

export default function HomeRenderer({ widgets = [] }) {

  const [widgetsState, setWidgetsState] = useState(widgets)

  /* ======================================================
     🔌 WEBSOCKET
  ====================================================== */

  useWebSocket((evento) => {

    console.log("📡 evento websocket:", evento)

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
  })

  return (
    <>
      {widgetsState.map((widget, index) => {

        switch (widget.tipo) {

          case "ao-vivo":
            return (
              <WidgetAoVivo
                key={`ao-vivo-${widget.dados.length}`}
                jogos={widget.dados}
              />
            )

          case "agenda":
            return (
              <AgendaWidget
                key={`agenda-${index}`}
                jogos={widget.dados}
              />
            )

          case "encerrados":
            return (
              <EncerradosWidget
                key={`encerrados-${index}`}
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