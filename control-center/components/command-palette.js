import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex justify-center pt-20" onClick={onClose}>
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center border-b border-slate-200 px-4 py-3">
          <Search className="w-5 h-5 text-slate-400 mr-2" />
          <input type="text" placeholder="Search everything..." className="flex-1 outline-none text-sm" autoFocus />
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">ESC</span>
        </div>
        <div className="p-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">Quick Actions</div>
          <div className="hover:bg-emerald-50 px-3 py-2 rounded-lg cursor-pointer text-sm">Open ERP Store</div>
          <div className="hover:bg-emerald-50 px-3 py-2 rounded-lg cursor-pointer text-sm">Open AI Platform</div>
        </div>
      </div>
    </div>
  );
};
