export class CommercialPlatformRegistry {
  constructor() {
    this.platforms = [
      {
        id: "jumo-trust",
        name: "JUMO Trust Platform",
        category: "Security & Verification",
        description: "Sovereign digital trust infrastructure for verifying organizations, institutions, companies, and individuals.",
        portals: ["Public Verification", "Organization Registration", "Auditor Portal", "Compliance Officer", "Executive AI Trust"],
        modules: ["Organization Identity Registry", "Digital Certificates", "Verification Engine", "Institutional Audit", "Trust Score Engine"],
        status: "Active",
        version: "4.2.0",
        tenantCount: 142
      },
      {
        id: "jumo-recruitment",
        name: "JUMO Recruitment Platform",
        category: "Talent & HR",
        description: "Enterprise talent acquisition platform connecting employers, academic institutions, and candidates globally.",
        portals: ["Candidate Portal", "Employer Portal", "Recruitment Agency", "HR Manager", "Interview & Assessment"],
        modules: ["Candidate Registry", "Vacancy Management", "AI Candidate Matching", "CV Intelligence", "Hiring Workflows"],
        status: "Active",
        version: "3.8.1",
        tenantCount: 89
      },
      {
        id: "jumo-identity",
        name: "JUMO Digital Identity Platform",
        category: "Security & IAM",
        description: "Sovereign identity infrastructure handling authentication, verification, biometrics, and credentials.",
        portals: ["Citizen Identity", "Organization Identity", "Administrator", "Verification", "Developer & API"],
        modules: ["Identity Registry", "Authentication Gateway", "MFA Engine", "Digital Credentials", "Biometrics Layer"],
        status: "Active",
        version: "5.0.0",
        tenantCount: 310
      },
      {
        id: "jumo-fintech",
        name: "JUMO FinTech Platform",
        category: "Financial Technology",
        description: "Digital financial infrastructure for wallets, payment processing, merchant settlement, and treasury routing.",
        portals: ["Customer Wallet", "Merchant Portal", "Banking Partner", "Agent Portal", "Treasury & Compliance"],
        modules: ["Digital Wallets", "Payment Processing", "Mobile Money Integration", "Card Processing", "Settlement Engine"],
        status: "Active",
        version: "4.5.2",
        tenantCount: 56
      },
      {
        id: "jumo-digital-pay",
        name: "JUMO Digital Pay Platform",
        category: "Payments Gateway",
        description: "Universal enterprise payment gateway supporting online invoices, subscriptions, and multi-currency routing.",
        portals: ["Payment Gateway", "Merchant Accounts", "Transaction Monitor", "Reconciliation", "Financial Reports"],
        modules: ["Payment Links", "Subscription Billing", "Invoice Payments", "Settlement Reports", "Fraud Detection"],
        status: "Active",
        version: "3.1.4",
        tenantCount: 215
      },
      {
        id: "jumo-ai",
        name: "JUMO AI Intelligence Platform",
        category: "Artificial Intelligence",
        description: "Enterprise artificial intelligence operating platform powering agents, RAG, knowledge systems, and automation.",
        portals: ["AI Administrator", "Enterprise AI Workspace", "Developer Portal", "Model Management", "Knowledge Hub"],
        modules: ["AI Agents", "Model Registry", "Prompt Manager", "Knowledge Base RAG", "Workflow Automation AI"],
        status: "Active",
        version: "4.9.0",
        tenantCount: 180
      },
      {
        id: "jumo-app-builder",
        name: "JUMO App Builder Platform",
        category: "Low-Code / No-Code",
        description: "Enterprise low-code and no-code application builder enabling organizations to deploy custom digital solutions.",
        portals: ["Application Designer", "Database Builder", "Workflow Builder", "Form Builder", "Deployment Center"],
        modules: ["Visual App Designer", "Database Schema Builder", "Workflow Designer", "Form Engine", "API Builder"],
        status: "Active",
        version: "2.7.5",
        tenantCount: 94
      },
      {
        id: "jumo-cloud",
        name: "JUMO Cloud Infrastructure Platform",
        category: "Cloud & DevOps",
        description: "Enterprise cloud infrastructure layer managing compute, storage, databases, hosting, and container deployments.",
        portals: ["Cloud Console", "Storage Manager", "Compute Resources", "Database Services", "Security & Monitoring"],
        modules: ["Container Orchestration", "Object Storage", "Database Provisioning", "Auto-Scaling", "Backup & Recovery"],
        status: "Active",
        version: "4.1.0",
        tenantCount: 120
      },
      {
        id: "jumo-digital-auditor",
        name: "JUMO Digital Auditor Platform",
        category: "Compliance & Audit",
        description: "AI-powered digital institutional audit platform for compliance assessments, risk scoring, and evidence verification.",
        portals: ["Auditor Workspace", "Client Organization", "Compliance Control", "Government Oversight", "AI Audit Analysis"],
        modules: ["Evidence Collection", "Compliance Assessment", "Risk Scoring", "AI Audit Assistant", "Digital Certificates"],
        status: "Active",
        version: "3.2.0",
        tenantCount: 78
      },
      {
        id: "jumo-document-cloud",
        name: "JUMO Document Cloud Platform",
        category: "Documents & Records",
        description: "Enterprise document management vault with e-signatures, version control, secure sharing, and AI processing.",
        portals: ["Document Vault", "Workflow Approvals", "E-Signatures", "Archive Management", "AI Document Processing"],
        modules: ["Secure Document Storage", "Digital Signatures", "Document Verification", "Records Retention", "AI OCR & Indexing"],
        status: "Active",
        version: "3.5.0",
        tenantCount: 230
      },
      {
        id: "jumo-collaboration",
        name: "JUMO Collaboration Platform",
        category: "Productivity",
        description: "Enterprise communication and productivity suite supporting secure messaging, workspaces, and video collaboration.",
        portals: ["Team Workspaces", "Enterprise Chat", "Video Meetings", "Shared Calendars", "Knowledge Spaces"],
        modules: ["Secure Messaging", "Virtual Meeting Rooms", "Team Channels", "Document Co-Authoring", "Activity Streams"],
        status: "Active",
        version: "2.9.1",
        tenantCount: 340
      },
      {
        id: "jumo-marketplace",
        name: "JUMO Enterprise Marketplace",
        category: "Ecosystem Store",
        description: "Central enterprise digital marketplace for applications, plugins, templates, and professional services.",
        portals: ["App Marketplace", "Vendor Portal", "Service Store", "Procurement & Billing", "Reviews & Ratings"],
        modules: ["Application Storefront", "Vendor Management", "License Management", "Secure Checkout", "Automated Deployment"],
        status: "Active",
        version: "4.0.0",
        tenantCount: 410
      },
      {
        id: "jumo-elearning",
        name: "JUMO E-Learning Platform",
        category: "Education Cloud",
        description: "Digital learning marketplace and virtual classroom platform for online training, certification, and AI tutoring.",
        portals: ["Online Courses", "Virtual Classroom", "Content Store", "AI Tutor Portal", "Certification Center"],
        modules: ["Course Management", "Interactive Live Streaming", "Content Authoring", "Automated Testing", "Learning Analytics"],
        status: "Active",
        version: "3.6.4",
        tenantCount: 65
      },
      {
        id: "jumo-health-cloud",
        name: "JUMO Health Cloud Platform",
        category: "Healthcare Cloud",
        description: "Digital healthcare services ecosystem for patient portals, telemedicine, and electronic medical records exchange.",
        portals: ["Patient Portal", "Telemedicine Suite", "EMR Exchange", "Provider Network", "Health Analytics"],
        modules: ["Patient Records", "Virtual Consultations", "Prescription Routing", "Lab Results Integration", "Health Metrics"],
        status: "Active",
        version: "2.4.0",
        tenantCount: 38
      },
      {
        id: "jumo-agri-connect",
        name: "JUMO Agri Connect Platform",
        category: "Agribusiness Cloud",
        description: "Agricultural digital marketplace and intelligence platform connecting farmers, cooperatives, and buyers.",
        portals: ["Farmer Portal", "Market Exchange", "Supply Chain", "Weather Intelligence", "Digital Payments"],
        modules: ["Farmer Registry", "Produce Exchange", "Logistics & Transport", "Climate Analytics", "Input Financing"],
        status: "Active",
        version: "3.1.2",
        tenantCount: 52
      },
      {
        id: "jumo-business-network",
        name: "JUMO Business Network Platform",
        category: "B2B Ecosystem",
        description: "Enterprise networking ecosystem connecting companies, institutions, suppliers, and strategic partners.",
        portals: ["Business Directory", "Partnership Manager", "B2B Marketplace", "Contract Workspace", "Communication Hub"],
        modules: ["Company Profiles", "Partner Discovery", "B2B Transactions", "Secure Messaging", "Contract Management"],
        status: "Active",
        version: "3.0.0",
        tenantCount: 165
      },
      {
        id: "jumo-research",
        name: "JUMO Innovation & Research Platform",
        category: "Research & Science",
        description: "Global research, innovation, and knowledge commercialization platform for universities and institutes.",
        portals: ["Research Registry", "Innovation Hub", "Grant Funding", "Patent Registry", "Collaboration Spaces"],
        modules: ["Research Projects", "Grant Management", "Patent Tracking", "Lab Equipment Sharing", "Research Analytics"],
        status: "Active",
        version: "2.8.0",
        tenantCount: 45
      },
      {
        id: "jumo-government",
        name: "JUMO Government Digital Platform",
        category: "Sovereign Gov",
        description: "Sovereign digital government infrastructure for citizen services, public records, and departmental workflows.",
        portals: ["Citizen Services", "Digital ID Gateway", "Public Records", "Department Portal", "Government Analytics"],
        modules: ["Citizen Portal", "Service Requests", "Public Licencing", "Inter-Agency Workflow", "Revenue Collection"],
        status: "Active",
        version: "4.3.0",
        tenantCount: 18
      },
      {
        id: "jumo-smart-city",
        name: "JUMO Smart City Platform",
        category: "Urban Operations",
        description: "Urban digital management platform for smart infrastructure, utilities integration, and municipal services.",
        portals: ["Municipal Portal", "Transport Management", "Utilities Integration", "Smart Infrastructure", "City Analytics"],
        modules: ["Citizen Reporting", "Traffic Management", "Utility Monitoring", "Public Lighting", "Emergency Response"],
        status: "Active",
        version: "2.1.0",
        tenantCount: 12
      },
      {
        id: "jumo-data-intelligence",
        name: "JUMO Data Intelligence Platform",
        category: "Analytics & BI",
        description: "Enterprise data analytics platform featuring data warehousing, business intelligence, and predictive models.",
        portals: ["Data Warehouse", "Business Intelligence", "Executive Dashboards", "Predictive Analytics", "Data Governance"],
        modules: ["ETL Pipelines", "Visual Dashboards", "Predictive Modeling", "Data Quality", "Secure Data Sharing"],
        status: "Active",
        version: "3.7.0",
        tenantCount: 195
      },
      {
        id: "jumo-aegis-security",
        name: "JUMO AEGIS Security Platform",
        category: "Cybersecurity",
        description: "Enterprise cybersecurity and accountability platform for threat detection, audit trails, and compliance.",
        portals: ["Security Operations", "Compliance Center", "Cryptographic Audit", "Threat Intelligence", "Incident Response"],
        modules: ["Real-Time SIEM", "Access Log Auditing", "Vulnerability Scanner", "Compliance Reporting", "Cryptographic Ledger"],
        status: "Active",
        version: "5.1.0",
        tenantCount: 450
      },
      {
        id: "jumo-integration",
        name: "JUMO Enterprise Integration Platform",
        category: "Integration Bus",
        description: "Enterprise integration bus and API gateway for connecting external legacy systems, webhooks, and third-party APIs.",
        portals: ["API Gateway", "Connector Marketplace", "Integration Bus", "Webhook Manager", "Monitoring & Logs"],
        modules: ["API Management", "Connector Library", "Message Queuing", "Data Transformation", "Security & Rate Limiting"],
        status: "Active",
        version: "4.0.2",
        tenantCount: 280
      }
    ];
  }

  getAllPlatforms() {
    return this.platforms;
  }

  getByCategory(category) {
    return this.platforms.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  getPlatform(id) {
    return this.platforms.find(p => p.id === id);
  }
}
