// JUMO UEOS — AI Provider Control Center
// Real owner-controlled panel for managing external providers, local runtimes, secret vaults, and health verification.

import React, { useState, useEffect } from "react";
import { JumoAIProviderFabricRegistry, ProviderFabricRecord, ProviderTestResult } from "../../../../core/ai/registry/JumoAIProviderFabricRegistry";
import { LocalInferenceRuntimeRegistry } from "../../../../core/ai/runtime/LocalInferenceRuntime";
import { JumoSecretVault } from "../../../../core/security/JumoSecretVault";
import { Shield, Server, Cpu, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Lock, Terminal, Activity, Layers, Database } from "lucide-react";

export const AIProviderControlCenter: React.FC = () => {
  const fabricRegistry = JumoAIProviderFabricRegistry.getInstance();
  const localRuntime = LocalInferenceRuntimeRegistry.getInstance().getEngine();

  const [providers, setProviders] = useState<ProviderFabricRecord[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<ProviderFabricRecord | null>(null);
  const [probeResult, setProbeResult] = useState<ProviderTestResult | null>(null);
  const [isProbing, setIsProbing] = useState<boolean>(false);
  const [apiKeyInput, setApiKeyInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'providers' | 'local' | 'vault' | 'verification'>('providers');
  const [verificationReport, setVerificationReport] = useState<Record<string, { passed: boolean; details: string }> | null>(null);
  const [localTelemetry, setLocalTelemetry] = useState(localRuntime.getRuntimeTelemetry());

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setProviders(fabricRegistry.listProviders());
    setLocalTelemetry(localRuntime.getRuntimeTelemetry());
  };

  const handleProbe = async (providerId: string) => {
    setIsProbing(true);
    setProbeResult(null);
    try {
      const res = await fabricRegistry.probeProvider(providerId);
      setProbeResult(res);
      refreshData();
    } catch (e: any) {
      alert(`Probe error: ${e.message}`);
    } finally {
      setIsProbing(false);
    }
  };

  const handleSaveApiKey = (providerId: string) => {
    if (!apiKeyInput.trim()) return;
    if (providerId === 'OPENAI' || providerId === 'CODEX') {
      JumoSecretVault.setKey('OPENAI_API_KEY', apiKeyInput.trim());
    } else if (providerId === 'GEMINI') {
      JumoSecretVault.setKey('GEMINI_API_KEY', apiKeyInput.trim());
    }
    setApiKeyInput("");
    refreshData();
    alert(`Secure credential stored for ${providerId} in JumoSecretVault.`);
  };

  const runVerificationSuite = async () => {
    const report = await fabricRegistry.runMandatoryVerificationSuite();
    setVerificationReport(report);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(225,29,72,0.1),transparent)]" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tighter uppercase italic">AI Provider <span className="text-rose-500">Control Center</span></h2>
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em]">Sovereign Fabric & Secret Vault Management</span>
              </div>
            </div>
            <p className="text-slate-400 font-medium text-sm max-w-2xl">
              Manage external provider connectivity, cryptographic vaults, air-gapped local inference runtimes, and real-time health probes.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => { setActiveTab('providers'); refreshData(); }}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'providers' ? 'bg-rose-600 text-white shadow-lg' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
            >
              Providers
            </button>
            <button 
              onClick={() => setActiveTab('local')}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'local' ? 'bg-rose-600 text-white shadow-lg' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
            >
              Local Runtime
            </button>
            <button 
              onClick={() => setActiveTab('vault')}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'vault' ? 'bg-rose-600 text-white shadow-lg' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
            >
              Secret Vault
            </button>
            <button 
              onClick={() => { setActiveTab('verification'); runVerificationSuite(); }}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'verification' ? 'bg-rose-600 text-white shadow-lg' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
            >
              Verification Suite
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Providers */}
      {activeTab === 'providers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Authoritative Provider Registry</h3>
            <div className="grid grid-cols-1 gap-4">
              {providers.map((p) => (
                <div 
                  key={p.providerId}
                  onClick={() => setSelectedProvider(p)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer bg-white shadow-sm hover:shadow-xl ${selectedProvider?.providerId === p.providerId ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${p.providerId === 'JUMO_LOCAL' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                        {p.providerId.slice(0, 3)}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-lg">{p.displayName}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.providerFamily} • {p.localOrRemote}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        p.healthStatus === 'HEALTHY' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        p.healthStatus === 'FAILED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {p.healthStatus}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        p.executionStatus === 'EXECUTABLE' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {p.executionStatus}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block font-bold text-[10px] uppercase">Config Status</span>
                      <span className="font-black text-slate-800">{p.configurationStatus}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold text-[10px] uppercase">Connectivity</span>
                      <span className="font-black text-slate-800">{p.connectivityStatus}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold text-[10px] uppercase">Default Model</span>
                      <span className="font-black text-slate-800">{p.defaultModel}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold text-[10px] uppercase">Latency</span>
                      <span className="font-black text-slate-800">{p.latencyMs}ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Provider Inspection & Test Console */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Provider Test Console</h3>
            {selectedProvider ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Selected Provider</span>
                  <h4 className="text-xl font-black text-slate-900">{selectedProvider.displayName}</h4>
                  <p className="text-xs text-slate-500 font-bold mt-1">Endpoint: {selectedProvider.endpointUrl}</p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Credential Injection</h5>
                  {selectedProvider.providerId !== 'JUMO_LOCAL' && selectedProvider.providerId !== 'COPILOT' && (
                    <div className="flex gap-2">
                      <input 
                        type="password"
                        placeholder="Enter API Key..."
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono"
                      />
                      <button 
                        onClick={() => handleSaveApiKey(selectedProvider.providerId)}
                        className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Diagnostics & Probes</h5>
                  <button 
                    disabled={isProbing}
                    onClick={() => handleProbe(selectedProvider.providerId)}
                    className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
                  >
                    {isProbing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                    Run Real Connectivity & Inference Probe
                  </button>
                </div>

                {probeResult && (
                  <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-[11px] space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Evidence ID:</span>
                      <span className="text-rose-400">{probeResult.evidenceId}</span>
                    </div>
                    <div>Network: {probeResult.networkPass ? '✅ PASS' : '❌ FAIL'}</div>
                    <div>Authentication: {probeResult.authPass ? '✅ PASS' : '❌ FAIL'}</div>
                    <div>Model Discovery: {probeResult.modelPass ? '✅ PASS' : '❌ FAIL'}</div>
                    <div>Inference Test: {probeResult.inferencePass ? '✅ PASS' : '❌ FAIL'}</div>
                    <div>Measured Latency: {probeResult.latencyMs}ms</div>
                    {probeResult.errorDetails && <div className="text-rose-400 mt-1">Error: {probeResult.errorDetails}</div>}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 text-xs font-bold uppercase tracking-wider">
                Select a provider from the registry to execute health diagnostics.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Local Runtime */}
      {activeTab === 'local' && (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Sovereign Local Inference Runtime</h3>
              <p className="text-sm font-bold text-slate-500 mt-1">Ollama / vLLM / llama.cpp / LocalAI Detection & Air-Gapped Status</p>
            </div>
            <button 
              onClick={() => { localRuntime.healthCheck().then(() => setLocalTelemetry(localRuntime.getRuntimeTelemetry())); }}
              className="px-5 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Re-Scan Local Runtime
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Runtime Status</span>
              <div className="text-2xl font-black text-slate-900 mt-2">{localTelemetry.runtimeStatus}</div>
              <span className="text-xs font-bold text-slate-500 mt-1 block">Engine: {localTelemetry.runtimeEngine}</span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loaded Model</span>
              <div className="text-xl font-black text-slate-900 mt-2">{localTelemetry.loadedModel || 'None Loaded'}</div>
              <span className="text-xs font-bold text-slate-500 mt-1 block">Endpoint: {localTelemetry.endpointUrl || 'None'}</span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telemetry</span>
              <div className="text-xl font-black text-slate-900 mt-2">{localTelemetry.tokensGenerated} Tokens</div>
              <span className="text-xs font-bold text-slate-500 mt-1 block">Latency: {localTelemetry.inferenceLatencyMs}ms</span>
            </div>
          </div>

          {localTelemetry.runtimeStatus !== 'AVAILABLE' && (
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs font-bold space-y-2">
              <div className="font-black uppercase tracking-wider">Air-Gapped Notice</div>
              <p>No local inference runtime was detected on standard ports (11434, 8000, 8080). To operate air-gapped, please install and run Ollama (`ollama serve`) or vLLM locally.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Secret Vault */}
      {activeTab === 'vault' && (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Jumo Cryptographic Secret Vault</h3>
              <p className="text-sm font-bold text-slate-500">Secure server-side credential isolation preventing client-side leakage.</p>
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <div>
                <span className="font-black text-slate-800 text-sm block">OPENAI_API_KEY</span>
                <span className="text-xs font-bold text-slate-400">Status: {JumoSecretVault.hasKey('OPENAI_API_KEY') ? 'Securely Vaulted (Present)' : 'Not Configured'}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${JumoSecretVault.hasKey('OPENAI_API_KEY') ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                {JumoSecretVault.hasKey('OPENAI_API_KEY') ? 'VAULTED' : 'MISSING'}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <div>
                <span className="font-black text-slate-800 text-sm block">GEMINI_API_KEY</span>
                <span className="text-xs font-bold text-slate-400">Status: {JumoSecretVault.hasKey('GEMINI_API_KEY') ? 'Securely Vaulted / Env Present' : 'Not Configured'}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${JumoSecretVault.hasKey('GEMINI_API_KEY') ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                {JumoSecretVault.hasKey('GEMINI_API_KEY') ? 'VAULTED' : 'MISSING'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Verification Suite */}
      {activeTab === 'verification' && (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Mandatory Verification Suite</h3>
              <p className="text-sm font-bold text-slate-500">Automated verification checks for provider fabric, health probes, and air-gap integrity.</p>
            </div>
            <button 
              onClick={runVerificationSuite}
              className="px-5 py-3 bg-rose-600 text-white rounded-2xl text-xs font-black uppercase shadow-lg"
            >
              Re-Run Verification
            </button>
          </div>

          {verificationReport ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(verificationReport).map(([testKey, res]) => (
                <div key={testKey} className={`p-5 rounded-2xl border ${res.passed ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-rose-50/50 border-rose-200 text-rose-900'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-xs uppercase tracking-wider">{testKey.replace(/_/g, ' ')}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${res.passed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                      {res.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                  <p className="text-xs font-bold opacity-80">{res.details}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 font-bold text-xs uppercase">
              Click 'Re-Run Verification' to execute the 10-point test suite.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
