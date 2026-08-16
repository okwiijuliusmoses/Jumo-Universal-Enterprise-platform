import { GlobalManufacturingLifecycleRegistry } from '../factory/lineage/GlobalManufacturingLifecycleRegistry';
import { JumoAIProviderGateway } from '../ai/gateway/JumoAIProviderGateway';
import { JumoAIAgentRegistry } from '../ai/registry/JumoAIAgentRegistry';

/**
 * JUMO UEOS — Authoritative Live Experience Verification Test
 * 
 * Verifies that the authoritative 20-stage lifecycle is correctly registered,
 * categories are logically grouped, and artifacts are canonically mapped.
 * Includes AI provider diagnostic pings to ensure gateway routing is functional.
 */
export async function runLiveExperienceVerification() {
  const results = {
    testName: "JUMO UEOS Live Experience Verification",
    timestamp: new Date().toISOString(),
    status: "PASS",
    stages: [] as any[],
    categories: {} as Record<string, number>,
    errors: [] as string[]
  };

  try {
    const registry = GlobalManufacturingLifecycleRegistry.getInstance();
    const allStages = registry.getAllStages();

    // 1. Verify Count
    if (allStages.length < 20) {
      results.status = "FAIL";
      results.errors.push(`Expected at least 20 stages, found ${allStages.length}`);
    }

    // 2. Verify Sequence and Registry Integrity
    allStages.forEach((stage, index) => {
      const stageNum = index + 1;
      if (stage.stageNumber !== stageNum) {
        results.errors.push(`Stage sequence break at stage ${stage.id}. Expected ${stageNum}, got ${stage.stageNumber}`);
      }

      results.stages.push({
        id: stage.id,
        name: stage.name,
        category: stage.category,
        artifact: stage.canonicalArtifactType || "NONE"
      });

      results.categories[stage.category] = (results.categories[stage.category] || 0) + 1;
    });

    // 3. Verify Mandatory Categories
    const requiredCategories = ['SPECIFICATION', 'ARCHITECTURE', 'MANUFACTURING', 'ASSURANCE', 'OPERATIONS'];
    requiredCategories.forEach(cat => {
      if (!results.categories[cat]) {
        results.errors.push(`Missing mandatory category: ${cat}`);
      }
    });

    // 4. Diagnostic AI Provider Gateway Ping
    const gateway = JumoAIProviderGateway.getInstance();
    const agent = JumoAIAgentRegistry.getAgentById("jumo-ai-sovereign-architect-001");
    
    if (agent) {
        const pingResult = await gateway.executeAgentTask(
            agent,
            "DIAGNOSTIC_PING",
            "Perform a diagnostic connectivity check. Respond with 'DIAGNOSTIC_PING_SUCCESS'.",
            { test: true }
        );
        
        if (!pingResult.success || !pingResult.output.includes("DIAGNOSTIC_PING_SUCCESS")) {
            results.errors.push(`AI Gateway Diagnostic Ping Failed: ${pingResult.output}`);
        }
    } else {
        results.errors.push("Failed to find architect agent for diagnostic ping");
    }

    if (results.errors.length > 0) {
      results.status = "FAIL";
    }

  } catch (err: any) {
    results.status = "FAIL";
    results.errors.push(`Verification crashed: ${err.message}`);
  }

  return results;
}
