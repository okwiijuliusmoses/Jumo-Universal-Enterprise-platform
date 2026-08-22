import React, { useState } from 'react';
import { 
  Printer, X, ShieldCheck, CheckCircle2, QrCode, 
  Download, Eye, RotateCw, Sparkles, Building2, MapPin, 
  Briefcase, User, Calendar, Lock, Award
} from 'lucide-react';

export interface CardholderData {
  fullName: string;
  idCode: string;
  role: string;
  employer: string;
  jobTitle: string;
  locationCity: string;
  credentialTitle: string;
  issueDate?: string;
  expiryDate?: string;
  securityTier?: string;
  accentColor?: 'blue' | 'indigo' | 'rose' | 'emerald' | 'amber' | 'purple' | 'slate';
  photoUrl?: string;
  departmentOrChapter?: string;
  verificationHash?: string;
}

export interface PrintIdentityCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: CardholderData;
}

export const PrintIdentityCardModal: React.FC<PrintIdentityCardModalProps> = ({
  isOpen,
  onClose,
  cardData
}) => {
  const [viewSide, setViewSide] = useState<'both' | 'front' | 'back'>('both');
  const [printLayout, setPrintLayout] = useState<'cr80' | 'a4-sheet'>('cr80');

  if (!isOpen) return null;

  const accentStyles = {
    blue: {
      headerBg: 'bg-blue-700',
      border: 'border-blue-600',
      text: 'text-blue-700',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
      stripBg: 'bg-blue-900',
      accentGlow: 'from-blue-600 to-indigo-700'
    },
    indigo: {
      headerBg: 'bg-indigo-700',
      border: 'border-indigo-600',
      text: 'text-indigo-700',
      badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      stripBg: 'bg-indigo-900',
      accentGlow: 'from-indigo-600 to-violet-700'
    },
    rose: {
      headerBg: 'bg-rose-700',
      border: 'border-rose-600',
      text: 'text-rose-700',
      badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
      stripBg: 'bg-rose-900',
      accentGlow: 'from-rose-600 to-pink-700'
    },
    emerald: {
      headerBg: 'bg-emerald-700',
      border: 'border-emerald-600',
      text: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      stripBg: 'bg-emerald-900',
      accentGlow: 'from-emerald-600 to-teal-700'
    },
    amber: {
      headerBg: 'bg-amber-700',
      border: 'border-amber-600',
      text: 'text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      stripBg: 'bg-amber-900',
      accentGlow: 'from-amber-600 to-orange-700'
    },
    purple: {
      headerBg: 'bg-purple-700',
      border: 'border-purple-600',
      text: 'text-purple-700',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      stripBg: 'bg-purple-900',
      accentGlow: 'from-purple-600 to-indigo-800'
    },
    slate: {
      headerBg: 'bg-slate-800',
      border: 'border-slate-700',
      text: 'text-slate-800',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
      stripBg: 'bg-slate-900',
      accentGlow: 'from-slate-700 to-slate-900'
    }
  };

  const style = accentStyles[cardData.accentColor || 'blue'];
  const issueDate = cardData.issueDate || '2026-01-15';
  const expiryDate = cardData.expiryDate || '2029-12-31';
  const hash = cardData.verificationHash || `0x${cardData.idCode.replace(/[^a-zA-Z0-9]/g, '')}F9A7C2`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Print Stylesheet Injection */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-credential-card, #printable-credential-card * {
            visibility: visible;
          }
          #printable-credential-card {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 20mm;
            background: white !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 99999;
          }
          .no-print {
            display: none !important;
          }
          .print-card-box {
            box-shadow: none !important;
            border: 1px solid #94a3b8 !important;
            page-break-inside: avoid;
            break-inside: avoid;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Modal Dialog */}
      <div 
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (No Print) */}
        <div className="no-print px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl ${style.headerBg} flex items-center justify-center text-white shadow-xs`}>
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Print Physical Identity Card</span>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  ISO/IEC 7810 ID-1 SPEC
                </span>
              </h2>
              <p className="text-xs text-slate-500">Official printable digital identity credential for physical presentation and verification</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Controls Toolbar (No Print) */}
        <div className="no-print px-6 py-2.5 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Card View:</span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
              <button
                onClick={() => setViewSide('both')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  viewSide === 'both' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Front & Back
              </button>
              <button
                onClick={() => setViewSide('front')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  viewSide === 'front' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Front Only
              </button>
              <button
                onClick={() => setViewSide('back')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  viewSide === 'back' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Back Only
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Digital Signature: <span className="font-bold text-slate-700">{hash.substring(0, 10)}...</span></span>
            </div>
          </div>
        </div>

        {/* Preview & Printable Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 flex items-center justify-center">
          <div id="printable-credential-card" className="w-full max-w-3xl flex flex-col items-center gap-6">
            
            {/* Front & Back Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl justify-center">
              
              {/* CARD FRONT */}
              {(viewSide === 'both' || viewSide === 'front') && (
                <div className="print-card-box w-full aspect-[85.6/53.98] bg-white rounded-2xl border-2 border-slate-300 shadow-xl overflow-hidden flex flex-col relative select-none">
                  {/* Decorative Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
                  
                  {/* Header Banner */}
                  <div className={`${style.headerBg} text-white px-4 py-2.5 flex items-center justify-between relative`}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-xs">
                        J
                      </div>
                      <div>
                        <div className="text-[11px] font-black tracking-wider uppercase leading-tight">
                          JUMO UNIVERSAL ENTERPRISE
                        </div>
                        <div className="text-[8px] font-mono text-white/80 uppercase">
                          {cardData.credentialTitle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold">
                      <ShieldCheck className="w-3 h-3 text-emerald-300" />
                      <span>AUTHENTIC</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 p-3.5 flex gap-3 relative z-10">
                    {/* Left: Avatar & ID */}
                    <div className="w-24 flex flex-col items-center justify-between shrink-0">
                      <div className="w-20 h-24 rounded-xl bg-slate-100 border-2 border-slate-200 flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
                        {cardData.photoUrl ? (
                          <img src={cardData.photoUrl} alt={cardData.fullName} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <User className="w-10 h-10 text-slate-400" />
                            <div className="absolute bottom-1 right-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="text-center w-full mt-1">
                        <div className="text-[8px] font-mono text-slate-400 uppercase">CREDENTIAL ID</div>
                        <div className="text-[9px] font-mono font-black text-slate-800 truncate">{cardData.idCode}</div>
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">CARDHOLDER NAME</div>
                        <h3 className="text-sm font-black text-slate-900 truncate leading-tight mt-0.5">
                          {cardData.fullName}
                        </h3>
                        <div className="text-[10px] font-bold text-blue-700 truncate mt-0.5">
                          {cardData.role}
                        </div>
                      </div>

                      <div className="space-y-1 text-[9px] text-slate-600 border-t border-slate-100 pt-1.5">
                        <div className="flex items-center gap-1.5 truncate">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-slate-400">Org:</span>
                          <span className="font-semibold text-slate-800 truncate">{cardData.employer || 'Universal Enterprise'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-slate-400">Title:</span>
                          <span className="font-semibold text-slate-800 truncate">{cardData.jobTitle || 'Credentialed Member'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-slate-400">City:</span>
                          <span className="font-semibold text-slate-800 truncate">{cardData.locationCity || 'Sovereign Node'}</span>
                        </div>
                      </div>

                      {/* Micro Footer on Card */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[8px] font-mono text-slate-400">
                        <span>ISS: {issueDate}</span>
                        <span>EXP: {expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Micro Security Foil Line */}
                  <div className="h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-blue-600" />
                </div>
              )}

              {/* CARD BACK */}
              {(viewSide === 'both' || viewSide === 'back') && (
                <div className="print-card-box w-full aspect-[85.6/53.98] bg-slate-900 text-white rounded-2xl border-2 border-slate-800 shadow-xl overflow-hidden flex flex-col relative select-none">
                  {/* Magnetic Stripe Simulation */}
                  <div className="h-8 bg-black mt-3 shrink-0 border-y border-slate-950" />

                  {/* Terms & Legal Microprint */}
                  <div className="flex-1 p-3.5 flex flex-col justify-between">
                    <div className="text-[7.5px] text-slate-400 leading-tight space-y-1">
                      <p>This credential remains the property of JUMO UEOS and the authorized sovereign institutional authority. If found, please return to the issuing registrar or institutional headquarters.</p>
                      <p>Tampering, alteration, or unauthorized reproduction is strictly prohibited and subject to zero-trust continuous validation revoking protocol.</p>
                    </div>

                    {/* QR Code & Signature Strip */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
                      {/* Signature Strip */}
                      <div className="flex-1 bg-white/95 text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-300">
                        <div className="text-[7px] font-mono text-slate-400 uppercase">AUTHORIZED SIGNATURE</div>
                        <div className="font-serif italic text-xs font-bold text-slate-800 tracking-wider">
                          {cardData.fullName}
                        </div>
                      </div>

                      {/* QR Code Simulation */}
                      <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center shrink-0 shadow-xs">
                        <QrCode className="w-10 h-10 text-slate-950" />
                      </div>
                    </div>

                    {/* Cryptographic Footnote */}
                    <div className="flex items-center justify-between text-[7px] font-mono text-slate-400 pt-1">
                      <span className="truncate">SIG: {hash}</span>
                      <span>SEC TIER: RING-0</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Print Instruction Note (No Print) */}
            <div className="no-print text-center text-xs text-slate-500 max-w-md">
              <p>For best physical print results, choose <span className="font-bold text-slate-800">"Save as PDF"</span> or select <span className="font-bold text-slate-800">100% Scale</span> (disable "Fit to Page") in your browser print settings.</p>
            </div>

          </div>
        </div>

        {/* Modal Footer Actions (No Print) */}
        <div className="no-print px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            Close
          </button>
          
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print ID Card Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
