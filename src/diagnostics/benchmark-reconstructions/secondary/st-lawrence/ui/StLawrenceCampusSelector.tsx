import React, { useState } from 'react';

export const StLawrenceCampusSelector: React.FC = () => {
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);

  const campuses = [
    { id: 'creamland', name: 'Creamland Campus', type: 'O & A Level', code: 'SLA-CRM' },
    { id: 'horizon', name: 'Horizon Campus', type: 'O & A Level', code: 'SLA-HRZ' },
    { id: 'london', name: 'London College of St. Lawrence', type: 'A Level Special', code: 'SLA-LON' },
    { id: 'paris', name: 'Paris Palais', type: 'O & A Level', code: 'SLA-PAR' }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">St. Lawrence Schools & Colleges</h1>
          <p className="text-slate-500 mt-2">Select your campus to access the ERP</p>
          <div className="mt-4 inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
            PROVENANCE: SOURCE-OBSERVED
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {campuses.map(campus => (
            <button
              key={campus.id}
              onClick={() => setSelectedCampus(campus.id)}
              className={`p-6 rounded-2xl border text-left transition-all ${selectedCampus === campus.id ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:shadow'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">
                  {campus.name.charAt(0)}
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">{campus.code}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{campus.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{campus.type}</p>
            </button>
          ))}
        </div>

        {selectedCampus && (
          <div className="mt-8 flex justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:bg-blue-700 transition-colors flex items-center">
              Continue to Portal 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
