import React, { useState } from 'react';
import { 
  DollarSign, Search, Filter, Plus, Download, Printer, 
  CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownRight, 
  CreditCard, Landmark, Receipt, Calendar, ShieldCheck, 
  RefreshCw, User, Phone, FileText, ChevronRight, X,
  Check, ArrowRight, Clock, AlertTriangle, Layers, Building2
} from 'lucide-react';

interface StudentFeeRecord {
  lin: string;
  studentName: string;
  classStream: string;
  termBilled: number;
  paidAmount: number;
  balance: number;
  status: 'CLEARED' | 'PARTIAL' | 'UNPAID' | 'EXEMPT';
  prn: string;
  lastPaymentDate: string;
  guardian: string;
  phone: string;
  feeBreakdown: {
    tuition: number;
    boarding: number;
    scienceLab: number;
    ptaLevy: number;
    developmentFee: number;
  };
  transactions: Array<{
    id: string;
    date: string;
    amount: number;
    channel: string;
    receiptNo: string;
    status: string;
  }>;
}

export const BursarOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'LEDGER' | 'CASHBOOK' | 'VOUCHERS' | 'RECON'>('LEDGER');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedLin, setSelectedLin] = useState<string>('LIN-2026-0891');
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [receiptAmount, setReceiptAmount] = useState('500000');
  const [paymentChannel, setPaymentChannel] = useState('Stanbic Bank Direct');
  const [receiptSuccessMsg, setReceiptSuccessMsg] = useState<string | null>(null);

  const [studentRecords, setStudentRecords] = useState<StudentFeeRecord[]>([
    { 
      lin: 'LIN-2026-0891', 
      studentName: 'Okello Brian', 
      classStream: 'S.4 Sciences (East)', 
      termBilled: 1250000, 
      paidAmount: 1250000, 
      balance: 0, 
      status: 'CLEARED', 
      prn: 'PRN-99827101',
      lastPaymentDate: '2026-08-19',
      guardian: 'Mzee Okello Julius',
      phone: '0772-112233',
      feeBreakdown: { tuition: 850000, boarding: 250000, scienceLab: 80000, ptaLevy: 40000, developmentFee: 30000 },
      transactions: [
        { id: 'TX-101', date: '2026-08-10', amount: 750000, channel: 'Stanbic Bank Direct (PRN)', receiptNo: 'REC-9081', status: 'CONFIRMED' },
        { id: 'TX-102', date: '2026-08-19', amount: 500000, channel: 'MTN Mobile Money Pay', receiptNo: 'REC-9120', status: 'CONFIRMED' }
      ]
    },
    { 
      lin: 'LIN-2026-0892', 
      studentName: 'Nakato Sarah', 
      classStream: 'S.3 Arts (North)', 
      termBilled: 1100000, 
      paidAmount: 850000, 
      balance: 250000, 
      status: 'PARTIAL', 
      prn: 'PRN-99827102',
      lastPaymentDate: '2026-08-22',
      guardian: 'Mrs. Nakato Mary',
      phone: '0701-445566',
      feeBreakdown: { tuition: 750000, boarding: 200000, scienceLab: 50000, ptaLevy: 50000, developmentFee: 50000 },
      transactions: [
        { id: 'TX-103', date: '2026-08-22', amount: 850000, channel: 'Centenary Revenue Bank', receiptNo: 'REC-9154', status: 'CONFIRMED' }
      ]
    },
    { 
      lin: 'LIN-2026-0893', 
      studentName: 'Kato Emmanuel', 
      classStream: 'S.6 PCM (West)', 
      termBilled: 1450000, 
      paidAmount: 1450000, 
      balance: 0, 
      status: 'CLEARED', 
      prn: 'PRN-99827103',
      lastPaymentDate: '2026-08-21',
      guardian: 'Dr. Kato Paul',
      phone: '0782-998877',
      feeBreakdown: { tuition: 950000, boarding: 300000, scienceLab: 120000, ptaLevy: 40000, developmentFee: 40000 },
      transactions: [
        { id: 'TX-104', date: '2026-08-21', amount: 1450000, channel: 'Stanbic Bank Direct (PRN)', receiptNo: 'REC-9140', status: 'CONFIRMED' }
      ]
    },
    { 
      lin: 'LIN-2026-0894', 
      studentName: 'Achieng Grace', 
      classStream: 'S.2 Day (South)', 
      termBilled: 750000, 
      paidAmount: 0, 
      balance: 750000, 
      status: 'UNPAID', 
      prn: 'PRN-99827104',
      lastPaymentDate: 'Pending Payment',
      guardian: 'Hon. Achieng Rebecca',
      phone: '0752-332211',
      feeBreakdown: { tuition: 550000, boarding: 0, scienceLab: 60000, ptaLevy: 70000, developmentFee: 70000 },
      transactions: []
    },
    { 
      lin: 'LIN-2026-0895', 
      studentName: 'Mukasa David', 
      classStream: 'S.5 BCM (East)', 
      termBilled: 1450000, 
      paidAmount: 1000000, 
      balance: 450000, 
      status: 'PARTIAL', 
      prn: 'PRN-99827105',
      lastPaymentDate: '2026-08-15',
      guardian: 'Mr. Mukasa Edward',
      phone: '0774-665544',
      feeBreakdown: { tuition: 950000, boarding: 300000, scienceLab: 100000, ptaLevy: 50000, developmentFee: 50000 },
      transactions: [
        { id: 'TX-105', date: '2026-08-15', amount: 1000000, channel: 'Airtel Money Pay', receiptNo: 'REC-9060', status: 'CONFIRMED' }
      ]
    },
    { 
      lin: 'LIN-2026-0896', 
      studentName: 'Akello Patricia', 
      classStream: 'S.1 Blue (North)', 
      termBilled: 950000, 
      paidAmount: 950000, 
      balance: 0, 
      status: 'CLEARED', 
      prn: 'PRN-99827106',
      lastPaymentDate: '2026-08-20',
      guardian: 'Eng. Akello Francis',
      phone: '0712-778899',
      feeBreakdown: { tuition: 650000, boarding: 200000, scienceLab: 40000, ptaLevy: 30000, developmentFee: 30000 },
      transactions: [
        { id: 'TX-106', date: '2026-08-20', amount: 950000, channel: 'Stanbic Bank Direct (PRN)', receiptNo: 'REC-9132', status: 'CONFIRMED' }
      ]
    }
  ]);

  const cashBookRows = [
    { id: 'CB-101', date: '2026-08-22', ref: 'REC-9154', payee: 'Nakato Sarah (Parent)', description: 'Term 1 Fees Partial Payment (Centenary Bank)', debit: 850000, credit: 0, balance: 142850000, account: 'Centenary Operating A/C' },
    { id: 'CB-102', date: '2026-08-22', ref: 'VOUCH-441', payee: 'Quality Agro Supplies Ltd', description: 'Term 1 Posho & Beans Food Stores Procurement', debit: 0, credit: 18500000, balance: 124350000, account: 'Stanbic Operating A/C' },
    { id: 'CB-103', date: '2026-08-21', ref: 'REC-9140', payee: 'Kato Emmanuel (Parent)', description: 'S.6 Full Term Tuition & Science Lab Fee Clearance', debit: 1450000, credit: 0, balance: 142850000, account: 'Stanbic Operating A/C' },
    { id: 'CB-104', date: '2026-08-21', ref: 'VOUCH-440', payee: 'National Water & Sewerage Corp', description: 'Boarding Section Water Utilities Monthly Bill', debit: 0, credit: 3420000, balance: 141400000, account: 'Stanbic Operating A/C' },
    { id: 'CB-105', date: '2026-08-20', ref: 'REC-9132', payee: 'Akello Patricia (Parent)', description: 'S.1 Admission & Boarding Development Clearance', debit: 950000, credit: 0, balance: 144820000, account: 'Stanbic Operating A/C' }
  ];

  const filteredStudents = studentRecords.filter(s => {
    const matchSearch = s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        s.lin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.prn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = selectedClass === 'ALL' || s.classStream.includes(selectedClass);
    const matchStatus = selectedStatus === 'ALL' || s.status === selectedStatus;
    return matchSearch && matchClass && matchStatus;
  });

  const selectedRecord = studentRecords.find(s => s.lin === selectedLin) || studentRecords[0];

  const handleIssueReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(receiptAmount, 10) || 0;
    if (amountNum <= 0 || !selectedRecord) return;

    const newTx = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().slice(0, 10),
      amount: amountNum,
      channel: paymentChannel,
      receiptNo: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'CONFIRMED'
    };

    setStudentRecords(prev => prev.map(rec => {
      if (rec.lin === selectedRecord.lin) {
        const newPaid = rec.paidAmount + amountNum;
        const newBal = Math.max(0, rec.termBilled - newPaid);
        const newStatus = newBal === 0 ? 'CLEARED' : 'PARTIAL';
        return {
          ...rec,
          paidAmount: newPaid,
          balance: newBal,
          status: newStatus,
          lastPaymentDate: newTx.date,
          transactions: [newTx, ...rec.transactions]
        };
      }
      return rec;
    }));

    setReceiptSuccessMsg(`Receipt ${newTx.receiptNo} generated successfully for ${selectedRecord.studentName} (UGX ${amountNum.toLocaleString()}).`);
    setTimeout(() => setReceiptSuccessMsg(null), 4000);
    setIsReceiptModalOpen(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col min-h-[750px]">
      {/* Office Header */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-xs">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">BURSAR OFFICE & GENERAL TREASURY</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                FAAP INTEGRATED
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Enterprise Double-Entry Cash Book • Student Fees Ledger • URA PRN Bank Reconciliation
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Ledger</span>
          </button>
          <button 
            type="button"
            onClick={() => setIsReceiptModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Fee Payment</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {receiptSuccessMsg && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 flex items-center justify-between text-xs text-emerald-800 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{receiptSuccessMsg}</span>
          </div>
          <button type="button" onClick={() => setReceiptSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-slate-200 bg-white px-6 flex items-center gap-2 overflow-x-auto text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('LEDGER')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'LEDGER'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Student Fees Ledgers & PRN Register
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('CASHBOOK')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'CASHBOOK'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Alpha Double-Entry Cash Book
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('VOUCHERS')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'VOUCHERS'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Disbursement Vouchers & AP
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('RECON')}
          className={`py-3 px-3.5 border-b-2 font-bold whitespace-nowrap transition ${
            activeTab === 'RECON'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Bank & PRN Real-Time Recon
        </button>
      </div>

      {/* Split-Pane Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Pane: Master Enterprise Table */}
        <div className="flex-1 border-r border-slate-200 flex flex-col bg-slate-50/30 overflow-hidden">
          {/* Table Search & Filter Toolbar */}
          <div className="p-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[220px]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by student name, LIN, or PRN ref..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="ALL">All Classes & Streams</option>
                <option value="S.1">Senior 1 (S.1)</option>
                <option value="S.2">Senior 2 (S.2)</option>
                <option value="S.3">Senior 3 (S.3)</option>
                <option value="S.4">Senior 4 (S.4)</option>
                <option value="S.5">Senior 5 (S.5)</option>
                <option value="S.6">Senior 6 (S.6)</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="ALL">All Fee Statuses</option>
                <option value="CLEARED">Fully Cleared</option>
                <option value="PARTIAL">Partial Balance</option>
                <option value="UNPAID">Unpaid / Arrears</option>
              </select>
            </div>
          </div>

          {/* Table Area */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'LEDGER' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-600 font-semibold sticky top-0 z-10">
                    <th className="py-2.5 px-4">LIN Identifier</th>
                    <th className="py-2.5 px-4">Student Name</th>
                    <th className="py-2.5 px-4">Class Stream</th>
                    <th className="py-2.5 px-4 text-right">Invoiced (UGX)</th>
                    <th className="py-2.5 px-4 text-right">Paid to Date</th>
                    <th className="py-2.5 px-4 text-right">Balance</th>
                    <th className="py-2.5 px-4">PRN Number</th>
                    <th className="py-2.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        No student fee records found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s) => {
                      const isSelected = s.lin === selectedRecord?.lin;
                      return (
                        <tr
                          key={s.lin}
                          onClick={() => setSelectedLin(s.lin)}
                          className={`cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-emerald-50/70 hover:bg-emerald-50 font-medium' 
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {s.lin}
                          </td>
                          <td className="py-3 px-4 text-slate-900">
                            <span className="font-semibold block">{s.studentName}</span>
                            <span className="text-[10px] text-slate-500">{s.guardian}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {s.classStream}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-slate-700">
                            {s.termBilled.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-700">
                            {s.paidAmount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold">
                            {s.balance === 0 ? (
                              <span className="text-slate-400">0</span>
                            ) : (
                              <span className="text-rose-600">{s.balance.toLocaleString()}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                            {s.prn}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                              s.status === 'CLEARED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : s.status === 'PARTIAL'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}

            {activeTab === 'CASHBOOK' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-600 font-semibold sticky top-0 z-10">
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4">Voucher / Ref</th>
                    <th className="py-2.5 px-4">Payee / Account Name</th>
                    <th className="py-2.5 px-4">Description</th>
                    <th className="py-2.5 px-4 text-right">Debit (UGX)</th>
                    <th className="py-2.5 px-4 text-right">Credit (UGX)</th>
                    <th className="py-2.5 px-4 text-right">Running Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {cashBookRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono text-slate-600">{row.date}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.ref}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{row.payee}</td>
                      <td className="py-3 px-4 text-slate-600">{row.description}</td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-700">
                        {row.debit > 0 ? row.debit.toLocaleString() : '-'}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-rose-700">
                        {row.credit > 0 ? row.credit.toLocaleString() : '-'}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                        UGX {row.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {(activeTab === 'VOUCHERS' || activeTab === 'RECON') && (
              <div className="p-8 text-center text-slate-500">
                <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {activeTab === 'VOUCHERS' ? 'Accounts Payable Vouchers Active' : 'Bank Automated Statement Feed Synced'}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  All double-entry lines are reconciled against the JUMO FAAP core ledger with zero variance ($0.00 offset).
                </p>
              </div>
            )}
          </div>

          {/* Table Footer Status Bar */}
          <div className="border-t border-slate-200 bg-white px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Showing {filteredStudents.length} of {studentRecords.length} records</span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              FAAP Ledger Real-Time Parity OK
            </span>
          </div>
        </div>

        {/* Right Pane: Split-Pane Financial Detail Inspector */}
        <div className="w-full lg:w-[380px] bg-white flex flex-col overflow-y-auto">
          {selectedRecord ? (
            <div className="p-5 flex flex-col gap-5">
              {/* Profile Card Header */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800">
                      {selectedRecord.lin}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {selectedRecord.studentName}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedRecord.classStream}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedRecord.status === 'CLEARED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedRecord.status === 'PARTIAL'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {selectedRecord.status}
                  </span>
                </div>
              </div>

              {/* Financial Balance Overview */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Term 1 Invoiced Total:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    UGX {selectedRecord.termBilled.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Total Paid to Date:</span>
                  <span className="font-mono font-semibold text-emerald-700">
                    UGX {selectedRecord.paidAmount.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">Outstanding Due:</span>
                  <span className="font-mono font-bold text-sm text-rose-600">
                    UGX {selectedRecord.balance.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Fee Breakdown Structure */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Itemized Fee Structure
                </h4>
                <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 text-xs">
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600">Tuition & Teaching:</span>
                    <span className="font-mono font-semibold">UGX {selectedRecord.feeBreakdown.tuition.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600">Boarding & Welfare:</span>
                    <span className="font-mono font-semibold">UGX {selectedRecord.feeBreakdown.boarding.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600">Science Lab & Practical:</span>
                    <span className="font-mono font-semibold">UGX {selectedRecord.feeBreakdown.scienceLab.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600">PTA & Development Levy:</span>
                    <span className="font-mono font-semibold">UGX {(selectedRecord.feeBreakdown.ptaLevy + selectedRecord.feeBreakdown.developmentFee).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment History Log */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Payment History & Receipts
                </h4>
                {selectedRecord.transactions.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-lg p-4 text-center text-xs text-slate-400">
                    No payment transactions recorded for this term yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedRecord.transactions.map((tx) => (
                      <div key={tx.id} className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-xs text-emerald-800">{tx.receiptNo}</span>
                          <span className="font-mono text-[10px] text-slate-500">{tx.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600 text-[11px]">{tx.channel}</span>
                          <span className="font-mono font-bold text-emerald-700">
                            UGX {tx.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions Drawer */}
              <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setIsReceiptModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Payment for {selectedRecord.studentName.split(' ')[0]}</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert(`PRN Token ${selectedRecord.prn} generated and dispatched via SMS to ${selectedRecord.phone}`)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition"
                >
                  <Landmark className="w-3.5 h-3.5 text-slate-500" />
                  <span>Send Bank PRN SMS</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              Select a record from the table to view financial details.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Post Payment Receipt */}
      {isReceiptModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Post Fee Payment & Receipt</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReceiptModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleIssueReceipt} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Student / Account</label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <span className="font-bold text-slate-900 block">{selectedRecord.studentName} ({selectedRecord.lin})</span>
                  <span className="text-slate-500">{selectedRecord.classStream} • Outstanding: UGX {selectedRecord.balance.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Payment Amount (UGX)</label>
                <input
                  type="number"
                  value={receiptAmount}
                  onChange={(e) => setReceiptAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Payment Channel</label>
                <select
                  value={paymentChannel}
                  onChange={(e) => setPaymentChannel(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="Stanbic Bank Direct (PRN)">Stanbic Bank Direct (PRN)</option>
                  <option value="Centenary Revenue Bank">Centenary Revenue Bank</option>
                  <option value="MTN Mobile Money Pay">MTN Mobile Money Pay</option>
                  <option value="Airtel Money Pay">Airtel Money Pay</option>
                  <option value="School Cash Counter">School Cash Counter</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReceiptModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                >
                  Confirm & Print Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
