/**
 * JUMO UEOS
 * Enterprise Platform Template Registry
 *
 * Single source of truth for ERP generation.
 */

export const EnterprisePlatformTemplateRegistry = {

version:"2.0",

templates:[

{
id:"education-platform",

family:"education-family",

name:"Education Digital Enterprise Platform",

blueprintId:"education-erp",

portals:[],

modules:[],

departments:[],

roles:[],

permissions:[],

components:[],

forms:[],

workflows:[],

navigation:[],

dashboards:[],

analytics:[],

aiAgents:[],

documentLibraries:[],

settings:{},

notifications:[],

integrations:[],

apis:[],

runtimeContext:{}

},


{
id:"government-platform",

family:"government-family",

name:"Government Digital Enterprise Platform",

blueprintId:"government-erp",

portals:[],

modules:[],

departments:[],

roles:[],

permissions:[],

components:[],

forms:[],

workflows:[],

navigation:[],

dashboards:[],

analytics:[],

aiAgents:[],

documentLibraries:[],

settings:{},

notifications:[],

integrations:[],

apis:[],

runtimeContext:{}

}

],


getTemplate(id){

return this.templates.find(
t=>t.id===id
);

},


list(){

return this.templates;

}

};
