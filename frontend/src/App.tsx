import { Package, Truck, Warehouse as WarehouseIcon, LayoutDashboard } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useLogisticsData } from './hooks/useLogisticsData';
import { SkeletonLoader } from './components/SkeletonLoader';

function AppLayout() {
  const { loading } = useLogisticsData();

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <aside className="w-64 bg-slate-900 hidden lg:block border-r border-slate-800"></aside>
        <main className="flex-1 bg-slate-50"><SkeletonLoader /></main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden lg:block shadow-xl z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/50">
            <Truck size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">EnterpriseLog</span>
        </div>
        <nav className="space-y-2">
          <NavLink 
            to="/" 
            className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${isActive ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20} /> <span className="font-medium">Dashboard</span>
          </NavLink>
          <NavLink 
            to="/shipments" 
            className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${isActive ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Package size={20} /> <span className="font-medium">Envíos</span>
          </NavLink>
          <NavLink 
            to="/management" 
            className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${isActive ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <WarehouseIcon size={20} /> <span className="font-medium">Entidades</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;