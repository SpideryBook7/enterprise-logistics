import React from 'react';
import { useToastState } from '../hooks/useToast';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToastState();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-bottom-2 fade-in duration-200 ${
            toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
            toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          {toast.type === 'success' && <CheckCircle size={20} className="text-emerald-500" />}
          {toast.type === 'error' && <AlertCircle size={20} className="text-red-500" />}
          {toast.type === 'info' && <Info size={20} className="text-blue-500" />}
          
          <p className="font-medium text-sm">{toast.message}</p>
          
          <button 
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-slate-400 hover:text-slate-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
