
/**
 * JUMO ENTERPRISE — Universal Financial & Data Formatters
 * Ensures safe data normalization and formatting across all ERP domains.
 */

export const normalizeNumeric = (val: any, fallback: number = 0): number => {
  if (val === null || val === undefined) return fallback;
  const num = typeof val === 'number' ? val : parseFloat(val);
  return isNaN(num) ? fallback : num;
};

export const formatCurrency = (amount: any, currency: string = 'UGX'): string => {
  const num = normalizeNumeric(amount);
  try {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  } catch (e) {
    return `${currency} ${num.toLocaleString()}`;
  }
};

export const formatNumeric = (val: any): string => {
  const num = normalizeNumeric(val);
  return num.toLocaleString();
};

export const formatDate = (val: any): string => {
  if (!val) return 'N/A';
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch (e) {
    return 'N/A';
  }
};
