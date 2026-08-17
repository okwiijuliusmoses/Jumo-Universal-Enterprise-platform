import { LayoutDashboard, Factory, ShieldCheck, Settings } from 'lucide-react';

export interface NavigationRecord {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  studio: string;
  visibilityPolicy: 'ALWAYS' | 'AUTH_REQUIRED' | 'ADMIN_ONLY';
}

export class NavigationRegistry {
  private static instance: NavigationRegistry;
  private items: Map<string, NavigationRecord> = new Map();

  private constructor() {
    this.seedDefaults();
  }

  public static getInstance(): NavigationRegistry {
    if (!NavigationRegistry.instance) {
      NavigationRegistry.instance = new NavigationRegistry();
    }
    return NavigationRegistry.instance;
  }

  private seedDefaults() {
    this.register({
      id: 'NAV-STUDIO-1',
      title: 'Spec, Arch & Engineering',
      description: 'Requirements, Architecture & Blueprint',
      icon: 'LayoutDashboard',
      route: 'spec-arch-eng',
      studio: 'STUDIO_1',
      visibilityPolicy: 'ALWAYS'
    });
    this.register({
      id: 'NAV-STUDIO-2',
      title: 'Mfg & Assurance',
      description: 'Factory, Verification & Certification',
      icon: 'Factory',
      route: 'mfg-ver-cert',
      studio: 'STUDIO_2',
      visibilityPolicy: 'ALWAYS'
    });
    this.register({
      id: 'NAV-STUDIO-3',
      title: 'Inst, Exp & Deployment',
      description: 'Tenancy, Branding & Operations',
      icon: 'Settings',
      route: 'inst-exp-deploy',
      studio: 'STUDIO_3',
      visibilityPolicy: 'ALWAYS'
    });
  }

  public register(item: NavigationRecord) {
    this.items.set(item.id, item);
  }

  public getNavigationItems(): NavigationRecord[] {
    return Array.from(this.items.values());
  }
}
