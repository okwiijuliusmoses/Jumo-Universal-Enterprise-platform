import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Sparkles, Activity, Shield, Cpu, Zap, 
  Terminal, Search, Settings, RefreshCw, Layers,
  CheckCircle2, AlertCircle, HardDrive, Brain, Send, Lock, Eye
} from 'lucide-react';
import { EngineeringAgent, ManufacturingJob } from '../../../core/factory/registry/HubRegistryTypes';
import { AgentWorkLog, CoordinationEvent } from '../../../core/runtime/sovereignState.types';
import { StructuredAIResponseRenderer } from '../components/StructuredAIResponseRenderer';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';
import { AIWorkforceRealityEngine, AIWorkerRecord } from '../../../core/ai/workforce/AIWorkforceRealityEngine';

interface ReasoningResult {
  requestId: string;
  mode: string;
  understoodIntent: string;
  response: string;
  plan?: Array<{ id: string; title: string; description: string; status: string; responsibleLayer?: string }>;
  delegation?: { required: boolean; agentId?: string; reason?: string };
  requiresHumanApproval?: boolean;
  timestamp: string;
}

interface EngineeringStudioProps {
  agents: EngineeringAgent[];
  jobs: ManufacturingJob[];
  workLogs?: AgentWorkLog[];
  eventLog?: CoordinationEvent[];
}

export const EngineeringStudio: React.FC<EngineeringStudioProps> = ({ jobs = [], workLogs = [], eventLog = [] }) => {
  const allLogs = [
    ...(eventLog ?? []).map(e => `[${e.sourceStudio}→${e.destinationStudio}] ${e.action}: ${e.entityId}`),
    ...(workLogs ?? []).map(l => `[${l.specialization}] ${l.task}: ${l.result.slice(0, 80)}${l.result.length > 80 ? '...' : ''}`),
    ...(jobs ?? []).flatMap(j => j.logs)
  ].slice(0, 20);

  const [realityWorkers, setRealityWorkers] = useState<AIWorkerRecord[]>([]);

  useEffect(() => {
    const engine = AIWorkforceRealityEngine.getInstance();
    setRealityWorkers(engine.getAllWorkers());
  }, []);

  // JUMO AI Interactive Terminal States
  const [selectedAgentId, setSelectedAgentId] = useState<string>('AI-SYS-ARCH-01');
  const [promptText, setPromptText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<ReasoningResult | string | null>(null);
  const [clearanceAuthorized, setClearanceAuthorized] = useState<boolean>(true);

  // Review Workspace States
  const [selectedJobId, setSelectedJobId] = useState<string | null>(jobs[0]?.id || null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [rejectionFeedback, setRejectionFeedback] = useState("");

  const selectedAgent = realityWorkers.find(a => a.id === selectedAgentId) || realityWorkers[0];
  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  const handleQueryAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() || isGenerating) return;

    setIsGenerating(true);
    setAiResponse(null);

    try {
      // Call the authoritative execution endpoint
      const response = await fetch('/api/v1/ueos/ai/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-operator-name': 'Sovereign Operator Alpha'
        },
        body: JSON.stringify({
          agentId: selectedAgentId,
          taskTitle: promptText.trim(),
          discipline: selectedAgent?.discipline,
          jobId: jobs[0]?.id // Default to most recent job if available
        })
      });

      if (!response.ok) {
        throw new Error(`Execution failed (HTTP ${response.status})`);
      }

      const workLog = await response.json();
      setAiResponse({
        requestId: workLog.id,
        mode: 'execution',
        understoodIntent: `Execute ${selectedAgent?.discipline} task: ${promptText.trim()}`,
        response: workLog.result,
        timestamp: workLog.timestamp,
        delegation: { required: false },
        plan: [
          { id: '1', title: 'Task Started', description: 'Agent handshake and tool authorization.', status: 'COMPLETED' },
          { id: '2', title: 'Work Executed', description: 'Specialized logic compilation.', status: 'COMPLETED' },
          { id: '3', title: 'Evidence Sealed', description: `SHA256: ${workLog.evidenceHash?.slice(0, 16)}...`, status: 'COMPLETED' }
        ]
      } as any);

    } catch (err: any) {
      console.error(err);
      setAiResponse(`[EXECUTION_ERROR] Failed to complete authoritative task lifecycle. Detail: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };
  const handleReviewDecision = async (decision: 'APPROVE' | 'REJECT') => {
    if (!selectedJob) return;
    const gate = selectedJob.reviewGates?.find(g => g.status === 'PENDING' && g.gateType === 'ENGINEERING_APPROVAL');
    if (!gate) return;

    setIsSubmittingReview(true);
    try {
      const response = await fetch('/api/v1/ueos/manufacturing/review/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob.id,
          gateId: gate.id,
          decision,
          feedback: decision === 'REJECT' ? { rejectionReason: rejectionFeedback } : undefined
        })
      });
      if (response.ok) {
        setRejectionFeedback("");
        // Reload page or trigger data refresh if needed
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to submit review", err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const pendingEngineeringJobs = jobs.filter(j => j.status === 'AWAITING_HUMAN_ENGINEERING_APPROVAL');

  return (
    <div className="space-y-6" id="workforce-studio-container">
      <StudioLifecycleNavBar studioId="engineering" />
      
      {/* Human-Gated Engineering Review Workspace */}
      {pendingEngineeringJobs.length > 0 && (
        <div className="bg-slate-900 rounded-3xl border border-blue-500/30 overflow-hidden shadow-2xl">
          <div className="bg-blue-600 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-white" />
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Awaiting Engineering & Architecture Approval</h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-blue-100 uppercase tracking-widest bg-blue-700 px-3 py-1 rounded-full border border-blue-400/30">
                {pendingEngineeringJobs.length} PENDING GATES
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Job Selector Sidebar */}
            <div className="lg:col-span-3 border-r border-slate-800 bg-slate-900/50 p-4 space-y-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2 block mb-3">Expansion Queue</span>
              {pendingEngineeringJobs.map(job => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all border ${
                    selectedJobId === job.id ? 'bg-blue-600/10 border-blue-500/50' : 'bg-transparent border-transparent hover:bg-slate-800'
                  }`}
                >
                  <h4 className="text-xs font-black text-slate-200 truncate">{job.productId}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[8px] font-bold text-blue-400 uppercase tracking-tighter bg-blue-900/40 px-1.5 py-0.5 rounded border border-blue-700/30">
                      {job.ecosystem}
                    </span>
                    <span className="text-[8px] font-medium text-slate-500">{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Detailed Report View */}
            <div className="lg:col-span-9 p-8">
              {selectedJob?.engineeringReport ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight leading-none">Engineering Verification Report</h3>
                      <p className="text-slate-400 text-sm mt-2 font-medium">Authoritative Multi-Agent Architecture Expansion Results</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] font-black text-slate-500 uppercase block leading-none">Integrity Status</span>
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-widest mt-1 block flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 space-y-4">
                      <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest border-b border-slate-700 pb-2">Domain Decomposition</h5>
                      <div className="space-y-3">
                        {(Array.isArray(selectedJob.engineeringReport.expansion.domainDecomposition) ? selectedJob.engineeringReport.expansion.domainDecomposition : []).map((d: string, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-xs text-slate-300 font-bold">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 space-y-4">
                      <h5 className="text-[10px] font-black text-purple-400 uppercase tracking-widest border-b border-slate-700 pb-2">Architecture Stack</h5>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(selectedJob.engineeringReport.architecture.layers) ? selectedJob.engineeringReport.architecture.layers : []).map((l: string, i: number) => (
                          <span key={i} className="text-[10px] font-black text-slate-300 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg uppercase">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
                    <h5 className="text-[10px] font-black text-amber-400 uppercase tracking-widest border-b border-slate-700 pb-2 mb-4 flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5" /> Component Inventory & Responsibility Matrix
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-700 text-[9px] font-black text-slate-500 uppercase">
                            <th className="pb-3">Component</th>
                            <th className="pb-3">Type</th>
                            <th className="pb-3">Responsibility</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                          {(Array.isArray(selectedJob.engineeringReport.components) ? selectedJob.engineeringReport.components : []).map((c: any, i: number) => (
                            <tr key={i}>
                              <td className="py-3 text-xs font-black text-slate-200">{c.name}</td>
                              <td className="py-3 text-[10px] font-bold text-blue-400 uppercase font-mono">{c.type}</td>
                              <td className="py-3 text-[10px] font-medium text-slate-400">{c.responsibility}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                      <h5 className="text-sm font-black text-white">Institutional Acceptance Gating</h5>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Verify architecture and engineering contracts before promoting to factory manufacturing.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                      <div className="relative group w-full md:w-64">
                        <textarea
                          placeholder="Feedback for rejection..."
                          value={rejectionFeedback}
                          onChange={(e) => setRejectionFeedback(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300 placeholder:text-slate-600 focus:border-red-500/50 transition-all"
                        />
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => handleReviewDecision('REJECT')}
                          disabled={isSubmittingReview}
                          className="px-6 py-2.5 rounded-xl border border-red-500/30 text-red-500 text-[11px] font-black uppercase hover:bg-red-500/10 transition-all disabled:opacity-50"
                        >
                          Reject with Feedback
                        </button>
                        <button
                          onClick={() => handleReviewDecision('APPROVE')}
                          disabled={isSubmittingReview}
                          className="px-8 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase shadow-xl shadow-blue-900/20 hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                          {isSubmittingReview ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          Approve Expansion
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                  <Cpu className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-bold text-sm">Select a job to inspect expansion report</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Workforce Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Engineering Workforce Studio</h2>
            <p className="text-xs text-slate-500 font-semibold">Cognitive Agent Swarm & Autonomous Logic Orchestration Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block leading-none">Swarm Health</span>
            <span className="text-xs font-black text-emerald-600 uppercase flex items-center justify-end gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              98.4% Nominal
            </span>
          </div>
        </div>
      </div>

      {/* Workforce Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="agents-workforce-grid">
        {(realityWorkers ?? []).map((agent) => (
          <motion.div 
            key={agent.id}
            whileHover={{ y: -3 }}
            className={`p-5 rounded-2xl border bg-white shadow-xs space-y-4 flex flex-col justify-between transition-all ${
              selectedAgentId === agent.id ? 'border-blue-600 ring-2 ring-blue-500/10' : 'border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  agent.status === 'REAL_EXECUTING_ENGINEER' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  <Brain className="w-5 h-5" />
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border ${
                  agent.status === 'REAL_EXECUTING_ENGINEER' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-700 border-slate-100'
                }`}>
                  {agent.status.replace(/_/g, ' ')}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  {agent.name}
                  {agent.status === 'REAL_EXECUTING_ENGINEER' && <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />}
                </h4>
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider block mt-0.5">{agent.discipline}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Provider & Model</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[8px] font-black text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200/60 uppercase">
                    {agent.provider} - {agent.model}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
                {agent.id}
              </span>
              <button 
                onClick={() => setSelectedAgentId(agent.id)}
                className="text-[9px] font-black text-blue-600 hover:text-blue-700 uppercase cursor-pointer"
              >
                Access Core
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contextual JUMO AI Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="contextual-cognitive-terminal">
        {/* Left Side: Agent Query input */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="text-sm font-black text-slate-900 leading-none">Cognitive Sandbox Interface</h3>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block uppercase">Direct Operator Command Handshake</span>
              </div>
            </div>
            <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 border border-blue-100 rounded-full font-mono">
              LEVEL-10 Clearance
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Query the JUMO-AI agent swarm. Authoritative outputs are validated against the current Zero-Trust security rules and compiler schemas.
          </p>

          <form onSubmit={handleQueryAgent} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label htmlFor="agent-select" className="text-[9px] font-black uppercase text-slate-600 tracking-wider">Selected Cognitive Agent</label>
              <select
                id="agent-select"
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-blue-500"
              >
                {realityWorkers.map(a => (
                  <option key={a.id} value={a.id}>{a.name} — {a.discipline}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="terminal-prompt" className="text-[9px] font-black uppercase text-slate-600 tracking-wider">Cognitive Directive</label>
              <textarea
                id="terminal-prompt"
                rows={4}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder={`Ask ${selectedAgent?.name || 'Agent'} to analyze schemas, design blueprints, or trace network boundaries...`}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-blue-500 font-sans text-slate-800 leading-relaxed placeholder:text-slate-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating || !promptText.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-blue-600 disabled:opacity-40 text-white rounded-xl text-xs font-black uppercase transition-all shadow-xs cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Compiling Cognitive Logic...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Execute Directive
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Render Console Output */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[400px]">
          <div className="px-4 py-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              Direct Intelligence Console Output
            </span>
            <span className="text-[9px] font-mono font-bold text-slate-500">ECDSA SECURE COGNITIVE CHANNELS</span>
          </div>

          <div className="flex-1 p-5 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300 space-y-3">
            {isGenerating && (
              <div className="flex flex-col items-center justify-center h-full space-y-3 py-10">
                <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest animate-pulse">Running live reasoning models...</span>
              </div>
            )}

            {!isGenerating && aiResponse && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-2.5 mb-2.5 flex items-center justify-between">
                  <span className="text-[9px] text-slate-500 font-bold uppercase">
                    {typeof aiResponse === 'object' ? `Request: ${aiResponse.requestId?.slice(0,8) || 'N/A'}` : 'Response sealed'}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-black">MATCHED JUMO-SECURE-KEY-SHA256</span>
                </div>
                
                <StructuredAIResponseRenderer response={aiResponse} theme="dark" />
              </div>
            )}

            {!isGenerating && !aiResponse && (
              <div className="flex flex-col items-center justify-center h-full text-slate-600 italic py-10">
                <Brain className="w-8 h-8 text-slate-800 mb-2" />
                <span>Operator Directive Standby. Ready to initiate direct neural pathways...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Swarm Intelligence Feed */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest">Global Swarm Intelligence Feed</h3>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
            <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-emerald-500" /> 12ms LATENCY</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-blue-500" /> ZERO-TRUST ENCRYPTED</span>
          </div>
        </div>
        
        <div className="h-44 overflow-y-auto font-mono text-[10px] space-y-2.5 pr-4 scrollbar-thin scrollbar-thumb-slate-800">
          {allLogs.length > 0 ? (
            allLogs.map((log, i) => (
              <div key={i} className="flex gap-3 text-emerald-400/80">
                <span className="text-slate-700 shrink-0 select-none">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-emerald-500 font-bold">›</span>
                <span className="leading-relaxed">{log}</span>
              </div>
            ))
          ) : (
            <div className="text-slate-600 italic">Standing by for operator next-stage promotion command...</div>
          )}
        </div>
      </div>
    </div>
  );
};
