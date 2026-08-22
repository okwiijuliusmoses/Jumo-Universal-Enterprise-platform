import React, { useState } from 'react';
import { Settings, Lock, ShieldCheck, CheckCircle2, UserCheck, Key } from 'lucide-react';

export const FaapAdminModule: React.FC = () => {
  const [fiscalYear, setFiscalYear] = useState('2026-2027');
  const [periodLocked, setPeriodLocked] = useState(false);

  const handleToggleLock = () => {
    setPeriodLocked(!periodLocked);
    alert(`PERIOD LOCK STATUS UPDATED:
Accounting Period July 2026 is now ${!periodLocked ? 'LOCKED against retrospective journal edits' : 'UNLOCKED for administrator adjustments'}.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">FAAP Administration & Ledger Controls</h1>
          <p className="text-slate-500 text-sm">Fiscal period locks, multi-tenant workspace isolation, role permissions & core ledger parameters.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-emerald-700" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">Accounting Period Lock Control</h3>
              <p className="text-xs text-slate-500">Prevent retrospective edits to closed financial months.</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-sm font-semibold text-slate-700">Period Lock Status: {periodLocked ? 'LOCKED' : 'OPEN'}</span>
            <button onClick={handleToggleLock} className={`px-4 py-2 rounded-xl font-bold text-xs ${periodLocked ? 'bg-amber-100 text-amber-800' : 'bg-emerald-700 text-white'}`}>
              {periodLocked ? 'Unlock Period' : 'Lock Completed Period'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">Tenant-Scoped Database Isolation</h3>
              <p className="text-xs text-slate-500">Zero Trust row-level tenant security active.</p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-lg">
            ✓ Tenant Scope: Default Workspace Active
          </div>
        </div>
      </div>
    </div>
  );
};
