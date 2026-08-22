/**
 * JUMO UEOS — Authoritative Floating Enterprise Utilities (Workspace-First Layout)
 * 
 * Replaces permanent right sidebars with on-demand floating drawers and pop-ups.
 * Enforces:
 * - 0% Permanent Right Sidebar (Workspace occupies >90% width)
 * - Floating action pill in bottom right corner
 * - Slide-out drawers for:
 *   1. 🤖 JUMO AI Assistant (All assistants use JUMO branding only)
 *   2. 📊 Diagnostics & Telemetry (256 nodes, memory, database, FAAP 1.5% clearing)
 *   3. 🔔 Workflow Inbox & SLAs (Approval chains, alerts, pending tasks)
 *   4. ❓ Help & Documentation (RAG knowledge base, manuals, regulations)
 */

import React, { useState } from 'react';
import { 
  Sparkles, Activity, Bell, HelpCircle, X, Cpu, Shield, DollarSign, 
  Database, Server, CheckCircle2, AlertTriangle, Clock, FileText, 
  Send, Search, ArrowRight, Layers, RefreshCw, Zap, Check, Lock
} from 'lucide-react';

export const FloatingEnterpriseUtilities: React.FC = () => {
  const [activeDrawer, setActiveDrawer] = useState<'ai' | 'diagnostics' | 'inbox' | 'help' | null>(null);
  const [aiAssistantTab, setAiAssistantTab] = useState<'ai_assistant' | 'ai_knowledge' | 'ai_document' | 'ai_workflow' | 'ai_analytics'>('ai_assistant');
  const [promptInput, setPromptInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'jumo'; text: string; time: string }[]>([
    { sender: 'jumo', text: 'Hello! I am the JUMO AI Assistant, grounded in your tenant RAG knowledge base. How can I assist with your general ledger, workflow SLAs, or domain operations today?', time: 'Just now' }
  ]);
  const [searchDocQuery, setSearchDocQuery] = useState('');

  const handleSendAi = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim()) return;

    const userText = promptInput;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAiMessages(prev => [...prev, { sender: 'user', text: userText, time: now }]);
    setPromptInput('');

    setTimeout(() => {
      let jumoReply = 'I have analyzed your request across our Universal Financial Core (FAAP) and Identity boundaries. All double-entry postings maintain $0.00 offset and comply with Ring-0 Zero Trust policies.';
      if (userText.toLowerCase().includes('provision') || userText.toLowerCase().includes('erp') || userText.toLowerCase().includes('module')) {
        jumoReply = 'Under the JUMO UEOS Universal Core Module Framework (v1.0), all 12 Universal Core layers (98 modules) are automatically provisioned. Your developers only need to configure domain-specific industry extensions.';
      } else if (userText.toLowerCase().includes('fee') || userText.toLowerCase().includes('faap') || userText.toLowerCase().includes('1.5')) {
        jumoReply = 'The Universal FinTech Switch automatically enforces the mandatory 1.5% settlement clearing fee on all real-time fintech transactions, routing to the JUMO Master Treasury.';
      }
      setAiMessages(prev => [...prev, { sender: 'jumo', text: jumoReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Pill Bar (Fixed Bottom Right) */}
      <div className="fixed bottom-10 right-6 z-40 flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-full px-3 py-1.5 transition-all hover:shadow-blue-500/10">
        <button
          onClick={() => setActiveDrawer(activeDrawer === 'ai' ? null : 'ai')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
            activeDrawer === 'ai' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
              : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
          }`}
          title="Launch JUMO AI Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>JUMO AI</span>
        </button>

        <div className="h-4 w-px bg-slate-200 mx-0.5" />

        <button
          onClick={() => setActiveDrawer(activeDrawer === 'diagnostics' ? null : 'diagnostics')}
          className={`p-1.5 rounded-full transition cursor-pointer ${
            activeDrawer === 'diagnostics' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
          title="Live Diagnostics & Telemetry"
        >
          <Activity className="w-4 h-4" />
        </button>

        <button
          onClick={() => setActiveDrawer(activeDrawer === 'inbox' ? null : 'inbox')}
          className={`p-1.5 rounded-full transition relative cursor-pointer ${
            activeDrawer === 'inbox' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
          title="Workflow Inbox & SLAs"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <button
          onClick={() => setActiveDrawer(activeDrawer === 'help' ? null : 'help')}
          className={`p-1.5 rounded-full transition cursor-pointer ${
            activeDrawer === 'help' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
          title="Help & Knowledge Base"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* Slide-Out Drawer Overlay */}
      {activeDrawer && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-50 transition-opacity"
          onClick={() => setActiveDrawer(null)}
        />
      )}

      {/* 1. JUMO AI ASSISTANT DRAWER */}
      {activeDrawer === 'ai' && (
        <div className="fixed inset-y-0 right-0 w-[420px] max-w-[92vw] bg-white shadow-2xl z-50 border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          {/* Drawer Header */}
          <div className="p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">JUMO AI Assistant</h3>
                <p className="text-[10px] text-blue-200 font-mono">Universal Cognitive Engine • Layer 5</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveDrawer(null)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* AI Assistant Specialized Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 px-2 pt-2 text-[11px] font-semibold gap-1 overflow-x-auto shrink-0">
            {[
              { id: 'ai_assistant', label: 'Copilot', icon: Sparkles },
              { id: 'ai_knowledge', label: 'RAG Knowledge', icon: Database },
              { id: 'ai_document', label: 'Documents', icon: FileText },
              { id: 'ai_workflow', label: 'SLAs', icon: Zap },
              { id: 'ai_analytics', label: 'Analytics', icon: Activity }
            ].map(t => {
              const Icon = t.icon;
              const active = aiAssistantTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setAiAssistantTab(t.id as any)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-t-lg border-b-2 transition whitespace-nowrap cursor-pointer ${
                    active 
                      ? 'border-blue-600 text-blue-600 bg-white font-bold' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* AI Chat History / Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {aiMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1 font-mono">
                  <span>{msg.sender === 'user' ? 'You' : 'JUMO AI Assistant'}</span>
                  <span>•</span>
                  <span>{msg.time}</span>
                </div>
                <div 
                  className={`max-w-[88%] rounded-xl p-3 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none font-normal'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* AI Input Box */}
          <form onSubmit={handleSendAi} className="p-3 bg-white border-t border-slate-200 shrink-0">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={`Ask JUMO AI (${aiAssistantTab === 'ai_knowledge' ? 'Search RAG regulations...' : 'Type natural language query...'})`}
                value={promptInput}
                onChange={e => setPromptInput(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-3 pr-10 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!promptInput.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-emerald-600" /> Grounded in Sovereign RAG
              </span>
              <span>Model: Gemini 2.5 Pro Enterprise</span>
            </div>
          </form>
        </div>
      )}

      {/* 2. LIVE DIAGNOSTICS & TELEMETRY DRAWER */}
      {activeDrawer === 'diagnostics' && (
        <div className="fixed inset-y-0 right-0 w-[400px] max-w-[92vw] bg-white shadow-2xl z-50 border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              <div>
                <h3 className="font-bold text-sm">Cluster Health & Telemetry</h3>
                <p className="text-[10px] text-slate-400 font-mono">Ring-0 Sovereign Diagnostics</p>
              </div>
            </div>
            <button onClick={() => setActiveDrawer(null)} className="p-1.5 text-slate-400 hover:text-white transition cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[10px] text-slate-500 font-mono font-bold uppercase">Active Nodes</div>
                <div className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 256 / 256
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">100% Mesh Replication</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[10px] text-slate-500 font-mono font-bold uppercase">Memory Heap</div>
                <div className="text-lg font-bold text-slate-900 mt-1">412 MB</div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">Cap: 4,096 MB (10.1%)</div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between font-bold text-blue-900">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  FAAP Ledger Parity Check
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono rounded">
                  PASSED ($0.00)
                </span>
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                All 16 ERP domain ledgers reconcile with exact double-entry equilibrium. Zero unposted credit variance detected.
              </p>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between font-bold text-purple-900">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-purple-600" />
                  FinTech 1.5% Clearing Switch
                </span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-mono rounded">
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-purple-800 leading-relaxed">
                Mandatory 1.5% settlement clearing fee is operational across all real-time fintech gateways, routing automatically to JUMO Master Treasury.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">Real-Time Latency Sweeps</h4>
              {[
                { name: 'Identity & Zero-Trust Gate (Auth)', ms: '12ms', status: 'Optimal' },
                { name: 'FAAP PostgreSQL Ledger Engine', ms: '18ms', status: 'Optimal' },
                { name: 'JUMO AI Cognitive Router Gateway', ms: '142ms', status: 'Normal' },
                { name: 'Document Archive & WORM Storage', ms: '24ms', status: 'Optimal' }
              ].map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-mono">
                  <span className="text-slate-700 font-sans font-medium">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-bold">{s.ms}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. WORKFLOW INBOX & SLA DRAWER */}
      {activeDrawer === 'inbox' && (
        <div className="fixed inset-y-0 right-0 w-[400px] max-w-[92vw] bg-white shadow-2xl z-50 border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="font-bold text-sm">Workflow Inbox & SLAs</h3>
                <p className="text-[10px] text-slate-400 font-mono">3 Pending Approvals • Universal Layer 9</p>
              </div>
            </div>
            <button onClick={() => setActiveDrawer(null)} className="p-1.5 text-slate-400 hover:text-white transition cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-bold text-[10px] uppercase rounded">SLA Warning (2h left)</span>
                <span className="text-[10px] font-mono text-amber-800">REQ-2026-9041</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">University ERP — Capital Equipment Requisition</h4>
              <p className="text-slate-600 text-xs">Requisition for 45 laboratory computers ($68,000.00). Pending Financial Officer sign-off.</p>
              <div className="flex items-center gap-2 pt-1">
                <button 
                  onClick={() => alert('Requisition REQ-2026-9041 approved. FAAP commitment generated.')}
                  className="px-3 py-1 bg-emerald-600 text-white font-semibold rounded text-xs hover:bg-emerald-700 transition cursor-pointer"
                >
                  Approve ($68k)
                </button>
                <button 
                  onClick={() => alert('Requisition returned for clarification.')}
                  className="px-3 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded text-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  Return
                </button>
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold text-[10px] uppercase rounded">On Track</span>
                <span className="text-[10px] font-mono text-slate-400">PAY-2026-1102</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">SACCO ERP — Monthly Dividend Disbursement</h4>
              <p className="text-slate-600 text-xs">Automated batch transfer of 4.2M KES to 1,420 verified member savings accounts.</p>
              <div className="flex items-center gap-2 pt-1">
                <button 
                  onClick={() => alert('Dividend batch transfer authorized.')}
                  className="px-3 py-1 bg-blue-600 text-white font-semibold rounded text-xs hover:bg-blue-700 transition cursor-pointer"
                >
                  Authorize Batch
                </button>
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 font-bold text-[10px] uppercase rounded">Security Gate</span>
                <span className="text-[10px] font-mono text-slate-400">SEC-2026-0089</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Church ERP — New Parish Branch Creation</h4>
              <p className="text-slate-600 text-xs">Request to provision 'St. Gabriel Diocesan Branch' with 4 localized user roles.</p>
              <div className="flex items-center gap-2 pt-1">
                <button 
                  onClick={() => alert('Branch St. Gabriel provisioned with Layer 1 Identity Core isolation.')}
                  className="px-3 py-1 bg-purple-600 text-white font-semibold rounded text-xs hover:bg-purple-700 transition cursor-pointer"
                >
                  Provision Branch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. HELP & DOCUMENTATION DRAWER */}
      {activeDrawer === 'help' && (
        <div className="fixed inset-y-0 right-0 w-[400px] max-w-[92vw] bg-white shadow-2xl z-50 border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-400" />
              <div>
                <h3 className="font-bold text-sm">Help & RAG Knowledge Base</h3>
                <p className="text-[10px] text-slate-400 font-mono">Sovereign UEOS Documentation</p>
              </div>
            </div>
            <button onClick={() => setActiveDrawer(null)} className="p-1.5 text-slate-400 hover:text-white transition cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 border-b border-slate-200 bg-slate-50 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search regulations, IFRS rules, SOPs..."
                value={searchDocQuery}
                onChange={e => setSearchDocQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
            {[
              { title: 'Universal Core Module Framework (v1.0)', cat: 'Architecture', time: 'Updated 1d ago' },
              { title: 'FAAP Double-Entry Ledger & $0.00 Parity Rules', cat: 'Finance', time: 'Updated 3d ago' },
              { title: 'FinTech 1.5% Settlement Fee Routing Guide', cat: 'Treasury', time: 'Updated 1w ago' },
              { title: 'Zero-Trust Role ABAC & RBAC Matrix', cat: 'Security', time: 'Updated 2w ago' },
              { title: 'Auto-Provisioning New ERP Domains in 10 Steps', cat: 'Platform Store', time: 'Updated today' },
              { title: 'JUMO AI Assistant Grounding & RAG Indexing', cat: 'AI Intelligence', time: 'Updated 4d ago' }
            ]
            .filter(doc => doc.title.toLowerCase().includes(searchDocQuery.toLowerCase()) || doc.cat.toLowerCase().includes(searchDocQuery.toLowerCase()))
            .map((doc, idx) => (
              <div 
                key={idx}
                onClick={() => alert(`Opening official documentation: ${doc.title}`)}
                className="p-3 bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl transition cursor-pointer group flex items-start justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono font-semibold text-blue-600 uppercase mb-0.5">{doc.cat}</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition">{doc.title}</h4>
                  <div className="text-[10px] text-slate-400 mt-1">{doc.time}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingEnterpriseUtilities;
