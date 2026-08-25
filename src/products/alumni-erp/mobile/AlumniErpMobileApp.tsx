import React, { useState } from 'react';
import { 
  QrCode, 
  Globe, 
  ChevronLeft, 
  Sparkles, 
  DollarSign, 
  UserCheck, 
  Edit3, 
  Briefcase, 
  MapPin, 
  Building,
  GraduationCap,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { AlumniErpService } from '../domain/AlumniErpService';
import { AlumniMember } from '../domain/types';
import { EditProfileModal, EditProfileData } from '../../../components/common/EditProfileModal';
import { PrintIdentityCardModal } from '../../../components/common/PrintIdentityCardModal';

export const AlumniErpMobileApp: React.FC<{ 
  onNavigate?: (route: string) => void;
  onSwitchToWeb?: () => void;
}> = ({ onNavigate, onSwitchToWeb }) => {
  const service = AlumniErpService.getInstance();
  const [activeTab, setActiveTab] = useState<'CARD' | 'CHAPTERS' | 'GIVING' | 'JOBS'>('CARD');
  const [members, setMembers] = useState<AlumniMember[]>(service.getMembers());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Default logged in member
  const currentMember = members[0] || {
    id: 'ALM-1001',
    fullName: 'Dr. Sarah K. Nabatanzi',
    alumniNumber: 'ALM-2024-001',
    institution: 'Sovereign University',
    faculty: 'Faculty of Medicine & Health Sciences',
    degree: 'MBChB Medicine & Surgery (Hons)',
    graduationYear: 2024,
    currentEmployer: 'Mulago National Referral Hospital',
    jobTitle: 'Senior Resident Physician & Clinical Researcher',
    locationCity: 'Kampala',
    locationCountry: 'Uganda',
    membershipTier: 'PLATINUM',
    verificationStatus: 'VERIFIED',
    totalDonationsUSD: 14500
  };

  const campaigns = service.getGivingCampaigns();
  const chapters = service.getChapters();

  const handleSaveProfile = (data: EditProfileData) => {
    service.updateMemberProfile(currentMember.id, {
      currentEmployer: data.employer,
      jobTitle: data.jobTitle,
      locationCity: data.locationCity
    });
    setMembers([...service.getMembers()]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center p-0 sm:p-4 font-sans select-none">
      {/* Mobile Shell Container */}
      <div className="w-full max-w-sm h-screen sm:h-[844px] bg-slate-900 sm:rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Mobile Top Bar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate ? onNavigate('/control-center') : (window.location.href = '/control-center')}
              className="p-1 text-slate-400 hover:text-white"
              title="Return to Control Center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center font-bold text-white text-xs">
              A
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>JUMO Alumni Mobile</span>
                <span className="text-[9px] bg-rose-500/20 text-rose-300 font-mono px-1.5 py-0.2 rounded font-bold">
                  PROD_ALUMNI
                </span>
              </div>
              <div className="text-[10px] text-slate-400">Class Advancement & Census</div>
            </div>
          </div>

          {onSwitchToWeb && (
            <button
              onClick={onSwitchToWeb}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md border border-slate-700 transition"
            >
              Web Mode
            </button>
          )}
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'CARD' && (
            <div className="space-y-4">
              
              {/* Digital Alumni ID Card (Front Preview) */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950 via-slate-900 to-rose-900 border border-rose-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-bold text-rose-300 uppercase tracking-widest flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-rose-400" />
                    <span>Sovereign Graduate Credential</span>
                  </div>
                  <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-bold">
                    {currentMember.membershipTier}
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-bold text-white">{currentMember.fullName}</h3>
                  <p className="text-xs text-rose-200">{currentMember.degree}</p>
                  <p className="text-[11px] text-slate-400">{currentMember.institution} • Class of {currentMember.graduationYear}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider">Verification ID</div>
                    <div className="text-xs font-mono font-bold text-rose-300">{currentMember.alumniNumber}</div>
                  </div>
                  <div className="bg-white p-1 rounded-lg shadow-sm">
                    <QrCode className="w-10 h-10 text-slate-950" />
                  </div>
                </div>
              </div>

              {/* Action Buttons: Edit Profile + Print Identity Card */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors shadow-sm cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-md shadow-rose-900/30 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print ID Card</span>
                </button>
              </div>

              {/* Status Pills */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase">Verification</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Certified
                  </div>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase">Total Lifetime Giving</div>
                  <div className="text-xs font-bold text-rose-400 mt-0.5">${(currentMember.totalDonationsUSD || 0).toLocaleString()}</div>
                </div>
              </div>

              {/* Profile Details Container */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-rose-400" />
                    <span>Alumni Profile Details</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                    STATUS: ACTIVE
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Employer:</span>
                    <span className="font-semibold text-white truncate">{currentMember.currentEmployer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Job Title:</span>
                    <span className="font-semibold text-white truncate">{currentMember.jobTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">City / Location:</span>
                    <span className="font-semibold text-white truncate">{currentMember.locationCity}, {currentMember.locationCountry || 'Uganda'}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'GIVING' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Active Class Giving Campaigns</div>
              {campaigns.map(camp => (
                <div key={camp.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                      {camp.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-white">${camp.currentAmountUSD.toLocaleString()}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{camp.title}</h4>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-rose-500 h-1.5 rounded-full" 
                      style={{ width: `${Math.min(100, Math.round((camp.currentAmountUSD / camp.targetAmountUSD) * 100))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'CHAPTERS' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Global Chapters</div>
              {chapters.map(ch => (
                <div key={ch.id} className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                  <div className="text-xs font-bold text-white">{ch.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{ch.region} • {ch.activeMembersCount} Members</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="p-2 bg-slate-900 border-t border-slate-800 grid grid-cols-3 gap-1">
          <button
            onClick={() => setActiveTab('CARD')}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === 'CARD' ? 'bg-rose-600/20 text-rose-400' : 'text-slate-400'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>My Card</span>
          </button>
          <button
            onClick={() => setActiveTab('GIVING')}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === 'GIVING' ? 'bg-rose-600/20 text-rose-400' : 'text-slate-400'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Giving</span>
          </button>
          <button
            onClick={() => setActiveTab('CHAPTERS')}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === 'CHAPTERS' ? 'bg-rose-600/20 text-rose-400' : 'text-slate-400'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Chapters</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          employer: currentMember.currentEmployer,
          jobTitle: currentMember.jobTitle,
          locationCity: currentMember.locationCity
        }}
        userName={currentMember.fullName}
        credentialTitle="Alumni Graduate Credential"
        accentColor="rose"
      />

      {/* Print Identity Card Modal */}
      <PrintIdentityCardModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        cardData={{
          fullName: currentMember.fullName,
          idCode: currentMember.alumniNumber,
          role: currentMember.degree,
          employer: currentMember.currentEmployer,
          jobTitle: currentMember.jobTitle,
          locationCity: currentMember.locationCity,
          credentialTitle: "ALUMNI CREDENTIAL CARD",
          accentColor: "rose",
          issueDate: "2024-06-15",
          expiryDate: "2029-12-31"
        }}
      />
    </div>
  );
};
