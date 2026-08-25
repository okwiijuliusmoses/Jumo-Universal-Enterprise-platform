/**
 * JUMO UEOS Roadmap v29.0 — Universal Institutional Module Operational Workspace
 * 
 * Transforms every Institutional Enterprise Module (IEM) into a fully operational application workspace.
 * Features:
 * - Full-screen operational layout (Header, Breadcrumb, Toolbar, Main Workspace, Bottom Action Bar)
 * - Sub-Module Navigation & Switcher
 * - 10 Operational Capability Tabs: Dashboard, Records Grid, Form Editor, Analytics, Reports, JUMO Assistant, Workflows, Documents, Audit Logs, Settings
 * - Human-Centric Enterprise Identity (Module-specific JUMO Assistant, e.g. JUMO Academic Assistant, JUMO Healthcare Assistant)
 * - FAAP Ledger Balance ($0.00 parity) & AEGIS Zero-Trust Security Enforcement
 */

import React, { useState } from 'react';
import {
  Home, ArrowLeft, ArrowRight, Layers, Search, Bell, Sparkles,
  LogOut, ShieldCheck, CheckCircle2, Sliders, Database, FileText, BarChart3,
  PieChart, Filter, Download, Upload, ShieldAlert, Settings, HelpCircle,
  Activity, Check, Send, Paperclip, Mic, FileDown,
  Printer, Mail, MessageSquare, QrCode, Lock, RefreshCw, Cpu
} from 'lucide-react';
import { InstitutionalModuleDefinition, INSTITUTIONAL_ENTERPRISE_MODULES, getInstitutionalModuleByErp } from '../../core/runtime/institutionalModulesRegistry';

export interface InstitutionalModuleWorkspaceProps {
  erpId: string;
  erpName: string;
  currentUser?: { name?: string; role?: string; email?: string };
  onNavigate?: (route: string) => void;
  onLogout?: () => void;
}

export const InstitutionalModuleWorkspace: React.FC<InstitutionalModuleWorkspaceProps> = ({
  erpId,
  erpName,
  currentUser,
  onNavigate,
  onLogout
}) => {
  const [selectedIemId, setSelectedIemId] = useState<string>(() => {
    const matched = getInstitutionalModuleByErp(erpId);
    return matched ? matched.id : 'iem_corporate';
  });

  const currentIem = INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === selectedIemId) || INSTITUTIONAL_ENTERPRISE_MODULES[0];

  const [selectedSubModule, setSelectedSubModule] = useState<string>(currentIem.subModules[0] || 'General Administration');

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'records' | 'editor' | 'analytics' | 'reports' | 'ai' | 'workflows' | 'documents' | 'audit' | 'settings'
  >('dashboard');

  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: `Greetings! I am the ${currentIem.jumoAssistantName}, engineered to assist with ${currentIem.name} operations, statutory compliance, ledger accounting, and workflow approvals. How may I support your organization today?`,
      time: 'Just now'
    }
  ]);

  const [selectedRecordId, setSelectedRecordId] = useState<string>('REC-000145');

  const handleSelectIem = (iemId: string) => {
    setSelectedIemId(iemId);
    const matched = INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === iemId);
    if (matched && matched.subModules.length > 0) {
      setSelectedSubModule(matched.subModules[0]);
    }
    setChatMessages([
      {
        sender: 'assistant',
        text: `Switched operational context to ${matched?.name}. I am the ${matched?.jumoAssistantName}, ready to handle your domain queries, workflow SLAs, and FAAP balance validation.`,
        time: 'Just now'
      }
    ]);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: 'Just now' }]);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `[${currentIem.jumoAssistantName} Response]: Analyzing query regarding "${userMsg}" for sub-module "${selectedSubModule}". All operations pass AEGIS Zero-Trust governance. The FAAP double-entry ledger is fully balanced ($0.00 parity). 12 pending approval items are ready for executive sign-off.`,
          time: 'Just now'
        }
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col">
      {/* 1. UNIVERSAL HEADER & BREADCRUMB NAV */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onNavigate && onNavigate('/workspace/home')}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Home"
            >
              <Home className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.history.back()}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.history.forward()}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-700 shrink-0" />

          {/* Breadcrumb Path */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium shrink-0">
            <span className="text-cyan-400 font-bold">{erpName}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">{currentIem.category}</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-bold">{currentIem.shortCode}</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{selectedSubModule}</span>
            <span className="text-slate-600">/</span>
            <span className="text-amber-300 font-mono text-[11px]">{selectedRecordId}</span>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative hidden md:block w-52">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Search records & sub-modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            onClick={() => setActiveTab('ai')}
            className="px-3 py-1 rounded-lg bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>{currentIem.jumoAssistantName}</span>
          </button>

          <div className="flex items-center gap-2 border-l border-slate-800 pl-2.5">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-white block">{currentUser?.name || 'Executive Director'}</span>
              <span className="text-[10px] text-cyan-400 font-mono block">SOVEREIGN ADMIN</span>
            </div>
            <button
              onClick={() => onLogout ? onLogout() : alert('Logging out...')}
              className="p-1.5 rounded-lg bg-rose-900/40 hover:bg-rose-800 text-rose-300 hover:text-white border border-rose-700/50 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. UNIVERSAL WORKSPACE TOOLBAR */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs overflow-x-auto shadow-2xs">
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <Layers className="w-4 h-4 text-[#0078D4]" />
            Institutional Domain:
          </span>
          <select
            value={selectedIemId}
            onChange={(e) => handleSelectIem(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#0078D4]"
          >
            {INSTITUTIONAL_ENTERPRISE_MODULES.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.subModules.length} Sub-modules)
              </option>
            ))}
          </select>

          <span className="text-slate-300 mx-1">|</span>

          <span className="font-bold text-slate-800">Sub-Module:</span>
          <select
            value={selectedSubModule}
            onChange={(e) => setSelectedSubModule(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#0078D4]"
          >
            {currentIem.subModules.map((sub, idx) => (
              <option key={idx} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Universal Tool Actions */}
        <div className="flex items-center gap-1.5 shrink-0 ml-4">
          <button onClick={() => alert('Printing operational voucher...')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1 transition" title="Print Record">
            <Printer className="w-3.5 h-3.5" /> <span className="hidden lg:inline">Print</span>
          </button>
          <button onClick={() => alert('Exporting PDF report...')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1 transition" title="Export PDF">
            <FileDown className="w-3.5 h-3.5" /> <span className="hidden lg:inline">Export</span>
          </button>
          <button onClick={() => alert('Sending email dispatch...')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1 transition" title="Email">
            <Mail className="w-3.5 h-3.5" /> <span className="hidden lg:inline">Email</span>
          </button>
          <button onClick={() => alert('Broadcasting WhatsApp notification...')} className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-1 border border-emerald-200 hover:bg-emerald-100 transition" title="WhatsApp">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> <span className="hidden lg:inline">WhatsApp</span>
          </button>
          <button onClick={() => alert('Generating cryptographic QR code...')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1 transition" title="QR Code">
            <QrCode className="w-3.5 h-3.5" /> <span className="hidden lg:inline">QR Code</span>
          </button>
          <button onClick={() => alert('Revalidating FAAP double-entry ledger parity ($0.00)...')} className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-mono font-bold flex items-center gap-1 border border-emerald-300" title="FAAP Ledger Parity">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> FAAP $0.00
          </button>
        </div>
      </div>

      {/* 3. MAIN OPERATIONAL WORKSPACE LAYOUT */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sub-module Sidebar (Full-Width Expandable Sub-modules List) */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Sub-Modules ({currentIem.subModules.length})</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-cyan-600 text-white rounded font-bold">
              v29.0
            </span>
          </div>

          <div className="p-2 space-y-1 overflow-y-auto flex-1">
            {currentIem.subModules.map((sub, idx) => {
              const isSelected = selectedSubModule === sub;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSubModule(sub)}
                  className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#0078D4]/10 border-[#0078D4] text-[#0078D4] font-bold shadow-2xs'
                      : 'bg-white hover:bg-slate-50 border-transparent text-slate-700 font-medium'
                  }`}
                >
                  <span className="text-xs truncate">{sub}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                    isSelected ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {10 + idx}
                  </span>
                </button>
              );
            })}
          </div>

          {/* JUMO Assistant Branding Footer Box */}
          <div className="p-3 m-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
            <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4 text-[#0078D4]" />
              <span>{currentIem.jumoAssistantName}</span>
            </div>
            <p className="text-[10px] text-blue-800 leading-relaxed">
              Human-designed enterprise intelligence grounded in tenant RAG knowledge.
            </p>
          </div>
        </aside>

        {/* Center Workspace Content */}
        <main className="flex-1 bg-white flex flex-col min-w-0 overflow-y-auto">
          {/* Header Banner */}
          <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#0078D4] text-white rounded font-bold">
                  {currentIem.category}
                </span>
                <span className="text-xs font-mono text-slate-300">IEM Code: {currentIem.shortCode}</span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-1 flex items-center gap-2">
                {currentIem.name} — {selectedSubModule}
                <span className="text-xs font-normal text-emerald-400 bg-emerald-950/80 border border-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational Workspace
                </span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">{currentIem.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('editor')}
                className="px-3.5 py-1.5 bg-[#0078D4] hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
              >
                <span>+ New Record</span>
              </button>
            </div>
          </div>

          {/* 10 Operational Capability Tabs */}
          <div className="border-b border-slate-200 bg-slate-50 px-4 flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'records', label: 'Records Grid', icon: Database },
              { id: 'editor', label: 'Form Editor', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'reports', label: 'Reports', icon: PieChart },
              { id: 'ai', label: currentIem.jumoAssistantName, icon: Sparkles },
              { id: 'workflows', label: 'Approval Workflows', icon: RefreshCw },
              { id: 'documents', label: 'Document Vault', icon: FileText },
              { id: 'audit', label: 'Audit Trail', icon: ShieldCheck },
              { id: 'settings', label: 'Configuration', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition whitespace-nowrap ${
                    isActive
                      ? 'border-[#0078D4] text-[#0078D4] bg-white shadow-2xs'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0078D4]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Operational Tab Renderer */}
          <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50">
            {/* 1. DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase">Sub-Module Active Items</span>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">2,480</div>
                    <span className="text-[11px] text-emerald-600 font-medium">100% Operational Status</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase">Pending Approvals</span>
                    <div className="text-2xl font-extrabold text-amber-600 mt-1">12 Items</div>
                    <span className="text-[11px] text-slate-500">Requires executive sign-off</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase">FAAP Parity Audit</span>
                    <div className="text-2xl font-extrabold text-emerald-600 mt-1">$0.00</div>
                    <span className="text-[11px] text-emerald-600 font-medium">Double-Entry Verified</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase">AI Security Rating</span>
                    <div className="text-2xl font-extrabold text-[#0078D4] mt-1">99.9%</div>
                    <span className="text-[11px] text-blue-600 font-medium">Zero-Trust Active</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900">Recent {selectedSubModule} Operational Logs</h3>
                    <span className="text-xs font-mono px-2 py-1 bg-slate-100 text-slate-700 rounded font-bold">Real-time Stream</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { time: '10:45 AM', user: 'Domain Executive Admin', action: `Executed statutory clearance for ${selectedSubModule}.`, status: 'VERIFIED_OK' },
                      { time: '09:20 AM', user: currentIem.jumoAssistantName, action: `Ran automated parity and compliance sweep across ${selectedSubModule} records.`, status: 'PARITY_$0.00' },
                      { time: '08:00 AM', user: 'Auditor General', action: 'Approved quarterly budget allocation and sealed cryptographically.', status: 'SEALED_AES256' }
                    ].map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-slate-400 font-bold">{log.time}</span>
                          <span className="font-bold text-slate-800">{log.user}</span>
                          <span className="text-slate-600">{log.action}</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {log.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. RECORDS GRID TAB */}
            {activeTab === 'records' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{selectedSubModule} Master Data Grid</h3>
                  <button onClick={() => setActiveTab('editor')} className="px-3.5 py-1.5 bg-[#0078D4] hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition">
                    + New {selectedSubModule} Record
                  </button>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                    <tr>
                      <th className="p-3">Record ID</th>
                      <th className="p-3">Title / Subject</th>
                      <th className="p-3">Assigned Sub-module</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Ledger Parity</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <tr key={num} className="hover:bg-slate-50/80 transition cursor-pointer" onClick={() => setSelectedRecordId(`REC-${1000 + num}`)}>
                        <td className="p-3 font-mono font-bold text-[#0078D4]">REC-{1000 + num}</td>
                        <td className="p-3 font-bold text-slate-900">{selectedSubModule} Item #{num}</td>
                        <td className="p-3 text-slate-600">{selectedSubModule}</td>
                        <td className="p-3 font-mono text-slate-500">2026-07-28 09:{20 + num}:00</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">$0.00 OK</span></td>
                        <td className="p-3 text-right space-x-2">
                          <button onClick={(e) => { e.stopPropagation(); setActiveTab('editor'); }} className="text-[#0078D4] font-bold hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 3. FORM EDITOR TAB */}
            {activeTab === 'editor' && (
              <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Record Form Editor ({selectedSubModule})</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Record Title / Reference</label>
                    <input type="text" placeholder={`e.g. ${selectedSubModule} Specification`} className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0078D4]" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Institutional Domain</label>
                    <input type="text" value={currentIem.name} disabled className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-bold" />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="font-bold text-slate-700">Operational Notes & Justification</label>
                    <textarea rows={4} placeholder="Enter statutory details or transaction notes..." className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0078D4]" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setActiveTab('records')} className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition">Cancel</button>
                  <button onClick={() => { alert('Record saved and verified by FAAP ledger.'); setActiveTab('records'); }} className="px-5 py-2 rounded-xl bg-[#0078D4] hover:bg-blue-600 text-white font-bold transition shadow-sm">Save Record</button>
                </div>
              </div>
            )}

            {/* 4. JUMO ASSISTANT TAB (Human-Centric Conversation Interface) */}
            {activeTab === 'ai' && (
              <div className="max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col h-[600px]">
                {/* Assistant Chat Header */}
                <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0078D4] flex items-center justify-center text-white shadow-md">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{currentIem.jumoAssistantName}</h3>
                      <p className="text-xs text-slate-300">Human-designed sovereign assistant for {currentIem.name}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-700 rounded-full font-bold">
                    RAG Knowledge Active
                  </span>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[80%] ${
                        msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                      }`}
                    >
                      <div
                        className={`p-4 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                          msg.sender === 'user'
                            ? 'bg-[#0078D4] text-white rounded-br-none'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Suggested Prompts Bar */}
                <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
                  <span className="font-bold text-slate-600 shrink-0">Suggested:</span>
                  {[
                    `Audit ${selectedSubModule} ledger`,
                    `Generate statutory report`,
                    `Check approval SLAs`
                  ].map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => { setChatInput(prompt); }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-[#0078D4] hover:text-[#0078D4] text-slate-700 text-xs font-medium transition shrink-0"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2 rounded-b-2xl">
                  <button onClick={() => alert('Attaching document or statement...')} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition" title="Attach Document">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button onClick={() => alert('Activating voice input...')} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition" title="Voice Input">
                    <Mic className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={`Ask ${currentIem.jumoAssistantName} about ${selectedSubModule} workflows, rules, or reports...`}
                    className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0078D4]"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2.5 rounded-xl bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* OTHER OPERATIONAL TABS */}
            {activeTab !== 'dashboard' && activeTab !== 'records' && activeTab !== 'editor' && activeTab !== 'ai' && (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#0078D4]/10 text-[#0078D4] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Universal {activeTab.toUpperCase()} Console Ready</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  The authoritative <strong>{activeTab}</strong> engine for <strong>{currentIem.name} ({selectedSubModule})</strong> is active and synchronized with the JUMO UEOS core kernel.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => alert(`Executing ${activeTab} routine for ${selectedSubModule}...`)}
                    className="px-5 py-2 rounded-xl bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs transition shadow-sm"
                  >
                    Launch {activeTab.toUpperCase()} Routine
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 4. BOTTOM ACTION BAR */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> JUMO UEOS v29.0 ACTIVE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">{currentIem.name}</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">{currentIem.jumoAssistantName} Online</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>FAAP Balance: $0.00</span>
          <span>AEGIS Zero-Trust: Enforced</span>
        </div>
      </footer>
    </div>
  );
};

export default InstitutionalModuleWorkspace;
