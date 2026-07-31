import React from 'react';
import { Bell, HelpCircle, User, Settings } from 'lucide-react';

export const Header = () => (
  <header className="flex justify-between items-center bg-white p-4 border-b border-slate-200">
    <div className="font-semibold text-slate-700">Platform Overview</div>
    <div className="flex-1 px-8">
      <input type="text" placeholder="Search..." className="w-full max-w-lg p-2 border border-slate-300 rounded text-sm" />
    </div>
    <div className="flex items-center space-x-4">
      <Bell className="w-5 h-5 text-slate-500 cursor-pointer" />
      <HelpCircle className="w-5 h-5 text-slate-500 cursor-pointer" />
      <Settings className="w-5 h-5 text-slate-500 cursor-pointer" />
      <div className="w-8 h-8 bg-slate-200 rounded-full cursor-pointer flex items-center justify-center">
        <User className="w-5 h-5 text-slate-600" />
      </div>
    </div>
  </header>
);
