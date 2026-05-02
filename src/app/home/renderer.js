"use client"

import WidgetAoVivo from "../componentes/jogos/widget"
import EncerradosWidget from "../componentes/jogos/widgetEncerrados"
import AgendaWidget from "../componentes/agenda/AgendaWidget"
import WidgetsCampeonato from "../componentes/campeonato/widgets"
import Footer from "../componentes/footer/footer"

export default function HomeRenderer({ widgets = [] }) {
  return (
    <>
      {/* 🔹 CONTEÚDO DINÂMICO (vem do back) */}
      {widgets.map((widget, index) => {
        switch (widget.tipo) {
          case "ao-vivo":
            return (
              <WidgetAoVivo
                key={index}
                jogos={widget.dados}
              />
            )

          case "agenda":
            return (
              <AgendaWidget
                key={index}
                jogos={widget.dados}
              />
            )

          case "encerrados":
            return (
              <EncerradosWidget
                key={index}
                jogos={widget.dados}
              />
            )

          default:
            return null
        }
      })}

      {/* 🔹 BLOCO FIXO: CAMPEONATOS */}
      <WidgetsCampeonato />

      {/* 🔹 FOOTER SEMPRE PRESENTE */}
      <Footer />
    </>
  )
}