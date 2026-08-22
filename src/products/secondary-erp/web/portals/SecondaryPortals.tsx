import React, { useState, useEffect } from 'react';
import { 
  School, Users, BookOpen, Calculator, Microscope, Laptop, 
  Library, ShieldAlert, Award, Calendar, CheckCircle2, Plus, 
  Search, Filter, Download, DollarSign, TrendingUp, Landmark,
  FileText, ClipboardList, X
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { SecondaryService, SecondaryStudent } from '../../domain/SecondaryService';

export const SecondarySenatePortal: React.FC = () => {
  return (
    <PortalAuthenticationGate
      portalId="secondary-senate"
      portalName="Principal & Secondary Senate Governance Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_SECONDARY_HEADTEACHER', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      {/* ... rest of existing Senate content remains similar but could be made dynamic ... */}
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Principal's Office & Academic Senate</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-300 uppercase">
                St. Lawrence Sovereign
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              High-level institutional governance, O & A Level academic policy, UNEB center administration & secondary staffing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Academic Excellence</h3>
              <p className="text-2xl font-black text-slate-900 mt-1 font-mono">92% DIV 1</p>
              <p className="text-[11px] text-slate-500 mt-1">UCE 2025 Benchmarked Performance</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Total Student Roll</h3>
              <p className="text-2xl font-black text-slate-900 mt-1 font-mono">1,840 Students</p>
              <p className="text-[11px] text-slate-500 mt-1">O-Level: 1,200 | A-Level: 640</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight">FAAP Finance Status</h3>
              <p className="text-2xl font-black text-slate-900 mt-1 font-mono">96.5% Paid</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">All Secondary Ledger Reconciled</p>
            </div>
          </div>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};

export const SecondaryRegistrarPortal: React.FC = () => {
  const service = SecondaryService.getInstance();
  const [students, setStudents] = useState<SecondaryStudent[]>(service.getStudents());
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('Senior One');
  const [guardian, setGuardian] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    service.registerStudent({ name, class: studentClass, guardian });
    setStudents([...service.getStudents()]);
    setShowModal(false);
    setName('');
  };

  return (
    <PortalAuthenticationGate
      portalId="secondary-registrar"
      portalName="Secondary Registrar & UNEB Center Administration"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_SECONDARY_REGISTRAR', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-slate-900">Registrar Office & Student Information (SIS)</h2>
              <p className="text-xs text-slate-500">Student enrollment, LIN verification, UCE/UACE registration & index numbers.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
          >
            Register Student
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Guardian</th>
                <th className="px-6 py-4 text-right">Fee Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-xs font-bold">{s.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{s.name}</td>
                  <td className="px-6 py-4 text-slate-600">{s.class}</td>
                  <td className="px-6 py-4 text-slate-600">{s.guardian}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-rose-600">{s.feeBalance.toLocaleString()} UGX</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">New Secondary Student Admission</h3>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Class</label>
                    <select value={studentClass} onChange={e => setStudentClass(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm">
                      <option>Senior One</option>
                      <option>Senior Two</option>
                      <option>Senior Three</option>
                      <option>Senior Four</option>
                      <option>Senior Five</option>
                      <option>Senior Six</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Guardian</label>
                    <input value={guardian} onChange={e => setGuardian(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm">Admit Student</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const SecondaryDosPortal: React.FC = () => {
  return (
    <PortalAuthenticationGate
      portalId="secondary-dos"
      portalName="DOS Academic & Subject Combination Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_SECONDARY_DOS', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <BookOpen className="w-8 h-8 text-emerald-600" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Academic Director (DOS) & Gradebook</h2>
            <p className="text-xs text-slate-500">O/A Level subject combinations, NCDC curriculum tracking & teacher workloads.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Microscope className="w-4 h-4 text-rose-600" />
              A-Level Subject Combinations
            </h3>
            <p className="text-[10px] text-slate-500">Benchmark monitoring for PCM, BCM, HEG, and Arts/Science clusters.</p>
            <div className="grid grid-cols-2 gap-2">
              {['PCM/Sub-Math', 'BCM/Sub-ICT', 'PEM/Sub-Math', 'HEG/Sub-ICT'].map(c => (
                <div key={c} className="p-2 border border-slate-100 rounded-lg text-center font-mono text-[10px] font-bold text-slate-700 bg-slate-50">
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-emerald-600" />
              Teacher Performance & Gradebook
            </h3>
            <p className="text-[10px] text-slate-500">Automated marksheet generation and NCDC competency tracking.</p>
            <div className="pt-2">
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[85%]" />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Marks Entry Progress</span>
                <span className="text-[10px] text-emerald-600 font-black">85% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};

export const SecondaryBursarPortal: React.FC = () => {
  const service = SecondaryService.getInstance();
  const [students, setStudents] = useState<SecondaryStudent[]>(service.getStudents());
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<SecondaryStudent | null>(null);
  const [payAmount, setPayAmount] = useState<number>(0);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudent && payAmount > 0) {
      service.collectFee(selectedStudent.id, payAmount, 'Tuition');
      setStudents([...service.getStudents()]);
      setShowModal(false);
      setSelectedStudent(null);
      setPayAmount(0);
    }
  };

  return (
    <PortalAuthenticationGate
      portalId="secondary-bursar"
      portalName="Secondary Bursar & FAAP Financial Ledger"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_SECONDARY_BURSAR', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <Calculator className="w-8 h-8 text-amber-600" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Secondary Bursar Office (FAAP Integrated)</h2>
            <p className="text-xs text-slate-500">Boarding fees, science lab fees, UCE/UACE registration fees & staff payroll ledger.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outstanding Secondary Fees</span>
              <TrendingUp className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-3xl font-black text-rose-600 font-mono tracking-tight">
              {students.reduce((acc, s) => acc + s.feeBalance, 0).toLocaleString()} UGX
            </p>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Synced with FAAP General Ledger</span>
              <span className="text-emerald-600 font-black">REAL-TIME</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4 text-right">Balance</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">{s.name}</td>
                  <td className="px-6 py-4 text-slate-600">{s.class}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-rose-600">{s.feeBalance.toLocaleString()} UGX</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => { setSelectedStudent(s); setShowModal(true); }}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700"
                    >
                      Process Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && selectedStudent && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Process Fee — {selectedStudent.name}</h3>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Amount (UGX)</label>
                  <input type="number" value={payAmount || ''} onChange={e => setPayAmount(Number(e.target.value))} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-mono font-bold" />
                </div>
                <button type="submit" className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold text-sm">Post to FAAP Ledger</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalAuthenticationGate>
  );
};
