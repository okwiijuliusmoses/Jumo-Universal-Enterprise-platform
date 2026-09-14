export class UEOSNavigationEngine {
  constructor() {
    this.coreServices = [
      { id: 'home', label: 'Home', icon: 'home', path: '/', isPublic: true },
      { id: 'workspace', label: 'Workspace', icon: 'layout', path: '/workspace', requiresAuth: true },
      { id: 'applications', label: 'Application Launcher', icon: 'grid', path: '/applications', requiresAuth: true },
      { id: 'search', label: 'Enterprise Search', icon: 'search', path: '/search', requiresAuth: true },
      { id: 'notifications', label: 'Notifications', icon: 'bell', path: '/notifications', requiresAuth: true }
    ];

    this.settingsCategories = [
      { id: 'platform', label: 'Platform Settings', icon: 'settings' },
      { id: 'security', label: 'Security Settings', icon: 'shield' },
      { id: 'org', label: 'Organization Settings', icon: 'briefcase' },
      { id: 'apps', label: 'Application Settings', icon: 'cpu' },
      { id: 'workflow', label: 'Workflow Settings', icon: 'git-merge' },
      { id: 'data', label: 'Data Settings', icon: 'database' }
    ];
  }

  getSystemNavigation(user) {
    if (!user) {
      return this.coreServices.filter(nav => nav.isPublic);
    }

    const navigation = [...this.coreServices.filter(nav => nav.isPublic || nav.requiresAuth)];
    
    // Add user specific nav
    navigation.push({ id: 'profile', label: 'User Profile', icon: 'user', path: '/profile' });
    navigation.push({ id: 'tasks', label: 'Tasks & Approvals', icon: 'check-square', path: '/tasks' });

    if (user.isAdmin) {
      navigation.push({ id: 'settings', label: 'Settings Center', icon: 'sliders', path: '/settings' });
    }

    return navigation;
  }

  getWorkspaceNavigation(portalId, user) {
    // Dynamic generation of workspace specific navigation
    const portalNav = [
      { id: 'dashboard', label: 'Portal Dashboard', path: `/workspace?portal=${portalId}` },
      { id: 'applications', label: 'Portal Applications', path: `/workspace/applications?portal=${portalId}` },
      { id: 'forms', label: 'Portal Forms', path: `/workspace/forms?portal=${portalId}` },
      { id: 'workflows', label: 'Portal Workflows', path: `/workspace/workflows?portal=${portalId}` },
      { id: 'documents', label: 'Portal Documents', path: `/workspace/documents?portal=${portalId}` },
      { id: 'reports', label: 'Portal Reports', path: `/workspace/reports?portal=${portalId}` },
      { id: 'analytics', label: 'Portal Analytics', path: `/workspace/analytics?portal=${portalId}` },
      { id: 'settings', label: 'Portal Settings', path: `/workspace/settings?portal=${portalId}` }
    ];
    return portalNav;
  }
}

export const navigationEngine = new UEOSNavigationEngine();
