const fs = require('fs');
let content = fs.readFileSync('src/core/ai/providers/JumoAIProvider.ts', 'utf8');

// Replace \n  }\n  } with \n  }
content = content.replace(/async discoverModels\(\): Promise<JumoModelDiscovery\[\]> \{\n\s*return JumoModelRegistry\.getModelsByProvider\([^)]+\);\n\s*\}\n\s*\}/g, function(match) {
  return match.slice(0, -3);
});

content = content.replace(/async discoverModels\(\): Promise<JumoModelDiscovery\[\]> \{\n\s*return \[\];\n\s*\}/g, 'async discoverModels(): Promise<JumoModelDiscovery[]> {\n    return [];\n  }');
fs.writeFileSync('src/core/ai/providers/JumoAIProvider.ts', content, 'utf8');
