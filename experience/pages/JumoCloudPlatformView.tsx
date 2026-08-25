/**
 * Phase 30 — JUMO Cloud & Enterprise Infrastructure Platform
 * Unified Cloud Management, K8s Clusters, Storage, API Gateway, Service Mesh, Event Bus,
 * Secrets Vault, Zero-Trust Networking, and Real-Time Telemetry reporting to JUMO UEOS Control Center.
 */

import React, { useState } from 'react';
import { 
  Cloud, Server, Database, Shield, Cpu, HardDrive, Network, Lock, Activity, 
  RefreshCw, CheckCircle, Globe, Zap, Layers, Settings, Terminal, Download, ArrowUpRight
} from 'lucide-react';

export const JumoCloudPlatformView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'infrastructure' | 'compute' | 'storage' | 'network' | 'security' | 'observability'>('infrastructure');
  const [selectedCluster, setSelectedCluster] = useState<string>('jumo-prod-eu-central-1');
  const [deployStatus, setDeployStatus] = useState<string>('All Sovereign Nodes Optimal');
  const [isDeploying, setIsDeploying] = useState<boolean>(false);

  const cloudClusters = [
    { id: 'jumo-prod-eu-central-1', name: 'EU Central Sovereign Cloud', region: 'Frankfurt / Geneva', status: 'Healthy', nodes: 64, cpu: '14.2%', memory: '38.6%' },
    { id: 'jumo-prod-af-east-1', name: 'Africa East Government Cloud', region: 'Nairobi / Kampala', status: 'Healthy', nodes: 48, cpu: '18.9%', memory: '45.1%' },
    { id: 'jumo-prod-us-east-2', name: 'Americas Enterprise Grid', region: 'Virginia / Ohio', status: 'Healthy', nodes: 96, cpu: '22.4%', memory: '52.0%' },
    { id: 'jumo-edge-asia-1', name: 'Asia Pacific Edge Mesh', region: 'Singapore / Tokyo', status: 'Healthy', nodes: 32, cpu: '11.5%', memory: '29.3%' },
  ];

  const storagePools = [
    { name: 'Sovereign Object Vault (S3-Compatible)', capacity: '1.2 PB', used: '480 TB', encryption: 'AES-256 / Quantum Safe', status: 'Replicated' },
    { name: 'High-Performance Block Storage (NVMe)', capacity: '250 TB', used: '112 TB', encryption: 'FIPS 140-3', status: 'Active' },
    { name: 'Distributed File Ledger (NFS/Ceph)', capacity: '500 TB', used: '210 TB', encryption: 'TLS 1.3 in Transit', status: 'Synchronized' },
    { name: 'Secure Immutable Backup Vault', capacity: '2.0 PB', used: '1.4 PB', encryption: 'WORM Compliant', status: 'Secured' },
  ];

  const networkServices = [
    { name: 'Global Anycast CDN', status: 'Active', POPs: '142 Edges', latency: '12ms avg' },
    { name: 'Enterprise API Gateway & Envoy Mesh', status: 'Active', throughput: '45,000 req/sec', security: 'Zero-Trust mTLS' },
    { name: 'Distributed Event Bus (Kafka / NATS)', status: 'Active', messages: '12.4M / min', retention: '7 Days' },
    { name: 'Zero-Trust Sovereign VPN & SD-WAN', status: 'Active', tunnels: '1,840 active', compliance: 'Gov-Grade' },
  ];

  const handleExecuteIaC = () => {
    setIsDeploying(true);
    setDeployStatus('Synthesizing Terraform & Kubernetes Manifests...');
    setTimeout(() => {
      setDeployStatus('Applying Zero-Trust Policies & Rolling Out Mesh...');
      setTimeout(() => {
        setIsDeploying(false);
        setDeployStatus('Infrastructure Sync Successful. JUMO UEOS Registered.');
      }, 1200);
    }, 1200);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-900 font-semibold uppercase tracking-wider">
            <Cloud className="w-4 h-4" />
            <span>JUMO CLOUD • Unified Enterprise Infrastructure Platform</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-950">Sovereign Hybrid Cloud & Edge Operations</h1>
          <p className="text-xs text-slate-600">
            Centralized orchestration of K8s clusters, secure object vaults, API gateways, and distributed event meshes across all tenants.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center space-x-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{deployStatus}</span>
          </div>
          <button
            onClick={handleExecuteIaC}
            disabled={isDeploying}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-100 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center space-x-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isDeploying ? 'animate-spin' : ''}`} />
            <span>Sync Infrastructure</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-semibold">
        {[
          { id: 'infrastructure', label: 'Cloud Clusters & K8s', icon: Server },
          { id: 'compute', label: 'Virtual Machines & Compute', icon: Cpu },
          { id: 'storage', label: 'Sovereign Storage Pools', icon: HardDrive },
          { id: 'network', label: 'API Gateway & Mesh', icon: Network },
          { id: 'security', label: 'Zero-Trust & Vault', icon: Shield },
          { id: 'observability', label: 'Telemetry & Tracing', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 flex items-center space-x-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-200 text-blue-950'
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
      {activeTab === 'infrastructure' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cloudClusters.map((cluster) => (
              <div
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster.id)}
                className={`p-5 bg-white border rounded-xl cursor-pointer transition-all space-y-3 ${
                  selectedCluster === cluster.id ? 'border-blue-200 ring-1 ring-blue-900 shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase">{cluster.region}</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold text-[11px] rounded">
                    {cluster.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{cluster.name}</h3>
                <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs font-mono text-slate-600">
                  <div>
                    <span className="block text-[10px] text-slate-600">Nodes</span>
                    <span className="font-bold text-slate-900">{cluster.nodes}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-600">CPU</span>
                    <span className="font-bold text-slate-900">{cluster.cpu}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-600">RAM</span>
                    <span className="font-bold text-slate-900">{cluster.memory}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-blue-950 text-base">Active Kubernetes Cluster Topology: {selectedCluster}</h3>
                <p className="text-xs text-slate-600">Managed via GitOps IaC pipelines reporting directly to JUMO UEOS Control Center.</p>
              </div>
              <button onClick={() => alert(`Provisioning new node pool in ${selectedCluster}`)} className="px-3 py-1.5 bg-blue-50 text-blue-900 font-semibold text-xs rounded-lg hover:bg-blue-100 transition-colors">
                + Provision Node Pool
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px]">
                  <tr>
                    <th className="p-3">Namespace / Tenant</th>
                    <th className="p-3">Pods Running</th>
                    <th className="p-3">CPU Requests</th>
                    <th className="p-3">Memory Limit</th>
                    <th className="p-3">Mesh Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { ns: 'jumo-core-system', pods: '18 / 18', cpu: '4.2 vCPU', ram: '16.5 GB', mesh: 'mTLS Enabled' },
                    { ns: 'tenant-gov-hq', pods: '32 / 32', cpu: '8.0 vCPU', ram: '64.0 GB', mesh: 'mTLS Enabled' },
                    { ns: 'tenant-finbank-rtgs', pods: '48 / 48', cpu: '16.0 vCPU', ram: '128.0 GB', mesh: 'mTLS Enabled' },
                    { ns: 'tenant-makerere-edu', pods: '24 / 24', cpu: '6.5 vCPU', ram: '32.0 GB', mesh: 'mTLS Enabled' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900">{row.ns}</td>
                      <td className="p-3 text-emerald-700 font-semibold">{row.pods}</td>
                      <td className="p-3 text-slate-700">{row.cpu}</td>
                      <td className="p-3 text-slate-700">{row.ram}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-900 font-semibold rounded text-[11px]">
                          {row.mesh}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button onClick={() => alert(`Inspecting namespace telemetry for ${row.ns}`)} className="text-blue-900 font-semibold hover:underline">
                          Inspect Pods
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compute' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-950 text-base">Sovereign Virtual Machines & Edge Workers</h3>
              <p className="text-xs text-slate-600">Provisioned on isolated hypervisors with encrypted memory spaces.</p>
            </div>
            <button onClick={() => alert('Launching VM Provisioning Wizard')} className="px-4 py-2 bg-blue-900 text-white text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors">
              + Deploy VM Instance
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'vm-gateway-edge-01', type: 'Compute-Optimized (c6i.4xlarge)', ip: '10.142.12.45', status: 'Running', uptime: '99.99%' },
              { name: 'vm-db-replica-02', type: 'Memory-Optimized (r6i.8xlarge)', ip: '10.142.15.88', status: 'Running', uptime: '100%' },
              { name: 'vm-ai-inference-04', type: 'GPU Accelerated (g5.12xlarge)', ip: '10.142.22.10', status: 'Running', uptime: '99.95%' },
            ].map((vm, i) => (
              <div key={i} className="p-5 border border-slate-200 rounded-xl space-y-3 bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-900">{vm.ip}</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold text-[11px] rounded">
                    {vm.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{vm.name}</h4>
                <p className="text-xs text-slate-600 font-mono">{vm.type}</p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Uptime: {vm.uptime}</span>
                  <button onClick={() => alert(`Connecting securely to ${vm.name}`)} className="text-blue-900 font-semibold hover:underline">
                    Console Terminal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'storage' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storagePools.map((pool, i) => (
              <div key={i} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center font-bold">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-900 font-semibold text-xs rounded-lg">
                    {pool.status}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{pool.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Encryption: {pool.encryption}</p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Capacity Allocated</span>
                    <span className="font-bold text-slate-900">{pool.used} / {pool.capacity}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-900 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'network' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-blue-950 text-base">Universal API Gateway, CDN & Event Bus</h3>
          <p className="text-xs text-slate-600">All external ingress and internal microservice communication is governed by Envoy service mesh.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkServices.map((net, i) => (
              <div key={i} className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-950 font-bold">{net.name}</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold text-[11px] rounded">
                    {net.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1 pt-1">
                  {net.POPs && <div>Edge POPs: {net.POPs}</div>}
                  {net.throughput && <div>Throughput: {net.throughput}</div>}
                  {net.messages && <div>Message Rate: {net.messages}</div>}
                  {net.tunnels && <div>Active Tunnels: {net.tunnels}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-950 text-base">Zero-Trust Secrets Vault & Certificate Manager</h3>
              <p className="text-xs text-slate-600">Automated mTLS rotation, hardware security modules (HSM), and cryptographic key governance.</p>
            </div>
            <button onClick={() => alert('Rotating all tenant TLS certificates')} className="px-4 py-2 bg-blue-900 text-white text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors">
              Rotate Vault Secrets
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <span className="text-xs font-mono text-slate-500 uppercase">Certificates</span>
              <h4 className="font-bold text-slate-900 text-sm">Automated ACME / Let's Encrypt</h4>
              <p className="text-xs text-slate-600">1,420 Active wildcards managed across all tenant domains with zero downtime rotation.</p>
            </div>
            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <span className="text-xs font-mono text-slate-500 uppercase">Secrets Engine</span>
              <h4 className="font-bold text-slate-900 text-sm">HashiCorp Vault Integrated</h4>
              <p className="text-xs text-slate-600">Dynamic database credentials, API tokens, and encryption keys injected securely into container memory.</p>
            </div>
            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <span className="text-xs font-mono text-slate-500 uppercase">Zero-Trust Policy</span>
              <h4 className="font-bold text-slate-900 text-sm">Strict mTLS Enforcement</h4>
              <p className="text-xs text-slate-600">Unauthenticated service-to-service calls are dropped instantly at the Envoy proxy level.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'observability' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-blue-950 text-base">JUMO UEOS Centralized Telemetry & Distributed Tracing</h3>
          <p className="text-xs text-slate-600">Real-time OpenTelemetry metrics, Prometheus metrics collection, and elastic log aggregation.</p>

          <div className="p-4 bg-white text-slate-900 rounded-xl font-mono text-xs space-y-2 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-600">
              <span>TELEMETRY STREAM • CONTROL CENTER HOOK</span>
              <span className="text-emerald-400">● LIVE</span>
            </div>
            <div>[04:52:10 UTC] CLOUD_CORE: All 240 worker nodes reporting optimal heartbeat.</div>
            <div>[04:52:12 UTC] API_GATEWAY: Processed 42,890 requests with 99.998% success rate.</div>
            <div>[04:52:15 UTC] VAULT: Zero-Trust policy check passed for tenant-finbank-rtgs.</div>
            <div>[04:52:18 UTC] EVENT_BUS: Partition offset synchronized across Frankfurt & Nairobi regions.</div>
          </div>
        </div>
      )}
    </div>
  );
};
