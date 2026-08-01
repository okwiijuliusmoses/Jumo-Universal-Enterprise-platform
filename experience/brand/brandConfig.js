// JUMO DIGITAL HYBRID PLATFORM
// Centralized Public Platform Identity Configuration
// Powered by JUMO UEOS

export const BRAND_CONFIG = {
  platformName: "JUMO DIGITAL HYBRID PLATFORM",
  poweredBy: "JUMO UEOS",
  fullPlatformName: "JUMO Universal Enterprise Operating System",

  // Compatibility layer for existing components
  ownership: {
    ownedBy: "JUMO",
    displayName: "JUMO"
  },

  communication: {
    general: "info@jumodigitalplatform.com",
    support: "support@jumodigitalplatform.com",
    security: "security@jumodigitalplatform.com",
    legal: "legal@jumodigitalplatform.com",
    publicServices: "services@jumodigitalplatform.com",
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
    {
      platformName: "Facebook",
      officialLogo: "facebook",
      accountName: "jumodigitalplatform",
      URL: "https://facebook.com/jumodigitalplatform",
      enabledStatus: true
    },
    {
      platformName: "X",
      officialLogo: "x",
      accountName: "jumodigital",
      URL: "https://x.com/jumodigital",
      enabledStatus: true
    },
    {
      platformName: "LinkedIn",
      officialLogo: "linkedin",
      accountName: "jumo-digital-platform",
      URL: "https://linkedin.com/company/jumo-digital-platform",
      enabledStatus: true
    },
    {
      platformName: "YouTube",
      officialLogo: "youtube",
      accountName: "jumodigitalplatform",
      URL: "https://youtube.com/@jumodigitalplatform",
      enabledStatus: true
    },
    {
      platformName: "WhatsApp Business",
      officialLogo: "whatsapp",
      accountName: "256752964856",
      URL: "https://wa.me/256752964856",
      enabledStatus: true
    }
  ]
};


export function getOfficialLogoHtml(options = {}) {

  const {
    variant = "full",
    size = "md",
    textColor = "dark"
  } = options;

  let iconSize = "w-10 h-10";

  if(size === "sm") iconSize = "w-8 h-8";
  if(size === "lg") iconSize = "w-14 h-14";

  const titleColor =
    textColor === "light"
      ? "text-white"
      : "text-slate-800";

  const subtitleColor =
    textColor === "light"
      ? "text-slate-200"
      : "text-slate-500";


  const logoSvg = `
  <svg class="${iconSize}" viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">

    <circle cx="50" cy="50" r="44"
      fill="none"
      stroke="#007A5A"
      stroke-width="5"/>

    <text x="50"
      y="68"
      text-anchor="middle"
      font-size="55"
      font-weight="800"
      fill="#0b3b9b">
      U
    </text>

  </svg>
  `;


  if(variant === "icon-only"){
    return `<div class="inline-flex">${logoSvg}</div>`;
  }


  return `
  <div class="inline-flex items-center gap-3">

    ${logoSvg}

    <div class="flex flex-col">

      <span class="font-extrabold tracking-tight text-xl ${titleColor}">
        JUMO
      </span>

      <span class="uppercase text-[10px] tracking-widest ${subtitleColor}">
        DIGITAL HYBRID PLATFORM
      </span>

      <span class="uppercase text-[9px] tracking-widest text-emerald-600">
        POWERED BY JUMO UEOS
      </span>

    </div>

  </div>
  `;
}


export function getEnterpriseFooterHtml(){

return `
<footer class="bg-white border-t border-slate-200 py-8 px-6">

<div class="max-w-7xl mx-auto text-center">

<p class="text-xs text-slate-500">
© ${new Date().getFullYear()}
${BRAND_CONFIG.platformName}.
All Rights Reserved.
</p>

<p class="text-[10px] text-slate-400 uppercase tracking-widest mt-2">
${BRAND_CONFIG.poweredBy}
• Sovereign Enterprise Architecture
</p>

</div>

</footer>
`;

}
