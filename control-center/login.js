import React from 'react';
import { Layout } from './components/Layout'; // Assuming standard structure

export const ControlCenterLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">JUMO UEOS Control Center</h1>
        {/* Placeholder for auth form */}
        <div className="space-y-4">
          <input type="text" placeholder="Owner ID" className="w-full p-2 border border-gray-300 rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded" />
          <button className="w-full p-2 bg-blue-600 text-white rounded">Authenticate</button>
        </div>
      </div>
    </div>
  );
};
