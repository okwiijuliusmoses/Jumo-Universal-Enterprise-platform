import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Network, Key, Shield, Globe, Terminal, Loader2, ArrowRight,
  Plus, Copy, Check, Power, AlertCircle, RefreshCw, X, Sliders
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

interface APIRoute {
  id: string;
  name: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  status: "Active" | "Maintenance" | "Deprecated";
  calls: string;
  latencyMs: number;
}

interface APIKeyRecord {
  id: string;
  name: string;
  keyMasked: string;
  fullKey: string;
  role: string;
  created: string;
}

export function APIManagementRenderer() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"endpoints" | "keys">("endpoints");
  const [apis, setApis] = useState<APIRoute[]>([
    { id: "api-1", name: "National Treasury API", path: "/api/v1/ueos/faap/ledger", method: "GET", status: "Active", calls: "2.4M", latencyMs: 24 },
    { id: "api-2", name: "Institutional Domain Service", path: "/api/v1/ueos/domain/provision", method: "POST", status: "Active", calls: "850K", latencyMs: 38 },
    { id: "api-3", name: "AI Swarm Reasoning Gateway", path: "/api/v1/ueos/ai/reasoning", method: "POST", status: "Active", calls: "1.1M", latencyMs: 52 },
    { id: "api-4", name: "Sovereign Factory Provisioner", path: "/api/v1/ueos/registry/factory/provision", method: "POST", status: "Active", calls: "120K", latencyMs: 110 }
  ]);

  const [keys, setKeys] = useState<APIKeyRecord[]>([
    { id: "key-1", name: "National Clearing House Service", keyMasked: "jumo_live_••••••••38f2", fullKey: "jumo_live_sec_994a00bc91238f2", role: "ADMIN_WRITE", created: "2026-02-10" },
    { id: "key-2", name: "Cabinet Telemetry Ingest", keyMasked: "jumo_live_••••••••77a1", fullKey: "jumo_live_sec_110b44ca88977a1", role: "READ_ONLY", created: "2026-04-01" }
  ]);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [createKeyModalOpen, setCreateKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyRole, setNewKeyRole] = useState("READ_WRITE");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleEndpointStatus = (id: string) => {
    setApis(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === "Active" ? "Maintenance" : "Active";
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const rawHex = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 8);
    const full = `jumo_live_sec_${rawHex}`;
    const newRecord: APIKeyRecord = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      keyMasked: `jumo_live_••••••••${full.slice(-4)}`,
      fullKey: full,
      role: newKeyRole,
      created: new Date().toISOString().split("T")[0]
    };

    setKeys(prev => [newRecord, ...prev]);
    setNewKeyName("");
    setCreateKeyModalOpen(false);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-cyan-600" /></div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-500/30">
            <Network className="w-3.5 h-3.5" />
            <span>Sovereign Interface Layer</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase mb-3">JUMO <span className="text-cyan-500">API Gateway</span></h2>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            High-throughput, encrypted REST and RPC integration surface for institutional partners, ledger nodes, and internal engines.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab("endpoints")}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "endpoints" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              Endpoints
            </button>
            <button
              onClick={() => setActiveTab("keys")}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "keys" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              API Keys ({keys.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === "endpoints" ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Active Microservice Endpoints</h3>
              <p className="text-xs text-slate-500 font-medium">Real-time routing throughput and latency monitoring</p>
            </div>
          </div>

          <div className="space-y-4">
            {apis.map((api) => (
              <div key={api.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-xs shrink-0">
                    <Network className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">{api.name}</span>
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-slate-200 text-slate-700 uppercase">
                        {api.method}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-cyan-700 block mt-0.5">{api.path}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-0 border-slate-200">
                  <div className="text-left md:text-right">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Latency</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{api.latencyMs} ms</span>
                  </div>

                  <div className="text-left md:text-right">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Throughput</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{api.calls} / day</span>
                  </div>

                  <button
                    onClick={() => toggleEndpointStatus(api.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border ${
                      api.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                    }`}
                  >
                    {api.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Cryptographic Access Keys</h3>
              <p className="text-xs text-slate-500 font-medium">Manage bearer credentials for external integrations</p>
            </div>
            <button
              onClick={() => setCreateKeyModalOpen(true)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Generate API Key</span>
            </button>
          </div>

          <div className="space-y-4">
            {keys.map((k) => (
              <div key={k.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-xs shrink-0">
                    <Key className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-900 block">{k.name}</span>
                    <span className="text-xs font-mono text-slate-500 block mt-0.5">{k.keyMasked}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 pt-2 md:pt-0 border-t md:border-0 border-slate-200">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-slate-200 text-slate-800">
                    {k.role}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{k.created}</span>
                  <button
                    onClick={() => handleCopy(k.fullKey)}
                    className="px-3 py-1.5 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === k.fullKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === k.fullKey ? "Copied" : "Copy Key"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Key Modal */}
      <AnimatePresence>
        {createKeyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Generate API Key</h3>
                    <p className="text-xs text-slate-400 font-medium">Issue secure secret key for server integrations</p>
                  </div>
                </div>
                <button onClick={() => setCreateKeyModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateKey} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Application / Service Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Regional Tax Portal Sync"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Permission Role</label>
                  <select
                    value={newKeyRole}
                    onChange={(e) => setNewKeyRole(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="READ_ONLY">READ_ONLY (Public queries only)</option>
                    <option value="READ_WRITE">READ_WRITE (Standard operations)</option>
                    <option value="ADMIN_WRITE">ADMIN_WRITE (Full sovereign execution)</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateKeyModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-cyan-600/30 cursor-pointer"
                  >
                    Create Secret Key
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

