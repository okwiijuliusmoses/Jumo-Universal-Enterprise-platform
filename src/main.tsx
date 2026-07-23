import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  const isFirebase = window.location.hostname.includes('web.app') || window.location.hostname.includes('firebaseapp.com');
  if (isFirebase) {
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
      if (typeof input === 'string' && input.startsWith('/api/')) {
        const targetUrl = 'https://jumo-ueos-dhp-production-production.up.railway.app' + input;
        const newInit = {
          ...init,
          mode: 'cors' as const
        };
        return originalFetch(targetUrl, newInit);
      }
      return originalFetch(input, init);
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
