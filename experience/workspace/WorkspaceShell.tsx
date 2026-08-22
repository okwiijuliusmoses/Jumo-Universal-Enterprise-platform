import React, { useState } from 'react';
import { PlatformHeader } from '../platform/PlatformHeader';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { LayoutDashboard, History, Sparkles, ChevronRight, X, Layers, Bot, HelpCircle } from 'lucide-react';

interface WorkspaceShellProps {
  children: React.ReactNode;
  onNavigate?: (route: string) => void;
  titleOverride?: string;
  subtitleOverride?: string;
}

export const WorkspaceShell: React.FC<WorkspaceShellProps> = ({ 
  children, 
  onNavigate, 
  titleOverride, 
  subtitleOverride 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      {/* Universal Compact Header */}
      <PlatformHeader onNavigate={onNavigate} titleOverride={titleOverride} subtitleOverride={subtitleOverride} />
      
      {/* Universal Application Shell Layout */}
      <div className="flex-1 flex overflow-hidden max-h-[calc(100vh-44px)] relative">
        {/* Collapsible Left Navigation (Desktop/Tablet) */}
        <div className="hidden md:flex shrink-0 z-10">
          <Sidebar 
            currentRoute={typeof window !== 'undefined' ? window.location.pathname : '/workspace'} 
            onNavigate={onNavigate} 
            isCollapsed={isCollapsed} 
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)} 
          />
        </div>

        {/* 85-90% Dedicated Content Workspace & Compact Footer */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Workspace Tabs & History Bar (Decision 2) */}
          <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-2 flex items-center justify-between text-xs sticky top-0 z-20 shadow-2xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('current')}
                className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'current' ? 'bg-[#0078D4] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Active Workspace
              </button>
              <div className="h-4 w-px bg-slate-200 mx-1" />
              <div className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
                <History className="w-3.5 h-3.5 text-slate-400" />
                <span>Recent:</span>
                <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-sans cursor-pointer hover:border-blue-400" onClick={() => onNavigate?.('/faap')}>FAAP Ledger</span>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-sans cursor-pointer hover:border-blue-400" onClick={() => onNavigate?.('/ai-platform')}>AI Swarm</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                className={`px-3 py-1 rounded-md font-semibold font-mono text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
                  isRightPanelOpen ? 'bg-purple-600 text-white shadow-xs' : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
                }`}
                title="Toggle Right Context & AI Panel"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI &amp; Context Panel
              </button>
            </div>
          </div>

          <main className="flex-1 p-4 md:p-6 w-full max-w-[96%] mx-auto">
            {children}
          </main>
          <Footer />
        </div>

        {/* Collapsible Right Context Panel (Decision 2) */}
        {isRightPanelOpen && (
          <aside className="w-80 bg-white border-l border-slate-200 flex flex-col justify-between shrink-0 z-30 animate-slide-left shadow-lg overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5 font-mono">
                  <Bot className="w-4 h-4 text-purple-600" /> Sovereign AI Context
                </span>
                <button onClick={() => setIsRightPanelOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-100 space-y-2 text-xs text-slate-700 font-sans">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Active Workspace Assistant
                </div>
                <p className="text-[11px] leading-relaxed">
                  Gemini 3.5 Sovereign Router is monitoring this tenant workspace. Ask questions or execute ledger audits directly.
                </p>
                <button 
                  onClick={() => onNavigate?.('/ai-platform')}
                  className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-[11px] shadow-xs transition"
                >
                  Open Full AI Swarm
                </button>
              </div>
              <div className="space-y-2 pt-2">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Quick Actions</h4>
                <div className="grid grid-cols-1 gap-1.5 text-xs font-medium">
                  <button onClick={() => onNavigate?.('/faap')} className="w-full p-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-left transition border border-slate-200/80 flex items-center justify-between">
                    <span>Rebalance Ledgers</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button onClick={() => onNavigate?.('/security')} className="w-full p-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-left transition border border-slate-200/80 flex items-center justify-between">
                    <span>Verify MFA Tokens</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>Context: Tenant Node</span>
              <span className="text-emerald-600 font-bold">100% SECURE</span>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
