import {
  jumoUniversalIntelligence,
} from './JumoUniversalIntelligence';

import {
  createRepositoryInspectionAdapter,
} from './JumoRepositoryInspectionAdapter';

export function initializeJumoUniversalIntelligence(): void {
  jumoUniversalIntelligence.registerInspectionSource(
    'repository',
    createRepositoryInspectionAdapter()
  );
}
