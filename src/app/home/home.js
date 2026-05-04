import HomeClient from "./client"
import { api } from "@/app/servidor/api"

export default async function HomePage() {
  const res = await api.get("/home")
  const data = res.data

  return <HomeClient widgets={res.data.widgets} />
}