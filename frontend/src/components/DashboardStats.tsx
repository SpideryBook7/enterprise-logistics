import React from 'react';
import { Building2, Package, Activity } from 'lucide-react';

interface DashboardStatsProps {
  totalCompanies: number;
  totalShipments: number;
}

export function DashboardStats({ totalCompanies, totalShipments }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div className="p-2.5 bg-indigo-50/80 rounded-xl text-indigo-600">
            <Building2 size={20}/>
          </div>
        </div>
        <h3 className="text-slate-500 text-sm font-semibold tracking-wide">Total Empresas</h3>
        <p className="text-4xl font-black text-slate-800 tracking-tight mt-1">{totalCompanies}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div className="p-2.5 bg-sky-50/80 rounded-xl text-sky-600">
            <Package size={20}/>
          </div>
        </div>
        <h3 className="text-slate-500 text-sm font-semibold tracking-wide">Envíos Activos</h3>
        <p className="text-4xl font-black text-slate-800 tracking-tight mt-1">{totalShipments}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 transition-all hover:shadow-md flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="p-2.5 bg-emerald-50/80 rounded-xl text-emerald-600">
            <Activity size={20}/>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Online</span>
          </div>
        </div>
        <div>
          <h3 className="text-slate-500 text-sm font-semibold tracking-wide">Sincronización</h3>
          <p className="text-xl font-bold text-slate-800 tracking-tight mt-1">Tiempo Real</p>
        </div>
      </div>

    </div>
  );
}
