const fs = require('fs');
let content = fs.readFileSync('platform/factory/erp/ERPEcosystemTemplateRegistry.js', 'utf8');

content = content.replace(/blueprint\.configurableScope\.forEach/g, "if(blueprint.templates) blueprint.templates.forEach");
content = content.replace(/configurableScope/g, "templates");

fs.writeFileSync('platform/factory/erp/ERPEcosystemTemplateRegistry.js', content);
console.log('Fixed ERPEcosystemTemplateRegistry');
