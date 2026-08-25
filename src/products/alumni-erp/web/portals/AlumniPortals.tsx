import React, { useState } from 'react';
import { 
  Building2, Users, DollarSign, Globe, Heart, ShieldCheck, 
  Activity, Zap, Plus, CheckCircle2, TrendingUp, Download, Briefcase, Calendar
} from 'lucide-react';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';

export { AlumniRegistryPortal } from './registry/AlumniRegistryPortal';
export { AlumniDonationPortal } from './finance/AlumniDonationPortal';

// ==========================================
// 1. GLOBAL CHAPTERS & REGIONAL HUBS
// ==========================================
export const AlumniChaptersPortal: React.FC = () => {
  const [chapters] = useState([
    { id: 'CHP-01', name: 'Kampala Metropolitan Chapter', president: 'Dr. Grace Mukasa', members: 1420, city: 'Kampala, Uganda', status: 'ACTIVE' },
    { id: 'CHP-02', name: 'United Kingdom & Europe Chapter', president: 'Eng. Patrick Ochieng', members: 450, city: 'London, UK', status: 'ACTIVE' },
    { id: 'CHP-03', name: 'North America (USA & Canada) Chapter', president: 'Dr. Sarah Nabatanzi', members: 620, city: 'Washington DC, USA', status: 'ACTIVE' },
    { id: 'CHP-04', name: 'Nairobi & East Africa Hub', president: 'Brian Kamau', members: 310, city: 'Nairobi, Kenya', status: 'ACTIVE' }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Global Alumni Chapters & Regional Networks</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Diaspora Engagement • Chapter Leadership • Local Gatherings • Regional Hubs
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <JumoDataTable
          data={chapters}
          title="Active Alumni Chapter Registry"
          columns={[
            { header: 'Chapter Code', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Chapter Name', accessor: 'name', className: 'font-bold' },
            { header: 'Chapter President', accessor: 'president', className: 'text-xs text-slate-700 font-bold' },
            { header: 'Headquarters / City', accessor: 'city', className: 'text-xs text-slate-500' },
            { header: 'Registered Members', accessor: (c: any) => `${c.members} Alumni`, className: 'font-bold text-indigo-600 text-center' },
            { header: 'Status', accessor: (c: any) => (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{c.status}</span>
            )}
          ]}
        />
      </div>
    </div>
  );
};

// ==========================================
// 2. CAREER, MENTORSHIP & REUNIONS
// ==========================================
export const AlumniCareerEventsPortal: React.FC = () => {
  const [opportunities] = useState([
    { id: 'JOB-01', title: 'Senior Software Engineer (FinTech)', poster: 'JUMO Technologies', mentor: 'Julius Okwii', applicants: 18, deadline: '2026-09-30' },
    { id: 'JOB-02', title: 'Associate Resident Doctor', poster: 'Nakasero Hospital', mentor: 'Dr. Grace Mukasa', applicants: 12, deadline: '2026-09-15' },
    { id: 'EVT-01', title: 'Grand Annual Alumni Homecoming Dinner 2026', poster: 'Alumni Executive Board', mentor: 'All Classes', applicants: 380, deadline: '2026-11-20' }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Career Mentorship & Alumni Events</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Job Placement • Executive Mentorship • Homecoming Reunions • Class Fellowships
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <JumoDataTable
          data={opportunities}
          title="Career Opportunities & Reunion Events"
          columns={[
            { header: 'Ref Code', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Opportunity / Event Title', accessor: 'title', className: 'font-bold' },
            { header: 'Sponsoring Organization', accessor: 'poster', className: 'text-xs text-slate-600 font-bold' },
            { header: 'Lead Alumni Mentor', accessor: 'mentor', className: 'text-xs text-indigo-600' },
            { header: 'Registrations', accessor: (o: any) => `${o.applicants} Registered`, className: 'font-bold text-center' },
            { header: 'Date / Deadline', accessor: 'deadline', className: 'text-xs text-slate-400 font-mono' }
          ]}
        />
      </div>
    </div>
  );
};
