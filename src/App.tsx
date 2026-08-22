/**
 * JUMO UEOS v14.0 LTS — Authoritative Digital Enterprise Platform Router
 * Implements Delegated Routing Architecture for 10 Sovereign Enterprise Platforms.
 * Enforces Microsoft Office 365 / Azure Portal Cloud Console UI with zero dark mode styling.
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
import { TenantView } from '../experience/pages/TenantView';
import { WorkflowView } from '../experience/pages/WorkflowView';
import { DocumentationView } from '../experience/pages/DocumentationView';
import { AdminView } from '../experience/pages/AdminView';
import { DircView } from '../experience/pages/DircView';
import { SovereignPlatformFoundationView } from '../experience/pages/SovereignPlatformFoundationView';
import { JumoDataRecordsView } from '../experience/pages/JumoDataRecordsView';
import { JumoIntegrationPlatformView } from '../experience/pages/JumoIntegrationPlatformView';
import { JumoCommunicationsPlatformView } from '../experience/pages/JumoCommunicationsPlatformView';
import { JumoApiManagementCenterView } from '../experience/pages/JumoApiManagementCenterView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useAppBoot } from './hooks/useAppBoot';
import { PlatformRegistry } from './lib/registry';
import { DomainWorkspace } from './components/DomainWorkspace';
import { Workspace } from '../experience/workspace/Workspace';
import { WorkspaceShell } from '../experience/workspace/WorkspaceShell';

// Authoritative Sovereign Platform Entry Points
import { ErpPlatformCenter, UniversalErpLifecycleRuntime } from './platforms/erp';
import { FaapPlatform } from './platforms/faap';
import { FintechPlatform } from './platforms/fintech';
import { DigitalPayPlatform } from './platforms/digital-pay';
import { AegisSecurityPlatform } from './platforms/aegis';
import { JumoTrustPlatform } from './platforms/trust';
import { CloudPlatform } from './platforms/cloud';
import { SoftwareFactoryPlatform, ErpTemplateFactoryCenter } from './platforms/factory';
import { AiCommandPlatform } from './platforms/ai';
import { InnovationResearchPlatform } from './platforms/research';
import { PlatformStore } from './platforms/store';
import { UniversalPlatformShell } from './platforms/shell';
// Authoritative Sovereign Platform Standalone Runtimes (5 Approved JUMO Products)
import { EducationErpWebShell as EducationErpPlatform, EducationErpMobileApp } from './products/education-erp';
import { AlumniErpWebShell as AlumniPlatform, AlumniErpMobileApp } from './products/alumni-erp';
import { FaapWebShell as FaapProductPlatform, FaapMobileApp } from './products/faap';
import { DigitalPayWebShell as DigitalPayProductPlatform, DigitalPayMobileApp } from './products/digital-pay';
import { ChurchErpWebShell as ChurchPlatform, ChurchErpMobileApp } from './products/church-erp';
import { FintechDeveloperPortal } from './products/FintechDeveloperPortal';
import { EducationAlumniDeveloperPortal } from './products/EducationAlumniDeveloperPortal';
import { ChurchDeveloperPortal } from './products/ChurchDeveloperPortal';
import { FintechShell } from './products/fintech/FintechShell';
import { FaapControllerWorkspace } from './products/fintech/financial-accounting/web/FaapControllerWorkspace';
import { AgentNetworkWorkspace } from './products/fintech/agent-banking/web/AgentNetworkWorkspace';
import { MicrofinanceWorkspace } from './products/fintech/microfinance/web/MicrofinanceWorkspace';
import { PlatformShell } from './components/runtime/PlatformShell';

// Authoritative Control Center & Layout
import { OwnerControlCenterLaunchpad } from './control-center/launchpad/OwnerControlCenterLaunchpad';
import { TelemetryMonitoringCenter } from './control-center/monitoring';
import { SystemSettingsCenter } from './control-center/settings';
import { SovereignEnterpriseLayout } from './control-center/layout/SovereignEnterpriseLayout';
import { EnterprisePortalFabric } from './components/EnterprisePortalFabric';

// Rebuilt Universal Frontend Pages & Modules
import { UniversalErpInstallationEngine } from './platforms/erp/installation/UniversalErpInstallationEngine';
import { PublicGateway } from '../experience/pages/PublicGateway';
import { InstitutionLogin } from '../experience/pages/InstitutionLogin';
import { MobileWorkspaceEngine } from './mobile/MobileWorkspaceEngine';
import { OwnerVerificationBanner } from './components/OwnerVerificationBanner';
import { OwnerConfigurationCenter } from './control-center/configuration/OwnerConfigurationCenter';
import { UniversalShell } from '../experience/components/runtime/UniversalShell';
import { WorkspaceRuntimeView } from '../experience/components/runtime/WorkspaceRuntimeView';
import { MarketplaceView } from '../experience/components/marketplace/MarketplaceView';
import { InstalledApplications } from '../experience/components/applications/InstalledApplications';
import { EnterpriseAssistant } from '../experience/components/ai/EnterpriseAssistant';
import { JumoIdentityScannerView } from './components/identity/JumoIdentityScannerView';

function AppContent() {
  logMilestone('APP_CONTENT_START', 'PASS');
  const { user, loading: authLoading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return window.location.pathname + window.location.search;
    }
    return '/public';
  });
  
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname + window.location.search;
        setCurrentRoute(path === '/' ? '/public' : path);
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
      window.location.href = '/public';
    }
  };

  const getLoggedInDefaultView = () => {
    return (
      <FintechShell onNavigate={handleNavigate} currentUser={user || undefined} onLogout={handleLogout} />
    );
  };

  const renderCurrentPage = () => {
    if (authLoading) return <div>Loading...</div>;
    
    const routePath = (currentRoute || (typeof window !== 'undefined' ? window.location.pathname : '/public')).split('?')[0];

    // 1. Unauthenticated Gateway & Public Direct Access
    if (!user) {
      if (routePath === '/' || routePath === '/public' || routePath === '' || routePath === '/index.html' || routePath === '/gateway' || routePath === '/identity') {
        return <IdentityGateway onNavigate={handleNavigate} />;
      }
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
    }

    // 2. Sovereign Standalone Products (3 Approved Products: JUMO FINTECH, JUMO Universal Education ERP, JUMO Alumni Association ERP)
    if (routePath.includes('alumni')) {
      const isMobile = routePath.includes('/mobile');
      return isMobile
        ? <AlumniErpMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/alumni')} />
        : <AlumniPlatform onNavigate={handleNavigate} />;
    }

    if (routePath.includes('education') || routePath === '/edu' || routePath.includes('edu-alumni')) {
      const isMobile = routePath.includes('/mobile');
      return isMobile 
        ? <EducationErpMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/education')} />
        : <EducationErpPlatform onNavigate={handleNavigate} />;
    }

    if (routePath.includes('finpay') || routePath === '/finance' || routePath === '/pay' || routePath === '/faap' || routePath === '/treasury' || routePath.includes('fintech') || routePath.startsWith('/products/fintech')) {
      const isMobile = routePath.includes('/mobile');
      return isMobile
        ? <FaapMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/finance')} />
        : <FintechShell onNavigate={handleNavigate} currentUser={user || undefined} onLogout={handleLogout} />;
    }

    if (routePath.includes('church') || routePath.includes('diocese')) {
      const isMobile = routePath.includes('/mobile');
      return isMobile
        ? <ChurchErpMobileApp onNavigate={handleNavigate} onSwitchToWeb={() => handleNavigate('/church')} />
        : <PlatformShell platformId="church" onNavigate={handleNavigate} currentUser={user || undefined} onLogout={handleLogout} />;
    }

    if (routePath.includes('control') || routePath === '/owner' || routePath === '/admin') {
      return <OwnerControlCenterLaunchpad onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout} />;
    }

    if (!user) {
      return <IdentityGateway onNavigate={handleNavigate} />;
    }

    // Explicit Route: Universal ERP Installation Engine (/platform/erp/install)
    if (routePath === '/platform/erp/install' || routePath === '/install-erp' || routePath === '/install' || routePath === '/erp/install') {
      return (
        <UniversalPlatformShell platformId="erp-install" platformName="Universal ERP Installation Engine" tenantIdentity="Dynamic Provisioning Layer" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <div className="p-6 max-w-7xl mx-auto">
            <UniversalErpInstallationEngine
              onCompleteInstallation={() => handleNavigate('/platform/erp')}
              onCancel={() => handleNavigate('/platform/erp')}
            />
          </div>
        </UniversalPlatformShell>
      );
    }

    // Explicit Route: JUMO Enterprise Marketplace (/marketplace)
    if (routePath === '/marketplace' || routePath === '/platform/marketplace' || routePath === '/store') {
      return (
        <UniversalShell activePlatformId="marketplace" activePlatformName="JUMO Enterprise Marketplace" tenantIdentity="Universal Enterprise Registry" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <MarketplaceView onNavigate={handleNavigate} />
        </UniversalShell>
      );
    }

    // Explicit Route: JUMO Enterprise AI Assistant (/ai-assistant, /copilot)
    if (routePath === '/ai-assistant' || routePath === '/copilot' || routePath === '/ai-concierge') {
      return (
        <UniversalShell activePlatformId="ai-copilot" activePlatformName="JUMO Enterprise AI Copilot" tenantIdentity="Cognitive RAG Workspace" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <div className="p-6 max-w-4xl mx-auto">
            <EnterpriseAssistant />
          </div>
        </UniversalShell>
      );
    }

    // Explicit Route: Workspace Runtime View (/workspace-runtime, /universal-workspace)
    if (routePath === '/workspace-runtime' || routePath === '/universal-workspace' || routePath === '/runtime') {
      return <WorkspaceRuntimeView />;
    }

    // Explicit Delegated Routing for Sovereign Platforms
    if (routePath === '/platform/erp' || routePath === '/domains' || routePath === '/erp' || routePath === '/erp-center' || routePath.startsWith('/workspace/') || routePath.startsWith('/universal-runtime') || routePath.startsWith('/domain/')) {
      let initialTab: 'marketplace' | 'workspace' | 'modules' | 'config' | 'ai' | 'lifecycle' | 'platform-centers' | 'universal-runtime' = 'workspace';
      if (routePath === '/erp-center' || routePath === '/domains' || routePath === '/platform/erp' || routePath === '/erp') initialTab = 'marketplace';
      else if (routePath.includes('universal-runtime')) initialTab = 'universal-runtime';
      else if (routePath.includes('config')) initialTab = 'config';
      else if (routePath.includes('modules')) initialTab = 'modules';
      else if (routePath.includes('ai')) initialTab = 'ai';
      else if (routePath.includes('lifecycle') || routePath.includes('upgrade')) initialTab = 'lifecycle';
      else if (routePath.includes('platform-centers')) initialTab = 'platform-centers';
      return (
        <UniversalErpLifecycleRuntime 
          onNavigate={handleNavigate} 
          currentUser={user} 
          onLogout={handleLogout}
          initialTab={initialTab}
        />
      );
    }
    // Control Center Capability Workspaces & Platform Handlers
    if (routePath.startsWith('/control-center/store') || routePath.startsWith('/platform/store') || routePath === '/store' || routePath === '/marketplace') {
      return (
        <UniversalPlatformShell platformId="control-center-store" platformName="Platform Store & Capabilities" tenantIdentity="Control Center Capability" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <PlatformStore onNavigate={handleNavigate} />
        </UniversalPlatformShell>
      );
    }
    if (routePath.startsWith('/control-center/security') || routePath.startsWith('/platform/aegis') || routePath === '/security' || routePath === '/jumo-security') {
      return (
        <UniversalPlatformShell platformId="control-center-security" platformName="AEGIS Security Operations" tenantIdentity="Control Center Capability" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <AegisSecurityPlatform onNavigate={handleNavigate} />
        </UniversalPlatformShell>
      );
    }
    if (routePath.startsWith('/control-center/trust') || routePath.startsWith('/platform/trust') || routePath === '/trust' || routePath === '/jumo-trust') {
      return (
        <UniversalPlatformShell platformId="control-center-trust" platformName="JUMO TRUST Platform" tenantIdentity="Control Center Capability" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <JumoTrustPlatform onNavigate={handleNavigate} currentUser={user} />
        </UniversalPlatformShell>
      );
    }
    if (routePath.startsWith('/control-center/ai') || routePath.startsWith('/platform/ai') || routePath === '/ai' || routePath === '/jumo-intelligence') {
      return (
        <UniversalPlatformShell platformId="control-center-ai" platformName="AI Command Center" tenantIdentity="Control Center Capability" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <AiCommandPlatform onNavigate={handleNavigate} />
        </UniversalPlatformShell>
      );
    }
    if (routePath.startsWith('/control-center/cloud') || routePath.startsWith('/platform/cloud') || routePath === '/cloud' || routePath === '/jumo-cloud') {
      return (
        <UniversalPlatformShell platformId="control-center-cloud" platformName="Cloud & Infrastructure Console" tenantIdentity="Control Center Capability" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <CloudPlatform onNavigate={handleNavigate} />
        </UniversalPlatformShell>
      );
    }
    if (routePath.startsWith('/scanner') || routePath.startsWith('/verify') || routePath.startsWith('/identity-scanner') || routePath === '/scan-id' || routePath === '/id-scanner') {
      return (
        <UniversalPlatformShell platformId="identity-scanner" platformName="Sovereign Identity & QR Scanner" tenantIdentity="Zero-Trust Member Verification" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <JumoIdentityScannerView onNavigate={handleNavigate} currentUser={user} />
        </UniversalPlatformShell>
      );
    }
    if (routePath.startsWith('/control-center/tenants') || routePath === '/tenant' || routePath === '/tenants') {
      return ['OWNER', 'TENANT', 'ADMIN'].includes(user?.role || '') ? <TenantView /> : getLoggedInDefaultView();
    }
    if (routePath.startsWith('/platform/finpay') || routePath === '/finpay' || routePath === '/faap' || routePath.includes('fintech')) {
      return (
        <PlatformShell platformId="fintech" onNavigate={handleNavigate} currentUser={user || undefined} onLogout={handleLogout} />
      );
    }
    if (routePath.startsWith('/platform/edu-alumni') || routePath === '/edu-alumni' || routePath === '/education') {
      return (
        <PlatformShell platformId="education" onNavigate={handleNavigate} currentUser={user || undefined} onLogout={handleLogout} />
      );
    }
    if (routePath.startsWith('/platform/church') || routePath === '/church') {
      return (
        <PlatformShell platformId="church" onNavigate={handleNavigate} currentUser={user || undefined} onLogout={handleLogout} />
      );
    }
    if (routePath.startsWith('/platform/control') || routePath === '/control') {
      return (
        <OwnerControlCenterLaunchpad onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout} />
      );
    }
    if (routePath.startsWith('/platform/factory') || routePath === '/factory' || routePath === '/sovereign') {
      return (
        <UniversalPlatformShell platformId="factory" platformName="Software Factory Platform" tenantIdentity="Dynamic Scaffolding Engine" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <SoftwareFactoryPlatform onNavigate={handleNavigate} />
        </UniversalPlatformShell>
      );
    }
    if (routePath.startsWith('/platform/research') || routePath === '/research' || routePath === '/innovation') {
      return (
        <UniversalPlatformShell platformId="research" platformName="Innovation & Research Center" tenantIdentity="DIRC Laboratories" onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
          <InnovationResearchPlatform onNavigate={handleNavigate} />
        </UniversalPlatformShell>
      );
    }
    
    // JUMO UEOS Universal ERP Template Factory & Ecosystem Center (v22.0 & v23.0)
    if (routePath.startsWith('/erp-factory') || routePath.startsWith('/template-factory') || routePath.startsWith('/v22') || routePath.startsWith('/v23') || routePath.startsWith('/ecosystem-factory') || routePath.startsWith('/template-studio')) {
      let tab: 'template-factory' | 'erp-families' | 'workspace-preview' | 'ai-assistant' | 'lifecycle' = 'template-factory';
      if (routePath.includes('families') || routePath.includes('erp-families')) tab = 'erp-families';
      else if (routePath.includes('preview') || routePath.includes('workspace')) tab = 'workspace-preview';
      else if (routePath.includes('ai') || routePath.includes('assistant')) tab = 'ai-assistant';
      else if (routePath.includes('lifecycle') || routePath.includes('deploy')) tab = 'lifecycle';
      return (
        <ErpTemplateFactoryCenter
          onNavigate={handleNavigate}
          currentUser={user}
          onLogout={handleLogout}
          initialTab={tab}
        />
      );
    }

    // JUMO UEOS Enterprise Portal Fabric & Universal Launcher (v20.0 & v21.0)
    if (routePath.startsWith('/portal-fabric') || routePath.startsWith('/fabric') || routePath.startsWith('/launcher') || routePath.startsWith('/ecosystem') || routePath.startsWith('/erp-templates') || routePath.startsWith('/deployment-factory') || routePath.startsWith('/universal-modules')) {
      let tab: 'launcher' | 'erp-center' | 'factory' | 'modules' | 'config' | 'ai' | 'licensing' = 'launcher';
      if (routePath.includes('erp-center') || routePath.includes('erp-templates')) tab = 'erp-center';
      else if (routePath.includes('factory') || routePath.includes('deployment')) tab = 'factory';
      else if (routePath.includes('modules')) tab = 'modules';
      else if (routePath.includes('config')) tab = 'config';
      else if (routePath.includes('ai')) tab = 'ai';
      else if (routePath.includes('licens')) tab = 'licensing';
      return (
        <EnterprisePortalFabric 
          onNavigate={handleNavigate} 
          currentUser={user} 
          onLogout={handleLogout}
          initialTab={tab}
        />
      );
    }

    // Sovereign Control Center & Administration Routes
    if (routePath === '/control-center' || routePath === '/owner' || routePath === '/') {
      return (
        <OwnerControlCenterLaunchpad 
          onNavigate={handleNavigate} 
          currentUser={user} 
          onLogout={handleLogout} 
        />
      );
    }
    if (routePath.startsWith('/control-center/monitoring') || routePath === '/operations' || routePath === '/developer-center') {
      return <TelemetryMonitoringCenter onNavigate={handleNavigate} />;
    }
    if (routePath.startsWith('/control-center/settings') || routePath === '/settings') {
      return <SystemSettingsCenter onNavigate={handleNavigate} />;
    }

    // Secondary & Domain Workspace Routes
    switch (routePath) {
      case '/workspace':
        return getLoggedInDefaultView();
      case '/public':
        return <PublicPortalView onNavigate={handleNavigate} />;
      case '/tenant':
      case '/tenants':
        return ['OWNER', 'TENANT'].includes(user.role) ? <TenantView /> : getLoggedInDefaultView();
      case '/workflow':
        return ['OWNER', 'TENANT', 'SECURITY'].includes(user.role) ? <WorkflowView /> : getLoggedInDefaultView();
      case '/documentation':
        return <DocumentationView />;
      case '/admin':
        return <AdminView onNavigate={handleNavigate} />;
      case '/api-management':
      case '/api-center':
      case '/api':
        return <JumoApiManagementCenterView onNavigate={handleNavigate} />;
      case '/platform-foundation':
      case '/sovereign-foundation':
        return <SovereignPlatformFoundationView onNavigate={handleNavigate} />;
      case '/jumo-data':
      case '/data-platform':
        return <JumoDataRecordsView onNavigate={handleNavigate} />;
      case '/jumo-integration':
      case '/integration-platform':
        return <JumoIntegrationPlatformView onNavigate={handleNavigate} />;
      case '/jumo-communications':
      case '/communications-platform':
        return <JumoCommunicationsPlatformView onNavigate={handleNavigate} />;
      default:
        if (routePath.startsWith('/workspace/app/') || routePath.startsWith('/domain/') || routePath.startsWith('/erp/') || routePath.startsWith('/platform/erp/')) {
          const appId = routePath.replace('/workspace/app/', '').replace('/domain/', '').replace('/platform/erp/', '').replace('/erp/', '');
          const domain = PlatformRegistry.getDomainById(appId);
          return domain ? (
            <UniversalPlatformShell platformId={domain.id} platformName={domain.displayName || domain.name} tenantIdentity={`Sovereign Tenant: ${domain.name}`} onNavigate={handleNavigate} currentUser={user} onLogout={handleLogout}>
              <DomainWorkspace domain={domain} onNavigate={handleNavigate} currentRoute={currentRoute} />
            </UniversalPlatformShell>
          ) : (
            getLoggedInDefaultView()
          );
        }
        return getLoggedInDefaultView();
    }

  };

  const routePath = (currentRoute || (typeof window !== 'undefined' ? window.location.pathname : '/public')).split('?')[0];
  const isBaseRoute = routePath === '/' || routePath === '/public' || routePath === '' || routePath === '/index.html';
  const isStandaloneProduct = 
    isBaseRoute ||
    routePath.startsWith('/products/') ||
    routePath.includes('education') || routePath === '/edu' ||
    routePath.includes('alumni') ||
    routePath === '/finance' || routePath === '/pay' || routePath === '/faap' || routePath === '/treasury' || routePath.includes('fintech') ||
    routePath.includes('church') || routePath.includes('diocese') ||
    routePath.includes('control') || routePath === '/owner' || routePath === '/admin';

  if (isStandaloneProduct) {
    return (
      <>
        <OwnerVerificationBanner onNavigate={handleNavigate} />
        {renderCurrentPage()}
      </>
    );
  }

  return (
    <>
      <OwnerVerificationBanner onNavigate={handleNavigate} />
      <SovereignEnterpriseLayout
        currentRoute={routePath}
        onNavigate={handleNavigate}
        currentUser={user || undefined}
        onLogout={handleLogout}
      >
        {renderCurrentPage()}
      </SovereignEnterpriseLayout>
    </>
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
