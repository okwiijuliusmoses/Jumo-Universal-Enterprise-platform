import React, { useState, useRef } from 'react';
import {
  Save, X, AlertCircle, CheckCircle, Clock,
  ChevronRight, ChevronLeft, Search, Filter,
  Download, Edit, Trash2, Plus, ShieldCheck, RefreshCw,
  Upload, Image as ImageIcon, FileText, Camera, Eye
} from 'lucide-react';

export type FormFieldType =
  | 'text' | 'number' | 'currency' | 'email' | 'tel' | 'date' | 'time' | 'select'
  | 'multiselect' | 'checkbox' | 'radio' | 'textarea' | 'file' | 'photo' | 'document' | 'section_header';

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: any;
  validation?: (value: any) => string | null;
  section?: string;
  width?: 'full' | 'half' | 'third';
  helpText?: string;
}

export interface FormSchema {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

interface SchemaFormEngineProps {
  schema: FormSchema;
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  readOnly?: boolean;
}

export const SchemaFormEngine: React.FC<SchemaFormEngineProps> = ({
  schema,
  initialData = {},
  onSubmit,
  onCancel,
  readOnly = false
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoPreviews, setPhotoPreviews] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    schema.fields.forEach(f => {
      if ((f.type === 'photo' || f.type === 'file') && initialData[f.id]) {
        initial[f.id] = initialData[f.id];
      }
    });
    return initial;
  });

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    if (readOnly) return;
    setFormData((prev: any) => ({ ...prev, [fieldId]: value }));

    // Clear error on change
    if (errors[fieldId]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const handleFileUpload = (fieldId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [fieldId]: 'File size exceeds 5MB limit' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhotoPreviews(prev => ({ ...prev, [fieldId]: result }));
      handleInputChange(fieldId, result);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (fieldId: string) => {
    setPhotoPreviews(prev => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
    handleInputChange(fieldId, '');
    if (fileInputRefs.current[fieldId]) {
      fileInputRefs.current[fieldId]!.value = '';
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    schema.fields.forEach(field => {
      if (field.required && !formData[field.id] && field.type !== 'section_header') {
        newErrors[field.id] = `${field.label} is required`;
      }
      if (field.validation && formData[field.id]) {
        const customError = field.validation(formData[field.id]);
        if (customError) newErrors[field.id] = customError;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    if (field.type === 'section_header') {
      return (
        <div key={field.id} className="col-span-full border-b-2 border-slate-900 pb-2 mt-8 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-sm" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">{field.label}</h3>
          </div>
          <div className="h-0.5 flex-1 bg-slate-100 ml-6" />
        </div>
      );
    }

    const fieldClasses = `block w-full px-3.5 py-2 rounded-xl border text-slate-900 text-xs focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all font-medium ${
      errors[field.id] ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-slate-50/50 hover:bg-white'
    } ${readOnly ? 'bg-slate-100/70 text-slate-600 cursor-not-allowed' : ''}`;

    const widthClass =
      field.width === 'half' ? 'col-span-12 md:col-span-6' :
      field.width === 'third' ? 'col-span-12 md:col-span-4' :
      'col-span-12';

    return (
      <div key={field.id} className={widthClass}>
        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-tight mb-1.5 flex items-center justify-between">
          <span>
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </span>
          {field.helpText && <span className="text-[10px] text-slate-400 font-normal">{field.helpText}</span>}
        </label>

        {/* PHOTO & PASSPORT UPLOAD */}
        {field.type === 'photo' && (
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-24 h-28 rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center overflow-hidden relative group">
                {photoPreviews[field.id] ? (
                  <>
                    <img src={photoPreviews[field.id]} alt="Passport Preview" className="w-full h-full object-cover" />
                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => removeFile(field.id)}
                        className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all text-[9px] font-black uppercase"
                      >
                        <Trash2 className="w-4 h-4 mb-1" />
                        Remove
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-center p-2 text-slate-400">
                    <Camera className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Passport</span>
                  </div>
                )}
              </div>

              {!readOnly && (
                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={el => { fileInputRefs.current[field.id] = el; }}
                    onChange={e => handleFileUpload(field.id, e)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[field.id]?.click()}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {photoPreviews[field.id] ? 'Change Photo' : 'Upload Passport Photo'}
                  </button>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Recommended: 2x2 inch formal portrait, white background (JPG or PNG, max 5MB).
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DOCUMENT / FILE UPLOAD */}
        {(field.type === 'file' || field.type === 'document') && (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={el => { fileInputRefs.current[field.id] = el; }}
                onChange={e => handleFileUpload(field.id, e)}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRefs.current[field.id]?.click()}
                disabled={readOnly}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-300 transition-all"
              >
                <FileText className="w-4 h-4 text-slate-600" />
                {formData[field.id] ? 'Replace Document' : 'Attach Document (PDF/Image)'}
              </button>
              {formData[field.id] && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Attached
                </span>
              )}
            </div>
          </div>
        )}

        {/* TEXT, NUMBER, CURRENCY, TEL, EMAIL, DATE, TIME */}
        {(field.type === 'text' || field.type === 'number' || field.type === 'currency' || field.type === 'email' || field.type === 'tel' || field.type === 'date' || field.type === 'time') && (
          <div className="relative">
            <input
              type={field.type === 'currency' ? 'number' : field.type}
              className={fieldClasses}
              placeholder={field.placeholder || `Enter ${field.label}...`}
              value={formData[field.id] ?? ''}
              onChange={e => handleInputChange(field.id, field.type === 'number' || field.type === 'currency' ? Number(e.target.value) : e.target.value)}
              disabled={readOnly}
            />
            {field.type === 'currency' && (
              <span className="absolute right-3 top-2.5 text-[10px] font-black text-slate-400">UGX</span>
            )}
          </div>
        )}

        {/* SELECT */}
        {field.type === 'select' && (
          <select
            className={fieldClasses}
            value={formData[field.id] ?? ''}
            onChange={e => handleInputChange(field.id, e.target.value)}
            disabled={readOnly}
          >
            <option value="">-- Select {field.label} --</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* TEXTAREA */}
        {field.type === 'textarea' && (
          <textarea
            className={`${fieldClasses} min-h-[70px] resize-y`}
            placeholder={field.placeholder || `Enter details for ${field.label}...`}
            value={formData[field.id] ?? ''}
            onChange={e => handleInputChange(field.id, e.target.value)}
            disabled={readOnly}
          />
        )}

        {/* CHECKBOX */}
        {field.type === 'checkbox' && (
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id={field.id}
              className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300"
              checked={!!formData[field.id]}
              onChange={e => handleInputChange(field.id, e.target.checked)}
              disabled={readOnly}
            />
            <label htmlFor={field.id} className="text-xs font-semibold text-slate-700 select-none cursor-pointer">
              {field.placeholder || `Confirm ${field.label}`}
            </label>
          </div>
        )}

        {errors[field.id] && (
          <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-red-600">
            <AlertCircle className="w-3 h-3" />
            <span>{errors[field.id]}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-sm font-black uppercase tracking-wider">{schema.title}</h2>
          {schema.description && (
            <p className="text-xs text-slate-400 font-medium mt-0.5">{schema.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-300">
            Institutional Standard
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-x-4 gap-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        {schema.fields.map(renderField)}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        {!readOnly && (
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-slate-900/10 transition-all hover:scale-[1.01]"
          >
            <Save className="w-4 h-4" />
            {schema.submitLabel || 'Commit Record'}
          </button>
        )}
      </div>
    </form>
  );
};
