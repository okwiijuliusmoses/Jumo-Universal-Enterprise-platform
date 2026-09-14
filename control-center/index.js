import React from 'react';
import { ControlCenterWorkspace } from './workspace';
import { LayoutDashboard, Package, ShoppingCart, Cpu, Building2, Users, ShieldCheck, Database, Terminal, Settings } from 'lucide-react';

const Tile = ({ icon: Icon, title, desc, color = "emerald" }) => (
  <div className="p-6 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer flex flex-col items-center text-center shadow-sm">
    <div className={`w-16 h-16 rounded-xl bg-${color}-100 flex items-center justify-center text-${color}-700 mb-4`}>
      <Icon className="w-8 h-8" />
    </div>
    <h2 className="font-bold text-slate-900">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{desc}</p>
  </div>
);

export const ControlCenterOverview = () => {
  return (
    <ControlCenterWorkspace 
        title="Platform Overview" 
        description="Command center for JUMO UEOS platform operations."
    >
        {/* Platform Services */}
        <section className="mb-12">
            <h2 className="text-lg font-bold mb-6 text-slate-900">Platform Services</h2>
            <div className="grid grid-cols-4 gap-6">
              <Tile icon={LayoutDashboard} title="ERP Factory" desc="Design ERP Blueprints" />
              <Tile icon={ShoppingCart} title="ERP Store" desc="Manage ERP Installs" />
              <Tile icon={Cpu} title="AI Services" desc="JUMO AI Core" />
              <Tile icon={Building2} title="FAAP Financials" desc="Global Treasury" />
              <Tile icon={Users} title="Identity" desc="Governance" />
              <Tile icon={ShieldCheck} title="AEGIS Security" desc="Protection" />
            </div>
        </section>

        {/* System Services */}
        <section className="border-t pt-8">
            <h2 className="text-lg font-bold mb-6 text-slate-900">System Services</h2>
            <div className="grid grid-cols-4 gap-6">
              <Tile icon={Database} title="Service Registry" desc="Kernel Services" color="slate" />
              <Tile icon={Terminal} title="Runtime Monitor" desc="Kernel Diagnostics" color="slate" />
              <Tile icon={Settings} title="Platform Policies" desc="Governance" color="slate" />
            </div>
        </section>
    </ControlCenterWorkspace>
  );
};
