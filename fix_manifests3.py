import re
import glob

for filename in glob.glob('src/core/specification/manifests/*Manifest.ts'):
    if "masterManifestRegistry" in filename or "fintech" in filename or "alumni" in filename or "church" in filename or "nursery" in filename or "secondary" in filename or "university" in filename:
        continue
    with open(filename, 'r') as f:
        content = f.read()

    # Fix modules
    content = re.sub(r"aiAgentIds:\s*\[\]", r"aiAgentIds: [], permissionIds: []", content)

    with open(filename, 'w') as f:
        f.write(content)

