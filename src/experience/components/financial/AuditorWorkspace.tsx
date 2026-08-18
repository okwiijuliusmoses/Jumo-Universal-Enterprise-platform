import React, { useState } from 'react';
import { SecondarySchoolERPEngine } from '../../../erp/SecondarySchoolERPEngine';
import { AuditorRegisterEntry } from '../../../erp/types';
import { 
  ShieldAlert, AlertTriangle, CheckCircle2, FileText, Plus, Search, Filter, Send
} from 'lucide-react';

interface Props {
  erp: SecondarySchoolERPEngine;
}

export const AuditorWorkspace: React.FC<Props> = ({ erp }) => {
  const [entries, setEntries] = useState<AuditorRegisterEntry[]>(erp.getAuditorRegisterEntries());
  const [selectedId, setSelectedId] = useState<string>(entries[0]?.id || '');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  // New Finding State
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [findingTitle, setFindingTitle] = useState<string>('Unreconciled Contra Entry in Operating Cash Book');
  const [riskLevel, setRiskLevel] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [category, setCategory] = useState<AuditorRegisterEntry['category']>('GL_INTEGRITY');
  const [observation, setObservation] = useState<string>('Discrepancy observed between General Ledger cash transfers and bank feed statement.');
  const [recommendation, setRecommendation] = useState<string>('Perform automated 3-way reconciliation against JUPIE settlement log.');

  const selectedFinding = entries.find(e => e.id === selectedId) || entries[0];

  const handleLogFinding = (e: React.FormEvent) => {
    e.preventDefault();
    erp.logAuditorFinding({
      title: findingTitle,
      riskLevel,
      category,
      observation,
      recommendation,
      evidenceSummary: 'Sample Statutory Audit Inspection Voucher'
    });
    setEntries(erp.getAuditorRegisterEntries());
    setShowLogModal(false);
  };

  const filteredEntries = entries.filter(e => {
    if (filterRisk === 'ALL') return true;
    return e.riskLevel === filterRisk;
  });

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Statutory Internal Auditor Register Workspace</h1>
              <p className="text-sm text-slate-400">Audit Finding Register, Risk Scoring, Evidence Diagnostics & Management Remediations</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowLogModal(true)}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Log Statutory Audit Finding
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Finding List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Audit Register Observations</h2>
            <select 
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded-md px-2 py-1"
            >
              <option value="ALL">All Risks</option>
              <option value="HIGH">High Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
          </div>

          {filteredEntries.map(item => (
            <div 
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${item.id === selectedId ? 'bg-slate-800 border-rose-500/80 shadow-lg' : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-[11px] px-2 py-0.5 bg-slate-900 border border-slate-700 text-slate-300 font-bold rounded">
                  {item.findingRef}
                </span>
                <span className={`text-[10px] px-2 py-0.5 font-bold rounded-full border ${item.riskLevel === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                  {item.riskLevel} RISK
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-2 line-clamp-2">{item.title}</h3>
              <div className="mt-3 pt-2 border-t border-slate-700/60 flex justify-between items-center text-xs text-slate-400">
                <span>{item.category}</span>
                <span className="font-semibold text-emerald-400">{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Detailed Finding Diagnostics */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/60 rounded-xl p-6">
          {selectedFinding ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start pb-4 border-b border-slate-700/60">
                <div>
                  <span className="font-mono text-xs text-rose-400 font-bold">{selectedFinding.findingRef} — Domain: {selectedFinding.category}</span>
                  <h2 className="text-xl font-bold text-white mt-1">{selectedFinding.title}</h2>
                </div>
                <span className={`px-3 py-1 font-bold text-xs rounded-full border ${selectedFinding.riskLevel === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                  {selectedFinding.riskLevel} RISK
                </span>
              </div>

              {/* Observation & Evidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-rose-400 uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1">Auditor Observation</h4>
                  <p className="text-slate-200 leading-relaxed">{selectedFinding.observation}</p>
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-rose-400 uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1">Vouched Evidence Summary</h4>
                  <p className="text-slate-300 font-mono text-[11px]">{selectedFinding.evidenceSummary}</p>
                </div>
              </div>

              {/* Statutory Recommendation & Management Response */}
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                  <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">Statutory Corrective Mandate</h4>
                  <p className="text-slate-200 leading-relaxed">{selectedFinding.recommendation}</p>
                </div>

                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                  <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Management Action Response</h4>
                  <p className="text-slate-300 italic">{selectedFinding.managementResponse || 'Pending official response from Bursar / Headteacher.'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">Select an audit finding to view detailed inspection record.</div>
          )}
        </div>
      </div>

      {/* Log Finding Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Log Statutory Audit Finding</h3>
            <p className="text-xs text-slate-400 mb-4">Record formal audit observation and mandate remediation.</p>

            <form onSubmit={handleLogFinding} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Finding Title</label>
                <input 
                  type="text" 
                  required
                  value={findingTitle}
                  onChange={(e) => setFindingTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Risk Level</label>
                  <select 
                    value={riskLevel}
                    onChange={(e: any) => setRiskLevel(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5"
                  >
                    <option value="HIGH">HIGH RISK</option>
                    <option value="MEDIUM">MEDIUM RISK</option>
                    <option value="LOW">LOW RISK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Category Scope</label>
                  <select 
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5"
                  >
                    <option value="GL_INTEGRITY">GL Integrity</option>
                    <option value="FEES_RECEIVABLE">Fees Receivable</option>
                    <option value="PROCUREMENT_AP">Procurement AP</option>
                    <option value="BUDGET_VOTE">Budget Vote</option>
                    <option value="DIGITAL_PAY">Digital Pay</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Observation Details</label>
                <textarea 
                  required
                  rows={3}
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Statutory Corrective Mandate</label>
                <textarea 
                  required
                  rows={2}
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Log Finding Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
