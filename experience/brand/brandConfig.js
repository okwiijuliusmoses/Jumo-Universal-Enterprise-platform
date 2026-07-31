// Centralized Platform Identity & Public Information Configuration
// Single Source of Truth for JUMO DIGITAL HYBRID PLATFORM

export const BRAND_CONFIG = {
  platformName: "JUMO DIGITAL HYBRID PLATFORM",
  poweredBy: "JUMO UEOS",
  fullPlatformName: "JUMO Universal Enterprise Operating System",
  ownership: {
    ownedBy: "JUMO",
    founder: "Julius Moses Okwii"
  },
  communication: {
    general: "ueos@jumo.com",
    information: "info@jumodigitalplatform.ug.com",
    contact: "contact@jumodigitalplatform.ug.com",
    publicServices: "public@jumodigitalplatform.ug.com",
    support: "support@jumo.com",
    security: "security@jumo.com",
    legal: "legal@jumo.com",
    partnerships: "partners@jumo.com",
    mobile: "+256 786 981 892",
    whatsapp: "+256 752 964 856"
  },
  location: {
    country: "Uganda",
    region: "East Africa",
    continent: "Africa",
    city: "Kampala"
  },
  offices: {
    headOffice: "Kampala, Uganda",
    regional: [
      "Mbale",
      "Mbarara",
      "Lira",
      "Arua",
      "Busia"
    ],
    homeOffice: "Kumi, Uganda"
  },
  socialLinks: [
    { platformName: "Facebook", officialLogo: "facebook", accountName: "jumodigitalplatform", URL: "https://facebook.com/jumodigitalplatform", enabledStatus: true },
    { platformName: "X (Twitter)", officialLogo: "x", accountName: "jumodigital", URL: "https://x.com/jumodigital", enabledStatus: true },
    { platformName: "TikTok", officialLogo: "tiktok", accountName: "jumodigital", URL: "https://tiktok.com/@jumodigital", enabledStatus: true },
    { platformName: "LinkedIn", officialLogo: "linkedin", accountName: "jumo-digital-platform", URL: "https://linkedin.com/company/jumo-digital-platform", enabledStatus: true },
    { platformName: "Instagram", officialLogo: "instagram", accountName: "jumodigital", URL: "https://instagram.com/jumodigital", enabledStatus: true },
    { platformName: "YouTube", officialLogo: "youtube", accountName: "jumodigitalplatform", URL: "https://youtube.com/@jumodigitalplatform", enabledStatus: true },
    { platformName: "Telegram", officialLogo: "telegram", accountName: "jumodigital", URL: "https://t.me/jumodigital", enabledStatus: true },
    { platformName: "WhatsApp Business", officialLogo: "whatsapp", accountName: "256752964856", URL: "https://wa.me/256752964856", enabledStatus: true }
  ]
};

/**
 * Generates the Official Approved JUMO Logo SVG HTML
 * Features the sovereign crest shield, gold crown accents, navy geometry & bold typography.
 */
export function getOfficialLogoHtml(options = {}) {
  const {
    variant = "full", // "full", "horizontal", "compact", "icon-only"
    size = "md", // "sm", "md", "lg"
    textColor = "dark" // "dark" (for light backgrounds), "light" (for dark/navy backgrounds)
  } = options;

  let logoHeight = "h-10";
  let iconSize = "w-10 h-10";
  let titleSize = "text-base";
  let subtitleSize = "text-[9px]";

  if (size === "sm") {
    logoHeight = "h-8";
    iconSize = "w-8 h-8";
    titleSize = "text-xs";
    subtitleSize = "text-[8px]";
  } else if (size === "lg") {
    logoHeight = "h-14";
    iconSize = "w-14 h-14";
    titleSize = "text-xl";
    subtitleSize = "text-[10px]";
  }

  const titleColorClass = textColor === "light" ? "text-white" : "text-slate-900";
  const subtitleColorClass = textColor === "light" ? "text-blue-200" : "text-slate-500";
  const tagColorClass = textColor === "light" ? "text-amber-300" : "text-amber-600";

  // Official Approved SVG Shield & Crown Logo Symbol
  const logoSvgIcon = `
    <svg class="${iconSize} shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Shield / Geometry Base -->
      <path d="M50 5 L88 20 V50 C88 72 70 90 50 96 C30 90 12 72 12 50 V20 L50 5 Z" fill="#0F172A" />
      <path d="M50 10 L82 23 V48 C82 67 66 84 50 89 C34 84 18 67 18 48 V23 L50 10 Z" fill="#0F62FE" opacity="0.9" />
      
      <!-- Crown Accent Header -->
      <path d="M32 30 L40 40 L50 26 L60 40 L68 30 L64 46 H36 L32 30 Z" fill="#F59E0B" />
      
      <!-- Central J Wings Geometry -->
      <path d="M50 34 L66 48 V64 C66 74 58 80 50 82 C42 80 34 74 34 64 V48 L50 34 Z" fill="#0F172A" />
      <path d="M44 48 H56 V62 C56 66 53 68 50 68 C47 68 44 66 44 62 V48 Z" fill="#FFFFFF" />
      
      <!-- Gold Sovereign Star Dot -->
      <circle cx="50" cy="54" r="3.5" fill="#F59E0B" />
    </svg>
  `;

  if (variant === "icon-only") {
    return `<div class="inline-flex items-center justify-center">${logoSvgIcon}</div>`;
  }

  return `
    <div class="inline-flex items-center gap-3">
      ${logoSvgIcon}
      <div class="flex flex-col justify-center">
        <div class="flex items-center gap-1.5 leading-none">
          <span class="font-extrabold tracking-tight ${titleSize} ${titleColorClass}">JUMO</span>
        </div>
        <span class="font-bold tracking-wider uppercase text-[10px] mt-0.5 ${subtitleColorClass}">DIGITAL ENTERPRISE PLATFORM</span>
        <span class="font-semibold tracking-widest uppercase ${subtitleSize} font-mono ${tagColorClass}">POWERED BY JUMO UEOS</span>
      </div>
    </div>
  `;
}
