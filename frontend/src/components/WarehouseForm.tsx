import React, { useState } from 'react';
import { Warehouse as WarehouseIcon, PlusCircle } from 'lucide-react';
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
      setFormData({ ...formData, warehouse_name: '' }); // Keep selected company
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><WarehouseIcon size={18} /></div>
        <h3 className="font-bold text-slate-700">Nuevo Almacén</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Nombre o Ubicación" 
          className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition w-full text-sm"
          value={formData.warehouse_name}
          onChange={(e) => setFormData({...formData, warehouse_name: e.target.value})}
          required 
          disabled={loading}
        />
        <select 
          className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer text-sm"
          value={formData.company_id}
          onChange={(e) => setFormData({...formData, company_id: e.target.value})}
          required
          disabled={loading}
        >
          <option value="">Pertenece a la empresa...</option>
          {companies.map(c => (
            <option key={c.company_id} value={c.company_id}>{c.company_name}</option>
          ))}
        </select>
        <button 
          type="submit" 
          disabled={loading || !formData.warehouse_name.trim() || !formData.company_id}
          className="w-full bg-emerald-600 text-white p-3 rounded-xl font-bold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <PlusCircle size={16} /> {loading ? 'Creando...' : 'Registrar Almacén'}
        </button>
      </form>
    </div>
  );
}
