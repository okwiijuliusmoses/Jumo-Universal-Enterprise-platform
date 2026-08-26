import React, { useState } from 'react';
import { 
  TrendingUp, Users, Calendar, Award, CheckCircle, Percent, DollarSign, 
  MapPin, Clock, ShieldCheck, Heart, UserPlus, FileText, BarChart2
} from 'lucide-react';

export const ChurchReports: React.FC = () => {
  const [subTab, setSubTab] = useState<'attendance' | 'finances' | 'growth'>('attendance');

  const ageCohorts = [
    { name: 'Children (0-12)', count: 180, percent: 15 },
    { name: 'Youth (13-24)', count: 280, percent: 24 },
    { name: 'Young Adult (25-39)', count: 420, percent: 36 },
    { name: 'Adult (40-59)', count: 210, percent: 18 },
    { name: 'Elder (60+)', count: 80, percent: 7 }
  ];

  const attendanceTrends = [
    { week: 'Week 1', count: 890 },
    { week: 'Week 2', count: 910 },
    { week: 'Week 3', count: 940 },
    { week: 'Week 4', count: 980 }
  ];

  const cellFellowshipAttendance = [
    { name: 'Central Cathedral Grace Cell #1', members: 24, averageAttendance: 22, rate: 91 },
    { name: 'Northern Cathedral Cell #4', members: 18, averageAttendance: 17, rate: 94 },
    { name: 'Youth Worship Fellowship Cell', members: 45, averageAttendance: 38, rate: 84 },
    { name: 'Mothers Union Intercession Cell', members: 15, averageAttendance: 15, rate: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Subtabs Selection */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setSubTab('attendance')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'attendance' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Congregational Attendance Telemetry
        </button>
        <button
          onClick={() => setSubTab('finances')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'finances' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          Provincial Treasury Analytics
        </button>
        <button
          onClick={() => setSubTab('growth')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'growth' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Growth Distribution Models
        </button>
      </div>

      {subTab === 'attendance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Active Telemetry Summary</h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border rounded-lg">
                <span className="text-slate-500 block">Cathedral Sanctuary Capacity</span>
                <strong className="text-lg font-bold text-slate-850">1,200 Seats</strong>
              </div>

              <div className="p-3 bg-slate-50 border rounded-lg">
                <span className="text-slate-500 block">Average Weekly Sunday attendance</span>
                <strong className="text-lg font-bold text-purple-700">930 Communicants</strong>
              </div>

              <div className="p-3 bg-slate-50 border rounded-lg">
                <span className="text-slate-500 block">Home Fellowship Compliance Rate</span>
                <strong className="text-lg font-bold text-emerald-700">91.8% of Roll</strong>
              </div>
            </div>
          </div>

          {/* Cell Groups Attendance */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Home Cell Fellowship Weekly Attendance</h3>

            <div className="space-y-3">
              {cellFellowshipAttendance.map((cell, i) => (
                <div key={i} className="p-3 bg-slate-50 border rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-slate-800 font-bold block">{cell.name}</strong>
                      <span className="text-slate-500 text-[10px] block">Average {cell.averageAttendance} of {cell.members} members</span>
                    </div>
                    <strong className="text-purple-700 font-mono text-xs">{cell.rate}% attendance rate</strong>
                  </div>

                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full" style={{ width: `${cell.rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'finances' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="border-b pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-purple-600" />
                Sovereign Provincial Treasury Balance Ledger
              </h3>
              <p className="text-xs text-slate-500">Live consolidated accounts compiled from all diocesan double-entry FAAP ledgers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-slate-500 block font-sans">CONSOLIDATED GENERAL FUNDS</span>
              <strong className="text-2xl font-bold text-emerald-800 block mt-1">$412,500.00</strong>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
              <span className="text-slate-500 block font-sans">CAPITAL BUILDING CAMPAIGNS</span>
              <strong className="text-2xl font-bold text-purple-800 block mt-1">$185,000.00</strong>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 block font-sans">CLERGY RETIREMENT WELFARE FUND</span>
              <strong className="text-2xl font-bold text-slate-800 block mt-1">$88,500.00</strong>
            </div>
          </div>
        </div>
      )}

      {subTab === 'growth' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Age Distribution */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Parishioners Age Cohort Distribution</h3>

            <div className="space-y-3">
              {ageCohorts.map((cohort, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>{cohort.name}</span>
                    <span className="font-mono">{cohort.count} units ({cohort.percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full" style={{ width: `${cohort.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth stats summary */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Annual Demographic Growth Model</h3>
              <p className="text-slate-500 leading-relaxed mt-2">
                Analyzing sacramental certificates and active cell registries shows a <strong>+12.4% net increase</strong> in active congregation size over the past fiscal year, primarily driven by the Young Adult and Youth cohorts.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 mt-4">
                <strong>Predictive Analytics:</strong>
                <p className="text-[11px] leading-relaxed text-slate-600 mt-1">
                  AI predicts a capacity threshold bottleneck in Cathedral Sanctuary capacity by Q1 2027. Proposes scheduling an additional third early morning service.
                </p>
              </div>
            </div>

            <button
              onClick={() => alert("Comprehensive Diocesan demographic growth analytics report compiled and exported to file repository.")}
              className="w-full py-2.5 bg-white hover:bg-white text-white font-bold rounded-lg transition-all"
            >
              Export Demographic Growth Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
