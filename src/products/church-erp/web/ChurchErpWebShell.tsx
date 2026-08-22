import React, { useState } from 'react';
import { 
  Building2, Building, Users, Heart, Calendar, DollarSign, PieChart, 
  Settings, Menu, Search, Bell, Home, ChevronRight, Lock, 
  ShieldCheck, Church, Sparkles, RefreshCw, X, Plus, Layers,
  CheckCircle2, BookOpen, AlertCircle, FileText, Sliders, Code,
  Award, Download, Printer, UserCheck
} from 'lucide-react';
import { ChurchErpControlCenter } from './portals/ChurchErpControlCenter';
import { ChurchErpDeveloperCenter } from './portals/ChurchErpDeveloperCenter';
import { 
  BishopOffice, 
  ParishPriestOffice, 
  SacramentalOffice, 
  ChurchFinanceOffice, 
  ChurchProjectsOffice 
} from '../offices';

export const ChurchErpWebShell: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeModule, setActiveModule] = useState<string>('MOD_CH_PARISH');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiContext, setAiContext] = useState<string>('Pastoral Care & Tithe Stewardship');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  // Church Domain Data
  const parishes = [
    { id: 'PAR-001', name: 'St. Paul Cathedral Parish', archdeaconry: 'Central Archdeaconry', curate: 'Rev. Canon Emmanuel O.', members: '4,280 Communicants', titheMonth: '$18,450.00', status: 'Active (Quota Cleared)' },
    { id: 'PAR-002', name: 'Grace Community Parish', archdeaconry: 'Northern Archdeaconry', curate: 'Rev. Mary Nabakooza', members: '2,150 Communicants', titheMonth: '$9,820.00', status: 'Active (Quota Cleared)' },
    { id: 'PAR-003', name: 'St. Peter Parish & Chapel', archdeaconry: 'Eastern Archdeaconry', curate: 'Rev. John Baptist Mukasa', members: '1,890 Communicants', titheMonth: '$7,340.00', status: 'Pending ($1,200.00)' },
    { id: 'PAR-004', name: 'All Saints Mission Station', archdeaconry: 'Southern Outreach', curate: 'Pastor David Kigozi', members: '940 Communicants', titheMonth: '$4,110.00', status: 'Active (Quota Cleared)' }
  ];

  const sacraments = [
    { ref: 'SAC-BAP-2026-081', type: 'Holy Baptism', recipient: 'Gabriel Arthur Mukisa', officiant: 'Rev. Canon Emmanuel O.', parish: 'St. Paul Cathedral', date: '2026-08-15', status: 'Registered & Certified' },
    { ref: 'SAC-MAT-2026-042', type: 'Holy Matrimony', recipient: 'Dr. Julius O. & Dr. Sarah N.', officiant: 'Rt. Rev. Bishop Joseph M.', parish: 'Grace Cathedral', date: '2026-08-08', status: 'Banns Published & Certified' },
    { ref: 'SAC-CONF-2026-119', type: 'Confirmation', recipient: '48 Diocesan Youths', officiant: 'Rt. Rev. Bishop Joseph M.', parish: 'St. Peter Parish', date: '2026-08-01', status: 'Episcopal Register Signed' }
  ];

  const tithes = [
    { id: 'TTH-9941', giver: 'Eng. Patrick Byaruhanga (Pledge #204)', amount: '$1,200.00', type: 'Tithes & Thanksgiving', channel: 'FAAP Direct Settlement', time: 'Today, 08:45 AM' },
    { id: 'TTH-9942', giver: 'St. Paul Mothers Union Fellowship', amount: '$850.00', type: 'Missionary Outreach Fund', channel: 'Mobile Money Switch', time: 'Today, 09:12 AM' },
    { id: 'TTH-9943', giver: 'Sunday 1st Service General Offering', amount: '$3,420.00', type: 'Sunday Worship Offertory', channel: 'Cash Book Verified', time: 'Yesterday, 11:30 AM' }
  ];

  const handleRunAi = () => {
    if (!aiPrompt.trim()) return;
    setAiThinking(true);
    setTimeout(() => {
      setAiThinking(false);
      setAiResponse(`JUMO Ecclesiastical Intelligence Report (${aiContext}):
• Active Parish Communicants: 9,260 across 4 Archdeaconries.
• Monthly Stewardship Giving: $39,720.00 verified on FAAP General Ledger ($0.00 offset).
• Diocesan Quota Remittance: 92.4% compliance rate across 18 Parishes.`);
    }, 600);
  };

  const openContextualAi = (context: string) => {
    setAiContext(context);
    setAiPrompt(`Analyze ${context} trends, parishioner engagement, and diocesan quota remittances...`);
    setIsAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* 1. Sovereign Product Header - Clean White Enterprise Theme */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
              <Church className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-slate-900 block leading-none">
                JUMO <span className="text-purple-600 font-semibold">CHURCH & DIOCESE ERP</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">Ecclesiastical Enterprise Platform</span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs font-semibold transition cursor-pointer"
              title="Return to Product Gateway"
            >
              <Home className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden sm:inline">Product Gateway</span>
            </button>
          )}

          <button 
            type="button"
            onClick={() => openContextualAi('Pastoral Care & Stewardship')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg border border-purple-200 text-xs font-semibold transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden md:inline">Pastoral AI</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-800 font-bold text-xs">
              BP
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">Rt. Rev. Joseph M.</div>
              <div className="text-[10px] text-slate-500 font-medium">DIOCESAN BISHOP</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 hidden'} bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-200 z-20`}>
          <div className="p-3.5 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Diocese Jurisdiction</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-purple-50 text-purple-800 border-purple-200">
                PROVINCE OF UGANDA
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900 truncate">Kampala & Central Diocese</div>
            <div className="text-[11px] text-slate-500 truncate mt-0.5">18 Parishes • 9,260 Members</div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {/* Ecclesiastical Offices */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                ECCLESIASTICAL OFFICES
              </div>

              {[
                { id: 'MOD_CH_PARISH', label: 'Parish & Curate Stations', icon: Church },
                { id: 'MOD_CH_SACRAMENTS', label: 'Sacramental Registers', icon: Heart, badge: 'OFFICIAL' },
                { id: 'MOD_CH_TITHES', label: 'Tithes & Diocesan Quota', icon: DollarSign, badge: 'FAAP' },
                { id: 'MOD_CH_DIOCESE', label: 'Synod & Bishop Office', icon: Building2 },
                { id: 'MOD_CH_PROJECTS', label: 'Capital Projects & Works', icon: Building, badge: 'BUILD' },
                { id: 'MOD_CH_MEMBERSHIP', label: 'Parishioner Census Roll', icon: Users },
                { id: 'MOD_CH_CLERGY', label: 'Clergy & Pastoral Roster', icon: ShieldCheck },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-purple-600'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                        isSelected ? 'bg-purple-700 text-purple-100' : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* System Administration */}
            <div className="pt-2 border-t border-slate-200 space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                GOVERNANCE & INTEGRATION
              </div>

              <button
                type="button"
                onClick={() => setActiveModule('PORTAL_CHURCH_CONTROL')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeModule === 'PORTAL_CHURCH_CONTROL'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sliders className={`w-4 h-4 ${activeModule === 'PORTAL_CHURCH_CONTROL' ? 'text-white' : 'text-purple-600'}`} />
                <span>Church Control Center</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModule('PORTAL_CHURCH_DEV')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeModule === 'PORTAL_CHURCH_DEV'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Code className={`w-4 h-4 ${activeModule === 'PORTAL_CHURCH_DEV' ? 'text-white' : 'text-slate-600'}`} />
                <span>Church Developer Center</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeModule === 'PORTAL_CHURCH_CONTROL' && <ChurchErpControlCenter />}
            {activeModule === 'PORTAL_CHURCH_DEV' && <ChurchErpDeveloperCenter />}

            {activeModule === 'MOD_CH_PARISH' && <ParishPriestOffice />}
            {activeModule === 'MOD_CH_SACRAMENTS' && <SacramentalOffice />}
            {activeModule === 'MOD_CH_TITHES' && <ChurchFinanceOffice />}
            {activeModule === 'MOD_CH_DIOCESE' && <BishopOffice />}
            {activeModule === 'MOD_CH_PROJECTS' && <ChurchProjectsOffice />}

            {activeModule !== 'PORTAL_CHURCH_CONTROL' && 
             activeModule !== 'PORTAL_CHURCH_DEV' && 
             activeModule !== 'MOD_CH_PARISH' && 
             activeModule !== 'MOD_CH_SACRAMENTS' && 
             activeModule !== 'MOD_CH_TITHES' &&
             activeModule !== 'MOD_CH_DIOCESE' &&
             activeModule !== 'MOD_CH_PROJECTS' && (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <Church className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800">{activeModule} Workspace</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Authoritative diocesan operations module for church administration, clergy postings, and synod assemblies.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Pastoral AI Assistant Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Pastoral Care AI Copilot</h3>
                  <p className="text-[11px] text-slate-500 font-mono">{aiContext}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Pastoral Inquiry / Analysis:</label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-hidden text-slate-800"
                placeholder="Ask about stewardship trends, diocesan quota clearance, or sacramental registry logs..."
              />
            </div>

            {aiResponse && (
              <div className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-lg text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                {aiResponse}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={handleRunAi}
                disabled={aiThinking}
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                {aiThinking ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{aiThinking ? 'Analyzing...' : 'Execute Analysis'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
