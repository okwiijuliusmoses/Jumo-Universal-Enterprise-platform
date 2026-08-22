/**
 * JUMO UEOS v14.0 LTS — Sovereign Independent Product Application Router
 * Implements Independent Product Workspace Architecture for:
 * 1. JUMO FINTECH (Financial Operating Platform)
 * 2. JUMO UNIVERSAL SCHOOL ERP (Education ERP)
 * 3. JUMO ALUMNI ERP (Alumni Network & Advancement)
 * 
 * Operating Architecture:
 * - Entry Point: JUMO Application Launcher (3 Isolated Application Cards)
 * - Isolated Runtimes: Each product runs in its own shell with no universal sidebar
 * - Underlying Micro-Kernel: JUMO UEOS operates underneath as security, identity, AI & ledger runtime
 */

import React, { useState, useEffect } from 'react';
import { logMilestone } from './diagnostics/moduleTracer';
import { AuthProvider, useAuth } from '../experience/context/AuthContext';
import { IdentityGateway } from '../experience/pages/IdentityGateway';
import { RegistrationView } from '../experience/pages/RegistrationView';
import { LoginView } from '../experience/pages/Login';
import { OwnerLoginView } from '../experience/pages/OwnerLogin';
import { PublicLoginView } from '../experience/pages/PublicLogin';
import { PublicPortalView } from '../experience/components/public/PublicPortal';
import { ErrorBoundary } from './components/ErrorBoundary';

// 3 Approved Sovereign Standalone Products
import { FintechShell } from './products/fintech/FintechShell';
import { EducationErpWebShell as EducationErpPlatform, EducationErpMobileApp } from './products/education-erp';
import { AlumniErpWebShell as AlumniPlatform, AlumniErpMobileApp } from './products/alumni-erp';
import { FaapMobileApp } from './products/faap';
import { ChurchErpWebShell as ChurchPlatform, ChurchErpMobileApp } from './products/church-erp';
import { PlatformShell } from './components/runtime/PlatformShell';

// Authoritative Control Center & System Administration
import { OwnerControlCenterLaunchpad } from './control-center/launchpad/OwnerControlCenterLaunchpad';
import { TelemetryMonitoringCenter } from './control-center/monitoring';
import { SystemSettingsCenter } from './control-center/settings';

// Core Clean Application Launcher
import { JumoApplicationLauncher } from './components/JumoApplicationLauncher';
import { JumoIdentityScannerView } from './components/identity/JumoIdentityScannerView';

function AppContent() {
  logMilestone('APP_CONTENT_START', 'PASS');
  const { user, loading: authLoading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      const path = window.location.pathname + window.location.search;
      return path;
    }
    return '/';
  });
  
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname + window.location.search;
        setCurrentRoute(path);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>JUMO UEOS Initializing...</span>
        </div>
      </div>
    );
  }

  const routePath = (currentRoute || (typeof window !== 'undefined' ? window.location.pathname : '/')).split('?')[0];

  // 1. Unauthenticated Gateway & Public Direct Access
  if (!user) {
    if (routePath === '/login' || routePath === '/institution-login') {
      return <LoginView onNavigate={handleNavigate} />;
    }
    if (routePath === '/register' || routePath === '/signup') {
      return <RegistrationView onNavigate={handleNavigate} />;
    }
    if (routePath === '/owner-login' || routePath === '/vault-login') {
      return <OwnerLoginView onNavigate={handleNavigate} />;
    }
    if (routePath === '/public-login' || routePath === '/citizen-login') {
      return <PublicLoginView onNavigate={handleNavigate} />;
    }
    if (routePath === '/public-portal') {
      return <PublicPortalView onNavigate={handleNavigate} />;
    }
    if (routePath.startsWith('/verify') || routePath.startsWith('/scanner') || routePath.startsWith('/identity-scanner') || routePath === '/scan-id') {
      return (
        <div className="min-h-screen bg-white">
          <JumoIdentityScannerView onNavigate={handleNavigate} />
        </div>
      );
    }
    if (routePath === '/gateway' || routePath === '/identity') {
      return <IdentityGateway onNavigate={handleNavigate} />;
    }
  }

  // 2. Sovereign Product 1: JUMO FINTECH (Financial Services Operating Platform)
  if (
    routePath.startsWith('/products/fintech') ||
    routePath === '/fintech' ||
    routePath.startsWith('/fintech/') ||
    routePath === '/finance' ||
    routePath === '/pay' ||
    routePath === '/faap' ||
    routePath === '/treasury' ||
    routePath.includes('finpay')
  ) {
    const isMobile = routePath.includes('/mobile');
    return isMobile ? (
      <FaapMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/fintech')} />
    ) : (
      <FintechShell onNavigate={handleNavigate} currentUser={user || undefined} onLogout={handleLogout} />
    );
  }

  // 3. Sovereign Product 2: JUMO UNIVERSAL SCHOOL ERP (Education ERP)
  if (
    routePath.startsWith('/products/education') ||
    routePath === '/education' ||
    routePath.startsWith('/education/') ||
    routePath === '/school' ||
    routePath === '/school-erp' ||
    routePath === '/education-erp' ||
    routePath === '/edu' ||
    routePath.includes('edu-alumni')
  ) {
    const isMobile = routePath.includes('/mobile');
    return isMobile ? (
      <EducationErpMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/education')} />
    ) : (
      <EducationErpPlatform onNavigate={handleNavigate} />
    );
  }

  // 4. Sovereign Product 3: JUMO ALUMNI ERP (Alumni Network & Advancement)
  if (
    routePath.startsWith('/products/alumni') ||
    routePath === '/alumni' ||
    routePath.startsWith('/alumni/') ||
    routePath === '/alumni-erp'
  ) {
    const isMobile = routePath.includes('/mobile');
    return isMobile ? (
      <AlumniErpMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/alumni')} />
    ) : (
      <AlumniPlatform onNavigate={handleNavigate} />
    );
  }

  // 5. Sovereign Product 4: JUMO CHURCH ERP (Ecclesiastical & Diocesan Platform)
  if (
    routePath.startsWith('/products/church') ||
    routePath === '/church' ||
    routePath.startsWith('/church/') ||
    routePath === '/church-erp' ||
    routePath.includes('church') || 
    routePath.includes('diocese')
  ) {
    const isMobile = routePath.includes('/mobile');
    return isMobile ? (
      <ChurchErpMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/church')} />
    ) : (
      <ChurchPlatform onNavigate={handleNavigate} />
    );
  }

  // 6. Privileged JUMO UEOS Owner & System Administration
  if (
    routePath === '/owner' ||
    routePath === '/admin' ||
    routePath.startsWith('/control') ||
    routePath.startsWith('/owner/')
  ) {
    return <OwnerControlCenterLaunchpad onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout} />;
  }

  if (routePath.startsWith('/control-center/monitoring') || routePath === '/operations' || routePath === '/developer-center') {
    return <TelemetryMonitoringCenter onNavigate={handleNavigate} />;
  }

  if (routePath.startsWith('/control-center/settings') || routePath === '/settings') {
    return <SystemSettingsCenter onNavigate={handleNavigate} />;
  }

  // 7. Authoritative Entry Point: JUMO Application Launcher
  // (Served at '/', '/apps', '/launcher', '/public', '/portal', or any unmatched route)
  return (
    <JumoApplicationLauncher onNavigate={handleNavigate} currentUser={user || undefined} />
  );
}

export default function App() {
  return (
    <ErrorBoundary name="Global">
      <AuthProvider>
        <ErrorBoundary name="AppContent">
          <AppContent />
        </ErrorBoundary>
      </AuthProvider>
    </ErrorBoundary>
  );
}
