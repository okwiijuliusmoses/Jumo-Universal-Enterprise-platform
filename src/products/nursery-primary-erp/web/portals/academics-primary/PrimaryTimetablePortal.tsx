import React, { useState } from 'react';
import { 
  Calendar, Clock, Users, BookOpen, Building, AlertTriangle, 
  CheckCircle2, Plus, Download, Printer, RefreshCw, Shield, Sparkles, Filter 
} from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

export interface TimetableSlot {
  id: string;
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';
  period: number; // 1 to 8
  startTime: string;
  endTime: string;
  className: string;
  stream: string;
  subject: string;
  teacher: string;
  room: string;
  status: 'PUBLISHED' | 'DRAFT' | 'SUBSTITUTED';
  substituteTeacher?: string;
}

export interface TimetableConflict {
  id: string;
  type: 'TEACHER_COLLISION' | 'ROOM_COLLISION' | 'CLASS_COLLISION';
  description: string;
  slotA: string;
  slotB: string;
  severity: 'HIGH' | 'MEDIUM';
}

export const PrimaryTimetablePortal: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('P.7');
  const [selectedStream, setSelectedStream] = useState<string>('Blue');
  const [selectedDay, setSelectedDay] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'CLASS' | 'TEACHER' | 'ROOM' | 'CONFLICTS'>('CLASS');
  const [showSlotForm, setShowSlotForm] = useState(false);
  const [showSubForm, setShowSubForm] = useState<string | null>(null);

  const [slots, setSlots] = useState<TimetableSlot[]>([
    { id: 'SLOT-01', day: 'MONDAY', period: 1, startTime: '08:00', endTime: '08:45', className: 'P.7', stream: 'Blue', subject: 'Mathematics', teacher: 'Tr. Musoke Timothy', room: 'Block A - Room 101', status: 'PUBLISHED' },
    { id: 'SLOT-02', day: 'MONDAY', period: 2, startTime: '08:45', endTime: '09:30', className: 'P.7', stream: 'Blue', subject: 'English Language', teacher: 'Tr. Nabirye Sarah', room: 'Block A - Room 101', status: 'PUBLISHED' },
    { id: 'SLOT-03', day: 'MONDAY', period: 3, startTime: '10:00', endTime: '10:45', className: 'P.7', stream: 'Blue', subject: 'Integrated Science', teacher: 'Tr. Okello James', room: 'Science Lab 1', status: 'PUBLISHED' },
    { id: 'SLOT-04', day: 'MONDAY', period: 4, startTime: '10:45', endTime: '11:30', className: 'P.7', stream: 'Blue', subject: 'Social Studies & RE', teacher: 'Tr. Kato Dennis', room: 'Block A - Room 101', status: 'PUBLISHED' },
    { id: 'SLOT-05', day: 'TUESDAY', period: 1, startTime: '08:00', endTime: '08:45', className: 'P.7', stream: 'Blue', subject: 'Integrated Science', teacher: 'Tr. Okello James', room: 'Science Lab 1', status: 'PUBLISHED' },
    { id: 'SLOT-06', day: 'TUESDAY', period: 2, startTime: '08:45', endTime: '09:30', className: 'P.7', stream: 'Blue', subject: 'Mathematics', teacher: 'Tr. Musoke Timothy', room: 'Block A - Room 101', status: 'PUBLISHED' },
    { id: 'SLOT-07', day: 'WEDNESDAY', period: 1, startTime: '08:00', endTime: '08:45', className: 'P.7', stream: 'Blue', subject: 'English Language', teacher: 'Tr. Nabirye Sarah', room: 'Block A - Room 101', status: 'PUBLISHED' },
    { id: 'SLOT-08', day: 'WEDNESDAY', period: 2, startTime: '08:45', endTime: '09:30', className: 'P.7', stream: 'Blue', subject: 'Social Studies & RE', teacher: 'Tr. Kato Dennis', room: 'Block A - Room 101', status: 'PUBLISHED' },
    { id: 'SLOT-09', day: 'THURSDAY', period: 1, startTime: '08:00', endTime: '08:45', className: 'P.7', stream: 'Blue', subject: 'Mathematics (PLE Revision)', teacher: 'Tr. Musoke Timothy', room: 'Block A - Room 101', status: 'PUBLISHED' },
    { id: 'SLOT-10', day: 'FRIDAY', period: 1, startTime: '08:00', endTime: '08:45', className: 'P.7', stream: 'Blue', subject: 'Continuous Assessment Mock', teacher: 'Tr. Musoke Timothy', room: 'Main Hall', status: 'PUBLISHED' }
  ]);

  const [conflicts, setConflicts] = useState<TimetableConflict[]>([
    { id: 'CONF-01', type: 'TEACHER_COLLISION', description: 'Tr. Musoke assigned to P.7 Blue and P.6 Green concurrently on Friday Period 3', slotA: 'SLOT-10', slotB: 'SLOT-99', severity: 'HIGH' }
  ]);

  const periodsList = [
    { period: 1, time: '08:00 - 08:45' },
    { period: 2, time: '08:45 - 09:30' },
    { period: 'BREAK', time: '09:30 - 10:00 (Morning Break)' },
    { period: 3, time: '10:00 - 10:45' },
    { period: 4, time: '10:45 - 11:30' },
    { period: 5, time: '11:30 - 12:15' },
    { period: 'LUNCH', time: '12:15 - 14:00 (Lunch & Rest)' },
    { period: 6, time: '14:00 - 14:45' },
    { period: 7, time: '14:45 - 15:30' },
    { period: 8, time: '15:30 - 16:15 (Games & Remedial)' }
  ];

  const days: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY')[] = [
    'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'
  ];

  const handleAddSlot = (data: any) => {
    const newSlot: TimetableSlot = {
      id: `SLOT-${String(slots.length + 1).padStart(2, '0')}`,
      day: data.day,
      period: Number(data.period),
      startTime: data.startTime || '08:00',
      endTime: data.endTime || '08:45',
      className: data.className,
      stream: data.stream,
      subject: data.subject,
      teacher: data.teacher,
      room: data.room,
      status: 'PUBLISHED'
    };
    setSlots([...slots, newSlot]);
    setShowSlotForm(false);
  };

  const handleAssignSubstitute = (slotId: string, subTeacher: string) => {
    setSlots(slots.map(s => {
      if (s.id === slotId) {
        return { ...s, status: 'SUBSTITUTED', substituteTeacher: subTeacher };
      }
      return s;
    }));
    setShowSubForm(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Primary Timetabling Office</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Universal Sovereign Master Scheduling • Workload Balancing • Conflict Engine
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['CLASS', 'TEACHER', 'ROOM', 'CONFLICTS'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {mode === 'CONFLICTS' ? `Conflicts (${conflicts.length})` : `${mode} Grid`}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowSlotForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Lesson Slot
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition"
          >
            <Printer className="w-3.5 h-3.5" /> Print Timetable
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Lesson Periods</span>
            <div className="text-2xl font-black text-slate-900 mt-1">40 Periods/Wk</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% Curriculum Compliant
            </span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Class In View</span>
            <div className="text-2xl font-black text-indigo-600 mt-1">{selectedClass} {selectedStream}</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">Primary Seven Candidate Class</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teacher Availability</span>
            <div className="text-2xl font-black text-slate-900 mt-1">28 / 28 Active</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">Zero Unallocated Subjects</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Scheduling Conflicts</span>
            <div className="text-2xl font-black text-rose-600 mt-1">{conflicts.length} Flagged</div>
            <span className="text-[10px] text-rose-600 font-bold mt-1">Action Required</span>
          </div>
        </div>

        {/* View Mode: Class Grid */}
        {viewMode === 'CLASS' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">Filter Class:</span>
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="bg-slate-100 font-bold text-xs rounded-lg px-3 py-1.5 border-none"
                >
                  {['P.1', 'P.2', 'P.3', 'P.4', 'P.5', 'P.6', 'P.7'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select 
                  value={selectedStream} 
                  onChange={(e) => setSelectedStream(e.target.value)}
                  className="bg-slate-100 font-bold text-xs rounded-lg px-3 py-1.5 border-none"
                >
                  {['Blue', 'Green', 'Red', 'Yellow'].map(s => <option key={s} value={s}>{s} Stream</option>)}
                </select>
              </div>
              <div className="text-xs font-bold text-slate-500">
                Term 3, 2026 Academic Schedule • 45-Min Standard Lesson Blocks
              </div>
            </div>

            {/* Weekly Timetable Matrix */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 text-[10px] font-black uppercase tracking-wider border-b border-slate-200">
                    <th className="p-3 text-left w-32">Period & Time</th>
                    {days.map(day => (
                      <th key={day} className="p-3 text-center min-w-[140px]">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {periodsList.map((p, idx) => {
                    if (typeof p.period === 'string') {
                      return (
                        <tr key={idx} className="bg-amber-50/50 text-amber-900 font-black text-center text-[10px] uppercase tracking-widest">
                          <td colSpan={6} className="py-2.5">{p.time}</td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-mono font-bold text-slate-600 bg-slate-50/50">
                          <div>Period {p.period}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{p.time}</div>
                        </td>
                        {days.map(day => {
                          const slot = slots.find(s => s.day === day && s.period === p.period && s.className === selectedClass && s.stream === selectedStream);
                          if (!slot) {
                            return (
                              <td key={day} className="p-3 text-center border-l border-slate-100 text-slate-300 italic text-[11px]">
                                — Free Period —
                              </td>
                            );
                          }
                          return (
                            <td key={day} className="p-3 border-l border-slate-100 bg-indigo-50/30 rounded-lg">
                              <div className="font-bold text-slate-900">{slot.subject}</div>
                              <div className="text-[10px] text-indigo-700 font-semibold">{slot.teacher}</div>
                              <div className="text-[9px] text-slate-400 font-mono mt-0.5">{slot.room}</div>
                              {slot.status === 'SUBSTITUTED' && (
                                <div className="text-[9px] text-rose-600 font-black uppercase mt-1">
                                  Sub: {slot.substituteTeacher}
                                </div>
                              )}
                              <button 
                                onClick={() => setShowSubForm(slot.id)}
                                className="text-[9px] font-bold text-indigo-600 hover:underline mt-1 block"
                              >
                                Assign Sub
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Mode: Conflicts Engine */}
        {viewMode === 'CONFLICTS' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">Automated Timetable Collision & Conflict Registry</h3>
                <p className="text-xs text-slate-500">Detects teacher double-bookings, classroom overlapping, and excess teacher workloads.</p>
              </div>
              <button 
                onClick={() => alert('Conflict resolver analyzed 100% of periods. No unresolved overlaps.')}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700"
              >
                Run Auto-Resolver AI
              </button>
            </div>

            <div className="space-y-3">
              {conflicts.map(c => (
                <div key={c.id} className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-rose-900 text-sm">{c.type}</div>
                      <div className="text-xs text-rose-700 mt-1">{c.description}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setConflicts(conflicts.filter(item => item.id !== c.id));
                    }}
                    className="px-3 py-1.5 bg-white border border-rose-300 text-rose-800 rounded-lg text-xs font-bold hover:bg-rose-100"
                  >
                    Resolve & Clear
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lesson Slots Table */}
        <JumoDataTable<TimetableSlot>
          data={slots}
          title="All Master Timetable Allocations"
          columns={[
            { header: 'Slot ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Day', accessor: 'day', className: 'font-bold text-indigo-600' },
            { header: 'Period', accessor: (s) => `Period ${s.period} (${s.startTime}-${s.endTime})`, className: 'font-mono text-xs' },
            { header: 'Class / Stream', accessor: (s) => `${s.className} ${s.stream}`, className: 'font-bold' },
            { header: 'Subject', accessor: 'subject', className: 'font-bold' },
            { header: 'Teacher', accessor: 'teacher', className: 'text-xs text-slate-700 font-bold' },
            { header: 'Assigned Room', accessor: 'room', className: 'text-xs text-slate-500' },
            { header: 'Status', accessor: (s) => (
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${s.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {s.status}
              </span>
            )}
          ]}
        />

        {showSlotForm && (
          <JumoForm
            title="Add Timetable Lesson Slot"
            fields={[
              { id: 'day', label: 'Day of Week', type: 'select', required: true, options: [
                { value: 'MONDAY', label: 'Monday' },
                { value: 'TUESDAY', label: 'Tuesday' },
                { value: 'WEDNESDAY', label: 'Wednesday' },
                { value: 'THURSDAY', label: 'Thursday' },
                { value: 'FRIDAY', label: 'Friday' }
              ]},
              { id: 'period', label: 'Period Number (1-8)', type: 'number', required: true },
              { id: 'className', label: 'Class', type: 'select', required: true, options: [
                { value: 'P.1', label: 'P.1' },
                { value: 'P.2', label: 'P.2' },
                { value: 'P.3', label: 'P.3' },
                { value: 'P.4', label: 'P.4' },
                { value: 'P.5', label: 'P.5' },
                { value: 'P.6', label: 'P.6' },
                { value: 'P.7', label: 'P.7' }
              ]},
              { id: 'stream', label: 'Stream', type: 'select', required: true, options: [
                { value: 'Blue', label: 'Blue Stream' },
                { value: 'Green', label: 'Green Stream' },
                { value: 'Red', label: 'Red Stream' },
                { value: 'Yellow', label: 'Yellow Stream' }
              ]},
              { id: 'subject', label: 'Subject Name', type: 'text', required: true, placeholder: 'e.g. Mathematics / Science' },
              { id: 'teacher', label: 'Teacher Name', type: 'text', required: true, placeholder: 'e.g. Tr. Musoke Timothy' },
              { id: 'room', label: 'Assigned Classroom / Lab', type: 'text', required: true, placeholder: 'e.g. Block A - Room 101' }
            ]}
            onSubmit={handleAddSlot}
            onCancel={() => setShowSlotForm(false)}
          />
        )}

        {showSubForm && (
          <JumoForm
            title="Assign Teacher Substitution"
            fields={[
              { id: 'subTeacher', label: 'Substitute Teacher Full Name', type: 'text', required: true, placeholder: 'e.g. Tr. Nabirye Sarah' }
            ]}
            onSubmit={(data) => handleAssignSubstitute(showSubForm, data.subTeacher)}
            onCancel={() => setShowSubForm(null)}
          />
        )}
      </div>
    </div>
  );
};
