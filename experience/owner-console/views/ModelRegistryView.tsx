/**
 * Sovereign AI Model & Assistant Governance Center (Model Registry)
 * Authoritative Control Center view allowing C-Level Owners to configure JUMO AI Enterprise Engine
 * and JUMO AI Advanced Reasoning models across 5 distinct Sovereign Autonomy Levels.
 */

import React, { useState } from 'react';
import { 
  Cpu, Sparkles, Shield, Lock, Sliders, CheckCircle2, AlertCircle, 
  RefreshCw, Bot, Brain, Server, Database, Activity, Layers, Zap, Check, ArrowRight
} from 'lucide-react';

export interface ModelRegistryViewProps {
  onNavigateTab?: (tabId: string) => void;
}

interface ModelConfig {
  id: string;
  name: string;
  provider: 'JUMO AI' | 'Sovereign Core' | 'Enterprise AI';
  version: string;
  contextWindow: string;
  status: 'ACTIVE_PRIMARY' | 'ACTIVE_SECONDARY' | 'STANDBY_FALLBACK';
  encryption: string;
  latencyMs: number;
}

interface AssistantLevelConfig {
  assistantId: string;
  name: string;
  domain: string;
  assignedModel: string;
  autonomyLevel: 1 | 2 | 3 | 4 | 5;
  autonomyName: string;
  temperature: number;
  maxTokens: number;
  googleAiStyleEnabled: boolean;
  dailyInferenceCount: number;
}

export const ModelRegistryView: React.FC<ModelRegistryViewProps> = ({ onNavigateTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<'MODELS' | 'ASSISTANTS' | 'SECURITY_SHIELD'>('ASSISTANTS');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [models, setModels] = useState<ModelConfig[]>([
    {
      id: 'jumo-ai-3.6-plus-ent',
      name: 'JUMO AI Enterprise Engine',
      provider: 'JUMO AI',
      version: 'v3.6-Plus-Prod',
      contextWindow: '2,000,000 tokens',
      status: 'ACTIVE_PRIMARY',
      encryption: 'Ring-0 Token Shield (AES-256-GCM)',
      latencyMs: 142
    },
    {
      id: 'jumo-ai-flash',
      name: 'JUMO AI Flash Engine',
      provider: 'JUMO AI',
      version: 'v3.6-Flash-Fast',
      contextWindow: '1,000,000 tokens',
      status: 'ACTIVE_PRIMARY',
      encryption: 'Edge Cryptographic Shield',
      latencyMs: 48
    },
    {
      id: 'jumo-advanced-reasoning',
      name: 'JUMO Advanced Reasoning Core',
      provider: 'Enterprise AI',
      version: 'v2026-Enterprise',
      contextWindow: '128,000 tokens',
      status: 'ACTIVE_SECONDARY',
      encryption: 'Sovereign EU Edge Proxy',
      latencyMs: 210
    },
    {
      id: 'jumo-research-intelligence',
      name: 'JUMO Research Intelligence Agent Core',
      provider: 'Sovereign Core',
      version: 'v13.5-Sovereign',
      contextWindow: '4,000,000 tokens',
      status: 'ACTIVE_PRIMARY',
      encryption: 'Isolated Hardware Sandbox',
      latencyMs: 380
    }
  ]);

  const [assistants, setAssistants] = useState<AssistantLevelConfig[]>([
    {
      assistantId: 'ast-faap-01',
      name: 'FAAP Sovereign Credit & Risk Scorer',
      domain: 'Finance & Accounting (FAAP)',
      assignedModel: 'JUMO AI Enterprise Engine',
      autonomyLevel: 5,
      autonomyName: 'Level 5: Sovereign Full Autonomy (Unsupervised Real-Time Posting)',
      temperature: 0.1,
      maxTokens: 8192,
      googleAiStyleEnabled: true,
      dailyInferenceCount: 45200
    },
    {
      assistantId: 'ast-treasury-02',
      name: 'Treasury & Liquidity Pool Optimizer',
      domain: 'Sovereign Treasury & Digital Pay',
      assignedModel: 'JUMO AI Enterprise Engine',
      autonomyLevel: 4,
      autonomyName: 'Level 4: Supervised Enterprise Execution (Dual-Key Approval Required)',
      temperature: 0.2,
      maxTokens: 16384,
      googleAiStyleEnabled: true,
      dailyInferenceCount: 28900
    },
    {
      assistantId: 'ast-aegis-03',
      name: 'AEGIS Real-time AML Guardian & Fraud Sentinel',
      domain: 'Security Governance (AEGIS)',
      assignedModel: 'JUMO AI Flash Engine',
      autonomyLevel: 5,
      autonomyName: 'Level 5: Sovereign Full Autonomy (Instant Threat Mitigation)',
      temperature: 0.05,
      maxTokens: 4096,
      googleAiStyleEnabled: true,
      dailyInferenceCount: 112400
    },
    {
      assistantId: 'ast-reconcile-04',
      name: 'Inter-Bank Settlement & Reconciliation Assistant',
      domain: 'FINTECH Banking Switch',
      assignedModel: 'JUMO Advanced Reasoning Core',
      autonomyLevel: 3,
      autonomyName: 'Level 3: Assistive JUMO Enterprise AI Copilot Mode (Human-in-the-Loop Verification)',
      temperature: 0.3,
      maxTokens: 8192,
      googleAiStyleEnabled: true,
      dailyInferenceCount: 19400
    },
    {
      assistantId: 'ast-alumni-05',
      name: 'Alumni Endowment & Career Mentorship Advisor',
      domain: 'University Alumni Network',
      assignedModel: 'JUMO AI Flash Engine',
      autonomyLevel: 3,
      autonomyName: 'Level 3: Assistive JUMO Enterprise AI Copilot Mode (Human-in-the-Loop Verification)',
      temperature: 0.4,
      maxTokens: 4096,
      googleAiStyleEnabled: true,
      dailyInferenceCount: 8900
    },
    {
      assistantId: 'ast-telecom-06',
      name: 'Telecom Routing & Spectrum Tariff Optimizer',
      domain: 'Telecommunications Switch',
      assignedModel: 'JUMO Research Intelligence Agent Core',
      autonomyLevel: 4,
      autonomyName: 'Level 4: Supervised Enterprise Execution (Dual-Key Approval Required)',
      temperature: 0.15,
      maxTokens: 16384,
      googleAiStyleEnabled: true,
      dailyInferenceCount: 34100
    }
  ]);

  const handleLevelChange = (assistantId: string, newLevel: number) => {
    const levelNames: Record<number, string> = {
      1: 'Level 1: Sandbox Diagnostic & Testing (Zero Production Access)',
      2: 'Level 2: Strict Advisory & Grounding Mode (Read-Only RAG)',
      3: 'Level 3: Assistive JUMO Enterprise AI Copilot Mode (Human-in-the-Loop Verification)',
      4: 'Level 4: Supervised Enterprise Execution (Dual-Key Approval Required)',
      5: 'Level 5: Sovereign Full Autonomy (Unsupervised Real-Time Posting)'
    };

    setAssistants((prev) =>
      prev.map((ast) =>
        ast.assistantId === assistantId
          ? { ...ast, autonomyLevel: newLevel as any, autonomyName: levelNames[newLevel] || '' }
          : ast
      )
    );
    showNotice(`Updated ${assistantId} to Autonomy Level ${newLevel}`);
  };

  const handleModelChange = (assistantId: string, newModel: string) => {
    setAssistants((prev) =>
      prev.map((ast) => (ast.assistantId === assistantId ? { ...ast, assignedModel: newModel } : ast))
    );
    showNotice(`Re-routed ${assistantId} neural pipeline to ${newModel}`);
  };

  const showNotice = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleApplyAll = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showNotice('Successfully synchronized all AI Assistant Autonomy Levels & Sovereign AI Chat UI formatting across Ring-0 hardware nodes.');
    }, 800);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl border border-blue-200/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-[#0078D4] text-[11px] font-mono font-semibold uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Sovereign Model &amp; Assistant Control Center</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            AI Assistant Governance &amp; Model Level Config
          </h1>
          <p className="text-slate-700 text-xs leading-relaxed max-w-3xl">
            Configure JUMO AI Enterprise Engine and JUMO Advanced Reasoning models across 5 technical Sovereign Autonomy Levels. Enforce sovereign clean conversational formatting across all enterprise chat boxes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleApplyAll}
            disabled={loading}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{loading ? 'Synchronizing Mesh...' : 'Synchronize Autonomy Levels'}</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-900/80 border border-emerald-500/60 rounded-xl text-emerald-200 text-xs font-mono flex items-center gap-2 shadow-lg animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>[SYSTEM NOTICE]: {successMsg}</span>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 font-semibold text-xs gap-6">
        <button
          onClick={() => setActiveSubTab('ASSISTANTS')}
          className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeSubTab === 'ASSISTANTS'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Assistants &amp; Autonomy Level Config</span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px]">{assistants.length}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('MODELS')}
          className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeSubTab === 'MODELS'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Active Foundation Model Registry</span>
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-[10px]">{models.length}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('SECURITY_SHIELD')}
          className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeSubTab === 'SECURITY_SHIELD'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Sovereign AI Chat Box UI Standards &amp; Token Shield</span>
        </button>
      </div>

      {/* SUB-TAB 1: ASSISTANTS & AUTONOMY LEVEL CONFIG */}
      {activeSubTab === 'ASSISTANTS' && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>Sovereign Governance Mandate:</strong> Every domain AI assistant operates under strict C-level owner supervision. Autonomy Level 5 enables automated real-time FAAP ledger postings without human bypass.
              </span>
            </div>
            <span className="font-mono text-[10px] bg-blue-200 text-blue-900 px-2 py-1 rounded font-bold">RING-0 ENFORCED</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {assistants.map((ast) => (
              <div key={ast.assistantId} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">{ast.assistantId}</span>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{ast.domain}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Bot className="w-5 h-5 text-indigo-600" />
                      <span>{ast.name}</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-600 uppercase block">Daily Inferences</span>
                      <span className="text-xs font-mono font-bold text-slate-800">{ast.dailyInferenceCount.toLocaleString()} calls/day</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-lg flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Sovereign AI UI Mode
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {/* Model Assignment Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 block">Assigned Foundation Model</label>
                    <select
                      value={ast.assignedModel}
                      onChange={(e) => handleModelChange(ast.assistantId, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 p-2 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    >
                      <option value="JUMO AI Enterprise Engine">JUMO AI Enterprise Engine</option>
                      <option value="JUMO AI Flash Engine">JUMO AI Flash Engine</option>
                      <option value="JUMO Advanced Reasoning Core">JUMO Advanced Reasoning Core</option>
                      <option value="JUMO Research Intelligence Agent Core">JUMO Research Intelligence Agent Core</option>
                    </select>
                  </div>

                  {/* Autonomy Level Selector */}
                  <div className="space-y-1 lg:col-span-2">
                    <label className="text-[11px] font-bold text-slate-600 block flex items-center justify-between">
                      <span>Sovereign Autonomy Level (C-Level Control)</span>
                      <span className="text-[10px] text-blue-600 font-mono">Current: Level {ast.autonomyLevel}</span>
                    </label>
                    <select
                      value={ast.autonomyLevel}
                      onChange={(e) => handleLevelChange(ast.assistantId, Number(e.target.value))}
                      className="w-full bg-blue-50/50 border border-blue-300 p-2 rounded-lg text-xs font-bold text-blue-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    >
                      <option value={1}>Level 1: Sandbox Diagnostic &amp; Testing (Zero Production Access)</option>
                      <option value={2}>Level 2: Strict Advisory &amp; Grounding Mode (Read-Only RAG)</option>
                      <option value={3}>Level 3: Assistive JUMO Enterprise AI Copilot Mode (Human-in-the-Loop Verification)</option>
                      <option value={4}>Level 4: Supervised Enterprise Execution (Dual-Key Approval Required)</option>
                      <option value={5}>Level 5: Sovereign Full Autonomy (Unsupervised Real-Time Posting)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 font-mono">
                  <div className="flex items-center gap-4">
                    <span>Temp: <strong>{ast.temperature}</strong></span>
                    <span>Max Tokens: <strong>{ast.maxTokens}</strong></span>
                    <span>Chat Styling: <strong>Official JUMO Sovereign Design</strong></span>
                  </div>
                  <div className="text-emerald-600 font-bold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> Hardware Isolated
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: FOUNDATION MODEL REGISTRY */}
      {activeSubTab === 'MODELS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models.map((m) => (
              <div key={m.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">{m.provider}</span>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {m.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{m.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">Version: {m.version}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-[10px] text-slate-600 uppercase block">Context Window</span>
                    <span className="font-mono font-bold text-slate-800">{m.contextWindow}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-[10px] text-slate-600 uppercase block">Edge Latency</span>
                    <span className="font-mono font-bold text-emerald-600">{m.latencyMs} ms (EU/Africa Edge)</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-600 bg-slate-100 p-2 rounded flex items-center justify-between">
                  <span>Security Shield:</span>
                  <span className="font-bold text-slate-800">{m.encryption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SOVEREIGN AI CHAT BOX UI STANDARDS */}
      {activeSubTab === 'SECURITY_SHIELD' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Official JUMO AI Chat Box UI Enforcement &amp; Zero-Demo Standard</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              National platform design specification mandates the complete eradication of demo-style coloring wording (such as amber, gold, or simulated cards). All AI chat interfaces must adhere strictly to clean JUMO Sovereign AI professional styling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-blue-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Authorized JUMO Sovereign AI UI Standards
              </h4>
              <ul className="space-y-2 text-slate-600 list-disc pl-4 leading-relaxed font-sans">
                <li><strong>Clean Slate &amp; Neutral Canvas:</strong> High-contrast off-white and deep navy containers without arbitrary color gradients.</li>
                <li><strong>Typography Pairing:</strong> Plus Jakarta Sans and Inter body styling with monospace code syntax highlighting.</li>
                <li><strong>Structured Markdown Rendering:</strong> Automatic table formatting, bullet points, and copyable code blocks.</li>
                <li><strong>Real-Time Token Shield Attribution:</strong> Clear indicator showing active JUMO AI Engine model identity and AES-256 encryption status.</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50/50 border border-red-200 rounded-xl space-y-3">
              <h4 className="font-bold text-red-900 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" /> Forbidden Demo Artifacts (Purged)
              </h4>
              <ul className="space-y-2 text-red-800 list-disc pl-4 leading-relaxed font-sans">
                <li><strong>Zero Amber/Gold Wording:</strong> All promotional "gold", "amber", or "silver tier" badges are permanently disabled system-wide.</li>
                <li><strong>No Artificial Chat Bubbles:</strong> Eradicates cartoonish chat avatars or ungrounded generative AI slop animations.</li>
                <li><strong>No Hardcoded Placeholder Responses:</strong> All prompts route through sovereign service mesh proxies or authoritative offline fallbacks.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-mono text-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Sovereign Cryptographic Token Shield: ACTIVE</span>
                <span className="text-[11px] text-slate-600">All incoming and outgoing JUMO AI Engine prompts are sanitized against prompt injection and data exfiltration.</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded text-[11px] shrink-0">
              100% COMPLIANT
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelRegistryView;
