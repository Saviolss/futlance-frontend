"use client"

import { useEffect, useState } from "react"
import { api } from "@/app/servidor/api"
import CampeonatoRenderer from "./renderer"

export default function CampeonatoClient({ endpoint }) {
  const [fase, setFase] = useState(null)
  const [dados, setDados] = useState([])
  const [widgets, setWidgets] = useState([])

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get(endpoint)

        const data = res.data


        setFase(data.fase)
        setDados(data.dados)
        setWidgets(data.widgets || [])

      } catch (err) {
      }
    }

    carregar()
  }, [endpoint])

  return (
    <CampeonatoRenderer
      fase={fase}
      dados={dados}
      widgets={widgets}
    />
  )
}