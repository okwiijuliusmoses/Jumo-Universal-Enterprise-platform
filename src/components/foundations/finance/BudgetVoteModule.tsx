import React, { useState } from "react";
import { Plus } from "lucide-react";

export function BudgetVoteModule({ budgets, votes, refreshData }: { budgets: any, votes: any, refreshData: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ vote_name: "", budget_allocated: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/erpnext/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vote_code: `V-${Math.floor(Math.random() * 900) + 100}`,
          vote_name: formData.vote_name,
          budget_allocated: Number(formData.budget_allocated),
          amount_released: 0,
          commitments: 0,
          actual_expenditure: 0,
          available_balance: Number(formData.budget_allocated)
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
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Expenditure Control & Budget</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Allocated</p>
            <p className="text-2xl font-bold text-slate-900">
              {budgets?.reduce((acc: number, b: any) => acc + b.total_allocated, 0).toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-sm font-medium text-emerald-700 mb-1">Total Utilized</p>
            <p className="text-2xl font-bold text-emerald-900">
              {budgets?.reduce((acc: number, b: any) => acc + b.total_utilized, 0).toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm font-medium text-blue-700 mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-blue-900">
              {budgets?.reduce((acc: number, b: any) => acc + (b.total_allocated - b.total_utilized), 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Vote Book</h3>
          <button onClick={() => setShowModal(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Vote
          </button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Vote Code</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium text-right">Allocated</th>
              <th className="px-4 py-3 font-medium text-right">Commitments</th>
              <th className="px-4 py-3 font-medium text-right">Actual</th>
              <th className="px-4 py-3 font-medium text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {votes?.map((vote: any) => (
              <tr key={vote.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{vote.vote_code}</td>
                <td className="px-4 py-3">{vote.vote_name}</td>
                <td className="px-4 py-3 text-right">{vote.budget_allocated?.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">{vote.commitments?.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">{vote.actual_expenditure?.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-medium text-emerald-600">{vote.available_balance?.toLocaleString()}</td>
              </tr>
            ))}
            {(!votes || votes.length === 0) && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No votes found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">New Budget Vote</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vote Name / Department</label>
                <input required value={formData.vote_name} onChange={e => setFormData({...formData, vote_name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Budget Allocated</label>
                <input required type="number" value={formData.budget_allocated} onChange={e => setFormData({...formData, budget_allocated: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">{loading ? 'Saving...' : 'Add Vote'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
