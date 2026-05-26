import NoticiasClient from "./client"
import { HeaderNoticias } from "../componentes/cabeçalho/header"
import Background from "@/app/home/style"
import Footer from "@/app/componentes/footer/footer"
import { api } from "@/app/servidor/api"

export const dynamic = "force-dynamic" 

async function carregarNoticias() {

  try {

    const response = await api.get("/home/noticias")

    return response.data.widgets || []

  } catch (e) {

    console.error("Erro notícias:", e)

    return []
  }
}

export default async function Page() {

  const widgets = await carregarNoticias()


  return (
    <Background>

      <HeaderNoticias />

      <NoticiasClient widgets={widgets} />

      <Footer />

    </Background>
  )
}