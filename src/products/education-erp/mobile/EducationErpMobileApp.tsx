import React, { useState } from "react";
import { 
  ChevronLeft, 
  QrCode, 
  ShieldCheck, 
  BookOpen, 
  CreditCard, 
  Building, 
  Briefcase, 
  MapPin, 
  Edit3, 
  GraduationCap, 
  UserCheck,
  Printer
} from "lucide-react";
import { EditProfileModal, EditProfileData } from "../../../components/common/EditProfileModal";
import { PrintIdentityCardModal } from "../../../components/common/PrintIdentityCardModal";

export const EducationErpMobileApp: React.FC<{ 
  onNavigate?: (route: string) => void;
  onSwitchToWeb?: () => void;
}> = ({ onNavigate, onSwitchToWeb }) => {
  const [activeTab, setActiveTab] = useState<"CARD" | "COURSES" | "FINANCE">("CARD");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const [studentProfile, setStudentProfile] = useState({
    id: "STU-2024-8842",
    fullName: "David S. Mukasa",
    role: "Undergraduate Scholar",
    faculty: "Faculty of Computing & Information Technology",
    program: "BSc Software Engineering (Level 3)",
    institution: "Sovereign University",
    employer: "Computing Systems & Innovation Hub",
    jobTitle: "Junior Software Fellow & Lab Assistant",
    locationCity: "Kampala",
    status: "ACTIVE_ENROLLED",
    gpa: "4.62 / 5.0",
    semester: "Semester II, Academic Year 2025/2026"
  });

  const handleSaveProfile = (data: EditProfileData) => {
    setStudentProfile(prev => ({
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
              E
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>JUMO Education Mobile</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.2 rounded font-bold">
                  PROD_EDU
                </span>
              </div>
              <div className="text-[10px] text-slate-400">Universal Academic & Student Credential</div>
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
              
              {/* Digital Student Identity Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-900 border border-emerald-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sovereign Scholar Credential</span>
                  </div>
                  <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-bold">
                    ACTIVE STUDENT
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-bold text-white">{studentProfile.fullName}</h3>
                  <p className="text-xs text-emerald-200">{studentProfile.program}</p>
                  <p className="text-[11px] text-slate-400">{studentProfile.institution} • {studentProfile.faculty}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider">Student ID / PRN</div>
                    <div className="text-xs font-mono font-bold text-emerald-300">{studentProfile.id}</div>
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

              {/* Status / Academic Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase">Academic Standing</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> CGPA: {studentProfile.gpa}
                  </div>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400 uppercase">Active Term</div>
                  <div className="text-xs font-bold text-white mt-0.5 truncate">Sem II 2025/26</div>
                </div>
              </div>

              {/* Profile Details Container with Edit Profile button */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Scholar Profile Details</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Employer / Lab:</span>
                    <span className="font-semibold text-white truncate">{studentProfile.employer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Job Title:</span>
                    <span className="font-semibold text-white truncate">{studentProfile.jobTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold text-white truncate">{studentProfile.locationCity}, Uganda</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === "COURSES" && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Enrolled Courses (Sem II)</div>
              {[
                { code: "CSC 3201", title: "Distributed Operating Systems", grade: "A", credits: 4 },
                { code: "SWE 3204", title: "Enterprise Software Architecture", grade: "A+", credits: 4 },
                { code: "BIT 3202", title: "FinTech Protocols & Cryptography", grade: "A", credits: 3 },
                { code: "MTH 3208", title: "Stochastic Financial Models", grade: "B+", credits: 3 }
              ].map(c => (
                <div key={c.code} className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{c.code}: {c.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{c.credits} Credit Units • Faculty Certified</div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">
                    {c.grade}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "FINANCE" && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Tuition & SchoolPay Ledger</div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Total Billed Fees:</span>
                  <span className="text-xs font-bold text-white">UGX 2,450,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">SchoolPay Paid Amount:</span>
                  <span className="text-xs font-bold text-emerald-400">UGX 2,450,000</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Balance:</span>
                  <span className="text-xs font-mono font-bold text-emerald-300">UGX 0.00 (CLEARED)</span>
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
            onClick={() => setActiveTab("COURSES")}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === "COURSES" ? "bg-emerald-600/20 text-emerald-400" : "text-slate-400"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Academics</span>
          </button>
          <button
            onClick={() => setActiveTab("FINANCE")}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 ${
              activeTab === "FINANCE" ? "bg-emerald-600/20 text-emerald-400" : "text-slate-400"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Finance</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          employer: studentProfile.employer,
          jobTitle: studentProfile.jobTitle,
          locationCity: studentProfile.locationCity
        }}
        userName={studentProfile.fullName}
        credentialTitle="Student Scholar Credential"
        accentColor="emerald"
      />

      {/* Print Identity Card Modal */}
      <PrintIdentityCardModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        cardData={{
          fullName: studentProfile.fullName,
          idCode: studentProfile.id,
          role: studentProfile.role,
          employer: studentProfile.employer,
          jobTitle: studentProfile.jobTitle,
          locationCity: studentProfile.locationCity,
          credentialTitle: "SCHOLAR IDENTITY CARD",
          accentColor: "emerald",
          issueDate: "2024-09-01",
          expiryDate: "2028-08-31"
        }}
      />
    </div>
  );
};
