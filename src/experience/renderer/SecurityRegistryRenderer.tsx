
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  Lock, 
  Key, 
  UserCheck, 
  Eye, 
  AlertTriangle,
  History,
  Fingerprint,
  Globe,
  Database
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function SecurityRegistryRenderer() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSecurity() {
      try {
        const data = await UEOSRuntimeClient.fetchDashboardMetrics();
        setMetrics(data);
      } catch (err) {
        console.error("Security metrics loading failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSecurity();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse space-y-8">
      <div className="h-20 bg-slate-200 rounded-2xl" />
      <div className="grid grid-cols-2 gap-8">
        <div className="h-96 bg-slate-200 rounded-3xl" />
        <div className="h-96 bg-slate-200 rounded-3xl" />
      </div>
    </div>;
  }

  const policies = [
    { name: "Zero-Trust Perimeter", status: "Enforced", icon: Shield, color: "blue" },
    { name: "Double-Entry Ledger Integrity", status: "Operational", icon: Database, color: "emerald" },
    { name: "Multi-Tenant Row Isolation", status: "Active", icon: Lock, color: "violet" },
    { name: "RBAC Governance", status: "Enforced", icon: UserCheck, color: "amber" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <Shield className="w-8 h-8 text-blue-400" />
             <h2 className="text-3xl font-black tracking-tight">Sovereign Security Runtime</h2>
          </div>
          <p className="text-slate-400 max-w-2xl text-lg">
            Active monitoring of JUMO UEOS Zero-Trust architecture. 
            All enterprise domains are guarded by encrypted identity bridges and sovereign ledger integrity.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Fingerprint className="w-48 h-48" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {policies.map((p) => (
          <div key={p.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 bg-${p.color}-50 rounded-xl flex items-center justify-center text-${p.color}-600 mb-4`}>
              <p.icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{p.name}</h4>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{p.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              Security Audit Log
            </h3>
            <button className="text-blue-600 text-xs font-bold hover:underline">Full Audit Trail</button>
          </div>
          <div className="divide-y divide-slate-50">
             {metrics?.recentAuditEvents?.map((log: any) => (
                <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                  <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${log.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {log.status === 'success' ? <UserCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{log.details}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-black mt-1">
                      <span>{log.actor}</span>
                      <span>•</span>
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
           <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Key className="w-4 h-4 text-slate-400" />
              Identity Platform Status
           </h3>
           <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                 <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <div>
                       <span className="block text-sm font-bold text-slate-800">Auth Gateway</span>
                       <span className="text-[10px] text-slate-400 font-bold uppercase">Multi-Provider Router</span>
                    </div>
                 </div>
                 <span className="text-xs font-black text-emerald-600">CONNECTED</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                 <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-violet-500" />
                    <div>
                       <span className="block text-sm font-bold text-slate-800">Session Guard</span>
                       <span className="text-[10px] text-slate-400 font-bold uppercase">Administrative MFA Wall</span>
                    </div>
                 </div>
                 <span className="text-xs font-black text-emerald-600">ACTIVE</span>
              </div>
              
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Identity Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                      <span className="block text-2xl font-black text-blue-700">{metrics?.userActivityCount || 0}</span>
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Active Users</span>
                   </div>
                   <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                      <span className="block text-2xl font-black text-emerald-700">0</span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Failed Attempts</span>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
