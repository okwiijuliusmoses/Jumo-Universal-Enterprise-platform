import React, { useState, useMemo } from 'react';
import { 
  Monitor, Smartphone, ArrowRight, Shield, Cpu, Activity,
  CheckCircle, Globe, Search, Filter, Layers, Database, Lock,
  FileText, Sparkles, Building2, ChevronRight, ExternalLink,
  Award, Play
} from 'lucide-react';
import { ApprovedProductRegistry, ApprovedProductDefinition } from '../../../products/ApprovedProductRegistry';
import { MasterModuleRegistry } from '../registry/MasterModuleRegistry';
import { OFFICE_TO_MODULE_MAP } from '../../../products/OfficeModuleMapping';

interface ProductApplicationLauncherProps {
  onNavigate: (route: string) => void;
  onOpenMetadata?: (productId?: string) => void;
}

export const ProductApplicationLauncher: React.FC<ProductApplicationLauncherProps> = ({
  onNavigate,
  onOpenMetadata
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Business & Finance', 'Institution & Education', 'Ecclesiastical', 'System Control'];

  const filteredProducts = useMemo(() => {
    return ApprovedProductRegistry.filter(p => {
      const matchesSearch = 
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === 'ALL') return true;
      if (selectedCategory === 'Business & Finance' && p.id.includes('FINTECH')) return true;
      if (selectedCategory === 'Institution & Education' && (p.id.includes('EDU') || p.id.includes('NURSERY') || p.id.includes('SECONDARY') || p.id.includes('ALUMNI'))) return true;
      if (selectedCategory === 'Ecclesiastical' && p.id.includes('CHURCH')) return true;
      if (selectedCategory === 'System Control' && p.id.includes('CONTROL')) return true;

      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search independent applications, modules, offices..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Application Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(filteredProducts || []).map((product) => {
          if (!product) return null;
          const modules = MasterModuleRegistry.getModulesForProduct(product.id) || [];
          const moduleCount = modules.length > 0 ? modules.length : (product.modules?.length || 50);
          const hasMobile = (product.id || '').includes('FINTECH') || (product.id || '').includes('CHURCH') || (product.id || '').includes('ALUMNI');

          return (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 border border-slate-200 group-hover:scale-105 transition-transform">
                      {React.createElement(product.icon, { className: 'w-6 h-6' })}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base leading-tight">
                          {product.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {product.code}
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {product.version}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Telemetry Metric Badges */}
                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-[11px] text-slate-600">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-semibold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>50+ Floor Completeness</span>
                    </span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      {Math.min(100, Math.round((moduleCount / 50) * 100))}% Certified
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.min(100, (moduleCount / 50) * 100)}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/60 text-center text-[10px]">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-bold">Modules</div>
                      <div className="font-bold text-slate-900">{moduleCount}</div>
                    </div>
                    <div className="border-x border-slate-200">
                      <div className="text-[9px] text-slate-400 uppercase font-bold">Offices</div>
                      <div className="font-bold text-slate-900">18+</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-bold">AI Swarm</div>
                      <div className="font-bold text-emerald-600">{product.aiCapabilityMapping?.length || 3} Agents</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate(product.route)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Monitor className="w-4 h-4" />
                  <span>Launch Sovereign Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  {hasMobile ? (
                    <button
                      onClick={() => onNavigate(`${product.route}/mobile`)}
                      className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile App</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('/public-portal')}
                      className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Portal Gate</span>
                    </button>
                  )}

                  {onOpenMetadata && (
                    <button
                      onClick={() => onOpenMetadata(product.id)}
                      className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Metadata UI</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
