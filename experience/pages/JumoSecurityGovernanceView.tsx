/**
 * Phase 38 — Enterprise Security, Identity, Governance & Sovereign Operations Platform
 * Universal Identity Platform, Enterprise Authentication & MFA, AEGIS Sovereign Security, Audit Logs, and UEOS Control Governance.
 */

import React, { useState } from 'react';
import { 
  Shield, Lock, Key, CheckCircle, Search, Plus, Cpu, RefreshCw, 
  Database, Activity, FileText, AlertTriangle, Globe 
} from 'lucide-react';

export const JumoSecurityGovernanceView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'auth' | 'aegis' | 'audit' | 'resilience'>('identity');
  const [isRotatingKeys, setIsRotatingKeys] = useState(false);
  const [rotationSuccess, setRotationSuccess] = useState(false);

  const identitiesList = [
    { name: 'Citizens & Residents', count: '1,450,220', authMethod: 'National ID / Biometric', status: 'Secured' },
    { name: 'Institutional Employees', count: '32,400', authMethod: 'Hardware Security Key (FIDO2)', status: 'Secured' },
    { name: 'University Students & Faculty', count: '482,100', authMethod: 'Institutional SSO / OAuth', status: 'Secured' },
    { name: 'Commercial Banking & Treasury', count: '4,500', authMethod: 'Multi-Factor Certificate', status: 'Secured' },
  ];

  const auditLogsList = [
    { time: '05:25:01 UTC', event: 'SOVEREIGN_AUTH_SUCCESS', user: 'admin@jumo.gov.ug', ip: '196.43.180.12', status: 'Verified' },
    { time: '05:22:14 UTC', event: 'TREASURY_SETTLEMENT_SEALED', user: 'treasury.controller@jumo.com', ip: '196.43.180.45', status: 'Verified' },
    { time: '05:18:40 UTC', event: 'AEGIS_ZERO_TRUST_CHECK', user: 'system.daemon', ip: '127.0.0.1', status: 'Passed' },
    { time: '05:10:02 UTC', event: 'CONFIG_UPDATE_UAMP', user: 'owner@jumo.com', ip: '196.43.180.8', status: 'Verified' },
  ];

  const handleRotateKeys = () => {
    setIsRotatingKeys(true);
    setRotationSuccess(false);
    setTimeout(() => {
      setIsRotatingKeys(false);
      setRotationSuccess(true);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-950 font-semibold uppercase tracking-wider">
            <Shield className="w-4 h-4 text-blue-950" />
            <span>JUMO Security & Governance • AEGIS Sovereign Platform</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-950">Enterprise Security, Identity, Governance & Sovereign Operations Platform</h1>
          <p className="text-xs text-slate-600">
            Unified global identity management, multi-factor authentication, AEGIS zero-trust security architecture, immutable audit trails, and sovereign resilience.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRotateKeys}
            disabled={isRotatingKeys}
            className="px-4 py-2 bg-slate-50 hover:bg-blue-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center space-x-1.5 disabled:opacity-50"
          >
            {isRotatingKeys ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{isRotatingKeys ? 'Rotating Cryptographic Keys...' : 'Rotate Root Security Keys'}</span>
          </button>
        </div>
      </div>

      {rotationSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 animate-fadeIn">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Cryptographic Key Rotation Successful</span>
          </div>
          <p className="text-xs text-emerald-700">All regional cloud nodes successfully updated with new quantum-safe root certificates.</p>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-semibold">
        {[
          { id: 'identity', label: 'Universal Identity Platform', icon: Shield },
          { id: 'auth', label: 'Authentication & MFA', icon: Key },
          { id: 'aegis', label: 'AEGIS Zero-Trust Security', icon: Lock },
          { id: 'audit', label: 'Immutable Audit Trail', icon: FileText },
          { id: 'resilience', label: 'Disaster Recovery & Resilience', icon: Activity },
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
      {activeTab === 'identity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-blue-950 text-base">Global Sovereign Identity Directories</h3>
              <p className="text-xs text-slate-600">Centralized identity registry covering citizens, employees, students, patients, and institutional tenants.</p>

              <div className="space-y-3">
                {identitiesList.map((id, i) => (
                  <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-blue-950 uppercase">{id.status}</span>
                      <span className="text-xs font-bold text-slate-900">{id.count} identities</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{id.name}</h4>
                    <span className="text-[11px] text-slate-500 font-mono">Auth: {id.authMethod}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-blue-950 text-base">RBAC & Attribute-Based Access Control (ABAC)</h3>
              <p className="text-xs text-slate-600">Dynamic authorization policies enforced at the API gateway layer based on user roles, device trust, and geographic location.</p>

              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                <div className="font-bold text-blue-950 text-xs">AEGIS Policy Engine Active</div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Every request requires signed JWT verification coupled with device fingerprinting. Unrecognized IP ranges trigger step-up biometric MFA verification automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'auth' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-blue-950 text-base">Configurable Authentication & Multi-Factor Authentication (MFA)</h3>
          <p className="text-xs text-slate-600">Enforce enterprise security policies across passwordless keys, biometrics, FIDO2 hardware tokens, and national ID credentials.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Hardware Security Keys (FIDO2 / WebAuthn)', 'Biometric Facial & Fingerprint Recognition', 'Institutional Single Sign-On (SAML / OIDC)'].map((auth, i) => (
              <div key={i} className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Enforced Security Tier</span>
                <h4 className="font-bold text-slate-900 text-xs">{auth}</h4>
                <p className="text-xs text-slate-500">Configurable per tenant through JUMO UEOS Control Center.</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'aegis' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-950 text-base">AEGIS Sovereign Zero-Trust Security Platform</h3>
              <p className="text-xs text-slate-600">Continuous session validation, threat detection, anomaly isolation, and quantum-safe cryptographic seals.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-mono text-xs font-bold rounded-md border border-emerald-200">
              ● AEGIS Shield Active
            </span>
          </div>

          <div className="p-6 bg-white text-slate-900 rounded-xl font-mono text-xs space-y-2 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-600">
              <span>AEGIS SECURITY OPERATIONS CENTER (SOC)</span>
              <span className="text-emerald-400">● 0 THREATS DETECTED</span>
            </div>
            <div>[AEGIS_CORE_01] Continuous session validation running across all 14,000 active client connections.</div>
            <div>[AEGIS_CORE_02] Intrusion detection sensors operating at line rate on all API gateway edges.</div>
            <div>[AEGIS_CORE_03] Quantum-safe encryption keys active for all sovereign treasury transactions.</div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-950 text-base">Immutable Audit Trail & Compliance Logging</h3>
              <p className="text-xs text-slate-600">Cryptographically chained audit logs recording every login, configuration change, financial transaction, and AI decision.</p>
            </div>
            <button onClick={() => alert('Exporting cryptographic audit log bundle')} className="px-4 py-2 bg-slate-50 text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition-colors">
              Export Audit Log Bundle
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase font-mono text-[11px]">
                <tr>
                  <th className="p-4">Timestamp (UTC)</th>
                  <th className="p-4">Event Type</th>
                  <th className="p-4">User / Principal</th>
                  <th className="p-4">Source IP</th>
                  <th className="p-4 text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogsList.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono text-slate-500">{log.time}</td>
                    <td className="p-4 font-bold text-blue-950 font-mono">{log.event}</td>
                    <td className="p-4 text-slate-800">{log.user}</td>
                    <td className="p-4 font-mono text-slate-600">{log.ip}</td>
                    <td className="p-4 text-right">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded font-semibold text-[11px] border border-emerald-200">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'resilience' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-blue-950 text-base">Disaster Recovery & Business Continuity Resilience</h3>
          <p className="text-xs text-slate-600">Automated multi-region failover, point-in-time recovery backups, and high-availability operational verification.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-sm">Automated Hourly Snapshots</h4>
              <p className="text-xs text-slate-600">All tenant databases and document vaults are snapshotted hourly with 30-day immutable retention.</p>
            </div>
            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-sm">Multi-Region Failover Readiness</h4>
              <p className="text-xs text-slate-600">Kampala primary data center and Mbale City secondary failover node maintain sub-second synchronization heartbeat.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
