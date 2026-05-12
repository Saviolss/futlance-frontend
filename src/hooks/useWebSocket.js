import { useEffect, useRef } from "react"
import { wsUrl } from "@/app/servidor/api"

export function useWebSocket(onMessage) {

  const ws = useRef(null)
  const retry = useRef(null)
  const callback = useRef(onMessage)

  // mantém callback atualizado
  callback.current = onMessage

  useEffect(() => {

    function conectar() {

      ws.current = new WebSocket(wsUrl)

      ws.current.onopen = () => {
        console.log("✅ WebSocket conectado")
      }

      ws.current.onmessage = (event) => {

        try {

          const data = JSON.parse(event.data)

          console.log("📡 Evento recebido:", data)

          callback.current(data)

        } catch (e) {
          console.error("❌ erro websocket:", e)
        }
      }

      ws.current.onclose = () => {

        console.log("🔌 WebSocket desconectado")

        retry.current = setTimeout(() => {
          conectar()
        }, 3000)
      }

      ws.current.onerror = () => {
        console.log("⚠️ websocket reconectando...")
      }
    }

    conectar()

    return () => {

      clearTimeout(retry.current)

      if (ws.current) {
        ws.current.close()
      }
    }

  }, []) // 🔥 MUITO IMPORTANTE
}