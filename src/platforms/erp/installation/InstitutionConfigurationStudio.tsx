import React, { useState } from 'react';
import { 
  Palette, 
  Menu, 
  Package, 
  Newspaper, 
  Sparkles, 
  Save, 
  Check, 
  Eye, 
  Globe, 
  Layers, 
  Plus, 
  Trash2, 
  BellRing, 
  Sliders, 
  Layout, 
  Building2,
  FileText
} from 'lucide-react';

interface InstitutionConfigurationStudioProps {
  institutionName?: string;
  selectedFamily?: string;
  onNavigatePortal?: () => void;
}

export const InstitutionConfigurationStudio: React.FC<InstitutionConfigurationStudioProps> = ({
  institutionName = 'JUMO International University',
  selectedFamily = 'education',
  onNavigatePortal
}) => {
  const [activeTab, setActiveTab] = useState<'branding' | 'nav_builder' | 'modules' | 'news' | 'theme'>('branding');

  // Branding State
  const [logoUrl, setLogoUrl] = useState<string>('https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80');
  const [primaryColor, setPrimaryColor] = useState<string>('#0078D4');
  const [secondaryColor, setSecondaryColor] = useState<string>('#107C41');
  const [slogan, setSlogan] = useState<string>('Excellence Through Digital Transformation');
  const [customDomain, setCustomDomain] = useState<string>('jiu.jumo.app');
  const [headerText, setHeaderText] = useState<string>('JUMO UEOS Branded Institution Portal');
  const [footerText, setFooterText] = useState<string>('© 2026 JUMO International University. All rights reserved. Powered by JUMO UEOS.');

  // Navigation Items State
  const [navItems, setNavItems] = useState([
    { id: '1', title: 'Dashboard', route: '/dashboard', enabled: true },
    { id: '2', title: 'Admissions & SIS', route: '/admissions', enabled: true },
    { id: '3', title: 'Schools & Faculties', route: '/faculties', enabled: true },
    { id: '4', title: 'Research & Innovation Hub', route: '/research', enabled: true },
    { id: '5', title: 'Examinations & Grading', route: '/exams', enabled: true },
    { id: '6', title: 'FAAP Fees & Ledger', route: '/finance', enabled: true },
    { id: '7', title: 'Digital Library', route: '/library', enabled: true },
    { id: '8', title: 'International Office', route: '/international', enabled: false },
  ]);

  const [newNavTitle, setNewNavTitle] = useState('');
  const [newNavRoute, setNewNavRoute] = useState('');

  // Module Toggles
  const [modulesState, setModulesState] = useState<Record<string, boolean>>({
    'Admissions & SIS': true,
    'FAAP Ledger & Fees Management': true,
    'Examinations & Automated Grading': true,
    'Digital Library & E-Learning': true,
    'Research & Grants Administration': true,
    'Hostel & Housing Allocation': true,
    'Fleet & Fleet Management': false,
    'International Student Portal': false,
    'Alumni & Foundation Network': true
  });

  // News Engine State
  const [newsList, setNewsList] = useState([
    { id: '1', title: '2026 Academic Year Opening Ceremony Announced', category: 'Notice', date: '2026-07-28', status: 'Published' },
    { id: '2', title: 'FAAP Fee Payment Deadline Extension for Semester 2', category: 'Finance', date: '2026-07-25', status: 'Published' },
    { id: '3', title: 'New AI Research Grant Applications Open', category: 'Research', date: '2026-07-20', status: 'Published' },
  ]);

  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('Notice');

  // Theme Engine State
  const [layoutStyle, setLayoutStyle] = useState<'cloud_console' | 'classic_compact' | 'modern_fluid'>('cloud_console');
  const [dashboardWidgets, setDashboardWidgets] = useState([
    'Real-time Enrolment KPI',
    'FAAP Financial Cashflow',
    'AEGIS Security Audit Stream',
    'JUMO Assistant Query Trends'
  ]);

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAddNavItem = () => {
    if (!newNavTitle.trim()) return;
    setNavItems([
      ...navItems,
      { id: String(Date.now()), title: newNavTitle, route: newNavRoute || `/${newNavTitle.toLowerCase().replace(/\s+/g, '-')}`, enabled: true }
    ]);
    setNewNavTitle('');
    setNewNavRoute('');
  };

  const handleAddNews = () => {
    if (!newNewsTitle.trim()) return;
    setNewsList([
      { id: String(Date.now()), title: newNewsTitle, category: newNewsCategory, date: new Date().toISOString().split('T')[0], status: 'Published' },
      ...newsList
    ]);
    setNewNewsTitle('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden max-w-6xl mx-auto my-4 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold text-xl">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-mono font-bold rounded-full mb-1">
              JUMO UEOS PHASE 14B
            </div>
            <h1 className="text-xl font-black tracking-tight">Institution Configuration Studio</h1>
            <p className="text-xs text-slate-300">Brand, configure navigation, modules, news & theme for {institutionName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onNavigatePortal && (
            <button
              onClick={onNavigatePortal}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
            >
              <Eye className="w-4 h-4" /> Preview Portal
            </button>
          )}
          <button
            onClick={handleSave}
            className={`px-5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md cursor-pointer ${
              isSaved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaved ? 'Configuration Saved!' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex overflow-x-auto bg-slate-100 border-b border-slate-200 px-6 gap-2 pt-2 text-xs font-extrabold">
        {[
          { id: 'branding', label: '1. Branding & Identity', icon: Palette },
          { id: 'nav_builder', label: '2. Navigation Builder', icon: Menu },
          { id: 'modules', label: '3. Installed Modules', icon: Package },
          { id: 'news', label: '4. News & Notices Engine', icon: Newspaper },
          { id: 'theme', label: '5. Theme & Experience', icon: Layout },
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'border-blue-600 bg-white text-blue-700 rounded-t-xl shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Studio Workspaces */}
      <div className="p-8">
        {/* TAB 1: BRANDING */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Institutional Branding & Portal Identity</h2>
                <p className="text-xs text-slate-500">Configure logo, domain, header, footer, slogan, and primary brand colors.</p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold rounded-lg">
                Domain: https://{customDomain}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Official Slogan / Tagline</label>
                  <input
                    type="text"
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Custom Domain Name</label>
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono font-bold text-blue-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Header Banner Text</label>
                  <input
                    type="text"
                    value={headerText}
                    onChange={(e) => setHeaderText(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Footer Copyright Text</label>
                  <input
                    type="text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Primary Brand Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="p-2 border border-slate-300 rounded-lg font-mono text-xs w-32"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Secondary Accent Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="p-2 border border-slate-300 rounded-lg font-mono text-xs w-32"
                    />
                  </div>
                </div>

                {/* Branded Web Header Live Preview */}
                <div className="p-4 rounded-2xl text-white space-y-2 shadow-lg" style={{ backgroundColor: primaryColor }}>
                  <div className="text-[10px] font-mono text-white/70 uppercase font-bold">Portal Header Preview</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black text-sm">{institutionName}</div>
                      <div className="text-xs text-white/80 italic">"{slogan}"</div>
                    </div>
                    <span className="px-2.5 py-1 bg-white/20 rounded-md text-[10px] font-bold">
                      Public Assistant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NAVIGATION BUILDER */}
        {activeTab === 'nav_builder' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Institutional Navigation Customizer</h2>
                <p className="text-xs text-slate-500">Add, rename, reorder, or toggle custom navigation links for your institution.</p>
              </div>
            </div>

            {/* Add New Nav Item Form */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center gap-3 text-xs">
              <input
                type="text"
                placeholder="Navigation Title (e.g., Schools & Faculties)"
                value={newNavTitle}
                onChange={(e) => setNewNavTitle(e.target.value)}
                className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl outline-none font-bold"
              />
              <input
                type="text"
                placeholder="Route Path (e.g., /faculties)"
                value={newNavRoute}
                onChange={(e) => setNewNavRoute(e.target.value)}
                className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl outline-none font-mono"
              />
              <button
                onClick={handleAddNavItem}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </div>

            {/* List of Navigation Items */}
            <div className="space-y-2 text-xs">
              {navItems.map((item) => (
                <div key={item.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="cursor-grab text-slate-400">⋮⋮</span>
                    <span className="font-extrabold text-slate-900">{item.title}</span>
                    <span className="font-mono text-slate-400 text-[11px]">{item.route}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setNavItems(navItems.map(i => i.id === item.id ? { ...i, enabled: !i.enabled } : i))}
                      className={`px-3 py-1 rounded-lg font-bold text-[10px] ${
                        item.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {item.enabled ? 'VISIBLE' : 'HIDDEN'}
                    </button>
                    <button
                      onClick={() => setNavItems(navItems.filter(i => i.id !== item.id))}
                      className="p-1.5 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MODULE ACTIVATION SETTINGS */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Module Activation Control</h2>
                <p className="text-xs text-slate-500">Toggle installed modules for {selectedFamily.toUpperCase()} ERP. Unused modules remain stored safely.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {Object.entries(modulesState).map(([mod, active]) => (
                <div key={mod} className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="font-extrabold text-slate-900">{mod}</div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className={`text-[10px] font-mono font-bold ${active ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {active ? 'INSTALLED & ACTIVE' : 'DISABLED'}
                    </span>
                    <button
                      onClick={() => setModulesState(prev => ({ ...prev, [mod]: !prev[mod] }))}
                      className={`px-3 py-1 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                        active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {active ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: NEWS & NOTICES ENGINE */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Institutional News & Communication Engine</h2>
                <p className="text-xs text-slate-500">Publish notices, announcements, and emergency updates to public portal and mobile app.</p>
              </div>
            </div>

            {/* Create News Form */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center gap-3 text-xs">
              <input
                type="text"
                placeholder="Notice / Announcement Title"
                value={newNewsTitle}
                onChange={(e) => setNewNewsTitle(e.target.value)}
                className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl outline-none font-bold"
              />
              <select
                value={newNewsCategory}
                onChange={(e) => setNewNewsCategory(e.target.value)}
                className="p-2.5 bg-white border border-slate-300 rounded-xl outline-none font-bold"
              >
                <option value="Notice">Notice</option>
                <option value="Finance">Finance</option>
                <option value="Research">Research</option>
                <option value="Emergency">Emergency</option>
              </select>
              <button
                onClick={handleAddNews}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Publish Notice
              </button>
            </div>

            {/* News List Table */}
            <div className="space-y-2 text-xs">
              {newsList.map((item) => (
                <div key={item.id} className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-slate-900">{item.title}</div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold">{item.category}</span>
                      <span>Published: {item.date}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded-md">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: THEME & EXPERIENCE ENGINE */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Enterprise Experience Engine</h2>
                <p className="text-xs text-slate-500">Customize layout density, dashboard widgets, and user interface preferences.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'cloud_console', title: 'Cloud Console Style', desc: 'Compact, high-density layout similar to AWS/GCP' },
                { id: 'classic_compact', title: 'Classic Compact ERP', desc: 'Traditional structured enterprise sidebar layout' },
                { id: 'modern_fluid', title: 'Modern Fluid Workspace', desc: 'Spacious card-based fluid design for touch screens' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setLayoutStyle(st.id as any)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition ${
                    layoutStyle === st.id
                      ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/30'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-extrabold text-xs text-slate-900">{st.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{st.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
