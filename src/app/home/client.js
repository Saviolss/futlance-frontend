"use client"

import HomeRenderer from "./renderer"
import SessaoUsuario from "../componentes/autenticacao/SessaoUsuario"
export default function HomeClient({ widgets = [] }) {

  return (
    <main>
      <SessaoUsuario />
      <HomeRenderer widgets={widgets} />
    </main>
  )
}