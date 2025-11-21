import axios from "axios";
import { TOKEN_CYBERSOFT } from "@/constants/api"; // Import từ constants

export const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT, // Dùng biến môi trường
  },
});

// GỬI TOKEN ĐĂNG NHẬP ĐI
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
