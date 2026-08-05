import React from "react";
import { BarChart3, TrendingUp, DollarSign, Users, Award, ShieldCheck } from "lucide-react";

export interface KPICard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  subtitle: string;
}

export interface AnalyticsPanelProps {
  title?: string;
  subtitle?: string;
  kpis?: KPICard[];
}

const DEFAULT_KPIS: KPICard[] = [
  { label: "FAAP Revenue Collected", value: "$1,842,500.00", change: "+14.2%", trend: "up", subtitle: "Double-entry verified" },
  { label: "Enrolled Students (SIS)", value: "14,820", change: "+8.5%", trend: "up", subtitle: "National SIS Registry" },
  { label: "Active Faculty & Staff", value: "1,240", change: "+2.1%", trend: "up", subtitle: "HR Payroll Active" },
  { label: "FAAP Treasury Parity", value: "$0.00 Offset", change: "100%", trend: "neutral", subtitle: "Zero Discrepancy" }
];

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  title = "Institutional Intelligence & Analytics",
  subtitle = "Segregated analytical engine isolated from transactional mutation pipelines.",
  kpis = DEFAULT_KPIS,
}) => {
  return (
    <div id="analytics-panel" className="space-y-5">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-1">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-teal-600" />
          <h2 className="font-extrabold text-base text-slate-900 tracking-tight">{title}</h2>
        </div>
        <p className="text-xs text-slate-600">{subtitle}</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase">{kpi.label}</div>
            <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">{kpi.value}</div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-emerald-700 font-bold font-mono">{kpi.change}</span>
              <span className="text-slate-500">{kpi.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytical Trends & Visual Bar Graphs Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Revenue & Fee Settlement Trends */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Monthly FAAP Fee Collection vs Budget Target
            </h3>
            <span className="text-[10px] font-mono text-teal-700 font-bold">FY2026/2027</span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {[
              { month: "Jan", amount: 85, label: "$320k" },
              { month: "Feb", amount: 92, label: "$390k" },
              { month: "Mar", amount: 78, label: "$280k" },
              { month: "Apr", amount: 96, label: "$410k" },
              { month: "May", amount: 100, label: "$450k" }
            ].map((bar) => (
              <div key={bar.month} className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-700">
                  <span>{bar.month}</span>
                  <span className="font-bold">{bar.label}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 rounded-full transition-all duration-300"
                    style={{ width: `${bar.amount}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Enrollment & Departmental Performance */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Faculty Enrollment Distribution (SIS)
            </h3>
            <span className="text-[10px] font-mono text-purple-700 font-bold">Total: 14,820 Students</span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {[
              { faculty: "Faculty of Engineering & Technology", count: "4,200", pct: 28, color: "bg-teal-600" },
              { faculty: "School of Medicine & Health Sciences", count: "3,100", pct: 21, color: "bg-blue-600" },
              { faculty: "College of Business & FAAP Finance", count: "4,500", pct: 30, color: "bg-purple-600" },
              { faculty: "Faculty of Science & Agriculture", count: "3,020", pct: 21, color: "bg-emerald-600" }
            ].map((item) => (
              <div key={item.faculty} className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-700">
                  <span className="font-semibold truncate">{item.faculty}</span>
                  <span className="font-mono font-bold shrink-0">{item.count}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
