import React from 'react';

interface ShipmentTableProps {
  shipments: any[];
  companies: any[];
  onUpdateStatus: (id: number, currentStatus: string) => void;
}

export function ShipmentTable({ shipments, companies, onUpdateStatus }: ShipmentTableProps) {
  
  const getNextStatus = (status: string) => {
    if (status === 'pending') return 'in_transit';
    if (status === 'in_transit') return 'delivered';
    return null;
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'in_transit': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'Pendiente';
      case 'in_transit': return 'En Tránsito';
      case 'delivered': return 'Entregado';
      default: return status;
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="font-bold text-slate-700">Monitoreo de Envíos Recientes</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100">
              <th className="px-6 py-4 font-bold">Tracking ID</th>
              <th className="px-6 py-4 font-bold">Carga</th>
              <th className="px-6 py-4 font-bold">Estado</th>
              <th className="px-6 py-4 font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {shipments.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">No hay envíos registrados.</td>
              </tr>
            ) : (
              shipments.map(shipment => {
                const nextStatus = getNextStatus(shipment.status);
                return (
                  <tr key={shipment.shipment_id} className="hover:bg-blue-50/30 transition group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        #{shipment.shipment_id?.toString().padStart(5, '0')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700">{shipment.content}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
                        {shipment.company_name || companies.find(c => c.company_id === shipment.company_id)?.company_name || 'Desconocida'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusBadge(shipment.status)}`}>
                        {getStatusLabel(shipment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {nextStatus && (
                        <button 
                          onClick={() => onUpdateStatus(shipment.shipment_id, shipment.status)}
                          className="bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 text-xs font-bold py-1 px-3 rounded-lg transition"
                        >
                          Avanzar a {getStatusLabel(nextStatus)}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
