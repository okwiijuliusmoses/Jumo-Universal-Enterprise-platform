import React from 'react';

export const Header = () => (
  <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
    <div className="text-xl font-bold">JUMO UEOS Control Center</div>
    <div className="flex items-center space-x-4">
      <div className="text-sm">Search</div>
      <div className="text-sm">Notifications</div>
      <div className="text-sm">Profile</div>
    </div>
  </header>
);
