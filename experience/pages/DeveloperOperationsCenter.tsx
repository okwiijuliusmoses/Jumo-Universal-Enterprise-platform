/**
 * JUMO UEOS — Authoritative Developer Operations Center (DevOps) & Distributed Hybrid Runtime Hub
 * API Scaffolding, Webhook Telemetry, Replit/Docker/VPS Deployments, and SDK Integration
 * Styled with clean Microsoft 365 / Google Cloud enterprise aesthetic
 */

import React, { useState } from 'react';
import { 
  Terminal, Code, Cpu, Database, Shield, HardDrive, Globe, GitBranch, 
  Search, Filter, ExternalLink, RefreshCw, Play, CheckCircle2, Server, Cloud
} from 'lucide-react';
import { EnterpriseLogo } from '../../src/components/EnterpriseLogo';

export const DeveloperOperationsCenterView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'runtimes' | 'proxies' | 'webhooks' | 'deploy'>('runtimes');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const mockRuntimes = [
    { id: 'cloud-run', name: 'Google Cloud Run Ingress Serverless Mesh', type: 'CONTAINER_CLUSTER', status: 'HEALTHY', replicas: '142 Nodes', region: 'europe-west1 / us-central1', memory: '34.2% Pool' },
    { id: 'docker', name: 'Docker Standalone / Kubernetes Enterprise Pods', type: 'HYBRID_CONTAINER', status: 'HEALTHY', replicas: '48 Pods', region: 'On-Premises / Hybrid Cloud', memory: '41.0% Pool' },
    { id: 'replit', name: 'Replit Development & Sandbox Container', type: 'DEV_SANDBOX', status: 'HEALTHY', replicas: '1 Instance', region: 'us-east-1', memory: '28.5% Pool' },
    { id: 'vps', name: 'Dedicated VPS Bare-Metal Linux Workers', type: 'EDGE_WORKER', status: 'HEALTHY', replicas: '12 Workers', region: 'Kampala / Nairobi / London', memory: '39.8% Pool' },
  ];

  const handleTriggerDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert('Hybrid Deployment Triggered: Zero-downtime rolling container update initiated across all 142 Cloud Run replicas and 48 Kubernetes edge pods.');
    }, 1200);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EnterpriseLogo size="md" variant="blue" showText={false} />
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Developer Operations Center (DevOps & Hybrid Runtime)
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold rounded border border-blue-200">
                  Ring-0 Cluster Hub
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">API Route Proxies, Webhook Telemetry, and Identical Hybrid Execution across Local, Replit, Docker, and Cloud Run</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleTriggerDeploy}
              disabled={isDeploying}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDeploying ? 'animate-spin' : ''}`} />
              {isDeploying ? 'Rolling Deploy...' : 'Trigger Rolling Deploy'}
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('/operations-center')}
              className="px-4 py-2 bg-white hover:bg-white text-white rounded-lg text-xs font-bold transition shadow-xs"
            >
              Control Center
            </button>
          </div>
        </header>

        {/* DevOps KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Total Active Replicas</div>
              <Server className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">203 Nodes</div>
            <div className="text-[11px] text-slate-600 mt-1">Multi-Cloud Mesh</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">API Proxy Routes</div>
              <Code className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-600 mt-1">142 Routes</div>
            <div className="text-[11px] text-slate-600 mt-1">Server-Side Protected</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Cluster Uptime SLA</div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-emerald-600 mt-1">99.999%</div>
            <div className="text-[11px] text-slate-600 mt-1">Zero-Downtime Updates</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Webhook Telemetry</div>
              <Terminal className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">3,200 evt/sec</div>
            <div className="text-[11px] text-slate-600 mt-1">Live Webhook Mesh</div>
          </div>
        </div>

        {/* Runtimes Directory */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Distributed Hybrid Runtime Environments</h3>
              <p className="text-xs text-slate-500">Supports identical runtime behavior across Local, Replit, Docker, VPS, and Cloud Run containers.</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search cluster runtimes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-64 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockRuntimes.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.type.toLowerCase().includes(searchQuery.toLowerCase())).map((rt) => (
                <div key={rt.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg">
                        {rt.id === 'cloud-run' && <Cloud className="w-5 h-5" />}
                        {rt.id === 'docker' && <HardDrive className="w-5 h-5" />}
                        {rt.id === 'replit' && <Terminal className="w-5 h-5" />}
                        {rt.id === 'vps' && <Server className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{rt.name}</div>
                        <div className="text-[10px] font-mono font-semibold text-blue-600">{rt.type}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {rt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-600 block font-sans">Active Replicas</span>
                      <strong className="text-slate-800">{rt.replicas}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-600 block font-sans">Deployment Region</span>
                      <strong className="text-blue-600 truncate block">{rt.region}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-600 block font-sans">Memory Pool</span>
                      <strong className="text-emerald-600">{rt.memory}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperOperationsCenterView;
