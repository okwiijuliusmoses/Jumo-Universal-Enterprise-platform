import React, { useState } from 'react';
import { 
  Briefcase, HeartHandshake, Plus, Search, 
  Building, MapPin, Calendar, Mail, UserCheck
} from 'lucide-react';
import { AlumniErpService } from '../../domain/AlumniErpService';
import { CareerOpportunity, MentorshipPair } from '../../domain/types';

export const AlumniCareerModule: React.FC = () => {
  const service = AlumniErpService.getInstance();
  const [activeTab, setActiveTab] = useState<'JOBS' | 'MENTORSHIP'>('JOBS');
  const [opportunities] = useState<CareerOpportunity[]>(service.getOpportunities());
  const [mentorships] = useState<MentorshipPair[]>(service.getMentorships());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = opportunities.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Career Network & Mentorship</h2>
          <p className="text-slate-500 text-xs mt-0.5">Exclusive alumni talent portal, executive recruiting, and student mentorship pairings.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('JOBS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'JOBS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Job Board ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('MENTORSHIP')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'MENTORSHIP' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Mentorship Pairs ({mentorships.length})
          </button>
        </div>
      </div>

      {activeTab === 'JOBS' ? (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search job title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Post Opportunity</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {job.type.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-slate-400">Deadline: {job.deadline}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 mb-1">{job.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-3 mb-4">{job.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    Posted by: <span className="font-medium text-slate-600">{job.postedByName}</span>
                  </div>
                  <a
                    href={`mailto:${job.applicationUrlOrEmail}`}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Apply</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Mentor</th>
                <th className="py-3.5 px-4">Mentee</th>
                <th className="py-3.5 px-4">Industry & Focus Area</th>
                <th className="py-3.5 px-4">Start Date</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {mentorships.map(m => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{m.mentorName}</td>
                  <td className="py-3.5 px-4 text-slate-700">{m.menteeName}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">{m.industry}</div>
                    <div className="text-[11px] text-slate-500">{m.focusArea}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{m.startDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
