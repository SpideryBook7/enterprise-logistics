import React from 'react';
import { useLogisticsData } from '../hooks/useLogisticsData';
import { useToast } from '../hooks/useToast';
import { companyService, warehouseService, type CompanyCreateInput, type WarehouseCreateInput } from '../services/api';
import { CompanyForm } from '../components/CompanyForm';
import { WarehouseForm } from '../components/WarehouseForm';

export function ManagementPage() {
  const { companies, refreshData } = useLogisticsData();
  const toast = useToast();

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

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestión de Entidades</h1>
        <p className="text-slate-500 mt-2 text-sm">Añade y administra las empresas y almacenes de la red.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-stretch">
        <CompanyForm onSubmit={handleCreateCompany} />
        <WarehouseForm companies={companies} onSubmit={handleCreateWarehouse} />
      </div>
    </div>
  );
}
