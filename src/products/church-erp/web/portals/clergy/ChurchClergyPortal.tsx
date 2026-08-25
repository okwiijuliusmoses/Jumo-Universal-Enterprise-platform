import React, { useState } from 'react';
import { Users, Plus, ShieldCheck } from 'lucide-react';
import ChurchPeopleService, { ClergyRecord, ChurchMember } from '../../../domain/ChurchPeopleService';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

export const ChurchClergyPortal: React.FC = () => {
  const service = ChurchPeopleService.getInstance();
  const [clergy, setClergy] = useState<(ClergyRecord & { member: ChurchMember })[]>(service.getClergy());
  const members = service.getMembers();
  const [showForm, setShowForm] = useState(false);

  const handleRegister = (data: any) => {
    service.addClergy({
      memberId: data.memberId,
      title: data.title,
      role: data.role,
      ordinationDate: data.ordinationDate,
      currentAssignment: data.currentAssignment,
      status: 'ACTIVE'
    });
    setClergy([...service.getClergy()]);
    setShowForm(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Clergy & Staff HR</h2>
            <p className="text-xs text-slate-500">Deployments, Roles & Assignments</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Clergy/Staff
        </button>
      </div>
      
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <JumoDataTable<ClergyRecord & { member: ChurchMember }>
          data={clergy}
          title="Clergy & Lay Staff Register"
          columns={[
            { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { 
              header: 'Name & Title', 
              accessor: (c) => (
                <div className="flex items-center gap-3">
                  <span className="font-bold">{c.title} {c.member.firstName} {c.member.lastName}</span>
                </div>
              ) 
            },
            { header: 'Role', accessor: 'role', className: 'font-medium' },
            { header: 'Current Assignment', accessor: 'currentAssignment' },
            { header: 'Ordination/Start', accessor: 'ordinationDate', className: 'font-mono text-xs text-slate-500' },
            { 
              header: 'Status', 
              accessor: (c) => (
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase \${c.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {c.status}
                </span>
              ) 
            }
          ]}
        />
        
        {showForm && (
          <JumoForm
            title="Deploy New Clergy / Staff"
            fields={[
              { 
                id: 'memberId', 
                label: 'Select Member (Must be registered)', 
                type: 'select', 
                required: true, 
                options: members.map(m => ({ value: m.id, label: `\${m.firstName} \${m.lastName} (\${m.id})` }))
              },
              { id: 'title', label: 'Title', type: 'select', required: true, options: [
                { value: 'Rev.', label: 'Reverend' },
                { value: 'Canon', label: 'Canon' },
                { value: 'Bishop', label: 'Bishop' },
                { value: 'Lay Reader', label: 'Lay Reader' },
                { value: 'Mr.', label: 'Mr.' },
                { value: 'Mrs.', label: 'Mrs.' },
                { value: 'Ms.', label: 'Ms.' }
              ]},
              { id: 'role', label: 'Role / Designation', type: 'text', required: true, placeholder: 'e.g. Vicar, Youth Pastor, Admin' },
              { id: 'currentAssignment', label: 'Current Assignment (Parish/Office)', type: 'text', required: true },
              { id: 'ordinationDate', label: 'Ordination / Start Date', type: 'date', required: true }
            ]}
            onSubmit={handleRegister}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};
