import React, { useState } from 'react';
import { 
  History, RotateCcw, ArrowUpCircle, Trash2, 
  Settings2, Activity, ShieldAlert, Archive,
  Zap, Clock, Layers, Save, Plus
} from 'lucide-react';
import { LifecycleAsset } from '../../../core/runtime/sovereignState';

interface LifecycleStudioProps {
  assets: LifecycleAsset[];
  onTransition: (index: number) => void;
  onArchive: (index: number) => void;
  onRegister?: (name: string, type: string) => void;
}

export const LifecycleStudio: React.FC<LifecycleStudioProps> = ({
  assets,
  onTransition,
  onArchive,
  onRegister
}) => {
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetType, setNewAssetType] = useState('Sovereign Service Module');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName.trim()) return;
    onRegister?.(newAssetName.trim(), newAssetType);
    setNewAssetName('');
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Lifecycle Studio</h2>
            <p className="text-xs text-slate-500 font-medium">Sovereign Asset Management, Upgrades & Retirement Lifecycle</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-[10px] font-black uppercase border border-purple-100">
            <Activity className="w-3.5 h-3.5" />
            Registry Sync: NOMINAL
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Asset Management */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Active Asset Inventory</h3>
              <div className="flex gap-2">
                <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600">
                  <Save className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-600">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {(assets ?? []).map((asset, i) => (
                <div key={i} className="p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      asset.status === 'OPERATIONAL' ? 'bg-emerald-50 text-emerald-600' :
                      asset.status === 'TESTING' ? 'bg-amber-50 text-amber-600' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{asset.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{asset.type}</span>
                        <span className="text-[9px] font-black text-slate-300">•</span>
                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100">{asset.step}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[8px] font-black text-slate-400 uppercase block tracking-widest">Lifecycle State</span>
                      <span className={`text-[10px] font-black uppercase ${
                        asset.status === 'OPERATIONAL' ? 'text-emerald-600' :
                        asset.status === 'TESTING' ? 'text-amber-600' :
                        'text-slate-500'
                      }`}>
                        {asset.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => onTransition(i)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-purple-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowUpCircle className="w-3.5 h-3.5" />
                        Promote
                      </button>
                      <button 
                        onClick={() => onArchive(i)}
                        className="p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 rounded-lg transition-all cursor-pointer"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {(assets ?? []).length === 0 && (
                <div className="p-20 text-center space-y-4 opacity-40">
                  <RotateCcw className="w-16 h-16 mx-auto text-slate-300" />
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase">No tracked assets in registry</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Import products from the registry to manage their lifecycle.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Maintenance / Health */}
        <div className="lg:col-span-4 space-y-6">
          {onRegister && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-purple-600" />
                  Register Sovereign Asset
                </h3>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Add custom software to the ledger of tracked digital assets.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <div className="space-y-1">
                  <label htmlFor="name-input" className="text-[9px] font-black uppercase text-slate-500 block">Asset Name</label>
                  <input
                    id="name-input"
                    type="text"
                    value={newAssetName}
                    onChange={(e) => setNewAssetName(e.target.value)}
                    placeholder="e.g. Civil Registry System"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:ring-1 focus:ring-purple-500 outline-hidden"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="type-select" className="text-[9px] font-black uppercase text-slate-500 block">Asset Category</label>
                  <select
                    id="type-select"
                    value={newAssetType}
                    onChange={(e) => setNewAssetType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:ring-1 focus:ring-purple-500 outline-hidden cursor-pointer"
                  >
                    <option value="Governance System">Governance System</option>
                    <option value="Sovereign Service Module">Sovereign Service Module</option>
                    <option value="Commercial ERP Platform">Commercial ERP Platform</option>
                    <option value="Utility Application">Utility Application</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  Confirm Registration
                </button>
              </form>
            </div>
          )}

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Maintenance Overview</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] font-black text-slate-900 uppercase">Pending Upgrades</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span className="text-[10px] font-black text-slate-900 uppercase">Security Patches</span>
                  </div>
                  <span className="text-xs font-black text-rose-600">CRITICAL (2)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-black text-slate-900 uppercase">Avg Asset Age</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">12d</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scheduled Tasks</h4>
                {[
                  { task: "Weekly Integrity Audit", time: "Tonight, 02:00", status: "SCHEDULED" },
                  { task: "National Registry Re-sync", time: "Monday, 10:00", status: "PENDING" },
                  { task: "Legacy Product Retirement", time: "Oct 1st, 2026", status: "PLANNING" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-800 block leading-none">{item.task}</span>
                      <span className="text-[9px] text-slate-400 font-medium">{item.time}</span>
                    </div>
                    <span className="text-[8px] font-black text-slate-500">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all">
              Launch Maintenance Wizard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
