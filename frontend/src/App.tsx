import { useEffect, useState } from 'react'
import { Package, Truck, Warehouse, Building2, LayoutDashboard } from 'lucide-react'
import { companyService } from './services/api'

function App() {
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    companyService.getAll().then(setCompanies).catch(console.error);
  }, []);

  // 1. Agregas el estado para los envíos
  const [shipments, setShipments] = useState<any[]>([]);

  // 2. Colocas el useEffect de WebSockets
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/shipments');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Actualiza la lista de envíos agregando el nuevo al inicio
      setShipments((prev) => [data, ...prev]);
    };

    return () => socket.close(); 
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <Truck className="text-blue-400" size={32} />
          <span className="text-xl font-bold tracking-tight">EnterpriseLog</span>
        </div>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-lg cursor-pointer">
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:text-white cursor-pointer transition">
            <Package size={20} /> <span>Shipments</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:text-white cursor-pointer transition">
            <Warehouse size={20} /> <span>Warehouses</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-10">
          <h1 className="text-2xl font-bold">Resumen Logístico</h1>
          <p className="text-slate-500">Bienvenido de nuevo, Cristian.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Building2 size={24}/></div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">Empresas Activas</h3>
            <p className="text-2xl font-bold">{companies.length}</p>
          </div>
          {/* Aquí podrías añadir más tarjetas para Envíos y Vehículos */}
        </div>

        {/* Data Table */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold">Empresas Registradas</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              + Nueva Empresa
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Nombre de Empresa</th>
                <th className="px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companies.map(company => (
                <tr key={company.company_id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-mono text-sm">#{company.company_id}</td>
                  <td className="px-6 py-4 font-medium">{company.company_name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Activo</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}

export default App