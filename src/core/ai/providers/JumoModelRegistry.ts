export interface JumoModelDefinition {
  modelId: string;
  displayName: string;
  purpose: string;
  reasoning: boolean;
  local: boolean;
  providerId: string;
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'PLANNED';
}

export const JUMO_MODELS: JumoModelDefinition[] = [
  {
    modelId: 'jumo-general-reasoning',
    displayName: 'JUMO General Reasoning AI',
    purpose:
      'General-purpose conversational reasoning, architecture, planning and analysis.',
    reasoning: true,
    local: true,
    providerId: 'jumo-local',
    status: 'PLANNED',
  },

  {
    modelId: 'jumo-specialist-agent-runtime',
    displayName: 'JUMO Specialist Agent Runtime',
    purpose:
      'Bounded execution by specialized enterprise AI agents.',
    reasoning: false,
    local: true,
    providerId: 'jumo-local',
    status: 'PLANNED',
  },

  {
    modelId: 'jumo-external-reasoning-adapter',
    displayName: 'JUMO External Reasoning Adapter',
    purpose:
      'Temporary compatibility layer for an approved external reasoning provider.',
    reasoning: true,
    local: false,
    providerId: 'external-adapter',
    status: 'PLANNED',
  },
];
