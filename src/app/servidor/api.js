import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.futlance.com",
  timeout: 10000,
});
