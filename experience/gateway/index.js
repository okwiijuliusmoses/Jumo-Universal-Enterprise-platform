import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";

/**
 * Public Homepage Template
 */
export const publicTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "md", textColor: "light" });
  
  app.innerHTML = `
<div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
    <!-- Public Sidebar Overlay -->
    <div id="public-sidebar-overlay" onclick="togglePublicSidebar()" class="fixed inset-0 bg-slate-900/60 z-[60] hidden backdrop-blur-sm transition-opacity"></div>
    
    <!-- Public Sidebar -->
    <div id="public-sidebar" class="fixed top-0 left-0 bottom-0 w-80 bg-slate-950 z-[70] -translate-x-full transition-transform duration-300 flex flex-col border-r border-slate-800">
        <div class="h-20 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900">
            ${logoHtml}
            <button onclick="togglePublicSidebar()" class="text-slate-400 hover:text-white cursor-pointer transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div class="flex-1 overflow-y-auto py-6 px-4 space-y-8">
            <div>
                <div class="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3 px-3">Home</div>
                <button onclick="navigate('/')" class="w-full text-left px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Start Page</button>
            </div>
            <div>
                <div class="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3 px-3">Platform</div>
                <div class="space-y-1">
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">JUMO UEOS Overview</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Architecture</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Security</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">AI Platform</button>
                </div>
            </div>
            <div>
                <div class="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3 px-3">Enterprise Solutions</div>
                <div class="space-y-1">
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Education Platforms</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Government Platforms</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Healthcare Platforms</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Finance & Treasury</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Agriculture Platforms</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Enterprise Applications</button>
                </div>
            </div>
            <div>
                <div class="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3 px-3">Digital Services</div>
                <div class="space-y-1">
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Digital Identity</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Document Verification</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Workflow Services</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Payment Services</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Analytics Services</button>
                </div>
            </div>
            <div>
                <div class="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3 px-3">Account Services</div>
                <div class="space-y-1">
                    <button onclick="navigate('/register')" class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Individual Registration</button>
                    <button onclick="navigate('/register')" class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Institution Registration</button>
                    <button onclick="navigate('/login')" class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Sign In</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Forgot Password</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Account Recovery</button>
                    <button onclick="navigate('/contact')" class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Support Centre</button>
                </div>
            </div>
            <div>
                <div class="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3 px-3">Resources</div>
                <div class="space-y-1">
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Documentation</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">News</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Notices</button>
                    <button class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">FAQs</button>
                    <button onclick="navigate('/contact')" class="w-full text-left px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer">Contact</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Header -->
    <header class="bg-enterprise-blue border-b border-blue-800 sticky top-0 z-50 shadow-md">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <button onclick="togglePublicSidebar()" class="lg:hidden text-white hover:text-blue-200 transition cursor-pointer">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <div class="cursor-pointer" onclick="navigate('/')">
                  ${logoHtml}
                </div>
            </div>
            <nav class="hidden lg:flex items-center gap-6 text-sm font-semibold text-blue-100">
                <a href="#" class="hover:text-white transition">Platform</a>
                <a href="#" class="hover:text-white transition">Solutions</a>
                <a href="#" class="hover:text-white transition">Digital Services</a>
                <a href="#" class="hover:text-white transition">Institutions</a>
                <a href="#" class="hover:text-white transition">Resources</a>
                <a href="#" class="hover:text-white transition">Security</a>
                <a href="#" class="hover:text-white transition">Partners</a>
                <a href="#" onclick="navigate('/contact')" class="hover:text-white transition">Contact</a>
            </nav>
            <div class="flex items-center gap-3">
                <button onclick="navigate('/login')" class="text-sm font-bold text-white hover:text-blue-200 transition cursor-pointer mr-2">Sign In</button>
                <button onclick="navigate('/register')" class="text-xs font-bold uppercase px-5 py-2.5 rounded-lg bg-white text-enterprise-blue hover:bg-blue-50 transition shadow-sm cursor-pointer hidden sm:block">Create Account</button>
                <button class="text-white hover:text-blue-200 transition cursor-pointer hidden md:block" title="Language">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                </button>
                <button class="text-white hover:text-blue-200 transition cursor-pointer hidden md:block" title="Help">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </div>
        </div>
    </header>

    <main class="flex-1">
        <!-- Main Reception Hero Section -->
        <section class="bg-white py-20 px-6 border-b border-slate-200">
            <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="space-y-8">
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-enterprise-blue text-xs font-semibold tracking-widest uppercase font-mono">
                        <span class="w-2 h-2 rounded-full bg-enterprise-blue animate-pulse"></span>
                        Enterprise Operating Environment
                    </div>
                    <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        ${BRAND_CONFIG.platformName}
                    </h1>
                    <p class="text-lg text-slate-600 leading-relaxed max-w-xl">
                        The unified digital reception and workspace environment connecting institutions, enterprises, state bodies and digital services under sovereign security governance.
                    </p>
                    <div class="flex flex-wrap gap-4 pt-4">
                        <button onclick="navigate('/register')" class="px-8 py-4 rounded-xl bg-enterprise-blue hover:bg-blue-700 font-bold text-sm text-white uppercase tracking-wider transition shadow-lg shadow-blue-500/30 cursor-pointer">Register Institution</button>
                        <button onclick="navigate('/login')" class="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 font-bold text-sm text-white uppercase tracking-wider transition shadow-lg cursor-pointer">Sign In To Platform</button>
                    </div>
                </div>
                <!-- Enterprise Visual Panel -->
                <div class="relative rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/90"></div>
                    <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                    <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                    
                    <div class="relative z-10 grid grid-cols-2 gap-4 h-full">
                        <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex flex-col justify-center">
                            <div class="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 text-lg">🏛️</div>
                            <h4 class="text-white font-bold text-sm">Connected Institutions</h4>
                            <p class="text-slate-400 text-xs mt-1">State bodies & enterprise tenants</p>
                        </div>
                        <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex flex-col justify-center">
                            <div class="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 text-lg">🧠</div>
                            <h4 class="text-white font-bold text-sm">AI Cognitive Nodes</h4>
                            <p class="text-slate-400 text-xs mt-1">JUMO AI Gateway integration</p>
                        </div>
                        <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex flex-col justify-center">
                            <div class="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 text-lg">🛡️</div>
                            <h4 class="text-white font-bold text-sm">AEGIS Security</h4>
                            <p class="text-slate-400 text-xs mt-1">Zero-trust cryptographic layer</p>
                        </div>
                        <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex flex-col justify-center">
                            <div class="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 text-lg">☁️</div>
                            <h4 class="text-white font-bold text-sm">Cloud Operating Env</h4>
                            <p class="text-slate-400 text-xs mt-1">Sovereign hybrid infrastructure</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Authentication Gateway Section -->
        <section class="bg-slate-50 py-16 px-6 border-b border-slate-200">
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <!-- Individual Users Card -->
                    <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-enterprise-blue hover:shadow-md transition">
                        <div class="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div class="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-enterprise-blue text-2xl border border-blue-100">👤</div>
                            <div>
                                <h3 class="text-xl font-bold text-slate-900">Individual Users</h3>
                                <p class="text-slate-500 text-sm mt-1">Citizens, Staff, and Personal Accounts</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onclick="navigate('/register')" class="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-enterprise-blue hover:bg-blue-50 transition cursor-pointer group">
                                <div class="font-bold text-slate-900 group-hover:text-enterprise-blue text-sm mb-1">Create Account</div>
                                <div class="text-xs text-slate-500">Register for a personal identity profile</div>
                            </button>
                            <button onclick="navigate('/login')" class="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-enterprise-blue hover:bg-blue-50 transition cursor-pointer group">
                                <div class="font-bold text-slate-900 group-hover:text-enterprise-blue text-sm mb-1">Sign In</div>
                                <div class="text-xs text-slate-500">Access your digital workspace</div>
                            </button>
                            <button onclick="alert('Navigating to password reset...')" class="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-enterprise-blue hover:bg-blue-50 transition cursor-pointer group">
                                <div class="font-bold text-slate-900 group-hover:text-enterprise-blue text-sm mb-1">Forgot Password</div>
                                <div class="text-xs text-slate-500">Reset your access credentials</div>
                            </button>
                            <button onclick="alert('Navigating to account recovery...')" class="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-enterprise-blue hover:bg-blue-50 transition cursor-pointer group">
                                <div class="font-bold text-slate-900 group-hover:text-enterprise-blue text-sm mb-1">Recover Account</div>
                                <div class="text-xs text-slate-500">Regain access to your profile</div>
                            </button>
                        </div>
                    </div>

                    <!-- Institutions Card -->
                    <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition">
                        <div class="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div class="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-2xl border border-emerald-100">🏛️</div>
                            <div>
                                <h3 class="text-xl font-bold text-slate-900">Institutions & Enterprises</h3>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-emerald-100 text-emerald-700">Official</span>
                                    <p class="text-slate-500 text-sm">Government, Corporate, Education</p>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onclick="navigate('/register')" class="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer group">
                                <div class="font-bold text-slate-900 group-hover:text-emerald-700 text-sm mb-1">Register Institution</div>
                                <div class="text-xs text-slate-500">Onboard a new enterprise tenant</div>
                            </button>
                            <button onclick="navigate('/login')" class="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer group">
                                <div class="font-bold text-slate-900 group-hover:text-emerald-700 text-sm mb-1">Institution Login</div>
                                <div class="text-xs text-slate-500">Access enterprise control center</div>
                            </button>
                            <button onclick="alert('Navigating to institution verification...')" class="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer group">
                                <div class="font-bold text-slate-900 group-hover:text-emerald-700 text-sm mb-1">Institution Verification</div>
                                <div class="text-xs text-slate-500">Submit official documentation</div>
                            </button>
                            <button onclick="alert('Navigating to admin setup...')" class="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer group">
                                <div class="font-bold text-slate-900 group-hover:text-emerald-700 text-sm mb-1">Administrator Setup</div>
                                <div class="text-xs text-slate-500">Configure core tenant settings</div>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- Security Trust Strip -->
        <div class="bg-slate-900 border-b border-slate-800 text-slate-300 py-6 px-6">
            <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16 text-xs font-semibold tracking-wider uppercase">
                <div class="flex items-center gap-2"><span class="text-emerald-400">🛡️</span> AEGIS Accountability Platform</div>
                <div class="flex items-center gap-2"><span class="text-blue-400">🔑</span> Cryptographic Verification</div>
                <div class="flex items-center gap-2"><span class="text-indigo-400">👤</span> Identity Governance</div>
                <div class="flex items-center gap-2"><span class="text-rose-400">🏛️</span> Sovereign Data Protection</div>
            </div>
        </div>

        <!-- Enterprise Information Hub -->
        <section class="bg-slate-50 py-20 px-6 border-b border-slate-200">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-extrabold text-slate-900">Enterprise Information Hub</h2>
                    <p class="text-slate-600 mt-3">Digital ecosystem announcements, platform showcases, and institutional updates.</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Video Showcase -->
                    <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div class="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h3 class="font-bold text-slate-800 text-sm flex items-center gap-2"><span class="text-rose-500">▶</span> JUMO Digital Showcase</h3>
                            <span class="text-[10px] font-mono text-slate-500 bg-slate-200 px-2 py-1 rounded">LIVE HUB</span>
                        </div>
                        <div class="aspect-video bg-slate-900 relative flex items-center justify-center group cursor-pointer">
                            <div class="absolute inset-0 bg-slate-800 bg-cover bg-center opacity-40 group-hover:opacity-50 transition"></div>
                            <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition z-10">
                                <div class="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                            </div>
                            <div class="absolute bottom-4 left-4 right-4 z-10">
                                <h4 class="text-white font-bold text-lg">Platform Demonstration: UEOS v4.1</h4>
                                <p class="text-slate-300 text-xs mt-1">Enterprise digital transformation ledgers and AI cognitive services</p>
                            </div>
                        </div>
                        <div class="p-4 bg-white grid grid-cols-2 gap-4">
                            <button class="text-left p-3 rounded-lg border border-slate-100 hover:border-enterprise-blue hover:bg-blue-50 transition cursor-pointer">
                                <div class="text-[10px] font-mono text-enterprise-blue font-bold mb-1">LATEST</div>
                                <div class="text-xs font-semibold text-slate-800">Institution Success Stories</div>
                            </button>
                            <button class="text-left p-3 rounded-lg border border-slate-100 hover:border-enterprise-blue hover:bg-blue-50 transition cursor-pointer">
                                <div class="text-[10px] font-mono text-purple-600 font-bold mb-1">INNOVATION</div>
                                <div class="text-xs font-semibold text-slate-800">AI Gateway Updates</div>
                            </button>
                        </div>
                    </div>
                    
                    <!-- News & Announcements -->
                    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
                        <h3 class="font-bold text-slate-900 mb-6 flex items-center gap-2">📰 News & Announcements</h3>
                        <div class="space-y-6 flex-1">
                            <div class="group cursor-pointer">
                                <div class="text-[10px] text-slate-500 font-mono mb-1">TODAY, 09:00 AM</div>
                                <h4 class="text-sm font-semibold text-slate-800 group-hover:text-enterprise-blue transition">New State Body Onboarding</h4>
                                <p class="text-xs text-slate-600 mt-1 line-clamp-2">The Ministry of Digital Transformation has completed their integration with ${BRAND_CONFIG.poweredBy}.</p>
                            </div>
                            <div class="group cursor-pointer">
                                <div class="text-[10px] text-slate-500 font-mono mb-1">YESTERDAY</div>
                                <h4 class="text-sm font-semibold text-slate-800 group-hover:text-enterprise-blue transition">AEGIS Security Update v2.4</h4>
                                <p class="text-xs text-slate-600 mt-1 line-clamp-2">Enhanced cryptographic ledgers deployed across all tenant domains.</p>
                            </div>
                            <div class="group cursor-pointer">
                                <div class="text-[10px] text-slate-500 font-mono mb-1">MAY 28, 2026</div>
                                <h4 class="text-sm font-semibold text-slate-800 group-hover:text-enterprise-blue transition">Digital Services Expansion</h4>
                                <p class="text-xs text-slate-600 mt-1 line-clamp-2">Three new enterprise modules added to the JUMO registry.</p>
                            </div>
                        </div>
                        <button class="w-full mt-4 py-2 text-xs font-bold text-enterprise-blue hover:bg-blue-50 rounded-lg transition border border-blue-100 cursor-pointer">View All Updates</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Enterprise Platforms Section -->
        <section class="py-20 px-6 bg-white border-b border-slate-200">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-extrabold text-slate-900">Explore JUMO Enterprise Platforms</h2>
                    <p class="text-slate-600 mt-3 max-w-2xl mx-auto">Future-ready registry architecture and domain solutions powered by ${BRAND_CONFIG.poweredBy}.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    ${[
                        { name: "Education ERP", icon: "🎓", color: "blue", desc: "Campus management, student admissions, academic grading, and degree verification ledgers." },
                        { name: "Government ERP", icon: "🏛️", color: "emerald", desc: "Citizen registry, civil records, public document audit trails, and workflow governance." },
                        { name: "Healthcare ERP", icon: "🏥", color: "indigo", desc: "Hospital management, clinical logs, patient privacy isolation, and medical inventory nodes." },
                        { name: "Finance & FAAP Treasury", icon: "💳", color: "amber", desc: "Multi-currency accounting ledger, automated vendor settlements, and state treasury." },
                        { name: "Agriculture ERP", icon: "🌱", color: "rose", desc: "Cooperative yield tracking, commodity shipping ledgers, and rural extension hubs." },
                        { name: "AI Platform", icon: "🤖", color: "purple", desc: "Enterprise intelligent assistant, synthetic document verification, and policy auditing engines." },
                        { name: "Recruitment Platform", icon: "👥", color: "cyan", desc: "Talent acquisition, background verification, and enterprise onboarding workflows." },
                        { name: "FINTECH", icon: "💸", color: "teal", desc: "Digital payment gateways, cross-border settlements, and financial compliance." },
                        { name: "AEGIS", icon: "🛡️", color: "slate", desc: "Zero-trust security, cryptographic identity governance, and compliance ledgers." },
                        { name: "Research & Innovation", icon: "🔬", color: "fuchsia", desc: "R&D collaboration, patent registries, and academic grant management." },
                        { name: "App Builder Platform", icon: "⚡", color: "orange", desc: "Low-code sovereign application deployment and enterprise customization." }
                    ].map(p => `
                        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-enterprise-blue hover:shadow-md transition flex flex-col">
                            <div class="w-12 h-12 rounded-xl bg-${p.color}-50 text-${p.color}-600 flex items-center justify-center font-bold text-2xl mb-4 border border-${p.color}-100">
                                ${p.icon}
                            </div>
                            <h3 class="font-bold text-slate-900 text-base">${p.name}</h3>
                            <p class="text-xs text-slate-600 mt-2 mb-6 flex-1 leading-relaxed">${p.desc}</p>
                            <div class="flex items-center justify-between mt-auto">
                                <span class="text-[9px] font-mono text-slate-400 uppercase">UEOS Governed</span>
                                <button onclick="navigate('/login')" class="text-xs font-bold text-enterprise-blue hover:underline flex items-center gap-1 cursor-pointer">Access <span aria-hidden="true">&rarr;</span></button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Trusted Partners & Ecosystem -->
        <section class="py-16 bg-slate-50 border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-6 text-center">
                <h3 class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Trusted Partners & Ecosystem</h3>
                <div class="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition duration-500">
                    <div class="text-xl font-extrabold font-serif text-slate-800 cursor-pointer">Ministry of Tech</div>
                    <div class="text-xl font-bold font-sans text-slate-800 flex items-center gap-2 cursor-pointer"><span class="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center text-xs">G</span> GlobalBank</div>
                    <div class="text-xl font-extrabold italic text-slate-800 cursor-pointer">EduNet Africa</div>
                    <div class="text-xl font-bold tracking-tighter text-slate-800 cursor-pointer">HEALTH<span class="text-slate-400">CORP</span></div>
                    <div class="text-xl font-medium tracking-widest text-slate-800 uppercase cursor-pointer">AgriState</div>
                </div>
            </div>
        </section>

    </main>

    <!-- Footer -->
    ${getEnterpriseFooterHtml()}
    
    <!-- Floating JUMO AI Assistant (Prominent) -->
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        
        <!-- Welcome Card (Initially Visible) -->
        <div id="public-ai-welcome" class="bg-white rounded-2xl shadow-2xl border border-slate-200 mb-4 p-5 w-72 transform transition-all duration-300 origin-bottom-right">
            <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-full bg-blue-50 text-enterprise-blue flex items-center justify-center text-xl shrink-0 border border-blue-100">🤖</div>
                <div>
                    <h4 class="font-bold text-slate-900 text-sm">JUMO AI ASSISTANT</h4>
                    <p class="text-xs text-slate-600 mt-1">How can I help you today?</p>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-100">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Ask about:</p>
                <ul class="text-xs text-slate-600 space-y-1.5 mb-4 font-medium">
                    <li class="flex items-center gap-1.5"><span class="text-enterprise-blue">•</span> Platform services</li>
                    <li class="flex items-center gap-1.5"><span class="text-enterprise-blue">•</span> Registration</li>
                    <li class="flex items-center gap-1.5"><span class="text-enterprise-blue">•</span> Login support</li>
                    <li class="flex items-center gap-1.5"><span class="text-enterprise-blue">•</span> Enterprise solutions</li>
                    <li class="flex items-center gap-1.5"><span class="text-enterprise-blue">•</span> Security</li>
                    <li class="flex items-center gap-1.5"><span class="text-enterprise-blue">•</span> General inquiries</li>
                </ul>
                <button onclick="document.getElementById('public-ai-welcome').classList.add('hidden'); document.getElementById('public-ai-chat').classList.remove('hidden');" class="w-full py-2.5 bg-enterprise-blue text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition shadow-sm cursor-pointer">
                    Start Conversation
                </button>
            </div>
            <button onclick="document.getElementById('public-ai-welcome').classList.add('hidden')" class="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        <!-- Chat Window -->
        <div id="public-ai-chat" class="hidden w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 mb-4 flex-col overflow-hidden transition-all duration-300">
            <div class="bg-enterprise-blue p-4 flex items-center justify-between text-white shadow-xs">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-white text-enterprise-blue flex items-center justify-center font-bold text-xl border-2 border-blue-400">🤖</div>
                    <div>
                        <h4 class="font-bold text-sm">JUMO AI Assistant</h4>
                        <p class="text-[10px] text-blue-200">Digital Front Desk &bull; Live</p>
                    </div>
                </div>
                <button onclick="document.getElementById('public-ai-chat').classList.add('hidden')" class="text-blue-200 hover:text-white transition p-1 cursor-pointer">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-4 h-[320px] overflow-y-auto bg-slate-50 text-xs space-y-4">
                <div class="flex gap-3">
                    <div class="w-8 h-8 rounded-full bg-enterprise-blue text-white flex items-center justify-center shrink-0 text-sm shadow-sm">🤖</div>
                    <div class="bg-white p-3.5 rounded-xl border border-slate-200 rounded-tl-none shadow-sm text-slate-700 leading-relaxed">
                        Welcome to the <strong>${BRAND_CONFIG.platformName}</strong>. I represent the JUMO AI Gateway. How can I assist you today?
                    </div>
                </div>
                
                <div class="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center my-2 font-mono">Suggested Topics</div>
                
                <div class="space-y-2">
                    <button onclick="alert('Providing platform overview...')" class="w-full text-left p-3 bg-white hover:bg-blue-50 text-enterprise-blue font-semibold rounded-xl border border-slate-200 transition shadow-sm cursor-pointer flex items-center gap-2">
                        <span class="text-blue-400">🌐</span> What is JUMO UEOS?
                    </button>
                    <button onclick="navigate('/register')" class="w-full text-left p-3 bg-white hover:bg-emerald-50 text-emerald-700 font-semibold rounded-xl border border-slate-200 transition shadow-sm cursor-pointer flex items-center gap-2">
                        <span class="text-emerald-500">🏛️</span> Register an Institution
                    </button>
                    <button onclick="navigate('/login')" class="w-full text-left p-3 bg-white hover:bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-slate-200 transition shadow-sm cursor-pointer flex items-center gap-2">
                        <span class="text-indigo-500">🔑</span> Account & Login Support
                    </button>
                    <button onclick="navigate('/contact')" class="w-full text-left p-3 bg-white hover:bg-amber-50 text-amber-700 font-semibold rounded-xl border border-slate-200 transition shadow-sm cursor-pointer flex items-center gap-2">
                        <span class="text-amber-500">📞</span> Contact Information
                    </button>
                </div>
            </div>
            <div class="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                <input type="text" placeholder="Type your inquiry here..." class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-enterprise-blue focus:ring-1 focus:ring-enterprise-blue bg-slate-50">
                <button class="w-10 h-10 rounded-xl bg-enterprise-blue text-white flex items-center justify-center hover:bg-blue-700 transition cursor-pointer shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </button>
            </div>
        </div>
        
        <!-- Floating Button -->
        <button onclick="
            document.getElementById('public-ai-welcome').classList.add('hidden');
            document.getElementById('public-ai-chat').classList.toggle('hidden');
        " class="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xl hover:bg-slate-800 transition hover:scale-105 active:scale-95 border-2 border-white cursor-pointer relative group">
            <span class="text-3xl">🤖</span>
            <span class="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
    </div>
</div>
  `;
};

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
              <input type="email" id="login-email" value="${state.loginEmail || 'admin@enterprise.com'}" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-enterprise-blue text-sm bg-slate-50 font-bold text-slate-900">
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
              <input type="email" id="reg-email" value="admin@enterprise.com" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-enterprise-blue text-sm bg-slate-50 font-bold text-slate-900">
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
    name: "Enterprise Admin",
    email: "admin@enterprise.com",
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
    <!-- Main Footer Body -->
    <footer class="bg-slate-950 text-slate-300 py-16 px-6 border-t border-slate-800 text-xs font-sans">
      <div class="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
        
        <!-- Column 1: Brand overview -->
        <div class="lg:col-span-1 space-y-4">
          <div class="-ml-2">
            ${logoHtmlLight}
          </div>
          <p class="text-slate-400 text-[11px] leading-relaxed mt-4">
            ${BRAND_CONFIG.platformName}
          </p>
          <div class="space-y-1.5 mt-4">
            <a href="#" class="block text-slate-400 hover:text-white transition">About ${BRAND_CONFIG.ownership.ownedBy}</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">JUMO UEOS</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">Architecture</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">Security</a>
          </div>
        </div>

        <!-- Column 2: PLATFORMS -->
        <div class="space-y-4">
          <h4 class="font-bold text-white text-[10px] uppercase tracking-widest font-mono">Platforms</h4>
          <div class="space-y-2">
            <a href="#" class="block text-slate-400 hover:text-white transition">Education</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">Government</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">Healthcare</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">Finance</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">Agriculture</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">AI Services</a>
          </div>
        </div>

        <!-- Column 3: SERVICES -->
        <div class="space-y-4">
          <h4 class="font-bold text-white text-[10px] uppercase tracking-widest font-mono">Services</h4>
          <div class="space-y-2">
            <a href="#" class="block text-slate-400 hover:text-white transition">Identity</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">Authentication</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">Digital Documents</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">Workflow</a>
            <a href="#" class="block text-slate-400 hover:text-white transition">Integrations</a>
          </div>
        </div>

        <!-- Column 4: ACCOUNT -->
        <div class="space-y-4">
          <h4 class="font-bold text-white text-[10px] uppercase tracking-widest font-mono">Account</h4>
          <div class="space-y-2">
            <button onclick="navigate('/login')" class="block text-slate-400 hover:text-white transition cursor-pointer text-left w-full">Sign In</button>
            <button onclick="navigate('/register')" class="block text-slate-400 hover:text-white transition cursor-pointer text-left w-full">Register Institution</button>
            <button onclick="navigate('/register')" class="block text-slate-400 hover:text-white transition cursor-pointer text-left w-full">Create Account</button>
            <button onclick="alert('Password Recovery')" class="block text-slate-400 hover:text-white transition cursor-pointer text-left w-full">Password Recovery</button>
            <button onclick="navigate('/contact')" class="block text-slate-400 hover:text-white transition cursor-pointer text-left w-full">Support</button>
          </div>
        </div>

        <!-- Column 5: CONTACT -->
        <div class="space-y-4">
          <h4 class="font-bold text-white text-[10px] uppercase tracking-widest font-mono">Contact</h4>
          <div class="space-y-2 text-slate-400 text-[11px]">
            <p><a href="mailto:${BRAND_CONFIG.communication.general}" class="hover:text-white transition">${BRAND_CONFIG.communication.general}</a></p>
            <p><a href="mailto:${BRAND_CONFIG.communication.support}" class="hover:text-white transition">${BRAND_CONFIG.communication.support}</a></p>
            <p class="pt-1">📞 <a href="tel:${BRAND_CONFIG.communication.mobile}" class="hover:text-white transition">${BRAND_CONFIG.communication.mobile}</a></p>
            <p>💬 <a href="${BRAND_CONFIG.socialLinks.find(s=>s.officialLogo==='whatsapp')?.URL || 'https://wa.me/256752964856'}" target="_blank" class="hover:text-white transition">${BRAND_CONFIG.communication.whatsapp}</a></p>
            <div class="pt-2 text-[10px] text-slate-500">
              <p>${BRAND_CONFIG.offices.headOffice}</p>
              <p>Mon - Fri: 08:00 - 17:00 (EAT)</p>
            </div>
          </div>
        </div>

        <!-- Column 6: CONNECT -->
        <div class="space-y-4">
          <h4 class="font-bold text-white text-[10px] uppercase tracking-widest font-mono">Connect</h4>
          <div class="grid grid-cols-2 gap-2 text-[11px]">
            ${BRAND_CONFIG.socialLinks.filter(s => s.enabledStatus).map(s => `
              <a href="${s.URL}" target="_blank" title="${s.platformName}" class="flex items-center gap-1.5 text-slate-400 hover:text-white transition group">
                <span class="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-enterprise-blue transition"></span>
                ${s.platformName}
              </a>
            `).join('')}
          </div>
        </div>
      </div>
      
      <!-- Bottom Copyright Bar -->
      <div class="max-w-[1440px] mx-auto pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-slate-500 font-mono text-[10px] gap-4">
        <div>
          - ${BRAND_CONFIG.ownership.ownedBy}
        </div>
        <div class="flex items-center gap-2">
          <span>Powered by ${BRAND_CONFIG.poweredBy}</span>
          <span class="w-1 h-1 rounded-full bg-slate-700"></span>
          <span>${BRAND_CONFIG.fullPlatformName}</span>
        </div>
      </div>
    </footer>
  `;
}

export const contactTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "md", textColor: "dark" });
  
  app.innerHTML = `
<div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="cursor-pointer" onclick="navigate('/')">
              ${logoHtml}
            </div>
            <nav class="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
                <a href="#" onclick="navigate('/')" class="hover:text-enterprise-blue transition">Platform</a>
                <a href="#" class="hover:text-enterprise-blue transition">Solutions</a>
                <a href="#" class="text-enterprise-blue font-bold border-b-2 border-enterprise-blue pb-7 translate-y-3.5">Contact & Communication</a>
            </nav>
            <div class="flex items-center gap-4">
                <button onclick="navigate('/login')" class="text-sm font-bold text-slate-700 hover:text-enterprise-blue transition cursor-pointer">Sign In</button>
                <button onclick="navigate('/register')" class="text-xs font-bold uppercase px-5 py-2.5 rounded-lg bg-enterprise-blue hover:bg-blue-700 text-white transition shadow-sm cursor-pointer">Register Institution</button>
            </div>
        </div>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto px-6 py-16">
        <div class="mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-enterprise-blue text-[10px] font-bold tracking-widest uppercase font-mono mb-4">
                Public Gateway
            </div>
            <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Contact & Communication</h1>
            <p class="text-slate-600 mt-4 max-w-2xl text-base leading-relaxed">Official communication channels for ${BRAND_CONFIG.fullPlatformName}. For immediate security or technical assistance, please use the designated enterprise contacts below.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-1 space-y-6">
                <!-- Contact Information -->
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wider font-mono mb-6 pb-4 border-b border-slate-100">Digital Channels</h3>
                    <div class="space-y-5 text-sm">
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">General Enquiries</p>
                            <a href="mailto:${BRAND_CONFIG.communication.general}" class="font-medium text-enterprise-blue hover:underline">${BRAND_CONFIG.communication.general}</a>
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Enterprise Support</p>
                            <a href="mailto:${BRAND_CONFIG.communication.support}" class="font-medium text-enterprise-blue hover:underline">${BRAND_CONFIG.communication.support}</a>
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Security Operations</p>
                            <a href="mailto:${BRAND_CONFIG.communication.security}" class="font-medium text-emerald-600 hover:underline">${BRAND_CONFIG.communication.security}</a>
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Legal & Compliance</p>
                            <a href="mailto:${BRAND_CONFIG.communication.legal}" class="font-medium text-enterprise-blue hover:underline">${BRAND_CONFIG.communication.legal}</a>
                        </div>
                    </div>
                </div>

                <!-- Direct Lines -->
                <div class="bg-slate-900 p-6 rounded-2xl shadow-lg text-white">
                    <h3 class="font-bold text-white text-sm uppercase tracking-wider font-mono mb-6 pb-4 border-b border-slate-800">Direct Lines</h3>
                    <div class="space-y-4 text-sm">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">📞</div>
                            <div>
                                <p class="text-[10px] text-slate-400 font-mono">Official Mobile</p>
                                <p class="font-bold tracking-wide">${BRAND_CONFIG.communication.mobile}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">💬</div>
                            <div>
                                <p class="text-[10px] text-slate-400 font-mono">WhatsApp Business</p>
                                <p class="font-bold tracking-wide">${BRAND_CONFIG.communication.whatsapp}</p>
                            </div>
                        </div>
                        <div class="mt-6 pt-4 border-t border-slate-800">
                            <p class="text-[10px] text-slate-400 font-mono mb-1">Business Hours</p>
                            <p class="font-medium text-sm">Monday - Friday: 08:00 - 17:00 (EAT)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-2 space-y-6">
                <!-- Location Directory -->
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
                    <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wider font-mono mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                        <span>Office Directory</span>
                        <span class="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded">${BRAND_CONFIG.location.region}</span>
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-5 rounded-xl border border-blue-100 bg-blue-50/50">
                            <div class="w-10 h-10 rounded-lg bg-blue-100 text-enterprise-blue flex items-center justify-center text-lg mb-4">🏛️</div>
                            <h4 class="font-bold text-slate-900 text-base mb-2">Head Office</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">
                                ${BRAND_CONFIG.offices.headOffice}<br>
                                ${BRAND_CONFIG.location.country}
                            </p>
                        </div>
                        
                        <div class="p-5 rounded-xl border border-slate-100 bg-slate-50">
                            <div class="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-lg mb-4">📍</div>
                            <h4 class="font-bold text-slate-900 text-base mb-2">Home Office</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">
                                ${BRAND_CONFIG.offices.homeOffice}<br>
                                ${BRAND_CONFIG.location.country}
                            </p>
                        </div>
                        
                        <div class="md:col-span-2 p-5 rounded-xl border border-slate-100">
                            <h4 class="font-bold text-slate-900 text-sm mb-4 font-mono uppercase tracking-widest text-slate-500">Regional Deployments</h4>
                            <div class="flex flex-wrap gap-2">
                                ${BRAND_CONFIG.offices.regional.map(city => 
                                    `<span class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">${city}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    ${getEnterpriseFooterHtml()}
</div>
  `;
};
