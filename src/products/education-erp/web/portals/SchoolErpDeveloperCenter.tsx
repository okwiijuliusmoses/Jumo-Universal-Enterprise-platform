import React, { useState } from 'react';
import { 
  Code, Terminal, Key, Webhook, Database, Play, 
  CheckCircle2, Copy, ExternalLink, ShieldCheck, Layers
} from 'lucide-react';

export const SchoolErpDeveloperCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ENDPOINTS' | 'KEYS' | 'WEBHOOKS' | 'SANDBOX'>('ENDPOINTS');
  const [copiedKey, setCopiedKey] = useState(false);

  const endpoints = [
    { method: 'POST', path: '/api/v1/edu/admissions', desc: 'Registers new student bio-data and generates Learner Identification Number (LIN)' },
    { method: 'GET', path: '/api/v1/edu/students/{lin}', desc: 'Retrieves canonical student census profile, current stream, and guardian contacts' },
    { method: 'POST', path: '/api/v1/edu/fees/invoice', desc: 'Issues term fee invoice linked to JUMO FAAP ledger and generates URA PRN token' },
    { method: 'POST', path: '/api/v1/edu/assessment/marks', desc: 'Submits continuous assessment BOT/MOT/EOT and AOI scores for grading' },
    { method: 'GET', path: '/api/v1/edu/uneb/candidates', desc: 'Fetches UNEB candidate index roster for national examination verification' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold shadow-xs">
            <Code className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">SCHOOL ERP DEVELOPER CENTER</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300">
                REST / GRAPHQL / WEBHOOKS
              </span>
            </div>
            <p className="text-xs text-slate-500">
              API Gateways • UNEB E-Services Connector • EMIS Synchronization • Webhook Subscriptions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Key className="w-3.5 h-3.5 text-blue-400" />
            <span>Generate Production API Key</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('ENDPOINTS')}
          className={`py-3 border-b-2 transition ${activeTab === 'ENDPOINTS' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          REST API Reference & Schemas
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('KEYS')}
          className={`py-3 border-b-2 transition ${activeTab === 'KEYS' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          API Authentication & Tokens
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('WEBHOOKS')}
          className={`py-3 border-b-2 transition ${activeTab === 'WEBHOOKS' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Webhook Subscriptions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('SANDBOX')}
          className={`py-3 border-b-2 transition ${activeTab === 'SANDBOX' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          API Interactive Sandbox
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'ENDPOINTS' && (
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-4 py-2.5">HTTP Method</th>
                    <th className="px-4 py-2.5">Endpoint Path</th>
                    <th className="px-4 py-2.5">Description</th>
                    <th className="px-4 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {endpoints.map((ep, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          ep.method === 'POST' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {ep.method}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-slate-900 font-bold">{ep.path}</td>
                      <td className="px-4 py-2.5 text-slate-600">{ep.desc}</td>
                      <td className="px-4 py-2.5 text-right">
                        <button type="button" className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold">
                          Test Call
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== 'ENDPOINTS' && (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <Terminal className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">{activeTab} Console</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Secure developer API token issuance, signature secret rotation, and real-time webhook payload dispatch verification.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
