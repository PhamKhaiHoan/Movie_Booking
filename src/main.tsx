import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // Giữ đuôi .tsx cho chắc ăn
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store/config' // Nếu báo lỗi dòng này, ông check lại file store bên nhánh client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Tạo client cho React Query
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)