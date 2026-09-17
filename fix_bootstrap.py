import re

with open('src/core/platform/products/JumoSharedProductBootstrap.ts', 'r') as f:
    content = f.read()

content = re.sub(r'studioIds:\s*\[\s*([^\]]+?)\s*\],', '', content)
content = re.sub(r'studioIds:\s*\[\]\s*,', '', content)

with open('src/core/platform/products/JumoSharedProductBootstrap.ts', 'w') as f:
    f.write(content)

