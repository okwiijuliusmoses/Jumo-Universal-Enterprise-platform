import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

declare global {
  interface Window {
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
      <App />
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
