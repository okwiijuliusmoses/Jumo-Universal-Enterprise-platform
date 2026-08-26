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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" id="jumo-alumni-app">
      {/* 1. TOP BRAND BAR */}
      <header className="bg-white border-b border-rose-200 px-8 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-rose-900 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-rose-900/20">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">JUMO ALUMNI</h1>
              <span className="bg-rose-50 text-rose-900 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-lg border border-rose-100">
                Community Network
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Sovereign Graduate Registry • Verification Gateway</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setRegisterModalOpen(true)}
            className="px-6 py-3 bg-rose-900 hover:bg-rose-950 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Register Profile
          </button>
          <button
            onClick={onBack}
            className="px-4 py-3 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer"
          >
            Exit
          </button>
        </div>
      </header>

      {/* 2. STATS RIBBON */}
      <section className="px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Registered Alumni", value: "18,520", sub: "Across 42 Graduating Classes", icon: Users, color: "text-rose-900" },
          { label: "Global Chapters", value: "12 Chapters", sub: "Kampala, Nairobi, London, DC", icon: Globe, color: "text-slate-900" },
          { label: "Endowment fund", value: "UGX 1.84B", sub: "Scholarships & Infrastructure", icon: DollarSign, color: "text-emerald-600" },
          { label: "Career Mentors", value: "340 Experts", sub: "Professional Guidance network", icon: Briefcase, color: "text-rose-900" }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">{stat.label}</span>
              <div className={`text-2xl font-black ${stat.color} tracking-tight`}>{stat.value}</div>
              <span className="text-[11px] font-bold text-slate-500 block mt-2">{stat.sub}</span>
            </div>
            <stat.icon className={`w-6 h-6 ${stat.color} opacity-20`} />
          </div>
        ))}
      </section>

      {/* 3. TABS */}
      <nav className="bg-white border-y border-slate-200 px-8 flex items-center gap-2 overflow-x-auto">
        {[
          { id: "directory", label: "Directory", icon: Users },
          { id: "chapters", label: "Chapters", icon: Globe },
          { id: "events", label: "Events", icon: Calendar },
          { id: "giving", label: "Endowment", icon: DollarSign },
          { id: "mentorship", label: "Mentorship", icon: Briefcase },
          { id: "verification", label: "Verification", icon: FileCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-6 px-5 font-black text-[10px] uppercase tracking-[0.25em] flex items-center gap-3 border-b-4 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-rose-900 text-rose-900 bg-rose-50/30"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* 4. MAIN WORKSPACE */}
      <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-10">
        {activeTab === "directory" && (
          <div className="space-y-10">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Global Directory</h2>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-2">Verified Professional Network</p>
              </div>

              <div className="relative w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search alumni network..."
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-900/10"
                />
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
              <table className="w-full text-left text-xs font-bold text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-widest border-b border-slate-200">
                  <tr>
                    <th className="p-8">Legacy ID</th>
                    <th className="p-8">Alumnus Name</th>
                    <th className="p-8">Class Year</th>
                    <th className="p-8">Faculty</th>
                    <th className="p-8">Organization</th>
                    <th className="p-8 text-right">Mentorship</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {alumni
                    .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.company.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-8 font-mono text-rose-900">{a.id}</td>
                        <td className="p-8 text-slate-900 text-sm font-black">{a.name}</td>
                        <td className="p-8 uppercase tracking-widest text-[10px]">{a.classYear}</td>
                        <td className="p-8 text-slate-400">{a.faculty}</td>
                        <td className="p-8 text-slate-900">{a.company}</td>
                        <td className="p-8 text-right">
                          <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black tracking-widest uppercase ${
                            a.mentor === "YES" ? "bg-rose-900 text-white" : "bg-slate-100 text-slate-400"
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
          <div className="bg-rose-900 p-12 rounded-[56px] text-white shadow-2xl shadow-rose-900/30 space-y-6">
            <FileCheck className="w-12 h-12 opacity-80" />
            <h2 className="text-4xl font-black tracking-tighter">Qualification Verification Gateway</h2>
            <p className="text-rose-100 font-medium leading-relaxed max-w-2xl">Employer-facing portal for cryptographically signed degree and qualification verification. Sovereign academic records protected by Aegis security protocol.</p>
            <div className="pt-6">
              <button className="px-8 py-4 bg-white text-rose-900 font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl shadow-white/10 hover:bg-rose-50 transition-all">
                Launch verification Portal
              </button>
            </div>
          </div>
        )}
      </main>

      {/* REGISTER MODAL */}
      {registerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-[40px] max-w-md w-full p-10 space-y-8 shadow-2xl">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Alumni Enrollment</h3>
            <form onSubmit={handleRegisterAlumnus} className="space-y-6 text-xs font-black uppercase tracking-widest text-slate-400">
              <div className="space-y-2">
                <label>Full Alumnus Name</label>
                <input
                  type="text"
                  required
                  value={alumniForm.name}
                  onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })}
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-rose-900/20"
                />
              </div>

              <div className="space-y-2">
                <label>Graduation Year / Class</label>
                <input
                  type="text"
                  required
                  value={alumniForm.classYear}
                  onChange={(e) => setAlumniForm({ ...alumniForm, classYear: e.target.value })}
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-rose-900/20"
                />
              </div>

              <div className="space-y-2">
                <label>Current Employer / Role</label>
                <input
                  type="text"
                  value={alumniForm.company}
                  onChange={(e) => setAlumniForm({ ...alumniForm, company: e.target.value })}
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 text-slate-900 outline-none focus:ring-2 focus:ring-rose-900/20"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setRegisterModalOpen(false)}
                  className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-3xl font-black hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-5 bg-rose-900 text-white rounded-3xl font-black shadow-xl shadow-rose-900/30 hover:bg-rose-950 transition-all"
                >
                  Join Network
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
