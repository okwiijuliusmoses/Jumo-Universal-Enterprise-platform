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
 * Features a distinctive, sovereign enterprise emblem in blue and emerald green representing cloud infrastructure and unified governance.
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
  // Distinctive Enterprise Monogram & Gateway Emblem in Professional Blue and Emerald Green
  const logoSvgIcon = `
    <svg class="${iconSize} shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      /*   Outer Hexagon Sovereign Frame   */  
      <polygon points="50,6 90,27 90,73 50,94 10,73 10,27" fill="#0b3b9b" stroke="#007A5A" stroke-width="2.5" stroke-linejoin="round"/>
      
      /*   Inner Geometric Gateway Pillars (Representing Unified Enterprise OS)   */  
      <path d="M32 30 V70 M68 30 V70" stroke="#00A86B" stroke-width="5" stroke-linecap="round"/>
      <path d="M32 50 H68" stroke="#00A86B" stroke-width="4"/>
      
      /*   Sovereign Apex Core   */  
      <polygon points="50,18 62,38 38,38" fill="#00A86B"/>
      
      /*   Intelligence Core Node   */  
      <circle cx="50" cy="68" r="5" fill="#FFFFFF"/>
      <circle cx="50" cy="68" r="2.5" fill="#007A5A"/>
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

export function getEnterpriseFooterHtml() {
  return `
    <footer class="bg-slate-900 border-t border-slate-800 py-8 px-6 mt-auto">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
                <p class="text-xs text-slate-400 font-medium">&copy; ${new Date().getFullYear()} ${BRAND_CONFIG.platformName}. All Rights Reserved.</p>
                <p class="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-widest">${BRAND_CONFIG.poweredBy} &bull; Sovereign Architecture</p>
            </div>
            <div class="flex items-center gap-4 text-xs font-medium text-slate-400">
                <a href="#" class="hover:text-white transition">Privacy Policy</a>
                <a href="#" class="hover:text-white transition">Terms of Service</a>
                <a href="#" class="hover:text-white transition">AEGIS Security Statement</a>
            </div>
        </div>
    </footer>
  `;
}
