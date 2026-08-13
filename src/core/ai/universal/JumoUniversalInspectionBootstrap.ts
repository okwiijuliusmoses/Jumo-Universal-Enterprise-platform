import {
  jumoUniversalIntelligence,
} from './JumoUniversalIntelligence';

import {
  JumoUniversalInspectionRegistry,
} from './JumoUniversalInspectionRegistry';

import {
  createRepositoryInspectionAdapter,
} from './JumoRepositoryInspectionAdapter';

import {
  JumoLifecycleInspectionAdapter,
} from './JumoLifecycleInspectionAdapter';

export const jumoUniversalInspectionRegistry =
  new JumoUniversalInspectionRegistry();

export function initializeUniversalInspection(): void {
  jumoUniversalInspectionRegistry.register(
    'repository',
    createRepositoryInspectionAdapter()
  );


  jumoUniversalInspectionRegistry.register(
    'application-lifecycle',
    new JumoLifecycleInspectionAdapter()
  );

  jumoUniversalIntelligence.registerInspectionSource(
    'repository',
    jumoUniversalInspectionRegistry
  );
}
