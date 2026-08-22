import React from 'react';

interface JumoCurrencyFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  currencyCode?: string;
  error?: string;
  helpText?: string;
  workflowState?: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
}

export const JumoCurrencyField: React.FC<JumoCurrencyFieldProps> = ({ 
  label, 
  currencyCode = 'UGX',
  error, 
  helpText,
  workflowState = 'DRAFT',
  className = '',
  ...props 
}) => {
  const isReadOnly = workflowState === 'PENDING_APPROVAL' || workflowState === 'APPROVED';

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative rounded-lg shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-slate-500 sm:text-sm font-bold">{currencyCode}</span>
        </div>
        <input
          type="number"
          step="0.01"
          {...props}
          readOnly={isReadOnly || props.readOnly}
          className={`block w-full border rounded-lg pl-12 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-mono ${
            error ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
          } ${isReadOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'text-slate-900'}`}
        />
      </div>
      {error && <p className="text-xs font-semibold text-red-600 mt-1">{error}</p>}
      {helpText && !error && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
    </div>
  );
};
