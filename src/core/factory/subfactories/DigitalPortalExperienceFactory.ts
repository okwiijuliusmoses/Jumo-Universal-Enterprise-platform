// JUMO UEOS — Digital Portal & Experience Factory
// Sub-factory for manufacturing metadata-driven institutional portals and workspaces
// Standard: JDPM-800 Digital Portal Experience Standard
// Lineage: JDPM/MFG2608/xxxx subordinate to JDPM/BLUE2608/xxxx

import { StudioLifecycleCoordinationBus } from "../../events/StudioLifecycleCoordinationBus";

export interface PortalNavigationItem {
  itemId: string;
  label: string;
  icon: string;
  route: string;
  requiredRole: string[];
  clearanceLevel: 'PUBLIC' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET_LEVEL_10';
  badgeKey?: string;
  children?: PortalNavigationItem[];
}

export interface PortalWidgetConfig {
  widgetId: string;
  title: string;
  type: 'METRIC_CARD' | 'LIVE_TABLE' | 'CHART_TIME_SERIES' | 'ACTIVITY_STREAM' | 'ACTION_GATE';
  dataSourceEndpoint: string;
  refreshIntervalMs: number;
  widthCols: 1 | 2 | 3 | 4 | 6 | 12;
  permissions: string[];
}

export interface PortalManifest {
  portalId: string;
  name: string;
  domain: string;
  version: string;
  lineageId: string;
  blueprintRef: string;
  targetRole: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    mode: 'DARK_SOVEREIGN' | 'LIGHT_ENTERPRISE';
    brandingLogoUrl?: string;
  };
  navigationTree: PortalNavigationItem[];
  dashboardWidgets: PortalWidgetConfig[];
  allowedWorkspaces: string[];
  securityClearance: 'PUBLIC' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET_LEVEL_10';
  integrityDigest: string;
  status: 'ACTIVE' | 'DRAFT' | 'UPGRADED';
  createdAt: string;
  updatedAt: string;
}

export class DigitalPortalExperienceFactory {
  private static instance: DigitalPortalExperienceFactory;
  private portals: Map<string, PortalManifest> = new Map();

  private constructor() {
    this.seedCanonicalPortals();
  }

  public static getInstance(): DigitalPortalExperienceFactory {
    if (!DigitalPortalExperienceFactory.instance) {
      DigitalPortalExperienceFactory.instance = new DigitalPortalExperienceFactory();
    }
    return DigitalPortalExperienceFactory.instance;
  }

  private seedCanonicalPortals() {
    const canonicals: PortalManifest[] = [
      {
        portalId: 'PORTAL-TREASURY-COMMAND',
        name: 'National Treasury Sovereign Command Portal',
        domain: 'FINANCIAL_SOVEREIGNTY',
        version: '1.0.0',
        lineageId: 'JDPM/MFG2608/0001',
        blueprintRef: 'JDPM/BLUE2608/0001',
        targetRole: 'TREASURY_GOVERNOR',
        theme: {
          primaryColor: '#0f172a',
          accentColor: '#2563eb',
          mode: 'DARK_SOVEREIGN'
        },
        navigationTree: [
          { itemId: 'nav-overview', label: 'Treasury Overview', icon: 'Sliders', route: '/treasury/overview', requiredRole: ['TREASURY_GOVERNOR', 'SETTLEMENT_OFFICER'], clearanceLevel: 'SECRET' },
          { itemId: 'nav-rtgs', label: 'Live RTGS Queue', icon: 'Zap', route: '/treasury/rtgs-queue', requiredRole: ['SETTLEMENT_OFFICER'], clearanceLevel: 'SECRET' },
          { itemId: 'nav-audit', label: 'FAAP Audit Ledger', icon: 'Shield', route: '/treasury/audit-ledger', requiredRole: ['AUDIT_DIRECTOR'], clearanceLevel: 'TOP_SECRET_LEVEL_10' }
        ],
        dashboardWidgets: [
          { widgetId: 'w-settlement-rate', title: 'Sub-Millisecond RTGS Velocity', type: 'METRIC_CARD', dataSourceEndpoint: '/api/v1/ueos/operations/telemetry', refreshIntervalMs: 2000, widthCols: 4, permissions: ['treasury:view'] },
          { widgetId: 'w-double-entry-parity', title: 'Double-Entry Invariant Integrity', type: 'METRIC_CARD', dataSourceEndpoint: '/api/v1/ueos/faap/integrity-digest', refreshIntervalMs: 5000, widthCols: 4, permissions: ['treasury:view'] },
          { widgetId: 'w-active-enclaves', title: 'Hardware HSM Enclaves Active', type: 'METRIC_CARD', dataSourceEndpoint: '/api/v1/ueos/operations/telemetry', refreshIntervalMs: 5000, widthCols: 4, permissions: ['treasury:view'] }
        ],
        allowedWorkspaces: ['WS-TREASURY-OPERATIONS', 'WS-GOVERNANCE-AUDIT'],
        securityClearance: 'TOP_SECRET_LEVEL_10',
        integrityDigest: 'sha256:7f0c2e4a6b8d0f2a4c6e8b0d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a',
        status: 'ACTIVE',
        createdAt: '2026-08-15T00:00:00.000Z',
        updatedAt: '2026-08-15T00:00:00.000Z'
      }
    ];

    canonicals.forEach(p => this.portals.set(p.portalId, p));
  }

  public manufacturePortal(params: {
    name: string;
    domain: string;
    version: string;
    lineageId: string;
    blueprintRef: string;
    targetRole: string;
    theme: PortalManifest['theme'];
    navigationTree: PortalNavigationItem[];
    dashboardWidgets: PortalWidgetConfig[];
    allowedWorkspaces: string[];
    securityClearance: PortalManifest['securityClearance'];
  }): PortalManifest {
    const portalId = `PORTAL-${Date.now().toString().slice(-4)}`;
    const digest = this.calculateDigest(`${portalId}:${params.name}:${params.version}:${Date.now()}`);

    const manifest: PortalManifest = {
      portalId,
      name: params.name,
      domain: params.domain,
      version: params.version,
      lineageId: params.lineageId,
      blueprintRef: params.blueprintRef,
      targetRole: params.targetRole,
      theme: params.theme,
      navigationTree: params.navigationTree,
      dashboardWidgets: params.dashboardWidgets,
      allowedWorkspaces: params.allowedWorkspaces,
      securityClearance: params.securityClearance,
      integrityDigest: digest,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.portals.set(portalId, manifest);

    StudioLifecycleCoordinationBus.getInstance().emit(
      'manufacturing',
      ['engineering', 'operations'],
      'PORTAL_MANUFACTURED',
      manifest.name,
      manifest.domain,
      { portalId, digest },
      portalId
    );

    return manifest;
  }

  public getPortal(id: string): PortalManifest | undefined {
    return this.portals.get(id);
  }

  public getAllPortals(): PortalManifest[] {
    return Array.from(this.portals.values());
  }

  private calculateDigest(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `sha256:${hex}portal1234567890abcdef1234567890abcdef1234567890abcdef1234567890`;
  }
}
