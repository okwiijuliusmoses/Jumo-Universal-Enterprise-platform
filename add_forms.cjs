const fs = require('fs');

const registriesPath = 'src/products/registries.ts';

let content = fs.readFileSync(registriesPath, 'utf8');

// Replace empty FormRegistry
const formsStr = `
  { id: 'FORM_EDU_ADMISSION_001', name: 'Student Admission Application', moduleId: 'MOD_EDU_ADMISSIONS_0', fields: [
      { id: 'f1', type: 'text', label: 'Full Legal Name', required: true },
      { id: 'f2', type: 'date', label: 'Date of Birth', required: true },
      { id: 'f3', type: 'email', label: 'Parent Email', required: true },
      { id: 'f4', type: 'select', label: 'Program Selection', options: ['Primary', 'Secondary', 'Vocational'], required: true }
  ]},
  { id: 'FORM_FAAP_JOURNAL_001', name: 'General Journal Entry', moduleId: 'MOD_FAAP_GENERAL_LEDGER_1', fields: [
      { id: 'f1', type: 'select', label: 'Debit Account', options: ['1000 - Cash', '1200 - Receivables', '5000 - Expenses'], required: true },
      { id: 'f2', type: 'number', label: 'Debit Amount', required: true },
      { id: 'f3', type: 'select', label: 'Credit Account', options: ['1000 - Cash', '2000 - Payables', '4000 - Revenue'], required: true },
      { id: 'f4', type: 'number', label: 'Credit Amount', required: true },
      { id: 'f5', type: 'text', label: 'Memo', required: true }
  ]},
  { id: 'FORM_DP_MERCHANT_001', name: 'Merchant Registration', moduleId: 'MOD_DP_MERCHANT_ONBOARDING_9', fields: [
      { id: 'f1', type: 'text', label: 'Business Name', required: true },
      { id: 'f2', type: 'text', label: 'Tax ID / TIN', required: true },
      { id: 'f3', type: 'select', label: 'Business Type', options: ['Sole Proprietor', 'LLC', 'Corporation'], required: true }
  ]},
  { id: 'FORM_CH_MEMBER_001', name: 'Church Member Registration', moduleId: 'MOD_CH_CHURCH_MEMBERSHIP_0', fields: [
      { id: 'f1', type: 'text', label: 'Full Name', required: true },
      { id: 'f2', type: 'tel', label: 'Phone Number', required: true },
      { id: 'f3', type: 'date', label: 'Date of Baptism', required: false }
  ]}
`;

content = content.replace(/export const FormRegistry = \[\];/, `export const FormRegistry = [\n${formsStr}\n];`);

fs.writeFileSync(registriesPath, content);
console.log("Forms injected");
