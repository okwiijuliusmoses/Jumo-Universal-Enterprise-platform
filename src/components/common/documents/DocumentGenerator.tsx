import React from 'react';

export type DocumentType = 
  | 'ADMISSION_OFFER_LETTER'
  | 'STUDENT_REPORT_CARD'
  | 'UNEB_FORM_E15'
  | 'TUITION_FEE_RECEIPT'
  | 'BAPTISM_CERTIFICATE'
  | 'CONFIRMATION_CERTIFICATE'
  | 'MATRIMONY_CERTIFICATE'
  | 'TITHE_RECONCILIATION_RECEIPT'
  | 'DONATION_OFFICIAL_RECEIPT'
  | 'PAYMENT_VOUCHER'
  | 'TAX_PRN_CERTIFICATE'
  | 'SWITCH_SETTLEMENT_INVOICE';

export interface DocumentData {
  documentType: DocumentType;
  referenceNumber: string;
  issueDate: string;
  issuerName: string;
  issuerTitle: string;
  recipientName: string;
  recipientId?: string;
  institutionName: string;
  institutionLogoText?: string;
  title: string;
  summary: string;
  details: Record<string, any>;
  amount?: number;
  currency?: string;
  signatureHash?: string;
  qrVerificationCode?: string;
}

interface DocumentGeneratorProps {
  data: DocumentData;
  onPrint?: () => void;
  onClose?: () => void;
}

export const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ data, onPrint, onClose }) => {
  const handlePrintClick = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-slate-900/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8">
        {/* Modal Toolbar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              DOC
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight text-white">{data.title}</h3>
              <p className="text-xs text-slate-400">Ref: {data.referenceNumber} | {data.issueDate}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrintClick}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition shadow-sm flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print / Download PDF</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-lg transition"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="p-8 sm:p-12 text-slate-900 font-serif printable-area bg-white text-sm leading-relaxed">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-6 mb-8">
            <div className="text-2xl font-bold uppercase tracking-widest text-slate-900">
              {data.institutionName}
            </div>
            <div className="text-xs font-sans tracking-wide text-slate-600 mt-1 uppercase font-semibold">
              Official Institutional Certificate & Legal Record
            </div>
            <div className="mt-4 inline-block px-4 py-1 bg-slate-100 border border-slate-300 rounded-md font-mono text-xs font-bold tracking-wider">
              {data.title.toUpperCase()}
            </div>
          </div>

          {/* Reference & Recipient Zone */}
          <div className="grid grid-cols-2 gap-6 mb-8 font-sans text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <p className="text-slate-500 uppercase font-bold tracking-wider">Document Reference</p>
              <p className="font-mono font-bold text-sm text-slate-900 mt-0.5">{data.referenceNumber}</p>
              <p className="text-slate-500 uppercase font-bold tracking-wider mt-2">Date of Issuance</p>
              <p className="font-semibold text-slate-800">{data.issueDate}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-bold tracking-wider">Primary Subject / Recipient</p>
              <p className="font-bold text-sm text-slate-900 mt-0.5">{data.recipientName}</p>
              {data.recipientId && (
                <p className="text-slate-600 font-mono text-xs">ID / Reg: {data.recipientId}</p>
              )}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-8 italic text-slate-700 bg-emerald-50/50 p-4 rounded-lg border-l-4 border-emerald-600 font-sans text-xs">
            "{data.summary}"
          </div>

          {/* Key Value Details Table */}
          <div className="mb-8 font-sans">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200 pb-2 mb-3">
              Certified Record Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {Object.entries(data.details).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-slate-100 pb-1 text-xs">
                  <span className="text-slate-500 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="font-semibold text-slate-900">{String(value)}</span>
                </div>
              ))}
              {data.amount !== undefined && (
                <div className="flex justify-between border-b-2 border-slate-900 pb-1 text-sm font-bold col-span-full pt-2">
                  <span className="text-slate-900 uppercase">Total Amount Certified:</span>
                  <span className="font-mono text-emerald-700">
                    {data.amount.toLocaleString()} {data.currency || 'UGX'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Signature & Audit Verification */}
          <div className="mt-12 pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 font-sans">
            <div>
              <div className="h-12 flex items-end">
                <div className="font-serif italic text-lg text-slate-800 border-b border-slate-400 w-48 font-semibold">
                  {data.issuerName}
                </div>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1">{data.issuerName}</p>
              <p className="text-xs text-slate-500">{data.issuerTitle}</p>
            </div>

            <div className="text-right flex flex-col justify-end items-end">
              <div className="bg-slate-100 border border-slate-300 p-2 rounded text-center w-36">
                <div className="font-mono text-[9px] text-slate-500 uppercase tracking-tighter">
                  Cryptographic Seal
                </div>
                <div className="font-mono text-[10px] font-bold text-slate-800 truncate mt-0.5">
                  {data.signatureHash || `SIG-${Math.floor(100000 + Math.random() * 900000)}`}
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">
                Verified by JUMO UEOS Ledger Engine
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
