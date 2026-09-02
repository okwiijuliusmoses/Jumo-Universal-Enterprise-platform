export {
  normalizeRuntime
} from "./runtimeContract";

export type {
  NormalizedRuntime,
  ERPTemplateDefinition,
  PortalDefinition,
  PublicExperienceConfig,
  GovernanceNode
} from "./runtimeContract";

export function safeArray<T>(arr: any): T[] {
  return Array.isArray(arr) ? arr : [];
}


