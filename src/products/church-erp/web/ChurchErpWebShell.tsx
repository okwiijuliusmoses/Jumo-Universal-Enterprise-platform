/**
 * JUMO Church ERP — Sovereign Web Shell & Universal Product Portal
 * Sovereign church management suite integrating pastoral care, tithes, and events.
 */
import React, { useState, useEffect } from 'react';
import { 
  Building, Users, Heart, Calendar, CreditCard, PieChart, 
  Settings, Menu, Search, Bell, Home, ChevronRight, Lock, 
  LogIn, UserPlus, Layers, LayoutDashboard, Crosshair, ShieldCheck
} from 'lucide-react';
import { PlatformSwitcher } from '../../../components/PlatformSwitcher';
import { ChurchErpService } from '../domain/ChurchErpService';
import { ownerVerificationService } from '../../../core/security/ownerVerificationService';
import { OWNER_VERIFICATION_MODE } from '../../../core/security/OwnerVerificationModeRegistry';
import { SovereignVerificationCredentialRegistry } from '../../../core/security/SovereignVerificationRegistry';
import { AuthService } from '../../AuthService';
import { FormRegistry, WorkflowRegistry, ReportRegistry } from '../../registries';
import { PortalRegistry, ChurchTemplateRegistry, calculateRegistryStats, ModuleRegistry } from '../../registries';

import { ChurchDashboard } from './modules/ChurchDashboard';
import { MemberDirectory } from './modules/MemberDirectory';
import { PastoralCare } from './modules/PastoralCare';
import { ChurchFinance } from './modules/ChurchFinance';
import { EventManager } from './modules/EventManager';

type AppState = 'LANDING' | 'REGISTRATION' | 'LOGIN' | 'APP';

export const ChurchErpWebShell: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const service = ChurchErpService.getInstance();
  const stats = calculateRegistryStats().church;
  
  const [appState, setAppState] = useState<AppState>('LANDING');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activePortalId, setActivePortalId] = useState<string>('CH-PORTAL-BISHOP-0001');
  const [activeTab, setActiveTab] = useState<string>('MOD_CH_DASHBOARD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTemplate, setActiveTemplate] = useState<string>('LOCAL_CHURCH');
  
  const [members, setMembers] = useState(service.getMembers());
  const [donations, setDonations] = useState(service.getDonations());
  const [events, setEvents] = useState(service.getEvents());

  useEffect(() => {
    if (OWNER_VERIFICATION_MODE) {
      setLoginUsername(SovereignVerificationCredentialRegistry['JUMO-CHURCH'].username);
      setLoginPassword(SovereignVerificationCredentialRegistry['JUMO-CHURCH'].password);
    }
  }, []);

  // Sovereign Owner Verification Mode Indicator
  const renderVerificationMode = () => (
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
      <h2 className="text-amber-900 font-bold">PLATFORM OWNER VERIFICATION MODE</h2>
      <p className="text-amber-700 text-sm">Direct access is active. All product boundaries are preserved.</p>
    </div>
  );

  const handlePortalChange = (portalId: string) => {
    setActivePortalId(portalId);
    setActiveTab('DASHBOARD');
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <header className="px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">JUMO Church ERP</h1>
            <p className="text-xs text-slate-500">Universal Church Management Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setAppState('LOGIN')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign In</button>
          <button onClick={() => setAppState('REGISTRATION')} className="text-sm font-medium text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700">Register Ministry</button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-6">The Operating System for Modern Ministries</h2>
        <p className="text-lg text-slate-600 mb-10">
          A unified, template-driven digital hybrid platform for Local Churches, Multi-Campus Networks, and Dioceses.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <Users className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Member Management</h3>
            <p className="text-sm text-slate-600">Track attendance, small groups, and pastoral care lifecycles seamlessly.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <CreditCard className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Integrated Giving</h3>
            <p className="text-sm text-slate-600">Tithes, offerings, and pledges that post directly into FAAP's general ledger.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <Layers className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Multi-Campus Scaling</h3>
            <p className="text-sm text-slate-600">Dynamic architecture adapting from local congregations to global denominations.</p>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-slate-200 bg-white text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} JUMO Universal Enterprise Operating System. All rights reserved.
      </footer>
    </div>
  );

  const renderRegistrationPage = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-600 p-3 rounded-xl">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Register Ministry</h2>
        <form onSubmit={(e) => { e.preventDefault(); setAppState('LOGIN'); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ministry / Church Name</label>
            <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. Grace Fellowship" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ministry Template</label>
            <select 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value)}
            >
              {ChurchTemplateRegistry.map(t => (
                <option key={t.id} value={t.id}>{t.displayName}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">Provision Tenant</button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={() => setAppState('LANDING')} className="text-sm text-purple-600 font-medium">Cancel</button>
        </div>
      </div>
    </div>
  );

  const renderLoginPage = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-600 p-3 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Product Verification Access</h2>
        <p className="text-center text-sm text-slate-500 mb-6">Open access for sovereign platform owner verification. No credentials required.</p>
        
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => {
              ownerVerificationService.establishOwnerVerificationSession('JUMO-CHURCH', 'JUMO Church ERP Verification Access');
              setActivePortalId('CH-PORTAL-BISHOP-0001');
              setActiveTab('MOD_CH_DASHBOARD');
              setAppState('APP');
            }}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-5 h-5" /> Enter Workspace (Verified)
          </button>
        </div>
        <div className="mt-6 text-center space-y-3">
          <button onClick={() => setAppState('LANDING')} className="text-sm text-slate-500 hover:text-slate-700">Back to Home</button>
        </div>
      </div>
    </div>
  );

  
  
  const renderCurrentPage = () => {
    const activeModuleDef = ModuleRegistry.find(m => m.id === activeTab);
    if (!activeModuleDef) return null;
    
    const linkedForms = FormRegistry.filter(f => f.moduleId === activeModuleDef.id);
    const linkedWorkflows = WorkflowRegistry.filter(w => w.name.toUpperCase().includes(activeModuleDef.name.toUpperCase()) || w.displayName.toUpperCase().includes(activeModuleDef.displayName.toUpperCase()));
    
    return (
      <div className="space-y-6">
        {OWNER_VERIFICATION_MODE && renderVerificationMode()}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full min-h-[500px]">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{activeModuleDef.displayName}</h2>
            <p className="text-sm text-slate-500 mt-1">{activeModuleDef.description}</p>
          </div>
          <div className="flex items-center gap-3">
            {linkedWorkflows.length > 0 && <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-semibold text-xs rounded border border-emerald-200">Active Workflow Engine</span>}
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 font-mono text-[10px] font-bold rounded border border-blue-200">{activeModuleDef.id}</span>
          </div>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          {linkedForms.length > 0 ? (
            <div className="space-y-8">
              {linkedForms.map((form: any) => (
                <div key={form.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-w-3xl">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-slate-800">{form.name}</h3>
                    <p className="text-xs text-slate-500">Universal Form Engine ID: {form.id}</p>
                  </div>
                  <div className="p-6">
                    <form onSubmit={e => e.preventDefault()} className="space-y-5">
                      {form.fields.map((field: any) => (
                        <div key={field.id}>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          {field.type === 'select' ? (
                            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow">
                              <option value="">Select {field.label}</option>
                              {field.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          ) : (
                            <input 
                              type={field.type} 
                              required={field.required}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            />
                          )}
                        </div>
                      ))}
                      <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                        <button type="button" className="px-5 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                        <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">Submit Record</button>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Module Initialized</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                The core capabilities for <strong>{activeModuleDef.displayName}</strong> are loaded into the Universal Workflow Engine. Authorized personnel can provision new forms and data schemas through the Configuration Center.
              </p>
            </div>
          )}
          
          {linkedWorkflows.length > 0 && (
             <div className="mt-8 pt-8 border-t border-slate-200 max-w-3xl">
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Active State Machine</h3>
               {linkedWorkflows.map((wf: any) => (
                 <div key={wf.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                   <div className="font-semibold text-slate-800 mb-1">{wf.displayName} Workflow</div>
                   <div className="text-xs text-slate-500 mb-3">{wf.description}</div>
                   <div className="flex flex-wrap items-center gap-2">
                     {wf.states.map((st: string, idx: number) => (
                       <div key={st} className="flex items-center gap-2">
                         <div className={`px-2 py-1 text-[10px] font-bold rounded ${st === wf.initialState ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-slate-600 border border-slate-200'}`}>
                           {st}
                         </div>
                         {idx < wf.states.length - 1 && <div className="text-slate-300 text-xs">→</div>}
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>
      </div>
    );
  };

  const menuGroups = AuthService.getNavigationForPortal(activePortalId);

  if (appState === 'LANDING') return renderLandingPage();
  if (appState === 'REGISTRATION') return renderRegistrationPage();
  if (appState === 'LOGIN') return renderLoginPage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="h-14 bg-slate-900 text-white flex items-center justify-between px-4 shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-800 rounded-md transition-colors">
            <Menu className="w-5 h-5 text-slate-300" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-1.5 rounded text-white flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <span className="font-bold text-[15px] tracking-tight">
              JUMO <span className="font-medium text-slate-300">Church ERP</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {onNavigate && <PlatformSwitcher onNavigate={onNavigate} />}
          <button onClick={() => setAppState('LANDING')} className="ml-2 flex items-center gap-2 pl-2 border-l border-slate-700 hover:opacity-80 transition-opacity text-[13px] font-medium">
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 hidden'} flex-shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out z-10`}>
          
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Portal Identity</div>
            <div className="text-sm font-bold text-slate-900 break-words">{PortalRegistry.find(p => p.id === activePortalId)?.displayName || activePortalId}</div>
          </div>

          <div className="flex-1 py-4">
            {menuGroups.map((group, idx) => (
              <div key={idx} className="mb-6 px-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">{group.group}</h3>
                <div className="space-y-0.5">
                  {group.items.map(item => {
                    const isSelected = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (false) handlePortalChange(item.id);
                          else setActiveTab(item.id);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isSelected || (false && activePortalId === item.id)
                            ? 'bg-purple-50 text-purple-700' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected || (false && activePortalId === item.id) ? 'text-purple-600' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
          <div className="flex-1 p-6">
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </div>
  );
};
