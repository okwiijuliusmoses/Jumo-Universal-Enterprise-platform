import React, { useState } from 'react';
import { BookOpen, Calendar, Plus } from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

interface SubjectCombination {
  id: string;
  code: string;
  subjects: string;
  category: 'SCIENCE' | 'ARTS';
  students: number;
}

export const SecondaryHodPortal: React.FC = () => {
  const [combinations, setCombinations] = useState<SubjectCombination[]>([
    { id: 'C-001', code: 'PCM/ICT', subjects: 'Physics, Chemistry, Mathematics, ICT', category: 'SCIENCE', students: 45 },
    { id: 'C-002', code: 'PCB/SUB', subjects: 'Physics, Chemistry, Biology, Sub-Math', category: 'SCIENCE', students: 50 },
    { id: 'C-003', code: 'HEG/ICT', subjects: 'History, Economics, Geography, ICT', category: 'ARTS', students: 60 },
    { id: 'C-004', code: 'MEG/ICT', subjects: 'Mathematics, Economics, Geography, ICT', category: 'ARTS', students: 35 },
    { id: 'C-005', code: 'HEL/SUB', subjects: 'History, Economics, Literature, Sub-Math', category: 'ARTS', students: 40 },
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleCreateCombination = (data: any) => {
    const newRecord: SubjectCombination = {
      id: `C-${String(combinations.length + 1).padStart(3, '0')}`,
      code: data.code,
      subjects: data.subjects,
      category: data.category,
      students: 0
    };
    setCombinations([...combinations, newRecord]);
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
            <h2 className="text-lg font-bold text-slate-900">Director of Studies (DOS)</h2>
            <p className="text-xs text-slate-500">Combinations, Timetabling & Exams</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Combination
        </button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Active Combinations</p>
              <p className="text-xl font-bold text-slate-900">{combinations.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Upcoming Exams</p>
              <p className="text-xl font-bold text-slate-900">Mocks (Next Week)</p>
            </div>
          </div>
        </div>

        <JumoDataTable<SubjectCombination>
          data={combinations}
          title="A-Level Academic Combinations"
          columns={[
            { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Combination Code', accessor: 'code', className: 'font-bold text-slate-900' },
            { header: 'Subjects', accessor: 'subjects' },
            { 
              header: 'Category', 
              accessor: (c) => (
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${c.category === 'SCIENCE' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                  {c.category}
                </span>
              ) 
            },
            { header: 'Enrolled Students', accessor: 'students' }
          ]}
          actions={() => (
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 bg-blue-50 px-2 py-1 rounded">
              Timetable
            </button>
          )}
        />

        {showForm && (
          <JumoForm
            title="Add Academic Combination"
            fields={[
              { id: 'code', label: 'Combination Code (e.g. PCM/ICT)', type: 'text', required: true },
              { id: 'category', label: 'Stream / Category', type: 'select', required: true, options: [
                { value: 'SCIENCE', label: 'Sciences' },
                { value: 'ARTS', label: 'Arts' }
              ] },
              { id: 'subjects', label: 'Full Subjects List', type: 'text', required: true }
            ]}
            onSubmit={handleCreateCombination}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};
