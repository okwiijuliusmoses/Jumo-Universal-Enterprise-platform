import React, { useState } from 'react';
import { 
  Landmark, Cross, Heart, Shield, Terminal, 
  ExternalLink, Copy, Check, Globe, FileText, 
  Activity, Code, Zap, ArrowRight, Book
} from 'lucide-react';

export const ChurchDeveloperPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api_keys' | 'docs' | 'webhooks' | 'sandbox'>('api_keys');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const apiKeys = [
    { id: 'key_church_live_01', name: 'Diocesan Main API', key: 'pk_live_jumo_church_99887766554', status: 'Active', created: '2026-06-15' },
    { id: 'key_church_test_01', name: 'Parish Sandbox', key: 'pk_test_jumo_church_44332211009', status: 'Active', created: '2026-08-01' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-slate-950 text-white px-6 py-4 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">Church & Diocese Developer Portal</h1>
              <p className="text-[10px] text-purple-400 font-mono font-bold uppercase tracking-widest">Sovereign Faith API Gateway</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition">
              Provision Parish App
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-2">
          {[
            { id: 'api_keys', label: 'Diocesan API Keys', icon: Code },
            { id: 'docs', label: 'API Reference', icon: FileText },
            { id: 'webhooks', label: 'Faith Webhooks', icon: Zap },
            { id: 'sandbox', label: 'Governance Sandbox', icon: Terminal }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 font-bold text-sm transition text-left ${
                  isActive 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </aside>

        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'api_keys' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-black">Diocesan API Credentials</h2>
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{key.name}</span>
                        <span className="text-[10px] text-slate-400">Created {key.created}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 p-2.5 bg-slate-900 text-white font-mono text-[11px] rounded-lg truncate">
                          {key.key}
                        </div>
                        <button onClick={() => copyToClipboard(key.key, key.id)} className="p-2.5 bg-white border border-slate-200 rounded-lg">
                          {copiedKey === key.id ? <Check className="w-4 h-4 text-purple-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-black">Faith & Governance API</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Member Registration', desc: 'Sync parishioner data with diocesan main registry.', method: 'POST', endpoint: '/v1/church/members' },
                  { title: 'Tithe Ledger Sync', desc: 'Post tithe and offering records to central accounting.', method: 'POST', endpoint: '/v1/church/tithes' },
                  { title: 'Sacramental Search', desc: 'Verify baptism and matrimony records in the vault.', method: 'GET', endpoint: '/v1/church/sacraments' },
                  { title: 'Governance Directives', desc: 'Retrieve authoritative directives from the synod.', method: 'GET', endpoint: '/v1/church/directives' }
                ].map((api, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl hover:bg-purple-50/30 transition">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-black">{api.method}</span>
                      <code className="text-[11px] font-mono text-slate-600">{api.endpoint}</code>
                    </div>
                    <h3 className="font-bold text-sm">{api.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-1">{api.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
