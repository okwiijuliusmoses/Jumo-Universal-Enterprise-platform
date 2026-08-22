/**
 * Phase 36 — Enterprise Intelligence, Analytics & Decision Support Platform
 * Operational Analytics, Executive Dashboards, Configurable KPI Framework, Predictive Intelligence, and Data Warehouse.
 */

import React, { useState } from 'react';
import { 
  Activity, BarChart2, TrendingUp, Cpu, Shield, Search, Plus, 
  Calendar, Download, FileText, Globe, Layers, Database, Sparkles 
} from 'lucide-react';

export const JumoIntelligencePlatformView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboards' | 'kpis' | 'predictive' | 'reports' | 'warehouse'>('dashboards');
  const [selectedRole, setSelectedRole] = useState('Platform Executive & CFO');

  const kpisList = [
    { name: 'Sovereign Treasury Liquidity Pool', value: '$482,900,000 USD', change: '+14.2%', status: 'Optimal' },
    { name: 'Active Enterprise Tenants', value: '1,420 Institutions', change: '+8.5%', status: 'Expanding' },
    { name: 'FAAP Credit Portfolio Risk Score', value: '99.4% Performing', change: '+0.8%', status: 'Secure' },
    { name: 'JUMO Cloud Uptime SLA', value: '99.998%', change: '0.0%', status: 'Operational' },
  ];

  const executiveDashboards = [
    { name: 'Government National Sovereign Dashboard', role: 'Government Leaders', metrics: 'Tax revenue, citizen registries, public service delivery' },
    { name: 'Commercial Banking & RTGS Clearing Dashboard', role: 'Bank Executives & CFOs', metrics: 'Liquidity ratios, SWIFT settlement speed, FAAP risk scores' },
    { name: 'University Campus Academic & Financial Dashboard', role: 'Vice Chancellors', metrics: 'Student enrollment, fee collections, accreditation compliance' },
    { name: 'Healthcare & Hospital Supply Chain Dashboard', role: 'Hospital Administrators', metrics: 'Patient throughput, electronic pharmacy inventory, insurance claims' },
  ];

  const reportsList = [
    { name: 'Executive Basel III & Sovereign Financial Compliance Report', type: 'Regulatory', frequency: 'Daily Scheduled', status: 'Generated' },
    { name: 'National University Accreditation & Enrollment Statistics', type: 'Academic', frequency: 'Weekly Scheduled', status: 'Generated' },
    { name: 'Ministry of Health Pharmacy Logistics & Claims Audit', type: 'Healthcare', frequency: 'Monthly Scheduled', status: 'Generated' },
    { name: 'JUMO Cloud Infrastructure Capacity & Latency Analysis', type: 'Technical', frequency: 'Real-time', status: 'Active' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-950 font-semibold uppercase tracking-wider">
            <BarChart2 className="w-4 h-4 text-blue-950" />
            <span>JUMO Intelligence & Analytics • Executive Decision Support Platform</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-950">Enterprise Intelligence, Analytics & Decision Support Platform</h1>
          <p className="text-xs text-slate-600">
            Real-time operational analytics, executive dashboards, configurable KPI frameworks, predictive AI forecasting, and centralized enterprise data warehousing.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert('Custom Executive Dashboard Builder opened')}
            className="px-4 py-2 bg-slate-50 hover:bg-blue-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Custom Dashboard</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-semibold">
        {[
          { id: 'dashboards', label: 'Executive Dashboards', icon: BarChart2 },
          { id: 'kpis', label: 'Configurable KPI Framework', icon: TrendingUp },
          { id: 'predictive', label: 'Predictive Intelligence & AI', icon: Sparkles },
          { id: 'reports', label: 'Enterprise Reporting Factory', icon: FileText },
          { id: 'warehouse', label: 'Enterprise Data Warehouse', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 flex items-center space-x-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-950 text-blue-950'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboards' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpisList.map((kpi, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{kpi.status}</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold text-[10px] rounded border border-emerald-200">
                    {kpi.change}
                  </span>
                </div>
                <div className="text-xl font-black text-blue-950">{kpi.value}</div>
                <div className="text-xs font-semibold text-slate-700">{kpi.name}</div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
            <h3 className="font-bold text-blue-950 text-base">Role-Based Executive Dashboards</h3>
            <p className="text-xs text-slate-600">Select an institutional role to instantly load authorized operational and financial telemetry.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {executiveDashboards.map((dash, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedRole(dash.role)}
                  className={`p-5 border rounded-xl cursor-pointer transition-all space-y-2 ${
                    selectedRole === dash.role ? 'border-blue-950 bg-blue-50/40 shadow-xs' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-blue-950 uppercase">{dash.role}</span>
                    <span className="text-xs font-bold text-emerald-700 font-mono">● Active</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{dash.name}</h4>
                  <p className="text-xs text-slate-600 font-mono">Tracked Metrics: {dash.metrics}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'kpis' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-950 text-base">Configurable KPI Definitions & Thresholds</h3>
              <p className="text-xs text-slate-600">Define custom formulas, threshold alerts, and frequency intervals without writing code.</p>
            </div>
            <button onClick={() => alert('New KPI definition wizard opened')} className="px-4 py-2 bg-slate-50 text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition-colors">
              Define New KPI
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Treasury Liquidity Buffer Index', 'Citizen Service Resolution Rate', 'FAAP Portfolio Default Probability'].map((kpi, i) => (
              <div key={i} className="p-5 border border-slate-200 rounded-xl space-y-3 bg-slate-50">
                <span className="text-[10px] font-mono font-bold text-blue-950 uppercase">Formula Engine v3</span>
                <h4 className="font-bold text-slate-900 text-sm">{kpi}</h4>
                <p className="text-xs text-slate-500">Automated evaluation every 60 seconds with instant email and SMS escalation triggers when threshold is breached.</p>
                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <button onClick={() => alert(`Configuring KPI: ${kpi}`)} className="text-xs font-semibold text-blue-950 hover:underline">
                    Configure Thresholds
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'predictive' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-blue-950 text-base">Predictive Intelligence & JUMO AI Forecasting</h3>
          <p className="text-xs text-slate-600">Advanced machine learning models forecasting treasury cash flow, student enrollment trends, and agricultural supply chain demand.</p>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center space-x-2 text-blue-950 font-bold text-xs font-mono">
              <Sparkles className="w-4 h-4 text-blue-950" />
              <span>JUMO AI PREDICTIVE FORECASTING MODEL — Q3/Q4 2026</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Based on historical transaction telemetry and regional macroeconomic indicators, JUMO AI predicts a 24.5% surge in commercial microfinance lending and sovereign treasury clearing volume across East Africa for the upcoming quarter.
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <button onClick={() => alert('Exporting full AI predictive report')} className="px-4 py-2 bg-slate-50 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-blue-900 transition-colors">
                Export AI Forecast Report
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-950 text-base">Enterprise Reporting Factory</h3>
              <p className="text-xs text-slate-600">Schedule operational, financial, and regulatory reports delivered via secure email or encrypted webhook.</p>
            </div>
            <button onClick={() => alert('New scheduled report builder opened')} className="px-4 py-2 bg-slate-50 text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition-colors">
              Schedule Report
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase font-mono text-[11px]">
                <tr>
                  <th className="p-4">Report Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Schedule</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reportsList.map((rep, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{rep.name}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-950 rounded font-semibold text-[11px]">
                        {rep.type}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-600">{rep.frequency}</td>
                    <td className="p-4 font-bold text-emerald-700 font-mono">{rep.status}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => alert(`Downloading report: ${rep.name}`)} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold text-xs">
                        Download PDF
                      </button>
                      <button onClick={() => alert(`Running report now: ${rep.name}`)} className="px-2.5 py-1 bg-slate-50 text-white rounded font-bold text-xs">
                        Run Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'warehouse' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-blue-950 text-base">Centralized Enterprise Data Warehouse (EDW)</h3>
          <p className="text-xs text-slate-600">Consolidated analytical storage across all applications with strict multi-tenant row-level security isolation.</p>

          <div className="p-6 bg-white text-slate-900 rounded-xl font-mono text-xs space-y-2 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-600">
              <span>EDW TELEMETRY • CLOUD ANALYTICS NODE</span>
              <span className="text-emerald-400">● SYNCED</span>
            </div>
            <div>[EDW_NODE_01] Data warehouse ingestion pipeline active. 14.8 billion rows indexed.</div>
            <div>[EDW_NODE_02] Tenant isolation verified: Zero cross-tenant data leakage detected.</div>
            <div>[EDW_NODE_03] Query latency average: 4.2ms across all executive dashboards.</div>
          </div>
        </div>
      )}
    </div>
  );
};
