export type SignalType = 'BUY' | 'HOLD' | 'SELL';

export interface HistoricalPricePoint {
  date: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
}

export interface ReturnsData {
  oneDay: number | null;
  oneWeek: number | null;
  oneMonth: number | null;
  sixMonths: number | null;
  oneYear: number | null;
  fiveYears: number | null;
}

export interface StockQuote {
  ticker: string;
  name: string;
  exchange: string;
  currency: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  yearHigh: number;
  yearLow: number;
  volume: number;
  avgVolume: number;
  marketCap: number;
  peRatio: number | null;
  forwardPE: number | null;
  pegRatio: number | null;
  priceToSales: number | null;
  priceToBook: number | null;
  dividendYield: number | null;
  beta: number | null;
  eps: number | null;
  forwardEps: number | null;
  sector: string;
  industry: string;
  logoUrl?: string;
  description?: string;
  lastUpdated: string;
}

export interface CategoryScore {
  id: 'fundamentals' | 'valuation' | 'growth' | 'analysts' | 'news' | 'risk';
  name: string;
  weight: number; // e.g. 0.25 for 25%
  score: number; // 0 to 100
  rating: 'Bullish' | 'Neutral' | 'Bearish' | 'High Risk' | 'Moderate Risk' | 'Low Risk';
  summary: string;
  metrics: {
    label: string;
    value: string | number;
    status?: 'positive' | 'neutral' | 'negative' | 'unavailable';
    benchmark?: string;
    source?: string;
  }[];
}

export interface WhyFactor {
  title: string;
  description: string;
  impact: 'positive' | 'negative';
  metricHighlight?: string;
  source: string;
  sourceUrl?: string;
  timestamp?: string;
}

export interface SmartMoneyInsight {
  overallSentiment: 'Bullish' | 'Neutral' | 'Bearish';
  institutionalOwnershipPercent: number | null;
  institutionalTrend: 'Accumulating' | 'Holding' | 'Reducing' | 'Mixed';
  summary: string;
  keyHolders: {
    institution: string;
    positionChange: string;
    sharesHeld?: string;
    sentiment: 'Bullish' | 'Neutral' | 'Bearish';
  }[];
  notablePerspectives: {
    sourceOrManager: string;
    verdict: string;
    reasoning: string;
  }[];
}

export interface RiskFactorItem {
  category: 'Volatility' | 'Debt & Liquidity' | 'Competitive' | 'Regulatory' | 'Macroeconomic' | 'Concentration' | 'Execution';
  severity: 'Low' | 'Moderate' | 'High';
  title: string;
  description: string;
  mitigant?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  publisher: string;
  publishedAt: string;
  sentiment: 'Bullish' | 'Neutral' | 'Bearish';
  summary: string;
  url: string;
  importance: 'High' | 'Medium' | 'Low';
}

export interface AnalystRatingData {
  consensusRating: string; // e.g. "Strong Buy", "Moderate Buy", "Hold", etc.
  totalAnalysts: number;
  buyCount: number;
  holdCount: number;
  sellCount: number;
  targetPriceMean: number | null;
  targetPriceHigh: number | null;
  targetPriceLow: number | null;
  impliedUpsidePercent: number | null;
  recentChanges: {
    firm: string;
    action: 'Upgrade' | 'Downgrade' | 'Initiated' | 'Maintained' | 'Target Raised' | 'Target Lowered';
    rating: string;
    targetPrice?: number;
    date: string;
  }[];
}

export interface PeerComparisonItem {
  ticker: string;
  name: string;
  marketCap: string;
  peRatio: string;
  forwardPE: string;
  revenueGrowth: string;
  netMargin: string;
  rating: SignalType;
  confidence: number;
}

export interface StockAnalysisReport {
  ticker: string;
  quote: StockQuote;
  historicalPrices: HistoricalPricePoint[];
  returns: ReturnsData;
  recommendation: {
    signal: SignalType;
    confidence: number; // 0-100
    overallScore: number; // 0-100 weighted
    verdictSummary: string;
    keyTakeaway: string;
    conflictWarning?: string | null; // Flags if quantitative score conflicts with qualitative risks
  };
  scoringCategories: CategoryScore[];
  whyFactors: WhyFactor[];
  risks: RiskFactorItem[];
  smartMoney: SmartMoneyInsight;
  analystSentiment: AnalystRatingData;
  news: NewsItem[];
  peers: PeerComparisonItem[];
  sources: {
    title: string;
    url?: string;
    provider: string;
    type: 'SEC Filing' | 'Earnings Report' | 'Analyst Consensus' | 'Financial News' | 'Market Data Provider';
  }[];
  generatedAt: string;
}

export interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
}
