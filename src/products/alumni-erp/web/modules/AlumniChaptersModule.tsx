import React, { useState } from 'react';
import { 
  Globe, Users, Plus, MapPin, Mail, DollarSign, 
  Calendar, CheckCircle, Search, ExternalLink, Award
} from 'lucide-react';
import { AlumniErpService } from '../../domain/AlumniErpService';
import { AlumniChapter } from '../../domain/types';

export const AlumniChaptersModule: React.FC = () => {
  const service = AlumniErpService.getInstance();
  const [chapters, setChapters] = useState<AlumniChapter[]>(service.getChapters());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChapters = chapters.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.leadCoordinator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Regional & Diaspora Chapters</h2>
          <p className="text-slate-500 text-xs mt-0.5">Manage geographical alumni branches, leadership, fundraising quotas, and meetings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Charter New Chapter</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search chapters by region, country, or lead..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
        </div>
      </div>

      {/* Chapter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map(chapter => {
          const progress = Math.min(100, Math.round((chapter.raisedUSD / chapter.annualTargetUSD) * 100));
          return (
            <div key={chapter.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{chapter.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{chapter.region}, {chapter.country}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {chapter.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Lead Coordinator:</span>
                    <span className="font-semibold text-slate-800">{chapter.leadCoordinator}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Active Roster:</span>
                    <span className="font-semibold text-slate-800">{chapter.activeMembersCount.toLocaleString()} alumni</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Chartered:</span>
                    <span className="font-semibold text-slate-800">{chapter.establishedYear}</span>
                  </div>
                </div>

                {/* Fundraising quota progress */}
                <div className="space-y-1.5 mb-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-slate-600">Annual Giving Goal</span>
                    <span className="font-bold text-slate-900">${chapter.raisedUSD.toLocaleString()} / ${chapter.annualTargetUSD.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-rose-600 h-2 rounded-full" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-right text-slate-400 font-medium">{progress}% Achieved</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                <a 
                  href={`mailto:${chapter.leadEmail}`}
                  className="text-xs text-slate-600 hover:text-rose-600 flex items-center gap-1 font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Executive</span>
                </a>
                <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors">
                  View Roster
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
