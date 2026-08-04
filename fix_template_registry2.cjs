const fs = require('fs');
let content = fs.readFileSync('platform/factory/erp/ERPEcosystemTemplateRegistry.js', 'utf8');

content = content.replace(/if\(blueprint\.templates\) blueprint\.templates\.forEach\(scope => {[\s\S]*?}\);/g, `if(blueprint.templates) blueprint.templates.forEach(template => {
        const templateId = \`\${template.id}-erp\`;
        const scopeName = template.name.replace(' ERP', '');
        
        // Only add if not already in templates
        if (!this.templates.find(t => t.id === templateId)) {
          this.templates.push({
            id: templateId,
            ecosystemId: blueprint.id,
            name: template.name,
            description: \`Automated enterprise platform for \${scopeName}.\`,
            portals: [\`\${scopeName} Admin Portal\`, \`Operations Portal\`, \`Public Portal\`, \`Executive Portal\`, \`User Portal\`],
            departments: [\`\${scopeName} Directorate\`],
            modules: [\`Core \${scopeName} Management\`],
            layers: ["Operational Hub"],
            components: [\`\${scopeName} Dashboard\`],
            branches: ["HQ"],
            workflows: ["Standard Approval"]
          });
        }
      });`);

fs.writeFileSync('platform/factory/erp/ERPEcosystemTemplateRegistry.js', content);
console.log('Fixed ERPEcosystemTemplateRegistry 2');
