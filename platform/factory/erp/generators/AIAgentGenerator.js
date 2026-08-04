export class AIAgentGenerator {

 generate(instance){
   const erpId = instance.templateId || instance.id || "";
   let aiName = "JUMO Enterprise AI";
   
   if (erpId.includes("university")) aiName = "University AI Assistant";
   else if (erpId.includes("hospitality")) aiName = "Hospitality AI Assistant";
   else if (erpId.includes("community") || erpId.includes("finance")) aiName = "Community Finance AI Assistant";
   else if (erpId.includes("diocese") || erpId.includes("religious")) aiName = "Diocese AI Assistant";
   else if (erpId.includes("clan") || erpId.includes("heritage")) aiName = "Clan Heritage AI Assistant";
   else if (erpId.includes("alumni")) aiName = "Alumni AI Assistant";

   return {
     id: `ai-${instance.id}`,
     name: aiName,
     capabilities: ["Natural Language Query", "Workflow Automation", "Analytics Insights", "Configuration Support"]
   };
 }

}

export const aiAgentGenerator = new AIAgentGenerator();
