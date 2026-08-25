export interface PortalNotice {
  id: string;
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL' | 'INFO';
  message: string;
  expiresAt: string;
}

export interface PortalNews {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
}

export interface PortalContent {
  notices: PortalNotice[];
  news: PortalNews[];
}

export const portalContent: PortalContent = {
  notices: [
    {
      id: 'not-01',
      title: 'Phase 31 Sovereign Integration Completed',
      priority: 'HIGH',
      message: 'All 12 ERP domains have successfully synchronized with the FAAP double-entry general ledger and Zero-Trust RBAC security mesh.',
      expiresAt: '2026-12-31',
    },
    {
      id: 'not-02',
      title: 'Master Treasury Routing Rate Active',
      priority: 'INFO',
      message: 'Automated settlement clearing fee of 1.5% is actively debiting Master Treasury and crediting Fee Revenue across fintech pipelines.',
      expiresAt: '2026-12-31',
    },
  ],
  news: [
    {
      id: 'news-01',
      title: 'JUMO Digital Hybrid Platform Upgrade (JDHP) Deployed',
      subtitle: 'System Intelligence Upgrade',
      summary: 'The latest release brings enhanced cognitive multi-model AI routing, offline edge SQLite synchronization, and automated boilerplate scaffolding across all enterprise domains.',
    },
    {
      id: 'news-02',
      title: 'Enterprise Software Factory expansion',
      subtitle: 'Domain Builder Updates',
      summary: 'New domain templates for Church ERP, SACCO & Microfinance, and Healthcare referral hospitals are now available in the Sovereign Institutional Template Library.',
    },
  ],
};
