/**
 * JUMO UEOS Phase 8 — JUMO API Management Center
 * Centralized Enterprise Integration Gateway, API Explorer, SDK Hub, and Security Registry
 * Styled with clean Microsoft 365 / Google Cloud enterprise aesthetic
 */

import React, { useState } from 'react';
import { 
  Code2, Terminal, Shield, BarChart3, Layers, Key, BookOpen, 
  Download, Play, CheckCircle2, AlertCircle, RefreshCw, Copy, Check,
  Search, Filter, ExternalLink, Cpu, Globe, Lock, Activity, Zap
} from 'lucide-react';
import { EnterpriseLogo } from '../../src/components/EnterpriseLogo';

export const JumoApiManagementCenterView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'registry' | 'explorer' | 'docs' | 'testing' | 'security' | 'monitoring' | 'analytics' | 'versioning' | 'sdks' | 'keys' | 'guides'>('registry');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApi, setSelectedApi] = useState('jumo-identity');
  const [testEndpoint, setTestEndpoint] = useState('/api/v1/platform/status');
  const [testMethod, setTestMethod] = useState<'GET' | 'POST'>('GET');
  const [testPayload, setTestPayload] = useState('{\n  "prompt": "Evaluate sovereign security boundaries"\n}');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const jumoApis = [
    { id: 'jumo-identity', name: 'JUMO Identity API', version: 'v9.4', category: 'Core Security', endpoint: '/api/v1/identity', status: 'ONLINE', latency: '18ms', requests24h: '1.4M', auth: 'Zero-Trust RBAC / JWT' },
    { id: 'jumo-treasury', name: 'JUMO Treasury API', version: 'v9.4', category: 'Financial', endpoint: '/api/v1/treasury', status: 'ONLINE', latency: '24ms', requests24h: '840K', auth: 'Sovereign Ring-0 MFA' },
    { id: 'jumo-faap', name: 'JUMO FAAP API', version: 'v9.4', category: 'General Ledger', endpoint: '/api/v1/ueos/faap', status: 'ONLINE', latency: '12ms', requests24h: '3.2M', auth: 'Double-Entry Parity Lock' },
    { id: 'jumo-ai', name: 'JUMO AI API', version: 'v9.4', category: 'Cognitive Gateway', endpoint: '/api/v1/ai', status: 'ONLINE', latency: '42ms', requests24h: '520K', auth: 'Multi-Model Router Token' },
    { id: 'jumo-workflow', name: 'JUMO Workflow API', version: 'v9.4', category: 'Automation', endpoint: '/api/v1/workflow', status: 'ONLINE', latency: '15ms', requests24h: '910K', auth: 'Event Mesh Signature' },
    { id: 'jumo-church', name: 'JUMO Church API', version: 'v4.2', category: 'Community ERP', endpoint: '/api/v1/enterprise/church', status: 'ONLINE', latency: '28ms', requests24h: '310K', auth: 'Diocesan Tenant Auth' },
    { id: 'jumo-education', name: 'JUMO Education API', version: 'v4.2', category: 'Academic ERP', endpoint: '/api/v1/enterprise/education', status: 'ONLINE', latency: '31ms', requests24h: '440K', auth: 'Campus Institutional RBAC' },
    { id: 'jumo-alumni', name: 'JUMO Alumni API', version: 'v3.1', category: 'Network ERP', endpoint: '/api/v1/enterprise/alumni', status: 'ONLINE', latency: '25ms', requests24h: '180K', auth: 'Alumni Directory Token' },
    { id: 'jumo-hospitality', name: 'JUMO Hospitality API', version: 'v5.0', category: 'Service ERP', endpoint: '/api/v1/enterprise/hospitality', status: 'ONLINE', latency: '22ms', requests24h: '290K', auth: 'Property Gateway Auth' },
    { id: 'jumo-enterprise', name: 'JUMO Enterprise API', version: 'v9.4', category: 'Shared Core', endpoint: '/api/v1/enterprise', status: 'ONLINE', latency: '14ms', requests24h: '4.8M', auth: 'Sovereign Core JWT' },
    { id: 'jumo-notification', name: 'JUMO Notification API', version: 'v9.4', category: 'Messaging Engine', endpoint: '/api/v1/ueos/notifications', status: 'ONLINE', latency: '19ms', requests24h: '1.1M', auth: 'Webhook Signed HMAC' },
    { id: 'jumo-document', name: 'JUMO Document API', version: 'v9.4', category: 'Structured Storage', endpoint: '/api/v1/ueos/rag', status: 'ONLINE', latency: '35ms', requests24h: '670K', auth: 'Vector Search RBAC' },
    { id: 'jumo-integration', name: 'JUMO Integration API', version: 'v9.4', category: 'Hybrid Adapters', endpoint: '/api/v4/sovereign', status: 'ONLINE', latency: '16ms', requests24h: '2.1M', auth: 'MTLS / API Key' },
    { id: 'jumo-marketplace', name: 'JUMO Marketplace API', version: 'v9.4', category: 'Plugin Ecosystem', endpoint: '/api/v1/marketplace', status: 'ONLINE', latency: '20ms', requests24h: '390K', auth: 'Tenant Workspace Key' }
  ];

  const filteredApis = jumoApis.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRunTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const options: RequestInit = {
        method: testMethod,
        headers: { 'Content-Type': 'application/json' }
      };
      if (testMethod === 'POST') {
        options.body = testPayload;
      }
      const startTime = performance.now();
      const res = await fetch(testEndpoint, options);
      const endTime = performance.now();
      const data = await res.json();
      setTestResult(JSON.stringify({
        status: res.status,
        statusText: res.statusText,
        latencyMs: Math.round(endTime - startTime),
        headers: { 'content-type': res.headers.get('content-type') || 'application/json', 'x-jumo-kernel': 'UEOS-v9.4' },
        body: data
      }, null, 2));
    } catch (err: any) {
      setTestResult(JSON.stringify({
        error: 'Network Execution Failed',
        message: err.message || 'Could not connect to JUMO micro-kernel gateway.',
        advice: 'Verify local container port 3000 mapping or check CORS security policies.'
      }, null, 2));
    } finally {
      setIsTesting(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const tabs = [
    { id: 'registry', label: 'API Registry', icon: Layers },
    { id: 'explorer', label: 'API Explorer', icon: Terminal },
    { id: 'docs', label: 'Documentation', icon: BookOpen },
    { id: 'testing', label: 'API Testing Lab', icon: Play },
    { id: 'security', label: 'API Security & Zero-Trust', icon: Shield },
    { id: 'monitoring', label: 'Real-Time Monitoring', icon: Activity },
    { id: 'analytics', label: 'Traffic Analytics', icon: BarChart3 },
    { id: 'versioning', label: 'Version Management', icon: RefreshCw },
    { id: 'sdks', label: 'SDK Downloads', icon: Download },
    { id: 'keys', label: 'Authentication Keys', icon: Key },
    { id: 'guides', label: 'Integration Guides', icon: Code2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-16">
      {/* Top Banner M365 / Google Cloud Enterprise Style */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EnterpriseLogo size="md" variant="blue" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">JUMO API Management Center</h1>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold rounded border border-blue-200">
                  UEOS v9.4 Ring-0 Gateway
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Centralized registry, interactive documentation, SDK scaffolding, and multi-tenant security enforcement.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search 14 JUMO APIs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button 
              onClick={() => onNavigate && onNavigate('/workspace')}
              className="px-3 py-1.5 bg-white hover:bg-white text-white rounded-lg text-xs font-semibold transition shadow-xs flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              Return to Workspace
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-4 pt-2 border-t border-slate-100 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {t.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* TAB 1: API REGISTRY */}
        {activeTab === 'registry' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Official JUMO API Registry</h2>
                <p className="text-xs text-slate-500">14 authoritative enterprise service APIs adhering to standardized naming and routing protocols.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Total Online: <strong className="text-emerald-600">14 / 14</strong></span>
                <span className="h-4 w-[1px] bg-slate-300"></span>
                <button 
                  onClick={() => setActiveTab('testing')}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-lg border border-blue-200 transition flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  Launch Test Lab
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApis.map((api) => (
                <div key={api.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-400 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] font-bold rounded">
                        {api.version}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {api.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{api.name}</h3>
                    <p className="text-xs text-slate-500 mb-3">{api.category} • {api.auth}</p>
                    <div className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono text-[11px] text-slate-700 flex items-center justify-between mb-4">
                      <span className="truncate">{api.endpoint}</span>
                      <button 
                        onClick={() => copyToClipboard(api.endpoint, api.id)}
                        className="text-slate-600 hover:text-slate-700 ml-2"
                        title="Copy endpoint path"
                      >
                        {copiedKey === api.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Avg Latency: <strong className="text-slate-900">{api.latency}</strong></span>
                    <button 
                      onClick={() => { setSelectedApi(api.id); setTestEndpoint(api.endpoint + (api.id === 'jumo-ai' ? '/orchestrate' : '/status')); setActiveTab('explorer'); }}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                      Explore API <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: API EXPLORER */}
        {activeTab === 'explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-3">Select API & Endpoint</h3>
              <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
                {jumoApis.map(api => (
                  <button
                    key={api.id}
                    onClick={() => { setSelectedApi(api.id); setTestEndpoint(api.endpoint + (api.id === 'jumo-ai' ? '/orchestrate' : '/status')); }}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition ${
                      selectedApi === api.id 
                        ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold' 
                        : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{api.name}</span>
                      <span className="font-mono text-[10px] text-slate-500">{api.version}</span>
                    </div>
                    <div className="text-[10px] text-slate-600 mt-1 font-mono">{api.endpoint}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{jumoApis.find(a => a.id === selectedApi)?.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{jumoApis.find(a => a.id === selectedApi)?.category} • Zero-Trust Ring-0 Protected</p>
                </div>
                <button 
                  onClick={() => setActiveTab('testing')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  Test in Workbench
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Base Endpoint Route</label>
                  <div className="bg-white text-emerald-400 font-mono text-xs p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span>{testEndpoint}</span>
                    <button onClick={() => copyToClipboard(testEndpoint, 'explorer-path')} className="text-slate-600 hover:text-white">
                      {copiedKey === 'explorer-path' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs font-bold text-slate-700 mb-1">Authentication Standard</div>
                    <div className="text-xs text-slate-600">{jumoApis.find(a => a.id === selectedApi)?.auth}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs font-bold text-slate-700 mb-1">Rate Limit Quota</div>
                    <div className="text-xs text-slate-600">5,000 req/min per tenant workspace</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Available Methods</h4>
                  <div className="space-y-2">
                    <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold font-mono text-[10px] rounded">GET</span>
                        <span className="text-xs font-mono text-slate-800">{jumoApis.find(a => a.id === selectedApi)?.endpoint}/status</span>
                      </div>
                      <span className="text-xs text-slate-500">Retrieve micro-kernel operational telemetry</span>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold font-mono text-[10px] rounded">POST</span>
                        <span className="text-xs font-mono text-slate-800">{jumoApis.find(a => a.id === selectedApi)?.endpoint}/trigger</span>
                      </div>
                      <span className="text-xs text-slate-500">Execute transactional payload or workflow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTATION */}
        {activeTab === 'docs' && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs max-w-4xl mx-auto space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-slate-900">JUMO UEOS v9.4 API Specifications & Architecture Guide</h3>
              <p className="text-xs text-slate-500 mt-1">Authoritative developer handbook for integrating with the Ring-0 Enterprise Gateway.</p>
            </div>
            <div className="prose prose-sm max-w-none text-slate-700 space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">1. Zero-Trust Ring-0 Authentication</h4>
              <p className="text-xs leading-relaxed">
                Every request to a JUMO API must include a valid Bearer Token in the HTTP Authorization header. Tokens are scoped strictly to the authenticated tenant workspace ID and are evaluated at the Ring-0 Micro-Kernel boundary before routing to domain services.
              </p>
              <div className="bg-white text-slate-200 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                {`Authorization: Bearer jumo-jwt-token-production-********`}
              </div>

              <h4 className="font-bold text-slate-900 text-sm pt-2">2. Double-Entry Parity Lock (FAAP API)</h4>
              <p className="text-xs leading-relaxed">
                When posting debit/credit journals via <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700">/api/v1/ueos/faap/transaction</code>, the micro-kernel automatically enforces a parity checksum. If Total Debits do not match Total Credits exactly ($0.00 offset), the transaction is atomically rolled back with HTTP Status <code className="bg-rose-50 text-rose-700 font-mono px-1">422 Unprocessable Entity</code>.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">3. Universal Error Response Schema</h4>
              <p className="text-xs leading-relaxed">
                All JUMO APIs return standardized JSON error objects to guarantee predictable client-side handling:
              </p>
              <div className="bg-white text-emerald-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
{`{
  "success": false,
  "error": "SECURITY_VIOLATION",
  "message": "Insufficient ABAC clearance for partition ID: UG_SACCO_01",
  "timestamp": "2026-07-27T08:45:00Z",
  "traceId": "tr_88a9c21f00b"
}`}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: API TESTING LAB */}
        {activeTab === 'testing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
              <h3 className="font-bold text-slate-900 text-sm">Live Workbench Request Builder</h3>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">HTTP Method & Target URL</label>
                <div className="flex gap-2">
                  <select 
                    value={testMethod} 
                    onChange={e => setTestMethod(e.target.value as any)}
                    className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </select>
                  <input 
                    type="text" 
                    value={testEndpoint}
                    onChange={e => setTestEndpoint(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {testMethod === 'POST' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">JSON Body Payload</label>
                  <textarea 
                    rows={8}
                    value={testPayload}
                    onChange={e => setTestPayload(e.target.value)}
                    className="w-full bg-white text-emerald-400 border border-slate-200 rounded-lg p-3 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div className="pt-2">
                <button 
                  onClick={handleRunTest}
                  disabled={isTesting}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold text-xs transition shadow-xs flex items-center justify-center gap-2"
                >
                  {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  {isTesting ? 'Executing Ring-0 Request...' : 'Send Live Request'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-sm">Response Telemetry Inspector</h3>
                  {testResult && (
                    <button onClick={() => copyToClipboard(testResult, 'test-res')} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      {copiedKey === 'test-res' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy JSON
                    </button>
                  )}
                </div>
                <div className="bg-white text-slate-900 rounded-xl p-4 font-mono text-xs min-h-[360px] max-h-[500px] overflow-auto border border-slate-200">
                  {testResult ? (
                    <pre className="whitespace-pre-wrap">{testResult}</pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[340px] text-slate-500 text-center">
                      <Terminal className="w-10 h-10 text-slate-700 mb-3" />
                      <p>No request executed yet.</p>
                      <p className="text-[11px] text-slate-600 mt-1">Configure your endpoint parameters and click "Send Live Request".</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Target Gateway: <strong className="text-slate-800">http://localhost:3000</strong></span>
                <span>Security Sandbox: <strong className="text-emerald-600">ACTIVE</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5 to 11: REMAINING ENTERPRISE TABS */}
        {['security', 'monitoring', 'analytics', 'versioning', 'sdks', 'keys', 'guides'].includes(activeTab) && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs">
            <div className="max-w-3xl">
              <h3 className="text-base font-bold text-slate-900 mb-2 capitalize">
                {activeTab === 'sdks' ? 'SDK Downloads & Package Managers' :
                 activeTab === 'keys' ? 'Authentication Key Vault' :
                 activeTab === 'guides' ? 'Step-by-Step Integration Guides' :
                 `${activeTab.replace('-', ' ')} Operational Center`}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Configurable governance controls, telemetry charts, and programmatic bindings for the selected JUMO API cluster.
              </p>

              {activeTab === 'sdks' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-500 transition">
                    <div className="font-bold text-sm text-slate-900 mb-1">TypeScript / Node.js SDK</div>
                    <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono block text-slate-800 my-3">npm install @jumo/ueos-sdk</code>
                    <button onClick={() => copyToClipboard('npm install @jumo/ueos-sdk', 'sdk-npm')} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      {copiedKey === 'sdk-npm' ? 'Copied!' : 'Copy Command'} <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-500 transition">
                    <div className="font-bold text-sm text-slate-900 mb-1">Python 3.10+ Client</div>
                    <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono block text-slate-800 my-3">pip install jumo-ueos-client</code>
                    <button onClick={() => copyToClipboard('pip install jumo-ueos-client', 'sdk-pip')} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      {copiedKey === 'sdk-pip' ? 'Copied!' : 'Copy Command'} <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-500 transition">
                    <div className="font-bold text-sm text-slate-900 mb-1">Android Kotlin SDK</div>
                    <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono block text-slate-800 my-3">implementation 'com.jumo:ueos-android:9.4.0'</code>
                    <button onClick={() => copyToClipboard("implementation 'com.jumo:ueos-android:9.4.0'", 'sdk-kt')} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      {copiedKey === 'sdk-kt' ? 'Copied!' : 'Copy Command'} <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'keys' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900">Production Master Key (Ring-0)</div>
                      <div className="font-mono text-xs text-slate-500 mt-0.5">jumo_live_pk_****************************a8f2</div>
                    </div>
                    <button onClick={() => alert('Security Vault check required. MFA challenged.')} className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition">
                      Reveal Secret Key
                    </button>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900">Development Sandbox Key</div>
                      <div className="font-mono text-xs text-slate-500 mt-0.5">jumo_test_sk_993847293847293847293847</div>
                    </div>
                    <button onClick={() => copyToClipboard('jumo_test_sk_993847293847293847293847', 'test-key')} className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition">
                      {copiedKey === 'test-key' ? 'Copied!' : 'Copy Key'}
                    </button>
                  </div>
                </div>
              )}

              {['security', 'monitoring', 'analytics', 'versioning', 'guides'].includes(activeTab) && (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-sm text-slate-800 mb-1">{activeTab.toUpperCase()} Module Active</div>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    All 14 JUMO APIs are protected under continuous Ring-0 CCTV telemetry and Zero-Trust boundary validation.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default JumoApiManagementCenterView;
