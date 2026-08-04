import React from 'react';
import { ControlCenterWorkspace } from './workspace';
import { BookOpen, Church, Utensils, Briefcase, GraduationCap, Building2 } from 'lucide-react';

const EcosystemTile = ({ icon: Icon, title, desc }) => (
  <div className="p-6 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer flex flex-col items-center text-center shadow-sm">
    <div className="w-16 h-16 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
      <Icon className="w-8 h-8" />
    </div>
    <h2 className="font-bold text-slate-900">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{desc}</p>
  </div>
);

export const ERPFactory = () => {
  const toolbar = (
    <>
      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200">Export Registry</button>
      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700">Create Blueprint</button>
    </>
  );

  return (
    <ControlCenterWorkspace 
        title="ERP Factory" 
        description="Design and manage enterprise ERP blueprints by industry ecosystem."
        toolbar={toolbar}
    >
        <div className="grid grid-cols-3 gap-6">
            <EcosystemTile icon={BookOpen} title="Education Ecosystem" desc="University, College, Vocational, Secondary, Nursery/Primary" />
            <EcosystemTile icon={Church} title="Church Ecosystem" desc="Church, Diocese, Province" />
            <EcosystemTile icon={Utensils} title="Hospitality Ecosystem" desc="Configurable Hospitality ERP" />
            <EcosystemTile icon={Briefcase} title="Corporate Ecosystem" desc="Enterprise management" />
            <EcosystemTile icon={Building2} title="Government Ecosystem" desc="Ministries, Agencies, Local Gov" />
            <EcosystemTile icon={GraduationCap} title="Alumni Ecosystem" desc="Institution-specific alumni management" />
        </div>
    </ControlCenterWorkspace>
  );
};
