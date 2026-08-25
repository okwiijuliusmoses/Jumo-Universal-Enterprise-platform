import React, { useState } from 'react';
import { 
  FileSpreadsheet, BookOpen, HeartPulse, Building2, Globe, 
  Landmark, Briefcase, Search, CheckCircle2, Plus, ArrowRight,
  Sparkles, Layers, ShieldCheck, Play
} from 'lucide-react';

export const TemplateLibraryView: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const sectors = ['All', 'Education', 'Healthcare', 'Finance', 'Government', 'Culture & Heritage', 'Business'];

  const allTemplates = [
    // Education
    { id: 'tpl-univ', name: 'National University & Higher Ed Platform', sector: 'Education', type: 'University', desc: 'Full multi-faculty university setup with admissions, grading, research grants, hostel allocation, and alumni relations.', modules: ['Admissions', 'Course Grading', 'Research Grants', 'Hostels', 'Alumni'], ai: 'JUMO Academic Advisor (JUMO AI Enterprise Engine)' },
    { id: 'tpl-college', name: 'Technical & Vocational College ERP', sector: 'Education', type: 'College', desc: 'Streamlined workshop scheduling, apprenticeship tracking, examination grading, and vocational certificates.', modules: ['Workshops', 'Apprenticeship', 'Exams', 'Certificates'], ai: 'Vocational Training JUMO Enterprise AI Copilot' },
    { id: 'tpl-sec-school', name: 'Secondary School Management ERP', sector: 'Education', type: 'Secondary School', desc: 'Class timetables, exam report cards, parent communication portal, and term fee billing.', modules: ['Timetables', 'Report Cards', 'Fee Billing', 'Parent Portal'], ai: 'Secondary School Tutor' },
    { id: 'tpl-pri-school', name: 'Primary & Early Childhood School ERP', sector: 'Education', type: 'Primary School', desc: 'Daily attendance, child development tracking, parent SMS alerts, and school lunch register.', modules: ['Attendance', 'Child Progress', 'Parent SMS', 'Lunch Ledger'], ai: 'Early Learning JUMO Enterprise AI Copilot' },
    { id: 'tpl-nursery', name: 'Nursery & Pre-Primary School Platform', sector: 'Education', type: 'Nursery', desc: 'Early childhood development benchmarks, guardian pickup verification, and daily activity logs.', modules: ['Guardian Pickup', 'Daily Activity Log', 'Development Goals'], ai: 'Pre-Primary Guidance AI' },

    // Healthcare
    { id: 'tpl-hosp', name: 'National Referral Hospital Platform', sector: 'Healthcare', type: 'Hospital', desc: 'Inpatient wards, ICU monitoring, surgery theater scheduling, pharmacy dispensary, and insurance claims.', modules: ['Inpatient Wards', 'ICU Monitor', 'Surgery', 'Dispensary', 'Claims'], ai: 'JUMO Clinical Diagnostic Assistant' },
    { id: 'tpl-clinic', name: 'Outpatient Medical Clinic & Health Center', sector: 'Healthcare', type: 'Clinic', desc: 'Fast-track doctor consultations, minor laboratory tests, patient queues, and pharmacy dispensing.', modules: ['Consultation Queue', 'Lab Tests', 'Prescription Dispense'], ai: 'Clinic JUMO Enterprise AI Copilot' },
    { id: 'tpl-pharm', name: 'Retail & Hospital Pharmacy ERP', sector: 'Healthcare', type: 'Pharmacy', desc: 'Drug batch expiry tracking, prescription barcode verification, supplier restocking, and controlled substance audit.', modules: ['Drug Inventory', 'Barcodes', 'Supplier POs', 'Controlled Drugs'], ai: 'Drug Interaction Sentinel' },

    // Finance
    { id: 'tpl-bank', name: 'Commercial & Retail Bank Core', sector: 'Finance', type: 'Commercial Bank', desc: 'CASA accounts, term deposits, SWIFT/ACH clearing, AML compliance monitoring, and branch balancing.', modules: ['CASA Ledger', 'Term Deposits', 'SWIFT Clearing', 'AML Shield'], ai: 'AML Real-time Guardian (JUMO AI Enterprise Engine)' },
    { id: 'tpl-sacco', name: 'National SACCO & Cooperative Finance', sector: 'Finance', type: 'SACCO', desc: 'Member share capital registers, savings accounts, loan underwriting, and M-Pesa mobile money integration.', modules: ['Member Shares', 'Savings', 'Loan Underwriting', 'Mobile Money'], ai: 'Member Financial Guidance AI' },
    { id: 'tpl-micro', name: 'Microfinance & Village Banking Core', sector: 'Finance', type: 'Microfinance', desc: 'Group guarantee lending, weekly repayment collection schedules, and mobile field officer appraisals.', modules: ['Group Lending', 'Weekly Collections', 'Field Appraisals'], ai: 'Micro-Credit Risk Scorer' },
    { id: 'tpl-credit', name: 'Credit Union & Thrift Organization', sector: 'Finance', type: 'Credit Union', desc: 'Employee payroll deductions, dividend calculation, emergency loan disbursement, and welfare fund.', modules: ['Payroll Deductions', 'Dividends', 'Emergency Loans'], ai: 'Thrift Advisory JUMO Enterprise AI Copilot' },

    // Government
    { id: 'tpl-min', name: 'National Ministry & Agency Platform', sector: 'Government', type: 'Ministry', desc: 'Cabinet policy formulation, statutory budget execution, civil service payroll, and parliamentary reporting.', modules: ['Cabinet Policy', 'Statutory Budget', 'Civil Service HR', 'Procurement'], ai: 'Public Policy Impact Simulator' },
    { id: 'tpl-muni', name: 'Local Government & Municipality ERP', sector: 'Government', type: 'Municipality', desc: 'Property rate collection, building permit inspections, waste collection schedules, and citizen complaint portal.', modules: ['Property Rates', 'Building Permits', 'Sanitation Grid', 'Citizen Portal'], ai: 'Smart City Revenue Optimizer' },
    { id: 'tpl-dist', name: 'District & County Administration', sector: 'Government', type: 'District', desc: 'Rural infrastructure road works, primary health center supervision, and school inspector registers.', modules: ['Rural Roads', 'Health Supervision', 'School Inspection'], ai: 'District Development JUMO Enterprise AI Copilot' },
    { id: 'tpl-agency', name: 'Statutory Regulatory Agency Platform', sector: 'Government', type: 'Agency', desc: 'License application vetting, compliance inspection checklists, enforcement penalty tracking, and revenue remittance.', modules: ['License Vetting', 'Compliance Inspection', 'Penalty Enforcement'], ai: 'Regulatory Audit Sentinel' },

    // Culture & Heritage
    { id: 'tpl-kingdom', name: 'Sovereign Kingdom Administration', sector: 'Culture & Heritage', type: 'Kingdom', desc: 'Royal palace protocol, county/sub-county chiefdom hierarchies, and annual cultural ceremony coordination.', modules: ['Palace Protocol', 'Chiefdom Hierarchy', 'Royal Treasury', 'Cultural Archives'], ai: 'Royal Heritage Historian (JUMO AI Enterprise Engine)' },
    { id: 'tpl-clan', name: 'Clan & Family Lineage Governance', sector: 'Culture & Heritage', type: 'Clan', desc: 'Detailed family tree mapping, clan burial ground registers, youth cultural mentoring, and elders council.', modules: ['Genealogy Tree', 'Member Registry', 'Elders Council', 'Youth Mentorship'], ai: 'Lineage Mapping AI' },
    { id: 'tpl-museum', name: 'Cultural Heritage Institute & Museum', sector: 'Culture & Heritage', type: 'Heritage Organization', desc: 'Digital artifact archiving, audio-visual oral history indexing, research repository, and exhibition ticketing.', modules: ['Artifact Vault', 'Oral History RAG', 'Exhibitions', 'Ticketing'], ai: 'Museum Archival AI' },

    // Business
    { id: 'tpl-ent', name: 'Multi-National Conglomerate ERP', sector: 'Business', type: 'Enterprise', desc: 'Cross-border entity management, IFRS tax consolidation, multi-currency treasury, and automated procurement.', modules: ['IFRS Consolidation', 'Global Treasury', 'Procurement', 'Supply Chain'], ai: 'Conglomerate AI Orchestrator' },
    { id: 'tpl-sme', name: 'SME Fast-Track Business ERP', sector: 'Business', type: 'SME', desc: 'Streamlined invoicing, expense tracking, inventory management, and VAT compliance for growing SMEs.', modules: ['Invoicing', 'Expenses', 'Stock Control', 'VAT Reporting'], ai: 'SME Business Growth Advisor' },
    { id: 'tpl-holding', name: 'Holding Company & Investment Group', sector: 'Business', type: 'Holding Company', desc: 'Subsidiary performance dashboards, dividend tracking, capital allocation, and board governance resolutions.', modules: ['Subsidiary KPIs', 'Dividends', 'Capital Allocation', 'Board Resolutions'], ai: 'Investment Allocation AI' },
    { id: 'tpl-nonprofit', name: 'International NGO & Donor Platform', sector: 'Business', type: 'Nonprofit', desc: 'Multi-donor grant fund accounting, project log-frame milestones, beneficiary registries, and field logistics.', modules: ['Grant Accounting', 'Log-frames', 'Beneficiary Vault', 'Field Logistics'], ai: 'Grant Compliance Sentinel' }
  ];

  const filteredTemplates = allTemplates.filter(tpl => {
    const matchesSector = selectedSector === 'All' || tpl.sector === selectedSector;
    const matchesSearch = !searchQuery.trim() ||
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const handleProvision = (tplName: string) => {
    setActionFeedback(`Provisioned new tenant organization using template [${tplName}]. All workflows and AI agents initialized.`);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 rounded-2xl border border-slate-200 shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-blue-500/20 text-[#0078D4] rounded-lg font-mono text-[11px] font-extrabold border border-blue-500/30 flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#0078D4]" />
              <span>JUMO UEOS PHASE 23 &bull; TEMPLATE LIBRARY</span>
            </span>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-700 rounded font-mono text-[10px] font-bold">
              24 INSTITUTIONAL PRESETS
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Sovereign Institutional Template Library</h1>
          <p className="text-xs text-slate-700 leading-relaxed">
            Instantly provision complete organizations across Education, Healthcare, Finance, Government, Culture, and Enterprise Business. Each template pre-loads specialized domain modules, RBAC roles, workflows, and dedicated AI copilots.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleProvision('Custom Enterprise Synthesis')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Custom Template Builder</span>
          </button>
        </div>
      </div>

      {actionFeedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-bold text-xs flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
          <button onClick={() => setActionFeedback(null)} className="text-emerald-700 font-mono text-[10px] underline">DISMISS</button>
        </div>
      )}

      {/* Sector Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search templates by organization type, sector, or module..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 font-mono">
            <span>Showing {filteredTemplates.length} of {allTemplates.length} Presets</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {sectors.map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                selectedSector === sec
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-cyan-400 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-lg text-[10px] font-extrabold uppercase font-mono">
                  {tpl.sector} &bull; {tpl.type}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>1-CLICK ONBOARDING</span>
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-700 transition-colors">{tpl.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">{tpl.desc}</p>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">Included Domain Modules:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {tpl.modules.map((mod, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-semibold font-mono">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-purple-700 font-bold text-[11px] min-w-0">
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-purple-600" />
                <span className="truncate">{tpl.ai}</span>
              </div>
              <button
                onClick={() => handleProvision(tpl.name)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-sm shadow-blue-600/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Provision Organization</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
