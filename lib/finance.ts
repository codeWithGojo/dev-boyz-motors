export type FinanceInputs = { price: number; depositPercent: number; apr: number; months: number }
/** Standard reducing-balance loan formula, not a credit approval or quotation. */
export function monthlyRepayment({price, depositPercent, apr, months}: FinanceInputs): number {
  if (!Number.isFinite(price) || price <= 0 || months <= 0) return 0
  const principal = Math.max(0, price * (1 - depositPercent / 100))
  const rate = Math.max(0, apr) / 1200
  return Math.round(rate === 0 ? principal / months : principal * rate / (1 - Math.pow(1 + rate, -months)))
}
export const defaultFinance = { depositPercent: 40, apr: 18, months: 48 }
