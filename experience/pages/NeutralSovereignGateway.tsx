import React from 'react';
import { 
  Package, 
  Settings, 
  Shield, 
  ArrowRight, 
  Monitor, 
  Smartphone,
  Cpu,
  Lock,
  Globe
} from 'lucide-react';
import { ApprovedProductRegistry, ApprovedProductDefinition } from '../../src/products/ApprovedProductRegistry';

interface NeutralSovereignGatewayProps {
  onNavigate: (route: string) => void;
}

export const NeutralSovereignGateway: React.FC<NeutralSovereignGatewayProps> = ({ onNavigate }) => {
  // Group products by category
  const categories = Array.from(new Set(ApprovedProductRegistry.map(p => p.category)));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation Bar (Sovereign Style) */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-sm font-black tracking-tight text-slate-900 uppercase">JUMO UEOS</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sovereign OS Gateway</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Operational</span>
          </div>
          <button 
            onClick={() => onNavigate('/owner-login')}
            className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition uppercase tracking-widest flex items-center gap-2"
          >
            <Lock className="w-3 h-3" /> Owner Vault
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 space-y-16">
        {/* Hero Section */}
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
            Sovereign Independent <br />
            <span className="text-indigo-600">Product Infrastructure</span>
          </h1>
          <p className="mt-4 text-slate-500 text-base leading-relaxed">
            Welcome to the JUMO Universal Enterprise Operating System. Select a sovereign application context from your registry to launch or install into your environment.
          </p>
        </div>

        {/* Product Grid by Category */}
        <div className="space-y-16">
          {categories.map(category => (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{category}</h2>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ApprovedProductRegistry.filter(p => p.category === category).map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onLaunch={() => onNavigate(`${product.route}/login`)}
                    onInstall={() => {}} // Placeholder for install logic
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Runtime Version</span>
              <span className="text-xs font-bold text-slate-900">v18.0.0 Sovereign LTS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cluster Node</span>
              <span className="text-xs font-bold text-slate-900 uppercase">JDHP-PRIMARY-01</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition uppercase tracking-widest">Documentation</button>
            <button className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition uppercase tracking-widest">Support Center</button>
            <button className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition uppercase tracking-widest">Privacy Protocol</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProductCard: React.FC<{ 
  product: ApprovedProductDefinition; 
  onLaunch: () => void;
  onInstall: () => void;
}> = ({ product, onLaunch, onInstall }) => {
  const Icon = product.icon;
  
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-100 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
      {/* Product Highlight Background */}
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${product.bgAccent} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`} />

      <div className="flex items-start justify-between relative z-10">
        <div className={`w-12 h-12 rounded-xl ${product.bgAccent} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-widest">
            {product.version}
          </span>
          {product.monthlyPrice > 0 && (
            <span className="text-[9px] font-bold text-emerald-600 mt-1 uppercase tracking-widest">
              Available
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 flex-1 relative z-10">
        <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
          {product.description}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <Monitor className="w-3.5 h-3.5 text-slate-300" />
          <Smartphone className="w-3.5 h-3.5 text-slate-300" />
          <Globe className="w-3.5 h-3.5 text-slate-300" />
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onLaunch}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors shadow-sm"
          >
            Launch <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
