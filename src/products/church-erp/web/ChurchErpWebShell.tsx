import React, { useState } from 'react';
import { 
  Building2, Users, Heart, Calendar, DollarSign, PieChart, 
  Settings, Menu, Search, Bell, Home, ChevronRight, Lock, 
  ShieldCheck, Church, Sparkles, RefreshCw, X, Plus, Layers,
  CheckCircle2, BookOpen, AlertCircle, FileText
} from 'lucide-react';
import { AppLauncherPopup } from '../../../components/AppLauncherPopup';

export const ChurchErpWebShell: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeModule, setActiveModule] = useState<string>('MOD_CH_DASHBOARD');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiContext, setAiContext] = useState<string>('Pastoral Care & Tithe Stewardship');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  // Church Domain Data
  const [parishes, setParishes] = useState([
    { id: 'PAR-001', name: 'St. Paul Cathedral Parish', archdeaconry: 'Central Archdeaconry', curate: 'Rev. Canon Emmanuel O.', members: '4,280 Communicants', titheMonth: '$18,450.00', status: 'Active (Diocesan Quota Cleared)' },
    { id: 'PAR-002', name: 'Grace Community Parish', archdeaconry: 'Northern Archdeaconry', curate: 'Rev. Mary Nabakooza', members: '2,150 Communicants', titheMonth: '$9,820.00', status: 'Active (Diocesan Quota Cleared)' },
    { id: 'PAR-003', name: 'St. Peter Parish & Chapel', archdeaconry: 'Eastern Archdeaconry', curate: 'Rev. John Baptist Mukasa', members: '1,890 Communicants', titheMonth: '$7,340.00', status: 'Pending Remittance ($1,200.00)' },
    { id: 'PAR-004', name: 'All Saints Mission Station', archdeaconry: 'Southern Outreach', curate: 'Pastor David Kigozi', members: '940 Communicants', titheMonth: '$4,110.00', status: 'Active (Diocesan Quota Cleared)' }
  ]);

  const [sacraments, setSacraments] = useState([
    { ref: 'SAC-BAP-2026-081', type: 'Holy Baptism', recipient: 'Gabriel Arthur Mukisa', officiant: 'Rev. Canon Emmanuel O.', parish: 'St. Paul Cathedral', date: '2026-08-15', status: 'Registered & Certified' },
    { ref: 'SAC-MAT-2026-042', type: 'Holy Matrimony', recipient: 'Dr. Julius O. & Dr. Sarah N.', officiant: 'Rt. Rev. Bishop Joseph M.', parish: 'Grace Cathedral', date: '2026-08-08', status: 'Banns Published & Certified' },
    { ref: 'SAC-CONF-2026-119', type: 'Confirmation', recipient: '48 Diocesan Youths', officiant: 'Rt. Rev. Bishop Joseph M.', parish: 'St. Peter Parish', date: '2026-08-01', status: 'Episcopal Register Signed' }
  ]);

  const [tithes, setTithes] = useState([
    { id: 'TTH-9941', giver: 'Eng. Patrick Byaruhanga (Pledge #204)', amount: '$1,200.00', type: 'Tithes & Thanksgiving', channel: 'FAAP Direct Settlement', time: 'Today, 08:45 AM' },
    { id: 'TTH-9942', giver: 'St. Paul Mothers Union Fellowship', amount: '$850.00', type: 'Missionary Outreach Fund', channel: 'Mobile Money Switch', time: 'Today, 09:12 AM' },
    { id: 'TTH-9943', giver: 'Sunday 1st Service General Offering', amount: '$3,420.00', type: 'Sunday Worship Offertory', channel: 'Cash Book Verified', time: 'Yesterday, 11:30 AM' }
  ]);

  const navGroups = [
    {
      group: 'DIOCESE & EPISCOPATE',
      items: [
        { id: 'MOD_CH_DIOCESE', label: 'Diocese & Synod Assembly', icon: Building2, description: 'Diocesan synod resolutions, episcopal calendar, and archdeaconries' },
        { id: 'MOD_CH_PARISH', label: 'Parish & Curate Stations', icon: Church, description: 'Parish rolls, curate postings, and deanery reports' },
      ]
    },
    {
      group: 'PASTORAL MINISTRY',
      items: [
        { id: 'MOD_CH_SACRAMENTS', label: 'Sacramental Registers', icon: Heart, description: 'Baptism, Confirmation, Holy Matrimony, and Ordination books' },
        { id: 'MOD_CH_MEMBERSHIP', label: 'Parishioner Census & Directory', icon: Users, description: 'Communicants, families, small Christian communities, and youth' },
        { id: 'MOD_CH_CLERGY', label: 'Clergy & Pastoral Roster', icon: ShieldCheck, description: 'Priests, deacons, lay readers, and pastoral postings' },
      ]
    },
    {
      group: 'STEWARDSHIP & FINANCE',
      items: [
        { id: 'MOD_CH_TITHES', label: 'Tithes, Pledges & FAAP', icon: DollarSign, description: 'Stewardship records, diocesan quota remittances, and FAAP ledger' },
        { id: 'MOD_CH_PROJECTS', label: 'Parish Development Projects', icon: Layers, description: 'Cathedral building fund, school expansions, and medical clinics' },
      ]
    }
  ];

  const handleRunAi = () => {
    if (!aiPrompt.trim()) return;
    setAiThinking(true);
    setTimeout(() => {
      setAiThinking(false);
      setAiResponse(`JUMO Ecclesiastical Intelligence Report (${aiContext}):
• Active Parish Communicants: 9,260 across 4 Deaneries.
• Monthly Stewardship Giving: $39,720.00 verified on FAAP General Ledger.
• Diocesan Quota Remittance: 92.4% compliance rate across 18 Parishes.`);
    }, 700);
  };

  const openContextualAi = (context: string) => {
    setAiContext(context);
    setAiPrompt(`Analyze ${context} trends, parishioner engagement, and diocesan quota remittances...`);
    setIsAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* 1. Sovereign Product Header */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
              <Church className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block leading-none">
                JUMO <span className="text-purple-400 font-normal">CHURCH ERP</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Ecclesiastical & Diocesan OS</span>
            </div>
          </div>
        </div>

        {/* Right Actions & Home/Launchpad Button */}
        <div className="flex items-center gap-2">
          {/* Home / Launchpad Button */}
          {onNavigate && (
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-xs font-semibold transition cursor-pointer"
              title="Return to Application Launcher"
            >
              <Home className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Launchpad</span>
            </button>
          )}

          {/* Contextual AI Copilot Button */}
          <button 
            onClick={() => openContextualAi('Pastoral Care & Tithes Stewardship')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-950/80 hover:bg-purple-900 text-purple-300 rounded-lg border border-purple-800 text-xs font-medium transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="hidden md:inline">Pastoral AI</span>
          </button>

          {/* OS App Switcher */}
          {onNavigate && (
            <AppLauncherPopup 
              currentProduct="JUMO-CHURCH"
              onNavigate={onNavigate}
            />
          )}

          <div className="w-7 h-7 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-300 font-bold text-xs">
            BP
          </div>
        </div>
      </header>

      {/* 2. Main Body: Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 hidden'} bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 transition-all duration-200 z-20`}>
          {/* Diocese Banner */}
          <div className="p-3 border-b border-slate-850 bg-slate-900/50">
            <div className="text-[10px] font-mono uppercase font-bold text-slate-400 mb-1">Jurisdiction</div>
            <div className="text-xs font-bold text-white truncate">Diocese of Central & Grace</div>
            <div className="text-[11px] text-purple-400 truncate mt-0.5">Rt. Rev. Bishop Joseph M.</div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-3 space-y-5">
            <div>
              <button
                onClick={() => setActiveModule('MOD_CH_DASHBOARD')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeModule === 'MOD_CH_DASHBOARD'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <PieChart className="w-4 h-4 text-purple-400" />
                <span>Diocesan Overview</span>
              </button>
            </div>

            {navGroups.map((grp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3 mb-1">
                  {grp.group}
                </div>
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveModule(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer text-left ${
                        isSelected
                          ? 'bg-purple-600 text-white font-semibold shadow-xs'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                      title={item.description}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-850 bg-slate-900/40 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center justify-between text-[10px]">
              <span>FAAP Stewardship</span>
              <span className="text-emerald-400 font-bold">$0.00 Offset</span>
            </div>
          </div>
        </aside>

        {/* Right Main Workspace */}
        <main className="flex-1 bg-slate-900 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-xs">
                <div className="text-[11px] text-slate-400 font-medium truncate">Total Diocesan Communicants</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">9,260</div>
                <div className="text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-900">Across 18 Parishes</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-xs">
                <div className="text-[11px] text-slate-400 font-medium truncate">Monthly Tithe Stewardship</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">$39,720</div>
                <div className="text-[10px] text-emerald-400 font-bold font-mono mt-2 pt-2 border-t border-slate-900">+12.4% Target Cleared</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-xs">
                <div className="text-[11px] text-slate-400 font-medium truncate">Sacramental Ceremonies</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">169</div>
                <div className="text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-900">Baptisms, Matrimony & Confirmations</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-xs">
                <div className="text-[11px] text-slate-400 font-medium truncate">Active Diocesan Clergy</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">34 Priests</div>
                <div className="text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-900">12 Deacons & 48 Lay Readers</div>
              </div>
            </div>

            {/* Parishes Directory Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <Church className="w-4 h-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900">Diocesan Parishes, Curates & Stewardship Remittances</h3>
                </div>
                <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition">
                  <Plus className="w-3.5 h-3.5" /> Register Parish Station
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Parish Code & Name</th>
                      <th className="py-3 px-4">Archdeaconry</th>
                      <th className="py-3 px-4">Parish Priest / Curate</th>
                      <th className="py-3 px-4">Communicant Roll</th>
                      <th className="py-3 px-4">Monthly Tithes</th>
                      <th className="py-3 px-4">Diocesan Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {parishes.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{p.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{p.id}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-800 font-medium rounded border border-purple-200 text-[11px]">{p.archdeaconry}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-800">{p.curate}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900">{p.members}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-emerald-700">{p.titheMonth}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] inline-flex items-center gap-1 ${p.status.includes('Active') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sacramental Registers and Tithes Stream */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sacramental Registers */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-purple-600" />
                    <h3 className="text-sm font-bold text-slate-900">Canonical Sacramental Registers</h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">Verified Canonical Books</span>
                </div>

                <div className="space-y-3">
                  {sacraments.map((s) => (
                    <div key={s.ref} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-purple-800">{s.type}</span>
                        <span className="font-mono text-[10px] text-slate-400">{s.ref}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-900">{s.recipient}</div>
                      <div className="text-[11px] text-slate-500">{s.parish} • Officiant: {s.officiant}</div>
                      <div className="text-[10px] text-emerald-600 font-medium pt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {s.status} ({s.date})
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tithes & Stewardship Feed */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                    <h3 className="text-sm font-bold text-slate-900">Live Stewardship & FAAP Postings</h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Real-Time Ledger</span>
                </div>

                <div className="space-y-3">
                  {tithes.map((t) => (
                    <div key={t.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{t.giver}</span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{t.amount}</span>
                      </div>
                      <p className="text-xs text-slate-600">{t.type} • {t.channel}</p>
                      <div className="text-[10px] text-slate-400 font-mono">{t.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Contextual AI Copilot Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-white text-sm">Pastoral AI Intelligence Copilot</h3>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1 font-mono">Ministry Context</label>
                <input 
                  type="text" 
                  value={aiContext} 
                  onChange={(e) => setAiContext(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-mono">Analysis Prompt</label>
                <textarea 
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-hidden focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRunAi}
                  disabled={aiThinking}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                  {aiThinking ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  Generate Pastoral Analysis
                </button>
              </div>

              {aiResponse && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
