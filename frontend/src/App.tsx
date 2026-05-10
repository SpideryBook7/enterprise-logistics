import { Package, Truck, Warehouse as WarehouseIcon, LayoutDashboard } from 'lucide-react';
import { shipmentService, companyService, warehouseService } from './services/api';
import type { ShipmentCreateInput, CompanyCreateInput, WarehouseCreateInput } from './services/api';
import { ShipmentForm } from './components/ShipmentForm';
import { DashboardStats } from './components/DashboardStats';
import { ShipmentTable } from './components/ShipmentTable';
import { CompanyForm } from './components/CompanyForm';
import { WarehouseForm } from './components/WarehouseForm';
import { useLogisticsData } from './hooks/useLogisticsData';
import { useShipmentWebSocket } from './hooks/useShipmentWebSocket';
import { useToast } from './hooks/useToast';

function App() {
  const { companies, warehouses, shipments, setShipments, loading, refreshData } = useLogisticsData();
  useShipmentWebSocket(setShipments);
  const toast = useToast();

  const handleSubmit = async (data: ShipmentCreateInput) => {
    try {
      await shipmentService.create(data);
      toast.success("Envío creado con éxito");
    } catch (error) {
      console.error("Error al crear:", error);
      toast.error("Error al registrar el envío.");
    }
  };

  const handleUpdateStatus = async (id: number, currentStatus: string) => {
    let nextStatus = '';
    if (currentStatus === 'pending') nextStatus = 'in_transit';
    else if (currentStatus === 'in_transit') nextStatus = 'delivered';
    
    if (nextStatus) {
      try {
        await shipmentService.updateStatus(id, nextStatus);
        toast.info("Estado del envío actualizado");
      } catch (error) {
        console.error("Error al actualizar estado:", error);
        toast.error("Error al actualizar el estado del envío.");
      }
    }
  };

  const handleCreateCompany = async (data: CompanyCreateInput) => {
    try {
      await companyService.create(data);
      toast.success("Empresa registrada correctamente");
      await refreshData();
    } catch (error) {
      toast.error("Error al registrar la empresa");
    }
  };

  const handleCreateWarehouse = async (data: WarehouseCreateInput) => {
    try {
      await warehouseService.create(data);
      toast.success("Almacén registrado correctamente");
      await refreshData();
    } catch (error) {
      toast.error("Error al registrar el almacén");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-slate-50 font-sans text-slate-500 font-bold">Cargando plataforma...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden lg:block">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Truck size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">EnterpriseLog</span>
        </div>
        <nav className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-blue-600/20 text-blue-400 rounded-lg cursor-pointer border border-blue-600/30">
            <LayoutDashboard size={20} /> <span className="font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg cursor-pointer transition">
            <Package size={20} /> <span>Envíos</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg cursor-pointer transition">
            <WarehouseIcon size={20} /> <span>Almacenes</span>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
            <p className="text-slate-500">Gestión logística en tiempo real.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Live System</span>
          </div>
        </header>

        {/* Stats Summary Component */}
        <DashboardStats 
          totalCompanies={companies.length} 
          totalShipments={shipments.length} 
        />

        {/* Management Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <CompanyForm onSubmit={handleCreateCompany} />
          <WarehouseForm companies={companies} onSubmit={handleCreateWarehouse} />
        </div>

        {/* Shipment Form Component */}
        <ShipmentForm 
          companies={companies}
          warehouses={warehouses}
          onSubmit={handleSubmit}
        />

        {/* Dynamic Shipments Table Component */}
        <ShipmentTable 
          shipments={shipments}
          companies={companies}
          onUpdateStatus={handleUpdateStatus}
        />
      </main>
    </div>
  );
}

export default App;