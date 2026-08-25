/**
 * JUMO UEOS v18.0 LTS — Sovereign Independent Product Application Router
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Users, 
  Layout, 
  Cpu, 
  Globe, 
  Zap, 
  Activity, 
  Search, 
  Bell, 
  HelpCircle, 
  User, 
  LogOut, 
  Settings, 
  ChevronRight, 
  Menu, 
  X,
  CreditCard,
  Landmark,
  BookOpen,
  PieChart,
  Shield,
  Layers,
  Sparkles,
  Bot,
  FileText
} from 'lucide-react';
import { logMilestone } from './diagnostics/moduleTracer';
import { AuthProvider, useAuth } from '../experience/context/AuthContext';
import { IdentityGateway } from '../experience/pages/IdentityGateway';
import { RegistrationView } from '../experience/pages/RegistrationView';
import { LoginView } from '../experience/pages/Login';
import { OwnerLoginView } from '../experience/pages/OwnerLogin';
import { PublicLoginView } from '../experience/pages/PublicLogin';
import { PublicPortalView } from '../experience/components/public/PublicPortal';
import { ErrorBoundary } from './components/ErrorBoundary';

// Direct Core Startup Imports
import { ApprovedProductRegistry, getApprovedProduct } from './products/ApprovedProductRegistry';
import { NeutralSovereignGateway } from '../experience/pages/NeutralSovereignGateway';
import { RuntimeReliabilityAgentBoundary } from './core/security/RuntimeReliabilityAgent';
import { ProductLoginView } from '../experience/pages/ProductLoginView';

// Helper to automatically recover when a dynamically imported chunk fails (e.g., after a new deployment)
function safeLazy<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(() =>
    factory().catch((err) => {
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        const reloadKey = 'jumo_chunk_reload_count';
        const reloadCount = Number(sessionStorage.getItem(reloadKey) || 0);
        if (reloadCount < 2) {
          sessionStorage.setItem(reloadKey, String(reloadCount + 1));
          window.location.reload();
        }
      }
      throw err;
    })
  );
}

// Lazy-Loaded Heavy Product Shells & Diagnostic Tools (Isolates Initial Boot Path)
const FintechShell = safeLazy(() => import('./products/fintech/FintechShell').then(m => ({ default: m.FintechShell })));
const NurseryPrimaryErpWebShell = safeLazy(() => import('./products/nursery-primary-erp/web/NurseryPrimaryErpWebShell').then(m => ({ default: m.NurseryPrimaryErpWebShell })));
const SecondaryErpWebShell = safeLazy(() => import('./products/secondary-erp/web/SecondaryErpWebShell').then(m => ({ default: m.SecondaryErpWebShell })));
const AlumniErpWebShell = safeLazy(() => import('./products/alumni-erp').then(m => ({ default: m.AlumniErpWebShell })));
const ChurchErpWebShell = safeLazy(() => import('./products/church-erp').then(m => ({ default: m.ChurchErpWebShell })));

const FaapMobileApp = safeLazy(() => import('./products/faap').then(m => ({ default: m.FaapMobileApp })));
const AlumniErpMobileApp = safeLazy(() => import('./products/alumni-erp').then(m => ({ default: m.AlumniErpMobileApp })));
const ChurchErpMobileApp = safeLazy(() => import('./products/church-erp').then(m => ({ default: m.ChurchErpMobileApp })));

const OwnerControlCenterLaunchpad = safeLazy(() => import('./control-center/launchpad/OwnerControlCenterLaunchpad').then(m => ({ default: m.OwnerControlCenterLaunchpad })));
const TelemetryMonitoringCenter = safeLazy(() => import('./control-center/monitoring').then(m => ({ default: m.TelemetryMonitoringCenter })));
const SystemSettingsCenter = safeLazy(() => import('./control-center/settings').then(m => ({ default: m.SystemSettingsCenter })));
const TraceabilityMatrix = safeLazy(() => import('./diagnostics/TraceabilityMatrix').then(m => ({ default: m.TraceabilityMatrix })));
const JumoIdentityScannerView = safeLazy(() => import('./components/identity/JumoIdentityScannerView').then(m => ({ default: m.JumoIdentityScannerView })));
const ImplementationAudit = safeLazy(() => import('./core/enterprise/components/audit/ImplementationAudit').then(m => ({ default: m.ImplementationAudit })));
const MetadataExplorer = safeLazy(() => import('./core/enterprise/components/metadata/MetadataExplorer').then(m => ({ default: m.MetadataExplorer })));

function DiagnosticFallback({ name }: { name: string }) {
  return (
    <div className="p-12 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-4 max-w-xl mx-auto my-12 text-slate-200">
      <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto" />
      <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Loading Module: {name}</h3>
      <p className="text-xs text-slate-400">Fetching sub-system bundle chunk...</p>
    </div>
  );
}

function AppContent() {
  logMilestone('APP_CONTENT_START', 'PASS');
  const { user, loading: authLoading } = useAuth();
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

  const routePath = (currentRoute || '/').split('?')[0];

  useEffect(() => {
    if (routePath === '/school' || routePath.startsWith('/education')) {
      handleNavigate('/secondary');
    }
  }, [routePath]);

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
      <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col items-center justify-center font-mono text-xs p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>JUMO UEOS Initializing Authentication State...</span>
        </div>
        <button 
          onClick={() => handleNavigate('/login')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-xs rounded-lg transition shadow-md cursor-pointer"
        >
          Bypass & Continue to Login
        </button>
      </div>
    );
  }

  // Active View Renderer
  const renderActiveView = () => {
    // 1. PUBLIC ROUTES (Unauthenticated)
    if (!user) {
      if (routePath === '/login') return <LoginView onNavigate={handleNavigate} />;
      if (routePath === '/register' || routePath === '/signup') return <RegistrationView onNavigate={handleNavigate} />;
      if (routePath === '/owner-login' || routePath === '/vault-login') return <OwnerLoginView onNavigate={handleNavigate} />;
      if (routePath === '/public-login' || routePath === '/citizen-login') return <PublicLoginView onNavigate={handleNavigate} />;
      if (routePath === '/public-portal') return <PublicPortalView onNavigate={handleNavigate} />;
      if (routePath === '/audit') return <ImplementationAudit />;
      if (routePath === '/metadata' || routePath === '/metadata-explorer') return <MetadataExplorer onNavigate={handleNavigate} />;
      if (routePath === '/gateway' || routePath === '/identity') return <IdentityGateway onNavigate={handleNavigate} />;
      if (routePath.startsWith('/verify') || routePath.startsWith('/scanner') || routePath === '/scan-id') {
        return <JumoIdentityScannerView onNavigate={handleNavigate} />;
      }

      // Dynamic Product Login Routes
      const loginMatch = routePath.match(/^\/(?:products\/)?([^\/]+)\/login$/);
      if (loginMatch) {
        const productId = loginMatch[1];
        const product = getApprovedProduct(productId);
        return (
          <ProductLoginView 
            productId={product.id}
            productName={product.name}
            productIcon={React.createElement(product?.icon || GraduationCap, { className: 'w-8 h-8' })}
            brandColor={(product?.color || '').includes('emerald') ? '#10b981' : (product?.color || '').includes('pink') ? '#db2777' : (product?.color || '').includes('blue') ? '#2563eb' : '#4f46e5'}
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
    if (routePath === '/metadata' || routePath === '/metadata-explorer') {
      return <MetadataExplorer onNavigate={handleNavigate} />;
    }

    // Dynamic Product Routing
    const productMatch = routePath.match(/^\/(?:products\/)?([^\/]+)/);
    if (productMatch) {
      const productIdRaw = productMatch[1];
      const product = getApprovedProduct(productIdRaw);
      const isMobile = routePath.includes('/mobile');

      switch (product.id) {
        case 'JUMO-FINTECH':
          return isMobile ? (
            <FaapMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/fintech')} />
          ) : (
            <FintechShell onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout} />
          );
        case 'JUMO-NURSERY-PRIMARY-ERP':
          return <NurseryPrimaryErpWebShell onNavigate={handleNavigate} />;
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
          break;
      }
    }

    return <NeutralSovereignGateway onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Permanent Top Diagnostic Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            JUMO DIGITAL HYBRID PLATFORM
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">UEOS v18.0.0</span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold text-[10px]">✓ BOOT</span>
          <span className="text-emerald-400 font-bold text-[10px]">✓ APP</span>
          <span className="text-emerald-400 font-bold text-[10px]">✓ REGISTRY</span>
          <span className="text-emerald-400 font-bold text-[10px]">✓ GATEWAY</span>
          <span className="text-emerald-400 font-bold text-[10px]">✓ AUTH</span>
          <button 
            onClick={() => handleNavigate('/login')}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-sans font-bold text-xs transition uppercase tracking-wider shadow-sm cursor-pointer"
          >
            LOGIN
          </button>
        </div>
      </div>

      {/* Main View Shell */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ErrorBoundary name={`Route_${routePath}`}>
          <Suspense fallback={<DiagnosticFallback name={routePath} />}>
            {renderActiveView()}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary name="Global">
      <AuthProvider>
        <RuntimeReliabilityAgentBoundary moduleId="JUMO_UEOS_KERNEL">
          <AppContent />
        </RuntimeReliabilityAgentBoundary>
      </AuthProvider>
    </ErrorBoundary>
  );
}
