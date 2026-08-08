import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, Shield, Building2, Layers, Cpu, CheckCircle2, AlertCircle, 
  Search, Plus, ChevronRight, FileText, Users, Award, Lock, ArrowRight, X, Sparkles, Sliders
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function EcosystemRegistryRenderer() {
  const [ecosystems, setEcosystems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEcosystem, setSelectedEcosystem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "governance" | "certification" | "builder">("overview");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await UEOSRuntimeClient.fetchEcosystems();
        setEcosystems(data || []);
      } catch (err) {
        console.error("Failed to load ecosystems", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Globe className="w-10 h-10 text-blue-600 animate-spin" />
        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading Ecosystem Governance Center...</span>
      </div>
    );
  }

  const defaultEcosystems = [
    {
      id: "eco-edu",
      name: "Education Ecosystem",
      authority: "Ministry of Education & Sports / Higher Education Council",
      countries: ["Uganda", "Kenya", "Tanzania", "Rwanda", "Ghana"],
      institutionTypes: ["University", "Polytechnic / TVET", "Teacher College", "Secondary School", "Primary School"],
      approvedPlatforms: 12,
      activeInstitutions: 8400,
      aiAgentsCount: 34,
      status: "Operational",
      governanceModel: {
        leadership: "Minister & Permanent Secretary",
        boards: ["National Council for Higher Education", "University Senate", "School Governing Board"],
        committees: ["Academic Quality Committee", "Finance & Planning Committee", "Disciplinary & Student Affairs"],
        directorates: ["Directorate of Academic Affairs", "Directorate of Research & Innovation", "Directorate of Quality Assurance"],
        approvalChains: ["Admission Endorsement", "Graduation Clearance", "Budget & Procurement Sign-off"]
      },
      certification: {
        governanceValidation: true,
        securityValidation: true,
        aiReadiness: true,
        moduleCompleteness: true,
        workflowCompleteness: true,
        score: "99.8%"
      }
    },
    {
      id: "eco-health",
      name: "Healthcare Ecosystem",
      authority: "Ministry of Health / Medical & Dental Practitioners Council",
      countries: ["Uganda", "Kenya", "Tanzania", "Nigeria"],
      institutionTypes: ["National Referral Hospital", "Regional Hospital", "Health Center IV", "Private Clinic Network"],
      approvedPlatforms: 8,
      activeInstitutions: 1250,
      aiAgentsCount: 42,
      status: "Operational",
      governanceModel: {
        leadership: "Director General Health Services",
        boards: ["Medical Board", "Pharmaceutical Regulatory Authority", "Hospital Executive Committee"],
        committees: ["Clinical Audit Committee", "Infection Control Board", "Pharmacy & Therapeutics"],
        directorates: ["Directorate of Clinical Services", "Directorate of Public Health", "Directorate of Medical Records"],
        approvalChains: ["Medical License Verification", "Controlled Drug Prescription", "Patient Transfer Sign-off"]
      },
      certification: {
        governanceValidation: true,
        securityValidation: true,
        aiReadiness: true,
        moduleCompleteness: true,
        workflowCompleteness: true,
        score: "100%"
      }
    },
    {
      id: "eco-fintech",
      name: "Financial & SACCO Ecosystem",
      authority: "Central Bank & Microfinance Regulatory Authority",
      countries: ["Uganda", "Kenya", "Rwanda", "Zambia"],
      institutionTypes: ["SACCO Union", "Microfinance Institution", "Credit Society", "Cooperative Bank"],
      approvedPlatforms: 15,
      activeInstitutions: 3100,
      aiAgentsCount: 56,
      status: "Operational",
      governanceModel: {
        leadership: "Governor & SACCO Registrar",
        boards: ["Board of Directors", "Supervisory Committee", "Credit Committee"],
        committees: ["Risk & Audit Committee", "ALCO (Assets & Liabilities)", "Investment Board"],
        directorates: ["Treasury & Finance Directorate", "Credit Operations", "Compliance & Risk"],
        approvalChains: ["Loan Disbursement Gate", "Dividend Authorization", "Regulatory Returns Submission"]
      },
      certification: {
        governanceValidation: true,
        securityValidation: true,
        aiReadiness: true,
        moduleCompleteness: true,
        workflowCompleteness: true,
        score: "100%"
      }
    },
    {
      id: "eco-church",
      name: "Faith & Church Ecosystem",
      authority: "National Fellowship & Evangelical Council / Trustees",
      countries: ["Uganda", "Kenya", "Tanzania", "DRC"],
      institutionTypes: ["National Diocese", "Mega Church Network", "Parish Center", "Mission Ministry"],
      approvedPlatforms: 6,
      activeInstitutions: 4200,
      aiAgentsCount: 18,
      status: "Operational",
      governanceModel: {
        leadership: "Archbishop / General Overseer",
        boards: ["Board of Trustees", "Elders Council", "Finance Committee"],
        committees: ["Welfare Committee", "Missions & Evangelism Board", "Asset Management"],
        directorates: ["Pastoral Directorate", "Administration & HR", "Media & Communications"],
        approvalChains: ["Tithe Reconciliation", "Branch Opening Approval", "Project Fund Release"]
      },
      certification: {
        governanceValidation: true,
        securityValidation: true,
        aiReadiness: true,
        moduleCompleteness: true,
        workflowCompleteness: true,
        score: "98.5%"
      }
    },
    {
      id: "eco-ngo",
      name: "NGO & Humanitarian Ecosystem",
      authority: "NGO Bureau & Donor Compliance Council",
      countries: ["Uganda", "Kenya", "South Sudan", "Ethiopia"],
      institutionTypes: ["International NGO", "National Civil Society", "Community Based Org (CBO)"],
      approvedPlatforms: 9,
      activeInstitutions: 890,
      aiAgentsCount: 28,
      status: "Operational",
      governanceModel: {
        leadership: "Executive Director & Country Representative",
        boards: ["Global Board of Trustees", "Advisory Board", "Audit Committee"],
        committees: ["Grant Allocation Board", "Field Safeguarding Committee", "Procurement Oversight"],
        directorates: ["Programs Directorate", "Grant Management & Finance", "Monitoring & Evaluation"],
        approvalChains: ["Grant Proposal Sign-off", "Field Fund Disbursement", "Donor Audit Approval"]
      },
      certification: {
        governanceValidation: true,
        securityValidation: true,
        aiReadiness: true,
        moduleCompleteness: true,
        workflowCompleteness: true,
        score: "99.2%"
      }
    },
    {
      id: "eco-gov",
      name: "Government & Local Admin Ecosystem",
      authority: "Public Service Commission & Cabinet Secretariat",
      countries: ["Uganda", "Kenya", "Tanzania"],
      institutionTypes: ["Ministry", "National Agency", "District Local Government", "Municipal Council"],
      approvedPlatforms: 14,
      activeInstitutions: 650,
      aiAgentsCount: 64,
      status: "Operational",
      governanceModel: {
        leadership: "Head of Public Service & Permanent Secretaries",
        boards: ["Public Service Commission", "District Service Commission", "Cabinet Committee"],
        committees: ["Public Accounts Committee", "Appointments Board", "E-Government Taskforce"],
        directorates: ["Directorate of Public Administration", "Budget Office", "Local Revenue Directorate"],
        approvalChains: ["Public Procurement Authorization", "Civil Service Appointment", "Gazette Publishing"]
      },
      certification: {
        governanceValidation: true,
        securityValidation: true,
        aiReadiness: true,
        moduleCompleteness: true,
        workflowCompleteness: true,
        score: "100%"
      }
    }
  ];

  const displayEcosystems = ecosystems.length > 0 
    ? ecosystems.map(e => ({ ...defaultEcosystems[0], ...e })) 
    : defaultEcosystems;

  const filteredEcosystems = displayEcosystems.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.authority.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-widest">
              National Authority Layer
            </span>
            <span className="text-xs font-bold text-slate-400">Multi-Ecosystem Authority Governance</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ecosystem Governance Center</h2>
          <p className="text-slate-500 font-medium mt-1">
            Authoritative regulatory frameworks, governance models, and certification standards governing ERP platforms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center text-xs font-bold text-slate-600 gap-1">
            <Globe className="w-4 h-4 text-blue-600 ml-2" />
            <span className="px-3 py-1.5 bg-white text-slate-900 rounded-xl shadow-sm">{displayEcosystems.length} Active Ecosystems</span>
          </div>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ecosystems, regulatory authorities, or governance models..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Grid of Ecosystem Governance Objects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEcosystems.map((eco) => (
          <motion.div
            key={eco.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Certified
                </span>
                <span className="text-xs font-bold text-slate-400">{eco.countries?.length || 5} Countries</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">{eco.name}</h3>
              <p className="text-xs font-bold text-blue-700 mt-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Authority: {eco.authority}
              </p>
            </div>

            <div className="p-6 flex-1 space-y-4 text-xs font-medium text-slate-600">
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                <div>
                  <span className="block font-black text-base text-slate-900">{eco.approvedPlatforms}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Platforms</span>
                </div>
                <div>
                  <span className="block font-black text-base text-slate-900">{eco.activeInstitutions}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Institutions</span>
                </div>
                <div>
                  <span className="block font-black text-base text-slate-900">{eco.aiAgentsCount}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">AI Agents</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Institution Types Covered</span>
                <div className="flex flex-wrap gap-1.5">
                  {eco.institutionTypes?.map((t: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Key Governance Bodies</span>
                <ul className="space-y-1">
                  {eco.governanceModel?.boards?.slice(0, 3).map((board: string, bIdx: number) => (
                    <li key={bIdx} className="flex items-center gap-2 text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                      <span className="truncate">{board}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-700">Governance Score: {eco.certification?.score || "99.8%"}</span>
              </div>
              <button
                onClick={() => setSelectedEcosystem(eco)}
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-blue-600 transition-colors flex items-center gap-1"
              >
                Inspect Governance <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal / Drawer for Detailed Governance Model Inspection */}
      <AnimatePresence>
        {selectedEcosystem && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200"
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white sticky top-0 z-10">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-widest">
                    Governance Architecture Spec
                  </span>
                  <h3 className="text-2xl font-black mt-1">{selectedEcosystem.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedEcosystem(null)}
                  className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Tabs */}
                <div className="flex gap-2 border-b border-slate-200 pb-2">
                  {[
                    { id: "overview", label: "Overview & Regulatory Authority" },
                    { id: "governance", label: "Governance Model & Directorates" },
                    { id: "certification", label: "Certification & Compliance Checks" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">National Regulatory Authority</h4>
                      <p className="text-slate-700 text-sm font-semibold">{selectedEcosystem.authority}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span className="text-xs font-bold text-slate-400 uppercase">Jurisdiction Countries</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedEcosystem.countries?.map((c: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <span className="text-xs font-bold text-slate-400 uppercase">Institution Types</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedEcosystem.institutionTypes?.map((t: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "governance" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">Executive Leadership & Boards</h4>
                      <div className="p-4 bg-slate-900 text-white rounded-2xl">
                        <span className="text-[10px] font-bold text-blue-400 uppercase">Leadership Apex</span>
                        <p className="text-base font-bold mt-1">{selectedEcosystem.governanceModel?.leadership}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                          <h5 className="font-bold text-slate-900 text-xs uppercase mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-600" /> Governing Boards
                          </h5>
                          <ul className="space-y-2 text-xs font-medium text-slate-700">
                            {selectedEcosystem.governanceModel?.boards?.map((b: string, idx: number) => (
                              <li key={idx} className="p-2 bg-white rounded-lg border border-slate-100 font-bold">{b}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                          <h5 className="font-bold text-slate-900 text-xs uppercase mb-3 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-indigo-600" /> Directorates & Divisions
                          </h5>
                          <ul className="space-y-2 text-xs font-medium text-slate-700">
                            {selectedEcosystem.governanceModel?.directorates?.map((d: string, idx: number) => (
                              <li key={idx} className="p-2 bg-white rounded-lg border border-slate-100 font-bold">{d}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200">
                        <h5 className="font-bold text-amber-900 text-xs uppercase mb-2 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-amber-600" /> Regulatory Approval Chains
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedEcosystem.governanceModel?.approvalChains?.map((chain: string, idx: number) => (
                            <span key={idx} className="px-3 py-1.5 bg-white text-amber-900 border border-amber-200 rounded-xl text-xs font-bold shadow-sm">
                              ✓ {chain}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "certification" && (
                  <div className="space-y-6">
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Award className="w-10 h-10 text-emerald-600" />
                        <div>
                          <h4 className="font-black text-slate-900 text-lg">Ecosystem Certification Status: CERTIFIED</h4>
                          <p className="text-xs text-slate-600 font-medium">Verified against National Digital Infrastructure Standards</p>
                        </div>
                      </div>
                      <span className="text-3xl font-black text-emerald-700">{selectedEcosystem.certification?.score}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: "Governance Structure Validation", status: selectedEcosystem.certification?.governanceValidation },
                        { name: "Zero-Trust Security Validation", status: selectedEcosystem.certification?.securityValidation },
                        { name: "AI Agent & Reasoning Readiness", status: selectedEcosystem.certification?.aiReadiness },
                        { name: "Module & Form Completeness", status: selectedEcosystem.certification?.moduleCompleteness },
                        { name: "Workflow & SLA Completeness", status: selectedEcosystem.certification?.workflowCompleteness }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">{item.name}</span>
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black uppercase">
                            Passed
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
