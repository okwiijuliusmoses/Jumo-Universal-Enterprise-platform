export interface MoneyValue {
  amount: number;
  currency: string;
}

export interface MoneyRecord {
  amount: number;
  currency: string;
}

/**
 * Deliberate, safe formatting helper for money values.
 * Never throws an error if empty or loading states occur.
 */
export function formatMoney(value?: number | string | MoneyValue | MoneyRecord | null, currency = 'UGX'): string {
  if (value === undefined || value === null) {
    return `0.00 ${currency}`;
  }
  if (typeof value === 'object') {
    const amt = (value as any).amount;
    const curr = (value as any).currency || currency;
    return formatMoney(amt, curr);
  }
  const numeric = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(numeric)) {
    return `0.00 ${currency}`;
  }
  return `${numeric.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

/**
 * Deliberate, safe formatting helper for numbers.
 * Never throws an error if empty or loading states occur.
 */
export function formatNumber(value?: number | string | null): string {
  if (value === undefined || value === null) {
    return '0';
  }
  const numeric = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(numeric)) {
    return '0';
  }
  return numeric.toLocaleString();
}

/**
 * Deliberate, safe formatting helper for percentages.
 * Never throws an error if empty or loading states occur.
 */
export function formatPercentage(value?: number | string | null): string {
  if (value === undefined || value === null) {
    return '0.0%';
  }
  const numeric = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(numeric)) {
    return '0.0%';
  }
  return `${numeric.toFixed(1)}%`;
}

/**
 * Deliberate, safe formatting helper for dates.
 * Never throws an error if empty or loading states occur.
 */
export function formatDate(value?: string | Date | null): string {
  if (!value) {
    return '—';
  }
  try {
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) {
      return '—';
    }
    return date.toLocaleString();
  } catch {
    return '—';
  }
}
