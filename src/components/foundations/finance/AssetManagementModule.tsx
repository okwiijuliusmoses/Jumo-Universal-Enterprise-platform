import React, { useState } from "react";
import { Plus } from "lucide-react";

export function AssetManagementModule({ data, refreshData }: { data: any, refreshData: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ asset_name: "", category: "IT Equipment", purchase_cost: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/erpnext/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asset_name: formData.asset_name,
          category: formData.category,
          purchase_cost: Number(formData.purchase_cost),
          current_value: Number(formData.purchase_cost),
          location: "HQ",
          department: "General"
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
          <h2 className="text-lg font-bold text-slate-900">Asset Management</h2>
          <p className="text-sm text-slate-500">Register, track and depreciate fixed assets</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Register Asset
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Asset ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Purchase Date</th>
              <th className="px-4 py-3 font-medium text-right">Cost</th>
              <th className="px-4 py-3 font-medium text-right">Current Value</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data?.map((asset: any) => (
              <tr key={asset.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-900">{asset.id}</td>
                <td className="px-4 py-3">{asset.asset_name}</td>
                <td className="px-4 py-3">{asset.category}</td>
                <td className="px-4 py-3">{asset.purchase_date || asset.created_at?.split('T')[0]}</td>
                <td className="px-4 py-3 text-right">{asset.purchase_cost?.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-medium">{asset.current_value?.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                    {asset.status}
                  </span>
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">No assets registered.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Register Fixed Asset</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Asset Name</label>
                <input required value={formData.asset_name} onChange={e => setFormData({...formData, asset_name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                  <option>IT Equipment</option>
                  <option>Vehicles</option>
                  <option>Furniture</option>
                  <option>Machinery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Purchase Cost</label>
                <input required type="number" value={formData.purchase_cost} onChange={e => setFormData({...formData, purchase_cost: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold">{loading ? 'Saving...' : 'Register'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
