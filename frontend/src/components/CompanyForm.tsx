import React, { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import type { CompanyCreateInput } from '../services/api';

interface CompanyFormProps {
  onSubmit: (data: CompanyCreateInput) => Promise<void>;
}

export function CompanyForm({ onSubmit }: CompanyFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    
    setLoading(true);
    try {
      await onSubmit({ company_name: companyName });
      setCompanyName('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-200/60 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-slate-100 text-slate-700 rounded-lg">
          <Building2 size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Nueva Empresa</h3>
          <p className="text-xs text-slate-500">Registra un nuevo partner comercial</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Nombre de la empresa</label>
          <input 
            type="text" 
            placeholder="Ej. Global Logistics..." 
            className="p-3 bg-transparent border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 text-sm"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required 
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading || !companyName.trim()}
          className="w-full mt-4 bg-slate-900 text-white p-3 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Plus size={16} /> {loading ? 'Creando...' : 'Registrar Empresa'}
        </button>
      </form>
    </div>
  );
}
