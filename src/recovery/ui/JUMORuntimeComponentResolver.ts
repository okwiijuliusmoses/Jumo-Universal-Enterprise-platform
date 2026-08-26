/**
 * JUMO UEOS — PHASE 3A
 * JUMO Runtime Component Resolver
 *
 * Maps UI Metadata records and capability identifiers to actual React/Enterprise
 * runtime workspace components.
 */

import { UniversalCapabilityUIContract } from './JUMOCapabilityMetadataGenerator';

export interface ResolvedRuntimeComponent {
  componentId: string;
  componentName: string;
  moduleRoute: string;
  isExecutable: boolean;
  props: Record<string, any>;
}

export class JUMORuntimeComponentResolver {
  public static resolve(contract: UniversalCapabilityUIContract): ResolvedRuntimeComponent {
    const componentId = contract.runtimeComponent.componentId;
    
    let componentName = 'UniversalWorkspace';
    switch (componentId) {
      case 'FintechWorkspace':
        componentName = 'FintechModuleWorkspace';
        break;
      case 'EducationWorkspace':
        componentName = 'EducationModuleWorkspace';
        break;
      case 'AlumniWorkspace':
        componentName = 'AlumniModuleWorkspace';
        break;
      case 'ChurchWorkspace':
        componentName = 'ChurchModuleWorkspace';
        break;
      case 'OwnerControlWorkspace':
        componentName = 'OwnerControlCenterWorkspace';
        break;
    }

    return {
      componentId,
      componentName,
      moduleRoute: contract.navigation?.route || `/workspace/${contract.productId.toLowerCase()}/${contract.capabilityId}`,
      isExecutable: true,
      props: {
        capabilityId: contract.capabilityId,
        productId: contract.productId,
        title: contract.navigation?.label || contract.capabilityId,
        hasDashboard: !!contract.dashboard,
        hasTable: (contract.tables || []).length > 0,
        hasForm: (contract.forms || []).length > 0,
        hasWorkflow: (contract.workflows || []).length > 0,
        hasAI: (contract.ai || []).length > 0
      }
    };
  }
}

export default JUMORuntimeComponentResolver;
