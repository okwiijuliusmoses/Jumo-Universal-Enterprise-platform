import React, { useState } from 'react';
import {
  Bot, Cpu, Sparkles, ShieldCheck, FileText, Award, Building2, Globe, BookOpen,
  Users, DollarSign, Layers, Calendar, Clock, CheckCircle, AlertTriangle, Key,
  Lock, RefreshCw, Search, Filter, Plus, Trash2, Edit3, ChevronRight, Share2,
  Download, Printer, Send, Smartphone, Tv, Video, Camera, Image,
  FolderOpen, Archive, HelpCircle, Activity, BarChart3, PieChart, TrendingUp,
  MapPin, Home, Wifi, HardDrive, Database, Terminal, Shield, 
  QrCode, FileDown, Eye, Play, Book, UserPlus, Settings, Microscope
} from 'lucide-react';
import { AlumniIdentityWallet } from './alumni/AlumniIdentityWallet';
import { AlumniEnterpriseIntelligence } from './alumni/AlumniEnterpriseIntelligence';

// ==========================================
// CONFIGURATION & AI AGENTS (Alumni DOS)
// ==========================================

export type AlumniInstitutionType = 
  'University' | 'School' | 'Church' | 'Professional Association' | 
  'Government Training' | 'Corporate Academy' | 'Research Institution';

export const AI_AGENTS = [
  { name: 'Alumni Relationship AI', icon: Users },
  { name: 'Engagement Prediction AI', icon: TrendingUp },
  { name: 'Career Intelligence AI', icon: Award },
  { name: 'Fundraising AI', icon: DollarSign },
  { name: 'Communication AI', icon: Send },
  { name: 'Event Planning AI', icon: Calendar },
  { name: 'Research AI', icon: Microscope },
  { name: 'Document Verification AI', icon: ShieldCheck },
  { name: 'Alumni Engagement Agent', icon: Bot },
  { name: 'Membership Administration Agent', icon: UserPlus },
  { name: 'Alumni Office Assistant', icon: Database },
  { name: 'Executive Strategy Agent', icon: Activity },
];

export const ALUMNI_PHASES = [
  { id: 'identity', label: '1. Identity & Census', icon: QrCode },
  { id: 'registration', label: '2. Registration & Census', icon: UserPlus },
  { id: 'mobile_web', label: '3. Mobile & Web Apps', icon: Smartphone },
  { id: 'dashboards', label: '4. Executive Dashboards', icon: BarChart3 },
  { id: 'chapters', label: '5. Chapter Management', icon: Users },
  { id: 'career', label: '6. Career & Professional', icon: Award },
  { id: 'mentorship', label: '7. Mentorship Platform', icon: BookOpen },
  { id: 'fundraising', label: '8. Fundraising & Endowment', icon: DollarSign },
  { id: 'communication', label: '9. Communication & Community', icon: Send },
  { id: 'knowledge', label: '10. Knowledge & Museum', icon: Archive },
  { id: 'digital_twin', label: '11. Digital Twin & Relationship Intelligence', icon: Sparkles },
  { id: 'ai_automation', label: '12. AI Relationship Automation', icon: Bot },
  { id: 'collaboration', label: '13. Global Collaboration & Knowledge', icon: Globe },
  { id: 'benchmarking', label: '14. Institutional Intelligence & Benchmarking', icon: TrendingUp },
  { id: 'autonomous', label: '15. Autonomous Alumni Ecosystem', icon: Cpu },
];

// ==========================================
// MAIN COMPONENT: ALUMNI DOS MASTER HUB
// ==========================================

export const AlumniEnterpriseDOSMaster: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string>('identity');
  const [institution, setInstitution] = useState<AlumniInstitutionType>('University');
  const [role, setRole] = useState<string>('Admin');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto animate-fade-in">
      {/* Top Horizontal Module Navigation & Configuration Bar (Zero Left Sidebar, 100% Workspace Width) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 leading-tight">JUMO Alumni DOS</h2>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">12 Active Phases</span>
            </div>
          </div>

          {/* Role & Institution Selectors in Top Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500">Role:</span>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="bg-transparent text-slate-800 font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="Admin">Administrator</option>
                <option value="Director">Alumni Director</option>
                <option value="Finance">Finance Officer</option>
                <option value="Member">Alumni Member</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500">Institution:</span>
              <select 
                value={institution} 
                onChange={(e) => setInstitution(e.target.value as AlumniInstitutionType)}
                className="bg-transparent text-slate-800 font-bold text-xs focus:outline-none cursor-pointer"
              >
                {['University', 'School', 'Church', 'Professional Association', 'Government Training', 'Corporate Academy', 'Research Institution'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-xl font-semibold shadow-xs text-xs transition cursor-pointer">
              Deploy Template
            </button>
          </div>
        </div>

        {/* Scrollable Horizontal Navigation Pills */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {ALUMNI_PHASES.map((phase) => {
            const Icon = phase.icon;
            const isSel = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition shrink-0 cursor-pointer ${
                  isSel ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isSel ? 'text-indigo-200' : 'text-slate-400'}`} />
                <span>{phase.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Workspace (100% Width) */}
      <main className="flex-1 min-w-0 space-y-6">
        <header className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 capitalize">{ALUMNI_PHASES.find(p => p.id === activePhase)?.label}</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              National Alumni DOS | Institution: <span className="font-bold text-indigo-600">{institution}</span> | Role: <span className="font-bold text-indigo-600">{role}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded-full text-xs flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Alumni Active</span>
            </span>
          </div>
        </header>

        {/* Portal Content Area */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-lg font-extrabold mb-6 flex items-center gap-2 text-slate-900 pb-4 border-b border-slate-100">
            <Cpu className="text-indigo-600 w-5 h-5" />
            <span>{ALUMNI_PHASES.find(p => p.id === activePhase)?.label} Workspace</span>
          </h3>
          {activePhase === 'identity' ? (
             <AlumniIdentityWallet />
          ) : ['digital_twin', 'ai_automation', 'collaboration', 'benchmarking', 'autonomous'].includes(activePhase) ? (
             <AlumniEnterpriseIntelligence phase={activePhase} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                 <h4 className="font-bold mb-2 text-indigo-700 flex items-center gap-2"><Lock className="w-4 h-4"/> Governance Policy</h4>
                 <p className="text-slate-600 text-sm">Active Role: <span className="text-slate-900 font-bold">{role}</span>. Access Level: Regulated.</p>
               </div>
               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                 <h4 className="font-bold mb-2 text-indigo-700 flex items-center gap-2"><Activity className="w-4 h-4"/> Audit & Monitoring</h4>
                 <p className="text-slate-600 text-sm">Last action logged: <span className="text-slate-900 font-bold">User {role} viewed profile.</span></p>
               </div>
               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                 <h4 className="font-bold mb-2 text-indigo-700 flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Registration Status</h4>
                 <p className="text-slate-600 text-sm">Workflow: <span className="text-slate-900 font-bold">Member verified (Pending Finance).</span></p>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
