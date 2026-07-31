import React from 'react';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';

export const ControlCenterWorkspace = ({ children }) => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1">
      <Header />
      <main className="p-8">{children}</main>
    </div>
  </div>
);
