import React from "react";
import { Shield, ShieldCheck, Key, Lock, CheckCircle2 } from "lucide-react";

export interface SecurityStatusBadgeProps {
  tenantScope?: string;
  rbacLevel?: string;
  mfaEnforced?: boolean;
  faapParity?: boolean;
}

export const SecurityStatusBadge: React.FC<SecurityStatusBadgeProps> = ({
  tenantScope = "CORE_SOVEREIGN",
  rbacLevel = "Executive L4",
  mfaEnforced = true,
  faapParity = true,
}) => {
  return (
    <div id="security-status-badge" className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-white space-y-2 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="font-extrabold uppercase tracking-wider text-[11px] text-teal-300">
            Zero-Trust Governance
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
          SECURED
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
        <div>
          <span className="text-slate-400">Scope:</span> <span className="font-bold text-teal-300">{tenantScope}</span>
        </div>
        <div>
          <span className="text-slate-400">RBAC:</span> <span className="font-bold text-slate-200">{rbacLevel}</span>
        </div>
        <div>
          <span className="text-slate-400">FAAP Parity:</span> <span className="font-bold text-emerald-400">$0.00</span>
        </div>
        <div>
          <span className="text-slate-400">MFA Wall:</span> <span className="font-bold text-emerald-400">Active</span>
        </div>
      </div>
    </div>
  );
};
