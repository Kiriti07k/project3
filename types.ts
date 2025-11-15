
export enum UserRole {
  Investor = 'Investor',
  FinancialAdvisor = 'Financial Advisor',
  DataAnalyst = 'Data Analyst',
  Admin = 'Admin',
}

export interface PerformanceDataPoint {
  date: string;
  nav: number;
}

export interface MutualFund {
  id: string;
  name: string;
  symbol: string;
  category: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
  expenseRatio: number;
  nav: number;
  ytdReturn: number;
  performanceHistory: PerformanceDataPoint[];
}
