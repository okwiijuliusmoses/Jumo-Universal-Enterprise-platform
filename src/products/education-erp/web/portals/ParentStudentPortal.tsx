import React, { useState } from 'react';
import { Heart, Printer, CreditCard, DollarSign, Download } from 'lucide-react';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const ParentStudentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'RESULTS' | 'FEES' | 'TIMETABLE'>('RESULTS');

  const subjects = [
    { code: 'MTH', name: 'Mathematics', bot: 78, mot: 82, eot: 85, final: 'D1', aoi: 2.8, teacher: 'Mr. Kato' },
    { code: 'ENG', name: 'English Language', bot: 72, mot: 75, eot: 80, final: 'D2', aoi: 2.5, teacher: 'Mrs. Namuswe' },
    { code: 'PHY', name: 'Physics', bot: 80, mot: 83, eot: 84, final: 'D1', aoi: 2.8, teacher: 'Ms. Akello' },
    { code: 'GEO', name: 'Geography', bot: 68, mot: 71, eot: 74, final: 'C3', aoi: 2.4, teacher: 'Mr. Kato' }
  ];

  const feeStatements = [
    { date: '2026-01-10', type: 'INVOICE', ref: 'INV-ST-101', description: 'Term 1 2026 Tuition', amount: 1500000, balance: 1500000 },
    { date: '2026-01-15', type: 'RECEIPT', ref: 'REC-1001', description: 'SchoolPay / Mobile Money', amount: -1000000, balance: 500000 },
    { date: '2026-02-01', type: 'RECEIPT', ref: 'REC-1025', description: 'Direct Bank Clearing Swift', amount: -500000, balance: 0 }
  ];

  const subjectColumns: Column<any>[] = [
    { header: 'CODE', accessor: 'code', className: 'font-mono text-slate-500 font-bold text-xs', sortable: true },
    { header: 'SUBJECT', accessor: 'name', className: 'font-bold text-slate-900 text-xs', sortable: true },
    { header: 'BOT', accessor: (row) => <span className="font-mono text-xs">{row.bot}%</span>, className: 'text-center' },
    { header: 'MOT', accessor: (row) => <span className="font-mono text-xs">{row.mot}%</span>, className: 'text-center' },
    { header: 'EOT', accessor: (row) => <span className="font-mono text-xs font-bold">{row.eot}%</span>, className: 'text-center' },
    { header: 'AOI', accessor: (row) => <span className="font-mono text-xs font-bold text-indigo-700">{row.aoi}</span>, className: 'text-center' },
    { header: 'FINAL', accessor: (row) => <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-[10px] font-bold">{row.final}</span>, className: 'text-center' },
    { header: 'TEACHER', accessor: 'teacher', className: 'text-slate-600 text-xs' }
  ];

  const feeColumns: Column<any>[] = [
    { header: 'DATE', accessor: 'date', className: 'font-mono text-xs text-slate-600', sortable: true },
    { header: 'TYPE', accessor: 'type', className: 'text-xs font-bold text-slate-800', sortable: true },
    { header: 'REF NO', accessor: 'ref', className: 'font-mono text-xs text-indigo-600 font-bold' },
    { header: 'DESCRIPTION', accessor: 'description', className: 'text-xs text-slate-700' },
    { 
      header: 'AMOUNT (UGX)', 
      accessor: (row) => (
        <span className={`font-mono text-xs font-bold ${row.amount < 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
          {row.amount > 0 ? '+' : ''}{row.amount.toLocaleString()}
        </span>
      ),
      className: 'text-right'
    },
    { 
      header: 'RUNNING BAL', 
      accessor: (row) => <span className="font-mono text-xs font-black text-slate-900">{row.balance.toLocaleString()}</span>,
      className: 'text-right'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden pb-12 animate-in fade-in duration-300">
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">PARENT & STUDENT PORTAL</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300">
                GUARDIAN VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Student: <strong className="text-slate-800">Okello Brian</strong> (LIN: LIN-2026-0891) • Class: S.4 East
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-sm hover:bg-slate-50">
            <Printer className="w-3.5 h-3.5 text-slate-500" /> Print
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-rose-700">
            <CreditCard className="w-3.5 h-3.5" /> Pay Fees Online
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('RESULTS')}
          className={`py-3 border-b-2 transition ${activeTab === 'RESULTS' ? 'border-rose-600 text-rose-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Academic Report Card
        </button>
        <button
          onClick={() => setActiveTab('FEES')}
          className={`py-3 border-b-2 transition ${activeTab === 'FEES' ? 'border-rose-600 text-rose-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Fees Statement
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'RESULTS' && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Term Assessment Summary</span>
                <div className="text-sm font-bold text-slate-900 mt-1">2026 Academic Year • Term 1 Report Card</div>
                <div className="text-xs text-slate-600 mt-0.5">Aggregate: <strong className="text-emerald-700">12 (Div 1)</strong> • Pos: <strong>3rd</strong></div>
              </div>
            </div>
            
            <JumoDataTable
              title="Subject Results"
              data={subjects}
              columns={subjectColumns}
              searchPlaceholder="Find subject..."
            />
          </div>
        )}

        {activeTab === 'FEES' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Current Balance</span>
                <p className="text-2xl font-black text-slate-900 font-mono">0 UGX</p>
                <div className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                  <Heart className="w-3 h-3" /> Fully Cleared
                </div>
              </div>
            </div>

            <JumoDataTable
              title="Fees Ledger"
              data={feeStatements}
              columns={feeColumns}
              searchPlaceholder="Search statement..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
