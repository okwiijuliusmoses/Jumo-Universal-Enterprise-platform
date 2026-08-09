import React, { useState } from 'react';
import { 
  Box, Server, Shield, Database, Users, Layout, FileText, 
  Settings, Activity, Zap, Layers, Plus, Trash2, CheckSquare
} from 'lucide-react';

export interface EcosystemSpecification {
  product: {
    ecosystem: string;
    productCategory: string;
    productType: string;
    productName: string;
    purpose: string;
    sector: 'Public' | 'Private';
    targetOrganization: string;
    targetUsers: string[];
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

const defaultSpec: EcosystemSpecification = {
  product: {
    ecosystem: 'ERP_ECOSYSTEM',
    productCategory: '',
    productType: '',
    productName: '',
    purpose: '',
    sector: 'Public',
    targetOrganization: '',
    targetUsers: [],
    geographicScope: '',
    deploymentModel: 'JUMO Cloud',
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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500">Select required {title.toLowerCase()} or provide custom requirements.</p>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {options.map(opt => {
            const isSelected = state.selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleOption(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  isSelected 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-slate-500 mb-1.5 block">Customize / Extend</label>
          <textarea
            value={state.customization}
            onChange={(e) => onChange({ ...state, customization: e.target.value })}
            placeholder={`Additional ${title.toLowerCase()} requirements...`}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 min-h-[60px]"
          />
        </div>
      </div>
    </div>
  );
};

export const DigitalEcosystemSpecificationForm = ({ onSubmit }: { onSubmit: (spec: EcosystemSpecification) => void }) => {
  const [spec, setSpec] = useState<EcosystemSpecification>(defaultSpec);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(spec);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Digital Ecosystem Specification</h2>
        <p className="text-sm text-slate-500 mt-1">Configure the complete product architecture for the manufacturing pipeline.</p>
      </div>

      {/* Product Definition */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">1. Product Definition</h3>
            <p className="text-xs text-slate-500">Core identity and target ecosystem.</p>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-600">Manufacturing Ecosystem</label>
            <select
              value={spec.product.ecosystem}
              onChange={(e) => setSpec({ ...spec, product: { ...spec.product, ecosystem: e.target.value } })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="ERP_ECOSYSTEM">ERP Ecosystem</option>
              <option value="JUMO_CLOUD_ECOSYSTEM">JUMO Cloud Ecosystem</option>
              <option value="SOFTWARE_ECOSYSTEM">Software Ecosystem</option>
              <option value="COMMERCIAL_PRODUCTS_ECOSYSTEM">Commercial Products Ecosystem</option>
              <option value="RESEARCH_INNOVATION_ECOSYSTEM">Research & Innovation Ecosystem</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-600">Product Name</label>
            <input
              type="text"
              required
              value={spec.product.productName}
              onChange={(e) => setSpec({ ...spec, product: { ...spec.product, productName: e.target.value } })}
              placeholder="e.g. National Patient Ledger"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-600">Purpose</label>
            <input
              type="text"
              required
              value={spec.product.purpose}
              onChange={(e) => setSpec({ ...spec, product: { ...spec.product, purpose: e.target.value } })}
              placeholder="Describe the primary objective..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-600">Sector</label>
            <select
              value={spec.product.sector}
              onChange={(e) => setSpec({ ...spec, product: { ...spec.product, sector: e.target.value as any } })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="Public">Public Sector</option>
              <option value="Private">Private Sector</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-600">Target Organization</label>
            <input
              type="text"
              value={spec.product.targetOrganization}
              onChange={(e) => setSpec({ ...spec, product: { ...spec.product, targetOrganization: e.target.value } })}
              placeholder="e.g. Ministry of Health"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <SelectionSection
        title="Portals"
        icon={Layout}
        options={['Public', 'Customer', 'Citizen', 'Student', 'Staff', 'Employee', 'Administrator', 'Management', 'Executive', 'Finance', 'Registrar', 'Supplier', 'Partner', 'Operator', 'Mobile', 'API']}
        state={spec.portals}
        onChange={(val) => setSpec({ ...spec, portals: val })}
      />

      <SelectionSection
        title="Organization"
        icon={Users}
        options={['Departments', 'Directorates', 'Divisions', 'Branches', 'Offices', 'Units', 'Teams', 'Committees']}
        state={spec.organization}
        onChange={(val) => setSpec({ ...spec, organization: val })}
      />

      <SelectionSection
        title="Modules"
        icon={Layers}
        options={['Identity', 'Users', 'Finance', 'Accounting', 'Procurement', 'Inventory', 'HR', 'Payroll', 'CRM', 'Assets', 'Projects', 'Documents', 'Workflow', 'Reporting', 'Analytics', 'Payments', 'Treasury', 'Communications', 'Compliance', 'Audit']}
        state={spec.modules}
        onChange={(val) => setSpec({ ...spec, modules: val })}
      />

      <SelectionSection
        title="Digital Forms"
        icon={FileText}
        options={['Applications', 'Registration', 'Approval', 'Payment', 'Procurement', 'HR', 'Reporting', 'Complaints', 'Inspection', 'Assessment', 'Documents']}
        state={spec.digitalForms}
        onChange={(val) => setSpec({ ...spec, digitalForms: val })}
      />

      <SelectionSection
        title="Workflows"
        icon={Activity}
        options={['Approval', 'Review', 'Escalation', 'Verification', 'Payment', 'Procurement', 'Recruitment', 'Registration', 'Compliance', 'Incident', 'Automated']}
        state={spec.workflows}
        onChange={(val) => setSpec({ ...spec, workflows: val })}
      />

      <SelectionSection
        title="AI Workforce"
        icon={Zap}
        options={['Architecture Agent', 'Software Agent', 'Frontend Agent', 'Backend Agent', 'Database Agent', 'Integration Agent', 'Security Agent', 'DevOps Agent', 'QA Agent', 'Compliance Agent', 'Diagnostic Agent']}
        state={spec.aiWorkforce}
        onChange={(val) => setSpec({ ...spec, aiWorkforce: val })}
      />

      <SelectionSection
        title="Integrations"
        icon={Server}
        options={['FAAP', 'JUMO Digital Pay', 'Identity', 'APIs', 'Databases', 'Messaging', 'Banking', 'Payment Systems', 'Government Systems', 'External Systems']}
        state={spec.integrations}
        onChange={(val) => setSpec({ ...spec, integrations: val })}
      />

      <SelectionSection
        title="Security"
        icon={Shield}
        options={['RBAC', 'MFA', 'Zero Trust', 'Encryption', 'Audit', 'Key Management', 'Session Security', 'Data Classification', 'Monitoring', 'Compliance']}
        state={spec.security}
        onChange={(val) => setSpec({ ...spec, security: val })}
      />

      <SelectionSection
        title="Data Architecture"
        icon={Database}
        options={['Relational Entities', 'Document Store', 'Blob Storage', 'Data Retention', 'Automated Backup', 'Point-in-time Recovery', 'Cross-region Sync']}
        state={spec.dataArchitecture}
        onChange={(val) => setSpec({ ...spec, dataArchitecture: val })}
      />

      <SelectionSection
        title="Deployment"
        icon={Server}
        options={['JUMO Cloud', 'Hybrid', 'Offline-Capable', 'Private Infrastructure', 'Single Tenant', 'Multi-Tenant', 'Multi-Node', 'Disaster Recovery']}
        state={spec.deployment}
        onChange={(val) => setSpec({ ...spec, deployment: val })}
      />

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer"
        >
          <CheckSquare className="w-5 h-5" />
          Generate Architecture Contract
        </button>
      </div>
    </form>
  );
};
