export class AIAgentGenerator {

generate(template){

return template.aiAgents || [];

}

}

export const aiAgentGenerator = new AIAgentGenerator();
