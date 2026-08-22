import React, { useState } from "react";
import { 
  ChevronLeft, 
  QrCode, 
  ShieldCheck, 
  HeartHandshake, 
  Calendar, 
  Building, 
  Briefcase, 
  MapPin, 
  Edit3, 
  Church, 
  UserCheck,
  Printer
} from "lucide-react";
import { EditProfileModal, EditProfileData } from "../../../components/common/EditProfileModal";
import { PrintIdentityCardModal } from "../../../components/common/PrintIdentityCardModal";

export const ChurchErpMobileApp: React.FC<{ 
  onNavigate?: (route: string) => void;
  onSwitchToWeb?: () => void;
}> = ({ onNavigate, onSwitchToWeb }) => {
  const [activeTab, setActiveTab] = useState<"CARD" | "TITHE" | "EVENTS">("CARD");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const [parishionerProfile, setParishionerProfile] = useState({
    id: "CHU-2024-5519",
    fullName: "Grace A. Nakimera",
    role: "Synod Council Delegate",
    parish: "St. Paul Cathedral Parish",
    diocese: "Diocese of Kampala & Central Uganda",
    employer: "Uganda Christian University (UCU)",
    jobTitle: "Lecturer in Theology & Ethics",
    locationCity: "Mukono",
    status: "ACTIVE_COMMUNICANT",
    pledgeStatus: "CURRENT_UP_TO_DATE",
    cellGroup: "Bethany Fellowship Cell 4"
  });

  const handleSaveProfile = (data: EditProfileData) => {
    setParishionerProfile(prev => ({
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
            <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center font-bold text-white text-xs">
              C
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>JUMO Church Mobile</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 font-mono px-1.5 py-0.2 rounded font-bold">
                  PROD_CH
                </span>
              </div>
              <div className="text-[10px] text-slate-400">Diocesan & Parish Member Credential</div>
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
              
              {/* Digital Church / Parishioner ID Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-orange-950 border border-amber-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Church className="w-3.5 h-3.5 text-amber-400" />
                    <span>Diocesan Member Credential</span>
                  </div>
                  <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-bold">
                    DELEGATE
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-bold text-white">{parishionerProfile.fullName}</h3>
                  <p className="text-xs text-amber-200">{parishionerProfile.role}</p>
                  <p className="text-[11px] text-slate-400">{parishionerProfile.parish} • {parishionerProfile.diocese}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider">Parish Envelope ID</div>
                    <div className="text-xs font-mono font-bold text-amber-300">{parishionerProfile.id}</div>
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
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-colors shadow-md shadow-amber-900/30 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print ID Card</span>
                </button>
              </div>

              {/* Status / Governance Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase">Parish Status</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Communicant
                  </div>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase">Cell Group</div>
                  <div className="text-xs font-bold text-white mt-0.5 truncate">Bethany Cell 4</div>
                </div>
              </div>

              {/* Profile Details Container */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Member Profile Details</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Employer:</span>
                    <span className="font-semibold text-white truncate">{parishionerProfile.employer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Job Title:</span>
                    <span className="font-semibold text-white truncate">{parishionerProfile.jobTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold text-white truncate">{parishionerProfile.locationCity}, Uganda</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === "TITHE" && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Tithe & Building Pledge Ledger</div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Annual Pledge:</span>
                  <span className="text-xs font-bold text-white">UGX 1,200,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Paid Tithe YTD:</span>
                  <span className="text-xs font-bold text-amber-400">UGX 1,200,000</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Pledge Status:</span>
                  <span className="text-xs font-mono font-bold text-emerald-300">UP TO DATE</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "EVENTS" && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Upcoming Synod Gatherings</div>
              {[
                { title: "Diocesan Synod Annual Convention", date: "Aug 28, 2026", loc: "Cathedral Grounds" },
                { title: "Couples & Family Ministry", date: "Sep 05, 2026", loc: "Parish Hall" }
              ].map(e => (
                <div key={e.title} className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                  <div className="text-xs font-bold text-white">{e.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{e.date} • {e.loc}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="p-2 bg-slate-900 border-t border-slate-800 grid grid-cols-3 gap-1">
          <button
            onClick={() => setActiveTab("CARD")}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === "CARD" ? "bg-amber-600/20 text-amber-400" : "text-slate-400"
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>My Card</span>
          </button>
          <button
            onClick={() => setActiveTab("TITHE")}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === "TITHE" ? "bg-amber-600/20 text-amber-400" : "text-slate-400"
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Tithe</span>
          </button>
          <button
            onClick={() => setActiveTab("EVENTS")}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === "EVENTS" ? "bg-amber-600/20 text-amber-400" : "text-slate-400"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          employer: parishionerProfile.employer,
          jobTitle: parishionerProfile.jobTitle,
          locationCity: parishionerProfile.locationCity
        }}
        userName={parishionerProfile.fullName}
        credentialTitle="Diocesan Member Credential"
        accentColor="amber"
      />

      {/* Print Identity Card Modal */}
      <PrintIdentityCardModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        cardData={{
          fullName: parishionerProfile.fullName,
          idCode: parishionerProfile.id,
          role: parishionerProfile.role,
          employer: parishionerProfile.employer,
          jobTitle: parishionerProfile.jobTitle,
          locationCity: parishionerProfile.locationCity,
          credentialTitle: "DIOCESAN MEMBER CREDENTIAL",
          accentColor: "amber",
          issueDate: "2024-01-01",
          expiryDate: "2029-12-31"
        }}
      />
    </div>
  );
};
