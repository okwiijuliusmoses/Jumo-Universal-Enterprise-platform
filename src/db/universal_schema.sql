-- ============================================================================
-- JUMO UNIVERSAL ENTERPRISE PLATFORM: FINANCIAL CORE SCHEMA
-- AUTHORITATIVE POLYMORPHIC ACCOUNTING & PAYMENT ENGINE
-- ============================================================================

-- 1. CONFIGURATION & REGISTRIES
-- ============================================================================

-- Currencies Registry (Multi-Currency Foundation)
CREATE TABLE currencies (
    code VARCHAR(10) PRIMARY KEY, -- ISO 4217 (e.g., UGX, USD, KES)
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10),
    minor_unit_factor INT DEFAULT 100 NOT NULL, -- e.g., 100 for cents
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

-- Exchange Rates (Authoritative Valuation)
CREATE TABLE exchange_rates (
    id BIGSERIAL PRIMARY KEY,
    base_currency VARCHAR(10) NOT NULL REFERENCES currencies(code),
    target_currency VARCHAR(10) NOT NULL REFERENCES currencies(code),
    rate NUMERIC(20, 10) NOT NULL, -- high precision for conversions
    provider VARCHAR(100),
    effective_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. TENANCY & WORKSPACES
-- ============================================================================

CREATE TABLE tenants (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    classification VARCHAR(100) NOT NULL, -- Now a string/config-lookup
    base_currency VARCHAR(10) NOT NULL REFERENCES currencies(code),
    settings JSONB DEFAULT '{}'::jsonb NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE workspaces (
    id VARCHAR(100) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (tenant_id, id)
);

-- 3. PARTY & ROLE MODEL (The "Identity" Foundation)
-- ============================================================================

CREATE TABLE parties (
    id VARCHAR(100) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    tax_id VARCHAR(100),
    attributes JSONB DEFAULT '{}'::jsonb NOT NULL, -- Extensible metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (tenant_id, id)
);

-- Party Roles (Maps a single identity to multiple business roles: Student, Supplier, etc.)
CREATE TABLE party_roles (
    id BIGSERIAL PRIMARY KEY,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    party_id VARCHAR(100) NOT NULL,
    role_type VARCHAR(100) NOT NULL, -- CUSTOMER, SUPPLIER, STUDENT, MEMBER, DONOR, etc.
    status VARCHAR(50) DEFAULT 'ACTIVE' NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    FOREIGN KEY (tenant_id, party_id) REFERENCES parties(tenant_id, id) ON DELETE CASCADE,
    UNIQUE (tenant_id, party_id, role_type)
);

-- 4. CHART OF ACCOUNTS (Configurable Ledger Engine)
-- ============================================================================

CREATE TABLE ledger_accounts (
    id VARCHAR(100) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    workspace_id VARCHAR(100) NOT NULL,
    code VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    account_type VARCHAR(50) NOT NULL, -- ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE
    parent_id VARCHAR(100), -- For hierarchy
    currency_code VARCHAR(10) NOT NULL REFERENCES currencies(code),
    is_control_account BOOLEAN DEFAULT FALSE NOT NULL,
    is_reconciliation_account BOOLEAN DEFAULT FALSE NOT NULL,
    balance_minor BIGINT DEFAULT 0 NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE' NOT NULL,
    PRIMARY KEY (tenant_id, id),
    FOREIGN KEY (tenant_id, workspace_id) REFERENCES workspaces(tenant_id, id),
    CONSTRAINT unique_tenant_account_code UNIQUE (tenant_id, code)
);

-- 5. TRANSACTIONAL LEDGER (Double-Entry Engine)
-- ============================================================================

CREATE TABLE fiscal_periods (
    id VARCHAR(100) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_locked BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY (tenant_id, id)
);

CREATE TABLE journal_entries (
    id VARCHAR(100) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    workspace_id VARCHAR(100) NOT NULL,
    fiscal_period_id VARCHAR(100),
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE,
    document_date DATE,
    reference VARCHAR(255) NOT NULL,
    description TEXT,
    source VARCHAR(100) NOT NULL, -- PAYMENTS, INVOICING, MANUAL
    currency_code VARCHAR(10) NOT NULL REFERENCES currencies(code),
    exchange_rate NUMERIC(20, 10) DEFAULT 1.0 NOT NULL,
    status VARCHAR(50) DEFAULT 'POSTED' NOT NULL, -- Posted journals are immutable
    reversal_id VARCHAR(100), -- Link to reversing entry if corrected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (tenant_id, id),
    FOREIGN KEY (tenant_id, workspace_id) REFERENCES workspaces(tenant_id, id),
    FOREIGN KEY (tenant_id, fiscal_period_id) REFERENCES fiscal_periods(tenant_id, id)
);

CREATE TABLE journal_lines (
    id VARCHAR(100) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    journal_entry_id VARCHAR(100) NOT NULL,
    ledger_account_id VARCHAR(100) NOT NULL,
    debit_minor BIGINT DEFAULT 0 NOT NULL,
    credit_minor BIGINT DEFAULT 0 NOT NULL,
    dimensions JSONB DEFAULT '{}'::jsonb NOT NULL, -- Cost Centers, Projects, etc.
    PRIMARY KEY (tenant_id, id),
    FOREIGN KEY (tenant_id, journal_entry_id) REFERENCES journal_entries(tenant_id, id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id, ledger_account_id) REFERENCES ledger_accounts(tenant_id, id) ON DELETE CASCADE,
    CONSTRAINT chk_line_amount CHECK (debit_minor >= 0 AND credit_minor >= 0 AND (debit_minor > 0 OR credit_minor > 0))
);

-- 6. OPEN ITEMS & DOCUMENTS (AR/AP Foundation)
-- ============================================================================

CREATE TABLE documents (
    id VARCHAR(100) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    workspace_id VARCHAR(100) NOT NULL,
    party_id VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL, -- INVOICE, BILL, CREDIT_NOTE, RECEIPT
    number VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    due_date DATE,
    currency_code VARCHAR(10) NOT NULL REFERENCES currencies(code),
    total_minor BIGINT NOT NULL,
    tax_total_minor BIGINT DEFAULT 0 NOT NULL,
    status VARCHAR(50) DEFAULT 'DRAFT' NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
    PRIMARY KEY (tenant_id, id),
    FOREIGN KEY (tenant_id, workspace_id) REFERENCES workspaces(tenant_id, id),
    FOREIGN KEY (tenant_id, party_id) REFERENCES parties(tenant_id, id)
);

CREATE TABLE document_lines (
    id BIGSERIAL PRIMARY KEY,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    document_id VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    quantity NUMERIC(20, 5) NOT NULL,
    unit_price_minor BIGINT NOT NULL,
    tax_code VARCHAR(50),
    tax_amount_minor BIGINT DEFAULT 0 NOT NULL,
    total_minor BIGINT NOT NULL,
    FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id) ON DELETE CASCADE
);

-- Universal Open Items (Receivables/Payables tracking)
CREATE TABLE open_items (
    id VARCHAR(100) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    party_id VARCHAR(100) NOT NULL,
    document_id VARCHAR(100),
    direction VARCHAR(10) NOT NULL, -- DEBIT (Receivable), CREDIT (Payable)
    amount_minor BIGINT NOT NULL,
    remaining_minor BIGINT NOT NULL,
    currency_code VARCHAR(10) NOT NULL REFERENCES currencies(code),
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'OPEN' NOT NULL,
    PRIMARY KEY (tenant_id, id),
    FOREIGN KEY (tenant_id, party_id) REFERENCES parties(tenant_id, id),
    FOREIGN KEY (tenant_id, document_id) REFERENCES documents(tenant_id, id)
);

-- 7. PAYMENT & ALLOCATION ENGINE
-- ============================================================================

CREATE TABLE payments (
    id VARCHAR(100) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    party_id VARCHAR(100) NOT NULL,
    payment_method VARCHAR(100) NOT NULL, -- MOMO, STRIPE, CASH, USSD
    amount_minor BIGINT NOT NULL,
    currency_code VARCHAR(10) NOT NULL REFERENCES currencies(code),
    reference VARCHAR(255),
    provider_tx_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'COMPLETED' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (tenant_id, id),
    FOREIGN KEY (tenant_id, party_id) REFERENCES parties(tenant_id, id)
);

CREATE TABLE payment_allocations (
    id BIGSERIAL PRIMARY KEY,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    payment_id VARCHAR(100) NOT NULL,
    open_item_id VARCHAR(100) NOT NULL,
    amount_minor BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (tenant_id, payment_id) REFERENCES payments(tenant_id, id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id, open_item_id) REFERENCES open_items(tenant_id, id) ON DELETE CASCADE
);

-- 8. AUDIT & EVENTS
-- ============================================================================

CREATE TABLE audit_events (
    id BIGSERIAL PRIMARY KEY,
    tenant_id VARCHAR(100) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    actor_id VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    before_state JSONB,
    after_state JSONB,
    correlation_id VARCHAR(255),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- 9. FINANCIAL INTEGRITY CONSTRAINTS
-- ============================================================================

-- Function to verify journal balance
CREATE OR REPLACE FUNCTION verify_universal_journal_balance()
RETURNS TRIGGER AS $$
DECLARE
    v_total_debit BIGINT;
    v_total_credit BIGINT;
BEGIN
    SELECT COALESCE(SUM(debit_minor), 0), COALESCE(SUM(credit_minor), 0)
    INTO v_total_debit, v_total_credit
    FROM journal_lines
    WHERE tenant_id = NEW.tenant_id AND journal_entry_id = NEW.id;

    IF v_total_debit <> v_total_credit THEN
        RAISE EXCEPTION 'Double-entry violation: Debits (%) != Credits (%) in journal %', v_total_debit, v_total_credit, NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update account balances (Atomic)
CREATE OR REPLACE FUNCTION sync_ledger_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE ledger_accounts
        SET balance_minor = balance_minor + NEW.debit_minor - NEW.credit_minor
        WHERE tenant_id = NEW.tenant_id AND id = NEW.ledger_account_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE ledger_accounts
        SET balance_minor = balance_minor - OLD.debit_minor + OLD.credit_minor
        WHERE tenant_id = OLD.tenant_id AND id = OLD.ledger_account_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_ledger_balance
AFTER INSERT OR DELETE ON journal_lines
FOR EACH ROW EXECUTE FUNCTION sync_ledger_balance();
