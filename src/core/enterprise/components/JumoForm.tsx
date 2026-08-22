import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

export type FormFieldType = 'text' | 'number' | 'date' | 'select' | 'email' | 'textarea' | 'checkbox';

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  options?: { value: string | number; label: string }[];
  placeholder?: string;
  section?: string;
  defaultValue?: any;
  dependsOn?: { field: string; value: any };
  disabled?: boolean;
}

interface JumoFormProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  submitLabel?: string;
  isSubmitting?: boolean;
  width?: 'md' | 'lg' | 'xl' | '2xl' | 'full';
  error?: string | null;
}

export const JumoForm: React.FC<JumoFormProps> = ({
  title,
  fields,
  onSubmit,
  onCancel,
  initialData = {},
  submitLabel = "Save Record",
  isSubmitting = false,
  width = 'md',
  error = null
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Initialize form data
  useEffect(() => {
    const defaultState: Record<string, any> = { ...initialData };
    fields.forEach(f => {
      if (defaultState[f.id] === undefined) {
        defaultState[f.id] = f.defaultValue !== undefined ? f.defaultValue : (f.type === 'checkbox' ? false : '');
      }
    });
    setFormData(defaultState);
  }, [initialData, fields]);

  const handleChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Group fields by section
  const sections = fields.reduce((acc, field) => {
    const sectionName = field.section || 'General Details';
    if (!acc[sectionName]) acc[sectionName] = [];
    acc[sectionName].push(field);
    return acc;
  }, {} as Record<string, FormField[]>);

  const widthClass = {
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    'full': 'max-w-full m-4'
  }[width];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${widthClass} my-auto overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]`}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 sticky top-0 z-10">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{title}</h3>
          <button 
            onClick={onCancel}
            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="px-6 py-3 bg-rose-50 border-b border-rose-100 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
            <p className="text-xs font-bold text-rose-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            {Object.entries(sections).map(([sectionName, sectionFields]) => (
              <div key={sectionName} className="space-y-4">
                {Object.keys(sections).length > 1 && (
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                    {sectionName}
                  </h4>
                )}
                
                <div className={`grid grid-cols-1 ${width === '2xl' || width === 'full' ? 'sm:grid-cols-2' : ''} gap-5`}>
                  {sectionFields.map((field) => {
                    // Check dependencies
                    if (field.dependsOn) {
                      if (formData[field.dependsOn.field] !== field.dependsOn.value) {
                        return null; // hide field
                      }
                    }

                    return (
                      <div key={field.id} className={`space-y-1.5 ${field.type === 'textarea' && (width === '2xl' || width === 'full') ? 'sm:col-span-2' : ''}`}>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide ml-1 flex justify-between items-center">
                          <span>
                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                          </span>
                        </label>
                        
                        {field.type === 'select' ? (
                          <select
                            value={formData[field.id] || ''}
                            onChange={(e) => handleChange(field.id, e.target.value)}
                            required={field.required}
                            disabled={field.disabled}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                          >
                            <option value="" disabled>Select {field.label}...</option>
                            {field.options?.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            value={formData[field.id] || ''}
                            onChange={(e) => handleChange(field.id, e.target.value)}
                            required={field.required}
                            placeholder={field.placeholder}
                            disabled={field.disabled}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 min-h-[100px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                          />
                        ) : field.type === 'checkbox' ? (
                          <div className="flex items-center gap-2 h-9">
                            <input
                              type="checkbox"
                              checked={!!formData[field.id]}
                              onChange={(e) => handleChange(field.id, e.target.checked)}
                              disabled={field.disabled}
                              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm text-slate-600">{field.placeholder || 'Enable'}</span>
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            value={formData[field.id] || ''}
                            onChange={(e) => handleChange(field.id, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                            required={field.required}
                            placeholder={field.placeholder}
                            disabled={field.disabled}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 z-10">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 text-xs font-bold text-slate-600 uppercase tracking-wide hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
