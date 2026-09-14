import React from 'react';
import { FintechStandaloneApp } from './products/fintech/ui/FintechStandaloneApp';

/**
 * JUMO UEOS — Sovereign Financial Operating System
 * Primary Entry Point: JUMO FINTECH (FTERP)
 */
function App() {
  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      <FintechStandaloneApp />
    </div>
  );
}

export default App;
