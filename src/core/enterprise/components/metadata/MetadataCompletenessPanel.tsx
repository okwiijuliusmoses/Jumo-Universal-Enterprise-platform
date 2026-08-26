import React, { useState } from 'react';
import { Layers, CheckCircle2, Award, Zap, AlertTriangle, Building2, Activity, ArrowRight, ShieldCheck, FileText, Sparkles, Filter, ChevronRight, Check } from 'lucide-react';

export interface ProductCompletenessStat {
  productId: string;
  name: string;
  code: string;
  moduleCount: number;
  minFloor: number;
  moduleScore: number;
  officesCount: number;
  targetOffices: number;
  officeScore: number;
  workflowsCount: number;
  targetWorkflows: number;
  workflowScore: number;
  formsCount: number;
  aiAgentsCount: number;
  overallScore: number;
  status: 'CERTIFIED' | 'COMPLIANT' | 'NEEDS_EXPANSION';
  gapToFloor: number;
  actionItems: string[];
  categories: string[];
}

interface MetadataCompletenessPanelProps {
  products: ProductCompletenessStat[];
  onLaunchProduct?: (productId: string) => void;
  onSelectModule?: (moduleId: string) => void;
}

export const MetadataCompletenessPanel: React.FC<MetadataCompletenessPanelProps> = ({
  products = [],
  onLaunchProduct,
  onSelectModule
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const safeProducts = products || [];

  const filteredProducts = safeProducts.filter(p => {
    if (!p) return false;
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'CERTIFIED') return p.status === 'CERTIFIED';
    if (filterStatus === 'COMPLIANT') return p.status === 'COMPLIANT';
    if (filterStatus === 'NEEDS_EXPANSION') return p.status === 'NEEDS_EXPANSION';
    return true;
  });

  const averageOverallScore = Math.round(
    safeProducts.reduce((acc, p) => acc + (p?.overallScore || 0), 0) / (safeProducts.length || 1)
  );

  const totalCompliant = safeProducts.filter(p => (p?.moduleCount || 0) >= (p?.minFloor || 50)).length;

  return (
    <div className="space-y-6 text-slate-200">
      {/* Header Banner with Global Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-indigo-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Product Completeness & 50+ Module Floor Matrix
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-bold">
                {totalCompliant}/{safeProducts.length} Floor Compliant
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Real-time visualization of module implementation, office coverage, workflow readiness, and automated gap detection toward canonical 50-module floor certification.
            </p>
          </div>
        </div>

        {/* Global Score Gauge */}
        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-5 font-mono">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Average Score</div>
            <div className="text-2xl font-black text-emerald-400">{averageOverallScore}%</div>
          </div>
          <div className="h-10 w-px bg-slate-800 hidden sm:block" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Minimum Floor</div>
            <div className="text-2xl font-black text-white">50 <span className="text-xs font-normal text-slate-500">mods</span></div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 text-[11px]">Filter by Status:</span>
          {['ALL', 'CERTIFIED', 'COMPLIANT', 'NEEDS_EXPANSION'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-all font-semibold ${
                filterStatus === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {st} {st === 'ALL' ? `(${safeProducts.length})` : ''}
            </button>
          ))}
        </div>
        <div className="text-slate-400 text-[11px]">
          Showing <strong className="text-white">{filteredProducts.length}</strong> sovereign products
        </div>
      </div>

      {/* Product Completeness Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 font-mono text-xs">
        {filteredProducts.map((p) => {
          const isExpanded = expandedProduct === p.productId;
          const isFloorSatisfied = p.moduleCount >= p.minFloor;

          return (
            <div
              key={p.productId}
              className={`bg-slate-900/70 border rounded-2xl p-5 space-y-4 transition-all ${
                isFloorSatisfied
                  ? 'border-slate-800 hover:border-slate-700'
                  : 'border-amber-900/50 hover:border-amber-700/60 bg-amber-950/10'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base tracking-tight">{p.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700">
                      {p.code}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Product ID: <code className="text-slate-400">{p.productId}</code>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg flex items-center gap-1.5 ${
                      p.status === 'CERTIFIED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : p.status === 'COMPLIANT'
                        ? 'bg-blue-950 text-blue-400 border border-blue-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {isFloorSatisfied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    <span>{p.status}</span>
                  </span>
                  <div className="text-[10px] font-bold text-emerald-400">
                    {p.overallScore}% Overall Completeness
                  </div>
                </div>
              </div>

              {/* Progress Gauges Grid */}
              <div className="space-y-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                {/* 1. Module Implementation Score */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Module Implementation Floor</span>
                    </span>
                    <span className="text-slate-400 font-bold">
                      <strong className="text-white">{p.moduleCount}</strong> / {p.minFloor} min ({p.moduleScore}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        p.moduleCount >= p.minFloor ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, p.moduleScore)}%` }}
                    />
                  </div>
                </div>

                {/* 2. Office Coverage Score */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Office & Department Coverage</span>
                    </span>
                    <span className="text-slate-400 font-bold">
                      <strong className="text-white">{p.officesCount}</strong> / {p.targetOffices} ({p.officeScore}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, p.officeScore)}%` }}
                    />
                  </div>
                </div>

                {/* 3. Workflow Readiness Score */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Workflow & State Machine Status</span>
                    </span>
                    <span className="text-slate-400 font-bold">
                      <strong className="text-white">{p.workflowsCount}</strong> / {p.targetWorkflows} ({p.workflowScore}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, p.workflowScore)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Immediate Feedback Ribbon */}
              <div className="flex items-center justify-between text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-slate-400">
                <div className="flex items-center gap-2">
                  {isFloorSatisfied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>
                    {isFloorSatisfied
                      ? `50+ Module Floor Satisfied (+${p.moduleCount - p.minFloor} surplus modules)`
                      : `Requires +${p.gapToFloor} more modules to reach minimum floor.`}
                  </span>
                </div>
                <button
                  onClick={() => setExpandedProduct(isExpanded ? null : p.productId)}
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                >
                  <span>{isExpanded ? 'Hide Details' : 'View Action Plan'}</span>
                  <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Expanded Action Plan & Breakdown */}
              {isExpanded && (
                <div className="pt-2 border-t border-slate-800/80 space-y-3">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">
                    Reconstruction Action Items & Verification
                  </div>
                  <div className="space-y-1.5">
                    {(p.actionItems || []).map((item, idx) => (
                      <div key={idx} className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-[10px] text-slate-500">
                      Categories: <span className="text-slate-300">{(p.categories || []).join(', ')}</span>
                    </div>
                    {onLaunchProduct && (
                      <button
                        onClick={() => onLaunchProduct(p.productId)}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <span>Launch Workspace</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
