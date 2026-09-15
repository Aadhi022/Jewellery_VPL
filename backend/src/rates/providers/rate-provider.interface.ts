export interface RateProvider {
  getCurrentRates(): Promise<any[]>;
  getRate(metal: string, purity: string): Promise<any>;
}
export const RATE_PROVIDER = 'RATE_PROVIDER';
