import re
import glob

for filename in glob.glob('src/core/specification/manifests/*Manifest.ts'):
    if "masterManifestRegistry" in filename or "fintech" in filename or "alumni" in filename or "church" in filename or "nursery" in filename or "secondary" in filename or "university" in filename:
        continue
    with open(filename, 'r') as f:
        content = f.read()

    # Fix modules
    content = re.sub(r"modules:\s*\[\s*\{\s*id:\s*'([^']+)',\s*code:\s*'([^']+)',\s*title:\s*'([^']+)',\s*purpose:\s*'([^']+)',\s*directorateId:\s*'([^']+)',\s*departmentId:\s*'([^']+)',\s*officeId:\s*'([^']+)',\s*portalId:\s*'([^']+)',\s*capabilityIds:\s*\[\],\s*screenIds:\s*\[\]\s*\}\s*\]", r"modules: [\n    { id: '\1', code: '\2', title: '\3', purpose: '\4', directorateId: '\5', departmentId: '\6', officeId: '\7', portalId: '\8', capabilityIds: [], screenIds: [], formIds: [], dashboardIds: [], reportIds: [], workflowIds: [], databaseEntityIds: [], apiIds: [], runtimeComponentIds: [], aiAgentIds: [] }\n  ]", content)

    with open(filename, 'w') as f:
        f.write(content)

