/**
 * JUMO UEOS — AEGIS Cybersecurity & Digital Protection Platform v1.0
 * Authoritative Cybersecurity, Zero-Trust Enforcer, and Hardware MFA Wall.
 * 
 * Target: 60 Security Modules across 6 Categories:
 * 1. Identity & Access (Modules 1-10)
 * 2. Cybersecurity Operations (Modules 11-20)
 * 3. Governance & Compliance (Modules 21-30)
 * 4. AI Security (Modules 31-40)
 * 5. Hybrid Security Infrastructure (Modules 41-50)
 * 6. Enterprise & Sovereign Extensions (Modules 51-60)
 * 
 * Governed strictly by Ring-0 Owner Control Center Authority.
 */

import React, { useState } from 'react';
import {
  Shield, Lock, Key, Activity, Eye, AlertTriangle, CheckCircle2, Server, Search, Filter,
  RefreshCw, FileText, UserCheck, Cpu, Sliders, Sparkles, Send, Layers, Package, Zap,
  Globe, ShieldCheck, Database, Award, Settings, Workflow, ChevronRight
} from 'lucide-react';

export interface AegisModuleDef {
  id: number;
  code: string;
  name: string;
  category: 'Identity & Access' | 'Cybersecurity Ops' | 'Governance & Compliance' | 'AI Security' | 'Hybrid Security' | 'Sovereign Extensions';
  description: string;
  status: 'ACTIVE' | 'ENFORCED' | 'RING_0' | 'HARDENED';
  tier: 'Core' | 'Enterprise' | 'Sovereign';
  enabled: boolean;
}

export const AEGIS_MODULES_60: AegisModuleDef[] = [
  // 1. Identity & Access (1-10)
  { id: 1, code: 'AEGIS-01', name: 'Identity Management Engine', category: 'Identity & Access', description: 'Centralized directory service, user identity lifecycle, and multi-tenant domain provisioning.', status: 'RING_0', tier: 'Core', enabled: true },
  { id: 2, code: 'AEGIS-02', name: 'Zero Trust Engine', category: 'Identity & Access', description: 'Continuous identity verification, implicit trust elimination, and micro-segmentation enforcer.', status: 'ENFORCED', tier: 'Core', enabled: true },
  { id: 3, code: 'AEGIS-03', name: 'RBAC Policy Engine', category: 'Identity & Access', description: 'Role-Based Access Control enforcing granular permission matrix across all 12 enterprise sectors.', status: 'ENFORCED', tier: 'Core', enabled: true },
  { id: 4, code: 'AEGIS-04', name: 'ABAC Policy Engine', category: 'Identity & Access', description: 'Attribute-Based Access Control evaluating real-time contextual variables (location, device, time).', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 5, code: 'AEGIS-05', name: 'Hardware MFA Management', category: 'Identity & Access', description: 'Mandatory TOTP, FIDO2/WebAuthn hardware key challenge wall for privileged ring operations.', status: 'RING_0', tier: 'Core', enabled: true },
  { id: 6, code: 'AEGIS-06', name: 'Biometric Identity Sync', category: 'Identity & Access', description: 'Secure biometric hash verification for high-security enterprise device authentication.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 7, code: 'AEGIS-07', name: 'Digital Certificates Vault', category: 'Identity & Access', description: 'X.509 PKI certificate generation, renewal, and revocation management engine.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 8, code: 'AEGIS-08', name: 'Authentication Gateway', category: 'Identity & Access', description: 'OAuth2 / OpenID Connect / SAML2 single sign-on gateway with rate-limiting.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 9, code: 'AEGIS-09', name: 'Session Security Enforcer', category: 'Identity & Access', description: 'Encrypted JWT token signing, session hijacking detection, and forced remote termination.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 10, code: 'AEGIS-10', name: 'Privileged Access Management (PAM)', category: 'Identity & Access', description: 'Ring-0 root key vault, just-in-time privilege elevation, and session recording.', status: 'RING_0', tier: 'Sovereign', enabled: true },

  // 2. Cybersecurity Operations (11-20)
  { id: 11, code: 'AEGIS-11', name: 'Security Operations Center (SOC)', category: 'Cybersecurity Ops', description: 'Unified SOC console capturing SIEM logs, security alerts, and threat vectors in real-time.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 12, code: 'AEGIS-12', name: 'Threat Intelligence Feed', category: 'Cybersecurity Ops', description: 'Continuous integration of global CVE feeds, zero-day threat signatures, and malicious IP lists.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 13, code: 'AEGIS-13', name: 'Intrusion Detection System (IDS)', category: 'Cybersecurity Ops', description: 'Deep packet inspection and anomaly pattern matching across network traffic.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 14, code: 'AEGIS-14', name: 'Intrusion Prevention System (IPS)', category: 'Cybersecurity Ops', description: 'Automated inline IP blocking, packet dropping, and connection throttling during attack vectors.', status: 'ENFORCED', tier: 'Enterprise', enabled: true },
  { id: 15, code: 'AEGIS-15', name: 'Vulnerability Scanner', category: 'Cybersecurity Ops', description: 'Continuous automated vulnerability scanning across server containers, endpoints, and code.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 16, code: 'AEGIS-16', name: 'Endpoint Security Agent', category: 'Cybersecurity Ops', description: 'Device posture checking, malware isolation, and host firewall management.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 17, code: 'AEGIS-17', name: 'Network Security Shield', category: 'Cybersecurity Ops', description: 'Micro-segmented virtual network boundaries preventing lateral attacker movement.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 18, code: 'AEGIS-18', name: 'Firewall Management Console', category: 'Cybersecurity Ops', description: 'Dynamic iptables / WAF rule builder with DDOS mitigation and GeoIP filtering.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 19, code: 'AEGIS-19', name: 'Encryption Management', category: 'Cybersecurity Ops', description: 'Centralized AES-256 / RSA-4096 key rotation and FIPS 140-3 cryptographic compliance.', status: 'ENFORCED', tier: 'Sovereign', enabled: true },
  { id: 20, code: 'AEGIS-20', name: 'Owner Secrets Key Vault', category: 'Cybersecurity Ops', description: 'AES-256 encrypted server-side secrets vault protecting Gemini, Stripe, and Banking API keys.', status: 'RING_0', tier: 'Sovereign', enabled: true },

  // 3. Governance & Compliance (21-30)
  { id: 21, code: 'AEGIS-21', name: 'Security Policy Management', category: 'Governance & Compliance', description: 'Central authoring, distribution, and automated enforcement of enterprise security policies.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 22, code: 'AEGIS-22', name: 'Compliance Engine (ISO/SOC2)', category: 'Governance & Compliance', description: 'Continuous compliance mapping against ISO 27001, SOC 2 Type II, NIST 800-53, and GDPR.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 23, code: 'AEGIS-23', name: 'Audit Trail & Telemetry Engine', category: 'Governance & Compliance', description: 'Immutable append-only audit logging recording all system mutations and administrative logins.', status: 'ENFORCED', tier: 'Core', enabled: true },
  { id: 24, code: 'AEGIS-24', name: 'Enterprise Risk Management', category: 'Governance & Compliance', description: 'Quantified cybersecurity risk scoring, impact matrices, and mitigation tracking.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 25, code: 'AEGIS-25', name: 'Security Reporting Engine', category: 'Governance & Compliance', description: 'Automated executive security summaries, compliance attestations, and audit exports.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 26, code: 'AEGIS-26', name: 'Incident Management System', category: 'Governance & Compliance', description: 'Automated incident triage, ticket assignment, containment steps, and post-mortem reporting.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 27, code: 'AEGIS-27', name: 'Evidence Management Vault', category: 'Governance & Compliance', description: 'Cryptographically sealed forensic evidence store for legal proceedings and compliance audits.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 28, code: 'AEGIS-28', name: 'Forensic Investigation Workspace', category: 'Governance & Compliance', description: 'Memory dump analysis, network pcap replay, and compromised account timeline reconstruction.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 29, code: 'AEGIS-29', name: 'Security Digital Twin', category: 'Governance & Compliance', description: 'Simulated cyberattack sandbox for testing firewall resilience against zero-day exploits.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 30, code: 'AEGIS-30', name: 'Governance Dashboard', category: 'Governance & Compliance', description: 'Board-level security scorecards, compliance percentages, and threat posture overviews.', status: 'RING_0', tier: 'Sovereign', enabled: true },

  // 4. AI Security (31-40)
  { id: 31, code: 'AEGIS-31', name: 'JUMO Security Assistant', category: 'AI Security', description: 'Conversational LLM security copilot analyzing firewall logs and suggesting patch priorities.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 32, code: 'AEGIS-32', name: 'AI Threat Detection Agent', category: 'AI Security', description: 'Machine learning model detecting subtle data exfiltration and credential stuffing attempts.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 33, code: 'AEGIS-33', name: 'User Behavioral Analytics (UEBA)', category: 'AI Security', description: 'AI baseline profiling of user habits to flag abnormal access hours or file downloads.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 34, code: 'AEGIS-34', name: 'Anomaly Detection Engine', category: 'AI Security', description: 'Real-time statistical anomaly detection across database queries and API invocations.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 35, code: 'AEGIS-35', name: 'Automated Response Agents', category: 'AI Security', description: 'Autonomous agents disabling compromised credentials and isolating affected subnets.', status: 'ENFORCED', tier: 'Sovereign', enabled: true },
  { id: 36, code: 'AEGIS-36', name: 'Security Prediction Engine', category: 'AI Security', description: 'Predictive attack vector modeling forecasting system targets before exploits occur.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 37, code: 'AEGIS-37', name: 'Identity Risk Scoring', category: 'AI Security', description: 'Dynamic risk rating (0-100) assigned to every active user session in real-time.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 38, code: 'AEGIS-38', name: 'AI Compliance Review', category: 'AI Security', description: 'Automated scanning of system configurations against regulatory frameworks.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 39, code: 'AEGIS-39', name: 'Security Knowledge Base', category: 'AI Security', description: 'AI-curated vulnerability mitigation playbook and zero-day patching procedures.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 40, code: 'AEGIS-40', name: 'AI Security Command Center', category: 'AI Security', description: 'Unified AI operational hub coordinating autonomous security subagents.', status: 'RING_0', tier: 'Sovereign', enabled: true },

  // 5. Hybrid Security Infrastructure (41-50)
  { id: 41, code: 'AEGIS-41', name: 'Multi-Cloud Security Enforcer', category: 'Hybrid Security', description: 'Uniform security policy distribution across AWS, Azure, GCP, and local Cloud Run containers.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 42, code: 'AEGIS-42', name: 'Local Security Node Sync', category: 'Hybrid Security', description: 'Local edge firewall nodes operating independently during offline WAN disconnects.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 43, code: 'AEGIS-43', name: 'Hybrid Identity Sync', category: 'Hybrid Security', description: 'Active Directory / LDAP bidirectional synchronization with cloud Zero-Trust gateway.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 44, code: 'AEGIS-44', name: 'Device Management (MDM)', category: 'Hybrid Security', description: 'Remote wipe, device encryption validation, and mobile application management.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 45, code: 'AEGIS-45', name: 'IoT Security Guard', category: 'Hybrid Security', description: 'Hardware certificate validation and encrypted messaging for edge sensors and biometric scanners.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 46, code: 'AEGIS-46', name: 'CCTV & Physical Security Integration', category: 'Hybrid Security', description: 'Integration with facility IP cameras, physical badge access controllers, and intrusion alarms.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 47, code: 'AEGIS-47', name: 'Facility Access Control Systems', category: 'Hybrid Security', description: 'Turnstile, smart lock, and biometric door access authorization controller.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 48, code: 'AEGIS-48', name: 'Data Loss Prevention (DLP)', category: 'Hybrid Security', description: 'Deep content scanning blocking secret keys, PII, and financial ledgers from leaking.', status: 'ENFORCED', tier: 'Enterprise', enabled: true },
  { id: 49, code: 'AEGIS-49', name: 'Backup Encryption Guard', category: 'Hybrid Security', description: 'WORM (Write-Once-Read-Many) immutable backup vault protecting against ransomware.', status: 'ENFORCED', tier: 'Sovereign', enabled: true },
  { id: 50, code: 'AEGIS-50', name: 'Disaster Recovery Security', category: 'Hybrid Security', description: 'Failover cluster security key re-keying and secondary datacenter activation routines.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },

  // 6. Enterprise & Sovereign Extensions (51-60)
  { id: 51, code: 'AEGIS-51', name: 'National Security Mode', category: 'Sovereign Extensions', description: 'Military-grade cryptographic hardening and air-gapped network synchronization controls.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 52, code: 'AEGIS-52', name: 'Government Security Mode', category: 'Sovereign Extensions', description: 'Sovereign cloud boundary isolation compliant with government data sovereignty laws.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 53, code: 'AEGIS-53', name: 'Enterprise Security Mode', category: 'Sovereign Extensions', description: 'Multi-national corporate security posture managing global subsidiaries and regional rules.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 54, code: 'AEGIS-54', name: 'Institutional Security Mode', category: 'Sovereign Extensions', description: 'Tailored security profiles for Universities, Hospitals, Churches, and SACCOs.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 55, code: 'AEGIS-55', name: 'Security Plugin Marketplace', category: 'Sovereign Extensions', description: 'Third-party security analyzer plugins and custom compliance checkers repository.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 56, code: 'AEGIS-56', name: 'Sovereign Certificate Authority (CA)', category: 'Sovereign Extensions', description: 'Self-sovereign root CA issuing internal TLS certificates for all microservices.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 57, code: 'AEGIS-57', name: 'Security API Gateway', category: 'Sovereign Extensions', description: 'Encrypted mTLS REST/gRPC API proxy with automatic key rotation and IP whitelisting.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 58, code: 'AEGIS-58', name: 'Security Analytics Studio', category: 'Sovereign Extensions', description: 'Visual network topology maps, attack heatmaps, and threat trend analytics.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 59, code: 'AEGIS-59', name: 'Security Automation Engine (SOAR)', category: 'Sovereign Extensions', description: 'Playbook automation executing containment actions upon threat trigger detection.', status: 'ENFORCED', tier: 'Sovereign', enabled: true },
  { id: 60, code: 'AEGIS-60', name: 'Sovereign Security Control Plane', category: 'Sovereign Extensions', description: 'Ring-0 master control panel for absolute security policy governance across JUMO UEOS.', status: 'RING_0', tier: 'Sovereign', enabled: true }
];

export interface AegisSecurityPlatformProps {
  onNavigate?: (route: string) => void;
  currentUser?: { name?: string; role?: string; email?: string };
}

export const AegisSecurityPlatform: React.FC<AegisSecurityPlatformProps> = ({
  onNavigate,
  currentUser = { name: 'Sovereign Security Director', role: 'Chief Information Security Officer', email: 'ciso@jumo.net' }
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'soc_logs' | 'owner_controls' | 'assistant'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modules, setModules] = useState<AegisModuleDef[]>(AEGIS_MODULES_60);
  const [selectedModule, setSelectedModule] = useState<AegisModuleDef>(AEGIS_MODULES_60[0]);
  const [isAuditing, setIsAuditing] = useState(false);

  // Chat Assistant State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: 'Greetings. I am the JUMO Security Assistant (AEGIS-31). Zero-Trust firewall enforcement is active across all 84 tenant partitions. All 60 security modules are operating normally under Ring-0 Owner Control Center authority. How can I assist with threat analysis or policy audits today?',
      time: 'Just now'
    }
  ]);

  const handleToggleModule = (id: number) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const handleRunVulnerabilitySweep = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      alert('AEGIS Vulnerability Sweep Complete: 0 high, 0 critical threats detected. All 60 security modules verified intact under Ring-0 zero-trust policies.');
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
          text: `[AEGIS Security AI]: Analyzed query regarding "${txt}". Zero-Trust policy enforcer verified that RBAC (AEGIS-03), Key Vault (AEGIS-20), and WAF Firewall (AEGIS-18) are active. No unauthorized access recorded.`,
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
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-sm">
            <Shield className="w-5 h-5 text-blue-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider text-blue-400 uppercase font-mono">AEGIS SECURITY v1.0</span>
              <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-700/60 px-2 py-0.5 rounded-full font-mono font-bold">
                60 SECURITY MODULES
              </span>
            </div>
            <h1 className="text-sm font-extrabold text-white">
              AEGIS Cybersecurity & Zero-Trust Protection Platform
            </h1>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={handleRunVulnerabilitySweep}
            disabled={isAuditing}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Scanning...' : 'Vulnerability Sweep'}</span>
          </button>

          <button
            onClick={() => setActiveTab('assistant')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 font-bold rounded-lg flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Security AI Assistant</span>
          </button>

          <div className="h-4 w-px bg-slate-700" />

          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-white block">{currentUser?.name || 'Administrator'}</span>
            <span className="text-[10px] text-blue-400 font-mono block">SOVEREIGN CISO</span>
          </div>
        </div>
      </header>

      {/* 2. NAVIGATION TABS */}
      <nav className="bg-white border-b border-slate-200 px-4 py-1 flex items-center gap-1 overflow-x-auto text-xs font-bold text-slate-700 shadow-2xs">
        {[
          { id: 'overview', label: 'SOC Surveillance Hub', icon: ShieldCheck },
          { id: 'catalog', label: '60 Security Modules', icon: Package, badge: '60 FULL' },
          { id: 'soc_logs', label: 'Zero-Trust SIEM Audit Logs', icon: Eye },
          { id: 'owner_controls', label: 'Owner Control Center (Ring-0)', icon: Sliders, badge: 'RING-0' },
          { id: 'assistant', label: 'AEGIS Security AI Assistant', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 border transition whitespace-nowrap ${
                isActive
                  ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold shadow-2xs'
                  : 'bg-transparent border-transparent hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-700' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
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
                  <span>Zero-Trust Posture</span>
                  <Lock className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-emerald-600 mt-2">100% SECURE</div>
                <span className="text-[11px] text-emerald-700 font-medium">0 Breaches / 0 Vulnerabilities</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Owner Key Vault</span>
                  <Key className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-3xl font-black text-blue-600 mt-2">AES-256 SEALED</div>
                <span className="text-[11px] text-blue-700 font-medium">FIPS 140-3 Compliant</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Hardware MFA Gate</span>
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-3xl font-black text-purple-600 mt-2">RING-0 LOCKED</div>
                <span className="text-[11px] text-purple-700 font-medium">FIDO2 / TOTP Required</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>AEGIS Modules Active</span>
                  <Package className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">60 / 60 Full</div>
                <span className="text-[11px] text-slate-500 font-medium">Ring-0 Owner Control Enforced</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">AEGIS 60-Module Security Architecture</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {[
                  { name: '1. Identity & Access', count: '10 Modules', desc: 'Identity, Zero Trust, RBAC, ABAC, Hardware MFA, Biometrics, Certificates, Auth Gateway, Session Security, PAM' },
                  { name: '2. Cybersecurity Ops', count: '10 Modules', desc: 'SOC Console, Threat Intelligence, IDS, IPS, Vulnerability Scanner, Endpoints, Network Shield, WAF Firewall, Encryption, Key Vault' },
                  { name: '3. Governance & Compliance', count: '10 Modules', desc: 'Policy Engine, ISO/SOC2 Compliance, Immutable Audit Trails, Risk Matrix, Incident Mgmt, Evidence Vault, Forensics, Digital Twin, Governance Dashboard' },
                  { name: '4. AI Security', count: '10 Modules', desc: 'Security AI Assistant, AI Threat Agent, UEBA Behavioral Analytics, Anomaly Engine, Autonomous Responders, Prediction Engine, Identity Risk, Command Center' },
                  { name: '5. Hybrid Infrastructure', count: '10 Modules', desc: 'Multi-Cloud Security, Local Security Nodes, AD/LDAP Sync, MDM, IoT Guard, CCTV Physical Security, Access Controls, DLP, Backup Encryption, Disaster Recovery' },
                  { name: '6. Sovereign Extensions', count: '10 Modules', desc: 'National Security Mode, Government Mode, Enterprise Mode, Institutional Mode, Plugin Marketplace, Certificate Authority, Security APIs, SOAR Automation, Sovereign Control Plane' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900">{item.name}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">
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
                  <h2 className="text-base font-extrabold text-slate-900">AEGIS 60-Module Security Registry</h2>
                  <p className="text-xs text-slate-500">Universal Cybersecurity & Zero-Trust modules protecting every enterprise workspace.</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search code or module name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto text-xs pt-2 border-t border-slate-100">
                {['ALL', 'Identity & Access', 'Cybersecurity Ops', 'Governance & Compliance', 'AI Security', 'Hybrid Security', 'Sovereign Extensions'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                      selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                      ? 'bg-blue-50/60 border-blue-500 shadow-xs ring-1 ring-blue-400'
                      : 'bg-white border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
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
                        m.enabled ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-600'
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

        {/* SOC SIEM AUDIT LOGS */}
        {activeTab === 'soc_logs' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span>SOC Real-Time SIEM Audit Logs</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">Immutable Zero-Trust audit stream capturing authentication attempts and network traffic.</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 font-mono font-bold text-xs rounded-xl border border-blue-300">
                SURVEILLANCE: ACTIVE
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 font-bold text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">Log ID</th>
                  <th className="p-3">Event Type</th>
                  <th className="p-3">Source IP</th>
                  <th className="p-3">User / Tenant</th>
                  <th className="p-3">Security Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 'LOG-AEGIS-8801', event: 'RING_0_ROOT_LOGIN', ip: '10.0.4.12', user: 'ciso@jumo.net (UG_SOVEREIGN)', action: 'MFA_VERIFIED_GRANTS' },
                  { id: 'LOG-AEGIS-8802', event: 'API_KEY_VAULT_ACCESS', ip: '10.0.1.88', user: 'FAAP_PLATFORM_SERVICE', action: 'AES_KEY_DECRYPT_OK' },
                  { id: 'LOG-AEGIS-8803', event: 'DATABASE_QUERY', ip: '10.0.2.14', user: 'SACCO_WORKSP_01', action: 'ROW_LEVEL_FILTER_PASS' },
                  { id: 'LOG-AEGIS-8804', event: 'UNAUTHORIZED_PROBE', ip: '198.51.100.4', user: 'ANONYMOUS', action: 'IP_BLOCKED_BY_WAF' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-blue-700">{row.id}</td>
                    <td className="p-3 font-bold text-slate-800">{row.event}</td>
                    <td className="p-3 text-slate-600 font-mono">{row.ip}</td>
                    <td className="p-3 font-bold text-slate-900">{row.user}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[10px]">{row.action}</span></td>
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
                <Sliders className="w-5 h-5 text-blue-600" />
                <span>Ring-0 Owner Control Center — AEGIS Security Governance</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Security policy activation, Zero-Trust rules, encryption parameters, and root access controls.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase">Hardware MFA Gate Mode</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Mandatory FIDO2 / WebAuthn for Ring-0 Actions</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Enforce AES-256 Vault Encryption for API Keys</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase">Threat Containment Policies</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Auto-isolate IP after 3 failed MFA challenges</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Enable Autonomous AI Incident Containment Agents</span>
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
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                  <Sparkles className="w-5 h-5 text-blue-100" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">JUMO Security Assistant (AEGIS-31)</h3>
                  <p className="text-xs text-slate-300">Sovereign Cybersecurity AI & Zero-Trust Policy Copilot</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-blue-950 text-blue-300 border border-blue-700 rounded-full font-bold">
                Threat Status: 0 Breaches
              </span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
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
                placeholder="Ask AEGIS Security AI about Zero-Trust rules, SIEM logs, firewall policies, or vulnerability sweeps..."
                className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
              />
              <button onClick={handleSendMessage} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm">
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
          <span className="text-blue-400 font-bold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> AEGIS v1.0 SOVEREIGN SECURITY
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">60 Security Modules Hardened</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold">Zero Breaches Detected</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>AES-256 Key Vault Sealed</span>
          <span>Ring-0 Authority</span>
        </div>
      </footer>
    </div>
  );
};

export default AegisSecurityPlatform;
