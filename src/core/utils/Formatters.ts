/**
 * JUMO Universal Formatters
 * Provides safe normalization and formatting for financial and numeric data.
 */

export const formatCurrency = (value: any, currency: string = 'UGX'): string => {
  const normalized = normalizeNumeric(value);
  return `${normalized.toLocaleString()} ${currency}`;
};

export const formatNumeric = (value: any): string => {
  return normalizeNumeric(value).toLocaleString();
};

export const normalizeNumeric = (value: any): number => {
  if (value === undefined || value === null || isNaN(value)) {
    return 0;
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value.replace(/,/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }
  return typeof value === 'number' ? value : 0;
};
