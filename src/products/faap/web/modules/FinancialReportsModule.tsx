import React, { useState } from 'react';
import { Download, Filter, Printer, FileText, PieChart, TrendingUp, RefreshCw } from 'lucide-react';
import { FaapService } from '../../domain/FaapService';
import { LedgerPostingService } from '../../services/LedgerPostingService';
import { formatNumber } from '../../../../utils/formatters';

export const FinancialReportsModule: React.FC = () => {
  const service = FaapService.getInstance();
  const postingService = LedgerPostingService.getInstance();

  const [activeReport, setActiveReport] = useState<'TRIAL_BALANCE' | 'PROFIT_LOSS' | 'BALANCE_SHEET'>('TRIAL_BALANCE');
  const [reportData, setReportData] = useState<any>(postingService.performLedgerIntegrityAudit());

  const handleRefresh = () => {
    setReportData(postingService.performLedgerIntegrityAudit());
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Generate authoritative financial statements derived directly from the immutable ledger.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleRefresh} className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-sm">
            <RefreshCw className="w-4 h-4 text-indigo-600" /> Refresh Data
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-sm">
            <Printer className="w-4 h-4 text-slate-500" /> Print
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition shadow-sm">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setActiveReport('TRIAL_BALANCE')}
          className={`px-6 py-2 rounded-lg text-xs font-bold ${activeReport === 'TRIAL_BALANCE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Trial Balance
        </button>
        <button 
          onClick={() => setActiveReport('PROFIT_LOSS')}
          className={`px-6 py-2 rounded-lg text-xs font-bold ${activeReport === 'PROFIT_LOSS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Profit and Loss
        </button>
        <button 
          onClick={() => setActiveReport('BALANCE_SHEET')}
          className={`px-6 py-2 rounded-lg text-xs font-bold ${activeReport === 'BALANCE_SHEET' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Balance Sheet
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 text-center border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">JUMO Education & Fintech Ecosystem</h2>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">
            {activeReport === 'TRIAL_BALANCE' && 'Trial Balance'}
            {activeReport === 'PROFIT_LOSS' && 'Profit and Loss Statement'}
            {activeReport === 'BALANCE_SHEET' && 'Balance Sheet'}
          </h3>
          <p className="text-xs text-slate-400 mt-2">As of {new Date().toLocaleDateString()}</p>
        </div>

        {activeReport === 'TRIAL_BALANCE' && (
          <div className="p-8">
            <table className="w-full text-left text-sm">
              <thead className="border-b-2 border-slate-900">
                <tr>
                  <th className="py-3 font-black text-slate-900">ACCOUNT</th>
                  <th className="py-3 font-black text-slate-900 text-right">DEBIT (UGX)</th>
                  <th className="py-3 font-black text-slate-900 text-right">CREDIT (UGX)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reportData?.accountAudits?.map((acc: any) => (
                  <tr key={acc.accountCode}>
                    <td className="py-3">
                      <span className="font-mono text-xs text-slate-500 mr-3">{acc.accountCode}</span>
                      <span className="font-medium text-slate-900">{acc.accountName}</span>
                    </td>
                    <td className="py-3 text-right font-mono font-medium">
                      {acc.calculatedBalance > 0 ? formatNumber(acc.calculatedBalance) : '-'}
                    </td>
                    <td className="py-3 text-right font-mono font-medium">
                      {acc.calculatedBalance < 0 ? formatNumber(Math.abs(acc.calculatedBalance)) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-slate-900">
                <tr>
                  <td className="py-4 font-black text-slate-900">TOTAL</td>
                  <td className="py-4 text-right font-black font-mono text-indigo-600">
                    {formatNumber(reportData?.accountAudits?.reduce((sum: number, acc: any) => sum + (acc.calculatedBalance > 0 ? acc.calculatedBalance : 0), 0))}
                  </td>
                  <td className="py-4 text-right font-black font-mono text-indigo-600">
                    {formatNumber(Math.abs(reportData?.accountAudits?.reduce((sum: number, acc: any) => sum + (acc.calculatedBalance < 0 ? acc.calculatedBalance : 0), 0)))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {activeReport === 'PROFIT_LOSS' && (
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h4 className="font-black text-slate-900 border-b border-slate-200 pb-2">Income</h4>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-50">
                  {reportData?.accountAudits?.filter((a: any) => a.accountCode.startsWith('4')).map((acc: any) => (
                    <tr key={acc.accountCode}>
                      <td className="py-2 pl-4 text-slate-700">{acc.accountName}</td>
                      <td className="py-2 text-right font-mono font-medium">{formatNumber(Math.abs(acc.calculatedBalance))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-black text-slate-900 border-b border-slate-200 pb-2">Expenses</h4>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-50">
                  {reportData?.accountAudits?.filter((a: any) => a.accountCode.startsWith('5')).map((acc: any) => (
                    <tr key={acc.accountCode}>
                      <td className="py-2 pl-4 text-slate-700">{acc.accountName}</td>
                      <td className="py-2 text-right font-mono font-medium">{formatNumber(acc.calculatedBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center border-t-2 border-slate-900 pt-4">
              <span className="font-black text-lg text-slate-900">Net Income</span>
              <span className="font-black font-mono text-xl text-emerald-600">
                {formatNumber(Math.abs(
                  reportData?.accountAudits?.filter((a: any) => a.accountCode.startsWith('4')).reduce((sum: number, a: any) => sum + a.calculatedBalance, 0) || 0
                ))} UGX
              </span>
            </div>
          </div>
        )}

        {activeReport === 'BALANCE_SHEET' && (
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-black text-slate-900 border-b border-slate-200 pb-2">Assets</h4>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-50">
                      {reportData?.accountAudits?.filter((a: any) => a.accountCode.startsWith('1')).map((acc: any) => (
                        <tr key={acc.accountCode}>
                          <td className="py-2 pl-4 text-slate-700">{acc.accountName}</td>
                          <td className="py-2 text-right font-mono font-medium">{formatNumber(acc.calculatedBalance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between font-bold pt-2 border-t border-slate-200">
                    <span>Total Assets</span>
                    <span className="font-mono">{formatNumber(reportData?.totalAssets)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-black text-slate-900 border-b border-slate-200 pb-2">Liabilities</h4>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-50">
                      {reportData?.accountAudits?.filter((a: any) => a.accountCode.startsWith('2')).map((acc: any) => (
                        <tr key={acc.accountCode}>
                          <td className="py-2 pl-4 text-slate-700">{acc.accountName}</td>
                          <td className="py-2 text-right font-mono font-medium">{formatNumber(Math.abs(acc.calculatedBalance))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between font-bold pt-2 border-t border-slate-200">
                    <span>Total Liabilities</span>
                    <span className="font-mono">{formatNumber(reportData?.totalLiabilities)}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-black text-slate-900 border-b border-slate-200 pb-2">Equity</h4>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-50">
                      {reportData?.accountAudits?.filter((a: any) => a.accountCode.startsWith('3')).map((acc: any) => (
                        <tr key={acc.accountCode}>
                          <td className="py-2 pl-4 text-slate-700">{acc.accountName}</td>
                          <td className="py-2 text-right font-mono font-medium">{formatNumber(Math.abs(acc.calculatedBalance))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between font-bold pt-2 border-t border-slate-200">
                    <span>Total Equity</span>
                    <span className="font-mono">{formatNumber(reportData?.totalEquity)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-black text-lg pt-4 border-t-2 border-slate-900">
                  <span>Total Liabilities & Equity</span>
                  <span className="font-mono">{formatNumber((reportData?.totalLiabilities || 0) + (reportData?.totalEquity || 0))}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
