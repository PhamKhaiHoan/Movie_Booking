import axios from "axios";

const CYBERSOFT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NiIsIkhldEhhblN0cmluZyI6IjIyLzA0LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NjgxNjAwMDAwMCIsIm5iZiI6MTc0OTkyMDQwMCwiZXhwIjoxNzc2OTYzNjAwfQ.4PAmLYuTxEprwX1py09tjOLNQcwTPq9TCwLUXHwfwSY";

export const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    "TokenCybersoft": CYBERSOFT_TOKEN, 
    "Content-Type": "application/json",
  },
});

// GỬI TOKEN ĐĂNG NHẬP ĐI
api.interceptors.request.use((config) => {
  // 1. Lấy token từ LocalStorage
  const accessToken = localStorage.getItem("accessToken"); 
  
  // 2. Nếu có token thì gán vào Header "Authorization"
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return config;
});