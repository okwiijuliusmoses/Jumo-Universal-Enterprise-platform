import React, { useState } from 'react';
import { 
  Building2, Users, DollarSign, TrendingUp, ShieldAlert, FileCheck, 
  CheckCircle2, Bot, Plus, BarChart3, Clock, MapPin, Sparkles, 
  Scale, FileText, AlertTriangle, ShieldCheck, Heart, UserCheck, RefreshCw, Send
} from 'lucide-react';

interface ParishPerformance {
  id: string;
  name: string;
  archdeaconry: string;
  vicarName: string;
  activeSouls: number;
  financialYearBudget: number;
  financialPerformance: number; // percentage
  assetAuditStatus: 'VERIFIED' | 'PENDING' | 'OVERDUE';
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  complianceScore: number; // percentage
  aiOperationalSummary: string;
}

interface DiocesanProject {
  id: string;
  title: string;
  category: 'Church Plant' | 'School Construction' | 'Agricultural Farm' | 'Hospital Expansion';
  parishLocation: string;
  budgetAllocated: number;
  spentToDate: number;
  progressPercentage: number;
  startDate: string;
  status: 'PLANNING' | 'ACTIVE_BUILDING' | 'HALTED' | 'COMPLETED';
}

interface HumanResourceProfile {
  id: string;
  name: string;
  role: 'Vicar' | 'Archdeacon' | 'Diocesan Secretary' | 'Treasurer' | 'Education Officer';
  assignedParish: string;
  salaryTier: string;
  pensionEnrolled: boolean;
  performanceScore: number;
}

export const DioceseOperationsCenter: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'parishes' | 'projects' | 'compliance' | 'hr'>('dashboard');
  const [selectedParishId, setSelectedParishId] = useState<string>('PAR-001');

  // Diocesan general telemetry
  const diocesanKpis = {
    totalParishes: 24,
    totalClergy: 42,
    activeCongregation: 482900,
    annualRevenue: 4290000,
    projectCompletedCount: 18,
    complianceStatus: 'EXCELLENT',
    provincialReportingStatus: 'SUBMITTED_AND_SIGNED'
  };

  // State arrays
  const [parishes, setParishes] = useState<ParishPerformance[]>([
    {
      id: 'PAR-001',
      name: 'St. Paul Cathedral Parish, Namirembe',
      archdeaconry: 'Cathedral Archdeaconry',
      vicarName: 'Very Rev. Canon Jonathan Kisawuzi',
      activeSouls: 14820,
      financialYearBudget: 482900,
      financialPerformance: 104,
      assetAuditStatus: 'VERIFIED',
      riskRating: 'LOW',
      complianceScore: 98,
      aiOperationalSummary: 'Operational excellence. High financial compliance. All assets cataloged and hashed on AEGIS.'
    },
    {
      id: 'PAR-002',
      name: 'St. Jude Mission Outpost, Parish Mission',
      archdeaconry: 'Urban Mission Archdeaconry',
      vicarName: 'Rev. Emmanuel Mukasa',
      activeSouls: 1250,
      financialYearBudget: 45000,
      financialPerformance: 98,
      assetAuditStatus: 'VERIFIED',
      riskRating: 'LOW',
      complianceScore: 95,
      aiOperationalSummary: 'Strong community engagement. Minor budget variance under investigation. Asset audit successful.'
    },
    {
      id: 'PAR-003',
      name: 'Soroti Mission Chapter',
      archdeaconry: 'East-Nile Archdeaconry',
      vicarName: 'Rev. Samuel Okello',
      activeSouls: 4500,
      financialYearBudget: 120000,
      financialPerformance: 74,
      assetAuditStatus: 'PENDING',
      riskRating: 'MEDIUM',
      complianceScore: 82,
      aiOperationalSummary: 'Drought impacting local tithing collections. Recommended immediate grant allocation from Diocesan Disaster Relief.'
    },
    {
      id: 'PAR-004',
      name: 'Mbarara Hill Outpost',
      archdeaconry: 'Western Archdeaconry',
      vicarName: 'Rev. Amos Kabareebe',
      activeSouls: 3200,
      financialYearBudget: 95000,
      financialPerformance: 102,
      assetAuditStatus: 'OVERDUE',
      riskRating: 'HIGH',
      complianceScore: 71,
      aiOperationalSummary: 'High asset discrepancy: Unregistered parish land boundaries. Action item: Deploy Diocesan surveyor immediately.'
    }
  ]);

  const [projects, setProjects] = useState<DiocesanProject[]>([
    {
      id: 'PRJ-101',
      title: 'Cathedral Roof & Dome Restorations',
      category: 'Hospital Expansion', // or Heritage preservation
      parishLocation: 'Namirembe Cathedral',
      budgetAllocated: 150000,
      spentToDate: 124000,
      progressPercentage: 85,
      startDate: '2026-01-10',
      status: 'ACTIVE_BUILDING'
    },
    {
      id: 'PRJ-102',
      title: 'St. Jude Health Center Clinic Block B',
      category: 'Hospital Expansion',
      parishLocation: 'St. Jude Mission Outpost',
      budgetAllocated: 75000,
      spentToDate: 75000,
      progressPercentage: 100,
      startDate: '2025-08-15',
      status: 'COMPLETED'
    },
    {
      id: 'PRJ-103',
      title: 'Soroti Vocational School Foundation',
      category: 'School Construction',
      parishLocation: 'Soroti Mission Chapter',
      budgetAllocated: 200000,
      spentToDate: 45000,
      progressPercentage: 22,
      startDate: '2026-04-01',
      status: 'ACTIVE_BUILDING'
    },
    {
      id: 'PRJ-104',
      title: 'Western Province Coffee Cooperative farm',
      category: 'Agricultural Farm',
      parishLocation: 'Mbarara Hill Outpost',
      budgetAllocated: 40000,
      spentToDate: 5000,
      progressPercentage: 10,
      startDate: '2026-06-20',
      status: 'PLANNING'
    }
  ]);

  const [hrs, setHrs] = useState<HumanResourceProfile[]>([
    { id: 'HR-001', name: 'Very Rev. Canon Jonathan Kisawuzi', role: 'Archdeacon', assignedParish: 'St. Paul Cathedral', salaryTier: 'Grade A', pensionEnrolled: true, performanceScore: 98 },
    { id: 'HR-002', name: 'Rev. Emmanuel Mukasa', role: 'Vicar', assignedParish: 'St. Jude Outpost', salaryTier: 'Grade B', pensionEnrolled: true, performanceScore: 92 },
    { id: 'HR-003', name: 'Rev. Samuel Okello', role: 'Vicar', assignedParish: 'Soroti Chapter', salaryTier: 'Grade B', pensionEnrolled: true, performanceScore: 85 },
    { id: 'HR-004', name: 'Sister Grace Kiconco', role: 'Diocesan Secretary', assignedParish: 'Bishop Headquarters', salaryTier: 'Grade A', pensionEnrolled: true, performanceScore: 96 }
  ]);

  const [aiInsightResponse, setAiInsightResponse] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState<boolean>(false);

  const triggerDiocesanAiAudit = () => {
    setLoadingInsight(true);
    setTimeout(() => {
      setLoadingInsight(false);
      setAiInsightResponse(`⛪ [JUMO Ecclesiastical AI Auditor - Diocese Hub]: Scan complete. 
1. Financial Risk Warning: Soroti Mission Chapter is showing Q2 budget shortfall due to regional drought (74% budget performance). Recommended allocation: $15,000.00 from Bishop's Contingency Treasury.
2. Compliance Breach: Mbarara Hill Outpost is 45 days overdue on the Land Deed Survey boundary audit. Status elevated to HIGH RISK.
3. Success Metrics: St. Paul Cathedral Roof Reconstruction is 85% complete and under-budget by $6,000.00. Asset register fully reconciled on AEGIS ledger.`);
    }, 1000);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Project successfully proposed to the Diocesan Development Board.');
  };

  const selectedParish = parishes.find(p => p.id === selectedParishId) || parishes[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-slate-800">
      {/* Portal Header */}
      <div className="bg-white text-white p-5 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 font-mono">DIOCESE LEVEL OPERATIONS CENTER</span>
          <h2 className="text-xl font-bold flex items-center gap-2 mt-1">
            <Building2 className="w-5 h-5 text-purple-400" />
            Namirembe Diocesan Headquarters Hub
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Unified dashboard coordinating 24 parishes, clergy performance, sacred asset tracking, capital projects, and civil audit compliance.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={triggerDiocesanAiAudit}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded shadow transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#0078D4]" />
            Diocesan AI Operations Insight
          </button>
        </div>
      </div>

      {/* Operations sub-tab navigator */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
        {[
          { id: 'dashboard', label: 'Diocesan Dashboard', icon: BarChart3 },
          { id: 'parishes', label: 'Parish Performance', icon: Users },
          { id: 'projects', label: 'Project Tracking & Development', icon: Clock },
          { id: 'compliance', label: 'Risk & Compliance Console', icon: ShieldCheck },
          { id: 'hr', label: 'Clergy Human Resources', icon: UserCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`py-3 px-5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
                isActive 
                  ? 'border-purple-600 text-purple-700 bg-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4 text-purple-600" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="p-6">
        {/* Subtab 1: Dashboard */}
        {activeSubTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Parish Network</span>
                  <strong className="text-2xl font-bold text-slate-900 block mt-1">{diocesanKpis.totalParishes} Parishes</strong>
                  <span className="text-xs text-slate-500 block mt-1">20 Active, 4 Outposts</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Diocesan Revenue</span>
                  <strong className="text-2xl font-bold text-emerald-700 block mt-1">${diocesanKpis.annualRevenue.toLocaleString()}.00</strong>
                  <span className="text-xs text-emerald-600 font-medium block mt-1">1.5% Clearing Fee Enforced</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Active Membership</span>
                  <strong className="text-2xl font-bold text-slate-900 block mt-1">{diocesanKpis.activeCongregation.toLocaleString()} Souls</strong>
                  <span className="text-xs text-blue-600 font-semibold block mt-1">Census Reconciled</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Civil Compliance</span>
                  <strong className="text-2xl font-bold text-emerald-600 block mt-1">EXCELLENT</strong>
                  <span className="text-xs text-slate-500 block mt-1">Provincial Synod Certified</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* AI response box */}
            {aiInsightResponse && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-purple-700" />
                  Diocesan AI Operational Insights Report
                </h4>
                <p className="text-xs text-purple-950 font-mono leading-relaxed whitespace-pre-line">{aiInsightResponse}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial oversight block */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                  Financial Oversight & FAAP Tithe Clearing Ledger
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-slate-800 block">JUMO Master Treasury Clearing Account</strong>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">Direct settlement routing to Central Bank</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">$1,452,900.00</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-slate-800 block">Accumulated 1.5% Settlement Clearance Fee Revenue</strong>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">Authorized debit on all faith-based transactions</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-700">+$21,793.50</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-slate-800 block">Clergy Pension & Medical Trust Pool</strong>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">Guaranteed welfare reserves for licensed clergy</span>
                    </div>
                    <span className="font-mono font-bold text-slate-950">$850,000.00</span>
                  </div>
                </div>
              </div>

              {/* Development planning overview */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-600" />
                  Development Planning & Land Registry Coordinates
                </h3>
                <div className="space-y-3">
                  <p className="text-xs text-slate-600">The Diocesan Planning Council enforces mapping controls on all church properties to avoid encroachment risks.</p>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex justify-between items-start gap-4">
                    <div>
                      <strong className="text-slate-800 block">Parcel #NAM-PL-004</strong>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Cathedral Sanctuary Core Ground</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px] font-mono shrink-0">
                      BOUNDARIES_SECURED
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex justify-between items-start gap-4">
                    <div>
                      <strong className="text-slate-800 block">Parcel Soroti Ag-Plot 14</strong>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Provincial agricultural tea plantation land</span>
                    </div>
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded font-bold text-[10px] font-mono shrink-0">
                      SURVEY_SCHEDULED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subtab 2: Parishes performance */}
        {activeSubTab === 'parishes' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Parish list */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
                <Building2 className="w-4 h-4 text-purple-600" />
                Select Parish Node
              </h3>
              <div className="space-y-2">
                {parishes.map(par => (
                  <button
                    key={par.id}
                    onClick={() => setSelectedParishId(par.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all text-xs flex flex-col justify-between ${
                      selectedParishId === par.id 
                        ? 'border-purple-500 bg-purple-50/50 shadow-sm' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <strong className="text-slate-900 font-bold">{par.name}</strong>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        par.riskRating === 'LOW' ? 'bg-emerald-100 text-emerald-800' : par.riskRating === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {par.riskRating} RISK
                      </span>
                    </div>
                    <span className="text-slate-500 mt-1 block font-medium">Vicar: {par.vicarName}</span>
                    <span className="text-slate-600 mt-0.5 block text-[10px]">Budget: ${par.financialYearBudget.toLocaleString()}.00</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Performance detailed view */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
              <div className="border-b pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    Parish Performance Audit scorecard
                  </h3>
                  <p className="text-xs text-slate-500">Real-time telemetry reports directly synced to provincial chancellory.</p>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono font-bold text-xs">
                  {selectedParish.id}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block">Active Souls</span>
                  <strong className="text-slate-900 text-sm font-bold block mt-0.5">{selectedParish.activeSouls.toLocaleString()} Members</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block">Annual Budget Limit</span>
                  <strong className="text-slate-900 text-sm font-bold block mt-0.5">${selectedParish.financialYearBudget.toLocaleString()}.00</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block">Budget Performance</span>
                  <strong className={`text-sm font-bold block mt-0.5 ${selectedParish.financialPerformance >= 100 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {selectedParish.financialPerformance}%
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block">Civil Compliance score</span>
                  <strong className="text-slate-900 text-sm font-bold block mt-0.5 text-purple-800">{selectedParish.complianceScore}% Approved</strong>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold uppercase tracking-wide">
                  <Bot className="w-4 h-4 text-purple-600" />
                  AI Parish Operational Insight Summary
                </div>
                <p className="text-slate-700 font-mono leading-relaxed leading-normal">{selectedParish.aiOperationalSummary}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Governance & Asset Auditing status</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border flex justify-between items-center">
                    <span>AEGIS Real Estate Registry:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedParish.assetAuditStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedParish.assetAuditStatus}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border flex justify-between items-center">
                    <span>Clergy Ordinal Roster Check:</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Reconciled
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button 
                  onClick={() => alert(`Initiated micro-audit for ${selectedParish.name}. Dispatching surveyors.`)}
                  className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-100 rounded text-xs text-slate-700 font-semibold"
                >
                  Trigger Boundary Survey
                </button>
                <button 
                  onClick={() => {
                    setParishes(parishes.map(p => p.id === selectedParish.id ? { ...p, complianceScore: 100, assetAuditStatus: 'VERIFIED' } : p));
                    alert(`Diocesan Chancellor Dual-signature applied. Compliance validated at 100% for: ${selectedParish.name}`);
                  }}
                  className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-xs transition-all"
                >
                  Certify Compliance
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subtab 3: Projects */}
        {activeSubTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create Project */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
                <Plus className="w-4 h-4 text-purple-600" />
                Propose Capital Project
              </h3>
              <form onSubmit={handleCreateProject} className="space-y-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Project Title / Goal</label>
                  <input
                    type="text"
                    placeholder="e.g. Health Clinic solar block installation"
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Category Type</label>
                  <select className="w-full p-2 rounded border border-slate-300 bg-white">
                    <option value="Church Plant">Church Plant Outpost</option>
                    <option value="School Construction">Theological School Construction</option>
                    <option value="Agricultural Farm">Diocesan Cooperative Farm</option>
                    <option value="Hospital Expansion">Health Center & Hospital Expansion</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Parish Location</label>
                    <input
                      type="text"
                      placeholder="Parish Location"
                      className="w-full p-2 rounded border border-slate-300 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Budget Allocated ($)</label>
                    <input
                      type="number"
                      placeholder="e.g. 45000"
                      className="w-full p-2 rounded border border-slate-300 bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Development Phase Goals</label>
                  <textarea
                    placeholder="Provide description of capital milestones..."
                    className="w-full p-2 rounded border border-slate-300 bg-white h-20 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
                >
                  Propose Development Project
                </button>
              </form>
            </div>

            {/* Active projects */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2 text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-600" />
                  Active Diocesan Development Projects & Progress
                </h3>
                <p className="text-xs text-slate-500">Track current capital expansion programs sponsored by provincial tithe buffers.</p>
              </div>

              <div className="space-y-4">
                {projects.map(proj => (
                  <div key={proj.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex justify-between items-start border-b pb-2">
                      <div>
                        <strong className="text-sm font-bold text-slate-900">{proj.title}</strong>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Location: {proj.parishLocation} • Category: {proj.category}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        proj.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : proj.status === 'ACTIVE_BUILDING' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {proj.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] text-slate-500">
                        <span>Milestone Progress: <strong>{proj.progressPercentage}%</strong></span>
                        <span>Spent to Date: <strong>${proj.spentToDate.toLocaleString()} / ${proj.budgetAllocated.toLocaleString()}</strong></span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full transition-all duration-500" style={{ width: `${proj.progressPercentage}%` }} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-[10px] text-slate-500">Proposed On: <strong className="font-mono text-slate-700">{proj.startDate}</strong></span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setProjects(projects.map(p => p.id === proj.id ? { ...p, progressPercentage: Math.min(100, p.progressPercentage + 10) } : p));
                            alert(`Milestone progress updated for: ${proj.title}`);
                          }}
                          className="px-2.5 py-1 bg-white border hover:bg-slate-100 text-slate-700 rounded font-semibold text-[10px]"
                        >
                          Log Progress Update
                        </button>
                        <button 
                          onClick={() => alert(`Opening technical engineering drawings & contractor contract ledger for ${proj.title}`)}
                          className="px-2.5 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded font-bold text-[10px]"
                        >
                          📄 Architectural Specs
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subtab 4: Compliance */}
        {activeSubTab === 'compliance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Risk monitoring scorecard */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
                  <ShieldAlert className="w-4.5 h-4.5 text-purple-600 animate-pulse" />
                  Risk Monitoring & Canon Law Audit Checklist
                </h3>
                <p className="text-xs text-slate-500 mt-1">Real-time alerts warning the bishop of operational, canonical or boundary issues.</p>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Boundary Encroachment Risk Check', status: 'LOW RISK', details: 'Namirembe plots 4 and 12 coordinates fully confirmed by state geographic ministry.', badge: 'bg-emerald-100 text-emerald-800' },
                  { title: 'Clergy Pension Payment Sync', status: 'FULLY COMPLIANT', details: 'All licensed vicars debited 10% pension savings matched by 1.5% clearings.', badge: 'bg-emerald-100 text-emerald-800' },
                  { title: 'Sacramental Records Audit', status: 'PENDING ACTION', details: 'Mbarara Hill Outpost parish registry missing baptismal registers from January.', badge: 'bg-yellow-100 text-yellow-800' },
                  { title: 'Civil NGO Regulatory Filings', status: 'CRITICAL WARNING', details: 'Soroti Chapter is missing registered trustee list updates in civil registry.', badge: 'bg-rose-100 text-rose-800 font-bold' }
                ].map((item, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <strong className="text-slate-800 font-bold">{item.title}</strong>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${item.badge}`}>{item.status}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Console */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
                    <Scale className="w-4.5 h-4.5 text-purple-600" />
                    Sovereign Compliance Console & Chancellory Gate
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Submit consolidated diocesan performance audit to the Provincial Synod Office.</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl text-purple-950 border border-purple-200 space-y-2">
                  <strong className="block text-xs uppercase font-bold text-purple-900">Bishop Dual-Signature Mandate:</strong>
                  <p className="text-[11px] leading-relaxed">
                    By submitting the Diocesan performance log, you certify under the JUMO UEOS ecclesiastical covenant that all active souls, land deeds, coffee farm investments, and clergy pension allocations are audited, matched, and reconciled against the AEGIS ledger without discrepancy.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span>Provincial Report Status:</span>
                    <strong className="text-emerald-700">SUBMITTED & DIGITALLY MARKED</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Accountability Seal:</span>
                    <strong className="font-mono text-slate-500 text-[10px]">SHA256:8f41e9a2...</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex flex-col gap-2">
                <button
                  onClick={() => alert('Consolidated report successfully exported as cryptographically watermarked PDF and logged to Provincial Synod Secretary.')}
                  className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded shadow transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#0078D4]" /> Dispatch Report to Provincial Synod
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subtab 5: Clergy HR */}
        {activeSubTab === 'hr' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                  Diocesan Clergy Human Resource Management
                </h3>
                <p className="text-xs text-slate-500">Track assigned vicars, active salary structures, pension enrollments, and annual performance indicators.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-2.5 px-3">Clergy Officer</th>
                      <th className="py-2.5 px-3">Role Designation</th>
                      <th className="py-2.5 px-3">Parish Station</th>
                      <th className="py-2.5 px-3">Wage Tier</th>
                      <th className="py-2.5 px-3 text-center">Pension Sync</th>
                      <th className="py-2.5 px-3 text-right">Performance Rate</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                    {hrs.map(hr => (
                      <tr key={hr.id} className="hover:bg-slate-50 font-sans">
                        <td className="py-3 px-3 font-bold text-slate-900">{hr.name}</td>
                        <td className="py-3 px-3 font-semibold text-purple-700">{hr.role}</td>
                        <td className="py-3 px-3 text-slate-600">{hr.assignedParish}</td>
                        <td className="py-3 px-3 font-mono font-bold text-[11px] text-slate-900">{hr.salaryTier}</td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            ENROLLED
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-purple-900">{hr.performanceScore}%</td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => alert(`Editing operational targets and wage file for priest: ${hr.name}`)}
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] border font-semibold"
                          >
                            Edit File
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
