/**
 * JUMO UEOS ERP Template Registry
 *
 * Templates are enterprise blueprints.
 * They DO NOT manufacture themselves.
 *
 * Manufacturing is handled only by Universal ERP Factory.
 */

export interface ERPTemplateDefinition {

  id: string;

  name: string;

  ecosystemId: string;

  governanceType: string;

  description: string;

  departments: string[];

  portals: string[];

  modules: string[];

  workflows: string[];

  forms: string[];

  components: string[];

  aiProfile: string;

}


const templates: ERPTemplateDefinition[] = [

{
id: "university-erp",
name: "University ERP",
ecosystemId: "education",
governanceType: "University Governance",
description: "Higher education institutional operating platform.",
departments: [
"Academic Affairs",
"Admissions",
"Registrar",
"Finance",
"Research",
"Library",
"ICT",
"Human Resources"
],
portals: [
"Student Portal",
"Staff Portal",
"Faculty Portal",
"Registrar Portal",
"Finance Portal",
"Executive Portal"
],
modules: [
"SIS",
"Admissions",
"Learning Management",
"Finance",
"Research",
"Library"
],
workflows:[
"Admissions Workflow",
"Registration Workflow",
"Approval Workflow"
],
forms:[
"Application Forms",
"Registration Forms"
],
components:[
"Dashboard",
"Reports",
"Notifications"
],
aiProfile:"education-ai"
},


{
id:"college-erp",
name:"College ERP",
ecosystemId:"education",
governanceType:"College Governance",
description:"College institutional management platform.",
departments:[
"Administration",
"Academic Affairs",
"Finance",
"Student Services"
],
portals:[
"Student Portal",
"Staff Portal",
"Administration Portal"
],
modules:[
"Admissions",
"Student Management",
"Finance",
"Examinations"
],
workflows:[
"Admissions Workflow",
"Academic Workflow"
],
forms:[
"Student Forms"
],
components:[
"Reports",
"Notifications"
],
aiProfile:"education-ai"
},


{
id:"technical-vocational-erp",
name:"Technical & Vocational ERP",
ecosystemId:"education",
governanceType:"TVET Governance",
description:"Technical and vocational institution platform.",
departments:[
"Training",
"Assessment",
"Administration",
"Finance"
],
portals:[
"Learner Portal",
"Instructor Portal",
"Administration Portal"
],
modules:[
"Courses",
"Skills Training",
"Assessment",
"Finance"
],
workflows:[
"Enrollment Workflow",
"Assessment Workflow"
],
forms:[
"Enrollment Forms"
],
components:[
"Reports"
],
aiProfile:"education-ai"
},


{
id:"secondary-school-erp",
name:"Secondary School ERP",
ecosystemId:"education",
governanceType:"School Governance",
description:"Secondary education management platform.",
departments:[
"Academics",
"Administration",
"Finance",
"Student Welfare"
],
portals:[
"Student Portal",
"Teacher Portal",
"Parent Portal"
],
modules:[
"Student Information",
"Examinations",
"Timetable",
"Finance"
],
workflows:[
"Admission Workflow"
],
forms:[
"Student Forms"
],
components:[
"Reports"
],
aiProfile:"education-ai"
},


{
id:"nursery-primary-erp",
name:"Nursery & Primary ERP",
ecosystemId:"education",
governanceType:"Primary School Governance",
description:"Early education management platform.",
departments:[
"Academics",
"Administration",
"Finance"
],
portals:[
"Pupil Portal",
"Teacher Portal",
"Parent Portal"
],
modules:[
"Student Records",
"Learning",
"Finance"
],
workflows:[
"Enrollment Workflow"
],
forms:[
"Admission Forms"
],
components:[
"Reports"
],
aiProfile:"education-ai"
},


{
id:"alumni-erp",
name:"Alumni ERP",
ecosystemId:"education",
governanceType:"Alumni Association Governance",
description:"Institution alumni network platform.",
departments:[
"Membership",
"Relations",
"Projects"
],
portals:[
"Alumni Portal",
"Administrator Portal"
],
modules:[
"Membership",
"Events",
"Communication"
],
workflows:[
"Membership Workflow"
],
forms:[
"Registration Forms"
],
components:[
"Community Dashboard"
],
aiProfile:"community-ai"
},


{
id:"hospitality-erp",
name:"Hospitality ERP",
ecosystemId:"hospitality",
governanceType:"Hospitality Governance",
description:"Hotels and tourism operations platform.",
departments:[
"Accommodation",
"Restaurant",
"Bar",
"Tourism",
"Guest Relations"
],
portals:[
"Guest Portal",
"Staff Portal",
"Management Portal"
],
modules:[
"Reservations",
"Restaurant",
"Inventory",
"Finance"
],
workflows:[
"Booking Workflow"
],
forms:[
"Guest Forms"
],
components:[
"Operations Dashboard"
],
aiProfile:"hospitality-ai"
},


{
id:"diocese-province-erp",
name:"Diocese & Province ERP",
ecosystemId:"religious-diocese",
governanceType:"Religious Governance",
description:"Diocese and province administration platform.",
departments:[
"Parishes",
"Clergy",
"Administration",
"Finance"
],
portals:[
"Leadership Portal",
"Parish Portal"
],
modules:[
"Membership",
"Finance",
"Projects"
],
workflows:[
"Approval Workflow"
],
forms:[
"Membership Forms"
],
components:[
"Reports"
],
aiProfile:"community-ai"
},


{
id:"clan-heritage-erp",
name:"Clan & Heritage ERP",
ecosystemId:"clan-heritage",
governanceType:"Clan Governance",
description:"Family and heritage management platform.",
departments:[
"Council",
"Genealogy",
"Welfare",
"Projects"
],
portals:[
"Member Portal",
"Council Portal"
],
modules:[
"Registry",
"Heritage",
"Welfare"
],
workflows:[
"Membership Workflow"
],
forms:[
"Member Forms"
],
components:[
"Family Dashboard"
],
aiProfile:"community-ai"
},


{
id:"community-finance-erp",
name:"Community Finance ERP",
ecosystemId:"community-finance",
governanceType:"Financial Cooperative Governance",
description:"Savings, credit and community finance platform.",
departments:[
"Savings",
"Loans",
"Treasury",
"Risk Management"
],
portals:[
"Member Portal",
"Officer Portal",
"Management Portal"
],
modules:[
"Savings",
"Credit",
"Loans",
"Treasury",
"FAAP"
],
workflows:[
"Loan Approval Workflow",
"Risk Workflow"
],
forms:[
"Loan Forms",
"Member Forms"
],
components:[
"Financial Dashboard"
],
aiProfile:"finance-ai"
}

];


export class ERPTemplateRegistry {

static getAll(){
return templates;
}


static getById(id:string){
return templates.find(
template=>template.id===id
);
}


}


export default ERPTemplateRegistry;
