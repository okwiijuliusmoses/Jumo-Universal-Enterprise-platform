/**
 * JUMO UEOS Phase 9 — Authoritative Sovereign Password Input Component
 * Features: Show/Hide Toggle, Real-Time Strength Meter, Criteria Feedback, and Accessibility Standard
 */

import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, XCircle, Lock, Shield } from 'lucide-react';

export interface SovereignPasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  showStrength?: boolean;
  showValidation?: boolean;
  className?: string;
}

export const SovereignPasswordInput: React.FC<SovereignPasswordInputProps> = ({
  value = '',
  onChange,
  label = 'Sovereign Password / Passphrase',
  placeholder = 'Enter institutional password...',
  required = true,
  disabled = false,
  showStrength = true,
  showValidation = true,
  className = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Password validation criteria
  const hasMinLength = value.length >= 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>\-_]/.test(value);

  // Calculate score (0 to 5)
  const criteriaCount = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecial].filter(Boolean).length;

  const getStrengthConfig = () => {
    if (value.length === 0) return { label: 'None', color: 'bg-slate-200', text: 'text-slate-600', width: '0%' };
    if (criteriaCount <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600', width: '25%' };
    if (criteriaCount === 3) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600', width: '50%' };
    if (criteriaCount === 4) return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-600', width: '75%' };
    return { label: 'Sovereign Strong', color: 'bg-emerald-500', text: 'text-emerald-600', width: '100%' };
  };

  const strength = getStrengthConfig();

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>{label}</span>
          {required && <span className="text-rose-500">*</span>}
        </label>
        {showStrength && value.length > 0 && (
          <span className={`text-[11px] font-bold ${strength.text} font-mono flex items-center gap-1`}>
            <Shield className="w-3 h-3" />
            {strength.label}
          </span>
        )}
      </div>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-label={label}
          aria-required={required}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-10 py-2.5 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-2.5 text-slate-600 hover:text-slate-700 focus:outline-none transition"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Real-Time Strength Meter Bar */}
      {showStrength && value.length > 0 && (
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div 
            className={`h-full ${strength.color} transition-all duration-300`} 
            style={{ width: strength.width }}
          />
        </div>
      )}

      {/* Password Validation Feedback Checkbox Checklist */}
      {showValidation && (isFocused || value.length > 0) && (
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-[11px] font-mono transition-all">
          <div className="text-slate-500 font-bold mb-1">Ring-0 Password Security Standard:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-700 font-semibold' : 'text-slate-600'}`}>
              {hasMinLength ? <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> : <XCircle className="w-3 h-3 text-slate-700 shrink-0" />}
              <span>8+ characters</span>
            </div>
            <div className={`flex items-center gap-1.5 ${hasUpperCase ? 'text-emerald-700 font-semibold' : 'text-slate-600'}`}>
              {hasUpperCase ? <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> : <XCircle className="w-3 h-3 text-slate-700 shrink-0" />}
              <span>Uppercase letter (A-Z)</span>
            </div>
            <div className={`flex items-center gap-1.5 ${hasLowerCase ? 'text-emerald-700 font-semibold' : 'text-slate-600'}`}>
              {hasLowerCase ? <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> : <XCircle className="w-3 h-3 text-slate-700 shrink-0" />}
              <span>Lowercase letter (a-z)</span>
            </div>
            <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-700 font-semibold' : 'text-slate-600'}`}>
              {hasNumber ? <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> : <XCircle className="w-3 h-3 text-slate-700 shrink-0" />}
              <span>At least 1 number (0-9)</span>
            </div>
            <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-700 font-semibold' : 'text-slate-600 sm:col-span-2'}`}>
              {hasSpecial ? <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> : <XCircle className="w-3 h-3 text-slate-700 shrink-0" />}
              <span>Special symbol (#$@!%*?&)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SovereignPasswordInput;
