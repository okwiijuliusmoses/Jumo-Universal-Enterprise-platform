import { BRAND_CONFIG, getOfficialLogoHtml, getEnterpriseFooterHtml } from "../brand/brandConfig.js";

 
export const publicTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "md", textColor: "dark" });
  
  window.app.innerHTML = `
<div class="min-h-screen bg-white flex flex-col font-sans text-slate-800">
      
    <!-- JUMO UEOS Enterprise Public Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm text-slate-900">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-8">
                <div class="cursor-pointer" onclick="window.navigate('/')">
                  ${logoHtml}
                </div>
                
                <nav class="hidden lg:flex items-center gap-1">
                    <button onclick="window.navigate('/')" class="px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest text-slate-900 hover:bg-slate-100 transition">Home</button>
                    
                    <div class="relative group">
                        <button class="px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition flex items-center gap-1">Portals <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                        <div class="absolute top-full left-0 w-60 bg-white border border-slate-200 shadow-xl rounded-lg py-2 mt-1 hidden group-hover:block z-[60]">
                            ${(state.deployedInstitution?.portals || []).map(p => `
                            <a href="#" onclick="window.navigate('/login?portal=${p.id}')" class="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600">${p.name}</a>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="relative group">
                        <button class="px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition flex items-center gap-1">Resources <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                        <div class="absolute top-full left-0 w-60 bg-white border border-slate-200 shadow-xl rounded-lg py-2 mt-1 hidden group-hover:block z-[60]">
                            <a href="#" class="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">Documentation</a>
                            <a href="#" class="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">Platform News</a>
                            <a href="#" class="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">Public Notices</a>
                            <a href="#" onclick="window.navigate('/contact')" class="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">Contact Support</a>
                        </div>
                    </div>
                </nav>
            </div>
            
            <div class="flex items-center gap-3">
                <button onclick="window.navigate('/login')" class="text-xs font-bold text-slate-700 hover:text-blue-600 px-4 py-2 rounded-md transition uppercase tracking-widest cursor-pointer">Sign In</button>
                <button onclick="window.navigate('/register')" class="text-[10px] font-bold uppercase px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition shadow-md cursor-pointer tracking-widest">Register Institution</button>
            </div>
        </div>
    </header>

    <!-- Public Notice Bar -->
    <section class="bg-slate-50 border-b border-slate-200 py-3">
        <div class="max-w-7xl mx-auto px-6 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> UEOS v3.4.0 Active</span>
            <span class="text-slate-300">|</span>
            <span class="hover:text-slate-900 cursor-pointer">Global Compliance Verified</span>
            <span class="text-slate-300">|</span>
            <span class="hover:text-slate-900 cursor-pointer">Sovereign Identity Protection Enabled</span>
        </div>
    </section>

    <main class="flex-1 bg-white">
        
          
        <section class="relative bg-white overflow-hidden py-12">
              
            <div class="absolute right-0 top-0 w-1/2 h-full bg-slate-50" style="clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);"></div>
            
            <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                
                  
                <div class="w-full lg:w-5/12 space-y-6">
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 shadow-sm">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Digital Enterprise Ecosystem
                    </div>
                    <h1 class="text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight">
                        Connecting <br>
                        <span class="font-bold text-enterprise-blue">Digital Services</span>
                    </h1>
                    <p class="text-lg text-slate-600 leading-relaxed">
                        A secure, integrated platform for institutions, citizens, and enterprise services.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3 pt-2">
                        <button class="px-6 py-3 rounded-lg bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-enterprise-blue font-semibold text-slate-700 transition flex items-center justify-between cursor-pointer group">
                            <span>Browse News</span>
                            <span class="text-slate-400 group-hover:text-enterprise-blue group-hover:translate-x-1 transition">&rarr;</span>
                        </button>
                        <button class="px-6 py-3 rounded-lg bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-enterprise-blue font-semibold text-slate-700 transition flex items-center justify-between cursor-pointer group">
                            <span>View Resources</span>
                            <span class="text-slate-400 group-hover:text-enterprise-blue group-hover:translate-x-1 transition">&rarr;</span>
                        </button>
                    </div>
                </div>

                  
                <div class="w-full lg:w-7/12">
                    <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[400px]">
                          
                        <div class="bg-slate-900 px-4 py-3 flex items-center justify-between text-xs font-medium text-slate-400 border-b border-slate-800">
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                                Live Broadcast
                            </div>
                            <div class="font-mono">JUMO TV</div>
                        </div>
                        
                          
                        <div class="flex-1 bg-slate-100 relative group cursor-pointer overflow-hidden flex items-center justify-center">
                              
                            <div class="absolute inset-0 bg-gradient-to-tr from-blue-900 to-slate-800 opacity-90 transition-transform duration-700 group-hover:scale-105"></div>
                            
                              
                            <div class="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition shadow-2xl">
                                <div class="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                            </div>

                              
                            <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent z-10">
                                <span class="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase rounded mb-3 inline-block">Platform Showcase</span>
                                <h3 class="text-2xl font-bold text-white mb-1">Accelerating Digital Transformation</h3>
                                <p class="text-slate-300 text-sm">See how government agencies and enterprises are leveraging JUMO.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
        <section class="py-24 px-6 bg-white text-center">
            <div class="max-w-4xl mx-auto space-y-6">
                <h2 class="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    The Unified Digital Environment <br class="hidden md:block"> for Modern Enterprise
                </h2>
                <p class="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                    A secure, integrated platform connecting institutions, digital services, and citizens under a unified governance framework.
                </p>
            </div>
        </section>

          
        <section class="py-12 px-6 bg-slate-50 border-y border-slate-200">
            <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                
                  
                <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition group">
                    <div class="flex items-start justify-between mb-8">
                        <div>
                            <h3 class="text-2xl font-bold text-slate-900 group-hover:text-enterprise-blue transition">Personal Identity</h3>
                            <p class="text-slate-500 mt-2">For citizens, staff, and individual profiles.</p>
                        </div>
                        <div class="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-3xl group-hover:bg-enterprise-blue group-hover:text-white transition-colors duration-300">
                            👤
                        </div>
                    </div>
                    <div class="space-y-3">
                        <button onclick="window.navigate('/login')" class="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition cursor-pointer flex justify-center items-center">
                            Sign In to Workspace
                        </button>
                        <button onclick="window.navigate('/register')" class="w-full py-4 px-6 bg-white border border-slate-200 hover:border-enterprise-blue hover:bg-blue-50 text-slate-700 font-bold rounded-xl transition cursor-pointer flex justify-center items-center">
                            Create Account
                        </button>
                    </div>
                </div>

                  
                <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition group">
                    <div class="flex items-start justify-between mb-8">
                        <div>
                            <div class="flex items-center gap-2 mb-1">
                                <h3 class="text-2xl font-bold text-slate-900 group-hover:text-enterprise-blue transition">Enterprise & Institutions</h3>
                            </div>
                            <p class="text-slate-500 mt-2">For government bodies, schools, and corporations.</p>
                        </div>
                        <div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 text-3xl group-hover:bg-enterprise-blue group-hover:text-white transition-colors duration-300">
                            🏛️
                        </div>
                    </div>
                    <div class="space-y-3">
                        <button onclick="window.navigate('/login')" class="w-full py-4 px-6 bg-enterprise-blue hover:bg-blue-700 text-white font-bold rounded-xl transition cursor-pointer flex justify-center items-center">
                            Institution Login
                        </button>
                        <button onclick="window.navigate('/register')" class="w-full py-4 px-6 bg-white border border-slate-200 hover:border-enterprise-blue hover:bg-blue-50 text-slate-700 font-bold rounded-xl transition cursor-pointer flex justify-center items-center">
                            Register Institution
                        </button>
                    </div>
                </div>

            </div>
            
            <div class="max-w-6xl mx-auto mt-8 flex flex-wrap justify-center gap-6 text-sm">
                <button onclick="alert('Password Reset')" class="text-slate-500 hover:text-enterprise-blue font-medium transition cursor-pointer flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg> Forgot Password?</button>
                <button onclick="alert('Account Recovery')" class="text-slate-500 hover:text-enterprise-blue font-medium transition cursor-pointer flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"></path></svg> Recover Account</button>
                <button onclick="window.navigate('/contact')" class="text-slate-500 hover:text-enterprise-blue font-medium transition cursor-pointer flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> Contact Support</button>
            </div>
        </section>

          
        <div class="bg-white border-b border-slate-200 py-10 px-6">
            <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm font-semibold text-slate-700">
                <div class="flex items-center gap-3"><span class="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">🛡️</span> Enterprise Security & Compliance</div>
                <div class="flex items-center gap-3"><span class="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">🔑</span> Verified Digital Trust</div>
                <div class="flex items-center gap-3"><span class="w-8 h-8 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center">👤</span> Digital Identity Services</div>
                <div class="flex items-center gap-3"><span class="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center">⚙️</span> Business Process Automation</div>
            </div>
        </div>

          
        <section class="py-24 px-6 bg-slate-50 border-b border-slate-200">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-extrabold text-slate-900">JUMO Enterprise Solutions</h2>
                    <p class="text-slate-600 mt-4 max-w-2xl mx-auto">Comprehensive digital platforms tailored for the unique workflows of major sectors.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${[
                        { name: "Education Management", icon: "🎓", desc: "Comprehensive administration for universities and schools, including admissions and academic records." },
                        { name: "Government Services", icon: "🏛️", desc: "Digital infrastructure for civil records, public administration, and citizen engagement." },
                        { name: "Healthcare Systems", icon: "🏥", desc: "Secure management of clinical records, hospital administration, and health resources." },
                        { name: "Finance & Treasury", icon: "💳", desc: "Integrated financial ledgers, automated settlements, and secure accounting platforms." },
                        { name: "Agriculture Cooperatives", icon: "🌱", desc: "Digital tracking for agricultural yields, supply chains, and cooperative management." },
                        { name: "Enterprise AI Services", icon: "🧠", desc: "Intelligent automation and cognitive assistance to streamline enterprise operations." },
                        { name: "Human Resources", icon: "👥", desc: "End-to-end talent acquisition, onboarding, and workforce management." },
                        { name: "Financial Technology", icon: "💸", desc: "Secure digital payment gateways and robust financial compliance tools." },
                        { name: "Enterprise Security", icon: "🛡️", desc: "Advanced cryptographic ledgers and compliance infrastructure for institutional data." }
                    ].map(p => `
                        <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-enterprise-blue hover:shadow-md transition flex flex-col group">
                            <div class="w-12 h-12 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center text-2xl mb-6 border border-slate-100 group-hover:bg-blue-50 group-hover:text-enterprise-blue transition">
                                ${p.icon}
                            </div>
                            <h3 class="font-bold text-slate-900 text-lg mb-3">${p.name}</h3>
                            <p class="text-sm text-slate-600 mb-8 flex-1 leading-relaxed">${p.desc}</p>
                            <div class="mt-auto pt-4 border-t border-slate-100">
                                <button onclick="window.navigate('/login')" class="text-sm font-semibold text-enterprise-blue hover:text-blue-700 flex items-center gap-1 cursor-pointer">Learn more <span aria-hidden="true">&rarr;</span></button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

          
        <section class="py-24 px-6 bg-white border-b border-slate-200">
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 class="text-3xl font-extrabold text-slate-900">Success Stories</h2>
                        <p class="text-slate-600 mt-2">How organizations are transforming with JUMO.</p>
                    </div>
                    <button class="px-6 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold hover:bg-slate-50 transition cursor-pointer">Read all stories</button>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                    <div class="bg-slate-900 rounded-2xl p-10 text-white relative overflow-hidden group cursor-pointer flex flex-col justify-end min-h-[400px]">
                        <div class="absolute inset-0 bg-gradient-to-tr from-blue-900/80 to-transparent z-0"></div>
                        <div class="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        
                        <div class="relative z-10">
                            <div class="inline-flex px-3 py-1 bg-white/20 backdrop-blur-md rounded border border-white/10 text-xs font-bold mb-6 uppercase tracking-wider">Government Agency</div>
                            <h3 class="text-3xl font-bold mb-4 leading-tight">Digitalizing Civil Services at National Scale</h3>
                            <p class="text-slate-300 mb-6 max-w-lg">A complete transformation of public service delivery using JUMO Government Solutions, reducing processing times by 80%.</p>
                            <div class="flex items-center gap-2 text-sm font-semibold text-blue-300 group-hover:text-white transition">Read Case Study &rarr;</div>
                        </div>
                    </div>
                    
                    <div class="flex flex-col gap-8">
                        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-md transition cursor-pointer group">
                            <div class="w-full sm:w-1/3 aspect-video sm:aspect-square bg-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-200">
                                <span class="text-4xl text-slate-300">🎓</span>
                            </div>
                            <div class="flex-1 flex flex-col justify-center">
                                <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Public University</div>
                                <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-enterprise-blue transition">Unified Campus Administration</h3>
                                <p class="text-sm text-slate-600 line-clamp-2 mb-4">Integrating 50,000 students and faculty onto a single secure management platform.</p>
                                <span class="text-sm font-semibold text-enterprise-blue">Read Article</span>
                            </div>
                        </div>
                        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-md transition cursor-pointer group">
                            <div class="w-full sm:w-1/3 aspect-video sm:aspect-square bg-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-200">
                                <span class="text-4xl text-slate-300">🏥</span>
                            </div>
                            <div class="flex-1 flex flex-col justify-center">
                                <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Regional Hospital</div>
                                <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-enterprise-blue transition">Secure Patient Records</h3>
                                <p class="text-sm text-slate-600 line-clamp-2 mb-4">Implementing zero-trust architecture for sensitive clinical data across multiple care centers.</p>
                                <span class="text-sm font-semibold text-enterprise-blue">Read Article</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

          
        <section class="py-24 px-6 bg-slate-50 border-b border-slate-200">
            <div class="max-w-3xl mx-auto">
                <h2 class="text-3xl font-extrabold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
                
                <div class="space-y-4">
                    <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h4 class="font-bold text-slate-900 text-lg mb-2">How does an institution get started with JUMO?</h4>
                        <p class="text-slate-600 text-sm">Institutions must complete the official registration process, which includes verification of legal status and administrative authorization. Once approved, you will receive access to the Enterprise Control Center.</p>
                    </div>
                    <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h4 class="font-bold text-slate-900 text-lg mb-2">Is the platform available for individual users?</h4>
                        <p class="text-slate-600 text-sm">Yes. Individuals can create personal accounts to interact with connected institutions, access public services, and manage their personal digital identity.</p>
                    </div>
                    <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h4 class="font-bold text-slate-900 text-lg mb-2">How secure is the data stored on the platform?</h4>
                        <p class="text-slate-600 text-sm">JUMO employs enterprise-grade security, including advanced encryption, secure access controls, and strict compliance protocols to ensure all institutional and personal data remains protected.</p>
                    </div>
                </div>
            </div>
        </section>
        
          
        <section class="py-24 px-6 bg-enterprise-blue text-white text-center">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-extrabold mb-6">Ready to transform your organization?</h2>
                <p class="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">Connect with our enterprise onboarding team to discuss how JUMO can integrate with your institutional workflows.</p>
                <div class="flex flex-wrap justify-center gap-4">
                    <button onclick="window.navigate('/contact')" class="px-8 py-4 bg-white text-enterprise-blue font-bold rounded-xl shadow-lg hover:bg-blue-50 transition cursor-pointer">Contact Our Team</button>
                    <button onclick="window.navigate('/register')" class="px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white font-bold rounded-xl transition cursor-pointer">Register Institution</button>
                </div>
            </div>
        </section>

          
        <section class="py-16 bg-white border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-6">
                <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-10">Trusted by institutions across sectors</h3>
                <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                    <div class="px-6 py-3 border border-slate-300 rounded-lg text-slate-500 font-bold text-sm bg-slate-50">Ministries & Government</div>
                    <div class="px-6 py-3 border border-slate-300 rounded-lg text-slate-500 font-bold text-sm bg-slate-50">Public Universities</div>
                    <div class="px-6 py-3 border border-slate-300 rounded-lg text-slate-500 font-bold text-sm bg-slate-50">Regional Hospitals</div>
                    <div class="px-6 py-3 border border-slate-300 rounded-lg text-slate-500 font-bold text-sm bg-slate-50">Financial Institutions</div>
                    <div class="px-6 py-3 border border-slate-300 rounded-lg text-slate-500 font-bold text-sm bg-slate-50">Development Partners</div>
                </div>
            </div>
        </section>

    </main>

      
    ${getEnterpriseFooterHtml()}
    
      
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        
          
        <div id="public-ai-chat" class="hidden fixed inset-0 z-[101] bg-slate-900/40 flex items-center justify-center p-4">
            <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
                <div class="bg-emerald-600 p-4 flex items-center justify-between text-white shadow-sm">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xl">
                            🤖
                        </div>
                        <div>
                            <h4 class="font-bold text-sm">Public Front Desk Assistant</h4>
                        </div>
                    </div>
                    <button onclick="document.getElementById('public-ai-chat').classList.add('hidden')" class="text-white/80 hover:text-white transition p-1 cursor-pointer">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div class="p-6 h-[400px] overflow-y-auto bg-slate-50 text-sm space-y-4">
                    <div class="flex gap-3">
                        <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-sm shadow-sm">
                            🤖
                        </div>
                        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-slate-700 leading-relaxed">
                            Welcome! I am the Public Front Desk Assistant. I can help you discover available public services, locate the correct institutional portal, and assist with general enquiries. I cannot access or disclose internal institutional records. How can I help you today?
                        </div>
                    </div>
                </div>
                <div class="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
                    <input type="text" placeholder="Type your inquiry here..." class="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50">
                    <button class="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition cursor-pointer shadow-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    </button>
                </div>
            </div>
        </div>
        
          
        <button onclick="document.getElementById('public-ai-chat').classList.remove('hidden')" class="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:bg-emerald-700 transition hover:scale-105 active:scale-95 cursor-pointer relative group">
            <div class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-lg">🤖</div>
        </button>
    </div>
</div>
  `;
};

export const loginTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "lg", textColor: "dark" });
  const institutionName = state.deployedInstitution ? state.deployedInstitution.name : "JUMO Platform";
  
  // Calculate dynamic default institutional email prefix
  const domainSlug = (state.deployedInstitution?.name || "jumo").toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .substring(0, 15);
  const defaultEmailDomain = state.deployedInstitution?.domain || `${domainSlug}.ueos`;
  const defaultEmail = `user@${defaultEmailDomain}`;
  
  window.app.innerHTML = `
    <div class="min-h-screen bg-white flex flex-col justify-between font-sans text-slate-800">
        
      <header class="p-6 border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="cursor-pointer" onclick="window.navigate('/')">
            ${logoHtml}
          </div>
          <button onclick="window.navigate('/')" class="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition flex items-center gap-2 group">
            <svg class="w-4 h-4 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to ${institutionName}
          </button>
        </div>
      </header>

      <div class="flex-1 flex items-center justify-center p-6 bg-slate-50/30">
        <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 md:p-12 space-y-8">
          <div class="text-center space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-bold tracking-widest uppercase">
              <span>🔐 Identity Gateway</span>
            </div>
            <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Sign In</h2>
            <p class="text-xs text-slate-500 uppercase tracking-widest font-bold font-mono">Institutional Identity Verification</p>
          </div>

          ${state.authError ? `
            <div class="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-bold flex items-center gap-3">
              <span class="text-lg">⚠️</span> ${state.authError}
            </div>
          ` : ''}

          <form onsubmit="window.handleLoginSubmit(event)" class="space-y-6 text-[10px] font-bold uppercase tracking-widest">
            <div>
              <label class="block text-slate-500 mb-2">Institutional Email / ID</label>
              <input type="email" id="login-email" value="${state.loginEmail || defaultEmail}" required class="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm bg-white font-bold text-slate-900 shadow-sm">
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-slate-500">Access Credential</label>
                <a href="#" onclick="alert('Recovery instructions sent to registered email.'); return false;" class="text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <input type="password" id="login-password" value="pass123" required class="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm bg-white font-bold text-slate-900 shadow-sm">
            </div>

            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-500 flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg border border-slate-200 shadow-sm">🛡️</div>
              <div>
                <p class="font-bold text-slate-900">Zero-Trust Verification</p>
                <p class="font-mono text-[9px]">Secured by JUMO UEOS AEGIS</p>
              </div>
            </div>

            <button type="submit" class="w-full py-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest transition shadow-xl cursor-pointer">
              Authenticate &rarr;
            </button>
          </form>

          <div class="pt-6 border-t border-slate-100 text-center space-y-3">
            <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Need an institutional account?</p>
            <button onclick="window.navigate('/register')" class="text-xs font-bold text-blue-600 hover:underline tracking-widest uppercase">Request Registration &rarr;</button>
          </div>
        </div>
      </div>

      <footer class="py-6 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white border-t border-slate-100">
        ${BRAND_CONFIG.poweredBy} &bull; ${BRAND_CONFIG.legalName}
      </footer>
    </div>
  `;
};

export const registerTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "lg", textColor: "dark" });
  const institutionName = state.deployedInstitution ? state.deployedInstitution.name : "JUMO Platform";
  
  window.app.innerHTML = `
    <div class="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <header class="p-6 border-b border-slate-200 bg-white">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="cursor-pointer" onclick="window.navigate('/')">
            ${logoHtml}
          </div>
          <button onclick="window.navigate('/login')" class="text-xs font-bold text-slate-600 hover:text-enterprise-blue transition flex items-center gap-1">
            &larr; Back to Login
          </button>
        </div>
      </header>

      <div class="flex-1 flex items-center justify-center p-6">
        <div class="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10 space-y-6">
          <div class="text-center space-y-2">
            <h2 class="text-2xl font-extrabold text-slate-900">Create Account</h2>
            <p class="text-xs text-slate-500">Register for ${institutionName} access</p>
          </div>

          <form onsubmit="window.handleRegisterSubmit(event)" class="space-y-5 text-xs font-semibold">
            <div>
              <label class="block text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
              <input type="text" id="reg-name" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-enterprise-blue text-sm bg-slate-50 font-bold text-slate-900">
            </div>
            <div>
              <label class="block text-slate-700 uppercase tracking-wider mb-2">Role Type</label>
              <select id="reg-type" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-enterprise-blue text-sm bg-slate-50 font-bold text-slate-900">
                <option value="Student">Student / Applicant</option>
                <option value="Staff">Staff Member</option>
                <option value="Partner">External Partner</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" id="reg-email" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-enterprise-blue text-sm bg-slate-50 font-bold text-slate-900">
            </div>
            <button type="submit" class="w-full py-4 rounded-xl bg-enterprise-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer">
              Register Account &rarr;
            </button>
          </form>
        </div>
      </div>

      <footer class="py-4 text-center text-xs text-slate-500 bg-white border-t border-slate-200 font-mono">
        ${BRAND_CONFIG.poweredBy}
      </footer>
    </div>
  `;
};

export const gatewayTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "md", textColor: "dark" });
  const user = state.session?.user || {
    name: "Enterprise User",
    email: "user@enterprise.com",
    role: "User",
    isAdmin: false,
    status: "Verified Account"
  };
  
  const institution = state.deployedInstitution || { name: "Enterprise Platform", portals: [] };
  const controlPlane = window.ueosControlPlane;
  const activeTemplate = state.session?.activeErpTemplate || (controlPlane ? controlPlane.getDefaultERPTemplate() : null);
  const portals = activeTemplate?.governancePortals || institution.portals || [];

  institution.portals = portals;

  window.app.innerHTML = `
    <div class="min-h-screen bg-white flex flex-col text-slate-800 antialiased font-sans">
        
      <!-- JUMO UEOS Enterprise Gateway Header -->
      <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm text-slate-900">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-8">
                <div class="flex items-center gap-4 cursor-pointer" onclick="window.navigate('/')">
                  ${logoHtml}
                </div>
                
                <!-- Horizontal Enterprise Navigation -->
                <nav class="hidden lg:flex items-center gap-1">
                    <button onclick="window.goBack()" class="p-2 text-slate-400 hover:text-slate-900 transition" title="Back">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <button class="p-2 text-slate-300 transition" title="Forward" disabled>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                    <div class="h-6 w-px bg-slate-200 mx-2"></div>
                    
                    <div class="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-md border border-slate-200">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Portal Directory</span>
                        <svg class="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        <span class="text-xs font-bold text-slate-900">${institution.name}</span>
                    </div>
                </nav>
            </div>

            <div class="flex items-center gap-4">
              <!-- Portal Switcher -->
              <div class="relative group hidden md:block">
                  <button class="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-white hover:border-blue-300 transition cursor-pointer">
                      <span>Switch Portal</span>
                      <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div class="absolute right-0 top-full mt-1 w-64 bg-white border border-slate-200 shadow-xl rounded-xl py-2 hidden group-hover:block z-[100]">
                      <div class="px-4 py-2 border-b border-slate-100 mb-1">
                          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Portals</p>
                      </div>
                      ${portals.map(p => `
                      <button onclick="window.navigate('/workspace?portal=${p.id}')" class="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition flex items-center gap-3">
                        <div class="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px]">🏛️</div>
                        ${p.name}
                      </button>
                      `).join('')}
                  </div>
              </div>

              <div class="h-8 w-px bg-slate-200 mx-2"></div>
                
              <!-- Profile Menu -->
              <div class="relative group">
                <button class="flex items-center gap-3 cursor-pointer">
                  <div class="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center border border-slate-200 group-hover:bg-slate-800 transition">
                    <span class="text-sm font-bold">${user.name.charAt(0)}</span>
                  </div>
                  <div class="hidden sm:block text-left">
                    <div class="text-sm font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition">${user.name}</div>
                    <div class="text-[10px] text-slate-500 uppercase tracking-widest">${user.role}</div>
                  </div>
                </button>
                <div class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 hidden group-hover:block z-[100] overflow-hidden transform origin-top-right">
                  <div class="p-5 border-b border-slate-100 bg-slate-50">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200 text-slate-700 font-bold">
                            ${user.name.charAt(0)}
                        </div>
                        <div>
                            <p class="text-sm font-bold text-slate-900">${user.name}</p>
                            <p class="text-[10px] text-slate-500 font-mono">${user.email}</p>
                        </div>
                    </div>
                    <div class="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded border border-emerald-100 text-center">
                        ${user.status}
                    </div>
                  </div>
                  <div class="p-2">
                    <button class="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      Account Settings
                    </button>
                    <button onclick="window.handleLogout()" class="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                      Secure Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </header>

      <!-- Institutional Identity Bar -->
      <section class="bg-slate-50 border-b border-slate-200 py-6">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 tracking-tight">${institution.name} Portal Directory</h1>
                    <p class="text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold">Institutional Identity Root</p>
                </div>
                <div class="flex items-center gap-4">
                    <div class="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <div class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Deployment Domain</div>
                        <div class="text-xs font-bold text-slate-700">${state.deployedInstitution?.domain || 'portal.jumo.ueos'}</div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <!-- Portal Selection Workspace -->
      <main class="flex-1 py-12 px-6 max-w-7xl mx-auto w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          ${portals.map(portal => `
            <div onclick="window.navigate('/workspace?portal=${portal.id}')" class="group bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer relative overflow-hidden flex flex-col h-full ring-1 ring-slate-100">
                
              <div class="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -z-0 opacity-50 group-hover:bg-blue-50 transition-colors"></div>
              
              <div class="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900 flex items-center justify-center mb-8 relative z-10 group-hover:border-blue-400 group-hover:text-blue-600 transition-all duration-300">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              
              <h3 class="text-xl font-extrabold text-slate-900 mb-3 relative z-10 group-hover:text-blue-600 transition-colors">${portal.name}</h3>
              <p class="text-sm text-slate-500 mb-8 flex-1 relative z-10 leading-relaxed">Enter the ${portal.name} to manage operational workflows, departments, and institutional records.</p>
              
              <div class="flex items-center justify-between relative z-10 pt-4 border-t border-slate-50">
                <span class="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">Open Workspace</span>
                <div class="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center transform group-hover:translate-x-1 transition-transform shadow-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </main>
      
      <!-- Enterprise Footer -->
      <footer class="bg-white border-t border-slate-200 py-8 px-6">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>© 2026 JUMO Global</span>
                <span class="text-slate-200">|</span>
                <a href="#" class="hover:text-slate-900">Privacy Protocol</a>
                <a href="#" class="hover:text-slate-900">Enterprise Terms</a>
                <a href="#" class="hover:text-slate-900">System Status</a>
            </div>
            <div class="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Powered by</span>
                <span class="px-2 py-1 bg-slate-900 text-white rounded">JUMO UEOS</span>
            </div>
        </div>
      </footer>
    </div>
  `;
};

export const contactTemplate = () => {
  const logoHtml = getOfficialLogoHtml({ size: "md", textColor: "dark" });
  
  window.app.innerHTML = `
<div class="min-h-screen bg-white flex flex-col font-sans text-slate-800">
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm h-16">
        <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            <div class="cursor-pointer" onclick="window.navigate('/')">
              ${logoHtml}
            </div>
            <nav class="hidden lg:flex items-center gap-1">
                <button onclick="window.navigate('/')" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition">Platform</button>
                <button class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition">Solutions</button>
                <button class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-900 bg-slate-100 transition">Contact & Support</button>
            </nav>
            <div class="flex items-center gap-4">
                <button onclick="window.navigate('/login')" class="text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition cursor-pointer">Sign In</button>
                <button onclick="window.navigate('/register')" class="text-[10px] font-bold uppercase px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition shadow-md cursor-pointer tracking-widest">Register Institution</button>
            </div>
        </div>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto px-6 py-16">
        <div class="mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[9px] font-bold tracking-widest uppercase font-mono mb-4">
                Public Gateway
            </div>
            <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Contact & Communication</h1>
            <p class="text-slate-500 mt-4 max-w-2xl text-base leading-relaxed">Official communication channels for ${BRAND_CONFIG.fullPlatformName}. For immediate security or technical assistance, please use the designated enterprise contacts below.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-1 space-y-6">
                  
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
                                ${(BRAND_CONFIG.offices?.regional || []).map(city => 
                                    `<span class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">${city}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

      
    ${getEnterpriseFooterHtml()}
</div>
  `;
};
