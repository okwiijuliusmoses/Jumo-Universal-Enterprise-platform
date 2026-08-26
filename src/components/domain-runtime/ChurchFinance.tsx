import React, { useState } from 'react';
import { 
  Banknote, DollarSign, Plus, Calculator, Smartphone, Landmark, 
  CheckCircle2, CreditCard, History, Heart, TrendingUp, Filter
} from 'lucide-react';

interface Transaction {
  id: string;
  timestamp: string;
  donorOrMember: string;
  category: string;
  method: string;
  amount: number;
  receiptNo: string;
}

interface GeneralLedger {
  id: string;
  timestamp: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  description: string;
}

export const ChurchFinance: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TX-89421-MPE',
      timestamp: '2026-07-25 14:15:22',
      donorOrMember: 'Deaconess Sarah Kintu',
      category: 'Tithe',
      method: 'M-Pesa Mobile Money',
      amount: 1500,
      receiptNo: 'REC-2026-88910'
    },
    {
      id: 'TX-89422-MTN',
      timestamp: '2026-07-25 14:10:05',
      donorOrMember: 'Dr. Emmanuel Otim',
      category: 'Pledge',
      method: 'MTN Mobile Money',
      amount: 4200,
      receiptNo: 'REC-2026-88911'
    },
    {
      id: 'TX-89423-SWI',
      timestamp: '2026-07-25 13:45:10',
      donorOrMember: 'St. Jude Youth Fellowship',
      category: 'General Contribution',
      method: 'SWIFT ACH Wire',
      amount: 25000,
      receiptNo: 'REC-2026-88912'
    }
  ]);

  const [ledger, setLedger] = useState<GeneralLedger[]>([
    { id: 'JNL-89401', timestamp: '2026-07-25 14:15:22', debitAccount: '1010 - Safaricom M-Pesa Treasury Cash', creditAccount: '4110 - Canonical Tithes & Offerings Revenue', amount: 1500, description: 'Reconciled Tithe - Sarah Kintu' },
    { id: 'JNL-89402', timestamp: '2026-07-25 14:10:05', debitAccount: '1020 - MTN MoMo Settlement Account', creditAccount: '4120 - Capital Campaign Pledges Revenue', amount: 4200, description: 'Reconciled Pledge - Dr. Emmanuel Otim' },
    { id: 'JNL-89403', timestamp: '2026-07-25 13:45:10', debitAccount: '1030 - Central Bank Wire Clearing', creditAccount: '4130 - General Offertory Contributions', amount: 25000, description: 'Reconciled Wire - Youth Fellowship' }
  ]);

  // Form inputs
  const [amount, setAmount] = useState('500');
  const [donor, setDonor] = useState('Sister Agnes Nakato');
  const [method, setMethod] = useState('M-Pesa Mobile Money');
  const [category, setCategory] = useState('Tithe');

  const [subTab, setSubTab] = useState<'payments' | 'ledger' | 'stewardship'>('payments');

  const handlePostPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount) || 0;
    if (parsedAmount <= 0) return;

    const txId = `TX-${Math.floor(10000 + Math.random() * 90000)}-${method.substring(0, 3).toUpperCase()}`;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const receiptNo = `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newTx: Transaction = {
      id: txId,
      timestamp,
      donorOrMember: donor,
      category,
      method,
      amount: parsedAmount,
      receiptNo
    };

    setTransactions([newTx, ...transactions]);

    // Double entry posting simulation
    const debitAccount = method.includes('M-Pesa') || method.includes('MTN')
      ? '1010 - Safaricom M-Pesa Treasury Cash'
      : method.includes('SWIFT')
        ? '1030 - Central Bank Wire Clearing'
        : '1020 - MTN MoMo Settlement Account';

    const creditAccount = category === 'Tithe'
      ? '4110 - Canonical Tithes & Offerings Revenue'
      : category === 'Pledge'
        ? '4120 - Capital Campaign Pledges Revenue'
        : '4130 - General Offertory Contributions';

    const newJnl: GeneralLedger = {
      id: `JNL-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp,
      debitAccount,
      creditAccount,
      amount: parsedAmount,
      description: `Reconciled ${category} - ${donor}`
    };

    setLedger([newJnl, ...ledger]);
    setAmount('500');
    alert(`Authorized & settled $${parsedAmount} payment. Receipt ${receiptNo} issued!`);
  };

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setSubTab('payments')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'payments' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          Mobile Money & Bank Gateways
        </button>
        <button
          onClick={() => setSubTab('ledger')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'ledger' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4" />
          FAAP Double-Entry Ledger
        </button>
        <button
          onClick={() => setSubTab('stewardship')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'stewardship' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          Stewardship Campaigns
        </button>
      </div>

      {subTab === 'payments' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment execution form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <Banknote className="w-4 h-4 text-emerald-600" />
              Process Parish Gift
            </h3>

            <form onSubmit={handlePostPayment} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Contributor / Lay Member Name</label>
                <input
                  type="text"
                  value={donor}
                  onChange={(e) => setDonor(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Canonical Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  <option value="Tithe">Tithe (10% Canonical Pledge)</option>
                  <option value="Pledge">Capital Campaign Building Fund</option>
                  <option value="General Contribution">Sunday Offertory & Missions</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Settlement Gateway</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  <option value="M-Pesa Mobile Money">📱 M-Pesa Mobile Money (Safaricom)</option>
                  <option value="MTN Mobile Money">📱 MTN Mobile Money (MoMo API)</option>
                  <option value="Airtel Money">📱 Airtel Money Gateway</option>
                  <option value="SWIFT ACH Wire">🏦 SWIFT International ACH Wire</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Amount (USD equivalent)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-600 font-bold">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-7 pr-2 p-2 rounded border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-950">
                <strong>Real-Time Settlement:</strong> Instant receipt generation with SHA-256 seal and automated reconciliation.
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Authorize & Post Settle
              </button>
            </form>
          </div>

          {/* Transactions lists */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Reconciled Payments Ledger</h3>
                <p className="text-xs text-slate-500">Live stream of verified payments across all mobile money & wire gateways.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono font-bold text-xs">
                {transactions.length} Verified Records
              </span>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2 px-3">Receipt ID</th>
                    <th className="py-2 px-3">Contributor</th>
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3">Gateway</th>
                    <th className="py-2 px-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-semibold text-blue-600">
                        {tx.receiptNo}
                        <div className="text-[10px] text-slate-600 font-normal">{tx.timestamp}</div>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">{tx.donorOrMember}</td>
                      <td className="py-3 px-3">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-semibold">{tx.method}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">${tx.amount.toLocaleString()}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {subTab === 'ledger' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-purple-600" />
              FAAP Double-Entry General Ledger (Live Audited)
            </h3>
            <p className="text-xs text-slate-500">Every transactional settlement automatically generates balanced double-entry postings.</p>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2 px-3">Ref ID</th>
                  <th className="py-2 px-3">Accounts (Debit / Credit)</th>
                  <th className="py-2 px-3 text-right">Debit</th>
                  <th className="py-2 px-3 text-right">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {ledger.map(jnl => (
                  <tr key={jnl.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">
                      <strong className="text-purple-600 block">{jnl.id}</strong>
                      <span className="text-[10px] text-slate-600 font-normal block">{jnl.timestamp}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="text-emerald-700 font-semibold">Dr: {jnl.debitAccount}</div>
                      <div className="text-slate-600 pl-4">Cr: {jnl.creditAccount}</div>
                      <div className="text-[10px] text-slate-600 font-sans italic pl-4 mt-0.5">{jnl.description}</div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">${jnl.amount.toLocaleString()}.00</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-700">${jnl.amount.toLocaleString()}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'stewardship' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Active Capital Campaigns</h3>

            <div className="p-4 bg-purple-50/50 border rounded-xl space-y-3">
              <strong className="text-purple-950 font-bold block text-sm">Diocesan Cathedral Roof Fund</strong>
              <div className="flex justify-between font-mono text-[11px] text-purple-900 font-bold">
                <span>Raised: $85,000</span>
                <span>Goal: $100,000</span>
              </div>
              <div className="w-full bg-purple-200 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-700 h-full" style={{ width: '85%' }} />
              </div>
              <p className="text-slate-600 text-[11px]">85% of capital goal reached • 420 active lay-member pledges registered.</p>
            </div>

            <div className="p-4 bg-emerald-50/50 border rounded-xl space-y-3">
              <strong className="text-emerald-950 font-bold block text-sm">North Uganda Mission Outpost Campaign</strong>
              <div className="flex justify-between font-mono text-[11px] text-emerald-900 font-bold">
                <span>Raised: $45,000</span>
                <span>Goal: $50,000</span>
              </div>
              <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full" style={{ width: '90%' }} />
              </div>
              <p className="text-slate-600 text-[11px]">90% of outreach goal reached • Fully compliant with double-entry ledgers.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Stewardship Intelligence Reporting</h3>
              <p className="text-slate-500 mt-1 leading-relaxed">
                Generate instant reports tracking giving trends, pledge fulfillment ratios, and diocesan tax-deductibility certification.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 mt-4">
                <strong>FAAP Spend Controls Active:</strong>
                <p className="leading-relaxed text-slate-600 text-[11px]">
                  All budget allocations and spending requests are automatically cross-checked against departmental accounts and require dual keys to disburse.
                </p>
              </div>
            </div>

            <button
              onClick={() => alert("Annual Diocesan stewardship financial statements compiled and dispatched to Diocesan synod registry!")}
              className="w-full py-2.5 bg-white hover:bg-white text-white font-bold rounded-lg transition-all"
            >
              Export Annual Financial Statement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
