import React, { useState } from 'react';
import { Warehouse as WarehouseIcon, Plus } from 'lucide-react';
import type { WarehouseCreateInput } from '../services/api';

interface WarehouseFormProps {
  companies: any[];
  onSubmit: (data: WarehouseCreateInput) => Promise<void>;
}

export function WarehouseForm({ companies, onSubmit }: WarehouseFormProps) {
  const [formData, setFormData] = useState({
    warehouse_name: '',
    company_id: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.warehouse_name.trim() || !formData.company_id) return;
    
    setLoading(true);
    try {
      await onSubmit({ 
        warehouse_name: formData.warehouse_name,
        company_id: Number(formData.company_id)
      });
      setFormData({ ...formData, warehouse_name: '' }); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-200/60 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-slate-100 text-slate-700 rounded-lg">
          <WarehouseIcon size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Nuevo Almacén</h3>
          <p className="text-xs text-slate-500">Añade un punto de distribución</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 justify-between">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Nombre o Ubicación</label>
            <input 
              type="text" 
              placeholder="Ej. Almacén Central CDMX..." 
              className="p-3 bg-transparent border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 text-sm"
              value={formData.warehouse_name}
              onChange={(e) => setFormData({...formData, warehouse_name: e.target.value})}
              required 
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Asignar Empresa</label>
            <select 
              className="p-3 bg-transparent border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer text-sm"
              value={formData.company_id}
              onChange={(e) => setFormData({...formData, company_id: e.target.value})}
              required
              disabled={loading}
            >
              <option value="">Seleccionar empresa...</option>
              {companies.map(c => (
                <option key={c.company_id} value={c.company_id}>{c.company_name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !formData.warehouse_name.trim() || !formData.company_id}
          className="w-full mt-4 bg-slate-900 text-white p-3 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Plus size={16} /> {loading ? 'Creando...' : 'Registrar Almacén'}
        </button>
      </form>
    </div>
  );
}
