import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, Fingerprint, Lock, Loader2, BrainCircuit, Key, ShieldCheck, 
  Plus, CheckCircle2, Copy, RefreshCw, X, ShieldAlert, Check
} from "lucide-react";
import { jumoCryptoManager } from "../../core/security/JumoCryptographicProvider";

interface IdentityProfile {
  id: string;
  name: string;
  type: "OPERATOR" | "CITIZEN" | "AGENT" | "INSTITUTION";
  clearance: "TOP_SECRET" | "CONFIDENTIAL" | "STANDARD";
  status: "ACTIVE" | "SUSPENDED";
  publicKey: string;
  issuedAt: string;
}

export function DigitalIdentityRenderer() {
  const [isLoading, setIsLoading] = useState(true);
  const [identities, setIdentities] = useState<IdentityProfile[]>([
    {
      id: "ID-SOV-001",
      name: "Sovereign Root Authority",
      type: "OPERATOR",
      clearance: "TOP_SECRET",
      status: "ACTIVE",
      publicKey: "JUMO-PUB-98FA-441B-E720-ROOT",
      issuedAt: "2026-01-01"
    },
    {
      id: "ID-OP-442",
      name: "National Treasury Signer",
      type: "INSTITUTION",
      clearance: "TOP_SECRET",
      status: "ACTIVE",
      publicKey: "JUMO-PUB-1029-BEEF-7741-TREAS",
      issuedAt: "2026-03-15"
    },
    {
      id: "ID-AGT-901",
      name: "JUMO GPT Cognitive Swarm",
      type: "AGENT",
      clearance: "CONFIDENTIAL",
      status: "ACTIVE",
      publicKey: "JUMO-PUB-658A-FF12-3321-SWARM",
      issuedAt: "2026-06-20"
    }
  ]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<"OPERATOR" | "CITIZEN" | "AGENT" | "INSTITUTION">("OPERATOR");
  const [newClearance, setNewClearance] = useState<"TOP_SECRET" | "CONFIDENTIAL" | "STANDARD">("STANDARD");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId: IdentityProfile = {
      id: `ID-${newType.slice(0, 3)}-${randomSuffix}`,
      name: newName.trim(),
      type: newType,
      clearance: newClearance,
      status: "ACTIVE",
      publicKey: `JUMO-PUB-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-KEY`,
      issuedAt: new Date().toISOString().split("T")[0]
    };

    setIdentities(prev => [newId, ...prev]);
    setNewName("");
    setCreateModalOpen(false);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleStatus = (id: string) => {
    setIdentities(prev => prev.map(i => i.id === id ? { ...i, status: i.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : i));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-sky-600" /></div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-500/30">
            <Fingerprint className="w-3.5 h-3.5" />
            <span>Zero-Trust Identity Fabric</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase mb-3">JUMO <span className="text-sky-500">Identity</span></h2>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Sovereign digital identity management for enterprise operators, national institutions, and autonomous cognitive swarms.
          </p>
        </div>

        <div className="relative z-10">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-sky-600/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Identity</span>
          </button>
        </div>
      </div>

      {/* Identity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {identities.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center">
                  <Fingerprint className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                  item.status === "ACTIVE" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}>
                  {item.status}
                </span>
              </div>

              <h4 className="text-base font-black text-slate-900 tracking-tight mb-1">{item.name}</h4>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">
                {item.id} • {item.type}
              </span>

              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-500 uppercase">Clearance:</span>
                  <span className="font-mono font-black text-slate-800">{item.clearance}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-500 uppercase">Issued:</span>
                  <span className="font-mono text-slate-600">{item.issuedAt}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] pt-1 border-t border-slate-200">
                  <span className="font-bold text-slate-500 uppercase">Public Key:</span>
                  <button 
                    onClick={() => handleCopyKey(item.publicKey)}
                    className="font-mono text-[9px] text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer truncate max-w-[140px]"
                  >
                    {copiedId === item.publicKey ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === item.publicKey ? "Copied" : item.publicKey}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button 
                onClick={() => toggleStatus(item.id)}
                className="flex-1 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
              >
                {item.status === "ACTIVE" ? "Suspend" : "Activate"}
              </button>
              <button 
                onClick={() => handleCopyKey(item.publicKey)}
                className="px-3 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-all cursor-pointer"
                title="Copy Public Key"
              >
                <Key className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Identity Modal */}
      <AnimatePresence>
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Issue Digital Identity</h3>
                    <p className="text-xs text-slate-400 font-medium">Generate cryptographic sovereign credential</p>
                  </div>
                </div>
                <button onClick={() => setCreateModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateIdentity} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Identity Name / Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Regional Comptroller Node"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Identity Type</label>
                    <select
                      value={newType}
                      onChange={(e: any) => setNewType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                    >
                      <option value="OPERATOR">OPERATOR</option>
                      <option value="INSTITUTION">INSTITUTION</option>
                      <option value="AGENT">AGENT</option>
                      <option value="CITIZEN">CITIZEN</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Security Clearance</label>
                    <select
                      value={newClearance}
                      onChange={(e: any) => setNewClearance(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
                    >
                      <option value="STANDARD">STANDARD</option>
                      <option value="CONFIDENTIAL">CONFIDENTIAL</option>
                      <option value="TOP_SECRET">TOP_SECRET</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-sky-600/30 cursor-pointer"
                  >
                    Issue Credential
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

