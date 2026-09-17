import React from 'react';
import { JumoUniversalShell } from './components/JumoUniversalShell';

/**
 * JUMO Universal Enterprise Operating System
 * Primary Entry Point: JUMO Universal Application Platform Shell
 */
function App() {
  return (
    <div className="h-screen w-full bg-slate-50 overflow-hidden">
      <JumoUniversalShell />
    </div>
  );
}

export default App;

