import React, { useState } from 'react';
import { Boxes, Plus, Search, Filter, AlertTriangle, ArrowUpRight, ArrowDownRight, Tag, RefreshCw } from 'lucide-react';

interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  quantityOnHand: number;
  reorderPoint: number;
  unitCost: number;
  sellingPrice: number;
  valuationMethod: 'FIFO' | 'AVCO';
  assetAccount: string;
}

export const InventoryModule: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([
    { sku: 'SKU-LAB-01', name: 'High-Purity Ethanol (20L)', category: 'Laboratory Consumables', quantityOnHand: 45, reorderPoint: 15, unitCost: 180000, sellingPrice: 240000, valuationMethod: 'FIFO', assetAccount: '1200 - Inventory Assets' },
    { sku: 'SKU-ICT-02', name: 'Cat6 Network Cable Roll (305m)', category: 'IT Supplies', quantityOnHand: 12, reorderPoint: 5, unitCost: 350000, sellingPrice: 480000, valuationMethod: 'FIFO', assetAccount: '1200 - Inventory Assets' },
    { sku: 'SKU-OFF-03', name: 'A4 Ream Paper (Box of 5)', category: 'Stationery', quantityOnHand: 8, reorderPoint: 20, unitCost: 85000, sellingPrice: 110000, valuationMethod: 'AVCO', assetAccount: '1200 - Inventory Assets' },
    { sku: 'SKU-TEXT-04', name: 'Chemistry S.3 Pupil Textbook', category: 'Library & Textbooks', quantityOnHand: 150, reorderPoint: 30, unitCost: 25000, sellingPrice: 35000, valuationMethod: 'FIFO', assetAccount: '1200 - Inventory Assets' }
  ]);

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSku, setNewSku] = useState('');
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState('General Inventory');
  const [newQty, setNewQty] = useState(0);
  const [newCost, setNewCost] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  const totalAssetValuation = items.reduce((sum, item) => sum + (item.quantityOnHand * item.unitCost), 0);
  const lowStockCount = items.filter(item => item.quantityOnHand <= item.reorderPoint).length;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSku || !newName || newQty < 0 || newCost <= 0) {
      alert('Please fill out all required inventory fields.');
      return;
    }
    const item: InventoryItem = {
      sku: newSku,
      name: newName,
      category: newCat,
      quantityOnHand: newQty,
      reorderPoint: 10,
      unitCost: newCost,
      sellingPrice: newPrice,
      valuationMethod: 'FIFO',
      assetAccount: '1200 - Inventory Assets'
    };
    setItems(prev => [...prev, item]);
    setShowAddModal(false);
    setNewSku('');
    setNewName('');
    setNewQty(0);
    setNewCost(0);
    setNewPrice(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inventory & Stock Accounting</h1>
          <p className="text-slate-500 text-sm">QuickBooks-benchmarked inventory valuation (FIFO/AVCO), stock reorder alerts & sales-linked ledger posting.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add Inventory Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inventory Asset Value</span>
          <p className="text-3xl font-black text-slate-900 mt-1 font-mono">{totalAssetValuation.toLocaleString()} UGX</p>
          <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Posted to Account 1200
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active Stock SKUs</span>
          <p className="text-3xl font-black text-slate-900 mt-1 font-mono">{items.length}</p>
          <p className="text-xs text-slate-500 mt-2">Catalogued & COGS Linked</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reorder / Low Stock Alerts</span>
          <p className="text-3xl font-black text-amber-600 mt-1 font-mono">{lowStockCount} Items</p>
          <p className="text-xs text-amber-600 font-bold mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Reorder Point Reached
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by SKU or item name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
            />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase">Valuation Model: FIFO (First In, First Out)</span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">SKU / Code</th>
              <th className="px-6 py-4">Item Name & Category</th>
              <th className="px-6 py-4 text-right">Qty on Hand</th>
              <th className="px-6 py-4 text-right">Unit Cost (UGX)</th>
              <th className="px-6 py-4 text-right">Total Valuation (UGX)</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase())).map((item) => {
              const totalVal = item.quantityOnHand * item.unitCost;
              const isLow = item.quantityOnHand <= item.reorderPoint;
              return (
                <tr key={item.sku} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-slate-800 text-xs">{item.sku}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.category}</p>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">{item.quantityOnHand}</td>
                  <td className="px-6 py-4 text-right font-mono text-slate-700">{item.unitCost.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono font-black text-emerald-700">{totalVal.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${isLow ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {isLow ? 'REORDER NOW' : 'IN STOCK'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Register Inventory SKU</h3>
            <form onSubmit={handleAddItem} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">SKU Code</label>
                <input type="text" required value={newSku} onChange={e => setNewSku(e.target.value)} placeholder="e.g. SKU-STAT-09" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Item Title</label>
                <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Whiteboard Markers Pack" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Quantity</label>
                  <input type="number" required value={newQty} onChange={e => setNewQty(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Unit Cost (UGX)</label>
                  <input type="number" required value={newCost} onChange={e => setNewCost(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-lg">Save SKU</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
