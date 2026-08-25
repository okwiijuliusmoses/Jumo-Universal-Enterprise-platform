import React, { useState } from "react";
import { 
  ChevronLeft, 
  QrCode, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Building, 
  Briefcase, 
  MapPin, 
  Edit3, 
  CreditCard, 
  UserCheck,
  Printer
} from "lucide-react";
import { EditProfileModal, EditProfileData } from "../../../components/common/EditProfileModal";
import { PrintIdentityCardModal } from "../../../components/common/PrintIdentityCardModal";

export const DigitalPayMobileApp: React.FC<{ 
  onNavigate?: (route: string) => void;
  onSwitchToWeb?: () => void;
}> = ({ onNavigate, onSwitchToWeb }) => {
  const [activeTab, setActiveTab] = useState<"CARD" | "SWITCH" | "GATEWAYS">("CARD");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const [operatorProfile, setOperatorProfile] = useState({
    id: "DPY-2024-7731",
    fullName: "Miriam K. Tumusiime",
    role: "National Switch Settlement Officer",
    division: "M-Pesa, Airtel & Bank RTGS Rail Control",
    institution: "JUMO Digital Pay National Switch",
    employer: "JUMO FinTech Interoperability Group",
    jobTitle: "Senior Settlement Infrastructure Specialist",
    locationCity: "Entebbe",
    status: "RING_0_AUTHORIZED",
    activeThroughput: "1,420 TX/SEC",
    dailySettledVolume: "UGX 8.94B"
  });

  const handleSaveProfile = (data: EditProfileData) => {
    setOperatorProfile(prev => ({
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
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
              P
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>JUMO Digital Pay Mobile</span>
                <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-mono px-1.5 py-0.2 rounded font-bold">
                  PROD_DP
                </span>
              </div>
              <div className="text-[10px] text-slate-400">Payment Switch & Gateway Credential</div>
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
              
              {/* Digital Payment Operator ID Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 border border-indigo-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Switch Operator Credential</span>
                  </div>
                  <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-bold">
                    OPERATOR
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-bold text-white">{operatorProfile.fullName}</h3>
                  <p className="text-xs text-indigo-200">{operatorProfile.role}</p>
                  <p className="text-[11px] text-slate-400">{operatorProfile.institution}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider">Switch Token ID</div>
                    <div className="text-xs font-mono font-bold text-indigo-300">{operatorProfile.id}</div>
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
                  <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-md shadow-indigo-900/30 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print ID Card</span>
                </button>
              </div>

              {/* Status / Throughput Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase">Live Throughput</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> 1,420 TPS
                  </div>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase">Settled Volume</div>
                  <div className="text-xs font-bold text-white mt-0.5 truncate">UGX 8.94B / Day</div>
                </div>
              </div>

              {/* Profile Details Container */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Operator Profile Details</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Employer:</span>
                    <span className="font-semibold text-white truncate">{operatorProfile.employer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Job Title:</span>
                    <span className="font-semibold text-white truncate">{operatorProfile.jobTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold text-white truncate">{operatorProfile.locationCity}, Uganda</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === "SWITCH" && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Active Rail Settlement Queues</div>
              {[
                { name: "MTN Mobile Money Open API Rail", status: "ONLINE", latency: "84ms", successRate: "99.98%" },
                { name: "Airtel Money Clearing Gateway", status: "ONLINE", latency: "92ms", successRate: "99.95%" },
                { name: "Bank of Uganda RTGS / EFT Bridge", status: "ONLINE", latency: "110ms", successRate: "100.00%" }
              ].map(q => (
                <div key={q.name} className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white">{q.name}</div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {q.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">Latency: {q.latency} • Reliability: {q.successRate}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "GATEWAYS" && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Global Card & Crypto Gateways</div>
              {[
                { name: "Visa / Mastercard 3DS Direct", type: "Card Rail", state: "ACTIVE" },
                { name: "Stripe Connect Hybrid Gateway", type: "Global Invoicing", state: "ACTIVE" },
                { name: "USDC Stablecoin Treasury Vault", type: "Digital Currency", state: "ACTIVE" }
              ].map(g => (
                <div key={g.name} className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{g.name}</div>
                    <div className="text-[11px] text-slate-400">{g.type}</div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
                    {g.state}
                  </span>
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
              activeTab === "CARD" ? "bg-indigo-600/20 text-indigo-400" : "text-slate-400"
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>My Card</span>
          </button>
          <button
            onClick={() => setActiveTab("SWITCH")}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === "SWITCH" ? "bg-indigo-600/20 text-indigo-400" : "text-slate-400"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Switch</span>
          </button>
          <button
            onClick={() => setActiveTab("GATEWAYS")}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === "GATEWAYS" ? "bg-indigo-600/20 text-indigo-400" : "text-slate-400"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Gateways</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          employer: operatorProfile.employer,
          jobTitle: operatorProfile.jobTitle,
          locationCity: operatorProfile.locationCity
        }}
        userName={operatorProfile.fullName}
        credentialTitle="Switch Settlement Credential"
        accentColor="indigo"
      />

      {/* Print Identity Card Modal */}
      <PrintIdentityCardModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        cardData={{
          fullName: operatorProfile.fullName,
          idCode: operatorProfile.id,
          role: operatorProfile.role,
          employer: operatorProfile.employer,
          jobTitle: operatorProfile.jobTitle,
          locationCity: operatorProfile.locationCity,
          credentialTitle: "DIGITAL PAY SWITCH CREDENTIAL",
          accentColor: "indigo",
          issueDate: "2024-01-10",
          expiryDate: "2029-12-31"
        }}
      />
    </div>
  );
};
