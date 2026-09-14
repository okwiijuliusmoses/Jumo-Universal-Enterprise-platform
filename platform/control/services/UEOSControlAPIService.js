/**
 * JUMO UEOS
 * Control Plane API Service
 */

import { ueosControlPlane } from "../UEOSControlPlane.js";

export class UEOSControlAPIService {

  health(){
    return ueosControlPlane.health();
  }

  aiStatus(){
    return ueosControlPlane.health().ai;
  }

  registryStatus(){
    return ueosControlPlane.health().registries;
  }

  settingsStatus(){
    return ueosControlPlane.health().settings;
  }

}

export const ueosControlAPIService =
 new UEOSControlAPIService();
