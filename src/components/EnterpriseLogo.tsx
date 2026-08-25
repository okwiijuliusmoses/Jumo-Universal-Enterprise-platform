/**
 * JUMO DIGITAL ENTERPRISE PLATFORM — Authoritative Enterprise Logo
 * An authoritative geometric shield & crystalline apex emblem representing sovereign enterprise computing.
 */

import React from 'react';

interface EnterpriseLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'blue';
  showText?: boolean;
  className?: string;
  subtitle?: string;
}

export const EnterpriseLogo: React.FC<EnterpriseLogoProps> = ({
  size = 'md',
  variant = 'blue',
  showText = true,
  className = '',
  subtitle
}) => {
  const sizeConfig = {
    sm: { icon: 'w-7 h-7', title: 'text-sm font-bold', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', title: 'text-base font-extrabold', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', title: 'text-xl font-extrabold', sub: 'text-xs' },
    xl: { icon: 'w-16 h-16', title: 'text-2xl font-extrabold', sub: 'text-sm' }
  }[size];

  const variantConfig = {
    light: {
      box: 'bg-[#0078D4] text-white border border-blue-600 shadow-xs',
      text: 'text-slate-900',
      subText: 'text-slate-500',
      accent: 'text-[#0078D4]'
    },
    dark: {
      box: 'bg-white text-[#0078D4] border border-white/20 shadow-xs',
      text: 'text-white',
      subText: 'text-blue-100',
      accent: 'text-white'
    },
    blue: {
      box: 'bg-[#0078D4] text-white shadow-xs border border-blue-500',
      text: 'text-slate-900',
      subText: 'text-slate-500',
      accent: 'text-[#0078D4]'
    }
  }[variant];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Crystalline Geometric Apex Shield */}
      <div
        className={`${sizeConfig.icon} ${variantConfig.box} rounded-xl flex items-center justify-center relative overflow-hidden shrink-0 transition-transform hover:scale-105`}
        title="JUMO DIGITAL ENTERPRISE PLATFORM Sovereign Core"
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4"
        >
          {/* Outer Shield Hexagon */}
          <path
            d="M18 2L32 10V26L18 34L4 26V10L18 2Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="opacity-90"
          />
          {/* Inner Crystalline Nodes */}
          <path
            d="M18 8L26 13V23L18 28L10 23V13L18 8Z"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Central Apex Diamond */}
          <path
            d="M18 12L22 18L18 24L14 18L18 12Z"
            fill="currentColor"
            className="opacity-100"
          />
          {/* Node Connection Radiations */}
          <circle cx="18" cy="18" r="2.5" fill="white" />
          <line x1="18" y1="2" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="18" y1="28" x2="18" y2="34" stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1="10" x2="10" y2="13" stroke="currentColor" strokeWidth="1.5" />
          <line x1="26" y1="23" x2="32" y2="26" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className={`${sizeConfig.title} ${variantConfig.text} tracking-tight leading-none flex items-center gap-1.5 flex-wrap whitespace-nowrap`}>
            <span>JUMO</span>
            <span className={variantConfig.accent}>DIGITAL</span>
            <span>ENTERPRISE PLATFORM</span>
          </div>
          {subtitle && subtitle !== 'ENTERPRISE PLATFORM' && subtitle !== 'ENTERPRISE PLATFORM' && (
            <div className={`${sizeConfig.sub} ${variantConfig.subText} font-mono tracking-wider uppercase mt-1 leading-none font-semibold`}>
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
