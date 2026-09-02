/**
 * JUMO UEOS
 * Master Governance Registry
 */

import { registryFederationMap } from "./RegistryFederationMap.js";


export class MasterRegistryRegistry {

    constructor(){

        this.registry = {};

    }


    register(type, item){

        // Support register(object) bootstrap style
        if(typeof type === "object"){

            const registry = type;

            const key =
                registry.id ||
                registry.name ||
                registry.registry ||
                `registry_${Object.keys(this.registry).length + 1}`;

            this.registry[key] = registry;

            return registry;

        }


        // Support register(type,item) style

        if(!this.registry[type]){
            this.registry[type] = [];
        }

        this.registry[type].push(item);

        return item;

    }


    list(){

        return this.registry;

    }


    syncRegistry(name, registry){

        const key =
            name ||
            registry?.id ||
            registry?.name ||
            `registry_${Object.keys(this.registry).length + 1}`;

        this.registry[key] = registry || {};

        return this.registry[key];

    }


    health(){

        return {

            federation:
                registryFederationMap,

            registry:
                "JUMO UEOS Master Governance Registry",

            status:
                "ONLINE",

            governanceRegistries:
                Object.keys(this.registry).length,

            domains:
                Object.keys(this.registry),

            counts:
                Object.fromEntries(
                    Object.entries(this.registry)
                    .map(
                        ([key,value])=>[
                            key,
                            Array.isArray(value)
                            ? value.length
                            : 1
                        ]
                    )
                )

        };

    }


}


export const masterRegistryRegistry =
    new MasterRegistryRegistry();
