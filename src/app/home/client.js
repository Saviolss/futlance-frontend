"use client"

import HomeRenderer from "./renderer"
import AnuncioHeaderLauri from "../componentes/anuncio/anuncioHeader"

export default function HomeClient({ widgets = [] }) {

  return (
    <main>
      <AnuncioHeaderLauri />
      <HomeRenderer widgets={widgets} />
    </main>
  )
}