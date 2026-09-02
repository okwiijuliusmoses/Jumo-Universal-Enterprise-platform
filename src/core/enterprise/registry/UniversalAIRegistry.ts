import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';

export interface AuthoritativeAIAgent {
  agentId: string;
  productId: string;
  name: string;
  description: string;
  modelAlias: string;
  capabilities: string[];
  systemPrompt: string;
}

const RAW_AI_AGENTS: AuthoritativeAIAgent[] = [
  {
    "agentId": "AI_FINTECHMODULEAGENTREGISTRY",
    "productId": "JUMO-FINTECH",
    "name": "FintechModuleAgentRegistry",
    "description": "Autonomous cognitive agent for JUMO FINTECH ERP handling FintechModuleAgentRegistry",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent FintechModuleAgentRegistry operating inside JUMO FINTECH ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_FINTECHCAPABILITYREGISTRY",
    "productId": "JUMO-FINTECH",
    "name": "FintechCapabilityRegistry",
    "description": "Autonomous cognitive agent for JUMO FINTECH ERP handling FintechCapabilityRegistry",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent FintechCapabilityRegistry operating inside JUMO FINTECH ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_WORKFORCEORCHESTRATOR",
    "productId": "JUMO-FINTECH",
    "name": "WorkforceOrchestrator",
    "description": "Autonomous cognitive agent for JUMO FINTECH ERP handling WorkforceOrchestrator",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent WorkforceOrchestrator operating inside JUMO FINTECH ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_PRIMARYACADEMICAGENT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "PrimaryAcademicAgent",
    "description": "Autonomous cognitive agent for JUMO NURSERY & PRIMARY CONSOLIDATED ERP handling PrimaryAcademicAgent",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent PrimaryAcademicAgent operating inside JUMO NURSERY & PRIMARY CONSOLIDATED ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_ECDMILESTONETRACKERAGENT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "EcdMilestoneTrackerAgent",
    "description": "Autonomous cognitive agent for JUMO NURSERY & PRIMARY CONSOLIDATED ERP handling EcdMilestoneTrackerAgent",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent EcdMilestoneTrackerAgent operating inside JUMO NURSERY & PRIMARY CONSOLIDATED ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_BURSARTUITIONRECONCILER",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "BursarTuitionReconciler",
    "description": "Autonomous cognitive agent for JUMO NURSERY & PRIMARY CONSOLIDATED ERP handling BursarTuitionReconciler",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent BursarTuitionReconciler operating inside JUMO NURSERY & PRIMARY CONSOLIDATED ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_SECONDARYACADEMICAGENT",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "SecondaryAcademicAgent",
    "description": "Autonomous cognitive agent for JUMO SECONDARY SCHOOL ERP handling SecondaryAcademicAgent",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent SecondaryAcademicAgent operating inside JUMO SECONDARY SCHOOL ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_DEPARTMENTALHODCOORDINATOR",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "DepartmentalHodCoordinator",
    "description": "Autonomous cognitive agent for JUMO SECONDARY SCHOOL ERP handling DepartmentalHodCoordinator",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent DepartmentalHodCoordinator operating inside JUMO SECONDARY SCHOOL ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_BURSARYFEEAUDITOR",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "BursaryFeeAuditor",
    "description": "Autonomous cognitive agent for JUMO SECONDARY SCHOOL ERP handling BursaryFeeAuditor",
    "modelAlias": "gemini-2.5-pro",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent BursaryFeeAuditor operating inside JUMO SECONDARY SCHOOL ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_ALUMNIADVANCEMENTAGENT",
    "productId": "JUMO-ALUMNI",
    "name": "AlumniAdvancementAgent",
    "description": "Autonomous cognitive agent for JUMO ALUMNI ERP handling AlumniAdvancementAgent",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent AlumniAdvancementAgent operating inside JUMO ALUMNI ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_ENDOWMENTYIELDCALCULATOR",
    "productId": "JUMO-ALUMNI",
    "name": "EndowmentYieldCalculator",
    "description": "Autonomous cognitive agent for JUMO ALUMNI ERP handling EndowmentYieldCalculator",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent EndowmentYieldCalculator operating inside JUMO ALUMNI ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_ALUMNICAREERNETWORKAGENT",
    "productId": "JUMO-ALUMNI",
    "name": "AlumniCareerNetworkAgent",
    "description": "Autonomous cognitive agent for JUMO ALUMNI ERP handling AlumniCareerNetworkAgent",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent AlumniCareerNetworkAgent operating inside JUMO ALUMNI ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_DIOCESANCENSUSAGENT",
    "productId": "JUMO-CHURCH",
    "name": "DiocesanCensusAgent",
    "description": "Autonomous cognitive agent for JUMO CHURCH ERP handling DiocesanCensusAgent",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent DiocesanCensusAgent operating inside JUMO CHURCH ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_TITHESAUDITAGENT",
    "productId": "JUMO-CHURCH",
    "name": "TithesAuditAgent",
    "description": "Autonomous cognitive agent for JUMO CHURCH ERP handling TithesAuditAgent",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent TithesAuditAgent operating inside JUMO CHURCH ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_PASTORALCARESCHEDULER",
    "productId": "JUMO-CHURCH",
    "name": "PastoralCareScheduler",
    "description": "Autonomous cognitive agent for JUMO CHURCH ERP handling PastoralCareScheduler",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent PastoralCareScheduler operating inside JUMO CHURCH ERP. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_RUNTIMERELIABILITYAGENT",
    "productId": "JUMO-CONTROL",
    "name": "RuntimeReliabilityAgent",
    "description": "Autonomous cognitive agent for JUMO OWNER CONTROL CENTER handling RuntimeReliabilityAgent",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent RuntimeReliabilityAgent operating inside JUMO OWNER CONTROL CENTER. Enforce 100% strict compliance and mathematical precision."
  },
  {
    "agentId": "AI_SOVEREIGNVERIFICATIONAGENT",
    "productId": "JUMO-CONTROL",
    "name": "SovereignVerificationAgent",
    "description": "Autonomous cognitive agent for JUMO OWNER CONTROL CENTER handling SovereignVerificationAgent",
    "modelAlias": "gemini-2.5-flash",
    "capabilities": [
      "AUTOMATED_VERIFICATION",
      "SEMANTIC_ANOMALY_DETECTION",
      "PREDICTIVE_SCORING",
      "POLICY_ENFORCEMENT"
    ],
    "systemPrompt": "You are the authoritative sovereign agent SovereignVerificationAgent operating inside JUMO OWNER CONTROL CENTER. Enforce 100% strict compliance and mathematical precision."
  }
];

export const UniversalAIRegistry: RegistryCollection<AuthoritativeAIAgent> = createRegistryCollection(
  RAW_AI_AGENTS,
  "UNIVERSAL_AI_REGISTRY"
);

export function getAIAgentsByProduct(productId: string): AuthoritativeAIAgent[] {
  const upper = (productId || '').toUpperCase();
  return safeFilter(UniversalAIRegistry, a =>
    a.productId.toUpperCase() === upper ||
    (upper.includes('NURSERY') && a.productId.includes('NURSERY')) ||
    (upper.includes('FINTECH') && a.productId.includes('FINTECH')) ||
    (upper.includes('SECONDARY') && a.productId.includes('SECONDARY')) ||
    (upper.includes('ALUMNI') && a.productId.includes('ALUMNI')) ||
    (upper.includes('CHURCH') && a.productId.includes('CHURCH')) ||
    (upper.includes('CONTROL') && a.productId.includes('CONTROL'))
  );
}
