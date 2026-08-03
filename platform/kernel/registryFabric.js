/**
 * JUMO UEOS
 * Enterprise Registry Fabric Kernel
 *
 * Unified access layer for all enterprise registries
 */

import {
 nationalEnterpriseRegistry
} from "../registry/nationalEnterpriseRegistry.js";

import {
 organizationRegistry
} from "../registry/organizationRegistry.js";

import {
 serviceRegistry
} from "../registry/serviceRegistry.js";

import {
 dataGovernanceRegistry
} from "../registry/dataGovernanceRegistry.js";

import {
 applicationRegistry
} from "../registry/applicationRegistry.js";

import {
 complianceRegistry
} from "../registry/complianceRegistry.js";

import {
 eventRegistry
} from "../registry/eventRegistry.js";


export class RegistryFabric {


 constructor(){

  this.enterprise =
   nationalEnterpriseRegistry;

  this.organization =
   organizationRegistry;

  this.services =
   serviceRegistry;

  this.data =
   dataGovernanceRegistry;

  this.applications =
   applicationRegistry;

  this.compliance =
   complianceRegistry;

  this.events =
   eventRegistry;

 }



 health(){

  return {

   registry:"ONLINE",

   enterprise:
    this.enterprise.getAll().length,

   organizations:
    this.organization.list().length,

   services:
    this.services.list().length,

   applications:
    this.applications.list().length,

   complianceControls:
    this.compliance.list().length

  };

 }


}


export const registryFabric =
new RegistryFabric();
