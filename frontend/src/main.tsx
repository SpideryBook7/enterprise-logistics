import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLayout from './App.tsx'
import { ToastProvider } from './hooks/useToast'
import { ToastContainer } from './components/ToastContainer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { ShipmentsPage } from './pages/ShipmentsPage'
import { ManagementPage } from './pages/ManagementPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="shipments" element={<ShipmentsPage />} />
            <Route path="management" element={<ManagementPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
