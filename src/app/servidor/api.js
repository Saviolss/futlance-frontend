import axios from "axios";
const baseURL = "https://api.futlance.com"
export const api = axios.create({
  baseURL,
  timeout: 10000,
})
export const wsUrl = "wss://api.futlance.com/ws"