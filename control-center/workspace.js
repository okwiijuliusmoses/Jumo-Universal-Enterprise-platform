import React, { useState } from 'react';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';

export const ControlCenterWorkspace = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="flex h-screen bg-white text-slate-900">
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};
