const fs = require('fs');

const files = [
  'src/core/ai/providers/OpenAIPrimaryProvider.ts',
  'src/core/ai/providers/GeminiEngineeringProvider.ts',
  'src/core/ai/providers/CodexEngineeringProvider.ts',
  'src/core/ai/providers/CopilotEngineeringProvider.ts'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    if (!content.includes('JumoModelRegistry')) {
      content = 'import { JumoModelRegistry } from "./JumoModelRegistry";\n' + content;
    }
    content = content.replace(/async discoverModels\(\): Promise<Array<\{[^}]+\}>> \{\n\s*return \[[^\]]*\];\n\s*\}/g, 
    'async discoverModels(): Promise<Array<{ modelId: string; displayName: string; contextLength: number; capabilities: string[] }>> {\n    return JumoModelRegistry.getModelsByProvider(this.providerId as any);\n  }');
    fs.writeFileSync(f, content, 'utf8');
  }
}
