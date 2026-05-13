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
  const [mounted, setMounted] = useState(false)

  /* ======================================================
     HIDRATAÇÃO SEGURA
  ====================================================== */

  useEffect(() => {
    setMounted(true)
    setWidgetsState(widgets)
  }, [widgets])

  /* ======================================================
     WEBSOCKET
  ====================================================== */

  useWebSocket((evento) => {

    console.log("📡 evento websocket:", evento)

    /* ============================
       🔴 AO VIVO
    ============================ */

    if (evento.tipo === "ao-vivo") {

      setWidgetsState((anterior) => {

        const resto = anterior.filter(
          w => w.tipo !== "ao-vivo"
        )

        // sem jogos
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

  // 🔥 evita hydration mismatch
  if (!mounted) {
    return null
  }

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

          default:
            return null
        }
      })}

      <WidgetsCampeonato />

      <Footer />
    </>
  )
}