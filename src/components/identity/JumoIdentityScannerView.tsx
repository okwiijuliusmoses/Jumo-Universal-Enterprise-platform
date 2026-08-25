/**
 * JUMO UEOS — Sovereign Member Identity Verification & QR Scanner Console
 * Dedicated Full Workspace for Security Desks, Registrar Verification,
 * Diocesan Synod Check-In, Alumni Reunion Gates, and FAAP Signatory Verification.
 */

import React, { useState, useEffect } from 'react';
import { 
  QrCode, Camera, ShieldCheck, CheckCircle2, AlertTriangle, 
  Search, Users, Building2, Download, Printer, RefreshCw, 
  History, ArrowRight, Sparkles, Sliders, Check, Clock, Plus, ExternalLink
} from 'lucide-react';
import { 
  jumoIdentityVerificationService, 
  JumoMemberIdentity, 
  ScanAuditLogEntry 
} from '../../core/identity/jumoIdentityVerificationService';
import { JumoMemberQrScannerModal } from './JumoMemberQrScannerModal';
import { PrintIdentityCardModal, CardholderData } from '../common/PrintIdentityCardModal';

export interface JumoIdentityScannerViewProps {
  onNavigate?: (route: string) => void;
  currentUser?: {
    name?: string;
    role?: string;
    email?: string;
  };
}

export const JumoIdentityScannerView: React.FC<JumoIdentityScannerViewProps> = ({
  onNavigate,
  currentUser
}) => {
  const [isScannerModalOpen, setIsScannerModalOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<JumoMemberIdentity | null>(null);
  const [selectedPrintCard, setSelectedPrintCard] = useState<CardholderData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterProduct, setFilterProduct] = useState<string>('ALL');
  const [auditLogs, setAuditLogs] = useState<ScanAuditLogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'members' | 'logs' | 'generator'>('members');
  const [generatedQrUrl, setGeneratedQrUrl] = useState<string | null>(null);

  const members = jumoIdentityVerificationService.getAllMembers();

  const refreshLogs = () => {
    setAuditLogs(jumoIdentityVerificationService.getAuditLogs());
  };

  useEffect(() => {
    refreshLogs();
  }, []);

  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.jumoId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tenantName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProduct = filterProduct === 'ALL' || m.productOrigin === filterProduct;
    return matchesSearch && matchesProduct;
  });

  const handleSelectMemberForPrint = (member: JumoMemberIdentity) => {
    setSelectedPrintCard({
      fullName: member.fullName,
      idCode: member.jumoId,
      role: member.role,
      employer: member.tenantName,
      jobTitle: member.role,
      locationCity: member.departmentOrChapter,
      credentialTitle: `JUMO Sovereign ID: ${member.productBadge}`,
      issueDate: member.issueDate,
      expiryDate: member.expiryDate,
      securityTier: member.clearanceLevel,
      accentColor: 
        member.productOrigin === 'education-erp' ? 'blue' :
        member.productOrigin === 'church-erp' ? 'amber' :
        member.productOrigin === 'alumni-erp' ? 'rose' :
        member.productOrigin === 'faap' ? 'emerald' :
        member.productOrigin === 'digital-pay' ? 'indigo' : 'slate',
      photoUrl: member.photoUrl,
      departmentOrChapter: member.departmentOrChapter,
      verificationHash: member.sha256Seal
    });
  };

  const handleGenerateQr = async (member: JumoMemberIdentity) => {
    setSelectedMember(member);
    const url = await jumoIdentityVerificationService.generateMemberQrCodeDataUrl(member);
    setGeneratedQrUrl(url);
    setActiveTab('generator');
  };

  const verifiedScansCount = auditLogs.filter(l => l.status === 'VERIFIED').length;
  const flaggedScansCount = auditLogs.filter(l => l.status !== 'VERIFIED').length;

  return (
    <div className="space-y-6 font-sans text-slate-900 select-none p-4 md:p-6 bg-slate-50 min-h-full">
      
      {/* Top Banner Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 bg-blue-50 text-[#0078D4] rounded border border-blue-200">
              Sovereign Identity & Verification
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> ZERO-TRUST VERIFIER
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            JUMO MEMBER QR SCANNER & IDENTITY HUB
          </h1>
          <p className="text-xs md:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Real-time biometric and cryptographic identity verification console across all 6 JUMO products. Scan member ID cards with live camera, upload QR codes, or verify official signatures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsScannerModalOpen(true)}
            className="px-5 py-3 bg-[#0078D4] hover:bg-[#005a9e] text-white font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Camera className="w-4 h-4" />
            <span>Launch Live QR Scanner</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Authoritative Members</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{members.length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Across 6 JUMO Products</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-emerald-700 uppercase">Successful Verifications</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{verifiedScansCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Cryptographically Passed</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-rose-700 uppercase">Flagged / Unregistered</div>
          <div className="text-2xl font-black text-rose-600 mt-1">{flaggedScansCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Security Audit Alerts</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-blue-700 uppercase">Crypto Security Hash</div>
          <div className="text-sm font-mono font-bold text-slate-800 mt-2 truncate">SHA-256 ECC</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Tamper-Proof Integrity</div>
        </div>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'members' 
                ? 'bg-[#0078D4] text-white shadow-xs' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Member Directory ({members.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('logs'); refreshLogs(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'logs' 
                ? 'bg-[#0078D4] text-white shadow-xs' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Scan Audit Logs ({auditLogs.length})</span>
          </button>
        </div>

        {activeTab === 'members' && (
          <div className="flex items-center gap-2">
            <select
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Products (6)</option>
              <option value="education-erp">Education ERP</option>
              <option value="church-erp">Church & Diocese ERP</option>
              <option value="alumni-erp">Alumni ERP</option>
              <option value="faap">FAAP Financial Backbone</option>
              <option value="digital-pay">Digital Pay Switch</option>
              <option value="control-center">Control Center Host</option>
            </select>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search member, ID, or tenant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: MEMBER DIRECTORY & VERIFICATION ROSTER */}
      {activeTab === 'members' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.jumoId}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face'}
                      alt={member.fullName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 group-hover:border-blue-500 transition-colors shadow-2xs"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                        {member.fullName}
                      </h3>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{member.role}</div>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                    {member.productBadge}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400">JUMO ID:</span>
                    <span className="font-mono font-bold text-slate-800">{member.jumoId}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400">Institution:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[170px]">{member.tenantName}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400">Clearance:</span>
                    <span className="font-mono font-bold text-amber-700">{member.clearanceLevel}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-mono font-bold text-emerald-700">{member.status}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleGenerateQr(member)}
                  className="flex-1 py-1.5 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  title="View / Download QR Pass"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>View QR Code</span>
                </button>

                <button
                  onClick={() => handleSelectMemberForPrint(member)}
                  className="py-1.5 px-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Print Member Card"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print ID</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Security Gate & Terminal Verification Logs</h3>
            <button
              onClick={() => {
                jumoIdentityVerificationService.clearAuditLogs();
                refreshLogs();
              }}
              className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
            >
              Clear Audit Log
            </button>
          </div>

          {auditLogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No verification logs recorded in this session. Use the QR scanner to verify member identity cards.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Member Name</th>
                    <th className="p-3.5">JUMO ID</th>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Verification Status</th>
                    <th className="p-3.5">Terminal / Location</th>
                    <th className="p-3.5">Operator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        {log.memberName || 'Unregistered Credential'}
                      </td>
                      <td className="p-3.5 font-mono text-slate-600">
                        {log.jumoId || '-'}
                      </td>
                      <td className="p-3.5 font-mono text-indigo-700 uppercase font-bold text-[11px]">
                        {log.productOrigin || '-'}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          log.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600">{log.scanLocation}</td>
                      <td className="p-3.5 text-slate-600">{log.operatorName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: QR CODE GENERATOR & ATTESTATION PREVIEW */}
      {activeTab === 'generator' && selectedMember && generatedQrUrl && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Sovereign QR Verification Pass</h3>
            <button
              onClick={() => setActiveTab('members')}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              ← Back to Directory
            </button>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="p-4 bg-white rounded-2xl shadow-md border border-slate-200">
              <img
                src={generatedQrUrl}
                alt="Member QR Code"
                className="w-56 h-56"
              />
            </div>

            <div>
              <h4 className="text-lg font-black text-slate-900">{selectedMember.fullName}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{selectedMember.role}</p>
              <p className="text-xs font-mono font-bold text-blue-600 mt-1">{selectedMember.jumoId}</p>
            </div>

            <div className="text-xs text-slate-500 font-mono bg-white p-3 rounded-xl border border-slate-200 max-w-md w-full text-left space-y-1">
              <div><strong className="text-slate-700">Verification URL:</strong> {selectedMember.verificationUrl}</div>
              <div><strong className="text-slate-700">SHA-256 Seal:</strong> {selectedMember.sha256Seal.substring(0, 32)}...</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={generatedQrUrl}
                download={`${selectedMember.jumoId}-qr-code.png`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download QR Image</span>
              </a>

              <button
                onClick={() => handleSelectMemberForPrint(selectedMember)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Physical ID Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR SCANNER MODAL */}
      <JumoMemberQrScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        onVerified={() => refreshLogs()}
      />

      {/* PRINT IDENTITY CARD MODAL */}
      {selectedPrintCard && (
        <PrintIdentityCardModal
          isOpen={true}
          onClose={() => setSelectedPrintCard(null)}
          cardData={selectedPrintCard}
        />
      )}

    </div>
  );
};

export default JumoIdentityScannerView;
