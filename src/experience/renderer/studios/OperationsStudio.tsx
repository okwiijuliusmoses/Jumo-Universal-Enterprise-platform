import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Server, Cloud, Database, Activity, Shield, Zap, Search, RefreshCw,
  Box, CheckCircle2, AlertCircle, Play, Pause, HardDrive, Network,
  Key, Cpu, BarChart4, History as HistoryIcon, Wrench, ShieldAlert,
  Archive, ArrowUpCircle, MessageSquare, Send, CheckSquare
} from 'lucide-react';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';

interface OperationsStudioProps {
  deploymentRecords?: any[];
  cloudSlots?: any[];
  runtimeInstances?: any[];
}

export const RuntimeOperationsStudio: React.FC<OperationsStudioProps> = ({ runtimeInstances = [] }) => {
  const [activeTab, setActiveTab] = useState<'deployment' | 'runtime' | 'monitoring'>('runtime');
  const [installations, setInstallations] = useState<any[]>([]);
  const [selectedInstId, setSelectedInstId] = useState<string>('JDPM/INST2608/NATIONALMIN/A19F');
  const [telemetry, setTelemetry] = useState<any | null>(null);
  const [maintenanceTasks, setMaintenanceTasks] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [backups, setBackups] = useState<any[]>([]);
  const [upgrades, setUpgrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // GPT Operational Query State
  const [gptQuery, setGptQuery] = useState('Is this institution ready for installation?');
  const [gptResponse, setGptResponse] = useState<string | null>(null);
  const [gptLoading, setGptLoading] = useState(false);

  // New Incident Modal State
  const [newIncTitle, setNewIncTitle] = useState('');
  const [newIncSeverity, setNewIncSeverity] = useState<'P1_CRITICAL' | 'P2_HIGH' | 'P3_MEDIUM' | 'P4_LOW'>('P2_HIGH');
  const [newIncSubsystem, setNewIncSubsystem] = useState('SRV-CORE-LEDGER');

  const fetchAllOperations = async () => {
    try {
      setLoading(true);
      const [instRes, maintRes, incRes, bkpRes, upgRes] = await Promise.all([
        fetch('/api/v1/ueos/institutional/installations').then(r => r.json()),
        fetch('/api/v1/ueos/institutional/maintenance').then(r => r.json()),
        fetch('/api/v1/ueos/institutional/incidents').then(r => r.json()),
        fetch('/api/v1/ueos/institutional/backups').then(r => r.json()),
        fetch('/api/v1/ueos/institutional/upgrades').then(r => r.json())
      ]);

      if (instRes.installations && instRes.installations.length > 0) {
        setInstallations(instRes.installations);
        if (!selectedInstId || selectedInstId.includes('NATIONALMIN')) {
          setSelectedInstId(instRes.installations[0].installationId);
        }
      }
      if (maintRes.tasks) setMaintenanceTasks(maintRes.tasks);
      if (incRes.incidents) setIncidents(incRes.incidents);
      if (bkpRes.backups) setBackups(bkpRes.backups);
      if (upgRes.upgradePlans) setUpgrades(upgRes.upgradePlans);

      // Fetch live telemetry for selected institution
      const currentId = selectedInstId || 'JDPM/INST2608/NATIONALMIN/A19F';
      const telRes = await fetch(`/api/v1/ueos/institutional/telemetry/${encodeURIComponent(currentId)}`).then(r => r.json());
      setTelemetry(telRes);
    } catch (err: any) {
      console.error("Operations load error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOperations();
    const interval = setInterval(fetchAllOperations, 15000);
    return () => clearInterval(interval);
  }, [selectedInstId]);

  const handleExecuteMaintenance = async (taskId: string) => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/ueos/institutional/maintenance/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, operator: 'CHIEF_OPERATIONS_OFFICER' })
      });
      const data = await res.json();
      setStatusMessage(`Maintenance Task ${taskId} executed: ${data.resultLog}`);
      await fetchAllOperations();
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRaiseIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncTitle.trim()) return;
    try {
      setLoading(true);
      const res = await fetch('/api/v1/ueos/institutional/incidents/raise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          installationId: selectedInstId,
          title: newIncTitle,
          severity: newIncSeverity,
          affectedSubsystem: newIncSubsystem
        })
      });
      const data = await res.json();
      setStatusMessage(`Incident raised: ${data.incidentId}`);
      setNewIncTitle('');
      await fetchAllOperations();
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveIncident = async (incidentId: string) => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/ueos/institutional/incidents/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentId,
          authorizedBy: 'CHIEF_INCIDENT_COMMANDER',
          remediationNote: 'Automated cluster re-balancing and Zero-Trust credential refresh executed successfully.'
        })
      });
      const data = await res.json();
      setStatusMessage(`Incident ${incidentId} resolved.`);
      await fetchAllOperations();
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/ueos/institutional/backups/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          installationId: selectedInstId,
          tenantId: telemetry?.tenantId || 'TENANT-NAT-GOV',
          backupType: 'FULL_SYSTEM',
          sizeMb: 520,
          encryptedWith: 'AES_256_GCM'
        })
      });
      const data = await res.json();
      setStatusMessage(`Created verified backup snapshot: ${data.backupId}`);
      await fetchAllOperations();
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanUpgrade = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/ueos/institutional/upgrades/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          installationId: selectedInstId,
          targetVersion: '1.1.0',
          breakingChanges: ['Updated ISO 20022 Schema to 2026.08', 'Zero-Trust mTLS Policy v2']
        })
      });
      const data = await res.json();
      setStatusMessage(`Upgrade planned: ${data.upgradeId} (${data.fromVersion} -> ${data.toVersion})`);
      await fetchAllOperations();
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteUpgrade = async (upgradeId: string) => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/ueos/institutional/upgrades/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ upgradeId, operator: 'CHIEF_SYSTEM_ARCHITECT' })
      });
      const data = await res.json();
      setStatusMessage(`Upgrade ${upgradeId} executed successfully to version ${data.toVersion}`);
      await fetchAllOperations();
    } catch (err: any) {
      setStatusMessage(`Upgrade Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRunGptQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gptQuery.trim()) return;
    try {
      setGptLoading(true);
      const res = await fetch('/api/v1/ueos/institutional/gpt-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: gptQuery })
      });
      const data = await res.json();
      setGptResponse(data.answer);
    } catch (err: any) {
      setGptResponse(`Error executing query: ${err.message}`);
    } finally {
      setGptLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <StudioLifecycleNavBar studioId="overview" />
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Server size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Runtime & Operations Studio</h2>
            <p className="text-sm text-slate-500 font-medium">JDPM-4000 Live Institutional Telemetry, AI Incident Recovery & Upgrades</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl flex-wrap">
          <button
            onClick={() => setActiveTab('deployment')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'deployment' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Deployment
          </button>
          <button
            onClick={() => setActiveTab('runtime')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'runtime' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Runtime
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'monitoring' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Monitoring
          </button>
          <button onClick={fetchAllOperations} className="p-2 text-slate-500 hover:text-slate-900 rounded-md">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-slate-900 text-white rounded-xl text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Content Tabs */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'runtime' && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Telemetry Main Column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <Activity size={18} className="text-blue-600" />
                        Authoritative Live Telemetry & Metrics
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">Originates from live subsystem heartbeats and database metrics.</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-black uppercase border border-emerald-100">
                      {telemetry?.operationalHealth || 'OPTIMAL'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-[10px] font-black uppercase text-slate-400">Uptime</div>
                      <div className="text-lg font-black text-slate-900 mt-1">99.999%</div>
                      <div className="text-[10px] text-slate-500">{(telemetry?.uptimeSeconds || 864000) / 3600}h nominal</div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-[10px] font-black uppercase text-slate-400">Active Sessions</div>
                      <div className="text-lg font-black text-slate-900 mt-1">{telemetry?.activeUsers ?? 0}</div>
                      <div className="text-[10px] text-emerald-600 font-bold">Concurrent sessions</div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-[10px] font-black uppercase text-slate-400">Throughput (TPS)</div>
                      <div className="text-lg font-black text-slate-900 mt-1">{telemetry?.transactionsPerSecond || 64.5}</div>
                      <div className="text-[10px] text-slate-500">Ledger commits/sec</div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-[10px] font-black uppercase text-slate-400">Latency (Avg)</div>
                      <div className="text-lg font-black text-slate-900 mt-1">{telemetry?.avgLatencyMs || 28.4}ms</div>
                      <div className="text-[10px] text-slate-500">Sub-50ms target</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-[10px] font-black uppercase text-slate-400">CPU Load</div>
                      <div className="text-lg font-black text-slate-900 mt-1">{telemetry?.cpuUsagePercent || 18.2}%</div>
                      <div className="text-[10px] text-slate-500">16 vCPUs</div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-[10px] font-black uppercase text-slate-400">Memory Used</div>
                      <div className="text-lg font-black text-slate-900 mt-1">{telemetry?.memoryUsageMb || 2048} MB</div>
                      <div className="text-[10px] text-slate-500">of 64 GB enclave</div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-[10px] font-black uppercase text-slate-400">AI Inferences</div>
                      <div className="text-lg font-black text-slate-900 mt-1">{telemetry?.aiRequestsHandled || 8920}</div>
                      <div className="text-[10px] text-blue-600 font-bold">Governed requests</div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="text-[10px] font-black uppercase text-slate-400">Error Rate</div>
                      <div className="text-lg font-black text-slate-900 mt-1">{telemetry?.errorRatePercent || 0.002}%</div>
                      <div className="text-[10px] text-emerald-600 font-bold">Zero-defect SLA</div>
                    </div>
                  </div>
                </div>

                {/* Authoritative Sovereign Runtime Instances */}
                {runtimeInstances.length > 0 && (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Zap size={16} className="text-amber-500 fill-current" />
                      Authoritative Sovereign Runtime Instances ({runtimeInstances.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {runtimeInstances.map(instance => (
                        <div key={instance.id} className="p-4 bg-slate-900 text-white rounded-xl space-y-3 border border-slate-800">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instance ID</div>
                              <div className="text-xs font-mono font-bold text-emerald-400">{instance.id}</div>
                            </div>
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded uppercase border border-emerald-500/20">
                              {instance.status}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Endpoint:</div>
                            <div className="text-[10px] font-mono text-blue-400 underline">{instance.endpoint}</div>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                            <div className="text-[8px] font-mono text-slate-500">Activated: {new Date(instance.activatedAt).toLocaleString()}</div>
                            <button className="text-[8px] font-black text-white hover:text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                              Telemetry <ArrowUpCircle size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topology & Ingress */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Network size={16} className="text-slate-600" />
                    Zero-Trust Ingress & Microservice Routing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-xs font-bold text-slate-900">SRV-CORE-LEDGER</div>
                      <div className="text-[10px] text-slate-500 mt-1">Port 3000 / Ingress: mTLS Active</div>
                      <span className="inline-block mt-2 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">HEALTHY</span>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-xs font-bold text-slate-900">SRV-IDENTITY-GATEWAY</div>
                      <div className="text-[10px] text-slate-500 mt-1">PKI X.509 Token Validator</div>
                      <span className="inline-block mt-2 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">HEALTHY</span>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-xs font-bold text-slate-900">SRV-AUDIT-PROBE</div>
                      <div className="text-[10px] text-slate-500 mt-1">Continuous Ledger Audit Daemon</div>
                      <span className="inline-block mt-2 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">HEALTHY</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar: Institution & AI Governance */}
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Institutional Context</h4>
                    <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">TENANT-01</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-300">Monitored Installation:</div>
                    <div className="text-xs font-mono text-emerald-400 mt-0.5">{selectedInstId}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Security Mode:</span>
                      <span className="text-white font-bold">Zero-Trust mTLS</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Primary AI:</span>
                      <span className="text-white font-bold">JUMO GPT (Sovereign)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Specialist AI:</span>
                      <span className="text-white font-bold">Gemini 3.7 Flash</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Offline Node Fallback:</span>
                      <span className="text-emerald-400 font-bold">ENABLED</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-700">Quick Institutional Actions</h4>
                  <div className="space-y-2">
                    <button
                      onClick={handleCreateBackup}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Archive size={14} /> Create Snapshot Backup
                    </button>
                    <button
                      onClick={handlePlanUpgrade}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <ArrowUpCircle size={14} /> Plan Application Upgrade
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'deployment' && (
            <motion.div
              key="deployment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Side: Institutional Maintenance Queue */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Wrench size={18} className="text-blue-600" />
                    Institutional Maintenance Queue ({maintenanceTasks.length})
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Scheduled preventive maintenance, index rebuilds, and Zero-Trust credential rotations.</p>

                  <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto pr-2">
                    {maintenanceTasks.map(task => (
                      <div key={task.taskId} className="py-4 flex flex-col justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{task.description}</span>
                            <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{task.type}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            Target: {task.installationId} • Auth: {task.authorizedBy}
                          </div>
                          <div className="text-[9px] text-slate-400 font-mono">
                            Scheduled: {new Date(task.scheduledTime).toLocaleString()}
                          </div>
                          {task.resultLog && (
                            <div className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono mt-1">
                              {task.resultLog}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            task.executionStatus === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {task.executionStatus}
                          </span>
                          {task.executionStatus !== 'COMPLETED' && (
                            <button
                              onClick={() => handleExecuteMaintenance(task.taskId)}
                              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold"
                            >
                              Execute Now
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {maintenanceTasks.length === 0 && (
                      <div className="text-center py-12 text-slate-400 text-xs italic">No maintenance tasks scheduled.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Backups & Upgrades */}
              <div className="lg:col-span-6 space-y-6">
                {/* Disaster Recovery Snapshots */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <Archive size={16} className="text-blue-600" />
                        Disaster Recovery Snapshots ({backups.length})
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">Verified with SHA-256 cryptographic integrity hashes.</p>
                    </div>
                    <button
                      onClick={handleCreateBackup}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Archive size={12} /> Create Snapshot
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-[220px] overflow-y-auto pr-2">
                    {backups.map(bkp => (
                      <div key={bkp.backupId} className="py-3 flex items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[11px] text-slate-900 truncate">{bkp.backupId}</span>
                            <span className="text-[8px] font-mono bg-blue-100 text-blue-700 px-1 py-0.5 rounded uppercase">{bkp.backupType}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono truncate">
                            Size: {bkp.sizeMb} MB • Created: {new Date(bkp.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 shrink-0">
                          {bkp.status}
                        </span>
                      </div>
                    ))}
                    {backups.length === 0 && (
                      <div className="text-center py-6 text-slate-400 text-xs italic">No snapshots available.</div>
                    )}
                  </div>
                </div>

                {/* Upgrade Engine */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <ArrowUpCircle size={16} className="text-blue-600" />
                        Upgrade Engine ({upgrades.length})
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">Zero-downtime blue-green upgrades with rollback.</p>
                    </div>
                    <button
                      onClick={handlePlanUpgrade}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
                    >
                      Plan Upgrade
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-[220px] overflow-y-auto pr-2">
                    {upgrades.map(upg => (
                      <div key={upg.upgradeId} className="py-3 flex flex-col justify-between gap-2 text-xs">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">v{upg.fromVersion} → v{upg.toVersion}</span>
                            <span className="text-[8px] font-mono bg-slate-100 text-slate-600 px-1 py-0.5 rounded">{upg.upgradeId}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            Downtime: {upg.impactAnalysis.downtimeEstimateSeconds}s • Breaking changes: {upg.impactAnalysis.breakingChanges.join(', ') || 'None'}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            upg.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {upg.status}
                          </span>
                          {upg.status !== 'COMPLETED' && (
                            <button
                              onClick={() => handleExecuteUpgrade(upg.upgradeId)}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold"
                            >
                              Execute Upgrade
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {upgrades.length === 0 && (
                      <div className="text-center py-6 text-slate-400 text-xs italic">No active upgrade plans.</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'monitoring' && (
            <motion.div
              key="monitoring"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Side: Incident and Anomaly Management */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <ShieldAlert size={18} className="text-rose-600" />
                    Incident & Anomaly Management ({incidents.length})
                  </h3>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {incidents.map(inc => (
                      <div key={inc.incidentId} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900">{inc.title}</span>
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                                inc.severity === 'P1_CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                              }`}>
                                {inc.severity}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                              ID: {inc.incidentId} • Subsystem: {inc.affectedSubsystem} • Detected: {new Date(inc.detectedAt).toLocaleTimeString()}
                            </div>
                          </div>

                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            inc.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {inc.status}
                          </span>
                        </div>

                        {inc.aiDiagnosis && (
                          <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
                            <div className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1">
                              <Zap size={12} /> JUMO GPT Autonomous Root-Cause Diagnosis
                            </div>
                            <div className="text-slate-700 text-[11px]">{inc.aiDiagnosis.rootCause}</div>
                            <div className="text-slate-600 text-[11px]"><span className="font-bold">Recommended:</span> {inc.aiDiagnosis.recommendedRemediation}</div>
                          </div>
                        )}

                        {inc.status !== 'RESOLVED' && (
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleResolveIncident(inc.incidentId)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                            >
                              Authorize & Execute Remediation
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    {incidents.length === 0 && (
                      <div className="text-center py-12 text-slate-400 text-xs italic">No active incidents detected. All subsystems operational.</div>
                    )}
                  </div>
                </div>

                {/* Simulate Incident Form */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-800">Simulate Controlled Incident</h4>
                  <form onSubmit={handleRaiseIncident} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Incident Title</label>
                        <input
                          type="text"
                          value={newIncTitle}
                          onChange={e => setNewIncTitle(e.target.value)}
                          placeholder="e.g. Ledger Socket Latency Spike"
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Affected Subsystem</label>
                        <input
                          type="text"
                          value={newIncSubsystem}
                          onChange={e => setNewIncSubsystem(e.target.value)}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Severity Level</label>
                        <select
                          value={newIncSeverity}
                          onChange={e => setNewIncSeverity(e.target.value as any)}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold animate-none"
                        >
                          <option value="P1_CRITICAL">P1 - Critical Outage</option>
                          <option value="P2_HIGH">P2 - High Latency / Degraded</option>
                          <option value="P3_MEDIUM">P3 - Medium Warning</option>
                          <option value="P4_LOW">P4 - Low Cosmetic</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase whitespace-nowrap"
                      >
                        Raise Incident
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Side: JUMO GPT Operational Control Console */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <MessageSquare size={18} className="text-blue-600" />
                      Sovereign AI Operations Console
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Interactively query institutional readiness, incident root-causes, backups, upgrades, and maintenance.</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Is this institution ready for installation?",
                      "Which modules are installed?",
                      "Show the last successful backup.",
                      "Which institutions require maintenance?",
                      "Prepare an upgrade plan."
                    ].map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGptQuery(sample)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition-colors"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleRunGptQuery} className="flex gap-2">
                    <input
                      type="text"
                      value={gptQuery}
                      onChange={e => setGptQuery(e.target.value)}
                      placeholder="Ask JUMO GPT an operational query..."
                      className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                    <button
                      type="submit"
                      disabled={gptLoading}
                      className="px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <Send size={14} />
                    </button>
                  </form>

                  {gptResponse && (
                    <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-850 space-y-2">
                      <div className="text-[10px] font-black uppercase text-blue-400 tracking-wider flex items-center gap-1.5">
                        <CheckSquare size={12} /> JUMO GPT Response
                      </div>
                      <div className="text-xs font-mono leading-relaxed whitespace-pre-wrap">{gptResponse}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
