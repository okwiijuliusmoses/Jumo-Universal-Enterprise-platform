import React, { useState } from 'react';
import { 
  DollarSign, FileText, Download, Plus, Search, Filter, 
  CheckCircle2, ArrowUpRight, ArrowDownRight, CreditCard,
  Building2, Landmark, Receipt, Calendar, Printer, ShieldCheck,
  RefreshCw, AlertCircle
} from 'lucide-react';

export const BursarOfficePortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'LEDGER' | 'CASHBOOK' | 'VOUCHERS' | 'RECON'>('LEDGER');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  const studentFeeRecords = [
    { lin: 'LIN-2026-0891', studentName: 'Okello Brian', classStream: 'S.4 Sciences (East)', termBilled: 1250000, paidAmount: 1250000, balance: 0, status: 'CLEARED', prn: 'PRN-99827101' },
    { lin: 'LIN-2026-0892', studentName: 'Nakato Sarah', classStream: 'S.3 Arts (North)', termBilled: 1100000, paidAmount: 850000, balance: 250000, status: 'PARTIAL', prn: 'PRN-99827102' },
    { lin: 'LIN-2026-0893', studentName: 'Kato Emmanuel', classStream: 'S.6 PCM (West)', termBilled: 1450000, paidAmount: 1450000, balance: 0, status: 'CLEARED', prn: 'PRN-99827103' },
    { lin: 'LIN-2026-0894', studentName: 'Achieng Grace', classStream: 'S.2 Day (South)', termBilled: 750000, paidAmount: 0, balance: 750000, status: 'UNPAID', prn: 'PRN-99827104' },
    { lin: 'LIN-2026-0895', studentName: 'Mukasa David', classStream: 'S.5 BCM (East)', termBilled: 1450000, paidAmount: 1000000, balance: 450000, status: 'PARTIAL', prn: 'PRN-99827105' },
    { lin: 'LIN-2026-0896', studentName: 'Akello Patricia', classStream: 'S.1 Blue (North)', termBilled: 950000, paidAmount: 950000, balance: 0, status: 'CLEARED', prn: 'PRN-99827106' },
  ];

  const cashBookTransactions = [
    { id: 'CB-2026-101', date: '2026-08-22', ref: 'REC-9081', payee: 'Nakato Sarah (Parent)', description: 'Term 1 School Fees Deposit (PRN Bank Direct)', debit: 850000, credit: 0, balance: 142850000, account: 'Stanbic Operating A/C' },
    { id: 'CB-2026-102', date: '2026-08-22', ref: 'VOUCH-441', payee: 'Quality Agro Supplies Ltd', description: 'Term 1 Posho & Beans Dry Stores Procurement', debit: 0, credit: 18500000, balance: 124350000, account: 'Stanbic Operating A/C' },
    { id: 'CB-2026-103', date: '2026-08-21', ref: 'REC-9080', payee: 'Kato Emmanuel (Parent)', description: 'A-Level Science Lab & Tuition Fee Clearance', debit: 1450000, credit: 0, balance: 142850000, account: 'Centenary Revenue A/C' },
    { id: 'CB-2026-104', date: '2026-08-21', ref: 'VOUCH-440', payee: 'National Water & Sewerage Corp', description: 'Boarding Section Water Utilities Monthly Bill', debit: 0, credit: 3420000, balance: 141400000, account: 'Stanbic Operating A/C' },
    { id: 'CB-2026-105', date: '2026-08-20', ref: 'REC-9079', payee: 'Akello Patricia (Parent)', description: 'S.1 Admission & Boarding Development Fee', debit: 950000, credit: 0, balance: 144820000, account: 'Stanbic Operating A/C' }
  ];

  const filteredStudents = studentFeeRecords.filter(s => {
    const matchSearch = s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || s.lin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = selectedClass === 'ALL' || s.classStream.includes(selectedClass);
    return matchSearch && matchClass;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Office Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-xs">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">BURSAR OFFICE & TREASURY</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                FAAP INTEGRATED
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Academic Year 2026 • Term 1 • General Ledger & Fees Collection Core
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Ledger</span>
          </button>
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Issue Payment Receipt</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 divide-x divide-slate-200 bg-white">
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Total Term Invoiced</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">UGX 1,845,000,000</span>
          <span className="text-[10px] text-emerald-600 font-medium">1,280 Enrolled Students</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Total Fees Collected</span>
          <span className="text-lg font-bold text-emerald-700 mt-1 block">UGX 1,428,500,000</span>
          <span className="text-[10px] text-slate-500">77.4% Recovery Rate</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Outstanding Arrears</span>
          <span className="text-lg font-bold text-rose-600 mt-1 block">UGX 416,500,000</span>
          <span className="text-[10px] text-rose-600 font-medium">142 Defaulters flagged</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Bank Operating Balance</span>
          <span className="text-lg font-bold text-blue-700 mt-1 block">UGX 124,350,000</span>
          <span className="text-[10px] text-slate-500">Reconciled today 08:30</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('LEDGER')}
          className={`py-3 border-b-2 transition ${activeTab === 'LEDGER' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Student Fees Register & Balances
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('CASHBOOK')}
          className={`py-3 border-b-2 transition ${activeTab === 'CASHBOOK' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Alpha Cash Book (General Ledger)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('VOUCHERS')}
          className={`py-3 border-b-2 transition ${activeTab === 'VOUCHERS' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Payment Vouchers & Procurement
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('RECON')}
          className={`py-3 border-b-2 transition ${activeTab === 'RECON' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Bank & PRN Reconciliation
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-6">
        {activeTab === 'LEDGER' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search student name, LIN or PRN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 font-medium focus:outline-hidden"
                >
                  <option value="ALL">All Classes & Streams</option>
                  <option value="S.1">Senior 1</option>
                  <option value="S.2">Senior 2</option>
                  <option value="S.3">Senior 3</option>
                  <option value="S.4">Senior 4</option>
                  <option value="S.5">Senior 5</option>
                  <option value="S.6">Senior 6</option>
                </select>
                <button 
                  type="button"
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Fees Table */}
            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-4 py-2.5">Learner LIN</th>
                    <th className="px-4 py-2.5">Student Name</th>
                    <th className="px-4 py-2.5">Class / Stream</th>
                    <th className="px-4 py-2.5 text-right">Invoiced (UGX)</th>
                    <th className="px-4 py-2.5 text-right">Paid (UGX)</th>
                    <th className="px-4 py-2.5 text-right">Balance (UGX)</th>
                    <th className="px-4 py-2.5 text-center">Status</th>
                    <th className="px-4 py-2.5 text-center">PRN Ref</th>
                    <th className="px-4 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredStudents.map((row) => (
                    <tr key={row.lin} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-2.5 font-mono text-slate-500">{row.lin}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-900">{row.studentName}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.classStream}</td>
                      <td className="px-4 py-2.5 text-right font-mono">{row.termBilled.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-emerald-600 font-bold">{row.paidAmount.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-rose-600 font-bold">
                        {row.balance === 0 ? '0' : row.balance.toLocaleString()}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'CLEARED' ? 'bg-emerald-100 text-emerald-800' :
                          row.status === 'PARTIAL' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono text-slate-500">{row.prn}</td>
                      <td className="px-4 py-2.5 text-right">
                        <button 
                          type="button"
                          className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition"
                        >
                          Statement
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'CASHBOOK' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Alpha Cash Book — Double-Entry Journal</h3>
                <p className="text-xs text-slate-500">Live transaction register synchronized with JUMO FAAP ledger backbone</p>
              </div>
              <button 
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Cash Book Entry</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-4 py-2.5">Date</th>
                    <th className="px-4 py-2.5">Voucher / Ref</th>
                    <th className="px-4 py-2.5">Payee / Payer</th>
                    <th className="px-4 py-2.5">Description</th>
                    <th className="px-4 py-2.5">Account</th>
                    <th className="px-4 py-2.5 text-right text-emerald-700">Receipt / Debit (UGX)</th>
                    <th className="px-4 py-2.5 text-right text-rose-700">Payment / Credit (UGX)</th>
                    <th className="px-4 py-2.5 text-right">Running Balance (UGX)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700 font-mono">
                  {cashBookTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-2.5 text-slate-600">{tx.date}</td>
                      <td className="px-4 py-2.5 text-slate-900 font-bold">{tx.ref}</td>
                      <td className="px-4 py-2.5 font-sans font-medium text-slate-800">{tx.payee}</td>
                      <td className="px-4 py-2.5 font-sans text-slate-600">{tx.description}</td>
                      <td className="px-4 py-2.5 font-sans text-xs text-slate-500">{tx.account}</td>
                      <td className="px-4 py-2.5 text-right text-emerald-600 font-bold">
                        {tx.debit > 0 ? `+${tx.debit.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-4 py-2.5 text-right text-rose-600 font-bold">
                        {tx.credit > 0 ? `-${tx.credit.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-slate-900">{tx.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'VOUCHERS' && (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <Receipt className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">Procurement & Payment Vouchers Registry</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Authorizes institutional purchase orders, laboratory reagents, food supplies, and maintenance contracts with dual bursar and headteacher approvals.
            </p>
          </div>
        )}

        {activeTab === 'RECON' && (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">Direct Bank & PRN Reconciliation Feed</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Direct electronic API reconciliation with Stanbic Bank, Centenary Bank, and Uganda Revenue Authority PRN validation gateways.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
