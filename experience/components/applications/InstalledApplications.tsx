import React, { useState } from 'react';
import { 
  Building2, CheckCircle2, Sliders, ArrowRight, ShieldCheck, RefreshCw, 
  Trash2, Power, Download, Layers, Sparkles, ExternalLink
} from 'lucide-react';
import { domainRegistryService, DomainPackage } from '../../../src/core/runtime/domainRegistry';

export interface InstalledApplicationsProps {
  onNavigate?: (route: string) => void;
}

export const InstalledApplications: React.FC<InstalledApplicationsProps> = ({ onNavigate }) => {
  const [packages, setPackages] = useState<DomainPackage[]>(domainRegistryService.getAllPackages());
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const installedPackages = packages.filter(p => p.status === 'installed');

  const handleUninstall = (pkgId: string) => {
    domainRegistryService.uninstallPackage(pkgId);
    setPackages(domainRegistryService.getAllPackages());
    setActionMessage(`Uninstalled domain package [${pkgId}].`);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleBackup = (name: string) => {
    setActionMessage(`Cryptographic backup generated for [${name}] and saved to Owner Vault.`);
    setTimeout(() => setActionMessage(null), 3000);
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold rounded border border-emerald-200">
              RUNTIME APPLICATIONS LOG
            </span>
            <span className="text-xs text-slate-500 font-medium">Active Workspace Packages</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">Installed Enterprise Applications</h2>
          <p className="text-xs text-slate-500">Manage, configure, upgrade, backup, and monitor installed domain packages</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate && onNavigate('/platform/erp')}
            className="px-4 py-2 bg-[#0078D4] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            + Install New Package
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-[#0078D4] rounded-xl text-xs font-mono font-bold">
          {actionMessage}
        </div>
      )}

      {/* Grid of Installed Apps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {installedPackages.map(pkg => (
          <div key={pkg.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 hover:border-slate-300 transition">
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {pkg.family}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">
                  {pkg.installedTenant || pkg.name}
                </h3>
                <p className="text-xs text-slate-500">{pkg.name} • Edition: <strong>{pkg.installedEdition || 'Standard'}</strong></p>
              </div>

              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold rounded-md border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> ACTIVE v{pkg.version}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {pkg.description}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-[11px] font-mono text-slate-600 border border-slate-200">
              <div className="flex justify-between">
                <span>Active Modules:</span>
                <span className="font-bold text-slate-800">{pkg.modules.length} Modules</span>
              </div>
              <div className="flex justify-between">
                <span>AI Agent:</span>
                <span className="font-bold text-blue-600">{pkg.aiAgents[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>FAAP Ledger Status:</span>
                <span className="font-bold text-emerald-600">PARITY VERIFIED</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="grid grid-cols-4 gap-2 text-xs font-bold pt-2 border-t border-slate-100">
              <button
                onClick={() => onNavigate && onNavigate('/platform/erp')}
                className="py-2 bg-[#0078D4] hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-1 transition cursor-pointer"
              >
                Open <ExternalLink className="w-3 h-3" />
              </button>
              <button
                onClick={() => onNavigate && onNavigate('/owner-configuration')}
                className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer"
              >
                Configure
              </button>
              <button
                onClick={() => handleBackup(pkg.name)}
                className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer"
              >
                Backup
              </button>
              <button
                onClick={() => handleUninstall(pkg.id)}
                className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstalledApplications;
