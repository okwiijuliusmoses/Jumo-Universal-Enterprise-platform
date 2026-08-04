/**
 * JUMO UEOS Digital Workforce Engine
 */

export class DigitalAgentRegistry {


 constructor(){

  this.agents=[];

  this.initialize();

 }



 initialize(){

 this.register({

  id:"finance-ai-officer",

  name:"Digital Finance Officer",

  domain:"Finance",

  functions:[

   "Budget Monitoring",

   "Compliance Checking",

   "Financial Reporting"

  ]

 });


 this.register({

  id:"hr-ai-officer",

  name:"Digital Human Resource Officer",

  domain:"Human Capital",

  functions:[

   "Recruitment",

   "Staff Management",

   "Workforce Analytics"

  ]

 });


 }



 register(agent){

  this.agents.push({

   ...agent,

   status:"ACTIVE"

  });

 }


 getAgents(){

  return this.agents;

 }


}


export const digitalAgentRegistry =
new DigitalAgentRegistry();
