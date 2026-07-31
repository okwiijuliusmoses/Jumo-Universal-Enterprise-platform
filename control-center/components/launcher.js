import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, Cpu, Building2, Users, ShieldCheck, Database, Terminal, Settings, X } from 'lucide-react';

export const Launcher = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const Tile = ({ icon: Icon, title }) => (
    <div className="flex flex-col items-center p-4 hover:bg-slate-100 rounded-lg cursor-pointer transition">
      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-2">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-medium text-slate-700">{title}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex" onClick={onClose}>
      <div className="bg-white w-96 h-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Apps & Services</h2>
          <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Tile icon={LayoutDashboard} title="ERP Factory" />
          <Tile icon={ShoppingCart} title="ERP Store" />
          <Tile icon={Cpu} title="AI Platform" />
          <Tile icon={Building2} title="FAAP" />
          <Tile icon={Users} title="Identity" />
          <Tile icon={ShieldCheck} title="AEGIS" />
          <Tile icon={Database} title="System" />
        </div>
      </div>
    </div>
  );
};
