import React, { useState } from 'react';
import { 
  X, Heart, Shield, CheckCircle2, Award, Printer, 
  Search, Church, Calendar, Download, Sparkles, QrCode
} from 'lucide-react';
import ChurchPeopleService, { 
  ChurchMemberRecord 
} from '../../../domain/ChurchPeopleService';

interface SacramentsModalProps {
  member?: ChurchMemberRecord | null;
  initialSacrament?: 'BAPTISM' | 'CONFIRMATION' | 'MATRIMONY';
  onClose: () => void;
}

export const ChurchSacramentsRegistryModal: React.FC<SacramentsModalProps> = ({
  member: initialMember,
  initialSacrament = 'BAPTISM',
  onClose
}) => {
  const service = ChurchPeopleService.getInstance();
  const [selectedSacrament, setSelectedSacrament] = useState<'BAPTISM' | 'CONFIRMATION' | 'MATRIMONY'>(initialSacrament);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<ChurchMemberRecord | null>(initialMember || null);

  const searchResults = searchQuery.trim() 
    ? service.getMembers().filter(m => 
        `${m.firstName} ${m.lastName} ${m.id} ${m.phone}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const currentMember = selectedMember || service.getMembers()[0];

  const getSacramentDetails = () => {
    if (!currentMember) return null;
    if (selectedSacrament === 'BAPTISM') {
      return {
        title: 'Certificate of Holy Baptism',
        subtitle: 'In the Name of the Father, and of the Son, and of the Holy Spirit',
        date: currentMember.sacraments.baptismDate || '1990-01-01',
        parish: currentMember.sacraments.baptismParish || currentMember.parishOfResidence,
        minister: currentMember.sacraments.baptismMinister || 'The Rev. Parish Vicar',
        certNo: currentMember.sacraments.baptismCertificateNo || `BAP-${currentMember.id}`,
        extra: `Godparents / Sponsors: ${currentMember.sacraments.godparents || 'Parish Community'}`
      };
    }
    if (selectedSacrament === 'CONFIRMATION') {
      return {
        title: 'Certificate of Holy Confirmation',
        subtitle: 'Strengthened by the Holy Spirit through the Laying on of Hands',
        date: currentMember.sacraments.confirmationDate || '2005-01-01',
        parish: currentMember.sacraments.confirmationDiocese || currentMember.diocese,
        minister: currentMember.sacraments.confirmationBishop || 'The Rt. Rev. Diocesan Bishop',
        certNo: currentMember.sacraments.confirmationCertificateNo || `CONF-${currentMember.id}`,
        extra: `Confirmed communicant in full fellowship with the Holy Catholic Church.`
      };
    }
    return {
      title: 'Certificate of Holy Matrimony',
      subtitle: 'What therefore God hath joined together, let not man put asunder (Mark 10:9)',
      date: currentMember.sacraments.marriageDate || '2015-01-01',
      parish: currentMember.sacraments.marriageChurch || currentMember.parishOfResidence,
      minister: currentMember.sacraments.marriageOfficiatingMinister || 'The Officiating Clergy',
      certNo: currentMember.sacraments.marriageCertificateNo || `MAT-${currentMember.id}`,
      extra: `Solemnized between ${currentMember.title} ${currentMember.firstName} ${currentMember.lastName} and ${currentMember.sacraments.spouseName || 'Spouse'}.`
    };
  };

  const certData = getSacramentDetails();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Sacramental Register & Verifiable Certificate Generator
              </h2>
              <p className="text-xs text-purple-200/80">
                Official canonical certificates with Diocesan seal and sovereign verification hash
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sacrament Selection & Member Lookup Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedSacrament('BAPTISM')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                selectedSacrament === 'BAPTISM' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5" /> Holy Baptism
            </button>
            <button
              onClick={() => setSelectedSacrament('CONFIRMATION')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                selectedSacrament === 'CONFIRMATION' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Holy Confirmation
            </button>
            <button
              onClick={() => setSelectedSacrament('MATRIMONY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                selectedSacrament === 'MATRIMONY' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Church className="w-3.5 h-3.5" /> Holy Matrimony
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search member by name/ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-slate-200 z-20 max-h-48 overflow-y-auto">
                {searchResults.map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedMember(m);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-purple-50 border-b border-slate-100 flex items-center justify-between"
                  >
                    <span className="font-bold text-slate-900">{m.firstName} {m.lastName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{m.id}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Certificate Preview Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center bg-slate-100">
          
          {/* Authentic Ecclesiastical Certificate Card */}
          <div className="w-full max-w-2xl bg-[#FCFAF5] border-8 border-double border-amber-900/30 rounded-xl p-8 shadow-2xl relative overflow-hidden text-center text-slate-900 font-serif">
            
            {/* Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Church className="w-96 h-96 text-purple-950" />
            </div>

            {/* Top Diocese Header */}
            <div className="space-y-1 border-b border-amber-900/20 pb-4">
              <p className="text-[11px] font-sans font-bold tracking-widest uppercase text-amber-900/80">
                {currentMember.diocese}
              </p>
              <h3 className="text-xl font-bold tracking-wide text-amber-950 uppercase">
                {certData?.title}
              </h3>
              <p className="text-xs italic text-amber-900/70">
                {certData?.subtitle}
              </p>
            </div>

            {/* Certificate Body Text */}
            <div className="py-6 space-y-4">
              <p className="text-xs italic text-slate-600">This is to certify that</p>
              
              <div className="text-2xl font-bold tracking-wider text-purple-950 border-b-2 border-dashed border-amber-900/30 inline-block px-8 py-1">
                {currentMember.title} {currentMember.firstName} {currentMember.middleName ? currentMember.middleName + ' ' : ''}{currentMember.lastName}
              </div>

              <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed pt-2">
                was canonically administered the sacrament of <strong>{certData?.title.replace('Certificate of ', '')}</strong> in accordance with the rites and doctrine of the Church of God.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-left bg-amber-50/50 p-4 rounded-lg border border-amber-900/15 max-w-lg mx-auto mt-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-900 block">Date Administered:</span>
                  <strong className="text-slate-900">{certData?.date}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-900 block">Parish / Jurisdiction:</span>
                  <strong className="text-slate-900">{certData?.parish}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-900 block">Officiating Minister:</span>
                  <strong className="text-slate-900">{certData?.minister}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-900 block">Certificate Ref:</span>
                  <strong className="font-mono text-purple-900">{certData?.certNo}</strong>
                </div>
              </div>

              {certData?.extra && (
                <p className="text-[11px] text-slate-600 italic pt-2">
                  {certData.extra}
                </p>
              )}
            </div>

            {/* Signatures & Seal */}
            <div className="border-t border-amber-900/20 pt-6 grid grid-cols-3 items-end text-center font-sans text-xs">
              <div className="space-y-1">
                <div className="w-32 border-b border-slate-400 mx-auto"></div>
                <p className="font-bold text-slate-800 text-[11px]">Parish Vicar</p>
                <p className="text-[9px] text-slate-500">Signature</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 border-amber-800/60 bg-amber-100/50 flex flex-col items-center justify-center text-amber-900 text-[8px] font-black uppercase tracking-tighter p-1 shadow-inner">
                  <Shield className="w-4 h-4 mb-0.5" /> DIOCESAN SEAL
                </div>
                <span className="text-[8px] font-mono text-slate-400 mt-1">HASH: {currentMember.digitalCardHash.substring(0, 16)}</span>
              </div>
              <div className="space-y-1">
                <div className="w-32 border-b border-slate-400 mx-auto"></div>
                <p className="font-bold text-slate-800 text-[11px]">Diocesan Registrar</p>
                <p className="text-[9px] text-slate-500">Signature & Seal</p>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 px-6 py-3.5 bg-white flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Selected Parishioner: <strong className="text-slate-900">{currentMember.firstName} {currentMember.lastName}</strong> ({currentMember.id})
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-5 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition shadow-sm flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print Canonical Certificate
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-300 transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
