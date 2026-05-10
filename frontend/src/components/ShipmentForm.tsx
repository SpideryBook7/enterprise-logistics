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
    setFormData({ ...formData, content: '' }); // Limpia solo el contenido
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="text-blue-600" size={20} />
        <h2 className="text-lg font-bold">Registrar Nuevo Envío</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase">Contenido</label>
          <input 
            type="text" 
            placeholder="Ej. Componentes Electrónicos" 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            required 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase">Empresa</label>
          <select 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
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
          <label className="text-xs font-bold text-slate-400 uppercase">Almacén Origen</label>
          <select 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
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
          <label className="text-xs font-bold text-slate-400 uppercase">Destino Final</label>
          <select 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
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
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
            Crear Envío
          </button>
        </div>
      </form>
    </section>
  );
}
