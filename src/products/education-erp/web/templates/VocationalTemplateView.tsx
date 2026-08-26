import React, { useState } from 'react';
import { 
  Wrench, Users, BadgeCheck, HardDrive, Briefcase, 
  Award, DollarSign, Layers, Plus, Search, CheckCircle2, 
  Settings, Zap, ShieldCheck, Activity, FileSpreadsheet
} from 'lucide-react';

export const VocationalTemplateView: React.FC<{ activeSubmodule: string }> = ({ activeSubmodule }) => {
  const [trades, setTrades] = useState([
    { code: 'TRD-AUTO-01', trade: 'Automotive Mechanics & EFI Diagnostics', dept: 'Mechanical Engineering', trainees: '148 Trainees', cbetUnits: '18 Units', workshops: 'Heavy Vehicle Bay & Diagnostic Pit', head: 'Eng. Francis Ekwau' },
    { code: 'TRD-ELEC-02', trade: 'Electrical Installation & Solar PV Technology', dept: 'Electrical & Electronics', trainees: '210 Trainees', cbetUnits: '22 Units', workshops: 'High Voltage Simulation & PV Rig', head: 'Eng. Sarah Kigozi' },
    { code: 'TRD-WELD-03', trade: 'Pipe Fitting, TIG/MIG & Fabrication', dept: 'Fabrication & Metallurgy', trainees: '115 Trainees', cbetUnits: '16 Units', workshops: 'Arc Welding Booths & Plasma Cutter', head: 'Mr. David Omondi' },
    { code: 'TRD-CULI-04', trade: 'Commercial Culinary Arts & Pastry', dept: 'Hospitality & Tourism', trainees: '190 Trainees', cbetUnits: '20 Units', workshops: 'Commercial Kitchen & Bakery Studio', head: 'Chef Maria Nabatanzi' }
  ]);

  const [attachments, setAttachments] = useState([
    { trainee: 'Kato Derrick (Auto)', company: 'Toyota Tsusho Uganda', role: 'Diagnostic Apprentice', supervisor: 'Eng. Martin S.', status: 'Field Supervised (4/4 visits)', logbookGrade: 'Distinction (89%)' },
    { trainee: 'Aketch Sharon (Electrical)', company: 'Umeme Power Grid Substation', role: 'Transformer Technician', supervisor: 'Eng. Paul K.', status: 'Field Supervised (3/4 visits)', logbookGrade: 'Credit (82%)' },
    { trainee: 'Okot Emmanuel (Welding)', company: 'East African Crude Oil Pipeline (EACOP)', role: 'Pipeline Welder Apprentice', supervisor: 'Eng. Jean-Luc D.', status: 'Field Supervised (4/4 visits)', logbookGrade: 'Distinction (94%)' },
    { trainee: 'Namazzi Ritah (Culinary)', company: 'Kampala Serena Hotel', role: 'Pastry Sous Apprentice', supervisor: 'Chef Alain B.', status: 'Field Supervised (3/4 visits)', logbookGrade: 'Distinction (91%)' }
  ]);

  const [workshops, setWorkshops] = useState([
    { name: 'Heavy Automotive Diagnostic Bay', tools: 'Bosch OBD-II Diagnostic Scanners, 2-Post Vehicle Lifts', safety: 'PPE Helmets, Steel-Toe Boots & Spill Kits Inspected', utilization: '96% Scheduled' },
    { name: 'Solar PV & Inverter Laboratory', tools: 'Solar Simulators, Digital Multimeters, Grid Inverters', safety: 'High Voltage Earthing & Rubber Mats Grounded', utilization: '92% Scheduled' },
    { name: 'Fabrication & Gas Metal Arc Welding Lab', tools: 'Miller TIG/MIG Welders, Hypertherm Plasma Torch', safety: 'Auto-Darkening Helmets & Extractor Hoods Active', utilization: '98% Scheduled' }
  ]);

  return (
    <div className="space-y-6">
      {/* Template Header Banner */}
      <div className="bg-gradient-to-r from-teal-500/10 via-teal-500/5 to-transparent p-5 rounded-2xl border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Vocational & Technical College (TVET) Operations</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-300">CBET Accredited</span>
            </div>
            <p className="text-xs text-slate-600">Competency-Based Training (CBET), workshop machinery inventory, apprenticeships & national trade certifications</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition">
            <Plus className="w-4 h-4" /> Add Trade Apprentice
          </button>
        </div>
      </div>

      {/* Trade Departments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">Accredited Trade Courses & Competency-Based Training (CBET) Units</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">12 Active Trades</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Trade Code</th>
                <th className="py-3 px-4">Trade Specialization</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Active Trainees</th>
                <th className="py-3 px-4">CBET Units</th>
                <th className="py-3 px-4">Allocated Workshop</th>
                <th className="py-3 px-4">Lead Instructor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {trades.map((t) => (
                <tr key={t.code} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-800 font-mono font-bold rounded border border-teal-200 text-[11px]">
                      {t.code}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{t.trade}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-600 font-medium">{t.dept}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900">{t.trainees}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 font-semibold rounded text-[10px]">{t.cbetUnits}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-600 font-medium">{t.workshops}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-800 font-medium">{t.head}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Industrial Attachments and Workshop Infrastructure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Industrial Attachment Log */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">Industrial Attachment & Apprenticeship Monitoring</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">68 Corporate Partners</span>
          </div>

          <div className="space-y-3">
            {attachments.map((att, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{att.trainee}</span>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">{att.logbookGrade}</span>
                </div>
                <div className="text-xs text-slate-700 font-semibold">{att.company} — <span className="text-slate-500 font-normal">{att.role}</span></div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Supervisor: {att.supervisor}</span>
                  <span className="font-mono text-emerald-700">{att.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workshop Tool & Heavy Equipment Crib */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">Workshops, Machinery & Safety Compliance</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">OSHA Inspected</span>
          </div>

          <div className="space-y-3">
            {workshops.map((w, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{w.name}</span>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">{w.utilization}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">Apparatus: {w.tools}</p>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {w.safety}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
