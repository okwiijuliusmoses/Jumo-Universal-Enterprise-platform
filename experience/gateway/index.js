import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";

/**
 * Public Homepage Template
 */
export const publicTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "md", textColor: "dark" });
  
  app.innerHTML = `
    <!-- Top Bar -->
    <div class="bg-slate-900 text-slate-300 py-2 px-6 border-b border-slate-800 hidden md:block text-xs font-medium">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="inline-flex items-center gap-1.5 text-emerald-400 font-semibold font-mono text-[11px]">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            SOVEREIGN SYSTEM OPERATIONAL
          </span>
          <span class="text-slate-700">|</span>
          <span class="text-slate-400 text-[11px]">Region: East Africa (${BRAND_CONFIG.officeLocations.country})</span>
        </div>
        <div class="flex items-center gap-6 text-[11px]">
          <a href="tel:${BRAND_CONFIG.telephones.mobile}" class="hover:text-white transition">📞 ${BRAND_CONFIG.telephones.mobile}</a>
          <a href="mailto:${BRAND_CONFIG.emails.contact}" class="hover:text-white transition">✉️ ${BRAND_CONFIG.emails.contact}</a>
          <span class="text-slate-700">|</span>
          <span class="font-mono text-amber-400">${BRAND_CONFIG.poweredBy}</span>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="cursor-pointer" onclick="navigate('/')">
          ${logoHtml}
        </div>
        
        <nav class="hidden lg:flex items-center space-x-6 text-xs font-bold tracking-wider text-slate-600">
          <button onclick="navigate('/')" class="text-enterprise-blue hover:text-blue-700 transition">Home</button>
          <button onclick="navigate('/login')" class="hover:text-enterprise-blue transition">Enterprise Platforms</button>
          <button onclick="navigate('/login')" class="hover:text-enterprise-blue transition">Products</button>
          <button onclick="navigate('/login')" class="hover:text-enterprise-blue transition">Marketplace</button>
          <button onclick="navigate('/login')" class="hover:text-enterprise-blue transition">Resources</button>
          <button onclick="navigate('/login')" class="hover:text-enterprise-blue transition">Support</button>
        </nav>

        <div class="flex items-center space-x-3">
          ${state.session ? `
            <div class="relative flex items-center gap-3">
              <!-- Top-Right User Profile Component -->
              <div class="hidden sm:flex flex-col items-end text-right">
                <div class="flex items-center gap-1.5">
                  <span class="font-extrabold text-xs text-slate-900">${state.session.user.name}</span>
                  <span class="text-[9px] font-mono font-bold bg-blue-50 text-enterprise-blue border border-blue-200 px-1.5 py-0.2 rounded uppercase">${state.session.user.role}</span>
                </div>
                <span class="text-[10px] text-slate-500 font-medium">${state.session.organization || 'University of Kampala'}</span>
              </div>

              <!-- Avatar & Account Access Menu Dropdown Toggle -->
              <div class="relative">
                <button onclick="toggleProfileDropdown()" class="flex items-center space-x-2 p-1.5 border border-slate-200 rounded-full hover:bg-slate-50 transition cursor-pointer">
                  <div class="w-8 h-8 rounded-full bg-enterprise-blue text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    ${state.session.user.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <span class="text-slate-400 text-xs">▼</span>
                </button>

                <div id="profile-dropdown" class="hidden absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-xs font-semibold">
                  <div class="p-3 bg-slate-50 rounded-lg border border-slate-100 mb-2">
                    <p class="font-bold text-slate-900 text-sm">${state.session.user.name}</p>
                    <p class="text-slate-500 text-[11px] font-mono truncate">${state.session.user.email}</p>
                    <div class="mt-2 flex items-center justify-between text-[10px]">
                      <span class="font-bold text-slate-600">Org: ${state.session.organization}</span>
                      <span class="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div class="space-y-1 divide-y divide-slate-100">
                    <div class="pt-1">
                      <button onclick="navigate('/gateway'); toggleProfileDropdown();" class="w-full text-left px-3 py-2 text-enterprise-blue font-bold hover:bg-blue-50 rounded-md">🏠 Enterprise Gateway &rarr;</button>
                      <button onclick="navigate('/workspace'); toggleProfileDropdown();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">🏢 Workspace Resolver</button>
                      <button onclick="alert('Viewing Account Security Access Matrix'); toggleProfileDropdown();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">🔒 Security & Access Credentials</button>
                    </div>

                    ${state.session.user.isAdmin ? `
                      <div class="pt-2">
                        <button onclick="navigate('/control-center'); toggleProfileDropdown();" class="w-full text-left px-3 py-2 bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 rounded-md flex items-center justify-between">
                          <span>🛠️ Admin Control Center</span>
                          <span class="text-[9px] font-mono bg-indigo-200 px-1.5 py-0.5 rounded text-indigo-900">ADMIN</span>
                        </button>
                      </div>
                    ` : ''}

                    <div class="pt-2">
                      <button onclick="handleLogout()" class="w-full text-left px-3 py-2 text-rose-600 font-bold hover:bg-rose-50 rounded-md">🚪 Sign Out</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ` : `
            <button onclick="navigate('/login')" class="text-xs font-bold uppercase px-4 py-2.5 text-slate-700 hover:text-enterprise-blue transition cursor-pointer">Sign In</button>
            <button onclick="navigate('/register')" class="text-xs font-bold uppercase px-5 py-2.5 rounded-lg bg-enterprise-blue hover:bg-blue-700 text-white transition shadow-sm cursor-pointer">Register Institution</button>
          `}
        </div>
      </div>
    </header>

    <main class="flex-1 bg-slate-50">
      <!-- Hero Banner -->
      <section class="bg-white border-b border-slate-200 py-16 px-6 relative overflow-hidden">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 text-enterprise-blue border border-blue-100 text-[11px] font-semibold tracking-wider uppercase font-mono">
              <span class="w-2 h-2 rounded-full bg-enterprise-blue animate-pulse"></span>
              <span>Enterprise Operating Environment</span>
            </div>
            <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              ${BRAND_CONFIG.platformName}
            </h1>
            <p class="text-slate-600 text-base max-w-xl leading-relaxed">
              The unified digital reception and workspace environment connecting institutions, enterprises, state bodies, and digital services under sovereign security governance.
            </p>
            <div class="pt-3 flex flex-wrap gap-4">
              <button onclick="navigate('/register')" class="px-6 py-3.5 rounded-lg bg-enterprise-blue hover:bg-blue-700 font-bold text-xs text-white uppercase tracking-wider transition shadow-sm cursor-pointer">Register Institution</button>
              <button onclick="navigate('/login')" class="px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 font-bold text-xs text-white uppercase tracking-wider transition shadow-sm cursor-pointer">Sign In to Platform</button>
            </div>
          </div>

          <!-- Quick Platform Card -->
          <div class="lg:col-span-5">
            <div class="bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden">
              <div class="bg-slate-900 text-white p-5 flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-sm tracking-wide">JUMO Platform Status</h3>
                  <p class="text-[11px] text-slate-400 font-mono">Kernel Core: Operational</p>
                </div>
                <span class="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">LIVE</span>
              </div>
              <div class="p-6 divide-y divide-slate-100 text-xs font-semibold text-slate-600 space-y-3">
                <div class="pt-3 flex items-center justify-between">
                  <span>Supported Regions</span>
                  <span class="font-bold text-slate-900">${BRAND_CONFIG.officeLocations.region} (${BRAND_CONFIG.officeLocations.country})</span>
                </div>
                <div class="pt-3 flex items-center justify-between">
                  <span>Head Office</span>
                  <span class="font-mono text-enterprise-blue font-bold">${BRAND_CONFIG.officeLocations.headOffice}</span>
                </div>
                <div class="pt-3 flex items-center justify-between">
                  <span>Regional Offices</span>
                  <span class="font-mono text-slate-700">${BRAND_CONFIG.officeLocations.regionalOffices.join(", ")}</span>
                </div>
                <div class="pt-3 flex items-center justify-between">
                  <span>Security & Compliance</span>
                  <span class="font-mono text-emerald-600 font-bold">Cryptographic AEGIS Enforced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Enterprise Industry Solutions -->
      <section class="py-16 max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-2xl font-bold text-slate-900">Supported Enterprise Platforms</h2>
          <p class="text-slate-600 text-xs mt-2">Discover sovereign institutional frameworks connected to ${BRAND_CONFIG.poweredBy}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-enterprise-blue transition">
            <div class="w-10 h-10 rounded-lg bg-blue-50 text-enterprise-blue flex items-center justify-center font-bold text-lg mb-4">🎓</div>
            <h3 class="font-bold text-slate-900 text-base">Education ERP Platform</h3>
            <p class="text-xs text-slate-600 mt-2 mb-4">Campus management, student admissions, academic grading, and degree verification ledgers.</p>
            <button onclick="navigate('/login')" class="text-xs font-bold text-enterprise-blue hover:underline">Access Solution &rarr;</button>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-enterprise-blue transition">
            <div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">🏛️</div>
            <h3 class="font-bold text-slate-900 text-base">Government ERP Platform</h3>
            <p class="text-xs text-slate-600 mt-2 mb-4">Citizen registry, civil records, public document audit trails, and departmental workflow governance.</p>
            <button onclick="navigate('/login')" class="text-xs font-bold text-enterprise-blue hover:underline">Access Solution &rarr;</button>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-enterprise-blue transition">
            <div class="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg mb-4">🏥</div>
            <h3 class="font-bold text-slate-900 text-base">Healthcare ERP Platform</h3>
            <p class="text-xs text-slate-600 mt-2 mb-4">Hospital management, clinical logs, patient privacy isolation, and medical inventory nodes.</p>
            <button onclick="navigate('/login')" class="text-xs font-bold text-enterprise-blue hover:underline">Access Solution &rarr;</button>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-enterprise-blue transition">
            <div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">💳</div>
            <h3 class="font-bold text-slate-900 text-base">Finance & FAAP Treasury</h3>
            <p class="text-xs text-slate-600 mt-2 mb-4">Multi-currency accounting ledger, automated vendor settlements, and state treasury reconciliation.</p>
            <button onclick="navigate('/login')" class="text-xs font-bold text-enterprise-blue hover:underline">Access Solution &rarr;</button>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-enterprise-blue transition">
            <div class="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg mb-4">🌱</div>
            <h3 class="font-bold text-slate-900 text-base">Agriculture ERP Platform</h3>
            <p class="text-xs text-slate-600 mt-2 mb-4">Cooperative yield tracking, commodity shipping ledgers, and rural extension service hubs.</p>
            <button onclick="navigate('/login')" class="text-xs font-bold text-enterprise-blue hover:underline">Access Solution &rarr;</button>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-enterprise-blue transition">
            <div class="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg mb-4">🤖</div>
            <h3 class="font-bold text-slate-900 text-base">JUMO AI Gateway</h3>
            <p class="text-xs text-slate-600 mt-2 mb-4">Enterprise intelligent assistant, synthetic document verification, and policy auditing engines.</p>
            <button onclick="navigate('/login')" class="text-xs font-bold text-enterprise-blue hover:underline">Access Solution &rarr;</button>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    ${getEnterpriseFooterHtml()}
  `;
};

/**
 * Enterprise Login Page Template (/login)
 */
export const loginTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "lg", textColor: "dark" });

  app.innerHTML = `
    <div class="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <!-- Top header link -->
      <header class="p-6 border-b border-slate-200 bg-white">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="cursor-pointer" onclick="navigate('/')">
            ${logoHtml}
          </div>
          <button onclick="navigate('/')" class="text-xs font-bold text-slate-600 hover:text-enterprise-blue transition flex items-center gap-1">
            &larr; Back to Public Portal
          </button>
        </div>
      </header>

      <!-- Center Auth Box -->
      <div class="flex-1 flex items-center justify-center p-6">
        <div class="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10 space-y-6">
          <div class="text-center space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-enterprise-blue rounded-full text-[11px] font-bold font-mono uppercase">
              <span>🔐 Enterprise Identity Gateway</span>
            </div>
            <h2 class="text-2xl font-extrabold text-slate-900">Sign In to JUMO Platform</h2>
            <p class="text-xs text-slate-500">Access your organization, personal gateway, and enterprise services</p>
          </div>

          ${state.authError ? `
            <div class="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
              ⚠️ ${state.authError}
            </div>
          ` : ''}

          <form onsubmit="handleLoginSubmit(event)" class="space-y-5 text-xs font-semibold">
            <div>
              <label class="block text-slate-700 uppercase tracking-wider mb-2">Enterprise Email / Signature</label>
              <input type="email" id="login-email" value="${state.loginEmail || 'okwiijuliusmoses@gmail.com'}" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-enterprise-blue text-sm bg-slate-50 font-bold text-slate-900">
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-slate-700 uppercase tracking-wider">Access Credential</label>
                <a href="#" onclick="alert('Recovery instructions sent to registered administrator email.'); return false;" class="text-[11px] text-enterprise-blue hover:underline">Forgot access?</a>
              </div>
              <input type="password" id="login-password" value="pass123" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-enterprise-blue text-sm bg-slate-50 font-bold text-slate-900">
            </div>

            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center gap-3">
              <span class="text-lg">🛡️</span>
              <div>
                <p class="font-bold text-slate-800">Zero-Trust Identity Verification</p>
                <p class="text-[10px] text-slate-500">Protected by AEGIS Cryptographic Ring Access</p>
              </div>
            </div>

            <button type="submit" class="w-full py-4 rounded-xl bg-enterprise-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer">
              Sign In to Personal Gateway &rarr;
            </button>
          </form>

          <div class="pt-4 border-t border-slate-100 text-center space-y-2">
            <p class="text-xs text-slate-500">Need a digital environment for your institution?</p>
            <button onclick="navigate('/register')" class="text-xs font-bold text-enterprise-blue hover:underline">Register New Institution &rarr;</button>
          </div>
        </div>
      </div>

      <!-- Footer branding -->
      <footer class="py-4 text-center text-xs text-slate-500 bg-white border-t border-slate-200 font-mono">
        ${BRAND_CONFIG.ownership} &bull; ${BRAND_CONFIG.poweredBy}
      </footer>
    </div>
  `;
};

/**
 * Enterprise Register Page Template (/register)
 */
export const registerTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "lg", textColor: "dark" });

  app.innerHTML = `
    <div class="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <header class="p-6 border-b border-slate-200 bg-white">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="cursor-pointer" onclick="navigate('/')">
            ${logoHtml}
          </div>
          <button onclick="navigate('/')" class="text-xs font-bold text-slate-600 hover:text-enterprise-blue transition">
            &larr; Back to Public Portal
          </button>
        </div>
      </header>

      <div class="flex-1 flex items-center justify-center p-6">
        <div class="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10 space-y-6">
          <div class="space-y-1">
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-blue-50 text-enterprise-blue rounded">Institution Onboarding</span>
            <h2 class="text-2xl font-extrabold text-slate-900 mt-2">Register Authorized Institution</h2>
            <p class="text-xs text-slate-500">Provision a dedicated digital operating environment under sovereign governance</p>
          </div>

          <form onsubmit="handleRegisterSubmit(event)" class="space-y-5 text-xs font-semibold">
            <div>
              <label class="block text-slate-700 uppercase tracking-wider mb-2">Institution / Organization Name</label>
              <input type="text" id="reg-name" required placeholder="e.g. University of Kampala, Sovereign Treasury, Health Network" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-enterprise-blue text-sm bg-slate-50 font-bold text-slate-900">
            </div>

            <div>
              <label class="block text-slate-700 uppercase tracking-wider mb-2">Platform Domain Domain Category</label>
              <select id="reg-type" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-enterprise-blue text-sm bg-slate-50 font-bold text-slate-900">
                <option value="Education ERP">Education ERP (University / Campus)</option>
                <option value="Government ERP">Government ERP (State Department / Ministry)</option>
                <option value="Healthcare ERP">Healthcare ERP (Hospital / Clinical Network)</option>
                <option value="Finance & Treasury">Finance & FAAP Treasury Ledger</option>
                <option value="Agriculture ERP">Agriculture & Commodity Cooperative</option>
                <option value="Enterprise Enterprise">Enterprise Corporate System</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-700 uppercase tracking-wider mb-2">Administrator Signature Email</label>
              <input type="email" id="reg-email" value="okwiijuliusmoses@gmail.com" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-enterprise-blue text-sm bg-slate-50 font-bold text-slate-900">
            </div>

            <button type="submit" class="w-full py-4 rounded-xl bg-enterprise-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer">
              Provision Institution Environment &rarr;
            </button>
          </form>
        </div>
      </div>

      <footer class="py-4 text-center text-xs text-slate-500 bg-white border-t border-slate-200 font-mono">
        ${BRAND_CONFIG.ownership} &bull; ${BRAND_CONFIG.poweredBy}
      </footer>
    </div>
  `;
};

/**
 * THE POST PUBLIC LOGIN ENTERPRISE GATEWAY TEMPLATE (/gateway)
 * Modeled after the exact account hub mockup & specification.
 */
export const gatewayTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "md", textColor: "dark" });
  const user = state.session?.user || {
    name: "Julius Moses Okwii",
    email: "okwiijuliusmoses@gmail.com",
    role: "Enterprise Administrator",
    isAdmin: true,
    status: "Verified Enterprise Account"
  };

  const orgs = state.organizations || [
    { id: "org-1", name: "University of Kampala", role: "Administrator", status: "Active", badge: "Education ERP", color: "blue" },
    { id: "org-2", name: "JUMO Health Network", role: "Staff", status: "Active", badge: "Healthcare ERP", color: "emerald" },
    { id: "org-3", name: "Africa's Business Solutions Ltd", role: "Manager", status: "Pending", badge: "Corporate", color: "amber" }
  ];

  const notifications = state.notifications || [
    { title: "Invitation to Join", desc: "University of Kampala has invited you as Administrator.", time: "10 mins ago" },
    { title: "System Maintenance", desc: "Scheduled maintenance for East Africa node on 20 May 2026.", time: "1 hr ago" },
    { title: "New Platform Update", desc: "JUMO HRM v2.2 released with automated attendance logging.", time: "3 hrs ago" },
    { title: "Marketplace Update", desc: "New FAAP Treasury reconciliation apps added.", time: "1 day ago" }
  ];

  app.innerHTML = `
    <div class="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased font-sans">
      <!-- SIDEBAR OVERLAY & COLLAPSIBLE DRAWER -->
      <div id="sidebar-overlay" onclick="toggleGatewaySidebar()" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[90] hidden"></div>
      
      <div id="gateway-sidebar" class="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-[100] transform -translate-x-full transition-transform duration-300 flex flex-col">
        <div class="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-slate-50">
          <span class="font-bold text-xs text-slate-900 tracking-wider uppercase">JUMO Gateway Navigation</span>
          <button onclick="toggleGatewaySidebar()" class="text-slate-400 hover:text-slate-600 transition p-1.5 rounded hover:bg-slate-200">
            ✕
          </button>
        </div>
        <div class="flex-1 overflow-y-auto py-6 px-4 space-y-1 text-xs font-semibold">
          <div class="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Personal Account</div>
          <button onclick="navigate('/gateway'); toggleGatewaySidebar();" class="w-full text-left px-3 py-2 text-slate-900 bg-blue-50 text-enterprise-blue rounded-lg font-bold">🏠 Home Gateway</button>
          <button onclick="alert('Profile details loaded'); toggleGatewaySidebar();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">👤 My Profile</button>
          <button onclick="navigate('/organizations'); toggleGatewaySidebar();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">🏢 My Organizations</button>

          <div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Institutional Actions</div>
          <button onclick="openRegisterModal(); toggleGatewaySidebar();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">+ Register Institution</button>
          <button onclick="openJoinModal(); toggleGatewaySidebar();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">🔑 Join Organization</button>

          <div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Services & Solutions</div>
          <button onclick="alert('Navigating to Marketplace'); toggleGatewaySidebar();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">🛍️ Marketplace</button>
          <button onclick="alert('Navigating to Documentation'); toggleGatewaySidebar();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">📖 Documentation</button>
          <button onclick="alert('Navigating to Downloads'); toggleGatewaySidebar();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">📥 Downloads</button>
          <button onclick="alert('Navigating to Support Centre'); toggleGatewaySidebar();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">🎧 Support Centre</button>

          <div class="px-3 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Preferences</div>
          <button onclick="alert('Settings modal opened'); toggleGatewaySidebar();" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">⚙️ Settings</button>
          <button onclick="handleLogout()" class="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg font-bold">🚪 Sign Out</button>
        </div>
      </div>

      <!-- GLOBAL HEADER -->
      <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div class="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button onclick="toggleGatewaySidebar()" class="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div class="cursor-pointer" onclick="navigate('/gateway')">
              ${logoHtml}
            </div>
          </div>

          <nav class="hidden lg:flex items-center space-x-6 text-xs font-bold tracking-wider text-slate-600">
            <button onclick="navigate('/gateway')" class="text-enterprise-blue font-bold">Home</button>
            <button onclick="alert('Browsing Enterprise Platforms')" class="hover:text-enterprise-blue transition">Enterprise Platforms</button>
            <button onclick="alert('Browsing Products')" class="hover:text-enterprise-blue transition">Products</button>
            <button onclick="alert('Browsing Marketplace')" class="hover:text-enterprise-blue transition">Marketplace</button>
            <button onclick="alert('Browsing Resources')" class="hover:text-enterprise-blue transition">Resources</button>
            <button onclick="alert('Opening Support Centre')" class="hover:text-enterprise-blue transition">Support</button>
          </nav>

          <div class="flex items-center space-x-4">
            <!-- Search Bar -->
            <div class="hidden sm:flex items-center bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 text-xs">
              <span class="text-slate-400 mr-2">🔍</span>
              <input type="text" placeholder="Global search..." class="bg-transparent border-none outline-none text-xs w-32 focus:w-48 transition-all font-semibold text-slate-800">
            </div>

            <!-- Notification Bell -->
            <div class="relative">
              <button onclick="toggleNotificationsMenu()" class="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 transition relative">
                🔔
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">4</span>
              </button>

              <div id="notifications-menu" class="hidden absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-50 text-xs">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span class="font-bold text-slate-900">Notifications</span>
                  <button onclick="toggleNotificationsMenu()" class="text-[10px] text-enterprise-blue hover:underline">Mark all read</button>
                </div>
                <div class="space-y-3 max-h-60 overflow-y-auto">
                  ${notifications.map(n => `
                    <div class="p-2 rounded bg-slate-50 border border-slate-100">
                      <p class="font-bold text-slate-900">${n.title}</p>
                      <p class="text-slate-600 text-[11px] mt-0.5">${n.desc}</p>
                      <span class="text-[9px] text-slate-400 font-mono mt-1 block">${n.time}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- User Profile Dropdown -->
            <div class="relative">
              <button onclick="toggleProfileDropdown()" class="flex items-center space-x-2 p-1.5 border border-slate-200 rounded-full hover:bg-slate-50 transition cursor-pointer">
                <div class="w-8 h-8 rounded-full bg-enterprise-blue text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  ${user.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <span class="hidden md:inline font-bold text-xs text-slate-800">${user.name}</span>
                <span class="text-slate-400 text-xs">▼</span>
              </button>

              <div id="profile-dropdown" class="hidden absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-xs font-semibold">
                <div class="p-3 bg-slate-50 rounded-lg border border-slate-100 mb-2">
                  <p class="font-bold text-slate-900 text-sm">${user.name}</p>
                  <p class="text-slate-500 text-[11px] font-mono truncate">${user.email}</p>
                  <span class="mt-2 inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ${user.status}
                  </span>
                </div>

                <div class="space-y-1 divide-y divide-slate-100">
                  <div class="pt-1">
                    <button onclick="alert('Viewing My Profile')" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">👤 My Profile</button>
                    <button onclick="navigate('/organizations')" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">🏢 My Organizations</button>
                    <button onclick="alert('Opening Account Settings')" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">⚙️ Account Settings</button>
                    <button onclick="alert('Privacy & Security Settings')" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">🔒 Privacy & Security</button>
                    <button onclick="alert('Language: Global English')" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">🌐 Language</button>
                    <button onclick="alert('Help Centre')" class="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">❓ Help Centre</button>
                  </div>

                  <!-- Privilege Protected Access option -->
                  ${user.isAdmin ? `
                    <div class="pt-2">
                      <button onclick="navigate('/control-center'); toggleProfileDropdown();" class="w-full text-left px-3 py-2 bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 rounded-md flex items-center justify-between">
                        <span>🛠️ Administrative Access</span>
                        <span class="text-[9px] font-mono bg-indigo-200 px-1.5 py-0.5 rounded text-indigo-900">ADMIN</span>
                      </button>
                    </div>
                  ` : ''}

                  <div class="pt-2">
                    <button onclick="handleLogout()" class="w-full text-left px-3 py-2 text-rose-600 font-bold hover:bg-rose-50 rounded-md">🚪 Sign Out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- MAIN GATEWAY CONTAINER -->
      <main class="flex-1 max-w-[1440px] w-full mx-auto px-6 py-8 space-y-8">
        <!-- WELCOME AREA WITH ENTERPRISE IMAGE BANNER -->
        <section class="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs relative overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8 space-y-3 z-10">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-enterprise-blue rounded-full text-xs font-bold font-mono">
                <span class="w-2 h-2 rounded-full bg-enterprise-blue animate-pulse"></span>
                <span>AUTHENTICATED ENTERPRISE GATEWAY</span>
              </div>
              <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, ${user.name}
              </h1>
              <p class="text-slate-600 text-sm max-w-2xl leading-relaxed">
                Manage your organizations, access enterprise platforms, or continue to your digital workspace environment.
              </p>
            </div>
            <div class="lg:col-span-4 flex items-center justify-end z-10">
              <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-xs">
                <div class="w-12 h-12 rounded-full bg-enterprise-blue text-white font-extrabold flex items-center justify-center text-lg shadow-sm">
                  ${user.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div class="text-xs">
                  <p class="font-bold text-slate-900">${user.name}</p>
                  <p class="text-slate-500 font-mono text-[11px]">${user.email}</p>
                  <span class="inline-block mt-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ Verified Account
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- PRIMARY WORKSPACE ACTIONS (3 EQUAL CARDS) -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Card 1: Register Institution -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-enterprise-blue transition flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-xl bg-blue-50 text-enterprise-blue flex items-center justify-center text-xl font-bold">
                🏛️
              </div>
              <h3 class="text-lg font-bold text-slate-900">Register an Institution</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Create a new digital operating environment for an authorized institution, government department, or enterprise.
              </p>
            </div>
            <button onclick="openRegisterModal()" class="w-full py-3 bg-enterprise-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer">
              <span>Register Institution</span>
              <span>&rarr;</span>
            </button>
          </div>

          <!-- Card 2: Join Organization -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-emerald-500 transition flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
                👥
              </div>
              <h3 class="text-lg font-bold text-slate-900">Join an Existing Institution</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Use an invitation link or organization code provided by your administrator to join an existing environment.
              </p>
            </div>
            <button onclick="openJoinModal()" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer">
              <span>Join Organization</span>
              <span>&rarr;</span>
            </button>
          </div>

          <!-- Card 3: Explore Solutions -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-indigo-500 transition flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">
                🚀
              </div>
              <h3 class="text-lg font-bold text-slate-900">Explore Enterprise Platforms</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Browse available digital solutions, AI services, and enterprise modules before joining or creating an environment.
              </p>
            </div>
            <button onclick="alert('Opening Enterprise Solutions Directory')" class="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer">
              <span>Explore Solutions</span>
              <span>&rarr;</span>
            </button>
          </div>
        </section>

        <!-- MY ORGANIZATIONS & NOTIFICATIONS SPLIT SECTION -->
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left: My Organizations -->
          <div class="lg:col-span-8 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-slate-900">My Organizations</h2>
                <p class="text-xs text-slate-500">Active institutional environments assigned to your account</p>
              </div>
              <button onclick="openRegisterModal()" class="text-xs font-bold text-enterprise-blue hover:underline">+ Add Organization</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              ${orgs.map(org => `
                <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-enterprise-blue border border-blue-100">
                        ${org.badge}
                      </span>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded ${org.status==='Active'?'bg-emerald-50 text-emerald-700':'bg-amber-50 text-amber-700'}">
                        ● ${org.status}
                      </span>
                    </div>
                    <h4 class="font-bold text-slate-900 text-sm">${org.name}</h4>
                    <p class="text-[11px] text-slate-500 font-medium mt-1">Role: <span class="font-bold text-slate-700">${org.role}</span></p>
                  </div>

                  <button onclick="navigate('/workspace', { orgId: '${org.id}' })" class="w-full py-2.5 bg-enterprise-blue hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition shadow-xs text-center">
                    Open Workspace
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right: Notifications Panel -->
          <div class="lg:col-span-4 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-slate-900">Notifications</h2>
              <span class="text-xs text-slate-500">Recent Updates</span>
            </div>

            <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-xs divide-y divide-slate-100 text-xs space-y-3">
              ${notifications.map(n => `
                <div class="pt-3 first:pt-0 space-y-1">
                  <div class="flex items-center justify-between">
                    <p class="font-bold text-slate-900">${n.title}</p>
                    <span class="text-[9px] text-slate-400 font-mono">${n.time}</span>
                  </div>
                  <p class="text-[11px] text-slate-600 leading-relaxed">${n.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- QUICK SERVICES GRID -->
        <section class="space-y-4">
          <h2 class="text-xl font-bold text-slate-900">Quick Access & Services</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-semibold">
            <button onclick="alert('Opening Marketplace')" class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-enterprise-blue transition text-center space-y-2">
              <span class="text-2xl block">🛒</span>
              <span class="block text-slate-900 font-bold">Marketplace</span>
              <span class="block text-[10px] text-slate-500 font-normal">Browse Apps</span>
            </button>
            <button onclick="alert('Opening Support Centre')" class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-enterprise-blue transition text-center space-y-2">
              <span class="text-2xl block">🎧</span>
              <span class="block text-slate-900 font-bold">Support Centre</span>
              <span class="block text-[10px] text-slate-500 font-normal">Get Immediate Help</span>
            </button>
            <button onclick="alert('Opening Documentation')" class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-enterprise-blue transition text-center space-y-2">
              <span class="text-2xl block">📖</span>
              <span class="block text-slate-900 font-bold">Documentation</span>
              <span class="block text-[10px] text-slate-500 font-normal">Guides & Reference</span>
            </button>
            <button onclick="alert('Opening Downloads')" class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-enterprise-blue transition text-center space-y-2">
              <span class="text-2xl block">📥</span>
              <span class="block text-slate-900 font-bold">Downloads</span>
              <span class="block text-[10px] text-slate-500 font-normal">SDKs & Guides</span>
            </button>
            <button onclick="alert('Opening Training Portal')" class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-enterprise-blue transition text-center space-y-2">
              <span class="text-2xl block">🎓</span>
              <span class="block text-slate-900 font-bold">Training</span>
              <span class="block text-[10px] text-slate-500 font-normal">Learn Platform</span>
            </button>
            <button onclick="alert('Checking System Status')" class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-enterprise-blue transition text-center space-y-2">
              <span class="text-2xl block">🟢</span>
              <span class="block text-slate-900 font-bold">System Status</span>
              <span class="block text-[10px] text-slate-500 font-normal">All Systems OK</span>
            </button>
          </div>
        </section>
      </main>

      <!-- FLOATING JUMO ASSISTANT -->
      <div class="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        <div id="jumo-assistant-chat" class="hidden w-80 h-96 bg-white rounded-2xl shadow-2xl border border-slate-200 mb-4 flex flex-col overflow-hidden animate-fade-in">
          <div class="bg-enterprise-blue p-4 flex items-center justify-between text-white shadow-xs">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">J</div>
              <div>
                <h4 class="font-bold text-xs">JUMO Assistant</h4>
                <p class="text-[9px] text-blue-200">Digital Front Desk</p>
              </div>
            </div>
            <button onclick="toggleChat()" class="text-blue-200 hover:text-white">✕</button>
          </div>
          <div class="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-3 text-xs">
            <div class="bg-white border border-slate-200 p-3 rounded-xl shadow-xs text-slate-700 leading-relaxed">
              Hello ${user.name}! How can I assist you with your organizations or platforms today?
            </div>
            <div class="flex flex-col gap-1.5">
              <button onclick="alert('Guidance: Click Register Institution above to start.')" class="p-2 text-left bg-white border border-slate-200 rounded-lg hover:border-enterprise-blue text-[11px] text-slate-700 font-medium">How do I register an institution?</button>
              <button onclick="alert('Guidance: Click Join Organization to enter invitation code.')" class="p-2 text-left bg-white border border-slate-200 rounded-lg hover:border-enterprise-blue text-[11px] text-slate-700 font-medium">How to join an organization?</button>
            </div>
          </div>
          <div class="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input type="text" placeholder="Type your question..." class="flex-1 bg-slate-100 border border-slate-200 rounded-full px-3 py-2 text-xs focus:ring-1 focus:ring-enterprise-blue outline-none">
            <button onclick="alert('Query sent to JUMO AI Assistant')" class="w-8 h-8 rounded-full bg-enterprise-blue text-white flex items-center justify-center font-bold">
              ➔
            </button>
          </div>
        </div>
        
        <button onclick="toggleChat()" class="w-14 h-14 bg-enterprise-blue text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center text-xl cursor-pointer">
          💬
        </button>
      </div>

      <!-- MODALS FOR REGISTER & JOIN -->
      <div id="join-modal" class="hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[150] flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="font-bold text-slate-900 text-base">Join an Organization</h3>
            <button onclick="closeJoinModal()" class="text-slate-400 hover:text-slate-600">✕</button>
          </div>
          <form onsubmit="handleJoinSubmit(event)" class="space-y-4 text-xs font-semibold">
            <div>
              <label class="block text-slate-700 mb-1">Organization Invitation Code</label>
              <input type="text" id="join-code" required placeholder="e.g. ORG-UK-8890" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-enterprise-blue">
            </div>
            <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition">Submit Join Request</button>
          </form>
        </div>
      </div>

      <!-- ENTERPRISE FOOTER -->
      ${getEnterpriseFooterHtml()}
    </div>
  `;
};

/**
 * Shared Enterprise Footer Component
 */
function getEnterpriseFooterHtml() {
  const logoHtmlLight = getOfficialLogoHtml({ size: "md", textColor: "light" });

  return `
    <!-- Top Security Capability Ribbon -->
    <div class="bg-slate-900 border-t border-slate-800 py-6 px-6 text-slate-300">
      <div class="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-xs font-semibold">
        <div class="p-2 flex flex-col items-center space-y-1">
          <span class="text-lg">🛡️</span>
          <span class="font-bold text-white">Secure</span>
          <span class="text-[10px] text-slate-400 font-normal">Enterprise-Grade Security</span>
        </div>
        <div class="p-2 flex flex-col items-center space-y-1">
          <span class="text-lg">🏛️</span>
          <span class="font-bold text-white">Sovereign</span>
          <span class="text-[10px] text-slate-400 font-normal">Data Sovereignty & Compliance</span>
        </div>
        <div class="p-2 flex flex-col items-center space-y-1">
          <span class="text-lg">⚡</span>
          <span class="font-bold text-white">Scalable</span>
          <span class="text-[10px] text-slate-400 font-normal">Built for Growth & Performance</span>
        </div>
        <div class="p-2 flex flex-col items-center space-y-1">
          <span class="text-lg">🌐</span>
          <span class="font-bold text-white">Integrated</span>
          <span class="text-[10px] text-slate-400 font-normal">United Platforms & Services</span>
        </div>
        <div class="p-2 flex flex-col items-center space-y-1 col-span-2 md:col-span-1">
          <span class="text-lg">🤖</span>
          <span class="font-bold text-white">Intelligent</span>
          <span class="text-[10px] text-slate-400 font-normal">AI-Powered Operations</span>
        </div>
      </div>
    </div>

    <!-- Main Footer Body -->
    <footer class="bg-slate-950 text-slate-300 py-12 px-6 border-t border-slate-800 text-xs font-sans">
      <div class="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        <!-- Brand overview -->
        <div class="md:col-span-4 space-y-4">
          <div>
            ${logoHtmlLight}
          </div>
          <p class="text-slate-400 text-xs leading-relaxed">
            ${BRAND_CONFIG.platformName} empowers institutions, state bodies, and digital enterprises across Africa and beyond with sovereign security, unified operations, and AI intelligence.
          </p>
          <div class="pt-2">
            <span class="text-[11px] font-mono text-amber-400 font-bold">One Platform. Infinite Possibilities.</span>
          </div>
        </div>

        <!-- Get in Touch & Public Communication -->
        <div class="md:col-span-3 space-y-3">
          <h4 class="font-bold text-white text-sm uppercase tracking-wider font-mono">Public Communication</h4>
          <div class="space-y-2 text-slate-400 text-xs">
            <p><strong class="text-white">General:</strong> <a href="mailto:${BRAND_CONFIG.emails.support}" class="hover:text-white transition font-mono">${BRAND_CONFIG.emails.support}</a></p>
            <p><strong class="text-white">Enterprise:</strong> <a href="mailto:${BRAND_CONFIG.emails.ueos}" class="hover:text-white transition font-mono">${BRAND_CONFIG.emails.ueos}</a></p>
            <p><strong class="text-white">Security Contact:</strong> <a href="mailto:${BRAND_CONFIG.emails.security}" class="hover:text-white transition font-mono">${BRAND_CONFIG.emails.security}</a></p>
            <p><strong class="text-white">Legal & Compliance:</strong> <a href="mailto:${BRAND_CONFIG.emails.legal}" class="hover:text-white transition font-mono">${BRAND_CONFIG.emails.legal}</a></p>
            <p><strong class="text-white">Partnerships:</strong> <a href="mailto:${BRAND_CONFIG.emails.partnerships}" class="hover:text-white transition font-mono">${BRAND_CONFIG.emails.partnerships}</a></p>
            <p>📞 <a href="tel:${BRAND_CONFIG.telephones.mobile}" class="hover:text-white transition">${BRAND_CONFIG.telephones.mobile}</a></p>
            <p>💬 <a href="https://wa.me/256752964856" target="_blank" class="hover:text-white transition">${BRAND_CONFIG.telephones.whatsapp} (WhatsApp)</a></p>
          </div>
        </div>

        <!-- Office Locations -->
        <div class="md:col-span-3 space-y-3">
          <h4 class="font-bold text-white text-sm uppercase tracking-wider font-mono">Office Locations</h4>
          <div class="space-y-2 text-slate-400 text-xs">
            <p><strong class="text-white">Head Office:</strong> ${BRAND_CONFIG.officeLocations.headOffice}</p>
            <p><strong class="text-white">Regional:</strong> ${BRAND_CONFIG.officeLocations.regionalOffices.join(", ")}</p>
            <p><strong class="text-white">Home Office:</strong> ${BRAND_CONFIG.officeLocations.homeOffice}</p>
            <p><strong class="text-white">Region:</strong> ${BRAND_CONFIG.officeLocations.region}, ${BRAND_CONFIG.officeLocations.continent}</p>
          </div>
        </div>

        <!-- Social Connections -->
        <div class="md:col-span-2 space-y-3">
          <h4 class="font-bold text-white text-sm uppercase tracking-wider font-mono">Connect With Us</h4>
          <div class="flex flex-wrap gap-2 text-slate-400">
            ${BRAND_CONFIG.socialLinks.map(s => `
              <a href="${s.url}" target="_blank" title="${s.name}" class="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-enterprise-blue hover:text-white hover:border-enterprise-blue transition text-[11px] font-medium">
                ${s.name}
              </a>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Bottom Copyright Bar -->
      <div class="max-w-[1440px] mx-auto pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-slate-500 font-mono text-[11px] gap-4">
        <div>
          - ${BRAND_CONFIG.ownership}
        </div>
        <div>
          Powered by ${BRAND_CONFIG.poweredBy} &bull; ${BRAND_CONFIG.fullSystemName}
        </div>
      </div>
    </footer>
  `;
}
