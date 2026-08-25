import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Phone, 
  ShieldAlert, 
  Pill, 
  Bed, 
  UserCheck, 
  FileText,
  Ambulance,
  X,
  Thermometer,
  Calendar
} from 'lucide-react';
import { 
  clinicService, 
  SickBayVisit, 
  StudentHealthProfile, 
  ClinicMedication, 
  HospitalReferral 
} from '../../../domain/ClinicService';

export const SchoolClinicPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'visits' | 'profiles' | 'medications' | 'referrals'>('dashboard');
  const [visits, setVisits] = useState<SickBayVisit[]>([]);
  const [profiles, setProfiles] = useState<StudentHealthProfile[]>([]);
  const [medications, setMedications] = useState<ClinicMedication[]>([]);
  const [referrals, setReferrals] = useState<HospitalReferral[]>([]);
  const [stats, setStats] = useState(clinicService.getClinicStats());
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [showNewVisitModal, setShowNewVisitModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState<string | null>(null);

  const refreshData = () => {
    setVisits(clinicService.getVisits());
    setProfiles(clinicService.getHealthProfiles());
    setMedications(clinicService.getMedications());
    setReferrals(clinicService.getReferrals());
    setStats(clinicService.getClinicStats());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleDischarge = (visitId: string) => {
    clinicService.dischargeStudent(visitId, 'Patient stable and cleared for class resumption.');
    refreshData();
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden text-slate-800">
      {/* Top Banner / Office Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg border border-rose-100">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900">School Clinic & Sick Bay</h2>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-rose-100 text-rose-800 rounded">
                ECD & Primary Health
              </span>
            </div>
            <p className="text-xs text-slate-500">Student Triage, Pediatric Care, Emergency Referrals & Dispensary</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'dashboard' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('visits')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'visits' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Sickbay Visits ({visits.filter(v => v.status === 'IN_SICKBAY').length} Active)
          </button>
          <button
            onClick={() => setActiveTab('profiles')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'profiles' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Health Profiles & Allergies
          </button>
          <button
            onClick={() => setActiveTab('medications')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'medications' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Dispensary
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'referrals' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Hospital Referrals
          </button>

          <button
            onClick={() => setShowNewVisitModal(true)}
            className="flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-md bg-rose-600 text-white hover:bg-rose-700 shadow-sm ml-2"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Log Triage Visit
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 overflow-auto p-6">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Stat Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Currently in Sickbay</p>
                  <p className="text-2xl font-bold text-rose-600 mt-1">{stats.inSickbay} Beds Occupied</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                  <Bed className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Total Consultations</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalVisits}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-amber-700">Allergy & Chronic Cases</p>
                  <p className="text-2xl font-bold text-amber-900 mt-1">{stats.allergyCases} Flagged</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Low Stock Medications</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.lowStockMeds} Items</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <Pill className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Active Sickbay Patients Banner */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-rose-600" />
                  <h3 className="text-sm font-bold text-rose-900">Current Sickbay In-Patients</h3>
                </div>
                <span className="text-xs text-rose-700 font-medium">Under Nurse Supervision</span>
              </div>

              <div className="divide-y divide-slate-100">
                {visits.filter(v => v.status === 'IN_SICKBAY').map(v => (
                  <div key={v.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                        {v.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-bold text-slate-900">{v.studentName}</p>
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded">
                            {v.classGrade}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-800 rounded">
                            Temp: {v.temperatureC}°C
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          <span className="font-semibold text-slate-700">Diagnosis:</span> {v.diagnosis} &bull; <span className="font-semibold text-slate-700">Treatment:</span> {v.treatmentPrescribed}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Admitted: {v.bedRestStartTime || 'Morning'} &bull; Attending: {v.attendingNurse}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {v.parentNotified && (
                        <span className="flex items-center text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                          <Phone className="w-3 h-3 mr-1" /> Guardian Notified
                        </span>
                      )}
                      <button
                        onClick={() => handleDischarge(v.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-sm"
                      >
                        Discharge Patient
                      </button>
                    </div>
                  </div>
                ))}

                {visits.filter(v => v.status === 'IN_SICKBAY').length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No students currently admitted in sickbay beds.
                  </div>
                )}
              </div>
            </div>

            {/* Two Column Layout: Critical Health Alerts & Low Medication Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Critical Health Alerts */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-bold text-slate-800">Flagged Allergy & Chronic Watchlist</h3>
                  </div>
                  <button onClick={() => setActiveTab('profiles')} className="text-xs text-blue-600 hover:underline">
                    View Registry
                  </button>
                </div>
                <div className="space-y-3">
                  {profiles.filter(p => p.allergies.length > 0 || p.chronicConditions.length > 0).slice(0, 4).map(p => (
                    <div key={p.id} className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs font-bold text-slate-900">{p.studentName}</p>
                          <span className="text-[10px] bg-white border border-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                            {p.classGrade}
                          </span>
                          <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold">
                            {p.bloodGroup}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {p.allergies.map((a, i) => (
                            <span key={i} className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.2 rounded border border-rose-200 font-medium">
                              Allergy: {a}
                            </span>
                          ))}
                          {p.chronicConditions.map((c, i) => (
                            <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200 font-medium">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500">Emergency Contact</p>
                        <p className="text-xs font-mono font-bold text-slate-700">{p.emergencyContactPhone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinic Dispensary Stock */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center space-x-2">
                    <Pill className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-800">Essential Clinic Dispensary Status</h3>
                  </div>
                  <button onClick={() => setActiveTab('medications')} className="text-xs text-blue-600 hover:underline">
                    Manage Dispensary
                  </button>
                </div>
                <div className="space-y-3">
                  {medications.map(m => (
                    <div key={m.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">{m.name}</p>
                        <p className="text-[11px] text-slate-500">Batch: {m.batchNumber} &bull; Exp: {m.expiryDate}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                          m.quantityInStock <= m.minimumThreshold 
                            ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {m.quantityInStock} {m.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SICKBAY VISITS TAB */}
        {activeTab === 'visits' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student or complaint..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
              <button
                onClick={() => setShowNewVisitModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Record New Patient Visit
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Visit Ref</th>
                    <th className="px-5 py-3">Student Name</th>
                    <th className="px-5 py-3">Class</th>
                    <th className="px-5 py-3">Chief Complaint</th>
                    <th className="px-5 py-3">Vitals</th>
                    <th className="px-5 py-3">Diagnosis & Prescription</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visits
                    .filter(v => v.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || v.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(v => (
                      <tr key={v.id} className="hover:bg-slate-50">
                        <td className="px-5 py-3.5 font-mono text-slate-500">{v.visitNumber}</td>
                        <td className="px-5 py-3.5 font-bold text-slate-900">{v.studentName}</td>
                        <td className="px-5 py-3.5 text-slate-600">{v.classGrade}</td>
                        <td className="px-5 py-3.5 max-w-xs truncate text-slate-700">{v.chiefComplaint}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                            v.temperatureC >= 38 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {v.temperatureC}°C
                          </span>
                        </td>
                        <td className="px-5 py-3.5 max-w-xs truncate text-slate-600">
                          <span className="font-semibold text-slate-800">{v.diagnosis}:</span> {v.treatmentPrescribed}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            v.status === 'IN_SICKBAY' ? 'bg-rose-100 text-rose-800' :
                            v.status === 'DISCHARGED' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {v.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          {v.status === 'IN_SICKBAY' && (
                            <button
                              onClick={() => handleDischarge(v.id)}
                              className="text-emerald-600 hover:text-emerald-800 font-semibold"
                            >
                              Discharge
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROFILES & ALLERGIES TAB */}
        {activeTab === 'profiles' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student health profiles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
              <button
                onClick={() => setShowProfileModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Student Health Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profiles
                .filter(p => p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || p.studentId.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(p => (
                  <div key={p.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{p.studentName}</h4>
                          <p className="text-xs text-slate-500">{p.classGrade} &bull; ID: {p.studentId}</p>
                        </div>
                        <span className="px-2 py-1 bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs rounded">
                          {p.bloodGroup}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div>
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Allergies</span>
                          {p.allergies.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {p.allergies.map((a, i) => (
                                <span key={i} className="text-[11px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200 font-medium">
                                  {a}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">No known allergies</span>
                          )}
                        </div>

                        <div>
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Chronic Conditions</span>
                          {p.chronicConditions.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {p.chronicConditions.map((c, i) => (
                                <span key={i} className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-medium">
                                  {c}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">None reported</span>
                          )}
                        </div>

                        {p.notes && (
                          <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 mt-2">
                            {p.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div>
                        <p className="font-semibold text-slate-700">{p.emergencyContactName}</p>
                        <p className="font-mono text-[11px] text-slate-500">{p.emergencyContactPhone}</p>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        Immunized
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* MEDICATIONS TAB */}
        {activeTab === 'medications' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search medication stock..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
              <button
                onClick={() => setShowRestockModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Restock Dispensary
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Item Code</th>
                    <th className="px-5 py-3">Medication Name</th>
                    <th className="px-5 py-3">Dosage Form</th>
                    <th className="px-5 py-3">Batch Number</th>
                    <th className="px-5 py-3">Expiry Date</th>
                    <th className="px-5 py-3">Stock Level</th>
                    <th className="px-5 py-3">Threshold</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medications
                    .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.itemCode.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(m => (
                      <tr key={m.id} className="hover:bg-slate-50">
                        <td className="px-5 py-3.5 font-mono text-slate-500">{m.itemCode}</td>
                        <td className="px-5 py-3.5 font-bold text-slate-900">{m.name}</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded">
                            {m.dosageForm}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">{m.batchNumber}</td>
                        <td className="px-5 py-3.5 text-slate-600">{m.expiryDate}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                            m.quantityInStock <= m.minimumThreshold 
                              ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {m.quantityInStock} {m.unit}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500">{m.minimumThreshold} {m.unit}</td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => {
                              clinicService.dispenseMedication(m.id, 1);
                              refreshData();
                            }}
                            className="text-rose-600 hover:text-rose-800 font-semibold mr-3"
                          >
                            Dispense -1
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REFERRALS TAB */}
        {activeTab === 'referrals' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Hospital Emergency Dispatch Records</h3>
                <p className="text-xs text-slate-500">Official log of ambulance transfers and partner pediatric clinics</p>
              </div>
              <button
                onClick={() => setShowReferralModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
              >
                <Ambulance className="w-4 h-4 mr-1.5" /> Dispatch Emergency Referral
              </button>
            </div>

            <div className="space-y-3">
              {referrals.map(r => (
                <div key={r.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                        {r.referralNumber}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{r.studentName} ({r.classGrade})</h4>
                    </div>
                    <p className="text-xs text-slate-700">
                      <span className="font-semibold">Hospital:</span> {r.hospitalName} &bull; <span className="font-semibold">Reason:</span> {r.emergencyReason}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Dispatched at: {new Date(r.dispatchTime).toLocaleString()} &bull; Staff Accompanying: {r.accompanyingStaff}
                    </p>
                    {r.outcomeNotes && (
                      <p className="text-xs bg-emerald-50 text-emerald-800 p-2 rounded border border-emerald-100">
                        {r.outcomeNotes}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800">
                      {r.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Parent Contacted: {r.parentArrived ? 'Arrived at Hospital' : 'In Transit'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* NEW VISIT MODAL */}
      {showNewVisitModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-rose-600" />
                <h3 className="text-sm font-bold text-rose-900">Record Sickbay Visit / Triage</h3>
              </div>
              <button onClick={() => setShowNewVisitModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fd = new FormData(form);

                clinicService.recordVisit({
                  studentId: fd.get('studentId') as string,
                  studentName: fd.get('studentName') as string,
                  classGrade: fd.get('classGrade') as string,
                  chiefComplaint: fd.get('chiefComplaint') as string,
                  temperatureC: parseFloat(fd.get('temperatureC') as string),
                  pulseRate: parseInt(fd.get('pulseRate') as string) || undefined,
                  diagnosis: fd.get('diagnosis') as string,
                  treatmentPrescribed: fd.get('treatment') as string,
                  medicationDispensed: fd.get('medication') as string,
                  bedRestRequired: fd.get('bedRest') === 'on',
                  parentNotified: fd.get('parentNotified') === 'on',
                  parentNotificationNotes: fd.get('parentNotes') as string,
                  attendingNurse: fd.get('nurse') as string
                });

                refreshData();
                setShowNewVisitModal(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Name</label>
                  <input name="studentName" required type="text" placeholder="e.g. Alice Katusiime" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-rose-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class / Section</label>
                  <input name="classGrade" required type="text" placeholder="e.g. Middle Class or P.4 Blue" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-rose-500" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student ID</label>
                  <input name="studentId" required type="text" placeholder="STU-001" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-rose-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Body Temp (°C)</label>
                  <input name="temperatureC" required step="0.1" type="number" defaultValue="37.0" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-rose-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pulse (bpm)</label>
                  <input name="pulseRate" type="number" defaultValue="80" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-rose-500" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chief Complaint</label>
                <textarea name="chiefComplaint" required rows={2} placeholder="Symptoms described by student/teacher..." className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-rose-500" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clinical Diagnosis</label>
                  <input name="diagnosis" required type="text" placeholder="e.g. Mild headache, viral rhinitis" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-rose-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Treatment / First Aid</label>
                  <input name="treatment" required type="text" placeholder="e.g. Oral fluids, cold compress" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-rose-500" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Medication Dispensed</label>
                <input name="medication" type="text" placeholder="e.g. Paracetamol syrup 10ml" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-rose-500" />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input name="bedRest" type="checkbox" className="rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                  <span className="font-semibold text-slate-700">Admit to Sickbay Bed</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input name="parentNotified" type="checkbox" className="rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                  <span className="font-semibold text-slate-700">Notify Parent / Guardian</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowNewVisitModal(false)} className="px-4 py-2 border border-slate-300 text-slate-600 rounded text-xs font-semibold hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-rose-600 text-white rounded text-xs font-semibold hover:bg-rose-700 shadow-sm">
                  Save Clinical Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEALTH PROFILE MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">New Student Health Profile</h3>
              <button onClick={() => setShowProfileModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fd = new FormData(form);

                const allergiesRaw = (fd.get('allergies') as string) || '';
                const conditionsRaw = (fd.get('conditions') as string) || '';

                clinicService.saveHealthProfile({
                  studentId: fd.get('studentId') as string,
                  studentName: fd.get('studentName') as string,
                  classGrade: fd.get('classGrade') as string,
                  bloodGroup: fd.get('bloodGroup') as any,
                  allergies: allergiesRaw ? allergiesRaw.split(',').map(s => s.trim()) : [],
                  chronicConditions: conditionsRaw ? conditionsRaw.split(',').map(s => s.trim()) : [],
                  emergencyContactName: fd.get('contactName') as string,
                  emergencyContactPhone: fd.get('contactPhone') as string,
                  immunizationComplete: true,
                  notes: fd.get('notes') as string
                });

                refreshData();
                setShowProfileModal(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
                  <input name="studentName" required type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class / Section</label>
                  <input name="classGrade" required type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student ID</label>
                  <input name="studentId" required type="text" placeholder="STU-PRI-..." className="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                  <select name="bloodGroup" className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white">
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Known Allergies (Comma separated)</label>
                <input name="allergies" placeholder="Peanuts, Penicillin, Dust..." className="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chronic Conditions (Comma separated)</label>
                <input name="conditions" placeholder="Asthma, Sickle Cell, Diabetes..." className="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Emergency Contact Person</label>
                  <input name="contactName" required type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Emergency Phone</label>
                  <input name="contactPhone" required type="tel" className="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowProfileModal(false)} className="px-4 py-2 border border-slate-300 text-slate-600 rounded text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
