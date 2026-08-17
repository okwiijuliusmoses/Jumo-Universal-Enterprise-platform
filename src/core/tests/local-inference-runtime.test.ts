// JUMO UEOS — Local Inference Runtime Verification Tests (Tests 1 - 10)
import { LocalInferenceRuntimeRegistry } from "../ai/runtime/LocalInferenceRuntime";
import { JumoAIProviderGateway } from "../ai/gateway/JumoAIProviderGateway";
import { JumoAIAgentRegistry } from "../ai/registry/JumoAIAgentRegistry";

export async function runLocalInferenceRuntimeVerification(): Promise<{ success: boolean; results: Record<string, any> }> {
  console.log("[JUMO V&V] Starting Local Inference Runtime Verification Suite (Tests 1-10)...");
  const registry = LocalInferenceRuntimeRegistry.getInstance();
  const testResults = await registry.runMandatoryTests();

  let allPassed = true;
  for (const [key, val] of Object.entries(testResults)) {
    console.log(`[VERIFY] ${key}: ${val.passed ? 'PASSED' : 'FAILED'} — ${val.details}`);
    if (!val.passed) {
      allPassed = false;
    }
  }

  return {
    success: allPassed,
    results: testResults
  };
}

if (typeof window === 'undefined' && process.argv[1]?.includes('local-inference-runtime.test')) {
  runLocalInferenceRuntimeVerification().then(res => {
    console.log("[VERIFY SUMMARY]", JSON.stringify(res, null, 2));
    process.exit(res.success ? 0 : 1);
  });
}
