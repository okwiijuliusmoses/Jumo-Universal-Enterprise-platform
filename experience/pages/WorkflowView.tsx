/**
 * Interactive Workflow Automation & Rules Engine Console (/workflow)
 */

import React, { useState, useEffect } from 'react';
import { GitFork, ToggleLeft, ToggleRight, Plus, RefreshCw, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import { apiService } from '../services/api';

export const WorkflowView: React.FC = () => {
  const [rules, setRules] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  // New Rule Form
  const [name, setName] = useState<string>('');
  const [triggerEvent, setTriggerEvent] = useState<string>('FAAP_HIGH_RISK_DETECTED');
  const [condition, setCondition] = useState<string>('riskScoreFactor > 1.2');
  const [action, setAction] = useState<string>('FLAG_FOR_APPROVAL');

  const fetchWorkflowData = async () => {
    setLoading(true);
    try {
      const [rRes, lRes] = await Promise.all([
        apiService.getWorkflowRules(),
        apiService.getWorkflowLogs(),
      ]);

      if (rRes.status === 'SUCCESS') setRules(rRes.rules || []);
      if (lRes.status === 'SUCCESS') setLogs(lRes.logs || []);
    } catch (err: any) {
      console.error('Failed to load workflow data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflowData();
  }, []);

  const handleToggle = async (id: string) => {
    try {
      const res = await apiService.toggleWorkflowRule(id);
      if (res.status === 'SUCCESS') {
        setMessage(`Rule ${id} toggled.`);
        fetchWorkflowData();
      }
    } catch (err: any) {
      setMessage(`Toggle Failed: ${err.message}`);
    }
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await apiService.createWorkflowRule({
        name,
        triggerEvent,
        condition,
        action,
        enabled: true,
      });

      if (res.status === 'SUCCESS') {
        setMessage(`Workflow rule '${name}' created.`);
        setName('');
        fetchWorkflowData();
      }
    } catch (err: any) {
      setMessage(`Rule Creation Failed: ${err.message}`);
    }
  };

  const handleTriggerTest = async (evt: string) => {
    try {
      const res = await apiService.triggerWorkflowEvent(evt, { testTriggeredBy: 'WorkflowConsole' });
      if (res.status === 'SUCCESS') {
        setMessage(`Triggered event '${evt}'. ${res.triggeredCount} rules executed.`);
        fetchWorkflowData();
      }
    } catch (err: any) {
      setMessage(`Event Dispatch Failed: ${err.message}`);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Automated Rules & Workflow Engine</h2>
          <p className="text-xs text-slate-600 font-mono">
            Event-Driven Platform Policies, Risk Escalation & Compliance Orchestration
          </p>
        </div>
        <button
          onClick={fetchWorkflowData}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-slate-200 hover:border-slate-200 text-slate-700 text-xs font-mono rounded-lg transition-colors w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Rules & Logs</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 text-[#0078D4] text-xs font-mono rounded-lg flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="text-[#0078D4] hover:text-white text-sm font-bold">
            ×
          </button>
        </div>
      )}

      {/* Rules Engine Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rules Table */}
        <div className="lg:col-span-2 p-6 bg-white/60 border border-slate-200 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <GitFork className="w-4 h-4 text-[#0078D4]" />
              <span>Active Workflow Rules</span>
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleTriggerTest('FAAP_HIGH_RISK_DETECTED')}
                className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 text-[#0078D4] text-[10px] font-mono rounded hover:bg-blue-500/20"
              >
                Test High Risk Trigger
              </button>
              <button
                onClick={() => handleTriggerTest('TREASURY_POOL_DEPLETED')}
                className="px-2 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-300 text-[10px] font-mono rounded hover:bg-sky-500/20"
              >
                Test Pool Depleted Trigger
              </button>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{rule.name}</span>
                    <span className="text-[10px] text-slate-500">({rule.id})</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <span className="text-[#0078D4]">Trigger:</span> {rule.triggerEvent} |{' '}
                    <span className="text-sky-400">Condition:</span> {rule.condition}
                  </div>
                  <div className="text-[11px] text-emerald-400">
                    <span>Action:</span> {rule.action}
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    onClick={() => handleToggle(rule.id)}
                    className="flex items-center space-x-1.5 text-xs text-slate-700 hover:text-white transition-colors"
                  >
                    {rule.enabled ? (
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-slate-600" />
                    )}
                    <span>{rule.enabled ? 'Enabled' : 'Disabled'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Rule Form */}
        <div className="p-6 bg-white/60 border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Create Custom Rule</span>
          </h3>

          <form onSubmit={handleCreateRule} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-slate-600 mb-1">Rule Name</label>
              <input
                type="text"
                placeholder="e.g. Drawdown Limit Guardrail"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-200 text-white p-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Trigger Event</label>
              <select
                value={triggerEvent}
                onChange={(e) => setTriggerEvent(e.target.value)}
                className="w-full bg-white border border-slate-200 text-white p-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="FAAP_HIGH_RISK_DETECTED">FAAP_HIGH_RISK_DETECTED</option>
                <option value="TREASURY_POOL_DEPLETED">TREASURY_POOL_DEPLETED</option>
                <option value="ROLE_OVERRIDE_EXECUTED">ROLE_OVERRIDE_EXECUTED</option>
                <option value="TENANT_DRAWDOWN_REQUESTED">TENANT_DRAWDOWN_REQUESTED</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Condition Expression</label>
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-white border border-slate-200 text-white p-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Action Code</label>
              <input
                type="text"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full bg-white border border-slate-200 text-white p-2.5 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Register Workflow Rule</span>
            </button>
          </form>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="p-6 bg-white/60 border border-slate-200 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Zap className="w-4 h-4 text-sky-400" />
          <span>Workflow Execution Audit Trail</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-3 px-3">Exec ID</th>
                <th className="py-3 px-3">Rule Name</th>
                <th className="py-3 px-3">Triggered At</th>
                <th className="py-3 px-3">Payload Summary</th>
                <th className="py-3 px-3">Result</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-700">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/30 transition-colors">
                  <td className="py-3 px-3 text-white">{log.id}</td>
                  <td className="py-3 px-3 font-bold text-[#0078D4]">{log.ruleName}</td>
                  <td className="py-3 px-3 text-slate-600">{new Date(log.triggeredAt).toLocaleString()}</td>
                  <td className="py-3 px-3 max-w-xs truncate text-slate-600">
                    {JSON.stringify(log.payload)}
                  </td>
                  <td className="py-3 px-3 text-slate-200">{log.result}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-emerald-400 flex items-center justify-end space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
