const fs = require('fs');
let content = fs.readFileSync('src/products/registries.ts', 'utf8');

// We need to inject the massive arrays requested by the prompt.

const eduTemplates = `export const EducationTemplateRegistry = [
  { id: 'EARLY_CHILDHOOD', name: 'Early Childhood / Pre-Primary', description: 'Nursery and kindergarten structures' },
  { id: 'PRIMARY', name: 'Primary School', description: 'Standard primary education structure' },
  { id: 'SECONDARY', name: 'Secondary / High School', description: 'Forms, streams, combinations structure' },
  { id: 'VOCATIONAL', name: 'Vocational & Technical Institution', description: 'Trades and competency-based training' },
  { id: 'COLLEGE', name: 'College / Tertiary Institution', description: 'Tertiary education operations' },
  { id: 'UNIVERSITY', name: 'University', description: 'Complex faculties and senate structures' },
  { id: 'E_LEARNING', name: 'E-Learning / Online Education', description: 'Virtual education institution' },
  { id: 'MULTI_LEVEL', name: 'Multi-level / Integrated Education', description: 'Combined institutional structures' },
  { id: 'TRAINING_CENTRE', name: 'Training Centre', description: 'Short-term and corporate training' },
  { id: 'EXAM_CENTRE', name: 'Examination / Assessment Centre', description: 'Assessment and testing focus' },
  { id: 'NGO', name: 'Education NGO / Training Programme', description: 'Non-profit educational structures' },
  { id: 'HYBRID', name: 'Hybrid Physical + Digital Institution', description: 'Fully integrated offline and online' }
];
`;

content = content.replace("export const EducationTemplateRegistry: TemplateDefinition[] = [", eduTemplates + "\nexport const LegacyTemplateRegistry = [");

fs.writeFileSync('src/products/registries.ts', content);
