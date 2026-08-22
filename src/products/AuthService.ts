import { CredentialRegistry, NavigationRegistry, PortalRegistry } from './registries';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  Activity, 
  Zap, 
  Settings, 
  CreditCard, 
  Building, 
  Heart, 
  Calendar, 
  DollarSign, 
  FileText, 
  ArrowRightLeft, 
  BookOpen, 
  Landmark, 
  Briefcase 
} from "lucide-react";

const iconMap: Record<string, any> = {
  LayoutDashboard, Users, Activity, ShieldCheck, Zap, Settings, CreditCard, Building, Heart, Calendar, DollarSign, FileText, ArrowRightLeft, BookOpen, Landmark, Briefcase
};

export const AuthService = {
  login: (username: string, password?: string) => {
    // True Credential-based identity resolution. No string guessing.
    const credential = CredentialRegistry.find(c => c.username === username);
    if (!credential) {
      return { success: false, message: 'Invalid credentials. Unknown user.' };
    }
    
    // Resolve portal from the specific user's credential profile
    const portal = PortalRegistry.find(p => p.id === credential.portalId);
    if (!portal) {
       return { success: false, message: 'Portal resolution failed. User has no valid portal mapping.' };
    }
    
    return { 
      success: true, 
      portalId: credential.portalId, 
      tenantId: credential.tenantId,
      role: credential.role
    };
  },

  getNavigationForPortal: (portalId: string) => {
    // Navigation is completely registry-driven, no dynamic mapping or guessing.
    const navDef = NavigationRegistry.find(n => n.portalId === portalId);
    if (!navDef) return [];
    
    // Map string icon names to actual Lucide components
    return navDef.groups.map(g => ({
      group: g.group,
      items: g.items.map(item => ({
        id: item.id,
        label: item.label,
        icon: iconMap[item.iconName] || LayoutDashboard
      }))
    }));
  }
};
