import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { ShipmentCreateInput } from '../services/api';

interface ShipmentFormProps {
  companies: any[];
  warehouses: any[];
  onSubmit: (data: ShipmentCreateInput) => Promise<void>;
}

export function ShipmentForm({ companies, warehouses, onSubmit }: ShipmentFormProps) {
  const [formData, setFormData] = useState({
    content: '',
    company_id: '',
    origin_warehouse_id: '',
    destination_warehouse_id: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      content: formData.content,
      company_id: Number(formData.company_id),
      origin_warehouse_id: Number(formData.origin_warehouse_id),
      destination_warehouse_id: Number(formData.destination_warehouse_id),
    });
    setFormData({ ...formData, content: '' }); 
  };

  return (
    <section className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-200/60 mb-8 transition-all">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <PlusCircle size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Registrar Nuevo Envío</h2>
          <p className="text-sm text-slate-500">Crea una nueva orden de logística en la red.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Contenido</label>
          <input 
            type="text" 
            placeholder="Ej. Componentes..." 
            className="p-3 bg-transparent border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 text-sm"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            required 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Empresa</label>
          <select 
            className="p-3 bg-transparent border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer text-sm"
            value={formData.company_id}
            onChange={(e) => setFormData({...formData, company_id: e.target.value})}
            required
          >
            <option value="">Seleccionar...</option>
            {companies.map(c => (
              <option key={c.company_id} value={c.company_id}>{c.company_name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Almacén Origen</label>
          <select 
            className="p-3 bg-transparent border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer text-sm"
            value={formData.origin_warehouse_id}
            onChange={(e) => setFormData({...formData, origin_warehouse_id: e.target.value})}
            required
          >
            <option value="">Seleccionar...</option>
            {warehouses.map(w => (
              <option key={w.warehouse_id} value={w.warehouse_id}>{w.warehouse_name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Destino Final</label>
          <select 
            className="p-3 bg-transparent border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer text-sm"
            value={formData.destination_warehouse_id}
            onChange={(e) => setFormData({...formData, destination_warehouse_id: e.target.value})}
            required
          >
            <option value="">Seleccionar...</option>
            {warehouses.map(w => (
              <option key={w.warehouse_id} value={w.warehouse_id}>{w.warehouse_name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white p-3 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50"
            disabled={!formData.content.trim()}
          >
            Crear Envío
          </button>
        </div>
      </form>
    </section>
  );
}
