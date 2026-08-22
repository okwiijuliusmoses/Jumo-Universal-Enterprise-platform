const fs = require('fs');

const shells = [
  { 
    path: 'src/products/digital-pay/web/DigitalPayWebShell.tsx',
    productName: 'Digital Pay',
    defaultMod: 'MOD_DP_DASHBOARD'
  },
  { 
    path: 'src/products/faap/web/FaapWebShell.tsx',
    productName: 'FAAP',
    defaultMod: 'MOD_FAAP_DASHBOARD'
  },
  { 
    path: 'src/products/church-erp/web/ChurchErpWebShell.tsx',
    productName: 'Church ERP',
    defaultMod: 'MOD_CH_DASHBOARD'
  },
  { 
    path: 'src/products/education-erp/web/EducationErpWebShell.tsx',
    productName: 'Education ERP',
    defaultMod: 'MOD_EDU_DASHBOARD'
  }
];

shells.forEach(shell => {
  let content = fs.readFileSync(shell.path, 'utf8');
  
  // Add AuthService import
  if (!content.includes('AuthService')) {
    content = content.replace("import { PortalRegistry", "import { AuthService } from '../../AuthService';\nimport { PortalRegistry");
  }

  // Add login state if not present
  if (!content.includes('loginUsername')) {
    content = content.replace("const [activePortalId", "const [loginUsername, setLoginUsername] = useState('');\n  const [loginPassword, setLoginPassword] = useState('');\n  const [loginError, setLoginError] = useState('');\n  const [activePortalId");
  }

  // Update default active tab
  content = content.replace(/useState<string>\('(?:DASHBOARD|OVERVIEW)'\)/, `useState<string>('${shell.defaultMod}')`);

  // Update the renderLoginPage function
  content = content.replace(/<form onSubmit=\{\(e\) => \{ e\.preventDefault\(\); setAppState\('APP'\); \}\}.*?<\/form>/s, `
        {loginError && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{loginError}</div>}
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          const authResult = AuthService.login(loginUsername, loginPassword);
          if (authResult.success) {
            setActivePortalId(authResult.portalId);
            setAppState('APP');
            setLoginError('');
          } else {
            setLoginError(authResult.message);
          }
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Access ID (Username)</label>
            <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. ${shell.productName === 'Digital Pay' ? 'DP-MERCHANT-001' : shell.productName === 'FAAP' ? 'FAAP-CFO-001' : shell.productName === 'Church ERP' ? 'CHU-BISHOP-001' : 'EDU-ADM-001'}" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Access Credential (Password)</label>
            <input type="password" required className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm" placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" /> Enter Workspace
          </button>
        </form>`);

  // Remove the "Portal Context" dropdown from the sidebar
  content = content.replace(/<div className="p-4 border-b border-slate-100 bg-slate-50\/50">.*?<\/select>\s*<\/div>/s, `
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Portal Identity</div>
            <div className="text-sm font-bold text-slate-900 break-words">{PortalRegistry.find(p => p.id === activePortalId)?.displayName || activePortalId}</div>
          </div>`);

  // Replace menuGroups definition with AuthService call
  content = content.replace(/const menuGroups = \[.*?\];/s, `const menuGroups = AuthService.getNavigationForPortal(activePortalId);`);
  
  // Fix the renderCurrentPage logic to handle module IDs generically and fallback properly
  if (content.includes('const renderCurrentPage = () => {') && !content.includes('const activeModuleDef')) {
    content = content.replace(/const renderCurrentPage = \(\) => \{.*?default:.*?;\s*\}/s, `const renderCurrentPage = () => {
    const activeModuleDef = ModuleRegistry.find(m => m.id === activeTab);
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{activeModuleDef?.displayName || 'Workspace Overview'}</h2>
            <p className="text-sm text-slate-500">{activeModuleDef?.description || 'Universal workspace container for this capability.'}</p>
          </div>
        </div>
        <div className="p-6 flex-1 bg-slate-50/50">
          <div className="text-center text-slate-400 mt-20">
            <Layers className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">Registry Module Mapped</h3>
            <p className="text-sm max-w-md mx-auto">The capability <strong>{activeModuleDef?.displayName}</strong> is mapped via the central registry for the <strong>{PortalRegistry.find(p => p.id === activePortalId)?.displayName}</strong> portal.</p>
          </div>
        </div>
      </div>
    );
  }`);
  }

  // Some components might have a syntax issue now due to menuGroup rendering loop looking for .group and .items
  // Let's ensure the rendering loop uses the dynamically generated menuGroups correctly.
  content = content.replace(/group\.group === 'Portals'/g, `false`);

  fs.writeFileSync(shell.path, content);
});

console.log("Shells patched successfully!");
