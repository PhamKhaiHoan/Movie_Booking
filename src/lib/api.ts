import axios from "axios"
import { API_URL, TOKEN_CYBERSOFT, STORAGEKEYS } from "@/constants"

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(STORAGEKEYS.ACCESSTOKEN)

  config.headers.TokenCybersoft = TOKEN_CYBERSOFT

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
