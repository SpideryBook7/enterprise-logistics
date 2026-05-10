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
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="w-64 bg-slate-950 text-slate-300 p-6 hidden lg:flex flex-col border-r border-slate-800 z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)]">
            <Truck size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">EnterpriseLog</span>
        </div>
        <nav className="space-y-1.5 flex-1">
          <NavLink 
            to="/" 
            className={({isActive}) => `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'bg-indigo-500/10 text-indigo-400' : 'hover:bg-slate-900 hover:text-slate-100'}`}
          >
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/shipments" 
            className={({isActive}) => `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'bg-indigo-500/10 text-indigo-400' : 'hover:bg-slate-900 hover:text-slate-100'}`}
          >
            <Package size={18} /> <span>Envíos</span>
          </NavLink>
          <NavLink 
            to="/management" 
            className={({isActive}) => `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'bg-indigo-500/10 text-indigo-400' : 'hover:bg-slate-900 hover:text-slate-100'}`}
          >
            <WarehouseIcon size={18} /> <span>Entidades</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      {/* pb-24 ensures content isn't hidden behind the mobile bottom nav */}
      <main className="flex-1 p-4 pb-24 lg:pb-4 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-around p-2 pb-safe shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] z-50">
        <NavLink 
          to="/" 
          className={({isActive}) => `flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all duration-200 ${isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <LayoutDashboard size={22} />
          <span className="text-[10px] font-semibold">Dashboard</span>
        </NavLink>
        <NavLink 
          to="/shipments" 
          className={({isActive}) => `flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all duration-200 ${isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Package size={22} />
          <span className="text-[10px] font-semibold">Envíos</span>
        </NavLink>
        <NavLink 
          to="/management" 
          className={({isActive}) => `flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all duration-200 ${isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <WarehouseIcon size={22} />
          <span className="text-[10px] font-semibold">Entidades</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default AppLayout;