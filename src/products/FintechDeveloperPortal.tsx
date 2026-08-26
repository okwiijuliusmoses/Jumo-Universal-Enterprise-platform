import React, { useState } from 'react';
import { 
  Code, Zap, Shield, Database, Key, Terminal, 
  ExternalLink, Copy, Check, Lock, Globe, Sparkles,
  ArrowRight, FileText, Activity, Layers, Play, ShieldCheck
} from 'lucide-react';

export const FintechDeveloperPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api_keys' | 'docs' | 'webhooks' | 'sandbox' | 'logs'>('api_keys');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const apiKeys = [
    { id: 'key_live_01', name: 'Production Payment Switch', key: 'pk_live_jumo_fintech_92038410293', status: 'Active', created: '2026-08-01' },
    { id: 'key_test_01', name: 'Sandbox Ledger API', key: 'pk_test_jumo_fintech_00192837465', status: 'Active', created: '2026-08-15' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Portal Header */}
      <header className="bg-slate-950 text-white px-6 py-4 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">JUMO FINTECH Developer Portal</h1>
              <p className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest">Sovereign API Environment</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-300">API Status: Operational</span>
            </div>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition">
              Create New App
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 space-y-2">
          {[
            { id: 'api_keys', label: 'API Keys & Secrets', icon: Key },
            { id: 'docs', label: 'API Documentation', icon: FileText },
            { id: 'webhooks', label: 'Webhooks & Events', icon: Zap },
            { id: 'sandbox', label: 'Ledger Sandbox', icon: Terminal },
            { id: 'logs', label: 'Request Logs', icon: Activity }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 font-bold text-sm transition text-left ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
          
          <div className="pt-8 space-y-4">
            <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest px-4">Resources</h3>
            <a href="#" className="flex items-center justify-between px-4 py-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition group">
              <span>SDK Libraries</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </a>
            <a href="#" className="flex items-center justify-between px-4 py-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition group">
              <span>Postman Collection</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </a>
            <a href="#" className="flex items-center justify-between px-4 py-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition group">
              <span>Sovereign Security Ops</span>
              <Shield className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </a>
          </div>
        </aside>

        {/* Workspace Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'api_keys' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black">Sovereign API Keys</h2>
                    <p className="text-xs text-slate-500">Authentication keys to access the JUMO FINTECH ledger and payment switch.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-200 text-[10px] font-mono font-bold">
                    <Lock className="w-3 h-3" /> Zero-Trust Encryption
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${key.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                          <span className="font-bold text-sm">{key.name}</span>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[9px] font-mono font-bold rounded uppercase">{key.id.split('_')[1]}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">Created on {key.created}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 p-2.5 bg-slate-900 text-white font-mono text-[11px] rounded-lg border border-slate-800 overflow-hidden truncate">
                          {key.key}
                        </div>
                        <button 
                          onClick={() => copyToClipboard(key.key, key.id)}
                          className="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                        >
                          {copiedKey === key.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-amber-400/20 rounded-xl">
                  <Shield className="w-6 h-6 text-amber-700" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-amber-900">Sovereign Security Warning</h3>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Production keys are high-security assets. Never share them or commit them to public repositories. JUMO UEOS enforces automated IP-whitelisting and rate-limiting on all live production endpoints.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-lg font-black">API Reference Guide</h2>
                <p className="text-xs text-slate-500">Complete documentation for integrating JUMO FINTECH into your third-party applications.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'FAAP Ledger Postings', desc: 'Post authoritative double-entry transactions directly to the core financial backbone.', method: 'POST', endpoint: '/v1/ledger/post' },
                  { title: 'Payment Initiation', desc: 'Initialize mobile money, card, or bank transfers through the universal switch.', method: 'POST', endpoint: '/v1/payments/initiate' },
                  { title: 'Balance Verification', desc: 'Retrieve real-time verified balances for any account with $0.00 parity check.', method: 'GET', endpoint: '/v1/ledger/balance/:id' },
                  { title: 'Merchant Settlement', desc: 'Configure automated commission splits and scheduled payouts.', method: 'PATCH', endpoint: '/v1/merchants/settlement' }
                ].map((api, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/30 transition group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        api.method === 'POST' ? 'bg-blue-100 text-blue-700' : 
                        api.method === 'GET' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {api.method}
                      </span>
                      <code className="text-[11px] font-mono text-slate-600">{api.endpoint}</code>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition">{api.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-1">{api.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[10px] text-slate-400 font-medium italic">Latest Update: August 2026 (v16.0.0)</p>
                <button className="text-emerald-600 font-bold text-xs flex items-center gap-1 hover:underline">
                  View Full API Docs <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'webhooks' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black">Webhook Endpoints</h2>
                  <p className="text-xs text-slate-500">Receive real-time notifications for payment events and ledger updates.</p>
                </div>
                <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition">
                  Add Endpoint
                </button>
              </div>

              <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-slate-900">No endpoints configured</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">Add a URL to start receiving real-time event notifications from JUMO FINTECH.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sandbox' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black">Ledger Sandbox</h2>
                  <p className="text-xs text-slate-500">Test your integrations in a safe, isolated simulation environment.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">Sandbox Mode Active</span>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-4 font-mono text-[12px] text-emerald-400 space-y-2 min-h-[300px] shadow-inner border border-slate-800">
                <div>$ jumo-fintech-cli login --key=pk_test_...</div>
                <div className="text-slate-400"># Authenticated as JUMO_DEV_01</div>
                <div>$ jumo-fintech-cli ledger post --debit=AC-101 --credit=AC-202 --amount=100.00 --currency=USD</div>
                <div className="text-slate-400"># Validating double-entry balance...</div>
                <div className="text-emerald-500 font-bold"># SUCCESS: Transaction TX-SIM-92038 posted to Sandbox. Parity: $0.00.</div>
                <div className="animate-pulse">_</div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 fill-white" /> Run Test Transaction
                </button>
                <button className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 border border-slate-200">
                  <Database className="w-4 h-4" /> Reset Sandbox Database
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="font-bold text-slate-900">JUMO FINTECH</span>
            <span>•</span>
            <span>Developer Ecosystem v16.0.0</span>
            <span>•</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-600" /> AEGIS Secured</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-bold text-slate-600">
            <a href="#" className="hover:text-emerald-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-emerald-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition">Support Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
