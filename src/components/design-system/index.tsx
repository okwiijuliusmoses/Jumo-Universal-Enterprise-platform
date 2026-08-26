/**
 * JUMO UEOS — Authoritative Enterprise Design System (v10.0)
 * Sovereign Page Composition, Layout Uniformity & Component Grouping Library
 * 
 * Defines shared typography, spacing, colors, buttons, forms, tables, navigation, 
 * dialogs, icons, and specialized page containers for all enterprise domains.
 */

import React, { useState } from 'react';
import { 
  ChevronRight, Search, CheckCircle2, AlertTriangle, XCircle, Info, 
  X, Filter, Download, Plus, RefreshCw, Layers, ArrowUpRight, Folder, 
  FolderOpen, FileText, ChevronDown, Check, Star, Clock, Shield
} from 'lucide-react';

/* ============================================================================
 * 1. TYPOGRAPHY SYSTEM
 * Professional enterprise sans-serif font family with strict hierarchy.
 * ============================================================================ */

export interface EnterpriseTextProps {
  children: React.ReactNode;
  className?: string;
}

export const EnterpriseTitle: React.FC<EnterpriseTextProps> = ({ children, className = '' }) => (
  <h1 className={`text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-sans ${className}`}>
    {children}
  </h1>
);

export const EnterpriseHeading: React.FC<EnterpriseTextProps> = ({ children, className = '' }) => (
  <h2 className={`text-base md:text-lg font-semibold text-slate-800 tracking-tight font-sans ${className}`}>
    {children}
  </h2>
);

export const EnterpriseSubheading: React.FC<EnterpriseTextProps> = ({ children, className = '' }) => (
  <h3 className={`text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-wider font-sans ${className}`}>
    {children}
  </h3>
);

export const EnterpriseBody: React.FC<EnterpriseTextProps> = ({ children, className = '' }) => (
  <p className={`text-xs md:text-sm text-slate-600 leading-relaxed font-sans ${className}`}>
    {children}
  </p>
);

export const EnterpriseLabel: React.FC<EnterpriseTextProps & { htmlFor?: string; required?: boolean }> = ({ 
  children, htmlFor, required, className = '' 
}) => (
  <label htmlFor={htmlFor} className={`text-xs font-bold text-slate-700 block mb-1 font-sans ${className}`}>
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

export const EnterpriseCode: React.FC<EnterpriseTextProps> = ({ children, className = '' }) => (
  <code className={`font-mono text-[11px] bg-slate-900 text-slate-100 px-1.5 py-0.5 rounded border border-slate-700 ${className}`}>
    {children}
  </code>
);

/* ============================================================================
 * 2. BUTTON & CONTROL SYSTEM
 * Standardized interaction buttons with enterprise sizing and color palettes.
 * ============================================================================ */

export interface EnterpriseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const EnterpriseButton: React.FC<EnterpriseButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 select-none cursor-pointer font-sans";
  
  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs gap-1.5 h-7",
    md: "px-3.5 py-1.5 text-xs gap-2 h-8.5",
    lg: "px-5 py-2.5 text-sm gap-2.5 h-10"
  };

  const variantStyles = {
    primary: "bg-[#0078D4] hover:bg-[#005a9e] text-white shadow-sm border border-blue-600 focus:ring-blue-400 disabled:bg-blue-300",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 focus:ring-slate-400 disabled:bg-slate-50",
    outline: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs focus:ring-blue-400 disabled:bg-slate-50",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-rose-700 focus:ring-rose-400 disabled:bg-rose-300",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-300 disabled:text-slate-400",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border border-emerald-700 focus:ring-emerald-400 disabled:bg-emerald-300"
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  );
};

/* ============================================================================
 * 3. FORM CONTROLS
 * Standardized inputs, selects, search boxes, and toggle controls.
 * ============================================================================ */

export interface EnterpriseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const EnterpriseInput: React.FC<EnterpriseInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  className = '',
  id,
  required,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="w-full space-y-1">
      {label && <EnterpriseLabel htmlFor={inputId} required={required}>{label}</EnterpriseLabel>}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full ${leftIcon ? 'pl-9' : 'pl-3'} pr-3 py-1.5 bg-white border ${
            error ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4]'
          } rounded-lg text-xs text-slate-900 placeholder-slate-400 transition-all focus:outline-none ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
          <AlertTriangle className="w-3 h-3" />
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};

export interface EnterpriseSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string | number }[];
}

export const EnterpriseSelect: React.FC<EnterpriseSelectProps> = ({
  label,
  error,
  options,
  className = '',
  id,
  required,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="w-full space-y-1">
      {label && <EnterpriseLabel htmlFor={selectId} required={required}>{label}</EnterpriseLabel>}
      <select
        id={selectId}
        className={`w-full px-3 py-1.5 bg-white border ${
          error ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4]'
        } rounded-lg text-xs text-slate-900 transition-all focus:outline-none cursor-pointer ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] text-rose-600 font-medium mt-1">{error}</p>}
    </div>
  );
};

/* ============================================================================
 * 4. BADGES & STATUS INDICATORS
 * ============================================================================ */

export interface EnterpriseBadgeProps {
  status: 'active' | 'warning' | 'danger' | 'info' | 'neutral' | 'sovereign';
  children: React.ReactNode;
  className?: string;
}

export const EnterpriseBadge: React.FC<EnterpriseBadgeProps> = ({ status, children, className = '' }) => {
  const styles = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    info: "bg-blue-50 text-[#0078D4] border-blue-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    sovereign: "bg-gradient-to-r from-blue-900 to-indigo-900 text-cyan-300 border-cyan-400/30"
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0 ${styles[status]} ${className}`}>
      {status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
      {status === 'sovereign' && <Shield className="w-3 h-3 text-cyan-400 shrink-0" />}
      {children}
    </span>
  );
};

/* ============================================================================
 * 5. TABLE & DATA GRID SYSTEM
 * Standardized data presentation with clean headers and alternating rows.
 * ============================================================================ */

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface EnterpriseTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function EnterpriseTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = "No enterprise records found in registry.",
  onRowClick
}: EnterpriseTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
      <table className="w-full text-left border-collapse font-sans text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider select-none">
            {columns.map((col, idx) => (
              <th key={idx} className={`py-2.5 px-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-slate-400 font-mono text-xs">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rIdx) => (
              <tr
                key={keyExtractor(row, rIdx)}
                onClick={() => onRowClick && onRowClick(row)}
                className={`transition-colors ${
                  rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                } ${onRowClick ? 'cursor-pointer hover:bg-blue-50/60' : ''}`}
              >
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className={`py-2.5 px-4 text-slate-700 ${col.className || ''}`}>
                    {col.cell ? col.cell(row) : (row as any)[col.accessorKey]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================================
 * 6. TABS CONTROL
 * ============================================================================ */

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface EnterpriseTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const EnterpriseTabs: React.FC<EnterpriseTabsProps> = ({ tabs, activeTab, onChange, className = '' }) => (
  <div className={`flex items-center gap-1 border-b border-slate-200 bg-slate-50/60 px-2 pt-2 overflow-x-auto ${className}`}>
    {tabs.map((tab) => {
      const isActive = tab.id === activeTab;
      return (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all whitespace-nowrap cursor-pointer border-t border-x ${
            isActive
              ? 'bg-white text-[#0078D4] border-slate-200 border-b-transparent shadow-xs font-bold -mb-px z-10'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent'
          }`}
        >
          {tab.icon && <span className={isActive ? 'text-[#0078D4]' : 'text-slate-500'}>{tab.icon}</span>}
          <span>{tab.label}</span>
          {tab.badge !== undefined && (
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
              isActive ? 'bg-blue-100 text-[#0078D4]' : 'bg-slate-200 text-slate-600'
            }`}>
              {tab.badge}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

/* ============================================================================
 * 7. MODAL DIALOG CONTAINER
 * ============================================================================ */

export interface EnterpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const EnterpriseModal: React.FC<EnterpriseModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'lg'
}) => {
  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className={`w-full ${maxWidthStyles[maxWidth]} bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-sans">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5 font-sans">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 font-sans text-xs text-slate-700">
          {children}
        </div>
        {footer && (
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
 * 8. SPECIALIZED PAGE CONTAINERS (PHASE 8 & PHASE 1)
 * Reusable layout wrappers that enforce 80–90% workspace allocation.
 * ============================================================================ */

export interface ContainerProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  breadcrumb?: string[];
}

/**
 * 1. Workspace Container — Primary wrapper for all standard user operations.
 */
export const WorkspaceContainer: React.FC<ContainerProps> = ({
  title, subtitle, actions, children, className = '', breadcrumb
}) => (
  <div className={`w-full flex flex-col gap-4 ${className}`}>
    {/* Breadcrumb & Action Bar */}
    {(title || breadcrumb || actions) && (
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200 bg-white p-4 rounded-xl shadow-xs">
        <div className="space-y-1">
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
              {breadcrumb.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                  <span className={idx === breadcrumb.length - 1 ? 'text-[#0078D4] font-bold' : ''}>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}
          {title && <EnterpriseTitle>{title}</EnterpriseTitle>}
          {subtitle && <EnterpriseBody>{subtitle}</EnterpriseBody>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    )}
    {/* 80-90% Dedicated Content Workspace */}
    <div className="flex-1 w-full">{children}</div>
  </div>
);

/**
 * 2. Management Container — Optimized for administrative and operational consoles.
 */
export const ManagementContainer: React.FC<ContainerProps> = ({
  title, subtitle, actions, children, className = '', breadcrumb
}) => (
  <WorkspaceContainer title={title} subtitle={subtitle} actions={actions} breadcrumb={breadcrumb} className={className}>
    <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-xs space-y-4">
      {children}
    </div>
  </WorkspaceContainer>
);

/**
 * 3. Data Grid Container — Designed specifically for dense tables and records.
 */
export const DataGridContainer: React.FC<ContainerProps> = ({
  title, subtitle, actions, children, className = '', breadcrumb
}) => (
  <WorkspaceContainer title={title} subtitle={subtitle} actions={actions} breadcrumb={breadcrumb} className={className}>
    <div className="space-y-3">
      {children}
    </div>
  </WorkspaceContainer>
);

/**
 * 4. Configuration Container — Structured settings and feature parameter panels.
 */
export const ConfigurationContainer: React.FC<ContainerProps> = ({
  title, subtitle, actions, children, className = '', breadcrumb
}) => (
  <WorkspaceContainer title={title} subtitle={subtitle} actions={actions} breadcrumb={breadcrumb} className={className}>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
      {children}
    </div>
  </WorkspaceContainer>
);

/**
 * 5. Analytics Container — Designed for telemetry, metrics, and report charts.
 */
export const AnalyticsContainer: React.FC<ContainerProps> = ({
  title, subtitle, actions, children, className = '', breadcrumb
}) => (
  <WorkspaceContainer title={title} subtitle={subtitle} actions={actions} breadcrumb={breadcrumb} className={className}>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  </WorkspaceContainer>
);

/**
 * 6. Explorer Container — Split-pane tree explorer for navigation-based administration.
 */
export interface ExplorerContainerProps extends ContainerProps {
  sidebarContent: React.ReactNode;
  sidebarWidth?: 'w-64' | 'w-72' | 'w-80';
}

export const ExplorerContainer: React.FC<ExplorerContainerProps> = ({
  title, subtitle, actions, children, sidebarContent, sidebarWidth = 'w-72', className = '', breadcrumb
}) => (
  <WorkspaceContainer title={title} subtitle={subtitle} actions={actions} breadcrumb={breadcrumb} className={className}>
    <div className="flex flex-col md:flex-row gap-4 min-h-[600px] border border-slate-200 rounded-xl bg-white shadow-xs overflow-hidden">
      {/* Explorer Tree Sidebar */}
      <div className={`${sidebarWidth} bg-slate-50 border-r border-slate-200 p-3 shrink-0 overflow-y-auto max-h-[750px]`}>
        {sidebarContent}
      </div>
      {/* Active Workspace View */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  </WorkspaceContainer>
);

/**
 * 7. Installation Container — Step-by-step module and ERP provisioning layout.
 */
export const InstallationContainer: React.FC<ContainerProps> = ({
  title, subtitle, actions, children, className = '', breadcrumb
}) => (
  <WorkspaceContainer title={title} subtitle={subtitle} actions={actions} breadcrumb={breadcrumb} className={`max-w-4xl mx-auto ${className}`}>
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-2xl space-y-6">
      {children}
    </div>
  </WorkspaceContainer>
);

/**
 * 8. Wizard Container — Multi-step guided configuration form.
 */
export const WizardContainer: React.FC<ContainerProps & { currentStep: number; totalSteps: number }> = ({
  title, subtitle, actions, children, currentStep, totalSteps, className = '', breadcrumb
}) => (
  <WorkspaceContainer title={title} subtitle={subtitle} actions={actions} breadcrumb={breadcrumb} className={`max-w-3xl mx-auto ${className}`}>
    <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 flex">
        <div 
          className="bg-[#0078D4] h-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <div className="p-6 md:p-8 space-y-6">
        {children}
      </div>
    </div>
  </WorkspaceContainer>
);
