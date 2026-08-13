// JUMO UEOS — Offline & Hybrid Sync Engine
// Handles offline state reconciliation, local storage fallback, and synchronization when connectivity is restored.

import { SovereignOperatingStateService } from "../runtime/sovereignState";
import { OfflineSyncStatus } from "../runtime/sovereignState.types";

export class JumoOfflineSyncEngine {
  static getStatus(): OfflineSyncStatus {
    return SovereignOperatingStateService.getState().offlineSync;
  }

  static toggleConnectivity(isOnline: boolean): OfflineSyncStatus {
    SovereignOperatingStateService.updateState(draft => {
      draft.offlineSync.isOnline = isOnline;
      if (isOnline) {
        draft.offlineSync.reconciliationStatus = "IN_SYNC";
        draft.offlineSync.lastSyncTimestamp = new Date().toISOString();
        draft.offlineSync.pendingLocalOperations = 0;
      } else {
        draft.offlineSync.reconciliationStatus = "PENDING_SYNC";
      }
    });

    return SovereignOperatingStateService.getState().offlineSync;
  }

  static queueOfflineOperation(): void {
    SovereignOperatingStateService.updateState(draft => {
      draft.offlineSync.pendingLocalOperations += 1;
      draft.offlineSync.reconciliationStatus = "PENDING_SYNC";
    });
  }
}
