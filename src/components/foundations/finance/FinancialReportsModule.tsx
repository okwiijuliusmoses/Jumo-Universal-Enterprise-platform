import React, { useState } from "react";
import { FileText, TrendingUp, Activity, Landmark } from "lucide-react";

export function FinancialReportsModule({ accounts, invoices, bills, cashBook }: { accounts: any[], invoices: any[], bills: any[], cashBook: any[] }) {
  const [activeReport, setActiveReport] = useState("pnl");

  const totalIncome = accounts?.filter(a => a.root_type === "Income").reduce((acc, a) => acc + a.balance, 0) || 0;
  const totalExpense = accounts?.filter(a => a.root_type === "Expense").reduce((acc, a) => acc + a.balance, 0) || 0;
  const netProfit = totalIncome - totalExpense;

  const totalAssets = accounts?.filter(a => a.root_type === "Asset").reduce((acc, a) => acc + a.balance, 0) || 0;
  const totalLiabilities = accounts?.filter(a => a.root_type === "Liability").reduce((acc, a) => acc + a.balance, 0) || 0;
  const totalEquity = accounts?.filter(a => a.root_type === "Equity").reduce((acc, a) => acc + a.balance, 0) || 0;

  const arBalance = accounts?.find(a => a.account_number === "1020")?.balance || 0;
  const apBalance = accounts?.find(a => a.account_number === "2010")?.balance || 0;
  const bankBalance = accounts?.find(a => a.account_number === "1010")?.balance || 0;

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-slate-200">
        <button onClick={() => setActiveReport("pnl")} className={`px-4 py-2 text-sm font-medium border-b-2 ${activeReport === 'pnl' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'}`}>Profit & Loss</button>
        <button onClick={() => setActiveReport("bs")} className={`px-4 py-2 text-sm font-medium border-b-2 ${activeReport === 'bs' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'}`}>Balance Sheet</button>
        <button onClick={() => setActiveReport("tb")} className={`px-4 py-2 text-sm font-medium border-b-2 ${activeReport === 'tb' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'}`}>Trial Balance</button>
        <button onClick={() => setActiveReport("liquidity")} className={`px-4 py-2 text-sm font-medium border-b-2 ${activeReport === 'liquidity' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'}`}>Liquidity Analysis</button>
      </div>

      {activeReport === "pnl" && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Statement of Comprehensive Income</h2>
            <p className="text-slate-500">For the period ended Current Year</p>
          </div>
          
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2 uppercase tracking-wide">Operating Revenue</h3>
              {accounts?.filter(a => a.root_type === "Income" && !a.is_group).map((acc: any) => (
                <div key={acc.account_number} className="flex justify-between py-1">
                  <span className="text-slate-600">{acc.account_name}</span>
                  <span className="font-medium text-slate-900">{acc.balance.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 font-bold text-slate-900 border-t border-slate-200 mt-2 bg-slate-50 px-2 rounded">
                <span>Total Revenue</span>
                <span>{totalIncome.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2 uppercase tracking-wide">Operating Expenses</h3>
              {accounts?.filter(a => a.root_type === "Expense" && !a.is_group).map((acc: any) => (
                <div key={acc.account_number} className="flex justify-between py-1">
                  <span className="text-slate-600">{acc.account_name}</span>
                  <span className="font-medium text-slate-900">{acc.balance.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 font-bold text-slate-900 border-t border-slate-200 mt-2 bg-slate-50 px-2 rounded">
                <span>Total Expenses</span>
                <span>{totalExpense.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between py-4 font-bold text-lg border-t-2 border-slate-800 text-slate-900 px-2">
              <span>Net Operating Profit</span>
              <span className={netProfit >= 0 ? "text-emerald-700" : "text-rose-700"}>{netProfit.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {activeReport === "bs" && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Statement of Financial Position</h2>
            <p className="text-slate-500">As of Today</p>
          </div>
          
          <div className="space-y-8 text-sm">
            <div>
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2 uppercase tracking-wide">Assets</h3>
              {accounts?.filter(a => a.root_type === "Asset" && !a.is_group).map((acc: any) => (
                <div key={acc.account_number} className="flex justify-between py-1">
                  <span className="text-slate-600">{acc.account_name}</span>
                  <span className="font-medium text-slate-900">{acc.balance.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 font-bold text-slate-900 border-t border-slate-200 mt-2 bg-slate-50 px-2 rounded">
                <span>Total Assets</span>
                <span>{totalAssets.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2 uppercase tracking-wide">Liabilities</h3>
              {accounts?.filter(a => a.root_type === "Liability" && !a.is_group).map((acc: any) => (
                <div key={acc.account_number} className="flex justify-between py-1">
                  <span className="text-slate-600">{acc.account_name}</span>
                  <span className="font-medium text-slate-900">{acc.balance.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 font-bold text-slate-900 border-t border-slate-200 mt-2 bg-slate-50 px-2 rounded">
                <span>Total Liabilities</span>
                <span>{totalLiabilities.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2 uppercase tracking-wide">Equity</h3>
              {accounts?.filter(a => a.root_type === "Equity" && !a.is_group).map((acc: any) => (
                <div key={acc.account_number} className="flex justify-between py-1">
                  <span className="text-slate-600">{acc.account_name}</span>
                  <span className="font-medium text-slate-900">{acc.balance.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Current Year Retained Earnings</span>
                <span className="font-medium text-slate-900">{netProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-slate-900 border-t border-slate-200 mt-2 bg-slate-50 px-2 rounded">
                <span>Total Equity</span>
                <span>{(totalEquity + netProfit).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between py-4 font-bold text-lg border-t-2 border-slate-800 text-slate-900 px-2">
              <span>Total Liabilities & Equity</span>
              <span>{(totalLiabilities + totalEquity + netProfit).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {activeReport === "liquidity" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-indigo-600" /> Cash Position</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Bank Balance</span>
                <span className="text-lg font-bold text-slate-900">{bankBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Accounts Receivable</span>
                <span className="text-lg font-bold text-emerald-700">{arBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Accounts Payable</span>
                <span className="text-lg font-bold text-rose-700">({apBalance.toLocaleString()})</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                <span className="text-indigo-900 font-bold">Net Working Capital</span>
                <span className="text-xl font-black text-indigo-900">{(bankBalance + arBalance - apBalance).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
