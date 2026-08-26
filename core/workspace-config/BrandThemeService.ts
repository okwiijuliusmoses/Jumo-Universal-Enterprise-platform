export interface BrandThemeConfig {
  platformName: string;
  officialLogoText: string;
  organizationName: string;
  bannerActive: boolean;
  bannerMessage: string;
  themeMode: 'light' | 'dark' | 'hybrid' | 'high-contrast';
  primaryColor: string;
  secondaryColor: string;
  portalBackground: 'solid' | 'subtle-grid' | 'slate-pattern';
  headerStyle: 'clean' | 'enterprise' | 'compact';
  footerStyle: 'full' | 'minimal';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  typography: 'sans' | 'serif' | 'mono';
  typographyScale: 'compact' | 'normal' | 'spacious';
  spacingScale: 'dense' | 'standard' | 'spacious';
  loginBranding: {
    title: string;
    subtitle: string;
    backgroundStyle: string;
  };
  emailBranding: {
    headerLogoText: string;
    footerText: string;
  };
  documentBranding: {
    watermark: string;
    classification: string;
  };
  mobileBranding: {
    headerCompact: boolean;
    navStyle: 'bottom' | 'drawer';
  };
}

const DEFAULT_THEME: BrandThemeConfig = {
  platformName: 'JUMO Digital Enterprise Platform',
  officialLogoText: 'JUMO UEOS',
  organizationName: 'JUMO Universal Enterprise Operating System',
  bannerActive: true,
  bannerMessage: 'JUMO UEOS Sovereign Hybrid Runtime v9.4 - All systems nominal.',
  themeMode: 'hybrid',
  primaryColor: 'bg-blue-600 text-white',
  secondaryColor: 'bg-white text-white',
  portalBackground: 'subtle-grid',
  headerStyle: 'enterprise',
  footerStyle: 'full',
  borderRadius: 'lg',
  typography: 'sans',
  typographyScale: 'normal',
  spacingScale: 'standard',
  loginBranding: {
    title: 'Sovereign Institutional Gateway',
    subtitle: 'Strict Zero-Trust RBAC & Hardware Cryptographic Authentication Required',
    backgroundStyle: 'slate-mesh',
  },
  emailBranding: {
    headerLogoText: 'JUMO Enterprise Notification Service',
    footerText: 'Confidentiality Notice: This automated transmission is strictly protected under JUMO Sovereign Security policies.',
  },
  documentBranding: {
    watermark: 'JUMO SOVEREIGN ARCHIVE',
    classification: 'RESTRICTED-ENTERPRISE-ONLY',
  },
  mobileBranding: {
    headerCompact: true,
    navStyle: 'bottom',
  },
};

let currentTheme: BrandThemeConfig = { ...DEFAULT_THEME };

export const BrandThemeService = {
  getTheme(): BrandThemeConfig {
    return currentTheme;
  },
  updateTheme(config: BrandThemeConfig): void {
    currentTheme = { ...config };
  },
  resetTheme(): BrandThemeConfig {
    currentTheme = { ...DEFAULT_THEME };
    return currentTheme;
  },
};
