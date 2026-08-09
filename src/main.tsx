import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  (window as any).Buffer = (window as any).Buffer || Buffer;
  (globalThis as any).Buffer = (globalThis as any).Buffer || Buffer;
  (window as any).process = (window as any).process || { env: {} };
  (globalThis as any).process = (globalThis as any).process || { env: {} };
  (window as any).global = window;
}

import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

declare global {
  interface Window {
    Buffer: typeof Buffer;
    process: any;
    mountUEOSReactWorkspace?: (container?: HTMLElement, instanceId?: string) => void;
  }
}

let rootInstance: ReactDOM.Root | null = null;

export const mountUEOSReactWorkspace = (container?: HTMLElement) => {
  const targetElement =
    container ||
    document.getElementById('root') ||
    document.getElementById('react-root') ||
    document.getElementById('app');

  if (!targetElement) {
    console.warn('[UEOS Entry Point] Target container not found for React mount.');
    return;
  }

  if (!rootInstance) {
    rootInstance = createRoot(targetElement);
  }

  rootInstance.render(
    <StrictMode>
      <ErrorBoundary fallbackTitle="JUMO UEOS Core Kernel Failure">
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('[UEOS Entry Point] React UEOS Workspace Shell mounted successfully.');
};

window.mountUEOSReactWorkspace = mountUEOSReactWorkspace;

const bootReactOnLoad = () => {
  mountUEOSReactWorkspace();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootReactOnLoad);
} else {
  bootReactOnLoad();
}
