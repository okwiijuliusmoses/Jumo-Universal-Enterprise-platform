import React, { useState } from 'react';
import { 
  DollarSign, GraduationCap, Users, ChevronDown, Check, Sparkles, ArrowRight
} from 'lucide-react';

export interface ProductSwitchOption {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  route: string;
  color: string;
  bgColor: string;
  accentBg: string;
  description: string;
  icon: React.ElementType;
}

export const APPROVED_PRODUCTS_LIST: ProductSwitchOption[] = [
  {
    id: 'fintech',
    name: 'JUMO FINTECH',
    shortName: 'FINTECH',
    badge: '37 FAMILIES',
    route: '/products/fintech',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-600',
    accentBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Sovereign Financial Operating System • FAAP Ledger & Payment Switching',
    icon: DollarSign,
  },
  {
    id: 'education-erp',
    name: 'JUMO UNIVERSAL EDUCATION ERP',
    shortName: 'EDUCATION ERP',
    badge: 'INSTITUTIONAL',
    route: '/products/education',
    color: 'text-blue-500',
    bgColor: 'bg-blue-600',
    accentBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    description: 'University & School Governance • Registrar, Bursary & Academic Senate',
    icon: GraduationCap,
  },
  {
    id: 'alumni-erp',
    name: 'JUMO ALUMNI ERP',
    shortName: 'ALUMNI ERP',
    badge: 'ADVANCEMENT',
    route: '/products/alumni',
    color: 'text-rose-500',
    bgColor: 'bg-rose-600',
    accentBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    description: 'Institutional Advancement • Census, Global Chapters & Endowments',
    icon: Users,
  }
];

interface PlatformSwitcherProps {
  currentProductId?: string;
  onNavigate?: (path: string) => void;
}

export const PlatformSwitcher: React.FC<PlatformSwitcherProps> = ({ 
  currentProductId = 'fintech',
  onNavigate 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentProduct = APPROVED_PRODUCTS_LIST.find(p => p.id === currentProductId) || APPROVED_PRODUCTS_LIST[0];
  const CurrentIcon = currentProduct.icon;

  const handleSelect = (path: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-white transition-all cursor-pointer group"
      >
        <div className={`w-6 h-6 rounded-md ${currentProduct.bgColor} flex items-center justify-center text-white shrink-0 shadow-xs font-black`}>
          <CurrentIcon className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap">
            {currentProduct.name}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150 text-slate-900">
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100 px-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                SWITCH APPROVED PRODUCT
              </span>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                3 AUTHORITATIVE PRODUCTS
              </span>
            </div>

            <div className="space-y-1.5">
              {APPROVED_PRODUCTS_LIST.map((prod) => {
                const Icon = prod.icon;
                const isSelected = prod.id === currentProductId;

                return (
                  <button
                    key={prod.id}
                    onClick={() => handleSelect(prod.route)}
                    className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all border text-left cursor-pointer group ${
                      isSelected
                        ? 'bg-slate-50 border-slate-200 shadow-xs'
                        : 'border-transparent hover:bg-slate-50 hover:border-slate-100'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${prod.bgColor} flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform mt-0.5`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900 group-hover:text-slate-950">
                            {prod.name}
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {prod.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
