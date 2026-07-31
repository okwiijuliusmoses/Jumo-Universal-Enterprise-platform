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
    security: "security@jumodigitalplatform.ug.com",
    legal: "legal@jumodigitalplatform.ug.com",
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
 * Features the Enterprise Shield, Stylized U, Connected Digital Ring, and Intelligence Core.
 */
export function getOfficialLogoHtml(options = {}) {
  const {
    variant = "full", 
    size = "md", 
    textColor = "dark" 
  } = options;

  let iconSize = "w-10 h-10";
  let titleSize = "text-base";
  let subtitleSize = "text-[9px]";
  
  if (size === "sm") {
    iconSize = "w-8 h-8";
    titleSize = "text-xs";
    subtitleSize = "text-[8px]";
  } else if (size === "lg") {
    iconSize = "w-14 h-14";
    titleSize = "text-xl";
    subtitleSize = "text-[10px]";
  }

  const titleColorClass = textColor === "light" ? "text-white" : "text-[#1E293B]";
  const subtitleColorClass = textColor === "light" ? "text-slate-200" : "text-[#64748B]";
  const tagColorClass = textColor === "light" ? "text-emerald-300" : "text-[#007A5A]";

  // Official JUMO Enterprise Logo SVG Architecture Specification
  // 1. Enterprise Shield (rounded security shield)
  // 2. Stylized U (custom engineered U representing institutions/enterprises & unified OS)
  // 3. Connected Digital Ring (thin circular orbit with 12 nodes)
  // 4. Intelligence Core (small emerald circle at center-bottom)
  const logoSvgIcon = `
    <svg class="${iconSize} shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Connected Digital Ring (orbit with 12 nodes) -->
      <circle cx="50" cy="50" r="42" stroke="#007A5A" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.4"/>
      <circle cx="50" cy="8" r="3" fill="#00A86B"/>
      <circle cx="71" cy="14" r="2.5" fill="#007A5A"/>
      <circle cx="86" cy="29" r="2.5" fill="#007A5A"/>
      <circle cx="92" cy="50" r="3" fill="#00A86B"/>
      <circle cx="86" cy="71" r="2.5" fill="#007A5A"/>
      <circle cx="71" cy="86" r="2.5" fill="#007A5A"/>
      <circle cx="50" cy="92" r="3" fill="#00A86B"/>
      <circle cx="29" cy="86" r="2.5" fill="#007A5A"/>
      <circle cx="14" cy="71" r="2.5" fill="#007A5A"/>
      <circle cx="8" cy="50" r="3" fill="#00A86B"/>
      <circle cx="14" cy="29" r="2.5" fill="#007A5A"/>
      <circle cx="29" cy="14" r="2.5" fill="#007A5A"/>

      <!-- Enterprise Shield Background -->
      <path d="M50 15 C68 15 82 22 82 40 C82 65 65 80 50 88 C35 80 18 65 18 40 C18 22 32 15 50 15 Z" fill="#F8FAFC" stroke="#007A5A" stroke-width="3"/>

      <!-- Stylized U (custom architectural U with open gateway negative space) -->
      <path d="M36 34 V54 C36 63 64 63 64 54 V34" stroke="#007A5A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M36 34 H42" stroke="#00A86B" stroke-width="4" stroke-linecap="round"/>
      <path d="M58 34 H64" stroke="#00A86B" stroke-width="4" stroke-linecap="round"/>

      <!-- Intelligence Core (UEOS Kernel Heart) -->
      <circle cx="50" cy="58" r="4.5" fill="#00A86B"/>
      <circle cx="50" cy="58" r="2" fill="#FFFFFF"/>
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
