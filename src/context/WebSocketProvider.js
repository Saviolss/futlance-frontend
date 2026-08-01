"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"

import { wsUrl } from "@/app/servidor/api"

const WebSocketContext = createContext(null)

export function WebSocketProvider({ children }) {

  const [evento, setEvento] = useState(null)

  const ws = useRef(null)
  const retry = useRef(null)

  useEffect(() => {

    let fechado = false

    function conectar() {

      if (
        ws.current &&
        (
          ws.current.readyState === WebSocket.OPEN ||
          ws.current.readyState === WebSocket.CONNECTING
        )
      ) {
        return
      }

      console.log("< developer : www.saviodev.com />")

      ws.current = new WebSocket(wsUrl)

      ws.current.onopen = () => {
      };

      ws.current.onmessage = (event) => {

        const data = JSON.parse(event.data);

        setEvento(data);
      };

      ws.current.onerror = (e) => {
      };

      ws.current.onclose = (e) => {
      };

      ws.current.onmessage = (event) => {

        try {

          const data = JSON.parse(event.data)

          setEvento(data)

        } catch (e) {

          console.error(
            "❌ erro websocket:",
            e
          )
        }
      }

      ws.current.onerror = () => {
        console.log("⚠️ erro websocket")
      }

      ws.current.onclose = (event) => {

        console.log(
          `🔌 WebSocket desconectado (${event.code})`
        )

        ws.current = null

        if (fechado) return

        retry.current = setTimeout(() => {
          conectar()
        }, 3000)
      }
    }

    conectar()

    return () => {

      fechado = true

      clearTimeout(retry.current)

      if (ws.current) {
        ws.current.close()
      }
    }

  }, [])

  return (
    <WebSocketContext.Provider value={evento}>
      {children}
    </WebSocketContext.Provider>
  )
}

export function useEventoWebSocket() {
  return useContext(WebSocketContext)
}