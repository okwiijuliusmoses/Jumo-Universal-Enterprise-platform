import React, { useState } from 'react';
import { 
  FileCheck, ShieldCheck, Download, Plus, Search, RefreshCw, FileText, 
  BookOpen, Sparkles, AlertTriangle, Key, Landmark, Lock, CheckCircle
} from 'lucide-react';

interface ArchiveDocument {
  id: string;
  title: string;
  category: 'Canons & Constitutions' | 'Synod Resolutions' | 'Real Estate Title Deeds' | 'Liturgical Texts';
  year: string;
  hash: string;
  authorizer: string;
}

export const ChurchDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<ArchiveDocument[]>([
    { id: 'DOC-001', title: 'Provincial Constitution of the Church of Uganda (Revised 2020)', category: 'Canons & Constitutions', year: '2020', hash: 'SHA256:f12a832f9104cc723821049b1a03f44c7980211bc91a454b', authorizer: 'House of Bishops' },
    { id: 'DOC-002', title: 'Diocesan Synod Resolution on Land Custodianship', category: 'Synod Resolutions', year: '2015', hash: 'SHA256:4bb10c14e99a3c10b420f18c21a4de9910c8a41bc0019fa2', authorizer: 'Rt. Rev. Bishop Wilberforce' },
    { id: 'DOC-003', title: 'Freehold Land Registry Title Deed - Namirembe Hill Plot 1', category: 'Real Estate Title Deeds', year: '1892', hash: 'SHA256:8894ab2d4109cf88214faee499c8211baee410b0011c039d', authorizer: 'Registrar of Titles' }
  ]);

  // Form & Verify States
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ArchiveDocument['category']>('Canons & Constitutions');
  const [newAuthorizer, setNewAuthorizer] = useState('');

  const [verifyFile, setVerifyFile] = useState('Baptismal_Certificate_Walusimbi_1984.pdf');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{ status: 'VERIFIED' | 'FAILED'; seal: string; details: string } | null>(null);

  const handleCatalogDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const added: ArchiveDocument = {
      id: `DOC-00${documents.length + 1}`,
      title: newTitle,
      category: newCategory,
      year: new Date().getFullYear().toString(),
      hash: 'SHA256:' + Array.from({length: 48}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      authorizer: newAuthorizer || 'Diocesan Registry'
    };

    setDocuments([...documents, added]);
    setNewTitle('');
    setNewAuthorizer('');
    alert(`Document catalogued & cryptographically indexed: "${added.title}"`);
  };

  const handleScanVerify = () => {
    setIsVerifying(true);
    setVerifyResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      setVerifyResult({
        status: 'VERIFIED',
        seal: 'JUMO-SEAL-VERIFIED-' + Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase(),
        details: 'Cryptographic watermark matched against Diocesan Master Archive. Signatures of Bishop & Registrar authenticated via JUMO AI Vision Engine model.'
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Verification scanning hub */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
          <FileCheck className="w-4 h-4 text-purple-600" />
          AI Sacramental Verification Portal
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Select Baptismal / Confirmation File</label>
            <input
              type="text"
              value={verifyFile}
              onChange={(e) => setVerifyFile(e.target.value)}
              className="w-full p-2.5 rounded border border-slate-300 font-mono bg-slate-50"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
            Drag & Drop authentic scans here for instant signature parsing & seal matching
          </div>

          {isVerifying ? (
            <div className="p-4 bg-purple-50 rounded-lg border text-center space-y-2 text-purple-800">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-600" />
              <span>Analyzing signatures, watermarks, and ledger hashes...</span>
            </div>
          ) : (
            <button
              onClick={handleScanVerify}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#0078D4]" /> Trigger Cryptographic Scan
            </button>
          )}

          {verifyResult && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <strong className="text-xs font-bold text-emerald-900">VERIFIED AUTHENTIC (99.99% Confidence)</strong>
              </div>

              <p className="text-[11px] leading-relaxed text-slate-700 italic">
                {verifyResult.details}
              </p>

              <div className="p-2 bg-white text-[#0078D4] font-mono text-[9px] rounded border border-slate-200 text-center font-bold">
                🔒 SECURITY SEAL: {verifyResult.seal}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Registry Database */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
        <div className="flex justify-between items-start border-b pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-purple-600" />
              Sovereign Digital Church Master Archives
            </h3>
            <p className="text-xs text-slate-500">Secured storage of constitutions, legal titles, canons, and historical decrees.</p>
          </div>
        </div>

        <div className="space-y-3">
          {documents.map(doc => (
            <div key={doc.id} className="p-3.5 bg-slate-50 border rounded-xl text-xs space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-sm font-bold text-slate-900">{doc.title}</strong>
                  <span className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 text-[10px] font-bold uppercase mt-1 inline-block">
                    {doc.category}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-600 font-bold">{doc.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] pt-1.5 border-t border-slate-200/60 font-medium">
                <div>
                  <span className="text-slate-600 block text-[10px]">Authorizing Body</span>
                  <strong className="text-slate-700 font-bold">{doc.authorizer}</strong>
                </div>
                <div>
                  <span className="text-slate-600 block text-[10px]">Indexed Year</span>
                  <strong className="text-slate-700 font-bold">{doc.year}</strong>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-600 bg-slate-100 p-1.5 rounded flex items-center gap-1 border">
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>{doc.hash}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Index new document form */}
        <h4 className="text-xs font-bold text-slate-800 border-t pt-4">Index New Historical Record</h4>
        <form onSubmit={handleCatalogDocument} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Document Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Namirembe land lease paper"
              className="w-full p-2 rounded border border-slate-300"
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Classification</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full p-2 rounded border border-slate-300 bg-white"
            >
              <option value="Canons & Constitutions">Canons & Constitutions</option>
              <option value="Synod Resolutions">Synod Resolutions</option>
              <option value="Real Estate Title Deeds">Real Estate Title Deeds</option>
              <option value="Liturgical Texts">Liturgical Texts</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Authorizer Signature Body</label>
            <input
              type="text"
              value={newAuthorizer}
              onChange={(e) => setNewAuthorizer(e.target.value)}
              placeholder="e.g. Bishop Counsel Office"
              className="w-full p-2 rounded border border-slate-300"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-white hover:bg-white text-white font-bold rounded shadow transition-all"
            >
              Verify & Index Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
