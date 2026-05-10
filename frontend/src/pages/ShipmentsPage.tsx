import React, { useState } from 'react';
import { useLogisticsData } from '../hooks/useLogisticsData';
import { useShipmentWebSocket } from '../hooks/useShipmentWebSocket';
import { useToast } from '../hooks/useToast';
import { shipmentService, type ShipmentCreateInput } from '../services/api';
import { ShipmentForm } from '../components/ShipmentForm';
import { ShipmentTable } from '../components/ShipmentTable';

export function ShipmentsPage() {
  const { companies, warehouses, shipments, setShipments } = useLogisticsData();
  useShipmentWebSocket(setShipments);
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredShipments = shipments.filter(s => {
    const term = searchTerm.toLowerCase();
    const matchId = s.shipment_id?.toString().includes(term);
    const matchContent = s.content?.toLowerCase().includes(term);
    return matchId || matchContent;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-10 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Centro de Envíos</h1>
          <p className="text-slate-500 mt-2 text-sm">Gestión logística y actualizaciones en vivo vía WebSockets.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200/60 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Live Sync</span>
        </div>
      </header>

      <ShipmentForm 
        companies={companies}
        warehouses={warehouses}
        onSubmit={handleSubmit}
      />

      <div className="mb-8 flex justify-end">
        <input 
          type="text" 
          placeholder="🔍 Buscar por Tracking ID o Carga..."
          className="w-full md:w-1/3 p-3 bg-white border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm shadow-sm placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ShipmentTable 
        shipments={filteredShipments}
        companies={companies}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
