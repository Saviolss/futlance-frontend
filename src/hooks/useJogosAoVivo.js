'use client'
import { useEffect, useState } from "react"
import axios from "axios"

export function useJogosAoVivo(endpoint) {
  const [jogos, setJogos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await axios.get(endpoint)
        setJogos(data)
      } catch (e) {
        console.error("Erro ao buscar jogos ao vivo", e)
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [endpoint])

  return { jogos, setJogos, loading }
}
