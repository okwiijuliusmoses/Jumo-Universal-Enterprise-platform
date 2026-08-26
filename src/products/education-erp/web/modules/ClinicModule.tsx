import React, { useState } from 'react';
import { HeartPulse, Plus, Search, Calendar, User, Activity, CheckCircle, X } from 'lucide-react';
import { EducationErpService } from '../../domain/EducationErpService';

export const ClinicModule: React.FC = () => {
  const service = EducationErpService.getInstance();
  const [visits, setVisits] = useState(service.getClinicalVisits());
  const [students] = useState(service.getStudents());

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('std_01');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [temp, setTemp] = useState('37.0°C');
  const [bp, setBp] = useState('120/80');
  const [pulse, setPulse] = useState('75 bpm');

  const handleRecordVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosis.trim()) return alert('Diagnosis is required.');
    if (!treatment.trim()) return alert('Treatment is required.');

    try {
      const student = students.find(s => s.id === selectedStudent);
      const patientName = student ? student.fullName : 'Guest Student';

      service.recordClinicalVisit({
        patientId: selectedStudent,
        patientName,
        date: new Date().toISOString().split('T')[0],
        diagnosis: diagnosis.trim(),
        treatment: treatment.trim(),
        vitals: { temp, bp, pulse }
      });

      setVisits(service.getClinicalVisits());
      setShowAddModal(false);
      setDiagnosis('');
      setTreatment('');
      setTemp('37.0°C');
      setBp('120/80');
      setPulse('75 bpm');
      alert('Sovereign clinical consultation logged successfully! Patient history secured.');
    } catch (err: any) {
      alert(err.message || 'Error occurred while saving clinical log.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">University Health Services</h1>
          <p className="text-slate-500 text-sm">Log student medical consultations, monitor campus wellness, and maintain patient care files.</p>
        </div>
        <button 
          onClick={() => {
            if (students.length > 0) setSelectedStudent(students[0].id);
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-emerald-800 transition-all"
        >
          <Plus className="w-4 h-4 text-emerald-300" />
          Record Clinical Visit
        </button>
      </div>

      {/* Wellness Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Consultations</p>
            <p className="text-2xl font-black text-slate-900">{visits.length}</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clinical Attending Staff</p>
            <p className="text-2xl font-black text-slate-900">4 Certified Officers</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pharmacy Supply Status</p>
            <p className="text-2xl font-black text-emerald-600">98% OPTIMAL</p>
          </div>
        </div>
      </div>

      {/* Consultation Registry table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Attended Medical Logs</h3>
          <span className="text-xs font-semibold text-slate-400">{visits.length} sessions recorded</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Attending Date</th>
              <th className="px-6 py-4">Patient Profile</th>
              <th className="px-6 py-4 text-center">Vitals (T / BP / P)</th>
              <th className="px-6 py-4">Clinical Diagnosis</th>
              <th className="px-6 py-4">Treatment / Prescription</th>
              <th className="px-6 py-4 text-center">JRM Log</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {visits.map((visit) => {
              const student = students.find(s => s.id === visit.patientId);
              return (
                <tr key={visit.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{visit.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{student ? student.fullName : visit.patientName}</td>
                  <td className="px-6 py-4 text-center text-xs font-mono text-slate-600">
                    {visit.vitals ? `${visit.vitals.temp} | ${visit.vitals.bp} | ${visit.vitals.pulse}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-slate-700 text-xs font-medium">{visit.diagnosis}</td>
                  <td className="px-6 py-4 text-xs font-mono text-emerald-800">{visit.treatment}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100 text-[9px] font-black tracking-widest uppercase">
                      Synchronized
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Record Visit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Record Consultation Log</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordVisit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Select Patient (Student Profile)</label>
                <select 
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.regNumber})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Temp (°C)</label>
                  <input 
                    type="text"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Blood Pressure</label>
                  <input 
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Pulse Rate</label>
                  <input 
                    type="text"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Diagnosis Notes</label>
                <input 
                  type="text"
                  placeholder="e.g. Tension Headache, General Fatigue"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Prescribed Treatment & Medicine</label>
                <textarea 
                  placeholder="e.g. Paracetamol 500mg TDS for 3 days"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-900"
                >
                  Save Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
