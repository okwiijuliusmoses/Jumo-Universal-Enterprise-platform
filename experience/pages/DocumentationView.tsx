/**
 * Interactive Architecture & Baseline Documentation View (/documentation)
 */

import React from 'react';
import { Layers, Server, Shield, Database, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const DocumentationView: React.FC = () => {
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">System Architecture & Baseline Specifications</h2>
        <p className="text-xs text-slate-600 font-mono">
          JUMO UEOS Digital Enterprise Platform Production Architecture Trace
        </p>
      </div>

      {/* Target Architecture Flow */}
      <div className="p-6 bg-white/60 border border-slate-200 rounded-xl space-y-6">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Layers className="w-4 h-4 text-[#0078D4]" />
          <span>Production Deployment Topology & Route Trace</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center space-x-2 text-sky-400 font-bold">
              <Layers className="w-4 h-4" />
              <span>Firebase Hosting</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Serves static HTML/JS Experience Layer SPA assets with rewrite rules routing <code className="text-[#0078D4]">/api/v1/**</code> requests directly to Render.
            </p>
            <div className="space-y-1 text-[10px] text-slate-700 pt-2 border-t border-slate-200">
              <div>• /login</div>
              <div>• /owner</div>
              <div>• /tenant</div>
              <div>• /security</div>
              <div>• /documentation</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center space-x-2 text-[#0078D4] font-bold">
              <Server className="w-4 h-4" />
              <span>Render Web Service</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Node.js Express production server running business logic, FAAP scoring engine, RBAC, and treasury pool allocations.
            </p>
            <div className="space-y-1 text-[10px] text-[#0078D4] pt-2 border-t border-slate-200">
              <div>• /api/v1/identity</div>
              <div>• /api/v1/owner</div>
              <div>• /api/v1/tenant</div>
              <div>• /api/v1/security</div>
              <div>• /api/v1/treasury</div>
              <div>• /api/v1/workflow</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <Database className="w-4 h-4" />
              <span>PostgreSQL Database</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Relational persistence layer managing identity credentials, tenant drawdown logs, HSM security audits, and treasury pools.
            </p>
            <div className="space-y-1 text-[10px] text-slate-700 pt-2 border-t border-slate-200">
              <div>• schema.sql</div>
              <div>• seed.ts</div>
              <div>• Connection pooling</div>
            </div>
          </div>
        </div>
      </div>

      {/* Baseline Verification Checklist */}
      <div className="p-6 bg-white/60 border border-slate-200 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Production Baseline Verification</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-white border border-slate-200/80 rounded flex items-center space-x-2 text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Clean repository reset completed without legacy remnants</span>
          </div>

          <div className="p-3 bg-white border border-slate-200/80 rounded flex items-center space-x-2 text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Preservation archive snapshot indexed in ARCHIVE_SNAPSHOT.md</span>
          </div>

          <div className="p-3 bg-white border border-slate-200/80 rounded flex items-center space-x-2 text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Modular /api/v1 REST controllers implemented</span>
          </div>

          <div className="p-3 bg-white border border-slate-200/80 rounded flex items-center space-x-2 text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SPA Experience Layer with AuthContext RBAC integrated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
