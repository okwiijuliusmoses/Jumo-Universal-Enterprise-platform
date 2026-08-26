import React, { useState } from 'react';
import { Heart, MessageSquare, Plus, CheckCircle, Clock, Calendar } from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

interface CounselingSession {
  id: string;
  member: string;
  topic: string;
  date: string;
  time: string;
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

export const ChurchPastorPortal: React.FC = () => {
  const [sessions, setSessions] = useState<CounselingSession[]>([
    { id: 'CS-001', member: 'Sarah N.', topic: 'Marriage Counseling', date: new Date().toISOString().split('T')[0], time: '10:00 AM', status: 'CONFIRMED' },
    { id: 'CS-002', member: 'David & Alice K.', topic: 'Pre-Marital Classes', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '14:00 PM', status: 'CONFIRMED' },
    { id: 'CS-003', member: 'Peter O.', topic: 'Spiritual Growth', date: new Date(Date.now() + 172800000).toISOString().split('T')[0], time: '09:00 AM', status: 'PENDING' }
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleSchedule = (data: any) => {
    const newRecord: CounselingSession = {
      id: `CS-${String(sessions.length + 1).padStart(3, '0')}`,
      member: data.member,
      topic: data.topic,
      date: data.date,
      time: data.time,
      status: 'PENDING',
      notes: data.notes
    };
    setSessions([newRecord, ...sessions]);
    setShowForm(false);
  };

  const handleStatusChange = (id: string, newStatus: CounselingSession['status']) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const upcomingCount = sessions.filter(s => s.status === 'CONFIRMED' || s.status === 'PENDING').length;

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Pastor's Office</h2>
            <p className="text-xs text-slate-500">Spiritual Guidance, Pastoral Care & Counseling</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Schedule Session
        </button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Upcoming Sessions</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{upcomingCount}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Completed This Month</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{sessions.filter(s => s.status === 'COMPLETED').length + 14}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Hours Administered</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">42.5 hrs</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        <JumoDataTable<CounselingSession>
          data={sessions}
          title="Counseling & Visitation Log"
          columns={[
            { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-500' },
            { header: 'Member/Family', accessor: 'member', className: 'font-medium' },
            { header: 'Topic', accessor: 'topic' },
            { header: 'Date', accessor: (s) => <span className="font-medium text-slate-700">{s.date}</span> },
            { header: 'Time', accessor: 'time' },
            { 
              header: 'Status', 
              accessor: (s) => (
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${
                  s.status === 'COMPLETED' ? 'bg-slate-100 text-slate-600' :
                  s.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' :
                  s.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {s.status}
                </span>
              ) 
            }
          ]}
          actions={(s) => (
            <div className="flex gap-2">
              {s.status === 'PENDING' && (
                <button 
                  onClick={() => handleStatusChange(s.id, 'CONFIRMED')}
                  className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-800 bg-emerald-50 px-2 py-1 rounded"
                >
                  Confirm
                </button>
              )}
              {s.status === 'CONFIRMED' && (
                <button 
                  onClick={() => handleStatusChange(s.id, 'COMPLETED')}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 bg-blue-50 px-2 py-1 rounded"
                >
                  Complete
                </button>
              )}
            </div>
          )}
        />

        {showForm && (
          <JumoForm
            title="Schedule Counseling Session"
            fields={[
              { id: 'member', label: 'Member or Family Name', type: 'text', required: true },
              { id: 'topic', label: 'Counseling Topic', type: 'select', required: true, options: [
                { value: 'Marriage Counseling', label: 'Marriage Counseling' },
                { value: 'Pre-Marital Classes', label: 'Pre-Marital Classes' },
                { value: 'Bereavement/Grief', label: 'Bereavement/Grief' },
                { value: 'Spiritual Growth', label: 'Spiritual Growth' },
                { value: 'Youth Counseling', label: 'Youth Counseling' },
                { value: 'General Consultation', label: 'General Consultation' }
              ] },
              { id: 'date', label: 'Date', type: 'date', required: true },
              { id: 'time', label: 'Time', type: 'text', required: true, placeholder: 'e.g. 10:00 AM' },
              { id: 'notes', label: 'Preliminary Notes (Optional)', type: 'textarea' }
            ]}
            onSubmit={handleSchedule}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};
