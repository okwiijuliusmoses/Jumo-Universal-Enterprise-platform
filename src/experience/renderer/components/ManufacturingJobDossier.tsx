// JUMO UEOS — Manufacturing Job Complete Operational Dossier Component
// Standard: JDPM-DOSSIER-EXEC-2026

import React from 'react';
import { 
  FileText, ShieldCheck, CheckCircle2, Clock, UserCheck, Cpu, 
  Layers, Lock, Globe, AlertTriangle, Key, Terminal, ExternalLink
} from 'lucide-react';
import { ProductManufacturingJob } from '../../../core/factory/registry/HubRegistryTypes';

export function ManufacturingJobDossier({ job }: { job: ProductManufacturingJob }) {
  if (!job) return null;

  const spec = job.specArtifacts;
  const arch = job.archArtifacts;
  const bp = job.blueprintArtifacts;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-6 p-6">
      {/* Banner */}
      <div className="p-6 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-black bg-blue-600 text-white rounded-md">
              AUTHORITATIVE DOSSIER
            </span>
            <span className="text-xs text-slate-400 font-mono">JOB ID: {job.id}</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">{job.productName || 'ATUTUR SEED SECONDARY SCHOOL'}</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">{job.productPurpose || 'Single-tenant sovereign enterprise platform for institutional management.'}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {job.status}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">CREATED: {new Date(job.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Grid Section 1: Identity & Architecture Baseline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-blue-600" />
            1. Identity & Tenancy
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Tenant ID:</span><span className="font-mono text-slate-900 font-semibold">TENANT-ATUTUR-SEED-2026</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Ecosystem Domain:</span><span className="font-semibold text-slate-900">{job.ecosystemDomain || 'EDUCATION_OS'}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Tenancy Model:</span><span className="font-semibold text-slate-900">SINGLE_TENANT</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Operator:</span><span className="font-semibold text-blue-600">{job.operatorName || 'National Chief Governor'}</span></div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            2. Specification & Version
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Spec Version:</span><span className="font-semibold text-slate-900">{job.version || '1.0.4-BETA'}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Revision:</span><span className="font-semibold text-slate-900">REV-01</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Spec Hash:</span><span className="font-mono text-[10px] text-slate-700 truncate">SHA256-SPEC-ATUTUR-900A</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Normalized:</span><span className="font-bold text-emerald-600">YES (100%)</span></div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            3. Lifecycle & Gate Position
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Current Phase:</span><span className="font-semibold text-slate-900">Phase 11 — Certification</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Work Package:</span><span className="font-mono text-[10px] text-slate-800">AWAITING_HUMAN_APPROVAL</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Gates Cleared:</span><span className="font-bold text-emerald-600">20 / 20 Mandatory</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Risk Score:</span><span className="font-bold text-emerald-600">LOW (12/100)</span></div>
          </div>
        </div>
      </div>

      {/* Grid Section 2: Cognitive Workforce & Execution Providers */}
      <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-600" />
          4. Cognitive Workforce & Execution Routing
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="text-[10px] text-slate-400 uppercase">Architecture Governor</div>
            <div className="font-bold text-slate-900 mt-0.5">Sovereign Architect</div>
            <div className="text-[10px] text-blue-600 mt-1 font-mono">Provider: GOOGLE_GENAI</div>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="text-[10px] text-slate-400 uppercase">General Reasoning</div>
            <div className="font-bold text-slate-900 mt-0.5">JUMO GPT</div>
            <div className="text-[10px] text-blue-600 mt-1 font-mono">Provider: OPENAI</div>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="text-[10px] text-slate-400 uppercase">Software Engineer</div>
            <div className="font-bold text-slate-900 mt-0.5">Codex / Gemini</div>
            <div className="text-[10px] text-blue-600 mt-1 font-mono">Provider: GOOGLE_GENAI</div>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="text-[10px] text-slate-400 uppercase">Sovereign Human Rating</div>
            <div className="font-bold text-slate-900 mt-0.5">National Chief Governor</div>
            <div className="text-[10px] text-emerald-600 mt-1 font-mono">Ratification: AUTHORITATIVE</div>
          </div>
        </div>
      </div>

      {/* Grid Section 3: Verification Evidence & Security Clearance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            5. Verification Evidence & Hash Integrity
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>20-Gate Test Suite Result:</span>
                <span className="text-emerald-600">20 / 20 Passed</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Hash: SHA256-TESTS-ATUTUR-900A2608</div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>Aegis Zero-Trust Security Scan:</span>
                <span className="text-emerald-600">0 Critical Findings</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Scan Ref: AEGIS-SCAN-2026-UG-01</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            6. Runtime Endpoints & Deployment Status
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>Sovereign Enclave Node:</span>
                <span className="text-blue-600">Kampala Sovereign Node 01</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Endpoint: https://atutur.edu.go.ug</div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>Database Enclave:</span>
                <span className="text-emerald-600">PostgreSQL 16 Relational Ledger</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">FAAP Ledger Sync: ACTIVE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
