// JUMO UEOS — Sovereign Control Center Plane
// Central Sovereign Control Plane governing Institutions, System Governance, AI Ownership,
// Treasury & Billing, Institutional Configuration, Navigation Experience, Vault, Data Management, and Security.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, ShieldAlert, Globe, Server, Cpu, Database, 
  Settings, Key, Users, DollarSign, Activity, FileText, 
  Layers, Lock, AlertTriangle, CheckCircle2, RefreshCw, 
  Sliders, Eye, EyeOff, Building2, Landmark, Terminal, Zap, Shield, Search, ArrowRight
} from 'lucide-react';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';
import { JumoAIAgentRegistry } from '../../../core/ai/registry/JumoAIAgentRegistry';
import { JumoAIProviderFabricRegistry } from '../../../core/ai/registry/JumoAIProviderFabricRegistry';
import { JumoSecretVault } from '../../../core/security/JumoSecretVault';
import { JumoRemoteDigitalWorkshop } from '../../../core/maintenance/JumoRemoteDigitalWorkshop';
import { JumoProductTaxonomyRegistry } from '../../../core/specification/JumoProductTaxonomyRegistry';

export type SovereignControlSection = 
  | 'INSTITUTIONS'
  | 'GOVERNANCE'
  | 'AI_SOVEREIGNTY'
  | 'TREASURY'
  | 'FINANCIAL'
  | 'CONFIGURATION'
  | 'NAVIGATION'
  | 'VAULT'
  | 'DOCUMENTATION'
  | 'REPOSITORY'
  | 'DATA_MANAGEMENT'
  | 'SECURITY';

export const SovereignControlStudio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SovereignControlSection>('INSTITUTIONS');
  const [emergencyLockdown, setEmergencyLockdown] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState('INST-WIGGINS-SEC-01');
  const [searchQuery, setSearchQuery] = useState('');

  // Live state providers
  const agents = JumoAIAgentRegistry.getAllAgents();
  const providers = JumoAIProviderFabricRegistry.getInstance().getAllProviders();
  const workshopNodes = JumoRemoteDigitalWorkshop.getInstance().getAllNodes();

  // Active Sovereign Institutions
  const institutions = [
    {
      id: 'INST-WIGGINS-SEC-01',
      name: 'Wiggins Secondary School',
      sector: 'EDUCATION',
      classification: 'ERP_ECOSYSTEM',
      status: 'ACTIVE_COMMISSIONED',
      environment: 'SOVEREIGN_PRODUCTION_ENCLAVE',
      nodes: 4,
      version: 'v1.4.2',
      assignedAgents: 8,
      sla: '99.98%',
      lastIncident: 'None in 45 days'
    },
    {
      id: 'INST-NATIONAL-HEALTH-02',
      name: 'National Referral Hospital Network',
      sector: 'HEALTHCARE',
      classification: 'ERP_ECOSYSTEM',
      status: 'ACTIVE_COMMISSIONED',
      environment: 'AIR_GAPPED_CLUSTER',
      nodes: 12,
      version: 'v2.1.0',
      assignedAgents: 18,
      sla: '99.999%',
      lastIncident: 'INC-2026-08-12 (Resolved)'
    },
    {
      id: 'INST-COMMUNITY-SACCO-03',
      name: 'Harambee Teachers SACCO',
      sector: 'MICROFINANCE_SACCO',
      classification: 'ERP_ECOSYSTEM',
      status: 'ACTIVE_COMMISSIONED',
      environment: 'SOVEREIGN_PRODUCTION_ENCLAVE',
      nodes: 6,
      version: 'v1.8.0',
      assignedAgents: 10,
      sla: '99.95%',
      lastIncident: 'None in 120 days'
    },
    {
      id: 'INST-JUMO-SWITCH-04',
      name: 'JUMO Sovereign Payment Switch Rail',
      sector: 'DIGITAL_PAYMENTS',
      classification: 'COMMERCIAL_PLATFORM',
      status: 'ACTIVE_COMMISSIONED',
      environment: 'MULTI_REGION_FABRIC',
      nodes: 24,
      version: 'v3.0.4',
      assignedAgents: 25,
      sla: '99.999%',
      lastIncident: 'None'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12" id="jumo-sovereign-control-center">
      <StudioLifecycleNavBar studioId="control" />

      {/* Sovereign Control Plane Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center shadow-xs font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                  Sovereign Control Plane
                </span>
                <span className="text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded uppercase tracking-wider">
                  System Nominal
                </span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Sovereign Control Center</h1>
              <p className="text-xs text-slate-500">Master governance, institutional control, security boundary & financial treasury plane.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setEmergencyLockdown(!emergencyLockdown)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                emergencyLockdown
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              {emergencyLockdown ? 'Emergency Lockdown Active' : 'Sovereign Emergency Lockdown'}
            </button>
          </div>
        </div>
      </div>

      {/* 12-Section Navigation Bar */}
      <div className="bg-white border border-slate-200/80 p-1.5 rounded-2xl overflow-x-auto shadow-xs">
        <div className="flex items-center gap-1 min-w-max">
          {[
            { id: 'INSTITUTIONS', label: '1. Institutions & Tenants', icon: Building2 },
            { id: 'GOVERNANCE', label: '2. System Governance', icon: Shield },
            { id: 'AI_SOVEREIGNTY', label: '3. AI Sovereignty & Policy', icon: Cpu },
            { id: 'TREASURY', label: '4. Sovereign Treasury', icon: Landmark },
            { id: 'FINANCIAL', label: '5. Financial Control & Billing', icon: DollarSign },
            { id: 'CONFIGURATION', label: '6. Institutional Config', icon: Sliders },
            { id: 'NAVIGATION', label: '7. Navigation Engine', icon: Layers },
            { id: 'VAULT', label: '8. Sovereign Vault', icon: Lock },
            { id: 'DOCUMENTATION', label: '9. Manufacturing Docs', icon: FileText },
            { id: 'REPOSITORY', label: '10. Artifact Repository', icon: Database },
            { id: 'DATA_MANAGEMENT', label: '11. Data & Residency', icon: Server },
            { id: 'SECURITY', label: '12. Security & PKI', icon: Key }
          ].map(tab => {
            const isCurrent = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as SovereignControlSection)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs min-h-[500px]">
        {/* 1. INSTITUTIONS & TENANTS */}
        {activeSection === 'INSTITUTIONS' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Institutional Application Control Plane</h3>
                <p className="text-xs text-slate-500">Control runtime instances, versions, nodes, assigned AI specialists, and health telemetry.</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search institutions or instances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {institutions.map(inst => (
                <div 
                  key={inst.id}
                  onClick={() => setSelectedTenant(inst.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    selectedTenant === inst.id
                      ? 'bg-blue-50/50 border-blue-400 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono">{inst.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">{inst.status}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{inst.name}</h4>
                  <p className="text-xs text-slate-500 mb-3">{inst.environment} • {inst.classification.replace(/_/g, ' ')}</p>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[9px] font-sans uppercase">Nodes</span>
                      {inst.nodes} Dedicated
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] font-sans uppercase">AI Specialists</span>
                      {inst.assignedAgents} Active
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] font-sans uppercase">SLA Target</span>
                      {inst.sla}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-2">Operator Action Matrix for {selectedTenant}</h4>
              <div className="flex flex-wrap gap-2">
                {['Trigger Immediate Diagnostic Probe', 'Rotate Cryptographic Enclave Keys', 'Hot-Patch Runtime Kernel', 'Allocate Additional AI Specialists', 'Rollback to Previous Safe Snapshot'].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => console.log(`Executed action: ${action} for ${selectedTenant}`)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-2xs"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. GOVERNANCE */}
        {activeSection === 'GOVERNANCE' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Sovereign System Policies & Governance</h3>
            <p className="text-xs text-slate-500">Strict jurisdictional enforcement, human approval gates, and compliance mandates.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Zero-Trust Verification Gate', desc: 'Require cryptographic multi-sig authorization on all schema migrations and AI policy changes.', status: 'ENFORCED' },
                { title: 'Air-Gapped Telemetry Rule', desc: 'No sensitive client PII or financial journals may transit external cloud networks.', status: 'ENFORCED' },
                { title: 'AI Specialist Decision Auditing', desc: 'All autonomous code generations and medical/financial inferences require immutable ledger logging.', status: 'ACTIVE' },
                { title: '7-Year Sovereign Data Retention', desc: 'All audit trails and transactional evidence are sealed with SHA-256 hashes.', status: 'ACTIVE' }
              ].map((p, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. AI SOVEREIGNTY & POLICY */}
        {activeSection === 'AI_SOVEREIGNTY' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Sovereign AI Provider Ownership & Routing Governance</h3>
            <p className="text-xs text-slate-500">Control provider access, multi-model fallback policies, and air-gapped local inference priorities.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {providers.map(p => (
                <div key={p.providerId} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{p.displayName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">{p.healthStatus}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Family: {p.providerFamily} • Scope: {p.localOrRemote}</p>
                  <p className="text-[11px] text-slate-500">Models registered: {p.supportedModels?.length || 0}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TREASURY */}
        {activeSection === 'TREASURY' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Sovereign Treasury Accounts & Liquidity</h3>
            <p className="text-xs text-slate-500">Direct double-entry ledger oversight, reserve allocations, and clearing settlements.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Sovereign Central Reserve</span>
                <div className="text-2xl font-bold text-emerald-700 font-mono mt-1">$4,250,000,000</div>
                <span className="text-[10px] text-slate-400">FAAP Ledger Verified</span>
              </div>
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">AI Compute Expenditure Pool</span>
                <div className="text-2xl font-bold text-blue-700 font-mono mt-1">$128,450.00</div>
                <span className="text-[10px] text-slate-400">Monthly Quota</span>
              </div>
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Active Tenant Escrow Float</span>
                <div className="text-2xl font-bold text-amber-700 font-mono mt-1">$14,890,200</div>
                <span className="text-[10px] text-slate-400">12 Sovereign Institutions</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. FINANCIAL CONTROL & BILLING */}
        {activeSection === 'FINANCIAL' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Institutional Billing & Pricing Governance</h3>
            <p className="text-xs text-slate-500">Sovereign product pricing, subscription tiers, and consumption billing.</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs font-bold text-slate-900 mb-2">Automated Billing Rules</div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• ERP Tier 1 (Schools / Clinics): $500/mo flat + $0.0002/token AI inference.</li>
                <li>• ERP Tier 2 (Universities / Regional Hospitals): $2,500/mo + dedicated node charges.</li>
                <li>• Commercial Platforms: 0.15% Take-Rate on settlement volume + FAAP clearing fees.</li>
              </ul>
            </div>
          </div>
        )}

        {/* 6. CONFIGURATION */}
        {activeSection === 'CONFIGURATION' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Institutional Configuration Engine</h3>
            <p className="text-xs text-slate-500">Configure tenant brand identity, departments, directorates, and workflow roles.</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-emerald-700 font-mono font-bold">Status: Tenant Configuration Registry Active & Synchronized</span>
            </div>
          </div>
        )}

        {/* 7. NAVIGATION */}
        {activeSection === 'NAVIGATION' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Navigation & Experience Configuration</h3>
            <p className="text-xs text-slate-500">Dynamic role-based portal navigation trees and contextual module visibility.</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-blue-700 font-mono font-bold">8 Sovereign Domain Groups & 24 Studio Workspaces Configured</span>
            </div>
          </div>
        )}

        {/* 8. VAULT */}
        {activeSection === 'VAULT' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Sovereign Application Vault</h3>
            <p className="text-xs text-slate-500">Encrypted storage of API keys, HSM certificates, signing keys, and tenant credentials.</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="text-xs font-bold text-slate-900">FIPS 140-3 Hardware Key Storage</div>
                  <div className="text-[11px] text-slate-500">All credentials masked and strictly accessible via RBAC audit trails.</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VAULT SEALED</span>
            </div>
          </div>
        )}

        {/* 9. DOCUMENTATION */}
        {activeSection === 'DOCUMENTATION' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Application Manufacturing Documentation</h3>
            <p className="text-xs text-slate-500">Authoritative blueprint specifications, component manifests, and certification sign-offs.</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs font-mono text-slate-700">Immutable 20-Stage Manufacturing Lifecycle Blueprint Dossier</div>
            </div>
          </div>
        )}

        {/* 10. REPOSITORY */}
        {activeSection === 'REPOSITORY' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Sovereign Application Repository</h3>
            <p className="text-xs text-slate-500">Manufactured application builds, packages, container images, and rollback snapshots.</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-blue-700">Connected to JUMO Manufacturing Orchestrator Store</span>
            </div>
          </div>
        )}

        {/* 11. DATA MANAGEMENT */}
        {activeSection === 'DATA_MANAGEMENT' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Data & Information Management</h3>
            <p className="text-xs text-slate-500">Data residency boundaries, schema migrations, and cryptographic backup ledger.</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-purple-700">Data Enclave: National Sovereign Boundary (Strict Isolation)</span>
            </div>
          </div>
        )}

        {/* 12. SECURITY & PKI */}
        {activeSection === 'SECURITY' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Security & Sovereignty Center</h3>
            <p className="text-xs text-slate-500">Sovereign PKI, Mutual-TLS trust roots, and real-time SOC threat telemetry.</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-emerald-700">Zero-Trust SOC: All Endpoints Verified with Mutual TLS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
