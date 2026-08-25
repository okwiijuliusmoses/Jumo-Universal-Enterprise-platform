const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'benchmark-reconstructions');

const ensureDir = (p) => {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
};

// --- SOURCE SPECIFIC RESEARCH DATA ---
const SOURCES = {
    DMAS: {
        name: 'NAMIREMBE DMAS',
        dir: 'namirembe-dmas',
        depts: ['Bishop\'s Office', 'Diocesan Secretariat', 'Treasury', 'Archdeaconries', 'Parishes', 'Sub-Parishes', 'Congregations'],
        modules: [
            { id: 'DMAS-MOD-001', name: 'Member Register', sub: 'Household Mapping, Baptisms', prov: 'SOURCE-OBSERVED' },
            { id: 'DMAS-MOD-002', name: 'Sacramental Records', sub: 'Confirmation, Marriage, Burial', prov: 'SOURCE-DOCUMENTED' },
            { id: 'DMAS-MOD-003', name: 'Tithe & Stewardship', sub: 'Envelopes, Mobile Money Push', prov: 'SOURCE-OBSERVED' },
            { id: 'DMAS-MOD-004', name: 'Diocesan Quota', sub: 'Assessments, Remittances', prov: 'SOURCE-DOCUMENTED' },
            { id: 'DMAS-MOD-005', name: 'Clergy Deployment', sub: 'Transfers, History, Payroll', prov: 'COMPARATIVE-UGANDA' }
        ],
        screens: [
            { id: 'DMAS-SCR-001', name: 'Parish Priest Dashboard', route: '/parish/home', prov: 'SOURCE-OBSERVED' },
            { id: 'DMAS-SCR-002', name: 'Tithe Entry Form', route: '/parish/finance/tithe', prov: 'SOURCE-OBSERVED' },
            { id: 'DMAS-SCR-003', name: 'Sacrament Wizard', route: '/parish/records/sacrament', prov: 'ARCHITECTURAL-RECONSTRUCTION' }
        ]
    },
    NACOBA: {
        name: 'NAMILYANGO ALUMNI (NACOBA)',
        dir: 'namilyango-alumni',
        depts: ['Executive', 'Secretariat', 'Chapters', 'Cohorts', 'Houses (Biikira, Mukasa, Hanlon, Minderop, Doyle, Kuipers, McKee)'],
        modules: [
            { id: 'NAC-MOD-001', name: 'Alumni Registry', sub: 'House Affiliation, Admission Year', prov: 'SOURCE-OBSERVED' },
            { id: 'NAC-MOD-002', name: 'Annual Subscriptions', sub: 'Payment Gateway, Arrears', prov: 'SOURCE-OBSERVED' },
            { id: 'NAC-MOD-003', name: 'Events & Ticketing', sub: 'AGM, Reunions, Dinners', prov: 'SOURCE-DOCUMENTED' }
        ],
        screens: [
            { id: 'NAC-SCR-001', name: 'Member Portal Home', route: '/member/dashboard', prov: 'SOURCE-OBSERVED' },
            { id: 'NAC-SCR-002', name: 'Pay Subscription', route: '/member/pay', prov: 'SOURCE-OBSERVED' }
        ]
    },
    KAMPALA_PARENTS: {
        name: 'KAMPALA PARENTS SCHOOL',
        dir: 'nursery-primary/kampala-parents',
        depts: ['Admissions', 'Academics', 'E-Learning', 'Finance', 'Swimming/Tailoring'],
        modules: [
            { id: 'KPS-MOD-001', name: 'Admissions & Enrollment', sub: 'Primary, Nursery', prov: 'SOURCE-OBSERVED' },
            { id: 'KPS-MOD-002', name: 'Smart Board E-Learning', sub: 'Content Delivery', prov: 'SOURCE-DOCUMENTED' },
            { id: 'KPS-MOD-003', name: 'SchoolPay Integrations', sub: 'Fee Payments', prov: 'SOURCE-OBSERVED' }
        ],
        screens: [
            { id: 'KPS-SCR-001', name: 'Parent E-Learning Portal', route: '/parent/elearning', prov: 'SOURCE-DOCUMENTED' },
            { id: 'KPS-SCR-002', name: 'Fee Statement', route: '/parent/fees', prov: 'SOURCE-OBSERVED' }
        ]
    },
    NAMILYANGO_COLLEGE: {
        name: 'NAMILYANGO COLLEGE',
        dir: 'secondary/namilyango',
        depts: ['O-Level', 'A-Level', 'Houses', 'Sports (Boxing, Rugby)', 'Discipline'],
        modules: [
            { id: 'NGO-MOD-001', name: 'O/A Level Admissions', sub: 'UNEB Registration', prov: 'SOURCE-OBSERVED' },
            { id: 'NGO-MOD-002', name: 'House & Dorm Allocation', sub: 'Biikira, Mukasa, etc.', prov: 'SOURCE-DOCUMENTED' },
            { id: 'NGO-MOD-003', name: 'Discipline Register', sub: 'Infractions, Prefect logs', prov: 'COMPARATIVE-UGANDA' }
        ],
        screens: [
            { id: 'NGO-SCR-001', name: 'Housemaster Dashboard', route: '/staff/housemaster', prov: 'ARCHITECTURAL-RECONSTRUCTION' },
            { id: 'NGO-SCR-002', name: 'Student Transcript', route: '/student/academics', prov: 'SOURCE-OBSERVED' }
        ]
    },
    FINTECH_FAAP: {
        name: 'FINTECH - FAAP',
        dir: 'fintech/faap',
        depts: ['Treasury', 'Financial Control', 'Audit'],
        modules: [
            { id: 'FAAP-MOD-001', name: 'General Ledger', sub: 'Chart of Accounts, Journal Entries', prov: 'COMPARATIVE-UGANDA' },
            { id: 'FAAP-MOD-002', name: 'Reconciliation', sub: 'Cashbook, Bank Sync', prov: 'COMPARATIVE-UGANDA' }
        ],
        screens: [
            { id: 'FAAP-SCR-001', name: 'Trial Balance Report', route: '/reports/tb', prov: 'COMPARATIVE-UGANDA' }
        ]
    }
};

let masterReport = `# MASTER BENCHMARK QUANTITATIVE REPORT\n\n`;
masterReport += `| Source | Departments | Modules | Screens | Provenance Breakdown |\n`;
masterReport += `|---|---|---|---|---|\n`;

Object.keys(SOURCES).forEach(key => {
    const src = SOURCES[key];
    const srcDir = path.join(baseDir, src.dir);
    ensureDir(path.join(srcDir, 'inventory'));
    ensureDir(path.join(srcDir, 'ui'));

    // Generate MODULE-INVENTORY.md
    let modMd = `# MODULE INVENTORY: ${src.name}\n\n`;
    modMd += `| Module ID | Module Name | Submodules | Provenance | Implementation Status |\n`;
    modMd += `|---|---|---|---|---|\n`;
    src.modules.forEach(m => {
        modMd += `| ${m.id} | ${m.name} | ${m.sub} | ${m.prov} | ISOLATED RECONSTRUCTION |\n`;
    });
    fs.writeFileSync(path.join(srcDir, 'inventory', 'MODULE-INVENTORY.md'), modMd);

    // Generate SCREEN-INVENTORY.md
    let scrMd = `# SCREEN INVENTORY: ${src.name}\n\n`;
    scrMd += `| Screen ID | Screen Name | Route | Provenance | Implementation Status |\n`;
    scrMd += `|---|---|---|---|---|\n`;
    src.screens.forEach(s => {
        scrMd += `| ${s.id} | ${s.name} | ${s.route} | ${s.prov} | PENDING UI BUILD |\n`;
    });
    fs.writeFileSync(path.join(srcDir, 'inventory', 'SCREEN-INVENTORY.md'), scrMd);

    // Update Master Report
    masterReport += `| ${src.name} | ${src.depts.length} | ${src.modules.length} | ${src.screens.length} | Source-Observed: ${src.modules.filter(m=>m.prov==='SOURCE-OBSERVED').length}, Comparative: ${src.modules.filter(m=>m.prov==='COMPARATIVE-UGANDA').length} |\n`;
});

fs.writeFileSync(path.join(baseDir, 'MASTER-BENCHMARK-QUANTITATIVE-REPORT.md'), masterReport);
console.log('Deep unique inventories generated.');
