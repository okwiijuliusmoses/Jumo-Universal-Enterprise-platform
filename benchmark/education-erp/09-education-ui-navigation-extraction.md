# Education ERP UI Navigation & Information Architecture

This document blueprints the standard visual and functional layout of enterprise Education platforms.

```
┌───────────────────────────────────────────────────────────────────┐
│ [JUMO Brand]     [Search Registry...]    [Active Hub Selector]    │
├──────────────┬────────────────────────────────────────────────────┤
│              │                                                    │
│ Academics    │  WORKSPACE PANEL                                   │
│  ├ Admissions│                                                    │
│  ├ Registrar │  Active Office: Academic Registrar                 │
│  └ Exams     │  ----------------------------------------          │
│              │  [ Admissions Queue ] [ Enrollment Diagnostics ]  │
│ Operations   │                                                    │
│  ├ Clinic    │  ┌──────────────────────────────────────────────┐  │
│  ├ Library   │  │ Enrollment Records Table                     │  │
│  └ Hostels   │  │                                              │  │
│              │  └──────────────────────────────────────────────┘  │
│ Finance      │                                                    │
│  └ Vote Book │                                                    │
└──────────────┴────────────────────────────────────────────────────┘
```

## Navigation Structure

### 1. Unified Navigation Menu
Organized into three operational pillars:
1.  **Academics Hub:**
    *   `Admissions`: Student applications, document checklists, enrollment validations.
    *   `Registrar Office`: Active student profile lists, campus location mappings, semester progression state controls.
    *   `Senate Examinations Board`: Mark sheets, GPAs calculations, Board approval registers.
2.  **Campus Operations Hub:**
    *   `Medical Clinic`: Student vitals checks, treatment logs, pharmacy supply metrics.
    *   `Library Catalog`: Book checkouts, due-date circulation logs, librarian approvals.
    *   `Dorm Hostels`: Bed space ratios, building capacities, room allocations.
3.  **Finance & Strategy Hub:**
    *   `Bursar / Vote Book`: Departmental budget heads, committed requisition funds, available cash offsets.
    *   `Policy & Governance`: University Council resolutions, statutory gazettes, policy alerts.

### 2. Interaction Design Norms
*   **Context Panel (Drilldowns):** Clicking any student row opens a sliding modal drawer containing contact profiles, medical details, and active circulation holds.
*   **Action Confirmations:** Destructive actions (such as demerits or budget cuts) require double-signature overrides.
*   **Search and Filters:** Search inputs must execute dynamic filters against databases instantly.
