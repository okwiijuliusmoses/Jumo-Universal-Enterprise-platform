/**
 * JUMO UEOS Module Generator
 * 
 * Synthesizes dynamic operational modules, forms, and database table contracts for manufactured instances.
 */

export interface GeneratedModuleContract {
  id: string;
  name: string;
  category: string;
  table: string;
  fields: string[];
  formSchema: {
    formTitle: string;
    fields: { name: string; label: string; type: string; required: boolean }[];
  };
  apiEndpoints: string[];
}

export class ModuleGenerator {
  static generateModules(modulesList: string[], institutionId: string): GeneratedModuleContract[] {
    return modulesList.map((modName, idx) => {
      const slug = modName.toLowerCase().replace(/[^a-z0-9]/g, "_");
      const modId = `mod_${slug}_${idx + 1}`;
      
      return {
        id: modId,
        name: modName,
        category: "Institutional Operations",
        table: `tbl_${slug}`,
        fields: ["id", "tenant_id", "record_code", "status", "created_at", "updated_at", "data_payload"],
        formSchema: {
          formTitle: `${modName} Entry & Registration Form`,
          fields: [
            { name: "record_code", label: `${modName} Reference Code`, type: "text", required: true },
            { name: "title", label: "Title / Description", type: "text", required: true },
            { name: "amount", label: "Associated FAAP Value ($)", type: "number", required: false },
            { name: "notes", label: "Operational Notes", type: "textarea", required: false }
          ]
        },
        apiEndpoints: [
          `/api/ueos/instance/${institutionId}/module/${modId}/records`,
          `/api/ueos/instance/${institutionId}/module/${modId}/submit`
        ]
      };
    });
  }
}

export default ModuleGenerator;
