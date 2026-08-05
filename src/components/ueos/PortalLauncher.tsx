import React from "react";
import { 
  Building, Users, GraduationCap, School, Landmark, FileText, 
  Shield, Cpu, BookOpen, HeartHandshake, Briefcase, Key, ArrowRight, CheckCircle2
} from "lucide-react";

export interface PortalDefinition {
  id: string;
  name: string;
  role: string;
  description: string;
  icon?: any;
  modules: string[];
  accessLevel?: string;
  color?: string;
}

export interface PortalLauncherProps {
  portals?: PortalDefinition[] | any[];
  activePortalId?: string;
  onSelectPortal: (portalId: string) => void;
  institutionName?: string;
}

const DEFAULT_PORTALS: PortalDefinition[] = [
  {
    id: "executive",
    name: "Executive Portal",
    role: "Chancellor / VC / Board Governance",
    description: "Sovereign executive dashboards, FAAP ledger oversight, strategic compliance, and institutional policy approvals.",
    icon: Building,
    modules: ["FAAP Treasury", "Board Resolutions", "Institutional KPIs", "Zero-Trust Audit"],
    accessLevel: "Executive L4",
    color: "teal"
  },
  {
    id: "finance",
    name: "Finance & Treasury Portal",
    role: "Bursar / CFO / Revenue Officers",
    description: "FAAP double-entry general ledger, fee billing, automated disbursement pipelines, budget management, and tax compliance.",
    icon: Landmark,
    modules: ["Fee Billing", "General Ledger", "Vendor Payments", "Reconciliation"],
    accessLevel: "Finance L3",
    color: "emerald"
  },
  {
    id: "academic",
    name: "Academic & Senate Portal",
    role: "Deans / Senate Members / Faculty Chairs",
    description: "Curriculum governance, degree program management, faculty scheduling, senate approvals, and academic research oversight.",
    icon: GraduationCap,
    modules: ["Curriculum Registry", "Faculty Roster", "Senate Approvals", "Research Grants"],
    accessLevel: "Academic L3",
    color: "blue"
  },
  {
    id: "registrar",
    name: "Registrar & SIS Portal",
    role: "University Registrar / Admissions Officers",
    description: "Student Information System (SIS), national admissions pipeline, transcript engine, course enrollment, and graduation clearance.",
    icon: School,
    modules: ["Admissions Pipeline", "Student SIS", "Transcript Engine", "Graduation Clearance"],
    accessLevel: "Operations L3",
    color: "purple"
  },
  {
    id: "student",
    name: "Student Experience Portal",
    role: "Enrolled Students / Applicants",
    description: "Self-service portal for course registration, fee statements, e-learning access, hostel allocation, and graduation tracking.",
    icon: Users,
    modules: ["My Courses", "Fee Statement", "E-Learning Hub", "Hostel Allocation"],
    accessLevel: "End-User L1",
    color: "sky"
  },
  {
    id: "staff",
    name: "Staff & HR Portal",
    role: "Academic & Administrative Staff",
    description: "Faculty portal for grading, attendance, leave requests, payroll slips, research publications, and administrative tasks.",
    icon: Briefcase,
    modules: ["Gradebook", "Leave Requests", "Payroll Slips", "Faculty Appraisals"],
    accessLevel: "Staff L2",
    color: "indigo"
  },
  {
    id: "procurement",
    name: "Procurement & Assets Portal",
    role: "Procurement Officers / Supply Chain",
    description: "Requisition workflows, vendor bidding, asset register, inventory tracking, and contract stewardship.",
    icon: FileText,
    modules: ["Purchase Requisitions", "Vendor Registry", "Asset Management", "Contract Audit"],
    accessLevel: "Operations L2",
    color: "amber"
  },
  {
    id: "ict_security",
    name: "ICT & Security Portal",
    role: "SecOps / Systems Administrators",
    description: "Zero-Trust RBAC policy management, API gateway monitoring, system telemetry, and backup disaster recovery.",
    icon: Shield,
    modules: ["Zero-Trust RBAC", "API Gateway", "Cluster Telemetry", "Key Vault"],
    accessLevel: "SecOps L4",
    color: "rose"
  }
];

export const PortalLauncher: React.FC<PortalLauncherProps> = ({
  portals = DEFAULT_PORTALS,
  activePortalId,
  onSelectPortal,
  institutionName = "National Sovereign University",
}) => {
  const portalList = Array.isArray(portals) && portals.length > 0 ? portals : DEFAULT_PORTALS;

  return (
    <div id="ueos-portal-launcher-root" className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-teal-600" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">{institutionName} — Institutional Portals</h2>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Select your authorized workspace portal. Access levels are continuously enforced by Zero-Trust RBAC rules.
            </p>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 shrink-0">
            {portalList.length} Portals Available
          </span>
        </div>
      </div>

      {/* Portal Launcher Cards Grid */}
      <div id="ueos-portal-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {portalList.map((portal: any) => {
          const pId = portal.id || portal.name.toLowerCase().replace(/\s+/g, "_");
          const pName = portal.name || portal.title;
          const pRole = portal.role || "Authorized Access";
          const pDesc = portal.description || "Enterprise workspace portal.";
          const pModules = portal.modules || [];
          const pAccess = portal.accessLevel || "Role Access";
          const isSelected = activePortalId === pId;

          return (
            <div
              key={pId}
              id={`ueos-portal-card-${pId}`}
              className={`bg-white border rounded-xl p-5 shadow-2xs flex flex-col justify-between transition-all duration-150 hover:shadow-md cursor-pointer ${
                isSelected 
                  ? "border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/20" 
                  : "border-slate-200 hover:border-slate-300"
              }`}
              onClick={() => onSelectPortal(pId)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-teal-400 font-bold flex items-center justify-center shrink-0 shadow-xs">
                    <Building className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {pAccess}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">{pName}</h3>
                  <div className="text-[11px] font-mono text-teal-700 font-semibold mt-0.5">{pRole}</div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {pDesc}
                </p>

                {pModules.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Modules
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pModules.slice(0, 4).map((mod: string, idx: number) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 group-hover:underline flex items-center gap-1">
                  Launch Portal
                </span>
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
