import React from 'react';

export const ERPStore = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">ERP Store</h1>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Marketplace cards */}
        <div className="p-6 border border-gray-200 rounded">
          <h3 className="font-bold">University ERP</h3>
          <p className="text-sm text-gray-500">Education Family</p>
          <button className="mt-4 w-full p-2 bg-blue-600 text-white rounded">Install</button>
        </div>
      </div>
    </div>
  );
};
