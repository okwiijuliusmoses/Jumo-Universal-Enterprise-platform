import React from 'react';
import { Header } from './components/header';

export const ControlCenterWorkspace = ({ children }) => (
  <div className="flex flex-col h-screen bg-white text-slate-900">
    <Header />
    <main className="flex-1 overflow-auto">{children}</main>
  </div>
);
