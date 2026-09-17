import React, { useState } from "react";
import { CheckCircle2, DollarSign, Search, Plus, Activity } from "lucide-react";

export function CashBookModule({ data, refreshData }: { data: any, refreshData: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ description: "", amount: "", type: "Receipt" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/erpnext/cash-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: formData.description,
          amount: Number(formData.amount),
          type: formData.type
        })
      });
      if (res.ok) {
        setShowModal(false);
        refreshData();
      }
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Cash Book</h2>
          <p className="text-sm text-slate-500">Manage receipts, payments, and transfers</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Entry
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
                <th className="px-4 py-3 font-medium text-right">Balance</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.map((entry: any) => (
                <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">{entry.posting_date}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{entry.id}</td>
                  <td className="px-4 py-3">{entry.description}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${entry.type === 'Receipt' ? 'bg-emerald-100 text-emerald-800' : entry.type === 'Payment' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'}`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{entry.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-900">{entry.balance.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${entry.status === 'Reconciled' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-800'}`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">No cash book entries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">New Cash Book Entry</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Entry Type</label>
                <select 
                  value={formData.type} 
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                >
                  <option value="Receipt">Receipt</option>
                  <option value="Payment">Payment</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <input 
                  type="text" 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                <input 
                  type="number" 
                  required
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700">
                  {loading ? 'Saving...' : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
