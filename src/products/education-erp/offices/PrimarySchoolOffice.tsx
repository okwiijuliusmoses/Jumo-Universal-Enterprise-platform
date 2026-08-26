import React, { useState } from 'react';
import { 
  GraduationCap, Users, Award, BookOpen, Bus, DollarSign,
  CheckCircle2, Search, Filter, Plus, Printer, Star,
  AlertCircle, ChevronRight, FileSpreadsheet, ShieldCheck
} from 'lucide-react';

export const PrimarySchoolOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PUPILS' | 'PLE' | 'THEMATIC' | 'TRANSPORT' | 'PRIMARY_BURSAR'>('PUPILS');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Primary Pupils Roll (P.1 – P.7)
  const pupils = [
    { id: 'PUP-2026-001', name: 'Muwonge Ethan', class: 'Primary 7', stream: 'P.7 Red', lin: 'LIN-PL-9021-UG', pleIndex: 'PLE/0082/001', feesStatus: '100% Cleared', boardingType: 'Boarding (St. Jude Block)', aggMock: '4 in 4 (Div 1)' },
    { id: 'PUP-2026-002', name: 'Namatovu Chloe', class: 'Primary 7', stream: 'P.7 Blue', lin: 'LIN-PL-9022-UG', pleIndex: 'PLE/0082/002', feesStatus: '100% Cleared', boardingType: 'Day Scholar (Van Route 2)', aggMock: '5 in 4 (Div 1)' },
    { id: 'PUP-2026-003', name: 'Kisakye Liam', class: 'Primary 6', stream: 'P.6 Green', lin: 'LIN-PL-8104-UG', pleIndex: 'N/A', feesStatus: '100% Cleared', boardingType: 'Day Scholar (Van Route 1)', aggMock: '7 in 4 (Div 1)' },
    { id: 'PUP-2026-004', name: 'Achen Joy', class: 'Primary 4', stream: 'P.4 Yellow', lin: 'LIN-PL-7044-UG', pleIndex: 'N/A', feesStatus: 'Balance $80.00', boardingType: 'Boarding (Blessed Virgin)', aggMock: '8 in 4 (Div 1)' },
    { id: 'PUP-2026-005', name: 'Ssempijja Travis', class: 'Primary 2', stream: 'P.2 White', lin: 'LIN-PL-5112-UG', pleIndex: 'N/A', feesStatus: '100% Cleared', boardingType: 'Day Scholar (Parent Drop)', aggMock: 'Thematic 98%' }
  ];

  // 2. Primary Leaving Examination (PLE) Centre Data (UNEB Centre 0082)
  const pleCandidates = [
    { index: 'PLE/0082/001', name: 'Muwonge Ethan', math: 'D1 (96%)', eng: 'D1 (92%)', sci: 'D1 (98%)', sst: 'D1 (94%)', totalAgg: '4 Aggregate (Div 1)', targetSecondary: 'Kings College Budo' },
    { index: 'PLE/0082/002', name: 'Namatovu Chloe', math: 'D1 (90%)', eng: 'D1 (94%)', sci: 'D1 (91%)', sst: 'D2 (86%)', totalAgg: '5 Aggregate (Div 1)', targetSecondary: 'Mt. St. Marys Namagunga' },
    { index: 'PLE/0082/003', name: 'Opio Jonathan', math: 'D1 (89%)', eng: 'D1 (90%)', sci: 'D1 (92%)', sst: 'D1 (91%)', totalAgg: '4 Aggregate (Div 1)', targetSecondary: 'St. Marys College Kisubi' }
  ];

  // 3. School Van Transport Routes
  const transportRoutes = [
    { van: 'Van 01 (Toyota Coaster - UBF 421K)', driver: 'Uncle Moses Tumusiime (+256 772 400 112)', route: 'Naalya - Kiwatule - Ntinda - Naguru', pupils: 34, pickupTime: '06:15 AM', dropTime: '05:00 PM', status: 'On Route (Morning Drop)' },
    { van: 'Van 02 (Toyota HiAce - UBG 882M)', driver: 'Uncle Joseph Mukasa (+256 701 332 990)', route: 'Kira - Namugongo - Kyaliwajjala', pupils: 18, pickupTime: '06:30 AM', dropTime: '04:45 PM', status: 'Arrived at Campus' },
    { van: 'Van 03 (Toyota Coaster - UBH 104P)', driver: 'Uncle Robert Kityo (+256 782 551 223)', route: 'Kyanja - Komamboga - Kisaasi', pupils: 32, pickupTime: '06:20 AM', dropTime: '05:15 PM', status: 'On Route (Morning Drop)' }
  ];

  return (
    <div className="space-y-6">
      {/* Office Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">PRIMARY SCHOOL HEAD TEACHER & ACADEMICS</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                P.1–P.7 Streams • UNEB PLE 0082
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Thematic curriculum, continuous assessments, PLE candidate preparation, pupil welfare, and school transport van fleet.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PLE Master Roll</span>
          </button>
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Admit Primary Pupil</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Enrolled Primary Pupils</div>
          <div className="text-2xl font-black text-slate-900 mt-1">1,280</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">100% Digitized Pupil Files</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">PLE Candidates (P.7)</div>
          <div className="text-2xl font-black text-amber-600 mt-1">164</div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">100% Division 1 Target</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">School Transport Fleet</div>
          <div className="text-2xl font-black text-blue-600 mt-1">12 Vans</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">Real-time GPS Tracking Active</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Tuition Fee Recovery</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">96.8%</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">Bank PRN & Cash Book Synced</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'PUPILS', label: 'Pupil Census & Streams (P.1–P.7)' },
          { id: 'PLE', label: 'PLE Candidate Centre (UNEB 0082)' },
          { id: 'THEMATIC', label: 'Thematic Continuous Assessment' },
          { id: 'TRANSPORT', label: 'School Van Fleet & Routes' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Workspaces */}
      {activeTab === 'PUPILS' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search pupil name, LIN number, stream..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs bg-transparent focus:outline-none text-slate-800 placeholder-slate-400 w-64"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Filter Class:</span>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs bg-white font-semibold text-slate-700"
              >
                <option value="ALL">All Classes (P.1–P.7)</option>
                <option value="P7">Primary 7 (PLE Candidate)</option>
                <option value="P6">Primary 6</option>
                <option value="P5">Primary 5</option>
                <option value="P4">Primary 4</option>
                <option value="P3">Primary 3</option>
                <option value="P2">Primary 2</option>
                <option value="P1">Primary 1</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Pupil ID</th>
                  <th className="px-4 py-2.5">Pupil Full Name</th>
                  <th className="px-4 py-2.5">Class & Stream</th>
                  <th className="px-4 py-2.5">Boarding / Van</th>
                  <th className="px-4 py-2.5 text-center">Mock Agg / Score</th>
                  <th className="px-4 py-2.5 text-center">Fees Status</th>
                  <th className="px-4 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {pupils.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-amber-700">{p.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{p.lin}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-semibold">{p.stream}</td>
                    <td className="px-4 py-3 text-slate-600">{p.boardingType}</td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-emerald-600">{p.aggMock}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.feesStatus.includes('100%') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.feesStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded text-xs font-semibold">
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'PLE' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">National Primary Leaving Examinations (PLE) Readiness Matrix</h3>
              <p className="text-xs text-slate-500">UNEB Center 0082 • 4 Core Subjects: Mathematics, English, Integrated Science, Social Studies</p>
            </div>
            <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs">
              + Generate PLE Register
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">PLE Index</th>
                  <th className="px-4 py-2.5">Candidate Name</th>
                  <th className="px-4 py-2.5 text-center">Math</th>
                  <th className="px-4 py-2.5 text-center">English</th>
                  <th className="px-4 py-2.5 text-center">Science</th>
                  <th className="px-4 py-2.5 text-center">Social Studies</th>
                  <th className="px-4 py-2.5 text-center">Total Mock Aggregate</th>
                  <th className="px-4 py-2.5">Choice Secondary School</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {pleCandidates.map((cand) => (
                  <tr key={cand.index} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{cand.index}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{cand.name}</td>
                    <td className="px-4 py-3 text-center font-mono text-blue-700 font-bold">{cand.math}</td>
                    <td className="px-4 py-3 text-center font-mono text-purple-700 font-bold">{cand.eng}</td>
                    <td className="px-4 py-3 text-center font-mono text-emerald-700 font-bold">{cand.sci}</td>
                    <td className="px-4 py-3 text-center font-mono text-amber-700 font-bold">{cand.sst}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded font-mono font-bold text-xs">
                        {cand.totalAgg}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-semibold">{cand.targetSecondary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'THEMATIC' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Lower Primary (P.1–P.3) Thematic Learning Competencies</h3>
            <p className="text-xs text-slate-500">Strands: Literacy I, Literacy II, Numeracy, News, Creative Arts, Physical Education & Religious Education</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">Theme 1: Our School & Community</div>
              <p className="text-xs text-slate-600">Oral vocabulary, naming school buildings, classroom rules, and identifying school leaders.</p>
              <div className="text-[11px] text-emerald-700 font-bold">Class Average: 96% Mastery</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">Theme 2: Our Home & Environment</div>
              <p className="text-xs text-slate-600">Family relationships, household duties, hygiene and sanitation, and domestic animals.</p>
              <div className="text-[11px] text-emerald-700 font-bold">Class Average: 94% Mastery</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">Theme 3: Health & Nutrition</div>
              <p className="text-xs text-slate-600">Balanced diet recognition, hand-washing techniques, and preventing common childhood illnesses.</p>
              <div className="text-[11px] text-emerald-700 font-bold">Class Average: 98% Mastery</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'TRANSPORT' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">School Van Fleet, Routes & Guardian Pickup Notification</h3>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              GPS Telemetry Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Van Details</th>
                  <th className="px-4 py-2.5">Driver Contact</th>
                  <th className="px-4 py-2.5">Assigned Neighborhood Route</th>
                  <th className="px-4 py-2.5 text-center">Pupils</th>
                  <th className="px-4 py-2.5">Schedule</th>
                  <th className="px-4 py-2.5 text-center">Live Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {transportRoutes.map((van, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-bold text-slate-900">{van.van}</td>
                    <td className="px-4 py-3 text-slate-700 font-mono text-[11px]">{van.driver}</td>
                    <td className="px-4 py-3 text-slate-800 font-semibold">{van.route}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-700">{van.pupils} Pupils</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{van.pickupTime} / {van.dropTime}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                        {van.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
