/**
 * JUMO UEOS — Authoritative Sovereign Enterprise Layout
 * Master enterprise cloud console shell (Microsoft Azure Portal / Office 365 style).
 * Enforces:
 * - Compact White Header with 9-dots Platform Launcher
 * - Collapsible Cloud Console Sidebar (expanded w-64, collapsed w-16)
 * - Maximum Workspace Visibility (bg-slate-50 clean canvas)
 * - Compact System Status Footer (h-8)
 */

import React, { useState } from 'react';
import { EnterpriseNavbar } from '../navigation/EnterpriseNavbar';
import { EnterpriseSidebar } from '../navigation/EnterpriseSidebar';
import { InstitutionInfoBar } from './InstitutionInfoBar';
import { WorkspaceToolbar } from './WorkspaceToolbar';
import { RightEnterprisePanel } from './RightEnterprisePanel';
import { FloatingEnterpriseUtilities } from './FloatingEnterpriseUtilities';

export interface SovereignEnterpriseLayoutProps {
  children: React.ReactNode;
  currentRoute?: string;
  onNavigate?: (path: string) => void;
  currentUser?: {
    name?: string;
    role?: string;
    email?: string;
    [key: string]: any;
  };
  onLogout?: () => void;
  institutionName?: string;
  department?: string;
  moduleName?: string;
  breadcrumbs?: string[];
}

export const SovereignEnterpriseLayout: React.FC<SovereignEnterpriseLayoutProps> = ({
  children,
  currentRoute = '/',
  onNavigate,
  currentUser,
  onLogout,
  institutionName,
  department,
  moduleName,
  breadcrumbs
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Universal Compact Enterprise Header (h-14) */}
      <EnterpriseNavbar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        user={currentUser}
      />

      {/* 2. Institution Information Bar */}
      <InstitutionInfoBar
        institutionName={institutionName}
        department={department}
        userRole={currentUser?.role || 'Ring-0 Administrator'}
      />

      {/* 3. Main Container: Sidebar + Central Workspace + Right Context Panel */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* 4. Left Enterprise Navigation */}
        <EnterpriseSidebar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          isOpenOnMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* 5. Center Workspace Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 text-slate-900 flex flex-col justify-between">
          <div className="flex-1 flex flex-col">
            {/* Workspace Toolbar */}
            <WorkspaceToolbar
              moduleName={moduleName}
              breadcrumbs={breadcrumbs}
              onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
              isRightPanelOpen={isRightPanelOpen}
            />

            {/* Workspace Canvas / Widgets / Tables */}
            <div className="flex-1 p-4 md:p-6">
              {children}
            </div>
          </div>

          {/* 6. Ultra-Compact Universal Footer (h-8) */}
          <footer className="h-8 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-[11px] text-slate-500 font-mono select-none shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-700">JUMO UEOS v14.0 LTS</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Universal Enterprise Operating System Architecture</span>
            </div>
            <div className="flex items-center gap-4">
              <span>STATUS: <strong className="text-emerald-600">100% PARITY</strong></span>
              <span className="hidden md:inline">ENCRYPTION: <strong className="text-[#0078D4]">AES-256 / RING-0</strong></span>
              <span className="hidden lg:inline">256 NODES ONLINE</span>
            </div>
          </footer>

          {/* On-Demand Floating Enterprise Utilities (AI, Telemetry, SLAs, Help) */}
          <FloatingEnterpriseUtilities />
        </main>

        {/* 7. Right Intelligent Enterprise Panel */}
        <RightEnterprisePanel
          isOpen={isRightPanelOpen}
          onClose={() => setIsRightPanelOpen(false)}
        />
      </div>
    </div>
  );
};

export default SovereignEnterpriseLayout;

