import React, { useState } from 'react';
import { 
  Users, Building2, Globe, Heart, ShieldCheck, Activity, Zap, 
  Plus, CheckCircle2, AlertTriangle, Send, Download, Printer
} from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

// ==========================================
// 1. STUDENT RECORDS & ARCHIVES OFFICE
// ==========================================
export const PrimaryRecordsPortal: React.FC = () => {
  const [learners] = useState([
    { lin: 'LIN-2026-9041', name: 'Mugisha Brian', class: 'P.7 Blue', dob: '2013-05-12', parent: 'Dr. Arthur Mugisha', phone: '+256772111222', status: 'ACTIVE' },
    { lin: 'LIN-2026-9042', name: 'Nakato Priscilla', class: 'P.7 Blue', dob: '2013-08-20', parent: 'Eng. Rose Nakato', phone: '+256701333444', status: 'ACTIVE' },
    { lin: 'LIN-2026-9043', name: 'Wasswa David', class: 'P.6 Green', dob: '2014-02-10', parent: 'Mr. Peter Wasswa', phone: '+256782555666', status: 'ACTIVE' }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Student Records & Registry (EMIS/LIN)</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Learner Identification Numbers • Birth Certificates • Cumulative Record Cards
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <JumoDataTable
          data={learners}
          title="Master Student Enrollment & LIN Registry"
          columns={[
            { header: 'Learner LIN', accessor: 'lin', className: 'font-mono text-xs font-bold text-indigo-600' },
            { header: 'Pupil Full Name', accessor: 'name', className: 'font-bold' },
            { header: 'Current Class', accessor: 'class', className: 'text-xs text-slate-700 font-bold' },
            { header: 'Date of Birth', accessor: 'dob', className: 'text-xs text-slate-500' },
            { header: 'Parent / Guardian', accessor: 'parent', className: 'text-xs font-bold' },
            { header: 'Emergency Contact', accessor: 'phone', className: 'font-mono text-xs text-slate-600' },
            { header: 'Status', accessor: (l: any) => (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{l.status}</span>
            )}
          ]}
        />
      </div>
    </div>
  );
};

// ==========================================
// 2. HUMAN RESOURCES & STAFF MANAGEMENT
// ==========================================
export const PrimaryHrPortal: React.FC = () => {
  const [staff] = useState([
    { id: 'STF-01', name: 'Tr. Musoke Timothy', role: 'Head of Mathematics', qualification: 'B.Ed (MUK)', tscNumber: 'TSC-99420', status: 'ON_DUTY' },
    { id: 'STF-02', name: 'Tr. Nabirye Sarah', role: 'Head of English Language', qualification: 'Dip. Ed (Kyambogo)', tscNumber: 'TSC-99421', status: 'ON_DUTY' },
    { id: 'STF-03', name: 'Tr. Okello James', role: 'Science Laboratory Master', qualification: 'B.Sc Ed (Gulu)', tscNumber: 'TSC-99422', status: 'ON_DUTY' }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Human Resources & Staff Registry</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Teacher Service Commission (TSC) Records • Staff Appraisals • Leave & Payroll Roster
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <JumoDataTable
          data={staff}
          title="Teaching Staff Directorate"
          columns={[
            { header: 'Staff ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Teacher Full Name', accessor: 'name', className: 'font-bold' },
            { header: 'Designation / Headship', accessor: 'role', className: 'text-xs text-indigo-600 font-bold' },
            { header: 'Qualification', accessor: 'qualification', className: 'text-xs text-slate-600' },
            { header: 'TSC Registration No.', accessor: 'tscNumber', className: 'font-mono text-xs font-bold text-slate-700' },
            { header: 'Status', accessor: (s: any) => (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{s.status}</span>
            )}
          ]}
        />
      </div>
    </div>
  );
};

// ==========================================
// 3. COMMUNICATIONS & BROADCAST DESK
// ==========================================
export const PrimaryCommunicationsPortal: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 'SMS-2026-104', recipient: 'All P.7 Parents (186)', channel: 'SMS Broadcast', message: 'Reminder: P.7 Pre-PLE Joint Mock Exam starts on Monday at 8:00 AM. Please ensure full clearance.', status: 'DELIVERED', time: '2026-08-20 09:30' },
    { id: 'SMS-2026-105', recipient: 'Boarding Section Parents (420)', channel: 'SMS & WhatsApp', message: 'Visiting Sunday scheduled for this weekend from 10:00 AM to 4:00 PM. Adhere to school safety guidelines.', status: 'DELIVERED', time: '2026-08-19 14:00' }
  ]);
  const [showSendForm, setShowSendForm] = useState(false);

  const handleSend = (data: any) => {
    setMessages([{
      id: `SMS-2026-${Math.floor(100 + Math.random() * 900)}`,
      recipient: data.recipient,
      channel: 'SMS Broadcast',
      message: data.message,
      status: 'DELIVERED',
      time: new Date().toLocaleString()
    }, ...messages]);
    setShowSendForm(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Communications & Parent Broadcast Desk</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Mass SMS Gateway • Termly Circulars • Emergency Alerts • Parent Portal Sync
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowSendForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition"
        >
          <Send className="w-3.5 h-3.5" /> Broadcast Parent SMS
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <JumoDataTable
          data={messages}
          title="SMS Broadcast Dispatch History"
          columns={[
            { header: 'Dispatch Ref', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Target Audience', accessor: 'recipient', className: 'font-bold' },
            { header: 'Channel', accessor: 'channel', className: 'text-xs text-slate-500 font-bold' },
            { header: 'Message Body', accessor: 'message', className: 'text-xs text-slate-700 max-w-md' },
            { header: 'Status', accessor: (m: any) => (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{m.status}</span>
            )},
            { header: 'Timestamp', accessor: 'time', className: 'text-xs text-slate-400 font-mono' }
          ]}
        />

        {showSendForm && (
          <JumoForm
            title="Compose Parent Broadcast"
            fields={[
              { id: 'recipient', label: 'Target Audience Group', type: 'select', required: true, options: [
                { value: 'All P.7 Parents (186)', label: 'All P.7 Candidate Parents' },
                { value: 'All Boarding Parents (420)', label: 'All Boarding Section Parents' },
                { value: 'Whole School Parents (1,240)', label: 'Whole School Parent Body' },
                { value: 'All Teaching Staff (68)', label: 'All Academic Staff' }
              ]},
              { id: 'message', label: 'SMS Message Text (Max 160 chars)', type: 'text', required: true, placeholder: 'Enter announcement details...' }
            ]}
            onSubmit={handleSend}
            onCancel={() => setShowSendForm(false)}
          />
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. BOARDING & HOSTEL MANAGEMENT
// ==========================================
export const PrimaryHostelPortal: React.FC = () => {
  const [dorms] = useState([
    { id: 'DRM-01', name: 'Speke House (Boys Senior)', matron: 'Patron John Mugerwa', capacity: 120, occupied: 118, available: 2 },
    { id: 'DRM-02', name: 'Nightingale House (Girls Senior)', matron: 'Matron Mary Nalwanga', capacity: 120, occupied: 120, available: 0 },
    { id: 'DRM-03', name: 'Kabiega House (Boys Junior)', matron: 'Patron Paul Kato', capacity: 90, occupied: 86, available: 4 },
    { id: 'DRM-04', name: 'Victoria House (Girls Junior)', matron: 'Matron Joan Babirye', capacity: 90, occupied: 88, available: 2 }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Boarding & Hostel Operations</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Dormitory Bed Allocation • House Warden Roster • Exeat Gate Passes • Daily Roll Call
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Boarders Housed</span>
            <div className="text-2xl font-black text-slate-900 mt-1">412 Boarders</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">98% Dormitory Capacity</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available Bed Spaces</span>
            <div className="text-2xl font-black text-indigo-600 mt-1">8 Beds Open</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Active Exeat Passes</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">0 Overdue</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">All Boarders Accounted For</span>
          </div>
        </div>

        <JumoDataTable
          data={dorms}
          title="Dormitory Capacity & Matron Supervision"
          columns={[
            { header: 'Dorm Code', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Hostel Name', accessor: 'name', className: 'font-bold' },
            { header: 'Warden / Matron in Charge', accessor: 'matron', className: 'text-xs text-slate-700 font-bold' },
            { header: 'Total Beds', accessor: (d: any) => `${d.capacity}`, className: 'text-center font-bold' },
            { header: 'Occupied', accessor: (d: any) => `${d.occupied}`, className: 'text-center font-bold text-indigo-600' },
            { header: 'Available Beds', accessor: (d: any) => `${d.available}`, className: 'text-center font-black text-emerald-600' }
          ]}
        />
      </div>
    </div>
  );
};

// ==========================================
// 5. SPORTS & CO-CURRICULAR OFFICE
// ==========================================
export const PrimarySportsPortal: React.FC = () => {
  const [clubs] = useState([
    { id: 'CLB-01', name: 'Scouts & Girl Guides Movement', patron: 'Tr. Okello James', members: 64, meetingDay: 'Wednesday 4:00 PM', status: 'ACTIVE' },
    { id: 'CLB-02', name: 'Primary Chess & Mind Sports Club', patron: 'Tr. Musoke Timothy', members: 42, meetingDay: 'Tuesday 4:00 PM', status: 'ACTIVE' },
    { id: 'CLB-03', name: 'Music, Dance & Drama (MDD) Choir', patron: 'Tr. Nabirye Sarah', members: 85, meetingDay: 'Thursday 4:00 PM', status: 'ACTIVE' },
    { id: 'CLB-04', name: 'Junior Football & Netball Academy', patron: 'Coach Dennis Kato', members: 110, meetingDay: 'Friday 4:00 PM', status: 'ACTIVE' }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Sports & Co-Curricular Office</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Inter-House Competitions • MDD Festivals • Scouting • Athletics & Football Academies
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <JumoDataTable
          data={clubs}
          title="School Clubs & Athletic Societies"
          columns={[
            { header: 'Club ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Club / Co-Curricular Body', accessor: 'name', className: 'font-bold' },
            { header: 'Patron Teacher', accessor: 'patron', className: 'text-xs text-slate-700 font-bold' },
            { header: 'Learners Enrolled', accessor: (c: any) => `${c.members} Pupils`, className: 'text-center font-bold text-indigo-600' },
            { header: 'Practice Schedule', accessor: 'meetingDay', className: 'text-xs text-slate-500 font-mono' },
            { header: 'Status', accessor: (c: any) => (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{c.status}</span>
            )}
          ]}
        />
      </div>
    </div>
  );
};
