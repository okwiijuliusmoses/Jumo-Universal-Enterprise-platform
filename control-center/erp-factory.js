import React from 'react';

export const ERPFactory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">ERP Factory</h1>
      <p className="mb-4 text-gray-600">Create and configure ERP blueprints.</p>
      
      <div className="space-y-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Clone ERP Architecture</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded">Create New Blueprint</button>
      </div>
      
      <div className="mt-8 border-t pt-8">
        <h2 className="text-lg font-semibold mb-4">ERP Families</h2>
        <div className="grid grid-cols-2 gap-4">
          {["Education", "Alumni", "Hospitality", "Church"].map(family => (
            <div key={family} className="p-4 border border-gray-200 rounded">
              {family} ERP Family
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
