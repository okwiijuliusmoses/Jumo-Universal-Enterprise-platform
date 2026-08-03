/**
 * JUMO UEOS
 * Master Registry Synchronization Service
 */

import { masterRegistryRegistry } from "../registry/MasterRegistryRegistry.js";
import { erpRegistry } from "../../registry/ERPRegistry.js";
import { erpInstanceRegistry } from "../../registry/ERPInstanceRegistry.js";

export class MasterRegistrySyncService {

sync(){

    masterRegistryRegistry.update(
        "erp",
        erpRegistry.list()
    );

    masterRegistryRegistry.update(
        "erpInstances",
        erpInstanceRegistry.list()
    );

    return {
        status:"SYNCED",
        timestamp:new Date().toISOString()
    };

}

health(){

    return {
        service:"UEOS Master Registry Sync Service",
        status:"ONLINE"
    };

}

}

export const masterRegistrySyncService =
new MasterRegistrySyncService();
