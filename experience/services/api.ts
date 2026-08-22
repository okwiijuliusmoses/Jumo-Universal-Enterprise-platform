/**
 * Frontend REST API Client Service
 */

const API_BASE = '/api/v1';

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('jumo_ueos_token');
  }
  return null;
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('jumo_ueos_token', token);
  }
}

export function clearAuthToken() {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('jumo_ueos_token');
    localStorage.removeItem('jumo_ueos_user');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'API_REQUEST_FAILED');
  }

  return data as T;
}

export const api = {
  register: (params: { email: string; name: string; role: string; tenantId: string }) =>
    request<{ status: string; user: any }>('/identity/register', {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  login: (email: string, password: string) =>
    request<{ status: string; token: string; user: any }>('/identity/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request<{ status: string; user: any }>('/identity/me'),

  getOwnerOverview: () => request<any>('/owner/overview'),

  evaluateFaap: (params: {
    requestedAmountUSD: number;
    creditScore: number;
    collateralRatio: number;
    historicalDefaultRate: number;
  }) =>
    request<any>('/tenant/faap/evaluate', {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  executeDrawdown: (params: { poolId: string; amountUSD: number }) =>
    request<any>('/tenant/drawdown/execute', {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  getSecurityAuditLogs: () => request<any>('/security/audit-logs'),

  // Treasury API
  getTreasuryPools: () => request<any>('/treasury/pools'),
  getTreasuryLedger: () => request<any>('/treasury/ledger'),
  injectLiquidity: (poolId: string, amountUSD: number) =>
    request<any>(`/treasury/pools/${poolId}/inject`, {
      method: 'POST',
      body: JSON.stringify({ amountUSD }),
    }),
  rebalancePool: (poolId: string) =>
    request<any>(`/treasury/pools/${poolId}/rebalance`, {
      method: 'POST',
    }),

  // Workflow API
  getWorkflowRules: () => request<any>('/workflow/rules'),
  getWorkflowLogs: () => request<any>('/workflow/logs'),
  toggleWorkflowRule: (id: string) =>
    request<any>(`/workflow/rules/${id}/toggle`, {
      method: 'POST',
    }),
  createWorkflowRule: (ruleData: {
    name: string;
    triggerEvent: string;
    condition: string;
    action: string;
    enabled: boolean;
  }) =>
    request<any>('/workflow/rules', {
      method: 'POST',
      body: JSON.stringify(ruleData),
    }),
  triggerWorkflowEvent: (eventName: string, payload: any) =>
    request<any>('/workflow/trigger', {
      method: 'POST',
      body: JSON.stringify({ eventName, payload }),
    }),
};

export const apiService = api;
