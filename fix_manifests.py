import re
import glob

for filename in glob.glob('src/core/specification/manifests/*Manifest.ts'):
    if "masterManifestRegistry" in filename or "fintech" in filename or "alumni" in filename or "church" in filename or "nursery" in filename or "secondary" in filename or "university" in filename:
        continue
    with open(filename, 'r') as f:
        content = f.read()

    # Fix directorates
    content = re.sub(r"directorates:\s*\[\s*\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*code:\s*'([^']+)'\s*\}\s*\]", r"directorates: [\n    { id: '\1', name: '\2', code: '\3', description: '\2 directorate operations', leadRole: 'DIRECTOR' }\n  ]", content)
    
    # Fix modules
    content = re.sub(r"modules:\s*\[\s*\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*code:\s*'([^']+)'\s*\}\s*\]", r"modules: [\n    { id: '\1', code: '\3', title: '\2', purpose: '\2 purpose', directorateId: 'DIR-01', departmentId: 'DEPT-01', officeId: 'OFF-01', portalId: 'PORT-01', capabilityIds: [], screenIds: [] }\n  ]", content)

    with open(filename, 'w') as f:
        f.write(content)

