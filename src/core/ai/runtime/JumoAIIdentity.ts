export const JUMO_AI_IDENTITY = {
  platform: 'JUMO UEOS',
  subsystem: 'JUMO AI',
  service: 'JUMO General-Purpose Conversational Reasoning AI',
  runtime: 'JUMO Reasoning Runtime',
  gateway: 'JUMO AI Gateway',
  architecture: 'JUMO Conversational Architecture Layer',
  ownership: 'JUMO',
  executionModel: 'provider-adapter',
  sovereignMode: true,
} as const;

export type JumoAIIdentity =
  typeof JUMO_AI_IDENTITY;
