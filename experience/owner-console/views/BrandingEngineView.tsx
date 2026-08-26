import React, { useState } from 'react';
import { 
  Palette, Save, RefreshCw, CheckCircle2, Layout, Type, 
  Sparkles, Smartphone, Mail, FileText, Globe, ShieldCheck, 
  Image, Sliders, Moon, Sun, Layers
} from 'lucide-react';
import { BrandThemeService, BrandThemeConfig } from '../../../core/workspace-config/BrandThemeService';

export const BrandingEngineView: React.FC = () => {
  const [config, setConfig] = useState<BrandThemeConfig>(() => BrandThemeService.getTheme());
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'identity' | 'layout' | 'login-email' | 'documents'>('identity');

  const handleSave = () => {
    BrandThemeService.updateTheme(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    const defaultTheme = BrandThemeService.resetTheme();
    setConfig({ ...defaultTheme });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Enterprise Branding & Theme Engine</h1>
          <p className="text-xs text-slate-500">Configure global platform identity tokens, color palettes, login/email branding, and document classification watermarks.</p>
        </div>
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tokens Propagated Platform-Wide</span>
            </span>
          )}
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save & Broadcast Theme</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('identity')}
          className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'identity' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Platform Identity & Colors</span>
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'layout' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Layout, Header & Typography</span>
        </button>
        <button
          onClick={() => setActiveTab('login-email')}
          className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'login-email' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Login & Email Branding</span>
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'documents' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Document & Mobile Tokens</span>
        </button>
      </div>

      {/* TAB 1: IDENTITY & COLORS */}
      {activeTab === 'identity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Global Identity & Titles</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Global Platform Identity Title</label>
                <input
                  type="text"
                  value={config.platformName}
                  onChange={e => setConfig({ ...config, platformName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
                <p className="text-[10px] text-slate-600 mt-1">Must always display JUMO Digital Enterprise Platform per Phase 31 mandate.</p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Official Logo Display Text</label>
                <input
                  type="text"
                  value={config.officialLogoText}
                  onChange={e => setConfig({ ...config, officialLogoText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Organization Root Authority Name</label>
                <input
                  type="text"
                  value={config.organizationName}
                  onChange={e => setConfig({ ...config, organizationName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    id="bannerActive"
                    checked={config.bannerActive}
                    onChange={e => setConfig({ ...config, bannerActive: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <label htmlFor="bannerActive" className="text-xs font-bold text-slate-800 cursor-pointer">Enable Global Header Broadcast Banner</label>
                </div>
                <input
                  type="text"
                  value={config.bannerMessage}
                  onChange={e => setConfig({ ...config, bannerMessage: e.target.value })}
                  disabled={!config.bannerActive}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 disabled:opacity-50 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Color Palette Tokens */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-600" />
              <span>Enterprise Color Palettes & Surface Themes</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Theme Mode Preset</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['light', 'dark', 'hybrid', 'high-contrast'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setConfig({ ...config, themeMode: mode })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border capitalize transition-all ${
                        config.themeMode === mode
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Primary Color Token</label>
                  <select
                    value={config.primaryColor}
                    onChange={e => setConfig({ ...config, primaryColor: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold"
                  >
                    <option value="bg-blue-600 text-white">Blue-600 (Sovereign Core)</option>
                    <option value="bg-indigo-600 text-white">Indigo-600 (Deep Hybrid)</option>
                    <option value="bg-slate-900 text-white">Slate-900 (Executive Dark)</option>
                    <option value="bg-emerald-600 text-white">Emerald-600 (Secure Trust)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Secondary Surface Token</label>
                  <select
                    value={config.secondaryColor}
                    onChange={e => setConfig({ ...config, secondaryColor: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold"
                  >
                    <option value="bg-slate-900 text-white">Slate-900 (Standard)</option>
                    <option value="bg-slate-800 text-white">Slate-800 (Soft Dark)</option>
                    <option value="bg-blue-950 text-white">Blue-950 (Midnight Navy)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Portal Background Texture</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['solid', 'subtle-grid', 'slate-pattern'] as const).map(bg => (
                    <button
                      key={bg}
                      onClick={() => setConfig({ ...config, portalBackground: bg })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border capitalize transition-all ${
                        config.portalBackground === bg
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {bg.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LAYOUT & TYPOGRAPHY */}
      {activeTab === 'layout' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-3 flex items-center gap-2">
              <Layout className="w-4 h-4 text-blue-600" />
              <span>Header & Footer Layout Architecture</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Header Style Configuration</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['clean', 'enterprise', 'compact'] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => setConfig({ ...config, headerStyle: style })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border capitalize transition-all ${
                        config.headerStyle === style
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Footer Style Configuration</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['full', 'minimal'] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => setConfig({ ...config, footerStyle: style })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border capitalize transition-all ${
                        config.footerStyle === style
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {style === 'full' ? 'Full Enterprise Footer (4-Column)' : 'Minimal One-Line Footer'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Component Border Radius Scale</label>
                <div className="grid grid-cols-5 gap-1.5 font-mono">
                  {(['none', 'sm', 'md', 'lg', 'xl'] as const).map(rad => (
                    <button
                      key={rad}
                      onClick={() => setConfig({ ...config, borderRadius: rad })}
                      className={`py-2 rounded-lg text-xs font-bold border uppercase transition-all ${
                        config.borderRadius === rad
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {rad}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-3 flex items-center gap-2">
              <Type className="w-4 h-4 text-emerald-600" />
              <span>Typography & Spacing Scales</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Font Family Scale</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sans', 'serif', 'mono'] as const).map(font => (
                    <button
                      key={font}
                      onClick={() => setConfig({ ...config, typography: font })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border capitalize transition-all ${
                        config.typography === font
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {font === 'sans' ? 'Inter Sans' : font === 'serif' ? 'Playfair Serif' : 'JetBrains Mono'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Typography Density Scale</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['compact', 'normal', 'spacious'] as const).map(scale => (
                    <button
                      key={scale}
                      onClick={() => setConfig({ ...config, typographyScale: scale })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border capitalize transition-all ${
                        config.typographyScale === scale
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Enterprise Spacing Grid</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['dense', 'standard', 'spacious'] as const).map(sp => (
                    <button
                      key={sp}
                      onClick={() => setConfig({ ...config, spacingScale: sp })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border capitalize transition-all ${
                        config.spacingScale === sp
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOGIN & EMAIL BRANDING */}
      {activeTab === 'login-email' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Sovereign Login Gateway Branding</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Login Portal Title</label>
                <input
                  type="text"
                  value={config.loginBranding.title}
                  onChange={e => setConfig({ ...config, loginBranding: { ...config.loginBranding, title: e.target.value } })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Login Portal Subtitle / Security Notice</label>
                <input
                  type="text"
                  value={config.loginBranding.subtitle}
                  onChange={e => setConfig({ ...config, loginBranding: { ...config.loginBranding, subtitle: e.target.value } })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Login Background Mesh</label>
                <select
                  value={config.loginBranding.backgroundStyle}
                  onChange={e => setConfig({ ...config, loginBranding: { ...config.loginBranding, backgroundStyle: e.target.value } })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="slate-mesh">Slate Executive Mesh (Dark)</option>
                  <option value="blue-grid">Sovereign Blue Cryptographic Grid</option>
                  <option value="minimal-light">Minimal High-Contrast White</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-600" />
              <span>Automated Email & Notification Branding</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Header Brand Text</label>
                <input
                  type="text"
                  value={config.emailBranding.headerLogoText}
                  onChange={e => setConfig({ ...config, emailBranding: { ...config.emailBranding, headerLogoText: e.target.value } })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Footer Legal Disclaimer</label>
                <textarea
                  rows={3}
                  value={config.emailBranding.footerText}
                  onChange={e => setConfig({ ...config, emailBranding: { ...config.emailBranding, footerText: e.target.value } })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DOCUMENTS & MOBILE */}
      {activeTab === 'documents' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Document & PDF Export Watermarks</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Document Watermark Stamp</label>
                <input
                  type="text"
                  value={config.documentBranding.watermark}
                  onChange={e => setConfig({ ...config, documentBranding: { ...config.documentBranding, watermark: e.target.value } })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold uppercase focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Classification Header Level</label>
                <select
                  value={config.documentBranding.classification}
                  onChange={e => setConfig({ ...config, documentBranding: { ...config.documentBranding, classification: e.target.value } })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="RESTRICTED-ENTERPRISE-ONLY">RESTRICTED-ENTERPRISE-ONLY</option>
                  <option value="CONFIDENTIAL-SOVEREIGN">CONFIDENTIAL-SOVEREIGN</option>
                  <option value="PUBLIC-UNCLASSIFIED">PUBLIC-UNCLASSIFIED</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>Mobile & Touch Device Tokens</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border">
                <div>
                  <div className="font-bold text-xs text-slate-900">Compact Mobile Header</div>
                  <div className="text-[11px] text-slate-500">Minimize padding on displays under 768px</div>
                </div>
                <input
                  type="checkbox"
                  checked={config.mobileBranding.headerCompact}
                  onChange={e => setConfig({ ...config, mobileBranding: { ...config.mobileBranding, headerCompact: e.target.checked } })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Navigation Pattern</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['bottom', 'drawer'] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => setConfig({ ...config, mobileBranding: { ...config.mobileBranding, navStyle: style } })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border capitalize transition-all ${
                        config.mobileBranding.navStyle === style
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {style === 'bottom' ? 'Bottom Bar' : 'Side Drawer Modal'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
