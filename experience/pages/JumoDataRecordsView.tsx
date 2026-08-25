/**
 * Phase 34 — Universal Data, Documents & Digital Records Platform
 * Master Data Management, Digital Records, Document Vault, Configurable Forms, and Intelligent Processing.
 */

import React, { useState } from 'react';
import { 
  Database, FileText, Folder, CheckCircle, Search, Plus, Shield, Cpu, 
  Download, Eye, Lock, RefreshCw, Upload, Layers, HardDrive, Filter 
} from 'lucide-react';

export const JumoDataRecordsView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'records' | 'documents' | 'forms' | 'vault' | 'storage'>('records');
  const [searchTerm, setSearchTerm] = useState('');
  const [recordType, setRecordType] = useState('Citizens & Customers');
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const recordTypesList = [
    { name: 'Citizens & Customers', count: '1,450,220', status: 'Synchronized', updated: 'Real-time' },
    { name: 'Students & Faculty', count: '482,100', status: 'Synchronized', updated: 'Real-time' },
    { name: 'Patients & Healthcare', count: '890,400', status: 'Synchronized', updated: 'Real-time' },
    { name: 'Employees & Members', count: '215,800', status: 'Synchronized', updated: 'Real-time' },
    { name: 'Assets & Infrastructure', count: '94,300', status: 'Synchronized', updated: 'Real-time' },
    { name: 'Contracts & Policies', count: '45,120', status: 'Secured Vault', updated: 'Real-time' },
  ];

  const documentsList = [
    { name: 'National Sovereign Treasury Audit Q2 2026.pdf', size: '14.2 MB', category: 'Financial', version: 'v3.1', encrypted: true },
    { name: 'Makerere University Academic Accreditation Registry.pdf', size: '8.5 MB', category: 'Education', version: 'v2.4', encrypted: true },
    { name: 'Ministry of Health National Pharmacy Logistics Schema.docx', size: '4.1 MB', category: 'Healthcare', version: 'v1.8', encrypted: true },
    { name: 'Commercial Banking RTGS Clearing Certificate.pdf', size: '2.9 MB', category: 'Banking', version: 'v4.0', encrypted: true },
    { name: 'Sovereign Digital ID Cryptographic Root Certificate.pem', size: '1.2 MB', category: 'Security', version: 'v5.2', encrypted: true },
  ];

  const handleRunAiOcr = () => {
    setIsProcessingAI(true);
    setAiResult(null);
    setTimeout(() => {
      setIsProcessingAI(false);
      setAiResult('AI OCR & Classification Complete: Document verified with 99.8% confidence score. Metadata extracted and indexed in JUMO MDM Vault.');
    }, 1800);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-950 font-semibold uppercase tracking-wider">
            <Database className="w-4 h-4 text-blue-950" />
            <span>JUMO Data & Records • Universal Enterprise Information Management</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-950">Universal Data, Documents & Digital Records Platform</h1>
          <p className="text-xs text-slate-600">
            Secure Master Data Management (MDM), enterprise document vaults, intelligent OCR processing, and zero-trust record lifecycles.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert('New Record Ingestion Wizard launched')}
            className="px-4 py-2 bg-slate-50 hover:bg-blue-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ingest New Record</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-semibold">
        {[
          { id: 'records', label: 'Master Data & Records', icon: Database },
          { id: 'documents', label: 'Enterprise Document Vault', icon: FileText },
          { id: 'forms', label: 'Configurable Forms Engine', icon: Layers },
          { id: 'vault', label: 'Secure Digital Vault', icon: Lock },
          { id: 'storage', label: 'Storage & Replication', icon: HardDrive },
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
      {activeTab === 'records' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-blue-950 text-base">Master Data Management (MDM) Registries</h3>
                  <p className="text-xs text-slate-600">Unified multi-tenant sovereign record pools across all manufactured enterprise modules.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded text-xs font-mono font-bold border border-emerald-200">
                    ● Synchronized
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <Search className="w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  placeholder="Search records by ID, name, or metadata attribute..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recordTypesList.map((rec, i) => (
                  <div
                    key={i}
                    onClick={() => setRecordType(rec.name)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all space-y-2 ${
                      recordType === rec.name ? 'border-blue-950 bg-blue-50/50 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-blue-950 uppercase">{rec.status}</span>
                      <span className="text-xs font-bold text-slate-900">{rec.count} records</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{rec.name}</h4>
                    <span className="text-[11px] text-slate-500 font-mono">Sync Mode: {rec.updated}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-blue-950 text-base">Intelligent Document Processing (IDP)</h3>
              <p className="text-xs text-slate-600">Upload scanned certificates, invoices, or records for automated JUMO AI OCR extraction.</p>

              <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-3 bg-slate-50">
                <Upload className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800 block">Drag & drop files here</span>
                  <span className="text-[11px] text-slate-500 block">Supports PDF, TIFF, PNG, DOCX up to 100MB</span>
                </div>
                <button
                  onClick={handleRunAiOcr}
                  disabled={isProcessingAI}
                  className="px-4 py-2 bg-slate-50 hover:bg-blue-900 text-white text-xs font-bold rounded-lg shadow-sm transition-all inline-flex items-center space-x-1.5 disabled:opacity-50"
                >
                  {isProcessingAI ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Cpu className="w-3.5 h-3.5" />}
                  <span>{isProcessingAI ? 'Running JUMO AI OCR...' : 'Process Document with AI'}</span>
                </button>
              </div>

              {aiResult && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 animate-fadeIn">
                  <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>OCR Verification Success</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">{aiResult}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-950 text-base">Enterprise Document Management Vault</h3>
              <p className="text-xs text-slate-600">Central repository with version history, digital signatures, and strict retention policies.</p>
            </div>
            <button onClick={() => alert('Document upload dialog opened')} className="px-4 py-2 bg-slate-50 text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition-colors">
              Upload Document
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase font-mono text-[11px]">
                <tr>
                  <th className="p-4">Document Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Size</th>
                  <th className="p-4">Version</th>
                  <th className="p-4">Encryption</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documentsList.map((doc, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-950 shrink-0" />
                      <span>{doc.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-950 rounded font-semibold text-[11px]">
                        {doc.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-600">{doc.size}</td>
                    <td className="p-4 font-mono text-slate-500 font-bold">{doc.version}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-semibold text-[11px] border border-emerald-200">
                        AES-256 Secured
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => alert(`Downloading secure copy of ${doc.name}`)} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold text-xs">
                        Download
                      </button>
                      <button onClick={() => alert(`Viewing audit trail for ${doc.name}`)} className="px-2.5 py-1 bg-slate-50 text-white rounded font-bold text-xs">
                        Audit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'forms' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-blue-950 text-base">Configurable No-Code Forms Engine</h3>
          <p className="text-xs text-slate-600">Drag-and-drop designer for citizen registration, loan approvals, incident reports, and institutional surveys.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Citizen Registration Form', 'Commercial Credit Underwriting Form', 'University Admission Assessment Form'].map((form, i) => (
              <div key={i} className="p-5 border border-slate-200 rounded-xl space-y-3 bg-slate-50">
                <span className="text-[10px] font-mono font-bold text-blue-950 uppercase">Active Schema v2.4</span>
                <h4 className="font-bold text-slate-900 text-sm">{form}</h4>
                <p className="text-xs text-slate-500">Includes auto-validation, conditional routing, digital signature capture, and offline sync capabilities.</p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-700 font-bold">● Published</span>
                  <button onClick={() => alert(`Editing form schema: ${form}`)} className="text-xs font-semibold text-blue-950 hover:underline">
                    Edit Form Builder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'vault' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-950 text-base">Secure Digital Vault & Cryptographic Seals</h3>
              <p className="text-xs text-slate-600">High-value contracts, legal records, executive certificates, and intellectual property protected by AEGIS zero-trust seals.</p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-950 font-mono text-xs font-bold rounded-md border border-blue-200">
              AEGIS Zero-Trust Active
            </span>
          </div>

          <div className="p-6 bg-white text-slate-900 rounded-xl font-mono text-xs space-y-3 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-600">
              <span>DIGITAL VAULT ENCRYPTION & AUDIT LOG</span>
              <span className="text-emerald-400">● 100% SECURE</span>
            </div>
            <div>[SEC_VAULT_01] Master Root Key SHA-256 Hash verified across East African regional cloud nodes.</div>
            <div>[SEC_VAULT_02] 45,120 high-value executive contracts sealed with tamper-evident cryptographic signatures.</div>
            <div>[SEC_VAULT_03] Zero unauthorized decryption attempts detected in the last 72 hours.</div>
          </div>
        </div>
      )}

      {activeTab === 'storage' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-blue-950 text-base">Enterprise Storage & Multi-Region Replication Policies</h3>
          <p className="text-xs text-slate-600">Configure JUMO Cloud storage quotas, multi-region replication targets, and disaster recovery retention tiers.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-sm">Primary Storage Tier (JUMO Cloud SSD)</h4>
              <p className="text-xs text-slate-600">Allocated Storage: 5.4 TB / 50 TB (10.8% Utilized). High-performance NVMe storage with automated hourly snapshots.</p>
            </div>
            <div className="p-5 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-sm">Geo-Replication Target (East Africa Hub)</h4>
              <p className="text-xs text-slate-600">Active replication nodes in Kampala and Mbale City. Disaster recovery failover target synchronization verified every 60 seconds.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
