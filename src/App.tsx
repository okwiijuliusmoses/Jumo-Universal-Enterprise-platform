import * as React from 'react';
import { useState, useEffect } from 'react';
import { UEOSShell } from './experience/shell/UEOSShell';
import { PlatformLoginGateway } from './experience/login/PlatformLoginGateway';
import { KernelDashboard } from './experience/renderer/KernelDashboard';
import { RuntimeWorkspaceRenderer } from './experience/renderer/RuntimeWorkspaceRenderer';
import { TemplateRegistryRenderer } from './experience/renderer/TemplateRegistryRenderer';
import { EnterpriseFactory } from './experience/renderer/EnterpriseFactory';
import { PlatformInstanceRenderer } from './experience/renderer/PlatformInstanceRenderer';
import { ErrorBoundary } from './components/ErrorBoundary';

export function App() {
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('jumo_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    window.onerror = (message, source, lineno, colno, error) => {
      console.error("[GLOBAL_ERROR_CAPTURE]", { message, source, lineno, colno, error });
    };

    const originalFetch = window.fetch;
    window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
      const token = localStorage.getItem('jumo_session_token');
      const user = localStorage.getItem('jumo_current_user');

      init = init || {};
      init.headers = init.headers || {};

      if (init.headers instanceof Headers) {
        if (token) {
          init.headers.set('Authorization', `Bearer ${token}`);
          init.headers.set('x-ueos-token', token);
        }
        if (user) {
          try {
            const parsed = JSON.parse(user);
            init.headers.set('x-ueos-user', parsed.email || '');
            init.headers.set('x-ueos-roles', parsed.role || '');
            init.headers.set('x-ueos-tenant', parsed.tenantId || '');
          } catch {}
        }
      } else if (typeof init.headers === 'object') {
        const headers = init.headers as any;
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
          headers['x-ueos-token'] = token;
        }
        if (user) {
          try {
            const parsed = JSON.parse(user);
            headers['x-ueos-user'] = parsed.email || '';
            headers['x-ueos-roles'] = parsed.role || '';
            headers['x-ueos-tenant'] = parsed.tenantId || '';
          } catch {}
        }
      }

      return originalFetch(input, init);
    };

    return () => { window.fetch = originalFetch; };
  }, []);

  const logout = () => {
    localStorage.removeItem('jumo_current_user');
    localStorage.removeItem('jumo_session_token');
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <ErrorBoundary>
        <PlatformLoginGateway
          onLoginSuccess={(user: any) => {
            localStorage.setItem('jumo_current_user', JSON.stringify(user));
            // Simulate session token for demo purposes if not provided by API
            if (!localStorage.getItem('jumo_session_token')) {
              localStorage.setItem('jumo_session_token', `ueos_session_${Math.random().toString(36).slice(2)}`);
            }
            setCurrentUser(user);
          }}
        />
      </ErrorBoundary>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <KernelDashboard />;
      case "ecosystems":
        return <RuntimeWorkspaceRenderer />;
      case "templates":
        return <TemplateRegistryRenderer />;
      case "factory":
        return <EnterpriseFactory />;
      case "instances":
        return <PlatformInstanceRenderer />;
      default:
        return (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
            <h3 className="text-xl font-bold text-slate-800 capitalize">{activeTab.replace("-", " ")}</h3>
            <p className="text-slate-500 mt-2">This module is being connected to the UEOS Runtime.</p>
          </div>
        );
    }
  };

  return (
    <ErrorBoundary>
      <UEOSShell
        user={currentUser}
        onLogout={logout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {renderContent()}
      </UEOSShell>
    </ErrorBoundary>
  );
}

export default App;
