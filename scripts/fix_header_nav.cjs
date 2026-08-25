const fs = require('fs');
const path = require('path');

const headerPath = path.resolve(__dirname, '../src/components/JUMOEnterpriseHeader.tsx');
let content = fs.readFileSync(headerPath, 'utf8');

// Replace the navItems definition pattern so navItems is declared before handleNavClick or as a constant
const searchStr = `  const handleNavClick = (path: string) => {
    const label = navItems.find(n => n.path === path)?.label || path;`;

// Let's check how navItems is defined
console.log("Replacing navItems in JUMOEnterpriseHeader.tsx...");

const navItemsDef = `const DEFAULT_HEADER_NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '/workspace', icon: Home, match: ['/workspace', '/public', '/'] },
  { id: 'foundation', label: 'Foundation', path: '/foundation', icon: Layers, match: ['/foundation'] },
  { id: 'domains', label: 'Domains', path: '/domains', icon: Globe, match: ['/domains', '/domain/'] },
  { id: 'workspace', label: 'Workspace', path: '/tenant', icon: LayoutDashboard, match: ['/tenant', '/tenants'] },
  { id: 'finance', label: 'Finance', path: '/treasury', icon: DollarSign, match: ['/treasury', '/faap', '/fintech'] },
  { id: 'ai', label: 'AI Center', path: '/ai-platform', icon: Bot, match: ['/ai-platform', '/workspace/app/ai-center'] },
  { id: 'telecom', label: 'Telecom', path: '/telecommunications', icon: Phone, match: ['/telecommunications'] },
  { id: 'security', label: 'Security', path: '/security', icon: Shield, match: ['/security', '/workspace/app/aegis', '/operations'] },
  { id: 'marketplace', label: 'Marketplace', path: '/marketplace', icon: Store, match: ['/marketplace', '/developer-center'] },
  { id: 'control', label: 'Control Center', path: '/owner', icon: Cpu, match: ['/owner', '/owner-console', '/owner-login'] },
  { id: 'docs', label: 'Docs', path: '/documentation', icon: HelpCircle, match: ['/documentation'] },
];`;

// Place DEFAULT_HEADER_NAV_ITEMS before the component export
content = content.replace(`export interface JUMOEnterpriseHeaderProps`, `${navItemsDef}\n\nexport interface JUMOEnterpriseHeaderProps`);

// Inside handleNavClick, use (DEFAULT_HEADER_NAV_ITEMS || []).find
content = content.replace(
  `const label = navItems.find(n => n.path === path)?.label || path;`,
  `const label = (DEFAULT_HEADER_NAV_ITEMS || []).find(n => n.path === path)?.label || path;`
);

// Replace line 128 "const navItems = [" to "const navItems = DEFAULT_HEADER_NAV_ITEMS;"
content = content.replace(/const navItems = \[\s*\{ id: 'home'[\s\S]*?\{ id: 'docs', label: 'Docs', path: '\/documentation', icon: HelpCircle, match: \['\/documentation'\] \},\s*\];/, `const navItems = DEFAULT_HEADER_NAV_ITEMS;`);

// In favorites map:
content = content.replace(
  `const item = navItems.find(n => n.path === path) || { label: path, icon: Star };`,
  `const item = (DEFAULT_HEADER_NAV_ITEMS || []).find(n => n.path === path) || { label: path, icon: Star };`
);

fs.writeFileSync(headerPath, content, 'utf8');
console.log("✓ Updated JUMOEnterpriseHeader.tsx successfully.");
