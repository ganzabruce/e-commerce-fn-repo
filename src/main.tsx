import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AdminContextProvider } from './context/adminContext.tsx'
import { UserContextProvider } from './context/userContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <AdminContextProvider>
    <UserContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
    </UserContextProvider>
  </AdminContextProvider>
)
