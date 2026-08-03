/**
 * JUMO UEOS
 * National Enterprise Runtime Fabric
 */

import { enterpriseRuntime } from "./EnterpriseRuntime.js";
import { GovernanceRuntime } from "./GovernanceRuntime.js";
import { SecurityRuntime } from "./SecurityRuntime.js";
import { DataRuntime } from "./DataRuntime.js";
import { IntegrationRuntime } from "./IntegrationRuntime.js";
import { ComplianceRuntime } from "./ComplianceRuntime.js";
import { AnalyticsRuntime } from "./AnalyticsRuntime.js";
import { IdentityRuntime } from "./IdentityRuntime.js";
import { FinancialRuntime } from "./FinancialRuntime.js";
import { WorkflowRuntime } from "./WorkflowRuntime.js";
import { AIIntelligenceRuntime } from "./AIIntelligenceRuntime.js";
import { ExperienceRuntime } from "./ExperienceRuntime.js";

export class RuntimeFabric {

  constructor(){

    this.status = "ONLINE";

    this.runtimes = {};

    this.register("enterprise", enterpriseRuntime);
    this.register("governance", new GovernanceRuntime());
    this.register("security", new SecurityRuntime());
    this.register("data", new DataRuntime());
    this.register("integration", new IntegrationRuntime());
    this.register("compliance", new ComplianceRuntime());
    this.register("analytics", new AnalyticsRuntime());
    this.register("identity", new IdentityRuntime());
    this.register("financial", new FinancialRuntime());
    this.register("workflow", new WorkflowRuntime());
    this.register("ai", new AIIntelligenceRuntime());
    this.register("experience", new ExperienceRuntime());

  }


  register(name,runtime){

    this.runtimes[name]=runtime;

    return runtime;

  }


  get(name){

    return this.runtimes[name];

  }


  health(){

    return {

      runtime:"UEOS National Runtime Fabric",

      status:this.status,

      activeRuntimes:Object.keys(this.runtimes)

    };

  }

}


export const runtimeFabric = new RuntimeFabric();
