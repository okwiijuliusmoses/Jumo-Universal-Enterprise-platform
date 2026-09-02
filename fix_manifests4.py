import re
import glob

for filename in glob.glob('src/core/specification/manifests/*Manifest.ts'):
    if "masterManifestRegistry" in filename or "fintech" in filename or "alumni" in filename or "church" in filename or "nursery" in filename or "secondary" in filename or "university" in filename:
        continue
    with open(filename, 'r') as f:
        content = f.read()

    # Fix description to edition and classification
    content = re.sub(r"description:\s*'([^']+)',\s*version:\s*'([^']+)',\s*architecturalTier:\s*'([^']+)',", r"edition: 'SOVEREIGN_ENTERPRISE_COMMERCIAL',\n  version: '\2',\n  classification: 'RESTRICTED',\n  departments: [],\n  offices: [],\n  portals: [],", content)
    
    with open(filename, 'w') as f:
        f.write(content)

