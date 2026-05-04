"use client"

import RenderTabela from "../componentes/render/RenderTabela"
import RenderGrupos from "../componentes/render/RenderGrupos"

import AgendaWidget from "../componentes/agenda/AgendaWidget"
import AoVivoWidget from "@/app/componentes/jogos/widget"
import EncerradosWidget from "@/app/componentes/jogos/widgetEncerrados"
import ArtilheirosWidget from "../componentes/artilheiro/Widgets"

export default function CampeonatoRenderer({ fase, dados, widgets = [] }) {

  return (
    <>
      {/* FASE DO CAMPEONATO */}

      {fase === "tabela" && <RenderTabela dados={dados} />}
      {fase === "grupos" && <RenderGrupos dados={dados} />}
      {fase === "mata-mata" && null}

      {/* WIDGETS */}

      {widgets.map((widget, index) => {
        switch (widget.tipo) {

          case "ao-vivo":
            return (
              <AoVivoWidget
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

          case "artilheiros":
            return (
              <ArtilheirosWidget
                key={index}
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