import React, { useState } from 'react';
import { Building2, PlusCircle } from 'lucide-react';
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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Building2 size={18} /></div>
        <h3 className="font-bold text-slate-700">Nueva Empresa</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Nombre de la empresa" 
          className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition w-full text-sm"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required 
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading || !companyName.trim()}
          className="w-full bg-indigo-600 text-white p-3 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <PlusCircle size={16} /> {loading ? 'Creando...' : 'Registrar Empresa'}
        </button>
      </form>
    </div>
  );
}
