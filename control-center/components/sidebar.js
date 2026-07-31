import React from 'react';

export const Sidebar = () => (
  <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
    <nav className="space-y-4">
      <div className="text-xs font-semibold uppercase text-gray-500">Platform Command</div>
      <a href="/control-center/overview" className="block p-2 hover:bg-gray-800 rounded">Overview</a>
      <div className="text-xs font-semibold uppercase text-gray-500 mt-6">ERP Ecosystem</div>
      <a href="/control-center/erp-store" className="block p-2 hover:bg-gray-800 rounded">ERP Store</a>
      <a href="/control-center/erp-factory" className="block p-2 hover:bg-gray-800 rounded">ERP Factory</a>
    </nav>
  </aside>
);
