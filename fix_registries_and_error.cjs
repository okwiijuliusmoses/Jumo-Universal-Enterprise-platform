const fs = require('fs');

// Fix registries
let registriesContent = fs.readFileSync('src/products/registries.ts', 'utf8');
registriesContent = registriesContent.replace(
  "export type TemplateDefinition = { id: string; name: string; description: string; productId: string };",
  "export type TemplateDefinition = { id: string; name: string; displayName?: string; description: string; productId: string };"
);
fs.writeFileSync('src/products/registries.ts', registriesContent);

// Fix ErrorBoundary
let ebContent = fs.readFileSync('src/components/ErrorBoundary.tsx', 'utf8');
ebContent = ebContent.replace(
  "interface Props {\n  children?: ReactNode;\n  fallback?: ReactNode;\n}",
  "interface Props {\n  children?: ReactNode;\n  fallback?: ReactNode;\n  name?: string;\n}"
);
fs.writeFileSync('src/components/ErrorBoundary.tsx', ebContent);
