import React, { useState } from 'react';
import { useLogisticsData } from '../hooks/useLogisticsData';
import { useShipmentWebSocket } from '../hooks/useShipmentWebSocket';
import { useToast } from '../hooks/useToast';
import { shipmentService, type ShipmentCreateInput } from '../services/api';
import { ShipmentForm } from '../components/ShipmentForm';
import { ShipmentTable } from '../components/ShipmentTable';

export function ShipmentsPage() {
  const { companies, warehouses, shipments, setShipments, refreshData } = useLogisticsData();
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
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Envíos</h1>
          <p className="text-slate-500">Gestión logística en tiempo real.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Live System</span>
        </div>
      </header>

      <ShipmentForm 
        companies={companies}
        warehouses={warehouses}
        onSubmit={handleSubmit}
      />

      <div className="mb-4 mt-8 flex justify-end">
        <input 
          type="text" 
          placeholder="🔍 Buscar por Tracking ID o Contenido..."
          className="w-full md:w-1/3 p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm shadow-sm"
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
