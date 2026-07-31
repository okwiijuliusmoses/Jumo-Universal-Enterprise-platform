import React from 'react';
import { ControlCenterWorkspace } from './workspace';
import { Package, Download, RefreshCw, Lock, Settings } from 'lucide-react';

const AppTile = ({ icon: Icon, title, status, version }) => (
    <div className="p-6 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h2 className="font-bold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-500">v{version} • {status}</p>
            </div>
        </div>
        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200">Manage</button>
    </div>
);

export const ERPStore = () => {
  const toolbar = (
    <>
      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200">Browse Marketplace</button>
      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700">Sync Updates</button>
    </>
  );

  return (
    <ControlCenterWorkspace 
        title="ERP Store" 
        description="Marketplace for managing installed ERP systems, updates, and versions."
        toolbar={toolbar}
    >
        <div className="space-y-4">
            <AppTile icon={Package} title="University ERP" status="Installed" version="1.2.0" />
            <AppTile icon={Package} title="Hospital ERP" status="Installed" version="1.0.5" />
            <AppTile icon={Package} title="Church ERP" status="Update Available" version="0.9.8" />
        </div>
    </ControlCenterWorkspace>
  );
};
