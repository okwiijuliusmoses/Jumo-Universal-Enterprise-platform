import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
  ShieldAlert,
  Activity,
  Server,
  Terminal,
  Cpu,
  Bot,
  Zap,
  RefreshCw,
  Search,
  Check,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileCode,
  FileCheck
} from 'lucide-react';
import {
  JumoRemoteDigitalWorkshop,
  ApplicationHealthTelemetry,
  MaintenanceIncident,
  MaintenanceAutonomyLevel
} from '../../../core/maintenance/JumoRemoteDigitalWorkshop';
import { JumoMaintenanceManufacturingPipeline } from '../../../core/maintenance/JumoMaintenanceManufacturingPipeline';
import { JumoAIAgentRegistry } from '../../../core/ai/registry/JumoAIAgentRegistry';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';

export const RemoteDigitalWorkshopStudio: React.FC = () => {
  const workshop = JumoRemoteDigitalWorkshop.getInstance();
  const [nodes, setNodes] = useState<ApplicationHealthTelemetry[]>([]);
  const [incidents, setIncidents] = useState<MaintenanceIncident[]>([]);
  const [selectedNode, setSelectedNode] = useState<ApplicationHealthTelemetry | null>(null);
  const [autonomyLevel, setAutonomyLevel] = useState<MaintenanceAutonomyLevel>('AUTONOMOUS_VERIFIED_PATCHING');
  
  // 26-Step Pipeline Execution State
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null);
  const [pipelineExecuting, setPipelineExecuting] = useState<boolean>(false);
  const [pipelineCurrentStep, setPipelineCurrentStep] = useState<number>(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [lastExecutedSession, setLastExecutedSession] = useState<any | null>(null);

  // New simulated incident form
  const [simComponent, setSimComponent] = useState<string>('FAAPBridgePaymentGateway');
  const [simError, setSimError] = useState<string>('Unhandled null reference exception during token validation at line 142');

  useEffect(() => {
    refreshWorkshopData();
  }, []);

  const refreshWorkshopData = () => {
    const list = workshop.getAllNodes();
    setNodes(list);
    setIncidents(workshop.getAllIncidents());
    setAutonomyLevel(workshop.getAutonomyLevel());
    if (list.length > 0 && !selectedNode) {
      setSelectedNode(list[0]);
    }
  };

  const handleSimulateIncident = () => {
    const targetApp = selectedNode ? selectedNode.applicationId : 'APP-WIGGINS-SEC-001';
    const incident = workshop.reportIncident({
      applicationId: targetApp,
      title: `Critical Fault: ${simComponent}`,
      severity: 'HIGH',
      errorDetails: simError
    });
    refreshWorkshopData();
    setActiveIncidentId(incident.incidentId);
  };

  const handleExecute26StepPipeline = async (incident: MaintenanceIncident) => {
    setActiveIncidentId(incident.incidentId);
    setPipelineExecuting(true);
    setPipelineCurrentStep(1);
    setPipelineLogs([]);

    const steps26 = [
      "1. Error Capture & Payload Extraction",
      "2. Exception Fingerprinting & Stack Normalization",
      "3. Diagnostic Package Generation",
      "4. Scoped Maintenance Authorization Token Issuance",
      "5. Multi-Agent Specialist Swarm Assignment",
      "6. Root Cause Analysis (RCA) Compilation",
      "7. Safe State Recovery Boundary Verification",
      "8. Non-Code Configuration Audit",
      "9. AI Code Patch Synthesis & Differential Generation",
      "10. Architectural Invariant Layer Verification",
      "11. Type & Syntax Linting Verification",
      "12. Isolated Sandbox Compilation",
      "13. Unit & Integration Regression Testing Suite",
      "14. Performance & Latency Benchmark Assertion",
      "15. Security & Permission Audit (RBAC / ABAC)",
      "16. Zero-Trust Cryptographic Token Validation",
      "17. Staging Floor Canary Deployment Slot",
      "18. Staging Traffic Allocation (10% Canary)",
      "19. Real-Time Telemetry & Error Rate Observation",
      "20. Production Staged Promotion",
      "21. Production Traffic Shift (100% Active)",
      "22. Multi-Agent Verification Sign-off",
      "23. Ledger & Immutable Audit Event Logging",
      "24. Institutional ERP Notification Dispatch",
      "25. Maintenance Token Expiry & Cryptographic Revocation",
      "26. Final Session Certification & Sovereign Green Seal"
    ];

    for (let i = 0; i < steps26.length; i++) {
      setPipelineCurrentStep(i + 1);
      setPipelineLogs(prev => [...prev, `[STEP ${i + 1}/26] ${steps26[i]} — COMPLETE (PASS)`]);
      await new Promise(r => setTimeout(r, 120));
    }

    try {
      const session = await JumoMaintenanceManufacturingPipeline.executePipeline(
        simComponent,
        incident.errorDetails
      );
      setLastExecutedSession(session);
      workshop.updateIncidentStatus(incident.incidentId, 'DEPLOYED');
      refreshWorkshopData();
    } finally {
      setPipelineExecuting(false);
    }
  };

  const handleRollback = (incidentId: string) => {
    workshop.updateIncidentStatus(incidentId, 'ROLLED_BACK');
    refreshWorkshopData();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="remote-digital-workshop-studio">
      <StudioLifecycleNavBar studioId="workshop" />

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-400/20">
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight">Remote Digital Workshop</h1>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                  Zero Travel • Autonomous Repair
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Remotely Monitor, Diagnose, Patch, and Certify Deployed Enterprise Applications with 26-Step Autonomous Pipelines
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-right">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Autonomy Mode</span>
              <span className="text-xs font-black text-amber-400">{autonomyLevel.replace(/_/g, ' ')}</span>
            </div>
            <button
              onClick={refreshWorkshopData}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all border border-slate-700 cursor-pointer"
              title="Refresh Fleet Status"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Monitored Fleet</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-white">{nodes.length} Nodes</span>
              <Server className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Incidents</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-amber-400">{incidents.filter(i => i.status !== 'CLOSED' && i.status !== 'DEPLOYED').length} Open</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Repaired & Certified</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-emerald-400">{incidents.filter(i => i.status === 'DEPLOYED').length} Patched</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Mean Time to Repair</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-indigo-400">1.8 Seconds</span>
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Fleet Health & Active Incidents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Monitored Application Fleet */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Monitored Fleet Workspaces
            </h3>
            <span className="text-[10px] font-bold text-slate-400">{nodes.length} Deployed</span>
          </div>

          <div className="space-y-3">
            {nodes.map(node => (
              <div
                key={node.applicationId}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedNode?.applicationId === node.applicationId
                    ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-md ring-1 ring-blue-500/20'
                    : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{node.applicationName}</h4>
                    <span className="text-[9px] font-mono text-slate-400">{node.applicationId}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                    node.runtimeStatus === 'HEALTHY' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                  }`}>
                    {node.runtimeStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-slate-500">
                  <div>
                    <span className="text-slate-400 block text-[8px]">Latency</span>
                    <span className="font-bold">{node.latencyP95Ms}ms</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[8px]">CPU</span>
                    <span className="font-bold">{node.cpuUtilizationPercentage}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[8px]">Error Rate</span>
                    <span className="font-bold text-emerald-500">{node.errorRatePercentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trigger Incident Simulator */}
          <div className="bg-slate-100 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulate Remote Incident</span>
            </h4>
            <div className="space-y-2 text-xs">
              <input
                type="text"
                value={simComponent}
                onChange={e => setSimComponent(e.target.value)}
                placeholder="Faulty Component Name"
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-medium focus:outline-none"
              />
              <textarea
                rows={2}
                value={simError}
                onChange={e => setSimError(e.target.value)}
                placeholder="Error Details & Exception Stack"
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-[11px] focus:outline-none resize-none"
              />
              <button
                onClick={handleSimulateIncident}
                className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all shadow-xs cursor-pointer"
              >
                Inject Remote Fault
              </button>
            </div>
          </div>
        </div>

        {/* Middle & Right Column: Incidents & 26-Step Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Incidents List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Active Maintenance Incidents</h3>
                <p className="text-xs text-slate-500">Autonomous multi-agent triage and repair orchestrator</p>
              </div>
            </div>

            {incidents.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 font-medium">
                No active incidents. Fleet operating normally under Sovereign SLA.
              </div>
            ) : (
              <div className="space-y-3">
                {incidents.map(inc => (
                  <div
                    key={inc.incidentId}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                            {inc.severity}
                          </span>
                          <h4 className="text-xs font-black text-slate-900 dark:text-white">{inc.title}</h4>
                        </div>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">{inc.errorDetails}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        inc.status === 'DEPLOYED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {inc.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <Bot className="w-3.5 h-3.5 text-blue-500" />
                        <span>Assigned: <b>{inc.assignedEngineerName || 'AI SRE Swarm'}</b></span>
                      </div>

                      <div className="flex items-center gap-2">
                        {inc.status !== 'DEPLOYED' && (
                          <button
                            onClick={() => handleExecute26StepPipeline(inc)}
                            disabled={pipelineExecuting}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <Play className="w-3 h-3" />
                            <span>Launch 26-Step Autonomous Repair</span>
                          </button>
                        )}
                        {inc.status === 'DEPLOYED' && (
                          <button
                            onClick={() => handleRollback(inc.incidentId)}
                            className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-rose-100 hover:text-rose-600 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Rollback</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive 26-Step Pipeline Execution Visualizer */}
          {(pipelineExecuting || pipelineLogs.length > 0) && (
            <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider">
                    26-Step Autonomous Repair Manufacturing Pipeline
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                  {pipelineExecuting ? `Executing Step ${pipelineCurrentStep}/26` : 'Pipeline Completed • Certified Green'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-500 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(pipelineCurrentStep / 26) * 100}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Terminal Logs */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs max-h-48 overflow-y-auto space-y-1">
                {pipelineLogs.map((log, i) => (
                  <div key={i} className="text-emerald-400 text-[11px] leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>

              {lastExecutedSession && (
                <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span>Generated Code Patch:</span>
                    <span className="text-emerald-400 font-mono">Token Revoked: {lastExecutedSession.authToken?.tokenId}</span>
                  </div>
                  <pre className="p-3 bg-slate-950 rounded-lg text-blue-300 font-mono text-[11px] overflow-x-auto">
                    {lastExecutedSession.patchCode}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
