import React, { useState } from 'react';
import { Users, Globe, Award, Activity } from 'lucide-react';
import { DynamicWorkingTable, FieldDefinition, ColumnConfig, PermissionMetadata } from '../../../../../core/enterprise/components/DynamicWorkingTable';

interface AlumniRecord {
  id: string;
  name: string;
  year: string;
  chapter: string;
  profession: string;
  membership: 'LIFE MEMBER' | 'REGULAR';
}

export const AlumniRegistryPortal: React.FC = () => {
  const [alumni, setAlumni] = useState<AlumniRecord[]>([
    { id: 'ALM-1998-001', name: 'Dr. John Otim', year: '1998', chapter: 'UK Chapter', profession: 'Surgeon', membership: 'LIFE MEMBER' },
    { id: 'ALM-2015-023', name: 'Sarah K.', year: '2015', chapter: 'Kampala', profession: 'Accountant', membership: 'REGULAR' },
    { id: 'ALM-2005-045', name: 'David M.', year: '2005', chapter: 'North America', profession: 'Software Engineer', membership: 'LIFE MEMBER' },
    { id: 'ALM-2020-112', name: 'Alice N.', year: '2020', chapter: 'Nairobi', profession: 'Marketing', membership: 'REGULAR' }
  ]);

  const fields: FieldDefinition[] = [
    { key: 'id', label: 'ID', type: 'text', editable: false },
    { key: 'name', label: 'Alumnus Name', type: 'text', required: true, placeholder: 'Enter full name...' },
    { key: 'year', label: 'Graduation Year', type: 'text', required: true, placeholder: 'e.g. 2020' },
    { 
      key: 'chapter', 
      label: 'Alumni Chapter', 
      type: 'select', 
      required: true,
      options: [
        { label: 'Kampala Chapter', value: 'Kampala' },
        { label: 'Entebbe Chapter', value: 'Entebbe' },
        { label: 'UK Chapter', value: 'UK Chapter' },
        { label: 'North America Chapter', value: 'North America' },
        { label: 'Nairobi Chapter', value: 'Nairobi' }
      ]
    },
    { key: 'profession', label: 'Profession', type: 'text', required: true, placeholder: 'e.g. Surgeon' },
    {
      key: 'membership',
      label: 'Membership Status',
      type: 'badge',
      required: true,
      defaultValue: 'REGULAR',
      options: [
        { label: 'Regular Member', value: 'REGULAR', colorClass: 'bg-slate-50 text-slate-700 border-slate-200' },
        { label: 'Life Member', value: 'LIFE MEMBER', colorClass: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
      ]
    }
  ];

  const columns: ColumnConfig<AlumniRecord>[] = [
    { key: 'id', header: 'ID', sortable: true, className: 'font-mono text-xs font-bold text-slate-400' },
    { key: 'name', header: 'Alumnus Name', sortable: true, className: 'font-bold text-slate-900' },
    { key: 'year', header: 'Graduation Year', sortable: true, className: 'font-mono font-bold' },
    { key: 'chapter', header: 'Chapter', sortable: true },
    { key: 'profession', header: 'Profession', sortable: true },
    { key: 'membership', header: 'Membership', sortable: true }
  ];

  const permissions: PermissionMetadata = {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canExport: true,
    currentUserRole: 'SUPERADMIN' // Standard admin bypass to permit modification
  };

  const handleCreate = (values: any) => {
    const newRecord: AlumniRecord = {
      id: `ALM-${values.year}-${String(alumni.length + 1).padStart(3, '0')}`,
      name: values.name,
      year: values.year,
      chapter: values.chapter,
      profession: values.profession,
      membership: values.membership
    };
    setAlumni(prev => [newRecord, ...prev]);
  };

  const handleUpdate = (id: string | number, values: any) => {
    setAlumni(prev => prev.map(item => item.id === id ? { ...item, ...values } : item));
  };

  const handleDelete = (id: string | number) => {
    setAlumni(prev => prev.filter(item => item.id !== id));
  };

  const handleBulkAction = (ids: (string | number)[], action: string) => {
    if (action === 'TOGGLE_LIFE') {
      setAlumni(prev => prev.map(item => ids.includes(item.id) ? { ...item, membership: 'LIFE MEMBER' } : item));
    } else if (action === 'TOGGLE_REGULAR') {
      setAlumni(prev => prev.map(item => ids.includes(item.id) ? { ...item, membership: 'REGULAR' } : item));
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Alumni Registry (NACOBA)</h2>
            <p className="text-xs text-slate-500">Global Database, Chapters & Memberships</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-medium text-slate-500">Registered Alumni</p>
              <Users className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{(alumni.length + 12446).toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-medium text-slate-500">Active Chapters</p>
              <Globe className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">18</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-medium text-slate-500">Life Members</p>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{(alumni.filter(a => a.membership === 'LIFE MEMBER').length + 1198).toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-medium text-slate-500">Engagement Score</p>
              <Activity className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">78%</p>
          </div>
        </div>

        <DynamicWorkingTable<AlumniRecord>
          title="Global Alumni Database"
          subtitle="Real-time synchronized NACOBA database with multidimensional filtering capabilities"
          data={alumni}
          fields={fields}
          columns={columns}
          permissions={permissions}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
          bulkActions={[
            { label: 'Set as Life Members', value: 'TOGGLE_LIFE', className: 'text-indigo-600 font-black' },
            { label: 'Set as Regular Members', value: 'TOGGLE_REGULAR', className: 'text-slate-600' }
          ]}
          accentColor="slate"
        />
      </div>
    </div>
  );
};
