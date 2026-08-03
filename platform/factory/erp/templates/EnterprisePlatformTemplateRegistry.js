/**
 * JUMO UEOS
 * Enterprise Platform Template Registry
 *
 * Single source of truth for ERP generation.
 * Replaces:
 */

export class EnterprisePlatformTemplateRegistry {

  constructor() {

    this.registry = "JUMO Enterprise Platform Template Registry";

    this.templates = [

      {
        id: "education-platform",
        familyId: "education-family",
        name: "Education Enterprise Platform",

        category: "Institutional Enterprise Platform",

        scope: [
          "University",
          "College",
          "Vocational",
          "Secondary",
          "Primary",
          "Distance Learning"
        ],

        portals: [
          "Student Portal",
          "Faculty Portal",
          "Staff Portal",
          "Registrar Portal",
          "Finance Portal",
          "Research Portal",
          "Executive Portal"
        ],

        modules: [
          "Admissions",
          "Student Lifecycle",
          "Academic Management",
          "Examinations",
          "Learning Management",
          "Library",
          "Research",
          "Accommodation",
          "Alumni",
          "Finance"
        ],

        departments: [
          "Academic Affairs",
          "Registrar Office",
          "Finance Directorate",
          "Human Resources",
          "ICT",
          "Research Office",
          "Library",
          "Student Affairs"
        ],

        workflows: [
          "Admission Workflow",
          "Registration Workflow",
          "Approval Workflow",
          "Examination Workflow",
          "Graduation Workflow"
        ],

        configuration: {
          configurable: true,
          multiTenant: true
        }
      },


      {
        id: "government-platform",
        familyId: "government-family",
        name: "Government Enterprise Platform",

        category: "Public Administration Platform",

        scope:[
          "Ministry",
          "Agency",
          "Local Government",
          "Public Institution"
        ],

        portals:[
          "Citizen Portal",
          "Ministry Portal",
          "Administration Portal"
        ],

        modules:[
          "Citizen Services",
          "Procurement",
          "Public Finance",
          "Records Management",
          "HR Management",
          "Compliance"
        ],

        departments:[
          "Executive Office",
          "Finance",
          "Planning",
          "Procurement",
          "Audit"
        ],

        workflows:[
          "Service Workflow",
          "Approval Workflow",
          "Compliance Workflow"
        ],

        configuration:{
          configurable:true,
          dataSovereignty:true
        }
      }

    ];

  }


  list(){
    return this.templates;
  }


  getTemplate(id){
    return this.templates.find(
      template => template.id === id
    );
  }


  getTemplatesByFamily(familyId){
    return this.templates.filter(
      template => template.familyId === familyId
    );
  }

}


export const enterprisePlatformTemplateRegistry =
new EnterprisePlatformTemplateRegistry();
