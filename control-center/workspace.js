import React, { useState } from 'react';
import { Header } from './components/header';
import { Launcher } from './components/launcher';

export const ControlCenterWorkspace = ({ children }) => {
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900">
      <Header toggleLauncher={() => setIsLauncherOpen(!isLauncherOpen)} />
      <Launcher isOpen={isLauncherOpen} onClose={() => setIsLauncherOpen(false)} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};
