import React, { useState } from 'react';
import { 
  Baby, Heart, ShieldCheck, Clock, UserCheck, Calendar,
  AlertTriangle, Plus, Search, Filter, Printer, Smile,
  Activity, CheckCircle2, QrCode, Phone, Sparkles
} from 'lucide-react';

export const PrePrimaryNurseryOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CHILDREN' | 'PICKUP' | 'MILESTONES' | 'DAILY_CARE'>('CHILDREN');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChild, setSelectedChild] = useState<any | null>(null);

  // 1. Nursery & Early Childhood Learners
  const nurseryChildren = [
    { id: 'NUR-2026-001', name: 'Aria Maya Nakato', class: 'Top Class (Giraffes)', age: '5 Years', caregiver: 'Teacher Brenda Nalwoga', allergy: 'Peanut Allergy (Strict)', bloodGroup: 'O+', immunization: '100% Up to Date', emergencyContact: '+256 772 889 001', status: 'In Classroom' },
    { id: 'NUR-2026-002', name: 'Lucas Ssenyondo', class: 'Middle Class (Lions)', age: '4 Years', caregiver: 'Teacher Rose Mary', allergy: 'No Known Allergies', bloodGroup: 'A+', immunization: '100% Up to Date', emergencyContact: '+256 701 445 112', status: 'In Classroom' },
    { id: 'NUR-2026-003', name: 'Zuri Isabella Namutebi', class: 'Baby Class (Butterflies)', age: '3 Years', caregiver: 'Teacher Joanita K.', allergy: 'Egg Protein (Mild)', bloodGroup: 'B+', immunization: '100% Up to Date', emergencyContact: '+256 782 119 443', status: 'In Play Park' },
    { id: 'NUR-2026-004', name: 'Noah Kato', class: 'Baby Class (Butterflies)', age: '3 Years', caregiver: 'Teacher Joanita K.', allergy: 'No Known Allergies', bloodGroup: 'O+', immunization: '100% Up to Date', emergencyContact: '+256 752 909 332', status: 'Nap Time' }
  ];

  // 2. Authorized Pickup Persons & Security Verification
  const pickupPasses = [
    { childId: 'NUR-2026-001', childName: 'Aria Maya Nakato', authorizedPerson: 'Dr. Stella Nakalema (Mother)', nationalId: 'CM84029104K', phone: '+256 772 889 001', qrPass: 'QR-PASS-9041-NUR', relationship: 'Mother / Primary Guardian', status: 'Authorized & Verified' },
    { childId: 'NUR-2026-001', childName: 'Aria Maya Nakato', authorizedPerson: 'Mr. David Nakato (Father)', nationalId: 'CM80018491M', phone: '+256 701 334 556', qrPass: 'QR-PASS-9042-NUR', relationship: 'Father / Secondary Guardian', status: 'Authorized & Verified' },
    { childId: 'NUR-2026-002', childName: 'Lucas Ssenyondo', authorizedPerson: 'Ms. Prossy Nabakooza (Aunt)', nationalId: 'CF91048201B', phone: '+256 782 667 889', qrPass: 'QR-PASS-9043-NUR', relationship: 'Designated Family Escort', status: 'Authorized & Verified' }
  ];

  // 3. Early Childhood Developmental Milestones
  const milestoneRecords = [
    { area: 'Gross Motor Skills', indicator: 'Balances on one foot for 10 seconds, skips and catches bouncing ball', assessment: 'Mastered (Exceeds Age Level)', evaluatedBy: 'Early Childhood Specialist' },
    { area: 'Fine Motor & Writing', indicator: 'Holds pencil with tripod grasp, cuts shapes with child-safe scissors, writes name', assessment: 'Competent (On Track)', evaluatedBy: 'Class Teacher' },
    { area: 'Speech & Language', indicator: 'Speaks clearly in full sentences, narrates story from picture book, recognizes sounds', assessment: 'Mastered (Exceeds Age Level)', evaluatedBy: 'Class Teacher' },
    { area: 'Social-Emotional Growth', indicator: 'Shares toys willingly, expresses empathy, follows classroom routines without distress', assessment: 'Competent (On Track)', evaluatedBy: 'Class Teacher' }
  ];

  return (
    <div className="space-y-6">
      {/* Office Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-pink-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Baby className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">PRE-PRIMARY & NURSERY CARE CENTER</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pink-100 text-pink-800 border border-pink-200">
                Baby, Middle & Top Classes
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Early childhood development, milestone tracking, authorized guardian pickup verification, and daily care routines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Attendance & Pick-up Sheet</span>
          </button>
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Admit Nursery Child</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Enrolled Nursery Children</div>
          <div className="text-2xl font-black text-slate-900 mt-1">340</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">Caregiver Ratio 1:6 Compliant</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Authorized Pickup Passes</div>
          <div className="text-2xl font-black text-pink-600 mt-1">680</div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">QR Facial/Biometric Matched</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Special Diet & Allergy Alerts</div>
          <div className="text-2xl font-black text-amber-600 mt-1">12</div>
          <div className="text-[11px] font-semibold text-amber-700 mt-1">Kitchen & Caregiver Flagged</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Immunization Compliance</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">100%</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">UNEPI Certificate Verified</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'CHILDREN', label: 'Children Directory (Baby, Middle, Top)' },
          { id: 'PICKUP', label: 'Authorized Guardian Pickup Verification' },
          { id: 'MILESTONES', label: 'Developmental Milestones Tracker' },
          { id: 'DAILY_CARE', label: 'Daily Care Diary & Routine' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-pink-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Workspaces */}
      {activeTab === 'CHILDREN' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Early Childhood Bio-Data Register</h3>
              <span className="text-xs text-slate-500 font-mono">340 Children Enrolled</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-2.5">Child ID</th>
                    <th className="px-4 py-2.5">Child Full Name</th>
                    <th className="px-4 py-2.5">Class / Caregiver</th>
                    <th className="px-4 py-2.5">Allergy Flag</th>
                    <th className="px-4 py-2.5 text-center">Live Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {nurseryChildren.map((c) => (
                    <tr 
                      key={c.id} 
                      onClick={() => setSelectedChild(c)}
                      className="hover:bg-pink-50/50 transition cursor-pointer"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-pink-700">{c.id}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{c.name}</td>
                      <td className="px-4 py-3">
                        <div className="text-slate-800 font-semibold">{c.class}</div>
                        <div className="text-[10px] text-slate-500">{c.caregiver}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.allergy.includes('Strict') ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {c.allergy}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Child Bio-Data & Medical Profile</h3>
              <p className="text-xs text-slate-500">Immunization and emergency contact information</p>
            </div>

            {selectedChild ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-pink-50/60 rounded-lg border border-pink-200 space-y-1">
                  <div className="font-bold text-pink-950 text-sm">{selectedChild.name}</div>
                  <div className="text-slate-600 font-medium">{selectedChild.class} • Age: {selectedChild.age}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[9px] uppercase font-mono">Blood Group</span>
                    <span className="font-bold text-slate-900">{selectedChild.bloodGroup}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[9px] uppercase font-mono">Immunization</span>
                    <span className="font-bold text-emerald-600">{selectedChild.immunization}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-400 text-[10px] font-mono uppercase">Primary Emergency Contact</div>
                  <div className="font-bold text-slate-900 font-mono mt-0.5">{selectedChild.emergencyContact}</div>
                </div>

                <button className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-xs shadow-xs transition">
                  Generate Child QR Identification Pass
                </button>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Select a child from the register to inspect bio-data, allergy profile, and immunization history.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'PICKUP' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Authorized Guardian Pickup Security System</h3>
              <p className="text-xs text-slate-500">Only verified guardians with active QR passes and valid National IDs are cleared for child exit.</p>
            </div>
            <button className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold shadow-xs">
              + Register Authorized Escort
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Pass Token</th>
                  <th className="px-4 py-2.5">Learner Name</th>
                  <th className="px-4 py-2.5">Authorized Guardian</th>
                  <th className="px-4 py-2.5">National ID No</th>
                  <th className="px-4 py-2.5">Contact</th>
                  <th className="px-4 py-2.5">Relationship</th>
                  <th className="px-4 py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {pickupPasses.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-pink-700">{p.qrPass}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{p.childName}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{p.authorizedPerson}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{p.nationalId}</td>
                    <td className="px-4 py-3 font-mono text-slate-700">{p.phone}</td>
                    <td className="px-4 py-3 text-slate-600">{p.relationship}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'MILESTONES' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Early Childhood Developmental Milestones Rubric</h3>
            <p className="text-xs text-slate-500">Evaluations across motor skills, language acquisition, cognition, and emotional independence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestoneRecords.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{m.area}</span>
                  <span className="px-2 py-0.5 bg-pink-100 text-pink-800 font-bold text-[10px] rounded">
                    {m.assessment}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{m.indicator}</p>
                <div className="text-[10px] text-slate-400 font-mono">Assessed by: {m.evaluatedBy}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'DAILY_CARE' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Daily Nursery Care Schedule & Activity Log</h3>
            <p className="text-xs text-slate-500">Nap routines, sensory play, hygiene checks, and nutrition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">08:30 - 09:30 AM: Circle Time & Songs</div>
              <p className="text-xs text-slate-600">Nursery rhymes, alphabet phonics sounds, and morning circle greetings.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">10:00 - 10:45 AM: Fruit Snack & Outdoor Play</div>
              <p className="text-xs text-slate-600">Fresh organic fruit snack, sand-pit tactile play, and motor climbing frames.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">12:30 - 02:00 PM: Afternoon Nap Routine</div>
              <p className="text-xs text-slate-600">Clean cot rest in quiet air-conditioned nursery dormitory under caregiver supervision.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
