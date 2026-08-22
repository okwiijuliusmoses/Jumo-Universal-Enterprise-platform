import React from 'react';
import { TenantHeader } from './Header';
import { TenantFooter } from './Footer';

export const TenantShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <TenantHeader />
      <main className="flex-1 p-6">{children}</main>
      <TenantFooter />
    </div>
  );
};
