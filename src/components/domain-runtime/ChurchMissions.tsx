import React, { useState } from 'react';
import { 
  Compass, MapPin, Plus, ShieldCheck, Heart, Users, Activity, CheckCircle, 
  UserCheck, Calendar, Star, DollarSign, Target, Globe
} from 'lucide-react';

interface MissionStation {
  id: string;
  name: string;
  location: string;
  director: string;
  targetPopulation: string;
  fundingAllocated: number;
  status: 'ACTIVE_GROWING' | 'ESTABLISHED' | 'PLANNING';
}

interface Missionary {
  id: string;
  name: string;
  deploymentDate: string;
  stationId: string;
  specialty: string;
  status: 'Deployed' | 'Furlough' | 'Completed';
}

export const ChurchMissions: React.FC = () => {
  const [stations, setStations] = useState<MissionStation[]>([
    { id: 'MSN-01', name: 'St. Jude Northern Border Outpost', location: 'Gulu District, Northern Uganda', director: 'Rev. Emmanuel Mukasa', targetPopulation: 'Rural communities & returnees', fundingAllocated: 15000, status: 'ACTIVE_GROWING' },
    { id: 'MSN-02', name: 'Western Albertine Rift Mission', location: 'Hoima District, Western Uganda', director: 'Deaconess Sarah Kintu', targetPopulation: 'Oil-region migrant workers', fundingAllocated: 8000, status: 'PLANNING' },
    { id: 'MSN-03', name: 'Karamoja Nomadic Inter-Parish Outreach', location: 'Moroto District, Eastern Uganda', director: 'Evangelist Julius Moses', targetPopulation: 'Nomadic pastoralists', fundingAllocated: 12000, status: 'ESTABLISHED' }
  ]);

  const [missionaries, setMissionaries] = useState<Missionary[]>([
    { id: 'MIS-001', name: 'Rev. Emmanuel Mukasa', deploymentDate: '2021-02-15', stationId: 'MSN-01', specialty: 'Church Planting & Medical Outreach', status: 'Deployed' },
    { id: 'MIS-002', name: 'Evangelist Julius Moses', deploymentDate: '2023-05-10', stationId: 'MSN-03', specialty: 'Community Translation & Water Sanitation', status: 'Deployed' },
    { id: 'MIS-003', name: 'Sister Harriet Nabakooza', deploymentDate: '2024-01-20', stationId: 'MSN-01', specialty: 'Maternity Care & Primary Schooling', status: 'Deployed' }
  ]);

  // Form States
  const [newMsnName, setNewMsnName] = useState('');
  const [newMsnLoc, setNewMsnLoc] = useState('');
  const [newDirector, setNewDirector] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newFunding, setNewFunding] = useState('5000');

  const [newMisName, setNewMisName] = useState('');
  const [newMisSpec, setNewMisSpec] = useState('');
  const [newMisStation, setNewMisStation] = useState('MSN-01');

  const [subTab, setSubTab] = useState<'stations' | 'missionaries'>('stations');

  const handleEstablishOutpost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsnName.trim() || !newMsnLoc.trim()) return;

    const added: MissionStation = {
      id: `MSN-0${stations.length + 1}`,
      name: newMsnName,
      location: newMsnLoc,
      director: newDirector || 'Unassigned Field Evangelist',
      targetPopulation: newTarget || 'Local Parish Neighbors',
      fundingAllocated: parseFloat(newFunding) || 0,
      status: 'PLANNING'
    };

    setStations([...stations, added]);
    setNewMsnName('');
    setNewMsnLoc('');
    setNewDirector('');
    setNewTarget('');
    setNewFunding('5000');
    alert(`Rural Outpost established and registered: "${added.name}"`);
  };

  const handleDeployMissionary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMisName.trim() || !newMisSpec.trim()) return;

    const added: Missionary = {
      id: `MIS-00${missionaries.length + 1}`,
      name: newMisName,
      deploymentDate: new Date().toISOString().substring(0, 10),
      stationId: newMisStation,
      specialty: newMisSpec,
      status: 'Deployed'
    };

    setMissionaries([...missionaries, added]);
    setNewMisName('');
    setNewMisSpec('');
    alert(`Missionary field credentials logged. Deployment ordered for: ${added.name}`);
  };

  const getStationName = (id: string) => {
    return stations.find(s => s.id === id)?.name || 'Unknown Outpost';
  };

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setSubTab('stations')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'stations' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          Mission Outposts & Stations
        </button>
        <button
          onClick={() => setSubTab('missionaries')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'missionaries' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          Active Missionaries & Deployments
        </button>
      </div>

      {subTab === 'stations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Establish form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              Establish Outpost Node
            </h3>

            <form onSubmit={handleEstablishOutpost} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Outpost / Mission Station Name</label>
                <input
                  type="text"
                  value={newMsnName}
                  onChange={(e) => setNewMsnName(e.target.value)}
                  placeholder="e.g. St. Jude Gulu Mission"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">District / Field Region Location</label>
                <input
                  type="text"
                  value={newMsnLoc}
                  onChange={(e) => setNewMsnLoc(e.target.value)}
                  placeholder="e.g. Gulu District, Northern Uganda"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Appointed Field Director</label>
                <input
                  type="text"
                  value={newDirector}
                  onChange={(e) => setNewDirector(e.target.value)}
                  placeholder="e.g. Rev. Emmanuel Mukasa"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Target Community / Mission Purpose</label>
                <input
                  type="text"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="e.g. Displaced populations, nomads"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Allocated Funding ($)</label>
                <input
                  type="number"
                  value={newFunding}
                  onChange={(e) => setNewFunding(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
              >
                Establish Mission Station
              </button>
            </form>
          </div>

          {/* Stations Ledger */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-purple-600" />
                Sovereign Diocesan Mission Outposts
              </h3>
              <p className="text-xs text-slate-500">Rural outposts and inter-parish field operations catalogued across provinces.</p>
            </div>

            <div className="space-y-3">
              {stations.map(sta => (
                <div key={sta.id} className="p-3.5 bg-slate-50 border rounded-xl text-xs flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-purple-700 font-bold bg-purple-50 px-1.5 py-0.2 rounded text-[10px]">{sta.id}</span>
                      <span className="text-slate-600 font-mono text-[10px]">{sta.location}</span>
                    </div>
                    <strong className="text-sm font-bold text-slate-900 block">{sta.name}</strong>
                    <span className="text-slate-500 block text-[11px]">Director: {sta.director} • Target: {sta.targetPopulation}</span>
                    <strong className="text-emerald-700 block font-mono text-[10px]">Funding Allocated: ${sta.fundingAllocated.toLocaleString()}.00</strong>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    sta.status === 'ACTIVE_GROWING' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {sta.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'missionaries' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deploy missionary */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <Plus className="w-4 h-4 text-purple-600" />
              Deploy Field Missionary
            </h3>

            <form onSubmit={handleDeployMissionary} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Missionary Full Name</label>
                <input
                  type="text"
                  value={newMisName}
                  onChange={(e) => setNewMisName(e.target.value)}
                  placeholder="e.g. Sister Harriet Nabakooza"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Target Outpost Station</label>
                <select
                  value={newMisStation}
                  onChange={(e) => setNewMisStation(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  {stations.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Outreach Specialty / Focus</label>
                <input
                  type="text"
                  value={newMisSpec}
                  onChange={(e) => setNewMisSpec(e.target.value)}
                  placeholder="e.g. Church Planting, Medical outreach"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
              >
                Log Deploy Mandate
              </button>
            </form>
          </div>

          {/* Missionaries registry */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-purple-600" />
                Active Provincial Missionary Deployment Ledger
              </h3>
              <p className="text-xs text-slate-500">Ecclesiastical workers deployed to pioneer field church setups and medical missions.</p>
            </div>

            <div className="space-y-3 text-xs">
              {missionaries.map(mis => (
                <div key={mis.id} className="p-3.5 bg-slate-50 border rounded-xl flex justify-between items-center gap-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-purple-700 font-bold bg-purple-50 px-1.5 py-0.2 rounded text-[10px]">{mis.id}</span>
                      <span className="text-slate-600 font-mono text-[10px]">Deployed: {mis.deploymentDate}</span>
                    </div>
                    <strong className="text-slate-900 font-bold block mt-1">{mis.name}</strong>
                    <span className="text-slate-500 block text-[11px] mt-0.5">Deployment Node: {getStationName(mis.stationId)}</span>
                    <span className="text-purple-700 block text-[10px] mt-0.5 font-semibold">Specialty: {mis.specialty}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {mis.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
