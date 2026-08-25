import React, { useState } from 'react';
import { Baby, Star, Heart, Smile, CheckCircle, Plus } from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

interface ObservationRecord {
  id: string;
  name: string;
  class: string;
  obs: string;
  area: string;
  date: string;
}

export const NurseryMilestonesPortal: React.FC = () => {
  const [observations, setObservations] = useState<ObservationRecord[]>([
    { id: 'OBS-01', name: 'Chloe N.', class: 'Baby Class', obs: 'Can identify 4 primary colors consistently.', area: 'Cognitive', date: new Date().toISOString().split('T')[0] },
    { id: 'OBS-02', name: 'Ethan K.', class: 'Middle Class', obs: 'Shared toys during free play without prompting.', area: 'Social-Emotional', date: new Date().toISOString().split('T')[0] },
    { id: 'OBS-03', name: 'Mia T.', class: 'Top Class', obs: 'Wrote first name independently using tripod grip.', area: 'Fine Motor', date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
    { id: 'OBS-04', name: 'Liam B.', class: 'Baby Class', obs: 'Walked backward 5 steps during outdoor play.', area: 'Gross Motor', date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleAddObservation = (data: any) => {
    const newRecord: ObservationRecord = {
      id: `OBS-${String(observations.length + 1).padStart(2, '0')}`,
      name: data.name,
      class: data.class,
      obs: data.obs,
      area: data.area,
      date: new Date().toISOString().split('T')[0]
    };
    setObservations([newRecord, ...observations]);
    setShowForm(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-pink-100 text-pink-700 rounded-lg">
            <Baby className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">ECD Milestones & Development</h2>
            <p className="text-xs text-slate-500">Play-based Assessment & Observation Logs</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Record Observation
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Milestones Reached</p>
              <p className="text-xl font-bold text-slate-900">{observations.length + 1244}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Emotional Growth</p>
              <p className="text-xl font-bold text-slate-900">+15%</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Observations Today</p>
              <p className="text-xl font-bold text-slate-900">{observations.filter(o => o.date === new Date().toISOString().split('T')[0]).length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Health Alerts</p>
              <p className="text-xl font-bold text-slate-900">0</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <JumoDataTable<ObservationRecord>
              data={observations}
              title="Recent Observations"
              columns={[
                { header: 'Date', accessor: 'date', className: 'text-xs text-slate-500' },
                { 
                  header: 'Learner', 
                  accessor: (o) => (
                    <div>
                      <span className="font-medium text-slate-900">{o.name}</span>
                      <span className="text-xs text-slate-500 ml-2">({o.class})</span>
                    </div>
                  ) 
                },
                { 
                  header: 'Domain', 
                  accessor: (o) => (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-pink-50 text-pink-700">
                      {o.area}
                    </span>
                  ) 
                },
                { header: 'Observation Notes', accessor: 'obs', className: 'text-sm text-slate-600 max-w-xs truncate' }
              ]}
              actions={(o) => (
                <button className="text-[10px] font-black text-slate-500 uppercase hover:text-slate-700">
                  Edit
                </button>
              )}
            />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Framework Coverage</h3>
            <div className="space-y-4">
              {[
                { area: 'Language & Literacy', pct: 85, color: 'bg-indigo-500' },
                { area: 'Numeracy & Logic', pct: 70, color: 'bg-emerald-500' },
                { area: 'Physical / Motor', pct: 90, color: 'bg-amber-500' },
                { area: 'Social-Emotional', pct: 75, color: 'bg-rose-500' },
                { area: 'Creative Arts', pct: 60, color: 'bg-purple-500' },
              ].map(f => (
                <div key={f.area}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">{f.area}</span>
                    <span className="text-slate-500">{f.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className={`${f.color} h-1.5 rounded-full`} style={{ width: `${f.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100">
              Generate Parent Reports
            </button>
          </div>
        </div>

        {showForm && (
          <JumoForm
            title="Record New Observation"
            fields={[
              { id: 'name', label: 'Learner Name', type: 'text', required: true },
              { id: 'class', label: 'Class (Baby, Middle, Top)', type: 'select', required: true, options: [
                { value: 'Baby Class', label: 'Baby Class' },
                { value: 'Middle Class', label: 'Middle Class' },
                { value: 'Top Class', label: 'Top Class' }
              ] },
              { id: 'area', label: 'Development Domain', type: 'select', required: true, options: [
                { value: 'Cognitive', label: 'Cognitive' },
                { value: 'Social-Emotional', label: 'Social-Emotional' },
                { value: 'Fine Motor', label: 'Fine Motor' },
                { value: 'Gross Motor', label: 'Gross Motor' },
                { value: 'Language & Literacy', label: 'Language & Literacy' }
              ] },
              { id: 'obs', label: 'Observation Notes', type: 'textarea', required: true }
            ]}
            onSubmit={handleAddObservation}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};
