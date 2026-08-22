import React, { useState } from 'react';
import { 
  FlaskConical, Monitor, ShieldAlert, CheckCircle2, 
  Search, Filter, Plus, Printer, AlertTriangle, Cpu, Wrench
} from 'lucide-react';

export const LaboratoriesOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SCIENCE' | 'ICT' | 'REAGENTS' | 'SAFETY'>('SCIENCE');

  const scienceEquipment = [
    { id: 'LAB-CHE-001', lab: 'Chemistry Advanced Lab', item: 'Analytical Electronic Balance (0.001g)', qty: 12, condition: 'Calibrated & Working', location: 'Cupboard A1' },
    { id: 'LAB-CHE-002', lab: 'Chemistry Advanced Lab', item: 'Burettes 50ml (Borosilicate)', qty: 140, condition: 'All Intact', location: 'Glassware Rack 3' },
    { id: 'LAB-PHY-001', lab: 'Physics Practical Lab', item: 'Cathode Ray Oscilloscopes (CRO)', qty: 16, condition: 'Operational', location: 'Electronics Bench' },
    { id: 'LAB-PHY-002', lab: 'Physics Practical Lab', item: 'Optical Benches & Lens Sets', qty: 45, condition: 'Good', location: 'Optics Cabinet' },
    { id: 'LAB-BIO-001', lab: 'Biology Practical Lab', item: 'Binocular Compound Microscopes', qty: 60, condition: 'Serviced Term II', location: 'Microscopy Bay' }
  ];

  const ictWorkstations = [
    { stationId: 'ICT-WS-01 to 40', room: 'Main Computing Lab 1', specs: 'Core i7, 16GB RAM, 512GB SSD', os: 'Ubuntu Linux 24.04 LTS / Win 11 Dual Boot', status: 'All 40 Active & Networked' },
    { stationId: 'ICT-WS-41 to 85', room: 'Advanced Software & Robotics Lab 2', specs: 'Core i9, 32GB RAM, RTX 4060 GPU', os: 'Linux / Python 3.12 / Scratch / Arduino IDE', status: 'All 45 Active & Networked' }
  ];

  return (
    <div className="space-y-6">
      {/* Office Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-xs">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">SCIENCE & ICT LABORATORIES MANAGEMENT</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-200">
                UNEB Approved Practical Center
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Chemistry, Physics, Biology apparatus, chemical reagents inventory, and 85-terminal ICT computer networks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Reagent Requisition</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'SCIENCE', label: 'Science Labs Apparatus (Chem, Phy, Bio)' },
          { id: 'ICT', label: 'Computer & ICT Labs (85 Terminals)' },
          { id: 'REAGENTS', label: 'Chemical Reagents & Safety Data (MSDS)' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tables */}
      {activeTab === 'SCIENCE' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Science Laboratories Inventory</h3>
            <span className="text-xs text-slate-500 font-mono">UNEB Exam Ready</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Item Code</th>
                  <th className="px-4 py-2.5">Laboratory</th>
                  <th className="px-4 py-2.5">Apparatus Description</th>
                  <th className="px-4 py-2.5 text-center">Quantity</th>
                  <th className="px-4 py-2.5">Storage Location</th>
                  <th className="px-4 py-2.5 text-center">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {scienceEquipment.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-teal-700">{item.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{item.lab}</td>
                    <td className="px-4 py-3 text-slate-800">{item.item}</td>
                    <td className="px-4 py-3 text-center font-bold text-slate-900 font-mono">{item.qty}</td>
                    <td className="px-4 py-3 text-slate-600">{item.location}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                        {item.condition}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'ICT' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Computer & ICT Laboratories (85 High-Performance Terminals)</h3>
            <p className="text-xs text-slate-500">Dual-boot configurations, optical fibre high-speed connectivity, and coding environments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ictWorkstations.map((ws, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{ws.room}</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded">
                    {ws.status}
                  </span>
                </div>
                <div className="text-xs text-slate-700"><strong>Workstations:</strong> {ws.stationId}</div>
                <div className="text-xs text-slate-600"><strong>Hardware Specs:</strong> {ws.specs}</div>
                <div className="text-[11px] font-mono text-teal-800 bg-teal-50 p-2 rounded border border-teal-200">
                  {ws.os}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'REAGENTS' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Chemical Reagents & Material Safety (MSDS Compliance)</h3>
            <p className="text-xs text-slate-500">Acid-proof storage lockers, ventilation hoods, and hazardous chemical logs</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
            All analytical grade chemicals (Hydrochloric Acid, Nitric Acid, Sodium Hydroxide, Potassium Permanganate) are stored in fire-resistant, dual-lock cabinets under the supervision of the Chief Lab Technician.
          </div>
        </div>
      )}
    </div>
  );
};
