/**
 * JUMO UEOS — Authoritative Benchmark Sources Directory
 * Multi-Source Provenance & Forensic Metadata Registry.
 */

import { BenchmarkSourceInfo } from './types';

export const BENCHMARK_SOURCES: Record<string, BenchmarkSourceInfo> = {
  ALPHA_ACADEMY: {
    sourceId: 'SRC-ALPHA',
    name: 'Alpha Academy K-12 & Academy SIS',
    category: 'K12_ACADEMY',
    description: 'Comprehensive K-12 and Academy school management platform covering admissions, streams, grading, report cards, dormitories, clinics, transport, and parent communication.',
    targetScale: 'Primary, Secondary, High Schools & Boarding Academies (500 - 5,000 Students)',
    provenance: 'OBSERVED',
    confidence: 'HIGH',
    evidenceBase: [
      'Alpha Academy Academic Management Model',
      'Continuous Assessment & Marksheet Engine',
      'Student Dormitory & Sick Bay Logbooks',
      'School Transport Fleet & Route Allocator',
      'Parent Direct Messaging & Terminal Report Cards'
    ]
  },
  QUICKBOOKS_ENTERPRISE: {
    sourceId: 'SRC-QB',
    name: 'QuickBooks Enterprise & Financial Suite',
    category: 'COMMERCIAL_FINANCE',
    description: 'Commercial accounting and enterprise ERP financial engine covering Chart of Accounts, General Ledger, 3-Way Matching AP, Customer AR, Bank Feeds, Tax/VAT, and IFRS Reporting.',
    targetScale: 'Mid-Market & Commercial Enterprises ($1M - $100M Turnover)',
    provenance: 'OBSERVED',
    confidence: 'HIGH',
    evidenceBase: [
      'Intuit QuickBooks Enterprise Double-Entry Accounting Core',
      'Hierarchical Chart of Accounts & Class Tracking Engine',
      'Electronic Bank Feeds (OFX/QFX/MT940/BAI2) Matching Rules',
      'Vendor Purchase Order & 3-Way Matched Invoicing',
      'Accounts Receivable Aging & Automated Dunning Engine'
    ]
  },
  SCHOOLPAY_NETWORK: {
    sourceId: 'SRC-SPAY',
    name: 'SchoolPay Payment Gateway & Clearing Rails',
    category: 'PAYMENT_GATEWAY',
    description: 'Institutional digital fee collection and interbank settlement network supporting Student Payment Codes (PRNs), Cellular Mobile Money (MTN/Airtel/M-Pesa), Teller APIs, and Automated Daily Recon.',
    targetScale: 'National Educational Institutions & Multi-Bank Clearing Networks (1M+ Transactions/Year)',
    provenance: 'OBSERVED',
    confidence: 'HIGH',
    evidenceBase: [
      'SchoolPay Payment Code Resolution API Specification',
      'Cellular Mobile Money (MTN MoMo, Airtel Money, M-Pesa) Webhooks',
      'Commercial Bank Branch Teller Terminal Bridge',
      'End-of-Day Transaction Clearing & Settlement Sweeps',
      'Automated 3-Way Reconciliation & Suspense Account Engine'
    ]
  },
  IUIU_ULTIMATE_ERP: {
    sourceId: 'SRC-IUIU',
    name: 'Islamic University in Uganda (IUIU) Multi-Campus ERP',
    category: 'HIGHER_ED_UNIVERSITY',
    description: 'Comprehensive Higher Education Operating System covering Council/Senate Governance, Academic Registrar, Bursar Financial Ledgers, Vote Books, Faculty Deans, Exam Halls, OPAC Library, and Medical Centers across 4 Campuses.',
    targetScale: 'Multi-Campus University System (15,000+ Students, 1,200+ Staff, 7 Faculties)',
    provenance: 'OBSERVED',
    confidence: 'HIGH',
    evidenceBase: [
      'IUIU University Council & Senate Governance Operating Charter',
      'Academic Registrar Directorate Student Lifecycle & Moderation Engine',
      'University Bursary Vote Book & Commitment Accounting Architecture',
      'Multi-Campus Operations (Main Mbale, Kampala, Females Kabojja, Arua)',
      'University Medical Center Electronic Medical Records & Inpatient Log',
      'Library OPAC Circulation & Research Grant Repositories'
    ]
  },
  JUMO_UEOS_CORE: {
    sourceId: 'SRC-JUMO',
    name: 'JUMO UEOS Sovereign Hybrid Platform & FAAP Core',
    category: 'JUMO_PLATFORM_CORE',
    description: 'Enterprise Hybrid Operating System providing Ring-0 Micro-Kernel, Zero-Trust RBAC/ABAC, FAAP 60+ Financial Backbone, AEGIS Security Sentinel, and JUMO TRUST Assurance Gateway.',
    targetScale: 'Multi-Tenant Sovereign Cloud & Hybrid Operating System',
    provenance: 'CANONICAL_JUMO',
    confidence: 'HIGH',
    evidenceBase: [
      'JUMO UEOS server.ts Ring-0 Micro-Kernel & Security Interceptor Pipeline',
      'FAAP 60-Module Financial Backbone with Zero-Offset Ledger Parity',
      'JUMO TRUST Institutional Continuous Assurance & Evidence Hash Vaulting',
      'Fintech Switch & Universal Mobile Money Gateway Engine',
      '100-Module Education ERP Catalogue & 20 Enterprise Upgrades Foundation'
    ]
  }
};
