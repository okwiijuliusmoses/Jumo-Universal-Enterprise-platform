import React, { useState, useEffect } from 'react';
import { Header } from './components/header';
import { Launcher } from './components/launcher';
import { CommandPalette } from './components/command-palette';

export const ControlCenterWorkspace = ({ children, title, description, toolbar }) => {
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900">
      <Header toggleLauncher={() => setIsLauncherOpen(!isLauncherOpen)} />
      <Launcher isOpen={isLauncherOpen} onClose={() => setIsLauncherOpen(false)} />
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
            <nav className="text-sm text-slate-500 mb-4">Home &gt; {title}</nav>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    <p className="text-slate-500">{description}</p>
                </div>
                {toolbar && <div className="flex space-x-2">{toolbar}</div>}
            </div>
            {children}
        </div>
      </main>
    </div>
  );
};
