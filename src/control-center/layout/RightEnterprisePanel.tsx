import React, { useState } from 'react';
import { 
  Sparkles, Bell, CheckSquare, ShieldCheck, DollarSign, Shield, 
  Calendar, FileText, X, ArrowRight, MessageSquare, AlertCircle, Clock
} from 'lucide-react';

export interface RightEnterprisePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RightEnterprisePanel: React.FC<RightEnterprisePanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'tasks' | 'alerts' | 'notes'>('ai');
  const [aiQuery, setAiQuery] = useState('');
  const [aiChat, setAiChat] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    { sender: 'assistant', text: 'Hello! I am your JUMO UEOS Cognitive Assistant. Ask me to audit ledger balances, verify AEGIS access rules, or run RAG searches.' }
  ]);

  if (!isOpen) return null;

  const handleSendAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    const userMsg = aiQuery.trim();
    setAiChat((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setAiQuery('');

    // Dynamic AI response simulation
    setTimeout(() => {
      let reply = 'Analyzed query across FAAP ledgers and AEGIS security models. System integrity is verified at 100%.';
      if (userMsg.toLowerCase().includes('faap') || userMsg.toLowerCase().includes('ledger') || userMsg.toLowerCase().includes('financial')) {
        reply = 'FAAP Ledger Audit: Total Debits match Credits ($0.00 offset). Treasury fee clearing calculated at standard 1.5%.';
      } else if (userMsg.toLowerCase().includes('aegis') || userMsg.toLowerCase().includes('security') || userMsg.toLowerCase().includes('role')) {
        reply = 'AEGIS Security Policy: Ring-0 Root RBAC active. 256 cluster nodes authenticated with Zero-Trust credentials.';
      }
      setAiChat((prev) => [...prev, { sender: 'assistant', text: reply }]);
    }, 600);
  };

  return (
    <aside className="w-80 sm:w-96 bg-white border-l border-slate-200 h-full flex flex-col font-sans shrink-0 shadow-xl z-30 select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-slate-900 tracking-tight">Intelligent Context Panel</h3>
            <p className="text-[10px] text-slate-500 font-mono">JUMO UEOS COGNITIVE & WORKSPACE ENGINE</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white text-xs font-semibold">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'ai' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Assistant</span>
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'tasks' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Tasks (3)</span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'alerts' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Alerts (2)</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'notes' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Notes</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 text-xs">
        {/* Tab 1: AI Assistant Chat */}
        {activeTab === 'ai' && (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-3 overflow-y-auto max-h-[450px] pr-1">
              {aiChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl max-w-[90%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white ml-auto font-medium'
                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendAi} className="mt-4 pt-3 border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask JUMO AI Assistant..."
                className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Pending Tasks & Workflow Queue */}
        {activeTab === 'tasks' && (
          <div className="space-y-3">
            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 uppercase tracking-wider text-[11px] text-slate-400">
              Pending Approvals & Workflows
            </div>

            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg space-y-1">
              <div className="flex items-center justify-between text-amber-900 font-bold">
                <span>Faculty Payroll Voucher #9012</span>
                <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded text-amber-900 font-mono">FAAP</span>
              </div>
              <p className="text-slate-600 text-[11px]">Requires Ring-0 root authorization for $45,000 disbursement.</p>
              <div className="pt-2 flex gap-2">
                <button className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px]">Approve</button>
                <button className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded text-[10px]">Reject</button>
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg space-y-1">
              <div className="flex items-center justify-between text-blue-900 font-bold">
                <span>Healthcare EHR Policy Update</span>
                <span className="text-[10px] bg-blue-200 px-1.5 py-0.5 rounded text-blue-900 font-mono">AEGIS</span>
              </div>
              <p className="text-slate-600 text-[11px]">HIPAA compliance rule modification waiting for medical director signoff.</p>
              <div className="pt-2 flex gap-2">
                <button className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-[10px]">Review Policy</button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Security & Financial Alerts */}
        {activeTab === 'alerts' && (
          <div className="space-y-3">
            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 uppercase tracking-wider text-[11px] text-slate-400">
              Real-time System Alerts
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg space-y-1">
              <div className="flex items-center gap-2 text-purple-900 font-bold">
                <Shield className="w-4 h-4 text-purple-600" />
                <span>AEGIS Zero-Trust Sweep</span>
              </div>
              <p className="text-slate-600 text-[11px]">All 256 edge worker nodes verified. Zero compliance deviations detected.</p>
              <div className="text-[10px] text-slate-400 font-mono">10 mins ago</div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>FAAP Treasury Clearing</span>
              </div>
              <p className="text-slate-600 text-[11px]">1.5% settlement fee credited to Master Treasury across 12 domain switches.</p>
              <div className="text-[10px] text-slate-400 font-mono">35 mins ago</div>
            </div>
          </div>
        )}

        {/* Tab 4: Quick Scratchpad Notes */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 uppercase tracking-wider text-[11px] text-slate-400">
              Workspace Scratchpad Notes
            </div>

            <textarea
              placeholder="Write personal workspace notes here... Automatically saved to persistent local state."
              className="w-full h-48 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 resize-none font-mono"
              defaultValue="Quarterly audit check: Ensure all SACCO ledger entries match FAAP clearing rules before monthly closeout."
            />
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightEnterprisePanel;
