import React, { useState } from 'react';
import { 
  Sliders, Building2, Calendar, Award, ShieldCheck, 
  Layers, CheckCircle2, RefreshCw, Save, Key, Database,
  Settings, Users, BookOpen, DollarSign
} from 'lucide-react';
import EducationTemplateService, { EducationTemplateId } from '../../domain/TemplateRegistry';

interface SchoolErpControlCenterProps {
  onTierChange?: (tier: EducationTemplateId) => void;
}

export const SchoolErpControlCenter: React.FC<SchoolErpControlCenterProps> = ({ onTierChange }) => {
  const [license, setLicense] = useState(EducationTemplateService.getInstitutionalLicense());
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const handleSaveSettings = () => {
    localStorage.setItem('JUMO_EDU_LICENSE', JSON.stringify(license));
    setSavedStatus('Institutional parameters committed successfully.');
    setTimeout(() => setSavedStatus(null), 3000);
    if (onTierChange) {
      onTierChange(license.activeTier);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">SCHOOL ERP CONTROL CENTER</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300">
                INSTITUTIONAL CORE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Institutional Governance • Academic Calendars • Template Tier Activation • Capability Manifests
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedStatus && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {savedStatus}
            </span>
          )}
          <button 
            type="button"
            onClick={handleSaveSettings}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tier Activation Selection */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            Active Institutional Template Tier
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Dynamically activates the appropriate capability manifest, departments, workflows, and terminology for your institution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: 'PRE_PRIMARY' as EducationTemplateId, name: 'Pre-Primary / Kindergarten (ECCE)', desc: 'Milestones, nutrition, caregiver rosters' },
              { id: 'PRIMARY' as EducationTemplateId, name: 'Primary School (P.1 – P.7)', desc: 'Thematic curriculum, continuous assessment' },
              { id: 'SECONDARY' as EducationTemplateId, name: 'Secondary School (S.1 – S.6)', desc: 'O/A Level combinations, UNEB index centre' },
              { id: 'TERTIARY' as EducationTemplateId, name: 'Tertiary & University ERP', desc: 'Faculties, Senate, course units & transcripts' },
              { id: 'VOCATIONAL' as EducationTemplateId, name: 'Vocational & TVET Institute', desc: 'CBET trade testing, workshop safety & machinery' },
            ].map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setLicense({ ...license, activeTier: tmpl.id })}
                className={`p-3.5 rounded-lg border text-left transition cursor-pointer ${
                  license.activeTier === tmpl.id
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${license.activeTier === tmpl.id ? 'text-blue-900' : 'text-slate-800'}`}>
                    {tmpl.name}
                  </span>
                  {license.activeTier === tmpl.id && (
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{tmpl.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Institutional Parameters Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Institutional Identity</h4>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institution Legal Name</label>
              <input
                type="text"
                value={license.institutionName}
                onChange={(e) => setLicense({ ...license, institutionName: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Year</label>
                <input
                  type="number"
                  value={license.academicYear}
                  onChange={(e) => setLicense({ ...license, academicYear: parseInt(e.target.value) || 2026 })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Academic Term</label>
                <select
                  value={license.currentTerm}
                  onChange={(e) => setLicense({ ...license, currentTerm: parseInt(e.target.value) || 1 })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800"
                >
                  <option value={1}>Term 1</option>
                  <option value={2}>Term 2</option>
                  <option value={3}>Term 3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Curriculum & Accreditation</h4>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">National Curriculum Standard</label>
              <select
                value={license.curriculumCode}
                onChange={(e) => setLicense({ ...license, curriculumCode: e.target.value as any })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800"
              >
                <option value="UG_NCDC">Uganda NCDC Lower & Upper Secondary</option>
                <option value="UNEB_STANDARD">UNEB National Examination Standard</option>
                <option value="CAMBRIDGE">Cambridge International Assessment (CIE)</option>
                <option value="IB">International Baccalaureate (IB)</option>
                <option value="TVET_DIT">DIT / UBTEB Modular Competencies</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student Capacity License</label>
              <input
                type="number"
                value={license.studentCapacity}
                onChange={(e) => setLicense({ ...license, studentCapacity: parseInt(e.target.value) || 1000 })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
