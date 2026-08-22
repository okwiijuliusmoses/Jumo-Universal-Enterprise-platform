/**
 * JUMO UEOS v14.0 LTS — Sovereign Independent Product Application Router
 * Implements Independent Product Workspace Architecture for:
 * 1. JUMO FINTECH (Financial Operating Platform)
 * 2. JUMO NURSERY ERP
 * 3. JUMO PRIMARY ERP
 * 4. JUMO SECONDARY ERP
 * 5. JUMO ALUMNI ERP
 * 6. JUMO CHURCH ERP
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

// Sovereign Standalone Products & Registry
import { ApprovedProductRegistry, getApprovedProduct } from './products/ApprovedProductRegistry';
import { NeutralSovereignGateway } from '../experience/pages/NeutralSovereignGateway';
import { JumoBiometricUnlock } from './components/identity/JumoBiometricUnlock';

// Product Shells
import { FintechShell } from './products/fintech/FintechShell';
import { NurseryErpWebShell } from './products/nursery-erp/web/NurseryErpWebShell';
import { PrimaryErpWebShell } from './products/primary-erp/web/PrimaryErpWebShell';
import { SecondaryErpWebShell } from './products/secondary-erp/web/SecondaryErpWebShell';
import { AlumniErpWebShell } from './products/alumni-erp';
import { ChurchErpWebShell } from './products/church-erp';

// Mobile Apps
import { FaapMobileApp } from './products/faap';
import { AlumniErpMobileApp } from './products/alumni-erp';
import { ChurchErpMobileApp } from './products/church-erp';

// Identity & Specialized Pages
import { ProductLoginView } from '../experience/pages/ProductLoginView';
import { OwnerControlCenterLaunchpad } from './control-center/launchpad/OwnerControlCenterLaunchpad';
import { TelemetryMonitoringCenter } from './control-center/monitoring';
import { SystemSettingsCenter } from './control-center/settings';
import { TraceabilityMatrix } from './diagnostics/TraceabilityMatrix';
import { JumoIdentityScannerView } from './components/identity/JumoIdentityScannerView';

function AppContent() {
  logMilestone('APP_CONTENT_START', 'PASS');
  const { user, loading: authLoading } = useAuth();
  const [showBiometric, setShowBiometric] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });
  
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        setCurrentRoute(window.location.pathname + window.location.search);
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

  // 0. Biometric Layer (Startup only)
  if (showBiometric) {
    return <JumoBiometricUnlock onUnlock={() => setShowBiometric(false)} />;
  }

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

  const routePath = (currentRoute || '/').split('?')[0];

  // 1. PUBLIC ROUTES (Unauthenticated)
  if (!user) {
    // Standard Identity Routes
    if (routePath === '/login') return <LoginView onNavigate={handleNavigate} />;
    if (routePath === '/register' || routePath === '/signup') return <RegistrationView onNavigate={handleNavigate} />;
    if (routePath === '/owner-login' || routePath === '/vault-login') return <OwnerLoginView onNavigate={handleNavigate} />;
    if (routePath === '/public-login' || routePath === '/citizen-login') return <PublicLoginView onNavigate={handleNavigate} />;
    if (routePath === '/public-portal') return <PublicPortalView onNavigate={handleNavigate} />;
    if (routePath === '/gateway' || routePath === '/identity') return <IdentityGateway onNavigate={handleNavigate} />;
    if (routePath.startsWith('/verify') || routePath.startsWith('/scanner') || routePath === '/scan-id') {
      return <JumoIdentityScannerView onNavigate={handleNavigate} />;
    }

    // Dynamic Product Login Routes (Sovereign Boundaries)
    // Format: /products/:productId/login or /:productId/login
    const loginMatch = routePath.match(/^\/(?:products\/)?([^\/]+)\/login$/);
    if (loginMatch) {
      const productId = loginMatch[1];
      const product = getApprovedProduct(productId);
      return (
        <ProductLoginView 
          productId={product.id}
          productName={product.name}
          productIcon={React.createElement(product.icon, { className: 'w-8 h-8' })}
          brandColor={product.color.includes('emerald') ? '#10b981' : product.color.includes('pink') ? '#db2777' : product.color.includes('blue') ? '#2563eb' : '#4f46e5'}
          onNavigate={handleNavigate}
          defaultEmail={`admin@${productId}.jumo.systems`}
          redirectPath={product.route}
        />
      );
    }

    // Unauthenticated Root Fallback: Neutral Sovereign Gateway
    return <NeutralSovereignGateway onNavigate={handleNavigate} />;
  }

  // 2. PROTECTED ROUTES (Authenticated)

  // System Administration & Owner Contexts
  if (routePath.startsWith('/owner') || routePath.startsWith('/admin') || routePath.startsWith('/control')) {
    return <OwnerControlCenterLaunchpad onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout} />;
  }
  if (routePath === '/operations' || routePath === '/developer-center' || routePath === '/monitoring') {
    return <TelemetryMonitoringCenter onNavigate={handleNavigate} />;
  }
  if (routePath === '/control-center/traceability') {
    return <TraceabilityMatrix />;
  }
  if (routePath === '/settings') {
    return <SystemSettingsCenter onNavigate={handleNavigate} />;
  }

  // Dynamic Product Routing (The Registry is the Source of Truth)
  // Format: /products/:productId/... or /:productId/...
  const productMatch = routePath.match(/^\/(?:products\/)?([^\/]+)/);
  if (productMatch) {
    const productIdRaw = productMatch[1];
    const product = getApprovedProduct(productIdRaw);
    const isMobile = routePath.includes('/mobile');

    // Sovereign Shell Resolution Factory
    switch (product.id) {
      case 'JUMO-FINTECH':
        return isMobile ? (
          <FaapMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/fintech')} />
        ) : (
          <FintechShell onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout} />
        );
      case 'JUMO-NURSERY-ERP':
        return <NurseryErpWebShell onNavigate={handleNavigate} />;
      case 'JUMO-PRIMARY-ERP':
        return <PrimaryErpWebShell onNavigate={handleNavigate} />;
      case 'JUMO-SECONDARY-ERP':
        return <SecondaryErpWebShell onNavigate={handleNavigate} />;
      case 'JUMO-ALUMNI':
        return isMobile ? (
          <AlumniErpMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/alumni')} />
        ) : (
          <AlumniErpWebShell onNavigate={handleNavigate} />
        );
      case 'JUMO-CHURCH':
        return isMobile ? (
          <ChurchErpMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/church')} />
        ) : (
          <ChurchErpWebShell onNavigate={handleNavigate} />
        );
      case 'JUMO-CONTROL':
        return <OwnerControlCenterLaunchpad onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout} />;
      default:
        // If product found in registry but shell is missing, redirect to gateway
        break;
    }
  }

  // Legacy Redirects
  if (routePath === '/school' || routePath.startsWith('/education')) {
    handleNavigate('/secondary');
    return null;
  }

  // Final Catch-all: Neutral Sovereign Gateway (Authenticated version)
  if (routePath === '/') {
    return <NeutralSovereignGateway onNavigate={handleNavigate} />;
  }

  // Fallback to Fintech if absolutely lost
  handleNavigate('/fintech');
  return null;
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
