import { NPERP_MANIFEST } from './manifest';
import { NURSERY_PRIMARY_HIERARCHY } from '../canonical/nurseryPrimary';

export function bootstrapNperpProduct() {
  return {
    initialized: true,
    productId: NPERP_MANIFEST.productId,
    code: NPERP_MANIFEST.code,
    name: NPERP_MANIFEST.name,
    mountedModulesCount: NURSERY_PRIMARY_HIERARCHY.modules.length,
    mountedCapabilitiesCount: NURSERY_PRIMARY_HIERARCHY.capabilities.length,
    timestamp: new Date().toISOString(),
    isolationValidated: true
  };
}
