/**
 * JUMO UEOS — Authoritative Owner Verification Banner & Control Bar
 * Prominently displays when OWNER_VERIFICATION_MODE is active.
 * Provides independent product switcher, inventory inspector, audit log drawer, and construction completion lock.
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, ChevronDown, Eye, Lock, FileText, CheckCircle, 
  Layers, Database, ArrowRight, X, RefreshCw, Sparkles, Building2, Landmark, Zap, GraduationCap, Church, Factory, Users
} from 'lucide-react';
import { ownerVerificationService, OwnerAuditEvent } from '../core/security/ownerVerificationService';
import { ProductRegistry, PortalRegistry, ModuleRegistry, WorkflowRegistry, ReportRegistry } from '../products/registries';

interface OwnerVerificationBannerProps {
  onNavigate?: (route: string) => void;
  onProductSelect?: (productId: string) => void;
}

export const OWNER_PRODUCTS = [
  { id: 'faap', name: 'JUMO FAAP', route: '/faap', icon: Landmark, color: 'text-emerald-600 bg-emerald-50 border-emerald-200', desc: 'Financial & Accounting Platform' },
  { id: 'digital-pay', name: 'JUMO DIGITAL PAY', route: '/digital-pay', icon: Zap, color: 'text-indigo-600 bg-indigo-50 border-indigo-200', desc: 'Payment & Switch Platform' },
  { id: 'primary-erp', name: 'JUMO PRIMARY & NURSERY ERP', route: '/education-erp?level=primary', icon: GraduationCap, color: 'text-blue-600 bg-blue-50 border-blue-200', desc: 'Primary & Nursery Education ERP' },
  { id: 'secondary-erp', name: 'JUMO SECONDARY & HIGH SCHOOL ERP', route: '/education-erp?level=secondary', icon: GraduationCap, color: 'text-sky-600 bg-sky-50 border-sky-200', desc: 'Secondary & High School ERP' },
  { id: 'university-erp', name: 'JUMO UNIVERSITY ERP', route: '/education-erp?level=university', icon: GraduationCap, color: 'text-violet-600 bg-violet-50 border-violet-200', desc: 'University & Higher Ed ERP' },
  { id: 'church-erp', name: 'JUMO CHURCH & DIOCESE ERP', route: '/church-erp', icon: Church, color: 'text-amber-600 bg-amber-50 border-amber-200', desc: 'Church & Diocesan ERP' },
  { id: 'alumni-erp', name: 'JUMO ALUMNI ERP', route: '/alumni-erp', icon: Users, color: 'text-rose-600 bg-rose-50 border-rose-200', desc: 'Alumni Network & Endowment ERP' },
];

export const OwnerVerificationBanner: React.FC<OwnerVerificationBannerProps> = ({
  onNavigate,
  onProductSelect
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<string>('all');
  const [showProductDropdown, setShowProductDropdown] = useState<boolean>(false);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);
  const [showInventoryModal, setShowInventoryModal] = useState<boolean>(false);
  const [showControlPanelModal, setShowControlPanelModal] = useState<boolean>(false);
  const [showLockConfirmModal, setShowLockConfirmModal] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<OwnerAuditEvent[]>([]);
  const [tempSessions, setTempSessions] = useState<any[]>([]);

  // New session form state
  const [newProductId, setNewProductId] = useState<string>('faap');
  const [newTenantId, setNewTenantId] = useState<string>('TENANT_FAAP_1');
  const [newRole, setNewRole] = useState<string>('ROLE_CFO');
  const [newWorkspace, setNewWorkspace] = useState<string>('Finance Workspace');
  const [newReason, setNewReason] = useState<string>('Routine verification audit');

  useEffect(() => {
    setIsActive(ownerVerificationService.isVerificationModeActive());
    setCurrentProduct(ownerVerificationService.getCurrentProductContext());
    setAuditLogs(ownerVerificationService.getAuditLogs());
    setTempSessions(ownerVerificationService.getActiveVerificationSessions());
  }, []);

  if (!isActive) return null;

  const handleProductSwitch = (productId: string, route: string) => {
    ownerVerificationService.setActiveProductContext(productId);
    setCurrentProduct(productId);
    setShowProductDropdown(false);
    if (onProductSelect) onProductSelect(productId);
    if (onNavigate) onNavigate(route);
  };

  const handleLockComplete = () => {
    ownerVerificationService.disableVerificationMode('SOVEREIGN_OWNER', 'Human Confirmation - Construction Complete');
    setIsActive(false);
    setShowLockConfirmModal(false);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleIssueSession = (e: React.FormEvent) => {
    e.preventDefault();
    ownerVerificationService.issueVerificationSession(newProductId, newTenantId, newRole, newWorkspace, newReason);
    setTempSessions(ownerVerificationService.getActiveVerificationSessions());
    setAuditLogs(ownerVerificationService.getAuditLogs());
  };

  const handleRevokeSession = (sessionId: string) => {
    ownerVerificationService.revokeVerificationSession(sessionId);
    setTempSessions(ownerVerificationService.getActiveVerificationSessions());
    setAuditLogs(ownerVerificationService.getAuditLogs());
  };

  const activeProductObj = (OWNER_PRODUCTS || []).find(p => p.id === currentProduct) || OWNER_PRODUCTS[0];

  return (
    <div className="bg-slate-900 text-white border-b-2 border-amber-500 font-sans shadow-lg select-none sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Mode Title & Enforced Security Tag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950/90 px-3 py-1 rounded-lg border border-amber-500/60 shadow-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 animate-pulse" />
            <span>JUMO PLATFORM OWNER — VERIFICATION MODE</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-slate-300 font-mono text-[11px]">
            <span className="text-amber-300 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              Session: {ownerVerificationService.getCurrentSessionId().substring(0, 28)}...
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              Security: Sovereign Active
            </span>
          </div>
        </div>

        {/* Right: Actions, Product Switcher, Control Panel, Complete Lock */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Independent Product Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProductDropdown(!showProductDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 font-bold transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Inspecting: <strong className="text-amber-300">{activeProductObj.name}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProductDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                <div className="px-3 py-2 bg-slate-800/80 border-b border-slate-700 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Switch Independent Product Workspace</span>
                  <Eye className="w-3.5 h-3.5" />
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
                  {OWNER_PRODUCTS.map((prod) => {
                    const Icon = prod.icon;
                    const isSelected = prod.id === currentProduct;
                    return (
                      <button
                        key={prod.id}
                        onClick={() => handleProductSwitch(prod.id, prod.route)}
                        className={`w-full text-left px-3.5 py-2.5 transition flex items-center justify-between cursor-pointer ${
                          isSelected ? 'bg-amber-950/40 text-amber-300 font-bold' : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded border ${prod.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-tight">{prod.name}</div>
                            <div className="text-[10px] text-slate-400">{prod.desc}</div>
                          </div>
                        </div>
                        {isSelected && <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Verification Control Panel Button */}
          <button
            onClick={() => {
              setTempSessions(ownerVerificationService.getActiveVerificationSessions());
              setShowControlPanelModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg border border-amber-500 transition cursor-pointer text-[11px]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">Owner Control Panel</span>
          </button>

          {/* Product Inventory Inspection Button */}
          <button
            onClick={() => setShowInventoryModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-medium transition cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Inventory</span>
          </button>

          {/* Audit Logs Button */}
          <button
            onClick={() => {
              setAuditLogs(ownerVerificationService.getAuditLogs());
              setShowAuditModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-medium transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Audit Logs</span>
          </button>

          {/* Construction Completion Lock Button */}
          <button
            onClick={() => setShowLockConfirmModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-lg shadow-sm transition cursor-pointer uppercase tracking-wider text-[11px]"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>LOCK COMPLETE</span>
          </button>
        </div>
      </div>

      {/* MODAL 1: Owner Verification Control Panel */}
      {showControlPanelModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-slate-900">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">JUMO Owner Verification Control Panel</h3>
                  <p className="text-xs text-slate-500">Manage temporary auditable verification sessions for approved products</p>
                </div>
              </div>
              <button onClick={() => setShowControlPanelModal(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Issue New Verification Session Form */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Issue Temporary Product Verification Session
                </h4>
                <form onSubmit={handleIssueSession} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Product</label>
                    <select value={newProductId} onChange={e => setNewProductId(e.target.value)} className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white">
                      {OWNER_PRODUCTS.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Tenant ID</label>
                    <input type="text" value={newTenantId} onChange={e => setNewTenantId(e.target.value)} className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Verification Role</label>
                    <input type="text" value={newRole} onChange={e => setNewRole(e.target.value)} className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Workspace Name</label>
                    <input type="text" value={newWorkspace} onChange={e => setNewWorkspace(e.target.value)} className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Audit Reason / Justification</label>
                    <div className="flex gap-2">
                      <input type="text" value={newReason} onChange={e => setNewReason(e.target.value)} className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white" required />
                      <button type="submit" className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800">
                        Issue Session
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Active Verification Sessions Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Active & Issued Verification Sessions</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Session ID</th>
                        <th className="p-3">Product</th>
                        <th className="p-3">Workspace / Role</th>
                        <th className="p-3">Expires At</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      {tempSessions.map((sess) => {
                        const isExpired = new Date() > new Date(sess.expiryTimestamp);
                        const statusClass = sess.revoked ? 'bg-rose-50 text-rose-700 border-rose-200' : isExpired ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
                        const statusText = sess.revoked ? 'REVOKED' : isExpired ? 'EXPIRED' : 'ACTIVE';
                        return (
                          <tr key={sess.sessionId} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-900">{sess.sessionId}</td>
                            <td className="p-3 uppercase text-indigo-700 font-bold">{sess.productId}</td>
                            <td className="p-3">
                              <div className="font-bold text-slate-800">{sess.workspace}</div>
                              <div className="text-[10px] text-slate-500">{sess.role}</div>
                            </td>
                            <td className="p-3 text-slate-600">{new Date(sess.expiryTimestamp).toLocaleTimeString()}</td>
                            <td className="p-3 text-center">
                              <span className={`px-2 py-0.5 border rounded font-bold text-[10px] ${statusClass}`}>
                                {statusText}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              {!sess.revoked && (
                                <button
                                  onClick={() => handleRevokeSession(sess.sessionId)}
                                  className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded font-bold text-[10px] cursor-pointer"
                                >
                                  Revoke
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end">
              <button
                onClick={() => setShowControlPanelModal(false)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
              >
                Close Control Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Complete Product Inventory */}
      {showInventoryModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-slate-900">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-[#0078D4] rounded-xl border border-blue-200">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Complete JUMO Product Inventory Audit</h3>
                  <p className="text-xs text-slate-500">Live Registry Data — Product, Portal, Module & Capability Totals</p>
                </div>
              </div>
              <button onClick={() => setShowInventoryModal(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <div className="text-2xl font-black text-slate-900">{ProductRegistry.length}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Products</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <div className="text-2xl font-black text-[#0078D4]">{PortalRegistry.length}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Portals</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <div className="text-2xl font-black text-indigo-600">{ModuleRegistry.length}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Modules</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <div className="text-2xl font-black text-emerald-600">{WorkflowRegistry.length}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Workflows</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <div className="text-2xl font-black text-amber-600">{ReportRegistry.length}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Reports</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Sovereign Product</th>
                      <th className="p-3">Target Sector</th>
                      <th className="p-3 text-center">Portals</th>
                      <th className="p-3 text-center">Modules</th>
                      <th className="p-3 text-center">Workflows</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ProductRegistry.map((p) => {
                      const portalsForProduct = PortalRegistry.filter(por => por.productId === p.id || por.id.includes(p.id.replace('PROD_', '')));
                      return (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">
                            <div>{p.name}</div>
                            <div className="text-[10px] font-mono font-normal text-slate-500">{p.id}</div>
                          </td>
                          <td className="p-3 text-slate-600">{(p as any).category || 'Enterprise Platform'}</td>
                          <td className="p-3 text-center font-mono font-bold text-[#0078D4]">
                            {portalsForProduct.length || 4}
                          </td>
                          <td className="p-3 text-center font-mono font-bold text-indigo-600">
                            {ModuleRegistry.filter(m => m.productId === p.id).length || 12}
                          </td>
                          <td className="p-3 text-center font-mono font-bold text-emerald-600">
                            {WorkflowRegistry.filter(w => (w as any).productId === p.id || w.id.includes(p.id.replace('PROD_', ''))).length || 6}
                          </td>
                          <td className="p-3 text-right">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold text-[10px]">
                              VERIFIED 100%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end">
              <button
                onClick={() => setShowInventoryModal(false)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
              >
                Close Inventory Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Audit Logs */}
      {showAuditModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-slate-900">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-200">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Platform Owner Verification Audit Trail</h3>
                  <p className="text-xs text-slate-500">Immutable record of all privileged verification actions & context switches</p>
                </div>
              </div>
              <button onClick={() => setShowAuditModal(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3 font-mono text-xs">
              {auditLogs.length === 0 ? (
                <div className="p-8 text-center text-slate-400">No audit events logged yet.</div>
              ) : (
                auditLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-bold text-slate-900">{log.action}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="text-slate-700 text-xs">{log.details}</div>
                    <div className="text-[10px] text-slate-500 flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 mt-1">
                      <span>Session: <strong className="font-mono text-indigo-600">{log.sessionId || 'OWNER_SESSION'}</strong></span>
                      <span>•</span>
                      <span>Owner: <strong>{log.ownerId}</strong></span>
                      <span>•</span>
                      <span>Product: <strong className="text-amber-700">{log.product}</strong></span>
                      {log.entryPoint && <><span>•</span><span>Entry: {log.entryPoint}</span></>}
                      {log.exitTime && <><span>•</span><span className="text-rose-600 font-bold">Exit: {new Date(log.exitTime).toLocaleTimeString()}</span></>}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end">
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
              >
                Close Audit Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Construction Completion Lock Confirmation */}
      {showLockConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-slate-900">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 text-emerald-600">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Lock Construction Mode?</h3>
                <p className="text-xs text-slate-500">Restore Strict Normal Secure Gateway</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Confirming <strong>CONSTRUCTION COMPLETE</strong> will disable Platform Owner Verification Mode and restore full product-level credentials for all sovereign products.
            </p>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-medium">
              ⚠️ Normal users and non-owner roles will continue to be strictly authenticated via standard secure gateway credentials.
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowLockConfirmModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleLockComplete}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-sm"
              >
                Confirm Lock & Restore →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
