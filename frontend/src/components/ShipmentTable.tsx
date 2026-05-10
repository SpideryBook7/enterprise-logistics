import React from 'react';
import { Package, MapPin, CheckCircle2, ArrowRightCircle, Clock } from 'lucide-react';

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
      case 'pending': 
        return { 
          bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200/60', icon: <Clock size={14}/>, label: 'Pendiente' 
        };
      case 'in_transit': 
        return { 
          bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200/60', icon: <ArrowRightCircle size={14}/>, label: 'En Tránsito' 
        };
      case 'delivered': 
        return { 
          bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200/60', icon: <CheckCircle2 size={14}/>, label: 'Entregado' 
        };
      default: 
        return { 
          bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200/60', icon: <Package size={14}/>, label: status 
        };
    }
  };

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Monitoreo de Envíos</h2>
        <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{shipments.length} Registros</span>
      </div>

      {shipments.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
          <div className="bg-slate-50 p-4 rounded-full text-slate-400 mb-4">
            <Package size={32} />
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">No hay envíos registrados</h3>
          <p className="text-sm text-slate-500">Crea el primer envío en el formulario superior.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments.map(shipment => {
            const nextStatus = getNextStatus(shipment.status);
            const badge = getStatusBadge(shipment.status);
            const companyName = shipment.company_name || companies.find(c => c.company_id === shipment.company_id)?.company_name || 'Desconocida';
            
            return (
              <div key={shipment.shipment_id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-all flex flex-col h-full">
                
                {/* Header Card */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border ${badge.bg} ${badge.text} ${badge.border}`}>
                    {badge.icon}
                    <span className="uppercase">{badge.label}</span>
                  </div>
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-semibold tracking-wider">
                    #{shipment.shipment_id?.toString().padStart(5, '0')}
                  </span>
                </div>

                {/* Content Area */}
                <div className="flex-1 mb-6">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2">
                    {shipment.content}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-xs font-medium uppercase tracking-wider">{companyName}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 mt-auto">
                  {nextStatus ? (
                    <button 
                      onClick={() => onUpdateStatus(shipment.shipment_id, shipment.status)}
                      className="w-full bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 flex items-center justify-center gap-2"
                    >
                      Avanzar a {getStatusBadge(nextStatus).label} <ArrowRightCircle size={16} />
                    </button>
                  ) : (
                    <div className="w-full bg-emerald-50/50 text-emerald-600 text-sm font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-emerald-100">
                      <CheckCircle2 size={16} /> Completado
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
