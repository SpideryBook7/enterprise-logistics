import React from 'react';
import { DashboardStats } from '../components/DashboardStats';
import { useLogisticsData } from '../hooks/useLogisticsData';

export function DashboardPage() {
  const { companies, shipments } = useLogisticsData();

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard General</h1>
        <p className="text-slate-500 mt-2 text-sm">Visión global de las operaciones logísticas y estado de la red.</p>
      </header>

      <DashboardStats 
        totalCompanies={companies.length} 
        totalShipments={shipments.length} 
      />
    </div>
  );
}
