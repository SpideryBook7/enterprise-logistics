import React from 'react';
import { DashboardStats } from '../components/DashboardStats';
import { useLogisticsData } from '../hooks/useLogisticsData';

export function DashboardPage() {
  const { companies, shipments } = useLogisticsData();

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-slate-500">Métricas y resumen global.</p>
        </div>
      </header>

      <DashboardStats 
        totalCompanies={companies.length} 
        totalShipments={shipments.length} 
      />
    </div>
  );
}
