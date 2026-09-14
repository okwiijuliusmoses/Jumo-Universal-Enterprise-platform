import re

with open('src/core/platform/registry/JumoDynamicPlatformRegistry.ts', 'r') as f:
    content = f.read()

# Remove studio interface
content = re.sub(r'export interface JumoStudioDefinition {[^}]+}', '', content)

# Remove studioIds
content = re.sub(r'studioIds:\s*string\[\];', '', content)
content = re.sub(r'studioIds:\s*\[[^\]]*\],?', '', content)

# Remove studios registry
content = re.sub(r'readonly studios\s*=\s*new DynamicRegistry<JumoStudioDefinition>\(\);', '', content)
content = re.sub(r'registerStudio\(studio: JumoStudioDefinition\) {[^}]+}', '', content)
content = re.sub(r'studios:\s*this\.studios\.size,', '', content)
content = re.sub(r'fixedStudioLimit:\s*false,', '', content)

with open('src/core/platform/registry/JumoDynamicPlatformRegistry.ts', 'w') as f:
    f.write(content)

