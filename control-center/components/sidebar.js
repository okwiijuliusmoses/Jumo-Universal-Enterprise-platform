import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, Settings, Menu, ChevronLeft } from 'lucide-react';

export const Sidebar = ({ isExpanded, toggleSidebar }) => (
  <aside className={`${isExpanded ? 'w-64' : 'w-16'} transition-all duration-300 bg-slate-900 text-white flex flex-col`}>
    <div className="p-4 flex items-center justify-between">
      {isExpanded && <span className="font-bold">JUMO</span>}
      <button onClick={toggleSidebar} className="text-white">
        {isExpanded ? <ChevronLeft /> : <Menu />}
      </button>
    </div>
    <nav className="flex-1 mt-4 space-y-2 px-2">
      <a href="/control-center/overview" className="flex items-center p-2 hover:bg-slate-800 rounded">
        <LayoutDashboard className="w-6 h-6" />
        {isExpanded && <span className="ml-3">Overview</span>}
      </a>
      <a href="/control-center/erp-store" className="flex items-center p-2 hover:bg-slate-800 rounded">
        <ShoppingCart className="w-6 h-6" />
        {isExpanded && <span className="ml-3">ERP Store</span>}
      </a>
      <a href="/control-center/erp-factory" className="flex items-center p-2 hover:bg-slate-800 rounded">
        <Package className="w-6 h-6" />
        {isExpanded && <span className="ml-3">ERP Factory</span>}
      </a>
    </nav>
  </aside>
);
