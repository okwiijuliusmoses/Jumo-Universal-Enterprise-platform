import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, Settings2, Shield, Network, Database, 
  Cpu, Zap, Lock, Save, RefreshCw, Layers, 
  Globe, Package, Server, Key, CheckCircle2, AlertTriangle,
  History, ArrowRight, CornerDownRight, Check, X, ShieldAlert,
  Building, User, FolderGit2
} from 'lucide-react';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';
import { ConfigurationProfileManifest, ConfigurationLayer, ConfigurationDriftReport } from '../../../core/factory/subfactories/DigitalConfigurationFactory';

export const ConfigStudio: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<ConfigurationLayer>('INSTITUTION');
  const [configs, setConfigs] = useState<ConfigurationProfileManifest[]>([]);
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [driftReport, setDriftReport] = useState<ConfigurationDriftReport | null>(null);

  // New Draft State
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftScopeId, setDraftScopeId] = useState('TENANT-NAT-GOV-01');
  const [draftEnv, setDraftEnv] = useState<'SOVEREIGN_PRODUCTION' | 'STAGING_SANDBOX' | 'AIR_GAPPED_FAILOVER'>('SOVEREIGN_PRODUCTION');
  const [draftVersion, setDraftVersion] = useState('1.0.0');
  const [draftKey, setDraftKey] = useState('');
  const [draftValue, setDraftValue] = useState('');
  const [draftType, setDraftType] = useState('string');
  const [draftEntries, setDraftEntries] = useState<Array<{ key: string; val: any; type: string }>>([
    { key: 'faap.doubleEntryEnforcement', val: 'STRICT_BLOCK', type: 'string' },
    { key: 'telemetry.intervalMs', val: 1000, type: 'number' },
    { key: 'security.zeroTrustStrict', val: true, type: 'boolean' }
  ]);

  const loadConfigs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/ueos/factory/configs/hierarchy');
      if (res.ok) {
        const data = await res.json();
        setConfigs(data.configs || []);
        if (data.configs?.length > 0 && !selectedConfigId) {
          setSelectedConfigId(data.configs[0].configProfileId);
        }
      }
    } catch (err) {
      console.error('Failed to load configs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  const selectedConfig = configs.find(c => c.configProfileId === selectedConfigId) || configs[0];

  const handleApprove = async (configId: string) => {
    try {
      const res = await fetch('/api/v1/ueos/factory/configs/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configId, approver: 'CHIEF_SYSTEM_ARCHITECT' })
      });
      if (res.ok) {
        setActionMessage(`Configuration ${configId} successfully approved by Chief Architect.`);
        loadConfigs();
      }
    } catch (err: any) {
      setActionMessage(`Approval failed: ${err.message}`);
    }
  };

  const handleActivate = async (configId: string) => {
    try {
      const res = await fetch('/api/v1/ueos/factory/configs/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configId, operator: 'SYSTEM_OPERATOR' })
      });
      if (res.ok) {
        setActionMessage(`Configuration ${configId} activated into production runtime.`);
        loadConfigs();
      }
    } catch (err: any) {
      setActionMessage(`Activation failed: ${err.message}`);
    }
  };

  const handleRollback = async (configId: string) => {
    try {
      const res = await fetch('/api/v1/ueos/factory/configs/rollback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configId, operator: 'SYSTEM_OPERATOR' })
      });
      if (res.ok) {
        setActionMessage(`Configuration ${configId} rolled back to previous baseline.`);
        loadConfigs();
      }
    } catch (err: any) {
      setActionMessage(`Rollback failed: ${err.message}`);
    }
  };

  const handleCheckDrift = async (configId: string) => {
    try {
      const res = await fetch('/api/v1/ueos/factory/configs/drift-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          configId,
          runtimeValues: {
            ...selectedConfig?.values,
            'telemetry.intervalMs': 2500 // simulated drift query
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        setDriftReport(data);
      }
    } catch (err: any) {
      setActionMessage(`Drift check failed: ${err.message}`);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const values: Record<string, any> = {};
      const schemaValidation: Record<string, string> = {};
      draftEntries.forEach(e => {
        values[e.key] = e.type === 'number' ? Number(e.val) : e.type === 'boolean' ? Boolean(e.val) : e.val;
        schemaValidation[e.key] = e.type;
      });

      const res = await fetch('/api/v1/ueos/factory/configs/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: draftName || `${activeLayer} Custom Configuration Profile`,
          layer: activeLayer,
          scopeEntityId: draftScopeId,
          environment: draftEnv,
          version: draftVersion,
          lineageId: 'JDPM/MFG2608/0001',
          blueprintRef: 'JDPM/BLUE2608/0001',
          tenantId: draftScopeId,
          values,
          schemaValidation,
          author: 'AGENT-001-ARCH'
        })
      });

      if (res.ok) {
        setShowDraftModal(false);
        setActionMessage(`New draft configuration created successfully at ${activeLayer} layer.`);
        loadConfigs();
      }
    } catch (err: any) {
      setActionMessage(`Failed to create draft: ${err.message}`);
    }
  };

  const layerList: Array<{ layer: ConfigurationLayer; label: string; icon: any; desc: string }> = [
    { layer: 'GLOBAL', label: '1. Global Baseline', icon: Globe, desc: 'Root zero-trust invariants & cryptographic parameters' },
    { layer: 'PLATFORM', label: '2. Platform Kernel', icon: Server, desc: 'Core gateway, telemetry, and clustering limits' },
    { layer: 'PRODUCT', label: '3. Product Baseline', icon: Package, desc: 'Application-level domain specifications' },
    { layer: 'INSTITUTION', label: '4. Institution Profile', icon: Building, desc: 'Tenant legal identity, ISO 20022 and settlement keys' },
    { layer: 'DEPARTMENT', label: '5. Department Policy', icon: FolderGit2, desc: 'Ministry / unit level RBAC quotas' },
    { layer: 'WORKSPACE', label: '6. Workspace Context', icon: Layers, desc: 'Operational UI layout and team access rules' },
    { layer: 'USER', label: '7. User Preferences', icon: User, desc: 'Cryptographic identity credentials & MFA settings' }
  ];

  const filteredConfigs = configs.filter(c => c.layer === activeLayer);

  return (
    <div className="space-y-6 animate-fadeIn" id="installation-config-studio">
      <StudioLifecycleNavBar studioId="config" />
      {/* Studio Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl flex items-center justify-center shadow-inner">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black tracking-tight">7-Layer Enterprise Configuration & Drift Engine</h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded">JDPM-700</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">
              Authoritative Global-to-User Cascade • Non-Destructive Versioning • Continuous Drift Detection
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDraftModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Draft New Profile</span>
          </button>
          <button
            onClick={loadConfigs}
            disabled={loading}
            className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700 hover:bg-slate-700 transition-all cursor-pointer"
            title="Refresh Configurations"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs font-bold flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-blue-500 hover:text-blue-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 7-Layer Navigation Cascade */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {layerList.map(item => {
          const count = configs.filter(c => c.layer === item.layer).length;
          const isActive = activeLayer === item.layer;
          return (
            <button
              key={item.layer}
              onClick={() => {
                setActiveLayer(item.layer);
                const match = configs.find(c => c.layer === item.layer);
                if (match) setSelectedConfigId(match.configProfileId);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-blue-500/20' 
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </div>
              <div className="text-xs font-black truncate">{item.label}</div>
              <div className={`text-[9px] font-semibold truncate mt-0.5 ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                {item.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Configuration Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Profile Selector in Selected Layer */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Profiles in {activeLayer} Layer
              </h3>
              <span className="text-[10px] font-bold text-slate-500">{filteredConfigs.length} Registered</span>
            </div>

            {filteredConfigs.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 font-semibold">
                No configuration profiles created for {activeLayer} layer.
              </div>
            ) : (
              <div className="space-y-2">
                {filteredConfigs.map(cfg => {
                  const isSelected = selectedConfig?.configProfileId === cfg.configProfileId;
                  return (
                    <div
                      key={cfg.configProfileId}
                      onClick={() => setSelectedConfigId(cfg.configProfileId)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-50/50 border-blue-300 shadow-xs' 
                          : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-slate-900 truncate">{cfg.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          cfg.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                          cfg.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' :
                          cfg.status === 'ROLLBACK_ACTIVE' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {cfg.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <span>v{cfg.version}</span>
                        <span>•</span>
                        <span className="truncate">{cfg.scopeEntityId}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Drift Detection Box */}
          {selectedConfig && (
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-black uppercase tracking-wider">Drift Auditor</h4>
                </div>
                <button
                  onClick={() => handleCheckDrift(selectedConfig.configProfileId)}
                  className="text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 cursor-pointer"
                >
                  Run Audit
                </button>
              </div>

              {driftReport && (
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Drift Status:</span>
                    <span className={`font-black ${driftReport.driftDetected ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {driftReport.driftDetected ? 'DRIFT DETECTED' : 'IN SYNC (0 DRIFT)'}
                    </span>
                  </div>
                  {driftReport.divergentKeys.length > 0 && (
                    <div className="text-[10px] text-amber-300 font-mono">
                      Keys: {driftReport.divergentKeys.join(', ')}
                    </div>
                  )}
                  <div className="text-[9px] text-slate-400">
                    Action: {driftReport.recommendedAction}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Detailed Configuration Editor & Actions */}
        <div className="lg:col-span-8 space-y-6">
          {selectedConfig ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
              {/* Profile Details Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">{selectedConfig.name}</h3>
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                      {selectedConfig.configProfileId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Layer: <strong className="text-slate-800">{selectedConfig.layer}</strong> | Scope: <strong className="text-slate-800">{selectedConfig.scopeEntityId}</strong> | Environment: <strong className="text-slate-800">{selectedConfig.environment}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedConfig.status === 'DRAFT' && (
                    <button
                      onClick={() => handleApprove(selectedConfig.configProfileId)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}
                  {(selectedConfig.status === 'APPROVED' || selectedConfig.status === 'DRAFT') && (
                    <button
                      onClick={() => handleActivate(selectedConfig.configProfileId)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Activate</span>
                    </button>
                  )}
                  {selectedConfig.rollbackVersionAvailable && (
                    <button
                      onClick={() => handleRollback(selectedConfig.configProfileId)}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>Rollback (v{selectedConfig.rollbackVersionAvailable})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Key-Value Parameters Display */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Configuration Parameters ({Object.keys(selectedConfig.values).length})
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-xs">
                    Hash: {selectedConfig.cryptographicHash}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-200/60 font-mono text-xs">
                  {Object.entries(selectedConfig.values).map(([key, val]) => (
                    <div key={key} className="p-3 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900">{key}</span>
                        <div className="text-[10px] text-slate-400">
                          Type: {selectedConfig.schemaValidation[key] || typeof val}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-white border border-slate-200 rounded font-black text-blue-700">
                          {typeof val === 'boolean' ? (val ? 'true' : 'false') : JSON.stringify(val)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit History Log */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Audit & Version Lifecycle Log
                </h4>
                <div className="bg-slate-900 text-slate-300 rounded-xl p-4 space-y-2 text-xs font-mono max-h-48 overflow-y-auto">
                  {selectedConfig.auditLog?.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2 border-b border-slate-800 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      <span className="font-bold text-blue-400">[{log.action}]</span>
                      <span className="text-slate-400">({log.actor})</span>
                      <span className="text-slate-200">{log.details}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 font-bold">
              Select a configuration profile to inspect parameters and history.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Draft Configuration Profile */}
      <AnimatePresence>
        {showDraftModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  Draft New {activeLayer} Configuration
                </h3>
                <button onClick={() => setShowDraftModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Profile Name</label>
                  <input
                    type="text"
                    value={draftName}
                    onChange={e => setDraftName(e.target.value)}
                    placeholder="e.g. Treasury High-Throughput Profile"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Scope Entity ID</label>
                  <input
                    type="text"
                    value={draftScopeId}
                    onChange={e => setDraftScopeId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Parameters</label>
                  <span className="text-[10px] text-slate-400">{draftEntries.length} keys configured</span>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {draftEntries.map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <input
                        type="text"
                        value={entry.key}
                        onChange={e => {
                          const updated = [...draftEntries];
                          updated[idx].key = e.target.value;
                          setDraftEntries(updated);
                        }}
                        className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                      />
                      <input
                        type="text"
                        value={String(entry.val)}
                        onChange={e => {
                          const updated = [...draftEntries];
                          updated[idx].val = e.target.value;
                          setDraftEntries(updated);
                        }}
                        className="w-32 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                      />
                      <select
                        value={entry.type}
                        onChange={e => {
                          const updated = [...draftEntries];
                          updated[idx].type = e.target.value;
                          setDraftEntries(updated);
                        }}
                        className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold"
                      >
                        <option value="string">string</option>
                        <option value="number">number</option>
                        <option value="boolean">boolean</option>
                      </select>
                      <button
                        onClick={() => setDraftEntries(draftEntries.filter((_, i) => i !== idx))}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setDraftEntries([...draftEntries, { key: 'new.parameter', val: 'default', type: 'string' }])}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  + Add Key
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowDraftModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDraft}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase hover:bg-blue-600 transition-all cursor-pointer"
                >
                  Save Draft Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
