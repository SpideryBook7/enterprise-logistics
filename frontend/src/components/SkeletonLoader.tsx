import React from 'react';

export function SkeletonLoader() {
  return (
    <div className="p-8 w-full max-w-7xl mx-auto animate-pulse">
      <div className="h-10 bg-slate-200 rounded-lg w-1/4 mb-4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-10"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="h-32 bg-slate-200 rounded-2xl"></div>
        <div className="h-32 bg-slate-200 rounded-2xl"></div>
        <div className="h-32 bg-slate-200 rounded-2xl"></div>
      </div>
      
      <div className="h-64 bg-slate-200 rounded-2xl"></div>
    </div>
  );
}
