export const JUMO_LOGO_ASSET = "JUMO NEW LOGO.png";

export const JUMO_LOGO_STANDARDS = {
  revision: "2026-08-08-v3",

  identity: {
    authoritative: true,
    platformSymbol: true,
    aiSymbol: true,
    systemSymbol: true,
  },

  colors: {
    primaryBlue: "#0057B8",
    darkBlue: "#003B7A",
    white: "#FFFFFF",
    green: "#00843D",
    lightBlue: "#EAF3FF",
    lightGreen: "#EAF8F0",
  },

  container: {
    rectangular: true,
    rounded: true,
    radius: "rounded-2xl",
    overflow: "hidden",
  },

  backgrounds: {
    primary: "#0057B8",
    secondary: "#00843D",
  },

  navigation: {
    width: 40,
    height: 40,
  },

  mobileNavigation: {
    width: 40,
    height: 40,
  },

  publicHeader: {
    width: 56,
    height: 56,
  },

  mobilePublicHeader: {
    width: 40,
    height: 40,
  },

  authentication: {
    width: 72,
    height: 72,
  },

  publicLanding: {
    width: 100,
    height: 100,
  },

  platformCard: {
    width: 56,
    height: 56,
  },

  enterpriseIdentity: {
    width: 80,
    height: 80,
  },

  aiIdentity: {
    width: 56,
    height: 56,
  },

  moduleIdentity: {
    width: 40,
    height: 40,
  },

  serviceIdentity: {
    width: 40,
    height: 40,
  },
} as const;
