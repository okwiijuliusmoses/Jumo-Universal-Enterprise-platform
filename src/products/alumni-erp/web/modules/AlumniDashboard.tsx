import React from 'react';
import { 
  Users, Award, Globe, DollarSign, Briefcase, UserCheck, 
  TrendingUp, ArrowUpRight, ShieldCheck, HeartHandshake,
  Calendar, ChevronRight, Download, Send
} from 'lucide-react';
import { AlumniErpService } from '../../domain/AlumniErpService';

export const AlumniDashboard: React.FC<{ onNavigateTab?: (tab: string) => void }> = ({ onNavigateTab }) => {
  const service = AlumniErpService.getInstance();
  const stats = service.getStats();
  const campaigns = service.getCampaigns();
  const chapters = service.getChapters();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
            <Award className="w-4 h-4" />
            <span>JUMO Sovereign Alumni Network & Endowment Registry</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Institutional Alumni Advancement Console</h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Sovereign directory, credential verification, global regional chapters, class giving drives, and career network.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => onNavigateTab?.('MOD_ALUMNI_GIVING')}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <DollarSign className="w-4 h-4" />
            <span>Support Campaign</span>
          </button>
          <button 
            onClick={() => onNavigateTab?.('MOD_ALUMNI_REGISTRY')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <UserCheck className="w-4 h-4" />
            <span>Verify Graduate</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Alumni</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.totalAlumni.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 flex items-center gap-1 mt-1 font-medium">
            <TrendingUp className="w-3 h-3" /> +420 this semester
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Verified Creds</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.verifiedCount.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-1">94.7% identity certified</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Chapters</span>
            <Globe className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.activeChapters}</div>
          <div className="text-[11px] text-slate-500 mt-1">Global diaspora hubs</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Endowment</span>
            <DollarSign className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">${((stats?.totalEndowmentUSD ?? 0) / 1000000).toFixed(2)}M</div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">Active capital pool</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Mentors</span>
            <HeartHandshake className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.activeMentors}</div>
          <div className="text-[11px] text-slate-500 mt-1">Undergraduate guidance</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Open Positions</span>
            <Briefcase className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.openJobs}</div>
          <div className="text-[11px] text-slate-500 mt-1">Alumni employer network</div>
        </div>
      </div>

      {/* Main Grid: Active Campaigns & Chapter Network */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Campaigns */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Active Advancement & Endowment Campaigns</h2>
              <p className="text-xs text-slate-500 mt-0.5">Track capital campaigns, building projects, and scholarship funds.</p>
            </div>
            <button 
              onClick={() => onNavigateTab?.('MOD_ALUMNI_GIVING')}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <span>View All Campaigns</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {campaigns.map(c => {
              const pct = Math.min(100, Math.round((c.currentAmountUSD / c.targetAmountUSD) * 100));
              return (
                <div key={c.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{c.title}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase">
                          {c.category.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{c.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-slate-900">${c.currentAmountUSD.toLocaleString()}</div>
                      <div className="text-[11px] text-slate-500">of ${c.targetAmountUSD.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2 mt-3 overflow-hidden">
                    <div 
                      className="bg-rose-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>{pct}% funded ({c.donorCount} donors)</span>
                    <span>Closing: {c.endDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Regional Chapters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Regional Chapters</h2>
              <p className="text-xs text-slate-500 mt-0.5">Active regional hubs.</p>
            </div>
            <button 
              onClick={() => onNavigateTab?.('MOD_ALUMNI_CHAPTERS')}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <span>Chapters</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {chapters.map(ch => (
              <div key={ch.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-xs text-slate-900">{ch.name}</div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {ch.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Lead: {ch.leadCoordinator}</div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2 pt-2 border-t border-slate-200">
                  <span>{ch.activeMembersCount.toLocaleString()} Members</span>
                  <span className="font-medium text-rose-700">${ch.raisedUSD.toLocaleString()} Raised</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
