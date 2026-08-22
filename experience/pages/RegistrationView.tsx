/**
 * JUMO UEOS Self-Service Tenant Registration & Risk Approval Workflow
 */

import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { UEOSGovernanceState, TenantOrg, INITIAL_RULES } from '../../src/lib/ueosState';
import { 
  Building2, ShieldCheck, ArrowLeft, CheckCircle2, AlertTriangle, 
  Upload, FileText, ChevronRight, Check, Sparkles 
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { JUMOEnterpriseHeader } from '../../src/components/JUMOEnterpriseHeader';
import { SovereignPasswordInput } from '../../src/components/SovereignPasswordInput';

export const RegistrationView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  // Pull pre-filled url params if any
  const [formData, setFormData] = useState({
    accountType: 'Institution Account',
    orgName: '',
    industry: 'Commercial Banking',
    adminName: '',
    email: '',
    phone: '',
    country: 'Uganda',
    domainTemplate: 'Commercial Bank',
    password: ''
  });

  const [documentSelected, setDocumentSelected] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [rules, setRules] = useState(INITIAL_RULES);
  const [submitted, setSubmitted] = useState(false);
  const [statusResult, setStatusResult] = useState<'ACTIVE' | 'PENDING'>('PENDING');
  const [computedScore, setComputedScore] = useState(12);

  useEffect(() => {
    // Dynamic lookups if parameters are in search
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const domainParam = params.get('domain');
      const playerParam = params.get('player');

      const rls = UEOSGovernanceState.getRules();
      setRules(rls);

      let industryVal = 'Commercial Banking';
      let templateVal = 'Commercial Bank';

      if (domainParam === 'education') {
        industryVal = 'Education & Universities';
        templateVal = 'University';
      } else if (domainParam === 'healthcare') {
        industryVal = 'Healthcare Systems';
        templateVal = 'Hospital';
      } else if (domainParam === 'agriculture') {
        industryVal = 'Agriculture & Co-ops';
        templateVal = 'Cooperative';
      }

      setFormData(prev => ({
        ...prev,
        industry: industryVal,
        domainTemplate: templateVal,
        orgName: playerParam ? `${playerParam} Org` : ''
      }));
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setDocumentSelected(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentSelected(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Compute an automated risk score based on country and industry
    let score = 10;
    if (formData.country.toLowerCase() !== 'uganda') score += 15;
    if (formData.industry.includes('Bank') || formData.industry.includes('Microfinance')) score += 8;
    if (!documentSelected) score += 20;

    setComputedScore(score);

    // Apply Owner Rules
    let resolvedStatus: 'ACTIVE' | 'PENDING' = 'PENDING';
    if (rules.approvalMode === 'Automatic') {
      resolvedStatus = 'ACTIVE';
    } else if (rules.approvalMode === 'Hybrid') {
      if (score <= rules.riskAutoApproveMax) {
        resolvedStatus = 'ACTIVE';
      } else {
        resolvedStatus = 'PENDING';
      }
    } else {
      resolvedStatus = 'PENDING';
    }

    setStatusResult(resolvedStatus);

    // Save Tenant state
    const currentTenants = UEOSGovernanceState.getTenants();
    const created: TenantOrg = {
      id: `TNT_${Math.floor(Math.random() * 90000) + 10000}`,
      name: formData.orgName,
      email: formData.email,
      industry: formData.industry,
      domainTemplate: formData.domainTemplate,
      status: resolvedStatus,
      riskScore: score,
      registrationDate: new Date().toISOString(),
      activatedServices: resolvedStatus === 'ACTIVE' ? ['Business ERP'] : [],
      verificationDocuments: [documentSelected || 'Standard Registration Request.pdf']
    };

    const updated = [created, ...currentTenants];
    UEOSGovernanceState.saveTenants(updated);

    // Call dynamic backend register to register tenant credentials in-memory
    api.register({
      email: formData.email,
      name: formData.adminName,
      role: 'TENANT',
      tenantId: created.id
    }).catch(err => console.error("Backend register sync bypassed", err));

    // Add financial entry if instantly active
    if (resolvedStatus === 'ACTIVE') {
      const currentLedger = UEOSGovernanceState.getLedger();
      const tx = {
        id: `TX_${Math.floor(Math.random() * 90000) + 10000}`,
        timestamp: new Date().toISOString(),
        debitAccount: '1010 (Cash Reserve)',
        creditAccount: '4010 (SaaS Revenue)',
        amountUSD: 50000,
        description: `Automated self-service setup for ${formData.orgName}`,
        tenantId: created.id,
        balanced: true
      };
      UEOSGovernanceState.saveLedger([tx, ...currentLedger]);
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <JUMOEnterpriseHeader
        onNavigate={onNavigate}
        titleOverride="Sovereign Registration Cockpit"
        subtitleOverride="Tenant Onboarding & Compliance"
      />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              {statusResult === 'ACTIVE' ? (
                <div className="space-y-4">
                  <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ecosystem Activation Successful!</h2>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Organization <span className="font-bold text-slate-900">{formData.orgName}</span> met JUMO automatic onboarding compliance criteria with low risk scoring (<span className="font-bold text-emerald-700 font-mono">{computedScore}/100</span>).
                  </p>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs max-w-md mx-auto space-y-1 text-left font-mono">
                    <div className="flex justify-between"><span>Assigned Partition ID:</span><span className="font-bold">PART-JUMO-{Math.floor(Math.random()*9000+1000)}</span></div>
                    <div className="flex justify-between"><span>Ecosystem Template:</span><span className="font-bold">{formData.domainTemplate}</span></div>
                    <div className="flex justify-between"><span>Status state:</span><span className="text-emerald-600 font-bold">ACTIVE (ONLINE)</span></div>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => onNavigate('/login')}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs uppercase shadow-sm transition-colors"
                    >
                      Proceed to Secure Sign In
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Registration Under Compliance Review</h2>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your request for <span className="font-bold text-slate-900">{formData.orgName}</span> is pending manual verification. Calculated risk profile weight (<span className="font-bold text-blue-700 font-mono">{computedScore}/100</span>) triggered strict JUMO safety policies.
                  </p>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs max-w-md mx-auto space-y-2 text-left">
                    <span className="font-bold text-slate-800 block">Pending Compliance Step:</span>
                    <p className="text-[11px] text-slate-500">Platform Owners have been notified to review corporate licenses and verify HSM authentication configurations. Review status: <span className="text-blue-600 font-semibold font-mono">PENDING_AUDIT</span>.</p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => onNavigate('/public')}
                      className="px-6 py-2.5 bg-white hover:bg-white text-white rounded font-bold text-xs uppercase shadow-sm transition-colors"
                    >
                      Return to Gateway Portal
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Enterprise Onboarding Wizard</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Step-by-step institutional registration & verification</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                    Step {currentStep} of 5
                  </span>
                </div>

                {/* Stepper Progress Bar */}
                <div className="flex items-center justify-between gap-1 mb-6 border-b border-slate-100 pb-4 text-xs font-semibold">
                  <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
                    Identity
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
                    Institution
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
                    Verification
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <div className={`flex items-center gap-1.5 ${currentStep >= 4 ? 'text-blue-600' : 'text-slate-400'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
                    Role
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <div className={`flex items-center gap-1.5 ${currentStep >= 5 ? 'text-blue-600' : 'text-slate-400'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${currentStep >= 5 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>5</span>
                    Confirm
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">Step 1: Account Classification & Identity</h3>
                    
                    <div className="space-y-1">
                      <label className="text-slate-600 font-bold">Account Classification Type</label>
                      <select
                        value={formData.accountType}
                        onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600 bg-white font-semibold text-slate-800"
                      >
                        <option value="Owner Account">Owner Account (Ring-0 Master Authority)</option>
                        <option value="Institution Account">Institution Account (School, Hospital, Church, SACCO, Corp)</option>
                        <option value="Public Account">Public / Citizen Account (General Public & Visitor)</option>
                        <option value="Citizen Account">Citizen Account (National Identity & Local Government Services)</option>
                        <option value="Employee Account">Employee Account (Institutional Staff & Personnel)</option>
                        <option value="Student Account">Student Account (Learner & Academic SIS)</option>
                        <option value="Patient Account">Patient Account (Medical & EMR Portal)</option>
                        <option value="Member Account">Member Account (SACCO, Church, Cooperative, Union)</option>
                        <option value="Customer Account">Customer Account (Retail, E-commerce, Billing)</option>
                        <option value="Supplier Account">Supplier Account (Procurement & Vendor Portal)</option>
                        <option value="Partner Account">Partner Account (Enterprise Partner & Ecosystem Integration)</option>
                        <option value="Vendor Account">Vendor Account (Merchant & Payment Clearing)</option>
                        <option value="Applicant Account">Applicant Account (Admissions & Job Requisitions)</option>
                        <option value="Volunteer Account">Volunteer Account (NGO & Community Outreach)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-600 font-bold">Primary Account Holder / Admin Name</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.adminName}
                          onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600 bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600 font-bold">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="admin@institution.ug"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600 bg-slate-50"
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <SovereignPasswordInput
                        value={formData.password}
                        onChange={(val) => setFormData({ ...formData, password: val })}
                        label="Primary Administrator Passphrase"
                        placeholder="Create a strong institutional password..."
                        required
                        showStrength={true}
                        showValidation={true}
                      />
                    </div>
                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        disabled={!formData.adminName || !formData.email || !formData.password}
                        className="px-6 py-2.5 bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center gap-2"
                      >
                        Next Step: Institution <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">Step 2: Institution & Domain Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-600 font-bold">Organization / Institution Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Nile Credit Union Ltd"
                          value={formData.orgName}
                          onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600 bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-600 font-bold">Industry Sector Category</label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600 bg-slate-50 cursor-pointer"
                        >
                          <option value="Commercial Banking">Commercial Banking & Fintech</option>
                          <option value="Education & Universities">Education & Academic</option>
                          <option value="Healthcare Systems">Healthcare & Hospital</option>
                          <option value="Agriculture & Co-ops">Agriculture & Cooperatives</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-600 font-bold">Select Domain Template Choice</label>
                        <select
                          value={formData.domainTemplate}
                          onChange={(e) => setFormData({ ...formData, domainTemplate: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600 bg-slate-50 cursor-pointer"
                        >
                          {formData.industry.includes('Bank') && (
                            <>
                              <option value="Commercial Bank">Commercial Bank Template</option>
                              <option value="Microfinance">Microfinance Institution</option>
                              <option value="SACCO">SACCO / Credit Cooperative</option>
                              <option value="Fintech Wallet">Fintech Mobile Wallet</option>
                            </>
                          )}
                          {formData.industry.includes('Education') && (
                            <>
                              <option value="University">University ERP Template</option>
                              <option value="School">School / College System</option>
                              <option value="Online Academy">Online Learning Portal</option>
                            </>
                          )}
                          {formData.industry.includes('Healthcare') && (
                            <>
                              <option value="Hospital">Hospital EHR Platform</option>
                              <option value="Clinic">Medical Clinic ERP</option>
                              <option value="Insurance Provider">Health Insurance Suite</option>
                            </>
                          )}
                          {formData.industry.includes('Agri') && (
                            <>
                              <option value="Cooperative">Agriculture Co-op ledger</option>
                              <option value="Yield Optimizer">Yield Forecasting Engine</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-600 font-bold">Country / Headquarter Region</label>
                        <input
                          type="text"
                          required
                          placeholder="Uganda"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600 bg-slate-50"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded font-bold text-xs uppercase shadow-xs transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        disabled={!formData.orgName}
                        className="px-6 py-2.5 bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center gap-2"
                      >
                        Next Step: Verification <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">Step 3: Verification & Compliance Document</h3>
                    <div className="space-y-1.5">
                      <label className="text-slate-600 font-bold">Corporate Verification Document (.pdf / License)</label>
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                          isDragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Upload className="w-6 h-6 text-slate-600" />
                          <span className="text-slate-600 font-semibold text-xs">
                            {documentSelected ? `Attached: ${documentSelected}` : 'Drag and drop license file or click to browse'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono uppercase">PDF, PNG up to 10MB</span>
                        </div>
                        <input 
                          type="file" 
                          accept=".pdf,.png,.jpg"
                          onChange={handleFileChange} 
                          className="hidden" 
                          id="file-selector-upload"
                        />
                        <label htmlFor="file-selector-upload" className="mt-2.5 inline-block px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded text-[11px] font-semibold text-slate-700 cursor-pointer shadow-xs">
                          Select License File
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded font-bold text-xs uppercase shadow-xs transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center gap-2"
                      >
                        Next Step: Role <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">Step 4: Primary Administrative Role & Governance</h3>
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-slate-700 space-y-2 text-xs">
                      <div className="font-bold text-blue-900">Assigned Privilege Tier: INSTITUTION_SUPER_ADMIN</div>
                      <p>
                        Your account will serve as the root administrator for <span className="font-bold">{formData.orgName || 'your organization'}</span> with full RBAC / ABAC authority over department provisioning, user invitations, and financial ledger policies.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-slate-600 font-bold block">Select Workspace Deployment Profile</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3 cursor-pointer hover:border-blue-500">
                          <input type="radio" name="deployProfile" defaultChecked className="text-blue-600" />
                          <div>
                            <div className="font-bold text-slate-800">Standard Hybrid ERP</div>
                            <div className="text-[11px] text-slate-500">Complete multi-department workspace</div>
                          </div>
                        </label>
                        <label className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3 cursor-pointer hover:border-blue-500">
                          <input type="radio" name="deployProfile" className="text-blue-600" />
                          <div>
                            <div className="font-bold text-slate-800">High-Security Sovereign</div>
                            <div className="text-[11px] text-slate-500">Strict zero-trust data segregation</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded font-bold text-xs uppercase shadow-xs transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(5)}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center gap-2"
                      >
                        Next Step: Confirm <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">Step 5: Review & Confirm Onboarding Request</h3>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                      <div className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-slate-500">Administrator:</span>
                        <span className="font-bold text-slate-900">{formData.adminName} ({formData.email})</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-slate-500">Institution:</span>
                        <span className="font-bold text-slate-900">{formData.orgName}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-slate-500">Sector / Template:</span>
                        <span className="font-bold text-slate-900">{formData.industry} / {formData.domainTemplate}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-slate-500">Region:</span>
                        <span className="font-bold text-slate-900">{formData.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Attached License:</span>
                        <span className="font-bold text-slate-900">{documentSelected || 'Standard Verification Document.pdf'}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded font-bold text-xs uppercase shadow-xs transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
                      >
                        Complete Account Registration
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
