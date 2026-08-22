import React, { useState } from "react";
import { 
  ChevronLeft, 
  QrCode, 
  ShieldCheck, 
  DollarSign, 
  BarChart3, 
  Building, 
  Briefcase, 
  MapPin, 
  Edit3, 
  Landmark, 
  UserCheck,
  Printer
} from "lucide-react";
import { EditProfileModal, EditProfileData } from "../../../components/common/EditProfileModal";
import { PrintIdentityCardModal } from "../../../components/common/PrintIdentityCardModal";

export const FaapMobileApp: React.FC<{ 
  onNavigate?: (route: string) => void;
  onSwitchToWeb?: () => void;
}> = ({ onNavigate, onSwitchToWeb }) => {
  const [activeTab, setActiveTab] = useState<"CARD" | "LEDGERS" | "AUDIT">("CARD");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const [auditorProfile, setAuditorProfile] = useState({
    id: "FAP-2024-9102",
    fullName: "Arthur M. Kibirige, CPA",
    role: "Chief Treasury Auditor",
    division: "General Ledger & Treasury Operations",
    institution: "JUMO FAAP Financial Authority",
    employer: "Sovereign Treasury & Reserve Bank",
    jobTitle: "Principal Financial Comptroller",
    locationCity: "Kampala",
    status: "AUTHORIZED_SIGNATORY",
    clearanceTier: "RING-0 TREASURY COMPLIANT",
    activeReconciliation: "100% BALANCED ($0.00 OFFSET)"
  });

  const handleSaveProfile = (data: EditProfileData) => {
    setAuditorProfile(prev => ({
      ...prev,
      employer: data.employer,
      jobTitle: data.jobTitle,
      locationCity: data.locationCity
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center p-0 sm:p-4 font-sans select-none">
      {/* Mobile Shell Container */}
      <div className="w-full max-w-sm h-screen sm:h-[844px] bg-slate-900 sm:rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Mobile Top Bar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate ? onNavigate("/control-center") : (window.location.href = "/control-center")}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              title="Return to Control Center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
              F
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>JUMO FAAP Mobile</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.2 rounded font-bold">
                  PROD_FAAP
                </span>
              </div>
              <div className="text-[10px] text-slate-400">Financial Backbone & Treasury Credential</div>
            </div>
          </div>

          {onSwitchToWeb && (
            <button
              onClick={onSwitchToWeb}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md border border-slate-700 transition cursor-pointer"
            >
              Web Mode
            </button>
          )}
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === "CARD" && (
            <div className="space-y-4">
              
              {/* Digital FAAP Treasury Credential Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                    <span>FAAP Treasury Officer Credential</span>
                  </div>
                  <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-bold">
                    SIGNATORY
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-bold text-white">{auditorProfile.fullName}</h3>
                  <p className="text-xs text-emerald-200">{auditorProfile.role}</p>
                  <p className="text-[11px] text-slate-400">{auditorProfile.division} • {auditorProfile.institution}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider">Treasury Seal ID</div>
                    <div className="text-xs font-mono font-bold text-emerald-300">{auditorProfile.id}</div>
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
                  <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md shadow-emerald-900/30 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print ID Card</span>
                </button>
              </div>

              {/* Status / Clearance Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase">Clearance</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Signatory
                  </div>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase">Ledger Offset</div>
                  <div className="text-xs font-bold text-emerald-300 mt-0.5 truncate">$0.00 Parity</div>
                </div>
              </div>

              {/* Profile Details Container */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Officer Profile Details</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Employer:</span>
                    <span className="font-semibold text-white truncate">{auditorProfile.employer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Job Title:</span>
                    <span className="font-semibold text-white truncate">{auditorProfile.jobTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold text-white truncate">{auditorProfile.locationCity}, Uganda</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === "LEDGERS" && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Treasury General Ledgers</div>
              {[
                { code: "1010-01", name: "Master Treasury Clearing", balance: "$12,450,800.00", type: "ASSET" },
                { code: "2010-04", name: "Institutional Payables Buffer", balance: "$3,120,400.00", type: "LIABILITY" },
                { code: "4010-02", name: "Settlement Fee Clearing", balance: "$480,210.00", type: "REVENUE" }
              ].map(l => (
                <div key={l.code} className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{l.code}: {l.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{l.type} • Continuous Parity Verified</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-300">
                    {l.balance}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "AUDIT" && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Double-Entry Audit Trace</div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Total Debit Sum:</span>
                  <span className="text-xs font-mono font-bold text-white">$15,571,200.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Total Credit Sum:</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">$15,571,200.00</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Parity Variance:</span>
                  <span className="text-xs font-mono font-bold text-emerald-300">$0.00 (PERFECT)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="p-2 bg-slate-900 border-t border-slate-800 grid grid-cols-3 gap-1">
          <button
            onClick={() => setActiveTab("CARD")}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === "CARD" ? "bg-emerald-600/20 text-emerald-400" : "text-slate-400"
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>My Card</span>
          </button>
          <button
            onClick={() => setActiveTab("LEDGERS")}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === "LEDGERS" ? "bg-emerald-600/20 text-emerald-400" : "text-slate-400"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Ledgers</span>
          </button>
          <button
            onClick={() => setActiveTab("AUDIT")}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === "AUDIT" ? "bg-emerald-600/20 text-emerald-400" : "text-slate-400"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Audit</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          employer: auditorProfile.employer,
          jobTitle: auditorProfile.jobTitle,
          locationCity: auditorProfile.locationCity
        }}
        userName={auditorProfile.fullName}
        credentialTitle="FAAP Treasury Officer Credential"
        accentColor="emerald"
      />

      {/* Print Identity Card Modal */}
      <PrintIdentityCardModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        cardData={{
          fullName: auditorProfile.fullName,
          idCode: auditorProfile.id,
          role: auditorProfile.role,
          employer: auditorProfile.employer,
          jobTitle: auditorProfile.jobTitle,
          locationCity: auditorProfile.locationCity,
          credentialTitle: "FAAP TREASURY OFFICER CREDENTIAL",
          accentColor: "emerald",
          issueDate: "2024-01-15",
          expiryDate: "2029-12-31"
        }}
      />
    </div>
  );
};
