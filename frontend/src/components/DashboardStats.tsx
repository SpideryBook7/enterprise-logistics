import React from 'react';
import { Building2, Package, Clock } from 'lucide-react';

interface DashboardStatsProps {
  totalCompanies: number;
  totalShipments: number;
}

export function DashboardStats({ totalCompanies, totalShipments }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><Building2 size={24}/></div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">Global</span>
        </div>
        <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Empresas</h3>
        <p className="text-3xl font-black text-slate-800">{totalCompanies}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600"><Package size={24}/></div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">Live</span>
        </div>
        <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Envíos Totales</h3>
        <p className="text-3xl font-black text-slate-800">{totalShipments}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><Clock size={24}/></div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Sync</span>
        </div>
        <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Última Actividad</h3>
        <p className="text-xl font-bold text-slate-800 tracking-tight">Hace un momento</p>
      </div>
    </div>
  );
}
