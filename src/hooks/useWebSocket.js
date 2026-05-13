import { useEffect, useRef } from "react"
import { wsUrl } from "@/app/servidor/api"

export function useWebSocket(onMessage) {

  const ws = useRef(null)
  const retry = useRef(null)

  // mantém callback atualizado sem recriar websocket
  const callback = useRef(onMessage)
  callback.current = onMessage

  // evita reconnect infinito ao desmontar
  const fechadoManualmente = useRef(false)

  useEffect(() => {

    function conectar() {

      // evita múltiplas conexões
      if (
        ws.current &&
        (
          ws.current.readyState === WebSocket.OPEN ||
          ws.current.readyState === WebSocket.CONNECTING
        )
      ) {
        return
      }

      console.log("🔄 Conectando websocket...")

      ws.current = new WebSocket(wsUrl)

      /* ============================
         CONECTADO
      ============================ */

      ws.current.onopen = () => {
        console.log("✅ WebSocket conectado")
      }

      /* ============================
         EVENTOS
      ============================ */

      ws.current.onmessage = (event) => {

        try {

          const data = JSON.parse(event.data)

          console.log("📡 Evento recebido:", data)

          callback.current?.(data)

        } catch (e) {

          console.error(
            "❌ erro ao processar websocket:",
            e
          )
        }
      }

      /* ============================
         ERRO
      ============================ */

      ws.current.onerror = (e) => {

        console.log("⚠️ erro websocket")

        // fecha conexão inválida
        ws.current?.close()
      }

      /* ============================
         DESCONECTOU
      ============================ */

      ws.current.onclose = (event) => {

        console.log(
          `🔌 WebSocket desconectado (${event.code})`
        )

        ws.current = null

        // evita reconnect após desmontar componente
        if (fechadoManualmente.current) {
          return
        }

        // tenta reconectar
        retry.current = setTimeout(() => {
          conectar()
        }, 3000)
      }
    }

    conectar()

    /* ============================
       CLEANUP
    ============================ */

    return () => {

      fechadoManualmente.current = true

      clearTimeout(retry.current)

      if (ws.current) {
        ws.current.close()
      }
    }

  }, [])
}