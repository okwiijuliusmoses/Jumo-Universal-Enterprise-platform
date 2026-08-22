import React, { useState } from 'react';
import { 
  Globe, Award, Heart, CheckCircle2, Bot, Plus, BarChart3, Clock, 
  MapPin, Sparkles, Scale, FileText, AlertTriangle, ShieldCheck, 
  DollarSign, TrendingUp, Compass, Activity, BookOpen, Send, ShieldAlert, RefreshCw
} from 'lucide-react';

interface DiocesePerformanceStats {
  id: string;
  name: string;
  presidingBishop: string;
  activeParishesCount: number;
  activeSouls: number;
  annualBudget: number;
  clearingFeesVolume: number;
  complianceRating: 'EXCELLENT' | 'ADEQUATE' | 'CRITICAL';
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  growthRate: number; // percentage
}

interface ProvincialDecree {
  id: string;
  title: string;
  category: 'Canon Law Amendment' | 'Licensing Suspension' | 'Financial Appointment' | 'Strategic Outpost Grant';
  proposedDate: string;
  status: 'PENDING_COUNCIL' | 'ACTIVE_SIGNED' | 'REJECTED';
  details: string;
}

export const ArchbishopCommandDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'province' | 'dioceses' | 'finance' | 'risk_mapping'>('province');
  const [selectedDioceseId, setSelectedDioceseId] = useState<string>('DIO-001');

  // Province-wide statistics
  const provincialStats = {
    provinceName: 'Church of Uganda, Anglican Province',
    totalDioceses: 37,
    activeSouls: 14200000,
    annualBudgetPool: 45000000,
    mpesaTransactionsReconciled: 124800,
    totalClearingFeesCollected: 675000,
    overallComplianceScore: 97.4,
    archbishopName: 'Most Rev. Stephen Kaziimba Mugalu'
  };

  const [dioceses, setDioceses] = useState<DiocesePerformanceStats[]>([
    {
      id: 'DIO-001',
      name: 'Namirembe Diocese',
      presidingBishop: 'Rt. Rev. Moses Banja',
      activeParishesCount: 24,
      activeSouls: 482900,
      annualBudget: 4290000,
      clearingFeesVolume: 64350,
      complianceRating: 'EXCELLENT',
      riskRating: 'LOW',
      growthRate: 8.4
    },
    {
      id: 'DIO-002',
      name: 'Kampala Diocese',
      presidingBishop: 'Most Rev. Stephen Kaziimba (Provincial Seat)',
      activeParishesCount: 32,
      activeSouls: 850000,
      annualBudget: 7500000,
      clearingFeesVolume: 112500,
      complianceRating: 'EXCELLENT',
      riskRating: 'LOW',
      growthRate: 11.2
    },
    {
      id: 'DIO-003',
      name: 'Soroti Diocese',
      presidingBishop: 'Rt. Rev. Kosea Odongo',
      activeParishesCount: 18,
      activeSouls: 245000,
      annualBudget: 1120000,
      clearingFeesVolume: 16800,
      complianceRating: 'ADEQUATE',
      riskRating: 'MEDIUM',
      growthRate: 4.5
    },
    {
      id: 'DIO-004',
      name: 'Ankole Diocese',
      presidingBishop: 'Rt. Rev. Fred Sheldon Mwesigwa',
      activeParishesCount: 28,
      activeSouls: 620000,
      annualBudget: 3800000,
      clearingFeesVolume: 57000,
      complianceRating: 'EXCELLENT',
      riskRating: 'LOW',
      growthRate: 9.1
    },
    {
      id: 'DIO-005',
      name: 'Northern Uganda Diocese',
      presidingBishop: 'Rt. Rev. Godfrey Loum',
      activeParishesCount: 15,
      activeSouls: 185000,
      annualBudget: 950000,
      clearingFeesVolume: 14250,
      complianceRating: 'CRITICAL',
      riskRating: 'HIGH',
      growthRate: -1.2
    }
  ]);

  const [decrees, setDecrees] = useState<ProvincialDecree[]>([
    {
      id: 'DEC-2026-001',
      title: 'Amendment to Canon 14: Automated Clergy Pension Allocation System',
      category: 'Canon Law Amendment',
      proposedDate: '2026-06-15',
      status: 'ACTIVE_SIGNED',
      details: 'Enforces automated match deduction of 10% on all licensed chancellory salaries across the 37 dioceses.'
    },
    {
      id: 'DEC-2026-002',
      title: 'Soroti Diocese Emergency Drought Grant Decree',
      category: 'Strategic Outpost Grant',
      proposedDate: '2026-07-20',
      status: 'PENDING_COUNCIL',
      details: 'Proposal to allocate $25,000.00 from Provincial Treasury Surplus to subsidize catechist salaries in Karamoja borders.'
    },
    {
      id: 'DEC-2026-003',
      title: 'Suspension of Land Registration Rights for Unmapped Outposts',
      category: 'Licensing Suspension',
      proposedDate: '2026-07-22',
      status: 'PENDING_COUNCIL',
      details: 'Temporarily freezes procurement authorization for dioceses that fail land deed audits.'
    }
  ]);

  const [aiProvincialResponse, setAiProvincialResponse] = useState<string>('');
  const [loadingProvincial, setLoadingProvincial] = useState<boolean>(false);

  const runProvincialAiReport = () => {
    setLoadingProvincial(true);
    setTimeout(() => {
      setLoadingProvincial(false);
      setAiProvincialResponse(`👑 [Sovereign Ecclesiastical AI Strategist - Apex Province Router]: 
1. Financial Summary: Reconciled $1,420,000.00 in M-Pesa tithes province-wide this month. Total chancellorship fee revenue ($675,000.00 to date) is within 100.2% of target, perfectly stored in the JUMO Master Treasury.
2. Growth Risk Analysis: Northern Uganda Diocese is showing negative growth (-1.2%) and elevated asset audit risks. Action: Dispatched Bishop Loum's theological curriculum team with immediate grant approval support.
3. Strategic Allocation: Excellent compliance and growth in Kampala (11.2% growth) has produced a surplus. Recommend dual-signing Decree DEC-2026-002 to reallocate Kampala surplus to Soroti regional outposts.`);
    }, 1000);
  };

  const selectedDiocese = dioceses.find(d => d.id === selectedDioceseId) || dioceses[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-slate-800">
      {/* Strategic Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#0078D4] font-mono flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#0078D4] animate-spin-slow" />
            Most Rev. Archbishop Apex Command Center (AEGIS 10-W Certified)
          </span>
          <h2 className="text-xl font-bold mt-1 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0078D4]" />
            Church Province of Uganda General Assembly Hub
          </h2>
          <p className="text-xs text-slate-700 mt-1">
            Provincial Chancellory dashboard tracking 37 dioceses, 14.2M active souls, real-time double-entry clearing pools, and strategic planning decrees.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={runProvincialAiReport}
            className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs rounded shadow transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
            AI Provincial Strategic Plan
          </button>
        </div>
      </div>

      {/* Strategic subtab switcher */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
        {[
          { id: 'province', label: 'Province Strategic Stats', icon: Globe },
          { id: 'dioceses', label: 'Diocese Performance Matrices', icon: Compass },
          { id: 'finance', label: 'Master Chancellory Clearing Pool', icon: DollarSign },
          { id: 'risk_mapping', label: 'Provincial Decrees & Risk Mapping', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`py-3 px-5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
                isActive 
                  ? 'border-cyan-500 text-cyan-700 bg-white font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4 text-cyan-500" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="p-6">
        {/* Tab 1: Province Strategic Stats */}
        {activeSubTab === 'province' && (
          <div className="space-y-6">
            {/* KPI statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Total Dioceses Under See</span>
                <strong className="text-2xl font-bold text-slate-900 block mt-1">{provincialStats.totalDioceses} Dioceses</strong>
                <span className="text-xs text-slate-500 block mt-1">Namirembe, Soroti, Ankole, Gulu, Goli</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Reconciled Province Souls</span>
                <strong className="text-2xl font-bold text-slate-900 block mt-1">{(provincialStats.activeSouls / 1000000).toFixed(1)}M Souls</strong>
                <span className="text-xs text-cyan-600 font-semibold block mt-1">100% Census Verified</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Provincial Budget Pool</span>
                <strong className="text-2xl font-bold text-slate-900 block mt-1">${(provincialStats.annualBudgetPool / 1000000).toFixed(1)}M USD</strong>
                <span className="text-xs text-slate-500 block mt-1">Allocated across education, agriculture & mission</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">1.5% Clearings Pool</span>
                <strong className="text-2xl font-bold text-emerald-700 block mt-1">${provincialStats.totalClearingFeesCollected.toLocaleString()}</strong>
                <span className="text-xs text-emerald-600 font-semibold block mt-1">Stored in JUMO Treasury</span>
              </div>
            </div>

            {/* AI response report */}
            {aiProvincialResponse && (
              <div className="p-4 bg-cyan-50/50 border border-cyan-200 rounded-xl space-y-2 text-xs">
                <h4 className="text-xs font-bold text-cyan-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-cyan-700" />
                  Archbishop AI Strategic Analysis Output
                </h4>
                <p className="text-cyan-950 font-mono leading-relaxed whitespace-pre-line">{aiProvincialResponse}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
              {/* Province statistics charts */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-cyan-500" />
                  Membership Growth & National Census Trends
                </h3>
                <p className="text-slate-600">Historical demographic tracking reconciled across regional chancellories via biometric mobile census syncing.</p>
                <div className="space-y-2.5 pt-2">
                  {[
                    { cohort: 'Youth (13-24)', percentage: 48, count: '6.8M Souls' },
                    { cohort: 'Mothers Union & Guilds', percentage: 24, count: '3.4M Souls' },
                    { cohort: 'Sunday Scholars', percentage: 18, count: '2.5M Souls' },
                    { cohort: 'Clergy & Licensed Ministers', percentage: 10, count: '1.4M Souls' }
                  ].map((cohort, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-slate-800">{cohort.cohort}</span>
                        <span className="font-mono text-slate-500">{cohort.percentage}% ({cohort.count})</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full transition-all" style={{ width: `${cohort.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synod Overview */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-cyan-500" />
                  Provincial Synod Council & Canon Law Status
                </h3>
                <p className="text-slate-600">The Synod Council serves as the supreme governance body of the Province. All amendments require dual-signature authorization.</p>
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-lg border flex justify-between items-center">
                    <div>
                      <strong className="text-slate-800">Synod Constitution Gazette</strong>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Updated for double-entry tithing validation</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[9px] rounded font-mono">
                      APPROVED
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border flex justify-between items-center">
                    <div>
                      <strong className="text-slate-800">Licensed Bishop Synod Votes</strong>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Annual resolution for Karamoja agricultural subsidy</span>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold text-[9px] rounded font-mono">
                      PASSED_34_YES
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Diocese Performance Matrices */}
        {activeSubTab === 'dioceses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            {/* Diocese List */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 lg:col-span-1">
              <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-500" />
                Select Diocesan Seat
              </h3>
              <div className="space-y-2">
                {dioceses.map(dio => (
                  <button
                    key={dio.id}
                    onClick={() => setSelectedDioceseId(dio.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                      selectedDioceseId === dio.id 
                        ? 'border-cyan-500 bg-cyan-50/50 shadow-sm' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <strong className="text-slate-900 font-bold">{dio.name}</strong>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        dio.complianceRating === 'EXCELLENT' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {dio.complianceRating}
                      </span>
                    </div>
                    <span className="text-slate-500 mt-1 block">Bishop: {dio.presidingBishop}</span>
                    <span className="text-slate-600 mt-0.5 block">Active Souls: {dio.activeSouls.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Performance Detail Panel */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
              <div className="border-b pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-500" />
                    Detailed Diocese Comparative Audit
                  </h3>
                  <p className="text-xs text-slate-500">Compare tithing compliance, growth telemetry, and risk mapping.</p>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono font-bold">
                  {selectedDiocese.id}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block">Total Parishes</span>
                  <strong className="text-slate-900 block text-sm mt-0.5">{selectedDiocese.activeParishesCount} Active</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block">Active Souls</span>
                  <strong className="text-slate-900 block text-sm mt-0.5">{selectedDiocese.activeSouls.toLocaleString()}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block">Annual Budget</span>
                  <strong className="text-slate-900 block text-sm mt-0.5">${selectedDiocese.annualBudget.toLocaleString()}.00</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block">Tithe Growth Rate</span>
                  <strong className={`block text-sm mt-0.5 font-bold ${selectedDiocese.growthRate >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {selectedDiocese.growthRate >= 0 ? '↑' : '↓'} {selectedDiocese.growthRate}%
                  </strong>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-1 text-slate-900 font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-cyan-600" />
                  Canonical Risk & Property Audit Assessment
                </div>
                <p className="leading-relaxed font-mono">
                  This diocesan seat is rated <strong>{selectedDiocese.riskRating} RISK</strong>. Property and agricultural boundaries are audited at {selectedDiocese.complianceRating === 'EXCELLENT' ? '98%' : selectedDiocese.complianceRating === 'ADEQUATE' ? '82%' : '54%'} accuracy. M-Pesa 1.5% clearing fees volume registered: <strong>${selectedDiocese.clearingFeesVolume.toLocaleString()}</strong>.
                </p>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button 
                  onClick={() => alert(`Issuing strategic provincial grant of $15,000.00 directly to ${selectedDiocese.name}`)}
                  className="px-3 py-1.5 bg-slate-100 border text-slate-700 rounded font-semibold text-xs"
                >
                  Issue Provincial Outpost Grant
                </button>
                <button 
                  onClick={() => {
                    setDioceses(dioceses.map(d => d.id === selectedDiocese.id ? { ...d, complianceRating: 'EXCELLENT', riskRating: 'LOW' } : d));
                    alert(`Provincial chancellory certified compliance for: ${selectedDiocese.name}`);
                  }}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded text-xs transition-all shadow-sm"
                >
                  Override & Certify Compliance
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Master Chancellory Clearing Pool */}
        {activeSubTab === 'finance' && (
          <div className="space-y-6 text-xs">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-cyan-500" />
                  Master Treasury Ledger & M-Pesa Clearing Fee Reconciliation
                </h3>
                <p className="text-slate-500">Every transactional payment (tithing, admissions, school tuition, clinic bills) processed through the JUMO Digital Hub automatically logs a 1.5% settlement clearing fee into the Archbishop See Treasury.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border">
                  <span className="text-slate-500 uppercase font-bold tracking-wider text-[10px] block">Central Clearing Pool</span>
                  <strong className="text-xl font-bold text-slate-900 block mt-1">$1,482,900.00</strong>
                  <span className="text-[10px] text-slate-500 block mt-1">Reconciled via automated central ledger sweeps</span>
                </div>

                <div className="p-4 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200">
                  <span className="text-emerald-700 uppercase font-bold tracking-wider text-[10px] block">Provincial 1.5% Fee Volume</span>
                  <strong className="text-xl font-bold text-emerald-800 block mt-1">${provincialStats.totalClearingFeesCollected.toLocaleString()}</strong>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-1">Directly credited to Archbishop Treasury Pool</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border flex flex-col justify-between">
                  <span className="text-slate-500 uppercase font-bold tracking-wider text-[10px] block">Clearing Ledger Status</span>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold mt-1 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Reconciled & Audited
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Real-time M-Pesa & Mobile Money Settlement Logs:</h4>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {[
                    "2026-07-26 10:45:00 | [SETTLEMENT_SWEEP] | Namirembe Tithe Sweep | Vol: $42,900.00 | Chancellory Fee: $643.50 (1.5%) | Status: CLEARED",
                    "2026-07-26 10:12:00 | [SETTLEMENT_SWEEP] | Kampala Diocese Tuition | Vol: $75,000.00 | Chancellory Fee: $1,125.00 (1.5%) | Status: CLEARED",
                    "2026-07-26 09:30:00 | [SETTLEMENT_SWEEP] | Soroti Chapter Outpost | Vol: $12,000.00 | Chancellory Fee: $180.00 (1.5%) | Status: CLEARED",
                    "2026-07-26 08:15:00 | [SETTLEMENT_SWEEP] | Ankole Diocese Medical | Vol: $57,000.00 | Chancellory Fee: $855.00 (1.5%) | Status: CLEARED"
                  ].map((log, i) => (
                    <div key={i} className="p-2 bg-white text-slate-700 rounded border border-slate-200 flex justify-between items-center">
                      <span>{log}</span>
                      <span className="text-emerald-400 font-bold shrink-0 ml-4">MATCHED</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Provincial Decrees & Risk Mapping */}
        {activeSubTab === 'risk_mapping' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Decree Management */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
                  <BookOpen className="w-4 h-4 text-cyan-500" />
                  Provincial Synod Decrees & Canon Law Updates
                </h3>
                <p className="text-slate-500 mt-1">Official ecclesiastical legislation issued by the Archbishop in General Assembly.</p>
              </div>

              <div className="space-y-3">
                {decrees.map(dec => (
                  <div key={dec.id} className="p-3.5 bg-slate-50 border rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-slate-900 block font-bold">{dec.title}</strong>
                        <span className="text-[10px] text-slate-600 block mt-0.5">Category: {dec.category} • Date: {dec.proposedDate}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        dec.status === 'ACTIVE_SIGNED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {dec.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{dec.details}</p>

                    {dec.status === 'PENDING_COUNCIL' && (
                      <div className="pt-2 border-t flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setDecrees(decrees.map(d => d.id === dec.id ? { ...d, status: 'ACTIVE_SIGNED' } : d));
                            alert(`Decree "${dec.title}" successfully dual-signed with Archbishop Step-K-Mugalu cryptographic seal.`);
                          }}
                          className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded text-[10px] transition-all"
                        >
                          Dual-Sign Decree
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Risk monitoring mapping card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-500 animate-pulse" />
                  Provincial Risk Mapping & Boundary Disputes
                </h3>
                <p className="text-slate-500 mt-1">Visual compliance score map highlighting potential disputes or operational shortfalls.</p>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-950 rounded-xl space-y-2">
                <strong className="text-xs uppercase font-bold text-rose-900 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> Property Encroachment Alert (Northern See)
                </strong>
                <p className="text-[11px] leading-relaxed">
                  Provincial surveying telemetry has identified a 15-meter coordinate variance on school construct boundary plots in Gulu parish outpost. Land registry is temporarily frozen pending synod review.
                </p>
                <button 
                  onClick={() => alert("Legal chancellorship department notified. Dispatched survey mediators to Northern diocese.")}
                  className="px-3 py-1 bg-rose-600 text-white rounded text-[10px] font-bold hover:bg-rose-700"
                >
                  Deploy Legal Mediator Outpost
                </button>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border text-xs flex justify-between items-center">
                <div>
                  <strong className="text-slate-800">Total Province Boundary Verification Status:</strong>
                  <span className="text-[10px] text-slate-600 block mt-0.5">36/37 Diocesan registries perfectly synchronized</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold font-mono text-[10px]">
                  98% VERIFIED
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
