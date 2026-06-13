import HomeClient from "./client"
import { api } from "@/app/servidor/api"
export const dynamic = "force-dynamic"
export default async function HomePage() {
  const res = await api.get("/home")
  const data = res.data

  return <HomeClient widgets={res.data.widgets} />
}