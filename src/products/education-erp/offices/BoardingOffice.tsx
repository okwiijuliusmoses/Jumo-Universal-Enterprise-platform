import React, { useState } from 'react';
import { 
  Home, Users, BedDouble, Stethoscope, Utensils, Clock,
  CheckCircle2, Search, Filter, Plus, Printer, ShieldAlert,
  AlertTriangle, UserCheck, Calendar, Phone, Activity, Heart
} from 'lucide-react';

export const BoardingOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DORMS' | 'EXEAT' | 'SICK_BAY' | 'MEALS'>('DORMS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDorm, setSelectedDorm] = useState<any | null>(null);

  // 1. Boarding Dormitories & Halls of Residence
  const dormitories = [
    { id: 'DORM-01', name: 'Lumumba Hall of Residence', gender: 'Boys (S.5–S.6)', warden: 'Mr. David Okello', capacity: 240, occupied: 236, bedsAvailable: 4, inspectionScore: '96% (Grade A)' },
    { id: 'DORM-02', name: 'Livingstone House', gender: 'Boys (S.1–S.4)', warden: 'Mr. Richard Kato', capacity: 320, occupied: 312, bedsAvailable: 8, inspectionScore: '92% (Grade A)' },
    { id: 'DORM-03', name: 'Mary Stuart Hall', gender: 'Girls (S.5–S.6)', warden: 'Mrs. Grace Nabukenya', capacity: 220, occupied: 218, bedsAvailable: 2, inspectionScore: '98% (Grade A)' },
    { id: 'DORM-04', name: 'Africa House', gender: 'Girls (S.1–S.4)', warden: 'Ms. Sarah Namusoke', capacity: 300, occupied: 295, bedsAvailable: 5, inspectionScore: '94% (Grade A)' },
    { id: 'DORM-05', name: 'Complex Hostel Block C', gender: 'Mixed Upper (S.6)', warden: 'Mr. Peter Semwogerere', capacity: 180, occupied: 175, bedsAvailable: 5, inspectionScore: '95% (Grade A)' }
  ];

  // 2. Exeat / Leave of Absence Passes
  const exeatPasses = [
    { id: 'EXT-2026-081', student: 'Ainebyoona Timothy', class: 'S.6 PCM Alpha', dorm: 'Lumumba Hall', reason: 'Medical Consultation (Mulago Dental Clinic)', departure: 'Today, 09:00 AM', expectedReturn: 'Today, 05:00 PM', authorizedBy: 'Housemaster Okello', guardianContact: '+256 772 100 234', status: 'Active Out-Pass' },
    { id: 'EXT-2026-082', student: 'Babirye Christine', class: 'S.6 PCB Beta', dorm: 'Mary Stuart', reason: 'Official National Science Fair Delegation', departure: 'Yesterday, 07:30 AM', expectedReturn: 'Tomorrow, 06:00 PM', authorizedBy: 'Head Teacher Mukwaya', guardianContact: '+256 701 445 990', status: 'Approved Delegation' },
    { id: 'EXT-2026-083', student: 'Kato Derrick', class: 'S.4 East', dorm: 'Livingstone House', reason: 'Bereavement (Family Funeral)', departure: '2026-08-20', expectedReturn: '2026-08-23', authorizedBy: 'Discipline Master', guardianContact: '+256 782 334 112', status: 'Returned & Signed' }
  ];

  // 3. Sick Bay & Dispensary Referrals
  const sickBayLogs = [
    { ref: 'MED-9901', student: 'Nassuna Gloria', class: 'S.4 West', dorm: 'Africa House', complaint: 'Acute Malaria & Febrile Illness', treatment: 'Artesunate IV + Paracetamol', nurseInCharge: 'Nurse Betty Nalubega', status: 'Admitted in Ward', temp: '38.6°C' },
    { ref: 'MED-9902', student: 'Muwanga Samuel', class: 'S.2 North', dorm: 'Livingstone House', complaint: 'Sprained Ankle (Football Pitch)', treatment: 'Crepe Bandage + Ibuprofen 400mg', nurseInCharge: 'Nurse Betty Nalubega', status: 'Discharged to Dorm', temp: '36.8°C' },
    { ref: 'MED-9903', student: 'Akello Sharon', class: 'S.5 Arts', dorm: 'Mary Stuart', complaint: 'Asthmatic Wheeze', treatment: 'Salbutamol Nebulization', nurseInCharge: 'Nurse Agnes Namatovu', status: 'Stabilized in Observation', temp: '36.9°C' }
  ];

  // 4. Kitchen & Meal Logistics
  const mealSchedule = [
    { meal: 'Breakfast (06:30 - 07:30 AM)', menu: 'Enriched Milk Porridge + Boiled Eggs + Fresh Bread', servings: 1240, dietaryAlerts: '24 Lactose-Free Oats' },
    { meal: 'Lunch (12:45 - 02:00 PM)', menu: 'Steamed Matooke & Posho + Fresh Groundnut & Beef Stew', servings: 1420, dietaryAlerts: '18 Vegetarian Bean Portions' },
    { meal: 'Evening Tea (05:00 - 05:45 PM)', menu: 'Spiced Black/Milk Tea + Samosas & Groundnuts', servings: 1240, dietaryAlerts: 'Standard' },
    { meal: 'Supper (07:30 - 08:30 PM)', menu: 'Rice & Posho + Yellow Beans Stew + Cabbage Greens', servings: 1420, dietaryAlerts: '12 Gluten-Free Rice Bowls' }
  ];

  return (
    <div className="space-y-6">
      {/* Office Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">BOARDING MASTER & WELFARE OFFICE</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                1,244 Boarders
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Hostel dormitories, bed space allocations, exeat leave passes, dispensary clinic, and kitchen dining hall.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Roll Call Checklist</span>
          </button>
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Issue Exeat Permit</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Boarding Capacity Occupancy</div>
          <div className="text-2xl font-black text-slate-900 mt-1">98.4%</div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">1,244 of 1,260 beds allocated</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Active Out-Passes (Exeats)</div>
          <div className="text-2xl font-black text-indigo-600 mt-1">14</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">All verified with guardians</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Sick Bay In-Patients</div>
          <div className="text-2xl font-black text-rose-600 mt-1">3</div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">Under nurse observation</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Dorm Hygiene Rating</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">95.6%</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">Ministry Public Health Compliant</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'DORMS', label: 'Hostels & Bed Allocations' },
          { id: 'EXEAT', label: 'Exeat Leave & Out-Passes' },
          { id: 'SICK_BAY', label: 'Dispensary & Sick Bay' },
          { id: 'MEALS', label: 'Kitchen & Dining Logistics' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Workspace Views */}
      {activeTab === 'DORMS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Hostel Dormitory Directory</h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">5 Halls of Residence</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-2.5">Hall Name</th>
                    <th className="px-4 py-2.5">Target Group</th>
                    <th className="px-4 py-2.5">House Warden</th>
                    <th className="px-4 py-2.5 text-center">Beds Occupied</th>
                    <th className="px-4 py-2.5 text-center">Available</th>
                    <th className="px-4 py-2.5 text-right">Hygiene Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {dormitories.map((d) => (
                    <tr 
                      key={d.id}
                      onClick={() => setSelectedDorm(d)}
                      className="hover:bg-indigo-50/50 transition cursor-pointer"
                    >
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{d.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{d.id}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{d.gender}</td>
                      <td className="px-4 py-3 text-slate-800 font-semibold">{d.warden}</td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-slate-900">{d.occupied} / {d.capacity}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                          {d.bedsAvailable} Beds
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-indigo-700">{d.inspectionScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Hostel Bed Space Inspector</h3>
              <p className="text-xs text-slate-500">Dorm warden logs & room allocation registry</p>
            </div>

            {selectedDorm ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-200 space-y-1">
                  <div className="font-bold text-indigo-950 text-sm">{selectedDorm.name}</div>
                  <div className="text-slate-600 font-medium">{selectedDorm.gender} • Warden: {selectedDorm.warden}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[9px] uppercase font-mono">Total Capacity</span>
                    <span className="font-bold text-slate-900">{selectedDorm.capacity} Beds</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[9px] uppercase font-mono">Available Space</span>
                    <span className="font-bold text-emerald-600">{selectedDorm.bedsAvailable} Vacant Beds</span>
                  </div>
                </div>

                <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs shadow-xs transition">
                  Allocate New Student Bed
                </button>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Select a dormitory from the list to view room allocation and warden inspection records.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'EXEAT' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Official Exeat & Leave of Absence Register</h3>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Gate Security Synced
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Pass ID</th>
                  <th className="px-4 py-2.5">Learner / Class</th>
                  <th className="px-4 py-2.5">Dormitory</th>
                  <th className="px-4 py-2.5">Reason for Absence</th>
                  <th className="px-4 py-2.5">Expected Return</th>
                  <th className="px-4 py-2.5">Guardian Contact</th>
                  <th className="px-4 py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {exeatPasses.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-indigo-700">{p.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{p.student}</div>
                      <div className="text-[10px] text-slate-500">{p.class}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{p.dorm}</td>
                    <td className="px-4 py-3 text-slate-800 font-medium">{p.reason}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{p.expectedReturn}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{p.guardianContact}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status.includes('Active') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
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

      {activeTab === 'SICK_BAY' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">School Dispensary & Sick Bay Patient Register</h3>
              <p className="text-xs text-slate-500">In-patient admissions, temperature charts, and clinic prescriptions</p>
            </div>
            <button className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-xs transition">
              + New Patient Admission
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sickBayLogs.map((log) => (
              <div key={log.ref} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-900">{log.ref}</span>
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold rounded text-[10px]">
                    Temp: {log.temp}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">{log.student}</div>
                  <div className="text-[11px] text-slate-500">{log.class} • {log.dorm}</div>
                </div>
                <div className="text-xs text-rose-700 font-semibold">Complaint: {log.complaint}</div>
                <div className="text-xs text-slate-700 bg-white p-2 rounded border border-slate-200">
                  Rx: {log.treatment}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Attending: {log.nurseInCharge}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'MEALS' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Daily Kitchen & Dining Hall Meal Logistics</h3>
            <p className="text-xs text-slate-500">Nutrition schedule, portion planning, and allergy management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mealSchedule.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{m.meal}</span>
                  <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {m.servings} Servings
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-medium">{m.menu}</div>
                <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 font-semibold">
                  Special Diets: {m.dietaryAlerts}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
