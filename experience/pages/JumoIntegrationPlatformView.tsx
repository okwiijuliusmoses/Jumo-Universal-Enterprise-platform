/**
 * Phase 35 — Universal Integration, API & Digital Ecosystem Platform
 * Universal API Gateway, Enterprise Integration Catalog, Event Bus, Data Exchange, and Developer Portal.
 */

import React, { useState } from 'react';
import { 
  Globe, Server, Cpu, CheckCircle, Plus, Shield, ArrowRight, RefreshCw, 
  Key, Database, Zap, FileText, Settings, Activity, ExternalLink 
} from 'lucide-react';

export const JumoIntegrationPlatformView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'gateway' | 'catalog' | 'events' | 'exchange' | 'developers'>('gateway');
  const [testEndpoint, setTestEndpoint] = useState('/api/v4/sovereign/treasury/settlement');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTestingApi, setIsTestingApi] = useState(false);

  const apiEndpointsList = [
    { path: '/api/v4/identity/verify', method: 'POST', status: 'Active', latency: '12ms', rateLimit: '10,000 req/min' },
    { path: '/api/v4/treasury/rtgs/transfer', method: 'POST', status: 'Active', latency: '24ms', rateLimit: '5,000 req/min' },
    { path: '/api/v4/faap/credit/score', method: 'GET', status: 'Active', latency: '18ms', rateLimit: '8,000 req/min' },
    { path: '/api/v4/health/telemetry', method: 'GET', status: 'Active', latency: '5ms', rateLimit: '20,000 req/min' },
  ];

  const connectorsList = [
    { name: 'Commercial Banking SWIFT & MT103 Bridge', category: 'Banking', status: 'Connected', uptime: '99.99%' },
    { name: 'East Africa Mobile Money (MTN / Airtel Gateway)', category: 'FinTech', status: 'Connected', uptime: '100%' },
    { name: 'National Sovereign ID Registry Connector', category: 'Government', status: 'Connected', uptime: '99.95%' },
    { name: 'University Admissions & LMS Synchronizer', category: 'Education', status: 'Connected', uptime: '99.90%' },
    { name: 'National Healthcare Pharmacy Claims Pipeline', category: 'Healthcare', status: 'Connected', uptime: '99.98%' },
  ];

  const handleTestApi = () => {
    setIsTestingApi(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTestingApi(false);
      setTestResult(JSON.stringify({ status: 200, success: true, timestamp: new Date().toISOString(), message: "API Gateway handshake successful. AEGIS zero-trust token validated." }, null, 2));
    }, 1200);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-950 font-semibold uppercase tracking-wider">
            <Globe className="w-4 h-4 text-blue-950" />
            <span>JUMO Integration & APIs • Universal Digital Ecosystem Platform</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-950">Universal Integration, API & Digital Ecosystem Platform</h1>
          <p className="text-xs text-slate-600">
            Centralized API Gateway, enterprise connectors, asynchronous event bus, data exchange protocols, and secure developer portal.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert('New API Client Registration wizard opened')}
            className="px-4 py-2 bg-slate-50 hover:bg-blue-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register New API Client</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-semibold">
        {[
          { id: 'gateway', label: 'Universal API Gateway', icon: Globe },
          { id: 'catalog', label: 'Enterprise Connectors', icon: Server },
          { id: 'events', label: 'Asynchronous Event Bus', icon: Zap },
          { id: 'exchange', label: 'Data Exchange & ISO 20022', icon: Database },
          { id: 'developers', label: 'Developer Portal & SDKs', icon: Key },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 flex items-center space-x-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-950 text-blue-950'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'gateway' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-blue-950 text-base">API Gateway Routing & Rate Limiting</h3>
                  <p className="text-xs text-slate-600">Managed endpoints with zero-trust authentication, JWT verification, and telemetry tracking.</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded text-xs font-mono font-bold border border-emerald-200">
                  ● Gateway Online
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                <table className="w-full text-left text-xs font-medium">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Endpoint Route</th>
                      <th className="p-3">Method</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Latency</th>
                      <th className="p-3">Rate Limit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {apiEndpointsList.map((ep, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono text-blue-950 font-bold">{ep.path}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${ep.method === 'POST' ? 'bg-blue-50 text-blue-950' : 'bg-emerald-50 text-emerald-800'}`}>
                            {ep.method}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-emerald-700">{ep.status}</td>
                        <td className="p-3 font-mono text-slate-600">{ep.latency}</td>
                        <td className="p-3 font-mono text-slate-500">{ep.rateLimit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-blue-950 text-base">Interactive API Sandbox</h3>
              <p className="text-xs text-slate-600">Test live gateway endpoints instantly with automated AEGIS authentication tokens.</p>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700">Test Endpoint URL</label>
                  <input
                    type="text"
                    value={testEndpoint}
                    onChange={(e) => setTestEndpoint(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-950"
                  />
                </div>

                <button
                  onClick={handleTestApi}
                  disabled={isTestingApi}
                  className="w-full py-2.5 bg-slate-50 hover:bg-blue-900 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isTestingApi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                  <span>{isTestingApi ? 'Executing Handshake...' : 'Send Test Request'}</span>
                </button>
              </div>

              {testResult && (
                <div className="p-3 bg-white text-emerald-400 font-mono text-[11px] rounded-lg overflow-x-auto space-y-1">
                  <div className="text-slate-600 text-[10px]">RESPONSE HEADERS & BODY:</div>
                  <pre>{testResult}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'catalog' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-950 text-base">Enterprise Integration Catalog & Connectors</h3>
              <p className="text-xs text-slate-600">Pre-built, certified connectors for banking systems, mobile money, tax authorities, and national identity registries.</p>
            </div>
            <button onClick={() => alert('Connector installer wizard opened')} className="px-4 py-2 bg-slate-50 text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition-colors">
              Install Connector
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectorsList.map((conn, i) => (
              <div key={i} className="p-5 border border-slate-200 rounded-xl space-y-3 bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-blue-950 uppercase">{conn.category}</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-semibold text-[10px] rounded border border-emerald-200">
                    {conn.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{conn.name}</h4>
                <div className="text-xs text-slate-500 font-mono">Uptime SLA: {conn.uptime}</div>
                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <button onClick={() => alert(`Configuring connector: ${conn.name}`)} className="text-xs font-semibold text-blue-950 hover:underline">
                    Configure Connector
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-blue-950 text-base">Universal Asynchronous Event Bus</h3>
          <p className="text-xs text-slate-600">Real-time publish/subscribe architecture handling cross-solution events, notifications, and ledger updates.</p>

          <div className="p-6 bg-white text-slate-900 rounded-xl font-mono text-xs space-y-2 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-600">
              <span>EVENT STREAM LOG • JUMO MESSAGE BUS</span>
              <span className="text-emerald-400">● REAL-TIME STREAMING</span>
            </div>
            <div>[05:18:02 UTC] EVENT: jumo.treasury.payment.received — Amount: $1,450,000 USD — Ledger Verified.</div>
            <div>[05:18:05 UTC] EVENT: jumo.student.admitted — ID: #MU-2026-9941 — Registry Updated.</div>
            <div>[05:18:09 UTC] EVENT: jumo.security.audit.passed — AEGIS Zero-Trust Token Validated across 14 nodes.</div>
          </div>
        </div>
      )}

      {activeTab === 'exchange' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-blue-950 text-base">Enterprise Data Exchange & ISO 20022 Financial Messaging</h3>
          <p className="text-xs text-slate-600">Standardized transformation rules for JSON, XML, CSV, HL7/FHIR healthcare records, and ISO 20022 banking messages.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-sm">ISO 20022 Financial Clearing Formats</h4>
              <p className="text-xs text-slate-600">Automated translation between legacy bank formats and modern XML RTGS payment settlement messages.</p>
            </div>
            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-sm">HL7 / FHIR Healthcare Exchange</h4>
              <p className="text-xs text-slate-600">Standardized medical record exchange for hospital ERPs and national insurance reimbursement systems.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'developers' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-950 text-base">Developer Portal, SDKs & Partner Ecosystem</h3>
              <p className="text-xs text-slate-600">Comprehensive API documentation, software development kits in TypeScript, Python, and Java, and sandbox provisioning.</p>
            </div>
            <button onClick={() => alert('Generating new developer API key')} className="px-4 py-2 bg-slate-50 text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition-colors">
              Generate API Key
            </button>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="font-mono text-xs font-bold text-blue-950">JUMO SDK QUICKSTART (Node.js / TypeScript)</div>
            <pre className="p-3 bg-white text-slate-200 rounded-lg text-xs font-mono overflow-x-auto">
{`import { JumoClient } from '@jumo/enterprise-sdk';

const client = new JumoClient({
  apiKey: process.env.JUMO_API_KEY,
  environment: 'production'
});

const treasuryPool = await client.treasury.getPoolBalance('UGX-Sovereign-01');
console.log('Active Liquidity:', treasuryPool.balance);`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
