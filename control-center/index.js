import React from 'react';

export const ControlCenterWorkspace = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="font-bold text-gray-900 mb-6">UEOS Control Center</h2>
        <nav className="space-y-2">
          <a href="/control-center/overview" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">Platform Overview</a>
          <a href="/control-center/erp-factory" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">ERP Factory</a>
          <a href="/control-center/erp-store" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">ERP Store</a>
          <a href="/control-center/registry" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">ERP Registry</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-green-600">System Healthy</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </header>
        {/* Workspace content */}
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded border border-gray-100">
            <h3 className="font-semibold text-gray-800">Active ERP Installations</h3>
            <p className="text-3xl font-bold text-blue-600">1</p>
          </div>
          {/* Add more metrics */}
        </div>
      </main>
    </div>
  );
};
