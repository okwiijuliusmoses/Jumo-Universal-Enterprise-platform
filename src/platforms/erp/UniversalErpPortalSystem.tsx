/**
 * JUMO UEOS — Authoritative ERP Phase 11 & Phase 12 Operational Portal System
 * Implements:
 * Phase 11 — Universal ERP Operational Runtime Activation & Template Factory Engine
 * Phase 12 — Universal ERP Portal Architecture Upgrade & Role-Based Portal Ecosystem
 * 
 * Features:
 * 1. Public Enterprise Portal (Before Login) with public services (Admissions, Verification, Appointments, Member Signup)
 * 2. Universal JUMO Login Gateway with MFA, SSO, Organization ID, and Custom Institutional Branding
 * 3. Role-Based Management Portals (VC/Executive, Registrar, Finance Director, Dean, Doctor, Loan Officer, Student/Member/Patient)
 * 4. Department Icon Application Launcher (Academics, Exams, Library, Research, Finance, Admin, Logistics, AI)
 * 5. Institutional Administration & Portal Builder (Logo, Colors, Domain, Departments, Roles, Module Activations)
 * 6. Branded JUMO Enterprise AI Assistant (e.g. JUMO Education Assistant, JUMO Healthcare Assistant)
 * 7. Enterprise Certification Engine (Maturity Score, FAAP Ledger Parity $0.00, TRUST & AEGIS Verification)
 */

import React, { useState } from 'react';
import {
  GraduationCap, Building2, Landmark, HeartPulse, Sprout, Utensils, Church, Crown,
  Briefcase, Scale, Factory, Users, Shield, Award, CheckCircle2,
  Sparkles, Search, ChevronRight, Sliders, DollarSign, Cloud, Code,
  Package, Activity, ShieldCheck, FileCheck, Lock, LogIn, ExternalLink,
  BookOpen, Calendar, Clock, FileText, Settings, UserCheck, AlertCircle,
  Smartphone, Monitor, Home, Key, Mail, Check, RefreshCw, Copy, Plus,
  Layers, ArrowRight, Eye, ShieldAlert, Cpu, Heart, CheckSquare, BarChart3,
  Building, Globe, Phone, Download, HelpCircle, X, ChevronDown, Wrench, ChevronUp
} from 'lucide-react';
import { getErp100Catalogue, ErpModuleDefinition } from './catalogue/erp100ModuleCatalogue';
import { UniversalErpInstallationEngine } from './installation/UniversalErpInstallationEngine';
import { InstitutionConfigurationStudio } from './installation/InstitutionConfigurationStudio';
import { UniversalErpPortalRuntime } from './installation/UniversalErpPortalRuntime';
import { UniversalInstitutionalOperatingEnvironment } from './installation/UniversalInstitutionalOperatingEnvironment';
import { UniversalERPPlatformRuntime } from './installation/UniversalERPPlatformRuntime';
import { OwnerControlCenterWorkspace } from '../../control-center/OwnerControlCenterWorkspace';
import { UniversalHybridMobileFirstWorkspace } from './universal/UniversalHybridMobileFirstWorkspace';

export interface UniversalErpPortalSystemProps {
  initialFamily?: string;
  onNavigate?: (route: string) => void;
  currentUser?: {
    name?: string;
    email?: string;
    role?: string;
    tenantId?: string;
  };
}

export const UniversalErpPortalSystem: React.FC<UniversalErpPortalSystemProps> = ({
  initialFamily = 'JUMO-FINTECH',
  onNavigate,
  currentUser
}) => {
  // State for Selected Family
  const [selectedFamily, setSelectedFamily] = useState<string>(initialFamily);
  
  // Mode View: 'public' | 'login' | 'portal_app' | 'app_launcher' | 'hybrid_ops' | 'mobile_ops' | 'admin_portal' | 'portal_builder' | 'owner_control' | 'certification' | 'installer' | 'config_studio' | 'portal_runtime' | 'institutional_env' | 'universal_platform_runtime'
  const [viewMode, setViewMode] = useState<'public' | 'login' | 'portal_app' | 'app_launcher' | 'hybrid_ops' | 'mobile_ops' | 'admin_portal' | 'portal_builder' | 'owner_control' | 'certification' | 'installer' | 'config_studio' | 'portal_runtime' | 'institutional_env' | 'universal_platform_runtime'>('universal_platform_runtime');

  // Phase 13 States
  const [selectedHybridOpsModule, setSelectedHybridOpsModule] = useState<string>('digital_twin');
  const [selectedMobileTab, setSelectedMobileTab] = useState<'approvals' | 'notifications' | 'payments' | 'documents' | 'messaging' | 'ai'>('approvals');
  
  // Ring-0 Admin Toggles for Selected ERP Family
  const [ring0Modules, setRing0Modules] = useState<Record<string, boolean>>({
    'Admissions & SIS': true,
    'FAAP Ledger & Fees': true,
    'Examinations & Grading': true,
    'Research & Grants': true,
    'Hostel & Housing': true,
    'Fleet & Transport': false,
    'International Students': false,
    'Digital Library': true
  });

  const [ring0Portals, setRing0Portals] = useState<Record<string, boolean>>({
    'Public Portal': true,
    'Executive Portal': true,
    'Staff Portal': true,
    'Mobile Enterprise App': true,
    'JUMO AI Assistant': true
  });

  const [ring0Security, setRing0Security] = useState<Record<string, boolean>>({
    'AEGIS Protection': true,
    'JUMO Trust Audit': true,
    'Financial Monitoring': true,
    'Digital CCTV Layer': true
  });

  // Role Selection State
  const [selectedRole, setSelectedRole] = useState<string>('executive');

  // Login Form State
  const [loginOrgId, setLoginOrgId] = useState<string>('EASU-2026');
  const [loginEmail, setLoginEmail] = useState<string>('administrator@easu.ac.ug');
  const [loginPassword, setLoginPassword] = useState<string>('••••••••••••');
  const [loginMfaCode, setLoginMfaCode] = useState<string>('849201');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Active Department Launcher Module
  const [launchedApp, setLaunchedApp] = useState<string | null>('Academics & SIS');

  // Institutional Branding Configuration
  const [institutionName, setInstitutionName] = useState<string>('East African Sovereign University');
  const [institutionShortCode, setInstitutionShortCode] = useState<string>('EASU');
  const [primaryColor, setPrimaryColor] = useState<string>('#0F172A'); // Slate 900
  const [accentColor, setAccentColor] = useState<string>('#0078D4'); // JUMO Blue
  const [customDomain, setCustomDomain] = useState<string>('easu.jumo.app');
  const [loginSlogan, setLoginSlogan] = useState<string>('Digital Operating Platform powered by JUMO UEOS');
  const [publicServices, setPublicServices] = useState<string[]>([
    'Online Admissions Application',
    'Degree & Certificate Verification',
    'Public Academic Programmes',
    'Alumni Network Registration',
    'Institutional Notices & Events'
  ]);

  // AI Assistant Chat State
  const [aiDrawerOpen, setAiDrawerOpen] = useState<boolean>(false);
  const [aiInput, setAiInput] = useState<string>('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: `Hello! I am the **JUMO Enterprise Assistant**. How can I help you navigate your portal, analyze FAAP fee ledger balances, or explain statutory compliance guidelines today?`,
      time: 'Just now'
    }
  ]);

  // Public Service Form Modal State
  const [activePublicForm, setActivePublicForm] = useState<string | null>(null);
  const [publicFormSuccess, setPublicFormSuccess] = useState<string | null>(null);

  // Module Catalogue for Selected Family
  const catalogue = getErp100Catalogue(selectedFamily);

  // Role Configurations per Family
  const familyRoles: Record<string, { id: string; name: string; icon: any; title: string; desc: string }[]> = {
    'JUMO-EDU-ALUMNI': [
      { id: 'vc', name: 'Vice Chancellor / Principal Portal', icon: GraduationCap, title: 'Executive Command & Strategy', desc: 'Institutional KPIs, accreditation score, FAAP financial health, global rankings.' },
      { id: 'registrar', name: 'Academic Registrar Portal', icon: FileCheck, title: 'Admissions & Student Records', desc: 'Curriculum management, student SIS enrollments, graduation verification.' },
      { id: 'finance', name: 'Finance Director Portal', icon: DollarSign, title: 'FAAP Treasury & Fee Billing', desc: '1.5% settlement switch, $0.00 double-entry parity, student fee clearing.' },
      { id: 'dean', name: 'Dean & Dept Chair Portal', icon: Users, title: 'Faculty & Department Operations', desc: 'Faculty timetabling, exam grading approval, research project oversight.' },
      { id: 'lecturer', name: 'Lecturer & Faculty Portal', icon: BookOpen, title: 'Classroom & LMS Management', desc: 'Digital course delivery, assignment grading, student attendance tracking.' },
      { id: 'student', name: 'Student Self-Service Portal', icon: UserCheck, title: 'Student Academic Environment', desc: 'Course registration, examination results, fee payment portal, LMS materials.' },
      { id: 'alumni', name: 'Alumni & Advancement Portal', icon: Award, title: 'Global Alumni Network', desc: 'Networking, donation tracking, mentorship matching, class chapters.' },
      { id: 'developer', name: 'Education Developer Portal', icon: Code, title: 'Technical & API Workspace', desc: 'System integration, API keys, webhook logs, and module development.' }
    ],
    'JUMO-FINTECH': [
      { id: 'board', name: 'Board of Directors Portal', icon: Landmark, title: 'Governance & Risk Command', desc: 'Capital adequacy ratio, statutory liquidity, dividend declaration.' },
      { id: 'manager', name: 'General Manager Portal', icon: Briefcase, title: 'Operations & Treasury', desc: 'Member deposits, loan portfolio performance, branch liquidity.' },
      { id: 'loan_officer', name: 'Loan Officer Portal', icon: Award, title: 'Credit Risk & Origination', desc: 'AI credit scoring, guarantor verification, loan disbursement.' },
      { id: 'member', name: 'Member Self-Service Portal', icon: Users, title: 'Cooperative Member Portal', desc: 'Savings balance, instant loan request, dividend statements.' },
      { id: 'merchant', name: 'Merchant / Agent Portal', icon: Factory, title: 'Payment & Settlement Ops', desc: 'Merchant collections, agent commissions, settlement tracking.' },
      { id: 'developer', name: 'Fintech Developer Portal', icon: Code, title: 'Technical & API Workspace', desc: 'Digital Pay APIs, FAAP ledger hooks, and financial module lifecycle.' }
    ],
    'JUMO-CHURCH': [
      { id: 'bishop', name: 'Bishop / Diocesan Portal', icon: Crown, title: 'Ecclesiastical Command', desc: 'Diocesan statistics, sacramental vault oversight, stewardship reports.' },
      { id: 'pastor', name: 'Parish Priest / Pastor Portal', icon: Church, title: 'Parish Administration', desc: 'Local membership, tithes/offerings, group management, liturgy planner.' },
      { id: 'member', name: 'Parishioner Self-Service Portal', icon: Users, title: 'Faith Community Portal', desc: 'Sacramental records, donation history, ministry signup.' },
      { id: 'developer', name: 'Church Developer Portal', icon: Code, title: 'Technical & API Workspace', desc: 'Parish API integration, member data sync, and spiritual workflow automation.' }
    ]
  };

  const roles = familyRoles[selectedFamily] || familyRoles['JUMO-EDU-ALUMNI'];

  // Department App Launcher Icons
  const appLauncherIcons = [
    { id: 'sis', name: 'Academics & SIS', icon: GraduationCap, color: 'bg-[#0078D4]', category: 'Core' },
    { id: 'exams', name: 'Examinations & Grading', icon: FileCheck, color: 'bg-emerald-600', category: 'Academic' },
    { id: 'library', name: 'Digital Library & Archives', icon: BookOpen, color: 'bg-purple-600', category: 'Academic' },
    { id: 'research', name: 'Research & Grants (FAAP)', icon: Award, color: 'bg-indigo-600', category: 'Research' },
    { id: 'finance', name: 'Finance & Treasury', icon: DollarSign, color: 'bg-[#0078D4]', category: 'FAAP' },
    { id: 'hr', name: 'Human Resources & Payroll', icon: Users, color: 'bg-pink-600', category: 'HR' },
    { id: 'hostel', name: 'Hostels & Facilities', icon: Home, color: 'bg-amber-600', category: 'Facility' },
    { id: 'transport', name: 'Fleet & Logistics', icon: Activity, color: 'bg-[#0078D4]', category: 'Operations' },
    { id: 'ai', name: 'JUMO Enterprise AI', icon: Sparkles, color: 'bg-gradient-to-r from-purple-600 to-indigo-600', category: 'Cognitive' },
    { id: 'security', name: 'AEGIS Security Sentinel', icon: ShieldCheck, color: 'bg-red-600', category: 'Security' }
  ];

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userText = aiInput;
    setAiInput('');
    setAiMessages(prev => [...prev, { sender: 'user', text: userText, time: 'Just now' }]);

    setTimeout(() => {
      let reply = `I have analyzed the **${institutionName}** enterprise database for your query regarding "${userText}". `;
      if (userText.toLowerCase().includes('fee') || userText.toLowerCase().includes('finance') || userText.toLowerCase().includes('balance')) {
        reply += `All fee entries are balanced under the **FAAP Financial Backbone** with exact $0.00 debit/credit parity. 1.5% settlement clearing fee is active.`;
      } else if (userText.toLowerCase().includes('student') || userText.toLowerCase().includes('admission')) {
        reply += `The Student Information System currently records 4,820 registered students with Zero-Trust access isolation.`;
      } else {
        reply += `Everything is operating smoothly according to JUMO UEOS Phase 11 & Phase 12 architecture guidelines.`;
      }
      setAiMessages(prev => [...prev, { sender: 'ai', text: reply, time: 'Just now' }]);
    }, 800);
  };

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setViewMode('portal_app');
  };

  const handlePublicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPublicFormSuccess(`Application submitted successfully! Reference Number: REQ-2026-${Math.floor(10000 + Math.random() * 90000)}.`);
    setTimeout(() => {
      setPublicFormSuccess(null);
      setActivePublicForm(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* 1. TOP ENTERPRISE HEADER */}
      <header className="bg-slate-950 text-white px-4 md:px-6 py-2.5 border-b border-slate-800 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0078D4] to-blue-700 flex items-center justify-center font-black text-white text-base shadow-sm">
              J
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white">{institutionName}</span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold rounded border border-blue-400/30">
                  {customDomain}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">JUMO UEOS Phase 13 — Enterprise Operational Environment</div>
            </div>
          </div>

          {/* Quick Navigation Modes */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px] font-bold overflow-x-auto">
            <button
              onClick={() => setViewMode('public')}
              className={`px-2.5 py-1.5 rounded-lg transition ${viewMode === 'public' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
            >
              Public Gateway
            </button>
            <button
              onClick={() => setViewMode('login')}
              className={`px-2.5 py-1.5 rounded-lg transition ${viewMode === 'login' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
            >
              Login Gateway
            </button>
            <button
              onClick={() => setViewMode('portal_app')}
              className={`px-2.5 py-1.5 rounded-lg transition ${viewMode === 'portal_app' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
            >
              Executive Portals
            </button>
            <button
              onClick={() => setViewMode('app_launcher')}
              className={`px-2.5 py-1.5 rounded-lg transition ${viewMode === 'app_launcher' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
            >
              Workspaces
            </button>
            <button
              onClick={() => setViewMode('hybrid_ops')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 ${viewMode === 'hybrid_ops' ? 'bg-indigo-600 text-white shadow-xs' : 'text-purple-300 hover:text-white'}`}
            >
              <Cpu className="w-3 h-3 text-amber-300" /> Hybrid Ops (10)
            </button>
            <button
              onClick={() => setViewMode('mobile_ops')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 ${viewMode === 'mobile_ops' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-300 hover:text-white'}`}
            >
              <Smartphone className="w-3 h-3" /> Mobile App
            </button>
            <button
              onClick={() => setViewMode('owner_control')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 ${viewMode === 'owner_control' ? 'bg-red-700 text-white shadow-xs' : 'text-red-400 hover:text-white'}`}
            >
              <ShieldAlert className="w-3 h-3" /> Owner Ring-0
            </button>
            <button
              onClick={() => setViewMode('portal_builder')}
              className={`px-2.5 py-1.5 rounded-lg transition ${viewMode === 'portal_builder' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
            >
              Portal Builder
            </button>
            <button
              onClick={() => setViewMode('installer')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 ${viewMode === 'installer' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-300 hover:text-white'}`}
            >
              <Wrench className="w-3 h-3" /> Install ERP (14A)
            </button>
            <button
              onClick={() => setViewMode('config_studio')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 ${viewMode === 'config_studio' ? 'bg-indigo-600 text-white shadow-xs' : 'text-indigo-300 hover:text-white'}`}
            >
              <Sliders className="w-3 h-3" /> Config Studio (14B)
            </button>
            <button
              onClick={() => setViewMode('portal_runtime')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 ${viewMode === 'portal_runtime' ? 'bg-sky-600 text-white shadow-xs' : 'text-sky-300 hover:text-white'}`}
            >
              <Globe className="w-3 h-3" /> Portal Runtime (14C)
            </button>
            <button
              onClick={() => setViewMode('institutional_env')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 ${viewMode === 'institutional_env' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-amber-300 hover:text-white'}`}
            >
              <Building2 className="w-3 h-3" /> Inst Operating Env (15)
            </button>
            <button
              onClick={() => setViewMode('universal_platform_runtime')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 ${viewMode === 'universal_platform_runtime' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-emerald-300 hover:text-white'}`}
            >
              <Cpu className="w-3 h-3" /> Universal ERP Platform (16)
            </button>
            <button
              onClick={() => setViewMode('certification')}
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'certification' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
            >
              Certification
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Branded AI Assistant Toggle */}
            <button
              onClick={() => setAiDrawerOpen(!aiDrawerOpen)}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-200 hidden sm:inline">{currentUser?.name || 'Admin User'}</span>
              </div>
            ) : (
              <button
                onClick={() => setViewMode('login')}
                className="px-3 py-1.5 bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. FAMILY SELECTOR BAR */}
      <div className="bg-slate-900 text-slate-200 px-4 md:px-6 py-2 border-b border-slate-800 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider font-semibold">ERP Family:</span>
            {[
              { id: 'JUMO-FINTECH', label: 'JUMO FINTECH' },
              { id: 'JUMO-EDU-ALUMNI', label: 'Education & Alumni' },
              { id: 'JUMO-CHURCH', label: 'Church & Diocese' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFamily(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedFamily === f.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] font-mono text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> FAAP $0.00 Parity Verified
            <span className="text-slate-600">|</span>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> AEGIS Zero-Trust Active
          </div>
        </div>
      </div>

      {/* MAIN BODY AREA BASED ON VIEW MODE */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">

        {/* VIEW 1: PUBLIC ENTERPRISE PORTAL (BEFORE LOGIN) */}
        {viewMode === 'public' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Public Hero Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-8 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-mono font-bold rounded-full">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  Official Institutional Portal Gateway
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{institutionName}</h1>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {loginSlogan}. Welcome to our public digital services portal. Apply for admissions, verify academic qualifications, explore academic programs, or request institutional assistance.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActivePublicForm('Admissions Application')}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                  >
                    Apply for Admissions <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('login')}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition cursor-pointer flex items-center gap-2"
                  >
                    Staff & Student Portal Login <LogIn className="w-4 h-4 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Public Services Grid */}
            <div className="space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Public Self-Service Gateway
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {publicServices.map((service, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0078D4] flex items-center justify-center font-bold text-sm">
                        0{idx + 1}
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">{service}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Access 24/7 digital request processing with instant tracking reference number.
                      </p>
                    </div>
                    <button
                      onClick={() => setActivePublicForm(service)}
                      className="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition cursor-pointer text-center"
                    >
                      Access Service Online
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal for Public Requests */}
            {activePublicForm && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-sm text-slate-900">{activePublicForm}</h3>
                    <button onClick={() => setActivePublicForm(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                  </div>

                  {publicFormSuccess ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs space-y-2 text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                      <div className="font-bold">{publicFormSuccess}</div>
                    </div>
                  ) : (
                    <form onSubmit={handlePublicSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                        <input required type="text" placeholder="e.g. Dr. Julius Moses" className="w-full p-2.5 border border-slate-300 rounded-lg text-xs" />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                        <input required type="email" placeholder="julius@example.com" className="w-full p-2.5 border border-slate-300 rounded-lg text-xs" />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">National ID / Passport</label>
                        <input required type="text" placeholder="CM9810293120" className="w-full p-2.5 border border-slate-300 rounded-lg text-xs" />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Request Notes</label>
                        <textarea placeholder="Provide details about your request..." className="w-full p-2.5 border border-slate-300 rounded-lg text-xs h-20" />
                      </div>
                      <div className="pt-2 flex justify-end gap-2">
                        <button type="button" onClick={() => setActivePublicForm(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Submit Application</button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: UNIVERSAL LOGIN GATEWAY */}
        {viewMode === 'login' && (
          <div className="max-w-md mx-auto my-8 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-300">
            <div className="bg-slate-900 p-6 text-white text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 mx-auto flex items-center justify-center text-xl font-black text-white shadow-md">
                J
              </div>
              <h2 className="text-xl font-extrabold tracking-tight">{institutionName}</h2>
              <p className="text-xs text-blue-200">{loginSlogan}</p>
            </div>

            <form onSubmit={handleSimulateLogin} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Organization ID</label>
                <input
                  type="text"
                  value={loginOrgId}
                  onChange={e => setLoginOrgId(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Work Email / User ID</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span>MFA Token Verification</span>
                  <span className="text-emerald-600 font-mono">Enforced</span>
                </div>
                <input
                  type="text"
                  value={loginMfaCode}
                  onChange={e => setLoginMfaCode(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded text-center font-mono font-bold text-sm tracking-widest text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Authenticate & Open Role Workspace
              </button>

              <div className="pt-2 text-center text-[11px] text-slate-500">
                Protected by JUMO Zero-Trust AEGIS Identity Guard. Single Sign-On (SSO) active.
              </div>
            </form>
          </div>
        )}

        {/* VIEW 3: INSTITUTIONAL ROLE PORTALS */}
        {viewMode === 'portal_app' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Role Switcher Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div>
                  <h2 className="font-extrabold text-sm text-slate-900">Institutional Role Portals — {selectedFamily.toUpperCase()} ERP</h2>
                  <p className="text-xs text-slate-500">Select a persona to experience role-specific executive metrics, workflows, and action controls.</p>
                </div>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[10px] font-bold rounded-lg">
                  {roles.length} Specific Portals
                </span>
              </div>

              <div className="flex overflow-x-auto gap-2 pb-1 text-xs font-bold">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        if (r.id === 'developer' && onNavigate) {
                          if (selectedFamily === 'JUMO-FINTECH') onNavigate('/products/fintech/developer');
                          else if (selectedFamily === 'JUMO-EDU-ALUMNI') onNavigate('/products/education/developer');
                          else if (selectedFamily === 'JUMO-CHURCH') onNavigate('/products/church/developer');
                        } else {
                          setSelectedRole(r.id);
                        }
                      }}
                      className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#0078D4] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {r.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Role Portal View */}
            {(() => {
              const currentRole = roles.find(r => r.id === selectedRole) || roles[0];
              const RoleIcon = currentRole.icon;

              return (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                  {/* Role Header Banner */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-blue-50 rounded-2xl text-[#0078D4]">
                        <RoleIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900">{currentRole.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">{currentRole.title} — {currentRole.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode('app_launcher')}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Package className="w-4 h-4 text-amber-400" /> Department App Launcher
                      </button>
                    </div>
                  </div>

                  {/* Role Specific Key Performance Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                      <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Active Enrollment</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">4,820</div>
                      <div className="text-[10px] text-emerald-600 font-bold mt-0.5">100% Identity Verified</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                      <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">FAAP Fee Ledger Balance</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">$0.00</div>
                      <div className="text-[10px] text-emerald-600 font-bold mt-0.5">100% Debit/Credit Parity</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                      <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Active Departments</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">12</div>
                      <div className="text-[10px] text-blue-600 font-bold mt-0.5">35 Specialized Modules</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                      <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Accreditation Score</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">98.5%</div>
                      <div className="text-[10px] text-purple-600 font-bold mt-0.5">Tier 1 Sovereign Grade</div>
                    </div>
                  </div>

                  {/* Active Operational Table / Records */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900">Live Operating Records & Action Dispatch</h4>
                      <span className="text-xs text-slate-500 font-mono">Zero-Trust Partition: {selectedFamily.toUpperCase()}</span>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
                          <tr>
                            <th className="p-3">Reference ID</th>
                            <th className="p-3">Primary Entity</th>
                            <th className="p-3">Department / Module</th>
                            <th className="p-3">FAAP Ledger Settlement</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                          <tr>
                            <td className="p-3 font-mono font-bold text-[#0078D4]">EASU/2026/001</td>
                            <td className="p-3 font-bold">Dr. Julius Moses Okwii</td>
                            <td className="p-3">Computing & IT (SIS)</td>
                            <td className="p-3 font-mono text-emerald-600 font-bold">$0.00 (Cleared)</td>
                            <td className="p-3"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200">Verified</span></td>
                            <td className="p-3 text-right"><button className="text-[#0078D4] hover:underline font-bold">Manage</button></td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono font-bold text-[#0078D4]">EASU/2026/042</td>
                            <td className="p-3 font-bold">Faculty of Law & Jurisprudence</td>
                            <td className="p-3">Academic Accreditation</td>
                            <td className="p-3 font-mono text-emerald-600 font-bold">$0.00 (Cleared)</td>
                            <td className="p-3"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200">Compliant</span></td>
                            <td className="p-3 text-right"><button className="text-[#0078D4] hover:underline font-bold">Manage</button></td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono font-bold text-[#0078D4]">EASU/2026/099</td>
                            <td className="p-3 font-bold">Research Grant #84902</td>
                            <td className="p-3">FAAP Treasury Engine</td>
                            <td className="p-3 font-mono text-emerald-600 font-bold">$0.00 (1.5% Settled)</td>
                            <td className="p-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold border border-blue-200">Active</span></td>
                            <td className="p-3 text-right"><button className="text-[#0078D4] hover:underline font-bold">Manage</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW 4: DEPARTMENT APPLICATION LAUNCHER */}
        {viewMode === 'app_launcher' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">Department Application Launcher</h2>
                <p className="text-xs text-slate-300 mt-1">Full-screen clean operational workspaces without sidebar clutter. Click any icon to launch.</p>
              </div>
              <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold rounded-lg">
                Phase 12 Clean Workspace
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {appLauncherIcons.map((app) => {
                const Icon = app.icon;
                const isSelected = launchedApp === app.name;
                return (
                  <button
                    key={app.id}
                    onClick={() => setLaunchedApp(app.name)}
                    className={`p-5 rounded-2xl border transition flex flex-col items-center text-center space-y-3 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-[#0078D4] ring-2 ring-blue-500 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${app.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-extrabold text-xs text-slate-900">{app.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{app.category}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Simulated Launched Application Screen */}
            {launchedApp && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <h3 className="font-black text-base text-slate-900">{launchedApp} Workspace</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Running in Sovereign Isolation Mode</span>
                </div>
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-[#0078D4] mx-auto animate-bounce" />
                  <div className="font-bold text-sm text-slate-900">{launchedApp} Operational Module Active</div>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Full operational screen loaded with live FAAP ledger hooks, AEGIS Zero-Trust security validation, and JUMO AI grounding.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: INSTITUTIONAL ADMIN PORTAL */}
        {viewMode === 'admin_portal' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Institutional Administration Portal</h2>
                  <p className="text-xs text-slate-500">Manage tenant users, RBAC roles, branding, workflow rules, and platform integrations.</p>
                </div>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 font-mono text-xs font-bold rounded-lg">
                  System Admin Mode
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <h3 className="font-extrabold text-sm text-slate-900">Ecosystem Integrations Status</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-800">FAAP Financial Backbone</span>
                      <span className="text-emerald-600 font-bold font-mono">CONNECTED ($0.00 Parity)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-800">JUMO TRUST Assurance</span>
                      <span className="text-blue-600 font-bold font-mono">VERIFIED (100% Score)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-800">AEGIS Zero-Trust Security</span>
                      <span className="text-purple-600 font-bold font-mono">ENFORCED (Ring-0)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-800">JUMO Cloud Infrastructure</span>
                      <span className="text-sky-600 font-bold font-mono">ACTIVE (Multi-region)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <h3 className="font-extrabold text-sm text-slate-900">Module Activation Control</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                      <span>100-Module Catalogue</span>
                      <span className="font-bold text-slate-900">100 / 100 Designed</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                      <span>Active Tenant Modules</span>
                      <span className="font-bold text-blue-600">35 Enabled</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                      <span>Owner Ring-0 Authority</span>
                      <span className="font-bold text-emerald-600">Validated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: PORTAL BUILDER */}
        {viewMode === 'portal_builder' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900">ERP Portal Builder & Institutional Branding</h2>
              <p className="text-xs text-slate-500">Configure logo, color themes, domain name, public services, and custom login page slogans.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Institution Full Name</label>
                  <input
                    type="text"
                    value={institutionName}
                    onChange={e => setInstitutionName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Custom Domain Name</label>
                  <input
                    type="text"
                    value={customDomain}
                    onChange={e => setCustomDomain(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Custom Login Page Slogan</label>
                  <input
                    type="text"
                    value={loginSlogan}
                    onChange={e => setLoginSlogan(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Branding Live Preview */}
              <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Live Branding Preview</div>
                <div className="p-4 bg-slate-800 rounded-xl space-y-2 border border-slate-700">
                  <div className="font-black text-base">{institutionName}</div>
                  <div className="text-xs text-blue-300 font-mono">{customDomain}</div>
                  <p className="text-xs text-slate-400">{loginSlogan}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: DIGITAL HYBRID OPERATIONS LAYER (PHASE 13) */}
        {viewMode === 'hybrid_ops' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-mono font-bold rounded-full">
                  <Cpu className="w-3.5 h-3.5" /> JUMO Operational Intelligence Engine (Phase 13)
                </div>
                <h2 className="text-xl font-black tracking-tight">Digital Hybrid Operations Layer</h2>
                <p className="text-xs text-slate-300 max-w-2xl">
                  Transforming {institutionName} into a self-monitoring, automated, digital twin enterprise ecosystem.
                </p>
              </div>
              <span className="px-3 py-1.5 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-mono font-bold rounded-xl">
                10 Intelligence Engines Active
              </span>
            </div>

            {/* 10 Operational Modules Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: 'digital_twin', name: '1. Digital Twin Model', icon: Building2, desc: 'Real-time 3D & capacity twin' },
                { id: 'realtime_dash', name: '2. Real-Time Operations', icon: Activity, desc: 'Live operational telemetry' },
                { id: 'workflow_intel', name: '3. Workflow Intelligence', icon: Layers, desc: 'SLA & route optimization' },
                { id: 'predictive_analytics', name: '4. Predictive Analytics', icon: BarChart3, desc: 'Student/Patient retention AI' },
                { id: 'process_auto', name: '5. Process Automation', icon: Cpu, desc: 'Auto fee billing & dispatch' },
                { id: 'doc_intel', name: '6. Document Intelligence', icon: FileCheck, desc: 'OCR transcript & contract parser' },
                { id: 'smart_notifs', name: '7. Smart Notifications', icon: Mail, desc: 'SMS, Email & Push broadcast' },
                { id: 'knowledge_base', name: '8. Knowledge Base (RAG)', icon: BookOpen, desc: 'Statutory compliance & guides' },
                { id: 'performance_intel', name: '9. Performance Intelligence', icon: Award, desc: 'Faculty & staff KPI scoring' },
                { id: 'decision_engine', name: '10. Decision Support', icon: Sparkles, desc: 'Strategic capital allocation AI' }
              ].map(m => {
                const Icon = m.icon;
                const isSelected = selectedHybridOpsModule === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedHybridOpsModule(m.id)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-amber-300' : 'text-indigo-600'}`} />
                    <div>
                      <div className="font-extrabold text-xs leading-snug">{m.name}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-500'} font-medium`}>{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Hybrid Ops Workspace Display */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900 uppercase">
                      Operational Intelligence Engine: {selectedHybridOpsModule.replace('_', ' ')}
                    </h3>
                    <p className="text-xs text-slate-500">Live system telemetry connected to FAAP Financial Backbone and AEGIS Security Guard.</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Synchronized Live
                </span>
              </div>

              {selectedHybridOpsModule === 'digital_twin' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="text-xs font-semibold text-slate-500">Campus Capacity Utilization</div>
                      <div className="text-2xl font-black text-slate-900">84.2%</div>
                      <div className="text-[10px] text-emerald-600 font-bold">12 Lecture Halls Active</div>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="text-xs font-semibold text-slate-500">Hostel Bed Occupancy</div>
                      <div className="text-2xl font-black text-slate-900">1,420 / 1,500</div>
                      <div className="text-[10px] text-blue-600 font-bold">94.6% Filled</div>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="text-xs font-semibold text-slate-500">Digital Network Infrastructure</div>
                      <div className="text-2xl font-black text-slate-900">10 Gbps</div>
                      <div className="text-[10px] text-purple-600 font-bold">0% Packet Loss</div>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-900 text-white rounded-xl font-mono text-xs space-y-2">
                    <div className="text-amber-400 font-bold">[DIGITAL TWIN SIMULATOR - LIVE TELEMETRY]</div>
                    <p className="text-slate-300">&gt; Building A (Main Administration): 142 active personnel, HVAC efficiency 98%.</p>
                    <p className="text-slate-300">&gt; Building B (Computing & Library): 820 workstations connected, FAAP Fee kiosk online.</p>
                    <p className="text-slate-300">&gt; Building C (Medical Complex): 24 ICU beds occupied, emergency triage queue 4 mins.</p>
                  </div>
                </div>
              )}

              {selectedHybridOpsModule !== 'digital_twin' && (
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-indigo-600 mx-auto animate-bounce" />
                  <div className="font-bold text-sm text-slate-900">
                    {selectedHybridOpsModule.replace('_', ' ').toUpperCase()} OPERATIONAL ENGINE ACTIVE
                  </div>
                  <p className="text-xs text-slate-500 max-w-lg mx-auto">
                    Integrated directly into JUMO UEOS Phase 13 operational kernel with continuous monitoring and automated decision support.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 8: ERP MOBILE ENTERPRISE LAYER (PHASE 13) */}
        {viewMode === 'mobile_ops' && (
          <UniversalHybridMobileFirstWorkspace
            institutionName={institutionName}
            selectedFamily={selectedFamily}
            onNavigateBack={() => setViewMode('portal_app')}
          />
        )}

        {/* VIEW 9: OWNER CONTROL CENTER RING-0 INTEGRATION (PHASE 13) */}
        {viewMode === 'owner_control' && (
          <OwnerControlCenterWorkspace
            institutionName={institutionName}
            selectedFamily={selectedFamily}
            onNavigateBack={() => setViewMode('portal_app')}
          />
        )}

        {/* VIEW 11: PHASE 14A UNIVERSAL ERP INSTALLATION ENGINE */}
        {viewMode === 'installer' && (
          <UniversalErpInstallationEngine
            onCompleteInstallation={(data) => {
              setViewMode('config_studio');
            }}
            onCancel={() => setViewMode('portal_app')}
          />
        )}

        {/* VIEW 12: PHASE 14B INSTITUTION CONFIGURATION STUDIO */}
        {viewMode === 'config_studio' && (
          <InstitutionConfigurationStudio
            institutionName={institutionName}
            selectedFamily={selectedFamily}
            onNavigatePortal={() => setViewMode('portal_runtime')}
          />
        )}

        {/* VIEW 13: PHASE 14C UNIVERSAL ERP PORTAL RUNTIME */}
        {viewMode === 'portal_runtime' && (
          <UniversalErpPortalRuntime
            institutionName={institutionName}
            shortCode={selectedFamily === 'education' ? 'JIU' : selectedFamily === 'healthcare' ? 'JGH' : 'JUE'}
            selectedFamily={selectedFamily}
            onNavigateAdmin={() => setViewMode('config_studio')}
          />
        )}

        {/* VIEW 14: PHASE 15 UNIVERSAL INSTITUTIONAL OPERATING ENVIRONMENT */}
        {viewMode === 'institutional_env' && (
          <UniversalInstitutionalOperatingEnvironment
            institutionName={institutionName}
            selectedFamily={selectedFamily}
            customDomain={customDomain}
            onNavigateBack={() => setViewMode('portal_app')}
          />
        )}

        {/* VIEW 15: PHASE 16 UNIVERSAL ERP PLATFORM RUNTIME */}
        {viewMode === 'universal_platform_runtime' && (
          <UniversalERPPlatformRuntime />
        )}

        {/* VIEW 10: ENTERPRISE CERTIFICATION */}
        {viewMode === 'certification' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl text-center space-y-6 max-w-2xl mx-auto animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold rounded-full">
                JUMO UEOS OFFICIAL CERTIFICATION
              </span>
              <h2 className="text-2xl font-black text-slate-900">{institutionName}</h2>
              <p className="text-xs text-slate-500 font-mono">Certificate Reference: JUMO-UEOS-CERT-2026-90184</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold">100-Module Status</div>
                <div className="font-bold text-slate-900 mt-1">✅ 100 Modules Active</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold">FAAP Financial</div>
                <div className="font-bold text-emerald-600 mt-1">✅ $0.00 Parity Verified</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold">JUMO TRUST</div>
                <div className="font-bold text-blue-600 mt-1">✅ 100% Assurance</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold">AEGIS Security</div>
                <div className="font-bold text-purple-600 mt-1">✅ Ring-0 Protected</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold">Cloud Infrastructure</div>
                <div className="font-bold text-sky-600 mt-1">✅ Multi-Region Ready</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold">Mobile Workspace</div>
                <div className="font-bold text-amber-600 mt-1">✅ iOS & Android Ready</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-center gap-3">
              <button onClick={() => window.print()} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-2">
                <Download className="w-4 h-4" /> Download Official Certificate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BRANDED JUMO AI ASSISTANT DRAWER */}
      {aiDrawerOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-xs">JUMO {selectedFamily.toUpperCase()} AI Assistant</span>
            </div>
            <button onClick={() => setAiDrawerOpen(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {aiMessages.map((msg, i) => (
              <div key={i} className={`p-3 rounded-xl max-w-[85%] ${msg.sender === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-slate-100 text-slate-900'}`}>
                <div className="font-medium">{msg.text}</div>
                <div className="text-[9px] opacity-70 mt-1 text-right">{msg.time}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendAiMessage} className="p-3 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Ask JUMO AI Assistant..."
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              className="flex-1 p-2 border border-slate-300 rounded-lg text-xs"
            />
            <button type="submit" className="px-3 py-2 bg-[#0078D4] text-white font-bold text-xs rounded-lg hover:bg-blue-600">Send</button>
          </form>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-[11px] p-4 border-t border-slate-800 text-center">
        JUMO UEOS v25.0 Enterprise Hybrid Operating System • {institutionName} Portal Framework
      </footer>
    </div>
  );
};
