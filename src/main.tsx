import './diagnostics/moduleTracer';
import { logMilestone } from './diagnostics/moduleTracer';
import { Buffer } from 'buffer';

logMilestone('MODULE_EVALUATION_START', 'PASS');

if (typeof window !== 'undefined') {
  if (!(window as any).Buffer) (window as any).Buffer = Buffer;
  if (!(window as any).process) (window as any).process = { env: {} };
  if (!(window as any).global) (window as any).global = window;
}
if (typeof globalThis !== 'undefined') {
  if (!(globalThis as any).Buffer) (globalThis as any).Buffer = Buffer;
  if (!(globalThis as any).process) (globalThis as any).process = { env: {} };
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App.tsx';
import './index.css';

try {
  logMilestone('REACT_CREATE_ROOT', 'PASS');
  const rootElement = document.getElementById('root');
  if (rootElement) {
    logMilestone('APP_RENDER_START', 'PASS');
    createRoot(rootElement).render(
      <StrictMode>
        <ErrorBoundary name="GlobalAppBoundary">
          <App />
        </ErrorBoundary>
      </StrictMode>,
    );
  }
} catch (err: any) {
  logMilestone('APP_RENDER_START', 'FAIL', { error: err?.message });
  console.error("Fatal Application Bootstrap Failure:", err);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;font-family:system-ui,sans-serif;padding:2rem;">
        <div style="max-width:600px;width:100%;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:2rem;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5);">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;border-bottom:1px solid #334155;padding-bottom:1rem;">
            <div style="width:36px;height:36px;background:#ef4444;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:bold;color:white;">!</div>
            <div>
              <h2 style="font-size:1.125rem;font-weight:700;margin:0;text-transform:uppercase;letter-spacing:0.05em;">JUMO UEOS Bootstrap Recovery</h2>
              <p style="font-size:0.75rem;color:#94a3b8;margin:2px 0 0 0;font-family:monospace;">Application Layer Initialization Exception</p>
            </div>
          </div>
          <p style="font-size:0.875rem;color:#cbd5e1;line-height:1.5;margin-bottom:1.5rem;">An initialization error occurred during boot. The application safely intercepted the crash to prevent a blank screen.</p>
          <div style="background:#0f172a;border:1px solid #334155;padding:1rem;border-radius:6px;font-family:monospace;font-size:0.75rem;color:#f87171;word-break:break-all;margin-bottom:1.5rem;">
            ${err?.message || 'Unknown bootstrap exception'}
          </div>
          <button onclick="window.location.reload()" style="background:#2563eb;color:white;border:none;padding:0.625rem 1.25rem;border-radius:6px;font-weight:600;font-size:0.875rem;cursor:pointer;">
            Reload Application
          </button>
        </div>
      </div>
    `;
  }
}

