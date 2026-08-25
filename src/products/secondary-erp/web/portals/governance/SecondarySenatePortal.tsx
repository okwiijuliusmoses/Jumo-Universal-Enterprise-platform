import React from 'react';
import { BookOpen, Calendar, Clipboard, Users, ShieldCheck, DollarSign, Activity } from 'lucide-react';

export const SecondarySenatePortal: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Academic Senate & Principal Office</h2>
            <p className="text-xs text-slate-500">Executive School Management</p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <Users className="w-6 h-6 text-indigo-600 mb-2" />
            <p className="text-2xl font-bold text-slate-900">1,450</p>
            <p className="text-xs font-medium text-slate-500">Enrolled Students</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <Activity className="w-6 h-6 text-emerald-600 mb-2" />
            <p className="text-2xl font-bold text-slate-900">82%</p>
            <p className="text-xs font-medium text-slate-500">UNEB Pass Rate</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <Clipboard className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-slate-900">14</p>
            <p className="text-xs font-medium text-slate-500">Senate Policies Active</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <Calendar className="w-6 h-6 text-rose-600 mb-2" />
            <p className="text-2xl font-bold text-slate-900">Term 3</p>
            <p className="text-xs font-medium text-slate-500">Academic Year 2026</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800">Senate Actions</h3>
          </div>
          <div className="p-8 text-center text-slate-500 text-sm">
            Board resolutions and academic policy management active.
          </div>
        </div>
      </div>
    </div>
  );
};
