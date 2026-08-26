import React, { useState } from 'react';
import { Users, Plus, CheckCircle, Search } from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

interface AdmissionRecord {
  id: string;
  name: string;
  level: string;
  prevSchool: string;
  score: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export const SecondaryRegistrarPortal: React.FC = () => {
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>([
    { id: 'ADM-2026-001', name: 'James Kigozi', level: 'S.1', prevSchool: 'Kampala Parents', score: 'Agg 4', status: 'APPROVED' },
    { id: 'ADM-2026-002', name: 'Sarah Nakato', level: 'S.1', prevSchool: 'Greenhill Academy', score: 'Agg 5', status: 'APPROVED' },
    { id: 'ADM-2026-003', name: 'David Opio', level: 'S.5 (Science)', prevSchool: 'St. Marys Kitende', score: 'Agg 12', status: 'PENDING' },
    { id: 'ADM-2026-004', name: 'Joy Namukasa', level: 'S.5 (Arts)', prevSchool: 'Gayaza High', score: 'Agg 15', status: 'PENDING' },
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleCreateAdmission = (data: any) => {
    const newRecord: AdmissionRecord = {
      id: `ADM-2026-${String(admissions.length + 1).padStart(3, '0')}`,
      name: data.name,
      level: data.level,
      prevSchool: data.prevSchool,
      score: data.score,
      status: 'PENDING'
    };
    setAdmissions([newRecord, ...admissions]);
    setShowForm(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Registrar & Admissions</h2>
            <p className="text-xs text-slate-500">S.1 & S.5 Intake, UNEB Records</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Application
        </button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500">Total Applications</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{admissions.length + 420}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500">S.1 Intake Target</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">350</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500">S.5 Intake Target</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">200</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm bg-emerald-50">
            <p className="text-xs font-medium text-emerald-700">Approved Admissions</p>
            <p className="text-2xl font-bold text-emerald-900 mt-1">{admissions.filter(a => a.status === 'APPROVED').length + 380}</p>
          </div>
        </div>

        <JumoDataTable<AdmissionRecord>
          data={admissions}
          title="New Admissions Pipeline"
          columns={[
            { header: 'App ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Applicant Name', accessor: 'name', className: 'font-medium' },
            { header: 'Target Level', accessor: 'level' },
            { header: 'Previous School', accessor: 'prevSchool' },
            { header: 'UNEB Score', accessor: 'score', className: 'font-bold' },
            { 
              header: 'Status', 
              accessor: (a) => (
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${a.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : a.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {a.status}
                </span>
              ) 
            }
          ]}
          actions={(a) => a.status === 'PENDING' ? (
            <div className="space-x-2">
              <button 
                onClick={() => setAdmissions(admissions.map(x => x.id === a.id ? { ...x, status: 'APPROVED' } : x))}
                className="text-[10px] font-black text-emerald-600 uppercase hover:text-emerald-800"
              >
                Approve
              </button>
              <button 
                onClick={() => setAdmissions(admissions.map(x => x.id === a.id ? { ...x, status: 'REJECTED' } : x))}
                className="text-[10px] font-black text-rose-600 uppercase hover:text-rose-800"
              >
                Reject
              </button>
            </div>
          ) : null}
        />

        {showForm && (
          <JumoForm
            title="Register New Applicant"
            fields={[
              { id: 'name', label: 'Applicant Name', type: 'text', required: true },
              { id: 'level', label: 'Admission Level', type: 'select', required: true, options: [
                { value: 'S.1', label: 'Senior One (S.1)' },
                { value: 'S.2', label: 'Senior Two (S.2)' },
                { value: 'S.3', label: 'Senior Three (S.3)' },
                { value: 'S.5 (Science)', label: 'Senior Five (S.5 - Sciences)' },
                { value: 'S.5 (Arts)', label: 'Senior Five (S.5 - Arts)' }
              ] },
              { id: 'prevSchool', label: 'Previous School', type: 'text', required: true },
              { id: 'score', label: 'UNEB Score (PLE / UCE)', type: 'text', required: true }
            ]}
            onSubmit={handleCreateAdmission}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};
