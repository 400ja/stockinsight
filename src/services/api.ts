import { SearchResult, StockAnalysisReport } from '../types';

export async function searchTickers(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Search failed');
    return await res.json();
  } catch (err) {
    console.error('Error searching tickers:', err);
    return [];
  }
}

export async function getTrendingTickers(): Promise<SearchResult[]> {
  try {
    const res = await fetch('/api/trending');
    if (!res.ok) throw new Error('Trending fetch failed');
    return await res.json();
  } catch (err) {
    console.error('Error fetching trending tickers:', err);
    return [];
  }
}

export async function getStockAnalysis(ticker: string): Promise<StockAnalysisReport> {
  const res = await fetch(`/api/stock/${encodeURIComponent(ticker.toUpperCase())}`);
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to analyze stock ${ticker}`);
  }
  return await res.json();
}
