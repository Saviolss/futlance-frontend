import axios from "axios";

// const baseURL = "https://api.futlance.com"
const baseURL = "http://localhost:3333"
export const api = axios.create({
  baseURL,
  timeout: 10000,
})
export const wsUrl = "ws://localhost:3333/ws"
// export const wsUrl = "wss://api.futlance.com/ws"
