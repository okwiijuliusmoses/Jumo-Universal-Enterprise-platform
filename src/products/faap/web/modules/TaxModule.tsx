import React, { useState } from 'react';
import { Receipt, FileText, CheckCircle2, Download, AlertCircle } from 'lucide-react';

export const TaxModule: React.FC = () => {
  const [taxPeriods] = useState([
    { period: 'July 2026', vatCollected: 45200000, vatPaidInput: 18400000, netVatPayable: 26800000, wht6Percent: 8400000, status: 'FILED_URA' },
    { period: 'August 2026 (Current)', vatCollected: 52100000, vatPaidInput: 21300000, netVatPayable: 30800000, wht6Percent: 9600000, status: 'ACCCRUING' }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tax & Statutory Compliance Portal</h1>
          <p className="text-slate-500 text-sm">Automated 18% VAT calculation, 6% Withholding Tax (WHT) schedules & URA e-returns export.</p>
        </div>
        <button 
          onClick={() => alert('Generating Monthly URA VAT & WHT E-Return XML File...')}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all"
        >
          <Download className="w-4 h-4" /> Export URA E-Return XML
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Output VAT Collected (18%)</span>
          <p className="text-3xl font-black text-slate-900 mt-1 font-mono">52,100,000 UGX</p>
          <p className="text-xs text-slate-500 mt-2">Accrued from student invoices & billings</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Input VAT Claimable</span>
          <p className="text-3xl font-black text-blue-600 mt-1 font-mono">21,300,000 UGX</p>
          <p className="text-xs text-blue-600 font-bold mt-2">Eligible vendor bill tax credits</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net VAT Payable to URA</span>
          <p className="text-3xl font-black text-rose-600 mt-1 font-mono">30,800,000 UGX</p>
          <p className="text-xs text-rose-600 font-bold mt-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Due by 15th September 2026
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <span className="font-bold text-slate-800 text-sm">Monthly Tax Return Filings Register</span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Tax Period</th>
              <th className="px-6 py-4 text-right">Output VAT (UGX)</th>
              <th className="px-6 py-4 text-right">Input VAT (UGX)</th>
              <th className="px-6 py-4 text-right">Net VAT Liability (UGX)</th>
              <th className="px-6 py-4 text-right">6% WHT Deducted (UGX)</th>
              <th className="px-6 py-4 text-center">Filing Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {taxPeriods.map((t) => (
              <tr key={t.period} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{t.period}</td>
                <td className="px-6 py-4 text-right font-mono text-slate-700">{t.vatCollected.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-mono text-blue-600 font-bold">{t.vatPaidInput.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-mono text-rose-600 font-black">{t.netVatPayable.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-mono text-slate-900 font-bold">{t.wht6Percent.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${t.status === 'FILED_URA' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
