import React from 'react';
import { ControlCenterWorkspace } from './workspace';
import { Shield, Lock, Key, Workflow, Bell, Search, Mail, FileText, License, Settings, LayoutGrid } from 'lucide-react';

const Tile = ({ icon: Icon, title, desc }) => (
  <div className="p-6 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer flex flex-col items-center text-center shadow-sm">
    <div className="w-16 h-16 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
      <Icon className="w-8 h-8" />
    </div>
    <h2 className="font-bold text-slate-900">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{desc}</p>
  </div>
);

export const PlatformServices = () => {
  const toolbar = (
    <>
      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200">Export Registry</button>
      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700">New Service</button>
    </>
  );

  return (
    <ControlCenterWorkspace 
        title="Platform Services" 
        description="Manage identity, security, and core platform capabilities."
        toolbar={toolbar}
    >
        <div className="grid grid-cols-4 gap-6">
            <Tile icon={Shield} title="Identity" desc="Authentication & Authorization" />
            <Tile icon={Lock} title="Security" desc="AEGIS & Compliance" />
            <Tile icon={Workflow} title="Workflow" desc="Automation Engine" />
            <Tile icon={Bell} title="Notifications" desc="System Alerts" />
            <Tile icon={Search} title="Search" desc="Global Indexing" />
            <Tile icon={Mail} title="Messaging" desc="Platform Communication" />
            <Tile icon={FileText} title="Reporting" desc="Analytics & Docs" />
            <Tile icon={License} title="Licensing" desc="Provisioning & Tiers" />
            <Tile icon={Settings} title="Configuration" desc="System Parameters" />
        </div>
    </ControlCenterWorkspace>
  );
};
