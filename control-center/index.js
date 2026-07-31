import React from 'react';
import { ControlCenterWorkspace } from './workspace';
import { LayoutDashboard, Package, ShoppingCart, Cpu, Building2, Users } from 'lucide-react';

const LauncherApp = ({ icon: Icon, title, desc }) => (
  <div className="p-6 bg-white rounded-lg border border-slate-200 hover:border-blue-500 transition-all cursor-pointer flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center text-green-700 mb-4">
      <Icon className="w-8 h-8" />
    </div>
    <h2 className="font-bold text-slate-900">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{desc}</p>
  </div>
);

export const ControlCenterOverview = () => {
  return (
    <ControlCenterWorkspace>
      <div className="p-8">
        <h1 className="text-xl font-bold mb-8 text-slate-900">JUMO UEOS Digital Control Center</h1>
        <div className="grid grid-cols-4 gap-6">
          <LauncherApp icon={LayoutDashboard} title="ERP Factory" desc="Design ERP Blueprints" />
          <LauncherApp icon={ShoppingCart} title="ERP Store" desc="Manage ERP Installs" />
          <LauncherApp icon={Cpu} title="AI Services" desc="JUMO AI Core" />
          <LauncherApp icon={Building2} title="FAAP Financials" desc="Global Treasury" />
          <LauncherApp icon={Users} title="Identity" desc="Governance" />
          <LauncherApp icon={Package} title="Registry" desc="All Ecosystems" />
        </div>
      </div>
    </ControlCenterWorkspace>
  );
};
