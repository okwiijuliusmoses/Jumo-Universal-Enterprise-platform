import React, { useState } from 'react';
import { 
  Sparkles, Bot, ShieldAlert, BookOpen, Compass, Calculator, 
  MessageSquare, Send, RefreshCw, Layers, Sliders, ShieldCheck, Key
} from 'lucide-react';

interface AgentConfig {
  id: string;
  name: string;
  focus: string;
  description: string;
  icon: any;
  predefinedQueries: string[];
}

export const ChurchAIEngines: React.FC = () => {
  const [activeAgentId, setActiveAgentId] = useState<string>('strategy');
  const [queryInput, setQueryInput] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [conversation, setConversation] = useState<{ sender: 'user' | 'agent'; text: string }[]>([
    { sender: 'agent', text: 'Sovereign Ecclesiastical AI Strategy Agent online. Propose a district analysis query or tap one of the preset analysis mandates below.' }
  ]);

  const [agentSettings, setAgentSettings] = useState({
    temperature: 0.2,
    governanceLock: true,
    aegisAuditLevel: 'LEVEL_13_ISOLATED'
  });

  const agents: AgentConfig[] = [
    {
      id: 'strategy',
      name: 'AI Strategy & Expansion Agent',
      focus: 'Saturation analysis, missionary vacuums, diocesan expansion',
      description: 'Analyzes district demographics, parish saturation, and demographic vacuums to pinpoint optimal rural outpost locations.',
      icon: Compass,
      predefinedQueries: [
        'Analyze demographic saturation across Eastern Province outposts',
        'Identify optimal location for Albertine Rift Mission station'
      ]
    },
    {
      id: 'pastoral',
      name: 'AI Pastoral Care Advisor',
      focus: 'Family engagement tracking, welfare alerts, attendance drop warning',
      description: 'Reviews weekly cell attendance, giving fluctuations, and registers proactive pastoral visits or alerts before disconnect occurs.',
      icon: HeartIcon,
      predefinedQueries: [
        'Flag household units with attendance drop in past 30 days',
        'Analyze engagement metrics for the Kintu Family Household'
      ]
    },
    {
      id: 'finance',
      name: 'AI Financial Oversight Analyst',
      focus: 'FAAP ledger auditing, budget leak detection, mobile money gateways reconciliation',
      description: 'Audits FAAP double-entry ledgers, verifies transaction balances, and ensures mobile money cash settlements match bank clearing accounts.',
      icon: Calculator,
      predefinedQueries: [
        'Reconcile Safaricom M-Pesa cash accounts with general ledger',
        'Audit department budget envelope utilization anomalies'
      ]
    },
    {
      id: 'governance',
      name: 'AI Synod Governance & Canon Scholar',
      focus: 'Agenda audits, canon matching, constitutional checks',
      description: 'Matches proposed resolutions and meeting agendas against the Provincial Constitution of the Church of Uganda to verify canonical compliance.',
      icon: BookOpen,
      predefinedQueries: [
        'Verify resolution RES-SYN-2026-02 against provincial land canons',
        'Audit Cathedral Board agenda items for structural anomalies'
      ]
    },
    {
      id: 'heritage',
      name: 'AI Historical Heritage Curator',
      focus: 'Antiquity verification, relic hashes, seal watermarking',
      description: 'Watermarks historical documents, catalogs sacred consecrated vestments, and issues high-security JUMO Cryptographic verification watermarks.',
      icon: ShieldCheck,
      predefinedQueries: [
        'Issue JUMO Cryptographic Seal watermark for original 1892 baptismal register',
        'Verify SHA-256 seal of communion chalice set SAC-001'
      ]
    },
    {
      id: 'communication',
      name: 'AI Sovereign Communication Writer',
      focus: 'Sermon drafting, cyclic briefs, bishop briefs',
      description: 'Drafts bishop briefs, cyclic letters, sermon outline structures, and coordinates multi-channel announcements to cell leaders.',
      icon: MessageSquare,
      predefinedQueries: [
        'Draft a cyclic briefing to all parish vicars regarding Sunday School curricula',
        'Generate pastoral sermon outline focusing on intercession and welfare'
      ]
    }
  ];

  const activeAgent = agents.find(a => a.id === activeAgentId) || agents[0];

  const handleTriggerPreset = (query: string) => {
    setQueryInput(query);
    handleSendMessage(query);
  };

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || queryInput;
    if (!q.trim()) return;

    const userMsg = { sender: 'user' as const, text: q };
    setConversation(prev => [...prev, userMsg]);
    setQueryInput('');
    setIsResponding(true);

    setTimeout(() => {
      setIsResponding(false);
      let replyText = '';

      if (activeAgentId === 'strategy') {
        replyText = `📡 [Sovereign Strategy Agent]: Saturation analysis completed. Gulu District shows an optimal missionary opportunity. Regional population growth in Young Adult and Youth cohorts is unserved by structural parish networks. Recommends deploying 1 church planter and assigning $15,000 in capital missions funding.`;
      } else if (activeAgentId === 'pastoral') {
        replyText = `💖 [Pastoral Care Agent]: Audit of family registries shows the Kintu Family Household has registered a 32% drop in Sunday cell attendance. The AI recommends dispatching an outreach visit notification to Gulu Cell leadership.`;
      } else if (activeAgentId === 'finance') {
        replyText = `💰 [Financial Oversight Agent]: Double-entry general ledger is currently 100% balanced. Reconciled safaricom cash registers match active bank ACH entries. Budget leak risk: None detected. Department expenditure velocity remains safe.`;
      } else if (activeAgentId === 'governance') {
        replyText = `⚖️ [Synod Governance Agent]: Constitution Check Passed. Resolution on Youth Fund is compliant with Section 14 (Treasury Allocation) of the Provincial Canons. Recommend moving to dual-key Bishop signature.`;
      } else if (activeAgentId === 'heritage') {
        replyText = `🏺 [Heritage Curator Agent]: Original ledger stamp scanned. Watermark matches Diocesan Master Registry. Cryptographic signature and SHA-256 seal issued: JUMO-SEAL-ARCHIVE-998A2F. Code recorded on ledger.`;
      } else {
        replyText = `📝 [Sovereign Comm Agent]: Cyclic letter drafted. Highlights: "A call to theological development and youth confirmation tracking." Dispatched outline to Archbishop and Diocesan Chancellor desks.`;
      }

      setConversation(prev => [...prev, { sender: 'agent' as const, text: replyText }]);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Agents Selection */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b pb-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          AI Advisory Agents
        </h3>

        <div className="flex flex-col gap-1.5">
          {agents.map(agent => {
            const Icon = agent.icon;
            const isActive = activeAgentId === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => {
                  setActiveAgentId(agent.id);
                  setConversation([{ sender: 'agent', text: `${agent.name} online. Propose a query or tap one of the preset mandates below.` }]);
                  setQueryInput('');
                }}
                className={`w-full p-2.5 rounded-lg text-left transition-all flex items-center gap-2.5 text-xs font-semibold ${
                  isActive 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{agent.name}</span>
              </button>
            );
          })}
        </div>

        {/* Hyperparameter settings */}
        <div className="pt-4 border-t border-slate-100 space-y-3.5 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-slate-500" /> Settings Panel
          </span>

          <div className="space-y-3 p-3 bg-slate-50 border rounded-lg">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Agent Precision Temp: {agentSettings.temperature}</label>
              <input 
                type="range" 
                min="0.1" 
                max="0.8" 
                step="0.1"
                value={agentSettings.temperature}
                onChange={(e) => setAgentSettings({ ...agentSettings, temperature: parseFloat(e.target.value) })}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-semibold">Canon Law Strict Guardrails</span>
              <input 
                type="checkbox" 
                checked={agentSettings.governanceLock}
                onChange={(e) => setAgentSettings({ ...agentSettings, governanceLock: e.target.checked })}
                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chat workspace */}
      <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[520px]">
        {/* Agent Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl flex justify-between items-center text-xs">
          <div>
            <strong className="text-slate-900 font-bold block">{activeAgent.name}</strong>
            <span className="text-slate-500 mt-0.5 block">{activeAgent.focus}</span>
          </div>
          <span className="px-2 py-0.5 rounded font-mono font-bold bg-purple-100 text-purple-800 text-[10px]">
            {agentSettings.aegisAuditLevel}
          </span>
        </div>

        {/* Conversation flow */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          {conversation.map((msg, i) => {
            const isAgent = msg.sender === 'agent';
            return (
              <div key={i} className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                <div className={`p-3 rounded-xl max-w-xl leading-relaxed ${
                  isAgent 
                    ? 'bg-slate-100 text-slate-800' 
                    : 'bg-purple-600 text-white font-medium shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
          {isResponding && (
            <div className="flex justify-start">
              <div className="p-3 rounded-xl bg-slate-100 text-slate-500 flex items-center gap-1.5 font-semibold">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Analyzing core database records and compiling reports...
              </div>
            </div>
          )}
        </div>

        {/* Preset Queries */}
        <div className="p-3 border-t bg-slate-50 text-[10px] space-y-1.5">
          <span className="font-bold text-slate-600 uppercase tracking-wider block">PRESET AI ANALYSIS MANIDATES</span>
          <div className="flex flex-wrap gap-1.5">
            {activeAgent.predefinedQueries.map((query, idx) => (
              <button
                key={idx}
                onClick={() => handleTriggerPreset(query)}
                className="px-2.5 py-1 rounded bg-white border hover:border-purple-400 hover:bg-purple-50 text-slate-700 transition-all font-semibold"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Input bar */}
        <div className="p-3 border-t border-slate-200 bg-white rounded-b-xl flex gap-2">
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Propose custom advisory query or analyze active ledgers..."
            className="flex-1 p-2 border rounded-lg text-xs focus:ring-1 focus:ring-purple-500 focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={() => handleSendMessage()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-all"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple inline SVG substitute icon to prevent missing heart icon import error
function HeartIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
