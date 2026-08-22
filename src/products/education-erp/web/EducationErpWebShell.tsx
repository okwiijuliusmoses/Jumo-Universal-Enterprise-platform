import { AuthService } from "../../AuthService";
/**
 * JUMO Education ERP — Sovereign Web Shell & Universal Product Portal
 * Integrates K-12, Vocational, and Higher Education templates dynamically.
 * Features strict role-based logins, active office workspaces, dynamic workflow state machines,
 * registry-computed telemetry dashboards, and true cross-product FAAP transactions.
 */
import React, { useState, useEffect } from 'react';
import { 
  Building, GraduationCap, Users, FileText, Landmark, HeartPulse, 
  BookOpen, Search, Bell, Settings, Menu, X, Shield, LayoutDashboard,
  MapPin, Globe, Award, Briefcase, LayoutGrid, Home, ChevronRight,
  UserCheck, Layers, Play, CheckCircle2, AlertTriangle, HelpCircle,
  TrendingUp, Send, CheckCircle, RefreshCw, Clipboard, FileSpreadsheet, Lock, LogIn, UserPlus, ShieldCheck
} from 'lucide-react';
import { PlatformSwitcher } from '../../../components/PlatformSwitcher';
import { EducationErpService } from '../domain/EducationErpService';
import { OWNER_VERIFICATION_MODE } from '../../../core/security/OwnerVerificationModeRegistry';
import { SovereignVerificationCredentialRegistry } from '../../../core/security/SovereignVerificationRegistry';
import { EducationTemplateRegistry, PortalRegistry, calculateRegistryStats, WorkflowRegistry, ModuleRegistry, FormRegistry, ReportRegistry } from '../../registries';
import { ownerVerificationService } from '../../../core/security/ownerVerificationService';

// Web modules
import { EducationDashboard } from './modules/EducationDashboard';
import { GovernanceModule } from './modules/GovernanceModule';
import { RegistrarModule } from './modules/RegistrarModule';
import { SenateModule } from './modules/SenateModule';
import { BursaryModule } from './modules/BursaryModule';
import { ClinicModule } from './modules/ClinicModule';
import { LibraryModule } from './modules/LibraryModule';
import { HostelModule } from './modules/HostelModule';

type AppState = 'LANDING' | 'REGISTRATION' | 'LOGIN' | 'APP';

export const EducationErpWebShell: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const service = EducationErpService.getInstance();
  
  // Dynamic registries stats
  const stats = calculateRegistryStats().education;

  // App Level State
  const [appState, setAppState] = useState<AppState>('APP');

  // Configuration & Active Template
  const [config, setConfig] = useState(service.getConfig());
  const [activeTemplate, setActiveTemplate] = useState<string>('UNIVERSITY');
  
  // Selected Role & Portal
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activePortalId, setActivePortalId] = useState<string>('');
  const [activeUser, setActiveUser] = useState({
    name: 'Chancellor Julius Moses',
    role: 'EXECUTIVE',
    avatar: 'JM',
    title: 'Sovereign Administrator'
  });

  // Selected Section/Workspace
  const [activeTab, setActiveTab] = useState<string>('MOD_EDU_DASHBOARD');

  // Sidebar controls
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dynamic States for Forms & Workflows
  const [applications, setApplications] = useState(service.getApplications());
  const [students, setStudents] = useState(service.getStudents());
  const [invoices, setInvoices] = useState(service.getInvoices());
  const [voteBooks, setVoteBooks] = useState(service.getVoteBookCommitments());
  const [results, setResults] = useState(service.getExamResults());
  const [clinicVisits, setClinicVisits] = useState(service.getClinicalVisits());
  const [libraryBooks, setLibraryBooks] = useState(service.getLibraryCirculations());
  
  useEffect(() => {
    if (OWNER_VERIFICATION_MODE) {
      setLoginUsername(SovereignVerificationCredentialRegistry['JUMO-EDU-ALUMNI'].username);
      setLoginPassword(SovereignVerificationCredentialRegistry['JUMO-EDU-ALUMNI'].password);
    }
  }, []);

  // Sovereign Owner Verification Mode Indicator
  const renderVerificationMode = () => (
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
      <h2 className="text-amber-900 font-bold">PLATFORM OWNER VERIFICATION MODE</h2>
      <p className="text-amber-700 text-sm">Direct access is active. All product boundaries are preserved.</p>
    </div>
  );
  
  // New Form/Workflow States
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('WORKFLOW_UNIVERSITY_ADMISSION');
  const [formFieldsData, setFormFieldsData] = useState<Record<string, any>>({});
  const [workflowStatusMessage, setWorkflowStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Synchronize on template changes
  const handleTemplateChange = (templateId: string) => {
    service.updateConfig({ template: templateId as any });
    setConfig(service.getConfig());
    setActiveTemplate(templateId);
  };

  // Synchronize on portal role changes
  const handlePortalChange = (portalId: string) => {
    setActivePortalId(portalId);
    setActiveTab('DASHBOARD'); // reset to dashboard
    
    // Assign simulated user profile
    const p = PortalRegistry.find(p => p.id === portalId);
    const primaryRole = p?.authorizedRoles[0] || 'GUEST';
    setActiveUser({
      name: `Demo User (${primaryRole})`,
      role: primaryRole,
      avatar: primaryRole.substring(0, 2).toUpperCase(),
      title: p?.displayName || 'User'
    });
  };

  const handleAction = (action: string, payload: any) => {
    try {
      if (action === 'POST_VOTEBOOK') {
        service.commitVoteBook(payload.voteCode, payload.amount, payload.memo);
        setVoteBooks(service.getVoteBookCommitments());
      } else if (action === 'PAY_TUITION') {
        service.payTuitionInvoice(payload.invoiceId, payload.amountToPay, payload.paymentChannel);
        setInvoices(service.getInvoices());
      } else if (action === 'SUBMIT_ADMISSION') {
        service.submitApplication({
          fullName: payload.fullName,
          programme: payload.selectedProgramme,
          email: payload.email,
          phone: payload.phone,
          status: 'PENDING_REVIEW'
        });
        setApplications(service.getApplications());
      } else if (action === 'SUBMIT_CLINIC_VISIT') {
        service.addClinicalVisit({
          studentId: payload.patientId,
          date: new Date().toISOString().split('T')[0],
          vitals: { temp: payload.temp, bp: payload.bp, pulse: payload.pulse },
          diagnosis: payload.diagnosis,
          treatment: payload.treatment
        });
        setClinicVisits(service.getClinicalVisits());
      } else if (action === 'LIBRARY_LOAN') {
        service.borrowLibraryBook(payload.borrowerId, payload.bookId, payload.bookTitle, payload.dueDate);
        setLibraryBooks(service.getLibraryCirculations());
      } else if (action === 'SUBMIT_MARKS') {
        service.submitExamResult(payload.studentId, payload.courseCode, Number(payload.continuousAssessmentMark), Number(payload.examMark));
        setResults(service.getExamResults());
      }
      
      setWorkflowStatusMessage({ type: 'success', text: `${action} executed successfully across JUMO Ledgers.` });
      setTimeout(() => setShowWorkflowModal(false), 2000);
    } catch (e: any) {
      setWorkflowStatusMessage({ type: 'error', text: e.message || `Workflow blocked: ${action} failed.` });
    };

  const executeWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkflowStatusMessage(null);
    
    if (selectedWorkflowId === 'WORKFLOW_VOTE_BOOK_COMMIT') handleAction('POST_VOTEBOOK', formFieldsData);
    if (selectedWorkflowId === 'WORKFLOW_FEES_PAYMENT') handleAction('PAY_TUITION', formFieldsData);
    if (selectedWorkflowId === 'WORKFLOW_UNIVERSITY_ADMISSION') handleAction('SUBMIT_ADMISSION', formFieldsData);
    if (selectedWorkflowId === 'WORKFLOW_CLINICAL_VISIT') handleAction('SUBMIT_CLINIC_VISIT', formFieldsData);
    if (selectedWorkflowId === 'WORKFLOW_LIBRARY_BORROW') handleAction('LIBRARY_LOAN', formFieldsData);
    if (selectedWorkflowId === 'WORKFLOW_SENATE_MODERATION') handleAction('SUBMIT_MARKS', formFieldsData);
  };

  const renderWorkflowModal = () => {
    if (!showWorkflowModal) return null;
    const workflow = WorkflowRegistry.find(w => w.id === selectedWorkflowId);
    if (!workflow) return null;

    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">{workflow.displayName}</h3>
              <p className="text-sm text-slate-500 mt-1">{workflow.description}</p>
            </div>
            <button onClick={() => setShowWorkflowModal(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {workflowStatusMessage && (
            <div className={`m-6 p-4 rounded-lg flex items-start gap-3 ${
              workflowStatusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              {workflowStatusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
              <p className="text-sm font-medium">{workflowStatusMessage.text}</p>
            </div>
          )}

          <form onSubmit={executeWorkflow} className="p-6 space-y-5">
            {workflow.formFields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {field.label} {field.required && <span className="text-rose-500">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select 
                    required={field.required}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formFieldsData[field.name] || ''}
                    onChange={e => setFormFieldsData({...formFieldsData, [field.name]: e.target.value})}
                  >
                    <option value="">Select option...</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                    {/* Dynamic population for specific fields */}
                    {field.name === 'voteCode' && (
                      <>
                        <option value="V-ACAD-01">V-ACAD-01 (Academic Affairs)</option>
                        <option value="V-WEL-02">V-WEL-02 (Student Welfare)</option>
                        <option value="V-EST-03">V-EST-03 (Estates & Maintenance)</option>
                      </>
                    )}
                    {field.name === 'invoiceId' && invoices.filter(i => i.status === 'UNPAID').map(i => (
                      <option key={i.id} value={i.id}>{i.id} - {i.studentName} (Bal: UGX {i.balance.toLocaleString()})</option>
                    ))}
                    {field.name === 'studentId' && students.map(s => (
                      <option key={s.id} value={s.id}>{s.id} - {s.name}</option>
                    ))}
                    {field.name === 'patientId' && students.map(s => (
                      <option key={s.id} value={s.id}>{s.id} - {s.name}</option>
                    ))}
                    {field.name === 'borrowerId' && students.map(s => (
                      <option key={s.id} value={s.id}>{s.id} - {s.name}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea 
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    value={formFieldsData[field.name] || ''}
                    onChange={e => setFormFieldsData({...formFieldsData, [field.name]: e.target.value})}
                  />
                ) : (
                  <input 
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formFieldsData[field.name] || ''}
                    onChange={e => setFormFieldsData({...formFieldsData, [field.name]: e.target.value})}
                  />
                )}
              </div>
            ))}

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">1</span>
                <span className="text-sm font-medium text-slate-600">State: <span className="text-blue-600">{workflow.initialState}</span></span>
              </div>
              <button 
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4" />
                Execute Transition
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <header className="px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">JUMO Education ERP</h1>
            <p className="text-xs text-slate-500">Universal Education Digital Hybrid Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setAppState('LOGIN')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign In</button>
          <button onClick={() => setAppState('REGISTRATION')} className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">Register Institution</button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-6">The Operating System for Modern Education</h2>
        <p className="text-lg text-slate-600 mb-10">
          A unified, template-driven digital hybrid platform for Primary, Secondary, Vocational, and Higher Education institutions. Built on the JUMO UEOS core with native FAAP financial ledgers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <Layers className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Multi-Template Engine</h3>
            <p className="text-sm text-slate-600">Select your exact institutional model from {EducationTemplateRegistry.length} native templates, automatically adapting all workflows.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <Landmark className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">True FAAP Integration</h3>
            <p className="text-sm text-slate-600">Tuition, asset depreciation, and vote book commitments write directly to the dual-entry FAAP core ledger.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <UserCheck className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Role-Scoped Portals</h3>
            <p className="text-sm text-slate-600">Secure, isolated portal workspaces for Students, Parents, Faculty, Bursars, and Executives.</p>
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
          <div className="bg-blue-600 p-3 rounded-xl">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Register Institution</h2>
        <p className="text-center text-sm text-slate-500 mb-8">Deploy your Universal Education environment.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); setAppState('LOGIN'); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Institution Name</label>
            <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. JUMO Global Academy" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Education Template</label>
            <select required className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm">
              <option value="">Select Template...</option>
              {EducationTemplateRegistry.map(t => (
                <option key={t.id} value={t.id}>{t.displayName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
            <input type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm" placeholder="admin@institution.edu" />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Provision Tenant</button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={() => setAppState('LANDING')} className="text-sm text-blue-600 font-medium">Cancel</button>
        </div>
      </div>
    </div>
  );

  const renderLoginPage = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-3 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Product Verification Access</h2>
        <p className="text-center text-sm text-slate-500 mb-6">Open access for sovereign platform owner verification. No credentials required.</p>
        
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => {
              ownerVerificationService.establishOwnerVerificationSession('JUMO-EDU-ALUMNI', 'JUMO Education ERP Verification Access');
              setActivePortalId(PortalRegistry.find(p => p.productId === 'JUMO-EDU-ALUMNI')?.id || 'EDU-PORTAL-ADMIN-0001');
              setAppState('APP');
            }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
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
      {/* 1. SINGLE-ROW UNIVERSAL COMPACT HEADER */}
      <header className="h-14 bg-slate-900 text-white flex items-center justify-between px-4 shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-800 rounded-md transition-colors">
            <Menu className="w-5 h-5 text-slate-300" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded text-white flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-bold text-[15px] tracking-tight">
              JUMO <span className="font-medium text-slate-300">Education ERP</span>
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search across registries, students, invoices..." 
              className="w-full bg-slate-800 border-none rounded-md py-1.5 pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-400 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-md border border-slate-700">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-medium text-slate-300">{activeTemplate}</span>
          </div>

          <button className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md relative transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-slate-900"></span>
          </button>
          
          {onNavigate && (
            <div className="mx-1 h-5 w-px bg-slate-700"></div>
          )}
          
          {onNavigate && (
            <PlatformSwitcher onNavigate={onNavigate} />
          )}

          <button onClick={() => setAppState('LANDING')} className="ml-2 flex items-center gap-2 pl-2 border-l border-slate-700 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold shadow-inner">
              {activeUser.avatar}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-[13px] font-medium leading-none mb-0.5">{activeUser.name}</div>
              <div className="text-[10px] text-slate-400 leading-none">{activeUser.title}</div>
            </div>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 2. COMPACT ENTERPRISE LEFT NAVIGATION */}
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
                          if (false) {
                            handlePortalChange(item.id);
                          } else {
                            setActiveTab(item.id);
                          }
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isSelected || (false && activePortalId === item.id)
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected || (false && activePortalId === item.id) ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-700">
                <Database className="w-3.5 h-3.5 text-indigo-500" />
                Registry Matrix
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                <div className="flex justify-between"><span>Modules</span> <span className="font-mono font-medium text-slate-700">{stats.modules}</span></div>
                <div className="flex justify-between"><span>Forms</span> <span className="font-mono font-medium text-slate-700">{stats.forms}</span></div>
                <div className="flex justify-between"><span>Depts</span> <span className="font-mono font-medium text-slate-700">{stats.departments}</span></div>
                <div className="flex justify-between"><span>APIs</span> <span className="font-mono font-medium text-slate-700">{stats.apis}</span></div>
              </div>
            </div>
          </div>
        </aside>

        {/* 3. MAIN ENTERPRISE WORKSPACE */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
          {/* Quick Action Toolbar */}
          <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-medium text-slate-700">{activePortalId.replace('EDU_', '').replace('_', ' ')} PORTAL</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-medium text-blue-600">{activeTab}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-xs font-medium text-slate-400 uppercase mr-2 hidden sm:block">Workflow Execution:</div>
              <select 
                className="text-sm bg-slate-50 border border-slate-200 rounded-md py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={selectedWorkflowId}
                onChange={(e) => setSelectedWorkflowId(e.target.value)}
              >
                {WorkflowRegistry.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
              <button 
                onClick={() => { setWorkflowStatusMessage(null); setShowWorkflowModal(true); }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-md transition-colors shadow-sm flex items-center justify-center"
                title="Execute Workflow State Machine"
              >
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-6">
            {renderCurrentPage()}
          </div>
          
          {/* COMPACT UNIVERSAL FOOTER */}
          <footer className="bg-white border-t border-slate-200 py-3 px-6 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
            <div className="flex items-center gap-4">
              <span>&copy; {new Date().getFullYear()} JUMO Universal Enterprise Operating System</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> All Ledgers Synchronized
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">v10.0.0-PROD</span>
              <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Support API</a>
            </div>
          </footer>
        </main>
      </div>

      {/* Render Workflow Modal Portal */}
      {renderWorkflowModal()}
    </div>
  );
};

}
// Mock Database icon (lucide)
const Database = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);
