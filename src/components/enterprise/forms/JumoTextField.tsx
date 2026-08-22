import React, { useState } from 'react';

interface JumoTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  workflowState?: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
}

export const JumoTextField: React.FC<JumoTextFieldProps> = ({ 
  label, 
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
      <input
        {...props}
        readOnly={isReadOnly || props.readOnly}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          error ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
        } ${isReadOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'text-slate-900'}`}
      />
      {error && <p className="text-xs font-semibold text-red-600 mt-1">{error}</p>}
      {helpText && !error && <p className="text-xs text-slate-500 mt-1">{helpText}</p>}
    </div>
  );
};
