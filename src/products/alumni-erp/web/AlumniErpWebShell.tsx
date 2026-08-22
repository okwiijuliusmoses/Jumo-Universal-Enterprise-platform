import React, { useState } from 'react';
import { 
  Users, Award, Globe, DollarSign, Briefcase, 
  Search, Bell, Settings, Menu, X, Shield, LayoutDashboard,
  Home, ChevronRight, UserCheck, CheckCircle2, QrCode
} from 'lucide-react';
import { PlatformSwitcher } from '../../../components/PlatformSwitcher';
import { AlumniDashboard } from './modules/AlumniDashboard';
import { AlumniRegistryModule } from './modules/AlumniRegistryModule';
import { AlumniChaptersModule } from './modules/AlumniChaptersModule';
import { AlumniGivingModule } from './modules/AlumniGivingModule';
import { AlumniCareerModule } from './modules/AlumniCareerModule';

export const AlumniErpWebShell: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('MOD_ALUMNI_DASHBOARD');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeUser] = useState({
    name: 'Dr. Sarah K. Namubiru',
    role: 'ALUMNI_EXECUTIVE',
    avatar: 'SN',
    title: 'Global Alumni President'
  });

  const navigationItems = [
    { id: 'MOD_ALUMNI_DASHBOARD', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'MOD_ALUMNI_REGISTRY', label: 'Graduate Census', icon: Users },
    { id: 'MOD_ALUMNI_CHAPTERS', label: 'Global Chapters', icon: Globe },
    { id: 'MOD_ALUMNI_GIVING', label: 'Endowments & Giving', icon: DollarSign },
    { id: 'MOD_ALUMNI_CAREER', label: 'Career & Mentorship', icon: Briefcase },
  ];

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'MOD_ALUMNI_REGISTRY':
        return <AlumniRegistryModule />;
      case 'MOD_ALUMNI_CHAPTERS':
        return <AlumniChaptersModule />;
      case 'MOD_ALUMNI_GIVING':
        return <AlumniGivingModule />;
      case 'MOD_ALUMNI_CAREER':
        return <AlumniCareerModule />;
      case 'MOD_ALUMNI_DASHBOARD':
      default:
        return <AlumniDashboard onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans">
      {/* Top Header Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PlatformSwitcher onNavigate={onNavigate} />
            <div className="h-5 w-px bg-slate-800" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-sm font-bold">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>JUMO Alumni ERP</span>
                  <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded border border-rose-500/30 uppercase font-semibold">
                    INDEPENDENT
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Institutional Advancement & Endowment Platform</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate ? onNavigate('/alumni-erp/mobile') : (window.location.href = '/alumni-erp/mobile')}
              className="hidden sm:inline-flex px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors items-center gap-1.5"
            >
              <QrCode className="w-3 h-3 text-rose-400" />
              <span>Mobile Wallet</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-rose-700 text-white flex items-center justify-center text-xs font-bold">
                {activeUser.avatar}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-white leading-none">{activeUser.name}</div>
                <div className="text-[10px] text-slate-400 leading-none mt-0.5">{activeUser.title}</div>
              </div>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-900 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 overflow-x-auto py-1">
              {navigationItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-2 text-xs font-semibold rounded-md transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                      isActive 
                        ? 'bg-slate-800 text-white shadow-sm border border-slate-700' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {renderActiveModule()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500">
        JUMO Universal Enterprise Operating System (UEOS) • Alumni ERP Independent Product Platform
      </footer>
    </div>
  );
};
