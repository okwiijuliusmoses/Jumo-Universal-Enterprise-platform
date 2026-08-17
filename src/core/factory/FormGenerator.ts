export interface DynamicFormField {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "textarea" | "file" | "checkbox";
  required: boolean;
  options?: string[];
  placeholder?: string;
  validationRule?: string;
}

export interface DynamicFormContract {
  id: string;
  name: string;
  category: string;
  purpose: string;
  fields: DynamicFormField[];
  validationRules: {
    requireMandatoryFields: boolean;
    maxFileSizeMB: number;
    auditVerificationRequired: boolean;
  };
  workflowTrigger: string;
  approvalChain: string[];
  auditHistory: Array<{
    timestamp: string;
    action: string;
    actor: string;
  }>;
  documentGeneration: {
    enabled: boolean;
    templateType: "PDF_CERTIFICATE" | "OFFICIAL_RECEIPT" | "APPROVAL_LETTER" | "DIGITAL_PERMIT";
    watermark: string;
  };
  notifications: {
    inAppAlert: boolean;
    smsGateway: boolean;
    emailDispatch: boolean;
    eventBusTopic: string;
  };
  workflowBinding?: string;
}

export class FormGenerator {
  static generateForms(formsList: string[]): DynamicFormContract[] {
    return formsList.map((formName, idx) => {
      const slug = formName.toLowerCase().replace(/[^a-z0-9]/g, "_");
      return {
        id: `form_${slug}_${idx + 1}`,
        name: formName,
        category: formName.toLowerCase().includes("pay") || formName.toLowerCase().includes("financial") || formName.toLowerCase().includes("tithe") || formName.toLowerCase().includes("tuition") ? "Financial Requisition" : "Institutional Application",
        purpose: `Official sovereign form submission for ${formName}.`,
        fields: [
          {
            id: "f_applicant_name",
            label: "Applicant Full Legal Name",
            type: "text",
            required: true,
            placeholder: "Enter full name..."
          },
          {
            id: "f_national_id",
            label: "National Identity / Credential ID",
            type: "text",
            required: true,
            placeholder: "Enter ID or Registration number..."
          },
          {
            id: "f_department",
            label: "Target Directorate / Department",
            type: "select",
            required: true,
            options: ["Executive Directorate", "Operations & Services", "FAAP Treasury", "Human Resources"]
          },
          {
            id: "f_request_amount",
            label: "Financial Amount (If Applicable)",
            type: "number",
            required: false,
            placeholder: "0.00"
          },
          {
            id: "f_details",
            label: "Detailed Justification & Supporting Notes",
            type: "textarea",
            required: true,
            placeholder: "Provide detailed justification..."
          },
          {
            id: "f_attachment",
            label: "Supporting Documentation",
            type: "file",
            required: false
          }
        ],
        validationRules: {
          requireMandatoryFields: true,
          maxFileSizeMB: 10,
          auditVerificationRequired: true
        },
        workflowTrigger: `wf_auto_trigger_${slug}`,
        approvalChain: ["DEPARTMENT_OFFICER", "DEPARTMENT_MANAGER", "TREASURY_AUDITOR", "EXECUTIVE_DIRECTOR"],
        auditHistory: [
          {
            timestamp: new Date().toISOString(),
            action: "FORM_CONTRACT_INITIALIZED",
            actor: "UEOS_FORM_ENGINE"
          }
        ],
        documentGeneration: {
          enabled: true,
          templateType: formName.toLowerCase().includes("certificate") ? "PDF_CERTIFICATE" : formName.toLowerCase().includes("pay") || formName.toLowerCase().includes("tithe") ? "OFFICIAL_RECEIPT" : "APPROVAL_LETTER",
          watermark: "JUMO UEOS SOVEREIGN VERIFIED"
        },
        notifications: {
          inAppAlert: true,
          smsGateway: true,
          emailDispatch: true,
          eventBusTopic: `ueos.events.forms.${slug}`
        },
        workflowBinding: `wf_${slug}_binding`
      };
    });
  }
}

export type GeneratedFormContract = DynamicFormContract;

export default FormGenerator;
