
export interface InventoryMatrixEntry {
  Product: string;
  Offices: number;
  Modules: number;
  Capabilities: number;
  Forms: number;
  Tables: number;
  Workflows: number;
  Reports: number;
  AIComponents: number;
}

export const InventoryBaseline: InventoryMatrixEntry[] = [
  {
    Product: "JUMO FINTECH",
    Offices: 26,
    Modules: 66,
    Capabilities: 132,
    Forms: 40,
    Tables: 66,
    Workflows: 20,
    Reports: 40,
    AIComponents: 3
  },
  {
    Product: "JUMO CHURCH ERP",
    Offices: 11,
    Modules: 47,
    Capabilities: 94,
    Forms: 20,
    Tables: 47,
    Workflows: 10,
    Reports: 20,
    AIComponents: 3
  },
  {
    Product: "JUMO EDU ALUMNI (Shared)",
    Offices: 15,
    Modules: 71,
    Capabilities: 142,
    Forms: 50,
    Tables: 71,
    Workflows: 30,
    Reports: 50,
    AIComponents: 3
  }
];

export const InventoryTarget: InventoryMatrixEntry[] = [
  {
    Product: "JUMO FINTECH",
    Offices: 26,
    Modules: 66,
    Capabilities: 132,
    Forms: 40,
    Tables: 66,
    Workflows: 20,
    Reports: 40,
    AIComponents: 3
  },
  {
    Product: "JUMO CHURCH ERP",
    Offices: 15,
    Modules: 50,
    Capabilities: 100,
    Forms: 25,
    Tables: 50,
    Workflows: 15,
    Reports: 25,
    AIComponents: 5
  },
  {
    Product: "JUMO NURSERY & PRIMARY ERP",
    Offices: 15,
    Modules: 66,
    Capabilities: 132,
    Forms: 50,
    Tables: 66,
    Workflows: 30,
    Reports: 50,
    AIComponents: 3
  },
  {
    Product: "JUMO SECONDARY SCHOOL ERP",
    Offices: 15,
    Modules: 66,
    Capabilities: 132,
    Forms: 50,
    Tables: 66,
    Workflows: 30,
    Reports: 50,
    AIComponents: 3
  },
  {
    Product: "JUMO ALUMNI ASSOCIATION ERP",
    Offices: 10,
    Modules: 50,
    Capabilities: 100,
    Forms: 30,
    Tables: 50,
    Workflows: 20,
    Reports: 30,
    AIComponents: 5
  }
];
