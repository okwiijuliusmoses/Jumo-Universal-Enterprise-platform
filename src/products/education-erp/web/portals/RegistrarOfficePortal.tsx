import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { DynamicWorkingTable, FieldDefinition, ColumnConfig, PermissionMetadata } from '../../../../core/enterprise/components/DynamicWorkingTable';

interface StudentRecord {
  id: string;
  name: string;
  class: string;
  gender: string;
  status: string;
  type: string;
}

export const RegistrarOfficePortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STUDENTS' | 'ADMISSIONS'>('STUDENTS');
  const [students, setStudents] = useState<StudentRecord[]>([
    { id: 'LIN-2026-0891', name: 'Okello Brian', class: 'S.4 East', gender: 'Male', status: 'ACTIVE', type: 'Boarding' },
    { id: 'LIN-2026-0892', name: 'Nassali Juliet', class: 'S.4 West', gender: 'Female', status: 'ACTIVE', type: 'Day' },
    { id: 'LIN-2026-0893', name: 'Tumwine Arthur', class: 'S.3 North', gender: 'Male', status: 'ACTIVE', type: 'Boarding' },
    { id: 'LIN-2026-0894', name: 'Achieng Mary', class: 'S.1 East', gender: 'Female', status: 'ACTIVE', type: 'Boarding' }
  ]);

  const fields: FieldDefinition[] = [
    { key: 'id', label: 'LIN / REG NO', type: 'text', editable: false },
    { key: 'name', label: 'Student Name', type: 'text', required: true, placeholder: 'Enter student full name...' },
    { key: 'class', label: 'Class / Stream', type: 'text', required: true, placeholder: 'e.g. S.4 East' },
    { 
      key: 'gender', 
      label: 'Gender', 
      type: 'select', 
      required: true,
      options: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
      ]
    },
    { 
      key: 'type', 
      label: 'Student Type', 
      type: 'select', 
      required: true,
      options: [
        { label: 'Boarding Section', value: 'Boarding' },
        { label: 'Day Section', value: 'Day' }
      ]
    },
    {
      key: 'status',
      label: 'Enrollment Status',
      type: 'badge',
      required: true,
      defaultValue: 'ACTIVE',
      options: [
        { label: 'Active Enrolled', value: 'ACTIVE', colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        { label: 'On Hold', value: 'PENDING', colorClass: 'bg-amber-50 text-amber-700 border-amber-200' },
        { label: 'Withdrawn', value: 'INACTIVE', colorClass: 'bg-rose-50 text-rose-700 border-rose-200' }
      ]
    }
  ];

  const columns: ColumnConfig<StudentRecord>[] = [
    { key: 'id', header: 'LIN / REG NO', sortable: true, className: 'font-mono text-slate-500 text-xs font-bold' },
    { key: 'name', header: 'Student Name', sortable: true, className: 'font-bold text-slate-900 text-xs' },
    { key: 'class', header: 'Class / Stream', sortable: true, className: 'text-indigo-700 text-xs font-semibold' },
    { key: 'gender', header: 'Gender', sortable: true, className: 'text-slate-600 text-xs' },
    { key: 'type', header: 'Type', sortable: true, className: 'text-slate-600 text-xs font-mono' },
    { key: 'status', header: 'Status', sortable: true }
  ];

  const permissions: PermissionMetadata = {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canExport: true,
    currentUserRole: 'REGISTRAR'
  };

  const handleCreate = (values: any) => {
    const newRecord: StudentRecord = {
      id: `LIN-2026-${String(students.length + 895).padStart(4, '0')}`,
      name: values.name,
      class: values.class,
      gender: values.gender,
      type: values.type,
      status: values.status
    };
    setStudents(prev => [newRecord, ...prev]);
  };

  const handleUpdate = (id: string | number, values: any) => {
    setStudents(prev => prev.map(item => item.id === id ? { ...item, ...values } : item));
  };

  const handleDelete = (id: string | number) => {
    setStudents(prev => prev.filter(item => item.id !== id));
  };

  const handleBulkAction = (ids: (string | number)[], action: string) => {
    if (action === 'TOGGLE_BOARDING') {
      setStudents(prev => prev.map(item => ids.includes(item.id) ? { ...item, type: 'Boarding' } : item));
    } else if (action === 'TOGGLE_DAY') {
      setStudents(prev => prev.map(item => ids.includes(item.id) ? { ...item, type: 'Day' } : item));
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden pb-12 animate-in fade-in duration-300">
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">REGISTRAR & ADMISSIONS</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                LIN VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Student Registration • Bio-Data Management • Termly Enrollment
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 divide-x divide-slate-200 bg-white">
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Total Enrollment</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">{(students.length + 1244).toLocaleString()} Students</span>
          <span className="text-[10px] text-emerald-600 font-medium">+42 this academic year</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Boarding vs Day</span>
          <span className="text-lg font-bold text-indigo-700 mt-1 block">
            {students.filter(s => s.type === 'Boarding').length + 846} / {students.filter(s => s.type === 'Day').length + 398}
          </span>
          <span className="text-[10px] text-slate-500">Boarding Majority (68%)</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Gender Parity Ratio</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">
            {students.filter(s => s.gender === 'Male').length + 600} Boys / {students.filter(s => s.gender === 'Female').length + 644} Girls
          </span>
          <span className="text-[10px] text-slate-500">Female majority (52%)</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">UNEB Candidates</span>
          <span className="text-lg font-bold text-rose-700 mt-1 block">214 Registered</span>
          <span className="text-[10px] text-rose-600 font-medium">S.4 (120) • S.6 (94)</span>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('STUDENTS')}
          className={`py-3 border-b-2 transition cursor-pointer ${activeTab === 'STUDENTS' ? 'border-indigo-600 text-indigo-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Master Student Nominal Roll
        </button>
        <button
          onClick={() => setActiveTab('ADMISSIONS')}
          className={`py-3 border-b-2 transition cursor-pointer ${activeTab === 'ADMISSIONS' ? 'border-indigo-600 text-indigo-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          New Admissions Pipeline
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'STUDENTS' ? (
          <DynamicWorkingTable<StudentRecord>
            title="Master Student Nominal Roll"
            subtitle="Centralised National Identification (LIN) matched registrar roster"
            data={students}
            fields={fields}
            columns={columns}
            permissions={permissions}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onBulkAction={handleBulkAction}
            bulkActions={[
              { label: 'Transfer to Boarding', value: 'TOGGLE_BOARDING', className: 'text-indigo-600 font-black' },
              { label: 'Transfer to Day', value: 'TOGGLE_DAY', className: 'text-slate-600' }
            ]}
            accentColor="indigo"
          />
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300 animate-fade-in">
            <Users className="w-10 h-10 text-slate-400 mx-auto mb-2 animate-bounce" />
            <h3 className="text-sm font-bold text-slate-800">Admissions Pipeline</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Select Master Student Nominal Roll to view the actual data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
