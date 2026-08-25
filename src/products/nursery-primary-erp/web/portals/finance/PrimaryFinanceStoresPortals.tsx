import React, { useState } from 'react';
import { 
  DollarSign, Layers, Clipboard, Plus, CheckCircle2, 
  TrendingUp, AlertTriangle, Download, PackageCheck
} from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';

// ==========================================
// 1. PROCUREMENT & TENDERS OFFICE
// ==========================================
export const PrimaryProcurementPortal: React.FC = () => {
  const [requisitions, setRequisitions] = useState([
    { id: 'REQ-2026-081', item: 'White Dustless Chalk (50 Cartons)', dept: 'Academics', amount: 3500000, vendor: 'Uganda Bookshop Ltd', status: 'APPROVED' },
    { id: 'REQ-2026-082', item: 'Science Laboratory Chemical Reagents', dept: 'Science Labs', amount: 6200000, vendor: 'Scientific Supplies Uganda', status: 'APPROVED' },
    { id: 'REQ-2026-083', item: 'Boarding Dining Maize Flour (50 Bags)', dept: 'Catering', amount: 7500000, vendor: 'Kakira Grain Millers', status: 'IN_REVIEW' }
  ]);
  const [showReqForm, setShowReqForm] = useState(false);

  const handleCreateReq = (data: any) => {
    setRequisitions([...requisitions, {
      id: `REQ-2026-0${requisitions.length + 84}`,
      item: data.item,
      dept: data.dept,
      amount: Number(data.amount),
      vendor: data.vendor,
      status: 'IN_REVIEW'
    }]);
    setShowReqForm(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Primary Procurement & Supplies Office</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              LPO Generation • Vendor Quotations • Vote Book Commitments • Pre-Audit Clearance
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowReqForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-700 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Raise Purchase Requisition
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Approved Commitments</span>
            <div className="text-2xl font-black text-slate-900 mt-1">17,200,000 UGX</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">Vote Book Encumbered</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Pending Bursar Approval</span>
            <div className="text-2xl font-black text-amber-600 mt-1">7,500,000 UGX</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">1 Requisition Pending</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prequalified Vendors</span>
            <div className="text-2xl font-black text-slate-900 mt-1">24 Vendors</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">PPDA Compliant</span>
          </div>
        </div>

        <JumoDataTable
          data={requisitions}
          title="Procurement Requisitions & Local Purchase Orders (LPO)"
          columns={[
            { header: 'LPO Ref', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Item / Service Requisitioned', accessor: 'item', className: 'font-bold' },
            { header: 'Department', accessor: 'dept', className: 'text-xs text-slate-500 font-bold' },
            { header: 'Vendor', accessor: 'vendor', className: 'text-xs text-slate-700' },
            { header: 'Amount', accessor: (r: any) => `${r.amount.toLocaleString()} UGX`, className: 'font-mono font-black text-right text-slate-900' },
            { header: 'Status', accessor: (r: any) => (
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${r.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {r.status}
              </span>
            )}
          ]}
        />

        {showReqForm && (
          <JumoForm
            title="Create Purchase Requisition"
            fields={[
              { id: 'item', label: 'Item Description & Quantity', type: 'text', required: true, placeholder: 'e.g. Exercise Books A4 (100 Dozen)' },
              { id: 'dept', label: 'Department', type: 'select', required: true, options: [
                { value: 'Academics', label: 'Academics & Curriculum' },
                { value: 'Science Labs', label: 'Science Labs' },
                { value: 'Catering', label: 'Catering & Kitchen' },
                { value: 'Boarding', label: 'Boarding & Hostel' },
                { value: 'Estates', label: 'Estates & Maintenance' }
              ]},
              { id: 'amount', label: 'Estimated Budget Amount (UGX)', type: 'number', required: true },
              { id: 'vendor', label: 'Preferred Vendor', type: 'text', required: true, placeholder: 'e.g. Mukwano Industries Ltd' }
            ]}
            onSubmit={handleCreateReq}
            onCancel={() => setShowReqForm(false)}
          />
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. STORES & INVENTORY MANAGEMENT
// ==========================================
export const PrimaryStoresPortal: React.FC = () => {
  const [stock, setStock] = useState([
    { sku: 'STK-001', name: 'Exam Answer Sheets (A4 Ruled)', unit: 'Reams', inStock: 450, minLevel: 100, status: 'SUFFICIENT' },
    { sku: 'STK-002', name: 'White Board Markers (Blue/Black)', unit: 'Boxes', inStock: 120, minLevel: 30, status: 'SUFFICIENT' },
    { sku: 'STK-003', name: 'Sanitizer & Hygiene Detergent', unit: 'Jerrycans (20L)', inStock: 14, minLevel: 10, status: 'LOW_STOCK' },
    { sku: 'STK-004', name: 'Kitchen Cooking Oil', unit: 'Jerrycans (20L)', inStock: 25, minLevel: 8, status: 'SUFFICIENT' }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Primary Central Stores & Inventory</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Bin Cards • Goods Received Notes (GRN) • Stock Issue Vouchers • Reorder Alarms
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Tracked SKUs</span>
            <div className="text-2xl font-black text-slate-900 mt-1">164 Items</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">Full Stock Audit Complete</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Items Below Reorder Level</span>
            <div className="text-2xl font-black text-amber-600 mt-1">1 Item Flagged</div>
            <span className="text-[10px] text-amber-600 font-bold mt-1">Auto-Requisition Generated</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Valuation</span>
            <div className="text-2xl font-black text-slate-900 mt-1">84,500,000 UGX</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">Valued at Weighted Cost</span>
          </div>
        </div>

        <JumoDataTable
          data={stock}
          title="Consumables & Assets Bin Card Ledger"
          columns={[
            { header: 'Stock SKU', accessor: 'sku', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Item Name', accessor: 'name', className: 'font-bold' },
            { header: 'Unit of Measure', accessor: 'unit', className: 'text-xs text-slate-500' },
            { header: 'Current Stock', accessor: (s: any) => `${s.inStock} ${s.unit}`, className: 'font-mono font-bold text-right text-slate-900' },
            { header: 'Reorder Level', accessor: (s: any) => `${s.minLevel} ${s.unit}`, className: 'font-mono text-xs text-right text-slate-400' },
            { header: 'Status', accessor: (s: any) => (
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${s.status === 'SUFFICIENT' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {s.status}
              </span>
            )}
          ]}
        />
      </div>
    </div>
  );
};
