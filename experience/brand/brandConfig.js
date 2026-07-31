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
    general: "ueos@jumodigitalplatform.com",
    information: "info@jumodigitalplatform.ug.com",
    support: "support@jumodigitalplatform.ug.com",
    contact: "contact@jumodigitalplatform.ug.com",
    publicServices: "public@jumodigitalplatform.ug.com",
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
    variant = "full", 
    size = "md", 
    textColor = "dark" 
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
  const tagColorClass = textColor === "light" ? "text-blue-100" : "text-enterprise-blue";

  // Professional Enterprise Identity Symbol
  const logoSvgIcon = `
    <svg class="${iconSize} shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Circular Ecosystem -->
      <circle cx="50" cy="50" r="45" stroke="#0F62FE" stroke-width="2" stroke-dasharray="10 5" opacity="0.3"/>
      <!-- Interconnected Nodes -->
      <circle cx="50" cy="20" r="6" fill="#0F62FE"/>
      <circle cx="80" cy="50" r="6" fill="#0F62FE"/>
      <circle cx="50" cy="80" r="6" fill="#0F62FE"/>
      <circle cx="20" cy="50" r="6" fill="#0F62FE"/>
      <!-- J Identity Path -->
      <path d="M40 35 C40 30 50 25 60 30 C70 35 60 50 50 60 C40 70 30 75 30 70" stroke="#0F62FE" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="65" cy="65" r="8" fill="#F59E0B" />
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
        <span class="font-semibold tracking-widest uppercase ${subtitleSize} font-sans ${tagColorClass}">POWERED BY JUMO UEOS</span>
      </div>
    </div>
  `;
}