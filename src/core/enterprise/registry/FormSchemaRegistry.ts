import { FormSchema } from '../components/forms/SchemaFormEngine';

export type FormSchemaDefinition = FormSchema;
export type { FormSchema };

export const FormSchemaRegistry: Record<string, FormSchema> = {
  FORM_SACCO_MEMBER_REG: {
    id: 'FORM_SACCO_MEMBER_REG',
    title: 'SACCO Member Registration & KYC',
    description: 'Capture exhaustive biodata, financial mandate, and KYC for new SACCO members.',
    fields: [
      { id: 'ident_header', label: 'Section 1 — Identity Information', type: 'section_header' },
      { id: 'memberNo', label: 'SACCO Member Number', type: 'text', required: true, width: 'half' },
      { id: 'fullName', label: 'Full Legal Name', type: 'text', required: true, width: 'full' },
      { id: 'nin', label: 'NIN / National ID / Passport', type: 'text', required: true, width: 'half' },
      { id: 'dob', label: 'Date of Birth', type: 'date', required: true, width: 'half' },
      { id: 'gender', label: 'Gender', type: 'select', required: true, width: 'half', options: [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' }
      ]},
      { id: 'maritalStatus', label: 'Marital Status', type: 'select', required: true, width: 'half', options: [
        { value: 'SINGLE', label: 'Single' },
        { value: 'MARRIED', label: 'Married' },
        { value: 'WIDOWED', label: 'Widowed' },
        { value: 'DIVORCED', label: 'Divorced' }
      ]},
      { id: 'photo', label: 'Passport Photograph', type: 'photo', required: false, width: 'full' },
      
      { id: 'contact_header', label: 'Section 2 — Contact & Residence', type: 'section_header' },
      { id: 'phone', label: 'Primary Telephone', type: 'tel', required: true, width: 'half' },
      { id: 'altPhone', label: 'Alternative Telephone', type: 'tel', required: false, width: 'half' },
      { id: 'email', label: 'Email Address', type: 'email', required: false, width: 'half' },
      { id: 'district', label: 'District / Region', type: 'text', required: true, width: 'half' },
      { id: 'address', label: 'Residential Physical Address', type: 'textarea', required: true, width: 'full' },
      
      { id: 'fin_header', label: 'Section 3 — Financial & Employment Profile', type: 'section_header' },
      { id: 'occupation', label: 'Occupation / Trade', type: 'text', required: true, width: 'half' },
      { id: 'employer', label: 'Employer / Business Entity', type: 'text', required: false, width: 'half' },
      { id: 'monthlyIncome', label: 'Estimated Monthly Income (UGX)', type: 'currency', required: true, width: 'half' },
      { id: 'monthlySavingsTarget', label: 'Monthly Savings Target (UGX)', type: 'currency', required: true, width: 'half' },
      { id: 'bankName', label: 'Commercial Bank Name', type: 'text', required: false, width: 'half' },
      { id: 'bankAccount', label: 'Bank Account Number', type: 'text', required: false, width: 'half' },
      
      { id: 'kin_header', label: 'Section 4 — Next of Kin & Nominee', type: 'section_header' },
      { id: 'kinName', label: 'Next of Kin Full Name', type: 'text', required: true, width: 'half' },
      { id: 'kinRelationship', label: 'Relationship', type: 'text', required: true, width: 'half' },
      { id: 'kinPhone', label: 'Next of Kin Phone', type: 'tel', required: true, width: 'half' },
      { id: 'kinSharePercent', label: 'Benefit Allocation (%)', type: 'number', required: true, width: 'half', defaultValue: 100 },

      { id: 'doc_header', label: 'Section 5 — Verification Documents', type: 'section_header' },
      { id: 'nationalIdDoc', label: 'National ID Scanned Copy', type: 'file', required: false, width: 'half' },
      { id: 'signatureDoc', label: 'Specimen Signature Upload', type: 'file', required: false, width: 'half' }
    ],
    submitLabel: 'Complete SACCO Registration'
  },

  // Exhaustive Church Member Registration
  FORM_CH_MEMBER_REG: {
    id: 'FORM_CH_MEMBER_REG',
    title: 'Universal Church Member Census & Parishioner Profile',
    description: 'Exhaustive 10-section institutional parishioner and sacramental record.',
    fields: [
      { id: 'sec_ident', label: 'Section A — Registration & Identification', type: 'section_header' },
      { id: 'membershipNumber', label: 'Membership / Census Number', type: 'text', required: true, width: 'half' },
      { id: 'registrationDate', label: 'Registration Date', type: 'date', required: true, width: 'half' },
      { id: 'membershipStatus', label: 'Membership Status', type: 'select', required: true, width: 'half', options: [
        { value: 'ACTIVE', label: 'Active Member' },
        { value: 'PROBATIONARY', label: 'Probationary / Catechumen' },
        { value: 'TRANSFERRED_IN', label: 'Transferred In' },
        { value: 'TRANSFERRED_OUT', label: 'Transferred Out' },
        { value: 'DECEASED', label: 'Deceased' }
      ]},
      { id: 'membershipCategory', label: 'Membership Category', type: 'select', required: true, width: 'half', options: [
        { value: 'REGULAR', label: 'Regular Parishioner' },
        { value: 'CLERGY', label: 'Ordained Clergy' },
        { value: 'LAY_LEADER', label: 'Lay Leader / Elder' },
        { value: 'YOUTH', label: 'Youth Guild' },
        { value: 'CHILD', label: 'Sunday School / Child' }
      ]},
      { id: 'parish', label: 'Parish / District', type: 'text', required: true, width: 'half' },
      { id: 'congregation', label: 'Local Congregation / Sub-parish', type: 'text', required: true, width: 'half' },
      { id: 'scc', label: 'Small Christian Community (SCC) / Cell', type: 'text', required: false, width: 'full' },

      { id: 'sec_bio', label: 'Section B — Personal Biodata', type: 'section_header' },
      { id: 'fullName', label: 'Full Legal Names', type: 'text', required: true, width: 'full' },
      { id: 'formerNames', label: 'Former / Maiden / Other Names', type: 'text', required: false, width: 'full' },
      { id: 'sex', label: 'Sex', type: 'select', required: true, width: 'half', options: [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' }
      ]},
      { id: 'dob', label: 'Date of Birth', type: 'date', required: true, width: 'half' },
      { id: 'placeOfBirth', label: 'Place of Birth', type: 'text', required: false, width: 'half' },
      { id: 'nationality', label: 'Nationality', type: 'text', required: true, width: 'half', defaultValue: 'Ugandan' },
      { id: 'nin', label: 'National ID / Passport Number', type: 'text', required: true, width: 'half' },
      { id: 'maritalStatus', label: 'Marital Status', type: 'select', required: true, width: 'half', options: [
        { value: 'SINGLE', label: 'Single' },
        { value: 'MARRIED_RELIGIOUS', label: 'Holy Matrimony (Church)' },
        { value: 'MARRIED_CUSTOMARY', label: 'Customary / Traditional' },
        { value: 'MARRIED_CIVIL', label: 'Civil Marriage' },
        { value: 'WIDOWED', label: 'Widowed' },
        { value: 'SEPARATED', label: 'Separated' }
      ]},
      { id: 'bloodGroup', label: 'Blood Group', type: 'text', required: false, width: 'half' },
      { id: 'occupation', label: 'Occupation', type: 'text', required: false, width: 'half' },
      { id: 'employer', label: 'Employer / Business Name', type: 'text', required: false, width: 'half' },

      { id: 'sec_photo', label: 'Section C — Passport Photograph', type: 'section_header' },
      { id: 'photo', label: 'Member Formal Passport Portrait', type: 'photo', required: false, width: 'full' },

      { id: 'sec_contact', label: 'Section D — Contact & Residential Information', type: 'section_header' },
      { id: 'telephone', label: 'Primary Telephone Number', type: 'tel', required: true, width: 'half' },
      { id: 'altTelephone', label: 'Alternative Telephone', type: 'tel', required: false, width: 'half' },
      { id: 'email', label: 'Email Address', type: 'email', required: false, width: 'half' },
      { id: 'village', label: 'Village / LC1 Zone', type: 'text', required: true, width: 'half' },
      { id: 'subCounty', label: 'Sub-County / Town Council', type: 'text', required: true, width: 'half' },
      { id: 'district', label: 'District', type: 'text', required: true, width: 'half', defaultValue: 'Wakiso' },
      { id: 'residentialAddress', label: 'Detailed Physical Residence', type: 'textarea', required: true, width: 'full' },

      { id: 'sec_family', label: 'Section E — Family & Household Structure', type: 'section_header' },
      { id: 'fatherName', label: 'Father Full Name', type: 'text', required: false, width: 'half' },
      { id: 'motherName', label: 'Mother Full Name', type: 'text', required: false, width: 'half' },
      { id: 'spouseName', label: 'Spouse Full Name', type: 'text', required: false, width: 'half' },
      { id: 'childrenCount', label: 'Number of Children', type: 'number', required: false, width: 'half' },
      { id: 'emergencyContact', label: 'Emergency Contact Person & Phone', type: 'text', required: true, width: 'full' },

      { id: 'sec_academic', label: 'Section F — Academic & Professional Profile', type: 'section_header' },
      { id: 'educationLevel', label: 'Highest Education Level', type: 'select', required: true, width: 'half', options: [
        { value: 'PRIMARY', label: 'Primary' },
        { value: 'O_LEVEL', label: 'O-Level (UCE)' },
        { value: 'A_LEVEL', label: 'A-Level (UACE)' },
        { value: 'CERTIFICATE', label: 'Certificate / Diploma' },
        { value: 'BACHELORS', label: 'Bachelor’s Degree' },
        { value: 'MASTERS', label: 'Master’s Degree' },
        { value: 'DOCTORATE', label: 'PhD / Doctorate' }
      ]},
      { id: 'institution', label: 'Institution Attended', type: 'text', required: false, width: 'half' },
      { id: 'profession', label: 'Professional Discipline / Skills', type: 'text', required: false, width: 'full' },

      { id: 'sec_sacraments', label: 'Section G — Sacramental Profile', type: 'section_header' },
      { id: 'isBaptized', label: 'Baptized', type: 'checkbox', required: false, width: 'half' },
      { id: 'baptismDatePlace', label: 'Baptism Date, Place & Minister', type: 'text', required: false, width: 'half' },
      { id: 'isConfirmed', label: 'Confirmed / Full Communicant', type: 'checkbox', required: false, width: 'half' },
      { id: 'confirmationDatePlace', label: 'Confirmation Date, Place & Bishop', type: 'text', required: false, width: 'half' },
      { id: 'holyMatrimonyDate', label: 'Holy Matrimony Date & Parish', type: 'text', required: false, width: 'half' },
      { id: 'previousParish', label: 'Previous Parish / Congregation (if any)', type: 'text', required: false, width: 'half' },
      { id: 'ministryParticipation', label: 'Ministry Involvement (Choir, Ushers, Youth, Mothers Union)', type: 'text', required: false, width: 'full' },
      { id: 'leadershipRole', label: 'Church Leadership / Committee Role', type: 'text', required: false, width: 'full' },

      { id: 'sec_giving', label: 'Section H — Stewardship & Contribution Profile', type: 'section_header' },
      { id: 'titheProfile', label: 'Tithe Envelope / Number', type: 'text', required: false, width: 'half' },
      { id: 'pledgeTarget', label: 'Annual Development Pledge (UGX)', type: 'currency', required: false, width: 'half' },

      { id: 'sec_docs', label: 'Section I — Supporting Documents & Attachments', type: 'section_header' },
      { id: 'baptismCertDoc', label: 'Baptism Certificate Upload', type: 'file', required: false, width: 'half' },
      { id: 'confirmationCertDoc', label: 'Confirmation Certificate Upload', type: 'file', required: false, width: 'half' },
      { id: 'nationalIdScan', label: 'National ID / Passport Scan', type: 'file', required: false, width: 'half' },
      { id: 'transferLetterDoc', label: 'Parish Transfer Letter', type: 'file', required: false, width: 'half' },

      { id: 'sec_workflow', label: 'Section J — Institutional Verification & Workflow', type: 'section_header' },
      { id: 'enrollingPriest', label: 'Enrolling Minister / Lay Reader', type: 'text', required: true, width: 'half' },
      { id: 'verificationRemarks', label: 'Verification & Background Remarks', type: 'textarea', required: false, width: 'full' }
    ],
    submitLabel: 'Complete Census Registration & Enroll'
  },

  // Exhaustive Student Registration (Nursery, Primary & Secondary)
  FORM_EDU_STUDENT_REG: {
    id: 'FORM_EDU_STUDENT_REG',
    title: 'Exhaustive Student Admission & SIS Institutional Intake',
    description: 'Universal 12-section institutional intake record for Nursery, Primary, and Secondary students.',
    fields: [
      { id: 'sec_ident', label: 'Section 1 — Student Identification & Intake', type: 'section_header' },
      { id: 'studentId', label: 'Student ID / Admission Number', type: 'text', required: true, width: 'half' },
      { id: 'admissionDate', label: 'Admission Date', type: 'date', required: true, width: 'half' },
      { id: 'linNin', label: 'Learner Identification Number (LIN / EMIS / NIN)', type: 'text', required: false, width: 'half' },
      { id: 'entryType', label: 'Entry Status', type: 'select', required: true, width: 'half', options: [
        { value: 'NEW_INTAKE', label: 'Fresh Intake' },
        { value: 'TRANSFER_IN', label: 'Transfer In' },
        { value: 'RE_ADMISSION', label: 'Re-admission' },
        { value: 'SCHOLARSHIP', label: 'Scholarship Recipient' }
      ]},

      { id: 'sec_biodata', label: 'Section 2 — Personal Biodata', type: 'section_header' },
      { id: 'fullName', label: 'Full Legal Names (as on Birth Certificate)', type: 'text', required: true, width: 'full' },
      { id: 'otherNames', label: 'Former / Other Names / Aliases', type: 'text', required: false, width: 'full' },
      { id: 'dob', label: 'Date of Birth', type: 'date', required: true, width: 'half' },
      { id: 'gender', label: 'Gender', type: 'select', required: true, width: 'half', options: [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' }
      ]},
      { id: 'nationality', label: 'Nationality', type: 'text', required: true, width: 'half', defaultValue: 'Ugandan' },
      { id: 'birthPlace', label: 'Place of Birth / District', type: 'text', required: false, width: 'half' },
      { id: 'religion', label: 'Religious Denomination', type: 'text', required: false, width: 'half' },

      { id: 'sec_photo', label: 'Section 3 — Passport Photograph', type: 'section_header' },
      { id: 'photo', label: 'Student Formal Passport Portrait', type: 'photo', required: false, width: 'full' },

      { id: 'sec_academic', label: 'Section 4 — Academic Placement & Curriculum', type: 'section_header' },
      { id: 'level', label: 'Education Level', type: 'select', required: true, width: 'half', options: [
        { value: 'NURSERY_BABY', label: 'Nursery — Baby Class' },
        { value: 'NURSERY_MIDDLE', label: 'Nursery — Middle Class' },
        { value: 'NURSERY_TOP', label: 'Nursery — Top Class' },
        { value: 'PRIMARY_1', label: 'Primary 1 (P.1)' },
        { value: 'PRIMARY_2', label: 'Primary 2 (P.2)' },
        { value: 'PRIMARY_3', label: 'Primary 3 (P.3)' },
        { value: 'PRIMARY_4', label: 'Primary 4 (P.4)' },
        { value: 'PRIMARY_5', label: 'Primary 5 (P.5)' },
        { value: 'PRIMARY_6', label: 'Primary 6 (P.6)' },
        { value: 'PRIMARY_7', label: 'Primary 7 (P.7 Candidate)' },
        { value: 'SEC_S1', label: 'Senior 1 (S.1)' },
        { value: 'SEC_S2', label: 'Senior 2 (S.2)' },
        { value: 'SEC_S3', label: 'Senior 3 (S.3)' },
        { value: 'SEC_S4', label: 'Senior 4 (S.4 Candidate)' },
        { value: 'SEC_S5', label: 'Senior 5 (S.5)' },
        { value: 'SEC_S6', label: 'Senior 6 (S.6 Candidate)' }
      ]},
      { id: 'stream', label: 'Stream / Section / House', type: 'text', required: false, width: 'half' },
      { id: 'unebCenterNo', label: 'UNEB Center / Index Number', type: 'text', required: false, width: 'half' },
      { id: 'combination', label: 'A-Level Subject Combination (e.g. PCM/ICT, BCM/SubMath, HEG/Div)', type: 'text', required: false, width: 'half' },
      { id: 'boardingStatus', label: 'Accommodation Status', type: 'select', required: true, width: 'half', options: [
        { value: 'DAY', label: 'Day Scholar' },
        { value: 'BOARDING', label: 'Full Boarding' },
        { value: 'HOSTEL', label: 'Affiliated Hostel' }
      ]},
      { id: 'dormitory', label: 'Dormitory / House Assigned', type: 'text', required: false, width: 'half' },

      { id: 'sec_parent', label: 'Section 5 — Parent / Guardian Information', type: 'section_header' },
      { id: 'fatherName', label: 'Father Full Name & Occupation', type: 'text', required: false, width: 'half' },
      { id: 'motherName', label: 'Mother Full Name & Occupation', type: 'text', required: false, width: 'half' },
      { id: 'primaryGuardian', label: 'Primary Legal Guardian Full Name', type: 'text', required: true, width: 'full' },
      { id: 'guardianRelationship', label: 'Guardian Relationship', type: 'text', required: true, width: 'half' },
      { id: 'guardianPhone', label: 'Guardian Primary Phone', type: 'tel', required: true, width: 'half' },
      { id: 'guardianAltPhone', label: 'Guardian Alternative Phone', type: 'tel', required: false, width: 'half' },
      { id: 'guardianEmail', label: 'Guardian Email Address', type: 'email', required: false, width: 'half' },
      { id: 'residentialAddress', label: 'Home Physical Address & Village', type: 'textarea', required: true, width: 'full' },

      { id: 'sec_medical', label: 'Section 6 — Health, Medical & Welfare', type: 'section_header' },
      { id: 'bloodGroup', label: 'Blood Group', type: 'text', required: false, width: 'half' },
      { id: 'chronicConditions', label: 'Chronic Illnesses / Special Medical Needs', type: 'textarea', required: false, width: 'full' },
      { id: 'allergies', label: 'Food / Medication Allergies', type: 'textarea', required: false, width: 'full' },
      { id: 'emergencyHospital', label: 'Preferred Emergency Clinic / Doctor', type: 'text', required: false, width: 'full' },

      { id: 'sec_finance', label: 'Section 7 — Fees & Billing Structure', type: 'section_header' },
      { id: 'feeCategory', label: 'Fee Category', type: 'select', required: true, width: 'half', options: [
        { value: 'REGULAR', label: 'Full Tuition Standard' },
        { value: 'STAFF_CHILD', label: 'Staff Concession' },
        { value: 'SPONSORED', label: 'NGO / Church Sponsored' },
        { value: 'BURSARY', label: 'Academic Bursary' }
      ]},
      { id: 'sponsorName', label: 'Sponsor Organization (if applicable)', type: 'text', required: false, width: 'half' },

      { id: 'sec_docs', label: 'Section 8 — Documentation & Credentials', type: 'section_header' },
      { id: 'birthCertificateDoc', label: 'Birth Certificate Copy', type: 'file', required: false, width: 'half' },
      { id: 'pleUceResultSlipDoc', label: 'PLE / UCE Official Result Slip', type: 'file', required: false, width: 'half' },
      { id: 'prevReportCardDoc', label: 'Previous School Term Report', type: 'file', required: false, width: 'half' },
      { id: 'medicalFormDoc', label: 'Medical Clearance Form', type: 'file', required: false, width: 'half' }
    ],
    submitLabel: 'Finalize Institutional Admission'
  },

  // Staff & Teacher Institutional Profile
  FORM_EDU_STAFF_REG: {
    id: 'FORM_EDU_STAFF_REG',
    title: 'Institutional Academic Staff & HR Profile',
    description: 'Faculty, educator, and administrative staff registration.',
    fields: [
      { id: 'sec_ident', label: 'Section 1 — Staff Identification', type: 'section_header' },
      { id: 'staffNo', label: 'Staff Payroll / IPPS Number', type: 'text', required: true, width: 'half' },
      { id: 'appointmentDate', label: 'Appointment Date', type: 'date', required: true, width: 'half' },
      { id: 'fullName', label: 'Full Legal Names', type: 'text', required: true, width: 'full' },
      { id: 'nin', label: 'National Identification Number (NIN)', type: 'text', required: true, width: 'half' },
      { id: 'gender', label: 'Gender', type: 'select', required: true, width: 'half', options: [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' }
      ]},
      { id: 'photo', label: 'Staff Formal Portrait', type: 'photo', required: false, width: 'full' },

      { id: 'sec_role', label: 'Section 2 — Academic Department & Teaching Load', type: 'section_header' },
      { id: 'department', label: 'Department / Faculty', type: 'select', required: true, width: 'half', options: [
        { value: 'SCIENCES', label: 'Science & Mathematics' },
        { value: 'HUMANITIES', label: 'Humanities & Social Sciences' },
        { value: 'LANGUAGES', label: 'Languages & Literature' },
        { value: 'VOCATIONAL', label: 'Vocational & Technical' },
        { value: 'ADMINISTRATION', label: 'Administration & Bursary' }
      ]},
      { id: 'designation', label: 'Designation / Post (e.g. Head of Dept, Class Teacher)', type: 'text', required: true, width: 'half' },
      { id: 'mainSubjects', label: 'Primary Teaching Subjects', type: 'text', required: true, width: 'full' },
      { id: 'qualification', label: 'Highest Academic Qualification', type: 'text', required: true, width: 'half' },
      { id: 'salaryScale', label: 'Salary Scale / Grade (UGX)', type: 'currency', required: true, width: 'half' },

      { id: 'sec_contact', label: 'Section 3 — Contact & Banking', type: 'section_header' },
      { id: 'phone', label: 'Primary Mobile', type: 'tel', required: true, width: 'half' },
      { id: 'email', label: 'Institutional / Personal Email', type: 'email', required: true, width: 'half' },
      { id: 'bankName', label: 'Payroll Bank', type: 'text', required: true, width: 'half' },
      { id: 'accountNo', label: 'Account Number', type: 'text', required: true, width: 'half' }
    ],
    submitLabel: 'Enroll Staff Member'
  },

  // FAAP Financial Journal Entry
  FORM_FAAP_JOURNAL_ENTRY: {
    id: 'FORM_FAAP_JOURNAL_ENTRY',
    title: 'Financial Ledger Journal Entry (FAAP)',
    description: 'Post double-entry transaction to the state-authoritative general ledger.',
    fields: [
      { id: 'header', label: 'Section 1 — Transaction Metadata', type: 'section_header' },
      { id: 'date', label: 'Transaction Effective Date', type: 'date', required: true, width: 'half' },
      { id: 'reference', label: 'Voucher / Reference #', type: 'text', required: true, width: 'half' },
      { id: 'description', label: 'Transaction Description / Narrative', type: 'text', required: true, width: 'full' },
      
      { id: 'debit_section', label: 'Section 2 — Debit Ledger Entry', type: 'section_header' },
      { id: 'debitAccount', label: 'Debit Account (COA Code)', type: 'text', required: true, width: 'half' },
      { id: 'debitAmount', label: 'Debit Amount (UGX)', type: 'currency', required: true, width: 'half' },
      
      { id: 'credit_section', label: 'Section 3 — Credit Ledger Entry', type: 'section_header' },
      { id: 'creditAccount', label: 'Credit Account (COA Code)', type: 'text', required: true, width: 'half' },
      { id: 'creditAmount', label: 'Credit Amount (UGX)', type: 'currency', required: true, width: 'half' },

      { id: 'doc_sec', label: 'Section 4 — Verification Attachment', type: 'section_header' },
      { id: 'sourceDoc', label: 'Scanned Supporting Invoice / Receipt', type: 'file', required: false, width: 'full' }
    ],
    submitLabel: 'Post to General Ledger'
  },

  // Vote Book Encumbrance
  FORM_FAAP_VOTEBOOK_ENTRY: {
    id: 'FORM_FAAP_VOTEBOOK_ENTRY',
    title: 'Vote Book Commitment & Encumbrance',
    description: 'Record institutional budgetary commitment against an approved vote line.',
    fields: [
      { id: 'sec_meta', label: 'Section 1 — Commitment Details', type: 'section_header' },
      { id: 'date', label: 'Commitment Date', type: 'date', required: true, width: 'half' },
      { id: 'voteHead', label: 'Vote Head / Line Item Code', type: 'text', required: true, width: 'half' },
      { id: 'requisitionNo', label: 'Internal Requisition Number', type: 'text', required: true, width: 'half' },
      { id: 'department', label: 'Originating Department', type: 'text', required: true, width: 'half' },
      { id: 'description', label: 'Purpose & Description of Expenditure', type: 'textarea', required: true, width: 'full' },
      { id: 'amount', label: 'Committed Amount (UGX)', type: 'currency', required: true, width: 'half' },
      { id: 'beneficiary', label: 'Payee / Contractor Name', type: 'text', required: true, width: 'half' }
    ],
    submitLabel: 'Record Encumbrance in Vote Book'
  },

  // Church Tithes & Offerings
  FORM_CH_TITHE_ENTRY: {
    id: 'FORM_CH_TITHE_ENTRY',
    title: 'Tithe, Offering & Stewardship Contribution',
    description: 'Record financial stewardship from parishioner with auto-reconciling ledger entry.',
    fields: [
      { id: 'sec_entry', label: 'Section 1 — Stewardship Details', type: 'section_header' },
      { id: 'date', label: 'Contribution Date', type: 'date', required: true, width: 'half' },
      { id: 'memberId', label: 'Parishioner Membership No', type: 'text', required: true, width: 'half' },
      { id: 'memberName', label: 'Parishioner Name', type: 'text', required: true, width: 'full' },
      { id: 'titheAmount', label: 'Tithe Amount (UGX)', type: 'currency', required: true, width: 'half' },
      { id: 'offeringAmount', label: 'General Offering (UGX)', type: 'currency', required: false, width: 'half' },
      { id: 'pledgeAmount', label: 'Building Fund / Pledge (UGX)', type: 'currency', required: false, width: 'half' },
      { id: 'paymentMethod', label: 'Payment Channel', type: 'select', required: true, width: 'half', options: [
        { value: 'CASH', label: 'Cash Envelope' },
        { value: 'MOMO', label: 'Mobile Money (MTN / Airtel)' },
        { value: 'BANK', label: 'Direct Bank Transfer' },
        { value: 'CHEQUE', label: 'Bank Cheque' }
      ]},
      { id: 'reference', label: 'Transaction Reference / Receipt No', type: 'text', required: true, width: 'half' }
    ],
    submitLabel: 'Post Stewardship Receipt'
  },

  // Alumni Census & Advancement
  FORM_ALUM_CENSUS_ENTRY: {
    id: 'FORM_ALUM_CENSUS_ENTRY',
    title: 'Alumni Census & Advancement Registry',
    description: 'Capture graduate milestones, mentorship availability, and endowment pledges.',
    fields: [
      { id: 'sec_ident', label: 'Section 1 — Graduate Identity', type: 'section_header' },
      { id: 'alumniId', label: 'Alumni Reg Number', type: 'text', required: true, width: 'half' },
      { id: 'fullName', label: 'Full Legal Name', type: 'text', required: true, width: 'full' },
      { id: 'graduationYear', label: 'Class / Graduation Year', type: 'number', required: true, width: 'half' },
      { id: 'degreeProgram', label: 'Degree / Certificate Attained', type: 'text', required: true, width: 'half' },
      { id: 'photo', label: 'Alumni Photo', type: 'photo', required: false, width: 'full' },

      { id: 'sec_career', label: 'Section 2 — Professional Milestones', type: 'section_header' },
      { id: 'currentIndustry', label: 'Industry Sector', type: 'text', required: true, width: 'half' },
      { id: 'employer', label: 'Current Organization / Company', type: 'text', required: true, width: 'half' },
      { id: 'jobTitle', label: 'Current Job Title', type: 'text', required: true, width: 'half' },
      { id: 'country', label: 'Country of Residence', type: 'text', required: true, width: 'half', defaultValue: 'Uganda' },

      { id: 'sec_advancement', label: 'Section 3 — Mentorship & Endowment', type: 'section_header' },
      { id: 'willingToMentor', label: 'Available as Student Mentor', type: 'checkbox', required: false, width: 'half' },
      { id: 'endowmentPledge', label: 'Annual Endowment Pledge (UGX)', type: 'currency', required: false, width: 'half' },
      { id: 'phone', label: 'Contact Phone Number', type: 'tel', required: true, width: 'half' },
      { id: 'email', label: 'Contact Email Address', type: 'email', required: true, width: 'half' }
    ],
    submitLabel: 'Update Alumni Record'
  }
};
