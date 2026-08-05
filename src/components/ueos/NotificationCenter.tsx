import React from "react";
import { Bell, Shield, CheckCircle2, AlertTriangle, X } from "lucide-react";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type?: "info" | "success" | "warning" | "security";
}

export interface NotificationCenterProps {
  open: boolean;
  onClose: () => void;
  notifications?: NotificationItem[];
}

const DEFAULT_NOTIFS: NotificationItem[] = [
  { id: "n1", title: "FAAP Ledger Parity Verified", message: "Double-entry total debits match total credits ($0.00 offset).", timestamp: "5 mins ago", type: "success" },
  { id: "n2", title: "Zero-Trust RBAC Policy Update", message: "Executive level authorization active with MFA wall enforcement.", timestamp: "18 mins ago", type: "security" },
  { id: "n3", title: "Workflow Advance Notice", message: "Admissions pipeline step #3 cleared by Registrar.", timestamp: "42 mins ago", type: "info" },
];

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  open,
  onClose,
  notifications = DEFAULT_NOTIFS,
}) => {
  if (!open) return null;

  return (
    <div id="notification-center-drawer" className="fixed inset-y-0 right-0 z-50 w-80 sm:w-96 bg-slate-900 border-l border-slate-800 text-white shadow-2xl p-5 flex flex-col justify-between">
      
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-teal-400" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">System Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
          {notifications.map((n) => (
            <div key={n.id} className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span>{n.title}</span>
                <span className="text-[10px] font-mono text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400 text-center">
        JUMO UEOS Real-Time Event Bus • Security Scope Active
      </div>

    </div>
  );
};
