import Background from "@/app/home/style"
import Footer from "@/app/componentes/footer/footer"
import { HeaderTime } from "@/app/componentes/cabeçalho/header"
import TimeClient from "./client"
import { api } from '@/app/servidor/api'

export async function generateMetadata(
  { params }
) {
  const { slug } = await params

  try {
    const response = await api.get(`/api/times/${slug}`)
    const time = response.data

    return {
      title:
        `${time.nomePopular} - Copa do Mundo | Futlance`,

      description:
        `Veja elenco, técnico, próximos jogos e estatísticas da seleção ${time.nomePopular}.`,

      openGraph: {
        title:
          `${time.nomePopular} - Copa do Mundo`,
        description:
          `Acompanhe tudo sobre ${time.nomePopular}.`,
        images: [
          {
            url: time.escudo
          }
        ]
      }
    }
  } catch (error) {
    return {
      title: "Seleção não encontrada"
    }
  }
}

export default async function TimePage(
  { params }
) {
  const { slug } = await params

  return (
    <Background>
      <HeaderTime />
      <TimeClient slug={slug} />
      <Footer />
    </Background>
  )
}