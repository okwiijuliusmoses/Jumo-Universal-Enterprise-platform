import React, { useState } from 'react';
import { 
  BarChart, LineChart, PieChart, Activity, Cpu, Sparkles, Send, 
  Layers, CheckSquare, ListTodo, AlertTriangle, ArrowRight,
  TrendingUp, Users, DollarSign, Briefcase, Calendar, ShieldCheck,
  FileText, Play, CheckCircle, RefreshCw, X, ChevronRight, Download, Filter
} from 'lucide-react';
import { JumoForm, FormField } from '../components/JumoForm';
import { UniversalDataGrid } from '../components/grid/UniversalDataGrid';
import { DynamicWorkingTable } from '../../../components/common/table/DynamicWorkingTable';

export type UIMetadataType = 
  | 'DASHBOARD'
  | 'TABLE'
  | 'FORM'
  | 'WORKFLOW'
  | 'REPORT'
  | 'KANBAN'
  | 'CHART'
  | 'AI_ASSISTANT'
  | 'DETAIL_VIEW'
  | 'SETTINGS';

export interface UIMetadataObject {
  id: string;
  type: UIMetadataType;
  title: string;
  description?: string;
  config?: any;
}

interface DynamicUIRendererProps {
  metadata: UIMetadataObject;
  onAction?: (actionId: string, payload?: any) => void;
  onClose?: () => void;
}

export const DynamicUIRenderer: React.FC<DynamicUIRendererProps> = ({
  metadata,
  onAction,
  onClose
}) => {
  const { type, title, description, config = {} } = metadata;

  // Local state for dynamic forms/actions/UI interactions
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [aiChatHistory, setAiChatHistory] = useState<Array<{ sender: 'user' | 'agent'; text: string; timestamp: string }>>([
    { sender: 'agent', text: `Greetings, Operator. I am the Sovereign AI agent for ${title}. Ready to coordinate cognitive decisions.`, timestamp: new Date().toLocaleTimeString() }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiThinking, setAiThinking] = useState(false);

  // Trigger Action Dispatcher
  const handleActionClick = (actionId: string, payload?: any) => {
    if (onAction) {
      onAction(actionId, payload);
    } else {
      console.log(`[DynamicUIRenderer] Action Dispatched: ${actionId}`, payload);
    }
  };

  // 1. DASHBOARD RENDERER
  const renderDashboard = () => {
    const kpis = config.kpis || [
      { id: '1', label: 'Active Users', value: '1,420', change: '+12.4%', icon: Users, color: 'text-emerald-500' },
      { id: '2', label: 'Financial Volume', value: '$45,892.00', change: '+8.3%', icon: DollarSign, color: 'text-indigo-500' },
      { id: '3', label: 'Compute Allocation', value: '0.045s Latency', change: '-2.4%', icon: Cpu, color: 'text-cyan-500' },
      { id: '4', label: 'Sovereign Integrity', value: '100% SECURE', change: 'Verified', icon: ShieldCheck, color: 'text-purple-500' }
    ];

    const alerts = config.alerts || [
      { id: 'a1', text: 'SecOps Rule Gate fully verified for all tenant modules.', severity: 'INFO' },
      { id: 'a2', text: 'Dynamic metadata compiler successfully reconciled 100% of the capability fabric.', severity: 'SUCCESS' }
    ];

    return (
      <div className="space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi: any, idx: number) => {
            const KpiIcon = kpi.icon || TrendingUp;
            return (
              <div key={kpi.id || idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">{kpi.label}</span>
                  <KpiIcon className={`w-4 h-4 ${kpi.color || 'text-slate-500'}`} />
                </div>
                <div className="mt-4">
                  <div className="text-xl font-black text-slate-800 tracking-tight">{kpi.value}</div>
                  <div className="text-[10px] text-emerald-500 font-mono mt-0.5 font-bold">{kpi.change}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Alerts */}
        <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl space-y-3">
          <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">System Surveillance Streams</h4>
          <div className="space-y-2">
            {alerts.map((alert: any) => (
              <div key={alert.id} className="flex items-center gap-2 text-xs bg-white border border-slate-100 p-2.5 rounded-xl">
                <span className={`h-2 w-2 rounded-full ${alert.severity === 'WARNING' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <span className="font-mono text-slate-500 text-[10px] uppercase font-bold">[{alert.severity}]</span>
                <span className="text-slate-700 font-medium">{alert.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Section Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Tasks */}
          <div className="bg-white border border-slate-100 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Operational Action Board</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">Direct dynamic action gates mapped for this capability workspace.</p>
            <div className="space-y-2 pt-2">
              <button 
                onClick={() => setShowFormModal(true)}
                className="w-full text-left bg-indigo-50 hover:bg-indigo-100/60 border border-indigo-100 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-bold text-indigo-700 transition"
              >
                <span>Trigger Dynamic Schema-Form Gate</span>
                <ArrowRight className="w-4 h-4 text-indigo-500" />
              </button>
              <button 
                onClick={() => handleActionClick('RECONCILE_METADATA')}
                className="w-full text-left bg-slate-50 hover:bg-slate-100 border border-slate-100 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700 transition"
              >
                <span>Initiate Dynamic Self-Reconciliation Loop</span>
                <RefreshCw className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* AI Sandbox Widget */}
          <div className="bg-white border border-slate-100 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" /> Embedded Agent Copilot
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">Sovereign agent context bound directly to this metadata segment.</p>
              <div className="text-xs italic bg-slate-50 border border-slate-100 p-3 rounded-xl text-slate-600 mt-2">
                "Ready to audit transactions, map telemetry logs, or run Ring-0 system updates under your explicit command."
              </div>
            </div>
            <button 
              onClick={() => handleActionClick('OPEN_AI_COGNITIVE')}
              className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2 text-[10px] font-black uppercase tracking-wider transition"
            >
              Initialize Cognitive Session
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 2. TABLE / GRID RENDERER
  const renderTable = () => {
    const rawData = config.data || [
      { id: '1', name: 'Alumni Core Enrollment Gate', category: 'Enrollment', status: 'ACTIVE', volume: 540, integrity: 'Verified' },
      { id: '2', name: 'Parish Census Ledger Sync', category: 'Census', status: 'ACTIVE', volume: 1280, integrity: 'Verified' },
      { id: '3', name: 'Nursery Primary Student Roster', category: 'Registry', status: 'ACTIVE', volume: 850, integrity: 'Pending' },
      { id: '4', name: 'M-Pesa Merchant Settlement clearing', category: 'Clearing', status: 'ACTIVE', volume: 3200, integrity: 'Verified' }
    ];

    const columns = config.columns || [
      { header: 'ID', accessor: 'id', width: '80px', sortable: true },
      { header: 'Subject / Title', accessor: 'name', sortable: true },
      { header: 'Category', accessor: 'category', sortable: true },
      { header: 'Status', accessor: (r: any) => (
        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100 uppercase">
          {r.status}
        </span>
      )},
      { header: 'Record Weight', accessor: 'volume', sortable: true }
    ];

    return (
      <div className="space-y-4">
        <UniversalDataGrid
          title={title}
          data={rawData}
          columns={columns}
          onAddRecord={() => setShowFormModal(true)}
          onViewRecord={(row) => handleActionClick('VIEW_ROW', row)}
          onEditRecord={(row) => handleActionClick('EDIT_ROW', row)}
          onDeleteRecord={(row) => handleActionClick('DELETE_ROW', row)}
        />
      </div>
    );
  };

  // 3. FORM RENDERER
  const renderForm = () => {
    const fields: FormField[] = config.fields || [
      { id: 'record_name', label: 'Subject Identifier', type: 'text', required: true, placeholder: 'Enter subject identifier' },
      { id: 'record_category', label: 'Registry Category', type: 'select', required: true, options: [
        { value: 'academic', label: 'Academic Registries' },
        { value: 'fintech', label: 'Fintech Cleared Settlements' },
        { value: 'census', label: 'Parish Census / Ledger' }
      ] },
      { id: 'record_volume', label: 'Compute Data Weight', type: 'number', required: false, placeholder: '100' },
      { id: 'record_notes', label: 'Surveillance Comments', type: 'textarea', placeholder: 'Optional notes' }
    ];

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-2xl mx-auto space-y-6">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">{title}</h3>
          {description && <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{description}</p>}
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleActionClick('FORM_SUBMIT', formData); }} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  {field.label} {field.required && <span className="text-rose-500">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-slate-900 outline-none"
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                  >
                    <option value="">Select an option...</option>
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-slate-900 outline-none min-h-[80px]"
                    placeholder={field.placeholder}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                  />
                ) : (
                  <input 
                    type={field.type} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-slate-900 outline-none"
                    placeholder={field.placeholder}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800"
            >
              Publish Metadata Record
            </button>
          </div>
        </form>
      </div>
    );
  };

  // 4. WORKFLOW RENDERER
  const renderWorkflow = () => {
    const steps = config.steps || [
      { id: '1', name: 'Sovereign Token Registry Verification', status: 'COMPLETED', agent: 'SecOps Auditor' },
      { id: '2', name: 'FAAP Double-Entry Balance Parity Check', status: 'COMPLETED', agent: 'FAAP Accountant Agent' },
      { id: '3', name: 'Ring-0 Distributed Storage Snapshot', status: 'ACTIVE', agent: 'L2 Storage Guard' },
      { id: '4', name: 'Compliance Signoff', status: 'PENDING', agent: 'Regulatory Twin' }
    ];

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-3xl mx-auto space-y-6">
        <div>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">{title}</h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Active execution graph of dynamic workflow pipeline steps.</p>
        </div>

        <div className="space-y-4">
          {steps.map((step: any, idx: number) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                  step.status === 'COMPLETED' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' :
                  step.status === 'ACTIVE' ? 'bg-indigo-50 border-indigo-500 text-indigo-600 animate-pulse' :
                  'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  {step.status === 'COMPLETED' ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                </div>
                {idx < steps.length - 1 && <div className="h-10 w-0.5 bg-slate-200 my-1" />}
              </div>

              <div className="flex-1 bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-800">{step.name}</h4>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                    step.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                    step.status === 'ACTIVE' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {step.status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Responsible Agent: {step.agent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 5. REPORT RENDERER
  const renderReport = () => {
    const summary = config.summary || {
      totalVolume: '$840,290.00',
      totalRecords: '14,209 Items',
      integrityState: '100% Sane'
    };

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">{title}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Sovereign ledger transaction reports compiled via analytical metadata schema mapping.</p>
          </div>
          <button 
            onClick={() => handleActionClick('PRINT_REPORT')}
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" /> Export PDF Ledger
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Consolidated Amount</span>
            <div className="text-lg font-black text-slate-800 mt-1">{summary.totalVolume}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Audited Entries</span>
            <div className="text-lg font-black text-slate-800 mt-1">{summary.totalRecords}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Ledger Balance Status</span>
            <div className="text-lg font-black text-emerald-600 mt-1">{summary.integrityState}</div>
          </div>
        </div>

        {/* Dynamic Ledger Entries Table */}
        <div className="border border-slate-100 rounded-xl overflow-hidden text-xs">
          <div className="bg-slate-50 px-4 py-2.5 font-bold text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
            Reconciled Balance Sheets
          </div>
          <table className="w-full text-left font-medium">
            <thead className="text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="py-2 px-4">Ledger Account</th>
                <th className="py-2 px-4">Balance Type</th>
                <th className="py-2 px-4 text-right">Debit</th>
                <th className="py-2 px-4 text-right">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-4 font-mono font-bold text-slate-800">10100 - Sovereign Treasury Reserve</td>
                <td className="py-2.5 px-4 text-slate-500">Asset (Settled)</td>
                <td className="py-2.5 px-4 text-right font-mono text-emerald-600">$45,000.00</td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-400">$0.00</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-bold text-slate-800">40100 - Fee clearing Operations</td>
                <td className="py-2.5 px-4 text-slate-500">Revenue (Consolidated)</td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-400">$0.00</td>
                <td className="py-2.5 px-4 text-right font-mono text-emerald-600">$45,000.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 6. KANBAN RENDERER
  const renderKanban = () => {
    const columns = config.columns || [
      { id: 'todo', title: 'Open Backlog', color: 'bg-slate-100 text-slate-800 border-slate-200' },
      { id: 'in_progress', title: 'In Flight', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
      { id: 'testing', title: 'Verification', color: 'bg-amber-50 text-amber-800 border-amber-200' },
      { id: 'done', title: 'Completed', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
    ];

    const tasks = config.tasks || [
      { id: 't1', title: 'Implement DynamicUIRenderer core interface', column: 'in_progress', priority: 'HIGH' },
      { id: 't2', title: 'Reconstruct Nursery/Primary route bindings', column: 'done', priority: 'CRITICAL' },
      { id: 't3', title: 'Integrate DynamicWorkingTable telemetry', column: 'testing', priority: 'MEDIUM' },
      { id: 't4', title: 'Register missing Secondary high-school metadata', column: 'todo', priority: 'HIGH' }
    ];

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">{title}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Interactive board mapping development, deployment, and task backlogs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((col: any) => {
            const colTasks = tasks.filter((t: any) => t.column === col.id);
            return (
              <div key={col.id} className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex flex-col gap-3 min-h-[350px]">
                <div className={`px-2.5 py-1 rounded-xl border font-bold text-[10px] uppercase tracking-wider flex justify-between items-center ${col.color}`}>
                  <span>{col.title}</span>
                  <span className="font-mono">{colTasks.length}</span>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto">
                  {colTasks.map((task: any) => (
                    <div 
                      key={task.id} 
                      onClick={() => handleActionClick('KANBAN_CARD_CLICK', task)}
                      className="bg-white border border-slate-100 p-3.5 rounded-xl hover:shadow-sm transition cursor-pointer space-y-2 group"
                    >
                      <h4 className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-50">
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-black ${
                          task.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                          task.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">ID: {task.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 7. CHART RENDERER
  const renderChart = () => {
    const dataPoints = config.dataPoints || [
      { label: 'Jan', value: 45, volume: 120 },
      { label: 'Feb', value: 62, volume: 140 },
      { label: 'Mar', value: 85, volume: 190 },
      { label: 'Apr', value: 70, volume: 165 },
      { label: 'May', value: 95, volume: 210 },
      { label: 'Jun', value: 110, volume: 245 }
    ];

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-3xl mx-auto space-y-6">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">{title}</h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Direct visual metrics generated from telemetry tracking nodes.</p>
        </div>

        {/* Elegant SVG Custom Area Chart */}
        <div className="h-64 flex flex-col justify-between">
          <div className="flex-1 flex items-end gap-3.5 border-b border-slate-100 pb-4">
            {dataPoints.map((dp: any, idx: number) => {
              const pct = (dp.value / 120) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                  {/* Dynamic Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] font-mono px-2 py-1 rounded absolute -translate-y-16 transition shadow-md">
                    Value: {dp.value}
                  </div>
                  {/* Bar */}
                  <div 
                    style={{ height: `${pct}%` }} 
                    className="w-full bg-slate-100 group-hover:bg-indigo-600 rounded-lg transition-all relative overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-indigo-400/50" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">{dp.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // 8. AI ASSISTANT RENDERER
  const handleAiSend = () => {
    if (!aiInput.trim()) return;

    const userMsg = { sender: 'user' as const, text: aiInput, timestamp: new Date().toLocaleTimeString() };
    setAiChatHistory(prev => [...prev, userMsg]);
    setAiInput('');
    setAiThinking(true);

    setTimeout(() => {
      const responseText = `Action executed successfully. I mapped your request against the Sovereign Capability Registry. Process node initialized on isolated cluster [TEN-01-SEC].`;
      const agentMsg = { sender: 'agent' as const, text: responseText, timestamp: new Date().toLocaleTimeString() };
      setAiChatHistory(prev => [...prev, agentMsg]);
      setAiThinking(false);
      handleActionClick('AI_EXECUTE_ACTION', { query: aiInput, response: responseText });
    }, 1500);
  };

  const renderAIAssistant = () => {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm max-w-3xl mx-auto flex flex-col h-[500px] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
              <Cpu className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">{title}</h3>
              <p className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest mt-0.5">Ring-0 Cognitive Copilot • Secure Session</p>
            </div>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {aiChatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-2xl text-xs space-y-1 ${
                msg.sender === 'user' 
                  ? 'bg-slate-900 text-white rounded-br-none' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none shadow-xs'
              }`}>
                <p className="font-medium leading-relaxed">{msg.text}</p>
                <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                  <span>{msg.sender === 'user' ? 'Operator' : 'AI Agent'}</span>
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))}

          {aiThinking && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-3 rounded-2xl flex items-center gap-2 text-xs text-slate-400 font-medium">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                <span>AI Agent thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-3 border-t border-slate-100 flex gap-2 bg-white">
          <input 
            type="text"
            placeholder="Instruct the cognitive assistant..."
            value={aiInput}
            onChange={e => setAiInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAiSend()}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
          />
          <button 
            onClick={handleAiSend}
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 flex items-center justify-center transition active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Main Dynamic Switcher Router
  const renderUINode = () => {
    switch (type) {
      case 'DASHBOARD': return renderDashboard();
      case 'TABLE': return renderTable();
      case 'FORM': return renderForm();
      case 'WORKFLOW': return renderWorkflow();
      case 'REPORT': return renderReport();
      case 'KANBAN': return renderKanban();
      case 'CHART': return renderChart();
      case 'AI_ASSISTANT': return renderAIAssistant();
      default: return (
        <div className="text-center py-12 text-slate-400 bg-white border border-slate-100 rounded-2xl p-6">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Unsupported Node Type</h4>
          <p className="text-[10px] text-slate-400 mt-1">This metadata node type is currently deferred.</p>
        </div>
      );
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Optional Metadata Header Card */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 shadow-xl shadow-slate-950/20 relative overflow-hidden">
        {/* Dynamic Background Pattern overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent opacity-30 pointer-events-none" />

        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <span>{type} Renderer Node</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </h2>
            <h1 className="text-base font-black tracking-tight text-white mt-0.5 uppercase">{title}</h1>
            {description && <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-xl mt-1">{description}</p>}
          </div>
        </div>

        {onClose && (
          <button 
            onClick={onClose}
            className="p-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl transition text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Render Node */}
      <div className="min-h-[300px]">
        {renderUINode()}
      </div>

      {/* Embedded Form Modal popup for adding records */}
      {showFormModal && (
        <JumoForm
          title={`Publish Record — ${title}`}
          fields={[
            { id: 'record_name', label: 'Subject Identifier', type: 'text', required: true, placeholder: 'Enter name or ID' },
            { id: 'record_notes', label: 'Surveillance Comments', type: 'textarea', placeholder: 'Optional notes' }
          ]}
          onCancel={() => setShowFormModal(false)}
          onSubmit={(data) => {
            setFormData(data);
            setShowFormModal(false);
            handleActionClick('FORM_SUBMIT_POPUP', data);
          }}
        />
      )}
    </div>
  );
};
