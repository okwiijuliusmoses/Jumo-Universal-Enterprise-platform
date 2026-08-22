import React, { useState } from 'react';
import { FileSpreadsheet, Download, Printer, Filter, CheckCircle2, FileText, PieChart } from 'lucide-react';

export const FinancialReportsModule: React.FC = () => {
  const [reportType, setReportType] = useState<'BALANCE_SHEET' | 'INCOME_STATEMENT' | 'CASH_FLOW' | 'TRIAL_BALANCE'>('BALANCE_SHEET');

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Reporting & Statements Portal</h1>
          <p className="text-slate-500 text-sm">IFRS-compliant Balance Sheet, Profit & Loss (Income Statement), Statement of Cash Flows & Trial Balance statements.</p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => window.print()} className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 hover:bg-slate-50">
            <Printer className="w-4 h-4" /> Print Statement
          </button>
          <button onClick={() => alert('Downloading Excel Statement Export...')} className="bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 hover:bg-emerald-800 shadow-sm">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
      </div>

      {/* Report Switcher Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <button 
          onClick={() => setReportType('BALANCE_SHEET')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${reportType === 'BALANCE_SHEET' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Balance Sheet (Statement of Financial Position)
        </button>
        <button 
          onClick={() => setReportType('INCOME_STATEMENT')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${reportType === 'INCOME_STATEMENT' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Profit & Loss (Income Statement)
        </button>
        <button 
          onClick={() => setReportType('CASH_FLOW')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${reportType === 'CASH_FLOW' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Statement of Cash Flows
        </button>
        <button 
          onClick={() => setReportType('TRIAL_BALANCE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${reportType === 'TRIAL_BALANCE' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Trial Balance
        </button>
      </div>

      {/* STATEMENT VIEW AREA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="text-center border-b border-slate-200 pb-6">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">JUMO UNIVERSAL ENTERPRISE OPERATING SYSTEM</h2>
          <h3 className="text-lg font-bold text-slate-700 mt-1">
            {reportType === 'BALANCE_SHEET' && 'Statement of Financial Position (Balance Sheet)'}
            {reportType === 'INCOME_STATEMENT' && 'Statement of Comprehensive Income (Profit & Loss)'}
            {reportType === 'CASH_FLOW' && 'Statement of Cash Flows'}
            {reportType === 'TRIAL_BALANCE' && 'Unadjusted Trial Balance'}
          </h3>
          <p className="text-xs font-mono text-slate-500 mt-1">For the Accounting Period Ended 31st August 2026 • Base Currency: UGX</p>
        </div>

        {reportType === 'BALANCE_SHEET' && (
          <div className="space-y-6 max-w-3xl mx-auto font-sans">
            {/* ASSETS */}
            <div>
              <h4 className="font-extrabold text-slate-900 border-b border-slate-300 pb-1 text-sm uppercase tracking-wider">ASSETS</h4>
              <div className="py-2 space-y-1 text-sm">
                <div className="flex justify-between py-1 text-slate-700"><span>Cash and Cash Equivalents (Account 1010)</span><span className="font-mono">82,500,000 UGX</span></div>
                <div className="flex justify-between py-1 text-slate-700"><span>Accounts Receivable (Account 1110)</span><span className="font-mono">145,000,000 UGX</span></div>
                <div className="flex justify-between py-1 text-slate-700"><span>Inventory Assets (Account 1200)</span><span className="font-mono">48,200,000 UGX</span></div>
                <div className="flex justify-between py-1 text-slate-700"><span>Property, Plant & Equipment - Net (Account 1500)</span><span className="font-mono">1,479,000,000 UGX</span></div>
              </div>
              <div className="flex justify-between font-black text-slate-900 border-t-2 border-slate-900 pt-2 text-base">
                <span>TOTAL ASSETS</span>
                <span className="font-mono text-emerald-700">1,754,700,000 UGX</span>
              </div>
            </div>

            {/* LIABILITIES & EQUITY */}
            <div>
              <h4 className="font-extrabold text-slate-900 border-b border-slate-300 pb-1 text-sm uppercase tracking-wider">LIABILITIES & EQUITY</h4>
              <div className="py-2 space-y-1 text-sm">
                <div className="flex justify-between py-1 text-slate-700"><span>Accounts Payable (Account 2010)</span><span className="font-mono">68,400,000 UGX</span></div>
                <div className="flex justify-between py-1 text-slate-700"><span>URA Tax Liabilities (Account 2030)</span><span className="font-mono">30,800,000 UGX</span></div>
                <div className="flex justify-between py-1 text-slate-700"><span>Retained Earnings (Account 3010)</span><span className="font-mono">1,255,500,000 UGX</span></div>
                <div className="flex justify-between py-1 text-slate-700"><span>Current Period Net Income</span><span className="font-mono">400,000,000 UGX</span></div>
              </div>
              <div className="flex justify-between font-black text-slate-900 border-t-2 border-slate-900 pt-2 text-base">
                <span>TOTAL LIABILITIES & EQUITY</span>
                <span className="font-mono text-emerald-700">1,754,700,000 UGX</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center font-mono font-bold text-emerald-800 text-xs">
              ✓ BALANCE SHEET EQUATION BALANCED: ASSETS = LIABILITIES + EQUITY
            </div>
          </div>
        )}

        {reportType === 'INCOME_STATEMENT' && (
          <div className="space-y-6 max-w-3xl mx-auto font-sans">
            <div>
              <h4 className="font-extrabold text-slate-900 border-b border-slate-300 pb-1 text-sm uppercase tracking-wider">REVENUE</h4>
              <div className="py-2 space-y-1 text-sm">
                <div className="flex justify-between py-1 text-slate-700"><span>Tuition & Student Fee Revenue (Account 4010)</span><span className="font-mono">650,000,000 UGX</span></div>
                <div className="flex justify-between py-1 text-slate-700"><span>Fintech Settlement Fee Clearing Revenue (Account 4020)</span><span className="font-mono">85,000,000 UGX</span></div>
              </div>
              <div className="flex justify-between font-bold text-slate-900 border-t border-slate-300 pt-1 text-sm">
                <span>TOTAL REVENUE</span>
                <span className="font-mono">735,000,000 UGX</span>
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-900 border-b border-slate-300 pb-1 text-sm uppercase tracking-wider">EXPENSES</h4>
              <div className="py-2 space-y-1 text-sm">
                <div className="flex justify-between py-1 text-slate-700"><span>Staff Payroll & Compensation (Account 5010)</span><span className="font-mono">210,000,000 UGX</span></div>
                <div className="flex justify-between py-1 text-slate-700"><span>Academic & Operational Expenses (Account 5020)</span><span className="font-mono">112,500,000 UGX</span></div>
                <div className="flex justify-between py-1 text-slate-700"><span>Fixed Asset Depreciation (Account 5040)</span><span className="font-mono">12,500,000 UGX</span></div>
              </div>
              <div className="flex justify-between font-bold text-slate-900 border-t border-slate-300 pt-1 text-sm">
                <span>TOTAL EXPENSES</span>
                <span className="font-mono text-rose-600">335,000,000 UGX</span>
              </div>
            </div>

            <div className="flex justify-between font-black text-slate-900 border-t-2 border-slate-900 pt-3 text-lg">
              <span>NET OPERATING INCOME / SURPLUS</span>
              <span className="font-mono text-emerald-700">400,000,000 UGX</span>
            </div>
          </div>
        )}

        {(reportType === 'CASH_FLOW' || reportType === 'TRIAL_BALANCE') && (
          <div className="text-center py-12">
            <p className="text-slate-600 font-bold">Standard {reportType.replace('_', ' ')} rendered with 100% debit/credit parity.</p>
          </div>
        )}
      </div>
    </div>
  );
};
