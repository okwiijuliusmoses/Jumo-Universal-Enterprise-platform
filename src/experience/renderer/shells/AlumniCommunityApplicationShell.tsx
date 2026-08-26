import React, { useState } from "react";
import { 
  Users, Globe, Calendar, DollarSign, Award, Briefcase, FileCheck, 
  Plus, Search, UserPlus, ExternalLink, CheckCircle2, ShieldCheck
} from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";

interface AlumniCommunityApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function AlumniCommunityApplicationShell({ onBack, onNavigateToPlatform }: AlumniCommunityApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-alumni-community");
  const [activeTab, setActiveTab] = useState<"directory" | "chapters" | "events" | "giving" | "mentorship" | "verification">("directory");
  const [searchQuery, setSearchQuery] = useState("");
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const [alumni, setAlumni] = useState([
    { id: "ALM-1998/042", name: "Eng. Moses Okwii", classYear: "Class of 1998", faculty: "Engineering", company: "Google Cloud Infrastructure", location: "London, UK", mentor: "YES" },
    { id: "ALM-2005/119", name: "Dr. Joan Namubiru", classYear: "Class of 2005", faculty: "Medicine", company: "Mulago National Referral", location: "Kampala, Uganda", mentor: "YES" },
    { id: "ALM-2012/881", name: "David Otim", classYear: "Class of 2012", faculty: "Business", company: "Stanbic Bank East Africa", location: "Nairobi, Kenya", mentor: "NO" },
    { id: "ALM-2020/004", name: "Sarah Akello", classYear: "Class of 2020", faculty: "Law", company: "Ministry of Justice", location: "Kampala, Uganda", mentor: "YES" },
  ]);

  const [alumniForm, setAlumniForm] = useState({ name: "", classYear: "Class of 2022", faculty: "Engineering", company: "", location: "Kampala" });

  const handleRegisterAlumnus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alumniForm.name) return;
    const newA = {
      id: `ALM-2022/${Math.floor(100 + Math.random() * 800)}`,
      name: alumniForm.name,
      classYear: alumniForm.classYear,
      faculty: alumniForm.faculty,
      company: alumniForm.company || "Independent Professional",
      location: alumniForm.location,
      mentor: "YES"
    };
    setAlumni([newA, ...alumni]);
    setAlumniForm({ name: "", classYear: "Class of 2022", faculty: "Engineering", company: "", location: "Kampala" });
    setRegisterModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="jumo-alumni-app">
      {/* 1. TOP BRAND BAR */}
      <header className="bg-slate-900 border-b border-cyan-500/30 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-600 to-cyan-900 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-cyan-500/20 border border-cyan-400/40">
            <Users className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">JUMO ALUMNI & COMMUNITY</h1>
              <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border border-cyan-500/30">
                Alumni Network & Community ERP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Authoritative Global Alumni Network & Degree Verification Gateway</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRegisterModalOpen(true)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Register Alumnus
          </button>
        </div>
      </header>

      {/* 2. STATS RIBBON */}
      <section className="bg-slate-900/60 border-b border-slate-800 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-cyan-500/20 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Registered Alumni</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">18,520 Graduates</div>
          <span className="text-[10px] font-bold text-cyan-400 block mt-1">Across 42 Graduating Classes</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Global Regional Chapters</span>
          <div className="text-lg md:text-xl font-black text-cyan-400 mt-1">12 Chapters</div>
          <span className="text-[10px] font-bold text-slate-400 block mt-1">Kampala, Nairobi, London, DC</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Endowment Campaign</span>
          <div className="text-lg md:text-xl font-black text-white mt-1">UGX 1.840 Billion</div>
          <span className="text-[10px] font-bold text-emerald-400 block mt-1">Scholarships & Infrastructure</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Career Mentors</span>
          <div className="text-lg md:text-xl font-black text-emerald-400 mt-1">340 Professionals</div>
          <span className="text-[10px] font-bold text-slate-400 block mt-1">Student-Alumni Matching</span>
        </div>
      </section>

      {/* 3. TABS */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 flex items-center gap-2 overflow-x-auto">
        {[
          { id: "directory", label: "Alumni Directory", icon: Users },
          { id: "chapters", label: "Global Chapters", icon: Globe },
          { id: "events", label: "Events & Reunions", icon: Calendar },
          { id: "giving", label: "Endowment Giving", icon: DollarSign },
          { id: "mentorship", label: "Mentorship & Jobs", icon: Briefcase },
          { id: "verification", label: "Degree Verification", icon: FileCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* 4. MAIN WORKSPACE */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {activeTab === "directory" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-white">Global Alumni Directory & Network</h2>
                <p className="text-xs text-slate-400">Search verified university and school graduates by class, industry, and location.</p>
              </div>

              <div className="relative w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search alumni, company, city..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Alumni ID</th>
                    <th className="p-4">Alumnus Name</th>
                    <th className="p-4">Graduation Class</th>
                    <th className="p-4">Faculty / Field</th>
                    <th className="p-4">Current Organization</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Mentor Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {alumni
                    .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.company.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((a) => (
                      <tr key={a.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-cyan-400">{a.id}</td>
                        <td className="p-4 font-bold text-white">{a.name}</td>
                        <td className="p-4 text-slate-300">{a.classYear}</td>
                        <td className="p-4 text-slate-400">{a.faculty}</td>
                        <td className="p-4 text-slate-200">{a.company}</td>
                        <td className="p-4 text-slate-400">{a.location}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                            a.mentor === "YES" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
                          }`}>
                            {a.mentor === "YES" ? "ACTIVE MENTOR" : "MEMBER"}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "verification" && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-black text-white">Employer Degree & Qualification Verification Gateway</h2>
            <p className="text-xs text-slate-400">Cryptographically signed degree verification portal for international employers and background check agencies.</p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-400">
              [VERIFICATION-GATEWAY] Aegis Public Ledger Active • 0 Fraudulent Certificates Issued • 100% Instant Verification
            </div>
          </div>
        )}
      </main>

      {/* REGISTER MODAL */}
      {registerModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Register Alumnus Profile</h3>
            <form onSubmit={handleRegisterAlumnus} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={alumniForm.name}
                  onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })}
                  placeholder="e.g. Eng. Moses Okwii"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Graduation Class</label>
                <input
                  type="text"
                  required
                  value={alumniForm.classYear}
                  onChange={(e) => setAlumniForm({ ...alumniForm, classYear: e.target.value })}
                  placeholder="Class of 2022"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Current Organization / Employer</label>
                <input
                  type="text"
                  value={alumniForm.company}
                  onChange={(e) => setAlumniForm({ ...alumniForm, company: e.target.value })}
                  placeholder="e.g. Google / Ministry of Finance"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setRegisterModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-cyan-600 text-white rounded-xl font-black cursor-pointer shadow-md"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
