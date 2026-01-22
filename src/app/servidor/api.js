import axios from "axios";

export const api = axios.get({
  baseURL: "http://localhost:3333",
  timeOut: 5000
})


