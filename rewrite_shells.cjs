const fs = require('fs');

// 1. Create AuthService
const authServiceContent = `
import { PortalRegistry, ModuleRegistry } from './registries';
import { LayoutDashboard, Users, Activity, ShieldCheck, Zap, Settings, CreditCard, Building, Heart, Calendar, DollarSign, FileText, ArrowRightLeft, BookOpen, Landmark, Briefcase } from 'lucide-react';

export const AuthService = {
  login: (username, password) => {
    // Determine product prefix from username
    let prefix = '';
    if (username.startsWith('EDU-')) prefix = 'EDU_';
    else if (username.startsWith('DP-')) prefix = 'DP_';
    else if (username.startsWith('FAAP-')) prefix = 'FAAP_';
    else if (username.startsWith('CHU-')) prefix = 'CH_';
    
    if (!prefix) {
      // default fallback mappings for demo purposes if they type generic names
      if (username.includes('edu')) prefix = 'EDU_';
      else if (username.includes('pay')) prefix = 'DP_';
      else if (username.includes('faap') || username.includes('fin')) prefix = 'FAAP_';
      else if (username.includes('church')) prefix = 'CH_';
      else return { success: false, message: 'Invalid credentials. Must include product indicator (EDU-, DP-, FAAP-, CHU-)' };
    }

    // Try to find a specific portal if they entered an exact code, else default
    let activePortal = PortalRegistry.find(p => username.includes(p.id.replace(prefix, '')));
    if (!activePortal) {
      // Pick first portal of that product
      activePortal = PortalRegistry.find(p => p.id.startsWith(prefix));
    }
    
    return { success: true, portalId: activePortal.id, productPrefix: prefix };
  },

  getNavigationForPortal: (portalId) => {
    // Dynamically build navigation from registries based on Portal ID
    const portal = PortalRegistry.find(p => p.id === portalId);
    if (!portal) return [];

    const prefix = portalId.split('_')[0] + '_';
    
    // In a real system, ModuleRegistry would have a many-to-many relationship with PortalRegistry.
    // For this benchmark architecture completion, we dynamically group the product's modules 
    // into categories and only show what makes sense for the portal.
    const allModules = ModuleRegistry.filter(m => m.id.startsWith('MOD_' + prefix));
    
    // Generate groups dynamically
    const groups = {};
    allModules.forEach((mod, idx) => {
      // Simple clustering logic based on module names
      let groupName = 'Operations';
      if (mod.name.includes('Admin') || mod.name.includes('Setting') || mod.name.includes('Config') || mod.name.includes('Govern')) groupName = 'Administration';
      else if (mod.name.includes('Dash') || mod.name.includes('Report') || mod.name.includes('Analytic')) groupName = 'Intelligence';
      else if (mod.name.includes('User') || mod.name.includes('Member') || mod.name.includes('Student') || mod.name.includes('Staff') || mod.name.includes('Clergy')) groupName = 'People & Directory';
      else if (mod.name.includes('Finan') || mod.name.includes('Pay') || mod.name.includes('Ledger') || mod.name.includes('Account')) groupName = 'Finance';
      
      if (!groups[groupName]) groups[groupName] = [];
      
      // Select icons based on name
      let icon = Activity;
      if (groupName === 'People & Directory') icon = Users;
      if (groupName === 'Administration') icon = Settings;
      if (groupName === 'Finance') icon = DollarSign;
      if (mod.name.includes('Dash')) icon = LayoutDashboard;
      if (mod.name.includes('Risk') || mod.name.includes('Audit')) icon = ShieldCheck;
      
      groups[groupName].push({
        id: mod.id,
        label: mod.displayName,
        icon: icon
      });
    });

    const menuGroups = Object.keys(groups).map(g => ({
      group: g,
      items: groups[g].slice(0, 7) // Limit to avoid massive sidebars in demo
    }));

    return menuGroups;
  }
};
`;
fs.writeFileSync('src/products/AuthService.ts', authServiceContent);

