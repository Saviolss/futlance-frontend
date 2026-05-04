import { useEffect, useRef } from "react"
import { api } from "@/app/servidor/api"

export function useWebSocket(onMessage) {
  const ws = useRef(null)
  const retry = useRef(null)

  useEffect(() => {
    function conectar() {
      ws.current = new WebSocket(api.wsUrl)

      ws.current.onopen = () => {
      }

      ws.current.onopen = () => {
        console.log("✅ WebSocket conectado")
      }

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log("📡 Evento recebido:", data)
        onMessage(data)
      }

      ws.current.onclose = () => {
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
