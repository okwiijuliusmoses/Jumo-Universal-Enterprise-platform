import React, { useState } from 'react';
import { BookOpen, Calendar, Clipboard, TrendingUp, Search, FileText } from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

interface ClassRecord {
  id: string;
  name: string;
  teacher: string;
  enrolled: number;
  coverage: number;
  status: 'ON_TRACK' | 'BEHIND';
}

export const PrimaryDosPortal: React.FC = () => {
  const [classes, setClasses] = useState<ClassRecord[]>([
    { id: 'C-001', name: 'P.7 Blue', teacher: 'Tr. Musoke', enrolled: 48, coverage: 92, status: 'ON_TRACK' },
    { id: 'C-002', name: 'P.7 Green', teacher: 'Tr. Nabirye', enrolled: 45, coverage: 88, status: 'ON_TRACK' },
    { id: 'C-003', name: 'P.6 Blue', teacher: 'Tr. Okello', enrolled: 52, coverage: 75, status: 'BEHIND' },
    { id: 'C-004', name: 'P.6 Green', teacher: 'Tr. Kato', enrolled: 50, coverage: 82, status: 'ON_TRACK' },
    { id: 'C-005', name: 'P.5 Blue', teacher: 'Tr. Babirye', enrolled: 49, coverage: 70, status: 'BEHIND' },
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleCreateClass = (data: any) => {
    const newRecord: ClassRecord = {
      id: `C-${String(classes.length + 1).padStart(3, '0')}`,
      name: data.name,
      teacher: data.teacher,
      enrolled: Number(data.enrolled),
      coverage: 0,
      status: 'ON_TRACK'
    };
    setClasses([...classes, newRecord]);
    setShowForm(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Primary Director of Studies</h2>
            <p className="text-xs text-slate-500">P.1 - P.7 Curriculum & Assessment</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
        >
          <BookOpen className="w-4 h-4" /> Add Class
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Total Enrolled</p>
              <p className="text-xl font-bold text-slate-900">{classes.reduce((acc, c) => acc + c.enrolled, 0)}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Active Subjects</p>
              <p className="text-xl font-bold text-slate-900">4 Core</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Clipboard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Assessments Due</p>
              <p className="text-xl font-bold text-slate-900">End of Term</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Academic Term</p>
              <p className="text-xl font-bold text-slate-900">Term 3, 2026</p>
            </div>
          </div>
        </div>

        <JumoDataTable<ClassRecord>
          data={classes}
          title="Class Performance Overview"
          columns={[
            { header: 'Class ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Class Stream', accessor: 'name', className: 'font-medium' },
            { header: 'Class Teacher', accessor: 'teacher' },
            { header: 'Enrolled', accessor: 'enrolled' },
            { 
              header: 'Syllabus Coverage', 
              accessor: (c) => (
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.coverage >= 80 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${c.coverage}%` }}></div>
                  </div>
                  <span className="text-xs text-slate-500">{c.coverage}%</span>
                </div>
              ) 
            },
            { 
              header: 'Status', 
              accessor: (c) => (
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${c.status === 'ON_TRACK' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {c.status.replace('_', ' ')}
                </span>
              ) 
            }
          ]}
          actions={(c) => (
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 bg-blue-50 px-2 py-1 rounded">
              View Grades
            </button>
          )}
        />

        {showForm && (
          <JumoForm
            title="Add New Class Stream"
            fields={[
              { id: 'name', label: 'Class Stream Name (e.g. P.4 Yellow)', type: 'text', required: true },
              { id: 'teacher', label: 'Assigned Class Teacher', type: 'text', required: true },
              { id: 'enrolled', label: 'Initial Enrollment', type: 'number', required: true }
            ]}
            onSubmit={handleCreateClass}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};
