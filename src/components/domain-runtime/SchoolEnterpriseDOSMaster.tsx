import React, { useState } from 'react';
import {
  Bot, Cpu, Sparkles, ShieldCheck, FileText, Award, Building2, Globe, BookOpen,
  Users, DollarSign, Layers, Calendar, Clock, CheckCircle, AlertTriangle, Key,
  Lock, RefreshCw, Search, Filter, Plus, Trash2, Edit3, ChevronRight, Share2,
  Download, Printer, Send, Smartphone, Tv, Video, Camera, Image,
  FolderOpen, Archive, HelpCircle, Activity, BarChart3, PieChart, TrendingUp,
  MapPin, GraduationCap, Home, Wifi, HardDrive, Database, Terminal, Shield, 
  QrCode, FileDown, Eye, Play, Book, UserPlus, GraduationCap as Cap, Settings, Microscope
} from 'lucide-react';

// ==========================================
// CONFIGURATION & AI AGENTS (Education DOS)
// ==========================================

export type InstitutionType = 
  'Early Childhood' | 'Primary' | 'Secondary' | 'Technical/Vocational' | 
  'University' | 'Medical School' | 'Research Institute' | 'Professional Training';

export const AI_AGENTS = [
  { name: 'Admissions AI', icon: UserPlus },
  { name: 'Student Success AI', icon: TrendingUp },
  { name: 'Teaching Assistant AI', icon: BookOpen },
  { name: 'Research AI', icon: Microscope },
  { name: 'Career Guidance AI', icon: Award },
  { name: 'Finance AI', icon: DollarSign },
  { name: 'Accreditation AI', icon: ShieldCheck },
  { name: 'Academic Planning AI', icon: Calendar },
];

export const EDUCATION_PHASES = [
  { id: 'governance', label: '1. National Governance', icon: Shield },
  { id: 'identity', label: '2. Identity & Census', icon: QrCode },
  { id: 'curriculum', label: '3. Curriculum & Assessment', icon: FileText },
  { id: 'campus', label: '4. Smart Campus & Infra', icon: Building2 },
  { id: 'research', label: '5. Research & Innovation', icon: Microscope },
  { id: 'finance', label: '6. Finance & Treasury', icon: DollarSign },
  { id: 'library', label: '7. Digital Knowledge', icon: BookOpen },
  { id: 'ai', label: '8. AI Command Center', icon: Bot },
  { id: 'community', label: '9. Community & Alumni', icon: Users },
  { id: 'cognitive_twins', label: '11. Cognitive Learner Twins', icon: Sparkles },
  { id: 'meta_campus', label: '12. Immersive AR/VR Meta-Campus', icon: Tv },
  { id: 'credential_ledger', label: '13. Decentralized Ledger', icon: Lock },
  { id: 'compliance', label: '14. Autonomous Compliance', icon: ShieldCheck },
  { id: 'resource_mesh', label: '15. Predictive Resource Mesh', icon: TrendingUp },
  { id: 'knowledge_mkt', label: '16. Peer-to-Peer Marketplace', icon: Globe },
  { id: 'policy_sim', label: '17. Policy Simulation Engine', icon: Activity },
  { id: 'iot_ecosystem', label: '18. Smart Campus IoT', icon: Wifi },
  { id: 'knowledge_fabric', label: '19. Collaborative Knowledge Fabric', icon: Share2 },
  { id: 'app_runtime', label: '20. DOS App Runtime & Marketplace', icon: HardDrive },
];

export const ENTERPRISE_CORE_SERVICES = [
  { name: 'Zero-Trust Security Mesh', icon: Shield, status: 'Active' },
  { name: 'JUMO FAAP Financial Ledger', icon: DollarSign, status: 'Synced' },
  { name: 'Unified Interop Gateway', icon: Globe, status: 'Online' },
  { name: 'Decentralized Audit Log', icon: FileText, status: 'Secure' },
];



// ==========================================
// MAIN COMPONENT: SCHOOL DOS MASTER HUB
// ==========================================

export const SchoolEnterpriseDOSMaster: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string>('governance');
  const [institution, setInstitution] = useState<InstitutionType>('University');

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
              <h2 className="text-sm font-extrabold text-slate-900 leading-tight">JUMO Education DOS</h2>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">21 Education Phases</span>
            </div>
          </div>

          {/* Institution Selector in Top Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500">Institution:</span>
              <select 
                value={institution} 
                onChange={(e) => setInstitution(e.target.value as InstitutionType)}
                className="bg-transparent text-slate-800 font-bold text-xs focus:outline-none cursor-pointer"
              >
                {['Early Childhood', 'Primary', 'Secondary', 'Technical/Vocational', 'University', 'Medical School', 'Research Institute', 'Professional Training'].map(type => (
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
          {EDUCATION_PHASES.map((phase) => {
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
            <h1 className="text-2xl font-black text-slate-900 capitalize">{EDUCATION_PHASES.find(p => p.id === activePhase)?.label}</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              National Education DOS | Institution: <span className="font-bold text-indigo-600">{institution}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded-full text-xs flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Education Active</span>
            </span>
          </div>
        </header>

        {/* Portal Content Area */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-lg font-extrabold mb-6 flex items-center gap-2 text-slate-900 pb-4 border-b border-slate-100">
            <Cpu className="text-indigo-600 w-5 h-5" />
            <span>{EDUCATION_PHASES.find(p => p.id === activePhase)?.label} Workspace</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
               <h4 className="font-bold mb-2 text-indigo-700 flex items-center gap-2">System Integration</h4>
               <p className="text-slate-600 text-sm">FAAP/UEOS Kernel synchronized.</p>
             </div>
             <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
               <h4 className="font-bold mb-2 text-indigo-700 flex items-center gap-2">Active AI Agents</h4>
               <p className="text-slate-600 text-sm">{AI_AGENTS.length} active in cluster.</p>
             </div>
             <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
               <h4 className="font-bold mb-2 text-indigo-700 flex items-center gap-2">Deployment Status</h4>
               <p className="text-slate-600 text-sm">Hybrid: Web, Android, iOS, PWA.</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

