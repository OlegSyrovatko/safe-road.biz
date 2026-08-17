export type CurrencyCode = "USD" | "UAH";

export interface ExchangeRate {
  /** 1 USD in UAH */
  rate: number;
  /** NBU rate date, YYYY-MM-DD */
  date: string;
  /** When this value was fetched from the backend */
  fetchedAt: string;
}
