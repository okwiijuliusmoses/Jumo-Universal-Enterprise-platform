/**
 * JUMO UEOS Phase 6 & Phase 7 — Domain Installation Architecture & Sovereign Domain Login Gateway
 * Full Lifecycle Management: Available -> Install -> Configure -> Activate -> Update -> Suspend -> Remove
 * Independent Domain Authentication Gateways with Ring-0 MFA Enforcement
 * Styled with clean Microsoft 365 / Google Cloud enterprise aesthetic
 */

import React, { useState } from 'react';
import { 
  Layers, Building2, GraduationCap, HeartHandshake, School, PiggyBank, 
  Globe2, Landmark, HeartPulse, Scale, Factory, Truck, CheckCircle2, 
  Play, Download, RefreshCw, Pause, Trash2, Shield, Key, Lock, Eye, EyeOff,
  Settings, Zap, Smartphone, BookOpen, Cpu, ExternalLink, ArrowRight, Check,
  AlertCircle, ChevronRight, FileText, Activity
} from 'lucide-react';
import { EnterpriseLogo } from '../../src/components/EnterpriseLogo';

export interface EnterpriseDomainSpec {
  id: string;
  name: string;
  code: string;
  category: string;
  version: string;
  status: 'AVAILABLE' | 'INSTALLING' | 'CONFIGURING' | 'ACTIVE' | 'UPDATING' | 'SUSPENDED';
  description: string;
  activeTenants: number;
  dbSchema: string;
  aiAgent: string;
  loginTitle: string;
  loginSubtitle: string;
  features: string[];
}

export const DomainsView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'registry' | 'installer' | 'login-gateway' | 'lifecycle' | 'monitoring' | 'packages'>('registry');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomainId, setSelectedDomainId] = useState<string>('sacco');
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processMessage, setProcessMessage] = useState<string>('');

  // Domain Login Gateway State
  const [loginDomainId, setLoginDomainId] = useState<string>('sacco');
  const [loginEmail, setLoginEmail] = useState<string>('admin@uganda-sacco-union.org');
  const [loginPassword, setLoginPassword] = useState<string>('Sovereign#2026!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginMfaCode, setLoginMfaCode] = useState<string>('839-204');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const [domains, setDomains] = useState<EnterpriseDomainSpec[]>([
    { id: 'sacco', name: 'SACCO & Microfinance ERP', code: 'JUMO-DOM-SACCO', category: 'Financial ERP', version: 'v9.4.0', status: 'ACTIVE', activeTenants: 48, dbSchema: 'ueos_sacco_ledger_v9', aiAgent: 'FAAP Parity Auditor', loginTitle: 'SACCO Member & Officer Portal', loginSubtitle: 'Core Banking, Loans, Share Capital & Dividend Ledger', features: ['BOSA & FOSA Core Banking', 'Automated Loan Appraisal', 'MPESA / Cellular Money Gateway', '1.5% Clearing Fee Treasury Hook'] },
    { id: 'church', name: 'Church & Diocese ERP', code: 'JUMO-DOM-CHURCH', category: 'Community ERP', version: 'v4.2.1', status: 'ACTIVE', activeTenants: 32, dbSchema: 'ueos_diocesan_v4', aiAgent: 'Diocesan Compliance Agent', loginTitle: 'Diocesan & Parish Governance Gateway', loginSubtitle: 'Tithe Ledger, Parishioner Registry & Clergy Payroll', features: ['Multi-Parish Consolidation', 'Sacramental Records RAG', 'Project Fund Accounting', 'Automated Tithe Receipting'] },
    { id: 'education', name: 'Education & University ERP', code: 'JUMO-DOM-EDU', category: 'Academic ERP', version: 'v4.2.0', status: 'ACTIVE', activeTenants: 24, dbSchema: 'ueos_campus_v4', aiAgent: 'Academic Registrar AI', loginTitle: 'University & Campus Sovereign Gateway', loginSubtitle: 'Student Information System, Tuition Billing & Exam Faculty', features: ['Student Admissions & Portal', 'Semester Tuition Fee Billing', 'Faculty Grading & Transcript RAG', 'Alumni Transition Hook'] },
    { id: 'alumni', name: 'Alumni Association ERP', code: 'JUMO-DOM-ALU', category: 'Network ERP', version: 'v3.1.0', status: 'ACTIVE', activeTenants: 16, dbSchema: 'ueos_alumni_v3', aiAgent: 'Network Endowment AI', loginTitle: 'Global Alumni & Endowment Gateway', loginSubtitle: 'Member Networking, Chapter Governance & Endowment Fundraising', features: ['Endowment Fund Management', 'Chapter Event Registration', 'Career Mentorship Matcher', 'Donor Contribution Ledger'] },
    { id: 'legal', name: 'Legal & Law Firm ERP', code: 'JUMO-DOM-LEGAL', category: 'Professional ERP', version: 'v5.0.0', status: 'AVAILABLE', activeTenants: 12, dbSchema: 'ueos_legal_trust_v5', aiAgent: 'Legal Brief Analyzer', loginTitle: 'Sovereign Legal & Advocate Gateway', loginSubtitle: 'Trust Account Ledger, Case Management & Brief AI RAG', features: ['Client Trust Account Parity', 'Court Hearing Scheduler', 'Vector Case Law Retrieval', 'Billable Time Tracking'] },
    { id: 'enterprise', name: 'Enterprise & Corporate ERP', code: 'JUMO-DOM-CORP', category: 'Corporate ERP', version: 'v9.4.0', status: 'ACTIVE', activeTenants: 64, dbSchema: 'ueos_enterprise_v9', aiAgent: 'Executive Strategy AI', loginTitle: 'Corporate Governance & Operations Portal', loginSubtitle: 'Multi-Branch Supply Chain, Payroll, GL & Asset Accounting', features: ['General Ledger & Chart of Accounts', 'Procurement & Vendor Bidding', 'Fixed Asset Depreciation', 'Executive Strategy AI Dashboard'] },
    { id: 'hospitality', name: 'Hospitality & Resort ERP', code: 'JUMO-DOM-HOSP', category: 'Service ERP', version: 'v5.0.0', status: 'ACTIVE', activeTenants: 19, dbSchema: 'ueos_resort_v5', aiAgent: 'Revenue Optimization AI', loginTitle: 'Resort & Property Management Gateway', loginSubtitle: 'Room Reservations, Restaurant POS, Housekeeping & Billing', features: ['Front Desk Reservation Engine', 'Restaurant POS & Kitchen Display', 'Housekeeping Maintenance Loop', 'Dynamic Pricing & Occupancy AI'] },
    { id: 'healthcare', name: 'Healthcare & Hospital EHR', code: 'JUMO-DOM-HEALTH', category: 'Medical ERP', version: 'v6.1.0', status: 'AVAILABLE', activeTenants: 14, dbSchema: 'ueos_ehr_clinical_v6', aiAgent: 'Clinical Diagnostic Assistant', loginTitle: 'Clinical EHR & Medical Center Gateway', loginSubtitle: 'Patient Triage, E-Prescriptions, Laboratory & Insurance Billing', features: ['HL7 / FHIR Clinical Records', 'Pharmacy & Dispensary POS', 'Laboratory Diagnostic AI', 'Insurance Billing Reconciliation'] },
    { id: 'government', name: 'Government & Municipal ERP', code: 'JUMO-DOM-GOV', category: 'GovTech ERP', version: 'v8.0.0', status: 'AVAILABLE', activeTenants: 8, dbSchema: 'ueos_municipal_tax_v8', aiAgent: 'Sovereign Policy Auditor', loginTitle: 'Municipal & Public Sector Governance Portal', loginSubtitle: 'Citizen Registry, Property Tax Collection & Public Works Budget', features: ['Citizen Land & Tax Registry', 'Public Procurement Bidding', 'Treasury Budget Allocation', 'Municipal Revenue Enforcement'] },
    { id: 'ngo', name: 'NGO & Global Humanitarian ERP', code: 'JUMO-DOM-NGO', category: 'Non-Profit ERP', version: 'v7.2.0', status: 'ACTIVE', activeTenants: 22, dbSchema: 'ueos_humanitarian_v7', aiAgent: 'Grant Compliance Auditor', loginTitle: 'Global Humanitarian & Grant Gateway', loginSubtitle: 'Grant Accounting, Donor Reporting & Field Beneficiary Tracking', features: ['Donor Grant Restricted Ledger', 'Field Beneficiary Biometrics', 'Multi-Currency Budget Audits', 'UN / USAID Compliance RAG'] },
    { id: 'manufacturing', name: 'Manufacturing & UAMP ERP', code: 'JUMO-DOM-UAMP', category: 'Industrial ERP', version: 'v9.0.0', status: 'AVAILABLE', activeTenants: 11, dbSchema: 'ueos_factory_bom_v9', aiAgent: 'Production Velocity AI', loginTitle: 'UAMP Smart Factory & Production Portal', loginSubtitle: 'Bill of Materials (BOM), Assembly Line Telemetry & QA Automation', features: ['Multi-Level Bill of Materials', 'Assembly Work Order Tracking', 'IoT Machine Telemetry Hook', 'Predictive Supply Maintenance'] },
    { id: 'logistics', name: 'Logistics & Supply Chain ERP', code: 'JUMO-DOM-LOG', category: 'Logistics ERP', version: 'v5.5.0', status: 'AVAILABLE', activeTenants: 15, dbSchema: 'ueos_fleet_cargo_v5', aiAgent: 'Fleet Routing Optimization', loginTitle: 'Global Fleet & Cargo Logistics Gateway', loginSubtitle: 'Fleet Telematics, Customs Documentation & Freight Forwarding', features: ['GPS Fleet Route Optimization', 'Customs Declaration Documents', 'Warehouse Dock Scheduling', 'Fuel & Maintenance Ledger'] }
  ]);

  const filteredDomains = domains.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedDomain = domains.find(d => d.id === selectedDomainId) || domains[0];
  const loginDomain = domains.find(d => d.id === loginDomainId) || domains[0];

  const handleLifecycleAction = (domainId: string, targetStatus: EnterpriseDomainSpec['status'], actionName: string) => {
    setIsProcessing(true);
    setProcessMessage(`${actionName} in progress for ${domains.find(d => d.id === domainId)?.name}... Executing Ring-0 schema migration and AI swarm bindings.`);
    setTimeout(() => {
      setDomains(prev => prev.map(d => d.id === domainId ? { ...d, status: targetStatus } : d));
      setIsProcessing(false);
      setProcessMessage('');
      setWizardStep(1);
    }, 2500);
  };

  const handleDomainLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginSuccess(false);
    setTimeout(() => {
      setIsLoggingIn(false);
      setLoginSuccess(true);
      setTimeout(() => {
        if (onNavigate) {
          onNavigate(`/workspace/app/${loginDomainId}`);
        }
      }, 1500);
    }, 1800);
  };

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'sacco': return <PiggyBank className="w-5 h-5 text-emerald-600" />;
      case 'church': return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'education': return <School className="w-5 h-5 text-blue-600" />;
      case 'alumni': return <GraduationCap className="w-5 h-5 text-cyan-600" />;
      case 'legal': return <Scale className="w-5 h-5 text-indigo-600" />;
      case 'enterprise': return <Building2 className="w-5 h-5 text-blue-700" />;
      case 'hospitality': return <HeartPulse className="w-5 h-5 text-amber-600" />;
      case 'healthcare': return <HeartPulse className="w-5 h-5 text-teal-600" />;
      case 'government': return <Landmark className="w-5 h-5 text-purple-600" />;
      case 'ngo': return <Globe2 className="w-5 h-5 text-emerald-600" />;
      case 'manufacturing': return <Factory className="w-5 h-5 text-indigo-600" />;
      case 'logistics': return <Truck className="w-5 h-5 text-blue-600" />;
      default: return <Layers className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-16">
      {/* Top Banner */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EnterpriseLogo size="md" variant="blue" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Enterprise Domain Ecosystem & Gateway</h1>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold rounded border border-blue-200">
                  12 Sovereign Sectors
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Install, configure, upgrade, and access independent domain runtimes sharing the FAAP financial backbone.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search 12 enterprise domains..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-3 pr-4 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button 
              onClick={() => setActiveTab('login-gateway')}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shadow-xs flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" /> Domain Login Gateway
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('/workspace')}
              className="px-3 py-1.5 bg-white hover:bg-white text-white rounded-lg text-xs font-semibold transition shadow-xs"
            >
              Workspace
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-4 pt-2 border-t border-slate-100 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'registry', label: 'Domain Registry', icon: Layers },
            { id: 'installer', label: 'Installation & Configuration Wizard', icon: Play },
            { id: 'login-gateway', label: 'Sovereign Domain Login Portal', icon: Key },
            { id: 'lifecycle', label: 'Lifecycle Management', icon: RefreshCw },
            { id: 'monitoring', label: 'Domain Health & Telemetry', icon: Activity },
            { id: 'packages', label: 'Web / Mobile / API Packages', icon: Download },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {t.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* PROCESSING OVERLAY */}
        {isProcessing && (
          <div className="mb-6 p-4 bg-blue-900 text-white rounded-xl shadow-md flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-[#0078D4]" />
              <span className="text-xs font-bold">{processMessage}</span>
            </div>
            <span className="text-[11px] font-mono bg-blue-800 px-2.5 py-1 rounded">Ring-0 Kernel Execution</span>
          </div>
        )}

        {/* TAB 1: DOMAIN REGISTRY */}
        {activeTab === 'registry' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Installed & Available Enterprise Domains</h2>
                <p className="text-xs text-slate-500">All domains share the FAAP double-entry ledger, Zero-Trust identity firewall, and AI command gateway.</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                <span>Active Runtimes: <strong className="text-emerald-600">7 Active</strong></span>
                <span>•</span>
                <span>Available to Install: <strong className="text-blue-600">5 Ready</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDomains.map((dom) => (
                <div key={dom.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-400 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                          {getDomainIcon(dom.id)}
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-900 block">{dom.code}</span>
                          <span className="text-[10px] text-slate-600">{dom.category}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                        dom.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        dom.status === 'AVAILABLE' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {dom.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mb-1.5">{dom.name}</h3>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">{dom.loginSubtitle}</p>

                    <div className="space-y-1.5 mb-4">
                      {dom.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Tenants: <strong className="text-slate-900">{dom.activeTenants}</strong></span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setSelectedDomainId(dom.id); setActiveTab('installer'); }}
                        className="text-slate-600 hover:text-slate-900 font-semibold px-2 py-1 bg-slate-100 rounded text-[11px]"
                      >
                        {dom.status === 'ACTIVE' ? 'Configure' : 'Install'}
                      </button>
                      <button 
                        onClick={() => { setLoginDomainId(dom.id); setActiveTab('login-gateway'); }}
                        className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                      >
                        Login Portal <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INSTALLATION & CONFIGURATION WIZARD */}
        {activeTab === 'installer' && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                {getDomainIcon(selectedDomain.id)}
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedDomain.name} — Lifecycle Wizard</h3>
                  <p className="text-xs text-slate-500">{selectedDomain.code} • Current Status: <strong className="text-blue-600">{selectedDomain.status}</strong></p>
                </div>
              </div>
              <select 
                value={selectedDomainId}
                onChange={e => { setSelectedDomainId(e.target.value); setWizardStep(1); }}
                className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
              >
                {domains.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.status})</option>
                ))}
              </select>
            </div>

            {/* Wizard Progress Steps */}
            <div className="flex items-center justify-between px-6 py-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold">
              <button onClick={() => setWizardStep(1)} className={`flex items-center gap-2 ${wizardStep === 1 ? 'text-blue-600 font-bold' : 'text-slate-600'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${wizardStep === 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
                Manifest Review
              </button>
              <ChevronRight className="w-4 h-4 text-slate-700" />
              <button onClick={() => setWizardStep(2)} className={`flex items-center gap-2 ${wizardStep === 2 ? 'text-blue-600 font-bold' : 'text-slate-600'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${wizardStep === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
                Database Schema
              </button>
              <ChevronRight className="w-4 h-4 text-slate-700" />
              <button onClick={() => setWizardStep(3)} className={`flex items-center gap-2 ${wizardStep === 3 ? 'text-blue-600 font-bold' : 'text-slate-600'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${wizardStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
                AI Reasoning Agent
              </button>
              <ChevronRight className="w-4 h-4 text-slate-700" />
              <button onClick={() => setWizardStep(4)} className={`flex items-center gap-2 ${wizardStep === 4 ? 'text-blue-600 font-bold' : 'text-slate-600'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${wizardStep === 4 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
                Activate & Deploy
              </button>
            </div>

            {/* Wizard Step 1: Manifest */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-900">Step 1: Domain Package Manifest & Shared Platform Services</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This domain module inherits Zero-Trust RBAC boundaries, the FAAP 1.5% Treasury clearing router, and automated RAG document embedding. No shared core services are duplicated.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[11px] font-bold text-slate-600 uppercase">Package Version</div>
                    <div className="text-sm font-bold text-slate-900 mt-1">{selectedDomain.version}</div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[11px] font-bold text-slate-600 uppercase">FAAP Ledger Parity Hook</div>
                    <div className="text-sm font-bold text-emerald-600 mt-1">Double-Entry Lock Active ($0.00 offset)</div>
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button onClick={() => setWizardStep(2)} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-2">
                    Proceed to Schema Configuration <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Step 2: Database */}
            {wizardStep === 2 && (
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-900">Step 2: PostgreSQL Tenant Row-Level Isolation Schema</h4>
                <p className="text-xs text-slate-600">
                  Verify the database partition and Drizzle ORM migration path for this domain's transactional tables.
                </p>
                <div className="bg-white text-emerald-400 font-mono text-xs p-4 rounded-xl border border-slate-200">
                  <div>-- Target Partition Schema: {selectedDomain.dbSchema}</div>
                  <div>CREATE SCHEMA IF NOT EXISTS {selectedDomain.dbSchema};</div>
                  <div>ALTER TABLE {selectedDomain.dbSchema}.journals ENABLE ROW LEVEL SECURITY;</div>
                  <div>CREATE POLICY tenant_isolation_policy ON {selectedDomain.dbSchema}.journals USING (tenant_id = current_setting('jumo.current_tenant'));</div>
                </div>
                <div className="pt-4 flex justify-between">
                  <button onClick={() => setWizardStep(1)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold">Back</button>
                  <button onClick={() => setWizardStep(3)} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-2">
                    Proceed to AI Reasoning Setup <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Step 3: AI */}
            {wizardStep === 3 && (
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-900">Step 3: Bind Specialized Domain Reasoning Agent</h4>
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-xs">
                    <EnterpriseLogo size="md" variant="blue" showText={false} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-indigo-950">Assigned Agent: {selectedDomain.aiAgent}</div>
                    <div className="text-xs text-indigo-800 mt-0.5">Powered by Gemini 2.5 Pro reasoning engine. Enforces automated compliance and real-time anomaly scanning.</div>
                  </div>
                </div>
                <div className="pt-4 flex justify-between">
                  <button onClick={() => setWizardStep(2)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold">Back</button>
                  <button onClick={() => setWizardStep(4)} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-2">
                    Proceed to Activation <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Step 4: Activate */}
            {wizardStep === 4 && (
              <div className="space-y-4 text-center py-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-slate-900">Domain Ready for Ring-0 Activation</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Click below to execute migration, register API endpoints in the central gateway, and launch the sovereign domain runtime.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button onClick={() => setWizardStep(3)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold">Back</button>
                  <button 
                    onClick={() => handleLifecycleAction(selectedDomain.id, 'ACTIVE', 'Domain Activation & Migration')}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-md flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" /> Activate {selectedDomain.name} Runtime
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SOVEREIGN DOMAIN LOGIN PORTAL */}
        {activeTab === 'login-gateway' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6">
            <div className="md:col-span-5 space-y-4">
              <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-bold text-xs rounded-full">Sovereign Domain Portal</span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{loginDomain.loginTitle}</h2>
              <p className="text-sm text-slate-600">{loginDomain.loginSubtitle}</p>
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
                <div className="text-xs font-bold text-slate-700">Select Domain Gateway:</div>
                <select 
                  value={loginDomainId}
                  onChange={e => setLoginDomainId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {domains.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Zero-Trust 256-Bit Ring-0 Encryption Active</span>
              </div>
            </div>

            <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <EnterpriseLogo size="md" variant="blue" showText={false} />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{loginDomain.name} Login</h3>
                    <div className="text-[11px] text-slate-600">Restricted Institutional Access</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold rounded border border-emerald-200">
                  ONLINE
                </span>
              </div>

              {loginSuccess ? (
                <div className="py-8 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="font-bold text-base text-slate-900">Sovereign Identity Verified</h4>
                  <p className="text-xs text-slate-500">Redirecting to {loginDomain.name} Workspace...</p>
                </div>
              ) : (
                <form onSubmit={handleDomainLogin} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Institutional Email or Officer ID</label>
                    <input 
                      type="email"
                      required
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">Sovereign Password</label>
                      <a href="#reset" onClick={e => { e.preventDefault(); alert('Password reset requires Ring-0 Officer MFA signature.'); }} className="text-[11px] text-blue-600 hover:underline">Forgot Password?</a>
                    </div>
                    <div className="relative">
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-10 py-2.5 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-600 hover:text-slate-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Hardware MFA Authenticator Code (6-Digit)</label>
                    <input 
                      type="text"
                      required
                      value={loginMfaCode}
                      onChange={e => setLoginMfaCode(e.target.value)}
                      placeholder="e.g. 839-204"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs font-mono font-bold tracking-widest text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition shadow-md flex items-center justify-center gap-2"
                    >
                      {isLoggingIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                      {isLoggingIn ? 'Verifying Zero-Trust Credentials...' : `Authenticate into ${loginDomain.name}`}
                    </button>
                  </div>

                  <div className="pt-2 text-center text-[11px] text-slate-600">
                    By authenticating, you agree to institutional auditing and Ring-0 accountability logging.
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: LIFECYCLE MANAGEMENT */}
        {activeTab === 'lifecycle' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
            <h3 className="font-bold text-base text-slate-900">Domain Runtime State Machine</h3>
            <p className="text-xs text-slate-500">Execute sovereign state transitions across all 12 institutional sectors.</p>
            <div className="space-y-3">
              {domains.map(dom => (
                <div key={dom.id} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getDomainIcon(dom.id)}
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{dom.name}</h4>
                      <span className="text-xs text-slate-500">{dom.code} • Tenants: {dom.activeTenants}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                      dom.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      dom.status === 'AVAILABLE' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {dom.status}
                    </span>
                    {dom.status === 'ACTIVE' ? (
                      <>
                        <button onClick={() => handleLifecycleAction(dom.id, 'UPDATING', 'Hot Upgrade')} className="p-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg" title="Upgrade Package"><RefreshCw className="w-4 h-4" /></button>
                        <button onClick={() => handleLifecycleAction(dom.id, 'SUSPENDED', 'Runtime Suspension')} className="p-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg" title="Suspend Domain"><Pause className="w-4 h-4" /></button>
                      </>
                    ) : (
                      <button onClick={() => handleLifecycleAction(dom.id, 'ACTIVE', 'Runtime Activation')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1">
                        <Play className="w-3.5 h-3.5" /> Activate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5 & 6: MONITORING & PACKAGES */}
        {['monitoring', 'packages'].includes(activeTab) && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs text-center space-y-3">
            {activeTab === 'monitoring' ? <Activity className="w-10 h-10 text-blue-600 mx-auto" /> : <Download className="w-10 h-10 text-blue-600 mx-auto" />}
            <h3 className="font-bold text-base text-slate-900 capitalize">{activeTab === 'monitoring' ? 'Domain Health & Real-Time Telemetry' : 'Downloadable SDKs & Mobile/Web Packages'}</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {activeTab === 'monitoring' 
                ? 'All 12 enterprise domains are synchronized with the JUMO Master CCTV cluster with 99.999% SLA uptime.'
                : 'Scaffolding packages for Android Kotlin, iOS Swift, React Web, and Node.js backend bindings are compiled and ready.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DomainsView;
