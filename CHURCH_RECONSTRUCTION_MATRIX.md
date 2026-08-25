# JUMO CHURCH ERP — RECONSTRUCTION MATRIX

## 1. Executive Ecclesiastical Architecture
JUMO Church ERP delivers an independent, diocesan-grade ecclesiastical operating system. It mirrors the organizational structure of regional Dioceses, Archdeaconries, Parishes, and Sub-Parish Curate Stations.

---

## 2. Ecclesiastical Office Reconstruction Matrix

| Ecclesiastical Level | Functional Office | Structural Home & File Path | Capabilities & Enterprise Tables | Benchmark Reference |
| :--- | :--- | :--- | :--- | :--- |
| **DIOCESE / CHANCERY** | Episcopal Chancery & Bishop Office | `/src/products/church-erp/offices/BishopOffice.tsx` | - Diocesan Synod decrees & resolutions<br>- Archdeaconry quota assessment & clearances<br>- Clergy licensing, postings & bishop mandates<br>- Diocesan Board of Finance governance | Grace Diocese Chancery Benchmark |
| **PARISH / CURATE STATION** | Parish Priest & Vicar Office | `/src/products/church-erp/offices/ParishPriestOffice.tsx` | - Sunday & midweek liturgical service rosters<br>- Communicants roll & parish family register<br>- Pastoral visitation logs & counseling records<br>- Sub-parish curate station supervision | Provincial Parish Administration Standard |
| **CANONICAL REGISTRAR** | Sacramental Registrar Office | `/src/products/church-erp/offices/SacramentalOffice.tsx` | - **Holy Baptism Register**: Ref, candidate, godparents, officiant<br>- **Episcopal Confirmation Register**: Ref, bishop, parish<br>- **Holy Matrimony Register**: Banns of marriage, licenses<br>- **Burial Register**: Funeral certificates & cemetery records | Canonical Sacramental Law Standards |
| **FINANCE & STEWARDSHIP** | Church Finance & Tithes Office | `/src/products/church-erp/offices/ChurchFinanceOffice.tsx` | - **Tithe Remittance Table**: Giver, channel, amount, timestamp<br>- **Offertory & Harvest Thanksgiving Ledger**: Special drives<br>- **Diocesan Quota Payment**: Remittance to Chancery<br>- **FAAP Integration**: Live double-entry $0.00 parity audit | FAAP General Ledger Engine |
| **CAPITAL WORKS** | Capital Projects & Works Office | `/src/products/church-erp/offices/ChurchProjectsOffice.tsx` | - Cathedral & parish hall expansion budgets<br>- Solar borehole & community project tracking<br>- Contractor voucher approvals & procurement<br>- Project fundraising pledges & progress bars | Church Development Board Framework |
| **DEVELOPER & INTEGRATION** | Church Developer Portal | `/src/products/ChurchDeveloperPortal.tsx` | - Church API keys & webhook endpoints<br>- Sacramental verification QR code API<br>- SMS & WhatsApp pastoral broadcast gateway | JUMO Developer Gateway |

---

## 3. Ecclesiastical Integrity Certification
Church ERP operates independently of School ERP and FINTECH. All ecclesiastical registers maintain cryptographically verifiable reference numbers for canonical record authenticity.
