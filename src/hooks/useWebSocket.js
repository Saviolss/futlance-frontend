import { useEffect, useRef } from "react"
import { api } from "@/app/servidor/api"

export function useWebSocket(onMessage) {
  const ws = useRef(null)
  const retry = useRef(null)

  useEffect(() => {
    function conectar() {
      ws.current = new WebSocket(api.wsUrl)

      ws.current.onopen = () => {
        console.log("✅ WebSocket conectado")
      }

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          onMessage(data)
        } catch (erro) {
          console.error("❌ Erro ao parsear WebSocket:", erro)
        }
      }

      ws.current.onerror = (erro) => {
        console.error("❌ WebSocket erro:", erro)
      }

      ws.current.onclose = () => {
        console.log("⚠️ WebSocket fechado. Reconectando...")
        retry.current = setTimeout(conectar, 3000)
      }
    }

    conectar()

    return () => {
      clearTimeout(retry.current)
      ws.current?.close()
    }
  }, [onMessage])
}
