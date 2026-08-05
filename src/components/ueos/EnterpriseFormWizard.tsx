import React, { useState } from "react";
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, Upload, ShieldCheck } from "lucide-react";

export interface FormStep {
  id: string;
  title: string;
  description?: string;
}

export interface EnterpriseFormWizardProps {
  title?: string;
  steps?: FormStep[];
  onSubmit?: (formData: any) => void;
  onCancel?: () => void;
}

const DEFAULT_STEPS: FormStep[] = [
  { id: "personal", title: "1. Personal Information", description: "Applicant biodata & identity" },
  { id: "background", title: "2. Academic Background", description: "Prior credentials & qualifications" },
  { id: "documents", title: "3. Document Upload", description: "Certificates, national ID & passport" },
  { id: "payment", title: "4. Fee Settlement", description: "FAAP application clearance fee" },
  { id: "approval", title: "5. Review & Submission", description: "Verification & Senate dispatch" }
];

export const EnterpriseFormWizard: React.FC<EnterpriseFormWizardProps> = ({
  title = "Sovereign Institutional Application Wizard",
  steps = DEFAULT_STEPS,
  onSubmit,
  onCancel,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<any>({
    fullName: "Jane Doe",
    email: "j.doe@sovereign.edu",
    phone: "+256 700 123456",
    nationalId: "CM98012345678A",
    previousInst: "Kampala Senior Academy",
    gradeScore: "First Class Distinction",
    programSelect: "Bachelor of Science in Computer Engineering",
    paymentMethod: "FAAP Treasury Clearing",
    agreedToTerms: true,
  });
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  const currentStep = steps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      if (onSubmit) onSubmit(formData);
      setSubmittedNotice("Application successfully processed into the Admissions Operational Workflow Pipeline.");
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const updateField = (field: string, val: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: val }));
  };

  return (
    <div id="enterprise-form-wizard" className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-5">
      
      {/* Wizard Header */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-extrabold text-base text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">Grouped step-by-step form execution. FAAP transactional validation active.</p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between overflow-x-auto py-2 gap-2 border-b border-slate-100">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={step.id} className="flex items-center gap-2 shrink-0">
              <div className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center font-mono ${
                isDone 
                  ? "bg-emerald-600 text-white" 
                  : isCurrent 
                  ? "bg-slate-900 text-teal-400 border border-slate-700" 
                  : "bg-slate-100 text-slate-500"
              }`}>
                {isDone ? "✓" : idx + 1}
              </div>
              <div className="text-xs hidden sm:block">
                <div className={`font-bold ${isCurrent ? "text-slate-900" : "text-slate-500"}`}>{step.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {submittedNotice ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-mono font-bold text-center space-y-2">
          <div>✓ {submittedNotice}</div>
          <button
            onClick={() => {
              setSubmittedNotice(null);
              setCurrentStepIndex(0);
            }}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs transition cursor-pointer"
          >
            Start New Form Entry
          </button>
        </div>
      ) : (
        /* Form Step Content */
        <div className="space-y-4 py-2">
          
          {/* STEP 1: PERSONAL INFORMATION */}
          {currentStep.id === "personal" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">National ID / Passport Number</label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => updateField("nationalId", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>
            </div>
          )}

          {/* STEP 2: ACADEMIC BACKGROUND */}
          {currentStep.id === "background" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Previous Institution</label>
                <input
                  type="text"
                  value={formData.previousInst}
                  onChange={(e) => updateField("previousInst", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Grade / Qualification Score</label>
                <input
                  type="text"
                  value={formData.gradeScore}
                  onChange={(e) => updateField("gradeScore", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Target Academic Program</label>
                <select
                  value={formData.programSelect}
                  onChange={(e) => updateField("programSelect", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                >
                  <option value="Bachelor of Science in Computer Engineering">Bachelor of Science in Computer Engineering</option>
                  <option value="Bachelor of Medicine & Bachelor of Surgery">Bachelor of Medicine & Bachelor of Surgery</option>
                  <option value="Bachelor of Business Administration & FAAP Accounting">Bachelor of Business Administration & FAAP Accounting</option>
                  <option value="Master of Science in Artificial Intelligence">Master of Science in Artificial Intelligence</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENT UPLOAD */}
          {currentStep.id === "documents" && (
            <div className="space-y-3 text-xs">
              <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-2 bg-slate-50">
                <Upload className="h-6 w-6 text-slate-400 mx-auto" />
                <div className="font-bold text-slate-800">Drag & Drop Required Documents or Browse</div>
                <p className="text-[11px] text-slate-500">
                  Accepted formats: PDF, PNG, JPG (Max 10MB per document).
                </p>
                <button className="px-3 py-1.5 bg-slate-900 text-white rounded font-bold text-xs cursor-pointer">
                  Select Files
                </button>
              </div>
              <div className="text-[11px] font-mono text-emerald-700 font-semibold">
                ✓ Academic_Transcripts.pdf (Verified)
              </div>
            </div>
          )}

          {/* STEP 4: FEE SETTLEMENT */}
          {currentStep.id === "payment" && (
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="font-bold text-slate-900">Application Processing Fee</div>
                <div className="text-2xl font-black text-slate-900 font-mono">$50.00 USD</div>
                <p className="text-[11px] text-slate-600">
                  Settlement cleared directly into the Institution FAAP Treasury Revenue Account.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clearing Channel</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => updateField("paymentMethod", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                >
                  <option value="FAAP Treasury Clearing">FAAP Master Treasury Router</option>
                  <option value="Mobile Money / M-Pesa">Mobile Money / M-Pesa Clearing</option>
                  <option value="Visa / Mastercard">Visa / Mastercard Credit Card</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 5: APPROVAL */}
          {currentStep.id === "approval" && (
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-2 font-mono">
                <div className="text-teal-400 font-bold">FAAP & Zero-Trust Verification Summary</div>
                <div>Applicant: {formData.fullName} ({formData.email})</div>
                <div>Program: {formData.programSelect}</div>
                <div>Fee Status: Cleared ($50.00 FAAP Ledger Entry)</div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={formData.agreedToTerms}
                  onChange={(e) => updateField("agreedToTerms", e.target.checked)}
                  className="rounded border-slate-300"
                />
                <label htmlFor="agree-terms" className="text-xs text-slate-700">
                  I certify that all information submitted is accurate under sovereign university regulations.
                </label>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 border border-slate-300 rounded font-bold text-xs flex items-center gap-1 transition cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <span>{currentStepIndex === steps.length - 1 ? "Submit Application" : "Continue"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
