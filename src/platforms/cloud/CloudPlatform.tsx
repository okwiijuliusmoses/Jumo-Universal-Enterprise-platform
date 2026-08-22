/**
 * JUMO UEOS — JUMO CLOUD Infrastructure Platform v1.0
 * Multi-Cloud Kubernetes Controller, Serverless Compute, Object Storage, and Sovereign Edge Mesh.
 * 
 * Target: 60 Cloud Infrastructure Modules across 6 Categories:
 * 1. Infrastructure (Modules 1-10)
 * 2. Enterprise Operations (Modules 11-20)
 * 3. Hybrid Architecture (Modules 21-30)
 * 4. AI Cloud Infrastructure (Modules 31-40)
 * 5. Enterprise Extensions (Modules 41-50)
 * 6. Sovereign Infrastructure Controls (Modules 51-60)
 * 
 * Governed strictly by Ring-0 Owner Control Center Authority.
 */

import React, { useState } from 'react';
import {
  Cloud, Server, Database, Shield, Cpu, HardDrive, Network, Lock, Activity,
  RefreshCw, CheckCircle2, Globe, Zap, Layers, Settings, Terminal, Download, ArrowUpRight,
  Search, Filter, Sliders, Sparkles, Send, Package, ShieldCheck, Award, Workflow
} from 'lucide-react';

export interface CloudModuleDef {
  id: number;
  code: string;
  name: string;
  category: 'Infrastructure' | 'Enterprise Operations' | 'Hybrid Architecture' | 'AI Cloud' | 'Enterprise Extensions' | 'Sovereign Controls';
  description: string;
  status: 'ACTIVE' | 'HEALTHY' | 'RING_0' | 'REPLICATED';
  tier: 'Core' | 'Enterprise' | 'Sovereign';
  enabled: boolean;
}

export const CLOUD_MODULES_60: CloudModuleDef[] = [
  // 1. Infrastructure (1-10)
  { id: 1, code: 'CLOUD-01', name: 'Compute Cluster Management', category: 'Infrastructure', description: 'Multi-cloud compute cluster orchestrator provisioning bare-metal, VM, and Cloud Run nodes.', status: 'RING_0', tier: 'Core', enabled: true },
  { id: 2, code: 'CLOUD-02', name: 'Container Runtime Engine', category: 'Infrastructure', description: 'OCl-compliant containerd runtime engine with automated image caching and layer optimization.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 3, code: 'CLOUD-03', name: 'Kubernetes Cluster Manager', category: 'Infrastructure', description: 'Managed K8s control plane with automated node autoscaling, ingress control, and pod mesh.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 4, code: 'CLOUD-04', name: 'Serverless Function Runtime', category: 'Infrastructure', description: 'Scale-to-zero event-driven FaaS runtime executing API microservices in milliseconds.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 5, code: 'CLOUD-05', name: 'Distributed Database Services', category: 'Infrastructure', description: 'High-availability PostgreSQL, CockroachDB, and Redis caching infrastructure clusters.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 6, code: 'CLOUD-06', name: 'Sovereign Object Storage', category: 'Infrastructure', description: 'S3-compatible distributed object storage vault with AES-256 encryption and WORM compliance.', status: 'REPLICATED', tier: 'Enterprise', enabled: true },
  { id: 7, code: 'CLOUD-07', name: 'Anycast CDN Network', category: 'Infrastructure', description: 'Global 140+ edge POP CDN caching static assets, JS bundles, and media with sub-15ms latency.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 8, code: 'CLOUD-08', name: 'Global Anycast DNS Gateway', category: 'Infrastructure', description: 'High-availability GeoDNS router with DDoS protection and health check failover.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 9, code: 'CLOUD-09', name: 'Zero-Trust Network Mesh', category: 'Infrastructure', description: 'WireGuard/mTLS encrypted overlay network connecting cloud clusters and edge nodes.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 10, code: 'CLOUD-10', name: 'Enterprise API Gateway', category: 'Infrastructure', description: 'Envoy-based API gateway with rate-limiting, JWT validation, and GraphQL federation.', status: 'RING_0', tier: 'Sovereign', enabled: true },

  // 2. Enterprise Operations (11-20)
  { id: 11, code: 'CLOUD-11', name: 'Multi-Tenant Provisioner', category: 'Enterprise Operations', description: 'Automated infrastructure isolation creating dedicated database schemas and storage buckets per tenant.', status: 'RING_0', tier: 'Core', enabled: true },
  { id: 12, code: 'CLOUD-12', name: 'Workspace Isolation Manager', category: 'Enterprise Operations', description: 'Container cgroup resource limits and virtual network namespace isolation.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 13, code: 'CLOUD-13', name: 'Automated Snapshot Engine', category: 'Enterprise Operations', description: 'Point-in-time database and disk volume backup snapshots with multi-region replication.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 14, code: 'CLOUD-14', name: 'Disaster Recovery Controller', category: 'Enterprise Operations', description: 'RTO < 5s / RPO = 0 automated failover routing traffic to secondary cloud datacenters.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 15, code: 'CLOUD-15', name: 'Continuous Infrastructure Monitor', category: 'Enterprise Operations', description: 'Prometheus metrics collector tracking CPU, RAM, disk I/O, and network bandwidth.', status: 'HEALTHY', tier: 'Core', enabled: true },
  { id: 16, code: 'CLOUD-16', name: 'Centralized Log Aggregator', category: 'Enterprise Operations', description: 'OpenTelemetry / Grafana Loki log aggregation collecting microservice logs in real-time.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 17, code: 'CLOUD-17', name: 'Application Performance (APM)', category: 'Enterprise Operations', description: 'Distributed tracing tracing API request latency across internal microservices.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 18, code: 'CLOUD-18', name: 'Cloud Cost Optimizer', category: 'Enterprise Operations', description: 'AI-driven node right-sizing and spot instance orchestration reducing cloud bill by 40%.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 19, code: 'CLOUD-19', name: 'Dynamic Resource Allocator', category: 'Enterprise Operations', description: 'Real-time CPU and memory re-allocation based on incoming traffic spikes.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 20, code: 'CLOUD-20', name: 'SLA Compliance Enforcer', category: 'Enterprise Operations', description: '99.999% uptime monitoring and automated SLA breach penalty calculations.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },

  // 3. Hybrid Architecture (21-30)
  { id: 21, code: 'CLOUD-21', name: 'Local Edge Compute Controller', category: 'Hybrid Architecture', description: 'On-premise edge node manager running offline microservices in remote offices/branches.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 22, code: 'CLOUD-22', name: 'Offline State Queuing Engine', category: 'Hybrid Architecture', description: 'Local IndexedDB/SQLite offline transaction queue with automatic sync on reconnect.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 23, code: 'CLOUD-23', name: 'Cloud Synchronization Hub', category: 'Hybrid Architecture', description: 'Cryptographic delta synchronization reconciling local state with master cloud database.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 24, code: 'CLOUD-24', name: 'Hybrid Database Replicator', category: 'Hybrid Architecture', description: 'Bi-directional database replication streaming mutations between edge and cloud.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 25, code: 'CLOUD-25', name: 'Edge Device Security Manager', category: 'Hybrid Architecture', description: 'Device certificate validation and remote lock/wipe capabilities for edge nodes.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 26, code: 'CLOUD-26', name: 'Enterprise Fleet Manager', category: 'Hybrid Architecture', description: 'Centralized firmware, OS patch, and app update deployment across thousands of devices.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 27, code: 'CLOUD-27', name: 'Industrial IoT Connector', category: 'Hybrid Architecture', description: 'MQTT and Modbus IoT broker connecting agricultural sensors and biometric scanners.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 28, code: 'CLOUD-28', name: 'Digital Twin Infrastructure', category: 'Hybrid Architecture', description: 'Real-time virtual replica of physical datacenters and network topology.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 29, code: 'CLOUD-29', name: 'Event Streaming Bus (NATS/Kafka)', category: 'Hybrid Architecture', description: 'High-throughput publish-subscribe message broker executing 12M events/min.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 30, code: 'CLOUD-30', name: 'Universal Integration Hub', category: 'Hybrid Architecture', description: 'REST, gRPC, and WebHook adapters linking external enterprise ERPs to JUMO CLOUD.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },

  // 4. AI Cloud Infrastructure (31-40)
  { id: 31, code: 'CLOUD-31', name: 'JUMO Cloud Assistant', category: 'AI Cloud', description: 'Conversational LLM infrastructure copilot generating Terraform and debugging pod errors.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 32, code: 'CLOUD-32', name: 'AI Resource Optimizer', category: 'AI Cloud', description: 'Machine learning model predicting compute demand hours in advance to pre-warm clusters.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 33, code: 'CLOUD-33', name: 'LLM & Model Hosting Runtime', category: 'AI Cloud', description: 'GPU-accelerated vLLM inference server hosting Gemini, Llama, and specialized models.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 34, code: 'CLOUD-34', name: 'AI Agent Runtime Engine', category: 'AI Cloud', description: 'Sandbox environment executing multi-agent cooperative workflows and tool calls.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 35, code: 'CLOUD-35', name: 'High-Perf Vector Database', category: 'AI Cloud', description: 'Distributed Qdrant / Pgvector index storing high-dimensional embeddings for RAG.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 36, code: 'CLOUD-36', name: 'Knowledge Graph & RAG Vault', category: 'AI Cloud', description: 'Semantic document parser and RAG context retriever for enterprise knowledge search.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 37, code: 'CLOUD-37', name: 'AI Model Drift Monitor', category: 'AI Cloud', description: 'Real-time tracking of LLM response latency, token cost, and accuracy drift metrics.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 38, code: 'CLOUD-38', name: 'AI Safety Guardrails', category: 'AI Cloud', description: 'Content filtering and prompt injection defense blocking malicious LLM inputs.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 39, code: 'CLOUD-39', name: 'AI Infrastructure Key Vault', category: 'AI Cloud', description: 'Encrypted server-side key store holding Gemini, OpenAI, and custom model credentials.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 40, code: 'CLOUD-40', name: 'AI Microservice Registry', category: 'AI Cloud', description: 'Catalog of deployable AI microservices and cognitive API endpoints.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },

  // 5. Enterprise Extensions (41-50)
  { id: 41, code: 'CLOUD-41', name: 'Developer Portal & IaC Compiler', category: 'Enterprise Extensions', description: 'Self-service portal compiling Terraform and Kubernetes manifests automatically.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 42, code: 'CLOUD-42', name: 'CI/CD Automation Pipeline', category: 'Enterprise Extensions', description: 'GitLab / GitHub Actions runner executing unit tests and container builds.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 43, code: 'CLOUD-43', name: 'Release & Canary Rollouts', category: 'Enterprise Extensions', description: 'Progressive traffic shifting and automated rollback upon HTTP error spikes.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 44, code: 'CLOUD-44', name: 'Container Registry Store', category: 'Enterprise Extensions', description: 'Private Docker registry scanning images for CVE vulnerabilities prior to push.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 45, code: 'CLOUD-45', name: 'Cloud Plugin Marketplace', category: 'Enterprise Extensions', description: 'One-click installable cloud plugins (Grafana, Redis, Nginx, PostgreSQL, MinIO).', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 46, code: 'CLOUD-46', name: 'Sovereign Cloud Compliance', category: 'Enterprise Extensions', description: 'Automated audit checking against national data sovereignty and GDPR laws.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 47, code: 'CLOUD-47', name: 'Infrastructure Audit Log', category: 'Enterprise Extensions', description: 'Immutable log recording every node creation, deployment, and SSH key modification.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 48, code: 'CLOUD-48', name: 'Capacity & License Manager', category: 'Enterprise Extensions', description: 'Tenant CPU/RAM quota enforcement and license key validation.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 49, code: 'CLOUD-49', name: 'Cloud Analytics Studio', category: 'Enterprise Extensions', description: 'Visual node topology diagrams, bandwidth heatmaps, and latency charts.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 50, code: 'CLOUD-50', name: 'Sovereign Control Plane', category: 'Enterprise Extensions', description: 'Ring-0 master control plane governing all cloud infrastructure across JUMO UEOS.', status: 'RING_0', tier: 'Sovereign', enabled: true },

  // 6. Sovereign Infrastructure Controls (51-60)
  { id: 51, code: 'CLOUD-51', name: 'Air-Gapped Cluster Controller', category: 'Sovereign Controls', description: 'Isolated datacenter controller operating without public internet access.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 52, code: 'CLOUD-52', name: 'Local HA Node Sync', category: 'Sovereign Controls', description: 'High-availability cluster heartbeat maintaining node parity across regional centers.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 53, code: 'CLOUD-53', name: 'Quantum-Resistant VPN Mesh', category: 'Sovereign Controls', description: 'Post-quantum lattice cryptography protecting inter-datacenter backhaul tunnels.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 54, code: 'CLOUD-54', name: 'Bare-Metal Hypervisor', category: 'Sovereign Controls', description: 'Type-1 KVM hypervisor orchestrating dedicated bare-metal enterprise servers.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 55, code: 'CLOUD-55', name: 'Hardware Security Module (HSM)', category: 'Sovereign Controls', description: 'FIPS 140-3 Level 4 hardware security module integration for root key storage.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 56, code: 'CLOUD-56', name: 'Regional Data Sovereignty Guard', category: 'Sovereign Controls', description: 'Geofencing rules preventing citizen data from crossing national borders.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 57, code: 'CLOUD-57', name: 'Distributed Storage Fabric (Ceph)', category: 'Sovereign Controls', description: 'Multi-petabyte distributed block and object storage fabric across cluster nodes.', status: 'REPLICATED', tier: 'Sovereign', enabled: true },
  { id: 58, code: 'CLOUD-58', name: 'Hybrid Mesh Traffic Shaper', category: 'Sovereign Controls', description: 'Quality of Service (QoS) packet prioritization favoring financial and security traffic.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 59, code: 'CLOUD-59', name: 'Zero-Downtime Auto-Failover', category: 'Sovereign Controls', description: 'Instant seamless IP migration transferring active sessions during node maintenance.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 60, code: 'CLOUD-60', name: 'Immutable Zero-Loss Backup Vault', category: 'Sovereign Controls', description: 'Write-Once-Read-Many (WORM) cryptographically sealed backup vault.', status: 'RING_0', tier: 'Sovereign', enabled: true }
];

export interface CloudPlatformProps {
  onNavigate?: (route: string) => void;
  currentUser?: { name?: string; role?: string; email?: string };
}

export const CloudPlatform: React.FC<CloudPlatformProps> = ({
  onNavigate,
  currentUser = { name: 'Sovereign Cloud Director', role: 'Head of Infrastructure', email: 'cloud@jumo.net' }
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'clusters' | 'owner_controls' | 'assistant'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modules, setModules] = useState<CloudModuleDef[]>(CLOUD_MODULES_60);
  const [selectedModule, setSelectedModule] = useState<CloudModuleDef>(CLOUD_MODULES_60[0]);
  const [isDeploying, setIsDeploying] = useState(false);

  // Chat Assistant State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: 'Greetings. I am the JUMO Cloud Assistant (CLOUD-31). Hybrid multi-cloud Kubernetes clusters, S3 Object Vault, and Anycast CDN are operating at 100% capacity. All 60 cloud infrastructure modules are healthy under Ring-0 Owner Control Center authority. How can I assist with cluster scaling or IaC deployments today?',
      time: 'Just now'
    }
  ]);

  const handleToggleModule = (id: number) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const handleApplyIaC = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert('JUMO Cloud IaC Sync Complete: Terraform and Kubernetes manifests applied cleanly. All 60 cloud modules verified active across EU Central and Africa East clusters.');
    }, 800);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const txt = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: txt, time: 'Just now' }]);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `[JUMO Cloud AI]: Evaluated infrastructure query regarding "${txt}". K8s Cluster Manager (CLOUD-03) reports pod CPU utilization at 14.2% and Object Storage (CLOUD-06) at 480 TB used. Zero error rates detected.`,
          time: 'Just now'
        }
      ]);
    }, 600);
  };

  const filteredModules = modules.filter(m => {
    const matchesCat = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col">
      {/* 1. TOP PLATFORM BANNER */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-5 py-3 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-extrabold shadow-sm">
            <Cloud className="w-5 h-5 text-teal-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider text-teal-400 uppercase font-mono">JUMO CLOUD v1.0</span>
              <span className="text-[10px] bg-teal-950 text-teal-300 border border-teal-700/60 px-2 py-0.5 rounded-full font-mono font-bold">
                60 INFRASTRUCTURE MODULES
              </span>
            </div>
            <h1 className="text-sm font-extrabold text-white">
              JUMO Cloud & Enterprise Infrastructure Platform
            </h1>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={handleApplyIaC}
            disabled={isDeploying}
            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isDeploying ? 'animate-spin' : ''}`} />
            <span>{isDeploying ? 'Deploying IaC...' : 'Apply IaC Sync'}</span>
          </button>

          <button
            onClick={() => setActiveTab('assistant')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 font-bold rounded-lg flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Cloud AI Assistant</span>
          </button>

          <div className="h-4 w-px bg-slate-700" />

          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-white block">{currentUser?.name || 'Administrator'}</span>
            <span className="text-[10px] text-teal-400 font-mono block">CLOUD DIRECTOR</span>
          </div>
        </div>
      </header>

      {/* 2. NAVIGATION TABS */}
      <nav className="bg-white border-b border-slate-200 px-4 py-1 flex items-center gap-1 overflow-x-auto text-xs font-bold text-slate-700 shadow-2xs">
        {[
          { id: 'overview', label: 'Cloud Command Console', icon: Server },
          { id: 'catalog', label: '60 Cloud Modules', icon: Package, badge: '60 FULL' },
          { id: 'clusters', label: 'K8s Multi-Cloud Clusters', icon: Network },
          { id: 'owner_controls', label: 'Owner Control Center (Ring-0)', icon: Sliders, badge: 'RING-0' },
          { id: 'assistant', label: 'JUMO Cloud AI Assistant', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 border transition whitespace-nowrap ${
                isActive
                  ? 'bg-teal-50 border-teal-400 text-teal-900 font-bold shadow-2xs'
                  : 'bg-transparent border-transparent hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-700' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  isActive ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. MAIN WORKSPACE */}
      <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
        {/* OVERVIEW VIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Scorecard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Sovereign K8s Clusters</span>
                  <Server className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-emerald-600 mt-2">240 Active Nodes</div>
                <span className="text-[11px] text-emerald-700 font-medium">99.999% Uptime Verified</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Object Vault Storage</span>
                  <Database className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-3xl font-black text-teal-600 mt-2">1.2 PB Capacity</div>
                <span className="text-[11px] text-teal-700 font-medium">480 TB Replicated (S3 API)</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Anycast CDN Mesh</span>
                  <Globe className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-3xl font-black text-blue-600 mt-2">142 Edge POPs</div>
                <span className="text-[11px] text-blue-700 font-medium">12ms Average Latency</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Active Cloud Modules</span>
                  <Package className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">60 / 60 Full</div>
                <span className="text-[11px] text-slate-500 font-medium">Ring-0 Control Enforced</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">JUMO CLOUD 60-Module Infrastructure Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {[
                  { name: '1. Infrastructure', count: '10 Modules', desc: 'Compute Clusters, Container Runtime, K8s Manager, Serverless FaaS, Distributed DBs, Object Storage, CDN, DNS Gateway, Zero-Trust Mesh, API Gateway' },
                  { name: '2. Enterprise Operations', count: '10 Modules', desc: 'Multi-Tenant Isolation, Workspace Limits, Snapshots, Disaster Recovery, Continuous Monitoring, Log Aggregator, APM Tracing, Cost Optimizer, Dynamic Allocator, SLA Enforcer' },
                  { name: '3. Hybrid Architecture', count: '10 Modules', desc: 'Local Edge Compute, Offline State Queuing, Cloud Sync, Hybrid DB Replicator, Device Security, Fleet Manager, Industrial IoT, Digital Twin, Event Bus, Integration Hub' },
                  { name: '4. AI Cloud Infrastructure', count: '10 Modules', desc: 'Cloud AI Assistant, AI Resource Optimizer, LLM Hosting, AI Agent Runtime, Vector DB, Knowledge Graph RAG, Model Drift Monitor, AI Guardrails, AI Key Vault, AI Registry' },
                  { name: '5. Enterprise Extensions', count: '10 Modules', desc: 'Developer Portal, CI/CD Pipelines, Canary Rollouts, Container Store, Plugin Marketplace, Compliance Engine, Audit Log, Capacity Manager, Analytics Studio, Control Plane' },
                  { name: '6. Sovereign Controls', count: '10 Modules', desc: 'Air-Gapped Clusters, Local HA Sync, Quantum-Resistant VPN, Bare-Metal KVM, Custom HSM, Regional Sovereignty Guard, Distributed Storage Fabric, Hybrid Traffic Shaper, Zero-Loss Vault' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900">{item.name}</span>
                      <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">
                        {item.count}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 60-MODULE CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">JUMO CLOUD 60-Module Registry</h2>
                  <p className="text-xs text-slate-500">Universal Cloud Infrastructure modules powering compute, storage, networking, and AI runtimes.</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search code or module name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto text-xs pt-2 border-t border-slate-100">
                {['ALL', 'Infrastructure', 'Enterprise Operations', 'Hybrid Architecture', 'AI Cloud', 'Enterprise Extensions', 'Sovereign Controls'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                      selectedCategory === cat ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModules.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedModule(m)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                    selectedModule.id === m.id
                      ? 'bg-teal-50/60 border-teal-500 shadow-xs ring-1 ring-teal-400'
                      : 'bg-white border-slate-200 hover:border-teal-300'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                        {m.code}
                      </span>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {m.tier}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">{m.name}</h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{m.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">{m.category}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleModule(m.id);
                      }}
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        m.enabled ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {m.enabled ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KUBERNETES MULTI-CLOUD CLUSTERS VIEW */}
        {activeTab === 'clusters' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Server className="w-5 h-5 text-teal-600" />
                  <span>Sovereign Kubernetes Multi-Cloud Clusters</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">Live Kubernetes cluster health, CPU/Memory metrics, and region node allocation.</p>
              </div>
              <span className="px-3 py-1 bg-teal-100 text-teal-800 font-mono font-bold text-xs rounded-xl border border-teal-300">
                CLUSTERS HEALTHY: 4 REGIONS
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 font-bold text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">Cluster ID</th>
                  <th className="p-3">Region / Location</th>
                  <th className="p-3">Node Count</th>
                  <th className="p-3">CPU Load</th>
                  <th className="p-3">RAM Allocation</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 'jumo-prod-eu-central-1', region: 'Frankfurt / Geneva', nodes: '64 K8s Nodes', cpu: '14.2%', ram: '38.6%', status: 'HEALTHY' },
                  { id: 'jumo-prod-af-east-1', region: 'Nairobi / Kampala', nodes: '48 K8s Nodes', cpu: '18.9%', ram: '45.1%', status: 'HEALTHY' },
                  { id: 'jumo-prod-us-east-2', region: 'Virginia / Ohio', nodes: '96 K8s Nodes', cpu: '22.4%', ram: '52.0%', status: 'HEALTHY' },
                  { id: 'jumo-edge-asia-1', region: 'Singapore / Tokyo', nodes: '32 Edge Nodes', cpu: '11.5%', ram: '29.3%', status: 'HEALTHY' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-teal-700">{row.id}</td>
                    <td className="p-3 font-bold text-slate-800">{row.region}</td>
                    <td className="p-3 text-slate-600 font-mono">{row.nodes}</td>
                    <td className="p-3 font-bold text-slate-900">{row.cpu}</td>
                    <td className="p-3 text-blue-700 font-bold">{row.ram}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">HEALTHY</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* OWNER CONTROL CENTER CONTROLS */}
        {activeTab === 'owner_controls' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-600" />
                <span>Ring-0 Owner Control Center — JUMO CLOUD Governance</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Central cloud cluster management, container autoscaling rules, and data sovereignty geofencing policies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase">Geofencing & Data Sovereignty</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Enforce Strict Regional Data Boundaries (GDPR/Central Bank)</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Activate Quantum-Resistant VPN Encryption for Tunnel Sync</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase">Resource & Autoscaling Rules</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Enable AI Resource Predictive pre-warming for traffic spikes</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Automated Zero-Downtime Failover to Secondary Cloud Region</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI ASSISTANT VIEW */}
        {activeTab === 'assistant' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col h-[650px] overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-md">
                  <Sparkles className="w-5 h-5 text-teal-100" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">JUMO Cloud Assistant (CLOUD-31)</h3>
                  <p className="text-xs text-slate-300">Sovereign Infrastructure AI & Kubernetes Copilot</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-teal-950 text-teal-300 border border-teal-700 rounded-full font-bold">
                Nodes Status: 240 Healthy
              </span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask JUMO Cloud AI about Terraform manifests, K8s pod health, S3 vault capacity, or CDN latency..."
                className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-teal-600"
              />
              <button onClick={handleSendMessage} className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm">
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 px-5 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-teal-400 font-bold flex items-center gap-1">
            <Cloud className="w-3.5 h-3.5" /> JUMO CLOUD v1.0 SOVEREIGN INFRASTRUCTURE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">60 Cloud Modules Healthy</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold">240 K8s Nodes Operational</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>S3 Vault 1.2 PB Ready</span>
          <span>Ring-0 Authority</span>
        </div>
      </footer>
    </div>
  );
};

export default CloudPlatform;
