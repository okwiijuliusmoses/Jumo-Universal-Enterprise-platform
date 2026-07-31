import React from 'react';
import { Bell, HelpCircle, User, Settings, LayoutGrid, Menu } from 'lucide-react';

export const Header = ({ toggleLauncher }) => (
  <header className="flex justify-between items-center bg-white p-4 border-b border-slate-200">
    <div className="flex items-center space-x-4">
      <LayoutGrid className="w-6 h-6 text-slate-700 cursor-pointer" onClick={toggleLauncher} />
      <div className="font-bold text-lg text-emerald-700">JUMO UEOS</div>
    </div>
    
    <div className="flex-1 px-8">
      <input type="text" placeholder="Search everything..." className="w-full max-w-lg p-2 border border-slate-300 rounded text-sm bg-slate-50" />
    </div>

    <div className="flex items-center space-x-4">
      <Bell className="w-5 h-5 text-slate-500 cursor-pointer" />
      <HelpCircle className="w-5 h-5 text-slate-500 cursor-pointer" />
      <Settings className="w-5 h-5 text-slate-500 cursor-pointer" />
      <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full cursor-pointer flex items-center justify-center">
        <User className="w-5 h-5" />
      </div>
    </div>
  </header>
);
