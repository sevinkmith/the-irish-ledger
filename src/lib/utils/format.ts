const eur = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const eurPrecise = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

/** Formats a number as whole-euro currency, e.g. €44,000 */
export function formatEUR(value: number): string {
  if (!Number.isFinite(value)) return "€0";
  return eur.format(Math.round(value));
}

/** Formats a number as currency with cents, e.g. €1,234.56 */
export function formatEURPrecise(value: number): string {
  if (!Number.isFinite(value)) return "€0.00";
  return eurPrecise.format(value);
}

/** Formats a decimal rate (0.2) as a percentage string (20%) */
export function formatPercent(rate: number, fractionDigits = 1): string {
  if (!Number.isFinite(rate)) return "0%";
  const digits = Number.isInteger(rate * 100) ? 0 : fractionDigits;
  return `${(rate * 100).toFixed(digits)}%`;
}

/** Formats a plain number with thousands separators, e.g. 1,234 */
export function formatNumber(value: number, fractionDigits = 0): string {
  if (!Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("en-IE", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}

/** Clamp a number between a min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Safely parse a form input into a non-negative number */
export function toNonNegativeNumber(value: string | number): number {
  const n = typeof value === "number" ? value : parseFloat(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}
