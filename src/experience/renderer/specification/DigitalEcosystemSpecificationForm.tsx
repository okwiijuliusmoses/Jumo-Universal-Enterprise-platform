import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, Server, Shield, Database, Users, Layout, FileText, 
  Settings, Activity, Zap, Layers, Plus, Trash2, CheckSquare,
  Wand2, ArrowRight, ShieldAlert, Cpu, Globe, Check, AlertCircle,
  HelpCircle, Sparkles, Sliders, ChevronRight, CheckCircle2, Lock,
  Building2, Key, RefreshCw, BarChart3, Radio, FileCheck
} from 'lucide-react';

import { 
  PRODUCT_FAMILIES, 
  GRADE_REQUIREMENT_PROFILES, 
  PORTAL_CATALOGUE, 
  CAPABILITY_CATALOGUE,
  ProductFamilyId, 
  ProductGradeId, 
  CanonicalEcosystemSpecification,
  JumoSpecificationCompiler,
  JUMO_ENTERPRISE_ECOSYSTEM_CATALOGUE,
  SHARED_PLATFORM_FOUNDATION_COMPONENTS,
  JumoEnterpriseEcosystem
} from '../../../core/specification/JumoSpecificationCompiler';

export type EcosystemSpecification = CanonicalEcosystemSpecification;

export interface DigitalEcosystemSpecificationFormProps {
  onSubmit: (spec: CanonicalEcosystemSpecification) => void;
  initialSpec?: Partial<CanonicalEcosystemSpecification>;
}

export const DigitalEcosystemSpecificationForm: React.FC<DigitalEcosystemSpecificationFormProps> = ({
  onSubmit,
  initialSpec
}) => {
  // Active Navigation Step
  const [activeStep, setActiveStep] = useState<number>(1);

  // Enterprise Ecosystem Selection State
  const [selectedEcoId, setSelectedEcoId] = useState<string>(
    initialSpec?.ecosystemSpecification?.selectedEcosystemId || JUMO_ENTERPRISE_ECOSYSTEM_CATALOGUE[0].id
  );

  const activeEcosystem = useMemo(() => {
    return JUMO_ENTERPRISE_ECOSYSTEM_CATALOGUE.find(e => e.id === selectedEcoId) || JUMO_ENTERPRISE_ECOSYSTEM_CATALOGUE[0];
  }, [selectedEcoId]);

  // Form State
  const [family, setFamily] = useState<ProductFamilyId>(initialSpec?.productFamily || 'ENTERPRISE_MANAGEMENT');
  const [productType, setProductType] = useState<string>(initialSpec?.productType || activeEcosystem.name);
  const [productName, setProductName] = useState<string>(initialSpec?.productName || activeEcosystem.name);
  const [purpose, setPurpose] = useState<string>(initialSpec?.purpose || activeEcosystem.description);
  const [problem, setProblem] = useState<string>(initialSpec?.problemBeingSolved || '');
  const [sector, setSector] = useState<'Public' | 'Private' | 'Hybrid' | 'Sovereign'>(initialSpec?.sector || 'Sovereign');

  // Grade & Profile
  const [grade, setGrade] = useState<ProductGradeId>(initialSpec?.productGrade || 'SOVEREIGN');

  // Scale & Capacity
  const [expectedUsers, setExpectedUsers] = useState<string>(initialSpec?.capacityProfile?.expectedUsers || '10,000');
  const [concurrentUsers, setConcurrentUsers] = useState<string>(initialSpec?.capacityProfile?.concurrentUsers || 'High (1,000+)');
  const [tps, setTps] = useState<number>(initialSpec?.capacityProfile?.transactionsPerSecond || 250);
  const [peakTps, setPeakTps] = useState<number>(initialSpec?.capacityProfile?.peakTransactionsPerSecond || 1000);
  const [dataGb, setDataGb] = useState<number>(initialSpec?.capacityProfile?.dataVolumeGb || 5000);
  const [geoCoverage, setGeoCoverage] = useState<string>(initialSpec?.capacityProfile?.geographicCoverage || 'National Jurisdiction');
  const [tenantModel, setTenantModel] = useState<string>(initialSpec?.capacityProfile?.tenantModel || 'Multi-Agency Federation');

  // Service Level
  const [targetAvailability, setTargetAvailability] = useState<string>(initialSpec?.serviceLevel?.targetAvailability || '99.99%');
  const [rto, setRto] = useState<string>(initialSpec?.serviceLevel?.rtoTarget || '15 Minutes');
  const [rpo, setRpo] = useState<string>(initialSpec?.serviceLevel?.rpoTarget || 'Zero (Sync Replication)');

  // Organization Model
  const [targetOrg, setTargetOrg] = useState<string>(initialSpec?.organizationModel?.targetOrganization || 'National Digital Transformation Authority');
  const [orgType, setOrgType] = useState<string>(initialSpec?.organizationModel?.organizationType || activeEcosystem.organizationTypes[0] || 'Sovereign Authority');
  const [hierarchyNodes, setHierarchyNodes] = useState<string[]>(initialSpec?.organizationModel?.hierarchyNodes || [
    'National Governing Council',
    'Directorate of Operations',
    'Department of Finance',
    'Branch Offices',
    'Field Units'
  ]);
  const [newHierarchyNode, setNewHierarchyNode] = useState<string>('');

  // Portals
  const [selectedPortals, setSelectedPortals] = useState<string[]>(initialSpec?.selectedPortals || activeEcosystem.recommendedPortals);
  const [newCustomPortal, setNewCustomPortal] = useState<string>('');

  // Business Capabilities
  const [selectedCaps, setSelectedCaps] = useState<string[]>(initialSpec?.selectedCapabilities || activeEcosystem.recommendedCapabilities);

  // Product Pack Specifics & Custom Modules
  const [productPackReqs, setProductPackReqs] = useState<string[]>(initialSpec?.productPackRequirements || activeEcosystem.recommendedModules);
  const [newCustomModule, setNewCustomModule] = useState<string>('');

  // Workflows
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>(activeEcosystem.recommendedWorkflows);
  const [newCustomWorkflow, setNewCustomWorkflow] = useState<string>('');

  // Filter Category for Ecosystem Selector
  const [selectedEcoCategory, setSelectedEcoCategory] = useState<string>('ALL');

  // Security Profile
  const [securityGrade, setSecurityGrade] = useState<string>(initialSpec?.securityGrade || 'Sovereign Maximum Shield');
  const [securityControls, setSecurityControls] = useState<string[]>(initialSpec?.selectedSecurityControls || [
    'Zero-Trust Network Access (ZTNA)',
    'Multi-Factor Authentication (MFA)',
    'Role & Attribute-Based Access Control',
    'Immutable Cryptographic Audit Log',
    'Hardware Security Module (HSM) Vault',
    'Automated Key Rotation & PKI'
  ]);

  // Data Profile
  const [dataClasses, setDataClasses] = useState<string[]>(initialSpec?.dataProfile?.dataClasses || [
    'Financial Ledger Entries',
    'Citizen Identity Credentials',
    'Cryptographic Evidence Chain'
  ]);
  const [dataResidency, setDataResidency] = useState<string>(initialSpec?.dataProfile?.dataResidencyCountry || 'Sovereign Jurisdiction');

  // Integrations
  const [integrations, setIntegrations] = useState<string[]>(initialSpec?.selectedIntegrations || [
    'FAAP Treasury Interconnect',
    'JUMO Digital Pay Switch',
    'Sovereign Identity Provider',
    'National Banking Gateway'
  ]);

  // Deployment
  const [deploymentModel, setDeploymentModel] = useState<'JUMO_SOVEREIGN_CLOUD' | 'HYBRID_PRIVATE_NODE' | 'SOVEREIGN_AIR_GAPPED' | 'PUBLIC_MULTI_REGION'>(
    initialSpec?.deploymentModel || 'JUMO_SOVEREIGN_CLOUD'
  );

  // AI Workforce
  const [aiRequirements, setAiRequirements] = useState<string[]>(initialSpec?.aiRequirements || [
    'Conversational AI Agent',
    'Decision Support Engine',
    'Document Intelligence & OCR',
    'Automated Quality & Audit Inspector'
  ]);

  // Recommendations & Overrides
  const [appliedRecommendations, setAppliedRecommendations] = useState<Array<{ ruleId: string; title: string; rationale: string; overrideByClient: boolean }>>([
    {
      ruleId: 'REC-01',
      title: 'Multi-Region Active Failover',
      rationale: 'Automatically recommended because National/Sovereign grade requires uninterrupted business continuity.',
      overrideByClient: false
    },
    {
      ruleId: 'REC-02',
      title: 'Hardware Security Module (HSM) & Zero-Trust',
      rationale: 'Required for Sovereign class data classification and compliance verification.',
      overrideByClient: false
    }
  ]);

  // Sync state when Ecosystem Selection changes
  const handleSelectEcosystem = (eco: JumoEnterpriseEcosystem) => {
    setSelectedEcoId(eco.id);
    setProductName(eco.name);
    setProductType(eco.name);
    setPurpose(eco.description);
    setOrgType(eco.organizationTypes[0] || 'Enterprise Node');
    setSelectedPortals(eco.recommendedPortals);
    setSelectedCaps(eco.recommendedCapabilities);
    setProductPackReqs(eco.recommendedModules);
    setSelectedWorkflows(eco.recommendedWorkflows);
  };

  // Active Family Object
  const currentFamilyObj = useMemo(() => {
    return PRODUCT_FAMILIES.find(f => f.id === family) || PRODUCT_FAMILIES[0];
  }, [family]);

  // Requirement Profile for active grade
  const currentGradeProfile = useMemo(() => {
    return GRADE_REQUIREMENT_PROFILES[grade];
  }, [grade]);

  // Sync available product types when family changes
  useEffect(() => {
    if (currentFamilyObj.types.length > 0 && !currentFamilyObj.types.includes(productType)) {
      setProductType(currentFamilyObj.types[0]);
    }
  }, [family, currentFamilyObj]);

  // Sync grade profile recommendations
  useEffect(() => {
    setTargetAvailability(currentGradeProfile.availabilityTarget);
    setRto(currentGradeProfile.drRto);
    setRpo(currentGradeProfile.drRpo);
  }, [grade, currentGradeProfile]);

  // Generate Recommended Org Structure
  const handleGenerateRecommendedOrg = () => {
    const recommended = JumoSpecificationCompiler.generateRecommendedOrgStructure(family, grade);
    setHierarchyNodes(recommended);
  };

  // Select Recommended Portals
  const handleSelectRecommendedPortals = () => {
    const recommended = PORTAL_CATALOGUE.map(p => p.name);
    if (grade === 'ESSENTIAL' || grade === 'STANDARD') {
      setSelectedPortals(['Public Portal', 'Employee / Staff Portal', 'Administrator Portal']);
    } else {
      setSelectedPortals(recommended.slice(0, 8));
    }
  };

  // Select Recommended Capabilities
  const handleSelectRecommendedCapabilities = () => {
    const caps = CAPABILITY_CATALOGUE.filter(c => c.familyAlignment.includes(family)).map(c => c.name);
    setSelectedCaps(caps.length > 0 ? caps : CAPABILITY_CATALOGUE.map(c => c.name).slice(0, 6));
  };

  // Auto Complete Safe Defaults
  const handleAutoCompleteDefaults = () => {
    if (!productName.trim()) setProductName(`Sovereign ${productType} Platform`);
    if (!purpose.trim()) setPurpose(`Comprehensive automated manufacturing and governance system for ${productType}.`);
    if (!problem.trim()) setProblem('Streamline fragmented legacy platforms into a unified sovereign operating layer.');
    handleGenerateRecommendedOrg();
    handleSelectRecommendedPortals();
    handleSelectRecommendedCapabilities();
  };

  // Calculate Completeness Score
  const currentRawSpec = useMemo(() => {
    return {
      productFamily: family,
      productType,
      productName,
      purpose,
      productGrade: grade,
      selectedPortals,
      selectedCapabilities: selectedCaps,
      selectedSecurityControls: securityControls,
      selectedIntegrations: integrations,
      capacityProfile: { expectedUsers },
      organizationModel: { targetOrganization: targetOrg }
    };
  }, [family, productType, productName, purpose, grade, selectedPortals, selectedCaps, securityControls, integrations, expectedUsers, targetOrg]);

  const completenessScore = useMemo(() => {
    return JumoSpecificationCompiler.calculateCompletenessScore(currentRawSpec as any);
  }, [currentRawSpec]);

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const compiledSpec = JumoSpecificationCompiler.compileSpecification({
      ecosystemSpecification: {
        selectedEcosystemId: activeEcosystem.id,
        selectedEcosystemName: activeEcosystem.name,
        sharedFoundation: SHARED_PLATFORM_FOUNDATION_COMPONENTS,
        customModules: productPackReqs,
        customWorkflows: selectedWorkflows
      },
      productFamily: family,
      productType,
      productName: productName.trim() || `Sovereign ${productType}`,
      purpose: purpose.trim() || `Enterprise platform specification for ${productType}`,
      problemBeingSolved: problem.trim() || 'Modernization of enterprise workflow infrastructure',
      sector,
      productGrade: grade,
      capacityProfile: {
        expectedUsers,
        concurrentUsers,
        transactionsPerSecond: tps,
        peakTransactionsPerSecond: peakTps,
        dataVolumeGb: dataGb,
        apiRequestsPerMin: 15000,
        geographicCoverage: geoCoverage,
        tenantModel,
        annualDataGrowthGb: 1200
      },
      serviceLevel: {
        availabilityProfile: targetAvailability,
        targetAvailability,
        rtoTarget: rto,
        rpoTarget: rpo,
        failoverStrategy: currentGradeProfile.failoverType,
        regionalRedundancy: 'Multi-Zone Active Failover',
        backupFrequency: 'Continuous Snapshot + PITR',
        maintenanceWindow: 'Rolling Zero-Downtime'
      },
      userModel: {
        targetUsers: ['Citizens', 'Staff', 'Operators', 'Auditors'],
        userRoles: ['Admin', 'Auditor', 'Operator', 'Supervisor']
      },
      organizationModel: {
        targetOrganization: targetOrg,
        organizationType: orgType,
        hierarchyNodes
      },
      selectedPortals,
      selectedCapabilities: selectedCaps,
      productPackRequirements: productPackReqs,
      securityGrade,
      selectedSecurityControls: securityControls,
      dataProfile: {
        dataClasses,
        sensitivityLevel: grade === 'SOVEREIGN' ? 'TOP_SECRET_SOVEREIGN' : 'RESTRICTED',
        dataResidencyCountry: dataResidency,
        retentionYears: 10,
        disasterRecoveryType: 'Synchronous Active-Active'
      },
      selectedIntegrations: integrations,
      integrationPattern: 'REAL_TIME_EVENT_DRIVEN',
      deploymentModel,
      scalingStrategy: 'AUTOMATIC_ELASTIC',
      targetInfrastructure: currentGradeProfile.recommendedInfrastructure.join(', '),
      aiRequirements,
      appliedRecommendations,
      completenessScore
    });

    onSubmit(compiledSpec);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-6 pb-16 font-sans">
      
      {/* HEADER BANNER */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/90 px-3 py-1 rounded-full border border-indigo-800">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              Maximum-Standard Product & Enterprise Specification Engine
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white uppercase">WHAT DO YOU WANT JUMO UEOS TO MANUFACTURE?</h2>
            <p className="text-xs text-slate-400">Authoritative, non-technical requirements compiler. Defines WHAT is required before Architecture Studio engineers HOW.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 text-right">
              <div className="text-[9px] font-black uppercase text-slate-400">Spec Readiness</div>
              <div className={`text-lg font-black ${completenessScore >= 80 ? 'text-emerald-400' : completenessScore >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                {completenessScore}%
              </div>
            </div>
            <button
              type="button"
              onClick={handleAutoCompleteDefaults}
              className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Wand2 className="w-4 h-4" />
              Complete Automatically
            </button>
          </div>
        </div>

        {/* STEP TABS */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { id: 1, label: '1. Family & Type' },
            { id: 2, label: '2. Grade & Capacity' },
            { id: 3, label: '3. SLA & Service Level' },
            { id: 4, label: '4. Organization & Portals' },
            { id: 5, label: '5. Capability & Packs' },
            { id: 6, label: '6. Security & Data' },
            { id: 7, label: '7. AI & Compliance' },
            { id: 8, label: '8. Readiness Gate' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStep(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                activeStep === tab.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: JUMO ENTERPRISE ECOSYSTEM CATALOGUE */}
      {activeStep === 1 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  1. Authoritative Enterprise Ecosystem Catalogue
                </h3>
                <p className="text-xs text-slate-500">Select the ecosystem type you wish to manufacture with JUMO UEOS.</p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1">
                {['ALL', 'Specialized Institutional', 'Public & Sovereign', 'Enterprise & Commercial', 'Industrial & Infrastructure'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedEcoCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                      selectedEcoCategory === cat
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Ecosystem Catalogue Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
              {JUMO_ENTERPRISE_ECOSYSTEM_CATALOGUE
                .filter(eco => selectedEcoCategory === 'ALL' || eco.category === selectedEcoCategory)
                .map((eco) => {
                  const isSelected = selectedEcoId === eco.id;
                  return (
                    <div
                      key={eco.id}
                      onClick={() => handleSelectEcosystem(eco)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 relative ${
                        isSelected
                          ? 'bg-indigo-50/60 border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                          : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-black text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded-full uppercase tracking-tight block w-fit">
                            {eco.category}
                          </span>
                          <span className="text-xs font-black text-slate-900 block leading-tight pt-1">{eco.name}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">{eco.description}</p>
                    </div>
                  );
                })}
            </div>

            {/* Active Ecosystem Details & Customization */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Selected Ecosystem: {activeEcosystem.name}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                  ID: {activeEcosystem.id}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 block">
                    Organization Type
                  </label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    {activeEcosystem.organizationTypes.map((ot) => (
                      <option key={ot} value={ot}>{ot}</option>
                    ))}
                    <option value="Custom Organization Type">Custom Organization Type...</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 block">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder={activeEcosystem.name}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 block">
                    Operating Sector
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Sovereign">Sovereign Authority</option>
                    <option value="Public">Public Administration</option>
                    <option value="Private">Private Commercial</option>
                    <option value="Hybrid">Hybrid Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 block">
                    Primary Target Organization
                  </label>
                  <input
                    type="text"
                    value={targetOrg}
                    onChange={(e) => setTargetOrg(e.target.value)}
                    placeholder="e.g. National University / Ministry of Health"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 block">
                    Product Purpose & Scope
                  </label>
                  <textarea
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* MANDATORY SHARED PLATFORM INHERITANCE PANEL */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  JUMO Sovereign Shared Platform Foundation (Automatically Inherited)
                </div>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  LOCKED FOUNDATION
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Every product manufactured by JUMO UEOS automatically inherits the sovereign shared platform foundation. Core capabilities like Identity, AEGIS Security, Double-Entry FAAP Accounting, Pay Switch, and JUMO GPT do not need to be re-built.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 pt-1">
                {SHARED_PLATFORM_FOUNDATION_COMPONENTS.map((item, idx) => (
                  <div key={idx} className="p-2 bg-white border border-emerald-200/60 rounded-lg text-[10px] space-y-0.5">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    </div>
                    <span className="text-[8px] font-bold text-emerald-700 uppercase block">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                Next: Grade & Capacity
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: PRODUCT GRADE & CAPACITY */}
      {activeStep === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600" />
                2. Product Grade & Edition Selection
              </h3>
              <p className="text-xs text-slate-500">Selecting a product grade automatically maps to concrete architectural requirements.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {(Object.keys(GRADE_REQUIREMENT_PROFILES) as ProductGradeId[]).map((g) => {
                const isGradeSel = grade === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`p-3 rounded-xl text-left transition-all border cursor-pointer space-y-1 ${
                      isGradeSel
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-black uppercase">{g.replace('_', ' ')}</div>
                    <div className={`text-[9px] font-medium ${isGradeSel ? 'text-indigo-300' : 'text-slate-500'}`}>
                      {GRADE_REQUIREMENT_PROFILES[g].availabilityTarget} SLA
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mapped Requirements Profile Banner */}
            <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-200 space-y-3">
              <div className="text-xs font-black uppercase text-indigo-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Mapped Requirements Profile for {grade.replace('_', ' ')} Grade
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Availability Target</span>
                  <span className="font-black text-slate-900">{currentGradeProfile.availabilityTarget}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Scaling Model</span>
                  <span className="font-black text-slate-900">{currentGradeProfile.scalingModel}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Zero Trust & Air-Gap</span>
                  <span className="font-black text-slate-900">{currentGradeProfile.zeroTrust ? 'Required' : 'Optional'} | {currentGradeProfile.airGapCapable ? 'Air-Gap Capable' : 'Standard'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Audit Level</span>
                  <span className="font-black text-slate-900">{currentGradeProfile.auditLevel}</span>
                </div>
              </div>
            </div>

            {/* Capacity & Scale Form */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">Capacity & Scale Expectations</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Expected User Base</label>
                  <select
                    value={expectedUsers}
                    onChange={(e) => setExpectedUsers(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="100">100 Users</option>
                    <option value="1,000">1,000 Users</option>
                    <option value="10,000">10,000 Users</option>
                    <option value="100,000">100,000 Users</option>
                    <option value="1,000,000">1 Million Users</option>
                    <option value="10,000,000">10 Million Users</option>
                    <option value="100,000,000">100 Million Users</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Concurrent Users</label>
                  <select
                    value={concurrentUsers}
                    onChange={(e) => setConcurrentUsers(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="Low (<100)">Low (&lt;100)</option>
                    <option value="Medium (1k)">Medium (~1,000)</option>
                    <option value="High (10k)">High (~10,000)</option>
                    <option value="Very High (100k+)">Very High (100,000+)</option>
                    <option value="Mission Critical Peak">Mission Critical Peak</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Geographic Scope</label>
                  <select
                    value={geoCoverage}
                    onChange={(e) => setGeoCoverage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="Facility / Campus">Facility / Campus</option>
                    <option value="City / Region">City / Region</option>
                    <option value="National Jurisdiction">National Jurisdiction</option>
                    <option value="Multi-Country Sovereign">Multi-Country Sovereign</option>
                    <option value="Global Distributed">Global Distributed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Target Transactions / Sec (TPS)</label>
                  <input
                    type="number"
                    value={tps}
                    onChange={(e) => setTps(parseInt(e.target.value) || 100)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Peak Transactions / Sec</label>
                  <input
                    type="number"
                    value={peakTps}
                    onChange={(e) => setPeakTps(parseInt(e.target.value) || 500)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Estimated Data Volume (GB)</label>
                  <input
                    type="number"
                    value={dataGb}
                    onChange={(e) => setDataGb(parseInt(e.target.value) || 1000)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                Next: SLA & Service Level
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: SLA & SERVICE LEVEL */}
      {activeStep === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                3. Availability & Service Level Agreements
              </h3>
              <p className="text-xs text-slate-500">Specify operational availability, failover, RTO, and RPO expectations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Target Availability SLA</label>
                <select
                  value={targetAvailability}
                  onChange={(e) => setTargetAvailability(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                >
                  <option value="99.5%">99.5% (Standard)</option>
                  <option value="99.9%">99.9% (High Availability)</option>
                  <option value="99.99%">99.99% (Enterprise HA)</option>
                  <option value="99.999%">99.999% (Mission Critical Sovereign)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Recovery Time Objective (RTO)</label>
                <select
                  value={rto}
                  onChange={(e) => setRto(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                >
                  <option value="Zero (Instantaneous)">Zero (Instantaneous)</option>
                  <option value="1 Minute">1 Minute</option>
                  <option value="15 Minutes">15 Minutes</option>
                  <option value="1 Hour">1 Hour</option>
                  <option value="4 Hours">4 Hours</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Recovery Point Objective (RPO)</label>
                <select
                  value={rpo}
                  onChange={(e) => setRpo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                >
                  <option value="Zero (Sync Replication)">Zero (Synchronous Replication)</option>
                  <option value="1 Minute">1 Minute</option>
                  <option value="5 Minutes">5 Minutes</option>
                  <option value="15 Minutes">15 Minutes</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-black uppercase text-slate-800 flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600" />
                Active Failover Strategy
              </div>
              <p className="text-xs text-slate-600">{currentGradeProfile.failoverType} — Continuous health checks and automated failover orchestration.</p>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                Next: Organization & Portals
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: ORGANIZATION MODEL & PORTALS */}
      {activeStep === 4 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  4. User & Organization Hierarchy & Portal Catalogue
                </h3>
                <p className="text-xs text-slate-500">Define administrative organization structures and select user access portals.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerateRecommendedOrg}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-black uppercase hover:bg-indigo-100 transition-all cursor-pointer"
                >
                  Generate Structure
                </button>
                <button
                  type="button"
                  onClick={handleSelectRecommendedPortals}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-black uppercase hover:bg-indigo-600 transition-all cursor-pointer"
                >
                  Select Portals
                </button>
              </div>
            </div>

            {/* Organization Hierarchy Builder */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 block">Organization Hierarchy Nodes</label>
              <div className="flex flex-wrap gap-2">
                {hierarchyNodes.map((node, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-2">
                    <span className="text-[10px] text-indigo-600 font-black">{i + 1}.</span> {node}
                    <button
                      type="button"
                      onClick={() => setHierarchyNodes(hierarchyNodes.filter((_, idx) => idx !== i))}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newHierarchyNode}
                  onChange={(e) => setNewHierarchyNode(e.target.value)}
                  placeholder="Add custom hierarchy level (e.g. Regional Command Directorate)..."
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 flex-1"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newHierarchyNode.trim()) {
                      setHierarchyNodes([...hierarchyNodes, newHierarchyNode.trim()]);
                      setNewHierarchyNode('');
                    }
                  }}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase cursor-pointer"
                >
                  Add Node
                </button>
              </div>
            </div>

            {/* Portal Catalogue Selector */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 block">Portal Requirements Catalogue</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {PORTAL_CATALOGUE.map((p) => {
                  const isSel = selectedPortals.includes(p.name);
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedPortals(prev => 
                          prev.includes(p.name) ? prev.filter(x => x !== p.name) : [...prev, p.name]
                        );
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                        isSel
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-black">
                        <span>{p.name}</span>
                        {isSel && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className={`text-[10px] font-medium ${isSel ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {p.category} | Clearance: {p.securityClearance}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(5)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                Next: Capability & Packs
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: CAPABILITY MODEL & PACKS */}
      {activeStep === 5 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  5. Business Capability Model, Modules & Custom Workflows
                </h3>
                <p className="text-xs text-slate-500">Configure core capabilities, modules, and approval workflows for {activeEcosystem.name}.</p>
              </div>

              <button
                type="button"
                onClick={handleSelectRecommendedCapabilities}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-black uppercase hover:bg-indigo-500 transition-all cursor-pointer"
              >
                Select Recommended
              </button>
            </div>

            {/* General Capabilities */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 block">General Capabilities</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {CAPABILITY_CATALOGUE.map((cap) => {
                  const isCapsSel = selectedCaps.includes(cap.name);
                  return (
                    <div
                      key={cap.id}
                      onClick={() => {
                        setSelectedCaps(prev => 
                          prev.includes(cap.name) ? prev.filter(c => c !== cap.name) : [...prev, cap.name]
                        );
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isCapsSel
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{cap.name}</div>
                        <div className={`text-[9px] font-black uppercase ${isCapsSel ? 'text-indigo-400' : 'text-slate-400'}`}>{cap.category}</div>
                      </div>
                      {isCapsSel && <Check className="w-4 h-4 text-indigo-400" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Product Modules & Packs + Add Custom Module */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 block">
                Product Modules & Component Packs ({activeEcosystem.name})
              </label>
              <div className="flex flex-wrap gap-2">
                {productPackReqs.map((mod, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-950 rounded-lg text-xs font-bold flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600" />
                    {mod}
                    <button
                      type="button"
                      onClick={() => setProductPackReqs(productPackReqs.filter((_, idx) => idx !== i))}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCustomModule}
                  onChange={(e) => setNewCustomModule(e.target.value)}
                  placeholder="Add custom product module or pack (e.g. Hostel Accommodation Engine)..."
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 flex-1 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCustomModule.trim()) {
                      setProductPackReqs([...productPackReqs, newCustomModule.trim()]);
                      setNewCustomModule('');
                    }
                  }}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase cursor-pointer hover:bg-indigo-600 transition-colors"
                >
                  + Add Custom Module
                </button>
              </div>
            </div>

            {/* Workflows & Approvals + Add Custom Workflow */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 block">
                Recommended Workflows & Approval Chains
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedWorkflows.map((wf, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-lg text-xs font-bold flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {wf}
                    <button
                      type="button"
                      onClick={() => setSelectedWorkflows(selectedWorkflows.filter((_, idx) => idx !== i))}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCustomWorkflow}
                  onChange={(e) => setNewCustomWorkflow(e.target.value)}
                  placeholder="Add custom workflow approval chain (e.g. Multi-Tier Thesis Verification)..."
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 flex-1 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCustomWorkflow.trim()) {
                      setSelectedWorkflows([...selectedWorkflows, newCustomWorkflow.trim()]);
                      setNewCustomWorkflow('');
                    }
                  }}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase cursor-pointer hover:bg-emerald-600 transition-colors"
                >
                  + Add Custom Workflow
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(6)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                Next: Security & Data
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: SECURITY & DATA PROFILE */}
      {activeStep === 6 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                6. Security Controls & Data Sovereignty Profile
              </h3>
              <p className="text-xs text-slate-500">Specify cryptographic controls, zero trust policies, and data residency standards.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Zero-Trust Network Access (ZTNA)',
                'Multi-Factor Authentication (MFA)',
                'Role & Attribute-Based Access Control',
                'Immutable Cryptographic Audit Log',
                'Hardware Security Module (HSM) Vault',
                'Privileged Access Management (PAM)',
                'Network Micro-Segmentation',
                'Automated Key Rotation & PKI'
              ].map((ctrl) => {
                const isSecSel = securityControls.includes(ctrl);
                return (
                  <button
                    key={ctrl}
                    type="button"
                    onClick={() => {
                      setSecurityControls(prev => 
                        prev.includes(ctrl) ? prev.filter(c => c !== ctrl) : [...prev, ctrl]
                      );
                    }}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      isSecSel
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{ctrl}</span>
                    {isSecSel && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(5)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(7)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                Next: AI & Compliance
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: AI WORKFORCE & COMPLIANCE */}
      {activeStep === 7 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                7. AI Intelligence & Cognitive Workforce Requirements
              </h3>
              <p className="text-xs text-slate-500">Define AI capabilities. The engine automatically assigns relevant 420+ cognitive engineering specialists.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Conversational AI Agent',
                'Decision Support Engine',
                'Document Intelligence & OCR',
                'Automated Quality & Audit Inspector',
                'Neural RAG Search Engine',
                'Fraud & Anomaly Detector'
              ].map((ai) => {
                const isAiSel = aiRequirements.includes(ai);
                return (
                  <button
                    key={ai}
                    type="button"
                    onClick={() => {
                      setAiRequirements(prev => 
                        prev.includes(ai) ? prev.filter(x => x !== ai) : [...prev, ai]
                      );
                    }}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      isAiSel
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{ai}</span>
                    {isAiSel && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(6)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(8)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                Next: Readiness Gate
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 8: READINESS GATE & HANDOFF */}
      {activeStep === 8 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  8. Specification Completeness Gate & Architecture Handoff
                </h3>
                <p className="text-xs text-slate-500">Review specification completeness before passing to Architecture Studio and 420+ cognitive engineering agents.</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Readiness Score</span>
                <span className="text-xl font-black text-emerald-600">{completenessScore}%</span>
              </div>
            </div>

            {/* AI Recommendations & Rationale Audit */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
              <div className="text-xs font-black uppercase text-indigo-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Intelligent Recommendation Audit
              </div>
              <div className="space-y-2">
                {appliedRecommendations.map((rec, i) => (
                  <div key={i} className="p-3 bg-slate-800 rounded-lg border border-slate-700 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>{rec.title}</span>
                      <span className="text-[10px] text-emerald-400 uppercase font-black">ACTIVE RECOMMENDATION</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{rec.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Canonical Handoff Explanation */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
              <div className="text-xs font-black uppercase text-blue-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Automatic Architecture Studio Handoff Protocol
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                Submitting this specification complies with JUMO UEOS policy. The form <strong>will NOT directly trigger manufacturing</strong>.
                It compiles a canonical requirements blueprint and routes directly to <strong>Architecture Studio</strong> where 420+ cognitive engineering agents expand, challenge, and verify the architecture before Human Architect Lock.
              </p>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveStep(7)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all"
              >
                Back
              </button>

              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                Submit Specification to Architecture Studio
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </form>
  );
};
