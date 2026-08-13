export interface JumoAIExecutionPolicy {
  localOnly: boolean;
  allowExternalFallback: boolean;
  requireHumanApprovalForExternal: boolean;
}

export const JUMO_AI_EXECUTION_POLICY: JumoAIExecutionPolicy = {
  localOnly: true,
  allowExternalFallback: false,
  requireHumanApprovalForExternal: true,
};
