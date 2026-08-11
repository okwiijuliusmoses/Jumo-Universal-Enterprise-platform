import React, { useState, useEffect } from 'react';
import { 
  Box, Server, Shield, Database, Users, Layout, FileText, 
  Settings, Activity, Zap, Layers, Plus, Trash2, CheckSquare,
  Wand2, ArrowRight, ShieldAlert, Cpu, Globe
} from 'lucide-react';

import { GovernmentEnterpriseScale, ApplicationType } from '../../../core/specification/JumoGovernmentEnterpriseScale';

export interface EcosystemSpecification {
  product: {
    ecosystem: string;
    productCategory: string;
    productType: string;
    productName: string;
    governmentScale: GovernmentEnterpriseScale;
    applicationType: ApplicationType;
    governmentStandard: 'JUMO_GOVERNMENT_STANDARD';
    purpose: string;
    problemBeingSolved: string;
    sector: 'Public' | 'Private';
    targetOrganization: string;
    organizationType: string;
    countryRegion: string;
    targetUsers: string;
    operatingModel: string;
    geographicScope: string;
    deploymentModel: string;
    customization: string;
  };
  portals: { selected: string[]; customization: string };
  organization: { selected: string[]; customization: string };
  modules: { selected: string[]; customization: string };
  digitalForms: { selected: string[]; customization: string };
  workflows: { selected: string[]; customization: string };
  aiWorkforce: { selected: string[]; customization: string };
  integrations: { selected: string[]; customization: string };
  security: { selected: string[]; customization: string };
  dataArchitecture: { selected: string[]; customization: string };
  deployment: { selected: string[]; customization: string };
}

// Derived Architecture Generator Engine
export function derivePlatformArchitecture(
  ecosystem: string,
  scale: GovernmentEnterpriseScale,
  sector: 'Public' | 'Private'
): Partial<EcosystemSpecification> {
  const isNationalOrSovereign = scale === 'NATIONAL' || scale === 'MULTI_NATIONAL' || scale === 'SOVEREIGN' || scale === 'VERY_LARGE';

  // Portals Recommendation
  let derivedPortals = ['Public Portal', 'Staff Portal', 'Administrator Portal'];
  if (sector === 'Public') {
    derivedPortals.push('Citizen Portal', 'Executive Dashboard', 'Finance & Treasury Portal');
  } else {
    derivedPortals.push('Customer Portal', 'Executive Dashboard', 'Supplier & Vendor Portal');
  }
  if (isNationalOrSovereign) {
    derivedPortals.push('Regulator Portal', 'Operator Command Center', 'API Developer Portal', 'Mobile App Interface');
  }

  // Organization Structure Recommendation
  let derivedOrg = ['Departments', 'Divisions', 'Units'];
  if (isNationalOrSovereign) {
    derivedOrg = ['Directorates', 'Divisions', 'Departments', 'Branches', 'Offices', 'Units', 'Teams', 'Committees'];
  }

  // Modules Recommendation
  let derivedModules = ['Identity & Auth', 'User Management', 'Finance & Budget', 'Reporting & Analytics', 'Audit Logging'];
  if (sector === 'Public') {
    derivedModules.push('Procurement', 'Human Resources', 'Asset Management', 'Documents & Archives', 'Compliance');
  } else {
    derivedModules.push('CRM & Sales', 'Procurement & Inventory', 'Payroll', 'Project Management');
  }
  if (isNationalOrSovereign) {
    derivedModules.push('Treasury & Payments', 'Communications', 'Workflow Engine', 'Observability', 'Knowledge Base');
  }

  // Forms Recommendation
  let derivedForms = ['User Registration', 'Service Application', 'Approval Form', 'Document Submission', 'Incident / Feedback Report'];
  if (isNationalOrSovereign) {
    derivedForms.push('Payment Receipt Form', 'Procurement Requisition', 'Inspection Assessment', 'Compliance Declaration');
  }

  // Workflows Recommendation
  let derivedWorkflows = ['Multi-Tier Approval', 'Verification & Review', 'Escalation Flow', 'Automated Audit Trail'];
  if (isNationalOrSovereign) {
    derivedWorkflows.push('Payment Authorization', 'Recruitment Workflow', 'Incident Escalation', 'System Compliance Check');
  }

  // AI Workforce Recommendation
  let derivedAI = ['Architecture Agent', 'Software Agent', 'Security Agent', 'QA Agent'];
  if (isNationalOrSovereign) {
    derivedAI.push('Frontend Agent', 'Backend Agent', 'Database Agent', 'Integration Agent', 'DevOps Agent', 'Compliance Agent', 'Diagnostic Agent');
  }

  // Integrations Recommendation
  let derivedIntegrations = ['FAAP Treasury', 'JUMO Digital Pay', 'Identity Provider', 'REST APIs', 'Secure Object Storage'];
  if (isNationalOrSovereign) {
    derivedIntegrations.push('Sovereign Payment Switch', 'National Identity System', 'Banking Interoperability', 'Government Core Gateway');
  }

  // Security Recommendation
  let derivedSecurity = ['Role-Based Access Control (RBAC)', 'Multi-Factor Authentication (MFA)', 'Encryption at Rest & Transit', 'Immutable Audit Trails'];
  if (isNationalOrSovereign) {
    derivedSecurity.push('Zero Trust Network Architecture', 'Key Management Service (KMS)', 'Session Anomaly Monitoring', 'Sovereign Data Classification');
  }

  // Data Architecture Recommendation
  let derivedData = ['Relational Database Entities', 'Document Store', 'Encrypted Object Storage', 'Automated Backups'];
  if (isNationalOrSovereign) {
    derivedData.push('Point-in-Time Recovery', 'Cross-Region Replicas', 'Operational Telemetry Stream', 'Data Retention Policies');
  }

  // Deployment Profile Recommendation
  let derivedDeploy = ['JUMO Sovereign Cloud', 'Single Tenant Isolation', 'High Availability Cluster'];
  if (isNationalOrSovereign) {
    derivedDeploy.push('Hybrid On-Premise Gateway', 'Air-Gapped Node Capable', 'Disaster Recovery Secondary');
  }

  return {
    portals: { selected: derivedPortals, customization: '' },
    organization: { selected: derivedOrg, customization: '' },
    modules: { selected: derivedModules, customization: '' },
    digitalForms: { selected: derivedForms, customization: '' },
    workflows: { selected: derivedWorkflows, customization: '' },
    aiWorkforce: { selected: derivedAI, customization: '' },
    integrations: { selected: derivedIntegrations, customization: '' },
    security: { selected: derivedSecurity, customization: '' },
    dataArchitecture: { selected: derivedData, customization: '' },
    deployment: { selected: derivedDeploy, customization: '' }
  };
}

const defaultSpec: EcosystemSpecification = {
  product: {
    ecosystem: 'GOVERNMENT_PLATFORM',
    productCategory: 'Sovereign Infrastructure',
    productType: 'National System',
    productName: '',
    governmentScale: 'NATIONAL',
    applicationType: 'WEB_APP',
    governmentStandard: 'JUMO_GOVERNMENT_STANDARD',
    purpose: '',
    problemBeingSolved: '',
    sector: 'Public',
    targetOrganization: 'Digital Transformation Agency',
    organizationType: 'Sovereign Authority',
    countryRegion: 'Sovereign Jurisdiction',
    targetUsers: 'Citizens and Authorized Personnel',
    operatingModel: 'Centralized Sovereign Hub',
    geographicScope: 'National Jurisdiction',
    deploymentModel: 'JUMO Sovereign Cloud',
    customization: ''
  },
  portals: { selected: [], customization: '' },
  organization: { selected: [], customization: '' },
  modules: { selected: [], customization: '' },
  digitalForms: { selected: [], customization: '' },
  workflows: { selected: [], customization: '' },
  aiWorkforce: { selected: [], customization: '' },
  integrations: { selected: [], customization: '' },
  security: { selected: [], customization: '' },
  dataArchitecture: { selected: [], customization: '' },
  deployment: { selected: [], customization: '' }
};

interface SelectionSectionProps {
  title: string;
  icon: React.ElementType;
  options: string[];
  state: { selected: string[]; customization: string };
  onChange: (state: { selected: string[]; customization: string }) => void;
}

const SelectionSection: React.FC<SelectionSectionProps> = ({ title, icon: Icon, options, state, onChange }) => {
  const toggleOption = (opt: string) => {
    const next = state.selected.includes(opt)
      ? state.selected.filter(o => o !== opt)
      : [...state.selected, opt];
    onChange({ ...state, selected: next });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden mb-5">
      <div className="bg-slate-50 border-b border-slate-200 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Icon className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">{title}</h3>
            <p className="text-[10px] text-slate-500 font-medium">Derived specification requirements ({state.selected.length} active)</p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {options.map(opt => {
            const isSelected = state.selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleOption(opt)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${
                  isSelected 
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isSelected ? `✓ ${opt}` : `+ ${opt}`}
              </button>
            );
          })}
        </div>
        <div>
          <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block tracking-wider">Custom Extensions & Notes</label>
          <input
            type="text"
            value={state.customization}
            onChange={(e) => onChange({ ...state, customization: e.target.value })}
            placeholder={`Additional ${title.toLowerCase()} requirements...`}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export const DigitalEcosystemSpecificationForm = ({ onSubmit }: { onSubmit: (spec: EcosystemSpecification) => void }) => {
  const [spec, setSpec] = useState<EcosystemSpecification>(defaultSpec);
  const [isAutoDerived, setIsAutoDerived] = useState(false);

  // Auto-derive architecture when ecosystem or scale changes
  const applyDerivedArchitecture = () => {
    const derived = derivePlatformArchitecture(
      spec.product.ecosystem,
      spec.product.governmentScale,
      spec.product.sector
    );
    setSpec(prev => ({
      ...prev,
      ...derived
    }));
    setIsAutoDerived(true);
  };

  useEffect(() => {
    // Initial auto-derivation on mount
    applyDerivedArchitecture();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(spec);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-800 mb-2">
              <Wand2 className="w-3 h-3 text-indigo-400" />
              Automated Architecture Engine
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">Digital Ecosystem Specification</h2>
            <p className="text-xs text-slate-400 mt-1">Specify core platform parameters. The engine automatically derives enterprise architecture, capabilities, and pipeline gates.</p>
          </div>
          <button
            type="button"
            onClick={applyDerivedArchitecture}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md self-start sm:self-center"
          >
            <Wand2 className="w-3.5 h-3.5" />
            Re-derive Architecture
          </button>
        </div>

        {isAutoDerived && (
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Architecture derived automatically based on platform class ({spec.product.ecosystem}) & scale ({spec.product.governmentScale}).
          </div>
        )}
      </div>

      {/* 1. Core Platform Identity & Class */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-black">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">1. Platform Identity & Governing Parameters</h3>
            <p className="text-[11px] text-slate-500">Authoritative choices driving automated specification construction.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-600 block">Platform Class</label>
            <select
              value={spec.product.ecosystem}
              onChange={(e) => {
                const nextEcosystem = e.target.value;
                setSpec(prev => {
                  const updated = { ...prev, product: { ...prev.product, ecosystem: nextEcosystem } };
                  const derived = derivePlatformArchitecture(nextEcosystem, prev.product.governmentScale, prev.product.sector);
                  return { ...updated, ...derived };
                });
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden cursor-pointer"
            >
              <option value="GOVERNMENT_PLATFORM">Government Platform (Sovereign)</option>
              <option value="PUBLIC_DIGITAL_PLATFORM">Public Digital Platform</option>
              <option value="ENTERPRISE_PLATFORM">Commercial Enterprise Platform</option>
              <option value="RESEARCH_PLATFORM">Research & Innovation Platform</option>
              <option value="NATIONAL_PLATFORM">National Core System</option>
              <option value="SOVEREIGN_PLATFORM">Sovereign Core System</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-600 block">Enterprise Scale</label>
            <select
              value={spec.product.governmentScale}
              onChange={(e) => {
                const nextScale = e.target.value as GovernmentEnterpriseScale;
                setSpec(prev => {
                  const updated = { ...prev, product: { ...prev.product, governmentScale: nextScale } };
                  const derived = derivePlatformArchitecture(prev.product.ecosystem, nextScale, prev.product.sector);
                  return { ...updated, ...derived };
                });
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-extrabold text-indigo-700 focus:ring-1 focus:ring-indigo-500 outline-hidden cursor-pointer"
            >
              <option value="MICRO">MICRO (1 - 50 Users)</option>
              <option value="SMALL">SMALL (50 - 500 Users)</option>
              <option value="MEDIUM">MEDIUM (500 - 5,000 Users)</option>
              <option value="LARGE">LARGE (5,000 - 50,000 Users)</option>
              <option value="VERY_LARGE">VERY_LARGE (50k - 500k Users)</option>
              <option value="NATIONAL">NATIONAL (500k+ Users / Sovereign)</option>
              <option value="MULTI_NATIONAL">MULTI_NATIONAL (Cross-Border / Multi-Region)</option>
              <option value="SOVEREIGN">SOVEREIGN (Full Sovereign Stack)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-600 block">Platform Name</label>
            <input
              type="text"
              required
              value={spec.product.productName}
              onChange={(e) => setSpec({ ...spec, product: { ...spec.product, productName: e.target.value } })}
              placeholder="e.g. Sovereign Digital Identity Gateway"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-600 block">Sector / Domain</label>
            <select
              value={spec.product.sector}
              onChange={(e) => {
                const nextSector = e.target.value as 'Public' | 'Private';
                setSpec(prev => {
                  const updated = { ...prev, product: { ...prev.product, sector: nextSector } };
                  const derived = derivePlatformArchitecture(prev.product.ecosystem, prev.product.governmentScale, nextSector);
                  return { ...updated, ...derived };
                });
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden cursor-pointer"
            >
              <option value="Public">Public Sector</option>
              <option value="Private">Commercial Enterprise</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-600 block">Operating Model</label>
            <select
              value={spec.product.operatingModel}
              onChange={(e) => setSpec({ ...spec, product: { ...spec.product, operatingModel: e.target.value } })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden cursor-pointer"
            >
              <option value="Centralized Sovereign Hub">Centralized Sovereign Hub</option>
              <option value="Federated Multi-Tenant">Federated Multi-Tenant</option>
              <option value="Autonomous Regional Nodes">Autonomous Regional Nodes</option>
              <option value="Distributed Enterprise">Distributed Enterprise</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-600 block">Deployment Model</label>
            <select
              value={spec.product.deploymentModel}
              onChange={(e) => setSpec({ ...spec, product: { ...spec.product, deploymentModel: e.target.value } })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden cursor-pointer"
            >
              <option value="JUMO Sovereign Cloud">JUMO Sovereign Cloud</option>
              <option value="Hybrid On-Premise">Hybrid On-Premise Gateway</option>
              <option value="Air-Gapped Sovereign Node">Air-Gapped Sovereign Node</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-600 block">Platform Purpose & Mission</label>
            <input
              type="text"
              required
              value={spec.product.purpose}
              onChange={(e) => setSpec({ ...spec, product: { ...spec.product, purpose: e.target.value } })}
              placeholder="e.g. Provide unified digital identity verification and credential registry across sovereign channels."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <div className="space-y-1 md:col-span-1">
            <label className="text-[10px] font-black uppercase text-slate-600 block">Problem Being Solved</label>
            <input
              type="text"
              required
              value={spec.product.problemBeingSolved}
              onChange={(e) => setSpec({ ...spec, product: { ...spec.product, problemBeingSolved: e.target.value } })}
              placeholder="e.g. Fragmented credential systems causing verification delays."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* 2. Automated Specification Architecture Breakdown */}
      <div className="space-y-2">
        <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider px-1">Derived Architecture Capabilities</h3>

        <SelectionSection
          title="Portals & Access Channels"
          icon={Layout}
          options={['Public Portal', 'Citizen Portal', 'Customer Portal', 'Staff Portal', 'Administrator Portal', 'Executive Dashboard', 'Finance & Treasury Portal', 'Regulator Portal', 'Operator Command Center', 'API Developer Portal', 'Mobile App Interface']}
          state={spec.portals}
          onChange={(val) => setSpec({ ...spec, portals: val })}
        />

        <SelectionSection
          title="Organizational Structure"
          icon={Users}
          options={['Directorates', 'Divisions', 'Departments', 'Branches', 'Offices', 'Units', 'Teams', 'Committees']}
          state={spec.organization}
          onChange={(val) => setSpec({ ...spec, organization: val })}
        />

        <SelectionSection
          title="Capability Modules"
          icon={Layers}
          options={['Identity & Auth', 'User Management', 'Finance & Budget', 'Reporting & Analytics', 'Audit Logging', 'Procurement', 'Human Resources', 'Payroll', 'Asset Management', 'CRM & Sales', 'Documents & Archives', 'Treasury & Payments', 'Communications', 'Workflow Engine', 'Observability', 'Knowledge Base']}
          state={spec.modules}
          onChange={(val) => setSpec({ ...spec, modules: val })}
        />

        <SelectionSection
          title="Digital Forms"
          icon={FileText}
          options={['User Registration', 'Service Application', 'Approval Form', 'Document Submission', 'Incident / Feedback Report', 'Payment Receipt Form', 'Procurement Requisition', 'Inspection Assessment', 'Compliance Declaration']}
          state={spec.digitalForms}
          onChange={(val) => setSpec({ ...spec, digitalForms: val })}
        />

        <SelectionSection
          title="Workflows & Automation"
          icon={Activity}
          options={['Multi-Tier Approval', 'Verification & Review', 'Escalation Flow', 'Automated Audit Trail', 'Payment Authorization', 'Recruitment Workflow', 'Incident Escalation', 'System Compliance Check']}
          state={spec.workflows}
          onChange={(val) => setSpec({ ...spec, workflows: val })}
        />

        <SelectionSection
          title="AI Workforce Allocation"
          icon={Zap}
          options={['Architecture Agent', 'Software Agent', 'Security Agent', 'QA Agent', 'Frontend Agent', 'Backend Agent', 'Database Agent', 'Integration Agent', 'DevOps Agent', 'Compliance Agent', 'Diagnostic Agent']}
          state={spec.aiWorkforce}
          onChange={(val) => setSpec({ ...spec, aiWorkforce: val })}
        />

        <SelectionSection
          title="Integrations & Gateways"
          icon={Server}
          options={['FAAP Treasury', 'JUMO Digital Pay', 'Identity Provider', 'REST APIs', 'Secure Object Storage', 'Sovereign Payment Switch', 'National Identity System', 'Banking Interoperability', 'Government Core Gateway']}
          state={spec.integrations}
          onChange={(val) => setSpec({ ...spec, integrations: val })}
        />

        <SelectionSection
          title="Security & Governance Controls"
          icon={Shield}
          options={['Role-Based Access Control (RBAC)', 'Multi-Factor Authentication (MFA)', 'Encryption at Rest & Transit', 'Immutable Audit Trails', 'Zero Trust Network Architecture', 'Key Management Service (KMS)', 'Session Anomaly Monitoring', 'Sovereign Data Classification']}
          state={spec.security}
          onChange={(val) => setSpec({ ...spec, security: val })}
        />

        <SelectionSection
          title="Data Architecture"
          icon={Database}
          options={['Relational Database Entities', 'Document Store', 'Encrypted Object Storage', 'Automated Backups', 'Point-in-Time Recovery', 'Cross-Region Replicas', 'Operational Telemetry Stream', 'Data Retention Policies']}
          state={spec.dataArchitecture}
          onChange={(val) => setSpec({ ...spec, dataArchitecture: val })}
        />

        <SelectionSection
          title="Deployment Topology"
          icon={Globe}
          options={['JUMO Sovereign Cloud', 'Single Tenant Isolation', 'High Availability Cluster', 'Hybrid On-Premise Gateway', 'Air-Gapped Node Capable', 'Disaster Recovery Secondary']}
          state={spec.deployment}
          onChange={(val) => setSpec({ ...spec, deployment: val })}
        />
      </div>

      {/* Lock Architecture CTA */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest block">Authoritative Handoff</span>
          <h4 className="text-sm font-black text-white">Generate Architecture Contract & Lock Specification</h4>
          <p className="text-xs text-slate-400">Generates immutable specificationId, platformInstanceId, and initiates Stage 1 in the 20-stage Manufacturing Pipeline.</p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg cursor-pointer whitespace-nowrap"
        >
          <CheckSquare className="w-4 h-4" />
          Lock Architecture & Submit to Pipeline
        </button>
      </div>
    </form>
  );
};
