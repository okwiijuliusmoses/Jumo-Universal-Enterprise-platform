const fs = require('fs');
let content = fs.readFileSync('src/core/ai/providers/JumoAIProvider.ts', 'utf8');

// OpenAI
content = content.replace(/async discoverModels\(\): Promise<JumoModelDiscovery\[\]> \{\n\s*return JumoModelRegistry\.getModelsByProvider\(this\.providerId as any\);\n\s*\{ modelId: "gpt-4o".*?\n\s*\{ modelId: "o1-preview".*?\n\s*\{ modelId: "o1-mini".*?\n\s*\];/g, 'async discoverModels(): Promise<JumoModelDiscovery[]> {\n    return JumoModelRegistry.getModelsByProvider("OPENAI");\n  }');

// Gemini
content = content.replace(/async discoverModels\(\): Promise<JumoModelDiscovery\[\]> \{\n\s*return JumoModelRegistry\.getModelsByProvider\(this\.providerId as any\);\n\s*\{ modelId: "gemini-3.7-flash".*?\n\s*\{ modelId: "gemini-3.1-pro-preview".*?\n\s*\];/g, 'async discoverModels(): Promise<JumoModelDiscovery[]> {\n    return JumoModelRegistry.getModelsByProvider("GEMINI");\n  }');

// Copilot
content = content.replace(/async discoverModels\(\): Promise<JumoModelDiscovery\[\]> \{\n\s*return JumoModelRegistry\.getModelsByProvider\(this\.providerId as any\);\n\s*\{ modelId: "copilot-intelligent-mesh".*?\n\s*\];/g, 'async discoverModels(): Promise<JumoModelDiscovery[]> {\n    return JumoModelRegistry.getModelsByProvider("COPILOT");\n  }');

// Future
content = content.replace(/async discoverModels\(\): Promise<JumoModelDiscovery\[\]> \{\n\s*return JumoModelRegistry\.getModelsByProvider\(this\.providerId as any\);\];/g, 'async discoverModels(): Promise<JumoModelDiscovery[]> {\n    return [];\n  ');

fs.writeFileSync('src/core/ai/providers/JumoAIProvider.ts', content, 'utf8');
