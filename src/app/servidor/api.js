import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 50000,
})
// export const wsUrl = 'ws://localhost:3333/ws'
export const wsUrl = 'wss://api.futlance.com/ws'