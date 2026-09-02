# JUMO FINTECH - MODULE INSTALLATION MATRIX

Definition of independent financial systems within the JUMO FINTECH ecosystem.

| System | Module Boundary | Bootstrap | Nav Registration | Capabilities | Forms | Data Schema | Status |
|--------|-----------------|-----------|------------------|--------------|-------|-------------|--------|
| JUMO FAAP | `/src/faap/` | `faap.init.ts` | `faap.nav.ts` | GL, AP, AR, Tax | `JournalForm` | `faap.schema.ts` | MOUNTED |
| JUMO Digital Pay | `/src/pay/` | `pay.init.ts` | `pay.nav.ts` | Switch, Settlement | `PayCodeForm` | `pay.schema.ts` | MOUNTED |
| Member CIF | `/src/cif/` | `cif.init.ts` | `cif.nav.ts` | Registry, KYC | `EnrollForm` | `cif.schema.ts` | MOUNTED |
| Lending Ops | `/src/loans/` | `loans.init.ts` | `loans.nav.ts` | Appraisal, Collect | `AppraisalForm`| `loans.schema.ts`| MOUNTED |
| Agent Network | `/src/agents/` | `agents.init.ts` | `agents.nav.ts` | Float, Commissions | `AgentForm` | `agents.schema.ts`| MOUNTED |

## Integration Boundaries
- **DPAY -> FAAP**: Every settled payment triggers an `AccountingEvent` consumed by the FAAP Ledger.
- **LOANS -> CIF**: Loan applications are strictly linked to `MemberCIF` verified records.
- **AGENTS -> DPAY**: Agent float top-ups are processed via the `DigitalPay` Cash-in rail.
