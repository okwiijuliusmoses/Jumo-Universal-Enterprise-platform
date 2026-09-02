import re

with open('src/core/hub/architecture/JumoHybridArchitectureLayers.ts', 'r') as f:
    content = f.read()

# Replace studio: string;
content = re.sub(r'studio:\s*string;?', '', content)
content = re.sub(r'studio:\s*string,\s*', '', content)
content = re.sub(r',\s*studio\s*,', ',', content)
content = re.sub(r'studio\s*,', '', content)
content = re.sub(r',\s*studio', '', content)
content = re.sub(r'\n\s*studio,', '', content)

# Replace the studio parameter in the constructor
content = re.sub(r'responsibility: string,\s*studio: string,', r'responsibility: string,', content)

# Re-run a global regex replace to clean up L(..., "studio", ...) calls
# In L("LXXX", "Family", "Name", "Desc", "studio", ...)
content = re.sub(r'(L\("[^"]+",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+"),\s*"[^"]+"', r'\1', content)

# Remove studios methods
content = re.sub(r'byStudio\([^)]+\) {[^}]+}', '', content)
content = re.sub(r'studios\(\) {[^}]+}', '', content)
content = re.sub(r'export function getJumoArchitectureStudios\(\)[^}]+}', '', content)
content = re.sub(r'export function getJumoStudioLayerMap\(\)[^;]+;\s*}', '', content)

# Remove totalStudios stat
content = re.sub(r'totalStudios:\s*JUMO_HYBRID_ARCHITECTURE_REGISTRY\.studios\(\)\.length,', '', content)

with open('src/core/hub/architecture/JumoHybridArchitectureLayers.ts', 'w') as f:
    f.write(content)
