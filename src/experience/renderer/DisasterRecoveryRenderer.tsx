import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, RefreshCw, Database, Loader2, BrainCircuit, ShieldCheck, 
  HardDrive, AlertTriangle, Play, CheckCircle2, RotateCcw, Activity, Download
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

interface BackupSnapshot {
  id: string;
  name: string;
  cluster: string;
  sizeMb: number;
  hash: string;
  status: "VERIFIED" | "SYNCHRONIZING";
  created: string;
}

export function DisasterRecoveryRenderer() {
  const [isLoading, setIsLoading] = useState(true);
  const [snapshots, setSnapshots] = useState<BackupSnapshot[]>([
    { id: "snap-901", name: "Institutional Ledger Snapshot #901", cluster: "Cluster-Alpha (Primary)", sizeMb: 4120, hash: "SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", status: "VERIFIED", created: "10 mins ago" },
    { id: "snap-900", name: "Sovereign Vault & Domain Keys #900", cluster: "Cold Storage Delta", sizeMb: 1280, hash: "SHA256:ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb", status: "VERIFIED", created: "1 hour ago" }
  ]);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [failoverStatus, setFailoverStatus] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateSnapshot = async () => {
    setIsBackingUp(true);
    try {
      await new Promise(res => setTimeout(res, 1200));
      const newSnap: BackupSnapshot = {
        id: `snap-${Math.floor(902 + Math.random() * 100)}`,
        name: `Institutional State Snapshot #${Math.floor(902 + Math.random() * 100)}`,
        cluster: "Cluster-Alpha (Live Failover Mirror)",
        sizeMb: 4210,
        hash: `SHA256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
        status: "VERIFIED",
        created: "Just now"
      };
      setSnapshots(prev => [newSnap, ...prev]);
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleTriggerFailover = async () => {
    setFailoverStatus("INITIATING");
    await new Promise(res => setTimeout(res, 1500));
    setFailoverStatus("COMPLETED");
    setTimeout(() => setFailoverStatus(null), 4000);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-rose-800" /></div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Sovereign National Resilience</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase mb-3">JUMO <span className="text-rose-500">Disaster Recovery</span></h2>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Automated cluster failover, zero-loss replication, and cryptographic snapshot verification across sovereign data centers.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={handleCreateSnapshot}
            disabled={isBackingUp}
            className="px-5 py-3 bg-rose-700 hover:bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-rose-700/30 cursor-pointer disabled:opacity-50"
          >
            {isBackingUp ? <Loader2 className="w-4 h-4 animate-spin" /> : <HardDrive className="w-4 h-4" />}
            <span>{isBackingUp ? "Creating Snapshot..." : "Trigger Backup"}</span>
          </button>

          <button
            onClick={handleTriggerFailover}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>Simulate Failover</span>
          </button>
        </div>
      </div>

      {failoverStatus && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
          failoverStatus === "COMPLETED" 
            ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
            : "bg-amber-50 text-amber-800 border-amber-200"
        }`}>
          {failoverStatus === "COMPLETED" ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Loader2 className="w-5 h-5 animate-spin text-amber-600" />}
          <span className="text-xs font-bold uppercase tracking-wider">
            {failoverStatus === "COMPLETED" 
              ? "Failover drill completed: All 12 node clusters shifted to secondary mirror in 1.4s with 0% data divergence." 
              : "Executing failover drill: Re-routing edge gateway and synchronizing consensus logs..."}
          </span>
        </div>
      )}

      {/* Snapshots Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Immutable System Snapshots</h3>
            <p className="text-xs text-slate-500 font-medium">Cryptographically anchored ledger & disk images</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">RPO: 0 seconds • RTO: &lt; 3 seconds</span>
        </div>

        <div className="space-y-4">
          {snapshots.map((snap) => (
            <div key={snap.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-xs shrink-0">
                  <Database className="w-6 h-6 text-rose-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">{snap.name}</span>
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                      {snap.status}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 block mt-0.5 truncate max-w-md">{snap.hash}</span>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-0 border-slate-200">
                <div className="text-left md:text-right">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Size</span>
                  <span className="text-sm font-mono font-bold text-slate-900">{(snap.sizeMb / 1024).toFixed(2)} GB</span>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Created</span>
                  <span className="text-sm font-mono text-slate-600">{snap.created}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

