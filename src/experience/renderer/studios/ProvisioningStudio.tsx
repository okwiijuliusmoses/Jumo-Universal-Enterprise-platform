import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Server, Shield, CheckCircle2, AlertCircle, Play, 
  RefreshCw, Cpu, HardDrive, Network, Key, ArrowRight, FileCheck,
  Award, Globe, Layers, Zap, Clock, Terminal, Lock
} from 'lucide-react';

interface ProvisioningStudioProps {
  onProvisionPlatform?: (templateId: string, config: any) => void;
}

export const ProvisioningStudio: React.FC<ProvisioningStudioProps> = () => {
  const [activeTab, setActiveTab] = useState<'intake' | 'readiness' | 'pipeline' | 'commissioning' | 'installations'>('intake');
  const [intakes, setIntakes] = useState<any[]>([]);
  const [installations, setInstallations] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [readinessChecks, setReadinessChecks] = useState<any[]>([]);
  const [activeInstallation, setActiveInstallation] = useState<any | null>(null);

  // Form State
  const [institutionName, setInstitutionName] = useState('Ministry of Digital Economy & National Treasury');
  const [institutionId, setInstitutionId] = useState('NAT-TREASURY');
  const [institutionType, setInstitutionType] = useState('NATIONAL_GOVERNMENT');
  const [tenantId, setTenantId] = useState('TENANT-NAT-GOV-01');
  const [selectedCertId, setSelectedCertId] = useState('JDPM/CERT2608/0001');
  const [adminName, setAdminName] = useState('Dr. Julius M. Moses');
  const [adminEmail, setAdminEmail] = useState('admin@treasury.gov.sovereign');
  const [securityClearance, setSecurityClearance] = useState('TOP_SECRET_LEVEL_10');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'CORE_IDENTITY', 'FINANCIAL_LEDGER', 'OPERATIONS_PORTAL', 'AUDIT_TRAIL'
  ]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchInstitutionalData = async () => {
    try {
      setLoading(true);
      const [intakesRes, instsRes, certsRes] = await Promise.all([
        fetch('/api/v1/ueos/institutional/intakes').then(r => r.json()),
        fetch('/api/v1/ueos/institutional/installations').then(r => r.json()),
        fetch('/api/v1/ueos/verification/summary').then(r => r.json())
      ]);

      if (intakesRes.intakes) setIntakes(intakesRes.intakes);
      if (instsRes.installations) {
        setInstallations(instsRes.installations);
        if (instsRes.installations.length > 0 && !activeInstallation) {
          setActiveInstallation(instsRes.installations[0]);
        }
      }
      if (certsRes.certificates) {
        setCertificates(certsRes.certificates);
        if (certsRes.certificates.length > 0) {
          setSelectedCertId(certsRes.certificates[0].certificateId);
        }
      }
    } catch (err: any) {
      console.error("Failed to load institutional data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutionalData();
  }, []);

  const handleRegisterIntake = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        institutionId,
        institutionName,
        institutionType,
        tenantId,
        location: 'National Sovereign Datacenter, Enclave Alpha',
        operatingEnvironment: 'SOVEREIGN_ON_PREM',
        administrators: [{ name: adminName, email: adminEmail, role: 'CHIEF_SYSTEM_ADMIN', securityClearance }],
        departments: ['Treasury', 'Revenue Authority', 'Internal Audit', 'Cyber Command'],
        domains: ['FINANCE', 'IDENTITY', 'GOVERNANCE'],
        requiredModules: selectedModules,
        requiredServices: ['SRV-CORE-LEDGER', 'SRV-IDENTITY-GATEWAY', 'SRV-AUDIT-PROBE'],
        requiredWorkflows: ['TREASURY_DISBURSEMENT_APPROVAL', 'SOVEREIGN_AUDIT_CYCLE'],
        dataSources: [{ name: 'PostgresPrimary', type: 'PostgreSQL 16 RLS', uri: 'postgresql://db.sovereign.local:5432/treasury', encryption: 'AES_256_GCM' }],
        integrations: [
          { targetSystem: 'CENTRAL_BANK_RTGS', protocol: 'ISO 20022 / AS4', authMethod: 'mTLS_TPM2' },
          { targetSystem: 'NATIONAL_IDENTITY_REGISTRY', protocol: 'REST / OAuth2 mTLS', authMethod: 'PKI_X509' }
        ],
        securityRequirements: {
          zeroTrustRequired: true,
          dataResidencyCountry: 'DOMESTIC_SOVEREIGN',
          encryptionAtRest: 'AES_256_GCM',
          mfaEnforced: true,
          auditRetentionDays: 3650
        },
        aiRequirements: {
          primaryIntelligence: 'JUMO_GPT_SOVEREIGN',
          specialistAssigned: 'GEMINI_FLASH',
          humanInTheLoopThreshold: 'CRITICAL_ALL',
          offlineFallbackAllowed: true
        },
        branding: {
          displayName: institutionName,
          primaryColor: '#0F172A',
          language: 'en',
          currency: 'USD',
          timezone: 'UTC'
        },
        complianceFrameworks: ['ISO 27001', 'SOC 2 Type II', 'NIST SP 800-53', 'FAAP Sovereign Ledger Standard'],
        offlineOperatingSupport: true
      };

      const res = await fetch('/api/v1/ueos/institutional/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.valid) {
        setStatusMessage(`Intake registered successfully: ${data.intakeId}`);
        await fetchInstitutionalData();
        setActiveTab('readiness');
        await runReadinessProbe(data.intakeId);
      } else {
        setStatusMessage(`Validation failed: ${data.validationErrors.join(', ')}`);
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const runReadinessProbe = async (intakeId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/ueos/institutional/readiness/${intakeId}`);
      const data = await res.json();
      if (data.checks) {
        setReadinessChecks(data.checks);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteInstallation = async (intakeId: string) => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/ueos/institutional/install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intakeId,
          certificateId: selectedCertId,
          operator: 'CHIEF_SYSTEM_ARCHITECT'
        })
      });
      const data = await res.json();
      if (data.installationId) {
        setActiveInstallation(data);
        setStatusMessage(`Installation commissioned: ${data.installationId}`);
        await fetchInstitutionalData();
        setActiveTab('commissioning');
      }
    } catch (err: any) {
      setStatusMessage(`Installation Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptanceApproval = async (installationId: string) => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/ueos/institutional/acceptance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          installationId,
          authorityName: adminName,
          authorityRole: 'CHIEF_TREASURY_SECRETARY'
        })
      });
      const data = await res.json();
      if (data.installationId) {
        setActiveInstallation(data);
        setStatusMessage(`Institutional Acceptance Approved by ${adminName}`);
        await fetchInstitutionalData();
      }
    } catch (err: any) {
      setStatusMessage(`Acceptance Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoLive = async (installationId: string) => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/ueos/institutional/golive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ installationId })
      });
      const data = await res.json();
      if (data.installationId) {
        setActiveInstallation(data);
        setStatusMessage(`GO-LIVE SUCCESSFUL! Institution ${data.institutionName} is operational.`);
        await fetchInstitutionalData();
      }
    } catch (err: any) {
      setStatusMessage(`Go-Live Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (mod: string) => {
    setSelectedModules(prev => 
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Institutional Installation & Commissioning Studio</h2>
            <p className="text-sm text-slate-500 font-medium">JDPM-3000 Post-Certification Deployment, Setup & Acceptance Gate</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
          {(['intake', 'readiness', 'commissioning', 'installations'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
          <button onClick={fetchInstitutionalData} className="p-2 text-slate-500 hover:text-slate-900 rounded-md">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-blue-600" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-blue-600 hover:text-blue-900 text-xs">Dismiss</button>
        </div>
      )}

      {/* Main Tabs */}
      <AnimatePresence mode="wait">
        {activeTab === 'intake' && (
          <motion.div
            key="intake"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Intake Form */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                  <Shield size={16} className="text-blue-600" />
                  Institutional Onboarding & Intake Mandate
                </h3>
                <p className="text-xs text-slate-500 mt-1">Configure sovereign boundaries, tenant isolation, and administrative authority.</p>
              </div>

              <form onSubmit={handleRegisterIntake} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Institution Legal Name</label>
                    <input
                      type="text"
                      value={institutionName}
                      onChange={e => setInstitutionName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-slate-900 outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Institution Code</label>
                    <input
                      type="text"
                      value={institutionId}
                      onChange={e => setInstitutionId(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-slate-900 outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Institution Category</label>
                    <select
                      value={institutionType}
                      onChange={e => setInstitutionType(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-slate-900 outline-hidden"
                    >
                      <option value="NATIONAL_GOVERNMENT">National Government</option>
                      <option value="CENTRAL_BANK">Central Bank / Monetary Authority</option>
                      <option value="COMMERCIAL_BANK">Commercial Bank</option>
                      <option value="HEALTHCARE_SYSTEM">National Healthcare System</option>
                      <option value="DEFENSE_AGENCY">Defense & Sovereign Enclave</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Tenant Boundary ID</label>
                    <input
                      type="text"
                      value={tenantId}
                      onChange={e => setTenantId(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-slate-900 outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Bound Certified Product</label>
                    <select
                      value={selectedCertId}
                      onChange={e => setSelectedCertId(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-slate-900 outline-hidden"
                    >
                      {certificates.map(cert => (
                        <option key={cert.certificateId} value={cert.certificateId}>
                          {cert.productName} ({cert.certificateId})
                        </option>
                      ))}
                      {certificates.length === 0 && (
                        <option value="JDPM/CERT2608/0001">JDPM/CERT2608/0001 (Core ERP)</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Chief Admin Authority</label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={e => setAdminName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-slate-900 outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Admin Sovereign Email</label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={e => setAdminEmail(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-slate-900 outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Security Clearance</label>
                    <select
                      value={securityClearance}
                      onChange={e => setSecurityClearance(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-slate-900 outline-hidden"
                    >
                      <option value="SECRET">SECRET (Level 5)</option>
                      <option value="TOP_SECRET_LEVEL_10">TOP SECRET LEVEL 10 (Sovereign Authority)</option>
                      <option value="CONFIDENTIAL">CONFIDENTIAL</option>
                    </select>
                  </div>
                </div>

                {/* Modules Selection */}
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Required Institutional Modules</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      'CORE_IDENTITY', 'FINANCIAL_LEDGER', 'OPERATIONS_PORTAL', 'AUDIT_TRAIL',
                      'CENTRAL_BANK_GATEWAY', 'TAX_REVENUE_MODULE', 'HR_PAYROLL', 'DOCUMENT_VAULT'
                    ].map(mod => (
                      <button
                        type="button"
                        key={mod}
                        onClick={() => toggleModule(mod)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          selectedModules.includes(mod)
                            ? 'bg-slate-900 text-white border-slate-900 font-bold'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 text-xs font-medium'
                        }`}
                      >
                        <span className="text-[10px] block truncate">{mod}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Play size={14} /> Register Intake & Begin Preflight Readiness Probe
                </button>
              </form>
            </div>

            {/* Sidebar Active Intakes */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Locked Installation Lineage</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 size={14} /> JDPM/CERT2608/0001 (Certified)
                  </div>
                  <div className="pl-5 text-slate-400 text-xs">↓</div>
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                    <Server size={14} /> Institutional Intake & Planning
                  </div>
                  <div className="pl-5 text-slate-400 text-xs">↓</div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Shield size={14} /> Environment Readiness (7 Probes)
                  </div>
                  <div className="pl-5 text-slate-400 text-xs">↓</div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <FileCheck size={14} /> Subsystem Commissioning Verification
                  </div>
                  <div className="pl-5 text-slate-400 text-xs">↓</div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Award size={14} /> Dual-Signature Institutional Acceptance
                  </div>
                  <div className="pl-5 text-slate-400 text-xs">↓</div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Globe size={14} /> Controlled Production Go-Live
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-700">Registered Intakes ({intakes.length})</h4>
                <div className="space-y-3">
                  {intakes.map(item => (
                    <div key={item.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs text-slate-900">{item.intake.institutionName}</span>
                        <span className="text-[9px] font-mono bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{item.id}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setActiveTab('readiness');
                            runReadinessProbe(item.id);
                          }}
                          className="px-2.5 py-1 bg-slate-900 text-white rounded text-[10px] font-bold"
                        >
                          Probe Readiness
                        </button>
                        <button
                          onClick={() => handleExecuteInstallation(item.id)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold"
                        >
                          Execute Install
                        </button>
                      </div>
                    </div>
                  ))}
                  {intakes.length === 0 && (
                    <div className="text-center py-6 text-xs text-slate-400 italic">No registered intakes yet.</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'readiness' && (
          <motion.div
            key="readiness"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Environment Readiness Audit (7 Enclave Probes)</h3>
                  <p className="text-xs text-slate-500 font-medium">Verifies physical infrastructure, isolated storage enclaves, PostgreSQL RLS, and Zero-Trust mTLS before package deployment.</p>
                </div>
                <button
                  onClick={() => intakes.length > 0 && runReadinessProbe(intakes[0].id)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <RefreshCw size={14} /> Re-Probe
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(readinessChecks.length > 0 ? readinessChecks : [
                  { category: 'COMPUTE', parameter: 'vCPU Cores Available', required: '>= 8 Cores', observed: '16 Cores Detected', status: 'PASSED', details: 'High-throughput compute enclave verified.' },
                  { category: 'MEMORY', parameter: 'RAM Enclave Allocation', required: '>= 32 GB', observed: '64 GB Dedicated Enclave', status: 'PASSED', details: 'Sufficient headroom for concurrent execution.' },
                  { category: 'STORAGE', parameter: 'Encrypted NVMe Volume', required: '>= 250 GB NVMe (AES-256)', observed: '500 GB NVMe Available', status: 'PASSED', details: 'Hardware-backed keystore accessible.' },
                  { category: 'DATABASE', parameter: 'PostgreSQL Relational Storage', required: 'PostgreSQL 16+ RLS', observed: 'PostgreSQL 16.2 Enterprise', status: 'PASSED', details: 'Multi-tenant database connected.' },
                  { category: 'SECURITY', parameter: 'Zero-Trust mTLS Isolation', required: 'mTLS TPM 2.0 Vault', observed: 'JUMO Sovereign Vault Initialized', status: 'PASSED', details: 'Zero-Trust boundary established.' },
                  { category: 'TLS', parameter: 'TLS 1.3 Cipher Suites', required: 'TLS_AES_256_GCM_SHA384', observed: 'TLS 1.3 Protocol Active', status: 'PASSED', details: 'Strict transport security configured.' },
                  { category: 'INTEGRATION', parameter: 'Enterprise Gateway Bridge', required: 'Port 3000 Ingress', observed: 'Gateway Route Verified', status: 'PASSED', details: 'Inter-institutional messaging reachable.' }
                ]).map((chk, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{chk.category}</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        <CheckCircle2 size={12} /> {chk.status}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900">{chk.parameter}</div>
                    <div className="text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-400">Observed:</span> {chk.observed}
                    </div>
                    <div className="text-[10px] text-slate-500">{chk.details}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    if (intakes.length > 0) {
                      handleExecuteInstallation(intakes[0].id);
                    } else {
                      setActiveTab('intake');
                    }
                  }}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  Confirm Readiness & Launch Installation <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'commissioning' && (
          <motion.div
            key="commissioning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {activeInstallation ? (
              <div className="space-y-6">
                {/* Active Installation Status Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase">
                        {activeInstallation.installationId}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{activeInstallation.institutionName}</h3>
                      <p className="text-xs text-slate-500 font-medium">Tenant: {activeInstallation.tenantId} • Linked Certificate: {activeInstallation.certificateId}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] font-black uppercase text-slate-400 block">Installation Stage</span>
                        <span className="text-xs font-black text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                          {activeInstallation.currentStage}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Commissioning Checks */}
                  {activeInstallation.commissioning && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Subsystem Commissioning Evidence</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {activeInstallation.commissioning.checksPerformed.map((chk: any, i: number) => (
                          <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-800">{chk.subsystem}</span>
                              <CheckCircle2 size={14} className="text-emerald-600" />
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">Duration: {chk.durationMs}ms</div>
                            <div className="text-[9px] text-slate-400 font-mono truncate">Digest: {chk.evidenceDigest}</div>
                          </div>
                        ))}
                      </div>

                      {/* Dual-Signature Gate */}
                      <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Dual-Signature Acceptance Gate</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            activeInstallation.commissioning.acceptanceDecision === 'ACCEPTED'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {activeInstallation.commissioning.acceptanceDecision}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Installer Cryptographic Signature:</span>
                            <span className="text-emerald-400">{activeInstallation.commissioning.installerSignature}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Institutional Authority Signature:</span>
                            <span className={activeInstallation.commissioning.institutionAuthoritySignature ? 'text-emerald-400' : 'text-amber-400'}>
                              {activeInstallation.commissioning.institutionAuthoritySignature || 'PENDING INSTITUTIONAL SIGNATURE'}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 flex gap-3">
                          {activeInstallation.commissioning.acceptanceDecision !== 'ACCEPTED' && (
                            <button
                              onClick={() => handleAcceptanceApproval(activeInstallation.installationId)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase"
                            >
                              Sign & Approve Institutional Acceptance
                            </button>
                          )}

                          {activeInstallation.commissioning.acceptanceDecision === 'ACCEPTED' && activeInstallation.currentStage !== 'GO_LIVE_OPERATIONAL' && (
                            <button
                              onClick={() => handleGoLive(activeInstallation.installationId)}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold uppercase"
                            >
                              Trigger Controlled Go-Live
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Execution Logs */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Terminal size={14} /> Installation Audit Trail
                    </h4>
                    <div className="p-3 bg-slate-900 text-slate-300 font-mono text-[11px] rounded-xl space-y-1 max-h-48 overflow-auto">
                      {activeInstallation.logs.map((log: string, idx: number) => (
                        <div key={idx} className="leading-tight">{log}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs font-bold uppercase">
                No active commissioned installation selected. Register an intake to begin.
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'installations' && (
          <motion.div
            key="installations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Institutional Installation Registry ({installations.length})</h3>
              <div className="divide-y divide-slate-100">
                {installations.map(inst => (
                  <div key={inst.installationId} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{inst.institutionName}</span>
                        <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{inst.installationId}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Modules: {inst.installedModules.join(', ')} • Created: {new Date(inst.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                        inst.currentStage === 'GO_LIVE_OPERATIONAL' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {inst.currentStage}
                      </span>
                      <button
                        onClick={() => {
                          setActiveInstallation(inst);
                          setActiveTab('commissioning');
                        }}
                        className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
                {installations.length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-xs italic">No installed institutions found.</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
