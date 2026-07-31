import React from 'react';
import { ControlCenterWorkspace } from './workspace';

export const ControlCenterOverview = () => {
  return (
    <ControlCenterWorkspace>
      <h1 className="text-2xl font-bold mb-6">ERP Ecosystems</h1>
      <div className="grid grid-cols-2 gap-6">
        {["Education", "Alumni", "Hospitality", "Church"].map(eco => (
          <div key={eco} className="p-6 bg-white rounded border border-gray-200 shadow-sm">
            <h2 className="font-bold text-lg">{eco} ERP Ecosystem</h2>
            <p className="text-sm text-gray-500 mt-2">Manage {eco} institutional templates</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">View Templates</button>
          </div>
        ))}
      </div>
    </ControlCenterWorkspace>
  );
};
